export const otps = new Map();
/**
 * OTP structure:
 * key: email or phone string
 * value: { code: string, expiresAt: number(timestamp ms) }
 */

export function setOtp(key, code, ttlSeconds) {
  const expiresAt = Date.now() + ttlSeconds * 1000;
  otps.set(key, { code, expiresAt });
  return { code, expiresAt };
}

export function verifyOtp(key, code) {
  const entry = otps.get(key);
  if (!entry) return { valid: false, reason: 'not_found' };
  if (Date.now() > entry.expiresAt) {
    otps.delete(key);
    return { valid: false, reason: 'expired' };
  }
  const valid = entry.code === code;
  if (valid) otps.delete(key);
  return { valid, reason: valid ? 'ok' : 'mismatch' };
}
