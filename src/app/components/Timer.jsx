import { useEffect, useState } from "react";

export default function Timer({ startTime, solved, timeTaken }) {
  const [elapsedTime, setElapsedTime] = useState(timeTaken || 0);

  useEffect(() => {
    if (!startTime || solved) return;

    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, solved]);

  return (
    <div className="text-xl font-bold">
      Time Elapsed: {elapsedTime} seconds
    </div>
  );
}
