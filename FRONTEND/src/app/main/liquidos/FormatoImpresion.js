import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash'; 
import React, { useEffect, useState } from 'react'; 
import { withRouter } from 'react-router-dom'; 
 
function ProductsTable(props) {
    
    return (
        <div  
            dangerouslySetInnerHTML={{ __html: props.FormatoImpresion }}
            // style={{ visibility: 'hidden' }}
        >
        </div>
    );
}

export default withRouter(ProductsTable);
