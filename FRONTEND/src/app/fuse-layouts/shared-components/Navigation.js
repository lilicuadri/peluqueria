import FuseNavigation from '@fuse/core/FuseNavigation';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import clsx from 'clsx';
import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectNavigation } from 'app/store/fuse/navigationSlice';
import { navbarCloseMobile } from '../../store/fuse/navbarSlice';
import React, { useState, useEffect } from 'react';
import { gsUrlApi } from '../../../configuracion/ConfigServer'

 let lstInterfaces = null; 
 let gLstinterfaces = []
function Navigation(props) {
  const navigation = useSelector(selectNavigation);
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('lg'));
  const dispatch = useDispatch();
	const [arraySidebar, setarraySibdedar] = useState([]);

  function handleItemClick(item) {
    if (mdDown) {
      dispatch(navbarCloseMobile());
    }
  }

  const consultarInterfaces = () => {
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
							objDataMenu.type = "collapse";
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
        setarraySibdedar(array) 
			})
			.catch(err => console.log("err", err));
  }

  useEffect(() => {
    consultarInterfaces()
  }, []);

  return (
    <FuseNavigation
      className={clsx('navigation', props.className)}
      navigation={arraySidebar}
      layout={props.layout}
      dense={props.dense}
      active={props.active}
      onItemClick={handleItemClick}
    />
  );
}

Navigation.defaultProps = {
  layout: 'vertical',
};

export default memo(Navigation);
