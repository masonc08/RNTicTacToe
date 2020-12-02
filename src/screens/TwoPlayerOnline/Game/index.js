import React from 'react';
import { FaCircle, FaTimes } from 'react-icons/fa';
import { Button } from 'reactstrap';
import TileButton from '../../../components/TileButton/TileButton';
import './index.css';


export default ({
  makeMove,
  boardState,
  isTurn
}) => {
  const renderIcon = (i, j) => {
    const value = boardState[i][j];
    if (value === -1) {
      return <FaTimes/>;
    } else if (value === 1){
      return <FaCircle/>;
    } else {
      return null;
    }
  }
  const handlePress = (i, j) => {
    // only respond if the tile isn't occupied, and if the game hasn't ended
    if (isTurn) {
      makeMove(i, j);
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
      <Button style={{marginTop: '25px'}} onClick={() => {}}>
        Clear Board
      </Button>
      <Button style={{marginTop: '5px'}} onClick={() => window.location.reload(false)}>
        Back to Homescreen
      </Button>
    </div>
  );
}