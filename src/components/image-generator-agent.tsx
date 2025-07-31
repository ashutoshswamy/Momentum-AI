'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { generateImage } from '@/ai/flows/generate-image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2, Image as ImageIcon } from 'lucide-react';

export function ImageGeneratorAgent() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt.trim()) {
      toast({
        title: 'Prompt is required',
        description: 'Please enter a prompt to generate an image.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    setImageUrl('');

    try {
      const { image } = await generateImage({ prompt });
      setImageUrl(image);
    } catch (error) {
      console.error(error);
      toast({
        title: 'An error occurred',
        description: 'Failed to generate image. Please try again.',
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
          placeholder="e.g., A photorealistic image of an astronaut riding a horse on Mars"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="text-base"
        />
        <Button type="submit" disabled={loading} className="w-full sm:w-auto">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <ImageIcon className="mr-2 h-4 w-4" />
              Generate Image
            </>
          )}
        </Button>
      </form>

      {(loading || imageUrl) && (
        <Card>
          <CardHeader>
            <CardTitle>{loading ? 'Generating your image...' : 'Generated Image'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-square relative w-full max-w-lg mx-auto bg-muted rounded-lg overflow-hidden">
              {loading && <Skeleton className="w-full h-full" />}
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt={prompt}
                  fill
                  className="object-contain"
                  data-ai-hint="generated image"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
