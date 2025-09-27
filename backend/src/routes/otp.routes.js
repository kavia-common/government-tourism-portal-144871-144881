import { Router } from 'express';
import { handleSendOtp, handleVerifyOtp } from '../controllers/otp.controller.js';

const router = Router();

// POST /api/otp/send
router.post('/send', handleSendOtp);

// POST /api/otp/verify
router.post('/verify', handleVerifyOtp);

export default router;
