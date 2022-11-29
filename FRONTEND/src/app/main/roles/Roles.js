import React from 'react';
import FusePageCarded from '@fuse/core/FusePageCarded';
import FormRoles from './FormRoles';
import HeaderMaestro from '@fuse/core/Headers/HeaderMaestro';
import RolesTable from './TableRoles';
import { gsUrlApi } from "../../../configuracion/ConfigServer";

class TableRoles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ListRoles: [],
            EstadoForm: false,
            DataRol: [],
            Action: "",

        }
    }

    componentDidMount() {

        var objSesion = JSON.parse(localStorage.getItem('Usuario'));
        let sIdEmpresa = objSesion.Usuario.Empresa;
        fetch(gsUrlApi + '/roles/listar/' + sIdEmpresa, {
            method: 'GET',
            body: JSON.stringify(),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json',
            }
        }).then(res => res.json())
            .then(data => data)
            .then((data) => {
                var lstDatos = data.datos;
                this.setState(state => ({
                    ...state, ListRoles: lstDatos
                }))
            })
            .catch(err => console.log("err", err));

    }

    Consultar = data => {
        let filtro = data.target.value;
        var objSesion = JSON.parse(localStorage.getItem('Usuario'));
        let sIdEmpresa = objSesion.Usuario.Empresa;

        fetch(gsUrlApi + '/roles/consultar/', {
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
                    ...state, ListRoles: data.datos

                }))
            })
            .catch(err => console.log("err", err));
    }

    MostrarFormulario(e) {
        this.setState({ EstadoForm: !this.state.EstadoForm });
        if (e === "Nuevo") {
            this.setState(state => ({
                ...state, editedContent: []
            }))
        } else if (e === "Cargar") {
            this.componentDidMount()
        } else if (e === "Guardado") {
            this.componentDidMount()
        } else if (e._id) {
            this.setState(state => ({
                ...state, editedContent: e
            }))
        }
    }

    render() {
        return (
            <>
                <div>
                    {this.state.EstadoForm
                        ? <>
                            <FormRoles
                                data={this.state.editedContent}
                                MostrarFormulario={data => this.MostrarFormulario(data)} 
                            />
                        </>
                        :
                        <>
                            <FusePageCarded
                                classes={{
                                    content: 'flex',
                                    header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
                                }}
                                header={
                                    <HeaderMaestro
                                        MostrarFormulario={data => this.MostrarFormulario(data)}
                                        Consultar={data => this.Consultar(data)}
                                    />
                                }
                                content={
                                    <RolesTable
                                        MostrarFormulario={data => this.MostrarFormulario(data)}
                                        DataTable={this.state.ListRoles}
                                    />
                                }

                            />
                        </>
                    }
                </div>
            </>
        );
    }
}

export default TableRoles;