import React ,{ useState, useEffect } from 'react';

import clsx from 'clsx';
import { fade,withStyles,makeStyles} from '@material-ui/core/styles';
import {Platform,View,Image,Text,Dimensions} from 'react-native';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import PropTypes from "prop-types";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import StepConnector from '@material-ui/core/StepConnector';
/**For Style */
import popUpStyle from '.././style/popUpStyle';




const useStyles = makeStyles(theme => ({
    submit: {
      margin: theme.spacing(0, 0, 0),
      borderRadius : 0,
},
textArea:{
  marginTop: theme.spacing(0),
  borderRadius : 0,
},
profileMargin: {
  marginTop: theme.spacing(2),
  borderRadius : 0,
},
paper: {
  border: '2px solid #ced4da',
  height: 100,
  width: 100,
},
root: {
  //flexGrow: 1,
  width: '100%',
},
profileMargin10: {
    marginTop: theme.spacing(2),
    border : '1px solid #cccccc',
    padding:'2%',
  },
  profileMargin1: {
   
    // border : '1px solid #cccccc',
   //  padding:'1%',
   marginLeft:'8px',
 
   },
   button2 :{
    //border : ' 1px solid #cccccc',
  //  borderRadius : '5px',
    paddingTop: '1%',
    paddingBottom: '1%',
    paddingLeft: '0%',
    paddingRight: '0%',
    textTransform: 'none',
    color:'#0158d4',
  },
  buttonGreen :{
    paddingTop: '1%',
    paddingBottom: '1%',
    paddingLeft: '0%',
    paddingRight: '0%',
    textTransform: 'none',
    color:'#00b300',
  },
  checkBoxColor:{
    color:'#0158d4',
  },
// grid: {
//   width: 100,
//   height: 100,
// },

}));


/****   For changing the textfield radius  : End *********/
const styles = (theme) => ({
  root: {
    '@media print': {
    margin: 0,
    padding: theme.spacing(1),
    borderRadius:0
    },
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: '-2px',
    color: theme.palette.grey[500],
  },
 
});
//Make custom button
const ColorButton = withStyles(theme => ({
    root: {
    //  color: '#fff',
      borderRadius : '3px',
      //  paddingTop: '9%',
      //  paddingBottom: '9%',
      height:'60%',
      width:'190px',
       fontSize:'11px',
       fontWeight: '550',
       color:'#fff',
       backgroundColor:'#e60000',
    '&:hover': {
      backgroundColor:'#e60000',
      
    },
    },
  }))(Button);

  const ColorButton1 = withStyles(theme => ({
    root: {
      color: '#fff',
      borderRadius : '3px',
      //  paddingTop: '9%',
      //  paddingBottom: '9%',
      height:'60%',
      width:'190px',
       fontSize:'11px',
       fontWeight: '550',
       color:'#fff',
       backgroundColor: 'orange',
       borderColor: 'orange',
    '&:hover': {
      color:'#fff',
      backgroundColor: 'orange',
      
    },
    },
  }))(Button);

  const ColorButton11 = withStyles(theme => ({
    root: {
      color: '#fff',
      borderRadius : '3px',
      //  paddingTop: '9%',
      //  paddingBottom: '9%',
      height:'60%',
      width:'190px',
       fontSize:'11px',
       fontWeight: '550',
       color:'#fff',
       borderColor: 'grey',
       backgroundColor: "grey",
      "&:hover": {
        color:'#fff',
        backgroundColor: "grey",
      },
      
    
    },
  }))(Button);



  const DialogTitle = withStyles(styles)(props => {
    
    const { children, classes,onClose,onChangeValue,warehouse,warehouses, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        {onClose ? (
            <Grid container item xs={10} justify="flex-end">
          <IconButton aria-label="close" className={classes.closeButton} onClick={props.onClose}>
            <CloseIcon />
          </IconButton>
          </Grid>
        ) : null}
        <Grid item xs={6} justify="flex-start">
        <Typography justify="center" variant="body1"style={{fontSize: '16px',
            fontWeight: '700',
            marginTop:'20px',
            marginBottom:'20px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>Shipment Action
            </Typography>
            </Grid>

      </MuiDialogTitle>
    );
  });

  /**
   * Description:To do show step of task
   */
  function getSteps() {
    return ['Marketplace Integration', 'Shipping Profile', 'Product Import','Product Sync','Import Customers'];
  }


/**
 * Description:This function is used for Select warehouse
 * @param {*} props 
 */
export default function ShippingProfile(props) {
   const classes = useStyles();
  
   const {openDeleteCard}= props;
   const userid=props.user_id;
  
   
   const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
    ppt:false,
    doc:false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const { gilad, jason, antoine,ppt,doc } = state;
 
            
  const handleClose1 = () => {
    props.handleDeleteCancle();
  };
           


    return (  
      <View>
      <Dialog 
        maxWidth="xs"
        fullWidth={true}
        className={classes.dialog} 
        onClose={()=>{handleClose1(false)}} 
        aria-labelledby="customized-dialog-title" 
        open={openDeleteCard}>
        <Grid item xs={12} >
       
        <DialogTitle id="customized-dialog-title" onClose={()=>{handleClose1(false)}}  style={{width:'96%',margin:'auto',paddingBottom:'0px',paddingTop:'0px'}} >
       
        </DialogTitle>
       </Grid>
      
         <DialogContent style={popUpStyle.sizeOfBody}>
       
            <Grid container justify="space-between">
            <Grid item xs={12} md={6} lg={6}>
          
            </Grid>
        <Grid item xs={12} md={6} lg={6} container justify="flex-end">
        <Grid item xs={4}  md={6} lg={6}>
      
     </Grid></Grid></Grid>  
         <form className={classes.form}>
         <Grid container className={classes.root} spacing={1}>
         
        <Grid container justify="space-between">
       
        <Grid item xs={12} md={12} lg={12}>
        <Grid>
        <Typography justify="center" variant="body1">
        
        </Typography></Grid>
        
       
      
        
      

        <Grid  items xs={12} lg={12}>
        <Grid justify="center" // Add it here :)
      container>
      
     
<ColorButton11
    size='large'
    variant="contained"
    color="primary"
    className={classes.profileMargin}
    onClick={()=>{props.handleRelease('Edit')}}
    
  //  onClick={()=>{handleNextPage(19)}}
  
    //onClick={()=>{navigation.navigate('Dashboard')}}
  >Edit
     {/* {language.copyandsaveobject} */}
  
  </ColorButton11>
       
         
          </Grid>
      
        </Grid>


        <Grid  items xs={12} lg={12}>
        <Grid justify="center" // Add it here :)
      container>
      
      {(() => { 
       if(props.rowStatus===7)
       {
         return(
<ColorButton1
    size='large'
    variant="contained"
    color="primary"
    className={classes.profileMargin}
    onClick={()=>{props.handleRelease(6)}}
    
  //  onClick={()=>{handleNextPage(19)}}
  
    //onClick={()=>{navigation.navigate('Dashboard')}}
  > Hold
     {/* {language.copyandsaveobject} */}
  
  </ColorButton1>
         )
       }
       else{
        if(  props.rowStatus===9)
        {
         return(
<ColorButton1
    size='large'
    variant="contained"
    color="primary"
    className={classes.profileMargin}
    onClick={()=>{props.handleRelease(6)}}
    
  disabled={true}
  >
Hold
     {/* {language.copyandsaveobject} */}
  
  </ColorButton1>
         )
        }
        else{
          return(
            <ColorButton1
                size='large'
                variant="contained"
                color="primary"
                className={classes.profileMargin}
                onClick={()=>{props.handleRelease(6)}}
                
              //  onClick={()=>{handleNextPage(19)}}
              
                //onClick={()=>{navigation.navigate('Dashboard')}}
              >
             Hold
                 {/* {language.copyandsaveobject} */}
              
              </ColorButton1>
                     )
        }
       }
       })()}
         
         
          </Grid>
      
        </Grid>

        <Grid  items xs={12} lg={12}>
        <Grid justify="center" // Add it here :)
      container>
      
      {(() => { 
       if(props.rowStatus===9)
       {
         return(
<ColorButton
    size='large'
    variant="contained"
    color="primary"
    className={classes.profileMargin}
    onClick={()=>{props.handleRelease(7)}}
    
  //  onClick={()=>{handleNextPage(19)}}
  
    //onClick={()=>{navigation.navigate('Dashboard')}}
  >
Cancel
     {/* {language.copyandsaveobject} */}
  
  </ColorButton>
         )
       }
       else{
         return(
<ColorButton
    size='large'
    variant="contained"
    color="primary"
    className={classes.profileMargin}
    onClick={()=>{props.handleRelease(7)}}
    
  //  onClick={()=>{handleNextPage(19)}}
  
    //onClick={()=>{navigation.navigate('Dashboard')}}
  >
Cancel
     {/* {language.copyandsaveobject} */}
  
  </ColorButton>
         )
       }
       })()}
         
         
          </Grid>
      
        </Grid>

        <Grid  items xs={12} lg={12}>
        <Grid justify="center" // Add it here :)
      container>
      
     
{/* <ColorButton11
    size='large'
    variant="contained"
    color="primary"
    className={classes.profileMargin}
    onClick={()=>{props.handleRelease('Delete')}}
    
 
  >Delete
    
  
  </ColorButton11> */}
       
         
          </Grid>
      
        </Grid>
        
        </Grid>
      
        </Grid>
       
         </Grid>
           </form>
           </DialogContent>
           <DialogActions style={{width:'96%',margin:'auto'}}>
            <Grid  justify="flex-end"
            container 
            spacing={24} >
            
            <Grid item>
           
    
       </Grid>
       </Grid>
       </DialogActions>
      </Dialog>
        </View>
    );
  }


  ShippingProfile.propTypes = {
    openDeleteCard: PropTypes.bool,
  //  handleNextPage: PropTypes.func,
  handleDeleteCancle: PropTypes.func
  };