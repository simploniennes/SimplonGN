# Guide de validation des données

Ce document explique comment utiliser le système de validation dans l'application backend.

## Table des matières

1. [Introduction](#introduction)
2. [Validation des requêtes](#validation-des-requêtes)
   - [Validation du corps (Body)](#validation-du-corps-body)
   - [Validation des paramètres d'URL](#validation-des-paramètres-durl)
   - [Validation des paramètres de requête](#validation-des-paramètres-de-requête)
3. [Schémas de validation](#schémas-de-validation)
   - [Schémas communs](#schémas-communs)
   - [Schémas spécifiques](#schémas-spécifiques)
4. [Gestion des erreurs](#gestion-des-erreurs)
5. [Bonnes pratiques](#bonnes-pratiques)

## Introduction

Le système de validation utilise principalement deux bibliothèques :
- **Joi** : Pour définir des schémas de validation
- **Express Validator** : Pour l'intégration avec Express

Toutes les validations sont centralisées dans le dossier `schemas/` et les middlewares de validation dans `middleware/validate.js`.

## Validation des requêtes

### Validation du corps (Body)

Pour valider le corps d'une requête, utilisez le middleware `validateBody` avec un schéma Joi :

```javascript
const { validateBody } = require('../middleware/validate');
const { user } = require('../schemas');

router.post('/users', 
  validateBody(user.createUser),
  userController.createUser
);
```

### Validation des paramètres d'URL

Pour valider les paramètres d'URL, utilisez `validateParams` :

```javascript
const { validateParams } = require('../middleware/validate');
const { common } = require('../schemas');

const paramsSchema = Joi.object({
  userId: common.objectId.required()
});

router.get('/users/:userId',
  validateParams(paramsSchema),
  userController.getUser
);
```

### Validation des paramètres de requête

Pour valider les paramètres de requête (query string), utilisez `validateQuery` :

```javascript
const { validateQuery } = require('../middleware/validate');
const { query } = require('../schemas');

router.get('/users',
  validateQuery(query.pagination),
  userController.getUsers
);
```

## Schémas de validation

### Schémas communs

Des schémas de validation courants sont disponibles dans `schemas/common.js` :

- `objectId` : Validation des identifiants MongoDB
- `email` : Validation des adresses email
- `password` : Validation des mots de passe
- `pagination` : Paramètres de pagination

### Schémas spécifiques

Les schémas sont organisés par domaine fonctionnel :

- `auth` : Authentification (login, register, etc.)
- `user` : Gestion des utilisateurs
- `contact` : Messages de contact
- `formation` : Formations et sessions

## Gestion des erreurs

Les erreurs de validation sont automatiquement capturées et formatées de manière cohérente :

```json
{
  "status": "error",
  "code": 400,
  "message": "Données invalides",
  "details": [
    {
      "field": "email",
      "message": "Veuillez fournir une adresse email valide",
      "value": "invalid-email"
    }
  ]
}
```

## Bonnes pratiques

1. **Réutiliser les schémas** : Évitez de redéfinir les mêmes validations
2. **Valider tôt** : Validez les entrées dès leur réception
3. **Messages clairs** : Fournissez des messages d'erreur explicites
4. **Tests** : Testez vos validations avec différents jeux de données
5. **Sécurité** : Ne renvoyez jamais les détails d'erreur sensibles en production

## Exemple complet

```javascript
// routes/user.routes.js
const express = require('express');
const router = express.Router();
const { validateBody, validateParams, validateQuery } = require('../middleware/validate');
const { user, common, query } = require('../schemas');
const userController = require('../controllers/user.controller');

// Créer un utilisateur
router.post(
  '/',
  validateBody(user.createUser),
  userController.createUser
);

// Récupérer un utilisateur par ID
router.get(
  '/:userId',
  validateParams({ userId: common.objectId.required() }),
  userController.getUser
);

// Lister les utilisateurs avec pagination
router.get(
  '/',
  validateQuery(query.pagination),
  userController.getUsers
);

module.exports = router;
```

## Personnalisation

Pour ajouter un nouveau schéma de validation :

1. Créez ou modifiez un fichier dans `schemas/`
2. Définissez votre schéma Joi
3. Exportez-le dans `schemas/index.js`
4. Utilisez-le avec les middlewares de validation

Pour personnaliser les messages d'erreur, utilisez la méthode `.messages()` de Joi :

```javascript
const schema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Veuillez fournir une adresse email valide',
      'any.required': 'L\'email est obligatoire'
    })
});
```
