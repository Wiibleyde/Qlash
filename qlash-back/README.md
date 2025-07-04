# Qlash Back

Backend du projet Qlash, basé sur Node.js (Bun), Express, Prisma et Socket.io.

## Installation

1. **Installer les dépendances :**
   ```bash
   bun install
   ```

2. **Configurer les variables d'environnement :**
   Créez un fichier `.env` à la racine du dossier `qlash-back` :
   ```
   DATABASE_URL="postgresql://root:RootPassword@localhost:5432/qlashdatabase?schema=public"
   JWT_SECRET="your_jwt_secret"
   ```

3. **Initialiser la base de données :**
   ```bash
   bun prisma migrate deploy
   bun prisma generate
   bun prisma db seed
   ```

4. **Lancer le serveur :**
   ```bash
   bun run index.ts
   ```

Si lors du premier lancement, dans les logs, l'adresse IP du serveur est `undefined`, arrêtez le serveur et relancez-le. Cela peut arriver si le serveur n'a pas pu récupérer l'adresse IP locale au premier démarrage.

---

## Documentation des routes API

### Authentification

- **POST `/auth/register`**  
  Crée un nouvel utilisateur.  
  Corps : `{ email, password, name }`  
  Réponse : `{ message, user, token }`

- **POST `/auth/login`**  
  Authentifie un utilisateur.  
  Corps : `{ email, password }`  
  Réponse : `{ message, user, token }`

- **POST `/auth/logout`**  
  Déconnexion (côté client : suppression du token).  
  Réponse : `{ message }`

- **GET `/auth/isAuthenticated`**  
  Vérifie l'authentification (token requis).  
  Réponse : `{ status, user, timestamp }`

---

### Utilisateur

- **GET `/user/:id`**  
  Récupère les infos d'un utilisateur (token requis, accès limité à soi-même).  
  Réponse : `{ ...user }`

---

### Quiz

- **GET `/quiz/:id`**  
  Récupère un quiz par son ID.  
  Réponse : `{ ...quiz }`

- **GET `/question/types`**  
  Liste les types de questions disponibles.  
  Réponse : `[{ id, name, description }]`

- **POST `/quiz`**  
  Crée un quiz (token requis).  
  Corps : `{ ...quizData }`  
  Réponse : `{ message, quiz }`

---

### Intelligence Artificielle

- **GET `/ia/quiz/:prompt`**  
  Génère un quiz à partir d'un prompt (token requis).  
  Réponse : `{ ...quiz }`

---

## Documentation des événements Socket.io

### game:question

- **Client → Serveur**  
  Demande l'envoi de la question courante.  
  Payload : `{ gameUuid }`

- **Serveur → Room**  
  Envoie la question à tous les joueurs.  
  Payload :  
  ```json
  {
    "players": [{ "username", "socketId", "score" }],
    "questionIndex": number,
    "question": { ... },
    "answers": [ ... ],
    "currentIndex": number,
    "quizLength": number,
    "timer": number
  }
  ```

---

### game:answer

- **Client → Serveur**  
  Envoie la réponse d'un joueur.  
  Payload : `{ gameUuid, answer }`

- **Serveur → Client**  
  Confirme la prise en compte de la réponse.  
  Payload : `{}`

---

### game:wait

- **Serveur → Room**  
  Indique la fin de la question, attente avant la suivante.  
  Payload : `{}`

---

### game:end

- **Serveur → Room**  
  Indique la fin du quiz.  
  Payload : `{}`

---

### game:buzzed

- **Client → Serveur**  
  Signale qu'un joueur a buzzé (pour les questions de type "Buzzer").  
  Payload : `{ gameUuid }`

- **Serveur → Room**  
  Notifie les autres joueurs qu'un joueur a buzzé.  
  Payload : `{ player: { username } }`

---

### create

- **Client → Serveur**  
  Crée une nouvelle partie.  
  Payload : `{ username }`

- **Serveur → Client**  
  Confirme la création.  
  Payload : `{ success, gameUuid }`

---

### synclobby

- **Client → Serveur**  
  Synchronise les joueurs dans le lobby.  
  Payload : `{ gameUuid }`

- **Serveur → Client**  
  Envoie la liste des joueurs et le code de la partie.  
  Payload : `{ players, code }`

---

### startgame

- **Client → Serveur**  
  Démarre la partie.  
  Payload : `{ gameUuid, presetId }`

- **Serveur → Client**  
  Confirme le démarrage.  
  Payload : `{ success, message, gameId }`

---

## Notes

- Toutes les routes protégées nécessitent un header `Authorization: Bearer <token>`.
- Les événements Socket.io utilisent le namespace par défaut.

---

Pour plus de détails, consultez les fichiers sources dans le dossier [`qlash-back`](qlash-back/).