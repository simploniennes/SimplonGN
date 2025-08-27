import { validationResult } from 'express-validator';
import { logger } from '../utils/logger.js';
import { AppError } from './errorHandler.js';

/**
 * Middleware de validation des données d'entrée
 * @param {Array} validations - Tableau de middlewares de validation express-validator
 * @returns {Function} Middleware Express
 */
const validate = (validations) => {
  return async (req, res, next) => {
    // Exécution des validations
    await Promise.all(validations.map(validation => validation.run(req)));

    // Récupération des erreurs de validation
    const errors = validationResult(req);
    
    // Si pas d'erreurs, on passe au middleware suivant
    if (errors.isEmpty()) {
      return next();
    }

    // Formatage des erreurs
    const extractedErrors = [];
    errors.array().map(err => {
      // Éviter les doublons
      if (!extractedErrors.some(e => e.param === err.param && e.msg === err.msg)) {
        extractedErrors.push({ 
          field: err.param, 
          message: err.msg,
          value: err.value
        });
      }
    });

    // Journalisation des erreurs de validation
    logger.warn('Erreurs de validation', {
      path: req.path,
      method: req.method,
      ip: req.ip,
      errors: extractedErrors
    });

    // Envoi de la réponse d'erreur
    return next(
      new AppError('Données invalides', 400, {
        name: 'ValidationError',
        details: extractedErrors
      })
    );
  };
};

/**
 * Middleware pour valider les paramètres d'URL
 * @param {Object} schema - Schéma Joi pour la validation
 * @returns {Function} Middleware Express
 */
const validateParams = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.params, { abortEarly: false });
    
    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message.replace(/\"/g, "'")
      }));

      logger.warn('Erreurs de validation des paramètres', {
        path: req.path,
        method: req.method,
        params: req.params,
        errors
      });

      return next(
        new AppError('Paramètres de requête invalides', 400, {
          name: 'ParamsValidationError',
          details: errors
        })
      );
    }

    // Remplace les paramètres par les valeurs validées (avec conversions de type)
    req.params = value;
    next();
  };
};

/**
 * Middleware pour valider le corps de la requête
 * @param {Object} schema - Schéma Joi pour la validation
 * @returns {Function} Middleware Express
 */
const validateBody = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { 
      abortEarly: false,
      allowUnknown: false
    });
    
    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message.replace(/\"/g, "'")
      }));

      logger.warn('Erreurs de validation du corps de la requête', {
        path: req.path,
        method: req.method,
        errors
      });

      return next(
        new AppError('Données de requête invalides', 400, {
          name: 'BodyValidationError',
          details: errors
        })
      );
    }

    // Remplace le corps par les valeurs validées (avec conversions de type)
    req.body = value;
    next();
  };
};

/**
 * Middleware pour valider les paramètres de requête (query string)
 * @param {Object} schema - Schéma Joi pour la validation
 * @returns {Function} Middleware Express
 */
const validateQuery = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.query, { 
      abortEarly: false,
      allowUnknown: true,
      convert: true
    });
    
    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message.replace(/\"/g, "'")
      }));

      logger.warn('Erreurs de validation des paramètres de requête', {
        path: req.path,
        method: req.method,
        query: req.query,
        errors
      });

      return next(
        new AppError('Paramètres de requête invalides', 400, {
          name: 'QueryValidationError',
          details: errors
        })
      );
    }

    // Remplace les paramètres de requête par les valeurs validées
    req.query = value;
    next();
  };
};

// Exportation des fonctions de validation
export {
  validate,
  validateParams,
  validateBody,
  validateQuery
};
