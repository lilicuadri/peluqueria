const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Schema = schema({

    IdEmpresa: String
    ,Identificacion: String
    ,DigitoVerificacion: String
    ,Nombre: String
    ,Direccion: String
    ,Telefono1: String
    ,Celular: String
    ,Correo: String
    ,IdPais : String
    ,Pais : String
    ,IdMunicipio : String
    ,Municipio: Object
    , Activo: Boolean
    , Horarios: String

});

const peluqueria = mongoose.model('peluquerias', Schema);
module.exports = peluqueria;