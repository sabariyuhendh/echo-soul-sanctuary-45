
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Flame, Hammer, Volume2, Timer } from 'lucide-react';
import { Link } from 'react-router-dom';
import BurnMode from '@/components/BurnMode';
import SmashMode from '@/components/SmashMode';
import ScreamMode from '@/components/ScreamMode';

type ReleaseMode = 'burn' | 'smash' | 'scream';

const LetItGo = () => {
  const [mode, setMode] = useState<ReleaseMode | null>(null);
  const [content, setContent] = useState('');
  const [timeLeft, setTimeLeft] = useState(3600);

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

  const handleModeComplete = () => {
    setMode(null);
    setContent('');
  };

  const handleBackToSelection = () => {
    setMode(null);
  };

  // If a mode is active, render that mode's component
  if (mode === 'burn') {
    return (
      <BurnMode 
        content={content}
        onBack={handleBackToSelection}
        onComplete={handleModeComplete}
      />
    );
  }

  if (mode === 'smash') {
    return (
      <SmashMode 
        content={content}
        onBack={handleBackToSelection}
        onComplete={handleModeComplete}
      />
    );
  }

  if (mode === 'scream') {
    return (
      <ScreamMode 
        content={content}
        onBack={handleBackToSelection}
        onComplete={handleModeComplete}
      />
    );
  }

  const modes = [
    {
      id: 'burn' as ReleaseMode,
      name: 'Burn It',
      icon: Flame,
      description: 'Watch your words turn to ash with realistic fire effects',
      color: 'amber',
      gradient: 'from-amber-500 to-red-500',
      action: () => setMode('burn')
    },
    {
      id: 'smash' as ReleaseMode,
      name: 'Smash It',
      icon: Hammer,
      description: 'Destroy objects and unlock new targets as you progress',
      color: 'rose',
      gradient: 'from-rose-500 to-pink-500',
      action: () => setMode('smash')
    },
    {
      id: 'scream' as ReleaseMode,
      name: 'Scream It',
      icon: Volume2,
      description: 'Use your voice to shatter barriers with real-time audio',
      color: 'lavender',
      gradient: 'from-lavender-500 to-purple-500',
      action: () => setMode('scream')
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6 relative overflow-hidden">
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
        <Card className="apple-card p-8 mb-8 border-white/20">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write everything you want to release... your anger, frustration, pain. Choose how you want to let it go."
            className="min-h-64 bg-transparent border-none text-lg resize-none focus:ring-0 text-white placeholder-gray-500"
          />
        </Card>

        {/* Release Modes */}
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
                  Choose Mode
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LetItGo;
