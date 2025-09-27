# government-tourism-portal-144871-144881

Backend (Express) runs on port 3001 by default.

- Start (dev): cd backend && npm install && npm run dev
- Open API Docs: http://localhost:3001/docs
- Generate openapi.json: npm run openapi:generate

Implemented endpoints (in-memory data):
- Auth: POST /auth/agent/login, POST /auth/admin/login, POST /auth/refresh, POST /auth/logout
- OTP: POST /otp/request, POST /otp/verify
- Tourists: GET /tourists, POST /tourists, GET /tourists/:id, POST /tourists/:id/renew
- Incidents: GET /incidents, POST /incidents, GET /incidents/:id, PUT /incidents/:id, DELETE /incidents/:id
- Map: GET /map/regions, GET /map/incidents

Note: Tokens are pseudo JWTs for demo purposes only. Do not use in production.