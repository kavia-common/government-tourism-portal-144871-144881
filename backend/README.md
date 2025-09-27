# Government Tourism Portal - Backend

Express.js backend providing REST APIs for:
- Agent/Admin authentication
- Tourist registration and renewal
- OTP simulation (email/phone)
- Simulated blockchain-based Digital Tourist ID generation
- Admin dashboard aggregation
- Incident/Alert management

## Quick Start

1. Install dependencies
   npm install

2. Setup environment
   cp .env.example .env
   # Edit .env if needed (PORT, HOST, CORS_ORIGINS, etc.)

3. Run in development
   npm run dev

4. Production run
   npm start

Server will listen on HOST:PORT. By default PORT=4000, but many orchestrators and the paired frontend expect the backend on port 3001. Set PORT=3001 in your .env to match that expectation.

Health endpoints:
- GET / (root service descriptor)
- GET /api/health (liveness/readiness)

## Auth

- POST /api/auth/login
  { "email": "agent@example.gov", "password": "agent123" } or admin credentials.
  Returns: { token, user }
  Include x-session-token header for protected routes.

- POST /api/auth/logout (requires auth)
  Header: x-session-token

- POST /api/auth/agents
  Creates an agent for testing:
  { email, phone, password, name? }

## OTP (Simulated)

- POST /api/otp/send
  { target: "email@example.com" } or phone string, returns code in non-production.

- POST /api/otp/verify
  { target, code }

## Registration (Requires Auth)

- GET /api/registration/search?name=...&nationality=...
- GET /api/registration/:id
- POST /api/registration
  { name, nationality, email, phone, passportNumber?, idNumber? }
  Automatically mints a simulated Digital Tourist ID.

- POST /api/registration/:id/renew

## Blockchain (Requires Auth)

- GET /api/blockchain/:touristId
  Returns simulated on-chain record (if minted).

## Dashboard (Admin Only)

- GET /api/dashboard/summary

## Incidents

- GET /api/incidents (Requires Auth)
- GET /api/incidents/:id (Requires Auth)
- POST /api/incidents (Admin only)
- PUT /api/incidents/:id (Admin only)
- DELETE /api/incidents/:id (Admin only)

## Notes

- All data stores are in-memory for demo purposes.
- OTP and Blockchain are simulated.
- CORS origins configured via CORS_ORIGINS in .env
- If the backend doesn’t appear to start, ensure no other process is using the configured PORT and that HOST is set to 0.0.0.0 in containerized environments.
