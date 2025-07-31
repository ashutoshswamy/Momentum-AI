'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Clipboard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CodeBlockProps {
  code: string;
}

export function CodeBlock({ code }: CodeBlockProps) {
  const [hasCopied, setHasCopied] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      setHasCopied(true);
      toast({ title: 'Copied to clipboard!' });
      setTimeout(() => setHasCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      toast({ title: 'Failed to copy', variant: 'destructive' });
    });
  };

  return (
    <div className="relative group">
      <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto font-code text-sm">
        <code>{code}</code>
      </pre>
      <Button
        size="icon"
        variant="ghost"
        className="absolute top-2 right-2 h-8 w-8 text-gray-300 hover:text-white hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={copyToClipboard}
      >
        {hasCopied ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
        <span className="sr-only">Copy code</span>
      </Button>
    </div>
  );
}
