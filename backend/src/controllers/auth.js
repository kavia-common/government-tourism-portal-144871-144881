'use strict';
const authService = require('../services/auth');

class AuthController {
  /**
   * Agent login
   */
  // PUBLIC_INTERFACE
  agentLogin(req, res) {
    /** Login for agents using username/password. Returns tokens and user info. */
    const { username, password } = req.body || {};
    const result = authService.login(username, password, 'agent');
    if (!result) {
      return res.status(401).json({ status: 'error', message: 'Invalid credentials' });
    }
    return res.status(200).json({ status: 'ok', ...result });
  }

  /**
   * Admin login
   */
  // PUBLIC_INTERFACE
  adminLogin(req, res) {
    /** Login for admin users using username/password. */
    const { username, password } = req.body || {};
    const result = authService.login(username, password, 'admin');
    if (!result) {
      return res.status(401).json({ status: 'error', message: 'Invalid credentials' });
    }
    return res.status(200).json({ status: 'ok', ...result });
  }

  /**
   * Refresh token
   */
  // PUBLIC_INTERFACE
  refresh(req, res) {
    /** Exchange refresh token for a new access token. */
    const { refreshToken } = req.body || {};
    if (!refreshToken) return res.status(400).json({ status: 'error', message: 'refreshToken required' });
    const result = authService.refresh(refreshToken);
    if (!result) return res.status(401).json({ status: 'error', message: 'Invalid refresh token' });
    return res.status(200).json({ status: 'ok', ...result });
  }

  /**
   * Logout
   */
  // PUBLIC_INTERFACE
  logout(req, res) {
    /** Revoke current access token. */
    const token = (req.headers['authorization'] || '').split(' ')[1];
    if (!token) return res.status(400).json({ status: 'error', message: 'No token presented' });
    const ok = authService.logout(token);
    return res.status(200).json({ status: 'ok', revoked: ok });
  }
}

module.exports = new AuthController();
