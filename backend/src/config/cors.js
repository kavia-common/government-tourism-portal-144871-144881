import dotenv from 'dotenv';
dotenv.config();

const allowedOrigins = (process.env.CORS_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);

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
