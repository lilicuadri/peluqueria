const constants = require("../../constants");
const Model = require("../../models/turnos");
const uuidv1 = require("../../../node_modules/uuid/v1");
const mongo = require("mongodb");

const v1options = {
  node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
  clockseq: 0x1234,
  msecs: new Date().getTime(),
  nsecs: 5678,
};

uuidv1(v1options);

const repo = {
  listar: async (idEmpresa) => {
    try {
      //find query
      let query = { IdEmpresa: new mongo.ObjectID(idEmpresa) };

      //find object
      let response = await Model.find(query).sort("Nombre_Servicio");

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
      let response = await Model.find(query).sort("Nombre_Servicio");

      //set values
      let status, failure_code, failure_message;

      status = constants.SUCCEEDED_MESSAGE;

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

  insertar: async (objRol) => {
    try {
      let status, failure_code, failure_message;

      //find object
      let response = await Model.insertMany([objRol]);

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

  modificar: async (objRol) => {
    try {
      let status, failure_code, failure_message;

      let objFiltro = { _id: objRol._id };

      //find object
      let response = await Model.findOneAndUpdate(objFiltro, objRol);

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

  eliminar: async (objRol) => {
    try {
      let status, failure_code, failure_message;

      let objFiltro = { _id: objRol._id };

      //find object
      let response = await Model.findOneAndRemove(objFiltro, objRol);

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

  consultar: async (findObject) => {
    try {
      //find query

      let query2 = { Empresa: new mongo.ObjectID(findObject.IdEmpresa) };
      let query = {};
      if (findObject.search) {
        query = {
          $or: [
            {
              Nombre: {
                $regex:
                  ".*" + findObject.search.replace(new RegExp(" ", "g"), ".*"),
                $options: "i",
              },
            },
          ],
        };
      }
      console.log("findObject-->", findObject);
      //find object
      let response = await Model.aggregate([
        { $match: query },
        { $match: query2 },
        { $sort: { Nombre: 1 } },
      ]);

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
};
module.exports = repo;
