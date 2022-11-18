const mongoose = require('mongoose');
const schema = mongoose.Schema;

const rolSchema = schema({
 	Codigo_Servicio: String,
    Nombre_Servicio: String,
    Precio: String,
    detalle_servicio: String,
    Nit_Peluqueria: String
});

const rol = mongoose.model('servicios', rolSchema);
module.exports = rol;