import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import FuseLoading from '@fuse/core/FuseLoading';
import Error404Page from 'app/main/404/Error404Page';
import LoginConfig from 'app/main/login/loginConfig';
import UsuarioConfig from 'app/main/usuarios/UsuarioConfig';
import EmpresaConfig from 'app/main/empresa/EmpresaConfig';
import RolesConfig from 'app/main/roles/RolesConfign';
import ServiciosConfig from 'app/main/servicios/ServiciosConfig';
import TurnosConfig from 'app/main/turnos/TurnosConfig';
import RegistroConfig from 'app/main/registro/RegistroConfig';
import ConogramaConfig from 'app/main/cronograma/CronogramaConfig';
import homeConfig from 'app/main/login/homeConfig';
import PerfilConfig from 'app/main/perfil/PerfilConfig';
import Misturnos from 'app/main/misturnos/MisturnosConfig';
import GestionTurnosConfig from 'app/main/gestionarTurnos/TurnosConfig';
import ContraseñaConfig from 'app/main/contraseña/contraseñaConfig';
import ayudaConfig from 'app/main/ayuda/ayudaConfig';

const routeConfigs = [
    LoginConfig,
    UsuarioConfig,
    EmpresaConfig,
    RolesConfig,
    TurnosConfig,
    ServiciosConfig,
    RegistroConfig,
    ConogramaConfig,
    homeConfig,
    PerfilConfig,
    Misturnos,
    GestionTurnosConfig,
    ContraseñaConfig,
    ayudaConfig
];

const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs, null),
    {
        exact: true,
        path: '/login',
        component: () => <Redirect to={<LoginConfig />} />
    },
    {
        exact: true,
        path: '/',
        component: () => <Redirect to={<homeConfig />} />
    },
    {
        exact: true,
        path: '/Roles',
        component: () => <Redirect to="/Roles" />
    },
    {
        exact: true,
        path: '/Turnos',
        component: () => <Redirect to="/Turnos" />
    },
    {
        exact: true,
        path: '/Cronograma',
        component: () => <Redirect to="/Cronograma" />
    },
    {
        exact: true,
        path: '/Servicios',
        component: () => <Redirect to="/Servicios" />
    },
    {
        exact: true,
        path: '/registro',
        component: () => <Redirect to="/registro" />
    },
    {
        exact: true,
        path: '/Perfil',
        component: () => <Redirect to="/Perfil" />
    },
    {
        exact: true,
        path: '/GestionarTurnos',
        component: () => <Redirect to="/GestionarTurnos" />
    },
    {
        path: '/loading',
        exact: true,
        component: () => <FuseLoading />
    },
    {
        path: '/Misturnos',
        exact: true,
        component: () => <Misturnos />
    },
    {
        exact: true,
        path: '/contraseña',
        component: () => <Redirect to="/contraseña" />
    },
    {
        exact: true,
        path: '/ayuda',
        component: () => <Redirect to="/ayuda" />
    },
    {
        path: '/404',
        component: () => <Error404Page />
    },
    {
        component: () => <Redirect to="/404" />
    }
];

export default routes;
