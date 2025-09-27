'use strict';
const incidentService = require('../services/incidents');

const REGIONS = [
  { id: 'north', name: 'Northern Region', center: { lat: 27.5, lng: 85.4 } },
  { id: 'south', name: 'Southern Region', center: { lat: 26.5, lng: 86.9 } },
  { id: 'east', name: 'Eastern Region', center: { lat: 27.0, lng: 87.2 } },
  { id: 'west', name: 'Western Region', center: { lat: 27.3, lng: 84.2 } },
  { id: 'central', name: 'Central Region', center: { lat: 27.7, lng: 85.3 } },
];

class MapController {
  // PUBLIC_INTERFACE
  regions(req, res) {
    /** Return a static list of regions used for map rendering. */
    return res.status(200).json({ status: 'ok', data: REGIONS });
  }

  // PUBLIC_INTERFACE
  incidents(req, res) {
    /** Return aggregated incident data by region with severity breakdown. */
    const summary = incidentService.aggregateByRegion();
    return res.status(200).json({ status: 'ok', data: summary });
  }
}

module.exports = new MapController();
