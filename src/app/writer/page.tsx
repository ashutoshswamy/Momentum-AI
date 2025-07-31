import { WriterAgent } from '@/components/writer-agent';
import { PageHeader } from '@/components/page-header';

export default function WriterPage() {
  return (
    <div className="container mx-auto p-4 md:p-8 lg:p-12">
      <PageHeader title="Writer Agent" />
      <WriterAgent />
    </div>
  );
}
