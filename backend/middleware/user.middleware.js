import jwt from 'jsonwebtoken';

/**
 * Middleware d'authentification utilisateur
 * Vérifie la présence et la validité du token JWT
 */
export const authenticateUser = async (req, res, next) => {
  const header = req.headers.authorization;
  
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ 
      status: 'error',
      message: 'Token d\'authentification manquant' 
    });
  }

  try {
    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'votre_secret_jwt_tres_long_et_securise');
    
    // Ajoute les informations de l'utilisateur à l'objet request
    req.user = {
      id: decoded.id,
      role: decoded.role || 'user' // Récupère le rôle depuis le token ou utilise 'user' par défaut
    };
    
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        status: 'error',
        message: 'Votre session a expiré. Veuillez vous reconnecter.',
        code: 'TOKEN_EXPIRED'
      });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        status: 'error',
        message: 'Token d\'authentification invalide',
        code: 'INVALID_TOKEN'
      });
    }
    
    // Pour les autres types d'erreurs
    console.error('Erreur d\'authentification:', error);
    res.status(500).json({ 
      status: 'error',
      message: 'Erreur lors de l\'authentification',
      code: 'AUTH_ERROR'
    });
  }
};

/**
 * Middleware pour vérifier si l'utilisateur a un certain rôle
 * @param {...string} roles - Rôles autorisés
 * @returns {Function} Middleware Express
 */
export const hasRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        status: 'error',
        message: 'Authentification requise',
        code: 'AUTH_REQUIRED'
      });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'error',
        message: 'Droits insuffisants pour effectuer cette action',
        code: 'INSUFFICIENT_PERMISSIONS'
      });
    }
    
    next();
  };
};



