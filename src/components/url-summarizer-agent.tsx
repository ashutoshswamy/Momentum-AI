'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { summarizeUrl } from '@/ai/flows/summarize-url';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Link, Clipboard } from 'lucide-react';

export function UrlSummarizerAgent() {
  const [prompt, setPrompt] = useState('');
  const [url, setUrl] = useState('');
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
    if (!url.trim()) {
      toast({
        title: 'URL is required',
        description: 'Please enter a URL to analyze.',
        variant: 'destructive',
      });
      return;
    }

    try {
      // Basic URL validation
      new URL(url);
    } catch (_) {
      toast({
        title: 'Invalid URL',
        description: 'Please enter a valid URL.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    setResult('');

    try {
      const { analysis } = await summarizeUrl({ url, prompt });
      setResult(analysis);
    } catch (error) {
      console.error(error);
      toast({
        title: 'An error occurred',
        description: 'Failed to analyze the URL. Please check the URL and try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Enter a URL to analyze (e.g., https://example.com)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          type="url"
          className="text-base sm:text-sm"
        />
        <Textarea
          placeholder="Optional: Ask a specific question about the URL's content..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={3}
          className="text-base sm:text-sm"
        />
        <Button type="submit" disabled={loading} className="w-full sm:w-auto">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Link className="mr-2 h-4 w-4" />
              Analyze URL
            </>
          )}
        </Button>
      </form>

      {loading && (
        <Card>
          <CardHeader>
            <CardTitle>Analyzing URL content...</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          </CardContent>
        </Card>
      )}

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Analysis Result</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap text-foreground/90">{result}</p>
          </CardContent>
           <CardFooter>
            <Button onClick={handleCopy} variant="outline" className="w-full">
              <Clipboard className="mr-2 h-4 w-4" />
              Copy Result
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
