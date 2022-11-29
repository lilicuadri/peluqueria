import FormEmpresa from '@fuse/core/Empresa'
import React from 'react'
import Headersimple from '@fuse/core/Headers/Headersimple'

class Empresa extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            DataAlerta: false
        };
    }
    componentWillMount() {

    }

    MostarAlerta = () => {
		this.setState(state => ({
			...state,DataAlerta: true
		}))
		this.componentDidMount();
	}

    render() {
        return (
            <>
               
                     <FormEmpresa
                     /* MostarAlerta={() => this.MostarAlerta()} */
                     />
                   
					{this.state.DataAlerta
					?<Alerta
					DataAlerta={this.state.DataAlerta}
					/>
					:""}
				
            </>
        )
    }
}
export default Empresa;