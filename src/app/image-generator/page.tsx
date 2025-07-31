import { PageHeader } from '@/components/page-header';
import { ImageGeneratorAgent } from '@/components/image-generator-agent';

export default function ImageGeneratorPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto p-4 sm:p-6 md:p-8">
        <PageHeader title="Image Generator" />
        <ImageGeneratorAgent />
      </main>
    </div>
  );
}
