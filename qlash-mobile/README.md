# Qlash Mobile

Frontend mobile React Native/Expo pour Qlash.

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

3. **Lancer l'application en développement :**
   ```bash
   bun run start
   ```
   L'application sera accessible sur un émulateur ou un appareil via l'application Expo Go.

---

## Pages principales

- `app/index.tsx` : Accueil
- `app/join.tsx` : Rejoindre une partie avec un code
- `app/lobby.tsx` : Lobby d'attente avant le jeu
- `app/game.tsx` : Interface de jeu (questions, réponses, scores)
- `app/newquizz.tsx` : Création/édition de quiz (manuel ou via IA)
- `app/profile.tsx` : Profil utilisateur
- `app/signup.tsx` et `app/signin.tsx` : Inscription et connexion

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
- `components/ui/` : Composants d'interface utilisateur (boutons, grilles de réponses, etc.)
- `hook/` : Hooks personnalisés (ex: useGameSocket)
- `app/` : Pages et écrans principaux (Expo Router)

---

## Notes

- Le token JWT est stocké localement après connexion.
- Le front mobile communique avec le backend via les URLs définies dans les hooks et services.
- Pour toute modification des types partagés, voir [`qlash-shared`](../qlash-shared/).

---

Pour plus de détails, consulte les fichiers sources dans