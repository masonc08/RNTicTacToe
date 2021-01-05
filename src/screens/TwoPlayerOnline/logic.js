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

export const getChar = num => {
  if (num === 1) {
    return "O";
  }
  if (num === -1) {
    return "X";
  }
  throw new Error("No mapping found for number");
}