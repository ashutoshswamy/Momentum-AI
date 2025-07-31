import { DocumentSummarizerAgent } from '@/components/document-summarizer-agent';
import { PageHeader } from '@/components/page-header';

export default function DocumentSummarizerPage() {
  return (
    <div className="container mx-auto p-4 md:p-8 lg:p-12">
      <PageHeader title="Document Summarizer" />
      <DocumentSummarizerAgent />
    </div>
  );
}
