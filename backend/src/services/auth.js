'use strict';
const store = require('./store');
const { generateToken, decodeToken } = require('./utils');

const ACCESS_TTL = 60 * 60; // 1 hour
const REFRESH_TTL = 60 * 60 * 24 * 7; // 7 days

/**
 * In-memory "users" simulation.
 * For demo: a couple of agents and one admin.
 * Passwords are plain text for demo only.
 */
const USERS = [
  { id: 'agent-1', role: 'agent', username: 'agent1', password: 'password123', name: 'Agent One' },
  { id: 'agent-2', role: 'agent', username: 'agent2', password: 'password123', name: 'Agent Two' },
  { id: 'admin-1', role: 'admin', username: 'admin', password: 'adminpass', name: 'Admin User' },
];

class AuthService {
  // PUBLIC_INTERFACE
  login(username, password, role) {
    /** Validate credentials, issue tokens, and store them in-memory. */
    const user = USERS.find(u => u.username === username && u.password === password && u.role === role);
    if (!user) return null;
    const accessToken = generateToken({ sub: user.id, role: user.role }, ACCESS_TTL);
    const refreshToken = generateToken({ sub: user.id, role: user.role, type: 'refresh' }, REFRESH_TTL);
    const payload = decodeToken(accessToken);
    const expiresAt = payload ? payload.exp * 1000 : Date.now() + ACCESS_TTL * 1000;
    store.tokens.set(accessToken, { userId: user.id, role: user.role, expiresAt, refreshToken });
    store.refreshTokens.set(refreshToken, accessToken);
    return { accessToken, refreshToken, user: { id: user.id, name: user.name, role: user.role } };
  }

  // PUBLIC_INTERFACE
  refresh(refreshToken) {
    /** Exchange refresh token for a new access token. */
    const existingAccess = store.refreshTokens.get(refreshToken);
    if (!existingAccess) return null;
    const old = store.tokens.get(existingAccess);
    if (!old) return null;
    // issue new access
    const accessToken = generateToken({ sub: old.userId, role: old.role }, ACCESS_TTL);
    const payload = decodeToken(accessToken);
    const expiresAt = payload ? payload.exp * 1000 : Date.now() + ACCESS_TTL * 1000;
    store.tokens.set(accessToken, { userId: old.userId, role: old.role, expiresAt, refreshToken });
    return { accessToken, expiresAt };
  }

  // PUBLIC_INTERFACE
  logout(accessToken) {
    /** Revoke access token and corresponding refresh token. */
    const entry = store.tokens.get(accessToken);
    if (entry) {
      store.tokens.delete(accessToken);
      if (entry.refreshToken) {
        store.refreshTokens.delete(entry.refreshToken);
      }
      return true;
    }
    return false;
  }

  // PUBLIC_INTERFACE
  verify(accessToken) {
    /** Verify token validity (expiry). */
    const info = store.tokens.get(accessToken);
    if (!info) return null;
    if (Date.now() >= info.expiresAt) {
      // expired
      store.tokens.delete(accessToken);
      return null;
    }
    return info;
  }
}

module.exports = new AuthService();
