import { v4 as uuidv4 } from 'uuid';

/**
 * Incident structure:
 * {
 *   id: string,
 *   type: 'geofence-breach' | 'emergency' | 'anomaly' | 'general',
 *   title: string,
 *   description: string,
 *   status: 'active' | 'resolved',
 *   severity: 'low' | 'medium' | 'high' | 'critical',
 *   location: { lat: number, lng: number },
 *   createdAt: ISO,
 *   updatedAt: ISO,
 *   assignedTo?: string
 * }
 */

export const incidents = new Map();

// Seed a few
const seed = [
  {
    id: uuidv4(),
    type: 'geofence-breach',
    title: 'Perimeter alert near Fort Area',
    description: 'Tourist device moved outside designated zone.',
    status: 'active',
    severity: 'medium',
    location: { lat: 28.614, lng: 77.209 },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    type: 'emergency',
    title: 'SOS from City Center',
    description: 'Emergency button pressed by tourist.',
    status: 'active',
    severity: 'high',
    location: { lat: 28.61, lng: 77.23 },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];
seed.forEach(item => incidents.set(item.id, item));

export function listIncidents() {
  return Array.from(incidents.values());
}

export function getIncident(id) {
  return incidents.get(id);
}

export function createIncident(payload) {
  const now = new Date().toISOString();
  const incident = {
    id: uuidv4(),
    status: 'active',
    severity: 'low',
    ...payload,
    createdAt: now,
    updatedAt: now
  };
  incidents.set(incident.id, incident);
  return incident;
}

export function updateIncident(id, changes) {
  const existing = incidents.get(id);
  if (!existing) return null;
  const updated = { ...existing, ...changes, updatedAt: new Date().toISOString() };
  incidents.set(id, updated);
  return updated;
}

export function deleteIncident(id) {
  return incidents.delete(id);
}
