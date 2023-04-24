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
    Usuario: String,  
    IdUsuario: String,  
    Identificacion: String,
    IdEmpresa: { type: schema.Types.ObjectId, ref: 'empresas' },
    Estado: String
});

const rol = mongoose.model('turnos', rolSchema);
module.exports = rol;