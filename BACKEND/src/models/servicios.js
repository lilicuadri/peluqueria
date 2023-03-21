const mongoose = require("mongoose");
const schema = mongoose.Schema;

const rolSchema = schema({
  Codigo: String,
  Nombre: String,
  Precio: String,
  detalle_servicio: String,
  tipo_Servicio: String,
  imagen: String,
  genero: String,
  duracion: Number,
  Empresa: String,
  Nit_Peluqueria: String,
});

const rol = mongoose.model("servicios", rolSchema);
module.exports = rol;
