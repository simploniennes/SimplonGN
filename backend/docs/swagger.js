import swaggerJSDoc from 'swagger-jsdoc';
import config from '../config/config.js';

// Options de configuration Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API SimplonGN',
      version: '1.0.0',
      description: 'Documentation de l\'API SimplonGN - Gestion des formations et des utilisateurs',
      contact: {
        name: 'Équipe Technique',
        email: 'support@simplongn.org'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: `http://localhost:${config.port}/api/v1`,
        description: 'Serveur de développement',
      },
      {
        url: 'https://api.simplongn.org/api/v1',
        description: 'Serveur de production',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      responses: {
        UnauthorizedError: {
          description: 'Accès non autorisé - Token manquant ou invalide',
        },
        BadRequest: {
          description: 'Requête invalide - Vérifiez les données envoyées',
        },
        NotFound: {
          description: 'Ressource non trouvée',
        },
        ServerError: {
          description: 'Erreur interne du serveur',
        },
      },
      schemas: {
        // Schémas communs
        Error: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              example: 'error',
            },
            message: {
              type: 'string',
              example: 'Message d\'erreur détaillé',
            },
            code: {
              type: 'integer',
              example: 400,
            },
            details: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  field: {
                    type: 'string',
                    example: 'email',
                  },
                  message: {
                    type: 'string',
                    example: 'Doit être une adresse email valide',
                  },
                },
              },
            },
          },
        },
        // Ajoutez d'autres schémas communs ici
      },
    },
  },
  // Chemins vers les fichiers contenant la documentation des routes
  apis: [
    './routes/*.js',
    './models/*.js',
    './docs/schemas/*.yaml',
  ],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
