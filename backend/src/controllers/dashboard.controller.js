import { getDashboardSummary } from '../services/dashboard.service.js';

// PUBLIC_INTERFACE
export async function handleDashboardSummary(req, res, next) {
  /**
   summary: Admin Dashboard Summary
   description: Returns aggregated data for admin dashboard cards and widgets.
   returns: { totals, recentIncidents, activity }
  */
  try {
    const data = getDashboardSummary();
    res.json(data);
  } catch (err) {
    next(err);
  }
}
