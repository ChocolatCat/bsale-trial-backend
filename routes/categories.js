const express = require('express');
const router = express.Router();
const db = require('../db');

//Obtener lista de categorias
router.get('/', function(req, res){
    let sql = `SELECT * FROM category`;
    db.query(sql, function(err, data, fields){
        if(err){
            res.sendStatus(500);
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