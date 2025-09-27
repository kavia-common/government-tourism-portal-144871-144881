import { Router } from 'express';
import { requireAuth } from '../middleware/auth.middleware.js';
import { handleRegister, handleRenew, handleGetTourist, handleSearchTourists } from '../controllers/registration.controller.js';

const router = Router();

router.use(requireAuth);

// GET /api/registration/search
router.get('/search', handleSearchTourists);

// GET /api/registration/:id
router.get('/:id', handleGetTourist);

// POST /api/registration
router.post('/', handleRegister);

// POST /api/registration/:id/renew
router.post('/:id/renew', handleRenew);

export default router;
