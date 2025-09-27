'use strict';

/**
 * Simple in-memory data store to simulate persistence.
 * This can be replaced later by a database or external services.
 */
class InMemoryStore {
  constructor() {
    this.tokens = new Map(); // token -> { userId, role, expiresAt, refreshToken }
    this.refreshTokens = new Map(); // refreshToken -> token
    this.otp = new Map(); // identifier -> { code, expiresAt, attempts }
    this.tourists = new Map(); // id -> tourist
    this.incidents = new Map(); // id -> incident
    this.idCounters = {
      tourist: 1,
      incident: 1,
    };
  }

  // PUBLIC_INTERFACE
  generateId(prefix) {
    /** Generate an auto-incrementing id string with a prefix. */
    const count = this.idCounters[prefix] || 1;
    this.idCounters[prefix] = count + 1;
    return `${prefix}-${count}`;
  }
}

module.exports = new InMemoryStore();
