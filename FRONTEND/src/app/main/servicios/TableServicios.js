import FuseScrollbars from '@fuse/core/FuseScrollbars';
import Icon from '@mui/material/Icon';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom'; 
import TableHead from '@mui/material/TableHead';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import './App.css';
import { confirmAlert } from 'react-confirm-alert';
const rows = [
    {
        id: 'Codigo',
        align: 'left',
        disablePadding: false,
        label: 'Codigo',
        sort: true
    },
    {
        id: 'Nombre',
        align: 'left',
        disablePadding: false,
        label: 'Nombre',
        sort: true
    },
   {
        id: 'Descripcion',
        align: 'left',
        disablePadding: false,
        label: 'Descripción',
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
        id: 'Tipo',
        align: 'left',
        disablePadding: false,
        label: 'Tipo',
        sort: true
    },
    
      {
        id: 'Genero',
        align: 'left',
        disablePadding: false,
        label: 'Genero',
        sort: true
    },
        {
        id: 'Duracion',
        align: 'left',
        disablePadding: false,
        label: 'Duración',
        sort: true
    },
    {
        id: 'Imagen',
        align: 'right',
        disablePadding: false,
        label: 'Imagen',
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
        <div clasName= "cardbody">
            <div className="w-full flex flex-col" >
                <FuseScrollbars className="flex-grow overflow-x-auto">
                    <Table className="min-w-xl" stickyHeader aria-label="sticky table" aria-labelledby="tableTitle">
                        <TableHead>
                        <TableRow className="h-48 sm:h-64">
                            {rows.map(row => {
                                return (
                                    <TableCell
                                        key={row.id}
                                        align={row.align}
                                        padding={row.disablePadding ? 'none' : 'default'}
                                        sortDirection={order.id === row.id ? order.direction : false}
                                    >
                                        {row.sort && (
                                            <Tooltip
                                                title="Sort"
                                                placement={row.align === 'right' ? 'bottom-end' : 'bottom-start'}
                                                enterDelay={300}
                                            >
                                                <TableSortLabel
                                                    active={order.id === row.id}
                                                    direction={order.direction}
                                                    onClick={createSortHandler(row.id)}
                                                >
                                                    {row.label}
                                                </TableSortLabel>
                                            </Tooltip>
                                        )}
                                    </TableCell>
                                );
                            }, this)}
                        </TableRow>
                        </TableHead>


                        <TableBody>
                            {_.orderBy(
                                props.DataTable,
                                [
                                    o => {
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
                                .map(n => {
                                    const isSelected = selected.indexOf(n.code) !== -1;
                                    return (
                                        <TableRow
                                            className="h-64 cursor-pointer"
                                            hover
                                            role="checkbox"
                                            aria-checked={isSelected}
                                            tabIndex={-1}
                                            key={n._id}
                                            selected={isSelected}
                                        >
                                            <TableCell component="th" scope="row">
                                                {n.Codigo}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {n.Nombre}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {n.detalle_servicio}
                                            </TableCell>
                                            <TableCell component="th" scope="row" align="right">
                                                {n.Precio}
                                            </TableCell>
                                            <TableCell component="th" scope="row" >
                                                {n.tipo_Servicio}
                                            </TableCell>
                                            <TableCell component="th" scope="row" align="right">
                                                {n.genero}
                                            </TableCell>
                                            <TableCell component="th" scope="row" align="right">
                                                {n.duracion}
                                            </TableCell>
                                            <TableCell component="th" scope="row" align="right">
                                                {n.imagen}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
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