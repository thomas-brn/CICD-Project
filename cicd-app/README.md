# CI/CD

## Description

## Prérequis

Node.js (version 14 ou supérieure)  
PNPM (gestionnaire de paquets)  
Docker  
Prisma CLI

## Installation

### 1. Clonez ce dépôt sur votre machine locale :

```bash
https://github.com/thomasbroine/CICD-Project.git
```

### 2. Lancer un conteneur Postgres en local

```bash
 docker run --name cicd-project-postgres -e POSTGRES_DB=cicd-project -e POSTGRES_USER=cicd -e POSTGRES_PASSWORD=cicd -p 5432:5432 -d postgres
```

### 3. Renseigner le fichier de variables d'environnements .env

```bash
cd cicd-app
```

A l'aide du fichier .env.template, créer le fichier .env et renseigner les variables d'environnement.

### 4. Installer les dépendances

```bash
pnpm install
```

### 5. Générer les modèles Prisma

```bash
 npx prisma generate
```

### 6. Créer et appliquer les migrations

```bash
 npx prisma migrate dev
```

### 7. Lancer l'application

```bash
 pnpm run start:dev
```

## Utilisation

Après avoir démarré l'application, elle sera disponible à l'adresse http://localhost:3000.
Vous pouvez tester les différentes fonctionnalités via cette interface ou en utilisant un outil comme Apidog pour interagir avec l'API.

## Commandes utiles

### Lancer les tests :

Vérifier que le containeur Postgres est lancé et que les crédentials sont bien renseignés dans le .env :

```bash
docker ps
```

Écrivez un workflow GitHub Actions ci pour qu'un linter soit exécuté à chaque push.

```bash
cd cicd-app
pnpm run test
```

### Construire l'application pour la production :

```bash
pnpm run build
```

### Démarrer l'application en mode production :

```bash
pnpm run start
```

## Structure du projet

Une description rapide des principaux dossiers et fichiers du projet :

src/: Contient le code source de l'application.  
prisma/: Contient le fichier schema.prisma et les migrations de la base de données.  
Dockerfile: Définition de l'image Docker pour le projet.  
docker-compose.yml: Configuration pour démarrer les services requis avec Docker Compose (si applicable).

```
.
├── cicd-app
│   ├── dist
│   │   └── ...
│   ├── Dockerfile
│   ├── nest-cli.json
│   ├── node_modules
│   │   └── ...
│   ├── package.json
│   ├── pnpm-lock.yaml
│   ├── prisma
│   │   ├── migrations
│   │   │   ├── 20240529115631_dev
│   │   │   │   └── migration.sql
│   │   │   └── migration_lock.toml
│   │   └── schema.prisma
│   ├── README.md
│   ├── src
│   │   ├── app.controller.spec.ts
│   │   ├── app.controller.ts
│   │   ├── app.module.ts
│   │   ├── city
│   │   │   ├── city.controller.spec.ts
│   │   │   ├── city.controller.ts
│   │   │   ├── city.module.ts
│   │   │   ├── city.service.spec.ts
│   │   │   ├── city.service.ts
│   │   │   └── dto
│   │   │       ├── create-city.dto.ts
│   │   │       └── update-city.dto.ts
│   │   ├── main.ts
│   │   └── utils
│   │       └── prisma.service.ts
│   ├── test
│   │   ├── app.e2e-spec.ts
│   │   └── jest-e2e.json
│   ├── tsconfig.build.json
│   └── tsconfig.json
├── cicd.md
├── cities.json
├── compose.env
├── compose.env.example
└── docker-compose.yaml
```
