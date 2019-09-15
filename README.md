# Cupitips
Una pagina web que contiene tips para las personas que estan comenzando a aprender a programar en Pyhton.
# Link a la página del proyecto   
https://nameless-everglades-03120.herokuapp.com/
# Tecnologias usadas
* HTML
* CSS
* JavaScript
* Bootstrap
* eslint
* React
* Node.js
* MongoDB
* Express
* Trinket

# Despliegue

## Requisitos 
- **Node JS**
- **Yarn**

## Pasos

1. yarn install en el back

```
yarn install
```

2. yarn start en el back
```
yarn start
```

3. yarn instal en el front
```
cd front
yarn install
```

4. yarn start en el front
```
yarn start
```
*Obs. la conexion a la base de datos esta con una variable de entorno. Para configurarla siga el ejemplo correspondiente a seguir:
### Windows
SET MONGOLAB_URI=mongodb://{username}:{password}@cluster0-shard-00-00-2gfpv.mongodb.net:27017,cluster0-shard-00-01-2gfpv.mongodb.net:27017,cluster0-shard-00-02-2gfpv.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority
### Mac
export MONGOLAB_URI="mongodb://{username}:{password}@cluster0-shard-00-00-2gfpv.mongodb.net:27017,cluster0-shard-00-01-2gfpv.mongodb.net:27017,cluster0-shard-00-02-2gfpv.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority”
### Heroku
heroku config:set MONGOLAB_URI=“mongodb://{username}:{password}@cluster0-shard-00-00-2gfpv.mongodb.net:27017,cluster0-shard-00-01-2gfpv.mongodb.net:27017,cluster0-shard-00-02-2gfpv.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority”

# Requerimientos como desarrollador
El proyecto tiene una dependencia como desarrollador hacia [eslint](https://eslint.org), esta dependencia se encarga de revisar la sintaxis del codigo en JS bajo la reglas definidas en el archivo [.eslintrc.js](https://github.com/nacaceres/PaginaPersonalNicolasCaceres/blob/master/.eslintrc.js), en caso de querer validar la sintaxis de un archivo js del proyecto se deben seguir estos pasos:
```
cd PaginaPersonalNicolasCaceres
npm install
cd scripts
eslint canciones.js
```
# Autores
[Nicolás Cáceres Acosta](https://github.com/nacaceres)   
[Andrés Varón Maya](https://github.com/andresvaron)
