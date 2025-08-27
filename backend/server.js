import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import userRoutes from './routes/user.routes.js';
import cors from 'cors';
import config from './config/config.js';
import { httpLogger } from './utils/logger.js';
import errorHandler from './middleware/errorHandler.js';

// Configuration de base
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialisation d'Express
const app = express();

// Middlewares de base
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(httpLogger);

// Configuration CORS: accepte plusieurs origines (front)
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (config.clientUrls.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

// Connexion à la base de données
connectDB();

// Routes de base
app.get('/', (req, res) => {
  res.json({ 
    message: 'API SimplonGN - Bienvenue !',
    status: 'Actif',
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'Connecté' : 'Non connecté'
  });
});

// Routes API
app.use('/api/v1/users', userRoutes);

// Route de santé complète
app.get('/health', async (req, res) => {
  const status = {
    status: 'success',
    timestamp: new Date().toISOString(),
    services: {
      database: {
        status: mongoose.connection.readyState === 1 ? 'ok' : 'error',
        message: mongoose.connection.readyState === 1 
          ? 'Base de données connectée' 
          : 'Erreur de connexion à la base de données'
      },
      api: 'ok'
    }
  };
  
  res.status(200).json(status);
});

// Gestion des routes non trouvées
app.use((req, res, next) => {
  const error = new Error(`Ressource non trouvée: ${req.originalUrl}`);
  error.status = 404;
  next(error);
});

// Gestionnaire d'erreurs global
app.use(errorHandler);

// Configuration du port
const PORT = process.env.PORT || 5000;

// Démarrage du serveur uniquement si ce fichier est exécuté directement
if (process.env.NODE_ENV !== 'test') {
  const server = app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
    console.log(`📊 Base de données: ${mongoose.connection.readyState === 1 ? '✅ Connectée' : '❌ Non connectée'}`);
  });

  // Gestion des erreurs non capturées
  process.on('unhandledRejection', (err) => {
    console.error('ERREUR NON GÉRÉE:', err);
    server.close(() => process.exit(1));
  });

  // Gestion de l'arrêt gracieux
  process.on('SIGTERM', () => {
    console.log('👋 Arrêt gracieux du serveur...');
    server.close(() => {
      console.log('💥 Processus terminé');
      process.exit(0);
    });
  });
}

export default app;
