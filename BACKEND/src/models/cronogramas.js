const date = require('joi/lib/types/date');
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const rolSchema = schema({
    IdServicio: { type: schema.Types.ObjectId, ref: 'servicios' },
    ArrayHorarios: Array, 
    Empresa: String

});

const rol = mongoose.model('cronogramas', rolSchema);
module.exports = rol;