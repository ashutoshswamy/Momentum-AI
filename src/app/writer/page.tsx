import { PageHeader } from '@/components/page-header';
import { WriterAgent } from '@/components/writer-agent';

export default function WriterPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto p-4 sm:p-6 md:p-8">
        <PageHeader title="Writer Agent" />
        <WriterAgent />
      </main>
    </div>
  );
}
