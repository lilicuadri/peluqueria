const { Number } = require('mongoose');
const mongoose = require('mongoose');
const schema = mongoose.Schema;


const divisionesSchema = schema({
    codigo: String,
    nombre: String,
    porcentaje: String,
    calendario: String,
    departamento: String,
    centrotrabajo: String,
    observaciones: String,
    IdEmpresa:  { type: schema.Types.ObjectId, ref: 'empresas' }
});

const divisiones = mongoose.model('divisiones', divisionesSchema)

module.exports = divisiones;
