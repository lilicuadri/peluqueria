const constants = require('../../constants');
const objModel = require('../../models/usuarios');
const mongo = require('mongodb');

const repo = {

  listar: async (idEmpresa) => {
    try {
      //find query
      let query = { "Empresa": idEmpresa };
      
      //find object
      let response = await objModel.find(query).sort('PrimerNombre');

      //set values
      let status, failure_code, failure_message;

      status = constants.SUCCEEDED_MESSAGE;

      //return response
      return {
        status: status,
        datos: response,
        failure_code: failure_code,
        failure_message: failure_message,
      };

    } catch (e2) {
      return {
        status: constants.INTERNAL_ERROR_MESSAGE,
        failure_code: e2.code,
        failure_message: e2.message,
      };
    }
  },

  buscar: async ({ findObject }) => {
    try {
      //find query
      let query = {};
      query[findObject.key] = findObject.value;
      //find object
      let response = await objModel.find(query).populate('Empresa').sort('PrimerNombre');

      //set values
      let status, failure_code, failure_message;

      status = constants.SUCCEEDED_MESSAGE;

      //return response
      return {
        status: status,
        datos: response,
        failure_code: failure_code,
        failure_message: failure_message,
      };

    } catch (e2) {
      return {
        status: constants.INTERNAL_ERROR_MESSAGE,
        failure_code: e2.code,
        failure_message: e2.message,
      };
    }
  },

  insertar: async (objData) => {
    try {

      let status, failure_code, failure_message;


      //find object
      let response = await objModel.insertMany([objData]);

      //set values
      if (response != null && response.length > 0) {
        //Set status
        status = constants.SUCCEEDED_MESSAGE;
      } else {
        //Set status
        status = constants.SUCCEEDED_MESSAGE;
      }

      //return response
      return {
        status: status,
        roles: response,
        failure_code: failure_code,
        failure_message: failure_message,
      };

    } catch (e2) {
      return {
        status: constants.INTERNAL_ERROR_MESSAGE,
        failure_code: e2.code,
        failure_message: e2.message,
      };
    }
  },

  actualizar: async (objData) => {
    try {

      let status, failure_code, failure_message;

      let objFiltro = { _id: objData._id };

      //find object
      response = await objModel.findOneAndUpdate(objFiltro, objData, { new: true }) // { new: true } para que retorne la data actualizada 

      //set values
      if (response != null && response.length > 0) {
        //Set status
        status = constants.SUCCEEDED_MESSAGE;
      } else {
        //Set status
        status = constants.SUCCEEDED_MESSAGE;
      }

      //return response
      return {
        status: status,
        datos: response,
        failure_code: failure_code,
        failure_message: failure_message,
      };

    } catch (e2) {
      return {
        status: constants.INTERNAL_ERROR_MESSAGE,
        failure_code: e2.code,
        failure_message: e2.message,
      };
    }
  },

  eliminar: async (objdata) => {
    try {

      let status, failure_code, failure_message;

      let objFiltro = { _id: objdata._id };

      //find object
      let response = await objModel.findOneAndRemove(objFiltro, objdata);

      //set values
      if (response != null && response.length > 0) {
        //Set status
        status = constants.SUCCEEDED_MESSAGE;
      } else {
        //Set status
        status = constants.SUCCEEDED_MESSAGE;
      }

      //return response
      return {
        status: status,
        datos: response,
        failure_code: failure_code,
        failure_message: failure_message,
      };

    } catch (e2) {
      return {
        status: constants.INTERNAL_ERROR_MESSAGE,
        failure_code: e2.code,
        failure_message: e2.message,
      };
    }
  },

  validarIngreso: async (findObject) => {
    try {

      //find object
      let response = await objModel.find(findObject).populate('Empresa').sort('PrimerNombre');

      //set values
      let status, failure_code, failure_message;

      status = constants.SUCCEEDED_MESSAGE;

      //return response
      return {
        status: status,
        usuarios: response,
        failure_code: failure_code,
        failure_message: failure_message,
      };

    } catch (e2) {
      return {
        status: constants.INTERNAL_ERROR_MESSAGE,
        failure_code: e2.code,
        failure_message: e2.message,
      };
    }
  },

  validarIngreso2: async (findObject) => {
    try {

      let query = new Object({
        Login: { $regex: findObject.Login, $options: "i" }
        , Clave: findObject.Clave

      });

      //find object
      let response = await objModel.find(query, { _id: 1, Empresa: 1, Rol: 1, PrimerNombre: 1, NombreCompleto: 1, Email: 1, Identificacion: 1 , Identificacion: 1}).populate('Rol');

      //set values
      let status, failure_code, failure_message;

      status = constants.SUCCEEDED_MESSAGE;

      //return response
      return {
        status: status,
        usuarios: response,
        failure_code: failure_code,
        failure_message: failure_message,
      };

    } catch (e2) {
      return {
        status: constants.INTERNAL_ERROR_MESSAGE,
        failure_code: e2.code,
        failure_message: e2.message,
      };
    }
  },

  listarPorIdentificacion: async(objParameters) => {
    try {
        //find query
        let query = { 
            "Empresa": new mongo.ObjectID(objParameters.value) ,
            "Identificacion": objParameters.key
          };
       // query = {};
    
        //let query = { "Codigo": "001" };

        //find object
        let response = await objModel.find(query).sort('Nombre');

        //set values 

        let status, failure_code, failure_message;

        status = constants.SUCCEEDED_MESSAGE;

        //return response
        return {
            status: status,
            datos: response,
            failure_code: failure_code,
            failure_message: failure_message,
        };

    } catch (e2) {
        return {
            status: constants.INTERNAL_ERROR_MESSAGE,
            failure_code: e2.code,
            failure_message: e2.message,
        };
    }
  },

  consultar: async ({ findObject }) => {
    try {

        //find query

        let query2 = { "Empresa": findObject.IdEmpresa};
        let query = {};
        if (findObject.search) {
          query =  { $or: [
            { NombreCompleto: { $regex: ".*" + findObject.search.replace(new RegExp(' ', 'g'), '.*'), $options: "i" } },
             { Identificacion: { $regex: ".*" + findObject.search.replace(new RegExp(' ', 'g'), '.*'), $options: "i" }}] 
            } 

        }

        //find object
        let response = await objModel.aggregate(
            [
                { $match: query2 },
                { $match: query}
                , { $sort:{ 'Nombre': 1 } }
            ]
        );
        
         
        //set values
        let status, failure_code, failure_message;

        status = constants.SUCCEEDED_MESSAGE;

        //return response
        return {
          status: status,
          datos: response,
          failure_code: failure_code,
          failure_message: failure_message,
        };

    } catch (e2) {

        return {
            status: constants.INTERNAL_ERROR_MESSAGE,
            failure_code: e2.code,
            failure_message: e2.message
        };
    }
  },

}; module.exports = repo;
