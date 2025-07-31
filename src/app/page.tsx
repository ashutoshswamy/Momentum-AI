import { AgentCard } from '@/components/agent-card';
import { PenSquare, Code, Image } from 'lucide-react';

const agents = [
  {
    href: '/writer',
    icon: <PenSquare className="w-12 h-12" />,
    title: 'Writer Agent',
    description: 'Generate creative text, from poems to stories.',
  },
  {
    href: '/coder',
    icon: <Code className="w-12 h-12" />,
    title: 'Coder Agent',
    description: 'Get help with code snippets in any language.',
  },
  {
    href: '/image-generator',
    icon: <Image className="w-12 h-12" />,
    title: 'Image Generator',
    description: 'Create stunning visuals from text prompts.',
  },
];

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-5xl md:text-6xl font-bold font-headline tracking-tight text-primary">
          AgentVerse
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Your gateway to specialized AI agents. A modern, minimal interface to interact with powerful Gemini models. Choose an agent to begin your journey.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {agents.map((agent) => (
          <AgentCard key={agent.title} {...agent} />
        ))}
      </div>
    </main>
  );
}
