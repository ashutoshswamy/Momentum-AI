'use client';
import { AgentCard } from '@/components/agent-card';
import { PenSquare, Code, Image, BotMessageSquare, Sparkles, BrainCircuit, MousePointerClick, TrendingUp, Zap, Palette, ChessRook } from 'lucide-react';
import { useEffect } from 'react';

const agents = [
  {
    href: '/writer',
    icon: <PenSquare className="w-8 h-8" />,
    title: 'Writer Agent',
    description: 'Generate creative text, from poems to stories.',
  },
  {
    href: '/coder',
    icon: <Code className="w-8 h-8" />,
    title: 'Coder Agent',
    description: 'Get help with code snippets in any language.',
  },
  {
    href: '/image-generator',
    icon: <Image className="w-8 h-8" />,
    title: 'Image Generator',
    description: 'Create stunning visuals from text prompts.',
  },
  {
    href: '/chess',
    icon: <ChessRook className="w-8 h-8" />,
    title: 'Chess Agent',
    description: 'Play chess against an AI grandmaster.',
  }
];

const features = [
  {
    icon: <BotMessageSquare className="w-8 h-8 text-primary" />,
    title: 'Specialized Agents',
    description: 'Access a variety of AI agents, each tailored for specific tasks like writing, coding, and image generation.'
  },
  {
    icon: <Sparkles className="w-8 h-8 text-primary" />,
    title: 'Modern Interface',
    description: 'A clean, minimal, and responsive user interface designed for a seamless user experience.'
  },
  {
    icon: <BrainCircuit className="w-8 h-8 text-primary" />,
    title: 'Powered by Gemini',
    description: 'Leverages Google\'s powerful Gemini models to provide high-quality, creative, and intelligent responses.'
  },
  {
    icon: <MousePointerClick className="w-8 h-8 text-primary" />,
    title: 'Easy to Use',
    description: 'Start generating content with just a few clicks. No complex setup required.'
  }
]

const advantages = [
    {
        icon: <TrendingUp className="w-10 h-10 text-primary" />,
        title: 'Boost Productivity',
        description: 'Accelerate your creative and technical workflows by delegating tasks to specialized AI agents, saving you time and effort.'
    },
    {
        icon: <Palette className="w-10 h-10 text-primary" />,
        title: 'Unlock Creativity',
        description: 'Overcome creative blocks and explore new ideas with AI-powered suggestions for writing, coding, and visual design.'
    },
    {
        icon: <Zap className="w-10 h-10 text-primary" />,
        title: 'Streamline Your Workflow',
        description: 'A single platform for diverse AI needs. Switch between writing, coding, and image generation without changing your context.'
    }
]

export default function HomePage() {
  useEffect(() => {
    document.body.classList.add('home-page');
    return () => {
      document.body.classList.remove('home-page');
    };
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8">
      <div className="text-center max-w-3xl mx-auto my-16">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent/80">
          Momentum AI
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Your gateway to specialized AI agents. A modern, minimal interface to interact with powerful Gemini models. Choose an agent to begin your journey.
        </p>
      </div>
      
      <section id="features" className="w-full max-w-5xl mx-auto py-16">
        <div className="text-center mb-12">
            <h2 className="text-4xl font-bold tracking-tight">Features</h2>
            <p className="mt-2 text-lg text-muted-foreground">Everything you need to be productive.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map(feature => (
                <div key={feature.title} className="text-center p-6 bg-card/50 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-primary/10 transition-shadow">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mx-auto mb-4">
                        {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="mt-2 text-muted-foreground">{feature.description}</p>
                </div>
            ))}
        </div>
      </section>

      <section id="advantages" className="w-full max-w-5xl mx-auto py-16">
          <div className="text-center mb-12">
              <h2 className="text-4xl font-bold tracking-tight">Advantages</h2>
              <p className="mt-2 text-lg text-muted-foreground">Why you'll love Momentum AI.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {advantages.map(advantage => (
                  <div key={advantage.title} className="flex flex-col items-center text-center">
                      {advantage.icon}
                      <h3 className="mt-6 text-2xl font-bold">{advantage.title}</h3>
                      <p className="mt-4 text-muted-foreground">{advantage.description}</p>
                  </div>
              ))}
          </div>
      </section>

      <section id="agents" className="w-full max-w-5xl mx-auto py-16">
        <div className="text-center mb-12">
            <h2 className="text-4xl font-bold tracking-tight">Choose Your Agent</h2>
            <p className="mt-2 text-lg text-muted-foreground">Start creating with a specialized AI.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {agents.map((agent) => (
            <AgentCard key={agent.title} {...agent} />
            ))}
        </div>
      </section>
    </main>
  );
}
