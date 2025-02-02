# API CRUD COLLECTION

Ce projet est une api CRUD de base, avec une authentification token JWT.  
Pour comprendre le fonctionnement de l'API, référez vous dans les sections [Application](#application).  
Ajouter vos collections simplement, en suivant les étapes [Evolution du projet](#evolution-du-projet).

<br/>

## Sommaire
>1. [Application](#application)
>    1. [Structure du projet](#structure-du-projet)
>    2. [Installation](#installation)
>    3. [Démarrage](#démarrage)
>    4. [Routes](#routes)
>2. [DATABASE](#database)
>    1. [Commandes Prisma](#commandes-prisma)
>    2. [Commandes Prisma Studio](#commandes-prisma-studio)
>3. [Evolution du projet](#evolution-du-projet)
>    1. [Ajouter une collection](#ajouter-une-collection)
>    2. [Définir les modèles](#definir-les-modeles)
>       1. [Application-Driven](#application-driven)
>       2. [Database-Driven](#database-driven)
>       2. [Pour finir](#pour-finir)

<br/>
<br/>

# Application
## Structure du projet
```
my-node-api
├── .vscode                         # Dossier de configuration de Visual Studio Code 
│   └── settings.json               # Fichier de configuration de Visual Studio Code (Eslint, cSpell)
├── node_modules                    # Dossier contenant les dépendances du projet (ne pas modifié)
├── prisma                          # Dossier contenant les fichiers de configuration de Prisma
│   └── schema.prisma               # Fichier de configuration de Prisma
├── public                          # Dossier contenant les fichiers statiques
├── src
│   └── classes                     # Dossier contenant les fichiers de class utilitaires
│   │   ├── managers                # Dossier contenant les fichiers de class managers
│   │   │   └── user.manager.js     # Fichier de class manager pour la gestion des utilisateurs
│   │   ├── Error.js                # Fichier de class Error pour la gestion des erreurs
│   │   ├── Logger.js               # Fichier de class Logger pour la gestion des logsù
│   │   ├── Response.js             # Fichier de class Response pour la gestion des réponses
│   │   ├── Server.js               # Fichier de class Server pour la création du serveur
│   │   └── Validations.js          # Fichier de class Validations pour la gestion des validations
│   └── config                      # Dossier contenant les fichiers de configuration de l'application
│   │   ├── api.settings.js         # Fichier de configuration de l'application
│   │   ├── db.settings.js          # Fichier de configuration de la base de données
│   │   ├── http.settings.js        # Fichier de configuration des requêtes HTTP
│   │   └── message.settings.js     # Fichier des messages de l'application
│   └── controllers                 # Dossier contenant les fichiers de fonctions utilitaires
│   │   ├── auth.controller.js      # Controller de l'authentification (auth)
│   │   ├── base.controller.js      # Controller de base 
│   │   ├── controllers.js          # Liste des controllers
│   │   ├── logs.controller.js      # Controller des logs (logs)
│   │   └── template.controller.js  # Controller par défaut à utiliser pour les nouveaux controllers
│   └── middlewares                 # Dossier contenant les fichiers de middleware
│   │   └── IsAuthorizedToken.js    # Middleware de vérification du token
│   └── models                      # Dossier contenant les fichiers de modèles
│   └── routes                      # Dossier contenant les fichiers de fonctions utilitaires
│   │   └── router.js               # Fichier de base des routes
│   └── services                    # Dossier contenant les fichiers de services
│   │   └── prisma.instance.js      # Fichier d'instance de prisma
│   └── app.js          # Application API
├── .env                # Fichier contenant les variables d'environnement à définir
├── .gitignore          # Fichiers à ignorer par Git
├── env.template        # Template du fichier de configuration de l'environnement
├── eslint.config.mjs   # Fichier de configuration Eslint
├── index.js            # Point d'entrée de l'application
├── nodemon.json        # Fichier de configuration de nodemon
├── package_lock.json   # Fichier de configuration npm (ne pas modifié)
├── package.json        # Fichier de configuration npm

└── README.md           # Documentation du projet
```
## Installation
1. Clonez le dépôt.
2. Accédez au dossier du projet.
3. Exécutez `npm install` pour installer les dépendances.
## Démarrage
Pour démarrer l'application en `mode développement avec nodemon`, exécutez :
```
npm run dev
```
Pour démarrer l'application, exécutez :
```
npm run start
```
L'API sera disponible sur `http://localhost:3000`.
## Routes
```
[  {"method":"GET","path":"/"},  {"method":"POST","path":"/auth/signup"},  {"method":"POST","path":"/auth/login"},  {"method":"POST","path":"/auth/logout"},  {"method":"GET","path":"/auth/all"},  {"method":"POST","path":"/auth/add"},  {"method":"POST","path":"/auth/show"},  {"method":"PATCH","path":"/auth/edit"},  {"method":"DELETE","path":"/auth/delete/:id"},  {"method":"GET","path":"/auth/routes"},  {"method":"GET","path":"/logs/all"},  {"method":"POST","path":"/logs/add"},  {"method":"POST","path":"/logs/show"},  {"method":"PATCH","path":"/logs/edit"},  {"method":"DELETE","path":"/logs/delete/:id"},  {"method":"GET","path":"/logs/routes"}  ]
```

<br/>
<br/>

# DATABASE
## Commandes Prisma
`npx prisma init` : Initialise Prisma dans votre projet.  
`npx prisma migrate dev` : Applique les migrations à votre base de données de développement.  
`npx prisma migrate deploy` : Applique les migrations à votre base de données de production.  
`npx prisma generate` : Génère le client Prisma.  
`npx prisma studio` : Ouvre Prisma Studio pour visualiser et modifier les données de votre base de données.  
`npx prisma db push` : Pousse les modifications du schéma Prisma vers la base de données sans migration.  
`npx prisma db pull` : Récupère le schéma de la base de données et met à jour le fichier Prisma.  
## Commandes Prisma Studio
`npx prisma studio` : Ouvre Prisma Studio pour visualiser et modifier les données de votre base de données.  
`npx prisma studio --browser none` : Ouvre Prisma Studio sans ouvrir de navigateur.  
`npx prisma studio --port 4000` : Ouvre Prisma Studio sur le port 4000.  
`npx prisma studio --schema ./path/to/schema.prisma` : Ouvre Prisma Studio avec un schéma personnalisé.  
`npx prisma studio --help` : Affiche l'aide pour les commandes Prisma Studio.  
## Définir les modèles
Avant d'implémenter les méthodes de votre controller, vous devez définir les modèles de données de votre nouvelle collection.  
Pour cela, il y a deux solutions:
### Application-Driven
Vous devez définir les modèles de données de votre nouvelle collection dans le fichier prisma/schema.prisma.
[Documentation Prisma ORM | Configuration du Schéma Prisma ](https://laconsole.dev/formations/prisma/prisma-schema)
```
model Template {
  Id           Int       @id(map: "PK__DevLogs__3214EC0775BB07AB") @default(autoincrement())
  ... // autres champs
}
```
Solution 1 - Créez une migration pour mettre à jour la base de données avec les nouveaux modèles.
```
npx prisma migrate dev
```
Objectif: Cette commande génère et applique une nouvelle migration en fonction de vos changements de schéma PRISMA. Il crée des fichiers de migration qui gardent un historique de changements.

Cas d'utilisation: utilisez-le lorsque vous souhaitez maintenir un enregistrement des changements de base de données, ce qui est essentiel pour les environnements de production ou lorsque vous travaillez en équipes. Il permet le contrôle de version de votre schéma de base de données.

Avantages: Cette commande comprend également des vérifications pour l'application de migrations de manière contrôlée, en garantissant l'intégrité des données.

---
Solution 2 - Créez ou écrasez la base de données:
```
npx prisma db push
```
Objectif: Cette commande est utilisée pour pousser directement votre schéma PRISMA actuel vers la base de données. Il applique les modifications que vous avez apportées à votre schéma sans créer de fichiers de migration.

Cas d'utilisation: il est particulièrement utile pendant la phase de développement lorsque vous souhaitez synchroniser rapidement votre schéma de base de données avec votre schéma PRISMA sans vous soucier de l'historique de la migration.

ATTENTION: Il peut écraser les données si vos modifications de schéma affectent les tables ou les colonnes existantes, il est donc préférable pour le développement ou le prototypage à un stade précoce.
### Database-Driven
Créez votre table dans la base de données et ajoutez les colonnes que vous souhaitez utiliser.
Une fois votre base  de données prête, vous pouvez utiliser la commande suivante pour générer les modèles de données correspondants dans le fichier prisma/schema.prisma.
```
npx prisma db pull
```

Objectif: Cette commande récupère le schéma de la base de données et génère les modèles de données correspondants dans votre fichier prisma/schema.prisma.

Cas d'utilisation: il est utile lorsque vous avez une base de données existante et que vous souhaitez générer les modèles de données correspondants pour l'utiliser avec Prisma.

Avantages: Cette commande vous permet de générer les modèles de données à partir de la base de données existante, ce qui peut être pratique lorsque vous souhaitez utiliser Prisma pour interagir avec une base de données existante.

<br/>
<br/>

# Evolution du projet

## Ajouter une collection
- Commencer par créer un fichier controller pour la collection dans le dossier controllers et nommer le fichier avec le [nom de la collection].controller.js.
>```exemple: template.controller.js```.

Vous pouvez utiliser le fichier template.controller.js comme modèle.
```
  constructor() {
    super();
    // Changez le nom de la collection dans le constructeur
    this.name = 'template';
  }
  ```
- Ajouter le controller dans le fichier controllers.js.
```
const controllers = {
  auth: new AuthController(),
  logs:new LogsController(),
  template:new TemplateController(), // {template} le nom de la propriété doit correspondre au nom (this.name) du controller et sera utilisé pour l'url
};
```
### Pour finir
Si votre base de données et prête, [Définir les modèles](#definir-les-modeles)  
Il ne vous reste plus qu'à implémenter les méthodes de votre nouveau controller.
