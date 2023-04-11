import { useEffect, useState } from 'react';

// Check if the board has a winning combination and return winner
function calculateWinner(board: string[], winningCombinations: number[][]) : string | null {
    for (let combination of winningCombinations) {
      let combinationExists = true
      for (let i = 0; i < combination.length - 1; i++) {
        if (board[combination[i]] === "") {
          combinationExists = false
          break
        }
        if (board[combination[i]] !== board[combination[i + 1]]) {
          combinationExists = false
          break
        }
      }
      if (combinationExists) {
        console.log(combination)
        return board[combination[0]]
      }
    }
    return null
  }
  
  function useWinner(board: string[], winningCombinations: number[][]) {
    const [winner, setWinner] = useState<string>('');
  
    useEffect(() => {
      const newWinner = calculateWinner(board, winningCombinations);
      if (newWinner) {
        setWinner(newWinner);
        alert(`Winner is ${newWinner}!`);
      }
    }, [board, winningCombinations]);
  
    return [winner, setWinner] as const;
  }

  export default useWinner;