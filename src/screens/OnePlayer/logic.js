export const computeBestMove = (board, lastMove, turns, playerTurn) => {
  const winner = checkWinner(board, lastMove[0], lastMove[1]);
  if (winner !== 0) {
    return {res: winner, move: lastMove};
  }
  if (turns === 9) {
    return {res: 0, move: lastMove};
  }
  let tieMove = [];
  let loseMove = [];
  for (let i=0; i<3; i++) {
    for (let j=0; j<3; j++) {
      if (board[i][j] === 0) {
        board[i][j] = playerTurn;
        const { res, move } = computeBestMove([
          [...board[0]],
          [...board[1]],
          [...board[2]]
        ], [i, j], turns+1, -playerTurn);
        if (res === playerTurn) {
          return {res, move: [i, j]};
        }
        if (tieMove.length === 0 && res === 0) {
          tieMove = [i, j];
        } else if (loseMove.length === 0 && res === -playerTurn) {
          loseMove = [i, j];
        }
        board[i][j] = 0;
      }
    }
  }
  return tieMove.length !== 0 ? {res: 0, move: tieMove} : {res: -playerTurn, move: loseMove};
};

// Returns -1 if X wins, 1 if O wins, 0 if there was no win detected
export const checkSum = sum => {
  if (sum === -3){
    return -1;
  } else if (sum === 3){
    return 1;
  }
  return 0;
};

// Returns -1 if X wins, 1 if O wins, 0 if there was no win detected
export const checkWinner = (board, row, col) => {
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
};