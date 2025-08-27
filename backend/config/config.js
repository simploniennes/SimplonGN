import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// Configuration de dotenv
dotenv.config();

// Pour utiliser __dirname avec les modules ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  // Configuration du serveur
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  clientUrls: (process.env.CLIENT_URLS || process.env.CLIENT_URL || 'http://localhost:3000')
    .split(',')
    .map(u => u.trim())
    .filter(Boolean),
  clientUrl: (process.env.CLIENT_URLS || process.env.CLIENT_URL || 'http://localhost:3000')
    .split(',')[0]
    .trim(),
  
  // Configuration de la base de données
  database: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/simplongn',
    options: {
      // Les options useNewUrlParser, useUnifiedTopology, useCreateIndex et useFindAndModify
      // sont obsolètes dans les versions récentes de Mongoose et sont activées par défaut
      serverSelectionTimeoutMS: 5000, // Timeout de 5 secondes pour la sélection du serveur
      socketTimeoutMS: 45000, // Timeout de 45 secondes d'inactivité du socket
      family: 4, // Utiliser IPv4, ignorer IPv6
    },
  },
  
  // Configuration JWT
  jwt: {
    secret: process.env.JWT_SECRET || process.env.SECRET_KEY || 'votre_secret_jwt_tres_long_et_securise',
    expiresIn: process.env.JWT_EXPIRES_IN || '90d',
    cookieExpiresIn: process.env.JWT_COOKIE_EXPIRES_IN || 90, // jours
  },
  
  // Configuration des emails
  email: {
    host: process.env.EMAIL_HOST || 'smtp.mailtrap.io',
    port: process.env.EMAIL_PORT || 2525,
    username: process.env.EMAIL_USERNAME || 'votre_username_email',
    password: process.env.EMAIL_PASSWORD || 'votre_password_email',
    from: process.env.EMAIL_FROM || 'noreply@simplongn.org',
  },
  
  // Configuration du taux de requêtes (rate limiting)
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: process.env.NODE_ENV === 'production' ? 100 : 1000, // Limite de requêtes par fenêtre
  },
  
  // Configuration des logs
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    errorFile: 'logs/error.log',
    combinedFile: 'logs/combined.log',
  },
  
  // Configuration de sécurité
  security: {
    passwordResetExpires: 24 * 60 * 60 * 1000, // 24 heures en millisecondes
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000, // 15 minutes en millisecondes
  },
};

// Validation de la configuration
const requiredConfig = [
  { key: 'MONGODB_URI', message: 'La variable MONGODB_URI est requise' },
  { key: 'JWT_SECRET', message: 'La variable JWT_SECRET est requise en production', skipInDev: true },
  { key: 'EMAIL_HOST', message: 'La variable EMAIL_HOST est requise pour l\'envoi d\'emails' },
  { key: 'EMAIL_USERNAME', message: 'La variable EMAIL_USERNAME est requise pour l\'envoi d\'emails' },
  { key: 'EMAIL_PASSWORD', message: 'La variable EMAIL_PASSWORD est requise pour l\'envoi d\'emails' },
];

// Vérification des variables d'environnement requises
const missingConfig = [];
requiredConfig.forEach(({ key, message, skipInDev }) => {
  if ((!skipInDev || config.nodeEnv === 'production') && !process.env[key]) {
    missingConfig.push({ key, message });
  }
});

if (missingConfig.length > 0) {
  console.error('\x1b[31m%s\x1b[0m', 'Erreur de configuration:');
  missingConfig.forEach(({ key, message }) => {
    console.error(`- ${key}: ${message}`);
  });
  if (config.nodeEnv === 'production') {
    process.exit(1);
  } else {
    console.warn('\x1b[33m%s\x1b[0m', 'Mode développement: le serveur démarre quand même, mais certaines fonctionnalités pourraient ne pas fonctionner.');
  }
}

// Avertissement pour les configurations sensibles en développement
if (config.nodeEnv === 'development') {
  const sensitiveConfig = ['JWT_SECRET', 'EMAIL_PASSWORD'].filter(key => 
    process.env[key] && process.env[key].includes('votre_')
  );
  
  if (sensitiveConfig.length > 0) {
    console.warn('\x1b[33m%s\x1b[0m', 'Avertissement: Configuration sensible par défaut détectée. Veuillez configurer les variables d\'environnement suivantes pour la production:');
    sensitiveConfig.forEach(key => {
      console.warn(`- ${key}`);
    });
  }
}

export default config;
