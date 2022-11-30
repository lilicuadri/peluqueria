import { motion } from 'framer-motion';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import _ from '@lodash';
import FirebaseLoginTab from './FirebaseLoginTab';
import Header from './header'
/**
 * Validamos la informacion
 */


const Login = props => {

  return (
    <div className="flex flex-col flex-auto p-16 sm:p-24 md:flex-row md:p-0 overflow-hidden">
      <div className="flex flex-col flex-grow-0 items-center p-16 text-center md:p-128 md:items-start md:flex-shrink-0 md:flex-1 md:text-left"
      >
      
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1, transition: { delay: 0.1 } }}
        >
          {/* <img className="w-128 mb-32" src="assets/images/logos/fuse.svg" alt="logo" /> */}
          <div className="w-190 mb-40"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
        >
          <Typography className="text-32 sm:text-44 font-semibold leading-tight">
            Peluqueria Saloom 
          </Typography>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }}>
          <Typography variant="subtitle1" className="mt-32 font-medium">
          Tu sistema ideal para tener un servicio adecuado.
          </Typography>
        </motion.div>
      </div>

      <Card
        component={motion.div}
        initial={{ x: 200 }}
        animate={{ x: 0 }}
        transition={{ bounceDamping: 0 }}
        className="w-full max-w-400 mx-auto m-16 md:m-0 rounded-20 md:rounded-none"
        square
        layout
      >
        <CardContent className="flex flex-col items-center justify-center p-16 sm:p-32 md:p-48 md:pt-128 ">
          <Typography variant="h6" className="mb-24 font-semibold text-18 sm:text-24">
            Iniciar Sesión
          </Typography>
          <FirebaseLoginTab/>

        </CardContent>
      </Card>
    </div>
  );
}

export default Login;