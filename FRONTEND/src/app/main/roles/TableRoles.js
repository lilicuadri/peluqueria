import _ from '@lodash';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
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


const rows = [
    {
        id: 'code',
        align: 'left',
        disablePadding: false,
        label: 'Codigo',
        sort: true
    },
    {
        id: 'name',
        align: 'left',
        disablePadding: false,
        label: 'Nombre',
        sort: true
    }
];

function ProdutsTable(props) {
    const dispatch = useDispatch();
    // const searchText = useSelector(({ eCommerceApp }) => eCommerceApp.products.searchText);

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
        // dispatch(Actions.getProducts());
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
        <div className="w-full flex flex-col" style={{ minHeight: '400px' }}>
            <FuseScrollbars className="flex-grow overflow-x-auto">
                <Table className="min-w-xl" stickyHeader aria-label="sticky table" aria-labelledby="tableTitle">
                    <TableHead>
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
                    </TableHead>


                    <TableBody>
                        {_.orderBy(
                            props.DataTable,
                            [
                                o => {
                                    switch (order.Codigo) {
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
                                return (
                                    <TableRow
                                        className="h-64 cursor-pointer"
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={n.Codigo}
                                        onClick={event => handleClick(n)}
                                    >

                                        <TableCell component="th" scope="row">
                                            {n.Codigo}
                                        </TableCell>

                                        <TableCell className="truncate" component="th" scope="row">
                                            {n.Nombre}
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
    );

}

export default withRouter(ProdutsTable);