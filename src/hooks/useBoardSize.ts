import { useState } from 'react';

function useBoardSize(initialWidth: number, initialHeight: number) {
    const [boardWidth, setBoardWidth] = useState<number>(initialWidth);
    const [boardHeight, setBoardHeight] = useState<number>(initialHeight);
    const [tempBoardWidth, setTempBoardWidth] = useState<number>(initialWidth);
    const [tempBoardHeight, setTempBoardHeight] = useState<number>(initialHeight);
  
    const updateBoardSize = () => {
      setBoardWidth(tempBoardWidth);
      setBoardHeight(tempBoardHeight);
    };
  
    return { boardWidth, boardHeight, tempBoardWidth, tempBoardHeight, setTempBoardWidth, setTempBoardHeight, updateBoardSize };
  }

  export default useBoardSize;