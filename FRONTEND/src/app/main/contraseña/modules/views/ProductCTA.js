import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import TextField from '../components/TextField';
import Snackbar from '../components/Snackbar';
import Button from '../components/Button';

function ProductCTA() {
    const [open, setOpen] = React.useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container component="section" sx={{ mt: 10, display: 'flex' }}>
            <Grid container>
                <Grid item xs={12} md={6} sx={{ zIndex: 1 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            bgcolor: 'warning.main',
                            py: 8,
                            px: 3
                        }}
                    >
                        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400 }}>
                            <Typography variant="h4" component="h2" gutterBottom>
                                LO QUE ENCUENTRAS EN LA PELUQUERÍA
                            </Typography>
                            <Typography variant="h7">
                                Un espacio dedicado a hombres, mujeres y niños. Donde podrás acceder a los mas altos estándares de belleza y
                                calidad, con las últimas tendencias
                            </Typography>

                            <Button type="submit" color="primary" variant="contained" href="/Login" sx={{ width: '100%' }}>
                                INICIAR SESIÓN
                            </Button>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} sx={{ display: { md: 'block', xs: 'none' }, position: 'relative' }}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: -67,
                            left: -67,
                            right: 0,
                            bottom: 0,
                            width: '100%',
                            background: 'url(/static/themes/onepirate/productCTAImageDots.png)'
                        }}
                    />

                    <Box
                        component="img"
                        src="assets/images/avatars/papel.jpg"
                        alt="call to action"
                        sx={{
                            position: 'absolute',
                            top: -28,
                            left: -28,
                            right: 0,
                            bottom: 0,
                            width: '100%',
                            maxWidth: 600
                        }}
                    />
                </Grid>
            </Grid>
        </Container>
    );
}

export default ProductCTA;
