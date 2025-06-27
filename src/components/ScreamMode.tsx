
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Volume2, ArrowLeft, Mic, MicOff } from 'lucide-react';

interface ScreamModeProps {
  content: string;
  onBack: () => void;
  onComplete: () => void;
}

const ScreamMode = ({ content, onBack, onComplete }: ScreamModeProps) => {
  const [isListening, setIsListening] = useState(false);
  const [volume, setVolume] = useState(0);
  const [maxVolume, setMaxVolume] = useState(0);
  const [glassBroken, setGlassBroken] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationIdRef = useRef<number>();

  useEffect(() => {
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);
      
      analyser.fftSize = 256;
      microphone.connect(analyser);
      
      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      
      setIsListening(true);
      monitorAudio();
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopListening = () => {
    setIsListening(false);
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
  };

  const monitorAudio = () => {
    if (!analyserRef.current) return;

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);
    
    const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
    const volumePercent = Math.min((average / 128) * 100, 100);
    
    setVolume(volumePercent);
    setMaxVolume(prev => Math.max(prev, volumePercent));
    
    // Break glass at 60% volume
    if (volumePercent > 60 && !glassBroken) {
      setGlassBroken(true);
      setTimeout(() => {
        setSessionComplete(true);
        setTimeout(() => {
          onComplete();
        }, 3000);
      }, 2000);
    }
    
    if (isListening) {
      animationIdRef.current = requestAnimationFrame(monitorAudio);
    }
  };

  const getVolumeColor = (vol: number) => {
    if (vol < 20) return 'from-green-500 to-emerald-500';
    if (vol < 40) return 'from-yellow-500 to-orange-500';
    if (vol < 60) return 'from-orange-500 to-red-500';
    return 'from-red-500 to-pink-500';
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Audio Visual Effects */}
      {isListening && (
        <div className="absolute inset-0 z-0">
          {/* Sound Ripples */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute border-2 border-purple-400/30 rounded-full animate-ping"
              style={{
                width: `${100 + volume * 3 + i * 50}px`,
                height: `${100 + volume * 3 + i * 50}px`,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                animationDelay: `${i * 0.2}s`,
                animationDuration: '2s'
              }}
            />
          ))}
          
          {/* Background pulse */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-indigo-900/20 transition-opacity duration-100"
            style={{ opacity: volume / 100 }}
          />
        </div>
      )}

      {/* Glass Break Effect */}
      {glassBroken && (
        <div className="absolute inset-0 z-40">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-4 h-4 bg-white/80 animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-4xl mx-auto relative z-10 p-6 pt-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-light text-gradient-lavender">Scream Mode</h1>
          <div className="w-20"></div>
        </div>

        {/* Volume Visualization */}
        <Card className="apple-card p-8 mb-8 border-white/20">
          <div className="text-center space-y-6">
            <div className="flex justify-center space-x-4 mb-6">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className={`w-4 rounded-full transition-all duration-100 ${
                    volume > (i * 8.33) ? `bg-gradient-to-t ${getVolumeColor(volume)}` : 'bg-gray-700'
                  }`}
                  style={{ 
                    height: `${20 + (volume > (i * 8.33) ? volume : 0)}px`,
                    maxHeight: '100px'
                  }}
                />
              ))}
            </div>

            <div className="space-y-2">
              <div className="text-4xl font-light">{Math.round(volume)}%</div>
              <div className="text-gray-400">Volume Level</div>
              {maxVolume > 0 && (
                <div className="text-sm text-purple-400">
                  Max reached: {Math.round(maxVolume)}%
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Scream Controls */}
        <Card className="apple-card p-8 text-center border-white/20">
          {sessionComplete ? (
            <div className="space-y-6">
              <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto">
                <Volume2 className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-2xl font-light">Glass Shattered! 💥</h2>
              <p className="text-gray-400">
                You found your voice. Your emotions have been heard.
              </p>
              <div className="text-green-400 font-medium">
                Session Complete - Well done! 🎉
              </div>
            </div>
          ) : glassBroken ? (
            <div className="space-y-6">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
                <Volume2 className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-2xl font-light">BREAKTHROUGH! 🔥</h2>
              <p className="text-purple-300">
                You shattered the silence! Your voice is powerful!
              </p>
            </div>
          ) : !isListening ? (
            <div className="space-y-6">
              <div className="w-24 h-24 bg-gradient-to-br from-lavender-500 to-purple-500 rounded-full flex items-center justify-center mx-auto">
                <Mic className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-2xl font-light">Ready to let it out?</h2>
              <p className="text-gray-400">
                Hold the button and scream, yell, or vocally express your emotions.<br />
                Reach 60% volume to shatter the glass barrier!
              </p>
              <Button
                onClick={startListening}
                className="apple-button bg-gradient-to-r from-lavender-500 to-purple-500 text-white px-8 py-3"
              >
                <Mic className="w-5 h-5 mr-2" />
                Start Screaming
              </Button>
              <p className="text-xs text-gray-500">
                * Microphone access required
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div 
                className="w-24 h-24 bg-gradient-to-br from-lavender-500 to-purple-500 rounded-full flex items-center justify-center mx-auto transition-transform"
                style={{ transform: `scale(${1 + volume / 200})` }}
              >
                <Volume2 className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-2xl font-light">
                {volume < 20 ? 'Speak up...' : 
                 volume < 40 ? 'Getting louder...' : 
                 volume < 60 ? 'Almost there!' : 
                 'BREAKTHROUGH! 🔥'}
              </h2>
              <p className="text-gray-400">
                {volume < 60 ? `${Math.round(60 - volume)}% more to break the glass!` : 'Glass shattered!'}
              </p>
              <Button
                onClick={stopListening}
                variant="outline"
                className="border-red-500 text-red-400 hover:bg-red-500/10"
              >
                <MicOff className="w-5 h-5 mr-2" />
                Stop
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ScreamMode;
