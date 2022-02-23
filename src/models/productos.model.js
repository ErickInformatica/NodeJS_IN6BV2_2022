const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductosSchema = Schema({
    nombre: String,
    proveedor: [{
        nombreProveedor: String,
        direccion: String
    }],
    sabores: []
})

module.exports = mongoose.model('Productos', ProductosSchema)