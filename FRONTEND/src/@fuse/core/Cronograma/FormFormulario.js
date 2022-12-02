import React from 'react';
import { ModalBody, ModalFooter, CardBody } from 'reactstrap';
import './App.css';
import { gsUrlApi, JsonNomina } from '../../../configuracion/ConfigServer';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Formsy from 'formsy-react';
import Switch from '@mui/material/Switch'
import HeaderForm from '@fuse/core/Headers/HeaderMaestroForm'
import FusePageSimple from '../FusePageSimple';
import TablaDisponibles from './TablaDisponibles';
import { ToastContainer, toast } from 'react-toastify';
import InputLabel from '@mui/material/InputLabel';

let EstateEliminar = true;
class DemoTurno extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            abierto: false,
            values: '',
            EstadoSave: false,
            ArrayServicios: [],
            ArrayHorarios: [],
            Codigo: "",
            Servicio: ""

        };
    }
    async componentDidMount(e) { 
        var ObjeSesion = JSON.parse(localStorage.getItem('Usuario'));
        let Empresa = ObjeSesion.Usuario.Empresa;

        fetch(gsUrlApi + '/servicios/listar/' + Empresa + "/", {
            method: 'GET',
            body: JSON.stringify(),
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Accept': 'application/json;'
            }
        }).then(res => res.json())
            .then(data => data)
            .then((data) => {
                this.setState(state => ({
                    ...state, ArrayServicios: data.datos
                }))
            })
            .catch((err) => console.log("err", err));

    } 
 
    onClick = () => {
        this.props.MostrarFormulario('Cancelar');
    };

    Insertar = () => {
        var ObjeSesion = JSON.parse(localStorage.getItem('Usuario'));
        let Empresa = ObjeSesion.Usuario.Empresa;

        let obj = {};

        obj.IdServicio =  this.state.Servicio;
        obj.ArrayHorarios = this.state.ArrayHorarios;
        obj.Empresa = Empresa;
        let accion = "insertar"


        fetch(gsUrlApi + '/cronogramas/' + accion + "/", {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Accept': 'application/json;'
            }
        }).then(res => res.json())
            .then(data => data)
            .then((data) => {
               alert("Registro guardado de forma exitosa")
            })
            .catch((err) => console.log("err", err));
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

    agregarHorario = () => {
      
        if (this.state.FechaInicialTexto && this.state.FechaFinalTexto) {
            let arrayTemp = this.state.ArrayHorarios;
            let obj = {};
            obj.id = this.state.ArrayHorarios.length
            obj.FechaFinal = this.state.FechaFinal
            obj.FechaFinalTexto = this.state.FechaFinalTexto
            obj.FechaInicial = this.state.FechaInicial
            obj.FechaInicialTexto = this.state.FechaInicialTexto
            arrayTemp.push(obj)
            this.setState(state => ({
                ...state, ArrayHorarios: arrayTemp
            }));
        }
     
    }

    onInputchangeFechaInicial = data => {
        if (data) { 
            let value = data.target.value; 
            var currentDateObj = new Date(value); 
            var numberOfMlSeconds = currentDateObj.getTime();
            var addMlSeconds = 60 * 60000; 
            var d = new Date(numberOfMlSeconds + addMlSeconds);
            let dformat = [d.getMonth() + 1,
            d.getDate(),
            d.getFullYear()].join('/') + ' ' +
                [d.getHours(),
                d.getMinutes(),
                d.getSeconds()].join(':'); 
            this.setState(state => ({
                ...state, FechaInicial: value,
            }));
            this.setState(state => ({
                ...state, FechaInicialTexto: dformat,
            }));
        }
    }
    onInputchangeFechaFinal = data => {
        if (data) { 
            let value = data.target.value; 
            var currentDateObj = new Date(value); 
            var numberOfMlSeconds = currentDateObj.getTime();
            var addMlSeconds = 60 * 60000; 
            var d = new Date(numberOfMlSeconds + addMlSeconds);
            let dformat = [d.getMonth() + 1,
            d.getDate(),
            d.getFullYear()].join('/') + ' ' +
                [d.getHours(),
                d.getMinutes(),
                d.getSeconds()].join(':'); 
            this.setState(state => ({
                ...state, FechaFinal: value,
            }));
            this.setState(state => ({
                ...state, FechaFinalTexto: dformat,
            }));
        }
    }

    Eliminar = (data) => {
        for (let i = 0; i < this.state.ArrayHorarios.length; i++) {
           if (data.id ===  this.state.ArrayHorarios[i].id) {
            this.state.ArrayHorarios.splice(i,1)
            break;
           } 
        }
        this.setState(state => ({
            ...state, ArrayHorarios: this.state.ArrayHorarios,
        }));

    }

    
    render() {
        return (
            <>
                <FusePageSimple
                    header={
                        <HeaderForm
                            Guardar={() => this.Insertar()}
                            MostrarFormulario={() => this.onClick()}
                        />}

                    content={
                        <>
                            <div className="ventana" >
                                <Formsy className="flex flex-col justify-center">
                                    <ModalBody>
                                        <div className="cardbody" style={{ minHeight: "500px" }}>
                                            <div className="p-10">

                                                <div className="flex -mx-4">
                                                    <FormControl sx={{ m: 1, width: "100%" }}>
                                                        <InputLabel id="demo-simple-select-helper-label">Servicios</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-helper-label"
                                                            id="demo-simple-select-helper"
                                                            value={this.state.Servicio ? this.state.Servicio : null}
                                                            name="Servicio"
                                                            label="Servicios"
                                                            onChange={this.onInputchange}
                                                            fullWidth
                                                        >
                                                            <MenuItem value="">Elegir...</MenuItem>
                                                            {this.state.ArrayServicios.map((e, key) => {
                                                                return (
                                                                    <MenuItem value={e._id} key={e.Nombre}>
                                                                        <em>{e.Nombre}</em>
                                                                    </MenuItem>
                                                                );
                                                            })}
                                                        </Select>
                                                    </FormControl>


                                                </div>
                                                <div className='flex'>
                                                    <TextField
                                                        className="mt-8 mb-16 col-md-6 mx-4"
                                                        type="datetime-local"
                                                        name="FechaInicio"
                                                        fullWidth
                                                        value={this.state.FechaTurno}
                                                        onChange={this.onInputchangeFechaInicial}
                                                        label="Fecha Inicio"
                                                        variant="outlined"
                                                        required
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                    />
                                                    <TextField
                                                        className="mt-8 mb-16 col-md-6 mx-4"
                                                        type="datetime-local"
                                                        name="FechaFin"
                                                        fullWidth
                                                        value={this.state.FechaTurno}
                                                        onChange={this.onInputchangeFechaFinal}
                                                        label="Fecha Fin"
                                                        variant="outlined"
                                                        required
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                    />
                                                    <Button className='btn btn-primary' color='secondary'  variant="contained" onClick={() => this.agregarHorario()} type='button'>
                                                        Agregar
                                                    </Button>
                                                </div>
                                                <TablaDisponibles
                                                Eliminar={(data) => this.Eliminar(data)}
                                                    DataTable={this.state.ArrayHorarios ? this.state.ArrayHorarios : []}
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

export default DemoTurno;