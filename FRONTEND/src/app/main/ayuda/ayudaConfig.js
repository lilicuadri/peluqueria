import { authRoles } from 'app/auth';
import Ayuda from './ayuda';

const LoginConfig = {
    settings: {
        layout: {
            config: {
                navbar: {
                    display: false
                },
                toolbar: {
                    display: false
                },
                footer: {
                    display: false
                },
                leftSidePanel: {
                    display: false
                },
                rightSidePanel: {
                    display: false
                }
            }
        }
    },
    auth: authRoles.onlyGuest,
    /* auth: authRoles.admin, */
    routes: [
        {
            path: '/ayuda',
            component: Ayuda
        }
    ]
};

export default LoginConfig;
