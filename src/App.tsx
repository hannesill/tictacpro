import { useState } from 'react'
import Switch from './Switch'

const boardWidth : number = 5
const boardHeight : number = 5
const winLength : number = 4

// Calculate winning combinations
const winningCombinations : number[][] = []
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

// Check if the board has a winning combination
function calculateWinner(board: string[], winningCombinations: number[][]) {
  for (let combination of winningCombinations) {
    let combinationExists = true
    for (let i = 0; i < combination.length - 1; i++) {
      if (board[combination[i]] === null) {
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
      return combination
    }
  }
  return null
}

function Square({ value, onClick } : { value : string, onClick : () => void}) {
  return (
    <button 
      onClick={onClick} 
      className="bg-gray-200 border border-black"
      style={{
        width: '80px',
        height: '80px',
      }}
    >
      {value}
    </button>
  )
}

function App() {
  const [board, setBoard] = useState(Array(boardWidth * boardHeight).fill(null))

  function handleClick(i : number) {
    const nextBoard = board.slice()
    nextBoard[i] = 'X'
    if (calculateWinner(nextBoard, winningCombinations)) {
      alert('You won!')
    }
    setBoard(nextBoard)
  }

  let squares : JSX.Element[] = []
  for (let i = 0; i < boardHeight; i++) {
    let row : JSX.Element[] = []
    for (let j = 0; j < boardWidth; j++) {
      const index = i * boardWidth + j
      row.push(<Square key={index} value={board[index]} onClick={() => handleClick(index)} />)
    } 
    squares.push(<div className="flex">{row}</div>)
  }

  return (
    <>
      <Switch />
      {squares}
    </>
  )
}

export default App
