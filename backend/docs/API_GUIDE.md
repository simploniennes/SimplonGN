# Guide de l'API SimplonGN

Bienvenue dans la documentation de l'API SimplonGN. Ce guide vous aidera à comprendre comment interagir avec notre API de manière efficace et sécurisée.

## Table des matières

1. [Introduction](#introduction)
2. [Authentification](#authentification)
3. [Conventions d'API](#conventions-dapi)
4. [Gestion des erreurs](#gestion-des-erreurs)
5. [Pagination et filtrage](#pagination-et-filtrage)
6. [Bonnes pratiques](#bonnes-pratiques)
7. [Sécurité](#sécurité)
8. [Exemples](#exemples)

## Introduction

L'API SimplonGN est une API RESTful qui permet d'interagir avec les différentes ressources du système (utilisateurs, formations, contacts, etc.). Toutes les réponses sont au format JSON.

### URL de base

- Développement : `http://localhost:5000/api/v1`
- Production : `https://api.simplongn.org/api/v1`

### En-têtes communs

Toutes les requêtes nécessitent l'en-tête suivant :

```
Content-Type: application/json
```

Pour les requêtes authentifiées, incluez le token JWT :

```
Authorization: Bearer votre_token_jwt
```

## Authentification

L'API utilise JWT (JSON Web Tokens) pour l'authentification. Voici comment l'utiliser :

1. **Connexion** :
   ```
   POST /api/v1/auth/login
   ```
   Corps de la requête :
   ```json
   {
     "email": "utilisateur@example.com",
     "password": "motdepasse123"
   }
   ```
   Réponse :
   ```json
   {
     "status": "success",
     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
     "data": {
       "user": {
         "_id": "5f8d0f3d5d7a6f3d5c7b9a1d",
         "nom": "Jean Dupont",
         "email": "jean.dupont@example.com",
         "role": "user"
       }
     }
   }
   ```

2. **Utilisation du token** :
   - Incluez le token dans l'en-tête `Authorization` pour les requêtes authentifiées
   - Le token expire après 90 jours (peut être configuré)

## Conventions d'API

### Méthodes HTTP

- `GET` : Récupérer des ressources
- `POST` : Créer une nouvelle ressource
- `PUT` : Mettre à jour une ressource existante (remplacement complet)
- `PATCH` : Mettre à jour partiellement une ressource
- `DELETE` : Supprimer une ressource

### Codes de statut HTTP

- `200 OK` : Requête réussie
- `201 Created` : Ressource créée avec succès
- `204 No Content` : Pas de contenu à retourner (pour les suppressions)
- `400 Bad Request` : Requête mal formée
- `401 Unauthorized` : Authentification requise
- `403 Forbidden` : Accès refusé (permissions insuffisantes)
- `404 Not Found` : Ressource non trouvée
- `422 Unprocessable Entity` : Erreur de validation
- `429 Too Many Requests` : Trop de requêtes
- `500 Internal Server Error` : Erreur serveur

## Gestion des erreurs

Les erreurs sont renvoyées au format suivant :

```json
{
  "status": "error",
  "code": 400,
  "message": "Message d'erreur général",
  "details": [
    {
      "field": "email",
      "message": "Doit être une adresse email valide",
      "value": "email-invalide"
    }
  ]
}
```

## Pagination et filtrage

### Pagination

Les listes de ressources sont paginées. Les paramètres suivants sont disponibles :

- `page` : Numéro de page (par défaut : 1)
- `limit` : Nombre d'éléments par page (par défaut : 10, max : 100)

Exemple de réponse paginée :

```json
{
  "status": "success",
  "results": 2,
  "pagination": {
    "total": 42,
    "pages": 5,
    "page": 1,
    "limit": 10,
    "hasNext": true,
    "hasPrev": false
  },
  "data": [
    { "id": 1, "nom": "Formation 1" },
    { "id": 2, "nom": "Formation 2" }
  ]
}
```

### Filtrage

Utilisez les paramètres de requête pour filtrer les résultats :

```
GET /api/v1/formations?statut=publié&duree[gte]=100
```

Opérateurs disponibles :
- `eq` : égal à
- `ne` : différent de
- `gt` : supérieur à
- `gte` : supérieur ou égal à
- `lt` : inférieur à
- `lte` : inférieur ou égal à
- `in` : dans une liste de valeurs
- `regex` : correspondance par expression régulière

## Bonnes pratiques

1. **Validation des entrées** :
   - Validez toujours les données côté client avant de les envoyer
   - Ne faites pas confiance aux données entrantes

2. **Gestion des erreurs** :
   - Gérez correctement les erreurs côté client
   - Affichez des messages d'erreur conviviaux pour l'utilisateur final

3. **Performances** :
   - Utilisez la pagination pour les grandes listes
   - Ne récupérez que les champs nécessaires
   - Utilisez le cache quand c'est possible

## Sécurité

1. **Protection des tokens** :
   - Ne stockez jamais de tokens JWT dans le stockage local
   - Utilisez des cookies HTTPOnly pour le stockage côté navigateur

2. **Requêtes sécurisées** :
   - Utilisez toujours HTTPS en production
   - Ne transmettez jamais d'informations sensibles dans les URL

3. **Permissions** :
   - Vérifiez les autorisations côté serveur
   - Utilisez le principe du moindre privilège

## Exemples

### Création d'un utilisateur

```http
POST /api/v1/users
Authorization: Bearer votre_token_jwt
Content-Type: application/json

{
  "nom": "Nouvel Utilisateur",
  "email": "nouvel@example.com",
  "password": "MotDePasse123!",
  "role": "user"
}
```

### Mise à jour partielle d'une formation

```http
PATCH /api/v1/formations/5f8d0f3d5d7a6f3d5c7b9a1f
Authorization: Bearer votre_token_jwt
Content-Type: application/json

{
  "statut": "publié"
}
```

### Suppression d'un contact

```http
DELETE /api/v1/contacts/5f8d0f3d5d7a6f3d5c7b9a1e
Authorization: Bearer votre_token_jwt
```

## Support

Pour toute question ou problème, veuillez contacter :
- Email : support@simplongn.org
- Documentation Swagger : `/api-docs`

---

*Dernière mise à jour : 25/08/2025*
