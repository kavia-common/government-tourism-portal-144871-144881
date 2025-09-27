'use strict';
const store = require('./store');
const { generateOtp, isNonEmptyString } = require('./utils');

const OTP_TTL_MS = 5 * 60 * 1000; // 5 minutes
const MAX_ATTEMPTS = 5;

class OtpService {
  // PUBLIC_INTERFACE
  requestOtp(identifier) {
    /** Generate and store OTP for an identifier (phone/email). */
    if (!isNonEmptyString(identifier)) return null;
    const code = generateOtp(6);
    const expiresAt = Date.now() + OTP_TTL_MS;
    store.otp.set(identifier, { code, expiresAt, attempts: 0 });
    // In real world, send via SMS/Email. For demo, return the code.
    return { identifier, code, expiresAt };
  }

  // PUBLIC_INTERFACE
  verifyOtp(identifier, code) {
    /** Verify the OTP code for an identifier. */
    const entry = store.otp.get(identifier);
    if (!entry) return { ok: false, reason: 'NOT_FOUND' };
    if (Date.now() > entry.expiresAt) {
      store.otp.delete(identifier);
      return { ok: false, reason: 'EXPIRED' };
    }
    if (entry.attempts >= MAX_ATTEMPTS) {
      store.otp.delete(identifier);
      return { ok: false, reason: 'MAX_ATTEMPTS' };
    }
    entry.attempts += 1;
    if (entry.code === code) {
      store.otp.delete(identifier);
      return { ok: true };
    }
    return { ok: false, reason: 'INVALID' };
  }
}

module.exports = new OtpService();
