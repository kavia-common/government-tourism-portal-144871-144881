import dotenv from 'dotenv';
dotenv.config();

// Default to allowing http://localhost:3000 if CORS_ORIGINS is not provided
const defaultOrigins = ['http://localhost:3000'];
const configured = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

const allowedOrigins = configured.length > 0 ? configured : defaultOrigins;

export const corsConfig = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow server-to-server, curl, or same-origin
    if (allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'), false);
  },
  credentials: true,
};
