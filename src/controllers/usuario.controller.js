const Usuario = require('../models/usuario.model');
const bcrypt = require('bcrypt-nodejs');

function Registrar(req, res) {
    var parametros = req.body;
    var modeloUsuario = new Usuario();

    if(parametros.nombre && parametros.apellido && parametros.email
        && parametros.password) {
            Usuario.find({ email : parametros.email }, (err, usuarioEncontrados) => {
                if ( usuarioEncontrados.length > 0 ){ 
                    return res.status(500)
                        .send({ mensaje: "Este correo ya se encuentra utilizado" })
                } else {
                    modeloUsuario.nombre = parametros.nombre;
                    modeloUsuario.apellido = parametros.apellido;
                    modeloUsuario.email = parametros.email;
                    modeloUsuario.rol = 'USUARIO';
                    modeloUsuario.imagen = null;

                    bcrypt.hash(parametros.password, null, null, (err, passwordEncriptada) => {
                        modeloUsuario.password = passwordEncriptada;

                        modeloUsuario.save((err, usuarioGuardado)=>{
                            if(err) return res.status(500)
                                .send({ mensaje : 'Error en la peticion' })
                            if(!usuarioGuardado) return res.status(500)
                                .send({ mensaje: 'Error al guardar el Usuario' })
    
                            return res.status(200).send({ usuario: usuarioGuardado})
                        })
                    })                    
                }
            })
    } else {
        return res.status(404)
            .send({ mensaje : 'Debe ingresar los parametros obligatorios'})
    }

}

function Login(req, res) {
    var parametros = req.body;
    // BUSCAMOS EL CORREO
    Usuario.findOne({ email : parametros.email }, (err, usuarioEncontrado) => {
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion'});
        if (usuarioEncontrado){
            // COMPARAMOS CONTRASENA SIN ENCRIPTAR CON LA ENCRIPTADA
            bcrypt.compare(parametros.password, usuarioEncontrado.password, 
                (err, verificacionPassword) => {//TRUE OR FALSE
                    if (verificacionPassword) {
                        return res.status(200)
                            .send({ mensaje: 'Usuario Logeado Correctamente'})
                    } else {
                        return res.status(500)
                            .send({ mensaje: 'La contrasena no coincide.'})
                    }
                })
        } else {
            return res.status(500)
                .send({ mensaje: 'El usuario, no se ha podido identificar'})
        }
    })
}

function BusquedaNombre(req, res) {
    var nomUser = req.params.nombreUsuario;

    Usuario.find({ nombre: nomUser }, (err, usuariosEncontrados) => {
        if(err) return res.status(500).send({ mensaje: 'Error en  la peticion'});
        if(!usuariosEncontrados) return res.status(500)
            .send({ mensaje: 'Error al obtener los usuarios'})

        return res.status(200).send({ usuarios: usuariosEncontrados })
    })
}

function BusquedaNombreRegex(req, res) {
    var nomUser = req.params.nombreUsuario;

    Usuario.find({ nombre: { $regex: nomUser, $options: "i" } }, (err, usuariosEncontrados) => {
        if(err) return res.status(500).send({ mensaje: 'Error en  la peticion'});
        if(!usuariosEncontrados) return res.status(500)
            .send({ mensaje: 'Error al obtener los usuarios'})

        return res.status(200).send({ usuarios: usuariosEncontrados })
    })
}

function BusquedaNombreRegexBody(req, res) {
    var parametros = req.body;

    Usuario.find({ nombre: { $regex: parametros.nombre, $options: "i" } }, (err, usuariosEncontrados) => {
        if(err) return res.status(500).send({ mensaje: 'Error en  la peticion'});
        if(!usuariosEncontrados) return res.status(500)
            .send({ mensaje: 'Error al obtener los usuarios'})

        return res.status(200).send({ usuarios: usuariosEncontrados })
    })
}

function BusquedaNombreOApellido(req, res) {
    var parametros = req.body;

    Usuario.find({ $or: [
        { nombre: { $regex: parametros.nombre, $options: "i" } },
        { apellido: { $regex: parametros.apellido, $options: "i" } }
    ] }, (err, usuariosEncontrados) => {
        if(err) return res.status(500).send({ mensaje: 'Error en  la peticion'});
        if(!usuariosEncontrados) return res.status(500)
            .send({ mensaje: 'Error al obtener los usuarios'})

        return res.status(200).send({ usuarios: usuariosEncontrados })
    })
}

function BusquedaNombreYApellido(req, res) {
    var parametros = req.body;

    Usuario.find({ nombre: parametros.nombre, apellido: parametros.apellido }, 
        { nombre: 1 }, (err, usuariosEncontrados) => {
            if(err) return res.status(500).send({ mensaje: 'Error en  la peticion'});
            if(!usuariosEncontrados) return res.status(500)
                .send({ mensaje: 'Error al obtener los usuarios'})

            return res.status(200).send({ usuarios: usuariosEncontrados })
    })
}

module.exports = {
    Registrar,
    Login,
    BusquedaNombre,
    BusquedaNombreRegex,
    BusquedaNombreRegexBody,
    BusquedaNombreOApellido,
    BusquedaNombreYApellido
}