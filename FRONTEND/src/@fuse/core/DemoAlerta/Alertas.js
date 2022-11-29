import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


class DemoAlertas extends React.Component {
constructor(props) {
    super(props);
    this.state={
        open: false 
    }
} 

componentDidMount () {
    if (this.props.DataAlerta === true){
        this.setState(state => ({
            ...state,open: this.props.DataAlerta
         
        }))
      } 
}
handleClose = () => {
    this.setState(state => ({
        ...state,open: false
    }))
}
  
render(){
    return (
        <div >
        
          <Snackbar open={this.state.open} autoHideDuration={2200} onClose={() => this.handleClose()}>
            <Alert onClose={() => this.handleClose()} severity="success">
              Registro guardado!
            </Alert>
          </Snackbar>
        </div>
      );
}
 
}

export default DemoAlertas;