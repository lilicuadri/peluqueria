import DemoPerfil from '@fuse/core/Perfil/FormPerfil';
import React from 'react';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { gsUrlApi } from '../../../configuracion/ConfigServer'
import Alerta from '@fuse/core/DemoAlerta/Alertas';
import HeaderMaestro from '@fuse/core/Headers/HeaderMaestro';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Perfil extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            abierto: false,
            values: '',
            EstadoForm: true,
            TipoIdentificacion: '',
            Identificacion: '',
            Dv: '',
            rsocial: '',
            regimen: '',
            IdPais: '',
            NombreEspañol: '',
            IdMunicipio: '',
            Direccion: '',
            Celular: '',
            Telefono: '',
            Email: '',
            web: '',
            Estado: '',
            ListaVersiones: [],
            DataEdict: '',
            EstadoAlerta: false
        }

    }

    async componentDidMount() {
        var ObjeSesion = JSON.parse(localStorage.getItem('Usuario'));
        let Empresa = ObjeSesion.Usuario.Empresa;

        fetch(gsUrlApi + '/usuarios/listar/' + Empresa + "/", {
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
                    ...state, ListaVersiones: data.datos
                }))
            })
            .catch((err) => console.log("err", err));

    }




    render() {
        return (
            <DemoPerfil
                data={this.state.DataEdict}
            />
        );
    }

}

export default Perfil;