import React ,{ useState, useEffect } from 'react';
import { fade,withStyles,makeStyles, useTheme} from '@material-ui/core/styles';
import {Platform,View,ScrollView,Image,Text,Dimensions} from 'react-native';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from "@material-ui/core/TextField";
import DialogActions from '@material-ui/core/DialogActions';
import PropTypes from "prop-types";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import Stepper from '@material-ui/core/Stepper';
import * as shiphypeservice from './ShipService/shiphype_service';
import StepConnector from '@material-ui/core/StepConnector';
import MaterialTable , { MTableToolbar }from 'material-table';
import { forwardRef } from 'react';
import Paper from '@material-ui/core/Paper';
import Toast from './feedback/Toast';
import { format } from 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import ProgressBar from './feedback//ProgressBar';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import Divider from '@material-ui/core/Divider';

import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import popUpStyle from './style/popUpStyle';
import HomeIcon from '@material-ui/icons/Home';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
/**For Style */
import validate from 'validate.js';
const QontoConnector = withStyles({
 
  line: {
    borderColor: '#3f51b5',
    borderTopWidth: 2,
    borderRadius: 1,
  },
})(StepConnector);

const schema = {
  shipFrom: {
    
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32
    }
  },
  shipFromAttn: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 64
    }
  },
  address1: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 64
    }
  },
  
  address2:{
  presence: { allowEmpty: false, message: 'is required' },
 
  length: {
    maximum: 64
  }
 },

 zipCode:{
  presence: { allowEmpty: false, message: 'is required' },
 
  length: {
    maximum: 64
  }

 },
 city:{
  presence: { allowEmpty: false, message: 'is required' },
  
  length: {
    maximum: 11
  }
 },
 state:{
  presence: { allowEmpty: false, message: 'is required' },
 
  length: {
    maximum: 64
  }

 },
 country:{
  presence: { allowEmpty: false, message: 'is required' },
 
  length: {
    maximum: 64
  }

 },
 phone:{
  presence: { allowEmpty: false, message: 'is required' },
 
  length: {
    maximum: 10
  }

 },
 packagePallets:{
  presence: { allowEmpty: false, message: 'is required' },
 
  length: {
    maximum: 64
  }

 },
 length:{
  presence: { allowEmpty: false, message: 'is required' },
 
  length: {
    maximum: 64
  }

 },
 hieght:{
  presence: { allowEmpty: false, message: 'is required' },
 
  length: {
    maximum: 64
  }

 },
 width:{
  presence: { allowEmpty: false, message: 'is required' },
 
  length: {
    maximum: 64
  }

 },
 packagePalletsWeight:{
  presence: { allowEmpty: false, message: 'is required' },
 
  length: {
    maximum: 64
  }

 },

};
const pickUP = [
    
  {
    id: 1,
    label: 'Yes',
  },
  {
    id: 2,
    label: 'No',
  },
 
];

const pickUPTime = [
    
    {
      id: 1,
      label: '10 AM',
    },
    {
      id: 2,
      label: '11 AM',
    },
    {
        id: 3,
        label: '12 AM',
      },
      {
        id: 4,
        label: '1 PM',
      },
      {
        id: 5,
        label: '2 PM',
      },
      {
        id: 5,
        label: '3 PM',
      },
      {
        id: 6,
        label: '4 PM',
      },
    

   
  ];

const useStyles = makeStyles(theme => ({
    submit: {
      margin: theme.spacing(0, 0, 0),
      borderRadius : 0,
},
appBarSpacer: theme.mixins.toolbar,
content: {
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(2),
  flexGrow: 1,
  height: '120vh',
  overflow: 'auto',
  backgroundColor:'#fff',
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
  
  },
  profileMargin1: {
    marginTop: theme.spacing(1),
    borderRadius : '5px',
  //  marginBottom: theme.spacing(1),
  },
  button2 :{
    border : ' 1px solid #c0ccda',
    borderRadius : '5px',
    // paddingTop: '10%',
    // paddingBottom: '10%',
    height:'100%',
    width:'100px',
    fontSize:'11px',
    fontWeight: '550',
    color:'rgba(27, 46, 75, 0.7)',
    // paddingLeft: '22%',
    // paddingRight: '22%',
    
  },
  buttonHome :{
   // border : ' 1px solid #c0ccda',
    borderRadius : '5px',
    // paddingTop: '10%',
    // paddingBottom: '10%',
    fontSize:'11px',
    fontWeight: '550',
    color:'#fff',
    backgroundColor:'#000',
    // paddingLeft: '22%',
    // paddingRight: '22%',
    height:'100%',
    width:'100px',
    '&:hover': {
      color:'#fff',
      backgroundColor:'#000',
    },
  },
  buttonOrder :{
    // border : ' 1px solid #c0ccda',
     borderRadius : '5px',
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    height:'100%',
    width:'110px',
     fontSize:'11px',
     fontWeight: '550',
     color:'#fff',
     backgroundColor:'#0168fa',
    //  paddingLeft: '22%',
    //  paddingRight: '22%',
     '&:hover': {
       color:'#fff',
       backgroundColor:'#0168fa',
     },
   },
   margin: {
    margin: theme.spacing(1),
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
      height:'90%',
      width:'100px',
       fontSize:'11px',
       fontWeight: '550',
       color:'#fff',
       backgroundColor:'#0168fa',
    '&:hover': {
      backgroundColor: '#002080',
      
    },
    },
  }))(Button);
 

 
  /**
   * Description:To do show step of task
   */
  function getSteps() {
    return ['Marketplace Integration', 'Shipping Profile', 'Product Import','Product Sync','Import Customers'];
  }

/**
 * Description:This function is used for Slide17
 * @param {*} props 
 */
export default function Slide17(props) {
  
   const classes = useStyles();
   const [carrierId, setSetCarrierId] = React.useState('');
   const [tailgateValue, setTailgateValue] = React.useState('');
   const [pickupRequired, setPickupRequired] = React.useState('');
   const [shipTimeDate, setShipTimeDate] = React.useState('');
   const {openAddCustomerManually}= props;
   const [activeStep, setActiveStep] = React.useState(0);
   const [completed, setCompleted] = React.useState(new Set());
   const [skipped, setSkipped] = React.useState(new Set());
   const steps = getSteps();
   const userid=props.user_id;
   const [checkedA,setCheckedA]=React.useState(true);
   const[dataproduct,setDataProduct]=React.useState([]);
   const[shipData,setShipData]=React.useState([]);
   const [loading,setLoading]=React.useState(true);
   const [open, setOpen]=React.useState(false);
   const [msg,setMsg]=React.useState('');
   const [type,setType]=React.useState('');
   const [selectedStartDate, setSelectedStartDate] = React.useState(new Date());
   const [startsprint,setStartsprint]=React.useState(0);
   const [status,setStatus]=React.useState(false);
  const[orderCouierType,setOrderCourierType]=React.useState([]);
  
  const [qualitycontrol,setQualitycontrol]=React.useState(false);
  const [printsku,setPrintsku]=React.useState(false);
  const [formState, setFormState] =useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });
/**
 * Description:To do checklist of steps
 */
const handleChangequality = (event) => {
    setQualitycontrol(event.target.checked);
    };

   /**
    * Description:To do set value of checkbox
    * @param {*} event 
    */
    const handleChangeprintsku = (event) => {
    setPrintsku(event.target.checked);

    };    
        
  /**
   * Description:Callback function
   */
  useEffect(() => {
    
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]
  );

  const handleChangeShipDateTime = event => {
    setShipTimeDate(event.target.value);
  };
   const handleStartDateChange = (date,value) => {
    setStartsprint(value);
    setSelectedStartDate(date);
    console.log("startdate",value);

  };
     /**
   * Description:This function call on type character inside input text
   * @param {} prop 
   */
  const handleChange = prop => event => {
    console.log("email",event.target.value);
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
React.useEffect(() => {
    // fetchCustomePackageingList();
  //   fetchShiphypeCompleteStep();    
  } ,[]);
 
 
  const fetchArrangeShip = ()=>{
 
   //  const userid=5;
     setLoading(true);
     shiphypeservice.fetchArrangeShip(userid)
     .then(response => {
      console.log("status",response.status);
           if(response.status === true) {
             setLoading(false);
                setShipData(response.data);
               
                bindData(response.data);
                      }else{
                       setLoading(false);
                       console.log("message",response.message);
                      }   
         }).catch((error) =>{
               console.error(error);
         });
   }
  const bindData = (data)=>{
    console.log("bind call",data);
    
       setFormState(formState => ({
        ...formState,
        values: {
          ...formState.values,packagePalletsWeight: data[0].zipcode,
          checkFrom:false
        },
        touched:{
          ...formState.touched,
          packagePalletsWeight : true
        }
       })); 
       setSelectedStartDate(data.sprintstart);
       setTailgateValue();
       setPickupRequired();
       setShipTimeDate();
    }
    const addArrangeShip =()=>{
        setLoading(true);
        if(shipData.length === 0)
        {
         const shipFrom=formState.values.shipFrom;
         const shipFromAttn=formState.values.shipFromAttn;
         const address1=formState.values.address1;
         const address2=formState.values.address2;
         const zipCode=formState.values.zipCode;
         const city=formState.values.city;
         const state=formState.values.state;
         const country=formState.values.country;
         const phone=formState.values.phone;  
         const packagePallets=formState.values.packagePallets;
         const length=formState.values.length;
         const hieght=formState.values.hieght;
         const width=formState.values.width;
         const packagePalletsWeight=formState.values.packagePalletsWeight;

         const tailgateValue=tailgateValue;
         const shipTimeDate=shipTimeDate;
         const pickupRequired=pickupRequired;
         const selectedStartDate=format(selectedStartDate, "yyyy-MM-dd hh:mm:ss");
        shiphypeservice.addArrangeShip(userid,shipFrom,tracking,carrierId,selectedStartDate)
              .then(response => {
               console.log("status",response.status);
                    if(response.status === true) {
                      setOpen(true);
                          setType('success');
                          setMsg(response.message);
                          setStatus(response.status);
                          setLoading(false);
      
                               }else{
                          setOpen(true);
                          setType('error');
                          setMsg(response.message);
                          setStatus(response.status);
                          setLoading(false);
                          console.log("message",response.message);
                               }   
                  }).catch((error) =>{
                        console.error(error);
                  });
                }
                else
                {
                  
                    const shipFrom=formState.values.shipFrom;
                    const shipFromAttn=formState.values.shipFromAttn;
                    const address1=formState.values.address1;
                    const address2=formState.values.address2;
                    const zipCode=formState.values.zipCode;
                    const city=formState.values.city;
                    const state=formState.values.state;
                    const country=formState.values.country;
                    const phone=formState.values.phone;  
                    const packagePallets=formState.values.packagePallets;
                    const length=formState.values.length;
                    const hieght=formState.values.hieght;
                    const width=formState.values.width;
                    const packagePalletsWeight=formState.values.packagePalletsWeight;
           
                    const tailgateValue=tailgateValue;
                    const shipTimeDate=shipTimeDate;
                    const pickupRequired=pickupRequired;
                    const selectedStartDate=format(selectedStartDate, "yyyy-MM-dd hh:mm:ss");
       shiphypeservice.updateArrangeShip(userid,shipFrom,tracking,carrierId,selectedStartDate)
             .then(response => {
              console.log("status",response.status);
                   if(response.status === true) {
                     setOpen(true);
                         setType('success');
                         setMsg(response.message);
                         setStatus(response.status);
                         setLoading(false);
      
                              }else{
                         setOpen(true);
                         setType('error');
                         setMsg(response.message);
                         setStatus(response.status);
                         setLoading(false);
                         console.log("message",response.message);
                              }   
                 }).catch((error) =>{
                       console.error(error);
                 });
                }
                }

     const handleClose = () => {
      setOpen(false);
    };
    const showToast =(open,msg,type)=>{ 
   
      return(
    <Toast
     open={open}
     handleClose={handleClose}
     type={type}
     msg={msg}
    />
   )
    }
        
    const onNextfunction=()=>{
      props.handleNextPage('additional_order_options');
  }

  const handleCallbackfunction =()=>{
      props.backButtonRouting('select_ship_type');
    }

                    const hasError = field =>
                    formState.touched[field] && formState.errors[field] ? true : false;
          let screenWidth = Dimensions.get('window').width;

    return (  
      <View className={classes.content}>
    <View className={classes.appBarSpacer} />

<View >
            <Grid item  container lg={12}  >
            <Grid item  lg={5}  style={popUpStyle.breadCrumSidePadding} >
          <Text style={popUpStyle.breadCrundCss1}>DASHBOARD /</Text>
          <Text style={popUpStyle.breadCrundCss2}> SHIPPINGS LABELS {'\n'} </Text> 
          
              </Grid>
              <Grid item  lg={2} ></Grid>
              </Grid>
              </View>  
   
        

         {/* <ScrollView> */}
         <View >
        
         <Grid container justify="space-between" spacing={2}>
            <Grid item xs={12} md={4} lg={4}>
            <Text style={{ fontSize: '13px',
            fontWeight: '700',
            // marginLeft:'10px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}}>
              
              Select Shipping Type</Text>
              </Grid>
              <Grid item xs={12} md={4} lg={4} ></Grid>
              <Grid item xs={12} md={4} lg={4} 
              //style={{marginRight:'70px'}} 
               >
  
              <Grid container item  justify="flex-end">

              <Grid>
              <ColorButton
       size='large'
       variant="contained"
       color="primary"
      // className={classes.profileMargin}
       onClick={()=>{handleCallbackfunction()}}
       >
          Back
       </ColorButton>&nbsp;&nbsp;
    
              </Grid>
            <Grid>
              <ColorButton
       size='large'
       variant="contained"
       color="primary"
       disabled={!formState.isValid}
       //className={classes.profileMargin}
       onClick={()=>{onNextfunction()}}
       >
          Next
       </ColorButton>
    
              </Grid>
              </Grid>
            
              </Grid>
              </Grid>
         <form className={classes.form}>
         <Grid  justify="space-between" // Add it here :)
      container 
      spacing={2} >
         <Grid item xs={12} md={5} lg={6}>
        
  <Grid item xs={10} >
  <TextField
                id="anyspecialrequest"
                name="anyspecialrequest"
                variant="outlined"
                fullWidth
               
                placeholder="Shiphype Order No."
                size='small'
                type="text"
              
                onChange={handleChange('anyspecialrequest')}
                value={formState.values.anyspecialrequest}
                className={classes.profileMargin1}
              />

  </Grid>
  <Grid item xs={10} >
  <TextField
                id="anyspecialrequest"
                name="anyspecialrequest"
                variant="outlined"
                fullWidth
               
                placeholder="Package weight/size"
                size='small'
                type="text"
                onChange={handleChange('anyspecialrequest')}
                value={formState.values.anyspecialrequest}
                className={classes.profileMargin1}
              />

  </Grid>
  
  <Grid item xs={10}>
  <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={qualitycontrol} onChange={handleChangequality} name="qualitycontrol" />}
            label={<Text style={{ fontSize: '12px',
            //fontWeight: '700',
            // marginLeft:'10px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}}>
              
              Need Commercial Invoice</Text>}
          />
         
          </FormGroup>
  </Grid>
  
          <Grid container item xs={10} justify="flex-end">
            {/* <Grid>
          <ColorButton
          size='large'
          variant="contained"
          color='primary'
          className={classes.submit}
          disabled={!formState.isValid}
       //   onClick={()=>{addArrangeShip()}}
       >
          SAVE
        </ColorButton>
            </Grid> */}
          </Grid>
       </Grid>
    
       </Grid></form>

  {showToast(open,msg,type)}
        </View>
       
         
           
        </View>
    );
  }

