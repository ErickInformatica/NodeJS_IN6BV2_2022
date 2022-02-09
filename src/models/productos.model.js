const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductosSchema = Schema({
    nombre: String,
    proveedor: String,
    sabores: [],
    tamanios: [{
        peso: String,
        ancho: String,
        altura: String
    }]
})

module.exports = mongoose.model('Productos', ProductosSchema)