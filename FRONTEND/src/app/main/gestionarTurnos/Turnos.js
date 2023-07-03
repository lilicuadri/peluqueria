import Formulario from '@fuse/core/Turnos/FormTurnos';
import React from 'react';
import FusePageCarded from '@fuse/core/FusePageCarded';
import TablaPrincipal from './TablaPrincipal';
import { gsUrlApi } from '../../../configuracion/ConfigServer'
import Alerta from '@fuse/core/DemoAlerta/Alertas';
import HeaderMaestro from '@fuse/core/Headers/HeaderMaestro';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Turnos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            abierto: false,
            values: '',
            EstadoForm: true,
            FechaTurno: '',
            Servicio: '',
            Precio: '',
            ListaVersiones: [],
            DataEdict: '',
            EstadoAlerta: false
        }

    }

    async componentDidMount() {
        var ObjeSesion = JSON.parse(localStorage.getItem('Usuario'));
        let Empresa = ObjeSesion.Usuario.Empresa;

        fetch(gsUrlApi + '/turnos/listar/' + Empresa + '/', {
            method: 'GET',
            body: JSON.stringify(),
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                Accept: 'application/json;'
            }
        })
            .then((res) => res.json())
            .then((data) => data)
            .then((data) => {
                this.setState((state) => ({
                    ...state,
                    ListaVersiones: data.datos
                }));
            })
            .catch((err) => console.log('err', err));

    }

    Consultar = data => {
        let filtro = data.target.value;
        var ObjSesion = JSON.parse(localStorage.getItem('Usuario'));
        let sIdEmpresa = ObjSesion.Usuario.Empresa;

        fetch(gsUrlApi + '/turnos/listar/', {
            method: 'POST',
            body: JSON.stringify({ IdEmpresa: sIdEmpresa, search: filtro }),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                Accept: 'application/json'
            }
        }).then(res => res.json())
            .then(data => data)
            .then((data) => {
                this.setState(state => ({
                    ...state, ListaVersiones: data.datos

                }))
                console.log(data.datos)
            })
            .catch(err => console.log("err", err));
    }

    Eliminar = e => {
        var objProductos = new Object();
        objProductos._id = e._id;
        fetch(gsUrlApi + '/turnos/eliminar/', {
            method: 'POST',
            body: JSON.stringify(objProductos),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json',
            }
        }).then(res => res.json())
            .then(data => data)
            .then((data) => {
                this.componentDidMount();
            })
            .catch(err => console.log("err", err));

    };
    MostrarFormulario(e) {
        if (e === "Nuevo" || e === "Cancelar") {
            this.setState(state => ({
                ...state, DataEdict: ''
            }))
            this.setState({ EstadoForm: !this.state.EstadoForm });

        } else if (e === "Cargar") {

            this.componentDidMount()
        } else if (e === "Guardado") {
            this.componentDidMount()
            this.setState(state => ({
                ...state, DataEdict: ''
            }))
            this.setState(state => ({
                ...state, EstadoAlerta: true
            }))
            this.setState({ EstadoForm: !this.state.EstadoForm });

        } else if (e._id) {
            this.setState(state => ({
                ...state, DataEdict: e
            }))
            this.setState({ EstadoForm: !this.state.EstadoForm });

        }
    }

    anularTurno = (e) => {

        fetch(gsUrlApi + '/turnos/modificar/', {
            method: 'POST',
            body: JSON.stringify({ _id: e._id, Estado: "Anulado" }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                Accept: 'application/json;'
            }
        })
            .then((res) => res.json())
            .then((data) => data)
            .then((data) => {
                alert("Turno Anulado con Exito!!")
                this.componentDidMount()
            })
            .catch((err) => console.log('err', err));

    }

    realizarTurno = (e) => {

        fetch(gsUrlApi + '/turnos/modificar/', {
            method: 'POST',
            body: JSON.stringify({ _id: e._id, Estado: "Realizado" }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                Accept: 'application/json;'
            }
        })
            .then((res) => res.json())
            .then((data) => data)
            .then((data) => {
                alert("Turno Realizado con Exito!!")
                this.componentDidMount()
            })
            .catch((err) => console.log('err', err));

    }

    render() {
        return (
            <div>
                {this.state.EstadoForm
                    ?
                    <FusePageCarded
                        header={
                            <HeaderMaestro
                                MostrarFormulario={data => this.MostrarFormulario(data)}

                                Consultar={data => this.Consultar(data)}
                            />
                        }
                        content={
                            <>
                                <TablaPrincipal
                                    MostrarFormulario={data => this.MostrarFormulario(data)}
                                    anularTurno={data => this.anularTurno(data)}
                                    realizarTurno={data => this.realizarTurno(data)}
                                    DataTable={this.state.ListaVersiones}
                                />
                                <ToastContainer
                                    position="bottom-right"
                                    autoClose={5000}
                                />
                            </>
                        }
                    />
                    : <>
                        <Formulario
                            MostrarFormulario={data => this.MostrarFormulario(data)}
                            data={this.state.DataEdict}
                        />
                    </>
                }
            </div>
        );
    }

}

export default Turnos; 