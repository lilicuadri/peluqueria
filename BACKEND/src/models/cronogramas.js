const date = require('joi/lib/types/date');
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const rolSchema = schema({
    IdServicio: String,
    ArrayHorarios: Array, 
});

const rol = mongoose.model('cronogramas', rolSchema);
module.exports = rol;