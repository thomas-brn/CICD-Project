# CI/CD

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

### 2. Configurer le fichier de variables d'environnements

Créer le fichier `compose.env` et configurer les variables à partir du template `compose.env.example`.
**Attention**: Si vous changez la variable `CITY_API_PORT` veillez à modifier le port exposé depuis le fichier `docker-compose.yaml`.

### 3. Démarrer l'application

Exécuter le fichier `docker-compose.yaml` pour lancer le projet en local.
```bash
docker compose up -d
```

## Utilisation

Après avoir démarré l'application, elle sera disponible à l'adresse que vous avez spécifié dans votre fichier `compose.env` http://CITY_API_ADDR:CITY_API_PORT (ex: http://localhost:3000).
Vous pouvez tester les différentes fonctionnalités via cette interface ou en utilisant un outil comme Apidog pour interagir avec l'API.

## Tests automatiques

### 1. Lancer un conteneur Postgres en local

```bash
docker run --name cicd-project-postgres -e POSTGRES_DB=cicd-project -e POSTGRES_USER=cicd -e POSTGRES_PASSWORD=cicd -p 5432:5432 -d postgres
```

### 2. Renseigner le fichier de variables d'environnements .env

```bash
cd cicd-app
```

A l'aide du fichier `.env.example`, créer le fichier `.env` et renseigner les variables d'environnement.

### 3. Installer les dépendances

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

### 7. Lancer les tests

```bash
 pnpm run test
```

## Utilisation

Après avoir démarré l'application, elle sera disponible à l'adresse http://localhost:3000.
Vous pouvez tester les différentes fonctionnalités via cette interface ou en utilisant un outil comme Apidog pour interagir avec l'API.

`POST /city` pour créer une ville, dans la base de données, donnée le body la ville au format JSON comportant les données ci-dessous: 
```
id, un entier non signé non nul, clé primaire de la colonne ;
department_code, une chaîne de caractères non nulle ;
insee_code, une chaîne de caractères ;  
zip_code, une chaîne de caractères ;  
name, une chaîne de caractères non nulle ;  
lat, un flottant non nul ;  
lon, un flottant non nul.  
```
`GET /city` pour voir la liste des villes au format JSON  
`GET /_health` doit retourner un code 204


## Commandes utiles

### Construire l'application pour la production :

```bash
pnpm run build
```

### Démarrer l'application en mode production :

```bash
pnpm run start
```
## Déploiement 

### Prérequis
- Avoir un cluster Kubernetes disponible 
- Avoir helm et kubectl installé

## Etapes

- Installer Postgres dans le cluster

```bash
cd cicd-app/charts
helm install postgres oci://registry-1.docker.io/bitnamicharts/postgresql -f values.postgres.yaml
 ```
- Insérer les données dans la Postgres

```bash
kubectl port-forward service/postgres-postgresql 5432

cd <project-root>

DATABASE_URL="postgresql://cicd:cicd@localhost:5432/cicd-project" node ./script.js

```

- Déployer l'application
```bash
cd cicd-app/charts
helm install <chart_name> .
```

- Vérification
```bash
kubectl port-forward <chart_name>-cicd-app 3000
```
Le site est sur `http://localhost:3000`
