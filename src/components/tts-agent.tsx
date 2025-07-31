'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { generateSpeech } from '@/ai/flows/generate-tts';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Volume2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const voices = [
  'Zephyr', 'Puck', 'Charon', 'Kore', 'Fenrir', 'Leda', 'Orus', 'Aoede', 'Callirrhoe',
  'Autonoe', 'Enceladus', 'Iapetus', 'Umbriel', 'Algieba', 'Despina', 'Erinome',
  'Algenib', 'Rasalgethi', 'Laomedeia', 'Achernar', 'Alnilam', 'Schedar', 'Gacrux',
  'Pulcherrima', 'Achird', 'Zubenelgenubi', 'Vindemiatrix', 'Sadachbia', 'Sadaltager', 'Sulafat'
];


export function TtsAgent() {
  const [prompt, setPrompt] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState('Algenib');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt.trim()) {
      toast({
        title: 'Prompt is required',
        description: 'Please enter text to generate speech.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    setAudioUrl('');

    try {
      const { audio } = await generateSpeech({ text: prompt, voice: selectedVoice });
      setAudioUrl(audio);
    } catch (error) {
      console.error(error);
      toast({
        title: 'An error occurred',
        description: 'Failed to generate speech. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          placeholder="e.g., Hello, world! This is a test of the text-to-speech agent."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={4}
          className="text-base sm:text-sm"
        />
        <div className="flex flex-col sm:flex-row gap-4">
          <Select onValueChange={setSelectedVoice} defaultValue={selectedVoice}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Select a voice" />
            </SelectTrigger>
            <SelectContent>
              {voices.map((voice) => (
                <SelectItem key={voice} value={voice}>{voice}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button type="submit" disabled={loading} className="w-full sm:w-auto">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Volume2 className="mr-2 h-4 w-4" />
                Generate Speech
              </>
            )}
          </Button>
        </div>
      </form>

      {loading && (
        <Card>
          <CardHeader>
            <CardTitle>Generating your audio...</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center items-center py-12">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          </CardContent>
        </Card>
      )}

      {audioUrl && (
         <Card>
          <CardHeader>
            <CardTitle>Generated Speech</CardTitle>
          </CardHeader>
          <CardContent>
            <audio controls src={audioUrl} className="w-full">
                Your browser does not support the audio element.
            </audio>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
