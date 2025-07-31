'use client';
import { AgentCard } from '@/components/agent-card';
import { PenSquare, Code, Image } from 'lucide-react';
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
];

export default function HomePage() {
  useEffect(() => {
    document.body.classList.add('home-page');
    return () => {
      document.body.classList.remove('home-page');
    };
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent/80">
          AgentVerse
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Your gateway to specialized AI agents. A modern, minimal interface to interact with powerful Gemini models. Choose an agent to begin your journey.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {agents.map((agent) => (
          <AgentCard key={agent.title} {...agent} />
        ))}
      </div>
    </main>
  );
}
