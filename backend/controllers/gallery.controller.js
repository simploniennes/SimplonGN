import Gallery from '../models/gallery.model.js';
import { AppError } from '../middleware/errorHandler.js';

/**
 * @desc    Ajouter une nouvelle image à la galerie
 * @route   POST /api/v1/gallery
 * @access  Privé/Admin
 */
/**
 * @desc    Ajouter une nouvelle image à la galerie
 * @route   POST /api/v1/gallery
 * @access  Privé/Admin
 */
export const addImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(new AppError('Veuillez télécharger une image', 400));
    }

    const { title, description, tags } = req.body;
    
    const newImage = await Gallery.create({
      title,
      description,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      imageUrl: `/uploads/images/${req.file.filename}`,
      uploadedBy: req.user.id
    });

    res.status(201).json({
      status: 'success',
      data: {
        image: newImage
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Récupérer toutes les images de la galerie
 * @route   GET /api/v1/gallery
 * @access  Public
 */
/**
 * @desc    Récupérer toutes les images de la galerie
 * @route   GET /api/v1/gallery
 * @access  Public
 */
export const getImages = async (req, res, next) => {
  try {
    // Filtrage
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    // Filtrage avancé
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    
    let query = Gallery.find(JSON.parse(queryStr));

    // Tri
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-uploadedAt');
    }

    // Limitation des champs
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    // Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    const images = await query;
    const total = await Gallery.countDocuments(JSON.parse(queryStr));

    res.status(200).json({
      status: 'success',
      results: images.length,
      data: {
        images
      },
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Supprimer une image de la galerie
 * @route   DELETE /api/v1/gallery/:id
 * @access  Privé/Admin
 */
/**
 * @desc    Supprimer une image de la galerie
 * @route   DELETE /api/v1/gallery/:id
 * @access  Privé/Admin
 */
export const deleteImage = async (req, res, next) => {
  try {
    const image = await Gallery.findById(req.params.id);
    
    if (!image) {
      return next(new AppError('Aucune image trouvée avec cet ID', 404));
    }

    // Vérifier si l'utilisateur est l'auteur ou un admin
    if (image.uploadedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new AppError('Non autorisé à supprimer cette image', 403));
    }

    await image.remove();

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Rechercher des images dans la galerie
 * @route   GET /api/v1/gallery/search
 * @access  Public
 */
/**
 * @desc    Rechercher des images dans la galerie
 * @route   GET /api/v1/gallery/search
 * @access  Public
 */
export const searchImages = async (req, res, next) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return next(new AppError('Veuillez fournir un terme de recherche', 400));
    }

    const images = await Gallery.find(
      { $text: { $search: q } },
      { score: { $meta: 'textScore' } }
    ).sort({ score: { $meta: 'textScore' } });

    res.status(200).json({
      status: 'success',
      results: images.length,
      data: {
        images
      }
    });
  } catch (error) {
    next(error);
  }
};
