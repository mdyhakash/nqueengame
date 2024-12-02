
import { useTimer } from '@/app/context/TimerContext'; 
import {useContext} from "react"
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export default function TimeComplexitySection({ boardSize }) {
  const { startTime, elapsedTime, solved } = useTimer();

  const theoreticalComplexity = `O(${boardSize}!)`;

  const estimatedComplexity = (timeTaken) => {
    if (timeTaken === 0) return "N/A";
    return `~O(${Math.max(2, Math.floor(timeTaken / 10))}!)`;
  };


  const data = {
    labels: Array.from({ length: elapsedTime }, (_, index) => index + 1),
    datasets: [
      {
        label: "Time Taken (Seconds)",
        data: Array.from({ length: elapsedTime }, (_, index) => index + 1),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: false,
      },
    ],
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Time Complexity</h2>
      <div className="bg-gray-200 p-4 rounded">
        <p>
          <strong>Theoretical Complexity:</strong> {theoreticalComplexity}
        </p>
      </div>
      <div className="bg-gray-200 p-4 rounded">
        <p>
          <strong>Your Time:</strong> {elapsedTime > 0 ? `${elapsedTime} seconds` : "N/A"}
        </p>
        <p>
          <strong>Estimated Complexity:</strong> {estimatedComplexity(elapsedTime)}
        </p>
      </div>

      {/* Graph showing time taken */}
      {elapsedTime > 0 && (
        <div>
          <Line data={data} />
        </div>
      )}
    </div>
  );
}
