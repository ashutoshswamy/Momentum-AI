'use client';

import { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { summarizeDocument } from '@/ai/flows/summarize-document';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, FileText, Upload, Clipboard } from 'lucide-react';
import { Markdown } from './markdown';

export function DocumentSummarizerAgent() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Basic validation for file type can be added here
      setSelectedFile(file);
      setFileName(file.name);
    }
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const toDataUri = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };
  
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
    if (!selectedFile) {
      toast({
        title: 'File is required',
        description: 'Please select a document to analyze.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    setResult('');

    try {
      const docDataUri = await toDataUri(selectedFile);
      const { summary } = await summarizeDocument({ docDataUri, prompt });
      setResult(summary);
    } catch (error) {
      console.error(error);
      toast({
        title: 'An error occurred',
        description: 'Failed to analyze the document. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Card>
          <CardContent className="pt-6">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf,.doc,.docx,.txt"
            />
            <Button type="button" variant="outline" onClick={handleFileClick} className="w-full">
              <Upload className="mr-2 h-4 w-4" />
              {fileName || 'Select a document (.pdf, .doc, .txt)'}
            </Button>
          </CardContent>
        </Card>

        <Textarea
          placeholder="Optional: Ask a specific question about the document..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={3}
          className="text-base sm:text-sm"
        />
        <Button type="submit" disabled={loading || !selectedFile} className="w-full sm:w-auto">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <FileText className="mr-2 h-4 w-4" />
              Analyze Document
            </>
          )}
        </Button>
      </form>

      {loading && (
        <Card>
          <CardHeader>
            <CardTitle>Analyzing your document...</CardTitle>
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
             <Markdown content={result} />
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
