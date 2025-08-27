import Contact from '../models/contact.model.js';
import User from '../models/user.model.js';
import { sendContactNotification, sendAutoReply } from '../services/mailer.service.js';
import { AppError } from '../middleware/errorHandler.js';
import { logger } from '../utils/logger.js';

/**
 * @desc    Envoie un message de contact
 * @route   POST /api/contact
 * @access  Privé
 */
/**
 * @desc    Envoie un message de contact
 * @route   POST /api/contact
 * @access  Privé
 */
export const envoyerMessage = async (req, res, next) => {
  try {
    const { sujet, message } = req.body;
    const userId = req.user.id; // Modifié pour utiliser req.user du middleware d'authentification

    // 1) Validation des entrées
    if (!message || message.trim().length < 10) {
      return next(new AppError('Un message de plus de 10 caractères est requis', 400));
    }

    // 2) Récupération de l'utilisateur
    const user = await User.findById(userId).select('nom email');
    if (!user) {
      return next(new AppError('Utilisateur non trouvé', 404));
    }

    // 3) Création et sauvegarde du message
    const nouveauContact = await Contact.create({
      utilisateur: userId,
      sujet: sujet || 'Sans objet',
      message: message.trim(),
      statut: 'nouveau',
    });

    logger.info(`Nouveau message de contact de ${user.email} (ID: ${user._id})`);

    // 4) Envoi des emails (de manière asynchrone pour ne pas bloquer la réponse)
    try {
      await Promise.all([
        sendContactNotification(nouveauContact, user),
        sendAutoReply(nouveauContact, user)
      ]);
    } catch (emailError) {
      // On log l'erreur mais on ne bloque pas la réponse à l'utilisateur
      logger.error('Erreur lors de l\'envoi des emails:', emailError);
    }

    // 5) Réponse de succès
    res.status(201).json({
      status: 'success',
      message: 'Votre message a bien été envoyé. Nous vous répondrons dès que possible.',
      data: {
        contact: {
          id: nouveauContact._id,
          sujet: nouveauContact.sujet,
          date: nouveauContact.dateCreation,
          statut: nouveauContact.statut
        }
      }
    });

  } catch (error) {
    logger.error(`Erreur lors de l'envoi du message de contact: ${error.message}`);
    next(error);
  }
};

/**
 * @desc    Récupère tous les messages de contact (pour l'administration)
 * @route   GET /api/contact
 * @access  Privé/Admin
 */
/**
 * @desc    Récupère tous les messages de contact (pour l'administration)
 * @route   GET /api/contact
 * @access  Privé/Admin
 */
export const getMessages = async (req, res, next) => {
  try {
    // Vérification des droits d'administrateur
    if (req.user.role !== 'admin') {
      return next(new AppError('Accès non autorisé', 403));
    }

    const { statut, page = 1, limit = 10 } = req.query;
    
    // Construction de la requête
    const query = {};
    if (statut) query.statut = statut;

    // Pagination
    const skip = (page - 1) * limit;
    
    const messages = await Contact.find(query)
      .populate('utilisateur', 'nom email')
      .sort({ dateCreation: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Contact.countDocuments(query);

    res.status(200).json({
      status: 'success',
      results: messages.length,
      total,
      data: {
        messages
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Met à jour le statut d'un message de contact
 * @route   PATCH /api/contact/:id
 * @access  Privé/Admin
 */
/**
 * @desc    Met à jour le statut d'un message de contact
 * @route   PATCH /api/contact/:id
 * @access  Privé/Admin
 */
export const updateMessageStatus = async (req, res, next) => {
  try {
    // Vérification des droits d'administrateur
    if (req.user.role !== 'admin') {
      return next(new AppError('Accès non autorisé', 403));
    }

    const { id } = req.params;
    const { statut } = req.body;

    if (!statut || !['nouveau', 'en_cours', 'traité', 'fermé'].includes(statut)) {
      return next(new AppError('Statut invalide', 400));
    }

    const message = await Contact.findByIdAndUpdate(
      id,
      { 
        statut,
        dateModification: Date.now(),
        modifiePar: req.user.id 
      },
      { new: true, runValidators: true }
    );

    if (!message) {
      return next(new AppError('Message non trouvé', 404));
    }

    logger.info(`Statut du message ${id} mis à jour vers "${statut}" par l'utilisateur ${req.user.id}`);

    res.status(200).json({
      status: 'success',
      data: {
        message: {
          id: message._id,
          statut: message.statut,
          dateModification: message.dateModification
        }
      }
    });
  } catch (error) {
    next(error);
  }
};
