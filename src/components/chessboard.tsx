interface ChessboardProps {
  boardState: string;
}

const pieceMap: { [key: string]: string } = {
  p: '♙', r: '♖', n: '♘', b: '♗', q: '♕', k: '♔',
  P: '♟︎', R: '♜', N: '♞', B: '♝', Q: '♛', K: '♚',
  '.': '',
};

export function Chessboard({ boardState }: ChessboardProps) {
  const rows = boardState.split('\n');

  return (
    <div className="aspect-square w-full max-w-lg mx-auto grid grid-cols-8 shadow-lg border-2 border-gray-300 dark:border-gray-600">
      {rows.map((row, rowIndex) =>
        row.split('').map((piece, colIndex) => {
          const isDark = (rowIndex + colIndex) % 2 !== 0;
          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`flex items-center justify-center aspect-square ${
                isDark ? 'bg-primary/40' : 'bg-primary/10'
              }`}
            >
              <span className="text-4xl md:text-5xl drop-shadow-sm" style={{ color: piece === piece.toLowerCase() ? '#111827' : '#f9fafb' }}>
                {pieceMap[piece]}
              </span>
            </div>
          );
        })
      )}
    </div>
  );
}
