const objModel = require("../../models/divisiones");
const constants = require("../../constants");
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
      let query = { IdEmpresa: new mongo.ObjectID(idEmpresa) };
      console.log("query,listar.divisiones-->",query);

      //find object
      let response = await objModel.find(query).sort("Nombre");
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
      let response = await objModel.find(query).sort("Codigo");

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
  actualizar: async (objData) => {
    try {
      let status, failure_code, failure_message;

      let objFiltro = { _id: objData._id };

      //find object
      response = await objModel.findOneAndUpdate(objFiltro, objData, {
        new: true,
      }); // { new: true } para que retorne la data actualizada

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
  consultar: async ({ findObject }) => {
    try {
      //find query

      //let queryEmpresa = { Empresa: new mongo.ObjectID(findObject.IdEmpresa) };

      let query = {};
      if (findObject.search) {
        query = {
          $and: [
            { Empresa: findObject.IdEmpresa },

            {
              $or: [
                {
                  Codigo: {
                    $regex:
                      ".*" +
                      findObject.search.replace(new RegExp(" ", "g"), ".*"),
                    $options: "i",
                  },
                },
                {
                  Nombre: {
                    $regex:
                      ".*" +
                      findObject.search.replace(new RegExp(" ", "g"), ".*"),
                    $options: "i",
                  },
                },
              ],
            },
          ],
        };
      }

      //find object
      let response = await objModel.aggregate([
        // { $match: query }
        { $match: query },
        { $sort: { Nombre: 1 } },
      ]);

      // .find(query,{ $or: [ { quantity: { $lt: 20 } }, { price: 10 } ] } ).sort({ 'NombreCompleto': 1 }).skip(Number(findObject.start) > 0 ? Number(findObject.start) : 0).limit(Number(findObject.length));

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
