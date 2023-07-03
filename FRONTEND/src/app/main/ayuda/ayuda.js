import * as React from 'react';
import Ayuda from './modules/views/ProductHowItWorks';
import AppAppBar from '../ayuda/modules/views/AppAppBar';

import withRoot from './modules/withRoot';

function Index() {
    return (
        <React.Fragment>
            <AppAppBar />
            <Ayuda />
        </React.Fragment>
    );
}

export default withRoot(Index);
