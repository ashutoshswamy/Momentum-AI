import { ImageGeneratorAgent } from '@/components/image-generator-agent';
import { PageHeader } from '@/components/page-header';

export default function ImageGeneratorPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8 lg:p-12">
      <PageHeader title="Image Generator" />
      <ImageGeneratorAgent />
    </div>
  );
}
