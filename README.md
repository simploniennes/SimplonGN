# Simplon Guinée - Refonte du Site Web

## 📋 Présentation du Projet

**Nom du projet :** Refonte du site web de Simplon Guinée  
**Cheffe de projet :** Diariou Barry  
**Équipe :** 10 personnes  
**Durée estimée :** Juillet – Septembre 2025  
**Deadline finale :** 10 septembre 2025  
**Référence d'inspiration :** [simplon.ci](https://simplon.ci)

## 🎯 Objectifs

- Concevoir un site web moderne, responsive, intuitif et performant
- Promouvoir les activités, formations, événements et témoignages de Simplon Guinée
- Permettre aux utilisateurs de découvrir l'équipe, les actualités, la galerie média
- Intégrer un espace d'administration sécurisé pour gérer les contenus dynamiques

## 🛠️ Technologies Utilisées

### Frontend
- **React.js** - Framework JavaScript
- **TailwindCSS** - Framework CSS utilitaire
- **React Router** - Navigation
- **Axios** - Client HTTP

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MongoDB** - Base de données NoSQL
- **Mongoose** - ODM pour MongoDB
- **JWT** - Authentification
- **Nodemailer** - Envoi d'emails
- **Multer** - Upload de fichiers

## 📁 Structure du Projet

```
SimplonGN/
├── frontend/                 # Application React
│   ├── public/
│   ├── src/
│   │   ├── components/       # Composants réutilisables
│   │   ├── pages/           # Pages principales
│   │   ├── hooks/           # Hooks personnalisés
│   │   ├── services/        # Services API
│   │   ├── utils/           # Utilitaires
│   │   └── styles/          # Styles CSS
│   └── package.json
├── backend/                  # API Node.js/Express
│   ├── controllers/         # Contrôleurs
│   ├── models/             # Modèles MongoDB
│   ├── routes/             # Routes API
│   ├── middleware/         # Middleware
│   ├── config/             # Configuration
│   ├── uploads/            # Fichiers uploadés
│   └── package.json
├── docs/                    # Documentation
└── README.md
```

## 🚀 Installation et Démarrage

### Prérequis
- Node.js (v18+)
- MongoDB
- Git

### Installation

1. **Cloner le projet**
```bash
git clone [URL_DU_REPO]
cd SimplonGN
```

2. **Installation des dépendances Frontend**
```bash
cd frontend
npm install
```

3. **Installation des dépendances Backend**
```bash
cd ../backend
npm install
```

4. **Configuration de l'environnement**
```bash
# Dans backend/
cp .env.example .env
# Éditer .env avec vos variables d'environnement
```

5. **Démarrage du développement**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

## 👥 Répartition de l'Équipe

### Frontend (10 membres)
- Pages réparties entre les 10 membres

### Backend
| Membre | Tâche Backend |
|--------|---------------|
| Diariou | Coordination, gestion des routes & sécurité |
| Diawara | Authentification (login, register, JWT) |
| Nene Aissatou | Gestion des utilisateurs (CRUD + rôles) |
| Safiatou | CRUD formations |
| Aissatou | CRUD équipe |
| Djoulde | Témoignages (création, modération) |
| Rabiatou | Actualités (CRUD articles, images, dates) |
| Oulare | Galerie (upload & suppression images) |
| Rama | FAQ (questions/réponses dynamiques) |
| Ernestine | Contact (formulaire + envoi email) |

## 📅 Planning Global

| Période | Étape |
|---------|-------|
| 1 – 7 août | Finalisation maquette + structure du projet |
| 8 – 20 août | Développement frontend |
| 21 août – 2 sept | Développement backend |
| 3 – 8 septembre | Tests, intégration, ajustements |
| 9 – 10 septembre | Soutenance et livraison finale |

## 📋 Livrables Attendus

- [ ] Prototype sur Figma
- [ ] Code source complet (frontend + backend)
- [ ] API fonctionnelle et sécurisée
- [ ] Site hébergé en ligne
- [ ] Vidéo de démonstration
- [ ] Cahier des charges & rapport technique PDF
- [ ] Présentation PowerPoint pour soutenance

## 🔗 Liens Utiles

- **Dépôt GitHub :** [À ajouter]
- **Dossier partagé :** [À créer sur Google Drive]
- **Outils recommandés :** VS Code, Postman, MongoDB Compass

## 📞 Contact

**Cheffe de projet :** Diariou Barry  
**Email :** [À ajouter]  
**Téléphone :** [À ajouter]