const Productos = require('../models/productos.model');
const mongoose = require('mongoose');

// OBTENER PRODUCTOS
function ObtenerProductos (req, res) {
    Productos.find({}, (err, productosEncontrados) => {

        return res.send({ productos: productosEncontrados })
    })
}

// AGREGAR PRODUCTOS
function AgregarProductos (req, res) {
    var parametros = req.body;
    var modeloProductos = new Productos();
    
    if( parametros.nombre ){
        modeloProductos.nombre = parametros.nombre;
        modeloProductos.sabores = [];

        modeloProductos.save((err, productoGuardado)=>{

            return res.send({ productos: productoGuardado});
        });
    } else {
        return res.send({ mensaje: "Debe enviar los parametros obligatorios."})
    }


}

function EditarProductos(req, res) {
    var idProd = req.params.idProducto;
    var parametros = req.body;

    Productos.findByIdAndUpdate(idProd, parametros, { new : true } ,(err, productoEditado)=>{
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!productoEditado) return res.status(404)
            .send({ mensaje: 'Error al Editar el Producto' });

        return res.status(200).send({ productos: productoEditado});
    })
}

function EliminarProductos(req, res) {
    var idProd = req.params.idProducto;

    Productos.findByIdAndDelete(idProd, (err, productoEliminado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!productoEliminado) return res.status(500)
            .send({ mensaje: 'Error al eliminar el producto' })

        return res.status(200).send({ producto: productoEliminado });
    })
}

function agregarProveedorAproducto(req, res) {
    var productoId = req.params.idProducto;
    var parametros = req.body;

    if( parametros.nombreProveedor && parametros.direccion ) {

        Productos.findByIdAndUpdate(productoId, { $push: { proveedor: { nombreProveedor: parametros.nombreProveedor, 
            direccion: parametros.direccion } } }, {new: true}, (err, proveedorAgregado)=>{
                if(err) return res.status(500).send({ mensaje: 'Error en  la peticion'});
                if(!proveedorAgregado) return res.status(500).send({ mensaje: 'Error al agregar el proveedor en productos'});

                return res.status(200).send({ producto: proveedorAgregado })

            })

    } else {
        return res.status(500).send({ mensaje: 'Debe enviar los parametros necesarios.' })
    }

}

function obtenerProductoXProveedor(req, res) {
    var proveedorId = req.params.idProveedor;

    Productos.find({ proveedor: { $elemMatch: { _id: proveedorId } } }, (err, productoEncontrados) => {
        if (err) return res.status(500).send({ mensaje: 'Error en  la peticion'});
        if(!productoEncontrados) return res.status(500).send({ mensaje: 'Error al buscar el producto por proveedor'})

        return res.status(200).send({ producto: productoEncontrados})
    })
}

function obtenerNombreProveedorXProducto(req, res) {
    var productoId = req.params.idProducto;
    var parametros = req.body;

    Productos.aggregate([
        {
            $match: { "_id": mongoose.Types.ObjectId(productoId) }
        },
        {
            $unwind: "$proveedor"
        },
        {
            $match: { "proveedor.direccion": { $regex: parametros.direccion, $options: 'i' } }
        }, 
        {
            $group: {
                "_id": "$_id",
                "nombre": { "$first": "$nombre" },
                "proveedor": { $push: "$proveedor" }
            }
        }
    ]).exec((err, proveedoresEncontrados) => {
        return res.status(200).send({ producto: proveedoresEncontrados })
    })
}


module.exports = {
    ObtenerProductos,
    AgregarProductos,
    EditarProductos,
    EliminarProductos,
    agregarProveedorAproducto,
    obtenerProductoXProveedor,
    obtenerNombreProveedorXProducto
}