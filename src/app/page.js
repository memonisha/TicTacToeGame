'use client';
import { useState, useEffect } from 'react';

const initialBoard = Array(9).fill(null);

export default function HomePage() {
  const [board, setBoard] = useState(initialBoard);
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);

  const clickSound = typeof Audio !== "undefined" ? new Audio('/click.mp3') : null;
  const winSound = typeof Audio !== "undefined" ? new Audio('/win.mp3') : null;
  const drawSound = typeof Audio !== "undefined" ? new Audio('/draw.mp3') : null;

  const currentPlayer = xIsNext ? 'X' : 'O';

  useEffect(() => {
    const win = calculateWinner(board);
    setWinner(win);
    if (win) {
      winSound?.play();
    } else if (!win && board.every(cell => cell !== null)) {
      setIsDraw(true);
      drawSound?.play();
    }
  }, [board]);

  const handleClick = (index) => {
    if (board[index] || winner || isDraw) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setXIsNext(!xIsNext);
    clickSound?.play();
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setXIsNext(true);
    setWinner(null);
    setIsDraw(false);
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url("https://raw.githubusercontent.com/UploaderVincent/Kwitter/refs/heads/main/bubble.svg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        fontFamily: 'Comic sans ms'
      }}
    >
      <div style={{
        backgroundColor: 'rgba(106, 104, 158, 0.9)',
        padding: 40,
        borderRadius: 12,
        textAlign: 'center',
        boxShadow: '0 8px 16px rgba(0,0,0,0.3)'
      }}>
        <h1 style={{ fontSize: 40, marginBottom: 10, color: '#fff' }}>Tic-Tac-Toe</h1>
        <p style={{ fontSize: 18, marginBottom: 30,color: 'yellow' }}>
          Take turns playing as <strong>X</strong> and <strong>O</strong>. First to get 3 in a row wins!
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 100px)',
          gap: 10,
          justifyContent: 'center',
          marginBottom: 30
        }}>
          {board.map((cell, idx) => (
            <div
              key={idx}
              onClick={() => handleClick(idx)}
              style={{
                width: 100,
                height: 100,
                backgroundColor: '#f0f0f0',
                border: '2px solid #333',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 32,
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              {cell}
            </div>
          ))}
        </div>

        <h2 style={{ marginBottom: 10, color: '#fff', fontSize: 24}}>
          {winner
            ? `🎉 Player ${winner} Wins!`
            : isDraw
              ? `🤝 It's a Draw!`
              : `Next Turn: Player ${currentPlayer}`}
        </h2>

        <button
          onClick={resetGame}
          style={{
            padding: '10px 20px',
            fontSize: 16,
            backgroundColor: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: 5,
            cursor: 'pointer'
          }}
        >
          Restart Game
        </button>
      </div>
    </main>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
