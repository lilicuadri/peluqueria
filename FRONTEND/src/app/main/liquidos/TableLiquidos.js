import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.Vía}
        </TableCell> 
        <TableCell align="left">{row.Medicamentos}</TableCell>
        <TableCell align="right">{row.Consecutivo}</TableCell>
        <TableCell align="right">{row.TotalMezcla}</TableCell>
        <TableCell align="right">{row.TotalAdministrado}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Detalle
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell >Fecha Inicio</TableCell>
                    <TableCell>Fecha Fin</TableCell>
                    <TableCell align="right">Cantidad</TableCell>
                    <TableCell align="left">Aplicado por</TableCell> 
                  </TableRow>
                </TableHead>
                <TableBody>
                  {console.log(row.Detalle.Aplicacion)}
                  <>{row.Detalle.Aplicacion.length > 0
                  ? <> {row.Detalle.Aplicacion.map((historyRow) => (
                    <TableRow key={historyRow.FechaHoraInicio}>
                      <TableCell component="th" scope="row">
                        {historyRow.FechaHoraInicio}
                      </TableCell>
                      <TableCell>{historyRow.FechaHoraFin}</TableCell>
                      <TableCell align="right">
                        {historyRow.CantidadAdministrada}
                      </TableCell>
                      <TableCell align="left">{historyRow.Nombre}</TableCell>

                    </TableRow>
                  ))}</>
                  : <>
                  <TableRow key={row.Detalle.Aplicacion.FechaHoraInicio}>
                      <TableCell component="th" scope="row">
                        {row.Detalle.Aplicacion.FechaHoraInicio}
                      </TableCell>
                      <TableCell>{row.Detalle.Aplicacion.FechaHoraFin}</TableCell>
                      <TableCell align="right">
                        {row.Detalle.Aplicacion.CantidadAdministrada}
                      </TableCell>
                      <TableCell align="left">{row.Detalle.Aplicacion.Nombre}</TableCell> 
                    </TableRow>
                  </>}</>
                 
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

export default function CollapsibleTable(props) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Nombre del servicio</TableCell>
            <TableCell align="left">Valor</TableCell>
            <TableCell align="right">Descripción</TableCell>
            <TableCell align="right">Imagenes</TableCell>
            <TableCell align="right">Eliminar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.DataTable.DatosAdm ? <>  {props.DataTable.DatosAdm.Administrados.map((row) => (
            <Row key={row.Consecutivo} row={row} />
          ))}</>
            : <div></div>
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}