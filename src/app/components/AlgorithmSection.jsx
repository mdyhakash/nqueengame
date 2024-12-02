export default function AlgorithmSection() {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">What is the N-Queens Problem?</h2>
        <p>
          The N-Queens problem is a classic computer science problem where the goal is to place N queens 
          on an N×N chessboard such that no two queens threaten each other. This means:
        </p>
        <ul className="list-disc list-inside pl-4">
          <li>No two queens can be in the same row.</li>
          <li>No two queens can be in the same column.</li>
          <li>No two queens can be on the same diagonal.</li>
        </ul>
  
        <h3 className="text-xl font-bold">Algorithm (Backtracking)</h3>
        <pre className="bg-gray-200 p-4 rounded text-sm overflow-auto">
  {`function solveNQueens(board, row):
    if row == n:
      print(board)
      return true
  
    for col in 0 to n-1:
      if isSafe(board, row, col):
        board[row][col] = true
        if solveNQueens(board, row + 1):
          return true
        board[row][col] = false
        
    return false`}
        </pre>
        <p>
          The algorithm uses backtracking to place queens row by row, ensuring each placement is valid.
        </p>
      </div>
    );
  }
  