import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import TextField from '../components/TextField';

const iconStyle = {
    width: 48,
    height: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'warning.main',
    mr: 1,
    '&:hover': {
        bgcolor: 'warning.dark'
    }
};

const LANGUAGES = [
    {
        code: 'en-US',
        name: 'English'
    },
    {
        code: 'fr-FR',
        name: 'Français'
    }
];

export default function AppFooter() {
    return (
        <Typography component="footer" sx={{ display: 'flex', bgcolor: 'secondary.light' }}>
            <Container sx={{ my: 8, display: 'flex' }}>
                <div>
                    <Typography sx={{ my: 3 }} variant="h6" marked="left" gutterBottom>
                        CONTACTOS
                    </Typography>
                </div>

                <Grid container spacing={5}>
                    <Grid item xs={6} sm={4} md={3}>
                        <Grid container direction="column" justifyContent="flex-end" spacing={2} sx={{ height: 120 }}></Grid>
                    </Grid>
                    <Grid item xs={6} sm={8} md={4}>
                        <Typography variant="h6" marked="left" gutterBottom>
                            Dirección
                        </Typography>
                        Carrera 7 #196 Bogotá
                        <Grid>
                            <Typography variant="h6" marked="left" gutterBottom>
                                Horario de atención
                            </Typography>
                            Lun-Sab 7 am- 7pm
                        </Grid>
                    </Grid>
                    <Grid item xs={6} sm={8} md={4}>
                        <Typography variant="h6" marked="left" gutterBottom>
                            Teléfono
                        </Typography>
                        3108033627
                    </Grid>
                </Grid>
            </Container>
        </Typography>
    );
}
