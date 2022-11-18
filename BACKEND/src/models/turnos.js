const date = require('joi/lib/types/date');
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const rolSchema = schema({
    Codigo_Turno: String,
    Nombre_Servicio: String,
    Precio: String,
    Codigo_Servicio : String,
    Fecha: Date,
    Hora: String, 



});

const rol = mongoose.model('turnos', rolSchema);
module.exports = rol;