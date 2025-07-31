import { PageHeader } from '@/components/page-header';
import { CoderAgent } from '@/components/coder-agent';

export default function CoderPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto p-4 sm:p-6 md:p-8">
        <PageHeader title="Coder Agent" />
        <CoderAgent />
      </main>
    </div>
  );
}
