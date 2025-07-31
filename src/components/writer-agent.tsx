'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { generateText } from '@/ai/flows/generate-text';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, PenSquare, Clipboard } from 'lucide-react';
import { Markdown } from './markdown';

export function WriterAgent() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result).then(() => {
      toast({ title: 'Text copied to clipboard!' });
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      toast({ title: 'Failed to copy', variant: 'destructive' });
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt.trim()) {
      toast({
        title: 'Prompt is required',
        description: 'Please enter a prompt to generate text.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    setResult('');

    try {
      const { text } = await generateText({ prompt });
      setResult(text);
    } catch (error) {
      console.error(error);
      toast({
        title: 'An error occurred',
        description: 'Failed to generate text. Please try again.',
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
          placeholder="e.g., Write a short story about a robot who discovers music."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={4}
          className="text-base sm:text-sm"
        />
        <Button type="submit" disabled={loading} className="w-full sm:w-auto">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <PenSquare className="mr-2 h-4 w-4" />
              Generate Text
            </>
          )}
        </Button>
      </form>

      {loading && (
        <Card>
          <CardHeader>
            <CardTitle>Generating your text...</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          </CardContent>
        </Card>
      )}

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Text</CardTitle>
          </CardHeader>
          <CardContent>
            <Markdown content={result} />
          </CardContent>
          <CardFooter>
            <Button onClick={handleCopy} variant="outline" className="w-full">
              <Clipboard className="mr-2 h-4 w-4" />
              Copy Text
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
