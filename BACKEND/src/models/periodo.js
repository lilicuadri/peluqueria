const mongoose = require('mongoose');
const schema = mongoose.Schema;

const periodoSchema = schema({
	Periodo: String,
	Codigo: String,
	Estado: Boolean,
    Descripcion: String,	
	IdEmpresa: { type: schema.Types.ObjectId, ref: 'empresas'}
});

const periodo = mongoose.model('periodo', periodoSchema);
module.exports = periodo;