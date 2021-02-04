import React ,{ useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fade,withStyles,makeStyles, useTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import {Platform,View,Image,Text,Dimensions} from 'react-native';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import OrderImportCreate from "./feedback/OrderImportCreate";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ProgressBar from './feedback/ProgressBar';
import Paper from '@material-ui/core/Paper';
import * as shiphypeservice from './ShipService/shiphype_service';
import AllOrder from './Order/AllReturnOrder';
import popUpStyle from './style/popUpStyle';
import DeleteCard from './Order/EnableDisable';
import ImportShopfyOrder from './feedback/ImportShopfyOrder';
import HomeIcon from '@material-ui/icons/Home';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from "@material-ui/core/TextField";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <View
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2} style={{padding:'0px'}}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </View>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(2),
    flexGrow: 1,
    height: '75vh',
    overflow: 'auto',
    backgroundColor:'#fff',
  },

  
   tabRoot:{
    fontSize: '12px'
   },
  
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ScrollableTabsButtonAuto(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [loading,setLoading]=React.useState(true);
  const[orderStatus,setOrderStatus]=React.useState([]);
  const[orderType,setOrderType]=React.useState([]);
  const[orderCouierType,setOrderCourierType]=React.useState([]);
  
  const [openDelete, setOpenDelete] = React.useState(false);
  const [enableTrue, setEnableTrue] = React.useState(true);
  const [disableTrue, setDisableTrue] = React.useState(false);

  const [openImport,setOpenImport]=React.useState(false);

  const[orderCustomerType,setOrderCustomerType]=React.useState([]);
  const userid=props.user_id;
  const userRoleId =parseInt(window.localStorage.roleId);

  const [importOrderData, setImportOrderData] = React.useState(null);
  const [importWorderData, setImportWorderData] = React.useState(null);
  const [integrationid, setIntegrationid] = React.useState(null);
  
  const [openorderimportcreate, setOpenorderimportcreate] = React.useState(
    false
  );
  const [userData , setUserData] = React.useState([]);
  const [isIntegration,setIsIntegration]=React.useState(false);
  const [open1, setOpen1]=React.useState(false);

  const [state1, setState1]=useState({
    vertical: 'bottom',
    horizontal: 'center',
  });
  const {vertical,horizontal} = state1;
const [sellerid ,setSellerid]=React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [isfirst,setIsfirst]=React.useState(false);

  React.useEffect(() => {
    fetchSelectedIntegration(userid);
    fetchOrderStatusList();   
    fetchOrderTypeList();   
    fetchCourierTypeList(userid);   
    fetchCustomerTypeList();
    fetchUserInfo();
 } ,[]);
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
               response.data[a].displayName ? (myObject["displayName"] = response.data[a].displayName) : null;
               response.data[a].displayName
                 ? (myObject["name"] = response.data[a].displayName)
                 : null;
               newArr.push(myObject);
              }
              else{
               var myObject = {};
               response.data[a].id ? (myObject["id"] = response.data[a].id) : null;
               response.data[a].displayName ? (myObject["displayName"] = response.data[a].displayName) : null;
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
 //Make custom button
 const ColorButton = withStyles(theme => ({
     root: {
      borderRadius : '3px',
      //  paddingTop: '9%',
      //  paddingBottom: '9%',
      //marginTop:'3%',
      height:'80%',
      padding:'7px',
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
   }))(Button);


   const ColorButton10 = withStyles(theme => ({
    root: {
      borderRadius : '3px',
      //  paddingTop: '9%',
      //  paddingBottom: '9%',
      //marginTop:'3%',
      height:'80%',
      padding:'7px',
      width:'120px',
       fontSize:'11px',
       fontWeight: '550',
       color:'#fff',
       marginRight:'25px',
       backgroundColor:'#0168fa',
      //  paddingLeft: '22%',
      //  paddingRight: '22%',
       '&:hover': {
         color:'#fff',
         backgroundColor:'#0168fa',
       },
     },
  }))(Button);


   const ColorButton9 = withStyles(theme => ({
    root: {
     borderRadius : '3px',
     //  paddingTop: '9%',
     //  paddingBottom: '9%',
     //marginTop:'3%',
     height:'80%',
     padding:'7px',
     width:'120px',
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
  }))(Button);
   
  const ColorButton11 = withStyles(theme => ({
    root: {
     borderRadius : '3px',
     //  paddingTop: '9%',
     //  paddingBottom: '9%',
     //marginTop:'3%',
     height:'80%',
     padding:'7px',
     width:'140px',
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
  }))(Button);

  const ColorButton2 = withStyles(theme => ({
    root: {
     borderRadius : '3px',
     //  paddingTop: '9%',
     //  paddingBottom: '9%',
     //marginTop:'3%',
     height:'80%',
     padding:'2px',
     width:'140px',
      fontSize:'11px',
      fontWeight: '550',
      color:'#fff',
      backgroundColor:'#808080',
     //  paddingLeft: '22%',
     //  paddingRight: '22%',
      '&:hover': {
        color:'#fff',
        backgroundColor:'#808080',
      },
    },
  }))(Button);

  const ColorButton4 = withStyles(theme => ({
    root: {
     borderRadius : '3px',
     //  paddingTop: '9%',
     //  paddingBottom: '9%',
     //marginTop:'3%',
     height:'80%',
     padding:'2px',
     width:'140px',
      fontSize:'11px',
      fontWeight: '550',
      color:'#fff',
      backgroundColor:'#009900',
     //  paddingLeft: '22%',
     //  paddingRight: '22%',
      '&:hover': {
        color:'#fff',
        backgroundColor:'#009900',
      },
    },
  }))(Button);
 const fetchOrderStatusList =()=>{
  setLoading(true);
  shiphypeservice.fetchOrderStatus()
        .then(response => {
         console.log("status",response.status);
              if(response.status === true) {
                setLoading(false);
                setOrderStatus(response.data);
                         }else{
                          setLoading(false);
                          console.log("message",response.message);
                         }   
            }).catch((error) =>{
                  console.error(error);
            });
          }
    
          const fetchCourierTypeList =(userid)=>{
            setLoading(true);
            shiphypeservice.fetchCourierTypeList(userid)
                  .then(response => {
                   console.log("status",response.status);
                        if(response.status === true) {
                          setLoading(false);
                          setOrderCourierType(response.data);
                                   }else{
                                    setLoading(false);
                                    console.log("message",response.message);
                                   }   
                      }).catch((error) =>{
                            console.error(error);
                      });
                    }
              

                    const fetchCustomerTypeList =(userid)=>{
                      setLoading(true);
                      shiphypeservice.fetchCustomerTypeList(userid)
                            .then(response => {
                             console.log("status",response.status);
                                  if(response.status === true) {
                                    setLoading(false);
                                    setOrderCustomerType(response.data);
                                             }else{
                                              setLoading(false);
                                              console.log("message",response.message);
                                             }   
                                }).catch((error) =>{
                                      console.error(error);
                                });
                              }
                        
          const fetchOrderTypeList =()=>{
            setLoading(true);
            shiphypeservice.fetchOderType()
                  .then(response => {
                   console.log("status",response.status);
                        if(response.status === true) {
                          setLoading(false);
                          setOrderType(response.data);
                                   }else{
                                    setLoading(false);
                                    console.log("message",response.message);
                                   }   
                      }).catch((error) =>{
                            console.error(error);
                      });
                    }

                    const orderStatusOptions = {};
                    orderStatus.map(orderStatusOp => {
    const { orderstatusId, orderstatusname } = orderStatusOp;
    orderStatusOptions[ orderstatusId ] = orderstatusname
})

const orderTypeOptions = {};
orderType.map(orderTypeOp => {
    const { ordertypeId, ordertypename } = orderTypeOp;
    orderTypeOptions[ ordertypeId ] = ordertypename
})

const orderCouierOptions = {};
orderCouierType.map(orderCouierOp => {
    const { carrierId, carriertitle } = orderCouierOp;
    orderCouierOptions[ carrierId ] = carriertitle
})

const orderCustomerOptions = {};
orderCustomerType.map(orderCustoemrOp => {
    const { customertypeId, customertypename } = orderCustoemrOp;
    orderCustomerOptions[ customertypeId ] = customertypename
})
const getShipmentIdFromOrder=(shipmentId)=>{
  props.getEditOrderData(shipmentId);
}   
const enableFunction = () => {
  if(enableTrue===true)
  {
    addStepStatus();
    setEnableTrue(false);
    setOpenDelete(false);

  }
  else{
    addStepStatus();
    setEnableTrue(true);
    setOpenDelete(false);
  }
  
}

const fetchSelectedIntegration =(userid)=>{
  setLoading(true);
  shiphypeservice.fetchUserIntegration(userid)
  .then(response => {
    console.log("status",response.status);
         if(response.status === true) {
          // setLoading(false);
          if(response.data.length === 0){
            setIsIntegration(true);
          }else{
            setIsIntegration(false);
          }
         
                    }else{
                     //setLoading(false);
                     console.log("message",response.message);
                    }   
       }).catch((error) =>{
             console.error(error);
       });
          }


const addStepStatus =()=>{
  // setLoading(true);
   
  // const userid=user_id;
   const shiphypesubsubstepId=0;
   const shiphypesubstepId=15;
   const shiphypestepId=0;
   shiphypeservice.addUserStepDoneSofar(userid,shiphypesubsubstepId,shiphypesubstepId,shiphypestepId)
         .then(response => {
          console.log("status",response.status);
               if(response.status === true) {
                // setLoading(false);
                
                          }else{
                           //setLoading(false);
                           console.log("message",response.message);
                          }   
             }).catch((error) =>{
                   console.error(error);
             });
           }
const opennewOrder=()=>{
  props.updateOrderDataState();
  props.switchHandling('manual_order');
}
const handleClickOpendelete = () => {
  
    setOpenDelete(true);
  //  setEnableTrue(false);
  
    console.log("rowid");
  
 
  };

  const handleDeleteCancle = () => {
    setOpenDelete(false);
  
   };


   const handleCancleImport = (isimport) => {
     if(isimport){
      setValue(1);
      setOpenorderimportcreate(true);
      setOpenImport(false);
     }else{
      setValue(0);
      setOpenorderimportcreate(false);
      setOpenImport(false);
     }
   };

const openorderdetails=()=>{
  props.openSellerRetunrOrderDetails();
}
const updateData=(data,integrationid)=>{

  if(integrationid === 4){
    setIntegrationid(integrationid);
    setImportOrderData(data);
    setImportWorderData(null);
  }else if(integrationid === 3){
    setIntegrationid(integrationid);
    setImportWorderData(data);
    setImportOrderData(null);
  }
}

const handleClose3 = () => {
  setOpen1(false);
 // handleNextPage(22);
};

  return (
    <View  className={classes.content}>
    <View className={classes.appBarSpacer} />
    <View >
<Grid>
{(openDelete === false ? " " :
           <DeleteCard
           openDeleteCard={openDelete}
        enableTrue={enableTrue}
        userid={userid}
        enableFunction={enableFunction}
           handleDeleteCancle={handleDeleteCancle}
         />)}


{openImport === false ? (
              " "
            ) : (
              <ImportShopfyOrder
                openImport={openImport}
                userid={userid}
                updateData={updateData}
                handleCancle={handleCancleImport}
              />
            )}

            {openorderimportcreate === false ? (
              " "
            ) : (
              <OrderImportCreate
                openorderimportcreate={openorderimportcreate}
                integrationid={integrationid}
                importOrderData={importOrderData}
                importWorderData={importWorderData}
                userid={userid}
                handleCancle={handleCancleImport}
              />
            )}

           
</Grid>
              <Grid container justify="space-between" style={popUpStyle.breadCrumSidePadding}>
            <Grid item xs={12} md={4} lg={4}>
             <Text style={popUpStyle.breadCrundCss}>
              
            &nbsp;DASHBOARD /</Text><Text style={popUpStyle.breadCrundCss2}>  RETURNS{'\n'}{'\n'}</Text>
              </Grid>
              
              <Grid item xs={12} md={5} lg={8}  >
  

              <Grid  item  xs={12} md={10} lg={12} >
              <Grid justify="flex-end" container >
            <Grid item style={{marginRight:'20px'}}>
            {( userRoleId === 1 ? 


              <Grid item  style={{ marginTop: "1px",marginBottom:"10px",padding:"0"}}>
             
             <Autocomplete
       id="combo-box-demo"
       fullWidth
       options={userData}
       getOptionLabel={(option) => option.name}
      
       style={{ width: 400 }}
       renderInput={(params) => <TextField {...params} size="small" placeholder="Search Seller" variant="outlined" />}
       onChange={(event, newValue) => {
           if(newValue !== null){
              
             setSellerid(newValue.id);
             if(value === 0){
               setValue(1);
             }else{
              setValue(0);
             }
           }else{
            setSellerid(0);
            setIsfirst(true);
            if(value === 0){
               setValue(1);
             }else{
              setValue(0);
             }
           }
         console.log("newvalue",newValue);
       }}
     />
             </Grid>
       
        : '')}
              </Grid>
              </Grid>

              </Grid>
              </Grid>
              </Grid>
              </View>  
    <Grid justify="center">
    
            <ProgressBar 
             loading={loading}
            />
            <Snackbar 
      anchorOrigin={{ vertical, horizontal }}
      key={`${vertical},${horizontal}`}
      open={open1}
      autoHideDuration={3000}
      onClose={handleClose3}>
      <Alert onClose={handleClose3} severity="error">
    You don't have any integration.Pls first complete any one integration.
      </Alert>
      </Snackbar>
            </Grid>
<View style={popUpStyle.paddingSide}>
            <Grid container justify="space-between">
            <Grid item xs={12} md={2} lg={2}>
             {/* <Text style={{fontSize: '13px',
            //fontWeight: '500',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
           &nbsp;Order List</Text> */}
              </Grid>
            
              </Grid>
            
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
         
        
            <Tab label={<span className={classes.tabRoot}>Return Orders</span>} {...a11yProps(0)} />
            {/* <Tab label={<span className={classes.tabRoot}>Exception(By ShipHype)</span>} {...a11yProps(1)} />
            <Tab label={<span className={classes.tabRoot}>Cancelled</span>} {...a11yProps(1)} /> */}
        </Tabs>
      </AppBar>
     
      
      <TabPanel value={value} index={0}>
      { (() => {
        if(orderCustomerType.length!==0)
        {
          if(orderType.length!==0)
          {
            if(orderCouierType.length!==0)
            {
          return(
     <AllOrder  isfirst={isfirst} userid={userid} sellerid={sellerid} orderStatus={10} userRoleId={userRoleId} orderStatusOptions={orderStatusOptions} orderTypeOptions={orderTypeOptions}
     orderCouierOptions={orderCouierOptions} orderCustomerOptions={orderCustomerOptions} openSellerRetunrOrderDetails={openorderdetails}/>
           ) }
          }
        }
    })()
  }
      </TabPanel>
      <TabPanel value={value} index={1}>
      { (() => {
        if(orderCustomerType.length!==0)
        {
          if(orderType.length!==0)
          {
            if(orderCouierType.length!==0)
            {
          return(
     <AllOrder isfirst={isfirst} userid={userid} sellerid={sellerid} orderStatus={8} userRoleId={userRoleId} orderStatusOptions={orderStatusOptions} orderTypeOptions={orderTypeOptions}
     orderCouierOptions={orderCouierOptions} orderCustomerOptions={orderCustomerOptions} openSellerRetunrOrderDetails={openorderdetails}/>
           ) }
          }
        }
    })()
  }
      </TabPanel>
      <TabPanel value={value} index={2}>
      { (() => {
        if(orderCustomerType.length!==0)
        {
          if(orderType.length!==0)
          {
            if(orderCouierType.length!==0)
            {
          return(
     <AllOrder isfirst={isfirst} userid={userid} sellerid={sellerid} orderStatus={9} userRoleId={userRoleId} orderStatusOptions={orderStatusOptions} orderTypeOptions={orderTypeOptions}
     orderCouierOptions={orderCouierOptions} orderCustomerOptions={orderCustomerOptions} openSellerRetunrOrderDetails={openorderdetails}/>
           ) }
          }
        }
    })()
  }
      </TabPanel>


      </View>  
    </View>
  );
}

ScrollableTabsButtonAuto.propTypes = {
  switchHandling: PropTypes.func,
  refreshOrderScreen:PropTypes.func
};