export default function StartButton({ onStart }) {
    return (
      <button
        className="px-6 py-3 text-lg font-bold text-white bg-blue-600 rounded hover:bg-blue-700"
        onClick={onStart}
      >
        Start
      </button>
    );
  }
  