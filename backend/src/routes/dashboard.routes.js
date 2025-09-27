import { Router } from 'express';
import { requireAuth, requireRole } from '../middleware/auth.middleware.js';
import { handleDashboardSummary } from '../controllers/dashboard.controller.js';

const router = Router();

router.use(requireAuth);
router.use(requireRole('admin'));

// GET /api/dashboard/summary
router.get('/summary', handleDashboardSummary);

export default router;
