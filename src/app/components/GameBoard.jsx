import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cell from "./Cell";
import Timer from "./Timer";

export default function GameBoard({ size, stopTimer, resetBoard }) {
  const [board, setBoard] = useState(
    Array(size)
      .fill(null)
      .map(() => Array(size).fill(false))
  );
  const [invalidCell, setInvalidCell] = useState(null);
  const [solved, setSolved] = useState(false);
  const [startTime, setStartTime] = useState(null); 
  const [timerStarted, setTimerStarted] = useState(false); 
  const [timeTaken, setTimeTaken] = useState(null); 

  useEffect(() => {
    setBoard(
      Array(size)
        .fill(null)
        .map(() => Array(size).fill(false))
    );
    setSolved(false);
    setInvalidCell(null);
    setStartTime(null);
    setTimerStarted(false); 
    setTimeTaken(null); 
  }, [size]);

  const isSafe = (row, col) => {
    
    for (let i = 0; i < row; i++) {
      if (board[i][col]) return false; 
    }
    if (board[row].some((cell) => cell)) return false; 

    
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j]) return false;
    }
    for (let i = row - 1, j = col + 1; i >= 0 && j < size; i--, j++) {
      if (board[i][j]) return false;
    }

    return true;
  };

  const toggleQueen = (row, col) => {
    if (solved) {
      toast.info("The game is already solved!", { position: "top-center" });
      return;
    }

    if (!board[row][col] && !isSafe(row, col)) {
      setInvalidCell([row, col]);
      toast.error("Invalid move! This queen will be attacked.", {
        position: "top-center",
      });
      setTimeout(() => setInvalidCell(null), 1000);
      return;
    }

    
    if (!timerStarted) {
      setStartTime(Date.now()); 
      setTimerStarted(true); 
    }

    const newBoard = board.map((r, i) =>
      r.map((cell, j) => (i === row && j === col ? !cell : cell))
    );
    setBoard(newBoard);
    checkSolution(newBoard);
  };

  const checkSolution = (board) => {
    const queens = board.flat().filter((cell) => cell).length;
    if (queens === size) {
      setSolved(true);
      setTimeTaken(Date.now() - startTime); 
      stopTimer();
      toast.success("🎉 Congratulations! You solved the puzzle!", {
        position: "top-center",
      });
    }
  };

  const resetGame = () => {
    setBoard(
      Array(size)
        .fill(null)
        .map(() => Array(size).fill(false))
    );
    setSolved(false);
    setInvalidCell(null);
    setStartTime(null);
    setTimerStarted(false); 
    setTimeTaken(null); 
  };

  const handleBackToSizeSelection = () => {
    resetBoard(); 
  };

  return (
    <div className="space-y-4">
      {solved && (
        <h2 className="text-green-600 font-bold text-xl">🎉 You Solved It!</h2>
      )}
      <div
        className="grid gap-1"
        style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
      >
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              isQueen={cell}
              isInvalid={
                invalidCell &&
                invalidCell[0] === rowIndex &&
                invalidCell[1] === colIndex
              }
              onClick={() => toggleQueen(rowIndex, colIndex)}
            />
          ))
        )}
      </div>
      <div className="space-x-4 mt-4">
        <button
          className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          onClick={resetGame}
        >
          Reset
        </button>
        <button
          className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
          onClick={handleBackToSizeSelection}
        >
          Back to Board Size
        </button>
      </div>

      {/* Timer Component */}
      {(timerStarted || solved) && (
        <Timer
          startTime={startTime}
          solved={solved}
          timeTaken={timeTaken} 
        />
      )}
    </div>
  );
}

