'use server';
/**
 * @fileOverview A chess move suggestion AI agent.
 *
 * - suggestMove - A function that suggests a chess move.
 * - SuggestMoveInput - The input type for the suggestMove function.
 * - SuggestMoveOutput - The return type for the suggestMove function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestMoveInputSchema = z.object({
  currentBoard: z.string().describe('A string representation of the current chess board.'),
  prompt: z.string().optional().describe('An optional prompt from the user for the type of move desired (e.g., "aggressive", "defensive").'),
});
export type SuggestMoveInput = z.infer<typeof SuggestMoveInputSchema>;

const SuggestMoveOutputSchema = z.object({
  suggestedMove: z.string().describe('The suggested move in algebraic notation.'),
  reasoning: z.string().describe('The reasoning behind the suggested move.'),
});
export type SuggestMoveOutput = z.infer<typeof SuggestMoveOutputSchema>;

export async function suggestMove(input: SuggestMoveInput): Promise<SuggestMoveOutput> {
  return suggestMoveFlow(input);
}

const suggestMovePrompt = ai.definePrompt({
  name: 'suggestMovePrompt',
  input: {schema: SuggestMoveInputSchema},
  output: {schema: SuggestMoveOutputSchema},
  prompt: `You are a chess grandmaster. The user, playing as White (uppercase pieces), needs a move suggestion.

Current Board State (FEN-like):
{{{currentBoard}}}

The user is looking for a move.
{{#if prompt}}
User's hint for the move type: {{{prompt}}}
{{/if}}

Analyze the position for White and suggest the best possible move in algebraic notation. Provide a brief explanation for your suggestion.`,
});

const suggestMoveFlow = ai.defineFlow(
  {
    name: 'suggestMoveFlow',
    inputSchema: SuggestMoveInputSchema,
    outputSchema: SuggestMoveOutputSchema,
  },
  async input => {
    const {output} = await suggestMovePrompt(input);
    return output!;
  }
);
