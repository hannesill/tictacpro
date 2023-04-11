import { useEffect, useState } from 'react'
import Switch from './Switch'
import Board from './Board'
import useBoardSize from '../hooks/useBoardSize'
import useWinningCombinations from '../hooks/useWinningCombinations'
import useWinner from '../hooks/useWinner'


function App() {
  const { boardWidth, boardHeight, tempBoardWidth, tempBoardHeight, setTempBoardWidth, setTempBoardHeight, updateBoardSize } = useBoardSize(3, 3);
  const [winLength, setWinLength] = useState<number>(3);
  const [board, setBoard] = useState<Array<string>>(Array(3 * 3).fill(""));
  const [isXTurn, setIsXTurn] = useState<boolean>(true);
  const winningCombinations = useWinningCombinations(boardWidth, boardHeight, winLength);
  const [winner, setWinner] = useWinner(board, winningCombinations);

  useEffect(() => {
    resetBoard();
  } , [boardWidth, boardHeight])

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
    setIsXTurn(!isXTurn)
  }

  function resetBoard() : void {
    setBoard(Array(boardWidth * boardHeight).fill(""))
    setIsXTurn(true)
    setWinner('')
  }

  return (
    <div className="flex flex-col justify-center items-center space-y-8">
      <h1 className="text-4xl font-semibold mt-8">Tic Tac Toe</h1>
      <Switch />
      <div>
        <div className="flex flex-col">
          <label>Board Width</label>
          <input className="bg-transparent p-1 mb-2 border border-gray-900 dark:border-white" type="number" value={tempBoardWidth} onChange={(e) => setTempBoardWidth(parseInt(e.target.value))} />
        </div>
        <div className="flex flex-col">
          <label>Board Height</label>
          <input className="bg-transparent p-1 mb-2 border border-gray-900 dark:border-white" type="number" value={tempBoardHeight} onChange={(e) => setTempBoardHeight(parseInt(e.target.value))} />
        </div>
        <div className="flex flex-col">
          <label>Win Length</label>
          <input className="bg-transparent p-1 mb-2 border border-gray-900 dark:border-white" type="number" value={winLength} onChange={(e) => setWinLength(parseInt(e.target.value))} />
        </div>
        <button className="bg-blue-600 font-semibold p-2 rounded-md my-6" onClick={updateBoardSize}>Update Board</button>
      </div>
      <Board boardHeight={boardHeight} boardWidth={boardWidth} board={board} handleSquareClick={handleSquareClick} />
      <button className="bg-blue-600 font-semibold p-2 rounded-md my-6" onClick={resetBoard}>Reset Game</button>
    </div>
  )
}

export default App
