export var XSLTCabecera = `<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:msxsl="urn:schemas-microsoft-com:xslt" exclude-result-prefixes="msxsl">

  <xsl:template match="/">
    <html>
      <head>

        <style type="text/css">
          #img_Logo{
          width: 120px;
          height: 60px;
          float: right;
          }
          #tbDatosEmpresa{
          width: 100%;
          margin: 0px auto;
          }
        </style>


      </head>
      <body>
        <!-- se especifica el xml de donde se van a obtener los datos de la base de datos  -->
        <xsl:for-each select="/cabecera">

          <!-- Las tablas tiene la etiqueta width que maneja el Ancho de esta, estan al 100% es decir va a 
          ocupar el espacio total de su contenedor en el reporte que es de 800px    
          la Propiedad colspan indica cuantas colunnas va a ocupar el cuandro de la tabla
          la Propiedad Rowspan indica cuantas Filas va a ocupar el cuandro de la tabla-->


          <!-- Tabla que contiene datos de la empresa Cabecera  -->
          <!-- Tabla que contiene datos de la empresa Cabecera  -->
          <!--<table border='0' width="100%" id='tbDatosEmpresa' cellspacing="0" cellpadding="0" style="border-collapse: collapse;width: 100%;">
            <tr>
              <td style="width: 16%; vertical-align: middle;text-align:center;">
                <img id='img_Logo' />
              </td>
              <td style="width: 68%;">
                <table  border='0' cellspacing="0" cellpadding="0" style="width:100%;border-collapse: collapse;" >
                  <tr>
                    -->
          <!-- ERazonSocial Razon Social De la Empresa-->
          <!--
                    <td class="NombreEmpresa" style='font-family: Courier New; font-size: 13pt; text-align: center;'>
                      <strong>
                        -->
          <!-- <xsl:value-of select="ERazonSocial"/> Valor Base de datos-->
          <!--
                        <xsl:value-of select="ERazonSocial" />
                      </strong>
                    </td>
                  </tr>
                  -->
          <!-- Bloque de validación para el Nit De la Empresa-->
          <!--
                  -->
          <!-- Validación del CheckCamposVacios  para el Nit-->
          <!--
                  <xsl:if test="CheckCamposVacios='False'">
                    <xsl:if test="ENit != ''">
                      <tr>
                        <td class='TextoCabecera' style='font-family:Arial; font-size:10pt;text-align: center;'>
                          -->
          <!-- <strong class="EtiquetaCabecera" >Nit: </strong> Etiqueta que se muestar en el reporte-->
          <!--
                          -->
          <!-- <xsl:value-of select="ENit"/> Valor Base de datos-->
          <!--
                          <xsl:if test="CheckCamposSedes='False'">
                            <strong class="EtiquetaCabecera" >Nit: </strong>
                          </xsl:if>
                          <xsl:if test="CheckCamposSedes='True'">
                            <strong class="EtiquetaCabecera" >Identificación Interna: </strong>
                          </xsl:if>
                          <xsl:value-of select="ENit"/>
                        </td>
                      </tr>
                    </xsl:if>
                  </xsl:if>
                  <xsl:if test="CheckCamposVacios='True'">
                    <tr>
                      <td class='TextoCabecera' style='font-family:Arial; font-size:10pt;text-align: center;'>
                        -->
          <!-- <strong class="EtiquetaCabecera" >Nit: </strong> Etiqueta que se muestar en el reporte-->
          <!--
                        -->
          <!-- <xsl:value-of select="ENit"/> Valor Base de datos-->
          <!--
                        <xsl:if test="CheckCamposSedes='False'">
                          <strong class="EtiquetaCabecera" >Nit: </strong>
                        </xsl:if>
                        <xsl:if test="CheckCamposSedes='True'">
                          <strong class="EtiquetaCabecera" >Identificación Interna: </strong>
                        </xsl:if>
                        <xsl:value-of select="ENit"/>
                      </td>
                    </tr>
                  </xsl:if>
                  -->
          <!-- FIN Bloque de validación para el Nit De la Empresa-->
          <!--
                  -->
          <!-- Bloque de validación para el Cod. Habilitación:  De la Empresa-->
          <!--
                  -->
          <!-- Validación del CheckCamposVacios  para el Cod. Habilitación:-->
          <!--
                  <xsl:if test="CheckCamposVacios='False'">
                    <xsl:if test="ECodigoActivacion != ''">
                      <tr>
                        <td class='TextoCabecera' style='font-family:Arial; font-size:10pt; text-align: center;'>
                          -->
          <!-- <strong class="EtiquetaCabecera" >Cód. Habilitación: </strong> Etiqueta que se muestar en el reporte-->
          <!--
                          -->
          <!-- <xsl:value-of select="ECodigoActivacion"/> Valor Base de datos-->
          <!--
                          <strong class="EtiquetaCabecera" >Cód. Habilitación: </strong>
                          <xsl:value-of select="ECodigoActivacion"/>
                        </td>
                      </tr>
                    </xsl:if>
                  </xsl:if>
                  <xsl:if test="CheckCamposVacios='True'">
                    <tr>
                      <td class='TextoCabecera' style='font-family:Arial; font-size:10pt; text-align: center;'>
                        -->
          <!-- <strong class="EtiquetaCabecera" >Cód. Habilitación: </strong> Etiqueta que se muestar en el reporte-->
          <!--
                        -->
          <!-- <xsl:value-of select="ECodigoActivacion"/> Valor Base de datos-->
          <!--
                        <strong class="EtiquetaCabecera" >Cód. Habilitación: </strong>
                        <xsl:value-of select="ECodigoActivacion"/>
                      </td>
                    </tr>
                  </xsl:if>
                  -->
          <!-- FIN Bloque de validación para el Cod. Habilitación:  De la Empresa-->
          <!--
                  -->
          <!-- Bloque de validación para el Dirección:  De la Empresa-->
          <!--
                  -->
          <!-- Validación del CheckCamposVacios  para la Dirección:-->
          <!--
                  <xsl:if test="CheckCamposVacios='False'">
                    <xsl:if test="EDireccion != ''">
                      <tr>
                        <td class='TextoCabecera' style='font-family:Arial; font-size:10pt;text-align: center;'>
                          -->
          <!-- <strong class="EtiquetaCabecera" >Dirección: </strong> Etiqueta que se muestar en el reporte-->
          <!--
                          -->
          <!-- <xsl:value-of select="EDireccion"/> Valor Base de datos-->
          <!--
                          <strong class="EtiquetaCabecera" >Dirección: </strong>
                          <xsl:value-of select="EDireccion"/>
                        </td>
                      </tr>
                    </xsl:if>
                  </xsl:if>
                  <xsl:if test="CheckCamposVacios='True'">
                    <tr>
                      <td class='TextoCabecera' style='font-family:Arial; font-size:10pt;text-align: center;'>
                        -->
          <!-- <strong class="EtiquetaCabecera" >Dirección: </strong> Etiqueta que se muestar en el reporte-->
          <!--
                        -->
          <!-- <xsl:value-of select="EDireccion"/> Valor Base de datos-->
          <!--
                        <strong class="EtiquetaCabecera" >Dirección: </strong>
                        <xsl:value-of select="EDireccion"/>
                      </td>
                    </tr>
                  </xsl:if>
                  -->
          <!-- FIN Bloque de validación para la Dirección  De la Empresa-->
          <!--
                  -->
          <!-- Bloque de validación para el Teléfono:  De la Empresa-->
          <!--
                  -->
          <!-- Validación del CheckCamposVacios  para el Teléfono:-->
          <!--
                  <xsl:if test="CheckCamposVacios='False'">
                    <xsl:if test="ETelefono != ''">
                      <tr>
                        <td class='TextoCabecera' style='font-family:Arial; font-size:10pt; text-align: center;'>
                          -->
          <!-- <strong class="EtiquetaCabecera" >Teléfono: </strong> Etiqueta que se muestar en el reporte-->
          <!--
                          -->
          <!-- <xsl:value-of select="ETelefono"/> Valor Base de datos-->
          <!--
                          <strong class="EtiquetaCabecera" >Teléfono: </strong>
                          <xsl:value-of select="ETelefono"/>
                        </td>
                      </tr>
                    </xsl:if>
                  </xsl:if>
                  <xsl:if test="CheckCamposVacios='True'">
                    <tr>
                      <td class='TextoCabecera' style='font-family:Arial; font-size:10pt; text-align: center;'>
                        -->
          <!-- <strong class="EtiquetaCabecera" >Teléfono: </strong> Etiqueta que se muestar en el reporte-->
          <!--
                        -->
          <!-- <xsl:value-of select="ETelefono"/> Valor Base de datos-->
          <!--
                        <strong class="EtiquetaCabecera" >Teléfono: </strong>
                        <xsl:value-of select="ETelefono"/>
                      </td>
                    </tr>
                  </xsl:if>
                </table>
              </td>
              <td style="width: 16%; vertical-align: middle;text-align:center;">
                <xsl:if test="RutaImagenAux !=''">
                  <img id='img_LogoAdicional' />
                </xsl:if>
              </td>
            </tr>
            -->
          <!-- FIN Bloque de validación para el Teléfono  De la Empresa-->
          <!--
          </table>-->
          <!-- Fin De Tabla que contiene datos de la empresa Cabecera  -->

          <!-- Cabecera Resumida-->
          <table width='100%' border='0' style='font-family: Arial ; font-size: 9pt;'  >
            <tr>
              <!--Titulo ÓRDENES MÉDICAS-->
              <td width='100%' colspan='3' style='text-align: center; font-family:Courier New; font-size:13pt; border: 1px solid' >
                <strong  class='TituloCabecera' >INFORMACIÓN GENERAL</strong>
              </td>
            </tr>

            <tr>
              <!--Fecha de Impresión:-->
              <td class='TextoCabecera' width='40%'>
                <strong class="EtiquetaCabecera" >Fecha de Impresión: </strong>
                <xsl:value-of select="FechaImpresion"/>
              </td>

              <!--Fecha de Atención:-->
              <td class='TextoCabecera' width='30%'>
                <strong class="EtiquetaCabecera" >Fecha de Atención: </strong>
                <xsl:value-of select="FechaPrescripcion"/>
                <xsl:value-of select="RHFechaAtencion"/>
              </td>

              <!--Admisión:-->
              <td class='TextoCabecera' width='30%'>
                <strong class="EtiquetaCabecera" >Admisión: </strong>
                <xsl:value-of select="Caso"/>
              </td>
            </tr>

            <tr>
              <!--Paciente:-->
              <td class='TextoCabecera' width='70%' colspan='2'>
                <strong class="EtiquetaCabecera" >Paciente: </strong>
                <xsl:value-of select="PNombreIdentificacion"/>
                <xsl:value-of select="NombreCompleto"/>
              </td>

              <!-- Administradora:  -->
              <td class='TextoCabecera' width='30%' >
                <strong class="EtiquetaCabecera" >Administradora: </strong>
                <xsl:value-of select="Entidad"/>
                <xsl:value-of select="PAdministradora"/>
              </td>
            </tr>
            <tr>
              <!--Edad:-->
              <td class='TextoCabecera' width='30%'>
                <strong class="EtiquetaCabecera" >Edad: </strong>
                <xsl:value-of select="PEdadTexto" />
              </td>
            </tr>
            <tr>
              <!--Médico Tratante:-->
              <td class='TextoCabecera' width='70%' colspan='2'>
                <strong class="EtiquetaCabecera" >Médico Tratante: </strong>
                <xsl:value-of select="PRNombre"/>
              </td>

              <!-- Administradora:  -->
              <td class='TextoCabecera' width='30%' >
                <strong class="EtiquetaCabecera" >Especialidad: </strong>
                <xsl:value-of select="PRDescripcionEspecialidad"/>
                <xsl:value-of select="PREspecialidad"/>
              </td>
            </tr>

            <tr>
              <xsl:if test="DiagnosticoPrincipal != ''">
                <!--Diagnóstico Principal:-->
                <td class='TextoCabecera'  width='70%' colspan='2'>
                  <strong class="EtiquetaCabecera" >Diagnóstico Principal: </strong>
                  <xsl:value-of select="DiagnosticoPrincipal"/>
                </td>
              </xsl:if>
              <xsl:if test="CodigoDiagnosticoRelacionado1 != ''">
                <!--Diagnóstico Relacionado 1:-->
                <td class='TextoCabecera' width='70%' colspan='2'>
                  <strong class="EtiquetaCabecera" >Diagnóstico Relacionado 1: </strong>
                  <xsl:value-of select="CodigoDiagnosticoRelacionado1"/>
                </td>
              </xsl:if>
            </tr>

            <tr>
              <xsl:if test="CodigoDiagnosticoRelacionado2 != ''">
                <!--Diagnóstico Relacionado 2:-->
                <td class='TextoCabecera' width='70%' colspan='2'>
                  <strong class="EtiquetaCabecera" >Diagnóstico Relacionado 2: </strong>
                  <xsl:value-of select="CodigoDiagnosticoRelacionado2"/>
                </td>
              </xsl:if>
              <xsl:if test="CodigoDiagnosticoRelacionado3 != ''">
                <!-- Diagnóstico Relacionado 3:  -->
                <td class='TextoCabecera' width='30%' >
                  <strong class="EtiquetaCabecera" >Diagnóstico Relacionado 3: </strong>
                  <xsl:value-of select="CodigoDiagnosticoRelacionado3"/>
                </td>
              </xsl:if>
            </tr>
            <xsl:if test="VigenciaPrescripcion != ''">
              <tr>
                <!--VigenciaPrescripcion:-->
                <td class='TextoCabecera'  colspan='3'>
                  <strong class="EtiquetaCabecera" >
                    <xsl:value-of select="CodigoDiagnosticoRelacionado2"/>
                  </strong>
                </td>
              </tr>
            </xsl:if>
          </table>

          <!-- Fin Tabla de Datos Del Registro y Paciente  -->
          <xsl:if test="RHTituloRegistro != ''">
            <!-- table Nombre del registro  -->
            <table width='100%' border='0' cellpadding='0' cellspacing='0' >
              <tr>
                <!--Nombre del registro-->
                <td style='text-align: center; font-family:Courier New; font-size:13pt;border: 1px solid' >
                  <strong class='NombreRegCabecera' >
                    <xsl:value-of select="RHTituloRegistro"/>
                  </strong>
                </td>
              </tr>
            </table>
          </xsl:if>
          <!-- Fin Cabecera Resumida-->
        </xsl:for-each>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>`

