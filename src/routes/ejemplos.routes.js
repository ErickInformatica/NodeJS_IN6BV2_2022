// IMPORTACIONES
const express = require('express');
const ejemplosController = require('../controllers/ejemplos.controller');

// RUTAS
const api = express.Router();
api.get('/', ejemplosController.ejemplo);
api.get('/kinal/:idKinal', ejemplosController.EjemploParametrosObligatorios);
api.get('/opcional/:idOpcional?', ejemplosController.EjemploParametrosOpcionales);

module.exports = api;