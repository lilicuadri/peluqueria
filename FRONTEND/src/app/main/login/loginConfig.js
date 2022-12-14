import { authRoles } from 'app/auth';
import Login from './login';

const LoginConfig = {
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
      path: '/login',
      component: Login,
    },
  ],
};

export default LoginConfig;
