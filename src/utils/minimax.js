function _equals3(a, b, c) {
  return a === b && b === c && a !== 0;
}

const _checkWinner = board => {
  let winner = null;
  for (let i = 0; i < 3; i++) {
    if (_equals3(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0];
    }
  }
  for (let i = 0; i < 3; i++) {
    if (_equals3(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i];
    }
  }
  if (_equals3(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0];
  }
  if (_equals3(board[2][0], board[1][1], board[0][2])) {
    winner = board[2][0];
  }
  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === 0) {
        openSpots++;
      }
    }
  }
  if (winner === null && openSpots === 0) {
    return 'tie';
  } else {
    return winner;
  }
}

const _scores = {
  [-1]: 10,
  1: -10,
  tie: 0
};

const minimax = (board, depth, isMaximizing) => {
  let result = _checkWinner(board);
  if (result !== null) {
    return _scores[result];
  }
  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === 0) {
          board[i][j] = 1;
          let score = minimax(board, depth + 1, false);
          board[i][j] = 0;
          bestScore = Math.max(score, bestScore);
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === 0) {
          board[i][j] = -1;
          let score = minimax(board, depth + 1, true);
          board[i][j] = 0;
          bestScore = Math.min(score, bestScore);
        }
      }
    }
    return bestScore;
  }
}

export default minimax;