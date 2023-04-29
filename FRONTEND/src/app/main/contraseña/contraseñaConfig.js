import { authRoles } from 'app/auth';
import Contraseña from './contraseña';

const contraseñaConfig = {
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
            path: '/contraseña',
            component: Contraseña
        }
    ]
};

export default contraseñaConfig;
