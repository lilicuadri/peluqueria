const listar = require('./listar');
const buscar = require('./buscar');
const insertar = require('./insertar');
const actualizar = require('./actualizar');
const eliminar = require('./eliminar');
const validarIngreso = require('./validarIngreso');
const listarPorIdentificacion = require('./listarPorIdentificacion');
const guardar = require('./guardar');
const consultar = require('./consultar');

module.exports = {
  listar,
  buscar,
  insertar,
  actualizar,
  eliminar,
  validarIngreso,
  listarPorIdentificacion,
  guardar,
  consultar
}
