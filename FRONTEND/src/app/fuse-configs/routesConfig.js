import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils'; 
import FuseLoading from '@fuse/core/FuseLoading';
import Error404Page from 'app/main/404/Error404Page';
import LoginConfig from 'app/main/login/loginConfig'; 
import UsuarioConfig from 'app/main/usuarios/UsuarioConfig';
import EmpresaConfig from 'app/main/empresa/EmpresaConfig';
import RolesConfig from 'app/main/roles/RolesConfign'; 
import LiquidosConfig from 'app/main/liquidos/LiquidosConfig';
import ServiciosConfig from 'app/main/servicios/ServiciosConfig';
import MedicamentosConfig from 'app/main/medicamentos/MedicamentosConfig'; 

const routeConfigs = [ 
  LoginConfig, 
  UsuarioConfig,
  EmpresaConfig,
  RolesConfig,
  LiquidosConfig,
  MedicamentosConfig,
  ServiciosConfig
];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, null), 
  {
    exact: true,
    path: '/login',
    component: () => <Redirect to={<LoginConfig/>} />,
  }, 
  {
    exact: true,
		path:'/',
		component: () => <Redirect to="/Empresa" />
	},
  {
    exact: true,
		path:'/',
		component: () => <Redirect to="/Roles" />
	}, 
  {
    exact: true,
		path:'/',
		component: () => <Redirect to="/Medicamentos" />
	},   
  {
    exact: true,
		path:'/',
		component: () => <Redirect to="/Liquidos"/>
  },
    {
    exact: true,
		path:'/',
		component: () => <Redirect to="/ServiciosConfig"/>
	},
  {
    path: '/loading',
    exact: true,
    component: () => <FuseLoading />,
  },
  {
    path: '/404',
    component: () => <Error404Page />,
  },
  {
    component: () => <Redirect to="/404" />,
  },
 
];

export default routes;
