// app.js
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/config/swagger.config'); // swagger config
const userMasterRoutes = require('./src/routes/userMaster.routes');
const errorMiddleware = require('./src/middlewares/error.middleware'); // must export a function
const scopedContainer = require('./src/config/container'); // scoped services middleware

const app = express();
const PORT = process.env.PORT || 3000;

// parse JSON bodies
app.use(express.json());

// ------------------- Swagger -------------------
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
console.log('Swagger UI available at /api-docs');

// ------------------- Scoped Services -------------------
// This middleware must come BEFORE your routes
app.use(scopedContainer);

// ------------------- Routes -------------------
app.use('/api/usermaster', userMasterRoutes);

// ------------------- Error Handling -------------------
// This must come AFTER routes
app.use(errorMiddleware);

// ------------------- Start Server -------------------
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Server running on http://localhost:${PORT}/api-docs`);
});
