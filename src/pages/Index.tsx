
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, MessageCircle, BookOpen, Mic, TrendingUp, Sparkles, Shield, Clock } from 'lucide-react';

const Index = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    {
      icon: BookOpen,
      title: "Vault",
      description: "8-minute timed emotional release sessions in your private space",
      gradient: "from-soul-400 to-soul-600",
      color: "text-soul-400"
    },
    {
      icon: MessageCircle,
      title: "Letters You'll Never Send",
      description: "Write and stylize emotional letters with AI assistance",
      gradient: "from-echo-400 to-echo-600",
      color: "text-echo-400"
    },
    {
      icon: Sparkles,
      title: "Let-It-Go Room",
      description: "Interactive emotional release through virtual destruction",
      gradient: "from-warmth-400 to-warmth-600",
      color: "text-warmth-400"
    },
    {
      icon: TrendingUp,
      title: "Mood Tracking",
      description: "Daily mood logging with insights and trend analysis",
      gradient: "from-healing-400 to-healing-600",
      color: "text-healing-400"
    },
    {
      icon: Mic,
      title: "WhisperBox",
      description: "Voice diary for private audio reflections and thoughts",
      gradient: "from-soul-500 to-echo-500",
      color: "text-soul-500"
    },
    {
      icon: Heart,
      title: "AI Soulmate",
      description: "Mood-aware AI companion for emotional support",
      gradient: "from-echo-500 to-warmth-500",
      color: "text-echo-500"
    }
  ];

  const values = [
    {
      icon: Shield,
      title: "Complete Privacy",
      description: "Your emotions are yours alone. Anonymous usage and secure storage."
    },
    {
      icon: Heart,
      title: "Emotional Safety",
      description: "A judgment-free space designed specifically for teen emotional wellness."
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Access your emotional toolkit anytime, anywhere you need it."
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 bg-soul-400 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-echo-400 rounded-full blur-xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-healing-400 rounded-full blur-xl animate-float" style={{animationDelay: '4s'}}></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-warmth-400 rounded-full blur-xl animate-float" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="p-6 glass-dark rounded-b-3xl mx-4 mt-4 mb-8">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-soul-400 to-echo-400 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white text-glow">EchoSoul</h1>
            </div>
            <Button className="bg-gradient-to-r from-soul-500 to-echo-500 hover:from-soul-600 hover:to-echo-600 text-white border-0 emotional-shadow hover-lift">
              Get Started
            </Button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="px-6 py-12 text-center max-w-6xl mx-auto">
          <div className={`transition-all duration-1000 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 text-glow">
              Your Safe Space for
              <span className="block bg-gradient-to-r from-soul-300 via-echo-300 to-healing-300 bg-clip-text text-transparent">
                Emotional Wellness
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              A private sanctuary designed for teens to process emotions, find peace, 
              and grow through various therapeutic tools and AI-powered support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-gradient-to-r from-soul-500 to-echo-500 hover:from-soul-600 hover:to-echo-600 text-white px-8 py-4 text-lg border-0 emotional-shadow hover-lift">
                Start Your Journey
              </Button>
              <Button variant="outline" size="lg" className="glass text-white border-white/30 hover:bg-white/10 px-8 py-4 text-lg hover-lift">
                Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="px-6 py-16 max-w-7xl mx-auto">
          <div className={`transition-all duration-1000 delay-300 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h3 className="text-4xl font-bold text-white text-center mb-4 text-glow">
              Emotional Wellness Tools
            </h3>
            <p className="text-xl text-white/70 text-center mb-12 max-w-2xl mx-auto">
              Six powerful tools designed to help you navigate your emotional journey
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card 
                  key={feature.title} 
                  className={`glass-dark border-white/20 p-6 hover-lift transition-all duration-500 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}
                  style={{animationDelay: `${600 + index * 100}ms`}}
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-4 animate-pulse-glow`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-3">{feature.title}</h4>
                  <p className="text-white/70 leading-relaxed">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="px-6 py-16 max-w-6xl mx-auto">
          <div className={`transition-all duration-1000 delay-700 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h3 className="text-4xl font-bold text-white text-center mb-4 text-glow">
              Built with Care
            </h3>
            <p className="text-xl text-white/70 text-center mb-12 max-w-2xl mx-auto">
              Every feature is designed with your emotional safety and privacy in mind
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div 
                  key={value.title}
                  className={`text-center transition-all duration-500 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}
                  style={{animationDelay: `${900 + index * 150}ms`}}
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-soul-400 to-echo-400 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-3">{value.title}</h4>
                  <p className="text-white/70 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-16 max-w-4xl mx-auto text-center">
          <div className={`glass-dark rounded-3xl p-12 transition-all duration-1000 delay-1000 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 text-glow">
              Ready to Begin Your Emotional Wellness Journey?
            </h3>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Join thousands of teens who have found peace, healing, and growth through EchoSoul.
              Your emotional wellness matters, and you deserve a safe space to grow.
            </p>
            <Button size="lg" className="bg-gradient-to-r from-soul-500 to-echo-500 hover:from-soul-600 hover:to-echo-600 text-white px-12 py-4 text-lg border-0 emotional-shadow hover-lift">
              Start Free Today
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 py-8 mt-16">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-soul-400 to-echo-400 rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <span className="text-white/80 text-lg">EchoSoul</span>
            </div>
            <p className="text-white/60">
              Your emotional wellness, your rules, your safe space.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
