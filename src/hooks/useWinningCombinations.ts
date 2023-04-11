import { useEffect, useState } from 'react';

// Calculate winning combinations based on board size and win length
function calculateWinningCombinations(boardWidth : number, boardHeight : number, winLength : number) : number[][] {
    let winningCombinations : number[][] = []
    for (let i = 0; i < boardHeight; i++) {
      for (let j = 0; j < boardWidth; j++) {
        // horizontal
        if (j + winLength <= boardWidth) {
          let combination : number[] = []
          for (let k = 0; k < winLength; k++) {
            combination.push(i * boardWidth + j + k)
          }
          winningCombinations.push(combination)
        }
  
        // vertical
        if (i + winLength <= boardHeight) {
          let combination : number[] = []
          for (let k = 0; k < winLength; k++) {
            combination.push((i + k) * boardWidth + j)
          }
          winningCombinations.push(combination)
        }
  
        // diagonal
        if (i + winLength <= boardHeight && j + winLength <= boardWidth) {
          let combination : number[] = []
          for (let k = 0; k < winLength; k++) {
            combination.push((i + k) * boardWidth + j + k)
          }
          winningCombinations.push(combination)
        }
  
        // anti-diagonal
        if (i + winLength <= boardHeight && j - winLength + 1 >= 0) {
          let combination : number[] = []
          for (let k = 0; k < winLength; k++) {
            combination.push((i + k) * boardWidth + j - k)
          }
          winningCombinations.push(combination)
        }
      }
    }
    return winningCombinations
  }

  function useWinningCombinations(boardWidth: number, boardHeight: number, winLength: number) {
    const [winningCombinations, setWinningCombinations] = useState<number[][]>(() => calculateWinningCombinations(boardWidth, boardHeight, winLength));
  
    useEffect(() => {
      setWinningCombinations(calculateWinningCombinations(boardWidth, boardHeight, winLength));
    }, [boardWidth, boardHeight, winLength]);
  
    return winningCombinations;
  }

  export default useWinningCombinations;