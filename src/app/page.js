"use client";

import { useState } from "react";
import { ToastContainer } from "react-toastify";
import AlgorithmSection from "./components/AlgorithmSection";
import BoardSizeSelector from "./components/BoardSizeSelector";
import GameBoard from "./components/GameBoard";
import TimeComplexitySection from "./components/TimeComplexitySection";

export default function HomePage() {
  const [timeTaken, setTimeTaken] = useState(0); // Store user's solved time
  const [boardSize, setBoardSize] = useState(null); // Store selected board size
  const [gameStarted, setGameStarted] = useState(false); // Flag to check if game has started

  // Stop timer and set the time taken
  const stopTimer = (time) => {
    setTimeTaken(time);
  };

  // Handle start button click
  const handleStartGame = (size) => {
    setBoardSize(size);
    setGameStarted(true);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Section: Explanation and Algorithm */}
      <div className="w-full md:w-1/3 p-4 bg-gray-100">
        <AlgorithmSection />
      </div>

      {/* Center Section: Game Board */}
      <div className="w-full md:w-1/3 flex justify-center items-center bg-white p-4">
        {!gameStarted ? (
          <BoardSizeSelector onStart={handleStartGame} /> // Display size selector before the game starts
        ) : (
          <GameBoard size={boardSize} stopTimer={stopTimer} />
        )}
      </div>

      {/* Right Section: Time Complexity */}
      <div className="w-full md:w-1/3 p-4 bg-gray-100">
        <TimeComplexitySection timeTaken={timeTaken} boardSize={boardSize} />
        <div className="mt-4">
          <div className="bg-gray-700 text-white p-2 rounded-lg shadow-md">
            <p>
              {timeTaken > 0 ? `Time Taken: ${timeTaken} seconds` : "Time: 0"}
            </p>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}
