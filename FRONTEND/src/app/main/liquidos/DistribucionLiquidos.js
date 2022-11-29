export var XSLT = `<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:msxsl="urn:schemas-microsoft-com:xslt" exclude-result-prefixes="msxsl">
  <xsl:template match="/General">
    <html>
      <head>
      </head>
      <body >
        <!-- se especifica el xml de donde se vana a optener los datos de la base de datos  -->
        <xsl:for-each select="/General">
          <table width='99%' cellspacing='0' style='font-family: Arial ; font-size: 9pt;' >
            <tr>
              <td width='100%' colspan='8' height='30px' valign='top' style='text-align: center; font-family:Courier New; font-size:13pt;' >
                <table width='100%'>
                  <tr>
                    <td style="border:1px solid black;text-align: center; font-family:Arial; font-size:12pt;">
                      <strong>
                        <xsl:value-of select="Titulo"/>
                      </strong>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td></td>
            </tr>
            <xsl:for-each select="DatosAdm/Administrados">
              <tr>
                <table width="100%" cellspacing='0' style='font-family: Arial ; font-size: 9pt;' >
                  <tr>
                    <td width='8%' colspan='5' style="text-align:center;border:1px solid black">
                      <strong>Solución y Mezcla: </strong>
                      <xsl:value-of select="Medicamentos"/>
                    </td>
                    <td width='8%' colspan='4' style="text-align:center;border:1px solid black">
                      <strong>Total mezcla: </strong>
                      <xsl:value-of select="TotalMezcla"/>
                    </td>
                  </tr>
                  <tr>
                    <td width='8%' colspan='5' style="text-align:center;border:1px solid black">
                      <strong>Vía: </strong>
                      <xsl:value-of select="Vía"/>
                    </td>
                    <td width='8%' colspan='4' style="text-align:center;border:1px solid black">
                      <strong>Total Administrados: </strong>
                      <xsl:value-of select="TotalAdministrado"/>
                    </td>
                  </tr>
                  <tr> 
                   
                    <td width='15%' style="text-align:center;border:1px solid black">
                      <strong>Fecha Hora Inicio</strong>
                    </td>
                    <td width='15%' style="text-align:center;border:1px solid black">
                      <strong>Fecha Hora Fin</strong>
                    </td>
                    <td width='8%' style="text-align:center;border:1px solid black">
                    <strong>Cantidad</strong>
                    </td>
                    <td width='14%' style="text-align:center;border:1px solid black">
                      <strong>Observación</strong>
                    </td>
                    <td width='14%' style="text-align:center;border:1px solid black">
                      <strong>Responsable</strong>
                    </td>
                    <td width='18%' style="text-align:center;border:1px solid black">
                      <strong>Firma</strong>
                    </td>
                  </tr>
                  <xsl:for-each select="Detalle/Aplicacion">
                    <tr>  
                      <td style="text-align:center;border:1px solid black">
                        <xsl:value-of select="FechaHoraInicio"/>
                      </td>
                      <td style="text-align:center;border:1px solid black">
                        <xsl:value-of select="FechaHoraFin"/>
                      </td>
                      <td style="text-align:center;border:1px solid black">
                        <xsl:value-of select="CantidadAdministrada"/>
                        <span> cc</span>
                      </td>
                      <td style="text-align:center;border:1px solid black">
                        <xsl:value-of select="Observaciones"/>
                      </td>
                      <td style="text-align:center;border:1px solid black">
                        <xsl:value-of select="Nombre"/>
                      </td>
                      <td style="text-align:center;border:1px solid black">
                        <xsl:value-of select="Firma"/>
                      </td>
                    </tr>
                  </xsl:for-each>
                </table>
              </tr>
              <tr>
                <td></td>
              </tr>
            </xsl:for-each>
          </table>
        </xsl:for-each>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>`
