import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { OnePlayer, TwoPlayer, TwoPlayerOnline } from './screens';
import './App.css';

const App = () => {
  const [modal, setModal] = useState(true);
  const [mode, setMode] = useState();
  const handlePress = mode => {
    setMode(mode);
    setModal(false);
  }
  const displayGame = mode => {
    const modeMap = {
      'onePlayer': <OnePlayer/>,
      'twoPlayer': <TwoPlayer/>,
      'twoPlayerOnline': <TwoPlayerOnline/>
    }
    if (!mode || !modeMap[mode]) {
      return null;
    } else {
      return modeMap[mode];
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css'
        />
        { window.location.pathname === "/" ?
          <Modal
            isOpen={modal}
            keyboard={false}
            backdrop="static"
          >
            <ModalHeader>AITicTacToe</ModalHeader>
            <ModalBody>
              Welcome to AITicTacToe. Please select a play mode to begin.
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => handlePress('onePlayer')}>One-Player</Button>{' '}
              <Button color="primary" onClick={() => handlePress('twoPlayer')}>Two-Player Offline</Button>{' '}
              <Button color="primary" onClick={() => handlePress('twoPlayerOnline')}>Two-Player Online</Button>
            </ModalFooter>
          </Modal> :
          null
        }
        { window.location.pathname == "/" ? 
          displayGame(mode) :
          <TwoPlayerOnline oppID={window.location.pathname.substring(1)}/>
        }
      </header>
    </div>
  );
}

export default App;
