import { PageHeader } from '@/components/page-header';
import { ChessAgent } from '@/components/chess-agent';

export default function ChessPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto p-4 sm:p-6 md:p-8">
        <PageHeader title="Chess Player" />
        <ChessAgent />
      </main>
    </div>
  );
}
