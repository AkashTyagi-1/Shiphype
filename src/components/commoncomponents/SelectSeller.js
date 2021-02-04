import React ,{ useState, useEffect } from 'react';
import clsx from 'clsx';
import { fade,withStyles,makeStyles, useTheme} from '@material-ui/core/styles';
import {Platform,View,ScrollView,Image,Text,Dimensions} from 'react-native';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import popUpStyle from './style/popUpStyle';
import Link from '@material-ui/core/Link';
import * as shiphypeservice from './ShipService/shiphype_service';
import ProgressBar from './feedback/ProgressBar';

import TextField from "@material-ui/core/TextField";
import Autocomplete from '@material-ui/lab/Autocomplete';
import AsyncStorage from "@react-native-community/async-storage";
import * as localStorage from "./localstorage/LocalStorage";
import validate from "validate.js";
import Toast from './feedback/Toast';
import { format } from 'date-fns';
import DateFnsUtils from '@date-io/date-fns';


const schema = {
    // shipFrom: {
    //   presence: { allowEmpty: false, message: "is required" },
    //   length: {
    //     maximum: 32,
    //   },
    // },
    // tracking: {
    //   presence: { allowEmpty: false, message: "is required" },
    //   length: {
    //     maximum: 64,
    //   },
    // },
    // qtyBox: {
    //   presence: { allowEmpty: false, message: "is required" },
    //   length: {
    //     maximum: 64,
    //   },
    // },
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
  height: '120vh',
  overflow: 'auto',
  backgroundColor:'#fff',
},
profileMargin: {
  marginTop: theme.spacing(2),
  borderRadius : 0,
},
}));


//Make custom button
const ColorButton = withStyles(theme => ({
    root: {
      color: '#fff',
      borderRadius : '3px',
      //  paddingTop: '9%',
      //  paddingBottom: '9%',
      height:'100%',
      width:'90px',
       fontSize:'12px',
       fontWeight: '550',
       color:'#fff',
       backgroundColor:'#0168fa',
      '&:hover': {
        backgroundColor: '#002080',
        
      },
    },
  }))(Button);
  const ColorButtonTes = withStyles(theme => ({
    root: {
      color: '#fff',
      backgroundColor: '#0168fa',
       borderColor: '#0168fa',
       borderRadius:'3px',
       fontWeight:'700',
       height:35,
       width:150,
            fontSize:'11px',
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
export default function ManualOrder(props) {
  
   const classes = useStyles();  
   const [radioValue,setRadioValue] = React.useState(0);
   const [loading, setLoading] = React.useState(false);
   const[promotionalPackage,setPromotionalPackage]=React.useState([]);
   const userid=props.user_id;
   const [userData , setUserData] = React.useState([]);
   const [open, setOpen]=React.useState(false);
   const [msg,setMsg]=React.useState('');
   const [type,setType]=React.useState('');
   const [status,setStatus]=React.useState(false);
   const [chekd,setcheked]=React.useState(true);
   const [sellerid,setSellerid]=React.useState(0);
   const [ShippedQtyOrder, setShippedQtyOrder] = React.useState([]);
   const [ShippedProductId, setShippedProductId] = React.useState([]);
   const promotionalData = {};
   const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });
  var ids = [];
  var changedWarehouseid1 = [];
   React.useEffect(() => {
    // fetchProductListOfLastWeek();   
     fetchUserInfo();   
  } ,[]);
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
  const handleChangeButton = (data) => {
      console.log('returncondiions:',props.returncondiions);
      console.log('returntracking:',props.returntracking);
      console.log('returnfromname:',props.returnfromname);
      console.log('returnselectedStartDate:',props.returnselectedStartDate);
      console.log('orderwarehouseId:',props.orderwarehouseId);
      console.log('returncarrierId:',props.returncarrierId);

      console.log('ShippedProductId:',ShippedProductId);
      console.log('ShippedQtyOrder:',ShippedQtyOrder);

      console.log('sellerid:',sellerid);
      ////console.log('upload photo:',formState.values.shipFrom);
    //   returncondiions={returncondiions}
    //                         returntracking={returntracking}
    //                          returnfromname={returnfromname}
    //                         returnselectedStartDate={returnselectedStartDate}
    //                         returncarrierId={returncarrierId}
    //                         orderwarehouseId={orderwarehouseId}

    setLoading(true);
    const orderDate1=  format(props.returnselectedStartDate, "yyyy-MM-dd hh:mm:ss");
//const upload=formState.values.shipFrom;
//           console.log("productId : ", ShippedProductId);
// console.log("promotionaId :", ShippedPromotionalId);
// console.log("customId : ", ShippedCustomId);
// console.log("productQuty : ", ShippedQtyOrder);
// console.log("customeQuty : ", CustomQtyOrder);
// console.log("promtoionalQUty : ", PrmotionalQtyOrder);
let uploadphoto='';
if(formState.values.shipFrom===undefined)
{
  uploadphoto='';
}
else{
  uploadphoto =formState.values.shipFrom;
}


shiphypeservice.addReturnOrder(props.returncondiions,props.returntracking,props.returnfromname,orderDate1,props.orderwarehouseId,
  props.returncarrierId,ShippedProductId,ShippedQtyOrder,sellerid.id,10,uploadphoto)
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
AsyncStorage.removeItem("ReturnProductSelect");
// AsyncStorage.removeItem("NewSelectedrowData");
// AsyncStorage.removeItem("CustomPackges");
// AsyncStorage.removeItem("SelectPromotional");
// props.setCustomerIdAfterAdd(0);
// props.setEditCaseOnAdd(false);
        props.handleDashboard('15');
                 }else{
                  setOpen(true);
                  setType("error");
                  setMsg(response.message);
                  setStatus(response.status);
                  setLoading(false);
                  setLoading(false);
                  AsyncStorage.removeItem("ReturnProductSelect");
// AsyncStorage.removeItem("NewSelectedrowData");
// props.setCustomerIdAfterAdd(0);
// props.setEditCaseOnAdd(false);
                  console.log("message",response.message);
                 }   
    }).catch((error) =>{
          console.error(error);
    });


//props.handleDashboard('15');

      
      }; 

      React.useEffect(() => {
       
    
        AsyncStorage.multiGet([
          "ReturnProductSelect",
         
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
         
        });
      }, []);


  var newArr = [];
  const fetchUserInfo = ()=>{
  
     //const userid=5;
     setLoading(true);
     shiphypeservice.fetchUserInfo()
     .then(response => {
      console.log("status",response.status);
           if(response.status === true) {
             setLoading(false);
             for (let a = 0; a < response.data.length; a++) {
              if(response.data[a].userEmail==='')
              {
               var myObject = {};
               response.data[a].id ? (myObject["id"] = response.data[a].id) : null;
               response.data[a].displayName
                 ? (myObject["name"] = response.data[a].displayName)
                 : null;
               newArr.push(myObject);
              }
              else{
               var myObject = {};
               response.data[a].id ? (myObject["id"] = response.data[a].id) : null;
               response.data[a].userEmail
                 ? (myObject["name"] = response.data[a].userEmail)
                 : null;
               newArr.push(myObject);
              }
            }
            console.log("array", newArr);
             setUserData(newArr);
          
            
              
                      }else{
                       setLoading(false);
                       console.log("message",response.message);
                      }   
         }).catch((error) =>{
               console.error(error);
         });
   }
 

/**
   * Description:This function call on type character inside input text
   * @param {} prop
   */
  const handleChange = (prop) => (event) => {
    console.log("email", event.target.value);
    event.persist();
    //setValues({ ...formState.values, [prop]: event.target.value });
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [prop]: event.target.value,
        checkFrom: false,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));
  };
  const handleCallbackfunction = () => {
    // AsyncStorage.setItem("ProductSelect", JSON.stringify(ProductSelect1));
    // var ProductSelect = [];
    // AsyncStorage.multiRemove(["ProductSelect"]);
    //props.handleNextPage("SelectReturnProduct");
    props.handleNextPage("SelectCarrierTrackingDate");
    
    // AsyncStorage.clear();
  };
  const hasError = (field) =>
  formState.touched[field] && formState.errors[field] ? true : false;
  
  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

    return (  
      <View className={classes.content}>
    <View className={classes.appBarSpacer} />
  
              <View >
            <Grid item  container lg={12}>
            <Grid item  lg={5}   style={popUpStyle.breadCrumSidePadding}>
            <Link  onClick={()=>{props.handleDashboard('01')}}>
            <Text style={popUpStyle.breadCrundCss1}>DASHBOARD /</Text>
            </Link>{" "}
            <Text style={popUpStyle.breadCrundCss}>
              Receive Return ORDERS / Create ORDER /{" "}
            </Text>
            <Text style={popUpStyle.breadCrundCss2}> Assign Seller {"\n"} </Text>
            
              </Grid>
              <Grid item  lg={2} ></Grid>
              </Grid>
              </View>  
              <Grid justify="center">
            <ProgressBar 
             loading={loading}
            />
            </Grid>

         {/* <ScrollView> */}
         
         <View style={popUpStyle.paddingSide}>
         <Grid container justify="space-between" spacing={2}>
            <Grid item xs={12} md={4} lg={4}>
       
              </Grid>
              <Grid item xs={12} md={4} lg={4} ></Grid>
              <Grid item xs={12} md={4} lg={4} 
              //style={{marginRight:'70px'}} 
               >
  
              <Grid container item  justify="flex-end">

              <Grid>
       
     
              </Grid>
            <Grid>
              <ColorButton
      size='large'
       variant="contained"
       color="primary"
      // className={classes.profileMargin}
       onClick={()=>{handleCallbackfunction()}}

       >
         Back
       </ColorButton>
    
              </Grid>
              </Grid>
            
              </Grid>
              </Grid>
              </View>
              <View style={popUpStyle.paddingSide}>

              <form className={classes.form}>
         <Grid container   justify="space-between" >

         <Grid  items xs={12} lg={12}>
       
        <Text style={{ fontSize: '16px',
          fontWeight: '700',
            // marginLeft:'10px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}}>
              
              Assign Seller and Upload Photo URL </Text>
            
              </Grid>
              <Grid  items xs={12} lg={6} style={{marginTop:'35px'}}>
       
              <TextField
                    id="shipFrom"
                    name="shipFrom"
                    variant="outlined"
                    fullWidth
                    error={hasError("shipFrom")}
                    helperText={
                      hasError("shipFrom") ? formState.errors.shipFrom[0] : null
                    }
                    placeholder="Upload Photo URL"
                    size="small"
                    type="text"
                    onChange={handleChange("shipFrom")}
                    style={{ width: 400 }}
                    value={formState.values.shipFrom || ""}
                  />
         
       
      
        </Grid>
        <Grid  items xs={12} lg={12} style={{marginTop:'35px'}}>
       
        <Autocomplete
       id="combo-box-demo"
       fullWidth
       options={userData}
       getOptionLabel={(option) => option.name}
      
       style={{ width: 400 }}
       renderInput={(params) => <TextField {...params} size="small" placeholder="Assign Seller" variant="outlined" />}
       onChange={(event, newValue) => {
           if(newValue !== null){
          //  fetchProductListById(newValue.id); 
            setSellerid(newValue);
            setcheked(false);
           }
         console.log("newvalue",newValue);
       }}
     />

         
       
      
        </Grid>
        <Grid  items xs={12} lg={12}>
      
       <ColorButtonTes
  size='large'
  variant="contained"
  color="primary"
  disabled={chekd}
  className={classes.profileMargin}
    onClick={()=>{handleChangeButton(sellerid)}}
    >
   {/* Subscription Box Order */}
  Submit
    
    </ColorButtonTes>
         
         
      
        </Grid>
       
      </Grid>
        

           </form>
           {showToast(open,msg,type)}
</View>

        </View>
    );
  }

