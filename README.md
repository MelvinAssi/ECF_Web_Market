# ECF_Web_Market


- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)

## Prérequis

- Installez Node.js v16+,npm et Git avant de commencer.

## Installation

- Clonez avec `git clone git@github.com:MelvinAssi/ECF_Web_Market.git`.
- Entrez dans `cd my-app-frontend`.
- Installez avec `npm install` dans `my-app-frontend`.
- Lancez avec `npm run dev` dans `my-app-frontend`.
- Ouvrez `http://localhost:5173/`.

- Entrez dans `my-backend-express`.
- Installez avec `npm install` dans `my-backend-express`.
- Lancez avec `npm start` dans `my-backend-express`.
- Ouvrez `http://localhost:3000/`.


## Tech Stack


- **Frontend** : React.js/vite TypeScript
- **Backend** : Node.js/Express.js
- **Base de données** :
  - PostgreSQL : 
  - Firebase :
- **Test** : Postman pour les API.
- **Déploiement** : Docker.
- **Outils** :
  - Figma : Design mockups.
  - Trello : Project management.
  - GitHub : Version control.
  - VSCode : Development environment.


  ## Project Structure

- `my-app-frontend/` :
  - `src/` : Code source (`components/`, `pages/`, `services/`).
  - `.prettierrc` : Config Prettier.
  - `eslint.config.js` : Config ESLint.
  - `vite.config.js` : Config Vite.
  - `package.json` : Dépendances.
  - `package-lock.json` : Versions exactes.
  - `public/` : Assets.
  - `index.html` : Entrée HTML.
- `my-backend-express/` :
  - `config/` : Configuration (ex. : `db.js` pour PostgreSQL).
  - `routes/` : API endpoints (`auth.js`, `user.js`).
  - `middleware/` : Authentification.
  - `sever.js` : Serveur principal.