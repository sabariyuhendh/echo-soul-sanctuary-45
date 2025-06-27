
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Flame, ArrowLeft } from 'lucide-react';

interface BurnModeProps {
  content: string;
  onBack: () => void;
  onComplete: () => void;
}

const BurnMode = ({ content, onBack, onComplete }: BurnModeProps) => {
  const [burnProgress, setBurnProgress] = useState(0);
  const [isIgnited, setIsIgnited] = useState(false);
  const [burnedText, setBurnedText] = useState(content);

  useEffect(() => {
    if (isIgnited) {
      const burnInterval = setInterval(() => {
        setBurnProgress(prev => {
          const newProgress = prev + 2;
          
          // Gradually burn away text
          if (newProgress > 20 && newProgress < 80) {
            const burnAmount = Math.floor((newProgress - 20) / 60 * content.length);
            const remainingText = content.slice(burnAmount);
            setBurnedText(remainingText);
          }
          
          if (newProgress >= 100) {
            clearInterval(burnInterval);
            setBurnedText('');
            setTimeout(() => {
              onComplete();
            }, 2000);
            return 100;
          }
          return newProgress;
        });
      }, 100);

      return () => clearInterval(burnInterval);
    }
  }, [isIgnited, content, onComplete]);

  const startBurning = () => {
    setIsIgnited(true);
    setBurnProgress(0);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Fire Background Effects */}
      {isIgnited && (
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-orange-900/40 via-red-800/30 to-yellow-600/20 animate-pulse"></div>
          
          {/* Animated Flames */}
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-flicker"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: `${Math.random() * 30}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${0.5 + Math.random() * 1}s`
              }}
            >
              <div className="w-3 h-8 bg-gradient-to-t from-orange-500 via-red-500 to-yellow-300 rounded-full opacity-80 animate-pulse"></div>
            </div>
          ))}
          
          {/* Floating Embers */}
          {[...Array(20)].map((_, i) => (
            <div
              key={`ember-${i}`}
              className="absolute w-1 h-1 bg-orange-400 rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: `${Math.random() * 50}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            ></div>
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
          <h1 className="text-3xl font-light text-gradient-amber">Burn Mode</h1>
          <div className="w-20"></div>
        </div>

        {/* Burning Text Area */}
        <Card className="apple-card p-8 mb-8 border-white/20 relative">
          {isIgnited && (
            <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 to-transparent rounded-lg"></div>
          )}
          
          <div className="relative z-10">
            <Textarea
              value={burnedText}
              readOnly
              className={`min-h-64 bg-transparent border-none text-lg resize-none focus:ring-0 text-white placeholder-gray-500 transition-all duration-300 ${
                isIgnited ? 'text-orange-300' : 'text-white'
              }`}
              style={{
                textShadow: isIgnited ? '0 0 10px rgba(255, 165, 0, 0.5)' : 'none'
              }}
            />
          </div>
        </Card>

        {/* Burn Controls */}
        <Card className="apple-card p-8 text-center border-white/20">
          {!isIgnited ? (
            <div className="space-y-6">
              <div className="w-24 h-24 bg-gradient-to-br from-amber-500 to-red-500 rounded-full flex items-center justify-center mx-auto">
                <Flame className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-2xl font-light">Ready to let it burn?</h2>
              <p className="text-gray-400">
                Watch your pain turn to ash and drift away forever
              </p>
              <Button
                onClick={startBurning}
                className="apple-button bg-gradient-to-r from-amber-500 to-red-500 text-white px-8 py-3"
              >
                <Flame className="w-5 h-5 mr-2" />
                Ignite
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="w-24 h-24 bg-gradient-to-br from-amber-500 to-red-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
                <Flame className="w-12 h-12 text-white animate-bounce" />
              </div>
              <h2 className="text-2xl font-light">
                {burnProgress < 50 ? 'Flames rising...' : 
                 burnProgress < 90 ? 'Turning to ash...' : 
                 'Rising as smoke...'}
              </h2>
              <div className="w-full bg-gray-700 rounded-full h-4">
                <div 
                  className="bg-gradient-to-r from-orange-500 via-red-500 to-yellow-400 h-4 rounded-full transition-all duration-300"
                  style={{ width: `${burnProgress}%` }}
                ></div>
              </div>
              <p className="text-orange-300">
                {burnProgress < 100 ? `Burning... ${burnProgress}%` : 'Released into the universe ✨'}
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default BurnMode;
