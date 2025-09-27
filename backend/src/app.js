import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes.js';
import registrationRoutes from './routes/registration.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import incidentsRoutes from './routes/incidents.routes.js';
import otpRoutes from './routes/otp.routes.js';
import blockchainRoutes from './routes/blockchain.routes.js';

import { notFoundHandler, errorHandler } from './middleware/error.middleware.js';
import { corsConfig } from './config/cors.js';

dotenv.config();

const app = express();

// Security & utilities
app.use(helmet());
app.use(cors(corsConfig));
app.use(express.json({ limit: '1mb' }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Root and health checks
// PUBLIC_INTERFACE
app.get('/', (req, res) => {
  /** Root endpoint. Provides a minimal service descriptor for quick checks. */
  res.json({
    name: 'Government Tourism Portal API',
    version: '1.0.0',
    status: 'ok'
  });
});

// PUBLIC_INTERFACE
app.get('/api/health', (req, res) => {
  /** Health check endpoint. Useful for liveness/readiness probes. */
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// PUBLIC_INTERFACE
app.get('/api/docs', (req, res) => {
  /**
   Minimal API docs descriptor. Frontend can use this to list endpoints or link to external docs.
   For this demo, we provide route groups and base path.
  */
  res.json({
    title: 'Government Tourism Portal API',
    description: 'REST API for authentication, registration/renewal, OTP simulation, simulated blockchain ID, dashboard, and incident management.',
    version: '1.0.0',
    basePath: '/api',
    groups: [
      { name: 'Auth', base: '/api/auth' },
      { name: 'OTP', base: '/api/otp' },
      { name: 'Registration', base: '/api/registration' },
      { name: 'Blockchain', base: '/api/blockchain' },
      { name: 'Dashboard', base: '/api/dashboard' },
      { name: 'Incidents', base: '/api/incidents' }
    ]
  });
});

// Mount route groups
app.use('/api/auth', authRoutes);
app.use('/api/otp', otpRoutes);
app.use('/api/registration', registrationRoutes);
app.use('/api/blockchain', blockchainRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/incidents', incidentsRoutes);

// 404 and error handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
