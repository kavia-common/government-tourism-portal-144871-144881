import { createTourist, getTouristById, renewTourist, findTouristsByQuery } from '../models/tourist.store.js';
import { mintDigitalTouristId } from './blockchain.service.js';

// PUBLIC_INTERFACE
export function registerTourist(payload) {
  /**
   Creates a new tourist registration and mints a simulated Digital Tourist ID.
   Expected payload: { name, nationality, passportNumber?, idNumber?, email, phone }
  */
  if (!payload || !payload.name || !payload.nationality || !payload.email || !payload.phone) {
    const err = new Error('Missing required fields');
    err.status = 400;
    throw err;
  }
  const tourist = createTourist(payload);
  // simulate blockchain mint
  const chain = mintDigitalTouristId({ tourist });
  tourist.digitalTouristId = chain.tokenId;
  return { tourist, chain };
}

// PUBLIC_INTERFACE
export function renewRegistration(touristId) {
  /** Renews a tourist registration by one year. */
  const updated = renewTourist(touristId);
  if (!updated) {
    const err = new Error('Tourist not found');
    err.status = 404;
    throw err;
  }
  return updated;
}

// PUBLIC_INTERFACE
export function getTourist(touristId) {
  /** Returns a single tourist by ID. */
  const t = getTouristById(touristId);
  if (!t) {
    const err = new Error('Tourist not found');
    err.status = 404;
    throw err;
  }
  return t;
}

// PUBLIC_INTERFACE
export function searchTourists(query) {
  /** Simple search across tourist fields. */
  return findTouristsByQuery(query);
}
