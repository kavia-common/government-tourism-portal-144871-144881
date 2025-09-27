import { Router } from 'express';
import { requireAuth, requireRole } from '../middleware/auth.middleware.js';
import { handleListIncidents, handleGetIncident, handleCreateIncident, handleUpdateIncident, handleDeleteIncident } from '../controllers/incidents.controller.js';

const router = Router();

// All incident routes require auth
router.use(requireAuth);

// GET /api/incidents
router.get('/', handleListIncidents);

// GET /api/incidents/:id
router.get('/:id', handleGetIncident);

// Admin-only mutations
router.post('/', requireRole('admin'), handleCreateIncident);
router.put('/:id', requireRole('admin'), handleUpdateIncident);
router.delete('/:id', requireRole('admin'), handleDeleteIncident);

export default router;
