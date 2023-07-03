import FuseAuthorization from '@fuse/core/FuseAuthorization';
import FuseLayout from '@fuse/core/FuseLayout';
import FuseTheme from '@fuse/core/FuseTheme';
import history from '@history';
import { Router, useHistory } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { useSelector } from 'react-redux';
import rtlPlugin from 'stylis-plugin-rtl';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { selectCurrLangDir } from 'app/store/i18nSlice';
import withAppProviders from './withAppProviders';
import { Auth } from './auth';
// import { Redirect } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
// import { Alert } from 'flowbite-react';
import Swal from 'sweetalert2';

// import axios from 'axios';
/**
 * Axios HTTP Request defaults
 */
// axios.defaults.baseURL = "";
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';

const emotionCacheOptions = {
    rtl: {
        key: 'muirtl',
        stylisPlugins: [rtlPlugin],
        prepend: true
    },
    ltr: {
        key: 'muiltr',
        stylisPlugins: [],
        prepend: true
    }
};

const App = () => {
    const langDirection = useSelector(selectCurrLangDir);
    const [estadoTiempo, setRefreshValue] = useState(false);
    // const history2 = useHistory();
    useEffect(() => {
        let interval = null;

        const startTimer = () => {
            var inactiveTime = 0;
            interval = setInterval(() => {
                inactiveTime++;
                if (inactiveTime == 2) {
                    Swal.fire({
                        title: 'La sesion se va a cerrar, Desa extender el tiempo?',
                        showDenyButton: true,
                        confirmButtonText: 'Extender Tiempo',
                        denyButtonText: `No Extender Tiempo`
                    }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                            startTimer();
                        } else if (result.isDenied) {
                            setRefreshValue(true);
                        }
                    });
                }
            }, 30000);
        };

        const handleInteraction = () => {
            clearInterval(interval);
            var ObjSesion = JSON.parse(localStorage.getItem('Usuario'));
            if (ObjSesion) {
                startTimer();
            }
        };

        var ObjSesion = JSON.parse(localStorage.getItem('Usuario'));
        if (ObjSesion) {
            startTimer();
        }

        // Agrega los event listeners para detectar interacciones
        window.addEventListener('mousemove', handleInteraction);
        window.addEventListener('keydown', handleInteraction);
        window.addEventListener('mousedown', handleInteraction);
        window.addEventListener('touchstart', handleInteraction);

        return () => {
            // Limpia los event listeners al desmontar el componente
            window.removeEventListener('mousemove', handleInteraction);
            window.removeEventListener('keydown', handleInteraction);
            window.removeEventListener('mousedown', handleInteraction);
            window.removeEventListener('touchstart', handleInteraction);
            var ObjSesion = JSON.parse(localStorage.getItem('Usuario'));
            if (ObjSesion) {
                clearInterval(interval);
            }
        };
    }, []);
    if (estadoTiempo) {
        setRefreshValue(false);
        localStorage.removeItem('Usuario');
        history.push('/Login');
    }
    return (
        <CacheProvider value={createCache(emotionCacheOptions[langDirection])}>
            <Auth>
                <Router history={history}>
                    <FuseAuthorization>
                        <FuseTheme>
                            <SnackbarProvider
                                maxSnack={5}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right'
                                }}
                                classes={{
                                    containerRoot: 'bottom-0 right-0 mb-52 md:mb-68 mr-8 lg:mr-80 z-99'
                                }}
                            >
                                <FuseLayout />
                            </SnackbarProvider>
                        </FuseTheme>
                    </FuseAuthorization>
                </Router>
            </Auth>
        </CacheProvider>
    );
};

export default withAppProviders(App)();
