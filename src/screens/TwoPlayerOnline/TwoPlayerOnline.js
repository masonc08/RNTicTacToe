import React, { useState, useEffect, useRef } from 'react';
import './TwoPlayerOnline.css';
import { wsURL } from '../../config';

export default ({ oppID }) => {
  const [ opponentID, setOpponentID ] = useState(oppID);
  const [ userID, setUserID ] = useState(undefined);
  const ws = useRef(undefined);
  useEffect(() => {
    ws.current = new WebSocket(wsURL);
    ws.current.onopen = () => {
      ws.current.send(JSON.stringify({
        "action": "ping"
      }));
      if (oppID !== undefined) {
        ws.current.send(JSON.stringify({
          action: "gameAction",
          recipientID: oppID,
          body: JSON.stringify({
            action: "connect"
          })
        }));
      }
    };
    ws.current.onmessage = event => {
      const message = JSON.parse(event.data);
      switch (message.action) {
        case "ping":
          if (userID === undefined) {
            setUserID(message.senderID);
          }
          break;
        case "privateMessage":
          break;
        case "gameAction":
          if (opponentID === undefined) {
            setOpponentID(message.senderID);
          }
          break;
        default:
          break;
      }
    };
  }, []);

  const craftLink = id => (window.location.href+id);

  const getDisplay = () => {
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