'use strict';
const store = require('./store');
const { generateBlockchainId, isNonEmptyString } = require('./utils');

class TouristService {
  // PUBLIC_INTERFACE
  createTourist(payload) {
    /** Create a new tourist record with a simulated blockchainId. */
    const {
      fullName, passportNumber, nationality, phone, email, validityDays = 90,
    } = payload || {};
    if (!isNonEmptyString(fullName) || !isNonEmptyString(passportNumber)) {
      return { ok: false, error: 'fullName and passportNumber are required' };
    }

    const id = store.generateId('tourist');
    const blockchainId = generateBlockchainId();
    const now = new Date();
    const expiresAt = new Date(now.getTime() + Number(validityDays) * 24 * 60 * 60 * 1000);

    const tourist = {
      id,
      blockchainId,
      fullName,
      passportNumber,
      nationality: nationality || null,
      phone: phone || null,
      email: email || null,
      status: 'ACTIVE',
      validUntil: expiresAt.toISOString(),
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };

    store.tourists.set(id, tourist);
    return { ok: true, data: tourist };
  }

  // PUBLIC_INTERFACE
  getTourist(id) {
    /** Fetch a tourist by id. */
    const t = store.tourists.get(id);
    if (!t) return { ok: false, error: 'NOT_FOUND' };
    return { ok: true, data: t };
  }

  // PUBLIC_INTERFACE
  listTourists() {
    /** List all tourists. */
    return Array.from(store.tourists.values());
  }

  // PUBLIC_INTERFACE
  renewTourist(id, extraDays = 30) {
    /** Renew tourist validity by extraDays. */
    const t = store.tourists.get(id);
    if (!t) return { ok: false, error: 'NOT_FOUND' };
    const base = new Date(t.validUntil || Date.now());
    const newDate = new Date(base.getTime() + Number(extraDays) * 24 * 60 * 60 * 1000);
    t.validUntil = newDate.toISOString();
    t.status = 'ACTIVE';
    t.updatedAt = new Date().toISOString();
    store.tourists.set(id, t);
    return { ok: true, data: t };
  }
}

module.exports = new TouristService();
