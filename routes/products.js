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

//Obtener producto especifico
router.get('/:id', function(req, res){
    let sql = `SELECT id, name, price, discount, category,
    IFNULL(url_image, '') url_image FROM product WHERE id = ? ORDER BY category`;
    db.query(sql, [req.params.id], function(err, data, fields){
        if(err){
            throw err;
        }
        res.json({
            status: 200,
            data,
            message: 'Obtenido producto'
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
            message: 'Obtenidos productos filtrados'
        })
    })
});

//exportamos las rutas
module.exports = router;