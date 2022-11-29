import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';
import React from 'react';
import { gsUrlApi } from '../../configuracion/ConfigServer'
i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

let gObjSession = null;
let gLstinterfaces = null;
let resultado = [];
let navigation = [];

class navigationConfig extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      SidebarData: []
    }
  }

  componentDidMount() {
    fetch(gsUrlApi + '/interfaces/', {
			method: 'GET',
			body: JSON.stringify(),
			headers: {
				'Content-Type': 'application/json; charset=UTF-8',
				'Accept': 'application/json',
			}
		}).then(res => res.json())
			.then(data => data)
			.then((data) => {
				if (data.interfaces.length > 0) {
					var lstData = [];
					lstData = data.interfaces;
					lstData = lstData.sort(function(a, b) {
						return a.Orden - b.Orden;
					  });
					let ObjSesion = JSON.parse(localStorage.getItem('Usuario'))
					let glstPermisos = ObjSesion.Usuario.Rol.Permisos;
					let lstDataAux = [];
					for (let j = 0; j < glstPermisos.length; j++) {

						lstData.filter(obj => {
							if (obj.id === glstPermisos[j]) {
								lstDataAux.push(obj)
							}
						});
					}
					lstData = lstDataAux;

					var array = []
					gLstinterfaces = lstData;
					lstInterfaces = lstData;
					var lstMenus = lstInterfaces.filter(obj => {
						return obj.parent === "#";
					});

					lstMenus.sort(function(a, b) {
						return a.Orden - b.Orden;
					  });

					for (var i = 0; i < lstMenus.length; i++) {
						var objDataMenu = {};
						var objDataSub = {};


						var lstSubMenu = lstInterfaces.filter(obj => {
							return obj.parent === lstMenus[i].id;
						});

						lstSubMenu = lstSubMenu.sort(function(a, b) {
							return a.Orden - b.Orden;
						  });

						if (lstSubMenu.length > 0) {

							objDataMenu.id = lstMenus[i].id;
							objDataMenu.title = lstMenus[i].text;
							objDataMenu.translate = lstMenus[i].text;
							objDataMenu.type = lstMenus[i].Type;
							objDataMenu.icon = lstMenus[i].icon;
							array.push(objDataMenu)
							var ArrayChild = []
							for (let j = 0; j < lstSubMenu.length; j++) {
								var objDataSub = {};
								objDataSub.id = lstSubMenu[j].id;
								objDataSub.title = lstSubMenu[j].text;
								objDataSub.translate = lstSubMenu[j].text;
								objDataSub.type = lstSubMenu[j].Type;
								objDataSub.icon = lstSubMenu[j].icon;
								objDataSub.url = lstSubMenu[j].Url;
								ArrayChild.push(objDataSub)
							}
							array[i].children = ArrayChild;
						} else {
							objDataMenu.id = lstMenus[i].id;
							objDataMenu.title = lstMenus[i].text;
							objDataMenu.translate = lstMenus[i].text;
							objDataMenu.type = lstMenus[i].Type;
							objDataMenu.icon = lstMenus[i].icon;
							array.push(objDataMenu)
						}

					}
				}
				this.setState(state => ({
					...state, SidebarData: array
				}))
			})
			.catch(err => console.log("err", err));
  }
  
}


/* const nav = [
  {
    id: 'Operativos',
    title: 'Aplicaciones',
    translate: 'APPLICATIONS',
    type: 'group',
    icon: 'apps',
    children: [
      {
        id: 'example-component',
        title: 'Example',
        translate: 'EXAMPLE',
        type: 'item',
        icon: 'whatshot',
        url: '/example',
      },
      {
        id: 'Operativos',
        title: 'Operativos',
        translate: 'OPERATIVOS',
        type: 'collapse',
        icon: 'dashboard',
        children: [
          {
            id: 'Novedades',
            title: 'Novedades',
            type: 'item',
            url: '/Novedades',
          },
          {
            id: 'SolicitudPermiso',
            title: 'Solicitud de permisos',
            type: 'item',
            url: '/Solicitudpermisos',
          },
        ],
      },
      {
        id: 'NominaElectronica',
        title: 'NÓMINA ELECTRONICA',
        type: 'collapse',
        icon: 'monetization_on',
        children: [
          {
            id: 'Envionomina',
            title: 'Envio Nómina',
            type: 'item',
            url: '/Envionomina',
          },
          {
            id: 'Historico',
            title: 'Historico',
            type: 'item',
            url: '/Historico',
          },
          {
            id: 'Pendientes',
            title: 'Pendientes',
            type: 'item',
            url: '/Pendientes',
          },
        ],
      },
      {
        id: 'AFILIACIONES',
        title: 'AFILIACIONES',
        translate: 'AFILIACIONES',
        type: 'collapse',
        icon: 'favorite',
        children: [
          {
            id: 'Salud',
            title: 'Salud',
            type: 'item',
            url: '/Salud',
          },
          {
            id: 'Pension',
            title: 'Pension',
            type: 'item',
            url: '/pension',
          },
          {
            id: 'Cesantia',
            title: 'Censantia',
            type: 'item',
            url: '/Censantia',
          },
          {
            id: 'Arl',
            title: 'Arl',
            type: 'item',
            url: '/Arl',
          },
          {
            id: 'Cajacompesaciones',
            title: 'Caja Compesaciones',
            type: 'item',
            url: '/Cajacompesaciones',
          },
        ],
      },
    ],
  },
]; */

export default navigationConfig;
