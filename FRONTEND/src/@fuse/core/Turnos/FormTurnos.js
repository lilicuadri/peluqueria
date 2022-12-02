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
// const Swal = require('sweetalert2')

let EstateEliminar = true;
class DemoTurno extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            abierto: false,
            values: '',
            EstadoSave: false,
            ArrayHorarios: [],
            ArrayTurnos: [],
            EstadoUsuario: false,
            Codigo: "",
            Servicio: ""

        };
    }
    async componentDidMount(e) {
        this.consultarTurnos()
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

        fetch(gsUrlApi + '/cronogramas/IdServicio/' + this.props.data._id, {
            method: 'GET',
            body: JSON.stringify(),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                Accept: 'application/json'
            }
        }).then(res => res.json())
            .then(data => data)
            .then((data) => {
                if (data.datos.length) {
                    let obj = data.datos[0];
                    for (var key in obj) {
                        let value = obj[key];
                        this.state[key] = value
                    }
                }
            })
            .catch(err => console.log("err", err));

    }

    ReservarTurno = (row) => {

        // Swal.fire({
        //     title: 'Are you sure?',
        //     text: "You won't be able to revert this!",
        //     icon: 'warning',
        //     showCancelButton: true,
        //     confirmButtonColor: '#3085d6',
        //     cancelButtonColor: '#d33',
        //     confirmButtonText: 'Yes, delete it!'
        //   }).then((result) => {
        console.log("row--->", row);
        // if (result.isConfirmed) {
        var ObjSesion = JSON.parse(localStorage.getItem('Usuario'));
        let ObjUsuario = ObjSesion.Usuario
        let objtTurno = {
            Codigo_Servicio: this.props.data._id,
            Nombre_Servicio: this.props.data.Nombre,
            Precio: this.props.data.Precio,
            Fecha: this.state.FechaTurnoG,
            Hora: row.Hora,
            Usuario: ObjUsuario.PrimerNombre,
            IdUsuario: ObjUsuario._id,
            IdEmpresa: ObjUsuario.Empresa,
            Identificacion: ObjUsuario.Identificacion
        }
        fetch(gsUrlApi + '/turnos/insertar/', {
            method: 'POST',
            body: JSON.stringify(objtTurno),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                Accept: 'application/json'
            }
        }).then(res => res.json())
            .then(data => data)
            .then((data) => {
                this.props.MostrarFormulario('Cargar');
                toast.success("Datos Guardado");
            })
            .catch(err => console.log("err", err));

        // }
        //   })

    }

    consultarTurnos = () => {
        var ObjSesion = JSON.parse(localStorage.getItem('Usuario'));
        let ObjUsuario = ObjSesion.Usuario
        fetch(gsUrlApi + '/turnos/listar/' + ObjUsuario.Empresa, {
            method: 'GET',
            body: JSON.stringify(),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                Accept: 'application/json'
            }
        }).then(res => res.json())
            .then(data => data)
            .then((data) => {
                if (data.datos.length) { 
                    this.setState(state => ({
                        ...state,ArrayTurnos: data.datos
                    }));
                }
            })
            .catch(err => console.log("err", err));
    }

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
            let value = data.target.value.substr(0, 11);
            let ArrayTemp = [];
            var dt = new Date(data.target.value);
            let fechaActual = `${(dt.getMonth() + 1).toString().padStart(2, '0')}/${dt.getDate().toString().padStart(2, '0')}/${dt.getFullYear().toString().padStart(4, '0')} ${dt.getHours().toString().padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}:${dt.getSeconds().toString().padStart(2, '0')}`
            this.setState(state => ({
                ...state, FechaTurnoG: fechaActual.substr(0, 10) + " " + fechaActual.substr(11) + ".000Z"
            }));

            var FechaInicial = new Date(this.state.ArrayHorarios[0]?.FechaInicial);
            var FechaFinal = new Date(this.state.ArrayHorarios[0]?.FechaFinal);
            var FechaFinalTime = FechaFinal.getMinutes()
            var FechaInicialTime = FechaInicial.getMinutes()
            var diff = FechaFinalTime - FechaInicialTime;
            console.log("diff-->", diff);
            console.log("value-->", this.state.duracion);
            let item = diff / Number(this.state.duracion)
            let ciclos = item.toFixed(1).substring(0, 1);
            console.log("item-->", Number(item));
            for (const iterator of this.state.ArrayHorarios) {
                for (let i = 0; i < ciclos; i++) {
                    var currentDateObj = new Date(value + iterator?.FechaInicial.substr(11));
                    var numberOfMlSeconds = currentDateObj.getTime();
                    var addMlSeconds = this.state.duracion * 60000;
                    var d = new Date(numberOfMlSeconds + addMlSeconds);
                    let dformat = [d.getMonth() + 1,
                    d.getDate(),
                    d.getFullYear()].join('/') + ' ' +
                        [d.getHours(),
                        d.getMinutes(),
                        d.getSeconds()].join(':');
                    let obj = {};
                    for (const iterator of this.state.ArrayTurnos) { 
                        if(dformat == iterator.Hora){
                            obj.Estado = true;
                        }
                        obj.Hora = dformat
                    }
                    obj.Hora = dformat
                    ArrayTemp.push(obj)
                }
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
                            Guardar={() => this.ReservarTurno()}
                            MostrarFormulario={() => this.props.MostrarFormulario("Cargar")}
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
                                                        value={this.state.Nombre}
                                                        label="Servicio"
                                                        variant="outlined"
                                                        required
                                                        disabled
                                                    />
                                                    <TextField
                                                        className="mt-8 mb-16 mx-4"
                                                        type="number"
                                                        name="Precio"
                                                        disabled
                                                        value={this.state.Precio}
                                                        label="Precio"
                                                        variant="outlined"
                                                        required
                                                    />
                                                    <TextField
                                                        className="mt-8 mb-16 col-md-6 mx-4"
                                                        type="datetime-local"
                                                        name="FechaTurno"
                                                        fullWidth
                                                        value={this.state.FechaTurno}
                                                        label="Fecha Turno"
                                                        onChange={this.onInputchangeFecha}
                                                        variant="outlined"
                                                        required
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                    />

                                                </div>
                                                <TablaDisponibles
                                                    ReservarTurno={(row) => this.ReservarTurno(row)}
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

export default DemoTurno;