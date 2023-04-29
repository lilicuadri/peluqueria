import { authRoles } from 'app/auth';
import Contarseña from './home';

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
            path: '/home',
            component: Contarseña
        }
    ]
};

export default contraseñaConfig;
