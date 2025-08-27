import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.js';
import { logger } from '../utils/logger.js';

const router = express.Router();

// Options de configuration pour Swagger UI
const options = {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'API SimplonGN - Documentation',
  customfavIcon: '/favicon.ico',
  swaggerOptions: {
    docExpansion: 'none',
    filter: true,
    showRequestDuration: true,
    defaultModelsExpandDepth: -1, // Masquer les modèles par défaut
  },
};

// Route pour la documentation Swagger UI
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec, options));

// Middleware pour logger les accès à la documentation
router.use((req, res, next) => {
  logger.info(`Accès à la documentation API depuis ${req.ip}`);
  next();
});

export default router;
