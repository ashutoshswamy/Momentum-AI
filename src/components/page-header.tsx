import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function PageHeader({ title }: { title: string }) {
  return (
    <div className="mb-8">
      <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight text-foreground">
        {title}
      </h1>
    </div>
  );
}
