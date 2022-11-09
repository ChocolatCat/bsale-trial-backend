const express = require('express');
const router = express.Router();
const db = require('../db');

//Obtener lista de categorias
router.get('/', function(req, res){
    let sql = `SELECT * FROM category`;
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
            message: 'Obtenidas categorias'
        })
    })
});

//exportamos las rutas
module.exports = router;