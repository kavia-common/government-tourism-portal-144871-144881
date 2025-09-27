const express = require('express');
const healthController = require('../controllers/health');
const authController = require('../controllers/auth');
const otpController = require('../controllers/otp');
const touristsController = require('../controllers/tourists');
const incidentsController = require('../controllers/incidents');
const mapController = require('../controllers/map');
const { requireAuth, requireRole } = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Health
 *     description: Service health check
 *   - name: Auth
 *     description: Agent and Admin authentication flows
 *   - name: OTP
 *     description: OTP request and verification
 *   - name: Tourists
 *     description: Tourist registration, retrieval, and renewal
 *   - name: Incidents
 *     description: Incident reporting and management
 *   - name: Map
 *     description: Map region data and aggregated incident info
 */

/**
 * @swagger
 * /:
 *   get:
 *     tags: [Health]
 *     summary: Health endpoint
 *     description: Returns the current health status of the service.
 *     responses:
 *       200:
 *         description: Service health check passed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 message:
 *                   type: string
 *                   example: Service is healthy
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 environment:
 *                   type: string
 *                   example: development
 */
router.get('/', healthController.check.bind(healthController));

/**
 * @swagger
 * /auth/agent/login:
 *   post:
 *     tags: [Auth]
 *     summary: Agent login
 *     description: Authenticate an agent using username and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, password]
 *             properties:
 *               username: { type: string, example: "agent1" }
 *               password: { type: string, example: "password123" }
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Invalid credentials
 */
router.post('/auth/agent/login', authController.agentLogin.bind(authController));

/**
 * @swagger
 * /auth/admin/login:
 *   post:
 *     tags: [Auth]
 *     summary: Admin login
 *     description: Authenticate an admin using username and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, password]
 *             properties:
 *               username: { type: string, example: "admin" }
 *               password: { type: string, example: "adminpass" }
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Invalid credentials
 */
router.post('/auth/admin/login', authController.adminLogin.bind(authController));

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     tags: [Auth]
 *     summary: Refresh access token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [refreshToken]
 *             properties:
 *               refreshToken: { type: string }
 *     responses:
 *       200:
 *         description: New access token issued
 *       401:
 *         description: Invalid refresh token
 */
router.post('/auth/refresh', authController.refresh.bind(authController));

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     tags: [Auth]
 *     summary: Logout current user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout result
 *       401:
 *         description: Unauthorized
 */
router.post('/auth/logout', requireAuth, authController.logout.bind(authController));

/**
 * @swagger
 * /otp/request:
 *   post:
 *     tags: [OTP]
 *     summary: Request OTP
 *     description: Request an OTP for a provided identifier (phone/email).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [identifier]
 *             properties:
 *               identifier: { type: string, example: "+15551234567" }
 *     responses:
 *       200:
 *         description: OTP generated
 *       400:
 *         description: Bad request
 */
router.post('/otp/request', otpController.request.bind(otpController));

/**
 * @swagger
 * /otp/verify:
 *   post:
 *     tags: [OTP]
 *     summary: Verify OTP
 *     description: Verify a submitted OTP code for an identifier.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [identifier, code]
 *             properties:
 *               identifier: { type: string, example: "+15551234567" }
 *               code: { type: string, example: "123456" }
 *     responses:
 *       200:
 *         description: OTP verified
 *       400:
 *         description: Verification failed
 */
router.post('/otp/verify', otpController.verify.bind(otpController));

/**
 * @swagger
 * /tourists:
 *   get:
 *     tags: [Tourists]
 *     summary: List tourists
 *     security: [ { bearerAuth: [] } ]
 *     responses:
 *       200:
 *         description: List of tourists
 *   post:
 *     tags: [Tourists]
 *     summary: Create tourist
 *     description: Create a new tourist record with a simulated blockchainId.
 *     security: [ { bearerAuth: [] } ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [fullName, passportNumber]
 *             properties:
 *               fullName: { type: string }
 *               passportNumber: { type: string }
 *               nationality: { type: string }
 *               phone: { type: string }
 *               email: { type: string }
 *               validityDays: { type: integer, example: 90 }
 *     responses:
 *       201:
 *         description: Tourist created
 *       400:
 *         description: Validation error
 */
router.get('/tourists', requireAuth, touristsController.list.bind(touristsController));
router.post('/tourists', requireAuth, touristsController.create.bind(touristsController));

/**
 * @swagger
 * /tourists/{id}:
 *   get:
 *     tags: [Tourists]
 *     summary: Get tourist by id
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Tourist found
 *       404:
 *         description: Not found
 */
router.get('/tourists/:id', requireAuth, touristsController.getById.bind(touristsController));

/**
 * @swagger
 * /tourists/{id}/renew:
 *   post:
 *     tags: [Tourists]
 *     summary: Renew tourist validity
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               extraDays: { type: integer, example: 30 }
 *     responses:
 *       200:
 *         description: Renewal successful
 *       404:
 *         description: Tourist not found
 */
router.post('/tourists/:id/renew', requireAuth, touristsController.renew.bind(touristsController));

/**
 * @swagger
 * /incidents:
 *   get:
 *     tags: [Incidents]
 *     summary: List incidents
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: query
 *         name: region
 *         schema: { type: string }
 *       - in: query
 *         name: status
 *         schema: { type: string, enum: [open, closed] }
 *     responses:
 *       200:
 *         description: List of incidents
 *   post:
 *     tags: [Incidents]
 *     summary: Create incident
 *     security: [ { bearerAuth: [] } ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title]
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               severity: { type: string, enum: [low, medium, high] }
 *               region: { type: string }
 *               coords:
 *                 type: object
 *                 properties:
 *                   lat: { type: number }
 *                   lng: { type: number }
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Validation error
 */
router.get('/incidents', requireAuth, incidentsController.list.bind(incidentsController));
router.post('/incidents', requireAuth, requireRole('admin'), incidentsController.create.bind(incidentsController));

/**
 * @swagger
 * /incidents/{id}:
 *   get:
 *     tags: [Incidents]
 *     summary: Get incident by id
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Found
 *       404:
 *         description: Not found
 *   put:
 *     tags: [Incidents]
 *     summary: Update incident
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Updated
 *       404:
 *         description: Not found
 *   delete:
 *     tags: [Incidents]
 *     summary: Delete incident
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Deleted
 *       404:
 *         description: Not found
 */
router.get('/incidents/:id', requireAuth, incidentsController.getById.bind(incidentsController));
router.put('/incidents/:id', requireAuth, requireRole('admin'), incidentsController.update.bind(incidentsController));
router.delete('/incidents/:id', requireAuth, requireRole('admin'), incidentsController.delete.bind(incidentsController));

/**
 * @swagger
 * /map/regions:
 *   get:
 *     tags: [Map]
 *     summary: Map regions
 *     responses:
 *       200:
 *         description: Regions data
 */
router.get('/map/regions', mapController.regions.bind(mapController));

/**
 * @swagger
 * /map/incidents:
 *   get:
 *     tags: [Map]
 *     summary: Incident aggregation by region
 *     responses:
 *       200:
 *         description: Aggregated incidents data
 */
router.get('/map/incidents', mapController.incidents.bind(mapController));

module.exports = router;
