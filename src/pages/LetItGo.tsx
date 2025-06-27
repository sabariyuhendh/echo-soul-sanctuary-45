
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Flame, Hammer, Volume2, Timer } from 'lucide-react';
import { Link } from 'react-router-dom';

type ReleaseMode = 'burn' | 'smash' | 'scream';

const LetItGo = () => {
  const [mode, setMode] = useState<ReleaseMode | null>(null);
  const [content, setContent] = useState('');
  const [isReleasing, setIsReleasing] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3600);
  const [burnProgress, setBurnProgress] = useState(0);
  const [smashClicks, setSmashClicks] = useState(0);
  const [screamIntensity, setScreamIntensity] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const playSound = (soundType: string) => {
    if (audioRef.current) {
      audioRef.current.src = `/sounds/${soundType}.mp3`;
      audioRef.current.play().catch(console.error);
    }
  };

  const startBurnMode = () => {
    setMode('burn');
    setIsReleasing(true);
    setBurnProgress(0);
    playSound('fire-crackling');
    
    const burnInterval = setInterval(() => {
      setBurnProgress(prev => {
        if (prev >= 100) {
          clearInterval(burnInterval);
          setTimeout(() => {
            setIsReleasing(false);
            setContent('');
            setMode(null);
          }, 1000);
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  const startSmashMode = () => {
    setMode('smash');
    setIsReleasing(true);
    setSmashClicks(0);
  };

  const handleSmash = () => {
    setSmashClicks(prev => prev + 1);
    playSound('glass-break');
    
    if (smashClicks >= 9) {
      setTimeout(() => {
        setIsReleasing(false);
        setContent('');
        setMode(null);
        setSmashClicks(0);
      }, 1000);
    }
  };

  const startScreamMode = () => {
    setMode('scream');
    setIsReleasing(true);
    setScreamIntensity(0);
  };

  const handleScream = () => {
    setScreamIntensity(prev => Math.min(prev + 20, 100));
    playSound('echo-chamber');
    
    if (screamIntensity >= 80) {
      setTimeout(() => {
        setIsReleasing(false);
        setContent('');
        setMode(null);
        setScreamIntensity(0);
      }, 2000);
    }
  };

  const modes = [
    {
      id: 'burn' as ReleaseMode,
      name: 'Burn It',
      icon: Flame,
      description: 'Watch your words turn to ash',
      color: 'amber',
      gradient: 'from-amber-500 to-red-500',
      action: startBurnMode
    },
    {
      id: 'smash' as ReleaseMode,
      name: 'Smash It',
      icon: Hammer,
      description: 'Shatter your frustrations',
      color: 'rose',
      gradient: 'from-rose-500 to-pink-500',
      action: startSmashMode
    },
    {
      id: 'scream' as ReleaseMode,
      name: 'Scream It',
      icon: Volume2,
      description: 'Let it echo into the void',
      color: 'lavender',
      gradient: 'from-lavender-500 to-purple-500',
      action: startScreamMode
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6 relative overflow-hidden">
      {/* Background Effects */}
      {isReleasing && (
        <div className="absolute inset-0 z-0">
          {mode === 'burn' && (
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-t from-orange-900/30 via-red-800/20 to-yellow-600/10 animate-pulse"></div>
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-8 bg-gradient-to-t from-orange-500 to-yellow-300 rounded-full animate-flicker"
                  style={{
                    left: `${Math.random() * 100}%`,
                    bottom: `${Math.random() * 20}%`,
                    animationDelay: `${Math.random() * 2}s`
                  }}
                ></div>
              ))}
            </div>
          )}
          {mode === 'smash' && (
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800/30 to-slate-900/20"></div>
              {[...Array(smashClicks * 3)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white animate-ping"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDuration: '0.5s'
                  }}
                ></div>
              ))}
            </div>
          )}
          {mode === 'scream' && (
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-indigo-900/20 animate-pulse"></div>
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="absolute border-2 border-purple-400/30 rounded-full animate-ping"
                  style={{
                    width: `${50 + i * 20}px`,
                    height: `${50 + i * 20}px`,
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    animationDelay: `${i * 0.2}s`
                  }}
                ></div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="max-w-4xl mx-auto relative z-10 pt-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
          <div className="text-center">
            <h1 className="text-3xl font-light tracking-tight">
              <span className="text-gradient-amber">Let-It-Go Room</span>
            </h1>
            <p className="text-gray-400 text-sm">Release and destroy your emotional burdens</p>
          </div>
          <div className="flex items-center space-x-2 text-amber-400">
            <Timer className="w-4 h-4" />
            <span className="text-sm">{formatTime(timeLeft)}</span>
          </div>
        </div>

        {/* Auto-Delete Warning */}
        <Card className="bg-amber-500/10 border-amber-500/30 p-4 mb-8">
          <p className="text-center text-amber-300 text-sm">
            <Timer className="w-4 h-4 inline mr-2" />
            All entries auto-delete after 1 hour for your privacy
          </p>
        </Card>

        {/* Writing Area */}
        {!isReleasing && (
          <Card className="apple-card p-8 mb-8 border-white/20">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write everything you want to destroy... your anger, frustration, pain. Let it all out."
              className="min-h-64 bg-transparent border-none text-lg resize-none focus:ring-0 text-white placeholder-gray-500"
            />
          </Card>
        )}

        {/* Release Modes */}
        {!isReleasing ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {modes.map((modeOption) => (
              <Card key={modeOption.id} className="apple-card p-6 hover:scale-105 transition-transform cursor-pointer group border-white/20"
                    onClick={() => content.trim() && modeOption.action()}>
                <div className="text-center space-y-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${modeOption.gradient} rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform`}>
                    <modeOption.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-medium text-gradient-white">{modeOption.name}</h3>
                  <p className="text-gray-400 text-sm">{modeOption.description}</p>
                  <Button
                    disabled={!content.trim()}
                    className={`w-full apple-button bg-gradient-to-r ${modeOption.gradient} text-white border-0`}
                  >
                    Release
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="apple-card p-12 text-center border-white/20">
            <div className="space-y-6">
              {mode === 'burn' && (
                <>
                  <div className="w-24 h-24 bg-gradient-to-br from-amber-500 to-red-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
                    <Flame className="w-12 h-12 text-white" />
                  </div>
                  <h2 className="text-2xl font-light text-gradient-white">Burning away your pain...</h2>
                  <div className="w-full bg-gray-700 rounded-full h-4">
                    <div 
                      className="bg-gradient-to-r from-orange-500 to-red-500 h-4 rounded-full transition-all duration-300"
                      style={{ width: `${burnProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-400">Watch your words turn to ash... {burnProgress}%</p>
                </>
              )}
              
              {mode === 'smash' && (
                <>
                  <div 
                    className="w-24 h-24 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center mx-auto cursor-pointer hover:scale-110 transition-transform"
                    onClick={handleSmash}
                  >
                    <Hammer className="w-12 h-12 text-white" />
                  </div>
                  <h2 className="text-2xl font-light text-gradient-white">Shattering your frustrations...</h2>
                  <p className="text-gray-400">Click to smash! ({smashClicks}/10)</p>
                  <div className="flex justify-center space-x-2">
                    {[...Array(10)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-4 h-4 rounded-full border-2 ${
                          i < smashClicks ? 'bg-red-500 border-red-500' : 'border-gray-600'
                        }`}
                      ></div>
                    ))}
                  </div>
                </>
              )}
              
              {mode === 'scream' && (
                <>
                  <div 
                    className="w-24 h-24 bg-gradient-to-br from-lavender-500 to-purple-500 rounded-full flex items-center justify-center mx-auto cursor-pointer hover:scale-110 transition-transform animate-pulse"
                    onClick={handleScream}
                  >
                    <Volume2 className="w-12 h-12 text-white" />
                  </div>
                  <h2 className="text-2xl font-light text-gradient-white">Echoing into the void...</h2>
                  <p className="text-gray-400">Click to scream! Intensity: {screamIntensity}%</p>
                  <div className="w-full bg-gray-700 rounded-full h-4">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full transition-all duration-300"
                      style={{ width: `${screamIntensity}%` }}
                    ></div>
                  </div>
                </>
              )}
            </div>
          </Card>
        )}
      </div>

      <audio ref={audioRef} />
    </div>
  );
};

export default LetItGo;
