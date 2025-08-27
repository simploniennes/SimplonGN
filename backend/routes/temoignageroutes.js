import { Router } from 'express';
import { ajouterTemoignage, listerTemoignages, validerTemoignage } from '../controllers/temoignageContr.js';
import verifyAdmin from '../middleware/verifyAdmin.js';

const router = Router();

/**
 * @route   POST /api/v1/temoignages
 * @desc    Ajouter un nouveau témoignage
 * @access  Public
 */
router.post('/', ajouterTemoignage);

/**
 * @route   GET /api/v1/temoignages
 * @desc    Récupérer tous les témoignages approuvés
 * @access  Public
 */
router.get('/', listerTemoignages);

/**
 * @route   PUT /api/v1/temoignages/:id/valider
 * @desc    Valider un témoignage (admin uniquement)
 * @access  Privé/Admin
 */
router.put('/:id/valider', verifyAdmin, validerTemoignage);

// Route commentée pour la suppression de témoignage
// router.delete('/:id', verifyAdmin, supprimerTemoignage);

export default router;