
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Hammer, ArrowLeft, Trophy, Target } from 'lucide-react';

interface SmashModeProps {
  content: string;
  onBack: () => void;
  onComplete: () => void;
}

interface SmashableObject {
  id: string;
  name: string;
  emoji: string;
  points: number;
  unlockLevel: number;
  color: string;
}

const SmashMode = ({ content, onBack, onComplete }: SmashModeProps) => {
  const [smashCount, setSmashCount] = useState(0);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [currentObjects, setCurrentObjects] = useState<SmashableObject[]>([]);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number}>>([]);

  const smashableObjects: SmashableObject[] = [
    { id: 'plate', name: 'Plate', emoji: '🍽️', points: 10, unlockLevel: 1, color: 'from-blue-500 to-cyan-500' },
    { id: 'brick', name: 'Brick', emoji: '🧱', points: 15, unlockLevel: 1, color: 'from-red-500 to-orange-500' },
    { id: 'phone', name: 'Phone', emoji: '📱', points: 25, unlockLevel: 2, color: 'from-gray-500 to-slate-600' },
    { id: 'window', name: 'Window', emoji: '🪟', points: 30, unlockLevel: 3, color: 'from-cyan-500 to-blue-600' },
    { id: 'photo', name: 'Photo Frame', emoji: '📸', points: 40, unlockLevel: 4, color: 'from-purple-500 to-pink-500' },
    { id: 'mask', name: 'Mask', emoji: '🎭', points: 50, unlockLevel: 5, color: 'from-indigo-500 to-purple-600' },
  ];

  useEffect(() => {
    const availableObjects = smashableObjects.filter(obj => obj.unlockLevel <= level);
    setCurrentObjects(availableObjects.slice(0, 6));
  }, [level]);

  useEffect(() => {
    if (score >= 100 && level < 2) setLevel(2);
    if (score >= 250 && level < 3) setLevel(3);
    if (score >= 500 && level < 4) setLevel(4);
    if (score >= 800 && level < 5) setLevel(5);
  }, [score, level]);

  const smashObject = (obj: SmashableObject, index: number) => {
    setSmashCount(prev => prev + 1);
    setScore(prev => prev + obj.points);

    // Create particle effect
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: (index % 3) * 33 + 16 + Math.random() * 10,
      y: Math.floor(index / 3) * 25 + 15 + Math.random() * 10
    }));
    
    setParticles(prev => [...prev, ...newParticles]);

    // Remove particles after animation
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.some(np => np.id === p.id)));
    }, 1000);

    // Check for completion
    if (smashCount >= 19) {
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  };

  const progress = (smashCount / 20) * 100;

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Particle Effects */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 bg-white animate-ping pointer-events-none z-50"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDuration: '1s'
          }}
        />
      ))}

      {/* Smash Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/30 to-slate-800/20"></div>
        {[...Array(smashCount * 2)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: '0.5s'
            }}
          />
        ))}
      </div>

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
          <h1 className="text-3xl font-light text-gradient-rose">Smash Mode</h1>
          <div className="w-20"></div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="apple-card p-4 text-center border-white/20">
            <Trophy className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
            <div className="text-xl font-bold text-yellow-400">{score}</div>
            <div className="text-sm text-gray-400">Score</div>
          </Card>
          <Card className="apple-card p-4 text-center border-white/20">
            <Target className="w-6 h-6 mx-auto mb-2 text-rose-400" />
            <div className="text-xl font-bold text-rose-400">{smashCount}/20</div>
            <div className="text-sm text-gray-400">Smashed</div>
          </Card>
          <Card className="apple-card p-4 text-center border-white/20">
            <Hammer className="w-6 h-6 mx-auto mb-2 text-purple-400" />
            <div className="text-xl font-bold text-purple-400">Level {level}</div>
            <div className="text-sm text-gray-400">Unlocked</div>
          </Card>
        </div>

        {/* Progress Bar */}
        <Card className="apple-card p-6 mb-8 border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Emotional Release Progress</h3>
            <span className="text-sm text-gray-400">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-4">
            <div 
              className="bg-gradient-to-r from-rose-500 to-pink-500 h-4 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </Card>

        {/* Smashable Objects Grid */}
        <Card className="apple-card p-8 border-white/20">
          <h3 className="text-xl font-medium mb-6 text-center">Choose Your Target</h3>
          <div className="grid grid-cols-3 gap-4">
            {currentObjects.map((obj, index) => (
              <div
                key={obj.id}
                onClick={() => smashObject(obj, index)}
                className="relative cursor-pointer group transform transition-transform hover:scale-110 active:scale-95"
              >
                <div className={`w-full h-24 bg-gradient-to-br ${obj.color} rounded-lg flex flex-col items-center justify-center p-4 border-2 border-white/20 hover:border-white/40 transition-all`}>
                  <div className="text-3xl mb-1">{obj.emoji}</div>
                  <div className="text-xs text-white/80">{obj.name}</div>
                  <div className="text-xs text-yellow-300">+{obj.points}</div>
                </div>
                
                {/* Unlock indicator */}
                {obj.unlockLevel > 1 && obj.unlockLevel === level && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-black text-xs font-bold animate-pulse">
                    !
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Tap objects to smash them and release your frustration
            </p>
            {level < 5 && (
              <p className="text-yellow-400 text-xs mt-2">
                Score {level === 1 ? '100' : level === 2 ? '250' : level === 3 ? '500' : '800'} points to unlock new objects!
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SmashMode;
