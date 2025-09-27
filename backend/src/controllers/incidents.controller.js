import { listIncidents, getIncident, createIncident, updateIncident, deleteIncident } from '../models/incident.store.js';

// PUBLIC_INTERFACE
export async function handleListIncidents(req, res, next) {
  /**
   summary: List Incidents
   description: Returns all incidents.
   returns: Incident[]
  */
  try {
    res.json(listIncidents());
  } catch (err) {
    next(err);
  }
}

// PUBLIC_INTERFACE
export async function handleGetIncident(req, res, next) {
  /**
   summary: Get Incident
   description: Returns incident by ID.
   params: { id }
   returns: Incident
  */
  try {
    const { id } = req.params;
    const inc = getIncident(id);
    if (!inc) return res.status(404).json({ error: 'Incident not found' });
    res.json(inc);
  } catch (err) {
    next(err);
  }
}

// PUBLIC_INTERFACE
export async function handleCreateIncident(req, res, next) {
  /**
   summary: Create Incident
   description: Creates a new incident (admin only).
   body: { type, title, description, severity, location }
   returns: Incident
  */
  try {
    const inc = createIncident(req.body || {});
    res.status(201).json(inc);
  } catch (err) {
    next(err);
  }
}

// PUBLIC_INTERFACE
export async function handleUpdateIncident(req, res, next) {
  /**
   summary: Update Incident
   description: Updates incident fields (status, severity, assignment).
   params: { id }
   body: Partial<Incident>
   returns: Incident
  */
  try {
    const { id } = req.params;
    const updated = updateIncident(id, req.body || {});
    if (!updated) return res.status(404).json({ error: 'Incident not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

// PUBLIC_INTERFACE
export async function handleDeleteIncident(req, res, next) {
  /**
   summary: Delete Incident
   description: Deletes an incident (admin only).
   params: { id }
   returns: { success: boolean }
  */
  try {
    const { id } = req.params;
    const ok = deleteIncident(id);
    if (!ok) return res.status(404).json({ error: 'Incident not found' });
    res.json({ success: ok });
  } catch (err) {
    next(err);
  }
}
