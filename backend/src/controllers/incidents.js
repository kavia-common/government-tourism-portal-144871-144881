'use strict';
const incidentService = require('../services/incidents');

class IncidentsController {
  // PUBLIC_INTERFACE
  create(req, res) {
    /** Create an incident. */
    const result = incidentService.createIncident(req.body || {});
    if (!result.ok) return res.status(400).json({ status: 'error', message: result.error });
    return res.status(201).json({ status: 'ok', data: result.data });
  }

  // PUBLIC_INTERFACE
  list(req, res) {
    /** List incidents, optionally filter by region or status. */
    const { region, status } = req.query || {};
    const data = incidentService.listIncidents({ region, status });
    return res.status(200).json({ status: 'ok', data });
  }

  // PUBLIC_INTERFACE
  getById(req, res) {
    /** Get incident by id. */
    const { id } = req.params;
    const result = incidentService.getIncident(id);
    if (!result.ok) return res.status(404).json({ status: 'error', message: 'Incident not found' });
    return res.status(200).json({ status: 'ok', data: result.data });
  }

  // PUBLIC_INTERFACE
  update(req, res) {
    /** Update incident fields. */
    const { id } = req.params;
    const result = incidentService.updateIncident(id, req.body || {});
    if (!result.ok) return res.status(404).json({ status: 'error', message: 'Incident not found' });
    return res.status(200).json({ status: 'ok', data: result.data });
  }

  // PUBLIC_INTERFACE
  delete(req, res) {
    /** Delete an incident. */
    const { id } = req.params;
    const ok = incidentService.deleteIncident(id);
    if (!ok) return res.status(404).json({ status: 'error', message: 'Incident not found' });
    return res.status(200).json({ status: 'ok', deleted: true });
  }
}

module.exports = new IncidentsController();
