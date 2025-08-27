import { Router } from 'express';
import { envoyerMessage, getMessages, updateMessageStatus } from '../controllers/contact.controller.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = Router();

// Routes protégées par authentification
router.use(protect);

// Envoyer un message de contact
router.post('/', envoyerMessage);

// Routes réservées aux administrateurs
router.use(restrictTo('admin'));

// Récupérer tous les messages (admin)
router.get('/', getMessages);

// Mettre à jour le statut d'un message (admin)
router.patch('/:id', updateMessageStatus);

export default router;
