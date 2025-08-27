# API SimplonGN - Backend

[![Node.js CI](https://github.com/votre-org/simplongn-backend/actions/workflows/node.js.yml/badge.svg)](https://github.com/votre-org/simplongn-backend/actions/workflows/node.js.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Backend pour la plateforme SimplonGN, une application de gestion des formations et des apprenants de Simplon.

## 📋 Table des matières

- [Fonctionnalités](#-fonctionnalités)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Développement](#-développement)
- [Tests](#-tests)
- [Déploiement](#-déploiement)
- [Documentation API](#-documentation-api)
- [Sécurité](#-sécurité)
- [Contribution](#-contribution)
- [Licence](#-licence)

## ✨ Fonctionnalités

- **Authentification** : JWT, Inscription, Connexion, Rafraîchissement de token
- **Gestion des utilisateurs** : CRUD avec rôles (admin, formateur, apprenant)
- **Formations** : Création, gestion et suivi des formations
- **Contacts** : Gestion des messages de contact
- **Actualités** : Gestion des actualités et événements
- **FAQ** : Gestion des questions fréquentes
- **Équipe** : Gestion des membres de l'équipe
- **Témoignages** : Gestion des témoignages d'apprenants

## 🛠 Prérequis

- Node.js (v18+)
- MongoDB (v6+)
- npm (v9+) ou yarn (v1.22+)

## 🚀 Installation

1. **Cloner le dépôt** :
   ```bash
   git clone https://github.com/votre-org/simplongn-backend.git
   cd simplongn-backend
   ```

2. **Installer les dépendances** :
   ```bash
   npm install
   # ou
   yarn
   ```

3. **Configurer les variables d'environnement** :
   ```bash
   cp .env.example .env
   ```
   Puis éditez le fichier `.env` avec vos configurations.

4. **Démarrer le serveur en mode développement** :
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

Le serveur démarrera sur `http://localhost:5000` par défaut.

## ⚙️ Configuration

Copiez le fichier `.env.example` vers `.env` et configurez les variables suivantes :

```env
# Application
NODE_ENV=development
PORT=5000

# Base de données
MONGODB_URI=mongodb://localhost:27017/simplongn

# JWT
JWT_SECRET=votre_secret_jwt
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90

# Email (configuration pour Mailtrap en développement)
EMAIL_HOST=smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USERNAME=votre_username_mailtrap
EMAIL_PASSWORD=votre_password_mailtrap
EMAIL_FROM=noreply@simplongn.org

# Client
CLIENT_URL=http://localhost:3000
```

## 🛠 Développement

### Commandes utiles

- `npm run dev` : Démarrer le serveur en mode développement avec rechargement automatique
- `npm run start` : Démarrer le serveur en production
- `npm run lint` : Vérifier la qualité du code avec ESLint
- `npm run lint:fix` : Corriger automatiquement les problèmes de style de code
- `npm run test` : Exécuter les tests
- `npm run test:watch` : Exécuter les tests en mode watch
- `npm run test:coverage` : Générer un rapport de couverture de test

### Structure du projet

```
backend/
├── config/           # Fichiers de configuration
├── controllers/      # Contrôleurs de l'API
├── docs/             # Documentation de l'API
├── middleware/       # Middlewares Express
├── models/           # Modèles Mongoose
├── routes/           # Définitions des routes
├── schemas/          # Schémas de validation
├── services/         # Logique métier
├── utils/            # Utilitaires
├── .env.example      # Exemple de fichier d'environnement
├── .eslintrc.js      # Configuration ESLint
├── .gitignore        # Fichiers ignorés par Git
├── app.js            # Point d'entrée de l'application
├── package.json      # Dépendances et scripts
└── README.md         # Ce fichier
```

## 🧪 Tests

Les tests sont écrits avec Jest et Supertest. Pour exécuter les tests :

```bash
# Tous les tests
npm test

# Tests en mode watch
npm run test:watch

# Couverture de test
npm run test:coverage
```

## 🚀 Déploiement

### Préparation pour la production

1. Mettez à jour les variables d'environnement pour la production
2. Installez les dépendances de production uniquement :
   ```bash
   npm install --production
   ```
3. Construisez l'application :
   ```bash
   npm run build
   ```
4. Démarrez le serveur :
   ```bash
   npm start
   ```

### Avec PM2 (recommandé pour la production)

```bash
# Installation globale de PM2
npm install -g pm2

# Démarrer l'application
pm2 start app.js --name "simplongn-api"

# Activer le démarrage automatique au démarrage du serveur
pm2 startup
pm2 save

# Voir les logs
pm2 logs simplongn-api
```

## 📚 Documentation API

La documentation complète de l'API est disponible via Swagger UI :

- **URL** : `/api-docs`
- **Documentation interactive** : Explorez et testez les endpoints directement depuis votre navigateur

Pour plus de détails, consultez le [Guide de l'API](./docs/API_GUIDE.md).

## 🔒 Sécurité

### Bonnes pratiques

- Utilisez toujours HTTPS en production
- Ne stockez jamais de données sensibles dans le code source
- Validez et assainissez toutes les entrées utilisateur
- Utilisez des mots de passe forts et des tokens d'accès sécurisés
- Mettez à jour régulièrement les dépendances

### Dépendances de sécurité

Pour vérifier les vulnérabilités connues dans les dépendances :

```bash
npm audit
```

## 🤝 Contribution

Les contributions sont les bienvenues ! Voici comment contribuer :

1. Forkez le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

### Convention de commits

Nous utilisons [Conventional Commits](https://www.conventionalcommits.org/) pour nos messages de commit :

- `feat`: Une nouvelle fonctionnalité
- `fix`: Une correction de bug
- `docs`: Modification de la documentation
- `style`: Changements qui n'affectent pas le sens du code (espace, formatage, etc.)
- `refactor`: Changement de code qui ne corrige pas un bug et n'ajoute pas de fonctionnalité
- `perf`: Changement de code qui améliore les performances
- `test`: Ajout ou modification de tests
- `chore`: Changements aux outils de construction ou aux dépendances

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🙏 Remerciements

- [Express](https://expressjs.com/) - Le framework web pour Node.js
- [MongoDB](https://www.mongodb.com/) - La base de données NoSQL
- [Mongoose](https://mongoosejs.com/) - ODM pour MongoDB et Node.js
- [JWT](https://jwt.io/) - Pour l'authentification
- [Swagger](https://swagger.io/) - Pour la documentation de l'API

---

Développé avec ❤️ par l'équipe SimplonGN - 2025
