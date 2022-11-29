import DemoUsuario from '@fuse/core/Usuario/FormUsuario';
import React from 'react';
import Button from '@mui/material/Button';
import TablaPrincipal from './TableLiquidos';
import TablaImprimir from './TablaImpresion';
import ReactToPrint from 'react-to-print';
import { gsUrlApi, JsonNomina4, JsonNomina2, gsUrlApiSios, gsClave, gsUsuario } from '../../../configuracion/ConfigServer'
import Alerta from '@fuse/core/DemoAlerta/Alertas';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Headersimple from '@fuse/core/Headers/Headersimple';
import Icon from '@mui/material/Icon';
import Input from '@mui/material/Input';
import Paper from '@mui/material/Paper';
import { ThemeProvider } from '@mui/material/styles';
import { XSLT } from './DistribucionLiquidos';
import { XSLTCabecera } from './CabeceraResumida';
import FormatoImpresion from './FormatoImpresion';
import Constancia from './PrintDataIndv';


class Usuarios extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            abierto: false,
            objLiquidos: {},
            DataEdict: '',
            EstadoAlerta: false
        }

    }

    async componentDidMount() {
        this.setState(state => ({
            ...state, Estado: !this.state.Estado
        }))
        var dt = new Date();

        let fechaActualFin = `${dt.getFullYear().toString().padStart(4, '0')}${(dt.getMonth() + 1).toString().padStart(2, '0')}${dt.getDate().toString().padStart(2, '0')}`
        let fechaActualInicio = `${dt.getFullYear().toString().padStart(4, '0')}${(dt.getMonth() + 1).toString().padStart(2, '0')}01 ${dt.getHours().toString().padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}`



    }


    BuscarDistribuciones = () => {
        fetch(gsUrlApiSios + '/distribucionLiquidos/buscar/', {
            method: 'POST',
            body: JSON.stringify({
                "FechaInicial": this.state.fechaInicioFiltro,
                "FechaFinal": this.state.fechaFinFiltro,
                "IdAdmision": this.state.IdAdmision
            }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Accept': 'application/json;'
                , Authorization: "Basic " + btoa(gsUsuario + ":" + gsClave)
            },
        }).then(res => res.json())
            .then(data => data)
            .then((data) => {

                var codigo = new DOMParser();
                var xslText = XSLT;
                console.log(resultText);

                var oDOM = codigo.parseFromString(data.datos.XmlResultado, "text/xml");
                var resultText = this.transformXML(data.datos.XmlResultado, xslText)
                var resultTextCabecera = this.transformXML(data.datos.XmlResultado, XSLTCabecera)

                this.setState(state => ({
                    ...state, FormatoImpresion: resultText
                }))
                this.setState(state => ({
                    ...state, FormatoImpresionCabecera: resultTextCabecera
                }))
                let response = this.convertirXmlEnObjeto(oDOM)
                this.setState(state => ({
                    ...state, objLiquidos: response
                }))
            })
            .catch((err) => console.log("err", err));


    }

    convertirXmlEnObjeto = (xml) => {

        var objeto = {};
        var esRaiz = false;

        //  Objeto "raiz"
        if (xml.nodeType == 1) { // Objeto 
            // Se recuperan sus atributos
            if (xml.attributes.length > 0) {
                for (var j = 0; j < xml.attributes.length; j++) {
                    var atributo = xml.attributes.item(j);
                    objeto[atributo.nodeName] = atributo.nodeValue;
                }
            }
        } else if (xml.nodeType == 3) { // Texto
            objeto = xml.nodeValue;
        } else if (xml.nodeType == 9) { // Elemento raiz
            esRaiz = true;
        }

        // Atributos del objeto (objetos hijos)
        if (xml.hasChildNodes()) {
            for (var i = 0; i < xml.childNodes.length; i++) {
                var item = xml.childNodes.item(i);
                var nombreNodo = item.nodeName;

                // Si objeto no tiene un atributo con el nombre nombreNodo se anade, si ya lo tiene (es un array) se anade
                // a la lista del objeto con nombre nombreNodo
                if (typeof (objeto[nombreNodo]) == "undefined") {
                    // Si el elemento es un CDATA se copia el contenido en el elemento y no se crea un
                    // hijo para almacenar el texto
                    if (nombreNodo == "#cdata-section") {
                        objeto = item.nodeValue;
                    } else if (nombreNodo == "#text") { // Si el elemento es un texto no se crea el objeto #text
                        if (item.childNodes.length < 1) {
                            objeto = item.nodeValue;
                        } else {
                            objeto[nombreNodo] = this.convertirXmlEnObjeto(item);
                        }
                    } else {
                        if (esRaiz) {
                            objeto = this.convertirXmlEnObjeto(item);
                        } else {
                            objeto[nombreNodo] = this.convertirXmlEnObjeto(item);
                        }
                    }
                } else {
                    // Si el atributo no es una lista se convierte el atributo en un array y se anade el
                    // valor a dicho array
                    if (typeof (objeto[nombreNodo].push) == "undefined") {
                        var valorAtributo = objeto[nombreNodo];
                        objeto[nombreNodo] = new Array();
                        objeto[nombreNodo].push(valorAtributo);
                    }

                    objeto[nombreNodo].push(this.convertirXmlEnObjeto(item));
                }
            }
        }

        return objeto;
    }

    Consultar = data => {

    }

    onchangeFechaInicio = data => {
        let value = data.target.value.replace('-', '/')
        value = value.replace('-', '/')
        let fecha = new Date(value)
        let fechaActualInicio = `${fecha.getFullYear().toString().padStart(4, '0')}${(fecha.getMonth() + 1).toString().padStart(2, '0')}${fecha.getDate().toString().padStart(2, '0')} ${fecha.getHours().toString().padStart(2, '0')}:${fecha.getMinutes().toString().padStart(2, '0')}`
        this.setState(state => ({
            ...state, fechaInicio: data.target.value
        }))
        this.setState(state => ({
            ...state, fechaInicioFiltro: fechaActualInicio
        }))
    }

    onchangeFechaFin = data => {
        let value = data.target.value.replace('-', '/')
        value = value.replace('-', '/')
        let fecha = new Date(value)
        let fechaActualFin = `${fecha.getFullYear().toString().padStart(4, '0')}${(fecha.getMonth() + 1).toString().padStart(2, '0')}${fecha.getDate().toString().padStart(2, '0')} 23:59`
        this.setState(state => ({
            ...state, fechaFin: data.target.value
        }))
        this.setState(state => ({
            ...state, fechaFinFiltro: fechaActualFin
        }))
    }
    onchangeAdmision = data => {
        let value = data.target.value
        this.setState(state => ({
            ...state, IdAdmision: value
        }))
    }

    transformXML(xmlText, xsltText) {

        if (!(window.DOMParser && window.XSLTProcessor)) {
            return xmlText;
        }

        // Load the XSLT into a document
        var xsltDoc = new DOMParser().parseFromString(xsltText, "text/xml");

        var xslt = new XSLTProcessor();
        xslt.importStylesheet(xsltDoc);

        var xml = new DOMParser().parseFromString(xmlText.trim(), "text/xml");

        var transformedXml = xslt.transformToDocument(xml);

        return (!transformedXml) ? xmlText :
            new XMLSerializer().serializeToString(transformedXml);
    }

    handleAfterPrint = () => { };

    handleBeforePrint = () => { };

    handleOnBeforeGetContent2 = () => {
        this.setState({ text: 'Loading new text...', isLoading2: true });

        return new Promise((resolve, any) => {
            setTimeout(() => {
                this.setState({ text: 'New, Updated Text!', isLoading2: false }, resolve);
            }, 2000);
        });
    };

    setComponentRef2 = (ref = ComponentToPrint) => {
        this.componentRef2 = ref;
    };

    reactToPrintContent2 = () => {
        return this.componentRef2;
    };

    reactToPrintTrigger2 = () => {
        return <Icon className="text-20">print</Icon>;
    };


    render() {
        return (
            <div>

                <FusePageSimple
                    /*  classes={{
                         content: 'flex',
                         header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
                     }} */
                    header={
                        <>
                            <Headersimple
                                MostrarFormulario={data => this.MostrarFormulario(data)}
                                Consultar={data => this.Consultar(data)}
                            />

                        </>

                    }

                    content={
                        <>
                            <div className="flex flex-1 items-center justify-center m-24 px-12" >
                                <ThemeProvider >
                                    <Paper
                                        style={{ background: 'white', maxWidth: "145px" }}
                                        initial={{ y: -20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
                                        className="flex items-center w-full max-w-512 px-8 py-4 rounded-16 shadow"
                                    >
                                        <Input
                                            placeholder="Buscar"
                                            className="flex flex-1 mx-8"
                                            disableUnderline
                                            type='date'
                                            fullWidth
                                            style={{ color: 'black' }}
                                            value={this.state.fechaInicio}
                                            inputProps={{
                                                'aria-label': 'Search'
                                            }}
                                            onChange={ev => this.onchangeFechaInicio(ev)}
                                        />
                                    </Paper>
                                    <Paper
                                        style={{ background: 'white', maxWidth: "145px" }}
                                        initial={{ y: -20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
                                        className="flex items-center mx-24 w-full max-w-512 px-8 py-4 rounded-16 shadow"
                                    >
                                        <Input
                                            placeholder="Buscar"
                                            className="flex flex-1 mx-8"
                                            disableUnderline
                                            type='date'
                                            fullWidth
                                            style={{ color: 'black' }}
                                            value={this.state.fechaFin}
                                            inputProps={{
                                                'aria-label': 'Search'
                                            }}
                                            onChange={ev => this.onchangeFechaFin(ev)}
                                        />
                                    </Paper>
                                    <Paper
                                        style={{ background: 'white' }}
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
                                            value={this.state.IdAdmision}
                                            inputProps={{
                                                'aria-label': 'Search'
                                            }}
                                            onChange={ev => this.onchangeAdmision(ev)}
                                        />
                                    </Paper>
                                </ThemeProvider>
                                <Button
                                    variant="contained"
                                    onClick={() => {
                                        this.BuscarDistribuciones()
                                    }}
                                    color="secondary"
                                    className='mx-5'
                                >
                                    <span className="">Buscar</span>
                                </Button>
                                <Button type='button' variant="contained" style={{ minWidth: "150px" }} outline={true} className='btn btn-success' color='primary'>
                                    <ReactHTMLTableToExcel
                                        id="test-table-xls-button"
                                        className="download-table-xls-button"
                                        table="TablaInforme"
                                        filename="DistribucionDeLiquidos"
                                        sheet="NominasEnviadas"
                                        buttonText="Download as XLS" />
                                </Button>
                                <Button
                                    type="button"
                                    style={{ height: '80%' }}
                                    for="Impresion"
                                    variant="contained"
                                    disabled={this.state.FormatoImpresion ? false : true}
                                    className="btn btn-success ml-2 cursor-pointer">
                                    <ReactToPrint
                                        id="Impresion"
                                        content={this.state.FormatoImpresion ? this.reactToPrintContent2 : ""}
                                        documentTitle="Distribución de Liquidos"
                                        onAfterPrint={this.state.FormatoImpresion ? this.handleAfterPrint : ""}
                                        onBeforeGetContent={this.state.FormatoImpresion ? this.handleOnBeforeGetContent2 : ""}
                                        onBeforePrint={this.state.FormatoImpresion ? this.handleBeforePrint : ""}
                                        removeAfterPrint
                                        trigger={this.reactToPrintTrigger2}
                                    >  </ReactToPrint>
                                </Button>
                            </div>
                            <div className='container'>
                                <TablaPrincipal
                                    MostrarFormulario={data => this.MostrarFormulario(data)}
                                    Eliminar={data => this.Eliminar(data)}
                                    DataTable={this.state.objLiquidos}
                                />
                                <div style={{ visibility: 'hidden', display: 'none' }}>
                                    <TablaImprimir
                                        DataTable={this.state.objLiquidos}
                                    />
                                </div>
                                {/* <div hidden={true}
                                    ref={this.setComponentRef2}
                                    id='FormatoImpresion'
                                    dangerouslySetInnerHTML={{ __html: this.state.FormatoImpresion }}
                                // FormatoImpresion={this.state.FormatoImpresion}
                                // style={{ visibility: 'hidden'}}
                                /> */}
                                <div hidden={true}> 
                                    <Constancia
                                        ref={this.setComponentRef2}
                                        objDatos={this.state.FormatoImpresion}
                                        objDatosCabecera={this.state.FormatoImpresionCabecera}

                                    />
                                </div>
                                {this.state.isLoading2 && <p className="indicator">Generando Constancia...</p>}
                            </div>

                            <ToastContainer
                                position="bottom-right"
                                autoClose={5000}
                            />

                        </>
                    }

                />

            </div>
        );
    }

}

export default Usuarios;