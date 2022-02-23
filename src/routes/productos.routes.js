// IMPORTACIONES
const express = require('express');
const productosControlador = require('../controllers/productos.controller');

// RUTAS
const api = express.Router();

api.get('/productos', productosControlador.ObtenerProductos);
api.post('/agregarProductos', productosControlador.AgregarProductos);
api.put('/editarProducto/:idProducto', productosControlador.EditarProductos);
api.delete('/eliminarProducto/:idProducto', productosControlador.EliminarProductos);
api.put('/agregarProveedor/:idProducto', productosControlador.agregarProveedorAproducto);
api.get('/obtenerProductoXProveedor/:idProveedor', productosControlador.obtenerProductoXProveedor)
api.get('/obtenerNombreProveedorXProducto/:idProducto', productosControlador.obtenerNombreProveedorXProducto)

module.exports = api;