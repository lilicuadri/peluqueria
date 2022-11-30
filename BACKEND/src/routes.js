/* const { request } = require('express'); */
const express = require('express'); 
const router = express.Router();

module.exports = () => {
    //index
    const indexRouter = express.Router();
    indexRouter.get('/', (req, res) => {
        res.status(200).json({ response: 'Mongo API is working properly.' });
    });

    const requestsRouter = express.Router();
    const divisionPoliticaController = require('./controllers/divisionPolitica');
    const empresasController = require('./controllers/empresas');
    const usuariosController = require('./controllers/usuarios');
    const rolesController = require('./controllers/roles');
    const interfacesController = require('./controllers/interfaces'); 
    const departamentosController = require('./controllers/departamentos');
    const divisionesController = require('./controllers/divisiones');
    const periodoController = require('./controllers/periodo'); 
    const turnosController = require('./controllers/turnos');
    const serviciosController = require('./controllers/servicios');
    const peluqueriasController = require('./controllers/peluquerias')
    

    //divisionPolitica
    requestsRouter.get('/municipios/:key/:value', divisionPoliticaController.findMunicipios);
    requestsRouter.get('/paises/:key/:value', divisionPoliticaController.findPaises);
    requestsRouter.get('/paises/', divisionPoliticaController.searchPaises);
    requestsRouter.get('/corregimientos/:key/:value', divisionPoliticaController.findCorregimientos);
    requestsRouter.get('/corregimientos/', divisionPoliticaController.searchCorregimientos);
    requestsRouter.get('/localidades/:key/:value', divisionPoliticaController.findLocalidades);
    requestsRouter.get('/localidades/', divisionPoliticaController.searchLocalidades);
    requestsRouter.get('/barrios/:key/:value', divisionPoliticaController.findBarrios);
    requestsRouter.get('/barrios/', divisionPoliticaController.searchBarrios);

    //peluquerias
   requestsRouter.get('/peluquerias/:key/:value', peluqueriasController.buscar);
    requestsRouter.post('/peluquerias/actualizar', peluqueriasController.actualizar);

    //interfaces
    requestsRouter.get('/interfaces/', interfacesController.buscar);

    //usuarios
    requestsRouter.get('/usuarios/listar/:value', usuariosController.listar);
    requestsRouter.get('/usuarios/:key/:value', usuariosController.buscar);
    requestsRouter.post('/usuarios/insertar', usuariosController.insertar);
    requestsRouter.post('/usuarios/eliminar', usuariosController.eliminar);
    requestsRouter.post('/usuarios/actualizar', usuariosController.actualizar);
    requestsRouter.post('/usuarios/validarIngreso', usuariosController.validarIngreso);
    requestsRouter.get('/usuarios/listarPorIdentificacion/:value/:key', usuariosController.listarPorIdentificacion);
    requestsRouter.post('/usuarios/guardar', usuariosController.guardar);//nuevo-verificar
    requestsRouter.post('/usuarios/consultar', usuariosController.consultar);

    //roles
    requestsRouter.get('/roles/listar/:value', rolesController.listar);
    requestsRouter.get('/roles/:key/:value', rolesController.buscar);
    requestsRouter.post('/roles/insertar', rolesController.insertar);
    requestsRouter.post('/roles/eliminar', rolesController.eliminar);
    requestsRouter.post('/roles/actualizar', rolesController.actualizar);
    requestsRouter.post('/roles/consultar', rolesController.consultar);

     //turnos
    requestsRouter.get('/turnos/listar/:value', turnosController.listar);
    requestsRouter.get('/turnos/:key/:value', turnosController.buscar);
    requestsRouter.post('/turnos/insertar', turnosController.insertar);
    requestsRouter.post('/turnos/eliminar', turnosController.eliminar);
    requestsRouter.post('/turnos/modificar', turnosController.modificar);//nuevo-verificar
    requestsRouter.post('/turnos/consultar', turnosController.consultar);

       //servicios
    requestsRouter.get('/servicios/listar/:value', serviciosController.listar);
    requestsRouter.get('/servicios/:key/:value', serviciosController.buscar);
    requestsRouter.post('/servicios/insertar', serviciosController.insertar);
    requestsRouter.post('/servicios/eliminar', serviciosController.eliminar);
    requestsRouter.post('/servicios/actualizar', serviciosController.actualizar);
    requestsRouter.post('/servicios/consultar', serviciosController.consultar);
 
    //departamentos
    requestsRouter.get('/departamentos/listar/:value', departamentosController.listar);
    requestsRouter.get('/departamentos/:key/:value', departamentosController.buscar);
    requestsRouter.post('/departamentos/insertar', departamentosController.insertar);
    requestsRouter.post('/departamentos/eliminar', departamentosController.eliminar);
    requestsRouter.post('/departamentos/actualizar', departamentosController.actualizar);
    requestsRouter.post('/departamentos/consultar', departamentosController.consultar);

    //divisiones
    requestsRouter.get('/divisiones/listar/:value', divisionesController.listar);
    requestsRouter.get('/divisiones/:key/:value', divisionesController.buscar);
    requestsRouter.post('/divisiones/insertar', divisionesController.insertar);
    requestsRouter.post('/divisiones/eliminar', divisionesController.eliminar);
    requestsRouter.post('/divisiones/actualizar', divisionesController.actualizar);
    requestsRouter.post('/divisiones/consultar', divisionesController.consultar);
          
    //Periodo
    requestsRouter.post('/periodo/insertar', periodoController.insertar)
    requestsRouter.get('/periodo/consultar', periodoController.consultar)
    requestsRouter.get('/periodo/listarPeriodosActivos/:value', periodoController.listarPeriodosActivos)
    requestsRouter.get('/periodo/listar/:value', periodoController.listar)
    requestsRouter.post('/periodo/actualizar', periodoController.actualizar)
    requestsRouter.get('/periodo/eliminar/:value', periodoController.eliminar)


    router.use('/', indexRouter);
    router.use('/', requestsRouter);

    return router;
};