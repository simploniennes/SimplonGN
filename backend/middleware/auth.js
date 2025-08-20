// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

// Middleware pour sécuriser tes routes
const protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
      req.user = decoded; // contient les infos du user si nécessaire
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token invalide' });
    }
  } else {
    return res.status(401).json({ message: 'Aucun token fourni' });
  }
};

module.exports = { protect };
