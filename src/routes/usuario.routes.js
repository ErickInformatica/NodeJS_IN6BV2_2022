const express = require('express');
const controladorUsuario = require('../controllers/usuario.controller');

const api = express.Router();

api.post('/registrar', controladorUsuario.Registrar);
api.post('/login', controladorUsuario.Login);
api.get('/buscarNombre/:nombreUsuario', controladorUsuario.BusquedaNombre)
api.get('/buscarNombreRegex/:nombreUsuario', controladorUsuario.BusquedaNombreRegex)
api.get('/buscarNombreRegexBody', controladorUsuario.BusquedaNombreRegexBody);
api.get('/buscarNombreOApellido', controladorUsuario.BusquedaNombreOApellido)
api.get('/buscarNombreYApellido', controladorUsuario.BusquedaNombreYApellido)

module.exports = api;