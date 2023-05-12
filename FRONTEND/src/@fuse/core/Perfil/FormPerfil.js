import React from 'react';
import { Button, ModalBody, ModalFooter, CardBody } from 'reactstrap';
import './App.css';
import { gsUrlApi, JsonNomina } from '../../../configuracion/ConfigServer';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Formsy from 'formsy-react';
import Switch from '@mui/material/Switch';
import HeaderForm from '@fuse/core/Headers/HeaderMaestroForm';
import FusePageSimple from '../FusePageSimple';
import Icon from '@mui/material/Icon';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { ToastContainer, toast } from 'react-toastify';

let EstateEliminar = true;
class DemoPerfil extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            abierto: false,
            values: '',
            EstadoSave: false,
            DataRoles: [],
            EstadoUsuario: false,
            SegundoNombre: '',
            SegundoApellido: ''
        };
    }
    async componentDidMount(e) {
        var objSesion = JSON.parse(localStorage.getItem('Usuario'));
        let id = objSesion.Usuario._id;
        fetch(gsUrlApi + '/usuarios/_id/' + id, {
            method: 'GET',
            body: JSON.stringify(),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                Accept: 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => data)
            .then((data) => {
                let obj = data.datos[0];
                console.log(obj);
                this.setState((state) => ({
                    ...state,
                    EstadoUsuario: this.props.data.Estado
                }));
                for (var key in obj) {
                    let value = obj[key];
                    this.state[key] = value;
                }
            });
    }
    CheckedEstado = () => {
        this.setState({ EstadoUsuario: !this.state.EstadoUsuario });
    };

    //CONSTRUCTOR INSERTAR
    insertarusuario = (e) => {
        var objSesion = JSON.parse(localStorage.getItem('Usuario'));
        let Empresa = objSesion.Usuario.Empresa;

        let ObjUsuario = {};
        ObjUsuario.IdUsuario = this.state.IdUsuario;
        ObjUsuario.Nombre = this.state.Nombre;
        ObjUsuario.Apellido = this.state.Apellido;
        ObjUsuario.Celular = this.state.Celular;
        ObjUsuario.Empresa = Empresa;
        ObjUsuario.Login = this.state.Login;
        ObjUsuario.Clave = this.state.Clave;
        ObjUsuario._id = objSesion.Usuario._id;
        fetch(gsUrlApi + '/usuarios/actualizar/', {
            method: 'POST',
            body: JSON.stringify(ObjUsuario),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                Accept: 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => data)
            .then((data) => {
                toast.success('Datos Guardado');
            })
            .catch((err) => console.log('err', err));
        alert('Datos Guardado con exitos');
    };

    onClick = () => {
        this.props.MostrarFormulario('Cancelar');
    };

    onClick2 = () => {};

    onInputchange = (data) => {
        if (data) {
            let name = data.target.name;
            let value = data.target.value;
            this.setState((state) => ({
                ...state,
                [name]: value
            }));
        }
    };
    render() {
        return (
            <>
                <FusePageSimple
                    header={<HeaderForm Guardar={() => this.insertarusuario()} MostrarFormulario={() => this.onClick()} />}
                    content={
                        <div className="ventana">
                            <Formsy className="flex flex-col justify-center w-full">
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
                                                                InputLabelProps={{
                                                                    shrink: true
                                                                }}
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
                                                                InputLabelProps={{
                                                                    shrink: true
                                                                }}
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
                                                                InputLabelProps={{
                                                                    shrink: true
                                                                }}
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
                                                                name="Login"
                                                                label="Usuario"
                                                                value={this.state.Login}
                                                                validations={{
                                                                    minLength: 1
                                                                }}
                                                                onChange={this.onInputchange}
                                                                variant="outlined"
                                                                required
                                                                InputLabelProps={{
                                                                    shrink: true
                                                                }}
                                                            />
                                                            <div className="min-w-50 pt-20">
                                                                <Icon color="action">security</Icon>
                                                            </div>
                                                            <TextField
                                                                className="mt-8 mb-16 mx-3"
                                                                type="password"
                                                                fullWidth
                                                                name="Clave"
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
                                                                InputLabelProps={{
                                                                    shrink: true
                                                                }}
                                                            />
                                                            <Switch
                                                                className="mt-8 mb-16 mx-3"
                                                                checked={this.state.EstadoUsuario}
                                                                onChange={() => this.CheckedEstado()}
                                                                aria-label="Custom Scrollbars"
                                                                name="estado"
                                                            >
                                                                <h4>Activo</h4>
                                                            </Switch>
                                                        </div>
                                                    </div>
                                                </div>
                                            </ModalBody>
                                        </form>
                                    </CardBody>
                                </div>
                            </Formsy>
                        </div>
                    }
                />
            </>
        );
    }
}

export default DemoPerfil;
