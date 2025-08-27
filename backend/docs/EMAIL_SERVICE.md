# Service d'envoi d'e-mails

Ce service utilise Nodemailer pour gérer l'envoi d'e-mails dans l'application SimplonGN.

## Configuration requise

Assurez-vous d'avoir les variables d'environnement suivantes dans votre fichier `.env` :

```env
# Configuration SMTP
SMTP_HOST=votre-serveur-smtp.com
SMTP_PORT=587
SMTP_SECURE=false # true pour le port 465, false pour 587
SMTP_USER=votre@email.com
SMTP_PASS=votre-mot-de-passe

# Email de l'administrateur qui recevra les notifications
ADMIN_EMAIL=admin@example.com
```

## Fonctionnalités

### 1. Notification de contact

Envoie une notification à l'administrateur lorsqu'un utilisateur envoie un message via le formulaire de contact.

**Fonction** : `sendContactNotification(contact, user)`

**Paramètres** :
- `contact` : Objet contenant les détails du message (sujet, message)
- `user` : Objet utilisateur contenant le nom et l'email de l'expéditeur

### 2. Accusé de réception

Envoie un email automatique de confirmation à l'utilisateur qui a envoyé un message via le formulaire de contact.

**Fonction** : `sendAutoReply(contact, user)`

**Paramètres** :
- `contact` : Objet contenant les détails du message
- `user` : Objet utilisateur contenant le nom et l'email du destinataire

## Utilisation

```javascript
import { sendContactNotification, sendAutoReply } from '../services/mailer.service.js';

// Exemple d'utilisation dans un contrôleur
const contact = {
  sujet: 'Question sur les formations',
  message: 'Bonjour, je souhaite en savoir plus sur vos formations.'
};

const user = {
  nom: 'Jean Dupont',
  email: 'jean.dupont@example.com'
};

// Envoyer une notification à l'admin
await sendContactNotification(contact, user);

// Envoyer un accusé de réception à l'utilisateur
await sendAutoReply(contact, user);
```

## Gestion des erreurs

Le service gère automatiquement les erreurs de connexion SMTP et les erreurs d'envoi d'e-mails. Les erreurs sont propagées vers l'appelant et doivent être gérées dans le contrôleur.

## Personnalisation

Pour personnaliser les modèles d'eails, modifiez directement les fonctions dans le fichier `services/mailer.service.js`.

## Tests

Pour tester le service d'envoi d'e-mails, vous pouvez utiliser un service comme [Mailtrap](https://mailtrap.io/) en développement.

Exemple de configuration pour Mailtrap :

```env
SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=2525
SMTP_SECURE=false
SMTP_USER=votre-user-mailtrap
SMTP_PASS=votre-pass-mailtrap
```
## Sécurité

- Utilisez toujours des variables d'environnement pour les identifiants SMTP
- Activez l'authentification à deux facteurs sur le compte email utilisé pour l'envoi
- Vérifiez que votre serveur SMTP utilise une connexion sécurisée (TLS/SSL)
