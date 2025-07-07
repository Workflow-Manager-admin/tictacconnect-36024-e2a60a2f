# API Utilities and Models Usage (Frontend)

## Overview

This frontend codebase uses the following utility modules for backend integration and app-wide game state logic:

- `src/api.js` — Exposes AuthService, GameService, and HistoryService for talking to the backend API and managing JWTs.
- `src/models.js` — Defines React-usable class/structure for Game, Move, User, summaries, and board/state helpers.

## How to Use

### AuthService (src/api.js)

- `AuthService.login(username, password)`: login, gets token.
- `AuthService.register(username, password)`: create user + login.
- `AuthService.getToken()`: get token (for attaching to requests).
- `AuthService.logout()`: remove token.

*React app components/pages should check token to see if user is logged in.*

### GameService (src/api.js)

- `GameService.createGame([opponent])`: start a new game.
- `GameService.getGame(game_id)`: fetch game info and board.
- `GameService.makeMove(game_id, row, col)`: post a move.

### HistoryService (src/api.js)

- `HistoryService.myGames()`: get current user's games.
- `HistoryService.publicGames()`: get all recent public games.

### Data Models (src/models.js)

- `Game`, `User`, `Move`, `GameSummary`: data classes for typed frontend state.
- `makeEmptyBoard()`, `getWinner(board)`, `isBoardFull(board)`: helpers for board logic.

## Example

```js
import { AuthService, GameService, HistoryService } from './api';
import { Game } from './models';

async function demo() {
  await AuthService.login('bob', 'pw1');
  const gameData = await GameService.createGame('alice');
  const game = new Game(gameData);
  await GameService.makeMove(game.id, 1, 2);
}
```
