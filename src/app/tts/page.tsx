import { TtsAgent } from '@/components/tts-agent';
import { PageHeader } from '@/components/page-header';

export default function TtsPage() {
  return (
    <div className="container mx-auto p-4 md:p-8 lg:p-12">
      <PageHeader title="TTS Agent" />
      <TtsAgent />
    </div>
  );
}
