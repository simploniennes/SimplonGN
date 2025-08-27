// middleware/errorHandler.js
import { logger } from '../utils/logger.js';

export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

const handleJWTError = () =>
  new AppError('Token invalide. Veuillez vous reconnecter!', 401);

const handleJWTExpiredError = () =>
  new AppError('Votre session a expiré. Veuillez vous reconnecter!', 401);

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Données d'entrée invalides. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `La valeur en double: ${value}. Veuillez utiliser une autre valeur!`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // Erreur opérationnelle, de confiance : envoi du message au client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // 1) Log de l'erreur
    console.error('ERREUR 💥', err);

    // 2) Envoi d'un message générique
    res.status(500).json({
      status: 'error',
      message: 'Quelque chose a mal tourné!',
    });
  }
};

// Gestion des erreurs de type CastError (ID invalide, etc.)
const handleCastErrorDB = (err) => {
  const message = `Valeur invalide pour le champ ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

// Gestionnaire d'erreurs principal
export const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;
    error.name = err.name;

    // Gestion des différents types d'erreurs
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, res);
  }
};

export default errorHandler;
