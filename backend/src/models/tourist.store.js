import { v4 as uuidv4 } from 'uuid';

export const tourists = new Map();
/**
 * Tourist structure:
 * {
 *   id: string,
 *   name: string,
 *   nationality: string,
 *   passportNumber?: string,
 *   idNumber?: string, // for domestic
 *   email: string,
 *   phone: string,
 *   status: 'active' | 'expired',
 *   registrationDate: ISO,
 *   expiryDate: ISO,
 *   digitalTouristId?: string, // simulated blockchain ID
 *   history: Array<{ action: 'registered'|'renewed', date: ISO }>
 * }
 */

export function createTourist(payload) {
  const id = uuidv4();
  const now = new Date();
  const expiry = new Date(now);
  expiry.setFullYear(now.getFullYear() + 1);

  const tourist = {
    id,
    ...payload,
    status: 'active',
    registrationDate: now.toISOString(),
    expiryDate: expiry.toISOString(),
    history: [{ action: 'registered', date: now.toISOString() }]
  };
  tourists.set(id, tourist);
  return tourist;
}

export function getTouristById(id) {
  return tourists.get(id);
}

export function findTouristsByQuery(query = {}) {
  const list = Array.from(tourists.values());
  return list.filter(t => {
    return Object.entries(query).every(([k, v]) => {
      if (v == null || v === '') return true;
      return String(t[k] || '').toLowerCase().includes(String(v).toLowerCase());
    });
  });
}

export function renewTourist(id) {
  const t = tourists.get(id);
  if (!t) return null;
  const now = new Date();
  const expiry = new Date(t.expiryDate ? t.expiryDate : now);
  expiry.setFullYear(expiry.getFullYear() + 1);
  t.expiryDate = expiry.toISOString();
  t.status = 'active';
  t.history.push({ action: 'renewed', date: now.toISOString() });
  tourists.set(id, t);
  return t;
}
