// src/config/swagger.config.js
const path = require('path');
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: { 
      title: 'AuditOne API', 
      version: '1.0.0' 
    },
  },
  // Make sure this path points to your route files with JSDoc comments
  apis: [path.join(__dirname, '../routes/*.routes.js')],
});

module.exports = swaggerSpec;
