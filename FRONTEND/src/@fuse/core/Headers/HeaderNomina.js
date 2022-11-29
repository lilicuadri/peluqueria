import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import Input from '@mui/material/Input';
import Paper from '@mui/material/Paper';
import { ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React from 'react';
import { motion } from 'framer-motion';

let Interface = "";
class ProductsHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Interface: ""
        }
    }
    componentDidMount = () => {
        var ObjInterface = JSON.parse(localStorage.getItem('Interface'));
        if (ObjInterface) {
            Interface = ObjInterface
        }
    }
    NuevoRol = () => {
        this.props.MostrarFormulario("Nuevo")
    }
    InicializarPreload = () => {
        this.props.InicializarPreload()
    }
    render() {
        return (
            <div className="flex flex-1 w-full items-center justify-between">
                <div className="flex items-center">

                    <Icon className="text-32">
                        {Interface.icon}
                    </Icon>

                    <Typography className="hidden sm:flex mx-0 sm:mx-12 ml-3" variant="h4">
                        {Interface.translate}
                    </Typography>

                </div>

                <div className="flex flex-1 items-center justify-center px-12" >
                    <ThemeProvider >
                       
                            <Paper
                                style={{ background: 'white' }}
                                component={motion.div}
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
                                className="flex items-center w-full max-w-512 px-8 py-4 rounded-16 shadow"
                            >

                                <Icon color="action" style={{ color: 'black' }}>search</Icon>

                                <Input
                                    placeholder="Buscar"
                                    className="flex flex-1 mx-8"
                                    disableUnderline
                                    fullWidth
                                    style={{ color: 'black' }}
                                    value={this.state.searchText}
                                    inputProps={{
                                        'aria-label': 'Search'
                                    }}
                                    onChange={ev => this.props.Consultar(ev)}
                                />

                            </Paper>
                        
                    </ThemeProvider>
                </div>
                {this.props.Enviar ?
                    <Button
                        onClick={this.Nuevo}
                        variant="contained"
                        onClick={() => this.props.EnviarCorreos()}
                        color="secondary"
                    >
                        <span className="">Enviar Correos</span>
                    </Button>
                    : ""}
                {this.props.Reenviar ?
                    <Button
                        variant="contained"
                        onClick={this.InicializarPreload}
                        color="secondary"
                    >
                        <span className="">Enviar Nominas</span>
                    </Button>
                    : ""}

            </div>
        );
    }

}

export default ProductsHeader