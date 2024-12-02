'use client'
import { TimerProvider } from '@/app/context/TimerContext';
import { useState } from 'react';
import GameBoard from './components/GameBoard';
import AlgorithmSection from './components/AlgorithmSection';
import TimeComplexitySection from './components/TimeComplexitySection';
import { ToastContainer } from 'react-toastify';
import BoardSizeSelector from './components/BoardSizeSelector';

export default function HomePage() {
  const [timeTaken, setTimeTaken] = useState(0); 
  const [boardSize, setBoardSize] = useState(null); 
  const [gameStarted, setGameStarted] = useState(false);  has started

  
  const stopTimer = (time) => {
    setTimeTaken(time);
  };

  
  const handleStartGame = (size) => {
    setBoardSize(size);
    setGameStarted(true);
  };

  return (
    <TimerProvider>
    <div className="flex flex-col md:flex-row min-h-screen">
      
      <div className="w-full md:w-1/3 p-4 bg-gray-100">
        <AlgorithmSection />
      </div>

      
      <div className="w-full md:w-1/3 flex justify-center items-center bg-white p-4">
        {!gameStarted ? (
          <BoardSizeSelector onStart={handleStartGame} />  before the game starts
        ) : (
          <GameBoard size={boardSize} stopTimer={stopTimer} />
        )}
      </div>

      
      <div className="w-full md:w-1/3 p-4 bg-gray-100">
        <TimeComplexitySection timeTaken={timeTaken} boardSize={boardSize} />
        <div className="mt-4">
          <div className="bg-gray-700 text-white p-2 rounded-lg shadow-md">
            <p>{timeTaken > 0 ? `Time Taken: ${timeTaken} seconds` : 'Time: 0'}</p>
          </div>
        </div>
      </div>

      
      <ToastContainer />
    </div>
    </TimerProvider>
  );
}
