import React from "react";
import Cabecera from './Cabecera';

class Manifiestos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }


  render() {
    return (
      <>
        {/* <Cabecera 
          objDatosCabecera={this.state.FormatoImpresionCabecera}

        /> */}
        <div
          dangerouslySetInnerHTML={{ __html: this.props.objDatosCabecera }}
        >
        </div></>
    );
  }
}

export default Manifiestos;
