import React from "react";

interface SquareProps {
    value: string;
    onClick: () => void;
}

function Square({ value, onClick } : { value : string, onClick : () => void}) : JSX.Element {
    return (
      <button 
        onClick={onClick} 
        className="border border-gray-900 dark:border-gray-200"
        style={{
          width: '5vh',
          height: '5vh',
        }}
      >
        {value}
      </button>
    )
  }

export default Square;