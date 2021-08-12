# Projet n°7
## Créez un réseau social pour le groupe Groupomania


### Technologies utilisées
* Back
    * NodeJS
    * Express
    * mySql
* Front
    * React 
    * Sass


### Serveur de développement local
Pour lancer le serveur de développement

* Back:

Nécessite de créer un fichier .env dans backend/ et d'y saisir 
    
    PORT=4000
    DB_HOST=localhost
    DB_USER=username du serveur SQL
    DB_PASS=password du serveur SQL
    DB_DATABASE=groupomania
    SECRET_KEY='VOTRE_TOKEN_SECRET'
    
Puis lancer la commande suivante :
     
    cd backend
    npm install
    nodemon server

* Front:

Nécessite de créer un fichier .env dans frontend/ :

    REACT_APP_URL=http://localhost:4000


Puis lancer la commande suivante :
    
    cd frontend
    npm install
    npm start

Par défaut le serveur client est accessible en local via le port 3000: http://localhost:3000/

### Base de données  

La structure de la base de données sont accessible via :
    
    DB/groupomania_db.sql

Nécessite de créer un fichier .env dans "backend/" :

    DB_HOST=localhost
    DB_USER=username du serveur SQL
    DB_PASS=password du serveur SQL
    DB_DATABASE=groupomania