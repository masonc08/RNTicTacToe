import React, { useEffect, useState } from 'react';
import { FaCircle, FaTimes } from 'react-icons/fa';
import { Button } from 'reactstrap';
import TileButton from '../../components/TileButton/TileButton';
import './OnePlayer.css';
import { computeBestMove, checkWinner } from './logic';

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
  const [lastMove, setLastMove] = useState([0, 0]);
  useEffect(() => {
    const winner = checkWinner(board, lastMove[0], lastMove[1]);
    if (winner !== 0) {
      alert(`${getChar(winner)} was the winner!`);
      setGameState(false);
      return;
    } else if (turns === 9) {
      alert("It was a tie!");
      setGameState(false);
      return;
    }
    if (playerTurn === 1) {
      const boardCopy = [
        [...board[0]],
        [...board[1]],
        [...board[2]]
      ];
      const {move: computerMove} = computeBestMove(boardCopy, [...lastMove], turns, playerTurn);
      updateValue(computerMove[0], computerMove[1]);
    }
  }, [board, turns, playerTurn, lastMove]);

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

  const updateValue = (i, j) => {
    let newPosition = board;
    newPosition[i][j] = playerTurn;
    setBoard(newPosition);
    setPlayerTurn(prevPlayerTurn => -prevPlayerTurn);
    setTurns(prevTurn => prevTurn + 1);
    setLastMove([i, j]);
  };

  const handlePress = (i, j) => {
    // only respond if the tile isn't occupied, and if the game hasn't ended
    if (board[i][j] === 0 && gameState) {
      updateValue(i, j);
    }
  };

  return (
    <div className="MainContainer">
      <div className="RowContainer">
        <TileButton onClick={() => handlePress(0, 0)}>
          {renderIcon(0, 0)}
        </TileButton>
        <TileButton onClick={() => handlePress(0, 1)}>
          {renderIcon(0, 1)}
        </TileButton>
        <TileButton onClick={() => handlePress(0, 2)}>
          {renderIcon(0, 2)}
        </TileButton>
      </div>
      <div className="RowContainer">
        <TileButton onClick={() => handlePress(1, 0)}>
          {renderIcon(1, 0)}
        </TileButton>
        <TileButton onClick={() => handlePress(1, 1)}>
          {renderIcon(1, 1)}
        </TileButton>
        <TileButton onClick={() => handlePress(1, 2)}>
          {renderIcon(1, 2)}
        </TileButton>
      </div>
      <div className="RowContainer">
        <TileButton onClick={() => handlePress(2, 0)}>
          {renderIcon(2, 0)}
        </TileButton>
        <TileButton onClick={() => handlePress(2, 1)}>
          {renderIcon(2, 1)}
        </TileButton>
        <TileButton onClick={() => handlePress(2, 2)}>
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