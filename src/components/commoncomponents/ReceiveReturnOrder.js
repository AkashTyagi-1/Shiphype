import React ,{ useState, useEffect } from 'react';
import { fade,withStyles,makeStyles, useTheme} from '@material-ui/core/styles';
import {Platform,View,ScrollView,Image,Text,Dimensions,Clipboard} from 'react-native';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import popUpStyle from './style/popUpStyle';

import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import AddIcon from '@material-ui/icons/Add';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import * as shiphypeservice from './ShipService/shiphype_service';
import MaterialTable , { MTableToolbar }from 'material-table';
import { forwardRef } from 'react';
import Paper from '@material-ui/core/Paper';
import Toast from './feedback/Toast';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import ProgressBar from './feedback/ProgressBar';
import DeleteCard from './Order/ShowStatusOrder'; 
import DeleteCardr from './Order/ShowStatusOrderr'; 
import ConfirmationRelease from './Order/InTransitOrder';
import UnReverseInventory from './Order/DeliveredOrder';
import ExceptionOrder from './Order/ExceptionOrder';
import CancelOrder from './Order/ProcessOrder';
import MoveOrderHold from './Order/ShippedStatus';
import OnHoldOrder from './Order/OnHoldOrder';
import ManualTrackingOrder from './Order/ManualTrackingOrder';
import OnCanceled from './Order/OnCanceled';
import CalculateRate from './Order/CalculateRate';
import { format } from 'date-fns';
import TrackingURLNotExits from './Order/TrackingURLNotExits'; 
import RefreshIcon from '@material-ui/icons/Refresh';
import AsyncStorage from "@react-native-community/async-storage";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Box from "@material-ui/core/Box";
const ColorButtonAdd = withStyles(theme => ({
  root: {
   borderRadius : '3px',
   height:'100%',
   padding:'3px',
   width:'250px',
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
const ColorButtonAdd1 = withStyles(theme => ({
  root: {
   borderRadius : '3px',
   height:'100%',
   padding:'3px',
   width:'100px',
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
const ColorButtonRefresh = withStyles((theme) => ({
  root: {
    borderRadius: "3px",
    height: "100%",
    padding: "3px",
    width: "100px",
    fontSize: "11px",
    fontWeight: "550",
    color: "#fff",
    backgroundColor: "#33cc00",
    //  paddingLeft: '22%',
    //  paddingRight: '22%',
    "&:hover": {
      color: "#fff",
      backgroundColor: "#33cc00",
    },
  },
}))(Button);
const ColorButtonCreateReturn = withStyles(theme => ({
  root: {
    borderRadius : '3px',
    height:'100%',
    padding:'3px',
    width:'170px',
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

const tableIcons = {
    Add: () => <ColorButtonAdd
    size='large'
    variant="contained"
    color="primary"
    startIcon={<AddIcon />}
    >
     Product
  </ColorButtonAdd>,
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    RefreshIcon: forwardRef((props, ref) => <RefreshIcon {...props} ref={ref} color='action'/>),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
    CloudUpload:forwardRef((props, ref) => <CloudUploadIcon {...props} ref={ref} />)
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
  height: '75vh',
  overflow:'auto',
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
quantitycss:{
  width:'90%',
  fontSize:'6px',
  cursor:'pointer',
  underline: {
   "&&&:before": {
     borderBottom: "none"
   },
   "&&:after": {
     borderBottom: "none"
   }
 } 
 },

root: {
  //flexGrow: 1,
  width: '100%',
},
profileMargin10: {
  
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
    height:'72%',
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
//Make custom button
const ColorButtonProcessed = withStyles(theme => ({
  root: {
    color: '#fff',
    borderRadius : '3px',
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    height:'75%',
    width:'100px',
     fontSize:'11px',
     fontWeight: '550',
     color:'#fff',
     padding:0,
     paddingBottom:'3px',
     paddingTop:'3px',
     marginRight:'15px',
     backgroundColor:'#0168fa',
     '&:hover': {
      backgroundColor: '#0168fa',
      
    },
  },
}))(Button);
const ColorButtonCancel = withStyles(theme => ({
  root: {
    color: '#fff',
    borderRadius : '3px',
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    height:'75%',
    width:'100px',
     fontSize:'11px',
     fontWeight: '550',
     color:'#fff',
     padding:0,
     paddingBottom:'3px',
     paddingTop:'3px',
     backgroundColor:'#e60000',
     '&:hover': {
      backgroundColor: '#e60000',
      
    },
   
  },
}))(Button);


const ColorButtonShipped = withStyles(theme => ({
  root: {
    color: '#fff',
    borderRadius : '3px',
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    height:'75%',
    width:'100px',
     fontSize:'11px',
     fontWeight: '550',
     color:'#fff',
     padding:0,
     paddingBottom:'3px',
     paddingTop:'3px',
    //  backgroundColor:'#009900',
    //  '&:hover': {
    //   backgroundColor: '#009900',
      
    // },
    backgroundColor:'#732673',
    '&:hover': {
     backgroundColor: '#732673',
     
   },
   
  },
}))(Button);
const ColorButtonNew = withStyles(theme => ({
  root: {
    color: '#fff',
    borderRadius : '3px',
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    height:'75%',
    width:'100px',
     fontSize:'11px',
     fontWeight: '550',
     color:'#fff',
     padding:0,
     paddingBottom:'3px',
     paddingTop:'3px',
     backgroundColor:'#33cc00',
     '&:hover': {
      backgroundColor: '#33cc00',
      
    },
   
  },
}))(Button);
const ColorButtonOnHold = withStyles(theme => ({
  root: {
    color: '#fff',
    borderRadius : '3px',
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    height:'75%',
    width:'100px',
     fontSize:'11px',
     fontWeight: '550',
     color:'#fff',
     padding:0,
     paddingBottom:'3px',
     paddingTop:'3px',
     backgroundColor:'#808080',
     '&:hover': {
      backgroundColor: '#808080',
      
    },
   
  },
}))(Button);
const ColorButtonException = withStyles(theme => ({
    root: {
      color: '#fff',
      borderRadius : '3px',
      //  paddingTop: '9%',
      //  paddingBottom: '9%',
      height:'75%',
      width:'100px',
       fontSize:'11px',
       fontWeight: '550',
       color:'#fff',
       padding:0,
       paddingBottom:'3px',
       paddingTop:'3px',
       backgroundColor:'#992600',
       '&:hover': {
        backgroundColor: '#992600',
        
      },
     
    },
  }))(Button);

const ColorButtonInTransit = withStyles(theme => ({
    root: {
      color: '#fff',
      borderRadius : '3px',
      //  paddingTop: '9%',
      //  paddingBottom: '9%',
      height:'75%',
      width:'100px',
       fontSize:'11px',
       fontWeight: '550',
       color:'#000',
       padding:0,
       paddingBottom:'3px',
       paddingTop:'3px',
       backgroundColor:'#d9d9d9',
       '&:hover': {
        backgroundColor: '#d9d9d9',
        
      },
     
    },
  }))(Button);

  const ColorButtonInDeliverd = withStyles(theme => ({
    root: {
      color: '#fff',
      borderRadius : '3px',
      //  paddingTop: '9%',
      //  paddingBottom: '9%',
      height:'75%',
      width:'100px',
       fontSize:'11px',
       fontWeight: '550',
       color:'#fff',
       padding:0,
       paddingBottom:'3px',
       paddingTop:'3px',
       backgroundColor:'#002db3',
       '&:hover': {
        backgroundColor: '#002db3',
        
      },
     
    },
  }))(Button);
  const StyledMTableToolbar = withStyles({
    root: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  })(MTableToolbar);

  

 

/**
 * Description:This function is used for Slide17
 * @param {*} props 
 */
export default function Slide17(props) {

   const classes = useStyles();
   const [warehouse, setWarehouse] = React.useState(0);
   const user_id=props.userid;
   const sellerid=props.sellerid;
  // const sellerid=props.userid;
   const userOderSatus=props.orderStatus;
   const [sellerId,setSellerId]=React.useState(0);
   const[dataproduct,setDataProduct]=React.useState([]);
   const [openDelete, setOpenDelete] = React.useState(false);
   const [openDeleter, setOpenDeleter] = React.useState(false);
   const [openTrackingURL, setopenTrackingURL] = React.useState(false);
   const [openConfirmationRelease, setOpenConfirmationRelease] = React.useState(false);
   const [openUnReverseInventory, setOpenUnReverseInventory] = React.useState(false);
   const [openExceptionOrder, setOpenExceptionOrder] = React.useState(false);
   const [openCancelOrder, setOpenCancelOrder] = React.useState(false);
   const [openMoveOnHoldOrder, setOpenMoveOnHoldOrder] = React.useState(false);
   const [openOnHoldOrder, setOpenOnHoldOrder] = React.useState(false);
   const [openManualTrackingOrder, setOpenManualTrackingOrder] = React.useState(false);
   const [openCancelOrderSet, setOpenCancelOrderSet] = React.useState(false);
   const[orderCouierOptions,setOrderCouierOptions]=React.useState([]);
   const [changedWarehouseid, setchangedWarehouseid] = React.useState([]);
   const [status,setStatus]=React.useState(false);
   const [cardid,setCardid]=React.useState(0);
   const [loading,setLoading]=React.useState(true);
   const [open, setOpen]=React.useState(false);
   const [userName, setUserName]=React.useState('All Orders');
   const [userStatus, setUserStatus]=React.useState(false);
   const [msg,setMsg]=React.useState('');
   const [type,setType]=React.useState('');
   const [userData , setUserData] = React.useState([]);
   const [rowDataForOrder , setRowData] = React.useState([]);
   const [rowStatus , setRowStatus] = React.useState(0);
   let changedWarehouseid1=[];
   const [openChecked, setOpenChekced] = React.useState(false);
   var ids=[];
   const [options, setOptions] = React.useState([]);
   const [calculaterate,setCalculaterate]=React.useState(false);
   const [carrierid,setCarrierid]=React.useState(0);
   const [shippingPolicyName,setShippingPolicyName]=React.useState('');
   const [countDangerousGood,setCountDangerousGood]=React.useState('');
   const [totalCountDangerousGood,setTotalCountDangerousGood]=React.useState(0);
   const [selectedorderDate, setSelectedorderDate] = React.useState(new Date());
   const [shippingmethod, setshippingmethod] = React.useState('');
   const [useremail, setUserEmail] = React.useState('');
   const [companyname, setCompanyname] = React.useState('');
   const location=props.location;
   const [codeShopify, setCodeShopify] = React.useState('');
   const [storeNameShopify, setStoreNameshopify] = React.useState('');

   function closePrint() {
    document.body.removeChild(this.__container__);
  }

  function setPrint() {
    this.contentWindow.__container__ = this;
    this.contentWindow.onbeforeunload = closePrint;
    this.contentWindow.onafterprint = closePrint;
    setTimeout(
      () => {
        this.contentWindow.focus(); // Required for IE
        this.contentWindow.print();
      },
      6000,
    );
  }

  function printPage(sURL) {
    var oHiddFrame = document.createElement('iframe');

    oHiddFrame.onload = setPrint;
    oHiddFrame.style.position = 'fixed';
    oHiddFrame.style.right = '0';
    oHiddFrame.style.bottom = '0';
    oHiddFrame.style.width = '0';
    oHiddFrame.style.height = '0';
    oHiddFrame.style.border = '0';
    oHiddFrame.src = sURL;
    document.body.appendChild(oHiddFrame);
  }

  function Printpdf() {
    console.log(cardid);
    setLoading(true);
    console.log('card id =====');

    console.log('Id=======');

   // var sURL = `https://app.shiphype.com/PrintInternalPackagingSlip?shiphype_id=${cardid}&user_id=${user_id}&shippingmethod=${shippingmethod}&useremail=${useremail}&companyname=${companyname}`;
   var sURL = `http://localhost:19006/PrintInternalPackagingSlip?shiphype_id=${cardid}&user_id=${user_id}&shippingmethod=${shippingmethod}&useremail=${useremail}&companyname=${companyname}`;
  
   console.log(sURL);
    console.log('sURL');
    printPage(sURL);
    setLoading(false);
  }
   const handleRelease =(isSprintCreate)=>{
    if(isSprintCreate === 1){
      
      setOpenDelete(false);
      setOpenDeleter(false);
      setOpenConfirmationRelease(true);
     
    }
    else if(isSprintCreate === 2){
      
      setOpenDelete(false);
      setOpenDeleter(false);
      setOpenUnReverseInventory(true);
     
    }
    else if(isSprintCreate === 3){
      
      setOpenDelete(false);
      setOpenDeleter(false);
      // setOpenCancelOrder(true);
      handleConfirmCancel();
      Printpdf();
    }
    else if(isSprintCreate === 4){
      //Shipped value
      setOpenDelete(false);
      setOpenDeleter(false);
      //setOpenMoveOnHoldOrder(true);
      setCalculaterate(true);
     
    }
    else if(isSprintCreate === 5){
      
        setOpenDelete(false);
        setOpenDeleter(false);
        setOpenExceptionOrder(true);
       
      }
      else if(isSprintCreate === 6){
      
        setOpenDelete(false);
        setOpenDeleter(false);
        setOpenOnHoldOrder(true);
       
      }
      else if(isSprintCreate === 9){
      
        setOpenDelete(false);
        setOpenDeleter(false);
        setOpenManualTrackingOrder(true);
       
      }
      else if(isSprintCreate === 7){
      
        setOpenDelete(false);
        setOpenDeleter(false);
        setOpenCancelOrderSet(true);
       
      }
    else if(isSprintCreate === 8) {
      
      setOpenDelete(false);
      setOpenDeleter(false);
      setCalculaterate(false);
      setOpenMoveOnHoldOrder(true);
      
     
     
    }else{
      setOpenConfirmationRelease(true);
      setOpenDelete(false);
      setOpenDeleter(false);
    }
  }

  const handleGetShipmentId=(shipmentId)=>{
    AsyncStorage.setItem("SelectOrderForReturn",JSON.stringify(shipmentId));
    props.getInternalOrderId(shipmentId);
  }

  
  const handleGetShipmentId1=(shipmentId)=>{
    props.getInternalOrderId1(shipmentId);
  }


  const copyLinkOnClick=(copylink)=>{
    Clipboard.setString(copylink);
    setOpen(true);
    setType('success');
    setMsg('Tracking Number Copy to Clipboard');  
}
   
 
   const theme = useTheme()
   const [state, setState] = React.useState({
    column1FilterList: {},
    selectproduct:false,
    columns: [
//       { title: '',
//     render: rowData => <FormGroup>
//       {(() => {
       
//        if(rowData!==undefined){
//          return( 
//     <FormControlLabel style={popUpStyle.checkboxPosition}
//       control={<Checkbox 
//         id={rowData.internalorderId}

//         checked={
//             (() => {
//               for(let i=0; i<ids.length;i++)
             
//               {
                
            
//               if (rowData.internalorderId  === parseInt(ids[i])){
//                 return (
//                     true
//                   )
//               }
          
//               }
             
//               })()}
        
//         onChange={()=>{handleChangeCheckbox(rowData.internalorderId)}}
        
//         color="primary"
//        />}
//         className={classes.radioButtonCss}
//         InputProps={{ inputProps: { style: {  borderRadius: 0 }, }, style: { borderRadius: 0 }, }}
       
        
//     />
//        )
// }

// })()}  
//    </FormGroup>
//     },
  

    { title: 'Return Id', field: 'internalorderId',type: 'text',
    render: rowData => <Link href="#" onClick={() => handleGetShipmentId(rowData.internalorderId)} variant="body2">
{rowData.internalorderId} </Link>
  },

  {
    title: 'Return Date',
    field: 'recievedate',
    type: 'date',
    
  },   
    
{
  title: 'Seller Email',
  field: 'userEmail',
  type: 'text',
  render: rowData =><FormControlLabel
      
 // onClick={()=>{handleChangeCheckbox(rowData.internalorderId)}}
  className={classes.quantitycss}
  control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
  
  <Text style={{ fontSize: '11px', 
  fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
  transition : 'all 0.25s',}}>{rowData.userEmail}</Text>
    
  </Typography>}
  />
},
{
  title: 'Seller Company',
  field: 'company_name',
  type: 'text',
  render: rowData =><FormControlLabel
      
 // onClick={()=>{handleChangeCheckbox(rowData.internalorderId)}}
  className={classes.quantitycss}
  control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
  
  <Text style={{ fontSize: '11px', 
  fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
  transition : 'all 0.25s',}}>{rowData.company_name}</Text>
    
  </Typography>}
  />

},

  {
    title: 'From Name',
    field: 'fromname',
    type: 'text',
    render: rowData =><FormControlLabel
        
    //onClick={()=>{handleChangeCheckbox(rowData.internalorderId)}}
    className={classes.quantitycss}
    control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
    
    <Text style={{ fontSize: '11px', 
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
    transition : 'all 0.25s',}}> {rowData.fromname}  </Text>
      
    </Typography>}
    />
  },
  
   
     
      { title: 'Warehouse', field: 'warehouseid',
    lookup: { 1: 'US Warehouse', 2: 'Canada Warehouse' },
  },
  
     
      {
        title: 'Order Status',
        field: 'orderstatus',
        
        render: rowData => <Text>
                   {(() => {
                     if(rowData.orderstatus===5)
                     {
                       return(
                        <ColorButtonInTransit  size='large'
                        variant="contained"
                        color="primary"
                        onClick={()=>{
                          handleClickOpendelete(rowData.internalorderId,rowData) 
                          }}> In Transit </ColorButtonInTransit>
                       )
                     }
                     else if(rowData.orderstatus===3)
                     {
                       return(
        <ColorButtonProcessed  size='large'
        variant="contained"
        color="primary"
        onClick={()=>{
          handleClickOpendelete(rowData.internalorderId,rowData) 
          }}> Processing </ColorButtonProcessed>
                       )
                     }
                     else if(rowData.orderstatus===6)
                     {
                       return(
                        <ColorButtonInDeliverd  size='large'
                        variant="contained"
                        color="primary"
                        onClick={()=>{
                          handleClickOpendelete(rowData.internalorderId,rowData) 
                          }}> Delivered </ColorButtonInDeliverd>
                       )
                     }
                     else if(rowData.orderstatus===4)
                     {
                       return(
                        <ColorButtonShipped  size='large'
                        variant="contained"
                        color="primary"
                        onClick={()=>{
                          //handleClickOpendelete(rowData.internalorderId,rowData) 
                          }}> Shipped </ColorButtonShipped>
                       )
                     }
                     else if(rowData.orderstatus===7)
                     {
                       return(
                        <ColorButtonOnHold  size='large'
                        variant="contained"
                        color="primary"
                        onClick={()=>{
                          handleClickOpendelete(rowData.internalorderId,rowData) 
                          }}> On Hold</ColorButtonOnHold>
                       )
                     }
                     else if(rowData.orderstatus===8)
                     {
                       return(
                        <ColorButtonOnHold  size='large'
                        variant="contained"
                        color="primary"
                        onClick={()=>{
                          handleClickOpendelete(rowData.internalorderId,rowData) 
                          }}> On Hold</ColorButtonOnHold>
                       )
                     }
                     else if(rowData.orderstatus===9)
                     {
                       return(
                        <ColorButtonCancel  size='large'
                        variant="contained"
                        color="primary"
                        onClick={()=>{
                          handleClickOpendelete(rowData.internalorderId,rowData) 
                          }}> Cancelled </ColorButtonCancel>
                       )
                     }
                     else{
                      return(
                        <ColorButtonNew  size='large'
                        variant="contained"
                        color="primary"
                        onClick={()=>{
                          handleClickOpendelete(rowData.internalorderId,rowData) 
                          }}> NEW RETURN </ColorButtonNew>
                                       )
                     }
               
              })()}</Text>,
      },
      // {
      //   title: 'Track Order',
      //   field: 'trackingurl',
        
      //   render: rowData => <Text>
                  
      //   <ColorButtonProcessed  size='large'
      //   variant="contained"
      //   color="primary"
      //   onClick={()=>{
      //     handleClickTrack(rowData.internalorderId,rowData) 
      //     }}> Track </ColorButtonProcessed>
      //              </Text>,
      // },
      { title: 'Shipping Courier',  field: 'carriertitle',
      type: 'text',
    
    },
      {
        title: 'Tracking',
        field: 'tracking',
        type: 'text',
        render: rowData =><FormControlLabel
        
        onClick={()=>{copyLinkOnClick(rowData.tracking)}}
        className={classes.quantitycss}
        control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
        
        <Text style={{ fontSize: '11px', 
        fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
        transition : 'all 0.25s',}}>{rowData.tracking}</Text>
          
        </Typography>}
        />
      },
    
    
     
      
      { title: 'Return Condition', field: 'returncondition',type: 'text'},
      { title: "Comment", field: "comments", type: "text" },
    ],
   
  });
  const column1FilterList = state.column1FilterList;
  const fetchCourierTypeList = (userid)=>{

    //const userid=14;
    setLoading(true);
    shiphypeservice.fetchCourierTypeList(userid)
    .then(response => {
     console.log("status",response.status);
          if(response.status === true) {
            setLoading(false);
           setOrderCouierOptions(response.data);
            
            response.data.forEach(element => column1FilterList[element.carrierId] = element.carriertitle)
            setState({
              column1FilterList,
              columns: [
              
                
                { title: '',
                render: rowData => <FormGroup>
                  {(() => {
                   
                   if(rowData!==undefined){
                     return( 
                <FormControlLabel style={popUpStyle.checkboxPosition}
                  control={<Checkbox 
                    id={rowData.internalorderId}
            
                    checked={
                        (() => {
                          for(let i=0; i<ids.length;i++)
                         
                          {
                            
                        
                          if (rowData.internalorderId  === parseInt(ids[i])){
                            return (
                                true
                              )
                          }
                      
                          }
                         
                          })()}
                    
                    onChange={()=>{handleChangeCheckbox(rowData.internalorderId)}}
                    
                    color="primary"
                   />}
                    className={classes.radioButtonCss}
                    InputProps={{ inputProps: { style: {  borderRadius: 0 }, }, style: { borderRadius: 0 }, }}
                   
                    
                />
                   )
            }
            
            })()}  
               </FormGroup>
                },
              
            
                  { title: 'Return Id', field: 'internalorderId',type: 'text',
                  render: rowData => <Link href="#" onClick={() => handleGetShipmentId(rowData)} variant="body2">
                  {rowData.internalorderId} </Link>
                },
                {
                  title: 'Return Date',
                  field: 'recievedate',
                  type: 'date',
                  
                },
             
            {
              title: 'Seller Email',
              field: 'userEmail',
              type: 'text',
              render: rowData =><FormControlLabel
                  
              onClick={()=>{handleChangeCheckbox(rowData.internalorderId)}}
              className={classes.quantitycss}
              control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
              
              <Text style={{ fontSize: '11px', 
              fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
              transition : 'all 0.25s',}}>{rowData.userEmail}</Text>
                
              </Typography>}
              />
            },
            {
              title: 'Seller Company',
              field: 'company_name',
              type: 'text',
              render: rowData =><FormControlLabel
                  
              onClick={()=>{handleChangeCheckbox(rowData.internalorderId)}}
              className={classes.quantitycss}
              control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
              
              <Text style={{ fontSize: '11px', 
              fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
              transition : 'all 0.25s',}}>{rowData.company_name}</Text>
                
              </Typography>}
              />
            },
              {
                title: 'From Name',
                field: 'fromname',
                type: 'text',
                render: rowData =><FormControlLabel
                    
                onClick={()=>{handleChangeCheckbox(rowData.internalorderId)}}
                className={classes.quantitycss}
                control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
                
                <Text style={{ fontSize: '11px', 
                fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                transition : 'all 0.25s',}}> {rowData.fromname}  </Text>
                  
                </Typography>}
                />
              },
             
               
                  { title: 'Warehouse', field: 'warehouseid',
                  lookup: { 1: 'US Warehouse', 2: 'Canada Warehouse' },
                },
                
                  {
                    title: 'Order Status',
                    field: 'orderstatus',
                    
                    render: rowData => <Text>
                               {(() => {
                                 if(rowData.orderstatus===5)
                                 {
                                   return(
                                    <ColorButtonInTransit  size='large'
                                    variant="contained"
                                    color="primary"
                                    onClick={()=>{
                                      handleClickOpendelete(rowData.internalorderId,rowData) 
                                      }}> In Transit </ColorButtonInTransit>
                                   )
                                 }
                                 else if(rowData.orderstatus===3)
                                 {
                                   return(
                    <ColorButtonProcessed  size='large'
                    variant="contained"
                    color="primary"
                    onClick={()=>{
                      handleClickOpendelete(rowData.internalorderId,rowData) 
                      }}> Processing </ColorButtonProcessed>
                                   )
                                 }
                                 else if(rowData.orderstatus===6)
                                 {
                                   return(
                                    <ColorButtonInDeliverd  size='large'
                                    variant="contained"
                                    color="primary"
                                    onClick={()=>{
                                      handleClickOpendelete(rowData.internalorderId,rowData) 
                                      }}> Delivered </ColorButtonInDeliverd>
                                   )
                                 }
                                 else if(rowData.orderstatus===4)
                                 {
                                   return(
                                    <ColorButtonShipped  size='large'
                                    variant="contained"
                                    color="primary"
                                    onClick={()=>{
                                      //handleClickOpendelete(rowData.internalorderId,rowData) 
                                      }}> Shipped </ColorButtonShipped>
                                   )
                                 }
                                 else if(rowData.orderstatus===7)
                                 {
                                   return(
                                    <ColorButtonOnHold  size='large'
                                    variant="contained"
                                    color="primary"
                                    onClick={()=>{
                                      handleClickOpendelete(rowData.internalorderId,rowData) 
                                      }}> On Hold</ColorButtonOnHold>
                                   )
                                 }
                                 else if(rowData.orderstatus===8)
                                 {
                                   return(
                                    <ColorButtonOnHold  size='large'
                        variant="contained"
                        color="primary"
                        onClick={()=>{
                          handleClickOpendelete(rowData.internalorderId,rowData) 
                          }}> On Hold</ColorButtonOnHold>
                                   )
                                 }
                                 else if(rowData.orderstatus===9)
                                 {
                                   return(
                                    <ColorButtonCancel  size='large'
                                    variant="contained"
                                    color="primary"
                                    onClick={()=>{
                                      handleClickOpendelete(rowData.internalorderId,rowData) 
                                      }}> Cancelled </ColorButtonCancel>
                                   )
                                 }
                                 else{
                                  return(
                                    <ColorButtonNew  size='large'
                                    variant="contained"
                                    color="primary"
                                    onClick={()=>{
                                      handleClickOpendelete(rowData.internalorderId,rowData) 
                                      }}> NEW RETURN </ColorButtonNew>
                                                   )
                                 }
                           
                          })()}</Text>,
                  },
                  // {
                  //   title: 'Track Order',
                  //   field: 'trackingurl',
                    
                  //   render: rowData => <Text>
                              
                  //   <ColorButtonProcessed  size='large'
                  //   variant="contained"
                  //   color="primary"
                  //   onClick={()=>{
                  //     handleClickTrack(rowData.internalorderId,rowData) 
                  //     }}> Track </ColorButtonProcessed>
                  //              </Text>,
                  // },
                  { title: 'Shipping Courier',  field: 'carriertitle',
                  type: 'text',
                 
                },
                  {
                    title: 'Tracking',
                    field: 'tracking',
                    type: 'text',
                    render: rowData =><FormControlLabel
                    
                    onClick={()=>{copyLinkOnClick(rowData.tracking)}}
                    className={classes.quantitycss}
                    control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
                    
                    <Text style={{ fontSize: '11px', 
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                    transition : 'all 0.25s',}}>{rowData.tracking}</Text>
                      
                    </Typography>}
                    />
                  },
                 
                 
                 
                  
              ],
            });           
            console.log("packingdata",response.data);
                     }else{
                      setLoading(false);
                      console.log("message",response.message);
                     }   
        }).catch((error) =>{
              console.error(error);
        });
  }


const handleClickOpendelete1 = () => {
  setOpenDeleter(true);
  
 // setRowStatus(rowData.orderstatus);
//    console.log("rowid",rowid);
  };

  const handleClickTrack = (rowid,rowData) => {

    // setOpenDelete(true);
    // setCardid(rowid);
    // setRowData(rowData);
    // setshippingmethod(rowData.tracking);
    if(rowData.trackingurl===null)
    {
      setopenTrackingURL(true);
    }
    else if(rowData.trackingurl==='')
    {
      setopenTrackingURL(true);
    }
    else{
      window.open(rowData.trackingurl, '_blank');
    }
   
  
    console.log("rowid",rowid);
    };
    let dangerous='No';
  const handleClickOpendelete = (rowid,rowData) => {

//     setOpenDelete(true);
//     setCardid(rowid);
//     setRowData(rowData);
//     setshippingmethod(rowData.tracking);
//     setUserEmail(rowData.userEmail);
//     setCompanyname(rowData.company_name);
//     for(let i=0;i<rowData.productid.length;i++)
//     {
//    if(rowData.productid[i].product.dangerousgoods===true)
//    {
//     dangerous='yes';
//    }
//     }
//     setCountDangerousGood(dangerous);
//     setTotalCountDangerousGood(rowData.productid.length);
//     if(rowData.shipmenttype==='1')
//     {
//       setShippingPolicyName('Standard Shipping');
      
//     }
//     else if(rowData.shipmenttype==='2')
//     {
//       setShippingPolicyName('2-Day Shipping');
      
//     }
//     else if(rowData.shipmenttype==='3')
//     {
//       setShippingPolicyName('Overnight Shipping');
     
//     }
//     else if(rowData.shipmenttype==='4')
//     {
//       setShippingPolicyName('Stamped Postage');
     
      
//     }
//     else if(rowData.shipmenttype==='5')
//     {
//       setShippingPolicyName('Oversize LetterMail');
    
//     }
//     else if(rowData.shipmenttype==='6')
//     {
//       setShippingPolicyName('Pallet Freight');
      
//     }
//     fetchUserIntegrationShopify(rowData.userId);
//     setRowStatus(rowData.orderstatus);
    
// if(rowData.orderstatus === 2){
//   //createOrderPayment(rowid);
// }
    console.log("rowid",rowid);
    };

    const  createOrderPayment = (orderid) => {
      setLoading(true);
      shiphypeservice
        .createOrderPayment(orderid,'0')
        .then((response) => {
          console.log("status", response.status);
          if (response.status === true) {
            setLoading(false);
          } else {
            setLoading(false);
            console.log("message", response.message);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };


    const handleConfirmRelease = () => {
      const isDelete=5;
      if(cardid===0)
      {
         changedWarehouseid1=changedWarehouseid;
      }
      else{
        
        changedWarehouseid1.push(cardid);
      }
      shiphypeservice.updateOrderStatus(changedWarehouseid1,isDelete)
      .then(response => {
       console.log("status",response.status);
            if(response.status === true) {
              setOpen(true);
              setType('success');
              setMsg(response.message);
              setStatus(response.status);
              setLoading(false);
              setOpenConfirmationRelease(false);
              handleChangeCheckbox5();
              fetchProductList(sellerid);
                 
                       }else{
                        setOpen(true);
                        setType('success');
                        setMsg(response.message);
                        setStatus(response.status);
                        setLoading(false);
                        console.log("message",response.message);
                       }   
          }).catch((error) =>{
                console.error(error);
          });
    }
    const handleConfirmCancel = () => {
      const isDelete=3;
      setLoading(true);
      if(cardid===0)
      {
         changedWarehouseid1=changedWarehouseid;
      }
      else{
        
        changedWarehouseid1.push(cardid);
      }
      shiphypeservice.updateOrderStatus(changedWarehouseid1,isDelete)
      .then(response => {
       console.log("status",response.status);
            if(response.status === true) {
              setOpen(true);
              setType('success');
              setMsg(response.message);
              setStatus(response.status);
              setLoading(false);
              setOpenCancelOrder(false);
              handleChangeCheckbox5();
              fetchProductList(sellerid);
                 
                       }else{
                        setOpen(true);
                        setType('success');
                        setMsg(response.message);
                        setStatus(response.status);
                        setLoading(false);
                        console.log("message",response.message);
                       }   
          }).catch((error) =>{
                console.error(error);
          });
    }
    const handleConfirmDone = () => {
      const isDelete=6;
      if(cardid===0)
      {
         changedWarehouseid1=changedWarehouseid;
      }
      else{
        
        changedWarehouseid1.push(cardid);
      }
      shiphypeservice.updateOrderStatus(changedWarehouseid1,isDelete)
      .then(response => {
       console.log("status",response.status);
            if(response.status === true) {
              setOpen(true);
              setType('success');
              setMsg(response.message);
              setStatus(response.status);
              setLoading(false);
              setOpenUnReverseInventory(false);
              handleChangeCheckbox5();
              fetchProductList(sellerid);
                 
                       }else{
                        setOpen(true);
                        setType('success');
                        setMsg(response.message);
                        setStatus(response.status);
                        setLoading(false);
                        setOpenUnReverseInventory(false);
                        console.log("message",response.message);
                       }   
          }).catch((error) =>{
                console.error(error);
          });
    }


    const convertDataFromAPI = (data) => {
      const rowDataOr=rowDataForOrder;
      
      var newArr = [];

      var shipmentRequest={};
      var shipment={};
      var shipper={};
      var phone={};
      var address={};
      var shipTo={};
      var shipFrom={};
      var paymentInformation={};
      var shipmentCharge={};
      var billShipper={};
      var service={};
      //var package=[];
      var packaging={};
      var packageWeight={};
      var labelSpecification={};
      var labelImageFormat={};

      var myObject = {};




      for ( var a = 0; a < data.length; a++){
      
        
       data[a].time ? myObject['time'] = data[a].time : null
       data[a].title ? myObject['title'] = data[a].title : null
       data[a].description ? myObject['description'] = data[a].description : null
       data[a].circleColor ? myObject['circleColor'] = data[a].circleColor : null
       data[a].lineColor ? myObject['lineColor'] = data[a].lineColor : null
         newArr.push(myObject)
       }
     
       return newArr
     }
     var custoemridarray=[];


    const handleConfirmHold = (tracking,carrier,courierid,serviceName,comapnyname,trackingURL) => {
        const rowDataOr=rowDataForOrder;
        const selectedorderDate1=  format(selectedorderDate, "yyyy-MM-dd hh:mm:ss");
        custoemridarray.push(rowDataOr.customerId);
        setLoading(true);
     // const isDelete=4;
      shiphypeservice.updateOrderTracking(cardid,rowDataOr.externalorderId,rowDataOr.source,rowDataOr.ordertype,rowDataOr.recipientname,rowDataOr.ordercountry,carrier,
       4, rowDataOr.orderdate,selectedorderDate1,rowDataOr.customertype,rowDataOr.orderkind,custoemridarray,
       rowDataOr.shippingpolicyId,rowDataOr.userId,rowDataOr.optionId,rowDataOr.dangerousgoods,rowDataOr.extrabubble
       ,rowDataOr.insuranceoption,tracking,courierid,serviceName,rowDataOr.shipmenttype,codeShopify,storeNameShopify,rowDataOr.externaluniqueId,comapnyname,trackingURL,rowDataOr.warehouseid)
      .then(response => {
       console.log("status",response.status);
       if(response.status === true) {
        setOpen(true);
        setType('success');
        setMsg(response.message);
        setStatus(response.status);
        setLoading(false);
        setOpenMoveOnHoldOrder(false);
        setCalculaterate(false);
        handleChangeCheckbox5();
        fetchProductList(sellerid);
           
                 }else{
                  setOpen(true);
                  setType('success');
                  setMsg(response.message);
                  setStatus(response.status);
                  setLoading(false);
                  console.log("message",response.message);
                 }   
          }).catch((error) =>{
                console.error(error);
          });
    }


    const handleManualTracking = (tracking,serviceName,trackingurl) => {
      const rowDataOr=rowDataForOrder;
      const selectedorderDate1=  format(selectedorderDate, "yyyy-MM-dd hh:mm:ss");
      setLoading(true);
      custoemridarray.push(rowDataOr.customerId);
   // const isDelete=4;
    shiphypeservice.updateManualTracking(cardid,rowDataOr.externalorderId,rowDataOr.source,rowDataOr.ordertype,rowDataOr.recipientname,rowDataOr.ordercountry,rowDataOr.shippingcourier,
     4, rowDataOr.orderdate,selectedorderDate1,rowDataOr.customertype,rowDataOr.orderkind,custoemridarray,
     rowDataOr.shippingpolicyId,rowDataOr.userId,rowDataOr.optionId,rowDataOr.dangerousgoods,rowDataOr.extrabubble
     ,rowDataOr.insuranceoption,tracking,serviceName,rowDataOr.shipmenttype,codeShopify,storeNameShopify,rowDataOr.externaluniqueId,rowDataOr.warehouseid,
     trackingurl,serviceName)
    .then(response => {
     console.log("status",response.status);
     if(response.status === true) {
      setOpen(true);
      setType('success');
      setMsg(response.message);
      setStatus(response.status);
      setLoading(false);
      setOpenManualTrackingOrder(false);
      setCalculaterate(false);
      handleChangeCheckbox5();
      fetchProductList(sellerid);
         
               }else{
                setOpen(true);
                setType('success');
                setMsg(response.message);
                setStatus(response.status);
                setLoading(false);
                console.log("message",response.message);
               }   
        }).catch((error) =>{
              console.error(error);
        });
  }

    const handleConfirmHoldOrder = (tracking,edit,reaionID) => {
      if(cardid===0)
      {
         changedWarehouseid1=changedWarehouseid;
      }
      else{
        
        changedWarehouseid1.push(cardid);
      }
      const rowDataOr=rowDataForOrder;
     if(edit === 0)
     {
      shiphypeservice.AddOrderReson(changedWarehouseid1,tracking,7,rowDataOr.userId)
      .then(response => {
       console.log("status",response.status);
       if(response.status === true) {
        handleConfirmOnHoldStatus();
           
                 }else{
                  handleConfirmOnHoldStatus();
                  console.log("message",response.message);
                 }   
          }).catch((error) =>{
                console.error(error);
          });
     }
     else{
      shiphypeservice.UpdateOrderReson(cardid,tracking,7,rowDataOr.userId,reaionID)
      .then(response => {
       console.log("status",response.status);
       if(response.status === true) {
        handleConfirmOnHoldStatus();
           
                 }else{
                  handleConfirmOnHoldStatus();
                  console.log("message",response.message);
                 }   
          }).catch((error) =>{
                console.error(error);
          });

     }
   // const isDelete=4;
   
  }

  const handleConfirmCancelSet = (tracking,edit) => {
    if(cardid===0)
    {
       changedWarehouseid1=changedWarehouseid;
    }
    else{
      
      changedWarehouseid1.push(cardid);
    }
    const rowDataOr=rowDataForOrder;
     if(edit === 0)
     {
      shiphypeservice.AddOrderReson(changedWarehouseid1,tracking,7,rowDataOr.userId)
      .then(response => {
       console.log("status",response.status);
       if(response.status === true) {
        handleConfirmCancelStatus();
           
                 }else{
                  handleConfirmCancelStatus();
                  console.log("message",response.message);
                 }   
          }).catch((error) =>{
                console.error(error);
          });
     }
     else{
      shiphypeservice.UpdateOrderReson(cardid,tracking,7,rowDataOr.userId)
      .then(response => {
       console.log("status",response.status);
       if(response.status === true) {
        handleConfirmCancelStatus();
           
                 }else{
                  handleConfirmCancelStatus();
                  console.log("message",response.message);
                 }   
          }).catch((error) =>{
                console.error(error);
          });

     }
}

const handleConfirmCancelStatus = () => {
  const isDelete=9;
  if(cardid===0)
  {
     changedWarehouseid1=changedWarehouseid;
  }
  else{
    
    changedWarehouseid1.push(cardid);
  }
  shiphypeservice.updateOrderStatus(changedWarehouseid1,isDelete)
  .then(response => {
   console.log("status",response.status);
        if(response.status === true) {
          setOpen(true);
          setType('success');
          setMsg(response.message);
          setStatus(response.status);
          setLoading(false);
          setOpenCancelOrderSet(false);
          const cancel={
            order_id:rowDataForOrder.courierid
          };
          cancelParcel(cancel);
             
                   }else{
                    setOpen(true);
                    setType('success');
                    setMsg(response.message);
                    setStatus(response.status);
                    setLoading(false);
                    setOpenCancelOrderSet(false);
                    console.log("message",response.message);
                   }   
      }).catch((error) =>{
            console.error(error);
      });
}

const cancelParcel=(cancel)=>{
  shiphypeservice.cancelRequestParcel(cancel)
  .then(response => {
   console.log("status",response.status);
   handleChangeCheckbox5();
   fetchProductList(sellerid);
        // if(response.status === true) {
        //   setOpen(true);
        //   setType('success');
        //   setMsg(response.message);
        //   setStatus(response.status);
        //   setLoading(false);
         
             
        //            }else{
        //             setOpen(true);
        //             setType('success');
        //             setMsg(response.message);
        //             setStatus(response.status);
        //             setLoading(false);
                    
        //            }   
      }).catch((error) =>{
            console.error(error);
      });
}
  const handleConfirmOnHoldStatus = () => {
    const isDelete=7;
    if(cardid===0)
    {
       changedWarehouseid1=changedWarehouseid;
    }
    else{
      
      changedWarehouseid1.push(cardid);
    }
    shiphypeservice.updateOrderStatus(changedWarehouseid1,isDelete)
    .then(response => {
     console.log("status",response.status);
          if(response.status === true) {
            setOpen(true);
            setType('success');
            setMsg(response.message);
            setStatus(response.status);
            setLoading(false);
            setOpenOnHoldOrder(false);
            handleChangeCheckbox5();
            fetchProductList(sellerid);
               
                     }else{
                      setOpen(true);
                      setType('success');
                      setMsg(response.message);
                      setStatus(response.status);
                      setLoading(false);
                      setOpenOnHoldOrder(false);
                      console.log("message",response.message);
                     }   
        }).catch((error) =>{
              console.error(error);
        });
  }
 
 
    const handleConfirmException = () => {
        const isDelete=8;
        if(cardid===0)
        {
           changedWarehouseid1=changedWarehouseid;
        }
        else{
          
          changedWarehouseid1.push(cardid);
        }
        shiphypeservice.updateOrderStatus(changedWarehouseid1,isDelete)
        .then(response => {
         console.log("status",response.status);
              if(response.status === true) {
                setOpen(true);
                setType('success');
                setMsg(response.message);
                setStatus(response.status);
                setLoading(false);
                setOpenExceptionOrder(false);
                handleChangeCheckbox5();
                fetchProductList(sellerid);
                   
                         }else{
                          setOpen(true);
                          setType('success');
                          setMsg(response.message);
                          setStatus(response.status);
                          setLoading(false);
                          setOpenExceptionOrder(false);
                          console.log("message",response.message);
                         }   
            }).catch((error) =>{
                  console.error(error);
            });
      }
    const handleDeleteCancle = () => {
      setOpenDelete(false);
      setOpenDeleter(false);
      setopenTrackingURL(false);
      setOpenConfirmationRelease(false);
      setOpenUnReverseInventory(false);
      setOpenMoveOnHoldOrder(false);
      setOpenCancelOrder(false);
      setOpenExceptionOrder(false);
      setOpenOnHoldOrder(false);
      setOpenManualTrackingOrder(false);
      setOpenCancelOrderSet(false);
      setCalculaterate(false);
     };

  
  React.useEffect(() => {
   // fetchCourierTypeList(user_id);
    if(sellerid === 0){
      fetchProductList(user_id);
    }else{
      fetchProductList(sellerid);
    }
    // if(sellerid === 0){
    //   fetchUserIntegrationShopify(user_id);
    // }else{
    //   fetchUserIntegrationShopify(sellerid);
    // }
   // fetchUserInfo();
   
  
 } ,[]);
 const fetchRefersh = ()=>{


 if(sellerid === 0){
  fetchProductList(user_id);
}else{
  fetchProductList(sellerid);
}
 }
 const fetchUserIntegrationShopify = (useridshopify)=>{

  //const userid=5;
  setLoading(true);
  shiphypeservice.fetchUserIntegration(useridshopify)
  .then(response => {
   console.log("status",response.status);
        if(response.status === true) {
          setLoading(false);
          if(response.data.length!==0)
          { 
            for(let i=0;i<response.data.length;i++)
                {
                  if(response.data[i].integrationId===4)
                  {
                    setCodeShopify(response.data[i].token);
                    setStoreNameshopify(response.data[i].appname);
                  }

                }

            
             

          }
        
                   }else{
                    setLoading(false);
                    console.log("message",response.message);
                   }   
      }).catch((error) =>{
            console.error(error);
      });
}

 const fetchUserInfo = ()=>{

    //const userid=5;
    setLoading(true);
    shiphypeservice.fetchUserInfo()
    .then(response => {
     console.log("status",response.status);
          if(response.status === true) {
            setLoading(false);
            setUserData(response.data);
         
            setUserStatus(true);
             
                     }else{
                      setLoading(false);
                      console.log("message",response.message);
                     }   
        }).catch((error) =>{
              console.error(error);
        });
  }
  const fetchProductListOfLastWeek = ()=>{

    //const userid=5;
    setLoading(true);
    shiphypeservice.fetchOrderList(user_id,userOderSatus)
    .then(response => {
     console.log("status",response.status);
          if(response.status === true) {
            setLoading(false);
            if(location === 2){
              var array=[];
              for(let m=0;m<response.data.length;m++){
                if(parseInt(response.data[m].warehouseid) === 2){
                 array.push(response.data[m]); 
                }
               
              }
              const updatedaray=[...array];

              console.log("CA");
             setDataProduct(updatedaray);
            }else if(location === 1){
             var array=[];
             for(let m=0;m<response.data.length;m++){
               if(parseInt(response.data[m].warehouseid) === 1){
                array.push(response.data[m]); 
               }
              
             }
             const updatedaray=[...array];

             console.log("USA");
            setDataProduct(updatedaray);
            }else{
             setDataProduct(response.data);
            }
             
                     }else{
                      setLoading(false);
                      console.log("message",response.message);
                     }   
        }).catch((error) =>{
              console.error(error);
        });
  }
  const fetchProductList = (seller)=>{
    //setLoading(false);
    //const userid=5;
    if(seller===0)
    {
       fetchProductListOfLastWeek();
        //seller=userid;
    }
    else{
      if(seller===1)
      {
        shiphypeservice.fetchreturnorder(seller)
        .then(response => {
         console.log("status",response.status);
              if(response.status === true) {
                //setLoading(false);
                for (let i = 0; i < response.data.length; i++) {
                  if(response.data[i].shipdate==='0001-01-01T00:00:00')
                  {
                   response.data[i].shipdate='';
                  }
                  else if(response.data[i].orderstatus===1)
                  {
                   response.data[i].shipdate='';
                  }
                  if(response.data[i].externalorderId===0)
                  {
                   response.data[i].externalorderId='';
                  }
                 }

                 if(location === 2){
                   var array=[];
                   for(let m=0;m<response.data.length;m++){
                     if(parseInt(response.data[m].warehouseid) === 2){
                      array.push(response.data[m]); 
                     }
                    
                   }
                   const updatedaray=[...array];

    
                  setDataProduct(updatedaray);
                 }else if(location === 1){
                  var array=[];
                  for(let m=0;m<response.data.length;m++){
                    if(parseInt(response.data[m].warehouseid) === 1){
                     array.push(response.data[m]); 
                    }
                   
                  }
                  const updatedaray=[...array];

   
                 setDataProduct(updatedaray);
                 }else{
                  setDataProduct(response.data);
                 }
                  
                   setLoading(false);
                         }else{
                          //setLoading(false);
                          console.log("message",response.message);
                         }   
            }).catch((error) =>{
                  console.error(error);
            });
      }
      else{
    //setLoading(true);
    shiphypeservice.fetchreturnorder(seller)
    .then(response => {
     console.log("status",response.status);
          if(response.status === true) {
            //setLoading(false);
            for (let i = 0; i < response.data.length; i++) {
              if(response.data[i].shipdate==='0001-01-01T00:00:00')
              {
               response.data[i].shipdate='';
              }
              else if(response.data[i].orderstatus===1)
              {
               response.data[i].shipdate='';
              }
              if(response.data[i].externalorderId===0)
              {
               response.data[i].externalorderId='';
              }
             }
             if(location === 2){
              var array=[];
              for(let m=0;m<response.data.length;m++){
                if(parseInt(response.data[m].warehouseid) === 2){
                 array.push(response.data[m]); 
                }
               
              }
              const updatedaray=[...array];

console.log("CA");
             setDataProduct(updatedaray);
            }else if(location === 1){
             var array=[];
             for(let m=0;m<response.data.length;m++){
               if(parseInt(response.data[m].warehouseid) === 1){
                array.push(response.data[m]); 
               }
              
             }
             const updatedaray=[...array];

             console.log("USA");
            setDataProduct(updatedaray);
            }else{
             setDataProduct(response.data);
            }
             
                     }else{
                      //setLoading(false);
                      console.log("message",response.message);
                     }   
        }).catch((error) =>{
              console.error(error);
        });
      }
    }
  }

const updateCarrier=(carrier,courierid,serviceName,comapnyname,trackingURL)=>{
  setCarrierid(carrier);
  handleRelease(8);
  setOpenDelete(false);
  setOpenDeleter(false);
  setCalculaterate(false);
  setOpenMoveOnHoldOrder(false);
  handleConfirmHold(carrier,3,courierid,serviceName,comapnyname,trackingURL);
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
          var flag =false;
          const handleChangeCheckbox5 = (data) => {
            setOpenChekced(false);
            var ids9=[];
            console.log("arraylenghtafter",ids9.length);
            const updatedaray=[...ids9];
        
            setchangedWarehouseid(updatedaray);
            setCardid(0);
            setState({
              columns: [
                { title: '',
                render: rowData => <FormGroup>
                  {(() => {
                   
                   if(rowData!==undefined){
                     return( 
                <FormControlLabel style={popUpStyle.checkboxPosition}
                  control={<Checkbox 
                    id={rowData.internalorderId}
            
                    checked={
                        (() => {
                          for(let i=0; i<ids9.length;i++)
                         
                          {
                            
                          if (rowData.internalorderId  === parseInt(ids9[i])){
                            return (
                                true
                              )
                          }
                        
                          }
                         
                          })()}
                    
                    onChange={()=>{handleChangeCheckbox(rowData.internalorderId)}}
                    
                    color="primary"
                   />}
                    className={classes.radioButtonCss}
                    InputProps={{ inputProps: { style: {  borderRadius: 0 }, }, style: { borderRadius: 0 }, }}
                   
                    
                />
                   )
            }
            
            })()}  
               </FormGroup>
                },
                { title: 'ShipHype Id', field: 'internalorderId',type: 'text',
                render: rowData => <Link href="#" onClick={() => handleGetShipmentId(rowData.internalorderId)} variant="body2">
                {rowData.internalorderId} </Link>
                },
                { title: 'Platform Id', field: 'externalorderId', type: 'text',
  render: rowData =><FormControlLabel
        
  onClick={()=>{handleChangeCheckbox(rowData.externalorderId)}}
  className={classes.quantitycss}
  control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
  
  <Text style={{ fontSize: '11px', 
  fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
  transition : 'all 0.25s',}}>{rowData.externalorderId}</Text>
    
  </Typography>}
  />
},
{ title: 'Courier ID',
  field: 'courierid',type: 'text',
  render: rowData => <Link href="#" onClick={() => handleGetShipmentId(rowData.internalorderId)} variant="body2">
  {rowData.courierid} </Link>
},
                { title: 'Order ID',
                field: 'sellerorderid',type: 'text',
                // render: rowData => <Link href="#" onClick={() => handleGetShipmentId(rowData.internalorderId)} variant="body2">
                // {rowData.courierid} </Link>
            },
              {
                title: 'Source',
                field: 'source',
                type: 'text',
                render: rowData =><FormControlLabel
                  
                onClick={()=>{handleChangeCheckbox(rowData.internalorderId)}}
                className={classes.quantitycss}
                control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
                
                <Text style={{ fontSize: '11px', 
                fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                transition : 'all 0.25s',}}>{rowData.source}</Text>
                  
                </Typography>}
                />
              },
            {
              title: 'Order Type',
              field: 'ordertype',
            lookup: { 1: 'Integration', 2: 'Manual',3: 'Subscription Box' },
             
            render: rowData =><FormControlLabel
                  
            onClick={()=>{handleChangeCheckbox(rowData.internalorderId)}}
            className={classes.quantitycss}
            control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
             {(() => {
                         if(rowData.ordertype===1)
                         {
                           return(
            <Text style={{ fontSize: '11px', 
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            transition : 'all 0.25s',}}>Integration</Text>
            )
          }
          else   if(rowData.ordertype===2)
          {
            return(
          <Text style={{ fontSize: '11px', 
          fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
          transition : 'all 0.25s',}}>Manual</Text>
          )
          }
          else
          {
          return(
          <Text style={{ fontSize: '11px', 
          fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
          transition : 'all 0.25s',}}>Subscription Box</Text>
          )
          }
          
          })()}
            </Typography>}
            />
          },
          {
            title: 'Seller Email',
            field: 'userEmail',
            type: 'text',
            render: rowData =><FormControlLabel
                
            onClick={()=>{handleChangeCheckbox(rowData.internalorderId)}}
            className={classes.quantitycss}
            control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
            
            <Text style={{ fontSize: '11px', 
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            transition : 'all 0.25s',}}>{rowData.userEmail}</Text>
              
            </Typography>}
            />
          },
          {
            title: 'Seller Company',
            field: 'company_name',
            type: 'text',
            render: rowData =><FormControlLabel
                
            onClick={()=>{handleChangeCheckbox(rowData.internalorderId)}}
            className={classes.quantitycss}
            control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
            
            <Text style={{ fontSize: '11px', 
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            transition : 'all 0.25s',}}>{rowData.company_name}</Text>
              
            </Typography>}
            />
          },
            {
              title: 'Customer Name',
              field: 'recipientname',
              type: 'text',

              render: rowData =><FormControlLabel
                  
              onClick={()=>{handleChangeCheckbox(rowData.internalorderId)}}
              className={classes.quantitycss}
              control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
              
              <Text style={{ fontSize: '11px', 
              fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
              transition : 'all 0.25s',}}> {rowData.firstname} {rowData.lastname} </Text>
                
              </Typography>}
              />
            },
            { title: 'Order Country', field: 'ordercountry',type: 'text',
            render: rowData =><FormControlLabel
                  
            onClick={()=>{handleChangeCheckbox(rowData.internalorderId)}}
            className={classes.quantitycss}
            control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
            
            <Text style={{ fontSize: '11px', 
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            transition : 'all 0.25s',}}>{rowData.ordercountry}</Text>
              
            </Typography>}
            />,
          },
            {
                  title: 'Customer Type',
                  field: 'customertype',
                  //lookup: { 1: 'Corrugated Box', 2: 'Letter' },
                  lookup: { 1: 'Business', 2: 'Residential' },
                  render: rowData =><FormControlLabel
                  
                  onClick={()=>{handleChangeCheckbox(rowData.internalorderId)}}
                  className={classes.quantitycss}
                  control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
                  
                
                   {(() => {
                    if(rowData.customertype===1)
                    {
                      return(
                        <Text style={{ fontSize: '11px', 
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                        transition : 'all 0.25s',}}>Business</Text>
                        )
                      }
                      else{
                        return(
                          <Text style={{ fontSize: '11px', 
                          fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                          transition : 'all 0.25s',}}>Residential</Text>
                          )
                      }
                      })()}
                  </Typography>}
                  />
                },
             
                { title: 'Warehouse', field: 'warehouseid',
                lookup: { 1: 'US Warehouse', 2: 'Canada Warehouse' },
              },
                
           
                {
                  title: 'Order Status',
                  field: 'orderstatus',
                  
                  render: rowData => <Text>
                             {(() => {
                               if(rowData.orderstatus===5)
                               {
                                 return(
                                  <ColorButtonInTransit  size='large'
                                  variant="contained"
                                  color="primary"
                                  onClick={()=>{
                                    handleClickOpendelete(rowData.internalorderId,rowData) 
                                    }}> In Transit </ColorButtonInTransit>
                                 )
                               }
                               else if(rowData.orderstatus===3)
                               {
                                 return(
                  <ColorButtonProcessed  size='large'
                  variant="contained"
                  color="primary"
                  onClick={()=>{
                    handleClickOpendelete(rowData.internalorderId,rowData) 
                    }}> Processing </ColorButtonProcessed>
                                 )
                               }
                               else if(rowData.orderstatus===6)
                               {
                                 return(
                                  <ColorButtonInDeliverd  size='large'
                                  variant="contained"
                                  color="primary"
                                  onClick={()=>{
                                    handleClickOpendelete(rowData.internalorderId,rowData) 
                                    }}> Delivered </ColorButtonInDeliverd>
                                 )
                               }
                               else if(rowData.orderstatus===4)
                               {
                                 return(
                                  <ColorButtonShipped  size='large'
                                  variant="contained"
                                  color="primary"
                                  onClick={()=>{
                                    handleClickOpendelete(rowData.internalorderId,rowData) 
                                    }}> Shipped </ColorButtonShipped>
                                 )
                               }
                               else if(rowData.orderstatus===7)
                               {
                                 return(
                                  <ColorButtonOnHold  size='large'
                                  variant="contained"
                                  color="primary"
                                  onClick={()=>{
                                    handleClickOpendelete(rowData.internalorderId,rowData) 
                                    }}> On Hold</ColorButtonOnHold>
                                 )
                               }
                               else if(rowData.orderstatus===8)
                               {
                                 return(
                                  <ColorButtonException  size='large'
                                  variant="contained"
                                  color="primary"
                                  onClick={()=>{
                                    handleClickOpendelete(rowData.internalorderId,rowData) 
                                    }}> Exception</ColorButtonException>
                                 )
                               }
                               else if(rowData.orderstatus===9)
                               {
                                 return(
                                  <ColorButtonCancel  size='large'
                                  variant="contained"
                                  color="primary"
                                  onClick={()=>{
                                    handleClickOpendelete(rowData.internalorderId,rowData) 
                                    }}> Cancelled </ColorButtonCancel>
                                 )
                               }
                               else{
                                return(
                                  <ColorButtonNew  size='large'
                                  variant="contained"
                                  color="primary"
                                  onClick={()=>{
                                    handleClickOpendelete(rowData.internalorderId,rowData) 
                                    }}> Return Order </ColorButtonNew>
                                                 )
                               }
                         
                        })()}</Text>,
                },
                // {
                //   title: 'Track Order',
                //   field: 'trackingurl',
                  
                //   render: rowData => <Text>
                            
                //   <ColorButtonProcessed  size='large'
                //   variant="contained"
                //   color="primary"
                //   onClick={()=>{
                //     handleClickTrack(rowData.internalorderId,rowData) 
                //     }}> Track </ColorButtonProcessed>
                //              </Text>,
                // },
                { title: 'Shipping Courier',  field: 'shippingpolicy',
                type: 'text',
                
              },
                {
                  title: 'Tracking',
                  field: 'tracking',
                  type: 'text',
                  render: rowData =><FormControlLabel
                  
                  onClick={()=>{handleChangeCheckbox(rowData.internalorderId)}}
                  className={classes.quantitycss}
                  control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
                  
                  <Text style={{ fontSize: '11px', 
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                  transition : 'all 0.25s',}}>{rowData.tracking}</Text>
                    
                  </Typography>}
                  />
                },
              
                { title: 'Shipping Service', field: 'shipmenttype',type: 'text',
       
      render: rowData => <Text>
      {(() => {
        if(rowData.shipmenttype==='1')
        {
          return(
           <Text style={{ fontSize: '11px', 
           fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
           transition : 'all 0.25s',}}>Standard Shipping</Text>
          )
        }
        else if(rowData.shipmenttype==='2')
        {
          return(
            <Text style={{ fontSize: '11px', 
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            transition : 'all 0.25s',}}>2-Day Shipping</Text>
          )
        }
        else if(rowData.shipmenttype==='3')
        {
          return(
            <Text style={{ fontSize: '11px', 
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            transition : 'all 0.25s',}}>Overnight Shipping</Text>
          )
        }
        else if(rowData.shipmenttype==='4')
        {
          return(
            <Text style={{ fontSize: '11px', 
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            transition : 'all 0.25s',}}>Stamped Postage</Text>
          )
        }
        else if(rowData.shipmenttype==='5')
        {
          return(
            <Text style={{ fontSize: '11px', 
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            transition : 'all 0.25s',}}>Oversize LetterMail</Text>
          )
        }
        else if(rowData.shipmenttype==='6')
        {
          return(
            <Text style={{ fontSize: '11px', 
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            transition : 'all 0.25s',}}>Pallet Freight</Text>
          )
        }
        
  
 })()}</Text>,
    },
                {
                  title: 'Create Date',
                  field: 'orderdate',
                  type: 'date',
                
                },
                {
                  title: 'Shipment Date',
                  field: 'shipdate',
                  type: 'date',
                 
                },
            
               
              ],
             
            });
          };
          var flag =false;
          const handleChangeCheckbox = (data) => {
            setOpenChekced(true);
            console.log("selectidrun");
            console.log("selectid",data);
            console.log("arraylenght",ids.length);
           // setCheckedA(false);
            if(ids.length === 0){
              ids.push(data);
            }else{
              for(let i=0;i<ids.length ;i++){
              if(data !== ids[i]){
                //ids.push(data);
                flag=true;
              }else{
                flag=false;
                break; 
              }
              
              }
              if(flag === true){
                ids.push(data); 
              }else{
                const index =  ids.indexOf(data);
                if (index > -1) {
                  ids.splice(index, 1);
                  if(ids.length === 0){
                    setOpenChekced(false);
                  }
                }
              }
              
            }
            console.log("arraylenghtafter",ids.length);
            const updatedaray=[...ids];
        
            setchangedWarehouseid(updatedaray);
            setCardid(0);
            setState({
              columns: [
                { title: '',
                render: rowData => <FormGroup>
                  {(() => {
                   
                   if(rowData!==undefined){
                     return( 
                <FormControlLabel style={popUpStyle.checkboxPosition}
                  control={<Checkbox 
                    id={rowData.internalorderId}
            
                    checked={
                        (() => {
                          for(let i=0; i<ids.length;i++)
                         
                          {
                            
                          if (rowData.internalorderId  === parseInt(ids[i])){
                            return (
                                true
                              )
                          }
                        
                          }
                         
                          })()}
                    
                    onChange={()=>{handleChangeCheckbox(rowData.internalorderId)}}
                    
                    color="primary"
                   />}
                    className={classes.radioButtonCss}
                    InputProps={{ inputProps: { style: {  borderRadius: 0 }, }, style: { borderRadius: 0 }, }}
                   
                    
                />
                   )
            }
            
            })()}  
               </FormGroup>
                },
                { title: 'ShipHype Id', field: 'internalorderId',type: 'text',
                render: rowData => <Link href="#" onClick={() => handleGetShipmentId(rowData.internalorderId)} variant="body2">
                {rowData.internalorderId} </Link>
                },
                { title: 'Platform Id', field: 'externalorderId', type: 'text',
  render: rowData =><FormControlLabel
        
  onClick={()=>{handleChangeCheckbox(rowData.externalorderId)}}
  className={classes.quantitycss}
  control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
  
  <Text style={{ fontSize: '11px', 
  fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
  transition : 'all 0.25s',}}>{rowData.externalorderId}</Text>
    
  </Typography>}
  />
},
{ title: 'Courier ID',
  field: 'courierid',type: 'text',
  render: rowData => <Link href="#" onClick={() => handleGetShipmentId(rowData.internalorderId)} variant="body2">
  {rowData.courierid} </Link>
},
                { title: 'Order ID',
                field: 'sellerorderid',type: 'text',
                // render: rowData => <Link href="#" onClick={() => handleGetShipmentId(rowData.internalorderId)} variant="body2">
                // {rowData.courierid} </Link>
            },
              {
                title: 'Source',
                field: 'source',
                type: 'text',
                render: rowData =><FormControlLabel
                  
                onClick={()=>{handleChangeCheckbox(rowData.internalorderId)}}
                className={classes.quantitycss}
                control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
                
                <Text style={{ fontSize: '11px', 
                fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                transition : 'all 0.25s',}}>{rowData.source}</Text>
                  
                </Typography>}
                />
              },
            {
              title: 'Order Type',
              field: 'ordertype',
            lookup: { 1: 'Integration', 2: 'Manual',3: 'Subscription Box' },
             
            render: rowData =><FormControlLabel
                  
            onClick={()=>{handleChangeCheckbox(rowData.internalorderId)}}
            className={classes.quantitycss}
            control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
             {(() => {
                         if(rowData.ordertype===1)
                         {
                           return(
            <Text style={{ fontSize: '11px', 
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            transition : 'all 0.25s',}}>Integration</Text>
            )
          }
          else   if(rowData.ordertype===2)
          {
            return(
          <Text style={{ fontSize: '11px', 
          fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
          transition : 'all 0.25s',}}>Manual</Text>
          )
          }
          else
          {
          return(
          <Text style={{ fontSize: '11px', 
          fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
          transition : 'all 0.25s',}}>Subscription Box</Text>
          )
          }
          
          })()}
            </Typography>}
            />
          },
          {
            title: 'Seller Email',
            field: 'userEmail',
            type: 'text',
            render: rowData =><FormControlLabel
                
            onClick={()=>{handleChangeCheckbox(rowData.internalorderId)}}
            className={classes.quantitycss}
            control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
            
            <Text style={{ fontSize: '11px', 
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            transition : 'all 0.25s',}}>{rowData.userEmail}</Text>
              
            </Typography>}
            />
          },
          {
            title: 'Seller Company',
            field: 'company_name',
            type: 'text',
            render: rowData =><FormControlLabel
                
            onClick={()=>{handleChangeCheckbox(rowData.internalorderId)}}
            className={classes.quantitycss}
            control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
            
            <Text style={{ fontSize: '11px', 
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            transition : 'all 0.25s',}}>{rowData.company_name}</Text>
              
            </Typography>}
            />
          },
            {
              title: 'Customer Name',
              field: 'recipientname',
              type: 'text',
              render: rowData =><FormControlLabel
                  
              onClick={()=>{handleChangeCheckbox(rowData.internalorderId)}}
              className={classes.quantitycss}
              control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
              
              <Text style={{ fontSize: '11px', 
              fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
              transition : 'all 0.25s',}}> {rowData.firstname} {rowData.lastname} </Text>
                
              </Typography>}
              />
            },
            { title: 'Order Country', field: 'ordercountry',type: 'text',
            render: rowData =><FormControlLabel
                  
            onClick={()=>{handleChangeCheckbox(rowData.internalorderId)}}
            className={classes.quantitycss}
            control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
            
            <Text style={{ fontSize: '11px', 
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            transition : 'all 0.25s',}}>{rowData.ordercountry}</Text>
              
            </Typography>}
            />,
          },
            {
                  title: 'Customer Type',
                  field: 'customertype',
                  //lookup: { 1: 'Corrugated Box', 2: 'Letter' },
                  lookup: { 1: 'Business', 2: 'Residential' },
                  render: rowData =><FormControlLabel
                  
                  onClick={()=>{handleChangeCheckbox(rowData.internalorderId)}}
                  className={classes.quantitycss}
                  control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
                  
                
                   {(() => {
                    if(rowData.customertype===1)
                    {
                      return(
                        <Text style={{ fontSize: '11px', 
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                        transition : 'all 0.25s',}}>Business</Text>
                        )
                      }
                      else{
                        return(
                          <Text style={{ fontSize: '11px', 
                          fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                          transition : 'all 0.25s',}}>Residential</Text>
                          )
                      }
                      })()}
                  </Typography>}
                  />
                },
             
               
                { title: 'Warehouse', field: 'warehouseid',
    lookup: { 1: 'US Warehouse', 2: 'Canada Warehouse' },
  },
              
                {
                  title: 'Order Status',
                  field: 'orderstatus',
                  
                  render: rowData => <Text>
                             {(() => {
                               if(rowData.orderstatus===5)
                               {
                                 return(
                                  <ColorButtonInTransit  size='large'
                                  variant="contained"
                                  color="primary"
                                  onClick={()=>{
                                    handleClickOpendelete(rowData.internalorderId,rowData) 
                                    }}> In Transit </ColorButtonInTransit>
                                 )
                               }
                               else if(rowData.orderstatus===3)
                               {
                                 return(
                  <ColorButtonProcessed  size='large'
                  variant="contained"
                  color="primary"
                  onClick={()=>{
                    handleClickOpendelete(rowData.internalorderId,rowData) 
                    }}> Processing </ColorButtonProcessed>
                                 )
                               }
                               else if(rowData.orderstatus===6)
                               {
                                 return(
                                  <ColorButtonInDeliverd  size='large'
                                  variant="contained"
                                  color="primary"
                                  onClick={()=>{
                                    handleClickOpendelete(rowData.internalorderId,rowData) 
                                    }}> Delivered </ColorButtonInDeliverd>
                                 )
                               }
                               else if(rowData.orderstatus===4)
                               {
                                 return(
                                  <ColorButtonShipped  size='large'
                                  variant="contained"
                                  color="primary"
                                  onClick={()=>{
                                    handleClickOpendelete(rowData.internalorderId,rowData) 
                                    }}> Shipped </ColorButtonShipped>
                                 )
                               }
                               else if(rowData.orderstatus===7)
                               {
                                 return(
                                  <ColorButtonOnHold  size='large'
                                  variant="contained"
                                  color="primary"
                                  onClick={()=>{
                                    handleClickOpendelete(rowData.internalorderId,rowData) 
                                    }}> On Hold</ColorButtonOnHold>
                                 )
                               }
                               else if(rowData.orderstatus===8)
                               {
                                 return(
                                  <ColorButtonException  size='large'
                                  variant="contained"
                                  color="primary"
                                  onClick={()=>{
                                    handleClickOpendelete(rowData.internalorderId,rowData) 
                                    }}> Exception</ColorButtonException>
                                 )
                               }
                               else if(rowData.orderstatus===9)
                               {
                                 return(
                                  <ColorButtonCancel  size='large'
                                  variant="contained"
                                  color="primary"
                                  onClick={()=>{
                                    handleClickOpendelete(rowData.internalorderId,rowData) 
                                    }}> Cancelled </ColorButtonCancel>
                                 )
                               }
                               else{
                                return(
                                  <ColorButtonNew  size='large'
                                  variant="contained"
                                  color="primary"
                                  onClick={()=>{
                                    handleClickOpendelete(rowData.internalorderId,rowData) 
                                    }}> Return Order </ColorButtonNew>
                                                 )
                               }
                         
                        })()}</Text>,
                },
                // {
                //   title: 'Track Order',
                //   field: 'trackingurl',
                  
                //   render: rowData => <Text>
                            
                //   <ColorButtonProcessed  size='large'
                //   variant="contained"
                //   color="primary"
                //   onClick={()=>{
                //     handleClickTrack(rowData.internalorderId,rowData) 
                //     }}> Track </ColorButtonProcessed>
                //              </Text>,
                // },
                { title: 'Shipping Courier',  field: 'shippingpolicy',
                type: 'text',
             
              },
                {
                  title: 'Tracking',
                  field: 'tracking',
                  type: 'text',
                  render: rowData =><FormControlLabel
                  
                  onClick={()=>{handleChangeCheckbox(rowData.internalorderId)}}
                  className={classes.quantitycss}
                  control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
                  
                  <Text style={{ fontSize: '11px', 
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                  transition : 'all 0.25s',}}>{rowData.tracking}</Text>
                    
                  </Typography>}
                  />
                },
              
                { title: 'Shipping Service', field: 'shipmenttype',type: 'text',
       
                render: rowData => <Text>
                {(() => {
                  if(rowData.shipmenttype==='1')
                  {
                    return(
                     <Text style={{ fontSize: '11px', 
                     fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                     transition : 'all 0.25s',}}>Standard Shipping</Text>
                    )
                  }
                  else if(rowData.shipmenttype==='2')
                  {
                    return(
                      <Text style={{ fontSize: '11px', 
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                      transition : 'all 0.25s',}}>2-Day Shipping</Text>
                    )
                  }
                  else if(rowData.shipmenttype==='3')
                  {
                    return(
                      <Text style={{ fontSize: '11px', 
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                      transition : 'all 0.25s',}}>Overnight Shipping</Text>
                    )
                  }
                  else if(rowData.shipmenttype==='4')
                  {
                    return(
                      <Text style={{ fontSize: '11px', 
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                      transition : 'all 0.25s',}}>Stamped Postage</Text>
                    )
                  }
                  else if(rowData.shipmenttype==='5')
                  {
                    return(
                      <Text style={{ fontSize: '11px', 
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                      transition : 'all 0.25s',}}>Oversize LetterMail</Text>
                    )
                  }
                  else if(rowData.shipmenttype==='6')
                  {
                    return(
                      <Text style={{ fontSize: '11px', 
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                      transition : 'all 0.25s',}}>Pallet Freight</Text>
                    )
                  }
                  
            
           })()}</Text>,
              },
                {
                  title: 'Create Date',
                  field: 'orderdate',
                  type: 'date',
                 
                },
                {
                  title: 'Shipment Date',
                  field: 'shipdate',
                  type: 'date',
                  
                },
            
               
              ],
             
            });
          };

    return (  
        <View className={classes.content}>
       
           
<Grid> {(openDelete === false ? " " :
           <DeleteCard
           rowStatus={rowStatus}
           userid={user_id}
           openDeleteCard={openDelete}
        handleRelease={handleRelease}
           handleDeleteCancle={handleDeleteCancle}
         />)}
         {(openTrackingURL === false ? " " :
           <TrackingURLNotExits
           rowStatus={rowStatus}
           userid={user_id}
           openDeleteCard={openTrackingURL}
        handleRelease={handleRelease}
           handleDeleteCancle={handleDeleteCancle}
         />)}

         {(openDeleter === false ? " " :
           <DeleteCardr
           rowStatus={rowStatus}
           userid={user_id}
           openDeleteCard={openDeleter}
        handleRelease={handleRelease}
           handleDeleteCancle={handleDeleteCancle}
         />)}



{(calculaterate === false ? " " :
          <CalculateRate
           userid={user_id}
           calculaterate={calculaterate}
           rowDataForOrder={rowDataForOrder}
           shippingPolicyName={shippingPolicyName}
           totalCountDangerousGood={totalCountDangerousGood}
           countDangerousGood={countDangerousGood}
          handleConfirmRelease={handleConfirmRelease}
          updateCarrier={updateCarrier}
          handleDeleteCancle={handleDeleteCancle}
          /> )}
         {(openConfirmationRelease === false ? " " :
          <ConfirmationRelease
           userid={user_id}
          openConfirmatioResealse={openConfirmationRelease}
          handleConfirmRelease={handleConfirmRelease}
          handleDeleteCancle={handleDeleteCancle}
          /> )}

         {(openUnReverseInventory === false ? " " :
          <UnReverseInventory
           userid={user_id}
          openUnReverseInventory={openUnReverseInventory}
          handleConfirmDone={handleConfirmDone}
          handleDeleteCancle={handleDeleteCancle}
          /> )}

        {(openExceptionOrder === false ? " " :
          <ExceptionOrder
           userid={user_id}
          openExceptionOrder={openExceptionOrder}
          handleConfirmDone={handleConfirmException}
          handleDeleteCancle={handleDeleteCancle}
          /> )}

             {(openCancelOrder === false ? " " :
          <CancelOrder
           userid={user_id}
          openCancelOrder={openCancelOrder}
          handleConfirmCancel={handleConfirmCancel}
          handleDeleteCancle={handleDeleteCancle}
          /> )}

           {(openMoveOnHoldOrder === false ? " " :
          <MoveOrderHold
           userid={user_id}
          openMoveOnHoldOrder={openMoveOnHoldOrder}
          rowDataForOrder={rowDataForOrder}
          handleConfirmHold={handleConfirmHold}
          carrierId={carrierid}
          handleDeleteCancle={handleDeleteCancle}
          /> )}

            {(openOnHoldOrder === false ? " " :
          <OnHoldOrder
           userid={user_id}
          openOnHoldOrder={openOnHoldOrder}
          orderId={cardid}
          rowStatus={rowStatus}
          handleConfirmHold={handleConfirmHoldOrder}
          handleDeleteCancle={handleDeleteCancle}
          /> )}

{(openManualTrackingOrder === false ? " " :
          <ManualTrackingOrder
           userid={user_id}
           openManualTrackingOrder={openManualTrackingOrder}
          orderId={cardid}
          rowStatus={rowStatus}
          handleConfirmHold={handleManualTracking}
          handleDeleteCancle={handleDeleteCancle}
          /> )}

        {(openCancelOrderSet === false ? " " :
          <OnCanceled
           userid={user_id}
          orderId={cardid}
          rowStatus={rowStatus}
          openCancelOrderSet={openCancelOrderSet}
          handleConfirmHold={handleConfirmCancelSet}
          handleDeleteCancle={handleDeleteCancle}
          /> )}
         </Grid>
           
              <View className={classes.paper9}> 
        <Grid justify="center">
                <ProgressBar 
                 loading={loading}
                />
                </Grid>
            

                <View >
        
                {(openChecked === true ?  <MaterialTable
        title={<Text style={{ fontSize: '13px',
           // fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
            
            transition : 'all 0.25s',}}>Receive Orders</Text> }
        columns={state.columns}
        data={dataproduct}
        icons={tableIcons}
        components={{
          Container: props => <Paper {...props} elevation={0}/>, 
          Toolbar: props => (
            <StyledMTableToolbar {...props} />
          )
        }}
        localization={{
          toolbar: {
              searchPlaceholder: "Search Orders"
          },
          header: {
            actions: "ACTION",
          },
      }}
      
        options={{
            paging:true,
            maxBodyHeight: '55vh',
            doubleHorizontalScroll: true,
            headerStyle: { position: 'sticky', top: 0 },
           pageSize:7,
            pageSizeOptions:[7,10,20,30,40,50,100],
            showTitle: false,
        addRowPosition: 'first',
        actionsColumnIndex: -1,
        exportFileName: "Product Table",
        headerStyle: {
            backgroundColor: '#cccccc',
            color: '#000',
            textTransform: 'uppercase',

            width: 26,
            whiteSpace: 'nowrap',
            textAlign: 'left',
            flexDirection: 'row',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            paddingLeft: 5,
            paddingTop:8,
            paddingBottom:8,
            paddingRight: 0,
            fontSize:'12px',
       //     backgroundColor: theme.palette.primary.table,
           fontWeight: 'bold',
            //color: theme.palette.primary.main,
          },
          cellStyle: {
            backgroundColor: '#fff',
            color: '#000',
            border:'1px solid #cccccc',

            width: 26,
            whiteSpace: 'nowrap',
            textAlign: 'left',
            flexDirection: 'row',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontSize:'12px',
            paddingLeft: 12,
            paddingTop:5,
            paddingBottom:5,
            paddingRight: 0,
          },
          rowStyle: {
            backgroundColor: '#fff',
            color: '#000',
            border:'1px solid #cccccc',

            width: 26,
            whiteSpace: 'nowrap',
            textAlign: 'left',
            flexDirection: 'row',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            paddingLeft: 0,
            paddingTop:0,
            paddingBottom:0,
            paddingRight: 0,
          },
          search: true,
          exportButton: false,
        //   selection: true,
        //   showTextRowsSelected: false,
        //   selectionProps: rowData => ({
           
        //     // checked: rowData.customproductId === changedWarehouseid,
        //      color: 'primary'
          
         
        // })
      }}
      actions={[
        {
          //tooltip: 'Remove All Selected Users',
          icon: () => <ColorButtonAdd
          size='large'
          variant="contained"
          color="primary"
          //startIcon={<AddIcon />}
          >
       Update Selected Orders
        </ColorButtonAdd>,
         isFreeAction: openChecked,
         onClick: (event, rowData) => {
          handleClickOpendelete1();
        },
        },
        {
              icon: () => (
                <ColorButtonRefresh
                  size="large"
                  variant="contained"
                  color="primary"
                  startIcon={<RefreshIcon />}
                >
                  Refresh
                </ColorButtonRefresh>
              ),
              //tooltip: "Refresh",
              isFreeAction: true,
              onClick: (event) => fetchRefersh(),
            },
        // {
        //   icon: () =><RefreshIcon style={{ backgroundColor:'#33cc00',color:'#fff',borderRadius : '3px',margin:'3px',width:30,
        //               height:30}}/>,
        //   //tooltip: 'Refresh',
        //   isFreeAction: true,
        //   onClick: (event) => fetchRefersh()
        // }
      ]}
     
     
        
      /> : <MaterialTable
      title={<Text style={{ fontSize: '13px',
         // fontWeight: '700',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
          color: '#001737',
          
          transition : 'all 0.25s',}}>Receive Orders</Text> }
      columns={state.columns}
      data={dataproduct}
      icons={tableIcons}
      components={{
        Container: props => <Paper {...props} elevation={0}/>, 
        Toolbar: props => (
          <StyledMTableToolbar {...props} />
        )
      }}
      localization={{
        toolbar: {
            searchPlaceholder: "Search Orders"
        },
        header: {
          actions: "ACTION",
        },
    }}
    actions={[
      {
        icon: () =>  <ColorButtonCreateReturn
        size='large'
        variant="contained"
        color="primary"
        //className={classes.profileMargin}
       
        >
       Create Return
      </ColorButtonCreateReturn>,
      //tooltip: 'Create Return',
      isFreeAction: true,
      onClick: (event) => props.opennewOrder()
    },
    {
              icon: () => (
                <ColorButtonRefresh
                  size="large"
                  variant="contained"
                  color="primary"
                  startIcon={<RefreshIcon />}
                >
                  Refresh
                </ColorButtonRefresh>
              ),
              //tooltip: "Refresh",
              isFreeAction: true,
              onClick: (event) => fetchRefersh(),
            },
    //   {
    //     icon: () => <RefreshIcon style={{ backgroundColor:'#33cc00',color:'#fff',borderRadius : '3px',margin:'3px',width:30,
    //                   height:30}}/>,
    //  // tooltip: 'Refresh',
    //   isFreeAction: true,
    //   onClick: (event) => fetchRefersh()
    // }
    ]}
    
      options={{
          paging:true,
          maxBodyHeight: '55vh',
          doubleHorizontalScroll: true,
          headerStyle: { position: 'sticky', top: 0 },
         pageSize:7,
          pageSizeOptions:[7,10,20,30,40,50,100],
          showTitle: false,
      addRowPosition: 'first',
      actionsColumnIndex: -1,
      exportFileName: "Product Table",
      headerStyle: {
          backgroundColor: '#cccccc',
          color: '#000',
          textTransform: 'uppercase',

          width: 26,
          whiteSpace: 'nowrap',
          textAlign: 'left',
          flexDirection: 'row',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          paddingLeft: 5,
          paddingTop:8,
          paddingBottom:8,
          paddingRight: 0,
          fontSize:'12px',
     //     backgroundColor: theme.palette.primary.table,
         fontWeight: 'bold',
          //color: theme.palette.primary.main,
        },
        cellStyle: {
          backgroundColor: '#fff',
          color: '#000',
          border:'1px solid #cccccc',

          width: 26,
          whiteSpace: 'nowrap',
          textAlign: 'left',
          flexDirection: 'row',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          fontSize:'12px',
          paddingLeft: 12,
          paddingTop:5,
          paddingBottom:5,
          paddingRight: 0,
        },
        rowStyle: {
          backgroundColor: '#fff',
          color: '#000',
          border:'1px solid #cccccc',

          width: 26,
          whiteSpace: 'nowrap',
          textAlign: 'left',
          flexDirection: 'row',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          paddingLeft: 0,
          paddingTop:0,
          paddingBottom:0,
          paddingRight: 0,
        },
        search: true,
        exportButton: false,
       // selection: true,
        showTextRowsSelected: false,
      
    }}
   
 
    />
    )}
      
       
  {showToast(open,msg,type)}
        </View>
        </View>
       
        {/* </ScrollView> */}
        </View>
         
    );
  }


