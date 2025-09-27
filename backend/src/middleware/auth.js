'use strict';
const authService = require('../services/auth');

/**
 * Simple bearer token validator middleware.
 */
function requireAuth(req, res, next) {
  const header = req.headers['authorization'] || '';
  const parts = header.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ status: 'error', message: 'Missing or invalid Authorization header' });
  }
  const token = parts[1];
  const info = authService.verify(token);
  if (!info) {
    return res.status(401).json({ status: 'error', message: 'Invalid or expired token' });
  }
  req.user = { id: info.userId, role: info.role, token };
  return next();
}

/**
 * Role based access control
 */
function requireRole(role) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ status: 'error', message: 'Unauthorized' });
    if (req.user.role !== role) return res.status(403).json({ status: 'error', message: 'Forbidden' });
    next();
  };
}

module.exports = { requireAuth, requireRole };
