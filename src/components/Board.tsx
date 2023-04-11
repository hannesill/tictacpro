import React from "react";
import Square from "./Square";

interface BoardProps {
    boardHeight: number;
    boardWidth: number;
    board: Array<string>;
    handleSquareClick: (i: number) => void;
}

function Board({ boardHeight, boardWidth, board, handleSquareClick } : { boardHeight : number, boardWidth : number, board : Array<string>, handleSquareClick : (i : number) => void }) : JSX.Element {
    let squares : Array<JSX.Element> = [];
    for (let i = 0; i < boardHeight; i++) {
      let row : Array<JSX.Element> = [];
      for (let j = 0; j < boardWidth; j++) {
        const index = i * boardWidth + j;
        row.push(<Square key={index} value={board[index]} onClick={() => handleSquareClick(index)} />);
      }
      squares.push(<div className="flex" key={i}>{row}</div>);
    }
    return (
      <div>{squares}</div>
    )
  }

  export default Board;