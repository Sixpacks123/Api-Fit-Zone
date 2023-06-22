# API FitZone

## Description
Partage de programme de musculation
## Technologies utilisées
- Node.js
- Express.js
- MongoDB
- Mongoose
- bcrypt
- jsonwebtoken

## Installation
1. Clonez le dépôt Git ou téléchargez le code source de l'application.
2. Installez les dépendances en exécutant `yarn install`.
3. Configurez les variables d'environnement dans le fichier `.env` en utilisant le fichier `.env.example` comme modèle.
4. Démarrez l'application en exécutant `yarn start`.

## Variables d'environnement
- `MONGO_URI` : URL de la base de données MongoDB.
- `JWT_SECRET` : Clé secrète pour la génération des jetons JWT.
- `PORT` : Port sur lequel le serveur doit écouter (par défaut : 3000).

## Endpoints API
- `http://localhost:PORT/api-docs/` Liste de tout les endpoints
### Utilisateur
- `POST /api/user/signup` : Inscription d'un nouvel utilisateur.
- `POST /api/user/signin` : Connexion d'un utilisateur existant.


## Contributeurs
- Heurtault Aubin
