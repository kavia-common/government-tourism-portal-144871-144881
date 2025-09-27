import { login, logout, createAgent } from '../services/auth.service.js';

// PUBLIC_INTERFACE
export async function handleLogin(req, res, next) {
  /**
   summary: Agent/Admin login
   description: Authenticates a user (agent or admin) using demo credentials and returns a session token.
   body: { email, password }
   returns: { token, user }
  */
  try {
    const { email, password } = req.body || {};
    const session = login({ email, password });
    res.json({ token: session.token, user: session.user });
  } catch (err) {
    next(err);
  }
}

// PUBLIC_INTERFACE
export async function handleLogout(req, res, next) {
  /**
   summary: Logout
   description: Ends the current session using x-session-token header.
   headers: x-session-token
   returns: { success: true }
  */
  try {
    const token = req.headers['x-session-token'];
    const result = logout(token);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

// PUBLIC_INTERFACE
export async function handleCreateAgent(req, res, next) {
  /**
   summary: Create Agent (Demo)
   description: Creates a new agent for testing flows.
   body: { email, phone, password, name }
   returns: { id, email, role, name }
  */
  try {
    const data = createAgent(req.body || {});
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
}
