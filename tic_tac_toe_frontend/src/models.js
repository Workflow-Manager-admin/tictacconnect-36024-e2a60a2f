//
// Frontend-side data models, types, and helpers for tic tac toe game state, moves, users, and history.
//

// PUBLIC_INTERFACE
/** User model. */
export class User {
  constructor({ id, username }) {
    this.id = id;
    this.username = username;
  }
}

// PUBLIC_INTERFACE
/** TicTacToe game status. */
export const GameStatus = {
  WAITING: 'WAITING',      // Waiting for 2nd player
  IN_PROGRESS: 'IN_PROGRESS',
  FINISHED: 'FINISHED',
};

// PUBLIC_INTERFACE
/** Describes a Tic Tac Toe game object from backend. */
export class Game {
  constructor({ id, players, board, status, winner, created_at, current_turn }) {
    this.id = id;
    this.players = players;  // [User, User?]
    this.board = board;      // [["", "", ""], ...] (3x3)
    this.status = status;    // GameStatus.*
    this.winner = winner;    // User.username | null
    this.created_at = created_at;
    this.current_turn = current_turn; // User.username or null
  }
}

// PUBLIC_INTERFACE
/** Describes a move in a game history. */
export class Move {
  constructor({ move_num, player, row, col, mark }) {
    this.move_num = move_num;
    this.player = player;   // User.username
    this.row = row;
    this.col = col;
    this.mark = mark;       // "X" or "O"
  }
}

// PUBLIC_INTERFACE
/** Game summary for history views. */
export class GameSummary {
  constructor({ id, players, winner, created_at, status }) {
    this.id = id;
    this.players = players; // [User.username,...]
    this.winner = winner;   // username or null
    this.created_at = created_at;
    this.status = status;
  }
}

// PUBLIC_INTERFACE
/** Returns empty 3x3 tic tac toe board. */
export function makeEmptyBoard() {
  return [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
}

// PUBLIC_INTERFACE
/** Utility: Given a board, determines winner or null. */
export function getWinner(board) {
  // Rows, cols, diags
  for (let i = 0; i < 3; ++i) {
    if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]) return board[i][0];
    if (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i]) return board[0][i];
  }
  if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) return board[0][0];
  if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) return board[0][2];
  return null;
}

// PUBLIC_INTERFACE
/** Utility: Checks if board is full (for draw). */
export function isBoardFull(board) {
  return board.every(row => row.every(cell => cell));
}
