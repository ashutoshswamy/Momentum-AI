import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function PageHeader({ title }: { title: string }) {
  return (
    <div className="mb-8 flex justify-between items-center">
      <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight text-foreground">
        {title}
      </h1>
      <Button asChild variant="outline" size="icon">
        <Link href="/">
          <Home className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}
