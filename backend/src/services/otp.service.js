import dotenv from 'dotenv';
import { setOtp, verifyOtp as verifyOtpStore } from '../models/otp.store.js';
dotenv.config();

const DEFAULT_TTL = Number(process.env.OTP_TTL_SECONDS || 300);

function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000)); // 6-digit
}

// PUBLIC_INTERFACE
export function sendOtp({ target }) {
  /** Simulates sending an OTP to an email or phone. Returns the code in development for demo; in prod, do not return code. */
  const code = generateOtp();
  const { expiresAt } = setOtp(target, code, DEFAULT_TTL);
  const payload = {
    target,
    expiresAt,
    sentAt: Date.now()
  };
  // For simulation, we return the code; for production hide this.
  if (process.env.NODE_ENV !== 'production') {
    return { ...payload, code };
  }
  return payload;
}

// PUBLIC_INTERFACE
export function verifyOtp({ target, code }) {
  /** Verifies a previously generated OTP for an email or phone. */
  return verifyOtpStore(target, code);
}
