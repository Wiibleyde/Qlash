# Qlash Web

Frontend Next.js/React pour Qlash.

## Installation

1. **Installer les dépendances :**
   ```bash
   bun install
   ```

2. **Configurer les variables d'environnement :**
   Lancer d'abord le backend pour générer les variables d'environnement nécessaires. 
   ```bash
   cd ../qlash-back
   bun run index.ts
   ```

3. **Lancer le serveur de développement :**
   ```bash
   bun run dev
   ```
   Le site sera accessible sur [http://localhost:3000](http://localhost:3000).

---

## Pages principales

- `/` : Accueil
- `/join` : Rejoindre une partie avec un code
- `/lobby` : Lobby d'attente avant le jeu
- `/game` : Interface de jeu (questions, réponses, scores)
- `/newquizz` : Création/édition de quiz (manuel ou via IA)
- `/profile` : Profil utilisateur
- `/signup` et `/signin` : Inscription et connexion

---

## Fonctionnalités

- **Connexion/Inscription** : Auth via API (`/auth/login`, `/auth/register`)
- **Création de quiz** : Formulaires pour différents types de questions (QCM, Vrai/Faux, Puzzle, Buzzer)
- **Lobby multijoueur** : Synchronisation en temps réel via Socket.io
- **Jeu en temps réel** : Affichage des questions, réponses, scores, gestion du timer
- **Quiz IA** : Génération de quiz à partir d'un prompt
- **Profil** : Consultation et modification du profil utilisateur

---

## Communication avec le backend

### API REST

- **POST `/auth/register`** : Inscription
- **POST `/auth/login`** : Connexion
- **GET `/user/:id`** : Infos utilisateur (token requis)
- **GET `/quiz/:id`** : Récupérer un quiz
- **POST `/quiz`** : Créer un quiz (token requis)
- **PUT `/quiz/:id`** : Modifier un quiz (token requis)
- **GET `/question/types`** : Types de questions
- **GET `/ia/quiz/:prompt`** : Générer un quiz IA (token requis)

### Événements Socket.io

- **synclobby** : Synchronisation des joueurs dans le lobby
- **startgame** : Démarrage de la partie
- **game:question** : Réception d'une nouvelle question
- **game:answer** : Envoi de la réponse d'un joueur
- **game:wait** : Attente entre les questions
- **game:end** : Fin du quiz
- **game:buzzed** : Gestion du buzzer pour les questions rapides

Voir la [documentation backend](../qlash-back/README.md) pour le détail des payloads.

---

## Structure des composants

- `components/` : Composants réutilisables (Navbar, Loading, Scoreboard, etc.)
- `components/forms/` : Formulaires pour chaque type de question
- `components/grid/` : Grilles d'affichage des réponses
- `hook/` : Hooks personnalisés (ex: useLobby)
- `app/` : Pages Next.js (routeur)

---

## Notes

- Le token JWT est stocké dans `localStorage` après connexion.
- Le front communique avec le backend via les URLs définies dans les hooks et pages.

---

Pour plus de détails, consulte les fichiers sources dans [`qlash-web`](qlash-web/).