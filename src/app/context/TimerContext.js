// TimerContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const TimerContext = createContext();

export const useTimer = () => useContext(TimerContext);

export const TimerProvider = ({ children }) => {
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    if (!startTime || solved) return;

    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000)); // Update the elapsed time every second
    }, 1000);

    return () => clearInterval(interval); // Clean up the interval when the component unmounts
  }, [startTime, solved]);

  return (
    <TimerContext.Provider value={{ startTime, setStartTime, elapsedTime, setElapsedTime, solved, setSolved }}>
      {children}
    </TimerContext.Provider>
  );
};
