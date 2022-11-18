const mongoose = require('mongoose');
const schema = mongoose.Schema;

const barriosSchema = schema({
    codigo: String,
    nombre: String,
    lat: String,
    lon: String,
    idMunicipio: String,
    idCorregimiento: String,
    idPais: String,
    idLocalidad: String
});

const barrios = mongoose.model('barrios', barriosSchema);

module.exports = barrios;