import { sessionsStore } from '../models/session.store.js';

/**
 * Simple session-based auth using in-memory store. In a real system, use JWT or session DB.
 */
export function requireAuth(req, res, next) {
  const token = req.headers['x-session-token'];
  if (!token) return res.status(401).json({ error: 'Missing x-session-token' });

  const session = sessionsStore.get(token);
  if (!session) return res.status(401).json({ error: 'Invalid or expired session' });

  req.user = session.user;
  next();
}

/**
 * Role guard: 'agent' or 'admin'
 */
export function requireRole(role) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'Unauthenticated' });
    if (req.user.role !== role) return res.status(403).json({ error: 'Forbidden: insufficient role' });
    next();
  };
}
