'use server';
/**
 * @fileOverview An AI agent that analyzes content from a URL using native URL fetching.
 *
 * - summarizeUrl - A function that handles the URL content analysis.
 * - SummarizeUrlInput - The input type for the summarizeUrl function.
 * - SummarizeUrlOutput - The return type for the summarizeUrl function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

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

const summarizeUrlFlow = ai.defineFlow(
  {
    name: 'summarizeUrlFlow',
    inputSchema: SummarizeUrlInputSchema,
    outputSchema: SummarizeUrlOutputSchema,
  },
  async ({url, prompt}) => {
    const userPrompt =
      prompt ||
      `Provide a detailed and well-formatted summary of the content at the following URL. Use headings, bullet points, and bold text to structure the information clearly. Extract key takeaways and present them at the end.`;

    const llmResponse = await ai.generate({
      prompt: `${userPrompt} URL: ${url}`,
      model: 'googleai/gemini-2.5-flash',
      config: {
        tools: [{urlContext: {}}],
      },
    });

    const text = llmResponse.text;
    return {analysis: text};
  }
);
