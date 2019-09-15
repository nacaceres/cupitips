# Cupitips
Una pagina web que contiene tips para las personas que estan comenzando a aprender a programar en Pyhton.
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
El despliegue de la pagina es muy sencillo, ya que se basa en su mayoria en HTML estatico. Para desplegarla la pagina solo basta con deplegar cualquier servidor web, Ej:
```
cd PaginaPersonalNicolasCaceres
reload -b
```
# Requerimientos como desarrollador
El proyecto tiene una dependencia como desarrollador hacia [eslint](https://eslint.org), esta dependencia se encarga de revisar la sintaxis del codigo en JS bajo la reglas definidas en el archivo [.eslintrc.js](https://github.com/nacaceres/PaginaPersonalNicolasCaceres/blob/master/.eslintrc.js), en caso de querer validar la sintaxis de un archivo js del proyecto se deben seguir estos pasos:
```
cd PaginaPersonalNicolasCaceres
npm install
cd scripts
eslint canciones.js
```
