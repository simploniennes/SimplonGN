import { Router } from 'express';
import { upload } from '../middleware/upload.middleware.js';
import { addImage, getImages, deleteImage, searchImages } from '../controllers/gallery.controller.js';
import { protect, restrictTo } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { gallerySchema } from '../schemas/index.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Galerie
 *   description: Gestion des images de la galerie
 */

// Toutes les routes ci-dessous nécessitent une authentification
router.use(protect);

/**
 * @swagger
 * /api/v1/gallery:
 *   post:
 *     summary: Ajouter une nouvelle image à la galerie
 *     tags: [Galerie]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Fichier image à télécharger
 *               title:
 *                 type: string
 *                 description: Titre de l'image
 *               description:
 *                 type: string
 *                 description: Description de l'image
 *               tags:
 *                 type: string
 *                 description: Tags séparés par des virgules
 *     responses:
 *       201:
 *         description: Image ajoutée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Gallery'
 */
router.post(
  '/', 
  restrictTo('admin'),
  upload.single('image'),
  validate(gallerySchema.create),
  galleryCtrl.addImage
);

/**
 * @swagger
 * /api/v1/gallery:
 *   get:
 *     summary: Récupérer toutes les images de la galerie
 *     tags: [Galerie]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Numéro de page pour la pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Nombre d'éléments par page
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Tri des résultats (ex: -uploadedAt pour trier par date décroissante)
 *     responses:
 *       200:
 *         description: Liste des images récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Gallery'
 */
router.get('/', galleryCtrl.getImages);

/**
 * @swagger
 * /api/v1/gallery/search:
 *   get:
 *     summary: Rechercher des images dans la galerie
 *     tags: [Galerie]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Terme de recherche
 *     responses:
 *       200:
 *         description: Résultats de la recherche
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Gallery'
 */
router.get('/search', galleryCtrl.searchImages);

/**
 * @swagger
 * /api/v1/gallery/{id}:
 *   delete:
 *     summary: Supprimer une image de la galerie
 *     tags: [Galerie]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'image à supprimer
 *     responses:
 *       204:
 *         description: Image supprimée avec succès
 *       403:
 *         description: Non autorisé à supprimer cette image
 *       404:
 *         description: Aucune image trouvée avec cet ID
 */
router.delete(
  '/:id',
  restrictTo('admin'),
  validate(gallerySchema.delete),
  galleryCtrl.deleteImage
);

export default router;
