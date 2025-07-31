import { CoderAgent } from '@/components/coder-agent';
import { PageHeader } from '@/components/page-header';

export default function CoderPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8 lg:p-12">
      <PageHeader title="Coder Agent" />
      <CoderAgent />
    </div>
  );
}
