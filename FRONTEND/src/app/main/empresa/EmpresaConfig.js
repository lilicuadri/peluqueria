import i18next from 'i18next';
import Empresa from './Empresa';
import en from './i18n/en';
import tr from './i18n/tr';
import ar from './i18n/ar';
import { authRoles } from 'app/auth';

i18next.addResourceBundle('en', 'examplePage', en);
i18next.addResourceBundle('tr', 'examplePage', tr);
i18next.addResourceBundle('ar', 'examplePage', ar);

const EmpresaConfig = {
	settings: {
		layout: {
			config: {}
		}
    },
    /* auth: ['configuraciones_Empresa'], */
    auth: authRoles.onlyGuest,
	routes: [
		{
			path: '/Empresa',
			component: Empresa
		}
	]
};

export default EmpresaConfig;