import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '../login/modules/components/Typography';
import AppFooter from '../login/modules/views/AppFooter';
import AppAppBar from '../login/modules/views/AppAppBar';
import AppForm from '../login/modules/views/AppForm';
import { email, required } from '../login/modules/form/validation';
import RFTextField from '../login/modules/form/RFTextField';
import FormButton from '../login/modules/form/FormButton';
import FormFeedback from '../login/modules/form/FormFeedback';
import withRoot from '../login/modules/withRoot';
import FirebaseLoginTab from './FirebaseContraseñaTab';

function SignIn() {
    const [sent, setSent] = React.useState(false);

    const validate = (values) => {
        const errors = required(['email', 'password'], values);

        if (!errors.email) {
            const emailError = email(values.email);
            if (emailError) {
                errors.email = emailError;
            }
        }

        return errors;
    };

    const handleSubmit = () => {
        setSent(true);
    };

    return (
        <React.Fragment>
            <AppAppBar />
            <AppForm>
                <React.Fragment>
                    <Typography variant="h4" gutterBottom marked="center" align="center">
                        RESTABLECER CONTRASEÑA
                    </Typography>
                </React.Fragment>
                <p style={{ align: 'left' }}>
                    *Por favor ingresa tu usuario registrado y la nueva contraseña. Luego haz clic en el botón "Guardar":
                </p>
                <br></br>
                <FirebaseLoginTab />
            </AppForm>
            <AppFooter />
        </React.Fragment>
    );
}

export default withRoot(SignIn);
