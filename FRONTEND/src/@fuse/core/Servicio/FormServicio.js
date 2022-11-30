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
import Icon from '@mui/material/Icon';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
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
        ObjUServicio.genero = this.state.genero;
        ObjUServicio.duracion = this.state.duracion;
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
                            <div className="ventana">
                                <Formsy className="flex flex-col justify-center">
                                    <ModalBody>
                                        <div className="cardbody">
                                            <div className="p-10">

                                                <div className="flex col-md-6 -mx-4">
                                                    <TextField
                                                        className="mt-8 mb-16 col-md-6 mx-4"
                                                        type="text"
                                                        name="Codigo"
                                                        fullWidth
                                                        value={this.state.Codigo}
                                                        onChange={this.onInputchange}
                                                        label="Código"
                                                        variant="outlined"
                                                        required

                                                    />
                                                    <TextField
                                                        className="mt-8 mb-16 mx-4"
                                                        type="text"
                                                        name="Nombre"
                                                        fullWidth
                                                        value={this.state.Nombre}
                                                        onChange={this.onInputchange}
                                                        label="Nombre"
                                                        variant="outlined"
                                                        required

                                                    />
                                                </div>
                                                <div className="flex col-md-6 -mx-4">
                                                    <TextField
                                                        className="mt-8 mb-16 col-md-6 mx-4"
                                                        type="text"
                                                        name="tipo_Servicio"
                                                        fullWidth
                                                        value={this.state.tipo_Servicio}
                                                        onChange={this.onInputchange}
                                                        label="Tipo Servicio"
                                                        variant="outlined"
                                                        required
                                                    />
                                                    <TextField
                                                        className="mt-8 mb-16 mx-4"
                                                        type="number"
                                                        name="Precio"
                                                        fullWidth
                                                        value={this.state.Precio}
                                                        onChange={this.onInputchange}
                                                        label="Precio"
                                                        variant="outlined"
                                                        required
                                                    />
                                                </div>
                                                <div className="flex  -mx-4">
                                                    <TextField
                                                        className="mt-8 mb-16 mx-4"
                                                        type="text"
                                                        name="detalle_servicio"
                                                        fullWidth
                                                        value={this.state.detalle_servicio}
                                                        onChange={this.onInputchange}
                                                        label="Detalle Servicio"
                                                        variant="outlined"
                                                        required
                                                    />

                                                </div>
                                                <div className="flex col-md-6 -mx-4">
                                                    <TextField
                                                        className="mt-8 mb-16 col-md-6 mx-4"
                                                        type="text"
                                                        name="genero"
                                                        fullWidth
                                                        value={this.state.genero}
                                                        onChange={this.onInputchange}
                                                        label="Genero"
                                                        variant="outlined"
                                                        required

                                                    />
                                                    <TextField
                                                        className="mt-8 mb-16 mx-4"
                                                        type="text"
                                                        name="duracion"
                                                        fullWidth
                                                        value={this.state.duracion}
                                                        onChange={this.onInputchange}
                                                        label="Duración"
                                                        variant="outlined"
                                                        required

                                                    />
                                                </div>
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