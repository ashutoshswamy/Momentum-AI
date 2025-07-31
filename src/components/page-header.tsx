import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function PageHeader({ title }: { title: string }) {
  return (
    <header className="flex items-center gap-4">
      <Button asChild variant="outline" size="icon" className="shrink-0">
        <Link href="/">
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Back to Home</span>
        </Link>
      </Button>
      <h1 className="text-2xl sm:text-3xl font-bold font-headline truncate">{title}</h1>
    </header>
  );
}
