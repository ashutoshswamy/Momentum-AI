'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { playChess } from '@/ai/flows/play-chess';
import { suggestMove } from '@/ai/flows/suggest-move';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Chessboard } from '@/components/chessboard';
import { Loader2, MoveRight, RotateCcw, Lightbulb } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

const initialBoard =
  'rnbqkbnr\n' +
  'pppppppp\n' +
  '........\n' +
  '........\n' +
  '........\n' +
  '........\n' +
  'PPPPPPPP\n' +
  'RNBQKBNR';

type HistoryItem = { user: string; gemini: string };

export function ChessAgent() {
  const [board, setBoard] = useState(initialBoard);
  const [move, setMove] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestionLoading, setSuggestionLoading] = useState(false);
  const { toast } = useToast();

  const handleReset = () => {
    setBoard(initialBoard);
    setMove('');
    setHistory([]);
    setGameOver(false);
    setWinner('');
    setLoading(false);
    setSuggestionLoading(false);
    toast({ title: 'Game Reset', description: 'A new game has started.' });
  };

  const handleSuggestMove = async () => {
    setSuggestionLoading(true);
    try {
      const response = await suggestMove({ currentBoard: board });
      toast({
        title: 'Suggested Move',
        description: (
          <div>
            <p className="font-bold">{response.suggestedMove}</p>
            <p>{response.reasoning}</p>
          </div>
        ),
        duration: 8000,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Suggestion Failed',
        description: 'Could not get a move suggestion at this time.',
        variant: 'destructive',
      });
    } finally {
      setSuggestionLoading(false);
    }
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!move.trim() || gameOver) return;

    setLoading(true);

    try {
      const response = await playChess({ move, currentBoard: board });
      setBoard(response.updatedBoard);
      setHistory([...history, { user: move, gemini: response.geminiMove }]);
      setMove('');
      if (response.gameOver) {
        setGameOver(true);
        setWinner(response.winner);
        toast({
          title: 'Game Over!',
          description: `Winner: ${response.winner}`,
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: 'Invalid Move',
        description: 'The AI determined that move is invalid. Please try another move.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12">
      <div className="lg:col-span-2">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Chess Game</CardTitle>
            <CardDescription>Enter your move in algebraic notation (e.g., e4, Nf3).</CardDescription>
          </CardHeader>
          <CardContent>
            <Chessboard boardState={board} />
          </CardContent>
          <CardFooter>
            <form onSubmit={handleSubmit} className="w-full flex flex-col sm:flex-row gap-2">
              <Input
                placeholder="Your move..."
                value={move}
                onChange={(e) => setMove(e.target.value)}
                disabled={loading || gameOver}
                className="font-code"
              />
              <Button type="submit" disabled={loading || gameOver}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <MoveRight className="h-4 w-4" />}
                <span className="ml-2">Play</span>
              </Button>
            </form>
          </CardFooter>
        </Card>
        {gameOver && (
          <div className="mt-4 p-4 rounded-lg bg-green-100 dark:bg-green-900 text-center">
            <h3 className="font-bold text-lg text-green-800 dark:text-green-200">Game Over!</h3>
            <p className="text-green-700 dark:text-green-300">Winner: {winner}</p>
          </div>
        )}
      </div>
      <div className="lg:col-span-1">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Game Info</CardTitle>
            <CardDescription>History of moves and game controls.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleSuggestMove}
                disabled={suggestionLoading || gameOver}
              >
                {suggestionLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lightbulb className="mr-2 h-4 w-4" />}
                Suggest Move
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="w-full">
                    <RotateCcw className="mr-2 h-4 w-4" /> Reset Game
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will reset the game board and clear all history. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleReset}>Reset Game</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Move History</h4>
              {history.length === 0 ? (
                <p className="text-sm text-muted-foreground">No moves made yet.</p>
              ) : (
                <div className="max-h-80 overflow-y-auto space-y-2 text-sm font-code pr-2">
                  {history.map((h, i) => (
                    <div key={i} className="flex justify-between p-2 rounded bg-secondary/50">
                      <span>{i + 1}. You: {h.user}</span>
                      <span>AI: {h.gemini}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
