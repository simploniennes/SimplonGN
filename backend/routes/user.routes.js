import { Router } from 'express';
import { register, login, logout, getMe, updatePassword } from '../controllers/user.controller.js';
import { protect } from '../middleware/auth.js';

const router = Router();

/**
 * @route   POST /api/v1/users/register
 * @desc    Enregistrement d'un nouvel utilisateur
 * @access  Public
 */
router.post("/register", register);

/**
 * @route   POST /api/v1/users/login
 * @desc    Connexion d'un utilisateur
 * @access  Public
 */
router.post("/login", login);
router.get('/me', protect, getMe);
router.post('/logout', protect, logout);
router.patch('/update-password', protect, updatePassword);

export default router;