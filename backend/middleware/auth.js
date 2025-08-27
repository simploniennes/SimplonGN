import jwt from 'jsonwebtoken';
import config from '../config/config.js';

// Middleware pour sécuriser les routes
export const protect = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Aucun token fourni' });
  }

  try {
    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, config.jwt.secret);
    req.user = { id: decoded.id, role: decoded.role || 'user' };
    next();
  } catch (error) {
    const code = error.name === 'TokenExpiredError' ? 401 : 401;
    return res.status(code).json({ message: 'Token invalide' });
  }
};

// Fonction pour restreindre l'accès à certains rôles
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ 
        status: 'error', 
        message: 'Vous n\'avez pas les droits nécessaires pour effectuer cette action' 
      });
    }
    next();
  };
};
