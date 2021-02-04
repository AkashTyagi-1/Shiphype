import React ,{ useState, useEffect } from 'react';
import { fade,withStyles,makeStyles, useTheme} from '@material-ui/core/styles';
import {Platform,View,ScrollView,Image,Text,Dimensions} from 'react-native';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import Grid from '@material-ui/core/Grid';
import * as shiphypeservice from './ShipService/shiphype_service';
import Toast from './feedback/Toast';
import ProgressBar from './feedback//ProgressBar';

import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import validate from 'validate.js';


const useStyles = makeStyles(theme => ({
    
appBarSpacer: theme.mixins.toolbar,
content: {
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(2),
  flexGrow: 1,
  height: '80vh',
  overflow: 'auto',
  backgroundColor:'#fff',
},
content1: {
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(2),
  flexGrow: 1,
  height: '80vh',
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

root: {
  //flexGrow: 1,
  width: '100%',
},

  profileMargin1: {
    marginTop: theme.spacing(1),
    borderRadius : '5px',
    
  //  marginBottom: theme.spacing(1),
  },
  profileMargin11: {
    marginTop: theme.spacing(2),
    borderRadius : '5px',
    
  //  marginBottom: theme.spacing(1),
  },
 

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
      height:'80%',
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
 

  const schema = {
    marignvalue: {
      
      presence: { allowEmpty: false, message: 'is required' },
      length: {
        maximum: 32
      }
    },
    marignpercentage: {
      presence: { allowEmpty: false, message: 'is required' },
      length: {
        maximum: 64
      }
    },
   
  };
  
  
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
/**
 * Description:This function is used for Slide17
 * @param {*} props 
 */
export default function Slide17(props) {
  
   const classes = useStyles();
   const [shipTimeDate, setShipTimeDate] = React.useState(0);
   const [shipTimeDate1, setShipTimeDate1] = React.useState(0);
   const [shipData, setShipData] = React.useState([]);
   const [orderSettingId, setOrderSettingId] = React.useState(0);
   const userid=props.user_id;
   const [loading,setLoading]=React.useState(true);
   const [open, setOpen]=React.useState(false);
   const [msg,setMsg]=React.useState('');
   const [type,setType]=React.useState('');
   const [status,setStatus]=React.useState(false);
   const [editArrangeShip,seteditArrangeShip]=React.useState(true);
   const [open1, setOpen1]=React.useState(false);
   const [state1, setState1]=useState({
     vertical: 'center',
     horizontal: 'center',
   });
   const {vertical,horizontal} = state1;
   const [shipProfile,setShipprofiledone]=React.useState(false);

   
  const [packagingSlipI,setPackagingSlipI]=React.useState('1');
  const [canadaCutOfTime,setCanadaCutOfTime]=React.useState(3);
  const [usCutOfTime,setUsCutOfTime]=React.useState(3);
  const [signtaureRequired,setSigntaureRequired]=React.useState("2");

  const [orderInoivceI,setOrderInvoiceI]=React.useState('4');

  const [otherOptionF,setOtherOptionF]=React.useState(false);
  const [otherOptionS,setOtherOptionS]=React.useState('2');
  const [customerType,setCustomerType]=React.useState('2');
  const [insuranceOptionE,setInsuranceOptionE]=React.useState(false);
  const [insuranceOptionD,setInsuranceOptionD]=React.useState('2');
  const [setCuttofTime,setsetCuttofTime]=React.useState('1');
  const [enatime,enableTime]=React.useState(true);
  const [printsku,setPrintsku]=React.useState(false);
  var screenWidth = Dimensions.get('window').width;

  const [formState, setFormState] =useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  React.useEffect(() => {
     fetchOrderSetting();
  //   console.log('screenWidth',screenWidth);
  //   fetchShiphypeCompleteStep();    
  } ,[]);


  const handleChange = prop => event => {
      // if(event.target.id==='marignvalue'){
      //   setFormState(formState => ({
      //       ...formState,
      //       values: {
      //         ...formState.values,marignpercentage: '0',
      //         checkFrom : false
      //       },
      //       touched:{
      //         ...formState.touched,
      //         marignpercentage : true
      //       }
      //      }));
      // }

      // if(event.target.id==='marignpercentage'){
      //   setFormState(formState => ({
      //       ...formState,
      //       values: {
      //         ...formState.values,marignvalue: '0',
      //         checkFrom : false
      //       },
      //       touched:{
      //         ...formState.touched,
      //         marignvalue : true
      //       }
      //      }));
      // }
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
useEffect(() => {
    
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]
  );

      const handleClose3 = () => {
        setOpen1(false);
       // handleNextPage(22);
      };
  let widthScreen='';
  let widthScreen1='';
  if(screenWidth<400)
 {
  widthScreen=classes.content;
 }
 else if(screenWidth<690)
 {
  widthScreen=classes.content;
 }
 else if(screenWidth<900)
 {
  widthScreen=classes.content;
 }
 
 else if(screenWidth<1530){
  widthScreen=classes.content;
 }
 else if(screenWidth<1600)
 {
widthScreen=classes.content1;
 }
 else{
  widthScreen=classes.content;
 }
  const fetchOrderSetting = ()=>{
 
    //  const userid=5;
      setLoading(true);
      shiphypeservice.fetchShippingCalculator(userid)
      .then(response => {
       console.log("status",response.status);
            if(response.status === true) {
              setLoading(false);
               setShipData(response.data);


    setOrderSettingId(response.data.shippingcalculatorsettingId);
    bindData(response.data);

               
                
                 
                       }else{
                        setShipData(response.data);
                        if(response.data===null)
                        {
                            seteditArrangeShip(true);
                            setFormState(formState => ({
                                ...formState,
                                values: {
                                  ...formState.values,marignpercentage: '0',
                                  checkFrom : false
                                },
                                touched:{
                                  ...formState.touched,
                                  marignpercentage : true
                                }
                               }));
                         
                            setFormState(formState => ({
                                ...formState,
                                values: {
                                  ...formState.values,marignvalue: '0',
                                  checkFrom : false
                                },
                                touched:{
                                  ...formState.touched,
                                  marignvalue : true
                                }
                               }));
                        }
                        setLoading(false);
                        console.log("message",response.message);
                       }   
          }).catch((error) =>{
                console.error(error);
          });
    }
    const bindData = (data)=>{
      console.log("bind call");
     
        setFormState(formState => ({
            ...formState,
            values: {
              ...formState.values,marignpercentage: data.parcelprofitmarginPercentage.toString(),
              checkFrom : false
            },
            touched:{
              ...formState.touched,
              marignpercentage : true
            }
           }));
     
        setFormState(formState => ({
            ...formState,
            values: {
              ...formState.values,marignvalue: data.parcelprofitmargin.toString(),
              checkFrom : false
            },
            touched:{
              ...formState.touched,
              marignvalue : true
            }
           }));
      
           seteditArrangeShip(false);
     
    }

    const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

    const addOrderSetting =()=>{
     
      if(shipData === null)
        {
            const marignpercentage=formState.values.marignpercentage;
        
            const marignvalue=formState.values.marignvalue;
        
         shiphypeservice.addShippingCalculator(marignpercentage,marignvalue, userid)
               .then(response => {
                console.log("status",response.status);
                     if(response.status === true) {
                       setOpen(true);
                           setType('success');
                           setMsg(response.message);
                           setStatus(response.status);
                           setLoading(false);
                         //  addStepStatus();
                           fetchOrderSetting();
       
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
        else{
            const marignpercentage=formState.values.marignpercentage;
        
            const marignvalue=formState.values.marignvalue;
        
         shiphypeservice.updateShippingCalculator(orderSettingId,userid,marignpercentage,marignvalue)
               .then(response => {
                console.log("status",response.status);
                     if(response.status === true) {
                       setOpen(true);
                           setType('success');
                           setMsg(response.message);
                           setStatus(response.status);
                           setLoading(false);
                         //  addStepStatus();
                           fetchOrderSetting();
       
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
     // }

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

    return (  
      <View className={widthScreen}>
    <Grid justify="center">
            <ProgressBar 
             loading={loading}
            />
            </Grid>
         <View >
         
         <form className={classes.form}>
         <Grid  justify="space-between" // Add it here :)
      container 
      spacing={2} style={{marginLeft:'3px'}} >
         <Grid item xs={12} md={5} lg={6}   >
         <Snackbar 
      anchorOrigin={{ vertical, horizontal }}
      key={`${vertical},${horizontal}`}
      open={open1}
      autoHideDuration={3000}
      onClose={handleClose3}>
      <Alert onClose={handleClose3} severity="error">
      First Complete the Recieve Settting Steps.
      </Alert>
      </Snackbar>

      <Grid  item xs={10}>
         <Text 
           style={{
            fontSize: '14px',
            fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
       
            transition : 'all 0.25s',
           }}>{'\n'}Shipping Calculator Settings
           </Text>  
          
         </Grid>
       
         <Grid item xs={10} >
         <Text 
           style={{
            fontSize: '14px',
            fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
       
            transition : 'all 0.25s',
           }}>{'\n'}Parcel Profit Margin $
           </Text>  
             </Grid>

      <Grid item xs={10} >
      <TextField
      id="marignvalue"
      name='marignvalue'
      variant="outlined"
      fullWidth
      error={hasError('marignvalue')}
      helperText={
         hasError('marignvalue') ? formState.errors.marignvalue[0] : null
      }
      placeholder="marignvalue"
      size='small'
      type="text"
      onChange={handleChange('marignvalue')}
      className={classes.profileMargin1}
      value={formState.values.marignvalue || ''}
    />


  </Grid>
  </Grid>
       <Grid item xs={12} md={6} lg={6} >
       <Grid  item xs={10}>
         <Text 
           style={{
            fontSize: '14px',
            fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
       
            transition : 'all 0.25s',
           }}>{'\n'}{'\n'}
           </Text>  
          
         </Grid>
       
       <Grid item xs={10} >
         <Text 
           style={{
            fontSize: '14px',
            fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
       
            transition : 'all 0.25s',
           }}>{'\n'}Parcel Profit Margin %
           </Text>  
             </Grid>

      <Grid item xs={10} >
      <TextField
      id="marignpercentage"
      name='marignpercentage'
      variant="outlined"
      fullWidth
      error={hasError('marignpercentage')}
      helperText={
         hasError('marignpercentage') ? formState.errors.marignpercentage[0] : null
      }
      placeholder="marignpercentage"
      size='small'
      type="text"
      onChange={handleChange('marignpercentage')}
      className={classes.profileMargin1}
      value={formState.values.marignpercentage || ''}
    />


  </Grid>
 
     
  <Grid container item xs={10} justify="flex-end">
            <Grid>
          <ColorButton
          size='large'
          variant="contained"
          color='primary'
          className={classes.profileMargin1}
          disabled={!formState.isValid}
           
          onClick={()=>{addOrderSetting()}}>
        {( editArrangeShip ===true ? 'Save' : 'Update')}
        {/* Save */}
        </ColorButton>
            </Grid>
        </Grid>
       </Grid>
       </Grid></form>

  {showToast(open,msg,type)}
        </View>
       
         
           
        </View>
    );
  }
