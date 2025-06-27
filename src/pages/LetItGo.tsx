
import { useState, useEffect } from 'react';
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
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour

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

  const startRelease = (selectedMode: ReleaseMode) => {
    setMode(selectedMode);
    setIsReleasing(true);
    
    // Simulate release effect
    setTimeout(() => {
      setIsReleasing(false);
      setContent('');
      setMode(null);
    }, 3000);
  };

  const modes = [
    {
      id: 'burn' as ReleaseMode,
      name: 'Burn It',
      icon: Flame,
      description: 'Watch your words turn to ash',
      color: 'amber',
      gradient: 'from-amber-500 to-red-500'
    },
    {
      id: 'smash' as ReleaseMode,
      name: 'Smash It',
      icon: Hammer,
      description: 'Shatter your frustrations',
      color: 'rose',
      gradient: 'from-rose-500 to-pink-500'
    },
    {
      id: 'scream' as ReleaseMode,
      name: 'Scream It',
      icon: Volume2,
      description: 'Let it echo into the void',
      color: 'lavender',
      gradient: 'from-lavender-500 to-purple-500'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6 relative overflow-hidden">
      {/* Background Effects */}
      {isReleasing && (
        <div className="absolute inset-0 z-0">
          {mode === 'burn' && (
            <div className="absolute inset-0 bg-gradient-to-t from-orange-900/20 to-transparent animate-pulse"></div>
          )}
          {mode === 'smash' && (
            <div className="absolute inset-0 bg-gradient-to-b from-red-900/20 to-transparent animate-bounce"></div>
          )}
          {mode === 'scream' && (
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-transparent animate-pulse"></div>
          )}
        </div>
      )}

      <div className="max-w-4xl mx-auto relative z-10">
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
        <Card className="amber-card p-4 mb-8 border-amber-500/20">
          <p className="text-center text-amber-300 text-sm">
            <Timer className="w-4 h-4 inline mr-2" />
            All entries auto-delete after 1 hour for your privacy
          </p>
        </Card>

        {/* Writing Area */}
        <Card className="apple-card p-8 mb-8">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write everything you want to destroy... your anger, frustration, pain. Let it all out."
            className="min-h-64 bg-transparent border-none text-lg resize-none focus:ring-0 text-white placeholder-gray-500"
            disabled={isReleasing}
          />
        </Card>

        {/* Release Modes */}
        {!isReleasing ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {modes.map((modeOption) => (
              <Card key={modeOption.id} className="apple-card p-6 hover:scale-105 transition-transform cursor-pointer group"
                    onClick={() => content.trim() && startRelease(modeOption.id)}>
                <div className="text-center space-y-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${modeOption.gradient} rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform`}>
                    <modeOption.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-medium text-gradient-white">{modeOption.name}</h3>
                  <p className="text-gray-400 text-sm">{modeOption.description}</p>
                  <Button
                    disabled={!content.trim()}
                    className={`w-full apple-button bg-gradient-to-r ${modeOption.gradient} text-white`}
                  >
                    Release
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="apple-card p-12 text-center">
            <div className="space-y-6">
              <div className={`w-24 h-24 bg-gradient-to-br ${modes.find(m => m.id === mode)?.gradient} rounded-full flex items-center justify-center mx-auto animate-bounce`}>
                {mode && (() => {
                  const ModeIcon = modes.find(m => m.id === mode)?.icon!;
                  return <ModeIcon className="w-12 h-12 text-white" />;
                })()}
              </div>
              <h2 className="text-2xl font-light text-gradient-white">
                {mode === 'burn' && 'Burning away your pain...'}
                {mode === 'smash' && 'Shattering your frustrations...'}
                {mode === 'scream' && 'Echoing into the void...'}
              </h2>
              <p className="text-gray-400">Let it go... you're free now.</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default LetItGo;
