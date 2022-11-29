import * as React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import './App.css'
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

function Row(props) {
  const { row } = props;
  return (
    <React.Fragment>

      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell align="left">{row._id}{" - "}{row.Generico}</TableCell>
        <TableCell align="right">
          {row.DataPrescripcion.map((itemP, key) => {
            if (row._id == itemP.CodigoServicio) {
              row.TotaSolicitado = Number(itemP.Cantidad) + Number(row.TotaSolicitado)
              row.DataPrescripcion[key].EstadoGroup = true;
            }
          })}
          {row.Entrega + row.TotaSolicitado}
        </TableCell>

        <TableCell align="right">{row.Entrega}</TableCell>
        <TableCell align="right">{row.Entrega}</TableCell>
        <TableCell align="right">
          {props.arrayMedicamentosSios.map((itemP, key) => {
            if (row._id == itemP.CodigoServicio) {
              row.TotaAplicado = Number(itemP.Aplicados) + Number(row.TotaAplicado)
            }
          })}
          {row.TotaAplicado}
        </TableCell>
        <TableCell align="right">
          {props.arrayMedicamentosSios.map((itemP, key) => {
            if (row._id == itemP.CodigoServicio) {
              row.TotaPendiente = Number(itemP.Pendiente) + Number(row.TotaPendiente)
            }
          })}
          {row.TotaPendiente}
        </TableCell>
        <TableCell align="right">
          {row.DataFDevoluciones.map((itemDF, keyUp) => {
            <>
              {itemDF.ArrayMedicamentos.map((itemDA, key) => {
                if (row._id == itemDA.CodigoServicio) {
                  row.TotalRecibidoN = Number(itemDA.CantidadDevolver) + Number(row.TotalRecibidoN ? row.TotalRecibidoN : 0)
                }
              })}
            </>
          })}
          {row.DataDevoluciones.map((itemD, key) => {
            if (row._id === itemD.CodigoServicio) {
              row.TotaDevolucionN = Number(itemD.CantidadDevolver) + Number(row.TotaDevolucionN ? row.TotaDevolucionN : 0)
              row.DataDevoluciones[key].EstadoGroup = true;
            }
          })}
          {row.TotalRecibidoN + row.TotaDevolucionN}
        </TableCell>
        <TableCell align="right">
          {row.DataFDevolucionesA.map((itemDF) => {
            <>
              {itemDF.ArrayMedicamentos.map((itemDA) => {
                if (row.Generico == itemDA.Generico) {
                  row.TotaRecibidoA = Number(itemDA.CantidadDevolver) + Number(row.TotaRecibidoA)
                }
              })}
            </>
          })}
          {row.DataSDevolucionesA.map((itemDF, key) => {
            <>
              {itemDF.ArrayMedicamentos.map((itemDA) => {
                if (row.Generico == itemDA.Generico) {
                  row.TotaDevolucionA = Number(itemDA.CantidadDevolver) + Number(row.TotaDevolucionA)
                  // row.TotaDevolucionA[key].EstadoGroup = true;
                }
              })}
            </>
          })}
          {row.TotaDevolucionA + row.TotaRecibidoA}
        </TableCell>
        <TableCell align="right">
          {row.TotalRecibidoN ? row.TotalRecibidoN : 0}
        </TableCell>
        <TableCell align="right">
          {row.TotaRecibidoA ? row.TotaRecibidoA : 0}
        </TableCell>
        <TableCell align="right">
          {props.arrayMedicamentosSios.map((itemP, key) => {
            if (row._id == itemP.CodigoServicio) {
              row.TotaCobrado = Number(itemP.Cobrado) + Number(row.TotaCobrado)
            }
          })}
          {row.TotaCobrado}
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function RowPrescripciones(props) {
  const { row, keyPosicion, Data } = props;

  return (
    <>
      {Data.DataPrescripcion[keyPosicion].Encontrado !== true
        ? <React.Fragment>
          <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell align="left">{row.CodigoServicio}{" - "}{row.Generico}</TableCell>
            <TableCell align="right">
              {Data.DataPrescripcion.map((itemP, key) => {
                if (row.CodigoServicio == itemP.CodigoServicio) {
                  row.TotaSolicitado = Number(itemP.Cantidad) + Number(row.TotaSolicitado ? row.TotaSolicitado : 0)
                  Data.DataPrescripcion[key].Encontrado = true;
                }
              })}
              {Number(row.TotaSolicitado)}</TableCell>
            <TableCell align="right">{0}</TableCell>
            <TableCell align="right">{0}</TableCell>
            <TableCell align="right">
              {props.arrayMedicamentosSios.map((itemP, key) => {
                if (row.CodigoServicio == itemP.CodigoServicio) {
                  row.TotaAplicado = Number(itemP.Aplicados) + Number(row.TotaAplicado)
                }
              })}
              {row.TotaAplicado ? row.TotaAplicado : 0}
            </TableCell>
            <TableCell align="right">
              {props.arrayMedicamentosSios.map((itemP, key) => {
                if (row.CodigoServicio == itemP.CodigoServicio) {
                  row.TotaPendiente = Number(itemP.Pendiente) + Number(row.TotaPendiente)
                }
              })}
              {row.TotaPendiente ? row.TotaPendiente : 0}
            </TableCell>
            <TableCell align="right">
              {Data.DataFDevoluciones.map((itemDF, keyUp) => {
                <>
                  {itemDF.ArrayMedicamentos.map((itemDA, key) => {
                    if (row.CodigoServicio == itemDA.CodigoServicio) {
                      row.TotalRecibidoN = Number(itemDA.CantidadDevolver) + Number(row.TotalRecibidoN ? row.TotalRecibidoN : 0)
                    }
                  })}
                </>
              })}
              {Data.DataDevoluciones.map((itemD) => {
                if (row.CodigoServicio == itemD.CodigoServicio) {
                  row.TotaDevolucionN = Number(itemD.CantidadDevolver) + Number(row.TotaDevolucionN ? row.TotaDevolucionN : 0)
                }
              })}
              {row.TotaDevolucionN
                ? row.TotaDevolucionN + row.TotalRecibidoN ? row.TotalRecibidoN : 0
                : 0 + row.TotalRecibidoN ? row.TotalRecibidoN : 0}
            </TableCell>
            <TableCell align="right">
              {Data.DataFDevolucionesA.map((itemDF) => {
                <>
                  {itemDF.ArrayMedicamentos.map((itemDA) => {
                    if (row.Generico == itemDA.Generico) {
                      row.TotaRecibidoA = Number(itemDA.CantidadDevolver) + Number(row.TotaRecibidoA)
                    }
                  })}
                </>
              })}
              {Data.DataSDevolucionesA.map((itemDF) => {
                <>
                  {itemDF.ArrayMedicamentos.map((itemDA) => {
                    if (row.Generico == itemDA.Generico) {
                      row.TotaDevolucionA = Number(itemDA.CantidadDevolver) + Number(row.TotaDevolucionA)
                    }
                  })}
                </>
              })}
              {row.TotaDevolucionA
                ? row.TotaDevolucionA + row.TotaRecibidoA ? row.TotaRecibidoA : 0
                : 0 + row.TotaRecibidoA ? row.TotaRecibidoA : 0}
            </TableCell>
            <TableCell align="right">
              {row.TotalRecibidoN ? row.TotalRecibidoN : 0}
            </TableCell>
            <TableCell align="right">
              {row.TotaRecibidoA ? row.TotaRecibidoA : 0}
            </TableCell>
            <TableCell align="right">
              {props.arrayMedicamentosSios.map((itemP, key) => {
                if (row.CodigoServicio == itemP.CodigoServicio) {
                  row.TotaCobrado = Number(itemP.Cobrado) + Number(row.TotaCobrado)
                }
              })}
              {row.TotaCobrado ? row.TotaCobrado : 0}
            </TableCell>

          </TableRow>
        </React.Fragment>
        : ""
      }
    </>
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



const columns = [
  {
    id: 'Solicitado',
    label: 'Solicitado',
    //minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'Entregado',
    label: 'Entregado',
    //minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'Recibido',
    label: 'Recibido',
    //minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'Administrado',
    label: 'Aplicado',
    //minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'Aplicado Pendiente',
    label: 'Aplicado Pendiente',
    //minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'DevolucionN',
    label: 'Devolución Normal',
    //minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'DevolucionesA',
    label: 'Devolución Aprovecha..',
    //minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'Recibido N',
    label: 'Recibido Normal',
    //minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'Recibido A',
    label: 'Recibido Aprovecha..',
    //minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'Cobrado',
    label: 'Cobrado',
    //minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  }

];


export default function StickyHeadTable(props) {
  const [Tipo, setTipo] = React.useState("Todos");

  const filtrarPorTipo = (event) => {
    if(props.DataTable){
      for (let i = 0; i < props.DataTable.length; i++) {
        props.DataTable[i].TotaSolicitado = 0;
        props.DataTable[i].TotaDevolucion = 0;
        props.DataTable[i].TotaDevolucionN = 0;
        props.DataTable[i].TotaDevolucionA = 0;
        props.DataTable[i].TotaRecibidoA = 0;
        props.DataTable[i].TotalRecibidoN = 0;
        props.DataTable[i].TotaRecibidoA = 0;
        props.DataTable[i].TotaAplicado = 0;
        props.DataTable[i].TotaPendiente = 0;
        props.DataTable[i].TotaCobrado = 0; 
      }
    }
  
    setTipo(event.target.value);

  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell
                key={"Medicamento/Insumo"}
                align={"left"}
                style={{ minWidth: "210px" }}
              >
                <FormControl sx={{ m: 1, minWidth: 150 }}>
                  <InputLabel id="demo-simple-select-helper-label">Madicamentos/Insumos</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    name="TipoIdentificacion"
                    label="Tipo de Identificacion"
                    onChange={(env) => filtrarPorTipo(env)}
                    size={"small"}
                    fullWidth
                  >
                    <MenuItem value="Todos">Todos</MenuItem>
                    <MenuItem value="Medicamento">Medicamentos</MenuItem>
                    <MenuItem value="Insumo">Insumos</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.DataTable ? <>  {props.DataTable.map((row) => (
              <>{Tipo === "Todos" ? <Row
                key={row.Consecutivo}
                Tipo={Tipo}
                arrayMedicamentosSios={props.arrayMedicamentosSios}
                row={row}
              />
                : <>
                  {Tipo === "Medicamento" ? <>
                    {props.arrayMedicamentosSios.map((itemP, key) => {
                      if (row._id == itemP.CodigoServicio && itemP.Tipo === "Medicamento") {
                        return (<Row
                          key={row.Consecutivo}
                          Tipo={Tipo}
                          arrayMedicamentosSios={props.arrayMedicamentosSios}
                          row={row}
                        />)
                      }
                    })}
                  </>
                    : <>
                      {props.arrayMedicamentosSios.map((itemP, key) => {
                        if (row._id == itemP.CodigoServicio && itemP.Tipo === "Insumo") {
                          return (<Row
                            key={row.Consecutivo}
                            Tipo={Tipo}
                            arrayMedicamentosSios={props.arrayMedicamentosSios}
                            row={row}
                          />)
                        }
                      })}
                    </>
                  }
                </>

              }</>

            ))}</>
              : <div></div>
            }
            {/* --------Medicamentos que nunca han sido dispensados-------- */}
            {props.DataTable ? <>  {props.DataTable[0].DataPrescripcion.map((row, key) => (
              <>{Tipo === "Todos" ? <>{row.EstadoGroup !== true && row.Encontrado !== true
                ? <RowPrescripciones
                  Data={props.DataTable[0]}
                  Tipo={Tipo}
                  arrayMedicamentosSios={props.arrayMedicamentosSios}
                  key={row.Consecutivo}
                  row={row} keyPosicion={key}
                />
                : ""
              }</>
                : <>
                  {Tipo === "Medicamento" ? <>
                    {props.arrayMedicamentosSios.map((itemP, key) => {
                      if (row._id == itemP.CodigoServicio && itemP.Tipo === "Medicamento") {
                        return (<>{row.EstadoGroup !== true && row.Encontrado !== true
                          ? <RowPrescripciones
                            Data={props.DataTable[0]}
                            Tipo={Tipo}
                            arrayMedicamentosSios={props.arrayMedicamentosSios}
                            key={row.Consecutivo}
                            row={row} keyPosicion={key}
                          />
                          : ""
                        }</>)
                      }
                    })}
                  </>
                    : <>
                      {props.arrayMedicamentosSios.map((itemP, key) => {
                        if (row._id == itemP.CodigoServicio && itemP.Tipo === "Insumo") {
                          return (<>{row.EstadoGroup !== true && row.Encontrado !== true
                            ? <RowPrescripciones
                              Data={props.DataTable[0]}
                              Tipo={Tipo}
                              arrayMedicamentosSios={props.arrayMedicamentosSios}
                              key={row.Consecutivo}
                              row={row} keyPosicion={key}
                            />
                            : ""
                          }</>)
                        }
                      })}
                    </>
                  }
                </>

              }</>

            ))}</>
              : <div></div>
            }
            {/* --- */}

          </TableBody>
        </Table>
      </TableContainer>

    </Paper>
  );
}