import FuseScrollbars from '@fuse/core/FuseScrollbars';
import Icon from '@mui/material/Icon';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TableHead from '@mui/material/TableHead';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import './App.css';
import { confirmAlert } from 'react-confirm-alert';
import moment from 'moment';
import { Button, CardActionArea, CardActions } from '@mui/material';

const rows = [
    {
        id: 'Fecha',
        align: 'left',
        disablePadding: false,
        label: 'Fecha-Hora registro',
        sort: true
    },

    {
        id: 'Hora',
        align: 'left',
        disablePadding: false,
        label: 'Fecha-Hora turno',
        sort: true
    },
    {
        id: 'Nombre_Servicio',
        align: 'left',
        disablePadding: false,
        label: 'Nombre',
        sort: true
    },
    {
        id: 'Valor',
        align: 'right',
        disablePadding: false,
        label: 'Valor',
        sort: true
    },
    {
        id: 'Acciones',
        align: 'right',
        disablePadding: false,
        label: 'Acciones',
        sort: true
    }
];
function ProductsTable(props) {
    const dispatch = useDispatch();

    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [order, setOrder] = useState({
        direction: 'asc',
        id: null
    });

    const createSortHandler = (property) => (event) => {
        handleRequestSort(event, property);
    };

    useEffect(() => { }, [dispatch]);
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

    const alertaEliminar = (item) => {
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
        props.MostrarFormulario(item);
        // props.history.push(`/apps/e-commerce/products/${item.id}/${item.handle}`);
    }

    function handleChangePage(event, value) {
        setPage(value);
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(event.target.value);
    }

    function MyComponent(props) {
        const formattedDate = moment(props.dateString).format('DD/MM/YYYY');
        return <div>{formattedDate}</div>;
    }

    return (
        <Fragment>
            <div className="right-panel roe-box-shadow">
                <div className="contact-table">
                    <Table hover className="mb-0 border">
                        <thead className="">
                            <tr>
                                <th height="10">Fecha-Hora registro</th>
                                <th>Fecha-Hora turno</th>
                                <th>Nombre Servicio</th>
                                <th>Precio</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {_.orderBy(
                                props.DataTable,
                                [
                                    (o) => {
                                        switch (order.code) {
                                            case 'categories': {
                                                return o.categories[0];
                                            }
                                            default: {
                                                return o[order.id];
                                            }
                                        }
                                    }
                                ],
                                [order.direction]
                            )
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((n) => {
                                    const isSelected = selected.indexOf(n.code) !== -1;
                                    return (
                                        <tr key={n._id}>
                                            <td className="text-center" style={{ width: '119px' }}>
                                                {n.Fecha.substring(0, 10) + ' Hora: ' + n.Fecha.substring(11, 15)}
                                            </td>
                                            <td className="text-center" style={{ width: '100px' }}>
                                                {n.Hora}
                                            </td>
                                            <td className="text-center" style={{ width: '100px' }}>
                                                {n.Nombre_Servicio}
                                            </td>
                                            <td className="text-center" style={{ width: '100px' }}>
                                                {n.Precio}
                                            </td>
                                            <td className="text-center" style={{ width: '100px' }}>
                                                <span className="icon-hover">
                                                    {n.Estado
                                                        ? <>{n.Estado == "Anulado" ? <Button size="small" disabled variant="contained" color="warning">
                                                        Turno Anulado
                                                    </Button> : <Button size="small" disabled variant="contained" color="info">
                                                        Turno Realizado
                                                    </Button>}</>
                                                        : <Icon onClick={() => alertaEliminar(n)} className="text-red pl-sm-2 ">
                                                            delete
                                                        </Icon>}

                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </Table>
                </div>
            </div>
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
        </Fragment>
    );
}
export default withRouter(ProductsTable);
