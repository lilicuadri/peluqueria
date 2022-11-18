const mongoose = require('mongoose');
const schema = mongoose.Schema;

const rolSchema = schema({
 	Codigo: String,
	Nombre: String,
	Permisos: Array,
    Nit_Peluqueria: String,
});

const rol = mongoose.model('roles', rolSchema);
module.exports = rol;