import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { gsUrlApi, JsonNomina } from '../../../configuracion/ConfigServer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TableHead from '@mui/material/TableHead';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import './App.css';
import { confirmAlert } from 'react-confirm-alert';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
const rows = [
];
function ProductsTable(props) {
    const dispatch = useDispatch();

    const [ArrayServicios, setArrayServicios] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [order, setOrder] = useState({
        direction: 'asc',
        id: null
    });

    const createSortHandler = property => event => {
        handleRequestSort(event, property);
    };

    useEffect(() => {
        
    }, [dispatch]);
    function handleRequestSort(event, property) {
        const id = property;
        let direction = 'desc';

        if (order.id === property && order.direction === 'desc') {
            direction = 'asc';
        }

        setOrder({
            direction,
            id
        });
    }

    const alertaEliminar = item => {
        confirmAlert({
            title: 'Eliminar registro',
            message: '¿Desea eliminar el registro seleccionado?',
            buttons: [
                {
                    label: 'Si',
                    onClick: () => props.Eliminar(item)

                },
                {
                    label: 'No',
                    onClick: () => 'Click no'
                }
            ]
        });
    };


    function handleClick(item) {
        props.MostrarFormulario(item)
        // props.history.push(`/apps/e-commerce/products/${item.id}/${item.handle}`);
    }


    function handleChangePage(event, value) {
        setPage(value);
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(event.target.value);
    }

    return (
        <div clasName="cardbody">
            <div className="w-full flex flex-col" >
                <FuseScrollbars className="flex-grow overflow-x-auto">
                    {props.DataTable.map((item, key) => {
                        return (
                            <div className='row'>

                                <Card sx={{ maxWidth: 1087 }} className="m-auto mb-5">
                                    <CardActionArea style={{ display: "inline-flex", justifyContent: "space-between" }}>
                                        <div style={{ display: "inline-flex" }}>
                                            <Avatar
                                                style={{ marginTop: "35px", marginLeft: "26px" }}
                                                alt="Remy Sharp"
                                                src="assets/images/avatars/logo.jpg"
                                                sx={{ width: 56, height: 56 }}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    {'Cliente: ' + item.Usuario}
                                                </Typography>
                                                <Typography variant="h7" color="text.secondary">
                                                    {"FECHA: "}
                                                    {item.Fecha ? item.Fecha.substr(0, 10) : ""}
                                                    {" HORA: "}
                                                    {item.Hora ? item.Hora.substr(11) : ""}
                                                </Typography>
                                                <Typography gutterBottom variant="h7" component="div">
                                                    {"SERVICIO: " + item.Nombre_Servicio}
                                                </Typography>
                                                <Typography gutterBottom variant="h7" component="div">
                                                    {"PRECIO: $ " + item.Precio}
                                                </Typography>
                                            </CardContent>
                                        </div>


                                        <CardActions style={{ minWidth: "139px" }}>
                                            {!["Anulado", "Realizado"].includes(item.Estado)
                                                ? <> <Button size="small" onClick={() => props.anularTurno(item)} variant="contained" color="error">
                                                    Anular
                                                </Button>
                                                    <Button size="small" onClick={() => props.realizarTurno(item)} variant="contained" color="success">
                                                        Marcar Realizado
                                                    </Button></>
                                                : <>{item.Estado == "Anulado" ? <Button size="small" disabled variant="contained" color="warning">
                                                    Turno Anulado
                                                </Button> : <Button size="small" disabled variant="contained" color="info">
                                                    Turno Realizado
                                                </Button>}</>}
                                        </CardActions>
                                    </CardActionArea>

                                </Card>
                            </div>
                        );
                    })}
                </FuseScrollbars>
                <TablePagination
                    className="overflow-hidden"
                    component="div"
                    count={props.DataTable.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page'
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page'
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>
        </div>
    );
}
export default withRouter(ProductsTable);