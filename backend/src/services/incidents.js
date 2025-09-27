'use strict';
const store = require('./store');

class IncidentService {
  // PUBLIC_INTERFACE
  createIncident(payload) {
    /** Create a new incident. */
    const {
      title, description, severity = 'low', region = 'unknown', coords,
    } = payload || {};
    if (!title) return { ok: false, error: 'title required' };
    const id = store.generateId('incident');
    const now = new Date().toISOString();
    const incident = {
      id,
      title,
      description: description || '',
      severity,
      region,
      status: 'open',
      coords: coords || null,
      createdAt: now,
      updatedAt: now,
    };
    store.incidents.set(id, incident);
    return { ok: true, data: incident };
  }

  // PUBLIC_INTERFACE
  listIncidents(filter = {}) {
    /** List incidents with optional filter by region or status. */
    const items = Array.from(store.incidents.values());
    let res = items;
    if (filter.region) {
      res = res.filter(i => i.region === filter.region);
    }
    if (filter.status) {
      res = res.filter(i => i.status === filter.status);
    }
    return res;
  }

  // PUBLIC_INTERFACE
  getIncident(id) {
    /** Get one incident. */
    const i = store.incidents.get(id);
    if (!i) return { ok: false, error: 'NOT_FOUND' };
    return { ok: true, data: i };
  }

  // PUBLIC_INTERFACE
  updateIncident(id, patch) {
    /** Update incident fields. */
    const i = store.incidents.get(id);
    if (!i) return { ok: false, error: 'NOT_FOUND' };
    const updatable = ['title', 'description', 'severity', 'region', 'status', 'coords'];
    for (const key of updatable) {
      if (key in patch) {
        i[key] = patch[key];
      }
    }
    i.updatedAt = new Date().toISOString();
    store.incidents.set(id, i);
    return { ok: true, data: i };
  }

  // PUBLIC_INTERFACE
  deleteIncident(id) {
    /** Delete an incident. */
    const existed = store.incidents.delete(id);
    return existed;
  }

  // PUBLIC_INTERFACE
  aggregateByRegion() {
    /** Summarize counts by region and severity. */
    const items = Array.from(store.incidents.values());
    const map = new Map();
    for (const it of items) {
      const r = it.region || 'unknown';
      if (!map.has(r)) map.set(r, { region: r, total: 0, open: 0, closed: 0, severity: { low: 0, medium: 0, high: 0 } });
      const entry = map.get(r);
      entry.total += 1;
      if (it.status === 'open') entry.open += 1;
      if (it.status === 'closed') entry.closed += 1;
      if (entry.severity[it.severity] !== undefined) entry.severity[it.severity] += 1;
      map.set(r, entry);
    }
    return Array.from(map.values());
  }
}

module.exports = new IncidentService();
