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
import AllOrder from './Order/AllOrder';
import popUpStyle from './style/popUpStyle';
import DeleteCard from './Order/EnableDisable';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import ImportShopfyOrder from './feedback/ImportShopfyOrder';
import HomeIcon from '@material-ui/icons/Home';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Toast from './feedback/Toast';
import moment from 'moment';
import { format } from "date-fns";
import OrderSheet from "../../assets/icons/OrderSheet.xlsx";
import {ExcelRenderer, OutTable} from 'react-excel-renderer';
import AsyncStorage from "@react-native-community/async-storage";
const data=[
  {
      'id':1,
      'name':'All',
     
  },
  {
    'id':2,
    'name':'Processing',
  },

  {
    'id':3,
    'name':'OnHold',
  },
  {
    'id':4,
    'name':'More',
  },
 

]

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
    height: '70vh',
    overflow: 'auto',
    backgroundColor:'#fff',
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
  const userRoleId=props.userRoleId;

  const [importOrderData, setImportOrderData] = React.useState(null);
  const [importWorderData, setImportWorderData] = React.useState(null);
  const [integrationid, setIntegrationid] = React.useState(null);
  
  const [openorderimportcreate, setOpenorderimportcreate] = React.useState(
    false
  );

  const [isIntegration,setIsIntegration]=React.useState(false);
  const [open1, setOpen1]=React.useState(false);
  const [open, setOpen]=React.useState(false);
  const [msg,setMsg]=React.useState('');
  const [type,setType]=React.useState('');
  const [status,setStatus]=React.useState(false);
  const [state1, setState1]=useState({
    vertical: 'center',
    horizontal: 'center',
  });
  const {vertical,horizontal} = state1;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
 

  React.useEffect(() => {
    AsyncStorage.removeItem("ProductSelectAllTabAll");
    fetchSelectedIntegration(userid);
    fetchOrderStatusList();   
    fetchUserDeatils();   
    fetchCourierTypeList(userid);   
   // fetchCustomerTypeList();
   
 } ,[]);

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
     //  marginRight:'25px',
       backgroundColor:'#009900',
      //  paddingLeft: '22%',
      //  paddingRight: '22%',
       '&:hover': {
         color:'#fff',
         backgroundColor:'#009900',
       },
     },
  }))(Button);

  const ColorButton12 = withStyles(theme => ({
    root: {
      borderRadius : '3px',
      //  paddingTop: '9%',
      //  paddingBottom: '9%',
      //marginTop:'3%',
      height:'80%',
      padding:'7px',
      width:'160px',
       fontSize:'11px',
       fontWeight: '550',
       color:'#fff',
       marginRight:'25px',
       backgroundColor:'#009900',
      //  paddingLeft: '22%',
      //  paddingRight: '22%',
       '&:hover': {
         color:'#fff',
         backgroundColor:'#009900',
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
      
    backgroundColor: '#ff9900',
       borderColor: '#e68a00',
     //  paddingLeft: '22%',
     //  paddingRight: '22%',
      '&:hover': {
        color:'#fff',
        backgroundColor: '#e68a00',
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
      
      backgroundColor: '#ff9900',
       borderColor: '#e68a00',
     //  paddingLeft: '22%',
     //  paddingRight: '22%',
      '&:hover': {
        color:'#fff',
        backgroundColor: '#e68a00',
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
      backgroundColor:'#000',
     //  paddingLeft: '22%',
     //  paddingRight: '22%',
      '&:hover': {
        color:'#fff',
        backgroundColor:'#000',
      },
    },
  }))(Button);

  const fetchUserDeatils =()=>{
    setLoading(true);
    shiphypeservice.fetchUserDetail(userid)
          .then(response => {
           console.log("status",response.status);
                if(response.status === true) {
                  if(response.data.isfulfillment === "True")
                  {
                    setEnableTrue(false);
                  }
                  else if(response.data.isfulfillment === "False")
                  {
                    setEnableTrue(true);
                  }
                  setLoading(false);
                 
                //  setOrderStatus(response.data);
                           }else{
                            setLoading(false);
                            console.log("message",response.message);
                           }   
              }).catch((error) =>{
                    console.error(error);
              });
            }



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

//                     const orderStatusOptions = {};
//                     orderStatus.map(orderStatusOp => {
//     const { orderstatusId, orderstatusname } = orderStatusOp;
//     orderStatusOptions[ orderstatusId ] = orderstatusname
// })

// const orderTypeOptions = {};
// orderType.map(orderTypeOp => {
//     const { ordertypeId, ordertypename } = orderTypeOp;
//     orderTypeOptions[ ordertypeId ] = ordertypename
// })

const orderCouierOptions = {};
orderCouierType.map(orderCouierOp => {
    const { carrierId, carriertitle } = orderCouierOp;
    orderCouierOptions[ carrierId ] = carriertitle
})

// const orderCustomerOptions = {};
// orderCustomerType.map(orderCustoemrOp => {
//     const { customertypeId, customertypename } = orderCustoemrOp;
//     orderCustomerOptions[ customertypeId ] = customertypename
// })

const getOrerDetails=(shipmentId)=>{
  props.getOrderDataDetails(shipmentId);
} 


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
  props.switchHandling('selectWarehouseOrder');
}
const handleClickOpendelete = () => {
  
    setOpenDelete(true);
  //  setEnableTrue(false);
  
    console.log("rowid");
  
 
  };
  const handleCaptureInvoice = (event) => {
    const target=event.target;
    const fileReader = new FileReader();
    const file=target.files[0];
  
    var formData =  new FormData();


  ExcelRenderer(file, (err, resp) => {
    if(err){
      console.log(err);            
    }
    else{
     
      for(var i=1;i<resp.rows.length;i++)
      {
        if(resp.rows[i][5]===undefined)
        {

        }
        else{
      
          resp.rows[i][5]=new Date(Math.round(( resp.rows[i][5] - 25569)*86400*1000));
      
        }
        // if(resp.rows[i][15]===undefined)
        // {

        // }
        // else{
      
        //   resp.rows[i][15]=new Date(Math.round(( resp.rows[i][15] - 25569)*86400*1000));
     
        // }
       // resp.rows[i][7]=new Date(Math.round(( resp.rows[i][7] - 25569)*86400*1000));
      }
      console.log(resp.rows);
      shiphypeservice.uploadOrderSheet(resp.rows,userid)
  .then(response => {
   console.log("status",response.status);
        if(response.status === true) {
            console.log('done');
            setOpen(true);
            setType('success');

            setMsg(response.message);
            setStatus(response.status);
            setLoading(false);
                   }else{
                    console.log("message",response.message);
                    setOpen(true);
                    setType('error');
                    setMsg(response.message);
                    setStatus(response.status);
                    setLoading(false);
                   }   
      }).catch((error) =>{
            console.error(error);
      });
      console.log(resp);
    }
  });               
  
  
   
 
  };
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
  const handleDeleteCancle = () => {
    setOpenDelete(false);
  
   };


   const handleOpenProductImport = () => {
    setValue(1);
  //  setOpenImport(true);
  props.switchHandling('importOrderShopify');
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
<View style={{ paddingLeft:'0px',
      paddingRight:'25px',
      paddingTop:'0px',
      paddingBotton:'0px'}}>
              <Grid container justify="space-between" style={popUpStyle.breadCrumSidePadding}>
            <Grid item xs={12} md={2} lg={2}>
             <Text style={popUpStyle.breadCrundCss}>
              
           &nbsp;DASHBOARD /</Text><Text style={popUpStyle.breadCrundCss2}> ORDERS</Text>
              </Grid>
              <Grid item xs={12} md={9} lg={9}  >
              {showToast(open,msg,type)}
              <Grid container item  justify="flex-end" >
            <Grid style={{marginTop:'10px',marginBottom:'10px'}}>
            {(() => {
              if (enableTrue===true){
                  return (
            <ColorButton4
    size='large'
    variant="contained"
    color="primary"
    //className={classes.profileMargin}
    onClick={()=>{
      handleClickOpendelete('rowData.shippingId') 
      }}
    >
        {( enableTrue === true ? ' Enable Fulfillment' : ' Disable Fulfillment')}
  
  </ColorButton4> 
  )


}
else{
  return(<ColorButton2
    size='large'
    variant="contained"
    color="primary"
    //className={classes.profileMargin}
    onClick={()=>{
      handleClickOpendelete('rowData.shippingId') 
      }}
    >
        {( enableTrue === true ? ' Enable Fulfillment' : ' Disable Fulfillment')}
  
  </ColorButton2> )
  
}

})()}
&nbsp;
  <ColorButton
    size='large'
    variant="contained"
    color="primary"
    //className={classes.profileMargin}
    onClick={()=>{opennewOrder()}}
    >
    MANUAL ORDER
  </ColorButton>&nbsp; 
  {(() => {
              if (isIntegration === false){
                  return (
                    <ColorButton9
    size='large'
    variant="contained"
    color="primary"
    onClick={()=>{handleOpenProductImport()}}>
    Import Orders
  </ColorButton9>
  )
}
else{
  return(<ColorButton11
    size='large'
    variant="contained"
    color="primary"
    onClick={()=>{setOpen1(true)}}>
    Import Orders
  </ColorButton11> ) 
}

})()}
  &nbsp;

              <ColorButton10
        size='large'
        variant="contained"
        component="label"
        color="primary"
      onClick={()=>{props.switchHandling('UploadOrderSheet')}}
     >
          Upload Orders
         
       </ColorButton10>&nbsp;
       {/* <ColorButton12
        size='large'
        variant="contained"
        component="label"
        color="primary"
     // onClick={()=>{handlePreviousPage(2)}}
     ><a style={{color:'#fff', textDecoration: 'none'}} href={OrderSheet} download>Download Sample</a> </ColorButton12>&nbsp; */}
     
              </Grid>
              </Grid>
              </Grid>
              </Grid>
              </View>
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
      You don't have any integrations enabled. Please add an integration before importing orders.
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
         
         {orderStatus.map(row => (
            <Tab label={<span className={classes.tabRoot}>{row.orderstatusname}</span>} {...a11yProps(row.orderstatusId)} />
            ))}
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}  >
      { (() => {
     
            if(orderCouierType.length!==0)
            {
          return(
     <AllOrder userid={userid} userRoleId={userRoleId} orderStatus={0} 
     orderCouierOptions={orderCouierOptions} 
     getOrerDetails={getOrerDetails}
     getShipmentIdFromOrder={getShipmentIdFromOrder}/>
           ) }
         
    })()
  }
      </TabPanel>
      <TabPanel value={value} index={1} >
      { (() => {
     
     if(orderCouierType.length!==0)
     {
   return(
<AllOrder userid={userid} userRoleId={userRoleId} orderStatus={2} 
orderCouierOptions={orderCouierOptions}
getOrerDetails={getOrerDetails} 
getShipmentIdFromOrder={getShipmentIdFromOrder}/>
    ) }
  
})()
}
      </TabPanel>
      <TabPanel value={value} index={2}>
      { (() => {
     
     if(orderCouierType.length!==0)
     {
   return(
<AllOrder userid={userid} userRoleId={userRoleId} orderStatus={3} 
orderCouierOptions={orderCouierOptions} 
getOrerDetails={getOrerDetails}
getShipmentIdFromOrder={getShipmentIdFromOrder}/>
    ) }
  
})()
}
      </TabPanel>
      <TabPanel value={value} index={3}>
      { (() => {
     
     if(orderCouierType.length!==0)
     {
   return(
<AllOrder userid={userid} userRoleId={userRoleId} orderStatus={4} 
orderCouierOptions={orderCouierOptions} 
getOrerDetails={getOrerDetails}
getShipmentIdFromOrder={getShipmentIdFromOrder}/>
    ) }
  
})()
}
      </TabPanel>
      <TabPanel value={value} index={4}>
      { (() => {
     
     if(orderCouierType.length!==0)
     {
   return(
<AllOrder userid={userid} userRoleId={userRoleId} orderStatus={5} 
orderCouierOptions={orderCouierOptions} 
getOrerDetails={getOrerDetails}
getShipmentIdFromOrder={getShipmentIdFromOrder}/>
    ) }
  
})()
}
      </TabPanel>
      <TabPanel value={value} index={5}>
      { (() => {
     
     if(orderCouierType.length!==0)
     {
   return(
<AllOrder userid={userid} userRoleId={userRoleId} orderStatus={6} 
orderCouierOptions={orderCouierOptions} 
getOrerDetails={getOrerDetails}
getShipmentIdFromOrder={getShipmentIdFromOrder}/>
    ) }
  
})()
}
      </TabPanel>
      
      <TabPanel value={value} index={6}>
      { (() => {
     
     if(orderCouierType.length!==0)
     {
   return(
<AllOrder userid={userid} userRoleId={userRoleId} orderStatus={7} 
orderCouierOptions={orderCouierOptions} 
getOrerDetails={getOrerDetails}
getShipmentIdFromOrder={getShipmentIdFromOrder}/>
    ) }
  
})()
}
      </TabPanel>
      <TabPanel value={value} index={7}>
      { (() => {
     
     if(orderCouierType.length!==0)
     {
   return(
<AllOrder userid={userid} userRoleId={userRoleId} orderStatus={8} 
orderCouierOptions={orderCouierOptions} 
getOrerDetails={getOrerDetails}
getShipmentIdFromOrder={getShipmentIdFromOrder}/>
    ) }
  
})()
}
      </TabPanel>
      <TabPanel value={value} index={8}>
      { (() => {
     
     if(orderCouierType.length!==0)
     {
   return(
<AllOrder userid={userid} userRoleId={userRoleId} orderStatus={9} 
orderCouierOptions={orderCouierOptions} 
getOrerDetails={getOrerDetails}
getShipmentIdFromOrder={getShipmentIdFromOrder}/>
    ) }
  
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