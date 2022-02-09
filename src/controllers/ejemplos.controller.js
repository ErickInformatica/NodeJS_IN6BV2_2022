
function ejemplo (req, res) {
    res.send('Hola Mundo, estoy usando Express!!!');
}

function EjemploParametrosObligatorios (req, res) {
    var id = req.params.idKinal;
    res.send('Esta es una ruta para Kinalito y este es el valor del parametro en ruta:' + id);
}

function EjemploParametrosOpcionales (req, res) {
    var idOp = req.params.idOpcional;
    // idOp !== undefined
    if(idOp){
        res.send('Este es el valor del parametro en ruta OPCIONAL:' + idOp);
    } else {
        res.send('No hay ningun valor en la ruta.')
    }
}

module.exports = {
    ejemplo,
    EjemploParametrosOpcionales,
    EjemploParametrosObligatorios
}
