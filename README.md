# bsale-trial-backend
## Objetivo
El objetivo de este proyecto es consultar la base de datos de prueba de BSale para poder exhibir los productos que estan en ella. Para esto, se montó un backend hecho en Express.js, el cual sera consumido por el [Frontend](https://github.com/chocolatcat/bsale-trial-frontend)
## Tecnologias usadas
* ExpressJS
* MySQL
* [Railway](https://railway.app/)
### Modulos de Node usados
* Express
* MySQL
* CORS
* BodyParser
## Instalar Dependencias
Para instalar las dependencias del proyecto, ejecutar  
`npm install`
## Como Ejecutar
Utilizando alguna herramienta CLI, con Node y las dependencias instaladas.  
`npm server.js`
### Estructura del proyecto
La carpeta `routes` contiene las rutas y funciones encargadas de cada elemento, de acuerdo a su nombre.  
`categories` se encarga de manejar las rutas encargadas con las Categorías.  
`product` se encarga de manejar las rutas encargadas a los Productos.  
`db.js` contiene el driver de MySQL.  
`server.js` contiene el codigo para correr el servidor.
# Productos
Listar productos, obtener producto y filtrar por categoria  
Todas las rutas tienen soporte de paginación usando el querystring `page` y el numero
## Estructura JSON
Al realizar una petición, se devolver un JSON con la siguiente estructura  
```
{
  "status": 200,
  "data": [{
        "id": 1,
        "name": "Producto",
        "url_image": "url",
        "price": 2000,
        "discount": 10,
        "category": 1
  }, ...],
  "count": 57,
  "message": "Mensaje de la solicitud"
}
```  
**id**: int - ID del producto dentro de la BD  
**name**: string - Nombre del Producto  
**url_image**: string - URL de la imagen del producto  
**price**: float - Precio del Producto  
**discount**: int - Descuento del Producto  
**category**: int - ID de la Categoria del Producto.  
La API revisa si es que un producto no tiene URL, y si fuese asi, lo convierte a un string vacio `('')`. Esto tambien considera de que el campo fuese NULL.
**count**: int - Lo utilizamos para hacer seguimiento de cuantos resultados totales tiene la consulta en si. Se usa para paginar.  
## Rutas
### `GET /api/productos`
Entrega la lista completa de productos en la base de datos.  
### Respuesta
Sin parametro  
```
{
  "status": 200,
  "data": [{
    	"id": 1,
      "name": "Producto",
      "url_image": "url",
      "price": 2000,
      "discount": 10,
      "category": 1
  }, ...],
  "count": 57,
  "message": "Obtenidos productos"
}
```
### `GET /api/productos/search?name=text`
Recibe un parametro name donde señala la busqueda.
Entrega todos los productos que tengan un nombre similar.
### Respuesta
```
{
  "status": 200,
  "data": [{
    	"id": 6,
      "name": "Producto 6",
      "url_image": "url",
      "price": 6000,
      "discount": 60,
      "category": 6
  }, ...],
  "count": 5,
  "message": "Obtenidos productos filtrados por nombres"
}
```
### `GET /api/productos/filter/:id`
Recibe de parametro la ID de una categoria.  
Entrega la lista de productos que corresponden a la categoria.
### Ejemplo
`GET /api/productos/filter/4`
### Respuesta
```
{
  "status": 200,
  "data": [{
    	"id": 2,
      "name": "Producto 2",
      "url_image": "",
      "price": 5000,
      "discount": 0,
      "category": 4
  }, ...],
  "count": 10,
  "message": "Obtenidos productos filtrados por categoria seleccionada"
}
```
# Categorias
Listar categorias
## Estructura JSON
Al realizar una petición, se devolver un JSON con la siguiente estructura
```
{
  "status": 200,
  "data": [{
    	"id": 1,
        "name": "Energetica"
  }, ...],
  "message": "Mensaje de la solicitud"
}
```
**id**: int - ID de la categoria dentro de la BD  
**name**: string - Nombre de la categoria  
## Rutas
### `GET /api/categorias`
No recibe parametros  
Entrega la lista de categorias disponibles
### Respuesta
```
{
  "status": 200,
  "data": [{
    	"id": 1,
        "name": "Energetica"
  }, ...],
  "message": "Obtenidas categorias"
}
```
