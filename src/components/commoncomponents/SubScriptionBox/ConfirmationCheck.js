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
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepConnector from '@material-ui/core/StepConnector';
import StepLabel from '@material-ui/core/StepLabel';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import NativeSelect from '@material-ui/core/NativeSelect';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';

import ProgressBar from '.././feedback//ProgressBar';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import * as shiphypeservice from '.././ShipService/shiphype_service';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
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

const warehouses = [
  {
    value: 'w1',
    label: 'Created',
  },
  {
    value: 'w2',
    label: 'Onhold',
  },
  {
    value: 'w3',
    label: 'Processing',
  },
  {
    value: 'w4',
    label: 'Cancled',
  },
  {
    value: 'w5',
    label: 'Done',
  },
];

// const shippingPolicy = [
//   {
//     id: '1',
//     title: 'ebay',
//     services:[
//       {
//         id: 1,
//         name: 'Default Return Policy'
//       }
//       ,
//       {
//         id: 2,
//         name: 'Express Shipping'
//       }
//     ]
//   },
//   {
//     id: '2',
//     title: 'WooCommerene',
//     services:[
//       {
//         id: 3,
//         name: 'Ground Shipping'
//       }
//       ,{
//         id: 4,
//         name: 'Expedited Shipping'
//       }
//       ,
//       {
//         id: 5,
//         name: 'Express Shipping'
//       }
//     ]
//   },
//   {
//     id: '3',
//     title: 'Amazon',
//     services:[
//       {
//         id: 6,
//         name: 'Same Day Delivery'
//       }
//       ,{
//         id: 7,
//         name: '2 Day Delivery'
//       }
//       ,
//       {
//         id: 8,
//         name: 'Weekly Delivery'
//       }
//     ]
//   },
  
// ];

// const schema = {
//     sprintname: {
//       presence: { allowEmpty: false, message: 'is required' },
//       length: {
//         maximum: 32
//       }
//     },
//     sprintgoal: {  
//       presence: { allowEmpty: false, message: 'is required' },
//       length: {
//         maximum: 300
//       }
//     },
   
//   };

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
      width:'260px',
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

   const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
    ppt:false,
    doc:false,
  });
 

  const handleChange = (event) => {
    props.enableFunction();
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
         //   fontWeight: '700',
            marginTop:'20px',
            marginBottom:'20px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
       
       Our turnaround time for preparing Subscription Boxes is 1 to 2 Business Days
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
        {/* <ColorButton1
          size='large'
          variant="contained"
          color='primary'
          className={classes.submit}
          onClick={props.handleDeleteCancle}
        >
      No
        </ColorButton1> */}
        </Grid>

        <Grid item  justify="center">
        <ColorButton
          size='large'
          variant="contained"
          color='primary'
          className={classes.submit}
          onClick=  {()=>{handleChange()}}
        >
     Prepare Subscription Boxes
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