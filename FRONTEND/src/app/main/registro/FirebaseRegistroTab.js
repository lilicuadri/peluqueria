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
import { result } from 'lodash';

/**
 * Form Validation Schema
 */

function FirebaseRegistroTab(props) {
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
        let ObjUsuario = {};
        ObjUsuario.Nombre = state.Nombre;
        ObjUsuario.Apellido = state.Apellido;
        ObjUsuario.Empresa = '5cac12055d717e661ea7b95b';
        ObjUsuario.Rol = '6389757429b40122846ae51c';
        ObjUsuario.Login = state.Usuario;
        ObjUsuario.Clave = state.password;
        ObjUsuario.Celular = state.Celular;

        if (!state.Nombre || !state.Apellido || !state.Usuario || !state.password || !state.Celular) {
            alert('Debe llenar todos los campos para completar el registro');
        } else {
            console.log();
            fetch(gsUrlApi + '/usuarios/insertar/', {
                method: 'POST',
                body: JSON.stringify(ObjUsuario),
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    Accept: 'application/json'
                }
            })
                .then((res) => res.json())
                .then((data) => data)
                .then((data) => {
                    if (data.Error === false) {
                        alert('Datos Guardado');
                    }
                })
                .catch((err) => console.log('err', err));
        }
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
                        id="Nombrec"
                        name="Nombre"
                        label="Nombre"
                        onChange={handleChange}
                        variant="outlined"
                        className="mb-10"
                        required
                    />
                    <TextField
                        id="Apellido"
                        name="Apellido"
                        onChange={handleChange}
                        label="Apellido"
                        variant="outlined"
                        className="mb-10"
                        required
                    />
                    <TextField
                        id="Celular"
                        name="Celular"
                        type="number"
                        label="Celular"
                        onChange={handleChange}
                        variant="outlined"
                        className="mb-10"
                        required
                    />
                    <TextField
                        id="Usuario"
                        name="Usuario"
                        label="Usuario"
                        onChange={handleChange}
                        variant="outlined"
                        className="mb-10"
                        required
                    />

                    <TextField
                        className="mb-16"
                        type="password"
                        name="password"
                        label="Contraseña"
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
                    <div style={{ display: 'flex', gap: '2rem' }}>
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
                            Registrarse
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            className=" mx-auto normal-case mt-16 mb-16"
                            aria-label="LOG IN"
                            disabled={!isFormValid}
                            value="firebase"
                            href="./home"
                        >
                            Cancelar
                        </Button>
                    </div>
                </Formsy>
            </div>
        );
    }
}

export default FirebaseRegistroTab;
