import React, { useState, useEffect } from 'react';
import { FaCircle, FaTimes } from 'react-icons/fa';
import { Button } from 'reactstrap';
import TileButton from '../../components/TileButton/TileButton';
import minimax from '../../utils/minimax'
import './OnePlayer.css'

export default () => {
  const [board, setBoard] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ]);
  const [playerTurn, setPlayerTurn] = useState(-1);
  const [turns, setTurns] = useState(0);
  const [gameState, setGameState] = useState(true);
  const [lastMove, setLastMove] = useState({i: 0, j: 0})
  useEffect(() => {
    const gameEnd = checkWinner(lastMove.i, lastMove.j);
    if (playerTurn === 1 && !gameEnd) {
      const bestMove = computeBestMove();
      updateValue(bestMove.i, bestMove.j);
    }
  }, [lastMove, gameState])
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
  const checkSum = sum => {
    if (sum === -3){
      alert('Player 1(X) wins!');
      setGameState(false);
      return true;
    } else if (sum === 3){
      alert('Player 2(O) wins!');
      setGameState(false);
      return true;
    }
    return false;
  }
  const checkWinner = (row, col) => {
    //check if the column has a win
    let sum = 0;
    let check = false;
    for (let i = 0; i < 3; i++) {
      sum += board[i][col];
    }
    check = checkSum(sum);
    if (check) return check;
    //check if the row has a win
    sum = 0;
    for (let i = 0; i < 3; i++) {
      sum += board[row][i];
    }
    check = checkSum(sum);
    if (check) return check;
    //check if the top left to bottom right diagonal has a win
    sum = 0;
    if (row === col) {
      for (let i = 0; i < 3; i++) {
        sum += board[i][i];
      }
      check = checkSum(sum);
      if (check) return check;
      sum = 0;
    }
    //check if the top right to bottom left diagonal has a win
    if ((row === 2 && col === 0) || (row === 0 && col === 2)) {
      for (let i = 0; i < 3; i++) {
        sum += board[i][2-i];
      }
      check = checkSum(sum);
      if (check) return check;
      sum = 0;
    }
    //check if it's a tie
    if (turns === 9) {
      alert("It was a tie!");
      setGameState(false);
      return true;
    }
  }
  const updateValue = (i, j) => {
    // only respond if the tile isn't occupied, and if the game hasn't ended
    if (board[i][j] === 0 && gameState) {
      let newPosition = board;
      newPosition[i][j] = playerTurn;
      setBoard(newPosition);
      setPlayerTurn(prevPlayerTurn => prevPlayerTurn === 1 ? -1 : 1);
      setTurns(prevTurn => prevTurn + 1);
      setLastMove({i, j});
    }
  }
  const computeBestMove = () => {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available?
        if (board[i][j] === 0) {
          board[i][j] = 1;
          let score = minimax(board, 0, false);
          board[i][j] = 0;
          if (score > bestScore) {
            bestScore = score;
            move = { i, j };
          }
        }
      }
    }
    console.log(move)
    return move
  }
  return (
    <div className="MainContainer">
      <div className="RowContainer">
        <TileButton onClick={() => updateValue(0, 0)}>
          {renderIcon(0, 0)}
        </TileButton>
        <TileButton onClick={() => updateValue(0, 1)}>
          {renderIcon(0, 1)}
        </TileButton>
        <TileButton onClick={() => updateValue(0, 2)}>
          {renderIcon(0, 2)}
        </TileButton>
      </div>
      <div className="RowContainer">
        <TileButton onClick={() => updateValue(1, 0)}>
          {renderIcon(1, 0)}
        </TileButton>
        <TileButton onClick={() => updateValue(1, 1)}>
          {renderIcon(1, 1)}
        </TileButton>
        <TileButton onClick={() => updateValue(1, 2)}>
          {renderIcon(1, 2)}
        </TileButton>
      </div>
      <div className="RowContainer">
        <TileButton onClick={() => updateValue(2, 0)}>
          {renderIcon(2, 0)}
        </TileButton>
        <TileButton onClick={() => updateValue(2, 1)}>
          {renderIcon(2, 1)}
        </TileButton>
        <TileButton onClick={() => updateValue(2, 2)}>
          {renderIcon(2, 2)}
        </TileButton>
      </div>
      <Button style={{marginTop: '25px'}} onClick={startGame}>
        Clear Board
      </Button>
      <Button style={{marginTop: '5px'}} onClick={() => window.location.reload(false)}>
        Back to Homescreen
      </Button>
    </div>
  );
}