import { UrlSummarizerAgent } from '@/components/url-summarizer-agent';
import { PageHeader } from '@/components/page-header';

export default function UrlSummarizerPage() {
  return (
    <div className="container mx-auto p-4 md:p-8 lg:p-12">
      <PageHeader title="URL Summarizer" />
      <UrlSummarizerAgent />
    </div>
  );
}
