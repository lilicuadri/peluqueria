import i18next from 'i18next';
import Roles from './Roles';
import en from './i18n/en';
import tr from './i18n/tr';
import ar from './i18n/ar';
import { authRoles } from 'app/auth';

i18next.addResourceBundle('en', 'roles', en);
i18next.addResourceBundle('tr', 'roles', tr);
i18next.addResourceBundle('ar', 'roles', ar);

const RolesConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
    auth: authRoles.onlyGuest,
	/* auth: ['Seguridad_Roles'], */
	routes: [
		{
			path: '/Roles',
			component: Roles
		}
	]
};

export default RolesConfig;
