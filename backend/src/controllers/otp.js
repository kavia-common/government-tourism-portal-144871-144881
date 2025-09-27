'use strict';
const otpService = require('../services/otp');

class OtpController {
  // PUBLIC_INTERFACE
  request(req, res) {
    /** Request OTP for a provided identifier (phone/email). */
    const { identifier } = req.body || {};
    const result = otpService.requestOtp(identifier);
    if (!result) return res.status(400).json({ status: 'error', message: 'identifier required' });
    // For demo purposes we return the OTP code as well.
    return res.status(200).json({ status: 'ok', ...result });
  }

  // PUBLIC_INTERFACE
  verify(req, res) {
    /** Verify OTP code for identifier. */
    const { identifier, code } = req.body || {};
    if (!identifier || !code) return res.status(400).json({ status: 'error', message: 'identifier and code required' });
    const result = otpService.verifyOtp(identifier, code);
    if (!result.ok) return res.status(400).json({ status: 'error', message: result.reason || 'Verification failed' });
    return res.status(200).json({ status: 'ok', verified: true });
  }
}

module.exports = new OtpController();
