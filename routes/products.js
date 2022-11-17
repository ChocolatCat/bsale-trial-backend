const express = require('express');
const router = express.Router();
//Importamos nuestra conexion a la BD
const db = require('../db');

//Obtener lista de productos y/o paginados
router.get('/', function(req, res){
    //Si recibimos un query con ?page=, procesamos paginación. Le da un doble uso a la ruta
    let page = req.query.page  || 0;
    //Recuperamos los datos de la tabla que nos interesan
    let sql = `SELECT id, name, price, discount, category,
    IFNULL(url_image, '') url_image
    FROM product ORDER BY category`;
    
    //Obtenemos el total para enviarlo y asi poder paginar
    let count = 0;
    db.query(sql, function(err, data, fields){
        //Manejo de errores
        if(err){
            res.sendStatus(500);
        }
        //Obtenemos la cantidad de datos que trabajaremos. Esto se usara en la paginacion
        count = data.length;
        //Si usaremos paginación, agregamos un LIMIT a la consulta para recibir solo 9 resultados a la vez. El page-1*9 nos da el offset de datos para trabajar
        sql += ` LIMIT ?, 9`;
        let pagination = (page-1) * 9;
        db.query(sql, [pagination > 0 ? pagination : 0], function(err, data, fields){
            //Control de errores
            if(err){
                res.sendStatus(500);
            }
            //Devolvemos un json con el status de la conexion, los datos, el numero de datos total y un mensaje del proceso
            res.json({
                status: 200,
                data,
                count,
                message: pagination > 0 ? 'Obtenidos productos paginados' : 'Obtenidos productos'
            });
        });
    });
});

//Obtener busqueda
router.get('/search', function(req, res){
    //Si la busqueda no tiene texto, devolvemos todos los productos
    let search = req.query.name || '';
    //Para paginación
    let page = req.query.page || 0;
    //Operador discrimina si tenemos texto que buscar o no, para agregar el LIKE a la consulta
    let sql = search == '' ? `SELECT id, name, price, discount, category,
        IFNULL(url_image, '') url_image
    FROM product ORDER BY category` : 
    `SELECT id, name, price, discount, category,
    IFNULL(url_image, '') url_image
    FROM product 
    WHERE name LIKE ?
    ORDER BY category`;
    //Obtenemos el total para enviarlo
    let count = 0;
    db.query(sql, [`%${search}%`], function(err, data, fields){
        //Manejo de errores
        if(err){
            res.sendStatus(500);
        }
        //Total de datos
        count = data.length;
        sql += ` LIMIT ?, 9`;
        let pagination = (page-1) * 9;
        db.query(sql, [`%${search}%`, pagination > 0 ? pagination : 0], function(err, data, fields){
            if(err){
                res.sendStatus(500);
            }
            //Recibimos los datos, el total de ellos y un mensaje de aceptacion
            res.json({
                status: 200,
                data,
                count,
                message: 'Obtenidos productos filtrados por nombre'
            })
        })
    });
});

//Obtener lista de productos de una sola categoria
router.get('/filter/:id', function(req, res){
    //Revisamos si es que usaremos paginacion
    let page = req.query.page || 0;
    //Buscamos la categoria en especifico. Ofuscamos el dato
    let sql = `SELECT id, name, price, discount, category,
    IFNULL(url_image, '') url_image FROM product WHERE category = ? ORDER BY category`;
    //Obtenemos el total para enviarlo
    let count = 0;
    //Aca recibimos el dato ofuscado
    db.query(sql, [req.params.id], function(err, data, fields){
        if(err){
            res.sendStatus(500);
        }
        //Total de datos
        count = data.length;
        //Usaremos paginacion o no
        sql += ` LIMIT ?, 9`;
        let pagination = (page-1) * 9;
        db.query(sql, [req.params.id, pagination > 0 ? pagination : 0], function(err, data, fields){
            //Errores
            if(err){
                res.sendStatus(500);
            }
            //Devolvemos los datos, numero y mensaje de aceptacion
            res.json({
                status: 200,
                data,
                count,
                message: 'Obtenidos productos filtrados por categoria seleccionada'
            })
        })
    });
});

//exportamos las rutas
module.exports = router;