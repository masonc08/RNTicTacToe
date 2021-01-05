import React, { useState, useEffect, useRef } from 'react';
import './TwoPlayerOnline.css';
import GameBoard from './Game';
import { wsURL } from '../../config';
import { getChar, checkWinner } from './logic';

export default ({ oppID }) => {
  const [ opponentID, setOpponentID ] = useState(undefined);
  const [ userID, setUserID ] = useState(undefined);
  const [ boardState , setBoardState ] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ]);
  // -1 for X, 1 for O
  const [ playerTurn, setPlayerTurn ] = useState(-1);
  const [ turns, setTurns ] = useState(0);
  const [ lastMove, setLastMove ] = useState([0, 0]);
  const player = useRef(-1);
  const ws = useRef(undefined);
  useEffect(() => {
    if (oppID !== undefined) {
      player.current = 1;
      setOpponentID(oppID);
    }
    ws.current = new WebSocket(wsURL);
    ws.current.onopen = () => {
      ws.current.send(JSON.stringify({
        "action": "ping"
      }));
      if (oppID !== undefined) {
        ws.current.send(JSON.stringify({
          action: "gameAction",
          recipientID: oppID
        }));
      }
    };
    ws.current.onmessage = event => {
      const message = JSON.parse(event.data);
      console.log("Message Received: ", message);
      switch (message.action) {
        case "ping":
          if (userID === undefined) {
            setUserID(message.senderID);
          }
          break;
        case "privateMessage":
          break;
        case "gameAction":
          setOpponentID(prev => {
            if (prev === undefined) {
              return message.senderID;
            }
            return prev;
          });
          if (message.body !== "") {
            const body = JSON.parse(message.body);
            if (body.move) {
              const [ i, j ] = body.move;
              setBoardState(old => {
                const currentBoard = JSON.parse(JSON.stringify({ array: old })).array;
                currentBoard[i][j] = body.player;
                return currentBoard
              });
              setPlayerTurn(old => -old);
              setTurns(old => (old+1));
              setLastMove(body.move);
            }
          }
          break;
        default:
          break;
      }
    };
  }, []);

  useEffect(() => {
    const winner = checkWinner(boardState, lastMove[0], lastMove[1]);
    if (winner !== 0) {
      alert(`${getChar(winner)} was the winner!`);
      return;
    }
    if (turns === 9) {
      alert("It was a tie!");
      return;
    }
  }, [turns, lastMove]);

  const craftLink = id => (window.location.href+id);

  const makeMove = (i, j) => {
    console.log('send messgte')
    ws.current.send(JSON.stringify({
      action: "gameAction",
      recipientID: opponentID,
      body: JSON.stringify({
        move: [i, j],
        player: player.current
      })
    }));
  };

  const getDisplay = () => {
    console.log(playerTurn, player.current)
    if (userID === undefined) {
      return (
        <div>
          Connecting to server...
        </div>
      );
    } else {
      if (opponentID) {
        return (
          <div>
            <p>Connected with user {opponentID}</p>
            <GameBoard
              makeMove={makeMove}
              boardState={boardState}
              isTurn={playerTurn === player.current}
              onWin={() => {}}
              onLoss={() => {}}
              onTie={() => {}}
            />
          </div>
        );
      } else {
        return (
          <div>
            <p>Share this URL with your friend!</p>
            <p>{ craftLink(userID) }</p>
          </div>
        );
      }
    }
  };

  return (
    <div className="MainContainer">
      { getDisplay() }
    </div>
  );
}