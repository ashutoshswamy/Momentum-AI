// PlayChess Flow
//
// This flow allows a user to play chess against the Gemini API, displaying the updated game board after each move.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChessInputSchema = z.object({
  move: z.string().describe('The move the user wants to make in algebraic notation.'),
  currentBoard: z.string().describe('A string representation of the current chess board.'),
});

export type ChessInput = z.infer<typeof ChessInputSchema>;

const ChessOutputSchema = z.object({
  updatedBoard: z.string().describe('A string representation of the updated chess board after the move.'),
  geminiMove: z.string().describe('The move Gemini made in response.'),
  gameOver: z.boolean().describe('Whether the game is over.'),
  winner: z.string().describe('If the game is over, who won?'),
});

export type ChessOutput = z.infer<typeof ChessOutputSchema>;

export async function playChess(input: ChessInput): Promise<ChessOutput> {
  return playChessFlow(input);
}

const chessPrompt = ai.definePrompt({
  name: 'chessPrompt',
  input: {schema: ChessInputSchema},
  output: {schema: ChessOutputSchema},
  prompt: `You are a chess master. The user is playing a game of chess against you.

  Here is the current board state:
  {{{currentBoard}}}

  The user has just made the move: {{{move}}}

  What is your move? Respond with the updated board state, your move, is the game over and the winner if any.

  Output in the following JSON format:
  {
    "updatedBoard": "string",
    "geminiMove": "string",
    "gameOver": "boolean",
    "winner": "string",
  }
  `,
});

const playChessFlow = ai.defineFlow(
  {
    name: 'playChessFlow',
    inputSchema: ChessInputSchema,
    outputSchema: ChessOutputSchema,
  },
  async input => {
    const {output} = await chessPrompt(input);
    return output!;
  }
);
