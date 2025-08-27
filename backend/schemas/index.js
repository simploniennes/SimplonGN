import Joi from 'joi';
import mongoose from 'mongoose';

const { Types: { ObjectId } } = mongoose;

// Schémas communs
const common = {
  objectId: Joi.string().custom((value, helpers) => {
    if (!ObjectId.isValid(value)) {
      return helpers.error('any.invalid');
    }
    return value;
  }, 'ObjectId invalide'),
  
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org', 'fr'] } })
    .lowercase()
    .trim()
    .messages({
      'string.email': 'Veuillez fournir une adresse email valide',
      'string.empty': 'L\'email est obligatoire',
      'any.required': 'L\'email est obligatoire'
    }),
    
  password: Joi.string()
    .min(8)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'))
    .messages({
      'string.min': 'Le mot de passe doit contenir au moins 8 caractères',
      'string.pattern.base': 'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial',
      'string.empty': 'Le mot de passe est obligatoire',
      'any.required': 'Le mot de passe est obligatoire'
    }),
    
  pagination: {
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    sort: Joi.string().pattern(/^[a-zA-Z0-9_]+:(asc|desc)$/),
    search: Joi.string().trim()
  }
};

// Schémas pour l'authentification
const authSchemas = {
  register: Joi.object({
    nom: Joi.string()
      .min(2)
      .max(50)
      .required()
      .messages({
        'string.min': 'Le nom doit contenir au moins 2 caractères',
        'string.max': 'Le nom ne peut pas dépasser 50 caractères',
        'string.empty': 'Le nom est obligatoire',
        'any.required': 'Le nom est obligatoire'
      }),
    email: common.email.required(),
    password: common.password.required(),
    confirmPassword: Joi.string()
      .valid(Joi.ref('password'))
      .required()
      .messages({
        'any.only': 'Les mots de passe ne correspondent pas',
        'any.required': 'La confirmation du mot de passe est obligatoire'
      }),
    role: Joi.string()
      .valid('user', 'admin', 'formateur')
      .default('user')
      .messages({
        'any.only': 'Rôle non valide'
      })
  }),
  
  login: Joi.object({
    email: common.email.required(),
    password: Joi.string().required().messages({
      'string.empty': 'Le mot de passe est obligatoire',
      'any.required': 'Le mot de passe est obligatoire'
    })
  }),
  
  refreshToken: Joi.object({
    refreshToken: Joi.string().required().messages({
      'string.empty': 'Le refresh token est obligatoire',
      'any.required': 'Le refresh token est obligatoire'
    })
  }),
  
  forgotPassword: Joi.object({
    email: common.email.required()
  }),
  
  resetPassword: Joi.object({
    token: Joi.string().required().messages({
      'string.empty': 'Le token de réinitialisation est obligatoire',
      'any.required': 'Le token de réinitialisation est obligatoire'
    }),
    password: common.password.required(),
    confirmPassword: Joi.string()
      .valid(Joi.ref('password'))
      .required()
      .messages({
        'any.only': 'Les mots de passe ne correspondent pas',
        'any.required': 'La confirmation du mot de passe est obligatoire'
      })
  })
};

// Schémas pour les utilisateurs
const userSchemas = {
  createUser: Joi.object({
    nom: Joi.string().min(2).max(50).required(),
    email: common.email.required(),
    password: common.password.required(),
    role: Joi.string().valid('user', 'admin', 'formateur').default('user'),
    statut: Joi.string().valid('actif', 'inactif', 'en_attente').default('en_attente'),
    telephone: Joi.string().pattern(/^[0-9]{10}$/).allow('', null),
    adresse: Joi.string().max(255).allow('', null),
    dateNaissance: Joi.date().max('now').iso().allow('', null)
  }),
  
  updateUser: Joi.object({
    nom: Joi.string().min(2).max(50),
    email: common.email,
    telephone: Joi.string().pattern(/^[0-9]{10}$/).allow('', null),
    adresse: Joi.string().max(255).allow('', null),
    dateNaissance: Joi.date().max('now').iso().allow('', null),
    bio: Joi.string().max(1000).allow('', null),
    competences: Joi.array().items(Joi.string().max(100)),
    experience: Joi.array().items(
      Joi.object({
        poste: Joi.string().required(),
        entreprise: Joi.string().required(),
        description: Joi.string(),
        dateDebut: Joi.date().required(),
        dateFin: Joi.date().min(Joi.ref('dateDebut')).allow(null),
        enPoste: Joi.boolean().default(false)
      })
    )
  }).min(1),
  
  changePassword: Joi.object({
    currentPassword: Joi.string().required().messages({
      'string.empty': 'Le mot de passe actuel est obligatoire',
      'any.required': 'Le mot de passe actuel est obligatoire'
    }),
    newPassword: common.password.required(),
    confirmPassword: Joi.string()
      .valid(Joi.ref('newPassword'))
      .required()
      .messages({
        'any.only': 'Les nouveaux mots de passe ne correspondent pas',
        'any.required': 'La confirmation du nouveau mot de passe est obligatoire'
      })
  })
};

// Schémas pour les contacts
const contactSchemas = {
  sendMessage: Joi.object({
    sujet: Joi.string().max(200).default('Sans objet'),
    message: Joi.string().min(10).max(5000).required().messages({
      'string.min': 'Le message doit contenir au moins 10 caractères',
      'string.max': 'Le message ne peut pas dépasser 5000 caractères',
      'string.empty': 'Le message est obligatoire',
      'any.required': 'Le message est obligatoire'
    }),
    categorie: Joi.string().valid('question', 'suggestion', 'problème', 'autre').default('question'),
    piecesJointes: Joi.array().items(Joi.string().uri())
  }),
  
  updateStatus: Joi.object({
    statut: Joi.string().valid('nouveau', 'en_cours', 'traité', 'fermé').required()
  }),
  
  addResponse: Joi.object({
    contenu: Joi.string().min(1).required(),
    estInterne: Joi.boolean().default(false)
  })
};

// Schémas pour les formations
const formationSchemas = {
  createFormation: Joi.object({
    titre: Joi.string().min(5).max(200).required(),
    description: Joi.string().min(10).required(),
    duree: Joi.number().integer().min(1).required(),
    prix: Joi.number().min(0).required(),
    dateDebut: Joi.date().min('now').required(),
    dateFin: Joi.date().min(Joi.ref('dateDebut')).required(),
    placesDisponibles: Joi.number().integer().min(1).required(),
    prerequis: Joi.array().items(Joi.string().min(3)).min(1).required(),
    programme: Joi.array().items(
      Joi.object({
        titre: Joi.string().required(),
        description: Joi.string().required(),
        duree: Joi.number().min(0.5).required()
      })
    ).min(1).required(),
    formateurs: Joi.array().items(common.objectId).min(1).required()
  }),
  
  updateFormation: Joi.object({
    titre: Joi.string().min(5).max(200),
    description: Joi.string().min(10),
    duree: Joi.number().integer().min(1),
    prix: Joi.number().min(0),
    dateDebut: Joi.date(),
    dateFin: Joi.date().min(Joi.ref('dateDebut')),
    placesDisponibles: Joi.number().integer().min(0),
    statut: Joi.string().valid('brouillon', 'publié', 'annulé', 'terminé'),
    prerequis: Joi.array().items(Joi.string().min(3)),
    programme: Joi.array().items(
      Joi.object({
        titre: Joi.string().required(),
        description: Joi.string().required(),
        duree: Joi.number().min(0.5).required()
      })
    ),
    formateurs: Joi.array().items(common.objectId)
  }).min(1)
};

// Schémas pour la pagination et le tri
const querySchemas = {
  pagination: Joi.object({
    page: common.pagination.page,
    limit: common.pagination.limit,
    sort: common.pagination.sort,
    search: common.pagination.search
  }),
  
  search: Joi.object({
    q: Joi.string().trim().min(1).required(),
    ...common.pagination
  })
};

// Schémas pour la galerie
const gallerySchemas = {
  create: Joi.object({
    title: Joi.string()
      .min(2)
      .max(100)
      .required()
      .messages({
        'string.min': 'Le titre doit contenir au moins 2 caractères',
        'string.max': 'Le titre ne peut pas dépasser 100 caractères',
        'string.empty': 'Le titre est obligatoire',
        'any.required': 'Le titre est obligatoire'
      }),
    description: Joi.string()
      .max(500)
      .allow('')
      .messages({
        'string.max': 'La description ne peut pas dépasser 500 caractères'
      }),
    tags: Joi.string()
      .pattern(/^[a-zA-Z0-9\s,]+$/)
      .allow('')
      .messages({
        'string.pattern.base': 'Les tags ne peuvent contenir que des lettres, des chiffres et des virgules'
      })
  }),
  
  update: Joi.object({
    title: Joi.string()
      .min(2)
      .max(100)
      .messages({
        'string.min': 'Le titre doit contenir au moins 2 caractères',
        'string.max': 'Le titre ne peut pas dépasser 100 caractères',
        'string.empty': 'Le titre ne peut pas être vide'
      }),
    description: Joi.string()
      .max(500)
      .allow('')
      .messages({
        'string.max': 'La description ne peut pas dépasser 500 caractères'
      }),
    tags: Joi.string()
      .pattern(/^[a-zA-Z0-9\s,]+$/)
      .allow('')
      .messages({
        'string.pattern.base': 'Les tags ne peuvent contenir que des lettres, des chiffres et des virgules'
      }),
    isActive: Joi.boolean()
  }).min(1),
  
  delete: Joi.object({
    id: common.objectId.required()
  }),
  
  getImages: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    sort: Joi.string().pattern(/^(-?[a-zA-Z_]+(,-?[a-zA-Z_]+)*)?$/).default('-uploadedAt'),
    title: Joi.string(),
    tags: Joi.string(),
    isActive: Joi.boolean()
  }),
  
  searchImages: Joi.object({
    q: Joi.string().min(1).required().messages({
      'string.min': 'Le terme de recherche est obligatoire',
      'string.empty': 'Le terme de recherche est obligatoire',
      'any.required': 'Le terme de recherche est obligatoire'
    })
  })
};

module.exports = {
  common,
  auth: authSchemas,
  user: userSchemas,
  contact: contactSchemas,
  formation: formationSchemas,
  query: querySchemas,
  gallery: gallerySchemas
};
