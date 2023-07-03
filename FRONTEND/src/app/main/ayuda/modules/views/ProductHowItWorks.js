import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '../components/Button';
import Typography from '../components/Typography';

const item = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    px: 5
};

const number = {
    fontSize: 24,
    fontFamily: 'default',
    color: 'secondary.main',
    fontWeight: 'medium'
};

const image = {
    height: 55,
    my: 4
};

function ProductHowItWorks() {
    return (
        <Box component="section" sx={{ display: 'flex', bgcolor: 'secondary.light', overflow: 'hidden' }}>
            <Container
                sx={{
                    mt: 10,
                    mb: 15,
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Box
                    component="img"
                    src="/static/themes/onepirate/productCurvyLines.png"
                    alt="curvy lines"
                    sx={{
                        pointerEvents: 'none',
                        position: 'absolute',
                        top: -180,
                        opacity: 0.7
                    }}
                />
                <Typography variant="h4" marked="center" component="h2" sx={{ mb: 14 }}>
                    AYUDA
                </Typography>
                <div>
                    <Grid container spacing={5}>
                        <Grid item xs={12} md={4}>
                            <Box sx={item}>
                                <Box sx={number}>1.Iniciar sesión o registrarse</Box>
                                <Box
                                    component="img"
                                    src="assets/images/avatars/inicio.jpg"
                                    alt="suitcase"
                                    sx={(image, { height: 180, width: 400 })}
                                />
                                <Typography variant="h8" align="center">
                                    Puedes iniciar sesión desde la pagina principal en la parte superir derecha presionando el boton iniciar
                                    sesión o registras.Tambien se puede subir el tamaño de la letra
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box sx={item}>
                                <Box sx={number}>2. Iniciar sesión</Box>
                                <Box
                                    component="img"
                                    src="assets/images/avatars/sesión.jpg"
                                    alt="graph"
                                    sx={(image, { height: 180, width: 400 })}
                                />
                                <Typography variant="h8" align="center">
                                    Coloca tu usuario y contraseña y presionar el boton iniciar sesión, si no tienes cuenta presiona el
                                    boton registrarse. Tambien se puede subir el tamaño de la letra.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box sx={item}>
                                <Box sx={number}>3.Registrarse</Box>
                                <Box
                                    component="img"
                                    src="assets/images/avatars/registrate.jpg"
                                    alt="clock"
                                    sx={(image, { height: 180, width: 400 })}
                                />
                                <Typography variant="h8" align="center">
                                    {
                                        'Llena el formulario con los datos que se soliciten, presiona registrase para guardar la información. '
                                    }
                                    {'Si no desea registrarse presione el boton cancelar.'}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box sx={item}>
                                <Box sx={number}>4. Agendar turno</Box>
                                <Box
                                    component="img"
                                    src="assets/images/avatars/agendar.png"
                                    alt="clock"
                                    sx={(image, { height: 180, width: 400 })}
                                />
                                <Typography variant="h8" align="center">
                                    {'Luego que se inicie sesión, puede agendar un turno, se dirige al menú presiona agendar turno. '}
                                    {'Se listan los servios, puede buscar o seleccionar el servicio preseionando el boto "Agendar turno".'}
                                    {
                                        'Luego, selecciona la fecha y hora del servicio, se da un listado de la agenda disponible y presione "Reservar turno"'
                                    }
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box sx={item}>
                                <Box sx={number}>5.Mis turnos</Box>
                                <Box
                                    component="img"
                                    src="assets/images/avatars/turnos.jpg"
                                    alt="clock"
                                    sx={(image, { height: 180, width: 400 })}
                                />
                                <Typography variant="h8" align="center">
                                    {'En el menú izquierdo sale la opción de "mis turnos" donde puede verificar el turno agendado. '}
                                    {'Tambien verificar si fue realizado, o anulado el turno.'}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box sx={item}>
                                <Box sx={number}>6.Perfil</Box>
                                <Box
                                    component="img"
                                    src="assets/images/avatars/perfil.jpg"
                                    alt="clock"
                                    sx={(image, { height: 180, width: 400 })}
                                />
                                <Typography variant="h8" align="center">
                                    {
                                        'En el menú izquierdo sale la opción de "Perfil", donde puede verificar la información que sumistraron al registrarse. '
                                    }
                                    {'Puede modificar alguna información y presionar el boton "Guardar".'}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </Box>
    );
}

export default ProductHowItWorks;
