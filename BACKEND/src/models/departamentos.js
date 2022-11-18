const { Number } = require('mongoose');
const mongoose = require('mongoose');
const schema = mongoose.Schema;


const departamentosSchema = schema({
    codigo: String,
    nombre: String,
    observaciones: String,
    IdEmpresa:  { type: schema.Types.ObjectId, ref: 'empresas' }
});

const departamentos = mongoose.model('departamentos', departamentosSchema)

module.exports = departamentos;
