import { authRoles } from 'app/auth';
import Registro from './registro';

const RegistroConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
        },
        toolbar: {
          display: false,
        },
        footer: {
          display: false,
        },
        leftSidePanel: {
          display: false,
        },
        rightSidePanel: {
          display: false,
        },
      },
    },
  },
 auth: authRoles.onlyGuest, 
 /* auth: authRoles.admin, */
  routes: [
    {
      path: '/registro',
      component: Registro,
    },
  ],
};

export default RegistroConfig;
