import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';

// Utilitaire d'erreur HTTP simple
const httpError = (statusCode, message) => {
  const err = new Error(message);
  err.statusCode = statusCode;
  err.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
  err.isOperational = true;
  return err;
};

// Fonction pour générer un token JWT
const signToken = (id) => {
  return jwt.sign({ id }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn || '24h',
  });
};

// Fonction pour créer et envoyer le token
const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);
  
  // Options du cookie
  const cookieOptions = {
    expires: new Date(Date.now() + (Number(config.jwt.cookieExpiresIn) || 90) * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    sameSite: 'strict',
  };

  // Envoyer le token dans un cookie
  res.cookie('jwt', token, cookieOptions);

  // Ne pas renvoyer le mot de passe dans la réponse
  if (user.password !== undefined) user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

// Inscription d'un nouvel utilisateur
export const register = async (req, res, next) => {
  try {
    const { nom, email, password, confirmPassword } = req.body;

    // 1) Vérification des champs obligatoires
    if (!nom || !email || !password || !confirmPassword) {
      return next(httpError(400, 'Veuillez fournir tous les champs requis'));
    }

    // 2) Vérification de la correspondance des mots de passe
    if (password !== confirmPassword) {
      return next(httpError(400, 'Les mots de passe ne correspondent pas'));
    }

    // 3) Vérification si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(httpError(409, 'Un utilisateur avec cet email existe déjà'));
    }

    // 4) Création du nouvel utilisateur
    const newUser = await User.create({
      nom,
      email,
      password,
    });

    // 5) Journalisation
    console.info(`Nouvel utilisateur enregistré: ${newUser.email}`);

    // 6) Connexion automatique après inscription
    createSendToken(newUser, 201, req, res);
  } catch (error) {
    console.error(`Erreur lors de l'inscription: ${error.message}`);
    next(error);
  }
};

// Connexion d'un utilisateur
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1) Vérification de la présence de l'email et du mot de passe
    if (!email || !password) {
      return next(httpError(400, 'Veuillez fournir un email et un mot de passe'));
    }

    // 2) Vérification de l'existence de l'utilisateur
    const user = await User.findOne({ email });

    // 3) Vérification du mot de passe
    const isPasswordCorrect = user && (await user.comparePassword(password));

    if (!user || !isPasswordCorrect) {
      return next(httpError(401, 'Email ou mot de passe incorrect'));
    }

    // 4) Journalisation
    console.info(`Connexion de l'utilisateur: ${user.email}`);

    // 5) Envoi du token
    createSendToken(user, 200, req, res);
  } catch (error) {
    console.error(`Erreur lors de la connexion: ${error.message}`);
    next(error);
  }
};

// Déconnexion de l'utilisateur
export const logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  
  res.status(200).json({ status: 'success' });
};

// Récupération du profil utilisateur
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return next(httpError(404, 'Aucun utilisateur trouvé avec cet ID'));
    }

    res.status(200).json({
      status: 'success',
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

// Mise à jour du mot de passe
export const updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return next(httpError(400, 'Veuillez fournir les champs requis'));
    }

    if (newPassword !== confirmPassword) {
      return next(httpError(400, 'Les mots de passe ne correspondent pas'));
    }

    const user = await User.findById(req.user.id);
    if (!user) return next(httpError(404, 'Utilisateur non trouvé'));

    const valid = await user.comparePassword(currentPassword);
    if (!valid) return next(httpError(401, 'Votre mot de passe actuel est incorrect'));

    user.password = newPassword;
    await user.save();

    createSendToken(user, 200, req, res);
  } catch (error) {
    next(error);
  }
};