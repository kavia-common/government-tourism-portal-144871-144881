import { registerTourist, renewRegistration, getTourist, searchTourists } from '../services/registration.service.js';

// PUBLIC_INTERFACE
export async function handleRegister(req, res, next) {
  /**
   summary: Register Tourist
   description: Registers a new tourist and mints a simulated Digital Tourist ID.
   body: { name, nationality, passportNumber?, idNumber?, email, phone }
   returns: { tourist, chain }
  */
  try {
    const result = registerTourist(req.body || {});
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

// PUBLIC_INTERFACE
export async function handleRenew(req, res, next) {
  /**
   summary: Renew Tourist Registration
   description: Renews an existing tourist by ID.
   params: { id: string }
   returns: tourist
  */
  try {
    const { id } = req.params;
    const tourist = renewRegistration(id);
    res.json(tourist);
  } catch (err) {
    next(err);
  }
}

// PUBLIC_INTERFACE
export async function handleGetTourist(req, res, next) {
  /**
   summary: Get Tourist
   description: Get a tourist by ID.
   params: { id: string }
   returns: tourist
  */
  try {
    const { id } = req.params;
    const tourist = getTourist(id);
    res.json(tourist);
  } catch (err) {
    next(err);
  }
}

// PUBLIC_INTERFACE
export async function handleSearchTourists(req, res, next) {
  /**
   summary: Search Tourists
   description: Search tourists by simple query parameters (name, nationality, email, phone).
   query: any fields
   returns: tourist[]
  */
  try {
    const items = searchTourists(req.query || {});
    res.json(items);
  } catch (err) {
    next(err);
  }
}
