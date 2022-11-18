const mongoose = require('mongoose');
const schema = mongoose.Schema;

const usuarioSchema = schema({
    IdUsuario: String,
    Telefono: String,
    Celular: String,
    Estado: Boolean,
	Rol: { type: schema.Types.ObjectId, ref: 'roles' },
    Usuario: String,
    Contraseña: String,
    Nombre: String,
    Apellido: String,
    Nit_Peluqueria: String
	
});

const usuarios = mongoose.model('usuarios', usuarioSchema);
module.exports = usuarios;