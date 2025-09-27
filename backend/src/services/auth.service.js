import { v4 as uuidv4 } from 'uuid';
import { findUserByEmail, addUser } from '../models/user.store.js';
import { sessionsStore } from '../models/session.store.js';

// PUBLIC_INTERFACE
export function login({ email, password }) {
  /** Authenticate agent or admin users with seeded demo credentials or newly created users. Returns a session token. */
  const user = findUserByEmail(email);
  if (!user || user.password !== password) {
    const err = new Error('Invalid email or password');
    err.status = 401;
    throw err;
  }
  const token = uuidv4();
  const session = {
    token,
    user: { id: user.id, email: user.email, role: user.role, name: user.name },
    createdAt: new Date().toISOString()
  };
  sessionsStore.set(token, session);
  return session;
}

// PUBLIC_INTERFACE
export function logout(token) {
  /** Destroys the session represented by the provided token. */
  sessionsStore.remove(token);
  return { success: true };
}

// PUBLIC_INTERFACE
export function createAgent({ email, phone, password, name }) {
  /** Creates a new agent user for demo purposes. */
  const existing = findUserByEmail(email);
  if (existing) {
    const err = new Error('User with this email already exists');
    err.status = 409;
    throw err;
  }
  const user = {
    id: uuidv4(),
    email,
    phone,
    password,
    role: 'agent',
    name: name || 'Agent User'
  };
  addUser(user);
  return { id: user.id, email: user.email, role: user.role, name: user.name };
}
