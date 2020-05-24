import React, { useState } from 'react';

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
    // if (value == -1) {
    //   return <Image style={styles.cinnamon} source={require("./cinnamon_sticks.jpg")}/>;
    // } else if (value == 1){
    //   return <Image style={styles.donut} source={require("./donut.jpg")}/>
    // } else {
    //   return null
    // }
  } 
  return null;
}