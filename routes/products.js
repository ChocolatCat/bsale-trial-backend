const express = require('express');
const router = express.Router();
const db = require('../db');

//Obtener lista de productos
router.get('/', function(req, res){
    let sql = `SELECT id, name, price, discount, category,
        IFNULL(url_image, '') url_image
    FROM product ORDER BY category`;
    db.query(sql, function(err, data, fields){
        if(err){
            console.log(err);
        }
        res.json({
            status: 200,
            data,
            message: 'Obtenidos productos'
        })
    })
});

//Obtener busqueda
router.get('/search', function(req, res){
    let search = req.query.name || '';
    let sql = search == '' ? `SELECT id, name, price, discount, category,
        IFNULL(url_image, '') url_image
    FROM product ORDER BY category` : 
    `SELECT id, name, price, discount, category,
    IFNULL(url_image, '') url_image
    FROM product 
    WHERE name LIKE %?%
    ORDER BY category`;
    db.query(sql, [search], function(err, data, fields){
        if(err){
            console.log(err);
        }
        res.json({
            status: 200,
            data,
            message: 'Obtenidos productos filtrados por nombre'
        })
    })
});

//Obtener lista de productos de una sola categoria
router.get('/filter/:id', function(req, res){
    let sql = `SELECT id, name, price, discount, category,
    IFNULL(url_image, '') url_image FROM product WHERE category = ? ORDER BY category`;
    db.query(sql, [req.params.id], function(err, data, fields){
        if(err){
            throw err;
        }
        res.json({
            status: 200,
            data,
            message: 'Obtenidos productos filtrados por categoria seleccionada'
        })
    })
});

//exportamos las rutas
module.exports = router;