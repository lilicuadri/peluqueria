import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
//import { submitLoginWithFireBase } from 'app/auth/store/loginSlice';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import _ from '@lodash';
import { gsUrlApi } from 'configuracion/ConfigServer';
import Formsy from 'formsy-react';
import { Redirect } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { Link } from 'react-router-dom';
/**
 * Form Validation Schema
 */

function FirebaseContraseñaTab(props) {
    const login = useSelector(({ auth }) => auth.login);

    const [isFormValid, setIsFormValid] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [ValidacionUser, setValidacionUser] = useState(false);
    const [state, setState] = useState({
        username: '',
        password: ''
    });

    const formRef = useRef(null);

    useEffect(() => {
        if (login.error && (login.error.username || login.error.password)) {
            formRef.current.updateInputsWithError({
                ...login.error
            });
            disableButton();
        }
    }, [login.error]);

    function disableButton() {
        setIsFormValid(false);
    }

    function enableButton() {
        setIsFormValid(true);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value
        });
    };

    const handleSubmit = () => {
        fetch(gsUrlApi + '/usuarios/validarIngreso', {
            method: 'POST',
            body: JSON.stringify({ Login: state.username, Clave: state.password }),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                Accept: 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => data)
            .then(function Validar(data) {
                if (data.error) {
                    AlertaError();
                } else {
                    if (data.usuarios.length > 0) {
                        var objSesion = {};
                        objSesion.Usuario = data.usuarios[0];
                        localStorage.setItem('Usuario', JSON.stringify(objSesion));
                        setValidacionUser(!ValidacionUser);
                    } else {
                        AlertaLogin();
                    }
                }
            })
            .catch((err) => {
                console.log('err', err);
                AlertaError();
            });
    };

    const AlertaLogin = () => {
        alert('¿Usuario y contaseña no validos?');
    };

    const AlertaError = () => {
        alert('Error de inicio de sesión, Intente ingresar en otro momento');
    };

    const onClick = () => {};

    if (ValidacionUser === true) {
        return <Redirect to="/Servicios" />;
    } else {
        localStorage.removeItem('Usuario');

        return (
            <div className="w-full ">
                <Formsy
                    onValidSubmit={handleSubmit}
                    onValid={enableButton}
                    onInvalid={disableButton}
                    ref={formRef}
                    className="flex flex-col justify-center w-full"
                >
                    <TextField
                        className="mb-16"
                        type="text"
                        name="username"
                        label="Usuario"
                        onChange={handleChange}
                        validations={{
                            minLength: 4
                        }}
                        validationErrors={{
                            minLength: 'Min character length is 4'
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Icon className="text-20" color="action">
                                        person
                                    </Icon>
                                </InputAdornment>
                            )
                        }}
                        variant="outlined"
                        required
                    />

                    <TextField
                        className="mb-16"
                        type="password"
                        name="password"
                        label="Nueva Contraseña"
                        onChange={handleChange}
                        validations={{
                            minLength: 4
                        }}
                        validationErrors={{
                            minLength: 'Min character length is 4'
                        }}
                        InputProps={{
                            className: 'pr-2',
                            type: showPassword ? 'text' : 'password',
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                                        <Icon className="text-20" color="action">
                                            {showPassword ? 'visibility' : 'visibility_off'}
                                        </Icon>
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        variant="outlined"
                        required
                    />
                </Formsy>
                <div style={{ textAlign: 'center', marginTop: '15px' }}>
                    <Button
                        type="button"
                        variant="contained"
                        color="primary"
                        onClick={() => handleSubmit()}
                        className=" mx-auto normal-case mt-16 mb-16"
                        aria-label="LOG IN"
                        disabled={!isFormValid}
                        value="firebase"
                    >
                        Guardar
                    </Button>
                </div>
            </div>
        );
    }
}

export default FirebaseContraseñaTab;
