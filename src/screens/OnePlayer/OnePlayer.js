import React, { useEffect, useState } from 'react';
import { FaCircle, FaTimes } from 'react-icons/fa';
import { Button } from 'reactstrap';
import TileButton from '../../components/TileButton/TileButton';
import './OnePlayer.css'

export default () => {
  const [board, setBoard] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ]);
  // -1 for X, 1 for O
  const [playerTurn, setPlayerTurn] = useState(-1);
  const [turns, setTurns] = useState(0);
  const [gameState, setGameState] = useState(true);
  const [gameWinner, setGameWinner] = useState(0);
  useEffect(() => {
      if (gameWinner === -1 || gameWinner === 1) {
        alert(`${getChar(gameWinner)} was the winner!`);
        setGameState(false);
      } else if (gameWinner === 2) {
        alert("It was a tie!");
        setGameState(false);
      }
    }, [gameWinner]);
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
  const getChar = num => {
    if (num === 1) {
      return "O";
    }
    if (num === -1) {
      return "X";
    }
    throw new Error("No mapping found for number");
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
  // Returns -1 if X wins, 1 if O wins, 0 if there was no win detected
  const checkSum = sum => {
    if (sum === -3){
      return -1;
    } else if (sum === 3){
      return 1;
    }
    return 0;
  }

  // Returns -1 if X wins, 1 if O wins, 0 if there was no win detected
  const checkWinner = (row, col) => {
    //check if the column has a win
    let sum = 0;
    let winner = 0;
    for (let i = 0; i < 3; i++) {
      sum += board[i][col];
    }
    winner = checkSum(sum);
    if (winner !== 0) {
      return winner;
    }
    //check if the row has a win
    sum = 0;
    for (let i = 0; i < 3; i++) {
      sum += board[row][i];
    }
    winner = checkSum(sum);
    if (winner !== 0) {
      return winner;
    }
    //check if the top left to bottom right diagonal has a win
    sum = 0;
    if (row === col) {
      for (let i = 0; i < 3; i++) {
        sum += board[i][i];
      }
      winner = checkSum(sum);
      if (winner !== 0) {
        return winner;
      }
      sum = 0;
    }
    //check if the top right to bottom left diagonal has a win
    if ((row === 2 && col === 0) || (row === 0 && col === 2)) {
      for (let i = 0; i < 3; i++) {
        sum += board[i][2-i];
      }
      winner = checkSum(sum);
      if (winner !== 0) {
        return winner;
      }
      sum = 0;
    }
    return 0;
  }
  const updateValue = (i, j) => {
    // only respond if the tile isn't occupied, and if the game hasn't ended
    if (board[i][j] === 0 && gameState) {
      let newPosition = board;
      newPosition[i][j] = playerTurn;
      setBoard(newPosition);
      setPlayerTurn(prevPlayerTurn => {
        return prevPlayerTurn === 1 ? -1 : 1;
      });
      setTurns(prevTurn => prevTurn + 1);
      const winner = checkWinner(i, j);
      if (winner !== 0) {
        setGameWinner(winner);
      } else if (turns === 9) {
        setGameWinner(2);
      }
    }
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