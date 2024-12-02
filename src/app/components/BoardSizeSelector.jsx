export default function BoardSizeSelector({ onStart }) {
  return (
    <div className="flex flex-col justify-center items-center space-y-4">
      <h2 className="text-2xl font-bold">Select Board Size</h2>
      <div className="space-x-4">
        {[4, 5, 6, 7, 8].map((size) => (
          <button
            key={size}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={() => onStart(size)}
          >
            {size}x{size}
          </button>
        ))}
      </div>
    </div>
  );
}
