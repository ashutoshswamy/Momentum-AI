'use server';
/**
 * @fileOverview An AI agent that analyzes content from a URL.
 *
 * - summarizeUrl - A function that handles the URL content analysis.
 * - SummarizeUrlInput - The input type for the summarizeUrl function.
 * - SummarizeUrlOutput - The return type for the summarizeUrl function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const getUrlContent = ai.defineTool(
  {
    name: 'getUrlContent',
    description: 'Fetches the text content from a given URL.',
    inputSchema: z.object({url: z.string().describe('The URL to fetch content from.')}),
    outputSchema: z.string().describe('The text content of the URL.'),
  },
  async ({url}) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        return `Error: Could not fetch URL. Status code: ${response.status}`;
      }
      // Very basic text extraction. A real implementation would use a library like Cheerio.
      const text = await response.text();
      return text.replace(/<[^>]*>/g, '').substring(0, 5000); // Limit to 5000 chars
    } catch (e: any) {
      return `Error: Failed to fetch content from the URL. ${e.message}`;
    }
  }
);

const SummarizeUrlInputSchema = z.object({
  url: z.string().url().describe('The URL to analyze.'),
  prompt: z
    .string()
    .optional()
    .describe('The prompt or question about the URL content.'),
});
export type SummarizeUrlInput = z.infer<typeof SummarizeUrlInputSchema>;

const SummarizeUrlOutputSchema = z.object({
  analysis: z.string().describe('The analysis or answer about the URL content.'),
});
export type SummarizeUrlOutput = z.infer<typeof SummarizeUrlOutputSchema>;

export async function summarizeUrl(input: SummarizeUrlInput): Promise<SummarizeUrlOutput> {
  return summarizeUrlFlow(input);
}

const summarizeUrlPrompt = ai.definePrompt({
  name: 'summarizeUrlPrompt',
  tools: [getUrlContent],
  input: {schema: SummarizeUrlInputSchema},
  output: {schema: SummarizeUrlOutputSchema},
  system:
    'You are an expert web content analyst. Your task is to use the provided tools to fetch content from a URL and answer the user\'s question based on that content. If the user does not provide a specific question, summarize the content of the URL.',
});

const summarizeUrlFlow = ai.defineFlow(
  {
    name: 'summarizeUrlFlow',
    inputSchema: SummarizeUrlInputSchema,
    outputSchema: SummarizeUrlOutputSchema,
  },
  async ({url, prompt}) => {
    const finalPrompt =
      prompt || 'Summarize the content of the provided URL.';
    const llmResponse = await ai.generate({
      prompt: `${finalPrompt} The URL is: ${url}`,
      model: 'googleai/gemini-2.5-flash',
      tools: [getUrlContent],
    });

    const output = llmResponse.output();
    if (typeof output === 'string') {
      return {analysis: output};
    }
    
    // Check for tool calls if direct output is not a string
    const toolCalls = llmResponse.toolCalls();
    if (toolCalls.length > 0) {
      // In a more complex scenario, you might handle multiple tool calls.
      // For this case, we assume the model returns text after the tool call is handled by Genkit.
      // The generate call handles tool execution automatically.
      const text = llmResponse.text();
      return {analysis: text};
    }
    
    const text = llmResponse.text();
    return {analysis: text};
  }
);
