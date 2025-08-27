import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    // Référence à l'utilisateur (peut être null pour les messages non authentifiés)
    utilisateur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Un message doit être associé à un utilisateur']
    },
    
    // Informations sur l'expéditeur (pour les messages non authentifiés)
    expediteur: {
      nom: {
        type: String,
        trim: true,
        maxlength: [100, 'Le nom ne peut pas dépasser 100 caractères']
      },
      email: {
        type: String,
        trim: true,
        lowercase: true,
        validate: {
          validator: function(v) {
            // Validation simple d'email, peut être améliorée
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
          },
          message: props => `${props.value} n'est pas une adresse email valide!`
        }
      }
    },
    
    // Détails du message
    sujet: {
      type: String,
      trim: true,
      maxlength: [200, 'Le sujet ne peut pas dépasser 200 caractères'],
      default: 'Sans objet'
    },
    
    message: {
      type: String,
      required: [true, 'Le message est obligatoire'],
      trim: true,
      minlength: [10, 'Le message doit contenir au moins 10 caractères'],
      maxlength: [5000, 'Le message ne peut pas dépasser 5000 caractères']
    },
    
    // Suivi et statut
    statut: {
      type: String,
      enum: {
        values: ['nouveau', 'en_cours', 'traité', 'fermé'],
        message: 'Le statut doit être: nouveau, en_cours, traité ou fermé'
      },
      default: 'nouveau'
    },
    
    // Suivi des modifications
    modifiePar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    
    // Catégorie du message (optionnel)
    categorie: {
      type: String,
      enum: ['question', 'suggestion', 'problème', 'autre'],
      default: 'question'
    },
    
    // Pièces jointes (URLs vers les fichiers)
    piecesJointes: [{
      type: String,
      validate: {
        validator: function(v) {
          // Validation simple d'URL, peut être adaptée selon les besoins
          return /^https?:\/\//.test(v);
        },
        message: props => `${props.value} n'est pas une URL valide!`
      }
    }],
    
    // Suivi des réponses
    reponses: [{
      contenu: {
        type: String,
        required: [true, 'Le contenu de la réponse est obligatoire'],
        trim: true
      },
      auteur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Un auteur est requis pour la réponse']
      },
      dateCreation: {
        type: Date,
        default: Date.now
      },
      estInterne: {
        type: Boolean,
        default: false
      }
    }]
  },
  {
    // Options du schéma
    timestamps: {
      createdAt: 'dateCreation',
      updatedAt: 'dateModification'
    },
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Index pour les recherches fréquentes
contactSchema.index({ statut: 1, dateCreation: -1 });
contactSchema.index({ 'expediteur.email': 1 });
contactSchema.index({ utilisateur: 1 });

// Middleware pour nettoyer les données avant la sauvegarde
contactSchema.pre('save', function(next) {
  // Nettoyage des champs texte
  if (this.isModified('sujet')) {
    this.sujet = this.sujet.trim();
  }
  if (this.isModified('message')) {
    this.message = this.message.trim();
  }
  
  // Mise à jour automatique de la date de modification
  this.dateModification = Date.now();
  
  next();
});

// Méthode pour ajouter une réponse
contactSchema.methods.ajouterReponse = async function(contenu, auteurId, estInterne = false) {
  this.reponses.push({
    contenu,
    auteur: auteurId,
    estInterne
  });
  
  // Mise à jour du statut si nécessaire
  if (this.statut === 'nouveau' || this.statut === 'fermé') {
    this.statut = 'en_cours';
  }
  
  return this.save();
};

// Méthode pour marquer comme traité
contactSchema.methods.marquerCommeTraite = function(utilisateurId) {
  this.statut = 'traité';
  this.modifiePar = utilisateurId;
  return this.save();
};

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
