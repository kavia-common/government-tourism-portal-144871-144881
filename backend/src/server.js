import dotenv from 'dotenv';
import app from './app.js';

dotenv.config();

// Enforced defaults for this project
const PORT = Number(process.env.PORT) || 3001;
const HOST = process.env.HOST || '0.0.0.0';

// Start server and add basic diagnostics for readiness issues
const server = app.listen(PORT, HOST, () => {
  // eslint-disable-next-line no-console
  console.log(
    `Government Tourism Portal API listening on http://${HOST}:${PORT} (env: ${process.env.NODE_ENV || 'development'})`
  );
});

// Helpful listeners for diagnosing port binding and runtime errors
server.on('error', (err) => {
  // eslint-disable-next-line no-console
  console.error('Server failed to start:', err && err.message ? err.message : err);
  process.exitCode = 1;
});

// Global handlers to make failures visible in logs instead of silent exits
process.on('unhandledRejection', (reason) => {
  // eslint-disable-next-line no-console
  console.error('Unhandled Rejection:', reason);
});

process.on('uncaughtException', (err) => {
  // eslint-disable-next-line no-console
  console.error('Uncaught Exception:', err);
});
