# bsale-trial-backend
## Tecnologias usadas
* ExpressJS
* MySQL
* [Railway](https://railway.app/)
### Modulos de Node usados
* Express
* MySQL
* CORS
* BodyParser

# Productos
Listar productos, obtener producto y filtrar por categoria
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
  }],
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
## Rutas
### `GET /api/productos`
No recibe parametros.
Entrega la lista completa de productos en la base de datos.
### Respuesta
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
  "message": "Obtenidos productos"
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
  "message": "Obtenidos productos filtrados"
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
