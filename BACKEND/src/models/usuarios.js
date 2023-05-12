const mongoose = require("mongoose");
const schema = mongoose.Schema;

const usuarioSchema = schema({
  IdUsuario: String,
  Clave: String,
  Estado: Boolean,
  Rol: { type: schema.Types.ObjectId, ref: "roles" },
  Login: String,
  Nombre: String,
  Empresa: String,
  Apellido: String,
  Celular: String,
});

const usuarios = mongoose.model("usuarios", usuarioSchema);
module.exports = usuarios;
