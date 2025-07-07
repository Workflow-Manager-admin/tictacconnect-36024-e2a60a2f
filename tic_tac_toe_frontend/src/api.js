//
// API utility functions for communicating with the tic_tac_toe_backend.
// Handles authentication, game, move, and history endpoints with JWT handling.
//

const API_BASE = process.env.REACT_APP_API_BASE || 'https://vscode-internal-8497-qa.qa01.cloud.kavia.ai:3001';

// PUBLIC_INTERFACE
export class AuthService {
  /** Handles JWT storage, login, logout, and registration logic. */
  static JWT_KEY = 'TICTACTOE_JWT';

  // PUBLIC_INTERFACE
  static getToken() {
    /** Returns JWT string if present, or null. */
    return localStorage.getItem(AuthService.JWT_KEY);
  }

  // PUBLIC_INTERFACE
  static setToken(token) {
    /** Sets JWT string in localStorage. */
    localStorage.setItem(AuthService.JWT_KEY, token);
  }

  // PUBLIC_INTERFACE
  static clearToken() {
    /** Removes JWT from storage on logout. */
    localStorage.removeItem(AuthService.JWT_KEY);
  }

  // PUBLIC_INTERFACE
  static async register(username, password) {
    /** Registers user; returns {token, user} on success or throws on error. */
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) throw new Error((await res.json()).detail || 'Registration failed');
    const data = await res.json();
    if (data.token) AuthService.setToken(data.token);
    return data;
  }

  // PUBLIC_INTERFACE
  static async login(username, password) {
    /** Logins user; returns {token, user} on success or throws on error. */
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) throw new Error((await res.json()).detail || 'Login failed');
    const data = await res.json();
    if (data.token) AuthService.setToken(data.token);
    return data;
  }

  // PUBLIC_INTERFACE
  static logout() {
    /** Logout the user. */
    AuthService.clearToken();
  }
}

// Attach JWT to requests
function authHeaders() {
  const token = AuthService.getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// PUBLIC_INTERFACE
export class GameService {
  /** Handles creation/joining of games, move submission, and fetching game state. */

  // PUBLIC_INTERFACE
  static async createGame(opponent = null) {
    /** Creates a new game, optionally with an opponent. */
    const res = await fetch(`${API_BASE}/games`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(opponent ? { opponent } : {}),
    });
    if (!res.ok) throw new Error((await res.json()).detail || 'Game creation failed');
    return await res.json();
  }

  // PUBLIC_INTERFACE
  static async joinGame(game_id) {
    /** Joins an existing game; returns game state. */
    const res = await fetch(`${API_BASE}/games/${game_id}/join`, {
      method: 'POST',
      headers: { ...authHeaders() },
    });
    if (!res.ok) throw new Error((await res.json()).detail || 'Join game failed');
    return await res.json();
  }

  // PUBLIC_INTERFACE
  static async getGame(game_id) {
    /** Fetches current state of a specific game. */
    const res = await fetch(`${API_BASE}/games/${game_id}`, {
      headers: { ...authHeaders() },
    });
    if (!res.ok) throw new Error((await res.json()).detail || 'Fetch game failed');
    return await res.json();
  }

  // PUBLIC_INTERFACE
  static async makeMove(game_id, row, col) {
    /** Submits a move. Returns updated game state on success. */
    const res = await fetch(`${API_BASE}/games/${game_id}/move`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify({ row, col }),
    });
    if (!res.ok) throw new Error((await res.json()).detail || 'Move failed');
    return await res.json();
  }
}

// PUBLIC_INTERFACE
export class HistoryService {
  /** Handles fetching user's or public game history. */

  // PUBLIC_INTERFACE
  static async myGames() {
    /** Fetches games involving the current user. */
    const res = await fetch(`${API_BASE}/history/my`, {
      headers: { ...authHeaders() },
    });
    if (!res.ok) throw new Error((await res.json()).detail || 'Failed to fetch my games');
    return await res.json();
  }

  // PUBLIC_INTERFACE
  static async publicGames() {
    /** Fetches list of recent public games. */
    const res = await fetch(`${API_BASE}/history/public`, {
      headers: { ...authHeaders() },
    });
    if (!res.ok) throw new Error((await res.json()).detail || 'Failed to fetch public games');
    return await res.json();
  }
}
