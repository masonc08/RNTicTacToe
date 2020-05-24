import React, { useState } from 'react';
import { FaCircle, FaTimes } from 'react-icons/fa';

export default () => {
  const [board, setBoard] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ]);
  const [playerTurn, setPlayerTurn] = useState(-1);
  const [turns, setTurns] = useState(0);
  const [gameState, setGameState] = useState(true);
  const startGame = () => {
    setBoard([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ]);
    setPlayerTurn(-1);
    setTurns(0);
    setGameState(true);
  }
  const renderIcon = (i, j) => {
    const value = board[i][j];
    if (value === -1) {
      return <FaTimes/>;
    } else if (value === 1){
      return <FaCircle/>;
    } else {
      return null;
    }
  } 
  return null;
}