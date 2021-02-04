import React ,{ useState, useEffect } from 'react';

import clsx from 'clsx';
import { fade,withStyles,makeStyles} from '@material-ui/core/styles';
import {Platform,View,Image,Text,Dimensions} from 'react-native';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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

import validate from 'validate.js';




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
      borderRadius :'3px',
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
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>Confirmation Check
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
  const schema = {
    Reason: {
      presence: { allowEmpty: false, message: 'is required' },
      length: {
        maximum: 1540
      }
    },
   
  };

/**
 * Description:This function is used for Select warehouse
 * @param {*} props 
 */
export default function ShippingProfile(props) {
   const classes = useStyles();
  
   const {openOnHoldOrder}= props;
   const userid=props.user_id;
  
   const [loading,setLoading]=React.useState(false);
   const [carrierId, setCarrierId] = React.useState('');
   
  const[orderCouierType,setOrderCourierType]=React.useState([]);
  const[editCase,setEdit]=React.useState(0);
  const[resonId,setResionId]=React.useState(0);
   
   const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
    ppt:false,
    doc:false,
  });
  const [formState, setFormState] =useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });



  const { gilad, jason, antoine,ppt,doc } = state;
  React.useEffect(() => {
           
   // fetchOrderStatus();  
   
    
 } ,[]);
 useEffect(() => {
    
  const errors = validate(formState.values, schema);

  setFormState(formState => ({
    ...formState,
    isValid: errors ? false : true,
    errors: errors || {}
  }));
}, [formState.values]
);
const handleChange1 = event => {
  setCarrierId(event.target.value);
};
 /**
   * Description:This function call on type character inside input text
   * @param {} prop 
   */
  const handleChange = prop => event => {
    console.log("Reason",event.target.value);
    event.persist();
    //setValues({ ...formState.values, [prop]: event.target.value });
    setFormState(formState => ({
     ...formState,
     values: {
       ...formState.values,[prop]:event.target.value,
       checkFrom:false
     },
     touched:{
       ...formState.touched,
       [event.target.name]: true
     }
    }));
};
 
            const hasError = field =>
            formState.touched[field] && formState.errors[field] ? true : false;
            
  const handleClose1 = () => {
    props.handleDeleteCancle();
  };
  const handleChangeShipped = () => {
    setLoading(true);
    props.handleConfirmHold(formState.values.Reason,editCase,resonId)
  }; 


    return (  
      <View>
      <Dialog 
        maxWidth="xs"
        fullWidth={true}
        className={classes.dialog} 
        onClose={()=>{handleClose1(false)}} 
        aria-labelledby="customized-dialog-title" 
        open={openOnHoldOrder}>
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
            fontWeight: '700',
            marginTop:'10px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
      Are you sure you want to change the order status?
       </Text>
       <Text style={{fontSize: '12px',
           // fontWeight: '700',
            marginTop:'10px',
            marginBottom:'10px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
    Add Reason For Hold Order. </Text>
       <Grid item xs={10} >
    
    <TextField
      id="Reason"
      name='Reason'
      variant="outlined"
      fullWidth
      error={hasError('Reason')}
      helperText={
         hasError('Reason') ? formState.errors.Reason[0] : null
      }
      placeholder="Reason"
      size='small'
      type="text"
      multiline = {true}
      rows={3}
      onChange={handleChange('Reason')}
      className={classes.profileMargin1}
      value={formState.values.Reason || ''}
    />

  </Grid>
  
      
         
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
        <ColorButton1
          size='large'
          variant="contained"
          color='primary'
          className={classes.submit}
          onClick={props.handleDeleteCancle}
        >
      No
        </ColorButton1>
        </Grid>

        <Grid item  justify="center">
        <ColorButton
          size='large'
          variant="contained"
          color='primary'
          className={classes.submit}
          onClick={handleChangeShipped}
        >
     On Hold
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
    openOnHoldOrder: PropTypes.bool,
  //  handleNextPage: PropTypes.func,
  handleDeleteCancle: PropTypes.func
  };