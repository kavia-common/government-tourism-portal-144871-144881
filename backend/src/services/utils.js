'use strict';
const crypto = require('crypto');

/**
 * Generate a pseudo JWT-like token for demo purposes.
 * DO NOT USE IN PRODUCTION.
 */
function generateToken(payload, ttlSeconds = 3600) {
  const header = Buffer.from(JSON.stringify({ alg: 'none', typ: 'JWT' })).toString('base64url');
  const exp = Math.floor(Date.now() / 1000) + ttlSeconds;
  const body = Buffer.from(JSON.stringify({ ...payload, exp })).toString('base64url');
  // no signature, just a placeholder to simulate token
  return `${header}.${body}.`;
}

/**
 * Decode pseudo token (no signature verification)
 */
function decodeToken(token) {
  const parts = token.split('.');
  if (parts.length < 2) return null;
  try {
    const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8'));
    return payload;
  } catch {
    return null;
  }
}

/**
 * Generate a numeric OTP code
 */
function generateOtp(length = 6) {
  const max = 10 ** length;
  const n = crypto.randomInt(0, max);
  return n.toString().padStart(length, '0');
}

/**
 * Generate a pseudo blockchain ID (deterministic random-like string)
 */
function generateBlockchainId() {
  return 'blk_' + crypto.randomBytes(8).toString('hex');
}

/**
 * Basic validators
 */
function isNonEmptyString(s) {
  return typeof s === 'string' && s.trim().length > 0;
}

module.exports = {
  generateToken,
  decodeToken,
  generateOtp,
  generateBlockchainId,
  isNonEmptyString,
};
