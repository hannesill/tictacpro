import { useEffect, useState } from 'react'
import Switch from './Switch'

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

function Square({ value, onClick } : { value : string, onClick : () => void}) : JSX.Element {
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
  const [boardWidth, setBoardWidth] = useState<number>(3);
  const [boardHeight, setBoardHeight] = useState<number>(3);
  const [tempBoardWidth, setTempBoardWidth] = useState<number>(3);
  const [tempBoardHeight, setTempBoardHeight] = useState<number>(3);
  const [winLength, setWinLength] = useState<number>(3);
  const [board, setBoard] = useState<Array<string>>(Array(3 * 3).fill(""));
  const [isXTurn, setIsXTurn] = useState<boolean>(true);
  const [winner, setWinner] = useState<string>('');
  const winningCombinations = calculateWinningCombinations(boardWidth, boardHeight, winLength);
  const [squares, setSquares] = useState<Array<JSX.Element>>([]);

  useEffect(() => {
    resetBoard();
  } , [boardWidth, boardHeight])

  useEffect(() => {
    setSquares(buildSquares(boardHeight, boardWidth, board));
  }, [boardHeight, boardWidth, board]);

  useEffect(() => {
    console.log(board)
  }, [board])

  function handleSquareClick(i : number) : void {
    if (board[i] !== '' || winner !== '') {
      return
    }
    const nextBoard = board.slice()
    let currentPlayer = isXTurn ? 'X' : 'O'
    nextBoard[i] = currentPlayer
    setBoard(nextBoard)
    const winningCombinations = calculateWinningCombinations(boardWidth, boardHeight, winLength);
    if (calculateWinner(nextBoard, winningCombinations)) {
      setWinner(currentPlayer)
      alert('Winner is ' + currentPlayer + '!')
    }
    setIsXTurn(!isXTurn)
  }
  
  function buildSquares(boardHeight: number, boardWidth: number, board: Array<string>): Array<JSX.Element> {
    let squares: Array<JSX.Element> = [];
    for (let i = 0; i < boardHeight; i++) {
      let row: Array<JSX.Element> = [];
      for (let j = 0; j < boardWidth; j++) {
        const index = i * boardWidth + j;
        row.push(<Square key={index} value={board[index]} onClick={() => handleSquareClick(index)} />);
      }
      squares.push(<div className="flex" key={i}>{row}</div>);
    }
    return squares;
  }

  function updateBoardSize() : void {
    setBoardWidth(tempBoardWidth);
    setBoardHeight(tempBoardHeight);
    resetBoard();
  }

  function resetBoard() : void {
    setBoard(Array(boardWidth * boardHeight).fill(""))
    setIsXTurn(true)
    setWinner('')
  }

  return (
    <>
      <Switch />
      <div>
        <div className="flex flex-col">
          <label>Board Width</label>
          <input type="number" value={tempBoardWidth} onChange={(e) => setTempBoardWidth(parseInt(e.target.value))} />
        </div>
        <div className="flex flex-col">
          <label>Board Height</label>
          <input type="number" value={tempBoardHeight} onChange={(e) => setTempBoardHeight(parseInt(e.target.value))} />
        </div>
        <div className="flex flex-col">
          <label>Win Length</label>
          <input type="number" value={winLength} onChange={(e) => setWinLength(parseInt(e.target.value))} />
        </div>
        <button onClick={updateBoardSize}>Update Board</button>
      </div>
      {squares}
      <button onClick={resetBoard}>Reset Game</button>
    </>
  )
}

export default App
