import React ,{ useState, useEffect } from 'react';
import clsx from 'clsx';
import { fade,withStyles,makeStyles, useTheme} from '@material-ui/core/styles';
import {Platform,View,ScrollView,Image,Text,Dimensions} from 'react-native';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import Grid from '@material-ui/core/Grid';
import * as shiphypeservice from './ShipService/shiphype_service';
import StepConnector from '@material-ui/core/StepConnector';
import Toast from './feedback/Toast';
import { format } from 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import ProgressBar from './feedback//ProgressBar';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import Link from '@material-ui/core/Link';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import popUpStyle from './style/popUpStyle';
import axios from 'axios';
import AsyncStorage from "@react-native-community/async-storage";

//export const BASE_URL='http://3.20.18.207/api/';
export const BASE_URL='https://api.shiphype.com/api/';
//export const BASE_URL='https://preptest.shiphype.com/api/';
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
 
};

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
  checkBox23:{
    paddingBottom:'0px',paddingTop:'0px',height:'25px'},
  profileMargin1: {
    marginTop: theme.spacing(1),
    borderRadius : '5px',
    
  //  marginBottom: theme.spacing(1),
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
/**
 * Description:This function is used for Slide17
 * @param {*} props 
 */
export default function AdditionalOptions(props) {
  
   const classes = useStyles();
   const userid=props.user_id;
   const productId=props.productId;
   const shippedQuantity=props.productQuantity;
   //const userid=props.user_id;
   const [loading,setLoading]=React.useState(false);
   const [open, setOpen]=React.useState(false);
   const [msg,setMsg]=React.useState('');
   const [type,setType]=React.useState('');
   const [packageBool, setPackgingBool] = React.useState(true);
   const [invoiceBool, setInvoiceBool] = React.useState(true);
   const [status,setStatus]=React.useState(false);
  const [selectedorderDate, setSelectedorderDate] = React.useState(new Date());
  const [selectedpickDate, setSelectedpickDate] = React.useState(new Date());
  const [packageFile,setPackageFile]=React.useState('');
  const [inoiveLabelId,setInvoiceLabelId]=React.useState(0);
  const [packageLabelId,setPackageLabelId]=React.useState(0);
  const [invoiceFile,setInvoiceFile]=React.useState('');
  const [startsprint,setStartsprint]=React.useState(0);
  const [orderInoivceI,setOrderInvoiceI]=React.useState('4');
  const [packagingSlipI,setPackagingSlipI]=React.useState('1');
  const [otherOptionS,setOtherOptionS]=React.useState(false);
  const [insuranceOptionD,setInsuranceOptionD]=React.useState('2');
 const [ShippedQtyOrder, setShippedQtyOrder] = React.useState([]);
 const [CustomQtyOrder, setCustomQtyOrder] = React.useState([]);
 const [PrmotionalQtyOrder, setPromotionalQtyOrder] = React.useState([]);

 const [ShippedProductId, setShippedProductId] = React.useState([]);
 const [ShippedPromotionalId, setShippedPromotionalId] = React.useState([]);
 const [ShippedCustomId, setShippedCustomId] = React.useState([]);


 var ids = [];
  var ids2 = [];
  var ids3 = [];
  var Editids = [];
  var Editids2 = [];
  var Editids3 = [];
  var changedWarehouseid1 = [];
  var packaggingId1 = [];
  var changedPromotionalID = [];
  var EditchangedWarehouseid1 = [];
  var EditpackaggingId1 = [];
  var EditchangedPromotionalID = [];

 



  const [formState, setFormState] =useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });
var idsOrder = [];
  var customerIdOrder = [];

  React.useEffect(() => {
    // AsyncStorage.multiGet(["ProductSelect1"]).then((data) => {
    //   if (data[0][1] != null) {
    //     var ProductSelect1 = JSON.parse(data[0][1]);

    //     ProductSelect1.map((item, index) => {
    //       var data = parseInt(ProductSelect1[index].productquantity);
    //       idsOrder.push(data);
    //     });
    //     setShippedQtyOrder(idsOrder);
    //   }
    // });

    AsyncStorage.multiGet([
      "ProductSelect1",
     
    ]).then((data) => {
      if (data[0][1] != null) {
        var ProductSelect1 = JSON.parse(data[0][1]);
        console.log(ProductSelect1);
        console.log("ProductSelect1");

        ProductSelect1.map((item, index) => {
          var data = parseInt(ProductSelect1[index].productquantity);
          ids.push(data);
          changedWarehouseid1.push(ProductSelect1[index].customproductId);
        });
        setShippedQtyOrder(ids);
        setShippedProductId(changedWarehouseid1);
      }
      // if (data[1][1] != null) {
      //   var CustomPackges = JSON.parse(data[1][1]);
      //   console.log(CustomPackges);
      //   console.log("CustomPackges");

      //   CustomPackges.map((item, index) => {
      //     var data2 = parseInt(CustomPackges[index].packagingquantity);
      //     ids2.push(data2);
      //     packaggingId1.push(CustomPackges[index].packaggingId);
      //   });
      //   setCustomQtyOrder(ids2);
      //   setShippedCustomId(packaggingId1);
      // }
      // if (data[2][1] != null) {
      //   var SelectPromotional = JSON.parse(data[2][1]);
      //   console.log(SelectPromotional);
      //   console.log("SelectPromotional");

      //   SelectPromotional.map((item, index) => {
      //     var data3 = parseInt(SelectPromotional[index].packagingquantity);
      //     ids3.push(data3);
      //     changedPromotionalID.push(SelectPromotional[index].packaggingId);
      //   });
      //   setPromotionalQtyOrder(ids3);
      //   setShippedPromotionalId(changedPromotionalID);
      // }
    });
  }, []);


const handlePackagingSlipI = (event) => {
  setPackagingSlipI(event.target.value);
  if(event.target.value!=='1')
  {
    setPackgingBool(false);
  }
  else{
    setPackgingBool(true);
  }
    };
  
      const handleStartDateChangePick = (date,value) => {
        setStartsprint(value);
        setSelectedpickDate(date);
        console.log("startdate",value);
    
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

  const handleCapture = (event) => {
    
    const target=event.target;
    const fileReader = new FileReader();
    setPackageFile(target.files[0].name);

    const file=target.files[0];
    var formData =  new FormData();
  formData.append('file',file);
  formData.append('userid',userid);

     const name = target.accept.includes('image') ? 'images' : 'videos';
   axios.post(BASE_URL+'Upload/Invoice', formData)
   .then(function (response) {
    setPackageLabelId(response.data.data.shippinglabelId);
    //setCheckedA(true);
    console.log(response.data.data.shippinglabelId);
   })
   .catch(function (error) {
     console.log(error);
   });
  };
  
  const handleRemove=(event)=>{
    setPackageFile('');
    setPackageLabelId(0);
  }
  const handleCaptureInvoice = (event) => {
    const target=event.target;
    const fileReader = new FileReader();
    setInvoiceFile(target.files[0].name);

    const file=target.files[0];
    var formData =  new FormData();
  formData.append('file',file);
  formData.append('userid',userid);

     const name = target.accept.includes('image') ? 'images' : 'videos';
   axios.post(BASE_URL+'Upload/Invoice', formData)
   .then(function (response) {
    setInvoiceLabelId(response.data.data.shippinglabelId);
    //setCheckedA(true);
    console.log(response.data.data.shippinglabelId);
   })
   .catch(function (error) {
     console.log(error);
   });
  };
  const handleRemove1=(event)=>{
    setInvoiceFile('');
    setInvoiceLabelId(0);
  }
     
React.useEffect(() => {
  if(props.editOrder !== null){
    setSelectedpickDate(props.editOrder.shipdate);
    setStartsprint(props.editOrder.shipdate);
    setPackageFile(props.editOrder.packaginslipdocname);
    setPackageLabelId(props.editOrder.packaginslipdocnameid);
    setInvoiceFile(props.editOrder.invoicetypedocname);
    setInvoiceLabelId(props.editOrder.invoicetypedocnameid);

    if(props.editOrder.packagetype==='1')
    {
     
  
      setPackagingSlipI('1');
    }

    if(props.editOrder.packagetype==='2')
    {
     
    
      setPackagingSlipI('2');
      setPackgingBool(false);
    }

    if(props.editOrder.packagetype==='3')
    {
     
   
      setPackagingSlipI('3');
      setPackgingBool(false);
    }

    if(props.editOrder.packagetype==='4')
    {
      
  
      setPackagingSlipI('4');
      setPackgingBool(false);
    }

    if(props.editOrder.invoicetype==='1')
      {
       // setOrderInvoiceI(false);
     
        setOrderInvoiceI('1');
        setInvoiceBool(false);
      }

      if(props.editOrder.invoicetype==='2')
      {
      
        setOrderInvoiceI('2');
        setInvoiceBool(false);
      }

      if(props.editOrder.invoicetype==='3')
      {
       
        setOrderInvoiceI('3');
        setInvoiceBool(false);
      }
      if(props.editOrder.invoicetype==='4')
      {
       
        setOrderInvoiceI('4');
      }

      if(props.editOrder.extrabubble==='1')
      {
     
        setInsuranceOptionD('1');
      }
      
    
      if(props.editOrder.extrabubble==='2')
      {
   
        setInsuranceOptionD('2');
      }

      if(props.editOrder.insuranceoption==='1')
      {
      
        setOtherOptionS('1');
      }
      
    
      if(props.editOrder.insuranceoption==='2')
      {
        
        setOtherOptionS('2');
      }
  }

  if(props.orderkind === 2 && props.editOrder === null){
    var date = new Date();
    // to add 4 days to current date
    
    date.setDate(date.getDate() + 2);
    setSelectedpickDate(date);
  }
  
  },[]);
 
  const handleOtherOptionS = (event) => {
    setOtherOptionS(event.target.value);
           };

           const handleInsuranceOptionD = (event) => {
            setInsuranceOptionD(event.target.value);
                   };
  
  const productArray=[31,33];

    const updataExistsOrder = (internalorder_id,source,orderType,recipientname,shippingcourier
      ,orderStatus,orderDate,shipDate,customertype,orderkind,customer_id,shippingpolicy_id,user_id,option_id,dangeroue,labelId,
      labelName,shiptype,ware)=>{
        setLoading(true);
        var custoemridarray=[];
        if(customer_id.length===0)
        {
          custoemridarray.push(props.editOrder.customerId);
        }
        else{
          custoemridarray=customer_id;
        }

        const orderDate1=  format(orderDate, "yyyy-MM-dd hh:mm:ss");
       // const shipDate1=  format(shipDate, "yyyy-MM-dd hh:mm:ss");
        let shipDate1= (startsprint === 0 ? format(shipDate, "yyyy-MM-dd hh:mm:ss")

  : startsprint
  );
  if(shipDate1==='')
{
  shipDate1='0001-01-01T00:00:00';
}
if(shipDate1===null)
{
  shipDate1='0001-01-01T00:00:00';
}

  const bubbleBoxIds=insuranceOptionD;
  const insuranceIds=otherOptionS;
  const orderInoivceIs=orderInoivceI;
              const packagingSlipIs=packagingSlipI;
      shiphypeservice.updateOrder(internalorder_id,source,orderType,recipientname,props.customerCountry,shippingcourier
        ,orderStatus,orderDate1,shipDate1,customertype,orderkind,custoemridarray,shippingpolicy_id,user_id,
        option_id,dangeroue,bubbleBoxIds,insuranceIds,productId,orderInoivceIs,packagingSlipIs,labelId,labelName,
        packageLabelId,packageFile,inoiveLabelId,invoiceFile,shiptype,ware, ShippedQtyOrder)
      .then(response => {
       console.log("status",response.status);
            if(response.status === true) {
              setOpen(true);
              setType("success");
              setMsg(response.message);
              setStatus(response.status);
              setLoading(false);
              setLoading(false);
             // props.updateOrderDataState();
//AsyncStorage.clear();NewSelectedrowData
AsyncStorage.removeItem("ProductSelect1");
AsyncStorage.removeItem("NewSelectedrowData");
AsyncStorage.removeItem('invoicename');
props.setCustomerIdAfterAdd(0);
props.setEditCaseOnAdd(false);
              props.handleNextPage('02');
                       }
                       else  if(response.status === 400) {
                        setOpen(true);
                        setType("error");
                        setMsg('Update Unsuccessfull.');
                        setStatus(true);
                        setLoading(false);
                      //  setLoading(false);
                       // props.updateOrderDataState();
          //AsyncStorage.clear();NewSelectedrowData
          AsyncStorage.removeItem("ProductSelect1");
          AsyncStorage.removeItem("NewSelectedrowData");
          AsyncStorage.removeItem('invoicename');
          props.setCustomerIdAfterAdd(0);
          props.setEditCaseOnAdd(false);
                       // props.handleNextPage('02');
                                 }
                                 else{
                        setOpen(true);
                        setType("error");
                        setMsg(response.message);
                        setStatus(response.status);
                        setLoading(false);
                        setLoading(false);
                        console.log("message",response.message);
                       }   
          }).catch((error) =>{
                console.error(error);
          });
    }
  
      const addNewOrder = (source,orderType,recipientname,shippingcourier
          ,orderStatus,orderDate,shipDate,customertype,orderkind,customer_id,shippingpolicy_id,user_id,option_id,
          dangeroue,labelId,labelName,shiptype,ware,labelid)=>{
            setLoading(true);
              const orderDate1=  format(orderDate, "yyyy-MM-dd hh:mm:ss");
              const shipDate1= (startsprint === 0 ? format(shipDate, "yyyy-MM-dd hh:mm:ss")

              : startsprint
              );
              const bubbleBoxIds=insuranceOptionD;
              const insuranceIds=otherOptionS;
              const orderInoivceIs=orderInoivceI;
              const packagingSlipIs=packagingSlipI;

    //           console.log("productId : ", ShippedProductId);
    // console.log("promotionaId :", ShippedPromotionalId);
    // console.log("customId : ", ShippedCustomId);
    // console.log("productQuty : ", ShippedQtyOrder);
    // console.log("customeQuty : ", CustomQtyOrder);
    // console.log("promtoionalQUty : ", PrmotionalQtyOrder);


console.log("Ordercountry",props.customerCountry);
          shiphypeservice.addOrder(source,orderType,recipientname,props.customerCountry,shippingcourier
            ,orderStatus,orderDate1,customertype,orderkind,customer_id,shippingpolicy_id,
            user_id,option_id,dangeroue,bubbleBoxIds,insuranceIds,ShippedProductId,orderInoivceIs,packagingSlipIs,labelId,
            labelName,packageLabelId,packageFile,inoiveLabelId,invoiceFile,shiptype,ware,ShippedQtyOrder,labelid)
          .then(response => {
           console.log("status",response.status);
                if(response.status === true) {

                  setOpen(true);
          setType("success");
          setMsg(response.message);
          setStatus(response.status);
          setLoading(false);
         // setLoading(false);
         // AsyncStorage.clear();
         AsyncStorage.removeItem("ProductSelect1");
         AsyncStorage.removeItem("NewSelectedrowData");
         AsyncStorage.removeItem("CustomPackges");
         AsyncStorage.removeItem("SelectPromotional");
         AsyncStorage.removeItem('invoicename');
         props.setCustomerIdAfterAdd(0);
         props.setEditCaseOnAdd(false);
                  props.handleNextPage('02');
                           }else{
                            setOpen(true);
                            setType("error");
                            setMsg(response.message);
                            setStatus(response.status);
                            setLoading(false);
                            setLoading(false);
                            AsyncStorage.removeItem("ProductSelect1");
AsyncStorage.removeItem("NewSelectedrowData");
AsyncStorage.removeItem('invoicename');
props.setCustomerIdAfterAdd(0);
props.setEditCaseOnAdd(false);
                            console.log("message",response.message);
                           }   
              }).catch((error) =>{
                    console.error(error);
              });
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
                  
          let screenWidth = Dimensions.get('window').width;

          const onNextfunction=()=>{
customerIdOrder.push(props.customerId);

            if(props.editOrder !== null){
          //    props.handleNextPage('02');
              updataExistsOrder(props.editOrder.internalorderId,'ShipHype',2,props.customerName,1,2,selectedorderDate,
              selectedpickDate,props.orderType,1,props.customerId,props.shipingtype,userid,props.selectoption,
              props.dangerousGood,props.shiplabelId,props.shiplabelName,props.shipmentType,props.orderwarehouseId);
            }else{
              addNewOrder('ShipHype',2,props.customerName,1,2,selectedorderDate,selectedpickDate,props.orderType,1,
              props.customerId,props.shipingtype,userid,props.selectoption,props.dangerousGood,props.shiplabelId,
              props.shiplabelName,props.shipmentType,props.orderwarehouseId,props.shiplabelId);
            }   
        }
    

        const handleCallbackfunction =()=>{
            props.backButtonRouting('select_ship_type');
          }
         

           const handleOrderInvoiceI = (event) => {
            setOrderInvoiceI(event.target.value);
            if(event.target.value!=='4')
            {
              setInvoiceBool(false);
            }
            else{
              setInvoiceBool(true);
            }
                 };
    return (  
      <View className={classes.content}>
    <View className={classes.appBarSpacer} />
  
              <View >
            <Grid item  container lg={12}>
            <Grid item  lg={5}   style={popUpStyle.breadCrumSidePadding}>
            <Link  onClick={()=>{props.handleDashboard('01')}}>
          <Text style={popUpStyle.breadCrundCss1}>DASHBOARD 
          </Text></Link>
          <Link  onClick={()=>{props.handleDashboard('02')}}>
          <Text style={popUpStyle.breadCrundCss1}> / ORDERS</Text></Link>
          <Text style={popUpStyle.breadCrundCss}> / MANUAL ORDER /</Text>
          <Text style={popUpStyle.breadCrundCss2}> ADDITIONAL OPTIONS {'\n'} </Text> 
            
              </Grid>
              <Grid item  lg={2} ></Grid>
              </Grid>
              </View>  
              <Grid justify="center">
            <ProgressBar 
             loading={loading}
            />
            </Grid>

         
            <View style={popUpStyle.paddingSide}>
         <Grid container justify="space-between" spacing={2}>
            <Grid item xs={12} md={4} lg={4}>
            <Text style={{ fontSize: '15px',
            fontWeight: '700',
            // marginLeft:'10px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}}>
              
              Additional Order Options</Text>
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
       //className={classes.profileMargin}
       onClick={()=>{onNextfunction()}}
       >
         Save
       </ColorButton>
    
              </Grid>
              </Grid>
            
              </Grid>
              </Grid>

              <form className={classes.form}>
         <Grid container   >

        
     
      
      
        <Grid item xs={10} >
  <Text 
           style={{
            fontSize: '14px',
            fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          marginTop:'10px',
            transition : 'all 0.25s',
           }}>{'\n'}Packing Slip
           </Text>  
  </Grid>
         <Grid  items xs={12} lg={12}>
         <FormGroup> 
  <FormControl component="fieldset">
    <RadioGroup aria-label="carries" name="carries" value={packagingSlipI} onChange={handlePackagingSlipI}>
          <FormControlLabel  value="1" className={classes.checkBox23}
             control={<Radio color="primary" />}
            label={<Text style={{ fontSize: '12px',
            // fontWeight: '700',
             fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
             color: '#001737',
           
             transition : 'all 0.25s',}}>No Packing Slips</Text>}
          />

          <FormControlLabel  value="2" className={classes.checkBox23}
             control={<Radio color="primary" />}
            label={<Text style={{ fontSize: '12px',
            // fontWeight: '700',
             fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
             color: '#001737',
           
             transition : 'all 0.25s',}}>Add Packing Slip Inside</Text>}
          />
          <FormControlLabel  value="3" className={classes.checkBox23}
             control={<Radio color="primary" />}
            label={<Text style={{ fontSize: '12px',
            // fontWeight: '700',
             fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
             color: '#001737',
           
             transition : 'all 0.25s',}}>Add Packing Slip Outside</Text>}
          />
          <FormControlLabel  value="4" className={classes.checkBox23}
             control={<Radio color="primary" />}
            label={<Text style={{ fontSize: '12px',
            // fontWeight: '700',
             fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
             color: '#001737',
           
             transition : 'all 0.25s',}}>Add Packing Slip Inside + Outside</Text>}
          />
          </RadioGroup>
          </FormControl>
          </FormGroup>
         </Grid>
         <Grid  items container xs={12} md={12} lg={8}>
       
       <Grid item lg={6}>
     <TextField
   id="tracking"
   name='tracking'
   variant="outlined"
   fullWidth
   placeholder="Upload Packing Slip"
   size='small'
   
   type="text"
   //onChange={handleChange('tracking')}
   className={classes.profileMargin1}
   value={packageFile}
 />
 </Grid>
 <Grid item lg={6}>
     <ColorButton3
     size='large'
     variant="contained"
     component="label"
     color="primary"
     startIcon={<CloudUploadIcon />}
     disabled={packageBool}
     //onClick={()=>{handleNextPage(10)}}
     >
     Upload Packing
<input
 type="file"
 onChange={handleCapture}
 style={{ display: "none" }}
/>
     </ColorButton3>
     <ColorButton4
       size='large'
       variant="contained"
       color="primary"
       className={classes.profileMargin}
       onClick={() => handleRemove()}
       disabled={packageBool}
  >
  X
        </ColorButton4>
       </Grid>
    
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
           }}>{'\n'}Shipping Insurance

           </Text>  
  </Grid>
  <Grid item xs={10}>
  <FormGroup>
  <FormControl component="fieldset">
  <RadioGroup aria-label="carries" name="carries" value={insuranceOptionD} onChange={handleInsuranceOptionD}>
         
          <FormControlLabel  value="2" className={classes.checkBox23}
             control={<Radio color="primary" />}
            label={<Text style={{ fontSize: '12px',
            // fontWeight: '700',
             fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
             color: '#001737',
           
             transition : 'all 0.25s',}}>Disable Insurance
             </Text>}
          />
           <FormControlLabel  value="1" className={classes.checkBox23}
             control={<Radio color="primary" />}
            label={<Text style={{ fontSize: '12px',
            // fontWeight: '700',
             fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
             color: '#001737',
           
             transition : 'all 0.25s',}}>Enable Insurance</Text>}
          />
          </RadioGroup>
          </FormControl>
          </FormGroup>
  </Grid>
         <Grid item xs={10}>
       <Text 
           style={{
            fontSize: '14px',
            fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          marginTop:'20px',
            transition : 'all 0.25s',
           }}>{'\n'}Order Invoice
           </Text>  
           </Grid>
         <Grid item xs={12} lg={12}>
         <FormGroup>
  <FormControl component="fieldset">
  <RadioGroup aria-label="carries" name="carries" value={orderInoivceI} onChange={handleOrderInvoiceI}>
  <FormControlLabel  value="4" className={classes.checkBox23}
             control={<Radio color="primary" />}
            label={<Text style={{ fontSize: '12px',
            // fontWeight: '700',
             fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
             color: '#001737',
           
             transition : 'all 0.25s',}}>No Invoice </Text>}
          />
          <FormControlLabel  value="1" className={classes.checkBox23}
             control={<Radio color="primary" />}
            label={<Text style={{ fontSize: '12px',
            // fontWeight: '700',
             fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
             color: '#001737',
           
             transition : 'all 0.25s',}}>Add Invoice Inside</Text>}
          />
          <FormControlLabel  value="2" className={classes.checkBox23}
            control={<Radio color="primary" />}
            label={<Text style={{ fontSize: '12px',
            // fontWeight: '700',
             fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
             color: '#001737',
           
             transition : 'all 0.25s',}}>Add Invoice Outside</Text>}
          />
          <FormControlLabel  value="3" className={classes.checkBox23}
            control={<Radio color="primary" />}
            label={<Text style={{ fontSize: '12px',
            // fontWeight: '700',
             fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
             color: '#001737',
           
             transition : 'all 0.25s',}}>Add Invoice Inside + Outside</Text>}
          />
         
             </RadioGroup>
             </FormControl>
          </FormGroup>

         


  </Grid>
  <Grid  items  container xs={12} lg={8}>
       
       
       <Grid item lg={6}>
        <TextField
      id="tracking"
      name='tracking'
      variant="outlined"
      fullWidth
      placeholder="Upload Invoice"
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
        disabled={invoiceBool}
        //onClick={()=>{handleNextPage(10)}}
        >
        Upload Invoice
  <input
    type="file"
    onChange={handleCaptureInvoice}
    style={{ display: "none" }}
  />
        </ColorButton3>
        <ColorButton4
       size='large'
       variant="contained"
       color="primary"
       className={classes.profileMargin}
       onClick={() => handleRemove1()}
       disabled={invoiceBool}
  >
  X
        </ColorButton4>
         
          </Grid>
        </Grid>
  <Grid item xs={10}>
       <Text 
           style={{
            fontSize: '14px',
            fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          marginTop:'10px',
            transition : 'all 0.25s',
           }}>{'\n'}Other Options
           </Text>  
           </Grid>
       <Grid item xs={10}>
  <FormGroup>
  <FormControl component="fieldset">
  <RadioGroup aria-label="carries" name="carries" value={otherOptionS} onChange={handleOtherOptionS}>
          <FormControlLabel  value="1" className={classes.checkBox23}
             control={<Radio color="primary" />}
            label={<Text style={{ fontSize: '12px',
            // fontWeight: '700',
             fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
             color: '#001737',
           
             transition : 'all 0.25s',}}>Fragile (Extra Bubble Bag)</Text>}
          />
          </RadioGroup>
          </FormControl>
          </FormGroup>
  </Grid>

        <Grid 
      container  item xs={10} md={10} lg={10}>
        <Grid item xs={7} lg={12}>
  <Text 
           style={{
            fontSize: '12px',
           // fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
            transition : 'all 0.25s',
           }}>{'\n'}Ship Date
           </Text>  
  </Grid>

  <Grid item xs={7} lg={2} style={{marginBottom:'10px'}}>
  <MuiPickersUtilsProvider utils={DateFnsUtils} customStyles={{
          dateInput: {
              borderLeftWidth: 1,
              borderRightWidth: 1,
              borderTopWidth: 1,
          }
      }}>
     
     <KeyboardDatePicker
         variant="outlined"
         format="yyyy-MM-dd"
         margin="normal"
         id="pickingTime"
         fullWidth
         disablePast={true}s
         placeholder="Ship Date"
         value={selectedpickDate}
         
         onChange={handleStartDateChangePick}
         KeyboardButtonProps={{
           'aria-label': 'change date',
         }}
      
       />  
   </MuiPickersUtilsProvider>
  </Grid>
  <Grid lg={10}></Grid>
  </Grid>
      </Grid>
        

           </form>

  {showToast(open,msg,type)}
        </View>
       
         
           
        </View>
    );
  }
