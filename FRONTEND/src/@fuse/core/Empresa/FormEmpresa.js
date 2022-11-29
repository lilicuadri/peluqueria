import React from 'react';
import { Button, ModalBody, ModalFooter, CardBody } from 'reactstrap';
import '../Empresa/App.css';
import { gsUrlApi } from '../../../configuracion/ConfigServer';
import MenuItem from '@mui/material/MenuItem';
import Icon from '@mui/material/Icon';
import Formsy from 'formsy-react';
import FusePageCarded from '../FusePageCarded';
import HeadderSimple from "@fuse/core/Headers/Headersimple";
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import axios from 'axios'
let sIdEmpresa = null;

class FormUsuario extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            values: '',
            DataProductos: [],
            DataPais: [],
            DataMunicipios: [],
            ArrayMunicipios: []
        };
    }
    state = {
        abierto: false
    };
    async componentDidMount(e) {
        this.mostrarpais();
        var objSesion = JSON.parse(localStorage.getItem('Usuario'));
        let Empresa = objSesion.Usuario.Empresa;
        fetch(gsUrlApi + '/empresas/IdEmpresa/' + Empresa + '/', {
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
                if (data.empresas.length > 0) {
                    let DataEmpresa = data.empresas[0];
                    sIdEmpresa = DataEmpresa._id;
                    this.ConsultarMunicipio(DataEmpresa.IdPais);
                    this.setState(state => ({
                        ...state,
                        DataProductos: data
                    }));
                }
            })
            .catch(err => console.log('err', err));
    }

    mostrarpais = () => {
        this.setState(state => ({
            ...state,
            abierto: true
        }));
        fetch(gsUrlApi + '/paises', {
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
                    DataPais: data.paises
                }));
            })
            .catch(err => console.log('err', err));
    };

    ConsultarMunicipio = data => {
        let _id = 169;
        /* if (data.target) {
            _id = data.target.value;
        } else {
            _id = data;
        } */
        if (data) {
            fetch(gsUrlApi + '/municipios/IdPais/' + _id + '/', {
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
                        DataMunicipios: data.municipios
                    }));
                })
                .catch(err => console.log('err', err));
        }
    };

    ConsultarId = async (data) => {
        var idpais = '169';
        const response = await axios.get(`${gsUrlApi}/municipios/IdPais/ ` + idpais)
        const formatDat = response.data.municipios.map(r => ({
            value: r._id,
            key: r._id,
            label: r.text
        }))
        this.setState(state => ({
            ArrayMunicipios: formatDat
        }))

    }

    /*  ConsultarMunicipios = (data) => {
         this.props.onInputchange(data);
         this.ConsultarId(data);
     }
 
  */

    editar = e => {
        let ObjEmpresa = {};

        ObjEmpresa.TipoIdentificacion = e.tipodoc;
        ObjEmpresa.Identificacion = e.NumeroIdentificacion;
        ObjEmpresa.DigitoVerificacion = e.Dv;
        ObjEmpresa.Nombre = e.rsocial;
        ObjEmpresa.Regimen = e.regimen;
        ObjEmpresa.Pais = e.pais;
        ObjEmpresa.Municipio = e.Municipio;
        ObjEmpresa.Direccion = e.direccion;
        ObjEmpresa.Celular = e.celular;
        ObjEmpresa.Telefono1 = e.telefono;
        ObjEmpresa.Correo = e.email;
        ObjEmpresa.PaginaWeb = e.Web;

        ObjEmpresa._id = sIdEmpresa;

        fetch(gsUrlApi + '/empresas/actualizar', {
            method: 'POST',
            body: JSON.stringify(ObjEmpresa),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                Accept: 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => data)
            .then(data => {
                this.props.MostarAlerta()
            })
            .catch(err => console.log('err', err));
    };

    Mostraralerta = () => {

    }

    render() {
        if (this.state.DataProductos.length == 0) {
            return <div className=''></div>
        } else {
            let DataEmpresa = this.state.DataProductos.empresas[0];
            return (
                <>
                    <FusePageCarded
                        header={<HeadderSimple />}
                        content={
                            <div className='ventana'>
                                <Formsy onValidSubmit={this.editar} className="flex flex-col justify-center w-full">
                                    <div>
                                        <CardBody className='cardbody my-5 mx-4'>
                                            <ModalBody>
                                                <div className='borde'>
                                                    <div className='p-10'>
                                                        {/* <div className='flex -mx-4'>
                                                                <div className='mt-8 mb-16 mx-4'>
                                                                    <img src="assets/images/Logo3_user.png"
                                                                        style={{ width: '200px', height: '200px' }}
                                                                    />
                                                                </div>
                                                            </div>   */}

                                                        <div className="flex -mx-4">
                                                            <div className="min-w-50 pt-20">
                                                                <Icon color="action">assignment_ind</Icon>
                                                            </div>
                                                            <FormControl sx={{ m: 1, minWidth: 300 }}>
                                                                <InputLabel id="demo-simple-select-helper-label">Tipo de Documento</InputLabel>
                                                                <Select
                                                                    labelId="demo-simple-select-helper-label"
                                                                    id="demo-simple-select-helper"
                                                                    name="tipodoc"
                                                                    label="Tipo de Documento"
                                                                    onChange={this.mostrarinfo}
                                                                    value={DataEmpresa.TipoIdentificacion}
                                                                    fullWidth
                                                                >
                                                                    <MenuItem value="CC">CC</MenuItem>
                                                                    <MenuItem value="NIT">NIT</MenuItem>
                                                                </Select>
                                                            </FormControl>

                                                            <TextField
                                                                className="mt-8 mb-16 mx-4"
                                                                type="Number"
                                                                name="NumeroIdentificacion"
                                                                label="Numero de Identificacion"
                                                                fullWidth
                                                                value={DataEmpresa.Identificacion}
                                                                 
                                                                validations={{
                                                                    minLength: 1
                                                                }}
                                                                validationErrors={{
                                                                    minLength:
                                                                        'El numero de caracteres minimos es de: 1'
                                                                }}
                                                                variant="outlined"
                                                                required
                                                            /*  InputLabelProps={{
                                                                 shrink: true
                                                             }} */
                                                            />
                                                            
                                                            <TextField
                                                                className="mt-8 mb-16 mx-4"
                                                                type="Number"
                                                                name="Dv"
                                                                fullWidth
                                                                value={DataEmpresa.DigitoVerificacion}
                                                                label="Dv"
                                                                variant="outlined"
                                                                validations={{
                                                                    minLength: 1
                                                                }}
                                                                validationErrors={{
                                                                    minLength:
                                                                        'El numero de caracteres minimos es de: 1'
                                                                }} 
                                                            /*  InputLabelProps={{
                                                                 shrink: true
                                                             }} */
                                                            />

                                                        </div>
                                                      
                                                        <div className="flex -mx-4">
                                                            <div className="min-w-50 pt-20">
                                                                <Icon color="action">supervised_user_circle</Icon>
                                                            </div>
                                                            <TextField
                                                                className="mt-8 mb-16 mx-6"
                                                                type="text"
                                                                name="rsocial"
                                                                fullWidth
                                                                value={DataEmpresa.Nombre}
                                                                label="Razon Social"
                                                                variant="outlined"
                                                                validations={{
                                                                    minLength: 1
                                                                }}
                                                                validationErrors={{
                                                                    minLength:
                                                                        'El numero de caracteres minimos es de: 1'
                                                                }} 
                                                            /*  InputLabelProps={{
                                                                 shrink: true
                                                             }} */
                                                            />
                                                            <div className="min-w-50 pt-20">
                                                                <Icon color="action">supervised_user_circle</Icon>
                                                            </div>
                                                            <FormControl sx={{ m: 1, width: 900 }}>
                                                                <InputLabel id="demo-simple-select-helper-label">Regimen</InputLabel>
                                                                <Select
                                                                    labelId="demo-simple-select-helper-label"
                                                                    id="demo-simple-select-helper"
                                                                    name="regimen"
                                                                    label="Regimen"
                                                                    onChange={this.mostrarinfo}
                                                                    value={DataEmpresa.Regimen}
                                                                    fullWidth
                                                                    required
                                                                >
                                                                    <MenuItem value="none">
                                                                        <em>None</em>
                                                                    </MenuItem>
                                                                    <MenuItem value="regimen">Regimen*</MenuItem>
                                                                    <MenuItem value="Comun">Comun</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </div>
                                                        <div className="flex -mx-4">
                                                            <div className="min-w-50 pt-20">
                                                                <Icon color="action">map</Icon>
                                                            </div>
                                                            <FormControl sx={{ m: 1, width: 700}}>
                                                                <InputLabel id="demo-simple-select-helper-label">Pais</InputLabel>
                                                                <Select
                                                                    labelId="demo-simple-select-helper-label"
                                                                    id="demo-simple-select-helper"
                                                                    name="pais"
                                                                    label="pais"
                                                                    onChange={this.ConsultarId}
                                                                    variant="outlined"
                                                                    value={DataEmpresa.IdPais}
                                                                    autoWidth
                                                                    fullWidth
                                                                    required
                                                                >
                                                                    <MenuItem value="none">
                                                                        <em>None</em>
                                                                    </MenuItem>
                                                                    {this.state.DataPais.map((e, key) => {
                                                                        return (
                                                                            <MenuItem value={e._id} key={e.CodigoNumerico}>
                                                                                <em>{e.NombreComun}</em>
                                                                            </MenuItem>
                                                                        );
                                                                    })}
                                                                </Select>
                                                            </FormControl>
                                                            <div className="min-w-50 pt-20">
                                                                <Icon color="action">location_city</Icon>
                                                            </div>
                                                            <FormControl sx={{ m: 1, width: 700}}>
                                                                <InputLabel id="demo-simple-select-helper-label">Municipio</InputLabel>
                                                                <Select
                                                                    labelId="demo-simple-select-helper-label"
                                                                    id="demo-simple-select-helper"
                                                                    name="Municipio"
                                                                    label="Municipio"
                                                                    variant="outlined"
                                                                    value={DataEmpresa.IdMunicipio}                                                                    
                                                                    fullWidth
                                                                    required
                                                                >
                                                                    <MenuItem value="none">
                                                                        <em>None</em>
                                                                    </MenuItem>
                                                                    {this.state.DataMunicipios.map((e, key) => {
                                                                        return (
                                                                            <MenuItem value={e.IdMunicipio}>
                                                                                <em>{e.text}</em>
                                                                            </MenuItem>
                                                                        );
                                                                    })}
                                                                </Select>
                                                                
                                                            </FormControl>


                                                        </div>
                                                        <div className="flex -mx-4">
                                                            <div className="min-w-50 pt-20">
                                                                <Icon color="action">place</Icon>
                                                            </div>
                                                            <TextField
                                                                className="mt-8 mb-16 mx-12"
                                                                type="text"
                                                                name="direccion"
                                                                label="Direccion"
                                                                value={DataEmpresa.Direccion}
                                                                fullWidth
                                                                variant="outlined"
                                                                validations={{
                                                                    minLength: 1
                                                                }}
                                                                validationErrors={{
                                                                    minLength:
                                                                        'El numero de caracteres minimos es de: 1'
                                                                }} 
                                                            /*  InputLabelProps={{
                                                                 shrink: true
                                                             }} */
                                                            />

                                                        </div>
                                                        <div className="flex -mx-4">
                                                            <div className="min-w-50 pt-20">
                                                                <Icon color="action">phone_android</Icon>
                                                            </div>
                                                            <TextField
                                                                className="mt-8 mb-16 mx-6"
                                                                type="number"
                                                                name="celular"
                                                                label="Celular"
                                                                value={DataEmpresa.Celular}
                                                                fullWidth
                                                                variant="outlined"
                                                                validations={{
                                                                    minLength: 1
                                                                }}
                                                                validationErrors={{
                                                                    minLength:
                                                                        'El numero de caracteres minimos es de: 1'
                                                                }}
                                                                 required
                                                            /*  InputLabelProps={{
                                                                 shrink: true
                                                             }} */
                                                            />
                                                            <div className="min-w-50 pt-20">
                                                                <Icon color="action">local_phone</Icon>
                                                            </div>
                                                            <TextField
                                                                className="mt-8 mb-16 mx-6"
                                                                type="number"
                                                                name="telefono"
                                                                label="Telefono"
                                                                value={DataEmpresa.Telefono1}
                                                                fullWidth
                                                                variant="outlined"
                                                                validations={{
                                                                    minLength: 1
                                                                }}
                                                                validationErrors={{
                                                                    minLength:
                                                                        'El numero de caracteres minimos es de: 1'
                                                                }}
                                                                 required
                                                            /*  InputLabelProps={{
                                                                 shrink: true
                                                             }} */
                                                            />

                                                        </div>
                                                        <div className="flex -mx-4">
                                                            <div className="min-w-50 pt-20">
                                                                <Icon color="action">alternate_email</Icon>
                                                            </div>
                                                            <TextField
                                                                className="mt-8 mb-16 mx-6"
                                                                type="email"
                                                                name="email"
                                                                label="Email"
                                                                value={DataEmpresa.Correo}
                                                                fullWidth
                                                                variant="outlined"
                                                                validations={{
                                                                    minLength: 1
                                                                }}
                                                                validationErrors={{
                                                                    minLength:
                                                                        'El numero de caracteres minimos es de: 1'
                                                                }}
                                                                 required
                                                            /*  InputLabelProps={{
                                                                 shrink: true
                                                             }} */
                                                            />
                                                            <div className="min-w-50 pt-20">
                                                                <Icon color="action">language</Icon>
                                                            </div>
                                                            <TextField
                                                                className="mt-8 mb-16 mx-6"
                                                                type="text"
                                                                name="Web"
                                                                label="PaginaWeb"
                                                                value={DataEmpresa.PaginaWeb}
                                                                fullWidth
                                                                variant="outlined"
                                                                validations={{
                                                                    minLength: 1
                                                                }}
                                                                validationErrors={{
                                                                    minLength:
                                                                        'El numero de caracteres minimos es de: 1'
                                                                }}
                                                                 required
                                                            /*  InputLabelProps={{
                                                                 shrink: true
                                                             }} */
                                                            />


                                                        </div>
                                                        <div className="flex -mx-4 divButton">
                                                            <Button variant="outlined" className="btnGuardar secondary" type="submit">
                                                                <span>Guardar</span>
                                                            </Button>

                                                        </div>
                                                        <br></br>
                                                        <br></br>
                                                    </div>

                                                </div>

                                            </ModalBody>

                                        </CardBody>
                                    </div>
                                </Formsy>
                            </div>
                        }
                    />

                </>
            )
        }
    }
}

export default FormUsuario;