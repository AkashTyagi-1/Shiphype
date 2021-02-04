import React ,{ useState, useEffect } from 'react';
import clsx from 'clsx';
import { fade,withStyles,makeStyles, useTheme} from '@material-ui/core/styles';
import {Platform,View,ScrollView,Image,Text,Dimensions} from 'react-native';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import Grid from '@material-ui/core/Grid';
import * as shiphypeservice from './ShipService/shiphype_service';
import StepConnector from '@material-ui/core/StepConnector';
import ProgressBar from './feedback//ProgressBar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import Typography from '@material-ui/core/Typography';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Box from '@material-ui/core/Box';
import popUpStyle from './style/popUpStyle';
import Link from '@material-ui/core/Link';
import axios from 'axios';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
// export const BASE_URL='http://3.20.18.207/api/';
 export const BASE_URL='https://api.shiphype.com/api/';
//export const BASE_URL='https://preptest.shiphype.com/api/';
/**For Style */
import validate from 'validate.js';
import AsyncStorage from "@react-native-community/async-storage";
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

  radioButtonCss:{
    color:'#000',fontSize:'2px',    height: '25px'
  },
// grid: {
//   width: 100,
//   height: 100,
// },
normal :{
   
    borderRadius : '0px',
    width:'70%',
    //height:'70px',
    backgroundColor:'#D3D3D3',
    color:'#fff',
    '&:hover': {
        backgroundColor:'#D3D3D3',
        color:'#fff',
        },
    
  },
  normalSelected :{
   
    borderRadius : '0px',
    width:'70%',
    //height:'70px',
    backgroundColor:'#0168fa',
    color:'#fff',
    '&:hover': {
      
        backgroundColor:'#0168fa',
        color:'#fff',
        },
    
  },
  urgent :{
   
    borderRadius : '0px',
    width:'70%',
    //height:'70px',
    backgroundColor:'#D3D3D3',
    color:'#fff',
    '&:hover': {
        backgroundColor:'#D3D3D3',
        color:'#fff',
        },
    
    
  },
  urgentSelected :{
   
    borderRadius : '0px',
    width:'70%',
    //height:'70px',
    backgroundColor:'#0168fa',
    color:'#fff',
    '&:hover': {
        backgroundColor:'#0168fa',
        color:'#fff',
        },
    
    
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
      height:'100%',
      width:'90px',
       fontSize:'11px',
       fontWeight: '550',
       color:'#fff',
       backgroundColor:'#0168fa',
      '&:hover': {
        backgroundColor: '#002080',
        
      },
    },
  }))(Button);
 
  const ColorButton4 = withStyles(theme => ({
    root: {
      color: '#fff',
      backgroundColor: '#0168fa',
       borderRadius: '3px',
       height:36,
       width:30,
       marginTop:'10px',
       marginLeft:'3px',
            fontSize:'12px',
            fontWeight: '550',
       fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
      '&:hover': {
        backgroundColor: '#002080',
        
      },
    },
  }))(Button);
  const ColorButton3 = withStyles(theme => ({
    root: {
      color: '#fff',
      backgroundColor: '#0168fa',
       borderRadius: '3px',
       height:36,
       width:230,
       marginTop:'10px',
       marginLeft:'3px',
            fontSize:'12px',
            fontWeight: '550',
       fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
      '&:hover': {
        backgroundColor: '#002080',
        
      },
    },
  }))(Button);
 
  
/**
 * Description:This function is used for Slide17
 * @param {*} props 
 */
export default function SelectShippingType(props) {
  
   const classes = useStyles();
   const userid=props.user_id;
   const [checkedA,setCheckedA]=React.useState(false);
   const[shipData,setShipData]=React.useState([]);
   const [loading,setLoading]=React.useState(false);
   const [shipPlocyId,setShipPlocyId]=React.useState(0);
   const [shipLabelId,setShippingLabelId]=React.useState(0);

    const [dataLength , setDataLength] = React.useState(0);
    const [moduleid, setModuleid] = React.useState([]);
    const [changedWarehouseid, setchangedWarehouseid] = React.useState([]);
    const [changedOptionid, setchangedOptionid] = React.useState([]);
    const [addrequest,setAddrequest]=React.useState(false);
    const [shipmentType,setshipmentType]=React.useState(false);
    const [shipmentType2,setshipmentType2]=React.useState(false);
    const [shipmentType3,setshipmentType3]=React.useState(false);
    const [carrier,setCarreri]=React.useState('1');
    const [carrierTre,setCarrierTre]=React.useState('1');
    const [shipmentType8,setshipmentType8]=React.useState('0');

    const [shipmentType9,setshipmentType9]=React.useState(false);
    const [shipmentType1,setshipmentType1]=React.useState(1);
    const [shipmentType11,setshipmentType11]=React.useState('1');
    const [enableShipmentType,setEnableShipmentType]=React.useState(false);
    const module=[];
    const [invoiceFile,setInvoiceFile]=React.useState('');
    const optionArray=[];
  
  const [formState, setFormState] =useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  
  const [selectoptionId,setSelectoptionId]=React.useState(0);
  const moduleTotalLength=[];
  
/**
 * Description:To Do check module acess to role
 * @param {*} event 
 */
const handleChangeCheckbox = (event) => {
  console.log(event.target.id);
  console.log(event.target.checked);
  if(event.target.checked===false)
  {
    setCheckedA(true);
    setEnableShipmentType(false);
    setShipPlocyId(0);
  //  setAddrequest(event.target.checked);
  }
  else{
    setCheckedA(false);
    setEnableShipmentType(true);
    
  setShipPlocyId(event.target.id);
 // setAddrequest(event.target.checked);
  }
  setAddrequest(false);
};
var ProductSelect=[];
React.useEffect(() => {
  fetchShipPolicy(); 
  AsyncStorage.multiGet(["invoicename"]).then((data) => {
    if (data[0][1] != null) {
      ProductSelect = JSON.parse(data[0][1]);
      console.log("Orderselect",ProductSelect);
      if(ProductSelect.length>0){
        setshipmentType8('10')
        setshipmentType9(true);
        setInvoiceFile(ProductSelect);
      }
    }
  });
  } ,[]);
 
  const fetchShipPolicy =() =>{
  //   setLoading(true);
  //   shiphypeservice.fetchShipPolicyOrder(userid,1)
  //  .then(response => {
  //   console.log("status",response.status);
  //       if(response.status === true) {
  //                    setLoading(false);
  //                    //setShippingPolicyStatus(true);
  //                    setShipData(response.data);  

  //                    for(let i=0; i<response.data.length;i++)
  //        {
         
  //        for(let j=0; j<response.data[i].polocies.length; j++)
  //        {
  //          if(response.data[i].polocies[j].selected === true){
  //            module.push(response.data[i].polocies[j].integrationspoliciesId);
             
  //        }
  //        moduleTotalLength.push(response.data[i].polocies[j].integrationspoliciesId);
  //        }
       
  //        }
         if(props.editOrder!==null)
         {
          setCheckedA(false);
          setEnableShipmentType(true);
          setAddrequest(true);
        //  setModuleid([...moduleid,module]);
         setshipmentType11(props.editOrder.shipmenttype);
         setCarreri(props.editOrder.shippingpolicyId);
            if(props.editOrder.shippingpolicyId===1)
         {
          setCarrierTre('1');
         }
         else if(props.editOrder.shippingpolicyId===2)
         {
          setCarrierTre('2');
         }
         else if(props.editOrder.shippingpolicyId===3)
         {
          setCarrierTre('3');
         }
       
        setShippingLabelId(props.editOrder.shippinglabeldocnameid);
        setInvoiceFile(props.editOrder.shippinglabeldocname);
        if(props.editOrder.shippinglabeldocname!=='')
        {
          setshipmentType9(true);
          setshipmentType8('10');
        }
         }
         else{
           if(props.shipingtype!==0)
           {
            setCheckedA(false);
            setEnableShipmentType(true);
            setAddrequest(true);
            setCarreri(props.shipingtype);
            if(parseInt(props.shipingtype)===1)
            {
             setCarrierTre('1');
            }
            else if(parseInt(props.shipingtype)===2)
            {
             setCarrierTre('2');
            }
            else if(parseInt(props.shipingtype)===3)
            {
             setCarrierTre('3');
            }
           }
           if(props.shipmentType!==0)
           {
            setshipmentType11(props.shipmentType);
           }
         }
         
       
       //  setDataLength(moduleTotalLength.length);
        //  if(props.editOrder.shippingpolicyId===1)
        //  {
        //   setCarreri('1');
        //   setshipmentType(true);
        //  }
        //  else if(props.editOrder.shipmenttype===2)
        //  {
        //   setshipmentType2(true);
        //   setCarreri('2');
        //  }
        //  else if(props.editOrder.shipmenttype===3)
        //  {
        //   setshipmentType3(true);
        //   setCarreri('3');
        //  }
        //  else if(props.editOrder.shipmenttype===4)
        //  {
        //   setshipmentType3(true);
        //   setCarreri('4');
        //  }
        //  else if(props.editOrder.shipmenttype===5)
        //  {
        //   setshipmentType3(true);
        //   setCarreri('5');
        //  }
        //  else if(props.editOrder.shipmenttype===6)
        //  {
        //   setshipmentType3(true);
        //   setCarreri('6');
        //  }
        // setshipmentType1(pareprops.editOrder.shipmenttype);

      //              }else{
      //               setLoading(false);
      //                console.log("message",response.message);
      //              }   
      // }).catch((error) =>{
      //       console.error(error);
      //       setLoading(false);
      // });
  }


    const onNextfunction=()=>{

      for(let i=0;i<changedOptionid.length;i++){
        setSelectoptionId(changedOptionid[i]);
      }
      for(let i=0;i<changedWarehouseid.length;i++){
        setShippolicyId(changedWarehouseid[i]);
      }
      
      addUserOptions();
    
    }

    const handleCallbackfunction =()=>{
        props.backButtonRouting('select_customer_kind');
      }
    

      const addUserOptions =()=>{
        // setLoading(true);
       
        //           shiphypeservice.addUserOptions(changedOptionid,userid)
        //           .then(response => {
        //            console.log("status",response.status);
        //                 if(response.status === true) {
        //                   setLoading(false);
                          addShippingPloicy();
                         
                      //              }else{
                      //               setLoading(false);
                      //               console.log("message",response.message);
                      //              }   
                      // }).catch((error) =>{
                      //       console.error(error);
                      // });
                }

                const addShippingPloicy =()=>{
                //   setLoading(true);   
                // shiphypeservice.addShipemntPolicy(changedWarehouseid,userid)
                // .then(response => {
                //  console.log("status",response.status);
                //       if(response.status === true) {
                //         setLoading(false); 
                      const type=shipmentType8 === '0' ? shipmentType11 : shipmentType8;
                      props.setShipingtypeUpdate(carrier,shipLabelId,invoiceFile,type);
                      props.handleNextPage('additional_order_options');

                    //              }else{
                    //               setLoading(false);
                    //               console.log("message",response.message);
                    //              }   
                    // }).catch((error) =>{
                    //       console.error(error);
                    // });
                          }
               

                          const handleChangeCarrier = (event) => {
                            setCheckedA(false);
                           setCarreri(event.target.value);
                        setCarrierTre(event.target.value);
                                
                                      };
              const handleChangeShipment8 = (event) => {
                  setCheckedA(false);
                  setshipmentType9(true);
                  setshipmentType8(event.target.value);
                  setshipmentType1(0);
                  setshipmentType11('0');
                 
                            };
              const handleChangeShipment3 = (event) => {
      if(event.target.value==='1')
      {
        setshipmentType1(1);
        setshipmentType11('1');

        setshipmentType9(false);
        setshipmentType8('0');
      }
      else if(event.target.value==='2')
      {
        setshipmentType1(2);
        setshipmentType11('2');
        setshipmentType9(false);
        setshipmentType8('0');
      }
      else if(event.target.value==='4')
      {
        setshipmentType1(4);
        setshipmentType11('4');
        setshipmentType9(false);
        setshipmentType8('0');
      }
      else if(event.target.value==='5')
      {
        setshipmentType1(5);
        setshipmentType11('5');
        setshipmentType9(false);
        setshipmentType8('0');
      }
      else if(event.target.value==='6')
      {
        setshipmentType1(6);
        setshipmentType11('6');
        setshipmentType9(false);
        setshipmentType8('0');
      }
      else{
        setshipmentType1(3);
        setshipmentType11('3');
        setshipmentType9(false);
        setshipmentType8('0');
      }
              
                  };

const handleRemove=(event)=>{
  AsyncStorage.removeItem('invoicename');
  setInvoiceFile('');
  setShippingLabelId(0);
}
                const handleCaptureInvoice = (event) => {
                  const target=event.target;
                  const fileReader = new FileReader();
                  setInvoiceFile(target.files[0].name);
                  AsyncStorage.setItem("invoicename",JSON.stringify(target.files[0].name));
                  const file=target.files[0];
                  var formData =  new FormData();
                formData.append('file',file);
                formData.append('userid',userid);
            
                   const name = target.accept.includes('image') ? 'images' : 'videos';
                 axios.post(BASE_URL+'Upload/Invoice', formData)
                 .then(function (response) {
                  setShippingLabelId(response.data.data.shippinglabelId);
                  setCheckedA(false);
                  console.log(response.data.data.shippinglabelId);
                 })
                 .catch(function (error) {
                   console.log(error);
                 });
            
            
            
                };

    return (  
      <View className={classes.content}>
    <View className={classes.appBarSpacer} />
  
              <View >
            <Grid item  container lg={12}>
            <Grid item  lg={5}   style={popUpStyle.breadCrumSidePadding}>
            <Link  onClick={()=>{props.handleDashboard('01')}}>
            <Text style={popUpStyle.breadCrundCss1}>DASHBOARD /</Text>
            </Link><Text style={popUpStyle.breadCrundCss}> ORDERS / MANUAL ORDER /</Text>
          <Text style={popUpStyle.breadCrundCss2}> SHIPPING OPTIONS {'\n'} </Text> 
            
              </Grid>
              <Grid item  lg={2} ></Grid>
              </Grid>
              </View>  
        

         {/* <ScrollView> */}
         <View style={popUpStyle.paddingSide}>
         <Grid container justify="space-between" spacing={2}>
            <Grid item xs={12} md={4} lg={4}>
            <Text style={{ fontSize: '15px',
            fontWeight: '700',
            // marginLeft:'10px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}}>
              
              Select Shipment Type</Text>
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
       disabled={checkedA}
       onClick={()=>{onNextfunction()}}
       >
          Next
       </ColorButton>
    
              </Grid>
              </Grid>
            
              </Grid>
              </Grid>
              <Grid justify="center">
                <ProgressBar 
                 loading={loading}
                />
                </Grid>
         <form className={classes.form}>
         <Grid  justify="center"
      container 
      spacing={2}
    
       >
         <Grid item xs={12} md={12} lg={12}>
         {/* <form className={classes.form}>
         <Grid container className={classes.root} spacing={1}>
         
        <Grid container justify="space-between">
        {shipData.map(data => (
        <Grid item xs={12} md={12} lg={12}>
        <Grid>
        <Typography justify="center" variant="body1">
        <Box m={0}>
        <Text style={{ fontSize: '13px',
           //fontWeight:'700',
            marginLeft:'10px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif'}}>{data.integrationName}</Text>   
       </Box>
        </Typography></Grid>
        
        <FormGroup>
        <Grid item xs={10} container style={{ marginLeft:'10px',}} lg={1}>
       
                  
                    {data.polocies.map(data => (
                     <View>
 <Grid item  container xs={10} lg={12}>
        <Grid item >
        <RadioGroup aria-label="gender" name="gender1" value={data.integrationspoliciesId} onChange={handleChangeCheckbox}>
        <FormControlLabel style={{paddingBottom:'0px',paddingTop:'0px',height:'25px'}}
            control={<Radio  
              id={data.integrationspoliciesId}
              checked={
              (() => {
               
                
                  for(let i=0; i<=dataLength;i++)
                  {
                  if (data.integrationspoliciesId  === parseInt(shipPlocyId)){
                    return (
                        true
                      )
                  }
               
                  else{
                    return (
                      false
                    )
                  }
                
                  }
                
               
                })()} color="primary"   name={data.policytitle} />}
            label={<Text style={{ fontSize: '12px',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                        transition : 'all 0.25s',}}>{data.policytitle}</Text>}
          />
         </RadioGroup>
          </Grid> 
          
          <Grid item xs={10} lg={6}>
            </Grid>
          </Grid>

          

                     </View>
                        ))}
          </Grid>
        </FormGroup>
        </Grid>
        ))}
       
        </Grid>
       
         </Grid>
           </form> */}
           
           {/* {(enableShipmentType === false  ? '' : */}
                <Grid item xs={12} md={12} lg={8} style={{marginLeft:'8px',marginTop:'10px'}}>
                    <Grid item xs={10} lg={4}>
                <TextField
      id="outlined-select-currency-native"
      select
      fullWidth
    //  label="Select Carrier"
      value={carrier}
      onChange={handleChangeCarrier}
      SelectProps={{
        native: true,
      }}
      size='small'
      type="text"
      className={classes.profileMargin1}
      style={{fontSize: '12px',
      //fontWeight: '700',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}
      variant="outlined"
    >
        <option value='0' disabled  style={{fontSize: '14px',
        //fontWeight: '700',
        paddingLeft:'15px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>Select Shipment Type</option>
   <option value='1'   style={{fontSize: '14px',
        //fontWeight: '700',
        paddingLeft:'15px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>Parcel</option>
 
 <option value='2'   style={{fontSize: '14px',
        //fontWeight: '700',
        paddingLeft:'15px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>LetterMail</option>
 
 <option value='3'   style={{fontSize: '14px',
        //fontWeight: '700',
        paddingLeft:'15px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>LTL</option>
 
   
    </TextField>
    </Grid>
                <Grid item xs={10} >
                  
  <Text 
           style={{
            fontSize: '14px',
            fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          marginTop:'10px',
            transition : 'all 0.25s',
           }}>{'\n'}Select Service Type
           </Text>  
  </Grid>
  <Grid item xs={10} >
  <RadioGroup aria-label="gender" name="gender1" value={shipmentType11} onChange={handleChangeShipment3}>
        {(carrierTre==='1'? <FormControlLabel
          style={{
            paddingBottom: "0px",
            paddingTop: "0px",
            height: "25px",
          }}
            control={<Radio   name="qualitycontrol" color="primary" />}
            label= {<Text style={{ fontSize: '12px',
           // fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}}>Standard Shipping</Text> } value="1"
          /> : '')}
          {(carrierTre==='1'?   
 <FormControlLabel
 style={{
  paddingBottom: "0px",
  paddingTop: "0px",
  height: "25px",
}}
            control={<Radio    name="qualitycontrol" color="primary" />}
            label= {<Text style={{ fontSize: '12px',
           // fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}}>2-Day Shipping</Text> } value="2"
          /> : '' )}
  {(carrierTre==='1'?  
<FormControlLabel
 style={{
  paddingBottom: "0px",
  paddingTop: "0px",
  height: "25px",
}}
            control={<Radio  name="qualitycontrol" color="primary" />}
            label= {<Text style={{ fontSize: '12px',
           // fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}}>Overnight Shipping</Text> } value="3"
          />
          : '' )}

{(carrierTre==='2'? 
<FormControlLabel
 style={{
  paddingBottom: "0px",
  paddingTop: "0px",
  height: "25px",
}}
            control={<Radio  name="qualitycontrol" color="primary" />}
            label= {<Text style={{ fontSize: '12px',
           // fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}}>Stamped Postage</Text> } value="4"
          /> : '' )}

{(carrierTre==='2' ? 
          <FormControlLabel
 style={{
  paddingBottom: "0px",
  paddingTop: "0px",
  height: "25px",
}}
            control={<Radio  name="qualitycontrol" color="primary" />}
            label= {<Text style={{ fontSize: '12px',
           // fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}}>Oversize LetterMail</Text> } value="5"
          />  : '' )}
  {(carrierTre==='3'? 
<FormControlLabel
 style={{
  paddingBottom: "0px",
  paddingTop: "0px",
  height: "25px",
}}
            control={<Radio  name="qualitycontrol" color="primary" />}
            label= {<Text style={{ fontSize: '12px',
           // fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}}>Pallet Freight</Text> } value="6"
          />  : '' )}

          </RadioGroup>
                </Grid>
                </Grid>
                {/* )}  */}
           <Grid  items  container xs={12} lg={8} style={{marginTop:'10px',marginLeft:'8px'}}>
           <Grid container item xs={8}  lg={12}justify="center">
            <Grid>
            <Text style={{ fontSize: '16px',
            //fontWeight: '700',
            // marginLeft:'10px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          fontWeight:'600',
            transition : 'all 0.25s',}}>
              
              {'\n'}OR</Text>
              
            </Grid>
          </Grid>
           <Grid item lg={12}>
           <RadioGroup aria-label="gender" name="gender1" value={shipmentType8} onChange={handleChangeShipment8}>
          <FormControlLabel
          style={{
            paddingBottom: "0px",
            paddingTop: "0px",
            height: "25px",
          }}
            control={<Radio   name="qualitycontrol" color="primary" />}
            label= {<Text style={{ fontSize: '12px',
           // fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}}>Upload Shipping Label</Text> } value="10"
          />

          </RadioGroup>
           {/* <Text style={{ fontSize: '14px',
            //fontWeight: '700',
            // marginLeft:'10px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}}>
              
             </Text> */}
         
             </Grid></Grid>
            {(shipmentType9===true ?
           <Grid  items  container xs={12} lg={8} style={{marginTop:'10px',marginLeft:'8px'}}>
           
           
       <Grid item lg={6}>
        <TextField
      id="tracking"
      name='tracking'
      variant="outlined"
      fullWidth
      placeholder="Upload Own Shipping Label"
      size='small'
      type="text"
      //onChange={handleChange('tracking')}
      className={classes.profileMargin1}
      value={invoiceFile}
    />
    </Grid>
    <Grid item lg={6}>
        <ColorButton3
        size='large'
        variant="contained"
        component="label"
        color="primary"
        startIcon={<CloudUploadIcon />}
        //onClick={()=>{handleNextPage(10)}}
        >
          UPLOAD LABEL
  <input
    type="file"
    onChange={handleCaptureInvoice}
    style={{ display: "none" }}
  />
        </ColorButton3>
       &nbsp;
       <ColorButton4
       size='large'
       variant="contained"
       color="primary"
       className={classes.profileMargin}
       onClick={() => handleRemove()}
  >
  X
        </ColorButton4>
         
          </Grid>
      
          
        </Grid>
  :'')}
       </Grid>
       </Grid></form>

 
        </View>
       
         
           
        </View>
    );
  }

