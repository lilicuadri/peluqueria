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
        ObjUServicio.detalle_servicio = this.state.Descripcion;
        ObjUServicio.Precio = this.state.Valor;
        ObjUServicio.tipo_Servicio = this.state.TipoServicio;
        ObjUServicio.imagen = this.state.Imagen;
        ObjUServicio.SegundoApellido = this.state.SegundoApellido;
        ObjUServicio.Empresa = Empresa;
        //ObjUServicio.Filtro = this.state.TipoIdentificacion + " - " + this.state.Identificacion + " " + this.state.PrimerNombre + " " + this.state.SegundoNombre + " " + this.state.PrimerApellido + " " + this.state.SegundoApellido;
        //ObjUServicio.NombreCompleto = this.state.PrimerNombre + " " + this.state.SegundoNombre + " " + this.state.PrimerApellido + " " + this.state.SegundoApellido;

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
                if(data.datos.Error === false){
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

                        <div className="ventana">
                            <Formsy  className="flex flex-col justify-center w-full">
                                <div>
                                    <CardBody className="cardbody my-5 mx-4">
                                        <form>
                                            <ModalBody>
                                                <div className="borde">
                                                    <div className="p-10">
                                                        <div className="flex -mx-4">
                                                            <div className="min-w-50 pt-20">
                                                                <Icon color="action">security</Icon>
                                                            </div>
                                                            <TextField
                                                                className="mt-8 mb-16 mx-4"
                                                                id="outlined-basic"
                                                                label="Codigo"
                                                                name= "Codigo"
                                                                //variant="outlined"
                                                                type="number"
                                                                value={this.state.Codigo}
                                                                onChange={this.onInputchange}
                                                                InputLabelProps={{
                                                                    shrink: true,
                                                                }}
                                                                 validations={{
                                                                            minLength: 1
                                                                        }}
                                                                        validationErrors={{
                                                                            minLength:
                                                                                'El numero de caracteres minimos es de: 1'
                                                                        }}
                                                            />
                                                             <div className="min-w-50 pt-20">
                                                                        <Icon color="action">account_circle</Icon>
                                                                    </div>
                                                             <TextField
                                                                        className="mt-8 mb-16 mx-4"
                                                                        type="text"
                                                                        name="Nombre"
                                                                        value={this.state.Nombre}
                                                                        label="Nombre"
                                                                        onChange={this.onInputchange}
                                                                
                                                                        variant="outlined"
                                                                        /* InputLabelProps={{
                                                                            shrink: true
                                                                        }} */

                                                                          

                                                                    />
                                                                
                                                        </div>
                                                 
                                                       
                                                        <div className="flex -mx-4">
                                                            <TextField
                                                                className="mt-8 mb-16 mx-4"
                                                                id="outlined-multiline-static"
                                                                label="Descripción"
                                                                name="Descripcion"
                                                                value={this.state.Descripcion}
                                                                multiline
                                                                fullWidth
                                                                onChange={this.onInputchange}
                                                                rows={4}
                                                            />

                                                          

                                                        </div>
                                                        <div className="flex -mx-4">
                                                           
                                                        
                                                            <TextField
                                                                className="mt-8 mb-16 mx-4"
                                                                type="number"

                                                                name="Valor"
                                                                label="Valor"
                                                                value={this.state.Valor}
                                                                onChange={this.onInputchange}
                                                                validations={{
                                                                    minLength: 4
                                                                }}
                                                                validationErrors={{
                                                                    minLength: 'El numero de caracteres minimos es de 4'
                                                                }}
                                                                variant="outlined"
                                                                required
                                                            /*  InputLabelProps={{
                                                                 shrink: true
                                                             }} */

                                                            />
                                                            <div className="flex -mx-4">
                                                                <div className="min-w-50 pt-20">
                                                                    <Icon color="action">person</Icon>
                                                                </div>
                                                                
                                                                <FormControl sx={{ m: 1, width: 600 }}>
                                                                    <InputLabel id="demo-simple-select-helper-label">Tipo de Servicio</InputLabel>
                                                                <Select
                                                                    labelId="demo-simple-select-helper-label"
                                                                    id="demo-simple-select-helper"
                                                                    value={this.state.TipoServicio }
                                                                    name="TipoServicio"
                                                                        label="Tipo de Servicio"
                                                                        
                                                                    onChange={this.onInputchange}
                                                                    fullWidth
                                                                >
                                                                    <MenuItem value="CC">NIÑA</MenuItem>
                                                                    <MenuItem value="NIT">NIÑO</MenuItem>
                                                                    <MenuItem value="NIT">HOMBRE</MenuItem>
                                                                    <MenuItem value="NIT">MUJER</MenuItem>
                                                                        
                                                                </Select>
                                                                 </FormControl>

                                                            </div>

                                                        </div>
                                                        
                                                        
                                                            <div className="row">
                                                                <input
                                                                value={this.state.Imagen}
                                                                type="file" />
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

export default DemoServicio;