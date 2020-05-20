import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './App.css';

const App = () => {
  const [modal, setModal] = useState(true);
  const toggle = () => setModal(!modal);
  return (
    <div className="App">
      <header className="App-header">
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css'
        />
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>AITicTacToe</ModalHeader>
          <ModalBody>
            Welcome to AITicTacToe. Please select a play mode to begin.
          </ModalBody>
          <ModalFooter>
            <div className="">
              <Button color="primary" onClick={toggle}>One-Player</Button>{' '}
              <Button color="primary" onClick={toggle}>Two-Player</Button>
            </div>
          </ModalFooter>
        </Modal>
      </header>
    </div>
  );
}

export default App;
