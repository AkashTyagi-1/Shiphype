import React ,{ useState, useEffect } from 'react';

import clsx from 'clsx';
import { fade,withStyles,makeStyles} from '@material-ui/core/styles';
import {Platform,View,Image,Text,Dimensions} from 'react-native';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import PropTypes from "prop-types";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import StepConnector from '@material-ui/core/StepConnector';

import ProgressBar from '.././feedback//ProgressBar';

import * as shiphypeservice from '.././ShipService/shiphype_service';
/**For Style */
import popUpStyle from '.././style/popUpStyle';


const QontoConnector = withStyles({
 
  line: {
    borderColor: '#3f51b5',
    borderTopWidth: 2,
    borderRadius: 1,
  },
})(StepConnector);


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
      color: '#fff',
      borderRadius : '3px',
      //  paddingTop: '9%',
      //  paddingBottom: '9%',
      height:'70%',
      width:'180px',
       fontSize:'11px',
       fontWeight: '550',
       color:'#fff',
       backgroundColor:'#0168fa',
    '&:hover': {
      backgroundColor: '#002080',
      
    },
    },
  }))(Button);
  //Make custom button
const ColorButton1 = withStyles(theme => ({
    root: {
      color: '#fff',
      borderRadius : '3px',
      //  paddingTop: '9%',
      //  paddingBottom: '9%',
      height:'70%',
      width:'30px',
       fontSize:'11px',
       fontWeight: '550',
       color:'#fff',
       backgroundColor:'#0168fa',
    '&:hover': {
      backgroundColor: '#002080',
      
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
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>Confirmation Message
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

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
/**
 * Description:This function is used for Select warehouse
 * @param {*} props 
 */
export default function ShippingProfile(props) {
   const classes = useStyles();
  
   const {openDeleteCard}= props;
   const enableTrue=props.enableTrue;
   const [loading,setLoading]=React.useState(false);
   const userid=props.userid;
   const [open1, setOpen1]=React.useState(false);
   const [state1, setState1]=useState({
     vertical: 'center',
     horizontal: 'center',
   });
   const {vertical,horizontal} = state1;
   const [shipProfile,setShipprofiledone]=React.useState(false);
   const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
    ppt:false,
    doc:false,
  });

  React.useEffect(() => {
    fetchShiphypeCompleteStep(); 
   } ,[]);
   const fetchShiphypeCompleteStep = ()=>{
  
    //  const userid=userid;
    shiphypeservice.fetchStepCompleteStatus(userid)
      .then(response => {
       console.log("status",response.status);
            if(response.status === true) {
                 if(response.data.length !== 0){
                  for(let i=0; i<response.data.length;i++){
                    if(response.data[i].shiphypesubstepId === 15){
                      setShipprofiledone(true);
                     
                     
                    }else{
  
                   }
                 }
                }
                
                       }else{
                        console.log("message",response.message);
                       }   
          }).catch((error) =>{
                console.error(error);
          });
    }
    const handleClose3 = () => {
      setOpen1(false);
     // handleNextPage(22);
    };


  const addStepStatus =()=>{
    // if(shipProfile===false)
    // {
    //   setOpen1(true);
    // }
    // else{
    // setLoading(true);
    
   // const userid=user_id;
    const shiphypesubsubstepId=0;
    const shiphypesubstepId=16;
    const shiphypestepId=0;
    shiphypeservice.addUserStepDoneSofar(userid,shiphypesubsubstepId,shiphypesubstepId,shiphypestepId)
          .then(response => {
           console.log("status",response.status);
                if(response.status === true) {
                  setLoading(false);
                  props.enableFunction();
                           }else{
                            setLoading(false);
                            console.log("message",response.message);
                           }   
              }).catch((error) =>{
                    console.error(error);
              });
            // }
            }

            const addenabledisable =()=>{
            
              shiphypeservice.addenabledisable(userid,enableTrue)
                    .then(response => {
                     console.log("status",response.status);
                          if(response.status === true) {
                            setLoading(false);
                            addStepStatus();
                          //  props.enableFunction();
                                     }else{
                                      setLoading(false);
                                      console.log("message",response.message);
                                     }   
                        }).catch((error) =>{
                              console.error(error);
                        });
                      
                      }
          
  const handleChange = (event) => {
    addenabledisable();
   // addStepStatus();
   
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
       <Grid justify="center">
            <ProgressBar 
             loading={loading}
            />
            </Grid>
         <DialogContent style={popUpStyle.sizeOfBody}>
         <Snackbar 
      anchorOrigin={{ vertical, horizontal }}
      key={`${vertical},${horizontal}`}
      open={open1}
      autoHideDuration={3000}
      onClose={handleClose3}>
      <Alert onClose={handleClose3} severity="error">
      First Complete the Order Settting Steps.
      </Alert>
      </Snackbar>
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
      
       <Text style={{fontSize: '14px',
            fontWeight: '700',
            marginTop:'20px',
            marginBottom:'20px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
       
       {( enableTrue === true ? ' Are you sure you want to Enable Fulfillment? ' : ' Are you sure you want to Disable Fulfillment? ')}
       </Text>
       <Text style={{fontSize: '12px',
           // fontWeight: '700',
            marginTop:'20px',
            marginBottom:'20px',
            textAlign:'center',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
      {(() => { 
        if(enableTrue === true)
        {
          return(
            <Text style={{fontSize: '12px',
            // fontWeight: '700',
             marginTop:'20px',
             marginBottom:'20px',
             textAlign:'center',
             fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
               Once enabled, ShipHype will start fulfilling your orders.</Text>
          )
        }
        
        else{
          return(
            <Text style={{fontSize: '12px',
            // fontWeight: '700',
             marginTop:'20px',
             marginBottom:'20px',
             textAlign:'center',
             fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
              Once disabled, ShipHype will stop fulfilling your orders.
             </Text>
          )
        }
          })()} 
      {/* {( enableTrue === true ? 'Once enabled, your customers orders will stop fetching.'
       : ' After Disable  the customer’s orders will stop popping up. We can not fetch orders every 30 minutes.')} */}
 </Text>
         
          </Grid>
      
        </Grid>
       
        </Grid>
      
        </Grid>
       
         </Grid>
           </form>
           </DialogContent>
           <DialogActions style={{margin:'auto'}}>
            <Grid  justify="flex-end"
            container 
            spacing={24} >
            
            <Grid item>
            <Grid container spacing={1} justify="center">
        <Grid item  justify="center">
      
        </Grid>

        <Grid item  justify="center">
        <ColorButton
          size='large'
          variant="contained"
          color='primary'
          className={classes.submit}
          onClick=  {()=>{handleChange()}}
        >
      {( enableTrue === true ? ' Enable' : ' Disable')}
        </ColorButton>
        </Grid>
      </Grid>
    
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