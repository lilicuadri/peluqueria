import DemoServicio from '@fuse/core/Servicio/FormServicio';
import React from 'react';
import FusePageCarded from '@fuse/core/FusePageCarded';
import TableMisturnos from './TableMisturnos';
import { gsUrlApi } from '../../../configuracion/ConfigServer';
import Alerta from '@fuse/core/DemoAlerta/Alertas';
import HeaderMaestro from '@fuse/core/Headers/HeaderMaestro';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Misturnos extends React.Component {
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
        };
    }

    async componentDidMount() {
        var ObjeSesion = JSON.parse(localStorage.getItem('Usuario'));
        let Empresa = ObjeSesion.Usuario.Empresa;
        let _id = ObjeSesion.Usuario._id;

        fetch(gsUrlApi + '/turnos/listarMisTurno/' + Empresa + '/' + _id + '/', {
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

    Consultar = (data) => {
        let filtro = data.target.value;
        var ObjSesion = JSON.parse(localStorage.getItem('Usuario'));
        let sIdEmpresa = ObjSesion.Usuario.Empresa;

        fetch(gsUrlApi + '/usuarios/consultar/', {
            method: 'POST',
            body: JSON.stringify({ IdEmpresa: sIdEmpresa, search: filtro }),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                Accept: 'application/json'
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
    };

    Eliminar = (e) => {
        var objProductos = new Object();
        objProductos._id = e._id;
        fetch(gsUrlApi + '/usuarios/eliminar/', {
            method: 'POST',
            body: JSON.stringify(objProductos),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                Accept: 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => data)
            .then((data) => {
                this.componentDidMount();
            })
            .catch((err) => console.log('err', err));
    };
    MostrarFormulario(e) {
        if (e === 'Nuevo' || e === 'Cancelar') {
            this.setState((state) => ({
                ...state,
                DataEdict: ''
            }));
            this.setState({ EstadoForm: !this.state.EstadoForm });
        } else if (e === 'Cargar') {
            this.setState({ EstadoForm: !this.state.EstadoForm });

            this.componentDidMount();
        } else if (e === 'Guardado') {
            this.componentDidMount();
            this.setState((state) => ({
                ...state,
                DataEdict: ''
            }));
            this.setState((state) => ({
                ...state,
                EstadoAlerta: true
            }));
            this.setState({ EstadoForm: !this.state.EstadoForm });
        } else if (e._id) {
            this.setState((state) => ({
                ...state,
                DataEdict: e
            }));
            this.setState({ EstadoForm: !this.state.EstadoForm });
        }
    }

    render() {
        return (
            <div>
                {this.state.EstadoForm ? (
                    <FusePageCarded
                        /*  classes={{
                             content: 'flex',
                             header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
                         }} */
                        header={
                            <HeaderMaestro
                                MostrarFormulario={(data) => this.MostrarFormulario(data)}
                                Consultar={(data) => this.Consultar(data)}
                            />
                        }
                        content={
                            <>
                                <TableMisturnos
                                    MostrarFormulario={(data) => this.MostrarFormulario(data)}
                                    Eliminar={(data) => this.Eliminar(data)}
                                    DataTable={this.state.ListaVersiones}
                                />
                                <ToastContainer position="bottom-right" autoClose={5000} />
                            </>
                        }
                    />
                ) : (
                    <>
                        <DemoMisturnos MostrarFormulario={(data) => this.MostrarFormulario(data)} data={this.state.DataEdict} />
                    </>
                )}
            </div>
        );
    }
}

export default Misturnos;
