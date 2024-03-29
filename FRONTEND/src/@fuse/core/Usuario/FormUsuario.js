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
class DemoUsuario extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            abierto: false,
            values: '',
            EstadoSave: false,
            DataRoles: [],
            EstadoUsuario: false,
            SegundoNombre: "",
            SegundoApellido: ""
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

        let ObjUsuario = {};
        ObjUsuario.IdUsuario = this.state.IdUsuario;
        ObjUsuario.TipoIdentificacion = this.state.TipoIdentificacion;
        ObjUsuario.Identificacion = this.state.Identificacion;
        ObjUsuario.Dv = this.state.Dv;
        ObjUsuario.Nombre = this.state.Nombre;
        ObjUsuario.Apellido = this.state.Apellido;
        ObjUsuario.Celular = this.state.Celular;
        ObjUsuario.Empresa = Empresa;
        ObjUsuario.Usuario = this.state.Usuario;
        ObjUsuario.Clave = this.state.Contraseña;

        let Action = null;
        if (this.props.data._id) {
            ObjUsuario._id = this.props.data._id;
            Action = 'actualizar';
        } else {
            Action = 'insertar';
        }

        fetch(gsUrlApi + '/usuarios/' + Action + '/', {
            method: 'POST',
            body: JSON.stringify(ObjUsuario),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                Accept: 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => data)
            .then(data => {
                if(data.Error === false){
                    this.props.MostrarFormulario('Cargar');
                    toast.success("Datos Guardado");
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
        var ObjUsuarios = new Object();
        ObjUsuarios._id = this.props.data._id;
        fetch(gsUrlApi + '/usuarios/eliminar/', {
            method: 'POST',
            body: JSON.stringify(ObjUsuarios),
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

                        <div className="ventana">
                            <Formsy  className="flex flex-col justify-center w-full">
                                <div>
                                    <CardBody className="cardbody my-5 mx-4">
                                        <form>
                                            <ModalBody>
                                                <div className="borde">
                                                    <div className="p-10">
                                                        <div className="flex -mx-4">

                                                             <TextField
                                                                className="mt-8 mb-16 mx-4"
                                                                type="text"
                                                                name="Nombre"
                                                                fullWidth
                                                                value={this.state.Nombre}
                                                                label="Nombre"
                                                                onChange={this.onInputchange}
                                                                variant="outlined"
                                                                required
                                                            /*  InputLabelProps={{
                                                                 shrink: true
                                                             }} */

                                                            />

                                                        </div>
                                                        

                                                        <div className="flex -mx-4">
                                                             <TextField
                                                                className="mt-8 mb-16 mx-4"
                                                                type="text"
                                                                name="Apellido"
                                                                fullWidth
                                                                value={this.state.Apellido}
                                                                label="Apellido"
                                                                onChange={this.onInputchange}
                                                                variant="outlined"
                                                                required
                                                            /*  InputLabelProps={{
                                                                 shrink: true
                                                             }} */

                                                            />
                                                            
                                                            <TextField
                                                                className="mt-8 mb-16 mx-4"
                                                                type="number"
                                                                name="Celular"
                                                                fullWidth
                                                                value={this.state.Celular}
                                                                label="Celular"
                                                                onChange={this.onInputchange}
                                                                variant="outlined"
                                                                required
                                                            /*  InputLabelProps={{
                                                                 shrink: true
                                                             }} */

                                                            />

                                                        </div>
                                                        
                                                        <div className="row">
                                                            <div className="min-w-48 fa-2x pt-2 pl-5">
                                                                {/*  <FontAwesomeIcon icon={faUserCircle}>
                                                                    {' '}
                                                                </FontAwesomeIcon> */}
                                                            </div>

                                                        </div>
                                                        <div className="flex -mx-4">
                                                            <div className="min-w-50 pt-20">
                                                                <Icon color="action">person</Icon>
                                                            </div>
                                                            <TextField
                                                                className="mt-8 mb-16 mx-4"
                                                                type="text"
                                                                fullWidth
                                                                name="Usuario"
                                                                label="Usuario"
                                                                value={this.state.Usuario}
                                                                validations={{
                                                                    minLength: 1
                                                                }}
                                                                onChange={this.onInputchange}
                                                                variant="outlined"
                                                                required
                                                            /*  InputLabelProps={{
                                                                 shrink: true
                                                             }} */

                                                            />
                                                            <div className="min-w-50 pt-20">
                                                                <Icon color="action">security</Icon>
                                                            </div>
                                                            <TextField
                                                                className="mt-8 mb-16 mx-3"
                                                                type="password"
                                                                fullWidth
                                                                name="Contraseña"
                                                                label="Contraseña"
                                                                value={this.state.Clave}
                                                                validations={{
                                                                    minLength: 2
                                                                }}
                                                                onChange={this.onInputchange}
                                                                validationErrors={{
                                                                    minLength: 'El numero de caracteres minimos es de 2'
                                                                }}
                                                                style={{ 'borde-color': 'blue' }}
                                                                variant="outlined"
                                                                required
                                                            /*  InputLabelProps={{
                                                                 shrink: true
                                                             }} */

                                                            />
                                                            <Switch
                                                                className="mt-8 mb-16 mx-3"
                                                                checked={this.state.EstadoUsuario}
                                                                onChange={() => this.CheckedEstado()}
                                                                aria-label="Custom Scrollbars"
                                                                name="estado"

                                                            >
                                                                <h4 >Activo</h4>
                                                            </Switch>
                                                        </div>
                                                    </div>
                                                </div>
                                            </ModalBody>
                                        </form>
                                    </CardBody>
                                </div>
                            </Formsy>

                        </div >
                    }
                />
            </>
        )
    }
}

export default DemoUsuario;