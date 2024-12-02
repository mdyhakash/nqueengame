export default function Cell({ isQueen, isInvalid, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`w-16 h-16 border ${isQueen ? "bg-blue-500" : "bg-gray-200"} ${
        isInvalid ? "border-red-500" : ""
      }`}
    >
      {isQueen && <span className="text-white text-xl text-center">♛</span>}
    </div>
  );
}
