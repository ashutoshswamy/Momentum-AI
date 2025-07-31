'use server';
/**
 * @fileOverview A text generation AI agent.
 *
 * - generateText - A function that handles the text generation process.
 * - GenerateTextInput - The input type for the generateText function.
 * - GenerateTextOutput - The return type for the generateText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTextInputSchema = z.object({
  prompt: z.string().describe('The prompt to generate text from.'),
});
export type GenerateTextInput = z.infer<typeof GenerateTextInputSchema>;

const GenerateTextOutputSchema = z.object({
  text: z.string().describe('The generated text.'),
});
export type GenerateTextOutput = z.infer<typeof GenerateTextOutputSchema>;

export async function generateText(input: GenerateTextInput): Promise<GenerateTextOutput> {
  return generateTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTextPrompt',
  input: {schema: GenerateTextInputSchema},
  output: {schema: GenerateTextOutputSchema},
  prompt: `You are a creative writer. Generate text based on the following prompt: {{{prompt}}}`,
});

const generateTextFlow = ai.defineFlow(
  {
    name: 'generateTextFlow',
    inputSchema: GenerateTextInputSchema,
    outputSchema: GenerateTextOutputSchema,
  },
  async input => {
    const {text} = await ai.generate({
      prompt: `You are a creative writer. Generate text based on the following prompt: ${input.prompt}`,
      model: 'googleai/gemini-2.5-flash',
    });
    return {text: text!};
  }
);
