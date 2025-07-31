'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { generateCode } from '@/ai/flows/generate-code';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/code-block';
import { Loader2, Code } from 'lucide-react';

export function CoderAgent() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt.trim()) {
      toast({
        title: 'Prompt is required',
        description: 'Please enter a prompt to generate code.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    setResult('');

    try {
      const { code } = await generateCode({ prompt });
      setResult(code);
    } catch (error) {
      console.error(error);
      toast({
        title: 'An error occurred',
        description: 'Failed to generate code. Please try again.',
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
          placeholder="e.g., Create a React component for a button."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={4}
          className="text-base font-code"
        />
        <Button type="submit" disabled={loading} className="w-full sm:w-auto">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Code className="mr-2 h-4 w-4" />
              Generate Code
            </>
          )}
        </Button>
      </form>

      {loading && (
        <Card>
          <CardHeader>
            <CardTitle>Generating your code...</CardTitle>
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
            <CardTitle>Generated Code</CardTitle>
          </CardHeader>
          <CardContent>
            <CodeBlock code={result} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
