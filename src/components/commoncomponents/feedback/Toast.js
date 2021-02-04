import React ,{ useState}from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import PropTypes from "prop-types";


  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  //This component used for show all type tost after click event app working progress
  export default function Toast(props){ 
    
    const [state, setState]=useState({
        vertical: 'center',
        horizontal: 'center',
      });
      const {vertical,horizontal} = state;
      const{open,type,msg}=props;
     return( 
       <Snackbar 
       anchorOrigin={{ vertical, horizontal }}
       key={`${vertical},${horizontal}`}
       open={open}
       autoHideDuration={(type === 'error' ? 2000 : 1000)}
       onClose={props.handleClose}>
       <Alert onClose={props.handleClose} severity={type}>
       {msg}
       </Alert>
       </Snackbar>
      )
   }

   Toast.propTypes = {
    open: PropTypes.bool,
    msg:PropTypes.node.isRequired,
    type:PropTypes.oneOf(["success", "warning", "error"]),
    handleClose: PropTypes.func
  };