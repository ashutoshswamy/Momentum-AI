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
    <Link href={href} className="group">
      <Card className="h-full transition-all duration-300 ease-in-out hover:shadow-lg hover:border-primary/50 hover:-translate-y-1">
        <CardHeader className="flex flex-col items-center text-center">
          <div className="p-4 rounded-full bg-primary/10 text-primary mb-4">
            {icon}
          </div>
          <CardTitle className="font-headline">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center text-sm font-medium text-primary">
            Start Agent
            <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
