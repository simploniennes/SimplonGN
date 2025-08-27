import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Le titre est obligatoire'],
    trim: true,
    maxlength: [100, 'Le titre ne peut pas dépasser 100 caractères']
  },
  imageUrl: {
    type: String,
    required: [true, 'L\'URL de l\'image est obligatoire']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'La description ne peut pas dépasser 500 caractères']
  },
  tags: [{
    type: String,
    trim: true
  }],
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: {
    createdAt: 'uploadedAt',
    updatedAt: 'updatedAt'
  },
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index pour améliorer les performances de recherche
gallerySchema.index({ title: 'text', description: 'text', tags: 'text' });

// Middleware pour supprimer le fichier physique lors de la suppression d'une image
gallerySchema.pre('remove', async function(next) {
  try {
    // Implémentez ici la logique pour supprimer le fichier physique si nécessaire
    // Par exemple: fs.unlinkSync(path.join(__dirname, '..', this.imageUrl));
    next();
  } catch (err) {
    next(err);
  }
});

// Méthode pour formater la sortie JSON
gallerySchema.methods.toJSON = function() {
  const gallery = this;
  const galleryObject = gallery.toObject();

  // Renommer _id en id et supprimer les champs inutiles
  galleryObject.id = galleryObject._id;
  delete galleryObject._id;
  delete galleryObject.__v;

  // Ajouter l'URL complète de l'image si nécessaire
  if (galleryObject.imageUrl && !galleryObject.imageUrl.startsWith('http')) {
    galleryObject.imageUrl = `${process.env.API_URL || ''}${galleryObject.imageUrl}`;
  }

  return galleryObject;
};

const Gallery = mongoose.model('Gallery', gallerySchema);

export default Gallery;
