import React from 'react';
import { Button, ModalBody, ModalFooter, CardBody } from 'reactstrap';
import './App.css';
import { gsUrlApi, JsonNomina } from '../../../configuracion/ConfigServer';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Formsy from 'formsy-react';
import Switch from '@mui/material/Switch'
import HeaderForm from '@fuse/core/Headers/HeaderMaestroForm'
import FusePageSimple from '../FusePageSimple';
import TablaDisponibles from './TablaDisponibles';
import { ToastContainer, toast } from 'react-toastify';

let EstateEliminar = true;
class DemoServicio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            abierto: false,
            values: '',
            EstadoSave: false,
            DataTipo: [],
            EstadoUsuario: false,
            Codigo: "",
            Nombre: ""

        };
    }
    async componentDidMount(e) {
        this.ConsultarRoles();
        if (this.props.data._id) {
            EstateEliminar = false;
            let obj = this.props.data;
            for (var key in obj) {
                let value = obj[key];
                this.state[key] = value
            }
            this.setState(state => ({
                ...state,
                EstadoUsuario: this.props.data.Estado
            }));
        } else {
            EstateEliminar = true;
        }

    }
    CheckedEstado = () => {
        this.setState({ EstadoUsuario: !this.state.EstadoUsuario });
    };


    //CONSTRUCTOR INSERTAR
    insertarusuario = e => {
        var objSesion = JSON.parse(localStorage.getItem('Usuario'));
        let Empresa = objSesion.Usuario.Empresa;

        let ObjUServicio = {};
        ObjUServicio.IdServicio = this.state.IdServicio;
        ObjUServicio.Codigo = this.state.Codigo;
        ObjUServicio.Nombre = this.state.Nombre;
        ObjUServicio.detalle_servicio = this.state.detalle_servicio;
        ObjUServicio.Precio = this.state.Precio;
        ObjUServicio.tipo_Servicio = this.state.tipo_Servicio;
        ObjUServicio.imagen = this.state.Imagen;
        ObjUServicio.Empresa = Empresa;

        let Action = null;
        if (this.props.data._id) {
            ObjUServicio._id = this.props.data._id;
            Action = 'actualizar';
        } else {
            Action = 'insertar';
        }

        fetch(gsUrlApi + '/servicios/' + Action + '/', {
            method: 'POST',
            body: JSON.stringify(ObjUServicio),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                Accept: 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => data)
            .then(data => {
                if (data.datos.length > 0) {
                    this.props.MostrarFormulario('Cargar');
                    toast.success("Datos Guardado");
                } else {
                    this.props.MostrarFormulario('Cargar');
                    toast.error("Error al guardado el servicio");
                }

            })
            .catch(err => console.log('err', err));
    };

    ConsultarRoles = () => {
        var objSesion = JSON.parse(localStorage.getItem('Usuario'));
        let Empresa = objSesion.Usuario.Empresa;

        fetch(gsUrlApi + '/roles/listar/' + Empresa + '/', {
            method: 'GET',
            body: JSON.stringify(),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                Accept: 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => data)
            .then(data => {
                this.setState(state => ({
                    ...state,
                    DataRoles: data.datos
                }));
            })
            .catch(err => console.log('err', err));
    };

    ElimarUsuario = e => {
        var ObjUServicios = new Object();
        ObjUServicios._id = this.props.data._id;
        fetch(gsUrlApi + '/servicios/eliminar/', {
            method: 'POST',
            body: JSON.stringify(ObjUServicios),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                Accept: 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => data)
            .then(data => {
                this.props.MostrarFormulario('Cargar');

            })
            .catch(err => console.log('err', err));
    };

    onClick = () => {
        this.props.MostrarFormulario('Cancelar');
    };

    onClick2 = () => {

    };

    onInputchange = data => {
        if (data) {
            let name = data.target.name;
            let value = data.target.value;
            this.setState(state => ({
                ...state, [name]: value,
            }));
        }
    }

    onInputchangeFecha = data => {
        if (data) {
            let name = data.target.name;
            let value = data.target.value;
            let ArrayTemp = [];
            for (let i = 0; i < 5; i++) {
                var currentDateObj = new Date(value);

                var numberOfMlSeconds = currentDateObj.getTime();
                var addMlSeconds = 60 * 60000;
                var newDateObj = new Date(numberOfMlSeconds + addMlSeconds);
                var d = new Date(numberOfMlSeconds + addMlSeconds);
                let dformat = [d.getMonth() + 1,
                d.getDate(),
                d.getFullYear()].join('/') + ' ' +
                    [d.getHours(),
                    d.getMinutes(),
                    d.getSeconds()].join(':');
                let obj = {};
                obj.Hora = dformat
                value = newDateObj;
                ArrayTemp.push(obj)
            }


            this.setState(state => ({
                ...state, ArrayHoras: ArrayTemp,
            }));
        }
    }
    render() {
        return (
            <>
                <FusePageSimple
                    header={
                        <HeaderForm
                            Guardar={() => this.insertarusuario()}
                            MostrarFormulario={() => this.onClick()}
                        />}

                    content={
                        <>
                            <div className="ventana" >
                                <Formsy className="flex flex-col justify-center">
                                    <ModalBody>
                                        <div className="cardbody" style={{ minHeight: "500px" }}>
                                            <div className="p-10">

                                                <div className="flex col-md-6 -mx-4">
                                                    <TextField
                                                        className="mt-8 mb-16 mx-4"
                                                        type="text"
                                                        name="Servicio"
                                                        fullWidth
                                                        value={this.state.Servicio}
                                                        onChange={this.onInputchange}
                                                        label="Servicio"
                                                        variant="outlined"
                                                        required

                                                    />
                                                    <TextField
                                                        className="mt-8 mb-16 col-md-6 mx-4"
                                                        type="datetime-local"
                                                        name="FechaTurno"
                                                        fullWidth
                                                        value={this.state.FechaTurno}
                                                        onChange={this.onInputchangeFecha}
                                                        label="Fecha Turno"
                                                        variant="outlined"
                                                        required
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                    />

                                                </div>
                                                <TablaDisponibles
                                                    DataTable={this.state.ArrayHoras ? this.state.ArrayHoras : []}
                                                />
                                            </div>
                                        </div>
                                    </ModalBody>
                                </Formsy>
                            </div>
                        </>
                    }
                />
            </>
        )
    }
}

export default DemoServicio;