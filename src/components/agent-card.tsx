import Link from 'next/link';
import type { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface AgentCardProps {
  href: string;
  icon: ReactNode;
  title: string;
  description: string;
}

export function AgentCard({ href, icon, title, description }: AgentCardProps) {
  return (
    <Link href={href} className="group block">
      <Card className="h-full transition-all duration-300 ease-in-out bg-card/50 backdrop-blur-sm hover:bg-card/80 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 border-border/20 hover:border-primary/30">
        <CardHeader className="flex flex-row items-start gap-4">
          <div className="p-3 rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
          <div>
            <CardTitle className="font-bold text-lg">{title}</CardTitle>
            <CardDescription className="mt-1">{description}</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-end text-sm font-semibold text-primary/80 group-hover:text-primary transition-colors">
            Start Agent
            <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
