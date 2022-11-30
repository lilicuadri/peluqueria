const date = require('joi/lib/types/date');
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const rolSchema = schema({
    Codigo_Servicio: String,
    Nombre_Servicio: String,
    Precio: String,
    Codigo: String,
    Fecha: Date,
    Hora: String,  
});

const rol = mongoose.model('cronogramas', rolSchema);
module.exports = rol;