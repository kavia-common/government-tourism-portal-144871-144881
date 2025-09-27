import { listIncidents } from '../models/incident.store.js';
import { tourists } from '../models/tourist.store.js';

// PUBLIC_INTERFACE
export function getDashboardSummary() {
  /**
   Returns admin dashboard summary including counts and quick metrics.
  */
  const allIncidents = listIncidents();
  const activeIncidents = allIncidents.filter(i => i.status === 'active');
  const critical = activeIncidents.filter(i => i.severity === 'high' || i.severity === 'critical');

  const tList = Array.from(tourists.values());
  const activeTourists = tList.filter(t => t.status === 'active').length;

  return {
    totals: {
      incidents: allIncidents.length,
      incidentsActive: activeIncidents.length,
      incidentsCritical: critical.length,
      tourists: tList.length,
      touristsActive: activeTourists
    },
    recentIncidents: allIncidents
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5),
    activity: {
      anomalyIndex: Math.max(0, Math.min(100, Math.round(Math.random() * 100))), // simulated
      geofenceBreaches: allIncidents.filter(i => i.type === 'geofence-breach' && i.status === 'active').length,
      emergencies: allIncidents.filter(i => i.type === 'emergency' && i.status === 'active').length
    }
  };
}
