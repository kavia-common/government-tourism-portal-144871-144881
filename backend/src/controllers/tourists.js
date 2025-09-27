'use strict';
const touristService = require('../services/tourists');

class TouristsController {
  // PUBLIC_INTERFACE
  create(req, res) {
    /** Create a tourist entry with simulated blockchainId. */
    const result = touristService.createTourist(req.body || {});
    if (!result.ok) return res.status(400).json({ status: 'error', message: result.error });
    return res.status(201).json({ status: 'ok', data: result.data });
  }

  // PUBLIC_INTERFACE
  list(req, res) {
    /** List all tourists. */
    const data = touristService.listTourists();
    return res.status(200).json({ status: 'ok', data });
  }

  // PUBLIC_INTERFACE
  getById(req, res) {
    /** Get a tourist by id. */
    const { id } = req.params;
    const result = touristService.getTourist(id);
    if (!result.ok) return res.status(404).json({ status: 'error', message: 'Tourist not found' });
    return res.status(200).json({ status: 'ok', data: result.data });
  }

  // PUBLIC_INTERFACE
  renew(req, res) {
    /** Renew a tourist by id, with optional extraDays. */
    const { id } = req.params;
    const { extraDays = 30 } = req.body || {};
    const result = touristService.renewTourist(id, extraDays);
    if (!result.ok) return res.status(404).json({ status: 'error', message: 'Tourist not found' });
    return res.status(200).json({ status: 'ok', data: result.data });
  }
}

module.exports = new TouristsController();
