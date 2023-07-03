import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import AppBar from '../components/AppBar';
import Toolbar from '../components/Toolbar';
import LanguageSwitcher from 'app/fuse-layouts/shared-components/LanguageSwitcher';
import AdjustFontSize from 'app/fuse-layouts/shared-components/AdjustFontSize';
import FullScreenToggle from 'app/fuse-layouts/shared-components/FullScreenToggle';
import QuickPanelToggleButton from 'app/fuse-layouts/shared-components/quickPanel/QuickPanelToggleButton';

const rightLink = {
    fontSize: 16,
    color: 'common.white',
    ml: 3
};

function AppAppBar() {
    return (
        <div>
            <AppBar position="fixed">
                <Toolbar style={{ backgroundColor: 'white' }} sx={{ justifyContent: 'space-between' }}>
                    <LanguageSwitcher />
                    <AdjustFontSize />
                    <FullScreenToggle />

                    <Box sx={{ flex: 1 }} />
                    <Link
                        variant="h6"
                        underline="none"
                        /*  color="primary" */
                        style={{ color: '#ff3366', textDecoration: 'none' }}
                        href="/home"
                        sx={{ fontSize: 24 }}
                    >
                        {'Peluquería Saloom'}
                    </Link>
                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                        <Link
                            style={{ color: '#ff3366', textDecoration: 'none' }}
                            color="inherit"
                            variant="h3"
                            underline="none"
                            href="/Login"
                            sx={rightLink}
                        >
                            {'Iniciar sesión'}
                        </Link>
                        <Link
                            style={{ color: '#ff3366', textDecoration: 'none' }}
                            variant="h3"
                            underline="none"
                            href="./Registro"
                            sx={{ ...rightLink, color: 'secondary.main' }}
                        >
                            {'registrarse'}
                        </Link>
                    </Box>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </div>
    );
}

export default AppAppBar;
