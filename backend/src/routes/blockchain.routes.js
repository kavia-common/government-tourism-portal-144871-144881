import { Router } from 'express';
import { requireAuth } from '../middleware/auth.middleware.js';
import { handleGetDigitalId } from '../controllers/blockchain.controller.js';

const router = Router();

router.use(requireAuth);

// GET /api/blockchain/:touristId
router.get('/:touristId', handleGetDigitalId);

export default router;
