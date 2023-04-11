import React from "react";

interface SquareProps {
    value: string;
    onClick: () => void;
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

export default Square;