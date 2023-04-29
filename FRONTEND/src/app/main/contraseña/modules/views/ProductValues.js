import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

function ProductValues() {
  return (
    <Box
      component="section"
      sx={{ display: 'flex', overflow: 'hidden', bgcolor: 'secondary.light' }}
    >
      <Container sx={{ mt: 15, mb: 30, display: 'flex', position: 'relative' }}>
        <Box
          component="img"
          src="../images/papel.jpg"
          alt="curvy lines"
          sx={{ pointerEvents: 'none', position: 'absolute', top: -180 }}
        />
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src="assets/images/avatars/mujer.jpg"
                alt="DAMAS"
                sx={{ height: 132 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
               DAMAS
              </Typography>
              <Typography variant="h5">
                {
                  'Como mujer el deseo de verse cada día más linda se ha convertido en un reto'
                }

                {
                  ' , en la peluquería Saloom tendrás la oportunidad de verte espectacular con nuestros servicios.'
                }
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src="assets/images/avatars/caballero.jpg"
                alt="CABALLERO"
                sx={{ height: 132 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
                CABALLEROS
              </Typography>
              <Typography variant="h5">
                {
                  'Ser un caballero también se lleva en su aspecto físico, '
                }

                {'Tenemos los servicios de alta calidad para ustedes.'}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src="assets/images/avatars/niños.jpg"
                alt="NIÑOS"
                sx={{ height: 136 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
                NIÑAS Y NIÑOS
              </Typography>
              <Typography variant="h5">
                {'Los niños también hacen parte de esta peluquería.  '}
                {'Dale la oportunidad a tus niños que vivan una experiencia con nosotros.'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ProductValues;