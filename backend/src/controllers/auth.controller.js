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
```

Explanation: OTP controller
````write file="government-tourism-portal-144871-144881/backend/src/controllers/otp.controller.js"
import { sendOtp, verifyOtp } from '../services/otp.service.js';

// PUBLIC_INTERFACE
export async function handleSendOtp(req, res, next) {
  /**
   summary: Send OTP (Simulated)
   description: Generates and stores an OTP for an email or phone. Returns code in non-production for demo.
   body: { target: string } // email or phone
   returns: { target, expiresAt, sentAt, code? }
  */
  try {
    const { target } = req.body || {};
    if (!target) {
      const err = new Error('target is required');
      err.status = 400;
      throw err;
    }
    const result = sendOtp({ target });
    res.json(result);
  } catch (err) {
    next(err);
  }
}

// PUBLIC_INTERFACE
export async function handleVerifyOtp(req, res, next) {
  /**
   summary: Verify OTP (Simulated)
   description: Verifies a previously generated OTP.
   body: { target: string, code: string }
   returns: { valid: boolean, reason: string }
  */
  try {
    const { target, code } = req.body || {};
    if (!target || !code) {
      const err = new Error('target and code are required');
      err.status = 400;
      throw err;
    }
    const result = verifyOtp({ target, code });
    res.json(result);
  } catch (err) {
    next(err);
  }
}
