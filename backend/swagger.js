const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Government Tourism Portal API',
      version: '1.0.0',
      description: 'In-memory API for auth, OTP, tourists, incidents, and map endpoints.',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
        },
      },
    },
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
