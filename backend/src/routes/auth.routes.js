import { Router } from 'express';
import { handleLogin, handleLogout, handleCreateAgent } from '../controllers/auth.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = Router();

// POST /api/auth/login
router.post('/login', handleLogin);

// POST /api/auth/logout
router.post('/logout', requireAuth, handleLogout);

// POST /api/auth/agents
router.post('/agents', handleCreateAgent);

export default router;
