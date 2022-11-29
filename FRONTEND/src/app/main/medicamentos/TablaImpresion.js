import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';

const rows = [
	"Vía",
	"Medicamentos",
	"Consecutivo",
	"TotalMezcla",
	"TotalAdministrado"
]
const rows2 = [
	"FechaHoraInicio",
	"FechaHoraFin",
	"CantidadAdministrada",
	"Aplicado Por"
]
function ProductsTable(props) {
	const dispatch = useDispatch();
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	useEffect(() => {
	}, [dispatch]);
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};
	return (
		<div className="w-full flex flex-col" >
			<FuseScrollbars className="flex-grow overflow-x-auto">
				<Table className="min-w-xl" id="TablaInforme" stickyHeader aria-label="sticky table" aria-labelledby="tableTitle">
					<TableHead>
						{rows.map(data => {
							return (
								<TableCell style={{ padding: "10px" }} component="th" scope="row">
									{data}
								</TableCell>
							);
						})}
					</TableHead>

					<TableBody>
						<>{props.DataTable.DatosAdm
							? <>{props.DataTable.DatosAdm.Administrados.map((row, item) => {
								return (
									<>
										<TableRow
											className=""
											hover
											role=""
											tabIndex={-1}
											key={item}
										>
											<TableCell style={{ padding: "10px" }} component="th" scope="row">
												{row.Vía}
											</TableCell>
											<TableCell style={{ padding: "10px" }} component="th" scope="row">
												{row.Medicamentos}
											</TableCell>
											<TableCell style={{ padding: "10px" }} component="th" scope="row">
												{row.Consecutivo}
											</TableCell>
											<TableCell style={{ padding: "10px" }} component="th" scope="row">
												{row.TotalMezcla}
											</TableCell>
											<TableCell style={{ padding: "10px" }} component="th" scope="row">
												{row.TotalAdministrado}
											</TableCell>
										</TableRow>
										<TableHead>
											{rows2.map(data => {
												return (
													<TableCell style={{ padding: "10px" }} component="th" scope="row">
														{data}
													</TableCell>
												);
											})}
										</TableHead>
										<>{row.Detalle.Aplicacion.length > 0
											? <>
												{row.Detalle.Aplicacion.map((n, key) => {
													return (
														<TableRow
															className=""
															hover
															role=""
															tabIndex={-1}
															key={item + "_" + key}
														>
															<TableCell style={{ padding: "10px" }} component="th" scope="row">
																{n.FechaHoraInicio}
															</TableCell>
															<TableCell style={{ padding: "10px" }} component="th" scope="row">
																{n.FechaHoraFin}
															</TableCell>
															<TableCell style={{ padding: "10px" }} component="th" scope="row">
																{n.CantidadAdministrada}
															</TableCell>
															<TableCell style={{ padding: "10px" }} component="th" scope="row">
																{n.Nombre}
															</TableCell>
														</TableRow>
													);
												})}</>
											: ""}</>
									</>
								)
							})}</>
							: ""
						}</>

					</TableBody>
				</Table>
			</FuseScrollbars>
		</div>
	);
}

export default withRouter(ProductsTable);
