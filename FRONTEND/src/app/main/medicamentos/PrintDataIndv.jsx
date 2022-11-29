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
        <div
          dangerouslySetInnerHTML={{ __html: this.props.objDatosCabecera }}
        >
        </div></>
    );
  }
}

export default Manifiestos;
