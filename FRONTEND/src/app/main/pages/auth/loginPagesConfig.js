import { lazy } from 'react';

const LoginConfig = {
    setting: {
        layout:{
            config:{},
        },
    },
    routes: [
        {
            path: '/pages/auth/login',
            component: lazy(() => import('./loginPages'))
        }
    ]
}

export default LoginConfig;