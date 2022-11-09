const express = require('express');
const router = express.Router();
const db = require('../db');

//Obtener lista de productos y/o paginados
router.get('/', function(req, res){
    let page = req.query.page  || 0;
    let sql = `SELECT id, name, price, discount, category,
    IFNULL(url_image, '') url_image
    FROM product ORDER BY category`;
    //Obtenemos el total para enviarlo y asi poder paginar
    let count = 0;
    db.query(sql, function(err, data, fields){
        if(err){
            res.json({
                status: 500,
                message: `Ha sucedido un error: ${err}`
            });
        }
        count = data.length;
    });
    if(page > 0){
        sql += ` LIMIT ${(page-1) * 9}, 9`;
    }
    db.query(sql, function(err, data, fields){
        if(err){
            res.json({
                status: 500,
                message: `Ha sucedido un error: ${err}`
            });
        }
        res.json({
            status: 200,
            data,
            count,
            message: page > 0 ? 'Obtenidos productos paginados' : 'Obtenidos productos'
        });
    });
});

//Obtener busqueda
router.get('/search', function(req, res){
    let search = req.query.name || '';
    let page = req.query.page || 0;
    let sql = search == '' ? `SELECT id, name, price, discount, category,
        IFNULL(url_image, '') url_image
    FROM product ORDER BY category` : 
    `SELECT id, name, price, discount, category,
    IFNULL(url_image, '') url_image
    FROM product 
    WHERE name LIKE '%${search}%'
    ORDER BY category`;
    //Obtenemos el total para enviarlo
    let count = 0;
    db.query(sql, function(err, data, fields){
        if(err){
            res.json({
                status: 500,
                message: `Ha sucedido un error: ${err}`
            });
        }
        count = data.length;
    });
    if(page > 0){
        sql += ` LIMIT ${(page-1) * 9}, 9`;
    }
    db.query(sql, function(err, data, fields){
        if(err){
            res.json({
                status: 500,
                message: `Ha sucedido un error: ${err}`
            });
        }
        res.json({
            status: 200,
            data,
            count,
            message: 'Obtenidos productos filtrados por nombre'
        })
    })
});

//Obtener lista de productos de una sola categoria
router.get('/filter/:id', function(req, res){
    let page = req.query.page || 0;
    let sql = `SELECT id, name, price, discount, category,
    IFNULL(url_image, '') url_image FROM product WHERE category = ? ORDER BY category`;
    //Obtenemos el total para enviarlo
    let count = 0;
    db.query(sql, function(err, data, fields){
        if(err){
            res.json({
                status: 500,
                message: `Ha sucedido un error: ${err}`
            });
        }
        count = data.length;
    });
    if(page > 0){
        sql += ` LIMIT ${(page-1) * 9}, 9`;
    }
    db.query(sql, [req.params.id], function(err, data, fields){
        if(err){
            res.json({
                status: 500,
                message: `Ha sucedido un error: ${err}`
            });
        }
        res.json({
            status: 200,
            data,
            count,
            message: 'Obtenidos productos filtrados por categoria seleccionada'
        })
    })
});

//exportamos las rutas
module.exports = router;