import React from 'react';
import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import ButtonGroup from '@fuse/core/GroupButton/Button';

let Interface = "";

function ToolbarLayout1(props) {

    Interface = JSON.parse(localStorage.getItem('Interface'));

    const Cancelar = data => {
        props.MostrarFormulario(data)
    }
    const Guardar = () => {
        props.Guardar()
    }

    return (
        <div className="flex  w-full items-center justify-between"
          
        >
            <div className="flex items-center">
                <Icon className="">
                    {Interface ? Interface.icon : ""}
                </Icon>

                <Typography className="hidden sm:flex mx-0 sm:mx-12 ml-3 " variant="h4">
                    {Interface ? Interface.translate : ""}
                </Typography>

            </div>
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
            >
               <ButtonGroup 
				Cancelar={data => Cancelar(data) }
				EstadoCancelar={props.EstadoCancelar}
				EstadoGuardar={props.EstadoGuardar}
				Guardar={() => Guardar() }
			/>
               
            
            </motion.div>
        </div>
    );
}

export default React.memo(ToolbarLayout1);
