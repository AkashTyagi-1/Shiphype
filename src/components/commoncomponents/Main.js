import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { fade,makeStyles,withStyles } from '@material-ui/core/styles';
import AsyncStorage from "@react-native-community/async-storage";
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import Dashboard from './Dashboard';
import Promotional from './Promotional';
import ImitiateSeller from './ImitiateSeller';
import Dashboard2 from './Dashboard2';
import SelectOrderPromotional from './SelectOrderPromotional';
import SelectOrderCutom from './SelectOrderCustom';
import ImportOrder from './ImportOrder';
import ImportOrderFetchData from './ImportOrderData';
import Order from './Order';
import ReturnOrder from './ReturnOrder';
import SubscriptionBox from './SubscriptionBox';
import OrderSetting from './OrderSetting';
import ShippingLabel from './ShippingLabel';
import SelectMainScreen from "./SelectMainScreen";
import SelectOrderMainScreen from "./SelectOrderMainScreen";
import SendIneventoryShipping from './SendIneventoryShipping';
import SendInventroyLocation from './SendInventroyLocation';
import SendInvenotryShipementPacked from './SendInvenotryShipementPacked';
import SendInventoryPackingType from './SendInventoryPackingType';
import Custom from './Custome';
import Customer from './Customer';
import Product from './Product';
import AddProductManually from './AddProductManually';
import OrderShippingPolicy from './OrderShippingPolicy';
import SelectedOrderDetails from './SelectedOrderDetails';
import SelectedOrderDetailsCanada from './SelectedOrderDetailsCanada';
import SelectedReturnOrderDetails from './SelectedReturnOrderDetails';
import SelectedOrderDetailsForSeller from './SelectedOrderDetailsForSeller';
import ManualOrder from './ManualOrder';
import SelectWarehouseOrder from './SelectWarehouseOrder';
import SelectReturnWarehouseOrder from './SelectReturnWarehouseOrder';
import SelectCarrierTrackingDate from './SelectCarrierTrackingDate';
import SelectReturnProduct from './SelectReturnProduct';
import SelectReturnOrderMainScreen from './SelectReturnOrderMainScreen';
import SelectSeller from './SelectSeller';
import SelectOrderType from './SelectOrderType';
import SelectOrderProduct from './SelectOrderProduct';
import SelectSubscriptionProduct from './SelectSubscriptionProduct';
import SelectCustomerKind from './SelectCustomerofKind';
import SelectShippingType from './SelectShippingType';
import AdditionlOrderOptions from './AdditionalOrderOptions';
import TransactionHistory from './TranscationHistoryTab';
import Help from './help';
import SendInventory from './SendInventory';
import SubscriptionQty from './SubscriptionQty';
import ReceiveProduct from './ReceiveProduct';
import SendInventoryDetails from './SendInventoryDetails';
import SelectProduct from './SelectProduct';
import SelectCustome from './SelectCustome';
import SelectPromotional from './SelectPromotional';
import SelectSubScriptionPromotional from './SelectSubScriptionPromotional';
import SelectSubScriptionCustom from './SelectSubScriptionCustom';
import SelectedReturnOrderDetailsSeller from './SelectedReturnOrderDetailsSeller';
import ArrangeShipping from './ArrangeShipping';
import ArrangeShip from './ArrangeShip';
import ArrangeShip2 from './ArrangeShip2';
import SepacilaRequest from './SpecialRequest';
import Payment from './Payment';
import MarketPlaceIntegration from './MarketPlaceIntegration';
import PaymentMethod from './PaymentMethod';
import PaymentRecieveSetting from './PaymentRecieveSetting';
import AddCredit from "./AddCredit";
import InventoryList from './InventoryList';
import RevieveInventory from './ReceiveInventoryParent';
import TransferInventory from './TransferInventory';
import TransferInventoryCustome from './TransferInventoryCustome';
import TransferInventoryPromotional from './TransferInventoryPromotional';
import Credit from './Credit';
import RevieveOrder from './ReceiveOrderList';
import ReceiveOrderListCanada from './ReceiveOrderListCanada';
import RevieveReturnOrder from './ReceiveReturnOrderlist';
import AffiliateProgram from './AffiliateProgram';
import AllSettings from './AllSettings';
import TransferCredit from './TransferCredit';
import ShowFeedbackToAdmin from './ShowFeedbackToAdmin';
import NotificationSetting from './NotificationSetting';
import Square from './SquareIntegration/Square';
import MarketPlaceIntegrationSetting from './MarketPlaceIntegrationSetting';
import Invoices from './Invoices';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SelectDangrousGoods from './Selectdangerousgoods';
import { Platform,ScrollView,View,Image,Dimensions,Text} from 'react-native';
import logo from '../../assets/logo/small-logo.png';
import dimens from '../../resources/dimens';
import Button from '@material-ui/core/Button';
import SearchIcon from "@material-ui/icons/Search";
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import PowerSettingsNewOutlinedIcon from '@material-ui/icons/PowerSettingsNewOutlined';
import Toast from './feedback/Toast';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import HelpIcon from '@material-ui/icons/Help';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InputBase from '@material-ui/core/InputBase';
import CreateOrChangeWarehouse from './CreateOrChangeWarehouse';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import * as shiphypeService from './ShipService/shiphype_service';
import Tooltip from '@material-ui/core/Tooltip';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import RetuenSetting from './feedback/RetuenSetting';
import MarketPlace from './feedback/MarketPlace';
import ShippingPolicy from './feedback/shippingPolicy';
import CustomerSelection from './feedback/CustomerSelection';
import RequestWorkOrder from './RequestWorkOrder';
import AccountSetting from './AccountSetting';

import * as localStorage from './localstorage/LocalStorage';

import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import SettingsIcon from '@material-ui/icons/Settings';
import ReturnSetting from './feedback/RetuenSetting';
import CustomePromotional from './feedback/CutomePackingPRomotionalInserts';
import CustomePackaging from './feedback/CustomePacking';
import Createcustomeintegration from './feedback/createcustomeintegration';
import ProductImport from './feedback/ProductImport';
import AddCustomerManually from './feedback/AddCustomerManually';
import SelectStore from './feedback/SelectStore';
import ProductSelection from './feedback/OptionSelection';
import SelectCustomerManually from './feedback/ImportCustomer';
import ImportProduct from './feedback/ImportProduct';
import CustomerList from './feedback/CustomerList';
import FutureCustomer from './feedback/FutureCustomer';
import ProductList from './feedback/ProductList';

import CustomerImportAdd from "./feedback/CustomerImportAdd";
import OrderImportCreate from "./feedback/OrderImportCreate";
import AddCustomerDynamic from './AddCustomerDynamic';
import UploadOrderSheet from './Order/UploadOrderSheet';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import popUpStyle from './style/popUpStyle';

import OrderImportCreateForSetUp from "./feedback/OrderImportCreateForSetUp";
import ImportShopfyOrder from './feedback/ImportShopfyOrder';

import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';

import AddShoppingCartOutlinedIcon from '@material-ui/icons/AddShoppingCartOutlined';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import RemoveShoppingCartOutlinedIcon from '@material-ui/icons/RemoveShoppingCartOutlined';
import RecentActorsOutlinedIcon from '@material-ui/icons/RecentActorsOutlined';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import FeedbackIcon from '@material-ui/icons/Feedback';
import LibraryAddCheckOutlinedIcon from '@material-ui/icons/LibraryAddCheckOutlined';
import LibraryAddOutlinedIcon from '@material-ui/icons/LibraryAddOutlined';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import AssignmentReturnOutlinedIcon from '@material-ui/icons/AssignmentReturnOutlined';
import AssignmentReturnIcon from '@material-ui/icons/AssignmentReturn';
import SubscriptionsOutlinedIcon from '@material-ui/icons/SubscriptionsOutlined';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import HomeWorkOutlinedIcon from '@material-ui/icons/HomeWorkOutlined';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import BeenhereOutlinedIcon from '@material-ui/icons/BeenhereOutlined';
import BeenhereIcon from '@material-ui/icons/Beenhere';
import PhoneInTalkOutlinedIcon from '@material-ui/icons/PhoneInTalkOutlined';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import CreditCardOutlinedIcon from '@material-ui/icons/CreditCardOutlined';
import { useNavigation } from '@react-navigation/native';
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';
import StoreMallDirectoryOutlinedIcon from '@material-ui/icons/StoreMallDirectoryOutlined';
import StoreMallDirectoryIcon from '@material-ui/icons/StoreMallDirectory';
import SentFeedbackToAdmin from './dialog/SentFeedbackToAdmin';
const StyledListItemText = withStyles({
  root: {
    width:'14px',
    padding:'0px',
     marginLeft: '15px',
     fontSize:'10px',
     marginTop:'0px',
     marginBottom:'0px'
  },

})(ListItemText);



function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }


  const drawerWidth =220;



  const useStyles = makeStyles(theme => ({
    '@global': {
      '*::-webkit-scrollbar': {
        width: '0.4em'
      },
      '*::-webkit-scrollbar-track': {
        '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
      },
      '*::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,.2)',
        outline: '1px solid slategrey'
      }
    },

    root: {
      display: 'flex',
      overflowY: 'auto',
      overflowX :'auto',
      //backgroundColor:'red'
    },
    toolbar: {
      paddingRight: 15,
      paddingLeft:4.5, // keep right padding when drawer closed
      backgroundColor:'#fff'
    },
    toolbarIcon: {
       display: 'flex',
       alignItems: 'center',
       justifyContent: 'flex-end',
       padding: '0 8px',
       ...theme.mixins.toolbar,
     },
    appBar: {
      backgroundColor:'#00bfbf',
      zIndex: theme.zIndex.drawer + 1,
      elevation: 0,

      borderBottom: '1px solid #cccccc',
shadowOpacity: 0,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    toolbarIcon1: {

      textAlign:'left',

      display: 'contents',
      alignItems: 'flex-end',
      justifyContent: 'center',
      flexDirection: 'row',
      position:'absolute',

      },

//
      toolbarIcon2: {
        marginTop: '15px',
      width:'15px',
    paddingLeft: '0px',
    paddingRight: '0px',
    paddingTop:'0px',
    paddingBottom:'0px',
    marginRight: '10px',
    fontSize:'10px',

        },
        toolbarIcon3: {
          marginTop: '5%',
          width:'15px',
        paddingLeft: '0px',
        paddingRight: '0px',
        paddingTop:'0px',
        paddingBottom:'0px',
        marginRight: '10px',
        fontSize:'10px',

            },

    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      elevation: 0,
shadowOpacity: 0,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      alignItems: 'center',
      justifyContent: 'center',
      color:'grey',
      //borderRight:'1px solid #8c8c8c',
    },
    menuButtonHidden: {
      display: 'none',
    },
    title: {
      flexGrow: 1,
    },
    // drawerPaper: {
    //   position: 'relative',
    //   whiteSpace: 'nowrap',
    //   backgroundColor:'#00bfbf',
    //   width: drawerWidth,
    //   height:'100vh',
    //   transition: theme.transitions.create('width', {
    //   easing: theme.transitions.easing.sharp,
    //   duration: theme.transitions.duration.enteringScreen,
    //   }),
    // },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'wrap',
      backgroundColor:'#fff',
      width: drawerWidth,
      height:'100vh',
      transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      backgroundColor:'#fff',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(8.7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(8.7),
      },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 240,
    },
    root10: {
        display: 'flex',
      },
    paperlogo: {
      marginTop: '0px',
      height:59,
      display: 'flex',
      flexDirection: 'column',
      padding:'1%',
      alignItems: ( Platform.OS === 'android') ? 'center':'left',
    },
    avatarsmall: {
      width: theme.spacing(3.5),
      height: theme.spacing(3.5),
    },
    drawerWithOpen:{
      width:'15%',
    },
    drawerWithClosed:{
      width:'3%',
    },
    sideWithOpen:{
      width:'85%',
    },
    sideWithClosed:{
      width:'97%',
    },

    drawerWithOpen1:{
      width:'65%',
    },
    drawerWithClosed1:{
      width:'14%',
    },
    sideWithOpen1:{
      width:'35%',
    },
    sideWithClosed1:{
      width:'86%',
    },

    drawerWithOpen2:{
      width:'30%',
    },
    drawerWithClosed2:{
      width:'10%',
    },
    sideWithOpen2:{
      width:'70%',
    },
    sideWithClosed2:{
      width:'90%',
    },

    drawerWithOpen4:{
      width:'30%',
    },
    drawerWithClosed4:{
      width:'10%',
    },
    sideWithOpen4:{
      width:'70%',
    },
    sideWithClosed4:{
      width:'90%',
    },



    drawerWithOpen3:{
      width:'17.50%',
    },
    drawerWithClosed3:{
      width:'4.60%',
    },
    sideWithOpen3:{
      width:'83%',
    },
    sideWithClosed3:{
      width:'96%',
    },


    drawerWithOpen6:{
      width:'11.45%',
    },
    drawerWithClosed6:{
      width:'3.60%',
    },
    sideWithOpen6:{
      width:'89%',
    },
    sideWithClosed6:{
      width:'96%',
    },

    drawerWithOpen5:{
      width:'14.45%',
    },
    drawerWithClosed5:{
      width:'4.60%',
    },
    sideWithOpen5:{
      width:'85.50%',
    },
    sideWithClosed5:{
      width:'95.40%',
    },

    dropDownIcon:{
     alignItems:'baseline',   fontSize: '16px',
      fontFamily: 'Neurial Grotesk", Roboto, system, -apple-system, BlinkMacSystemFont, ".SFNSDisplay-Regular", "Helvetica Neue", Helvetica, Arial, sans-serif',

   //  textTransform: 'uppercase',
      color: '#001737',
    },
    search: {
      position: 'relative',
      borderRadius: '0px',
      border:'1px solid #FFFFFF',
       //backgroundColor: ,
      // '&:hover': {
      //   backgroundColor: fade(theme.palette.common.white, 0.25),
      // },
      marginLeft: 0,
      width: '100%',

    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color:'#cccccc'
    },
    inputRoot: {
      color: '#000',
        fontSize: '14px',
        fontFamily: 'Neurial Grotesk", Roboto, system, -apple-system, BlinkMacSystemFont, ".SFNSDisplay-Regular", "Helvetica Neue", Helvetica, Arial, sans-serif',

    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {

        '&:focus': {

        },
      },
    },
    toolbarIconOpen :{
      marginLeft:'4px',marginTop:'4%',alignItems:'baseline',position:'absolute',    fontSize: '12px',
     // fontFamily: 'Neurial Grotesk", Roboto, system, -apple-system, BlinkMacSystemFont, ".SFNSDisplay-Regular", "Helvetica Neue", Helvetica, Arial, sans-serif',

   //  textTransform: 'uppercase',
      color: '#001737',
      '&:hover': {

        color:'#0158d4',
        },
        '&$selected' : {

        color:'#0158d4',
        },
      },
    dropDownIconHover:{
      width:'35px',
      '&:hover': {
        cursor: 'pointer',
        color:'#0158d4',
        },
    },
    dropDownIconHover7:{
      width:'35px',
      '&:hover': {
        cursor: 'pointer',
        color:'#0158d4',
        },
    },
    toolbarIconClose :{
     marginBottom:'2px',alignItems:'baseline',fontSize:500,
   // fontFamily: 'Neurial Grotesk", Roboto, system, -apple-system, BlinkMacSystemFont, ".SFNSDisplay-Regular", "Helvetica Neue", Helvetica, Arial, sans-serif',

      },
      toolbarIconOpen1 :{
        marginLeft:'31px',alignItems:'baseline',position:'absolute',    fontSize: '13px',
        fontWeight: '700',
       // fontFamily: 'Neurial Grotesk", Roboto, system, -apple-system, BlinkMacSystemFont, ".SFNSDisplay-Regular", "Helvetica Neue", Helvetica, Arial, sans-serif',

        textTransform: 'uppercase',
        color: '#001737',

        transition : 'all 0.25s',
        },
        toolbarIconClose1 :{
         marginBottom:'2px',alignItems:'baseline',
      //   fontFamily: 'Neurial Grotesk", Roboto, system, -apple-system, BlinkMacSystemFont, ".SFNSDisplay-Regular", "Helvetica Neue", Helvetica, Arial, sans-serif',

          },
  }));

  const notificationdata=[
    // {
    //   "title":"Shipped Created",
    //   "from":"Walled",
    //   "description":"you are received one more ship",
    //   "createddate":"20-6-2020"
    // },
    // {
    //   "title":"Shipped Updated",
    //   "from":"Raman",
    //   "description":"you have updated one more ship",
    //   "createddate":"20-6-2020"
    // },
    // {
    //   "title":"Shipped Deleted",
    //   "from":"Walled",
    //   "description":"you are deleted one more ship",
    //   "createddate":"20-6-2020"
    // },
    // {
    //   "title":"Shipped Created",
    //   "from":"Wilson",
    //   "description":"you are received one more ship",
    //   "createddate":"20-6-2020"
    // },
    // {
    //   "title":"Shipped Created",
    //   "from":"Walled",
    //   "description":"you are received one more ship",
    //   "createddate":"20-6-2020"
    // },
    // {
    //   "title":"Shipped Created",
    //   "from":"John",
    //   "description":"you are received one more ship",
    //   "createddate":"20-6-2020"
    // },
    // {
    //   "title":"Shipped Created",
    //   "from":"John",
    //   "description":"you are received one more ship",
    //   "createddate":"20-6-2020"
    // },
    // {
    //   "title":"Shipped Created",
    //   "from":"John",
    //   "description":"you are received one more ship",
    //   "createddate":"20-6-2020"
    // },
    // {
    //   "title":"Shipped Created",
    //   "from":"John",
    //   "description":"you are received one more ship",
    //   "createddate":"20-6-2020"
    // },
    // {
    //   "title":"Shipped Created",
    //   "from":"John",
    //   "description":"you are received one more ship",
    //   "createddate":"20-6-2020"
    // },
    // {
    //   "title":"Shipped Created",
    //   "from":"John",
    //   "description":"you are received one more ship",
    //   "createddate":"20-6-2020"
    // }
  ];

  const dashboardMenu = [
    {
       "moduleid": '01',
       "modulename": "Overview"
    },
    {
      "moduleid": "02",
      "modulename": "Orders"
  },
     {
        "moduleid": '14',
        "modulename": "Receive Orders - USA"
    },
    {
      "moduleid": '140',
      "modulename": "Receive Orders - Canada"
  },
    {
        "moduleid": '03',
        "modulename": "Returns"
    },
    {
      "moduleid": '15',
      "modulename": "Receive Returns"
  },
    {
        "moduleid": "04",
        "modulename": "Customers"
    },


 ];

 const ColorButton2 = withStyles(theme => ({
  root: {
    color: '#fff',
    borderRadius : '3px',
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    height:'80%',
    width:'100%',
    marginTop: theme.spacing(2),
     fontSize:'11px',
     fontWeight: '550',
     color:'#fff',
     backgroundColor:'#0168fa',
    '&:hover': {
      backgroundColor: '#002080',

    },
  },
}))(Button);
 const dashboardMenu2 = [
  {
     "moduleid": "01",
     "modulename": "Overview"
  },
  {
      "moduleid": "02",
      "modulename": "Orders"
  },
  {
      "moduleid": "03",
      "modulename": "Returns"
  },
  {
      "moduleid": "04",
      "modulename": "Customers"
  },


];
 const InventoryMenu = [
  {
     "moduleid": "05",
     "modulename": "Products"
  },
  {
      "moduleid": "06",
      "modulename": "Custom Packaging"
  },
  {
      "moduleid": "07",
      "modulename": "Promotional Inserts"
  },
  // {
  //     "moduleid": "08",
  //     "modulename": "Subscription Boxes"
  // },
  {
    "moduleid": "10",
    "modulename": "Receive Inventory"
},
//   {
//     "moduleid": "11",
//     "modulename": "Transfer Inventory"
// },
{
  "moduleid": "12",
  "modulename": "Request Work Order"
},
];
const InventoryMenu2 = [
  {
    "moduleid": "05",
    "modulename": "Products"
 },
 {
     "moduleid": "06",
     "modulename": "Custom Packaging"
 },
 {
     "moduleid": "07",
     "modulename": "Promotional Inserts"
 },
//  {
//      "moduleid": "08",
//      "modulename": "Subscription Boxes"
//  },
 {
     "moduleid": "09",
     "modulename": "Send Inventory"
 },

//  {
//    "moduleid": "11",
//    "modulename": "Transfer Inventory"
// },
{
  "moduleid": "12",
  "modulename": "Request Work Order"
},
];
const OrderMenu = [

  {
      "moduleid": "allsettings",
      "modulename": "Settings"
  },
  {
    "moduleid": "marketplaceSetting",
    "modulename": "Integrations"
},
//   {
//     "moduleid": "billing",
//     "modulename": "Billing"
// },
  {
    "moduleid": "014",
    "modulename": "Help Center"
},
{
  "moduleid": "faqs",
  "modulename": "FAQ"
},
{
  "moduleid": "inst",
  "modulename": "Instructions"
},
{
  "moduleid": "015",
  "modulename": "Affiliate Program"
},
];
const OrderMenu2 = [
  {
    moduleid: "allsettings",
    modulename: "Settings",
  },
  {
    moduleid: "marketplaceSetting",
    modulename: "Integrations",
  },
  {
    moduleid: "billing",
    modulename: "Billing",
  },
  {
    moduleid: "credit",
    modulename: "Credit",
  },
  {
    moduleid: "014",
    modulename: "Help Center",  
  },
  {
    moduleid: "faqs",
    modulename: "FAQ",
  },
  {
    moduleid: "inst",
    modulename: "Instructions"
  },
  {
    moduleid: "015",
    modulename: "Affiliate Program",
  },

];
 function getStepContent() {
  return(
    data.map(data=>{
     switch (data.moduleid) {
       case 0:
        <DashboardOutlinedIcon/>
       case 1:
       <ShoppingCartIcon/>
       case 2:
          <PeopleIcon/>
       default:
         <PeopleIcon/>
     }
    })
  );
}


const BootstrapButton = withStyles({
  root: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: '16px',
    padding: '0px 0px',
   // border: '1px solid',
   marginBottom:'5px',
    lineHeight: 0.5,
    backgroundColor: '#fff',
    borderColor: '#fff',
    fontWeight:'300',
    color:'#808080',
    fontFamily: [
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji',
    ].join(','),
    '&:hover': {
      backgroundColor: '#fff',
      borderColor: '#fff',
      boxShadow: 'none',
      cursor: 'pointer',
        color:'#0158d4',
    },
    '&:active': {
      backgroundColor: '#fff',
      borderColor: '#fff',
      boxShadow: 'none',
      cursor: 'pointer',
        color:'#0158d4',
    },
    '&:focus': {
      backgroundColor: '#fff',
      borderColor: '#fff',
      boxShadow: 'none',
      cursor: 'pointer',
        color:'#0158d4',
    },
  },
})(Button);
const BootstrapButton1= withStyles({
  root: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: '16px',
    padding: '0px 0px',
   // border: '1px solid',
  // marginBottom:'10px',
    lineHeight: 0.5,
    backgroundColor: '#fff',
    borderColor: '#fff',
    fontWeight:'300',
    color:'#808080',
    fontFamily: [
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji',
    ].join(','),
    '&:hover': {
      backgroundColor: '#fff',
      borderColor: '#fff',
      boxShadow: 'none',
      cursor: 'pointer',
        color:'#0158d4',
    },
    '&:active': {
      backgroundColor: '#fff',
      borderColor: '#fff',
      boxShadow: 'none',
      cursor: 'pointer',
        color:'#0158d4',
    },
    '&:focus': {
      backgroundColor: '#fff',
      borderColor: '#fff',
      boxShadow: 'none',
      cursor: 'pointer',
        color:'#0158d4',
    },
  },
})(Button);




function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props}/>;
}
  export default function Main(props) {

   // const navigation = useNavigation();
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [openProfile, setOpenProfile] = React.useState(null);
    const [position,setPosition] = React.useState( props.navigation.getParam('position', '0'));
    const [data , setData] = React.useState([]);
    const[toast,setToast]=React.useState(false);
    const [msg,setMsg]=React.useState('');
    const [type,setType]=React.useState('');
    const [status,setStatus]=React.useState(false);
    const [logoutresponse,setLogoutresponse]=React.useState([]);
   // const password=navigation.getParam('password');
    const [loading,setLoading]=React.useState(false);
    const writePermission=true;

  const [importOrderData, setImportOrderData] = React.useState(null);
  const [importWorderData, setImportWorderData] = React.useState(null);
    const [integrationid, setIntegrationid] = React.useState(null);
    var screenWidth = Dimensions.get('window').width;
    const [selectwarehouse,setSelectwarehouse]=React.useState(0);
    const [packageDataSet,setPAckageData]=React.useState([]);
    const [packageDataSet1,setPAckageData1]=React.useState([]);
    const [promoData,setPAckageProData]=React.useState([]);

    const [shipmentId,setShipmentId]=React.useState(0);
    const [shipmentId1,setShipmentId1]=React.useState(0);
    const [changedWarehouseid, setchangedWarehouseid] = React.useState([]);
    const [changedWarehouseid1, setchangedWarehouseid1] = React.useState([]);
    const [changedWarehouseid2, setchangedWarehouseid2] = React.useState([]);
    const [openPackageTypeID, setPackageTypeID] = React.useState([]);
    const [openPromotionalTypeID, setPromotionalTypeID] = React.useState([]);
    const [openPackageID, setchangePackageID] = React.useState([]);
    const [openPromotionalID, setchangePromotionalID] = React.useState([]);
    const [openPackageTypeID1, setPackageTypeID1] = React.useState([]);
    const [openPackageID1, setchangePackageID1] = React.useState([]);
    const [openPackageTypeID2, setPackageTypeID2] = React.useState([]);
    const [openPackageID2, setchangePackageID2] = React.useState([]);
    const [shippedQuantity,setshippedQuantity]=React.useState([]);
    const [shippedQuantity1,setshippedQuantity1]=React.useState([]);
    const [shippedQuantity2,setshippedQuantity2]=React.useState([]);
    const[requestRelatedTo,setRequestRelatedTo]=React.useState('');
    const [requestDescription,setRequestDescription]=React.useState('');
    const [editCard,setEditCard]=React.useState(null);
    const [editFunction,setEditFunction]=React.useState(0);
    const [dangerousGood,setDangerous]=React.useState(0);
    const [isAdmin,setIsAdmin]=React.useState(false);
    const [imitate,setimitate]=React.useState(false);
    const[userRoleId,setUserRoleId]=React.useState(1);
    const[roleName,setRoleName]=React.useState('');
    //const user_id=navigation.getParam('user_id', '0');
    const userid=parseInt(window.localStorage.userid);
    const [importEbayorderData,setImportEbayorderData]=React.useState(null);
    const [user_id,setUserID] = React.useState('0');
    //Orderdata
    const[orderkind,setOrderkind]=React.useState(0);
    const [inventoryLocation,setInventoryLocation]=React.useState(0);
    const [inventoryPackgingType,setInventoryPackgingType]=React.useState(0);
    const [inventoryShipemntType,setInventoryShipemntType]=React.useState(0);
    const [inventoryLabel,setInventoryLabel]=React.useState(1);
    // returncondiions,tracking,shipFrom,selectedStartDate,carrierId
    
    const[returncondiions,setreturncondiions]=React.useState('');
    const[returntracking,setreturntracking]=React.useState('');
    const[returnfromname,setreturnfromname]=React.useState('');
    const[returnselectedStartDate,setreturnselectedStartDate]=React.useState('');
    const[returncarrierId,setreturncarrierId]=React.useState(0);


    const[orderwarehouseId,setOrderWarehouseId]=React.useState(0);
    const[orderType,setOrderType]=React.useState(0);
    const [customerId,setCustomerId]=React.useState(0);
    const [shippingQunatity, setShippingQunatity] = React.useState([]);
    const [loginUserName,setLoginUserName]=React.useState('');
    const [shipingtype,setShipingtype]=React.useState(0);
    const [shiplabelId,setShipLabelId]=React.useState(0);
    const [shiplabelName,setShipLabelName]=React.useState(0);
    const [shipmentType,setShipemntType]=React.useState(0);
    const [shipmentIdProduct,setShipmentIds]=React.useState(0);
    const [settingId,setSettingId]=React.useState(0);
    const [customerName,setCustomerName]=React.useState('');
    const [selectoption,setSelectoption]=React.useState(0);
    const [internalorderid,setInternalorderid]=React.useState(0);
    const [inetalOrderData,setInetalOrderData]=React.useState([]);
    const [saveback,setSaveback]=React.useState('8');
    const [currentavaliableamount,setCurrentAvaliableTotalAmount] = useState("");
    const [currentunpaidamount,setCurrentUnpaidTotalAmount] = useState("");
    const [code,setCode]=React.useState(props.navigation.getParam('code', '0'));
    const [expiredate,setExpireDate]=React.useState(props.navigation.getParam('expiredate', '0'));
    const [token,setToken]=React.useState('');

    const [fromWarehouseIdInventory,setFromWarehouseIdInventory]=React.useState(0);
    const [toWarehouseIdInventory,setToWarehouseIdInventory]=React.useState(0);
    const [openMarketPlace,setOpenMarketPlace]=React.useState(false);
    const [editCaseOnAddOption,setEditCaseOnAddOption]=React.useState(false);
    const [settingLoad,setSettingLoad]=React.useState(true);
//Edit Order
const [editOrder,setEditOrder]=React.useState(null);
const [editSubscription,setEditSubscription]=React.useState(null);
const [uuserdid,setUUId]=React.useState(parseInt(window.localStorage.userid));
const [shipData, setShipData] = React.useState([]);
const [policyDataId, setPolicyDataId] = React.useState(0);
const [pack23,setpack23]=React.useState({});
    const [pro23,setpro23]=React.useState({});
// var pack23={};
// var pro23={};
//Setup Wizard
const [state1, setState1]=useState({
  vertical: 'top',
  horizontal: 'center',
});
const {vertical,horizontal} = state1;

const [state2, setState2]=useState({
  vertical: 'top',
  horizontal: 'center',
});
const {vertical1,horizontal1} = state2;
const [open1, setOpen1]=React.useState(false);
const [open6, setOpen6]=React.useState(false);

const [usreDtatus, setUserStatus] = React.useState(false);
const [openImportOrder, setOpenImportOrder] = React.useState(false);
const [openOrderList, setOpenOrderList] = React.useState(false);

const [openShipPolicy, setOpenShipPloicy] = React.useState(false);
const [openCarries, setOpenCarries] = React.useState(false);
const [openSprint, setOpenMarketPlace1] = React.useState(false);
const [openNextReturn, setOpenNextReturn] = React.useState(false);
const [now , setNow] =React.useState(2);
const [textValue , setTextValue] =React.useState(1);
const [openReturn, setOpenReturn] = React.useState(false);
const [openImportProduct, setOpenImportProduct] = React.useState(false);
const [openProductList, setOpenProductList] = React.useState(false);
const [openReturn2, setOpenReturnPreFilled] = React.useState(false);
const [openCustomePromotional, setOpenCustomePromotional] = React.useState(false);
const [openProductImport, setOpenProductImport] = React.useState(false);
const [openCustomePackaging, setOpenCustomePackaging] = React.useState(false);
const [openProductSelection, setOpenProductSelection] = React.useState(false);
const [openSelectStore, setOpenSelectStore] = React.useState(false);
const [openCustomerSelection, setOpenCustomerSelection] = React.useState(false);
const [openCreateCustomeIntegration, setOpenCreateCustomeIntegration] = React.useState(false);
const [openSelectCustomer, setOpenSelectCustomer] = React.useState(false);
const [openCustomerList, setOpenCustomerList] = React.useState(false);
const [openFutureCustomer, setOpenFutureCustomer] = React.useState(false);
const [openAddCustomerManually, setOpenAddCustomerManually] = React.useState(false);
const [openPageExits, setPageExits] = React.useState(0);
const [stepdonedata,setStepdonedata]=React.useState([]);
const [marketdone,setMarketdone]=React.useState(false);

const[promotionalPackage,setPromotionalPackage]=React.useState([]);
const[customePackage,setCustomePackage]=React.useState([]);
const[customePackageFirstId,setCustomePackageFirstId]=React.useState(0);
const[packageDataPro,setPackageDataPro]=React.useState([]);

const [importData, setImportData] = React.useState(null);
const [importCustData, setImportCustData] = React.useState(null);
const [selectintegration, setSelectintegration] = React.useState(0);
const [packaging, setPackaging] = React.useState(61);
const [transactionHeader,setTransactionHeader]=React.useState("Header");
const [promotionalQuantity,setPromotionalQuantity]=React.useState(0);
const [opencustomerimportadd, setOpencustomerimportadd] = React.useState(
  false
);
const [openorderimportcreate, setOpenorderimportcreate] = React.useState(
  false
);
const [importEbayData,setImportEbayData]=React.useState(null);
const [customerCountry,setCustomerCountry]=React.useState('');
const [packagingQuantity,setPackagingQuantity]=React.useState(0);

const [importDataShopifyData, setImportDataShopifyData] = React.useState(null);
const [importDataShopifyData1, setImportDataShopifyData1] = React.useState(null);
const [importDataShopifyDataId, setImportDataShopifyDataId] = React.useState(0);
const [totalAmount, setTotalAmount] = React.useState(0);
const [unpaid, setUnpaid] = React.useState(0);
const [openFeedback,setOpenFeedback]=React.useState(false);



const openFeedbackPopup=(pop)=>{
setOpenFeedback(true);
pop.close();
}
const openFeedbackScreen=(pop)=>{
  handleSideNext('showfeedback');
  pop.close();
  }


const closeFeedback=()=>{
  setOpenFeedback(false);
}


const fetchSellerUnpaid = (userid)=>{
  shiphypeService.sellerPaymentdetails(userid)
  .then(response => {
   console.log("status",response.status);
        if(response.status === true) {
          setLoading(false);
          setTotalAmount(response.data.totalamount);
          setUnpaid(response.data.unpaid);
          console.log("packingdata",response.data);
                   }else{
                    setLoading(false);
                    setTotalAmount(0);
          setUnpaid(0);
                    console.log("message",response.message);
                   }
      }).catch((error) =>{
            console.error(error);
      });
}

 const fetchPackingList1 = (userid)=>{
  shiphypeService.fetchCustomePaching(userid,1)
  .then(response => {
   console.log("status",response.status);
        if(response.status === true) {
          setLoading(false);
          setPackageDataPro(response.data);
          if(response.data.length !== 0){
            setPackaging(response.data[0].packaggingId);
          }
          console.log("packingdata",response.data);
                   }else{
                    setLoading(false);
                    console.log("message",response.message);
                   }
      }).catch((error) =>{
            console.error(error);
      });
}

const packageDataPro1 = {};
packageDataPro.map(orderCouierOp => {
    const { packaggingId, packaggingName } = orderCouierOp;
    packageDataPro1[ packaggingId ] = packaggingName
})

const handleSprintCancel =(isSprintCreate)=>{


 // setEditSprint(null);
  setOpenMarketPlace1(false);
  setOpenNextReturn(false);
  setOpenShipPloicy(false);
  setOpenCarries(false);
  setOpenReturn(false);
  setOpenReturnPreFilled(false);
  setOpenCustomePromotional(false);
  setOpenCustomePackaging(false);
  setOpenProductImport(false);
  setOpenImportProduct(false);
  setOpenProductList(false);
  setOpenProductSelection(false);
  setOpenSelectStore(false);
  setOpenCreateCustomeIntegration(false);
  setOpenSelectCustomer(false);
  setOpenCustomerSelection(false);
  setOpenAddCustomerManually(false);
  setOpenCustomerList(false);
  setOpenFutureCustomer(false);
  setOpencustomerimportadd(false);
  setOpenorderimportcreate(false);
  setOpenOrderList(false);
  setOpenImportOrder(false);
}
const updateDataOrder=(data,integrationid)=>{

  if(integrationid === 4){
    setIntegrationid(integrationid);
    setImportOrderData(data);
    setImportWorderData(null);
    setImportEbayorderData(null);
  }else if(integrationid === 3){
    setIntegrationid(integrationid);
    setImportWorderData(data);
    setImportOrderData(null);
    setImportEbayorderData(null);
  }else if(integrationid === 1){
    setIntegrationid(integrationid);
    setImportWorderData(null);
    setImportOrderData(null);
    setImportEbayorderData(data);
  }

}
const handleStepPage =(isSprintCreate)=>{

if(isSprintCreate===1)
{
//setEditSprint(null);
setOpenMarketPlace1(true);
setOpenNextReturn(false);
setOpenShipPloicy(false);
setOpenCarries(false);
setOpenReturn(false);
setOpenReturnPreFilled(false);
setOpenCustomePromotional(false);
setOpenCustomePackaging(false);
setOpenProductImport(false);
setOpenImportProduct(false);
setOpenProductList(false);
setOpenProductSelection(false);
setOpenSelectStore(false);
setOpenCustomerSelection(false);
setOpenCreateCustomeIntegration(false);
setOpenSelectCustomer(false);
setOpenCustomerSelection(false);
setOpenAddCustomerManually(false);
setOpenCustomerList(false);
setOpenFutureCustomer(false);
setOpenOrderList(false);
setOpenImportOrder(false);
}
else if(isSprintCreate===2)
{
//setEditSprint(null);
setOpenMarketPlace1(false);
setOpenNextReturn(false);
setOpenShipPloicy(true);
setOpenCarries(false);
setOpenReturn(false);
setOpenReturnPreFilled(false);
setOpenCustomePromotional(false);
setOpenCustomePackaging(false);
setOpenProductImport(false);
setOpenImportProduct(false);
setOpenProductList(false);
setOpenProductSelection(false);
setOpenSelectStore(false);
setOpenCustomerSelection(false);
setOpenCreateCustomeIntegration(false);
setOpenSelectCustomer(false);
setOpenCustomerSelection(false);
setOpenAddCustomerManually(false);
setOpenCustomerList(false);
setOpenFutureCustomer(false);
setOpenOrderList(false);
setOpenImportOrder(false);
}
else if(isSprintCreate===3)
{
//setEditSprint(null);
setOpenMarketPlace1(false);
setOpenNextReturn(false);
setOpenShipPloicy(false);
setOpenCarries(false);
setOpenReturn(true);
setOpenReturnPreFilled(false);
setOpenCustomePromotional(false);
setOpenCustomePackaging(false);
setOpenProductImport(false);
setOpenImportProduct(false);
setOpenProductList(false);
setOpenProductSelection(false);
setOpenSelectStore(false);
setOpenCustomerSelection(false);
setOpenCreateCustomeIntegration(false);
setOpenSelectCustomer(false);
setOpenCustomerSelection(false);
setOpenAddCustomerManually(false);
setOpenCustomerList(false);
setOpenFutureCustomer(false);
setOpenOrderList(false);
setOpenImportOrder(false);
}
else if(isSprintCreate===4)
{
// setEditSprint(null);
setOpenMarketPlace1(false);
setOpenNextReturn(false);
setOpenShipPloicy(false);
setOpenCarries(false);
setOpenReturn(false);
setOpenReturnPreFilled(false);
setOpenCustomePromotional(false);
setOpenCustomePackaging(false);
setOpenProductImport(false);
setOpenImportProduct(false);
setOpenProductList(false);
setOpenProductSelection(true);
setOpenSelectStore(false);
setOpenCustomerSelection(false);
setOpenCreateCustomeIntegration(false);
setOpenSelectCustomer(false);
setOpenCustomerSelection(false);
setOpenAddCustomerManually(false);
setOpenCustomerList(false);
setOpenFutureCustomer(false);
setOpenOrderList(false);
setOpenImportOrder(false);
}
else if(isSprintCreate===5)
{
// setEditSprint(null);
setOpenMarketPlace1(false);
setOpenNextReturn(false);
setOpenShipPloicy(false);
setOpenCarries(false);
setOpenReturn(false);
setOpenReturnPreFilled(false);
setOpenCustomePromotional(false);
setOpenCustomePackaging(false);
setOpenProductImport(false);
setOpenImportProduct(false);
setOpenProductList(false);
setOpenProductSelection(false);
setOpenSelectStore(false);
setOpenCustomerSelection(true);
setOpenCreateCustomeIntegration(false);
setOpenSelectCustomer(false);
setOpenAddCustomerManually(false);
setOpenCustomerList(false);
setOpenFutureCustomer(false);
setOpenOrderList(false);
setOpenImportOrder(false);
}
else if(isSprintCreate===6)
         {
        //  setEditSprint(null);
          setOpenMarketPlace(false);
          setOpenNextReturn(false);
          setOpenShipPloicy(false);
          setOpenCarries(false);
          setOpenReturn(false);
          setOpenReturnPreFilled(false);
          setOpenCustomePromotional(false);
          setOpenCustomePackaging(false);
          setOpenProductImport(false);
          setOpenImportProduct(false);
          setOpenProductList(false);
          setOpenProductSelection(false);
          setOpenSelectStore(false);
          setOpenCustomerSelection(false);
          setOpenCreateCustomeIntegration(false);
          setOpenSelectCustomer(false);
          setOpenAddCustomerManually(false);
          setOpenCustomerList(false);
          setOpenFutureCustomer(false);
          setOpenOrderList(false);
          setOpenImportOrder(true);
         }
else{
// setEditSprint(null);
setOpenMarketPlace1(false);
setOpenNextReturn(false);
setOpenShipPloicy(false);
setOpenCarries(false);
setOpenReturn(false);
setOpenReturnPreFilled(false);
setOpenCustomePromotional(false);
setOpenCustomePackaging(false);
setOpenProductImport(false);
setOpenImportProduct(false);
setOpenProductList(false);
setOpenProductSelection(false);
setOpenSelectStore(false);
setOpenCustomerSelection(false);
setOpenCreateCustomeIntegration(false);
setOpenSelectCustomer(false);
setOpenCustomerSelection(false);
setOpenAddCustomerManually(false);
setOpenCustomerList(false);
setOpenFutureCustomer(false);
}

}

const setShipementIdModule=(shipemnt)=>{
     setShipmentId(shipemnt);

}
const shipementId=(shipemnt)=>{
setShipmentId(shipemnt);

}


const refreshUnpaid=(uid)=>{
  //fetchSellerUnpaid(uid);
  fetchCurrentTotalamount(uid);
}

/**
* Description;To do cancel Sprint poup screen
*/
const handlePrevious =(isSprintCreate)=>{
if(isSprintCreate === 1){

  setOpenNextReturn(false);
  setOpenMarketPlace1(true);
  setOpenShipPloicy(false);

}  else if (isSprintCreate === 27) {

  setOpenCustomerSelection(false);
  setOpenCustomerList(false);
  setOpenOrderList(false);
  setOpenFutureCustomer(false);
  setOpenImportOrder(true);
}
else if(isSprintCreate === 2){

  setOpenNextReturn(true);
  setOpenShipPloicy(false);

}
else if(isSprintCreate === 3){
  setOpenShipPloicy(true);
  setOpenCarries(false);
}
else if(isSprintCreate === 4){
 // setOpenCarries(true);
  setOpenShipPloicy(true);
  setOpenReturn(false);

}
else if(isSprintCreate === 5){
  setOpenReturn(true);
  setOpenReturnPreFilled(false);
  setOpenMarketPlace1(false);
  setOpenCustomePromotional(false);

}
else if(isSprintCreate === 6){
  setOpenReturn(true);
    setOpenReturnPreFilled(false);
  setOpenCustomePromotional(false);



}
else if(isSprintCreate === 7){

    setOpenCustomePromotional(true);
    setOpenCustomePackaging(false);


}
else if(isSprintCreate === 8){
  if(openPageExits!==0  && openPageExits!==5)
  {
    handleNext2(openPageExits);
    setPageExits(0);
  }
  else{
    setOpenCustomePackaging(true);
    setOpenProductSelection(false);
  }


}
else if(isSprintCreate === 9){
  fetchPackageForPromotional();
  fetchPackingList();
  setOpenProductSelection(true);
  setOpenSelectStore(false);
  setOpenProductList(false);
  setOpenImportProduct(false);

}
else if(isSprintCreate === 10){
  setOpenSelectStore(true);
  setOpenProductImport(false);

}
else if(isSprintCreate === 11){
  setOpenProductImport(true);
  setOpenImportProduct(false);

}
else if(isSprintCreate === 12){
  if(openPageExits!==0 && openPageExits!==5 && openPageExits!==7)
  {
    handleNext2(openPageExits);
    setPageExits(0);
  }
  else{

    setOpenImportProduct(true);
  setOpenProductList(false);
   }



}
else if(isSprintCreate === 13){
  fetchPackingList();
  setOpenProductList(true);
  setOpenCustomerSelection(false);

}
else if(isSprintCreate === 14){
 // setOpenProductList(true);
  setOpenCustomerSelection(true);
  setOpenProductSelection(false);
  setOpenAddCustomerManually(false);
  setOpenSelectCustomer(false);
}
else if(isSprintCreate === 17){
  // setOpenProductList(true);
//    setOpenCustomerSelection(false);
if(openPageExits!==11 && openPageExits!==0 && openPageExits!==5 && openPageExits!==7)
  {
    handleNext2(openPageExits);
    setPageExits(0);
  }
  else{
    setOpenCustomerList(false);
    setOpenSelectCustomer(true);
   }

 }

else if(isSprintCreate === 18){
  // setOpenProductList(true);
  // setOpenCustomerSelection(true);
  setOpenCustomerList(false);
   setOpenAddCustomerManually(true);
 }
 else if(isSprintCreate === 20){
  // setOpenProductList(true);
  // setOpenCustomerSelection(true);
  setOpenCustomerList(true);  setOpenFutureCustomer(false);
 }

else if(isSprintCreate === 15){
  // setOpenProductList(true);
  setOpenCreateCustomeIntegration(true);

 }else{
  setOpenProductList(false);
  setOpenImportProduct(false);
  setOpenReturnPreFilled(false);
  setOpenReturn(false);
  setOpenCarries(false);
  setOpenShipPloicy(false);
  setOpenNextReturn(false);
  setOpenMarketPlace1(true);
}

}
const promotionalData = {};
const fetchPackageForPromotional = () => {
  //setLoading(true);
  shiphypeService.fetchCustomePaching(userid,2)
        .then(response => {
         console.log("status",response.status);
              if(response.status === true) {
              //  setLoading(false);
             // setPromotionalPackage(response.data);
             var varPro=response.data;
           
             varPro.map(orderCouierOp => {
    const { packaggingId, packaggingName } = orderCouierOp;
    promotionalData[ packaggingId ] = packaggingName
})

                         }else{
                          setLoading(false);
                          console.log("message",response.message);
                         }
            }).catch((error) =>{
                  console.error(error);
            });
};

//const promotionalData = {};
// promotionalPackage.map(orderCouierOp => {
//     const { packaggingId, packaggingName } = orderCouierOp;
//     promotionalData[ packaggingId ] = packaggingName
// })



React.useEffect(() => {
  // setimitate
  AsyncStorage.multiGet(["imitate"]).then((data) => {
    if (data[0][1] != null) {
      var ProductSelect1 = JSON.parse(data[0][1]);
      if(ProductSelect1===true)
      {
        setimitate(true);
      }
     
      console.log("useridget", ProductSelect1);
    }
    
  });
  if(Object.keys(promotionalData).length === 0)
  {
    fetchPackageForPromotional();
  }
  if(Object.keys(packageDataPro1).length === 0)
  {
  fetchPackingList1(userid);
  }
  // if(Object.keys(policyData).length === 0)
  // {
    fetchShipPolicy();
  // }

  fetchSellerUnpaid(userid);

  // AsyncStorage.multiGet(["token"]).then((data) => {
  //   if (data[0][1] != null) {
  //     var ProductSelect1 = JSON.parse(data[0][1]);
  //     setToast(true);
  //     setType('success');
  //     setMsg("Integration Successfully");
  //     setStatus(false);
  //     AsyncStorage.removeItem("token");
  //     console.log("useridget", ProductSelect1);
  //   }else{
      
  //   }
  // });
}, []);
// var policyDataId=0;
const fetchShipPolicy = () => {
  setLoading(true);
  shiphypeService
    .fetchShipPolicyOrder(userid, 1)
    .then((response) => {
      console.log("status", response.status);
      if (response.status === true) {
        setLoading(false);
        if(response.data.length===0)
        {
          setPolicyDataId(0);
        }
        else{
          setPolicyDataId(response.data[0].integrationId);
        }
       
       // setShippingPolicyStatus(true);
        setShipData(response.data);

      } else {
        setLoading(false);
        console.log("message", response.message);
      }
    })
    .catch((error) => {
      console.error(error);
      setLoading(false);
    });
};


const policyData = {};
shipData.map(plociyData => {
    const { integrationId, integrationName } = plociyData;
    policyData[ integrationId ] = integrationName
})

const fetchPackingList = () => {
  //const userid=14;
  //setLoading(true);
  shiphypeService
    .fetchCustomePaching(userid, 1)
    .then((response) => {
      console.log("status", response.status);
      if (response.status === true) {
       // setLoading(false);
        setCustomePackage(response.data);
        setCustomePackageFirstId(response.data[0].packaggingId);
        // response.data.forEach(
        //   (element) =>
        //     (column1FilterList[element.packaggingId] = element.packaggingName)
        // );

        console.log("packingdata", response.data);
      } else {
        setLoading(false);
        console.log("message", response.message);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};



const packageData = {};
customePackage.map(orderCouierOp => {
    const { packaggingId, packaggingName } = orderCouierOp;
    packageData[ packaggingId ] = packaggingName
})



const handleNext1 =(isSprintCreate,pageExits)=>{

//fetchShiphypeCompleteStep();
//  fetchShiphypeCompleteStep1();

 if(isSprintCreate === 6){
  setOpenReturnPreFilled(true);
  setOpenReturn(false);


}
else if(isSprintCreate === 8){
  setOpenCustomePackaging(true);
  setOpenCustomePromotional(false);
  setOpenCustomePackaging(false);
  setPageExits(pageExits);
}
else if(isSprintCreate === 9){
  fetchPackageForPromotional();
  fetchPackingList();
  setOpenProductSelection(true);
  setOpenCustomePackaging(false);
  setOpenCustomePromotional(false);
  setPageExits(pageExits);
}
else if(isSprintCreate === 13){
  setOpenProductList(true);
  setOpenProductImport(false);
//  setOpenReturn(false);
fetchPackingList();
  setPageExits(pageExits);
}
else if(isSprintCreate === 12){

  setOpenImportProduct(true);
  setOpenProductSelection(false);
//  setOpenReturn(false);
  setPageExits(pageExits);
}
else if(isSprintCreate === 7){
  setOpenCustomePromotional(true);
  setOpenReturnPreFilled(false);
  setOpenReturn(false);
  setPageExits(pageExits);
}
else if(isSprintCreate === 23){
  setOpenSelectCustomer(false);
  setOpencustomerimportadd(true);

}
else if(isSprintCreate === 20){
  // setOpenProductList(true);
  // setOpenCustomerSelection(true);
  setOpenCustomerList(true);
  setOpenSelectCustomer(false);
   setOpenAddCustomerManually(false);
   setPageExits(pageExits);
 }

}
/**
* Description;To do cancel Sprint poup screen
*/
const handleNext2 =(isSprintCreate)=>{

//fetchShiphypeCompleteStep();
// fetchShiphypeCompleteStep1();


if(isSprintCreate === 2){

  setOpenNextReturn(true);
  setOpenMarketPlace1(false);

}
else if(isSprintCreate === 3){
  setOpenShipPloicy(true);
  setOpenNextReturn(false);
  setOpenMarketPlace1(false);


}
else if(isSprintCreate === 4){
  setOpenCarries(true);
  setOpenShipPloicy(false);
  setOpenMarketPlace1(false);

}
else if(isSprintCreate === 5){
  setOpenReturn(true);
  setOpenCarries(false);
  setOpenShipPloicy(false);
  setOpenMarketPlace1(false);
  setOpenCustomePromotional(false);

}
else if(isSprintCreate === 6){
  setOpenReturnPreFilled(true);
  setOpenReturn(false);

}
else if(isSprintCreate === 7){
  setOpenCustomePromotional(true);
  setOpenReturnPreFilled(false);
  setOpenCustomePackaging(false);
  setOpenProductSelection(false);
  setOpenReturn(false);
}
else if(isSprintCreate === 8){
  setOpenCustomePackaging(true);
  setOpenCustomePromotional(false);
}
else if(isSprintCreate === 9){
  fetchPackageForPromotional();
  fetchPackingList();
  setOpenProductSelection(true);
  setOpenCustomePackaging(false);
  setOpenCustomePromotional(false);
}
else if(isSprintCreate === 10){
  setOpenSelectStore(true);
  setOpenProductSelection(false);
}
else if(isSprintCreate === 11){
  setOpenProductImport(true);
  setOpenSelectStore(false);
  setOpenProductList(false);
}
else if(isSprintCreate === 12){

  setOpenImportProduct(true);

  setOpenProductSelection(false);
  setOpenProductImport(false);
}
else if(isSprintCreate === 13){
  setOpenProductList(true);
  fetchPackingList();
  setOpenImportProduct(false);
}
else if(isSprintCreate === 14){
  setOpenProductList(false);
  setOpenProductSelection(false);
  setOpenCustomerSelection(true);
}
else if(isSprintCreate === 15){
//  setOpenProductList(false);
setOpenMarketPlace1(false);
  setOpenCreateCustomeIntegration(true);
}
else if(isSprintCreate === 16){
  //  setOpenProductList(false);
  setOpenMarketPlace1(true);
  setOpenCreateCustomeIntegration(false);
  }
  else if(isSprintCreate === 17){
    //  setOpenProductList(false);
    setOpenSelectCustomer(true);
    setOpenCustomerSelection(false);
    setOpenCustomerList(false);
    }
  else if(isSprintCreate === 18){
    //  setOpenProductList(false);

    setOpenAddCustomerManually(true);
    setOpenCustomerSelection(false);
    setOpenCustomerList(false);
    }
    else if(isSprintCreate === 20){
      // setOpenProductList(true);
      // setOpenCustomerSelection(true);
      setOpenCustomerList(true);
      setOpenSelectCustomer(false);
      setOpencustomerimportadd(false);
       setOpenAddCustomerManually(false);
     }
     else if (isSprintCreate === 27) {

      setOpenCustomerSelection(false);
      setOpenCustomerList(false);
      setOpenOrderList(false);
      setOpenFutureCustomer(false);
      setOpenImportOrder(true);
    }
    else if (isSprintCreate === 21) {

      setOpenImportOrder(false);
      setOpenOrderList(false);
      setOpenCustomerSelection(false);
      setOpenCustomerList(false);
      setOpenFutureCustomer(true);
    }
     else if(isSprintCreate === 22){
      // setOpenProductList(true);
      // setOpenCustomerSelection(true);
      setOpenFutureCustomer(false);
      setOpen1(true);
     // props.handleNextPage(1);
     }
     else if(isSprintCreate === 23){
      setOpenSelectCustomer(false);
      setOpencustomerimportadd(true);

    }
     else{
      setOpenSelectCustomer(false);
      setOpenCustomerSelection(false);
      setOpenAddCustomerManually(false);
      setOpenCustomerList(false);
  setOpenMarketPlace1(false);
  setOpenCreateCustomeIntegration(false);
}

}
const handleCancleImport = (isimport) => {
  if(isimport){
  // setValue(1);
   setOpenOrderList(true);
   setOpenImportOrder(false);
  }else{
  // setValue(0);
   setOpenOrderList(false);
   setOpenImportOrder(false);
  }
};

const handleClose3 = () => {
  setOpen1(false);
 // handleNextPage(22);
};
const handleClose6 = () => {
  setOpen6(false);
 // handleNextPage(22);
};
const handleClickOpen = () => {

 //setOpenCarries(true);
   setOpenMarketPlace1(true);
  console.log("click button");
};


    console.log(screenWidth);
   // console.log("user_id",user_id);
    const handleDrawerOpen = () => {
      setOpen(true);
    };
    const handleDrawerClose = () => {
      setOpen(false);
    };

    // const accountSettingOpen=()=>{
    //   setPosition('1');
    // }
    const accountSettingOpen=()=>{
      //setPosition('accountsetting');
      handleSideNext('accountsetting');
    }
    const accountSettingOpen1=(pop)=>{
      handleSideNext('accountsetting');
      pop.close();
    }
     const helpFormOpen=()=>{
      //setPosition('014');
      handleSideNext('014');
    }

	const openTransferCredit=()=>{
  handleSideNext('transfer_credit');
}
const handleOrderPage =()=>{

  setOpenMarketPlace(false);
  handleSideNext('02');
   }

    const setAllOpenSettingTab=()=>{
      // setPosition('allsettings');
      handleSideNext('allsettings');
    }
    const setAllOpenSettingTab1=()=>{
      // setPosition('allsettings');
      handleSideNext('allsettings');
     // pop.close();
    }

    const openMarketPlacePoupu=()=>{
      // setOpenMarketPlace(true);
      // if(position === 0){
      //   setPosition(0);
      // }else{
      //   setPosition(0);
      // }
      handleSideNext('909');
    }
    const openMarketPlacePoupu1=(pop)=>{
      // setOpenMarketPlace(true);
      // if(position === 0){
      //   setPosition(0);
      // }else{
      //   setPosition(0);
      // }
      handleSideNext('909');
      pop.close();
    }


const  billingSettingOpen1=(pop)=>{
  handleSideNext('billing');
  pop.close();

}
const  setopenImitiate=(pop)=>{
  handleSideNext('imititate');
  pop.close();

}
const  billingSettingOpeninvoice=(pop)=>{
  handleSideNext('invoice');
  pop.close();

}

const  billingSettingOpen=()=>{
  handleSideNext('billing');
 // pop.close();
}



useEffect(() => {
  // setIsAdmin(props.isAdmin);
  // setLoginUserName(props.loginUserName);
  // setCode(props.code);
  // setNow(props.now);
  // setUserRoleId(props.userRoleId);
  // setUserID(props.user_id);
  // localStorage.storeData("imitate", false);
          
  // window.sessionStorage.setItem("imitate", false);
  // AsyncStorage.setItem(
  //   "imitate",
  //   JSON.stringify(false)
  // );

  if(props.pageLoad===true)
  {
    setIsAdmin(props.isAdmin);
    setLoginUserName(props.loginUserName);
   // setCode(props.code);
    setNow(props.now);
    setUserRoleId(props.userRoleId);
    setUserID(props.user_id);

    localStorage.storeData("userName",props.loginUserName);
    window.sessionStorage.setItem("userName",props.loginUserName);

// localStorage.storeData("code",props.code);
// window.sessionStorage.setItem("code", props.code);

localStorage.storeData("setnow",props.now);
window.sessionStorage.setItem("setnow",props.now);

localStorage.storeData("roleId",props.userRoleId);
window.sessionStorage.setItem("roleId",props.userRoleId);

localStorage.storeData("isadmin",props.isAdmin);
window.sessionStorage.setItem("isadmin", props.isAdmin);
props.navigation.navigate('Overview',{position:'01'});
  }
  else{
    if(window.localStorage.userName===undefined)
    {
      window.open('https://shiphype.com/', '_self');
    }
   else{
    if(window.localStorage.isadmin==='false')
    {
      setIsAdmin(false);
    }
    else{
      setIsAdmin(true);
    }





    setLoginUserName(window.localStorage.userName);
   // setCode('0');
    setNow(window.localStorage.setnow);
    setUserRoleId(parseInt(window.localStorage.roleId));
    setUserID(window.localStorage.userid);
   }

  //  setPosition('01');
  }

    } ,[]);


    /**
     * Description:To do set index for open project managemnt
     * @param {*} index
     */
    const openProjectManagementScreen = (index) => {
      setPosition(index);
     };

/**
 * Description:To do call module api
 */
useEffect(() => {
//fetchUserInfo();
  //getURLValue();
fetchCurrentTotalamount(userid);
  } ,[]);


  const  getURLValue=()=>{
    var vars = [];
    const windowUrl = window.location.search;
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
        //setUserID(vars.id);
        setCode(vars.code);

          ebaygetTokenapi(vars.code,1,window.localStorage.userid);

          console.log("uuuuid", window.localStorage.userid);

    });

  }

  const ebaygetTokenapi = (code, integrationid, userid) => {
    shiphypeService
      .ebayIntegration(code, integrationid, userid)
      .then((response) => {
        console.log("token", response);
      })
      .catch((error) => {
        console.error(error);
      });
  };


  // const  logout=()=>{
  //   window.localStorage.clear();
  //   window.sessionStorage.clear();
  //   window.open('https://shiphype.com/', '_self');

  // }

  const  logout=()=>{
    AsyncStorage.removeItem("userid");
    AsyncStorage.removeItem("imitate");
    window.localStorage.clear();
    window.sessionStorage.clear();
    window.open('https://shiphype.com/', '_self');
  }

    React.useEffect(() => {

      fetchShiphypeCompleteStep();

       } ,[]);
    const fetchShiphypeCompleteStep = ()=>{

      //  const userid=userid;
      shiphypeService.fetchStepCompleteStatus(userid)
        .then(response => {
         console.log("status",response.status);
              if(response.status === true) {
                //setLoading(false);
                let textValueId=1;
                let flag1=true;
                let flag2=true;
                let flag3=true;
                let flag4=true;
                let flag5=true;
                let flag6=true;
                let flag7=true;
                let flag8=true;
                let flag9=true;
                let flag10=true;
                let flag11=true;
                let flag12=true;
                let flag13=true;
                let flag14=true;

                 //  setStepdonedata(response.data);
                   if(response.data.length !== 0){
                    for(let i=0; i<response.data.length;i++){
                      if(response.data[i].shiphypesubstepId === 5){
                      //  setMarketdone(true);

                        if(flag1===true)
                        {
                          textValueId=textValueId+1;
                          flag1=false;
                        }

                      }
                      // else if(response.data[i].shiphypesubsubstepId === 3){
                      //   setShipprofiledone(true);

                      //   if(flag2===true)
                      //   {
                      //     textValueId=textValueId+1;
                      //     flag2=false;
                      //   }
                      // }
                      else if(response.data[i].shiphypesubsubstepId === 4){
                      //  setShippolicydone(true);

                        if(flag3===true)
                        {
                          textValueId=textValueId+1;
                          flag3=false;
                        }
                      }
                      // else if(response.data[i].shiphypesubsubstepId === 5){
                      //   setCarrierselectionprofiledone(true);

                      //   if(flag4===true)
                      //   {
                      //     textValueId=textValueId+1;
                      //     flag4=false;
                      //   }
                      // }
                      else if(response.data[i].shiphypesubsubstepId === 6){
                        // setReturnsettingdone(true);

                         if(flag5===true)
                         {
                           textValueId=textValueId+1;
                           flag5=false;
                         }
                      }else if(response.data[i].shiphypesubsubstepId === 7){
                       //  setCustomepackingdone(true);

                         if(flag6===true)
                         {
                           textValueId=textValueId+1;
                           flag6=false;
                         }
                      }else if(response.data[i].shiphypesubsubstepId === 8){
                       // setProductimportdone(true);

                        if(flag7===true)
                        {
                          textValueId=textValueId+1;
                          flag7=false;
                        }
                      }else if(response.data[i].shiphypesubstepId === 9){
                       // setCustomerimportdone(true);

                        if(flag8===true)
                        {
                          textValueId=textValueId+1;
                          flag8=false;
                        }
                     }
                     else if(response.data[i].shiphypesubstepId === 11){
                     // setSentInvo(true);

                      if(flag9===true)
                        {
                          textValueId=textValueId+1;
                          flag9=false;
                        }
                   }
                   else if(response.data[i].shiphypesubstepId === 12){
                    //setPricePlan(true);

                    if(flag10===true)
                    {
                      textValueId=textValueId+1;
                      flag10=false;
                    }
                 }
                 else if(response.data[i].shiphypesubstepId === 13){
                 // setConnect(true);

                  if(flag11===true)
                  {
                    textValueId=textValueId+1;
                    flag11=false;
                  }
               }
               else if(response.data[i].shiphypesubstepId === 14){
               // setRecievSet(true);

                if(flag12===true)
                        {
                          textValueId=textValueId+1;
                          flag12=false;
                        }
             }
             else if(response.data[i].shiphypesubstepId === 15){
             // setOrderset(true);

              if(flag13===true)
              {
                textValueId=textValueId+1;
                flag13=false;
              }
           }
           else if(response.data[i].shiphypesubstepId === 16){
            //setEnableset(true);

            if(flag14===true)
            {
              textValueId=textValueId+1;
              flag14=false;
            }
         }else{

                     }
                   }
                   if(textValueId==13)
                   {
                    setNow(100);
                   // props.handleNextPage(1);
                   }
                   else if(textValueId==1)
                   {
                    setNow(6);
                   }
                   else if(textValueId==2)
                   {
                    setNow(12);
                   }
                   else if(textValueId==3)
                   {
                    setNow(18);
                   }
                   else if(textValueId==4)
                   {
                    setNow(24);
                   }
                   else if(textValueId==5)
                   {
                    setNow(30);
                   }
                   else if(textValueId==6)
                   {
                    setNow(36);
                   }
                   else if(textValueId==7)
                   {
                    setNow(42);
                   }
                   else if(textValueId==8)
                   {
                    setNow(48);
                   }
                   else if(textValueId==9)
                   {
                    setNow(54);
                   }
                   else if(textValueId==10)
                   {
                    setNow(60);
                   }
                   else if(textValueId==11)
                   {
                    setNow(70);
                   }
                   else if(textValueId==12)
                   {
                    setNow(100);
                   }


                  }
                  setTextValue(textValueId);
                         }else{
                          //setLoading(false);
                          console.log("message",response.message);
                         }
            }).catch((error) =>{
                  console.error(error);
            });
      }
      /**
     * Description:Callback function after api call
     */
    const handleClose = () => {
      setToast(false);
      if(status === true)
      {
        props.navigation.navigate('Login',{logoutresponsedata:logoutresponse,isLoggined:true});
      }else{
        //props.updateebayDone();
      }
    };

    const openHelpscreen=()=>{
      setOpenhelp(true);
    }

    const closeHelpscreen=()=>{
      setOpenhelp(false);
    }


    const ProgressBar = () => {


        const containerStyles = {
          height: 10,
          width: '88%',
          backgroundColor: "#fff",
          borderRadius: '10px',
         marginLeft:'15px',
          border: '2px solid #ced4da',
        }

        const fillerStyles = {
          height: '100%',
          width: `${now}%`,
          backgroundColor: '#ccccff',
         // borderRadius: 'inherit',
          textAlign: 'right'

        }

        const labelStyles = {

          color: 'white',
          fontWeight: '8',

        }
        const paddingBottom = {
          paddingBottom:'5px',
          paddingRight:'8px',
          paddingLeft:'8px',
          color: 'white',
          fontSize:'12px',
          fontWeight: '5',

        }
        return (

          <div    style={containerStyles}  >
            <div  style={fillerStyles}  >
              {/* <span style={labelStyles}>{`${now}%`}</span> */}
              {/* <Typography  style={paddingBottom} > {`${now}%`}</Typography> */}
            </div>
          </div>
        );

      };





    //Show Toast after click event
    const showToast =(open,msg,type)=>{
      console.info("call",open);
     return(
    <Toast
     open={toast}
     handleClose={handleClose}
     type={type}
     msg={msg}
    />
   )
    }
  //  let screenWidth = Dimensions.get('window').width;
    console.log(screenWidth);
    let drawerWidthClosed=0;
    let drawerWidthOpen=0;
    let sideWidthClosed=0;
    let sideWidthOpen=0;
    if(screenWidth<400)
 {

    drawerWidthClosed=classes.drawerWithClosed1;
    drawerWidthOpen= classes.drawerWithOpen1;
   sideWidthClosed=classes.sideWithClosed1;
   sideWidthOpen=classes.sideWithOpen1;

 }
 else if(screenWidth<690)
 {
  drawerWidthClosed=classes.drawerWithClosed2;
  drawerWidthOpen= classes.drawerWithOpen2;
 sideWidthClosed=classes.sideWithClosed2;
 sideWidthOpen=classes.sideWithOpen2;
 }
 else if(screenWidth<900)
 {
  drawerWidthClosed=classes.drawerWithClosed4;
  drawerWidthOpen= classes.drawerWithOpen4;
 sideWidthClosed=classes.sideWithClosed4;
 sideWidthOpen=classes.sideWithOpen4;
 }

 else if(screenWidth<1530){
  drawerWidthClosed=classes.drawerWithClosed3;
  drawerWidthOpen= classes.drawerWithOpen3;
 sideWidthClosed=classes.sideWithClosed3;
 sideWidthOpen=classes.sideWithOpen3;
 }
 else if(screenWidth<1600)
 {
  drawerWidthClosed=classes.drawerWithClosed5;
  drawerWidthOpen= classes.drawerWithOpen5;
 sideWidthClosed=classes.sideWithClosed5;
 sideWidthOpen=classes.sideWithOpen5;
 }

 else if(screenWidth<2000)
 {
  drawerWidthClosed=classes.drawerWithClosed6;
  drawerWidthOpen= classes.drawerWithOpen6;
 sideWidthClosed=classes.sideWithClosed6;
 sideWidthOpen=classes.sideWithOpen6;
 }


 else{
  drawerWidthClosed=classes.drawerWithClosed;
  drawerWidthOpen= classes.drawerWithOpen;
 sideWidthClosed=classes.sideWithClosed;
 sideWidthOpen=classes.sideWithOpen;
 }
//Open and close Profile popup
const handleClickProfile = event => {
  if (openProfile && openProfile.contains(event.target)) {
    setOpenProfile(null);
  } else {
    setOpenProfile(event.currentTarget);
  }
};

const switchHandling12=(position)=>{
  //setShipmentId(0);
  setShipmentId(0);
  setPosition(position);
  setEditCard(null);
  setEditFunction('1');
}

const switchHandling=(position)=>{
  //setShipmentId(0);
//  setShipmentId(0);
  setPosition(position);
  setEditCard(null);
 // setEditFunction('1');
}

/**
 * Description:To do set warehouse
 * @param {*} warehouseid
 */
const handleSelectWarehouse=(warehouseid,promotional)=>{
  console.log("selecwarehousemain",warehouseid);
  console.log("packagemain",promotional);
  setPAckageData(promotional);
  setSelectwarehouse(warehouseid);
}

const openSquareView=()=>{
  handleSideNext('squarepayment');
}

const handleCloseProfile = () => {
  setOpenProfile(null);
};
const handleNext =(isSprintCreate)=>{
  setPosition(1);
}

const handleNextOption =(isSprintCreate)=>{
  setPosition(isSprintCreate);
}

const handleNextOptionSetting =(isSprintCreate,id)=>{
 // setPosition(isSprintCreate);
  setSettingId(id);
  handleSideNext('allsettings');
}
const handleNextHelp =(id)=>{
  setPosition(id);
}
const handleAllShipment =(id)=>{
  setPosition(id);
}
const handleSideeNext=(isSprintCreate,pop)=>{
  setPosition(isSprintCreate);
  pop.close();
}

const handleSideNext23=(isSprintCreate,p1,p2)=>{
  setPosition(isSprintCreate);
  setpack23(p1);
  setpro23(p2);

}
const handleSideNext=(isSprintCreate)=>{

  if(isSprintCreate === 'faqs'){
    window.open('https://shiphype.com/faqs/', '_blank');
  }
  if(isSprintCreate === 'inst'){
    window.open('http://54.161.201.106:83/FAQs.html', '_blank');
  }
  setOpenMarketPlace(false);
  setShipmentId(0);
  if(position === 'helpFormOpen')
  {
    setPosition(isSprintCreate);
  }


  if(isSprintCreate === '02')
  {
    if(position === 'select_order_type')
    {
      setPosition(isSprintCreate);
     //  setPosition(isSprintCreate);
    }
    else if(position === 'UploadOrderSheet')
    {
      setPosition(isSprintCreate);
     //  setPosition(isSprintCreate);
    }
    else if(position=== 'selectWarehouseOrder')
    {
      setPosition(isSprintCreate);
     //  setPosition(isSprintCreate);
    }
    else if(position==='selected_order_detailsforSellerData')
    {
      setPosition(isSprintCreate);
     //  setPosition(isSprintCreate);
    }
    else if(position==='additional_order_options')
    {
      setPosition(isSprintCreate);
     //  setPosition(isSprintCreate);
    }
   else  if(position==='select_ship_type')
   {
     setPosition(isSprintCreate);
    //  setPosition(isSprintCreate);
   }
   else  if(position==='ShippingPolicyOrder')
   {
     setPosition(isSprintCreate);
    //  setPosition(isSprintCreate);
   }
   else  if(position==='select_customer_kind')
   {
     setPosition(isSprintCreate);
    //  setPosition(isSprintCreate);
   }else if (position === "SelectOrderMainScreen") {
    setPosition(isSprintCreate);
    //  setPosition(isSprintCreate);
  }
   else  if(position==='select_Order_Product')
   {
     setPosition(isSprintCreate);
    //  setPosition(isSprintCreate);
   }
   else  if(position==='orderSelectCustom')
   {
     setPosition(isSprintCreate);
    //  setPosition(isSprintCreate);
   }
   else  if(position==='orderSelectPromotional')
   {
     setPosition(isSprintCreate);
    //  setPosition(isSprintCreate);
   }
   else  if(position === 'manual_order')
   {
     setPosition(isSprintCreate);
    //  setPosition(isSprintCreate);
   }
   else  if(position === 'importOrderShopify')
   {
     setPosition(isSprintCreate);
    //  setPosition(isSprintCreate);
   }
   else  if(position === 'importOrderfetchShopify')
   {
     setPosition(isSprintCreate);
    //  setPosition(isSprintCreate);
   }
    else{
      //props.navigation.navigate('Order',{position:isSprintCreate});
      props.navigation.push('Order',{position:isSprintCreate});
    }

  }
  else if(isSprintCreate==='01'){
    if(position===isSprintCreate)
    {
       setPosition(isSprintCreate);
    }
    else{
      setPosition(isSprintCreate);
      props.navigation.push('Overview',{position:isSprintCreate});
    }
  }
  else if(isSprintCreate==='invoice'){
    if(position === isSprintCreate)
    {
       setPosition(isSprintCreate);
    }
    else{
      
      props.navigation.push('Invoice',{position:isSprintCreate});
    }
  }
  else if(isSprintCreate==='showfeedback'){
    if(position === isSprintCreate)
    {
       setPosition(isSprintCreate);
    }
    else{
      props.navigation.push('Showfeedback',{position:isSprintCreate});
    }
  }
  

  else if(isSprintCreate==='03'){
    if(position===isSprintCreate)
    {
       setPosition(isSprintCreate);
    }
    else{
      props.navigation.push('Return',{position:isSprintCreate});
    }
  }
  else if(isSprintCreate === '14'){
    if(position===isSprintCreate)
    {
       setPosition(isSprintCreate);
    }
    else if(position==='selected_order_details')
    {
       setPosition(isSprintCreate);
    }
    else{
      props.navigation.push('ReceiveOrder',{position:isSprintCreate});
      //setPosition(isSprintCreate);
    }
  }
  else if(isSprintCreate === '140'){
    if(position===isSprintCreate)
    {
       setPosition(isSprintCreate);
    }
    else if(position==='selected_order_details_canada')
    {
       setPosition(isSprintCreate);
    }
    else{
      props.navigation.push('ReceiveOrderCanada',{position:isSprintCreate});
      //setPosition(isSprintCreate);
    }
  }
  else if(isSprintCreate === '15'){
    if(position===isSprintCreate)
    {
       setPosition(isSprintCreate);
    }
    else if(position==='selected_return_order_details')
    {
       setPosition(isSprintCreate);
    }
    else if(position==='selectReturnWarehouseOrder')
    {
       setPosition(isSprintCreate);
    }
    else if(position==='SelectCarrierTrackingDate')
    {
       setPosition(isSprintCreate);
    }
    else if(position==='SelectReturnProduct')
    {
       setPosition(isSprintCreate);
    }
    else if(position==='SelectReturnOrderMainScreen')
    {
       setPosition(isSprintCreate);
    }
    else if(position==='select_Seller')
    {
       setPosition(isSprintCreate);
    }
    else{
      props.navigation.push('ReceiveReturnOrder',{position:isSprintCreate});
      //setPosition(isSprintCreate);
    }
  }
else if(isSprintCreate === 'squarepayment'){
    if(position === isSprintCreate)
    {
       setPosition(isSprintCreate);
    }
    else{
      props.navigation.push('Square',{position:isSprintCreate});
    }
  }
  else if(isSprintCreate === '014'){
    if(position === isSprintCreate)
    {
       setPosition(isSprintCreate);
    }
    else{
      props.navigation.push('Help',{position:isSprintCreate});
    }
  }else if(isSprintCreate === '015'){
    if(position === 'transfer_credit')
    {
       setPosition(isSprintCreate);
    }
    else  if(position === '015')
    {
       setPosition(isSprintCreate);
    }
    else{
      props.navigation.push('AffiliateProgram',{position:isSprintCreate});
    }
  }
  else if(isSprintCreate === 'accountsetting'){
    if(position === isSprintCreate)
    {
       setPosition(isSprintCreate);
    }
    else{
      props.navigation.push('AccountSetting',{position:isSprintCreate});
    }
  }

  else if(isSprintCreate === 'billing'){

    if(position==='PaymentRecieveSetting')
    {
       setPosition(isSprintCreate);
    }
   else if(position === isSprintCreate)
   {
      setPosition(isSprintCreate);
   }
    else if(position==='cardlistadd')
    {
      setPosition(isSprintCreate);
    }

    else{
      props.navigation.push('BillingSetting',{position:isSprintCreate});
    }
  }

  else if(isSprintCreate === 'marketplaceSetting'){

    if(position === isSprintCreate)
   {
      setPosition(isSprintCreate);
   }


    else{
      props.navigation.push('MarketPlaceSetting',{position:isSprintCreate});
    }
  }
  else if(isSprintCreate === 'historytransaction'){

    if(position === isSprintCreate)
   {
      setPosition(isSprintCreate);
   }
    else{
      props.navigation.push('TransactionHistory',{position:isSprintCreate});
    }
  }

  else if(isSprintCreate==='04'){
    if(position===isSprintCreate)
    {
       setPosition(isSprintCreate);
    }else if(position==='AddCustomerManually')
    {
      setPosition(isSprintCreate);
    }
    else{
      props.navigation.push('Customer',{position:isSprintCreate});
    }
  }
  else if(isSprintCreate==='05'){
    if(position===isSprintCreate)
    {
       setPosition(isSprintCreate);
       console.log("upercall");
    }
    else if(position==='AddProductManually')
    {
      setPosition(isSprintCreate);
    }
    else{
      props.navigation.push('Product',{position:isSprintCreate});
       console.log("belowcall");
    }
  }
  else if(isSprintCreate==='06'){
    if(position===isSprintCreate)
    {
       setPosition(isSprintCreate);
    }
    else{
      props.navigation.push('Custom',{position:isSprintCreate});
    }
  }
  // else if(isSprintCreate === 'transfer_credit'){
  //   if(position === isSprintCreate)
  //   {
  //      setPosition(isSprintCreate);
  //   }
  //   else{
  //     props.navigation.navigate('TransferCredit',{position:isSprintCreate});
  //   }
  // }
  else if(isSprintCreate==='07'){
    if(position===isSprintCreate)
    {
       setPosition(isSprintCreate);
    }
    else{
      props.navigation.push('Promotional',{position:isSprintCreate});
    }
  }
  else if(isSprintCreate==='09'){
    if(position===8)
    {
      setOpen6(true);
      updateShipmentId1();
      setPosition(isSprintCreate);

     //  setPosition(isSprintCreate);
    }

    else if(position===6)
    {
      setOpen6(true);
      updateShipmentId1();
      setPosition(isSprintCreate);
     //  setPosition(isSprintCreate);
    }
    else if(position==='sendInventoryPromotional')
    {
      setOpen6(true);
      updateShipmentId1();
      setPosition(isSprintCreate);
     //  setPosition(isSprintCreate);
    }
    else if(position==='SendInventoryDetails')
    {
      setOpen6(true);
      updateShipmentId1();
      setPosition(isSprintCreate);
     //  setPosition(isSprintCreate);
    }
    else if(position==='SendInventroyLocation')
    {
      setOpen6(true);
      updateShipmentId1();
      setPosition(isSprintCreate);
     //  setPosition(isSprintCreate);
    }
    else if(position==='SendInventoryPackingType')
    {
      setOpen6(true);
      updateShipmentId1();
      setPosition(isSprintCreate);
     //  setPosition(isSprintCreate);
    }
    else if(position==='SendInvenotryShipementPacked')
    {
      setOpen6(true);
      updateShipmentId1();
      setPosition(isSprintCreate);
     //  setPosition(isSprintCreate);
    }
    else if(position==='SendIneventoryShipping')
    {
      setOpen6(true);
      updateShipmentId1();
      setPosition(isSprintCreate);
     //  setPosition(isSprintCreate);
    }
    else if(position===7)
    {
      setOpen6(true);
      updateShipmentId1();
      setPosition(isSprintCreate);
     //  setPosition(isSprintCreate);
    }
    else if(position==='SepacilaRequest')
    {
      //setOpen6(true);
      updateShipmentId1();
      setPosition(isSprintCreate);
     //  setPosition(isSprintCreate);
    }
    else if(position==='SepacilaRequest9')
    {
      //setOpen6(true);
      updateShipmentId1();
      setPosition(isSprintCreate);
     //  setPosition(isSprintCreate);
    }
    else if(position==='8')
    {
      //setOpen6(true);
      updateShipmentId1();
      setPosition(isSprintCreate);
     //  setPosition(isSprintCreate);
    }else if (position === "SelectMainScreen") {
      setOpen6(true);
      updateShipmentId1();
      setPosition(isSprintCreate);
      //  setPosition(isSprintCreate);
    }
    else if(position==='9')
    {
      //setOpen6(true);
      updateShipmentId1();
      setPosition(isSprintCreate);
     //  setPosition(isSprintCreate);
    }
    else{
      props.navigation.push('SentInventory',{position:isSprintCreate});
    }
  }
  else if(isSprintCreate==='10'){
    if(position===isSprintCreate)
    {
       setPosition(isSprintCreate);
    }
    else{
      props.navigation.push('ReceiveInventory',{position:isSprintCreate});
    }
  }
  else if(isSprintCreate==='11'){
    if(position==='select_transfer_inventory')
    {
       setPosition(isSprintCreate);
    }
    else if(position==='11')
    {
       setPosition(isSprintCreate);
    }
    else{
      props.navigation.push('TranferInventory',{position:isSprintCreate});
    }
  }


  else if(isSprintCreate === '12'){
    if(position === isSprintCreate)
    {
       setPosition(isSprintCreate);
    }
    else{
      props.navigation.push('RequestWorkOrder',{position:isSprintCreate});
    }
  }
  else if(position==='selectProductForSubscription')
  {
    setPosition(isSprintCreate);
  }
  else if(position==='selectPromotinalSubcription')
  {
    setPosition(isSprintCreate);
  }
  else if(position==='selectCustomSubcription')
  {
    setPosition(isSprintCreate);
  }
  else if(position==='AddSubscriptionQty')
  {
    setPosition(isSprintCreate);
  }
  else if(isSprintCreate==='08'){
    if(position===isSprintCreate)
    {
       setPosition(isSprintCreate);
    }
    else{
      props.navigation.push('Subscription',{position:isSprintCreate});
    }
  }
  else if(isSprintCreate === 'allsettings'){
    if(position === isSprintCreate)
    {
       setPosition(isSprintCreate);
    }
    else{
      props.navigation.push('AllSettings',{position:isSprintCreate});
    }
  }

  else if(isSprintCreate === '909'){
    if(position === isSprintCreate)
    {
       setPosition(isSprintCreate);
    }
    else{
      props.navigation.push('MarketPlaceIntegration',{position:isSprintCreate});
    }
} else if (isSprintCreate === "add_credit") {
      if (position === isSprintCreate) {
        setPosition(isSprintCreate);
      } else {
        props.navigation.push("AddCredit", {
          position: isSprintCreate,
        });
      }
  }else{
     setPosition(isSprintCreate);
  }
  //setPosition(isSprintCreate);

}


const upadteShipID=(id)=>{
  setShipmentId1(id);
}

const updateShipmentId=()=>{
  setShipmentId(0);
}
const updateShipmentId1=()=>{
  setShipmentId1(0);
}



const updateData = (data, integrateDataid) => {
  if(integrateDataid === 3){
    setImportCustData(data);
    setImportData(null);
    setImportEbayData(null);
  }else if(integrateDataid === 1){
    setImportEbayData(data);
    setImportCustData(null);
    setImportData(null);
  }else{
    setImportData(data);
    setImportEbayData(null);
    setImportCustData(null);
  }
  setSelectintegration(integrateDataid);
};



const getSpecialRequestvalue=(checkboxvalue,description)=>{
  setRequestRelatedTo(checkboxvalue);
  setRequestDescription(description);
}
const getShipmentId=(shipmentId)=>{
  setShipmentId(shipmentId);
  setEditFunction('');
  setPosition(6);
}
const setShippingId=(shipmentId)=>{
  setShipmentId(shipmentId);

}

const getEditOrderData=(rowdata)=>{
  setEditOrder(rowdata);
  setPosition('selectWarehouseOrder');
}

const getEditOrderData1=(rowdata,uuid)=>{
  setEditSubscription(rowdata);
  setUUId(uuid);
  setPosition('selectProductForSubscription');
}

const getShipmentIdForInventory=(shipmentId)=>{
  setShipmentIds(shipmentId);
  //setEditFunction('');
  setPosition('ProductInfo');
}
const getShipmentIdForInventorySend=(shipmentId)=>{
  setShipmentIds(shipmentId);
  //setEditFunction('');
  setPosition('SendInventoryDetails');
}
const updateHeaderTransaction=(transactionhistory)=>{
  console.log("header",transactionhistory);
  setTransactionHeader(transactionhistory);
  localStorage.storeData("headertitle",transactionhistory);
  window.sessionStorage.setItem("headertitle",transactionhistory);
  handleSideNext("historytransaction");
}

const updateSelectProductArray=(product,ids3)=>{
  setchangedWarehouseid(product);
  const updatedaray1 = [...ids3];
  setshippedQuantity(updatedaray1);
}

const updateSelectProductArray1=(product,ids3)=>{
  setchangedWarehouseid1(product);
   const updatedaray1 = [...ids3];
  setshippedQuantity1(updatedaray1);
}

const updateSelectProductArray2=(product,shippedQuantity)=>{
  setchangedWarehouseid2(product);
  setshippedQuantity2(shippedQuantity);
}

const updateSelectCustomeArray=(PackageId,PackageTypeId,packagingquant)=>{
  setchangePackageID(PackageId);
  setPackageTypeID(PackageTypeId);
  const updatedaray1 = [...packagingquant];
  setPackagingQuantity(updatedaray1);
}


const updateSelectPromotionalArray=(PackageId,PackageTypeId,packagingquant)=>{
  setchangePromotionalID(PackageId);
  setPromotionalTypeID(PackageTypeId);
  const updatedaray1 = [...packagingquant];
  setPromotionalQuantity(updatedaray1);
}


const updateSelectCustomeArray1=(PackageId,PackageTypeId)=>{
  setchangePackageID1(PackageId);
  setPackageTypeID1(PackageTypeId);
}
const updateSelectCustomeArray2=(PackageId,PackageTypeId)=>{
  setchangePackageID2(PackageId);
  setPackageTypeID2(PackageTypeId);
}
/**
 * Description: This function will work on back button
 * @param {*} position
 */
const backButtonRouting=(position)=>{
  if(position === '09'){
    setShipmentId(0);
    setPosition(position);
  }else{
    setPosition(position);
  }
}


const setImportDataEbay1=(promotional)=>{


  setImportEbayorderData(promotional);
}


/**
 * Description:This function is call from list screen
 * @param {*} editcard
 */
const handleeditcard=(editcard)=>{
  console.log('editfata',editcard);
  setEditCard(editcard);
  setPosition('cardlistadd');
}

const invenotyLocationUpdate=(l)=>{
  setInventoryLocation(l);
}
const invenotyPackagingUpdate=(l)=>{
  setInventoryPackgingType(l);
}
const invenotyShipemntTypeUpdate=(l)=>{
  setInventoryShipemntType(l);
}
const invenotyLabelUpdate=(l)=>{
  setInventoryLabel(l);
}


const setOrderKindUpdate=(orderkind,promotinal)=>{
  setOrderkind(orderkind);
  setPAckageData(promotinal);
}
const setWarehouseUpdate=(orderkind,promotional,packageres)=>{
  setOrderWarehouseId(orderkind);
  setPAckageProData(promotional);
  setPAckageData(packageres);
}

const setReturnDataUpdate=(returncondiions,tracking,shipFrom,selectedStartDate,carrierId)=>{
  setreturncondiions(returncondiions);
  setreturntracking(tracking);
  setreturnfromname(shipFrom);
  setreturnselectedStartDate(selectedStartDate);
  setreturncarrierId(carrierId);
}

const setOrderTypeUpdate=(orderType,promotional)=>{
  setOrderType(orderType);
  setPAckageData(promotional);
}

const refreshsaveback=(update)=>{
  setSaveback(update);
}

const setCustomerIdUpdate=(customerId,customerName,customerCountry)=>{
  setCustomerId(customerId);
  setCustomerName(customerName);
  setCustomerCountry(customerCountry);
}
const setProductShippingQunaitty=(customerId)=>{
  setShippingQunatity(customerId);
 
}
const setCustomerIdAfterAdd=(customerId)=>{
  setCustomerId(customerId);
 
}
const setEditCaseOnAdd=(customerId)=>{
  setEditCaseOnAddOption(customerId);
 
}

const setShipingtypeUpdate=(shipingtypepolicy,selectoption,docName,shipmentTypeId)=>{
  setShipingtype(shipingtypepolicy);
  setShipLabelId(selectoption);
  setShipLabelName(docName);
  setShipemntType(shipmentTypeId);
 // setSelectoption(selectoption);
}

const setShipingOptionUpdate=(selectoption,promotional)=>{

  setSelectoption(selectoption);
  setPAckageProData(promotional);
}
const setPackageData=(promotional)=>{


  setPAckageData1(promotional);
}
const setImportDataShopify=(promotional)=>{


  setImportDataShopifyData(promotional);
}
const setImportDataShopify1=(promotional)=>{


  setImportDataShopifyData1(promotional);
}
const setImportIntergartionIdShopify=(promotional)=>{


  setImportDataShopifyDataId(promotional);
}
const setShipingDangrousGoodUpdate=(dangerous)=>{
  setDangerous(dangerous);
}
const updateInventoryWarehouse=(fromwarehouse,towarehouse)=>{
  setFromWarehouseIdInventory(fromwarehouse);
  setToWarehouseIdInventory(towarehouse);
  }
const getInternalOrderId=(internalorderid)=>{
  setInternalorderid(internalorderid);
  setPosition("selected_order_details");
}

const getInternalOrderIdCanada=(internalorderid)=>{
  setInternalorderid(internalorderid);
  setPosition("selected_order_details_canada");
}
const getInternalReturnOrderId=(internalorderid)=>{
  setInetalOrderData(internalorderid);
  setPosition("selected_return_order_details");
}
const getOrderDataDetails=(internalorderid)=>{
  setInternalorderid(internalorderid);
  setPosition("selected_order_detailsforSellerData");
}

const openSellerRetunrOrderDetails=()=>{
  setPosition("selected_order_details_seller");
} 

const updateOrderDataState=()=>{
setEditOrder(null);
}

const updateSubscriptionDataState=()=>{
  setEditSubscription(null);
};
const fetchCurrentTotalamount = () => {
  console.log("========USER ID===========");
  console.log(userid);
    console.log("LOGGGGGG FUNCTION CREDIT");
    //const userid=5;
    setLoading(true);
    shiphypeService
      .fetchCurrenTotalamount(userid)
      .then((response) => {
        console.log("RESPONSE CURRENT TOTAL AMT");
        console.log(response);
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          console.log("res");
          console.log(response.data.transact);
          console.log(response.data.unpaid);

        const transact = response.data.transact;
        const avaliableamount = response.data.totalamount;
        const unpaidamount = response.data.unpaid;
        if(transact.includes("+")){
          console.log("TRANSACT +++");
          console.log("ava",avaliableamount);
          console.log("unpaid",unpaidamount);
          if(unpaidamount !== 0){
            console.log("AMTTTT");
            console.log(unpaidamount);
              setCurrentAvaliableTotalAmount(unpaidamount);
          } else{
              setCurrentAvaliableTotalAmount(avaliableamount);
          }


        }else if(transact.includes("-")){
          console.log("TRANSACT -----");
          console.log("ava",avaliableamount);
          console.log("unpaid",unpaidamount);

            setCurrentUnpaidTotalAmount(unpaidamount);
        } else{
            setCurrentAvaliableTotalAmount(avaliableamount);
            setCurrentUnpaidTotalAmount(unpaidamount);
        }

            setUserStatus(true);
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
/**
 * Description:This function return curent component on click side drawer
 */
    const SwitchHandling=()=>{
      if(position === 0){
       return <Dashboard
       code={code}
       openMarketPlace={openMarketPlace}
       userRoleId={userRoleId}
       handleNextPage={handleNext}
       handleOrderPage={handleSideNext}
       handleNextOption={handleSideNext}
       handleNextOptionSetting1={handleNextOptionSetting}
       user_id={userid}
       isAdmin={isAdmin}
        handleDashboard={handleSideNext}
       handleOrder={handleSideNext}
       />;
      }

      else if(position === '02')
      {
        return <Order
        userRoleId={userRoleId}
        updateOrderDataState={updateOrderDataState}
        switchHandling={switchHandling12}
        handleNextPage={handleNext}
        getEditOrderData={getEditOrderData}
        user_id={userid}
        isAdmin={isAdmin}
        getOrderDataDetails={getOrderDataDetails}
           handleDashboard={handleSideNext}
        />;
      }

      else if(position === '08')
      {
        return <SubscriptionBox
        userRoleId={userRoleId}
       updateSubscriptionDataState={updateSubscriptionDataState}
        switchHandling={switchHandling12}
        handleNextPage={handleNext}
        setPackageData={setPackageData}
        getEditOrderData={getEditOrderData1}
        user_id={userid}
uuserdid={uuserdid}
        isAdmin={isAdmin}
           handleDashboard={handleSideNext}
        />;
      }
      else if(position === 'select_dangrous_goods'){
        return <SelectDangrousGoods
        backButtonRouting={backButtonRouting}
        user_id={userid}
           handleDashboard={handleSideNext}
        setShipingDangrousGoodUpdate={setShipingDangrousGoodUpdate}
        handleNextPage={switchHandling}
        orderkind={orderkind}
        orderType={orderType}
        customerId={customerId}
        shipingtype={shipingtype}
        customerName={customerName}
        selectoption={selectoption}
        editOrder={editOrder}
        isAdmin={isAdmin}
        updateOrderDataState={updateOrderDataState}
     />;
       }
       else if(position === 'accountsetting'){
        return <AccountSetting
        userRoleId={userRoleId}
        isAdmin={isAdmin}
        handleNextPage={handleNext}
        user_id={userid}
           handleDashboard={handleSideNext}
        />
      }
       else if(position === '12'){
        return <RequestWorkOrder
          user_id={userid}
          isAdmin={isAdmin}
             handleDashboard={handleSideNext}
        />
      }
 else if(position === 'squarepayment'){
        return <Square
         editCard={editCard}
         user_id={userid}
         isAdmin={isAdmin}
            handleDashboard={handleSideNext}
         handleNextPage={switchHandling}
        />;
      }
      else if(position === 'manual_order'){
        return <ManualOrder
        backButtonRouting={backButtonRouting}
        user_id={userid}
        isAdmin={isAdmin}
           handleDashboard={handleSideNext}
        setOrderKind={setOrderKindUpdate}
        handleNextPage={switchHandling}
        editOrder={editOrder}
     />;
           }
           else if(position === 'importOrderfetchShopify'){
            return <ImportOrderFetchData
            backButtonRouting={backButtonRouting}
            user_id={userid}
            isAdmin={isAdmin}
            integrationid={importDataShopifyDataId}
            importOrderData={importDataShopifyData}
            importWorderData={importDataShopifyData1}
            importEbayorderData={importEbayorderData}
               handleDashboard={handleSideNext}
               handleDashboard2={handleSideNext23}
           // setOrderKind={setOrderKindUpdate}
            handleNextPage={switchHandling}
           // editOrder={editOrder}
         />;
               }
               else if (position === "SelectOrderMainScreen") {
                return (
                  <SelectOrderMainScreen
                    backButtonRouting={backButtonRouting}
                    user_id={userid}
                    isAdmin={isAdmin}
                    editOrder={editOrder}
                    editCaseOnAddOption={editCaseOnAddOption}
                    setEditCaseOnAdd={setEditCaseOnAdd}
                    orderwarehouseId={orderwarehouseId}
                    handleDashboard={handleSideNext}
                    shippingQunatity={shippingQunatity}
                    setCustomerIdUpdate={setCustomerIdUpdate}
                    handleNextPage={switchHandling}
                    editOrder={editOrder}
                  />
                );
              }
           else if(position === 'importOrderShopify'){
            return <ImportOrder
            backButtonRouting={backButtonRouting}
            user_id={userid}
            isAdmin={isAdmin}
            setImportData={setImportDataShopify}
            setImporWootData={setImportDataShopify1}
            setImportDataEbay1={setImportDataEbay1}
            setImportIntergartionId={setImportIntergartionIdShopify}
               handleDashboard={handleSideNext}
           // setOrderKind={setOrderKindUpdate}
            handleNextPage={switchHandling}
           // editOrder={editOrder}
         />;
               }

           else if(position === 'selectWarehouseOrder'){
            return <SelectWarehouseOrder
            backButtonRouting={backButtonRouting}
            user_id={userid}
            isAdmin={isAdmin}
               handleDashboard={handleSideNext}
            setOrderKind={setWarehouseUpdate}
            handleNextPage={switchHandling}
            editOrder={editOrder}
         />;
               }
               else if(position === 'selectReturnWarehouseOrder'){
                return <SelectReturnWarehouseOrder
                backButtonRouting={backButtonRouting}
                user_id={userid}
                isAdmin={isAdmin}
                   handleDashboard={handleSideNext}
                setOrderKind={setWarehouseUpdate}
                handleNextPage={switchHandling}
                editOrder={editOrder}
             />;
                   }
                   
                   else if(position === 'SelectCarrierTrackingDate'){
                    return <SelectCarrierTrackingDate
                    backButtonRouting={backButtonRouting}
                    user_id={userid}
                    isAdmin={isAdmin}
                       handleDashboard={handleSideNext}
                       handleSetDataReturn={setReturnDataUpdate}
                    handleNextPage={switchHandling}
                    editOrder={editOrder}
                    setEditCaseOnAdd={setEditCaseOnAdd}
                    orderwarehouseId={orderwarehouseId}
                    returncondiions={returncondiions}
                    returntracking={returntracking}
                     returnfromname={returnfromname}
                    returnselectedStartDate={returnselectedStartDate}
                    returncarrierId={returncarrierId}
                 />;
                       }
                       else if (position === "SelectReturnOrderMainScreen") {
                        return (
                          <SelectReturnOrderMainScreen
                            backButtonRouting={backButtonRouting}
                            user_id={userid}
                            isAdmin={isAdmin}
                            editOrder={editOrder}
                            editCaseOnAddOption={editCaseOnAddOption}
                            setEditCaseOnAdd={setEditCaseOnAdd}
                            handleDashboard={handleSideNext}
                            shippingQunatity={shippingQunatity}
                            setCustomerIdUpdate={setCustomerIdUpdate}
                            handleNextPage={switchHandling}
                            editOrder={editOrder}
                          />
                        );
                      }
                      else if (position === "select_Seller") {
                        return (
                          <SelectSeller
                            backButtonRouting={backButtonRouting}
                            user_id={userid}
                            isAdmin={isAdmin}
                            editOrder={editOrder}

                            returncondiions={returncondiions}
                            returntracking={returntracking}
                             returnfromname={returnfromname}
                            returnselectedStartDate={returnselectedStartDate}
                            returncarrierId={returncarrierId}
                            orderwarehouseId={orderwarehouseId}

                            editCaseOnAddOption={editCaseOnAddOption}
                            setEditCaseOnAdd={setEditCaseOnAdd}
                            handleDashboard={handleSideNext}
                            shippingQunatity={shippingQunatity}
                            setCustomerIdUpdate={setCustomerIdUpdate}
                            handleNextPage={switchHandling}
                            editOrder={editOrder}
                          />
                        );
                      }
                     else if(position === 'SelectReturnProduct'){
                    return <SelectReturnProduct
                  
                    updateSelectProductArray={updateSelectProductArray1}
                    backButtonRouting={backButtonRouting}
                    user_id={userid}
                    isAdmin={isAdmin}
                    orderwarehouseId={orderwarehouseId}
                       handleDashboard={handleSideNext}
                       productId={changedWarehouseid1}
                       productQuantity={shippedQuantity1}
                       promoData={promoData}
                    packageDataSet={packageDataSet}
                    setCustomerIdUpdate={setCustomerIdUpdate}
                    setProductShippingQunaitty={setProductShippingQunaitty}
                    handleNextPage={switchHandling}
                    editOrder={editOrder}
                 />;
                       }
                       
               else if(position === 'UploadOrderSheet'){
                return <UploadOrderSheet
                backButtonRouting={backButtonRouting}
                user_id={userid}
                isAdmin={isAdmin}
                   handleDashboard={handleSideNext}
                setOrderType={setOrderTypeUpdate}
                handleNextPage={switchHandling}
                editOrder={editOrder}
             />;
              }
               else if(position === 'select_order_type'){
             return <SelectOrderType
             backButtonRouting={backButtonRouting}
             user_id={userid}
             isAdmin={isAdmin}
                handleDashboard={handleSideNext}
             setOrderType={setOrderTypeUpdate}
             handleNextPage={switchHandling}
             editOrder={editOrder}
          />;
           }else if(position === 'select_customer_kind'){
             return <SelectCustomerKind
             backButtonRouting={backButtonRouting}
             user_id={userid}
             isAdmin={isAdmin}
             customerId={customerId}
             customerName={customerName}
                handleDashboard={handleSideNext}
             setCustomerIdUpdate={setCustomerIdUpdate}
             handleNextPage={switchHandling}
             editOrder={editOrder}
          />;
           }
           else if(position === 'select_Order_Product'){
            return <SelectOrderProduct
            updateSelectProductArray={updateSelectProductArray1}
            backButtonRouting={backButtonRouting}
            user_id={userid}
            isAdmin={isAdmin}
            orderwarehouseId={orderwarehouseId}
               handleDashboard={handleSideNext}
               productId={changedWarehouseid1}
               productQuantity={shippedQuantity1}
               promoData={promoData}
            packageDataSet={packageDataSet}
            setCustomerIdUpdate={setCustomerIdUpdate}
            setProductShippingQunaitty={setProductShippingQunaitty}
            handleNextPage={switchHandling}
            editOrder={editOrder}
         />;
          }
          else if(position === 'orderSelectPromotional'){
            return <SelectOrderPromotional
            updateSelectCustomeArray={updateSelectPromotionalArray}
        user_id={userid}
        isAdmin={isAdmin}
           handleDashboard={handleSideNext}
        shipmentId={shipmentId}
        handleNextPage={switchHandling}
        backButtonRouting={backButtonRouting}
            editOrder={editOrder}
         />;
          }
          else if(position === 'orderSelectCustom'){
            return <SelectOrderCutom
            updateSelectCustomeArray={updateSelectCustomeArray}
            user_id={userid}
            isAdmin={isAdmin}
               handleDashboard={handleSideNext}
            shipmentId={shipmentId}
            handleNextPage={switchHandling}
            backButtonRouting={backButtonRouting}
            editOrder={editOrder}
         />;
          }
          else if(position === '909'){
            return <MarketPlaceIntegration

            user_id={userid}
            isAdmin={isAdmin}
               handleDashboard={handleSideNext}

         />;
          }
          else if(position === 'selectProductForSubscription'){
            return <SelectSubscriptionProduct
            updateSelectProductArray={updateSelectProductArray2}
            backButtonRouting={backButtonRouting}
            user_id={userid}
            uuserdid={uuserdid}
            isAdmin={isAdmin}
               handleDashboard={handleSideNext}
            packageDataSet={packageDataSet1}
            setCustomerIdUpdate={setCustomerIdUpdate}
            handleNextPage={switchHandling}
            editOrder={editSubscription}
         />;
          }
           else if(position === 'select_ship_type'){
             return <SelectShippingType
             backButtonRouting={backButtonRouting}
             user_id={userid}
             isAdmin={isAdmin}
             shiplabelName={shiplabelName}
             shipmentType={shipmentType}
             shiplabelId={shiplabelId}
             shipingtype={shipingtype}
                handleDashboard={handleSideNext}
             setShipingtypeUpdate={setShipingtypeUpdate}
             handleNextPage={switchHandling}
             editOrder={editOrder}
          />;
           }else if(position === 'additional_order_options'){
             return <AdditionlOrderOptions

             backButtonRouting={backButtonRouting}
             user_id={userid}
             isAdmin={isAdmin}
                handleDashboard={handleSideNext}
                setEditCaseOnAdd={setEditCaseOnAdd}
                setCustomerIdAfterAdd={setCustomerIdAfterAdd}
            productId={changedWarehouseid1}
            productQuantity={shippedQuantity1}
            customerCountry={customerCountry}
             handleNextPage={switchHandling}
             orderkind={orderkind}
             dangerousGood={dangerousGood}
             orderwarehouseId={orderwarehouseId}
             orderType='1'
             customerId={customerId}
             shiplabelName={shiplabelName}
             shipmentType={shipmentType}
             shiplabelId={shiplabelId}
             shipingtype={shipingtype}
             customerName={customerName}
             selectoption={selectoption}
             editOrder={editOrder}
             updateOrderDataState={updateOrderDataState}
          />;
           }
           else if(position === 'ShippingPolicyOrder'){
            return <OrderShippingPolicy
            backButtonRouting={backButtonRouting}
            user_id={userid}
            isAdmin={isAdmin}
               handleDashboard={handleSideNext}
            setShipingOptionUpdate={setShipingOptionUpdate}
            handleNextPage={switchHandling}
            orderkind={orderkind}
            orderType={orderType}
            customerId={customerId}
            shipingtype={shipingtype}
            customerName={customerName}
            selectoption={selectoption}
            editOrder={editOrder}
            updateOrderDataState={updateOrderDataState}
         />;
          }
           else if(position === 'shiping_label'){
            return <ShippingLabel
            backButtonRouting={backButtonRouting}
            user_id={userid}
            isAdmin={isAdmin}
               handleDashboard={handleSideNext}
            handleNextPage={switchHandling}
            />
          }
      else if(position === '01')
      {
        return <Dashboard
        code={code}
        openMarketPlace={openMarketPlace}
        userRoleId={userRoleId}
        isAdmin={isAdmin}
        handleNextPage={handleNext}
        handleOrderPage={handleSideNext}
        handleNextOption={handleSideNext}
        handleNextOptionSetting1={handleNextOptionSetting}
        user_id={userid}
           handleDashboard={handleSideNext}
        handleOrder={handleSideNext}
        />;
      }
      else if(position === '04')
      {
        return <Customer

        userRoleId={userRoleId}
        handleNextPage={handleNext}
        user_id={userid}
        isAdmin={isAdmin}
           handleDashboard={handleSideNext}
        />;
      }
      else if(position === 'AddCustomerManually')
      {
        return <AddCustomerDynamic
        userRoleId={userRoleId}
        handleNextPage={handleNext}
        user_id={userid}
        isAdmin={isAdmin}
           handleDashboard={handleSideNext}
        />;
      }
      else if(position === 'showfeedback')
      {
        return <ShowFeedbackToAdmin
        handleNextPage={handleNextHelp}
        isAdmin={isAdmin}
        user_id={userid}
           handleDashboard={handleSideNext}
        />;
      }
      
      else if(position === '05')
      {
        return <Product
        userRoleId={userRoleId}
        handleNextPage={handleNext}
        user_id={userid}
        isAdmin={isAdmin}
        promotionalData={promotionalData}
           handleDashboard={handleSideNext23}
        />;
      }
      else if(position === 'AddProductManually')
      {
        return <AddProductManually
        userRoleId={userRoleId}
        handleNextPage={handleNext}
        user_id={userid}
        isAdmin={isAdmin}
        packageDataPro={pack23}
        promotionalData={pro23}
           handleDashboard={handleSideNext}
        />;
      }
      else if(position === '06')
      {
        return <Custom
        userRoleId={userRoleId}
        handleNextPage={handleNext}
        user_id={userid}
        isAdmin={isAdmin}
           handleDashboard={handleSideNext}
        />;
      }
      else if(position === '07')
      {
        return <Promotional
        userRoleId={userRoleId}
        handleNextPage={handleNext}
        user_id={userid}
        isAdmin={isAdmin}
           handleDashboard={handleSideNext}
        />;
      }else if(position === '015'){
        return <AffiliateProgram
        userRoleId={userRoleId}
        isAdmin={isAdmin}
        handleNextPage={handleNext}
        user_id={userid}
           handleDashboard={handleSideNext}
		 openTransferCredit={openTransferCredit}
        />
      }

      else if(position === '09'){
        return <SendInventory
        userRoleId={userRoleId}
        isAdmin={isAdmin}
         handleSelectWarehouse={handleSelectWarehouse}
         getShipmentIdFromOrder={getShipmentId}
         shipmentId={shipmentId}
         user_id={userid}
         getShipmentIdFromShipment={getShipmentIdForInventorySend}
            handleDashboard={handleSideNext}
         handleNextPage={switchHandling}
        />;
      }


      else if(position === 'SendInventroyLocation'){
        return <SendInventroyLocation
        userRoleId={userRoleId}
        invenotyLocationUpdate={invenotyLocationUpdate}
        isAdmin={isAdmin}
         user_id={userid}
            handleDashboard={handleSideNext}
         handleNextPage={switchHandling}
        />;
      }
      else if (position === "SelectMainScreen") {
        return (
          <SelectMainScreen
            userRoleId={userRoleId}
            isAdmin={isAdmin}
            user_id={userid}
            handleDashboard={handleSideNext}
            handleNextPage={switchHandling}
          />
        );
      }
      else if(position === 'SendInventoryPackingType'){
        return <SendInventoryPackingType
        userRoleId={userRoleId}
        isAdmin={isAdmin}
        invenotyPackagingUpdate={invenotyPackagingUpdate}
         user_id={userid}
            handleDashboard={handleSideNext}
         handleNextPage={switchHandling}
        />;
      }

      else if(position === 'SendInvenotryShipementPacked'){
        return <SendInvenotryShipementPacked
        userRoleId={userRoleId}
        isAdmin={isAdmin}
        invenotyShipemntTypeUpdate={invenotyShipemntTypeUpdate}
         user_id={userid}
            handleDashboard={handleSideNext}
         handleNextPage={switchHandling}
        />;
      }

      else if(position === 'SendIneventoryShipping'){
        return <SendIneventoryShipping
        userRoleId={userRoleId}
        isAdmin={isAdmin}
        invenotyLabelUpdate={invenotyLabelUpdate}
         user_id={userid}
            handleDashboard={handleSideNext}
         handleNextPage={switchHandling}
        />;
      }
      else if(position === 6){
        return <SelectProduct  selectwarehouse={selectwarehouse}
           updateSelectProductArray={updateSelectProductArray}
           user_id={userid}
           isAdmin={isAdmin}
              handleDashboard={handleSideNext}
           shipmentId={shipmentId}
           packageDataSet={packageDataSet}
           handleNextPage={switchHandling}
           backButtonRouting={backButtonRouting}
        />;
      }else if(position === 8){
        return   <SelectCustome  selectwarehouse={selectwarehouse}
        updateSelectCustomeArray={updateSelectCustomeArray}
        user_id={userid}
        isAdmin={isAdmin}
           handleDashboard={handleSideNext}
        shipmentId={shipmentId}
        handleNextPage={switchHandling}
        backButtonRouting={backButtonRouting}
     />;
      }
      else if(position === 'sendInventoryPromotional'){
        return   <SelectPromotional  selectwarehouse={selectwarehouse}
        updateSelectCustomeArray={updateSelectPromotionalArray}
        user_id={userid}
        isAdmin={isAdmin}
           handleDashboard={handleSideNext}
        shipmentId={shipmentId}
        handleNextPage={switchHandling}
        backButtonRouting={backButtonRouting}
     />;
      }
      else if(position === 'selectCustomSubcription'){
        return   <SelectSubScriptionCustom  selectwarehouse={selectwarehouse}
        updateSelectCustomeArray={updateSelectCustomeArray1}
        user_id={userid}
        isAdmin={isAdmin}
        uuserdid={uuserdid}
           handleDashboard={handleSideNext}
        //shipmentId={shipmentId}
        editOrder={editSubscription}
        handleNextPage={switchHandling}
        backButtonRouting={backButtonRouting}
     />;
      }
      else if(position === 'selectPromotinalSubcription'){
        return   <SelectSubScriptionPromotional  selectwarehouse={selectwarehouse}
        updateSelectCustomeArray={updateSelectCustomeArray2}
        user_id={userid}
        isAdmin={isAdmin}
        uuserdid={uuserdid}
           handleDashboard={handleSideNext}
        //shipmentId={shipmentId}
        editOrder={editSubscription}
        handleNextPage={switchHandling}
        backButtonRouting={backButtonRouting}
     />;
      }
      else if(position === 'AddSubscriptionQty'){
        return   <SubscriptionQty
        //updateSelectCustomeArray={updateSelectCustomeArray2}
        user_id={userid}
        isAdmin={isAdmin}
           handleDashboard={handleSideNext}
        customeId={openPackageID1}
        promotionalID={openPackageID2}
        customeTypeId={openPackageTypeID1}
        promotionaTypeId={openPackageTypeID2}
        productIds={changedWarehouseid2}
        //shipmentId={shipmentId}
        editOrder={editSubscription}
        handleNextPage={switchHandling}
        backButtonRouting={backButtonRouting}
     />;
      }
      else if(position === 7){
        return  <ArrangeShipping
        openPackageTypeID={openPackageTypeID}
        openPackageID={openPackageID}
        isAdmin={isAdmin}
        handleNextPage={switchHandling}
        shipmentId={shipmentId}
        getSpecialRequestvalue={getSpecialRequestvalue}
        user_id={userid}
           handleDashboard={handleSideNext}
        backButtonRouting={backButtonRouting}
     />;
      }
      else if(position === 'SepacilaRequest'){
        return  <SepacilaRequest
        openPackageTypeID={openPackageTypeID}
        openPackageID={openPackageID}
        isAdmin={isAdmin}
        handleNextPage={switchHandling}
        shipmentId={shipmentId}
        shipmentId1={shipmentId1}
        valueofArrange={8}
        getSpecialRequestvalue={getSpecialRequestvalue}
        user_id={userid}
        updateShipmentId1={updateShipmentId1}
           handleDashboard={handleSideNext}
        backButtonRouting={backButtonRouting}
         saveback={saveback}
     />;
      }
      else if(position === 'SepacilaRequest9'){
        return  <SepacilaRequest
        openPackageTypeID={openPackageTypeID}
        openPackageID={openPackageID}
        isAdmin={isAdmin}
        handleNextPage={switchHandling}
        shipmentId={shipmentId}
        shipmentId1={shipmentId1}
        valueofArrange={9}
        updateShipmentId1={updateShipmentId1}
        getSpecialRequestvalue={getSpecialRequestvalue}
        user_id={userid}
           handleDashboard={handleSideNext}
        backButtonRouting={backButtonRouting}
     />;
      }
      else if(position === '8'){
return <ArrangeShip
openPackageTypeID={openPackageTypeID}
isAdmin={isAdmin}
openPromotionalTypeID={openPromotionalTypeID}
openPromotionalID={openPromotionalID}
        openPackageID={openPackageID}
requestRelatedTo={requestRelatedTo}
requestDescription={requestDescription}
selectwarehouse={selectwarehouse}
changedWarehouseid={changedWarehouseid}
shippedQuantity={shippedQuantity}
packagingQuantity={packagingQuantity}
promotionalQuantity={promotionalQuantity}
shipmentId={shipmentId}
shipmentId1={shipmentId1}
loginUserName={loginUserName}
user_id={userid}
upadteShipID={upadteShipID}
handleNextPage={switchHandling}
updateShipmentId={updateShipmentId}
backButtonRouting={backButtonRouting}
saveback={refreshsaveback}
inventoryLocation={inventoryLocation}
inventoryPackgingType={inventoryPackgingType}
inventoryShipemntType={inventoryShipemntType}
inventoryLabel={inventoryLabel}
/>;
      }else if(position === '9'){
        return <ArrangeShip2
        openPackageTypeID={openPackageTypeID}
        openPackageID={openPackageID}
        isAdmin={isAdmin}
        requestRelatedTo={requestRelatedTo}
requestDescription={requestDescription}
selectwarehouse={selectwarehouse}
changedWarehouseid={changedWarehouseid}
shippedQuantity={shippedQuantity}
promotionalQuantity={promotionalQuantity}
shipmentId={shipmentId}
shipmentId1={shipmentId1}
upadteShipID={upadteShipID}
packagingQuantity={packagingQuantity}
user_id={userid}
handleNextPage={switchHandling}
        updateShipmentId={updateShipmentId}
        backButtonRouting={backButtonRouting}
        saveback={refreshsaveback}
        inventoryLocation={inventoryLocation}
inventoryPackgingType={inventoryPackgingType}
inventoryShipemntType={inventoryShipemntType}
inventoryLabel={inventoryLabel}
        />;
      }
      else if(position === 1)
      {
        return <Dashboard2
        handleNextPage={handleNext}
        isAdmin={isAdmin}
        user_id={userid}
       handleDashboard={handleSideNext}
        />;

      }
      else if (position === "billing") {
        return (
          <PaymentMethod
            userRoleId={userRoleId}
            user_id={userid}
            isAdmin={isAdmin}
            updateHeaderTransaction={updateHeaderTransaction}
            handleDashboard={handleSideNext}
            handleeditcard={handleeditcard}
            handleNextPage={switchHandling}
            UpdatedCredit={fetchCurrentTotalamount} //Add credit change props item ///////////////////////////////////////////
          />
        );
      }

      else if(position === 'marketplaceSetting'){
        return <MarketPlaceIntegrationSetting
        userRoleId={userRoleId}
       user_id={userid}
       isAdmin={isAdmin}
      handleDashboard={handleSideNext}
       handleeditcard={handleeditcard}
       handleNextPage={switchHandling}
       />;
     }
     else if(position === 'imititate'){
      return <ImitiateSeller
      userRoleId={userRoleId}
     user_id={userid}
     isAdmin={isAdmin}
    handleDashboard={handleSideNext}
     handleeditcard={handleeditcard}
     navigation ={props.navigation}
     handleNextPage={switchHandling}
     />;
   }
     else if(position === 'historytransaction'){
      return <TransactionHistory
       editCard={editCard}
       user_id={userid}
          handleDashboard={handleSideNext}
          isAdmin={isAdmin}
       openSquareView={openSquareView}
       handleNextPage={switchHandling}
       transactionHeader={transactionHeader}
      />;
    }
      else if(position === 'PaymentRecieveSetting')
      {
        return <PaymentRecieveSetting
        user_id={userid}
        handleeditcard={handleeditcard}
        isAdmin={isAdmin}
        handleNextPage={switchHandling}/>;
      }
      else if(position === 'cardlistadd'){
        return <Payment
         editCard={editCard}
         user_id={userid}
            handleDashboard={handleSideNext}
            isAdmin={isAdmin}
         openSquareView={openSquareView}
         handleNextPage={switchHandling}
        />;

      }
      else if(position === 'squarepayment'){
        return <Square
         user_id={userid}
            handleDashboard={handleSideNext}
            isAdmin={isAdmin}
         handleNextPage={switchHandling}
        />;

      }
      else if(position === 'helpFormOpen'){
        return <Help
        handleNextPage={handleNextHelp}
        isAdmin={isAdmin}
        user_id={userid}
           handleDashboard={handleSideNext}
      />;
      }else if(position === '014'){
        return <Help
        handleNextPage={handleNextHelp}
        isAdmin={isAdmin}
        user_id={userid}
           handleDashboard={handleSideNext}
      />;
      }

      else if(position === '10'){
        return <RevieveInventory
        userRoleId={userRoleId}
        handleNextPage={handleNext}
        isAdmin={isAdmin}
        getShipmentIdFromShipment={getShipmentIdForInventory}
        user_id={userid}
           handleDashboard={handleSideNext}
        />;
        }

        else if(position === 'invoice'){
          return <Invoices
          userRoleId={userRoleId}
          isAdmin={isAdmin}
          handleNextPage={handleNext}
          user_id={userid}
          refreshUnpaid={refreshUnpaid}
          handleDashboard={handleSideNext}
          />;
          }
        else if(position === '14'){
          return <RevieveOrder
          userRoleId={userRoleId}
          isAdmin={isAdmin}
          handleNextPage={handleNext}
          getInternalOrderId={getInternalOrderId}
          user_id={userid}
          getEditOrderData={getEditOrderData}
             handleDashboard={handleSideNext}
          />;
          }else if(position === '140'){
            return <ReceiveOrderListCanada
          userRoleId={userRoleId}
          isAdmin={isAdmin}
          handleNextPage={handleNext}
          getInternalOrderId={getInternalOrderIdCanada}
          user_id={userid}
          getEditOrderData={getEditOrderData}
             handleDashboard={handleSideNext}
          />;
          }
          else if(position === '15'){
            return <RevieveReturnOrder
            userRoleId={userRoleId}
            isAdmin={isAdmin}
            handleNextPage={handleNext}
            switchHandling={switchHandling12}
            getInternalOrderId={getInternalReturnOrderId}
            user_id={userid}
            getEditOrderData={getEditOrderData}
               handleDashboard={handleSideNext}
            />;
            }
            else if(position === 'selected_order_details'){
            return <SelectedOrderDetails
          backButtonRouting={backButtonRouting}
          internalorder_id={internalorderid}
          isAdmin={isAdmin}
          user_id={userid}
             handleDashboard={handleSideNext}
          />;

          }
          else if(position === 'selected_order_details_canada'){
            return <SelectedOrderDetailsCanada
          backButtonRouting={backButtonRouting}
          internalorder_id={internalorderid}
          isAdmin={isAdmin}
          user_id={userid}
             handleDashboard={handleSideNext}
          />;

          }
          else if(position === 'selected_order_details_seller'){
            return <SelectedReturnOrderDetailsSeller
          backButtonRouting={backButtonRouting}
          internalorder_id={internalorderid}
          isAdmin={isAdmin}
          user_id={userid}
             handleDashboard={handleSideNext}
          />;

          }
          else if(position === 'selected_return_order_details'){
            return <SelectedReturnOrderDetails
          backButtonRouting={backButtonRouting}
          internalorder_id={inetalOrderData}
          isAdmin={isAdmin}
          user_id={userid}
             handleDashboard={handleSideNext}
          />;

          }
          else if(position === 'selected_order_detailsforSellerData'){
            return <SelectedOrderDetailsForSeller
          backButtonRouting={backButtonRouting}
          internalorder_id={internalorderid}
          isAdmin={isAdmin}
          user_id={userid}
             handleDashboard={handleSideNext}
          />;

          }

        else if(position === 'ProductInfo'){
          return <ReceiveProduct
          handleNextPage={handleAllShipment}
          shipmentIdProduct={shipmentIdProduct}
          isAdmin={isAdmin}

          user_id={userid}
             handleDashboard={handleSideNext}
          />;
          }

          else if(position === 'SendInventoryDetails'){
            return <SendInventoryDetails
            handleNextPage={handleAllShipment}
            shipmentIdProduct={shipmentIdProduct}
            isAdmin={isAdmin}
  
            user_id={userid}
               handleDashboard={handleSideNext}
            />;
            }

     else if(position === 'allsettings'){
          return <AllSettings
             handleNextPage={handleNext}
             user_id={userid}
             policyData={policyData}
             policyDataId={policyDataId}
             shipData={shipData}
                handleDashboard={handleSideNext}
             isAdmin={isAdmin}
              settingId={settingId}
          />
        }

      else
       if(position === '03'){
        return <ReturnOrder
        userRoleId={userRoleId}
        updateOrderDataState={updateOrderDataState}
        switchHandling={switchHandling12}
        handleNextPage={handleNext}
        openSellerRetunrOrderDetails={openSellerRetunrOrderDetails}
        isAdmin={isAdmin}
        getEditOrderData={getEditOrderData}
        user_id={userid}
           handleDashboard={handleSideNext}
        />;
      }else if(position === 'select_transfer_inventory'){

        return <TransferInventory
        userRoleId={userRoleId}
        handleNextPage={switchHandling}
        isAdmin={isAdmin}
        backButtonRouting={backButtonRouting}
        getShipmentIdFromShipment={getShipmentIdForInventory}
        user_id={userid}

   packageDataPro={packageDataPro1}
   promotionalData={promotionalData}
           handleDashboard={handleSideNext}
        fromWarehouseIdInventory={fromWarehouseIdInventory}
        toWarehouseIdInventory={toWarehouseIdInventory}
        />;
        }
        else if(position === 'select_tranfer_inventoryCustome'){

          return <TransferInventoryCustome
          userRoleId={userRoleId}
          handleNextPage={switchHandling}
          isAdmin={isAdmin}
          backButtonRouting={backButtonRouting}
          getShipmentIdFromShipment={getShipmentIdForInventory}
          user_id={userid}


             handleDashboard={handleSideNext}
          fromWarehouseIdInventory={fromWarehouseIdInventory}
          toWarehouseIdInventory={toWarehouseIdInventory}
          />;
          }

          else if(position === 'select_tranfer_inventoryPromoyinal'){

            return <TransferInventoryPromotional
            userRoleId={userRoleId}
            handleNextPage={switchHandling}
            isAdmin={isAdmin}
            backButtonRouting={backButtonRouting}
            getShipmentIdFromShipment={getShipmentIdForInventory}
            user_id={userid}


               handleDashboard={handleSideNext}
            fromWarehouseIdInventory={fromWarehouseIdInventory}
            toWarehouseIdInventory={toWarehouseIdInventory}
            />;
            }

          else if(position === '11'){
          return <CreateOrChangeWarehouse
           user_id={userid}
              handleDashboard={handleSideNext}
        userRoleId={userRoleId}
        handleNextPage={switchHandling}
        isAdmin={isAdmin}
        user_id={userid}
           handleDashboard={handleSideNext}
        updateInventoryWarehouse={updateInventoryWarehouse}
          />
        }
      else if(position === "1"){
        return <OrderSetting
        handleNextPage={handleNext}
        user_id={userid}

        isAdmin={isAdmin}
           handleDashboard={handleSideNext}
        />;
		}
		 else if(position === "transfer_credit"){
        return <TransferCredit
        handleNextPage={handleNext}
        isAdmin={isAdmin}
        user_id={userid}
           handleDashboard={handleSideNext}
        />;
      } else if (position === "add_credit") {
        return (
          <PaymentMethod
            userRoleId={userRoleId}
            user_id={userid}
            isAdmin={isAdmin}
            updateHeaderTransaction={updateHeaderTransaction}
            handleDashboard={handleSideNext}
            handleeditcard={handleeditcard}
            handleNextPage={switchHandling}
            UpdatedCredit={fetchCurrentTotalamount} //Add credit change props item ///////////////////////////////////////////
          />
        );
      } else if (position === "credit") {
        return (
          <Credit
            userRoleId={userRoleId}
            user_id={userid}
            isAdmin={isAdmin}
            updateHeaderTransaction={updateHeaderTransaction}
            handleDashboard={handleSideNext}
            handleeditcard={handleeditcard}
            handleNextPage={switchHandling}
          />
        );
       } else{
        return <Dashboard
        code={code}
        openMarketPlace={openMarketPlace}
        userRoleId={userRoleId}
        handleNextPage={handleNext}
        handleOrderPage={handleSideNext}
        isAdmin={isAdmin}
        handleNextOption={handleSideNext}
        handleNextOptionSetting1={handleNextOptionSetting}
        user_id={userid}
           handleDashboard={handleSideNext}
        handleOrder={handleSideNext}
       />;
      }
    }
    /**
     * Created by:React team
     * Use: when user select any drawer item get position from drawer list and open component
     * Created date: 2020/03/19
     */

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const handletopImiate = () => {
      localStorage.storeData("userName",'Waleed Shahzad');
      window.sessionStorage.setItem("userName",'Waleed Shahzad');
  
  // localStorage.storeData("code",props.code);
  // window.sessionStorage.setItem("code", props.code);
  var fruits =[];
  
            window.sessionStorage.setItem('dataItem', JSON.stringify(fruits));
            localStorage.storeData("userid", 1);
            
            window.sessionStorage.setItem("userid", 1);
            AsyncStorage.setItem(
              "userid",
              JSON.stringify(1)
            );
  
            localStorage.storeData("imitate", false);
            
            window.sessionStorage.setItem("imitate", false);
            AsyncStorage.setItem(
              "imitate",
              JSON.stringify(false)
            );
  
  localStorage.storeData("roleId",1);
  window.sessionStorage.setItem("roleId",1);
  
  localStorage.storeData("isadmin",true);
  window.sessionStorage.setItem("isadmin", true);
  //handleSideNext('01');
  props.navigation.push('Overview',{position:'01'});
  // setPosition('01');
  // props.navigation.navigate('Overview',{position:'01'});
        
        }; 



    return (
      <View className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute" elevation={0} className={clsx(classes.appBar, open && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              //edge="start"
              color="primary"
              justifyContent="center"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, open && classes.menuButtonHidden)} >
              <MenuIcon />
            </IconButton>
            <Typography component="h4" variant="h6" color="inherit" noWrap className={classes.title}>
          <Grid container lg={9}>
            <View className={classes.search}>
            <View className={classes.searchIcon}>
              {/* <SearchIcon /> */}
            </View>
            <InputBase
            disabled={true}
              //placeholder='Search for Orders, Products, Customers or something else...'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </View>
          </Grid>

            </Typography>

            {(() => {
  if(imitate===true)
  {
    return(
      <View
      style={{
        width: 100,
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
      }}
         >
      {/* <Text style={[popUpStyle.creditTitle,{textAlign: 'center'}]}>CREDIT </Text> */}
  
      <Text
        onPress={() => {
          handletopImiate();
        }}
        style={[popUpStyle.addcredittext,{marginTop: "1px",}]}
      >
        Stop Imitate{" "}
      </Text>
      </View>
    )
  }
  
        


})()}
	   	   
   {(() => {
if(isAdmin === true){
  return(
    <View
    style={{
      width: 100,
      justifyContent: "center",
      textAlign: "center",
      alignItems: "center",
    }}
       >
    <Text style={[popUpStyle.creditTitle,{textAlign: 'center'}]}>CREDIT </Text>

    <Text
      onPress={() => {
        handleSideNext("add_credit");
      }}
      style={[popUpStyle.addcredittext,{marginTop: "2px",}]}
    >
      Add Credit{" "}
    </Text>
    </View>
  )
        

}
})()}
             {(() => {
if(isAdmin === true){
  return(
     <View
              style={{
                flexDirection: "row",
                 justifyContent: "space-between",
                alignItems: "center",
              }}
            >

              <Typography
                component="h4"
                variant="h6"
                color="inherit"
                className={classes.inputRoot}
                style={{ flexDirection: "colomn" }}
              >
                <View style={{ width: 150 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={popUpStyle.creditmenutitle}>Available </Text>

                    {currentavaliableamount ?
                              <Text style={popUpStyle.creditmenutitle}>${currentavaliableamount} USD </Text>
                          :
                             <Text style={popUpStyle.creditmenutitle}>$0.00 USD </Text>
                     }

                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={popUpStyle.creditmenutitle}>Unpaid </Text>
                    {currentunpaidamount ?
                              <Text style={popUpStyle.creditmenutitle}>${currentunpaidamount} USD </Text>
                          :
                              <Text style={popUpStyle.creditmenutitle}>$0.00 USD </Text>
                     }

                  </View>
                </View>
              </Typography>


            </View>
             )
        

            }
            })()}
                    
	                 <Tooltip title="Help Center">
            <IconButton color="black" size="small">
              <Badge badgeContent={0} color="inherit" >
                <HelpOutlineIcon style={{height:25,width:25}} onClick={helpFormOpen}/>
              </Badge>

            </IconButton>
            </Tooltip>





        <Tooltip title="Settings">
            <IconButton color="black" variant="contained"  onClick={()=>{setAllOpenSettingTab1()}} size="small">
              <Badge badgeContent={0} color="inherit" >
                <SettingsOutlinedIcon style={{height:25,width:25}} onClick={()=>{setAllOpenSettingTab1()}} />
              </Badge>

            </IconButton>
            </Tooltip>






    <PopupState variant="popover" popupId="demo-popup-popover">
      {popupState => (
        <View>

        {/* <Tooltip title="Notifications">
            <IconButton color="black"  variant="contained"  {...bindTrigger(popupState)} size="small">
              <Badge badgeContent={notificationdata.length}>
                <NotificationsNoneOutlinedIcon style={{height:30,width:30}}/>
              </Badge>

            </IconButton>
            </Tooltip>  */}

          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }} >
           <Grid>
            <Typography ><Text style={{fontSize: '14px',marginLeft:'18px',
            fontWeight: '700',
            fontFamily: 'Neurial Grotesk", Roboto, system, -apple-system, BlinkMacSystemFont, ".SFNSDisplay-Regular", "Helvetica Neue", Helvetica, Arial, sans-serif',}}>Notifications</Text> </Typography>
 <Box m={0}>
            <List>

            {notificationdata.map(data => (

              <ListItem alignItems="flex-start">
        <ListItemText
          primary={<Text style={{fontSize: '13px',
            //fontWeight: '700',
            fontFamily: 'Neurial Grotesk", Roboto, system, -apple-system, BlinkMacSystemFont, ".SFNSDisplay-Regular", "Helvetica Neue", Helvetica, Arial, sans-serif',}}>{data.title}</Text>}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                color="textPrimary"
              >
               {data.from}-
              </Typography>
              {data.description}
            </React.Fragment>
          }

       >
       </ListItemText>

      </ListItem>


            ))}

            </List>
            </Box>
            </Grid>

          </Popover>

        </View>
      )}
    </PopupState>
    <PopupState variant="popover" popupId="demo-popup-popover">
      {popupState => (
        <View>
          <IconButton color="primary" variant="contained" color="primary" {...bindTrigger(popupState)} size="small">

             <Text className={classes.dropDownIcon} style={{fontSize:'13px',fontWeight:'bold'}}>Welcome, {loginUserName}!</Text>
               <ExpandMoreIcon/>
                </IconButton>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }} >
            <Box p={2}>
            {/* <Typography >
                 <IconButton size="small">
                <TvOutlinedIcon />
            </IconButton>
           System Setting</Typography> */}
             {/* <Text className={classes.dropDownIconHover}  onClick={()=>{setAllOpenSettingTab1(popupState)}}>
          <BootstrapButton    onClick={()=>{setAllOpenSettingTab1(popupState)}} startIcon={<SettingsOutlinedIcon style={popUpStyle.iconHeight} />}>Settings</BootstrapButton>{'\n'}</Text>
           */}

{ (isAdmin === true ?    <Text className={classes.dropDownIconHover}  onClick={()=>{billingSettingOpen1(popupState)}}>
            <BootstrapButton    onClick={()=>{billingSettingOpen1(popupState)}} startIcon={<CreditCardOutlinedIcon style={popUpStyle.iconHeight}/>}>Billing</BootstrapButton>{'\n'}</Text>: '' )}

            { (isAdmin === true ? <Text className={classes.dropDownIconHover}  onClick={()=>{billingSettingOpeninvoice(popupState)}}>
            <BootstrapButton    onClick={()=>{billingSettingOpeninvoice(popupState)}} startIcon={<CreditCardOutlinedIcon style={popUpStyle.iconHeight}/>}>Charge Customer</BootstrapButton>{'\n'}</Text> : '' )}


         <Text className={classes.dropDownIconHover} onClick={()=>{handleSideeNext('015',popupState)}} >
         <BootstrapButton   onClick={()=>{handleSideeNext('015',popupState)}}  startIcon={<LibraryAddOutlinedIcon style={popUpStyle.iconHeight}/>}>Affiliate Program</BootstrapButton>
         {'\n'}</Text>
         { (isAdmin === true ?    <Text className={classes.dropDownIconHover}  onClick={()=>{setopenImitiate(popupState)}}>
            <BootstrapButton    onClick={()=>{setopenImitiate(popupState)}} startIcon={<CreditCardOutlinedIcon style={popUpStyle.iconHeight}/>}>Imitate</BootstrapButton>{'\n'}</Text>: '' )}
            { (isAdmin === true ? <Text className={classes.dropDownIconHover} onClick={()=>{openFeedbackScreen(popupState)}}>
            <BootstrapButton    onClick={()=>{openFeedbackScreen(popupState)}} startIcon={<FeedbackIcon style={popUpStyle.iconHeight} />}>Feedback</BootstrapButton>{'\n'}</Text> : <Text className={classes.dropDownIconHover} onClick={()=>{openFeedbackPopup(popupState)}}>
            <BootstrapButton    onClick={()=>{openFeedbackPopup(popupState)}} startIcon={<FeedbackIcon style={popUpStyle.iconHeight} />}>Feedback</BootstrapButton>{'\n'}</Text>)}
           
            
            
            <Text className={classes.dropDownIconHover} onClick={()=>{logout()}}>
            <BootstrapButton1    onClick={()=>{logout()}} startIcon={<PowerSettingsNewOutlinedIcon style={popUpStyle.iconHeight} />}>Sign Out</BootstrapButton1></Text>
           

            </Box>
          </Popover>

        </View>
      )}
    </PopupState>
      </Toolbar>
        </AppBar>

        {showToast(toast,msg,type)}
                    <View style={{flex: 1, flexDirection: 'row'}}>
                    <View   className={ clsx(!open && drawerWidthClosed, open && drawerWidthOpen)} >

                    <Drawer
                      variant="permanent"
                      classes={{
                        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                      }}
                      open={open}
                    >

                      <View className={classes.paperlogo}>
                      <Grid  justify="space-between" // Add it here :)
      container
      spacing={24} style={{marginTop:'7px'}} >
        <Grid item >
        {(() => {
               if (open === true){
                   return (
                     <Button  onClick={()=>{handleSideNext('01')}}>
                       <Image style={{ width: dimens.logoWidth, height: dimens.logoHeight}} source={logo}  />
                     </Button>

                     )
                 }
               })()}

            </Grid>
            <Grid item >
            <IconButton onClick={handleDrawerClose}>
                          <MenuIcon />
                        </IconButton>
                        </Grid>
                        </Grid>
            </View>
                      {/* <View className={classes.toolbarIcon}>

                      </View> */}
                      <Divider style={{marginTop:'5px'}} />



            {/* above list is always show default one dash board module */}
            <List style={{paddingBottom:'0px'}} >
                       <ListItem  alignItems="flex-start" style={{padding : '0px'}} onClick={()=>{openProjectManagementScreen(0)}} >
                       <ListItemText style={popUpStyle.Icons12} >

               {(() => {
               if (open === true){
                   return (
                     <Text className={ clsx(!open && classes.toolbarIconClose1, open && classes.toolbarIconOpen1)}>
                    DASHBOARD
                     </Text>
                     )
                 }
                 else{
                   return(
                     <hr  style={popUpStyle.hrStyle}/>
                   )
                 }
               })()}
                {/* <ListItemText style={{fontSize:'5px'}} className={classes.toolbarIcon1}  alignItems="flex-start" > */}


                       </ListItemText>
                       </ListItem>
                       </List>
                      <List >



                      {(() => {
if(isAdmin === false){
  return( <Text>
                       {dashboardMenu2.map(data => (

                       <ListItem  alignItems="flex-start" style={{padding : '0px'}} button key={data.modulename} onClick={()=>{handleSideNext(data.moduleid)}}  >

                       <StyledListItemText style={popUpStyle.Icons1} >
                       {(() => {

                  return (

                    <Text style={{marginLeft:'0px',alignItems:'baseline'}}>
                   {/* {data.moduleid === 0 ? <DashboardOutlinedIcon/> : <ShoppingCartIcon/>} */}
                   {(() => {
                   if(data.moduleid === '01')
                   {
                     if(position==='01')
                     {
                      return (

                         <DashboardIcon style={popUpStyle.drawerIcon}/>

                       )
                     }
                    //  else if(position==='billing')
                    //  {
                    //   return (
                    //     <DashboardIcon style={popUpStyle.drawerIcon}/>
                    //    )
                    //  }
                     else if(position===1)
                     {
                      return (
                        <DashboardIcon style={popUpStyle.drawerIcon}/>
                       )
                     }
                     else{
                      return (
                        <DashboardOutlinedIcon style={popUpStyle.drawerIcon1}/>
                       )
                     }

                   }else if(data.moduleid === '02'){
                    if(position==='02')
                    {
                     return (
                      <AddShoppingCartOutlinedIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else if(position==='selectWarehouseOrder')
                    {
                      return (
                        <AddShoppingCartOutlinedIcon style={popUpStyle.drawerIcon}/>
                       )
                    }
                    else if(position==='selected_order_detailsforSellerData')
                    {
                      return (
                        <AddShoppingCartOutlinedIcon style={popUpStyle.drawerIcon}/>
                       )
                    }
                   else if(position==='select_order_type')
    {
      return (
        <AddShoppingCartOutlinedIcon style={popUpStyle.drawerIcon}/>
       )
    }
    else if(position==='UploadOrderSheet')
    {
      return (
        <AddShoppingCartOutlinedIcon style={popUpStyle.drawerIcon}/>
       )
    }
    else if(position==='additional_order_options')
    {
      return (
        <AddShoppingCartOutlinedIcon style={popUpStyle.drawerIcon}/>
       )
    }
   else  if(position==='select_ship_type')
   {
    return (
      <AddShoppingCartOutlinedIcon style={popUpStyle.drawerIcon}/>
     )
   }
   else  if(position==='ShippingPolicyOrder')
   {
    return (
      <AddShoppingCartOutlinedIcon style={popUpStyle.drawerIcon}/>
     )
   }
   else  if(position==='select_customer_kind')
   {
    return (
      <AddShoppingCartOutlinedIcon style={popUpStyle.drawerIcon}/>
     )
   }else if (
                                        position === "SelectOrderMainScreen"
                                      ) {
                                        return (
                                          <AddShoppingCartOutlinedIcon
                                            style={popUpStyle.drawerIcon}
                                          />
                                        );
                                      }
   else  if(position==='select_Order_Product')
   {
    return (
      <AddShoppingCartOutlinedIcon style={popUpStyle.drawerIcon}/>
     )
   }
   else  if(position==='orderSelectPromotional')
   {
    return (
      <AddShoppingCartOutlinedIcon style={popUpStyle.drawerIcon}/>
     )
   }
   else  if(position==='orderSelectCustom')
   {
    return (
      <AddShoppingCartOutlinedIcon style={popUpStyle.drawerIcon}/>
     )
   }
   else  if(position==='manual_order')
   {
    return (
      <AddShoppingCartOutlinedIcon style={popUpStyle.drawerIcon}/>
     )
   }
   else  if(position==='importOrderfetchShopify')
   {
    return (
      <AddShoppingCartOutlinedIcon style={popUpStyle.drawerIcon}/>
     )
   }
   else  if(position==='importOrderShopify')
   {
    return (
      <AddShoppingCartOutlinedIcon style={popUpStyle.drawerIcon}/>
     )
   }

                    else{
                     return (
                      <AddShoppingCartOutlinedIcon style={popUpStyle.drawerIcon1}/>
                      )
                    }
                   }else if(data.moduleid === '03'){
                    if(position==='03')
                    {
                     return (
                      <RemoveShoppingCartIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else{
                     return (
                      <RemoveShoppingCartOutlinedIcon style={popUpStyle.drawerIcon1}/>
                      )
                    }
                   }else if(data.moduleid === '04'){
                    if(position==='04')
                    {
                     return (
                      <RecentActorsIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else if(position==='AddCustomerManually')
                    {
                      return (
                        <RecentActorsIcon style={popUpStyle.drawerIcon}/>
                        )
                    }
                    else{
                     return (
                      <RecentActorsOutlinedIcon style={popUpStyle.drawerIcon1}/>
                      )
                    }
                   }else if(data.moduleid === '05'){
                    if(position==='05')
                    {
                     return (
                      <SettingsIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else if(position==='AddProductManually')
                    {
                      return (
                        <SettingsIcon style={popUpStyle.drawerIcon}/>
                        )
                    }
                    else{
                     return (
                      <SettingsOutlinedIcon style={popUpStyle.drawerIcon1}/>
                      )
                    }
                   }
                   else if(data.moduleid === '14'){
                    if(position==='14')
                    {
                     return (
                      <LibraryAddCheckIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else if(position==='selected_order_details')
                    {
                     return (
                      <LibraryAddCheckIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else{
                     return (
                      <LibraryAddCheckOutlinedIcon style={popUpStyle.drawerIcon1}/>
                      )
                    }
                   }
                   else if(data.moduleid === '15'){
                    if(position==='15')
                    {
                     return (
                      <LibraryAddCheckIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else if(position==='selected_return_order_details')
                    {
                     return (
                      <LibraryAddCheckIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else if(position==='selectReturnWarehouseOrder')
                    {
                     return (
                      <LibraryAddCheckIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else if(position==='SelectCarrierTrackingDate')
                    {
                     return (
                      <LibraryAddCheckIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else if(position==='SelectReturnProduct')
                    {
                     return (
                      <LibraryAddCheckIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else if(position==='SelectReturnOrderMainScreen')
                    {
                     return (
                      <LibraryAddCheckIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else if(position==='select_Seller')
                    {
                     return (
                      <LibraryAddCheckIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else{
                     return (
                      <LibraryAddCheckOutlinedIcon style={popUpStyle.drawerIcon1}/>
                      )
                    }
                   }

                   else{
                    return (
                    <DashboardOutlinedIcon style={popUpStyle.drawerIcon1}/>
                    )
                   }
                  })()}



                    </Text>

                    )

              })()}

               {(() => {
               if (open === true){
                   return (
                     <Text   className={ clsx(!open && classes.toolbarIconClose, open && classes.toolbarIconOpen)}>
                  {(() => {
                   if(data.moduleid === '01')
                   {
                     if(position==='01')
                     {
                      return (
                        <Text style={popUpStyle.drawerFont}>{data.modulename}

      </Text>
                       )
                     }

                     else if(position===1)
                     {
                      return (
                             <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                       )
                     }
                     else{
                      return (
                        <Text style={popUpStyle.drawerFont1}>{data.modulename}</Text>
                       )
                     }

                   }else if(data.moduleid === '02'){
                    if(position==='02')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else if(position==='selectWarehouseOrder')
                    {
                      return (
                             <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                       )
                    }
                    else if(position==='selected_order_detailsforSellerData')
                    {
                      return (
                             <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                       )
                    }
                   else if(position==='select_order_type')
    {
      return (
             <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

       )
    }
    else if(position==='UploadOrderSheet')
    {
      return (
             <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

       )
    }
    else if(position==='additional_order_options')
    {
      return (
             <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

       )
    }
   else  if(position==='select_ship_type')
   {
    return (
           <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

     )
   }
   else  if(position==='ShippingPolicyOrder')
   {
    return (
           <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

     )
   }
   else  if(position==='select_customer_kind')
   {
    return (
           <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

     )
   }else if (
                                        position === "SelectOrderMainScreen"
                                      ) {
                                        return (
                                          <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>
                                        );
                                      }
   else  if(position==='select_Order_Product')
   {
    return (
           <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

     )
   }
   else  if(position==='orderSelectPromotional')
   {
    return (
           <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

     )
   }
   else  if(position==='orderSelectCustom')
   {
    return (
           <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

     )
   }
   else  if(position==='manual_order')
   {
    return (
           <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

     )
   }
   else  if(position==='importOrderfetchShopify')
   {
    return (
           <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

     )
   }
   else  if(position==='importOrderShopify')
   {
    return (
           <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

     )
   }
                    else{
                     return (
                    <Text style={popUpStyle.drawerFont1}>{data.modulename}</Text>

                      )
                    }
                   }else if(data.moduleid === '03'){
                    if(position==='03')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else{
                     return (
                    <Text style={popUpStyle.drawerFont1}>{data.modulename}</Text>

                      )
                    }
                   }else if(data.moduleid === '04'){
                    if(position==='04')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else if(position==='AddCustomerManually')
                    {
                      return (
                        <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>
                        )
                    }
                    else{
                     return (
                    <Text style={popUpStyle.drawerFont1}>{data.modulename}</Text>

                      )
                    }
                   }else if(data.moduleid === '05'){
                    if(position==='05')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else if(position==='AddProductManually')
                    {
                      return (
                        <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                        )
                    }
                    else{
                     return (
                    <Text style={popUpStyle.drawerFont1}>{data.modulename}</Text>

                      )
                    }
                   }
                   else if(data.moduleid === '14'){
                    if(position==='14')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else if(position==='selected_order_details')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else{
                     return (
                    <Text style={popUpStyle.drawerFont1}>{data.modulename}</Text>

                      )
                    }
                   }

                   else if(data.moduleid === '15'){
                    if(position==='15')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else if(position==='selected_return_order_details')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else if(position==='select_Seller')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else if(position==='SelectReturnOrderMainScreen')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else if(position==='SelectReturnProduct')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else if(position==='SelectCarrierTrackingDate')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else if(position==='selectReturnWarehouseOrder')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else{
                     return (
                    <Text style={popUpStyle.drawerFont1}>{data.modulename}</Text>

                      )
                    }
                   }

                   else{
                    return (
                    <DashboardOutlinedIcon/>
                    )
                   }
                  })()}

                     </Text>
                     )
                 }
               })()}
                {/* <ListItemText style={{fontSize:'5px'}} className={classes.toolbarIcon1}  alignItems="flex-start" > */}


                       </StyledListItemText>
                       </ListItem>
                         ))}
                         </Text>)

                                     }
                                     else{
                                      return( <Text>
                                        {dashboardMenu.map(data => (

                                        <ListItem  alignItems="flex-start" style={{padding : '0px'}} button key={data.modulename} onClick={()=>{handleSideNext(data.moduleid)}}  >

                                        <StyledListItemText style={popUpStyle.Icons1} >
                                        {(() => {

                                   return (

                                     <Text style={{marginLeft:'0px',alignItems:'baseline'}}>
                                    {/* {data.moduleid === 0 ? <DashboardOutlinedIcon/> : <ShoppingCartIcon/>} */}
                                    {(() => {
                   if(data.moduleid === '01')
                   {
                     if(position==='01')
                     {
                      return (
                        <DashboardIcon style={popUpStyle.drawerIcon}/>
                       )
                     }
                    //  else if(position==='billing')
                    //  {
                    //   return (
                    //     <DashboardIcon style={popUpStyle.drawerIcon}/>
                    //    )
                    //  }
                     else if(position===1)
                     {
                      return (
                        <DashboardIcon style={popUpStyle.drawerIcon}/>
                       )
                     }
                     else{
                      return (
                        <DashboardOutlinedIcon style={popUpStyle.drawerIcon1}/>
                       )
                     }

                   }else if(data.moduleid === '02'){
                    if(position==='02')
                    {
                     return (
                      <AddShoppingCartOutlinedIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else if(position==='selectWarehouseOrder')
                    {
                      return (
                        <AddShoppingCartOutlinedIcon style={popUpStyle.drawerIcon}/>
                       )
                    }
                    else if(position==='selected_order_detailsforSellerData')
                    {
                      return (
                        <AddShoppingCartOutlinedIcon style={popUpStyle.drawerIcon}/>
                       )
                    }
                   else if(position==='select_order_type')
    {
      return (
        <AddShoppingCartOutlinedIcon style={popUpStyle.drawerIcon}/>
       )
    }
    else if(position==='UploadOrderSheet')
    {
      return (
        <AddShoppingCartOutlinedIcon style={popUpStyle.drawerIcon}/>
       )
    }
    else if(position==='additional_order_options')
    {
      return (
        <AddShoppingCartOutlinedIcon style={popUpStyle.drawerIcon}/>
       )
    }
   else  if(position==='select_ship_type')
   {
    return (
      <AddShoppingCartOutlinedIcon style={popUpStyle.drawerIcon}/>
     )
   }
   else  if(position==='ShippingPolicyOrder')
   {
    return (
      <AddShoppingCartOutlinedIcon style={popUpStyle.drawerIcon}/>
     )
   }
   else  if(position==='select_customer_kind')
   {
    return (
      <AddShoppingCartOutlinedIcon style={popUpStyle.drawerIcon}/>
     )
   }else if (
                                          position === "SelectOrderMainScreen"
                                        ) {
                                          return (
                                            <AddShoppingCartOutlinedIcon style={popUpStyle.drawerIcon}/>
                                          );
                                        }
   else  if(position==='select_Order_Product')
   {
    return (
      <AddShoppingCartOutlinedIcon style={popUpStyle.drawerIcon}/>
     )
   }
   else  if(position==='orderSelectPromotional')
   {
    return (
      <AddShoppingCartOutlinedIcon style={popUpStyle.drawerIcon}/>
     )
   }
   else  if(position==='orderSelectCustom')
   {
    return (
      <AddShoppingCartOutlinedIcon style={popUpStyle.drawerIcon}/>
     )
   }

   else  if(position==='manual_order')
   {
    return (
      <AddShoppingCartOutlinedIcon style={popUpStyle.drawerIcon}/>
     )
   }
   else  if(position==='importOrderfetchShopify')
   {
    return (
      <AddShoppingCartOutlinedIcon style={popUpStyle.drawerIcon}/>
     )
   }
   else  if(position==='importOrderShopify')
   {
    return (
      <AddShoppingCartOutlinedIcon style={popUpStyle.drawerIcon}/>
     )
   }
                    else{
                     return (
                      <AddShoppingCartOutlinedIcon style={popUpStyle.drawerIcon1}/>
                      )
                    }
                   }else if(data.moduleid === '03'){
                    if(position==='03')
                    {
                     return (
                      <RemoveShoppingCartIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else{
                     return (
                      <RemoveShoppingCartOutlinedIcon style={popUpStyle.drawerIcon1}/>
                      )
                    }
                   }else if(data.moduleid === '04'){
                    if(position==='04')
                    {
                     return (
                      <RecentActorsIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else if(position==='AddCustomerManually')
                    {
                      return (
                        <RecentActorsIcon style={popUpStyle.drawerIcon}/>
                        )
                    }
                    else{
                     return (
                      <RecentActorsOutlinedIcon style={popUpStyle.drawerIcon1}/>
                      )
                    }
                   }else if(data.moduleid === '05'){
                    if(position==='05')
                    {
                     return (
                      <SettingsIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else if(position==='AddProductManually')
                    {
                      return (
                        <SettingsIcon style={popUpStyle.drawerIcon}/>

                        )
                    }
                    else{
                     return (
                      <SettingsOutlinedIcon style={popUpStyle.drawerIcon1}/>
                      )
                    }
                   }
                   else if(data.moduleid === '14'){
                    if(position==='14')
                    {
                     return (
                      <LibraryAddCheckIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else  if(position==='selected_order_details')
                    {
                     return (
                      <LibraryAddCheckIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else{
                     return (
                      <LibraryAddCheckOutlinedIcon style={popUpStyle.drawerIcon1}/>
                      )
                    }
                   }
                   else if(data.moduleid === '140'){
                    if(position==='140')
                    {
                     return (
                      <LibraryAddCheckIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else  if(position==='selected_order_details_canada')
                    {
                     return (
                      <LibraryAddCheckIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else{
                     return (
                      <LibraryAddCheckOutlinedIcon style={popUpStyle.drawerIcon1}/>
                      )
                    }
                   }

                   else if(data.moduleid === '15'){
                    if(position==='15')
                    {
                     return (
                      <LibraryAddCheckIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else  if(position==='selected_return_order_details')
                    {
                     return (
                      <LibraryAddCheckIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else  if(position==='selectReturnWarehouseOrder')
                    {
                     return (
                      <LibraryAddCheckIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else  if(position==='SelectCarrierTrackingDate')
                    {
                     return (
                      <LibraryAddCheckIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else  if(position==='SelectReturnProduct')
                    {
                     return (
                      <LibraryAddCheckIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else  if(position==='SelectReturnOrderMainScreen')
                    {
                     return (
                      <LibraryAddCheckIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else  if(position==='select_Seller')
                    {
                     return (
                      <LibraryAddCheckIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else{
                     return (
                      <LibraryAddCheckOutlinedIcon style={popUpStyle.drawerIcon1}/>
                      )
                    }
                   }


                   else{
                    return (
                    <DashboardOutlinedIcon/>
                    )
                   }
                  })()}
                                     </Text>

                                     )

                               })()}

                                {(() => {
                                if (open === true){
                                    return (
                                      <Text   className={ clsx(!open && classes.toolbarIconClose, open && classes.toolbarIconOpen)}>
                                   {(() => {
                   if(data.moduleid === '01')
                   {
                     if(position==='01')
                     {
                      return (
                             <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                       )
                     }

                     else if(position===1)
                     {
                      return (
                             <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                       )
                     }
                     else{
                      return (
                     <Text style={popUpStyle.drawerFont1}>{data.modulename}</Text>

                       )
                     }

                   }else if(data.moduleid === '02'){
                    if(position==='02')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else     if(position==='selectWarehouseOrder')
                    {
                      return (
                             <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                       )
                    }
                    else if(position==='selected_order_detailsforSellerData')
                    {
                      return (
                             <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                       )
                    }
                    else     if(position==='select_order_type')
                    {
                      return (
                             <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                       )
                    }
                    else     if(position==='UploadOrderSheet')
                    {
                      return (
                             <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                       )
                    }
                    else if(position==='additional_order_options')
                    {
                      return (
                             <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                       )
                    }
                   else  if(position==='select_ship_type')
                   {
                    return (
                           <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                     )
                   }
                   else  if(position==='ShippingPolicyOrder')
                   {
                    return (
                           <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                     )
                   }
                   else  if(position==='select_customer_kind')
                   {
                    return (
                           <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                     )
                   }
                   else  if(position==='SelectOrderMainScreen')
                   {
                    return (
                           <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                     )
                   }
                   else  if(position==='select_Order_Product')
                   {
                    return (
                           <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                     )
                   }
                   else  if(position==='orderSelectPromotional')
                   {
                    return (
                           <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                     )
                   }
                   else  if(position==='orderSelectCustom')
                   {
                    return (
                           <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                     )
                   }
                   else  if(position==='manual_order')
                   {
                    return (
                           <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                     )
                   }
                   else  if(position==='importOrderfetchShopify')
                   {
                    return (
                           <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                     )
                   }
                   else  if(position==='importOrderShopify')
                   {
                    return (
                           <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                     )
                   }
                    else{
                     return (
                    <Text style={popUpStyle.drawerFont1}>{data.modulename}</Text>

                      )
                    }
                   }else if(data.moduleid === '03'){
                    if(position==='03')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else{
                     return (
                    <Text style={popUpStyle.drawerFont1}>{data.modulename}</Text>

                      )
                    }
                   }else if(data.moduleid === '04'){
                    if(position==='04')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else if(position==='AddCustomerManually')
                    {
                      return (
                        <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>
                        )
                    }
                    else{
                     return (
                    <Text style={popUpStyle.drawerFont1}>{data.modulename}</Text>

                      )
                    }
                   }else if(data.moduleid === '05'){
                    if(position==='05')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else if(position==='AddProductManually')
                    {
                      return (
                        <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                        )
                    }
                    else{
                     return (
                    <Text style={popUpStyle.drawerFont1}>{data.modulename}</Text>

                      )
                    }
                   }
                   else if(data.moduleid === '14'){
                    if(position==='14')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else if(position==='selected_order_details')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else{
                     return (
                    <Text style={popUpStyle.drawerFont1}>{data.modulename}</Text>

                      )
                    }
                   }
                   else if(data.moduleid === '140'){
                    if(position==='140')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else if(position==='selected_order_details_canada')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else{
                     return (
                    <Text style={popUpStyle.drawerFont1}>{data.modulename}</Text>

                      )
                    }
                   }
                   else if(data.moduleid === '15'){
                    if(position==='15')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else if(position==='selected_return_order_details')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else if(position==='select_Seller')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else if(position==='SelectReturnOrderMainScreen')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else if(position==='SelectReturnProduct')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else if(position==='SelectCarrierTrackingDate')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else if(position==='selectReturnWarehouseOrder')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else{
                     return (
                    <Text style={popUpStyle.drawerFont1}>{data.modulename}</Text>

                      )
                    }
                   }

                   else{
                    return (
                    <DashboardOutlinedIcon/>
                    )
                   }
                  })()}
                                      </Text>
                                      )
                                  }
                                })()}
                                 {/* <ListItemText style={{fontSize:'5px'}} className={classes.toolbarIcon1}  alignItems="flex-start" > */}


                                        </StyledListItemText>
                                        </ListItem>
                                          ))}
                                          </Text>)

                                     }
                                    })()}
                       </List>
                       <List style={{paddingBottom:'0px'}} >
                       <ListItem  alignItems="flex-start" style={{padding : '0px'}} onClick={()=>{openProjectManagementScreen(0)}} >
                       <ListItemText style={popUpStyle.Icons12} >

               {(() => {
               if (open === true){
                   return (
                     <Text className={ clsx(!open && classes.toolbarIconClose1, open && classes.toolbarIconOpen1)}>
                    INVENTORY
                     </Text>
                     )
                 }
                 else{
                  return(
                    <hr style={popUpStyle.hrStyle}/>
                  )
                }
               })()}
                       </ListItemText>
                       </ListItem>

                       </List>
                      <List >


                      {(() => {
if(isAdmin===false){
  return( <Text>
 {InventoryMenu2.map(data => (

                   <ListItem  alignItems="flex-start" style={{padding : '0px'}} button key={data.modulename}  onClick={()=>{handleSideNext(data.moduleid)}} >
                   <StyledListItemText style={popUpStyle.Icons1} >
                   {(() => {

              return (
                <Text style={{marginLeft:'0px',marginBottom:'2px',alignItems:'baseline'}}>
               {/* {data.moduleid % 2 === 0 ? <DashboardOutlinedIcon/> : <ShoppingCartIcon/>} */}

               {(() => {
                   if(data.moduleid === '05')
                   {
                     if(position==='05')
                     {
                      return (
                        <AssignmentTurnedInIcon style={popUpStyle.drawerIcon}/>
                       )
                     }
                     else if(position==='AddProductManually')
                     {
                       return (
                        <AssignmentTurnedInIcon style={popUpStyle.drawerIcon}/>

                         )
                     }
                     else{
                      return (
                        <AssignmentTurnedInOutlinedIcon style={popUpStyle.drawerIcon1}/>
                       )
                     }

                   }else if(data.moduleid === '06'){
                    if(position==='06')
                    {
                     return (
                      <LocalMallIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else{
                     return (
                      <LocalMallOutlinedIcon style={popUpStyle.drawerIcon1}/>
                      )
                    }
                   }else if(data.moduleid === '07'){
                    if(position==='07')
                    {
                     return (
                      <AssignmentReturnIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else{
                     return (
                      <AssignmentReturnOutlinedIcon style={popUpStyle.drawerIcon1}/>
                      )
                    }
                   }else if(data.moduleid === '08'){
                    if(position==='08')
                    {
                     return (
                      <SubscriptionsIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else if(position==='selectProductForSubscription')
                    {
                     return (
                      <SubscriptionsIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                   else if(position==='selectPromotinalSubcription')
                    {
                     return (
                      <SubscriptionsIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else if(position==='selectCustomSubcription')
                    {
                     return (
                      <SubscriptionsIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else if(position==='AddSubscriptionQty')
                    {
                     return (
                      <SubscriptionsIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else{
                     return (
                      <SubscriptionsOutlinedIcon style={popUpStyle.drawerIcon1}/>
                      )
                    }
                   }else if(data.moduleid === '09'){
                    if(position==='09')
                    {
                     return (
                      <HomeWorkIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else  if(position==='8')
                    {
                     return (
                      <HomeWorkIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else  if(position==='SendInventoryDetails')
                    {
                     return (
                      <HomeWorkIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else  if(position==='SepacilaRequest')
                    {
                     return (
                      <HomeWorkIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else  if(position==='SepacilaRequest9')
                    {
                     return (
                      <HomeWorkIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else  if(position==='9')
                    {
                     return (
                      <HomeWorkIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else  if(position===6)
                    {
                     return (
                      <HomeWorkIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else  if(position===7)
                    {
                     return (
                      <HomeWorkIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else  if(position===8)
                    {
                     return (
                      <HomeWorkIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else  if(position==='sendInventoryPromotional')
                    {
                     return (
                      <HomeWorkIcon style={popUpStyle.drawerIcon}/>

                      )
                    }
                    else  if(position==='SendIneventoryShipping')
                    {
                     return (
                      <HomeWorkIcon style={popUpStyle.drawerIcon}/>

                      )
                    }
                    else  if(position==='SendInvenotryShipementPacked')
                    {
                     return (
                      <HomeWorkIcon style={popUpStyle.drawerIcon}/>

                      )
                    }
                    else  if(position==='SendInventoryPackingType')
                    {
                     return (
                      <HomeWorkIcon style={popUpStyle.drawerIcon}/>

                      )
                    }
                    else  if(position==='SendInventroyLocation')
                    {
                     return (
                      <HomeWorkIcon style={popUpStyle.drawerIcon}/>

                      )
                    }
                    else if (
                                        position === "SelectMainScreen"
                                      ) {
                                        return (
                                          <HomeWorkIcon
                                            style={popUpStyle.drawerIcon}
                                          />
                                        );
                                      } else {
                                        return (
                                          <HomeWorkOutlinedIcon
                                            style={popUpStyle.drawerIcon1}
                                          />
                                        );
                                      }
                                    }
                   else if(data.moduleid === '10'){
                    if(position==='10')
                    {
                     return (
                      <BeenhereIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else if(position==='ProductInfo')
                    {
                     return (
                      <BeenhereIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else{
                     return (
                      <BeenhereOutlinedIcon style={popUpStyle.drawerIcon1}/>
                      )
                    }
                   }
                   else if(data.moduleid === '12')
                   {
                     if(position==='12')
                     {
                      return (
                        <PhoneInTalkIcon style={popUpStyle.drawerIcon}/>
                       )
                     }
                     else{
                      return (
                        <PhoneInTalkOutlinedIcon style={popUpStyle.drawerIcon1}/>
                       )
                     }

                   }
                   else if(data.moduleid === '11'){
                    if(position==='11')
                    {
                     return (
                      <SwapHorizIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else if(position==='select_transfer_inventory')
                    {
                     return (
                      <SwapHorizIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else{
                     return (
                      <SwapHorizIcon style={popUpStyle.drawerIcon1}/>
                      )
                    }
                   }
                   else{
                    return (
                    <DashboardOutlinedIcon style={popUpStyle.drawerIcon1}/>
                    )
                   }
                  })()}


                </Text>
                )

          })()}

           {(() => {
           if (open === true){
               return (
                 <Text   className={ clsx(!open && classes.toolbarIconClose, open && classes.toolbarIconOpen)}>
               {(() => {
                   if(data.moduleid === '05')
                   {
                     if(position==='05')
                     {
                      return (
                             <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                       )
                     }
                     else if(position==='AddProductManually')
                     {
                       return (
                        <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>


                         )
                     }
                     else{
                      return (
                     <Text style={popUpStyle.drawerFont1}>{data.modulename}</Text>

                       )
                     }

                   }else if(data.moduleid === '06'){
                    if(position==='06')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else{
                     return (
                    <Text style={popUpStyle.drawerFont1}>{data.modulename}</Text>

                      )
                    }
                   }else if(data.moduleid === '07'){
                    if(position==='07')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else{
                     return (
                    <Text style={popUpStyle.drawerFont1}>{data.modulename}</Text>

                      )
                    }
                   }else if(data.moduleid === '08'){
                    if(position==='08')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else if(position==='selectProductForSubscription')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else if(position==='selectPromotinalSubcription')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else if(position==='selectCustomSubcription')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else if(position==='AddSubscriptionQty')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else{
                     return (
                    <Text style={popUpStyle.drawerFont1}>{data.modulename}</Text>

                      )
                    }
                   }else if(data.moduleid === '09'){
                    if(position==='09')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else  if(position==='8')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else  if(position==='SendInventoryDetails')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else  if(position==='SepacilaRequest')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else  if(position==='SepacilaRequest9')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else  if(position==='9')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else  if(position===6)
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else  if(position===7)
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else  if(position===8)
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else  if(position==='sendInventoryPromotional')
                    {
                     return (
                      <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else  if(position==='SendInventroyLocation')
                    {
                     return (
                      <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }else if (
                                          position === "SelectMainScreen"
                                        ) {
                                          return (
                                            <Text style={popUpStyle.drawerFont}>
                                              {data.modulename}
                                            </Text>
                                          );
                                        }
                    else  if(position==='SendInventoryPackingType')
                    {
                     return (
                      <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else  if(position==='SendInvenotryShipementPacked')
                    {
                     return (
                      <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else  if(position==='SendIneventoryShipping')
                    {
                     return (
                      <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else{
                     return (
                    <Text style={popUpStyle.drawerFont1}>{data.modulename}</Text>

                      )
                    }
                   }
                   else if(data.moduleid === '10'){
                    if(position==='10')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else if(position==='ProductInfo')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else{
                     return (
                    <Text style={popUpStyle.drawerFont1}>{data.modulename}</Text>

                      )
                    }
                   }
                   else if(data.moduleid === '12')
                   {
                     if(position==='12')
                     {
                      return (
                             <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                       )
                     }
                     else{
                      return (
                     <Text style={popUpStyle.drawerFont1}>{data.modulename}</Text>

                       )
                     }

                   }
                   else if(data.moduleid === '11'){
                    if(position==='11')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else if(position==='select_transfer_inventory')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else{
                     return (
                    <Text style={popUpStyle.drawerFont1}>{data.modulename}</Text>

                      )
                    }
                   }
                   else{
                    return (
                    <DashboardOutlinedIcon/>
                    )
                   }
                  })()}
                 </Text>
                 )
             }
           })()}
                   </StyledListItemText>
                   </ListItem>
                   ))}
  </Text>)

              }
              else{
                return (
                  <Text>
{InventoryMenu.map(data => (

                   <ListItem  alignItems="flex-start" style={{padding : '0px'}} button key={data.modulename}  onClick={()=>{handleSideNext(data.moduleid)}} >
                   <StyledListItemText style={popUpStyle.Icons1} >
                   {(() => {

              return (
                <Text style={{marginLeft:'0px',marginBottom:'2px',alignItems:'baseline'}}>
               {/* {data.moduleid % 2 === 0 ? <DashboardOutlinedIcon/> : <ShoppingCartIcon/>} */}
               {(() => {
                   if(data.moduleid === '05')
                   {
                     if(position==='05')
                     {
                      return (
                        <AssignmentTurnedInIcon style={popUpStyle.drawerIcon}/>
                       )
                     }
                     else if(position==='AddProductManually')
                     {
                       return (
                        <AssignmentTurnedInIcon style={popUpStyle.drawerIcon}/>


                         )
                     }
                     else{
                      return (
                        <AssignmentTurnedInOutlinedIcon style={popUpStyle.drawerIcon1}/>
                       )
                     }

                   }else if(data.moduleid === '06'){
                    if(position==='06')
                    {
                     return (
                      <LocalMallIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else{
                     return (
                      <LocalMallOutlinedIcon style={popUpStyle.drawerIcon1}/>
                      )
                    }
                   }else if(data.moduleid === '07'){
                    if(position==='07')
                    {
                     return (
                      <AssignmentReturnIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else{
                     return (
                      <AssignmentReturnOutlinedIcon style={popUpStyle.drawerIcon1}/>
                      )
                    }
                   }else if(data.moduleid === '08'){
                    if(position==='08')
                    {
                     return (
                      <SubscriptionsIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else if(position==='selectProductForSubscription')
                    {
                     return (
                      <SubscriptionsIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                   else if(position==='selectPromotinalSubcription')
                    {
                     return (
                      <SubscriptionsIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else if(position==='selectCustomSubcription')
                    {
                     return (
                      <SubscriptionsIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else if(position==='AddSubscriptionQty')
                    {
                     return (
                      <SubscriptionsIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else{
                     return (
                      <SubscriptionsOutlinedIcon style={popUpStyle.drawerIcon1}/>
                      )
                    }
                   }else if(data.moduleid === '09'){
                    if(position==='09')
                    {
                     return (
                      <HomeWorkIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else  if(position==='9')
                    {
                     return (
                      <HomeWorkIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else  if(position==='SendInventoryDetails')
                    {
                     return (
                      <HomeWorkIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else  if(position==='8')
                    {
                     return (
                      <HomeWorkIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else  if(position==='SepacilaRequest')
                    {
                     return (
                      <HomeWorkIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else  if(position==='SepacilaRequest9')
                    {
                     return (
                      <HomeWorkIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else  if(position===6)
                    {
                     return (
                      <HomeWorkIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else  if(position===7)
                    {
                     return (
                      <HomeWorkIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else  if(position===8)
                    {
                     return (
                      <HomeWorkIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else  if(position==='sendInventoryPromotional')
                    {
                     return (
                      <HomeWorkIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else  if(position==='SendIneventoryShipping')
                    {
                     return (
                      <HomeWorkIcon style={popUpStyle.drawerIcon}/>

                      )
                    }
                    else  if(position==='SendInvenotryShipementPacked')
                    {
                     return (
                      <HomeWorkIcon style={popUpStyle.drawerIcon}/>

                      )
                    }
                    else  if(position==='SendInventoryPackingType')
                    {
                     return (
                      <HomeWorkIcon style={popUpStyle.drawerIcon}/>

                      )
                    }
                    else  if(position==='SendInventroyLocation')
                    {
                     return (
                      <HomeWorkIcon style={popUpStyle.drawerIcon}/>

                      )
                    }

                    else if (
                                        position === "SelectMainScreen"
                                      ) {
                                        return (
                                          <HomeWorkIcon
                                            style={popUpStyle.drawerIcon}
                                          />
                                        );
                                      } else {
                                        return (
                                          <HomeWorkOutlinedIcon
                                            style={popUpStyle.drawerIcon1}
                                          />
                                        );
                                      }
                                    }
                   else if(data.moduleid === '10'){
                    if(position==='10')
                    {
                     return (
                      <BeenhereIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else if(position==='ProductInfo')
                    {
                     return (
                      <BeenhereIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else{
                     return (
                      <BeenhereOutlinedIcon style={popUpStyle.drawerIcon1}/>
                      )
                    }
                   }
                   else if(data.moduleid === '12')
                   {
                     if(position==='12')
                     {
                      return (
                        <PhoneInTalkIcon style={popUpStyle.drawerIcon}/>
                       )
                     }
                     else{
                      return (
                        <PhoneInTalkOutlinedIcon style={popUpStyle.drawerIcon1}/>
                       )
                     }

                   }
                   else if(data.moduleid === '11'){
                    if(position==='11')
                    {
                     return (
                      <SwapHorizIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else if(position==='select_transfer_inventory')
                    {
                     return (
                      <SwapHorizIcon style={popUpStyle.drawerIcon}/>
                      )
                    }
                    else{
                     return (
                      <SwapHorizIcon style={popUpStyle.drawerIcon1}/>
                      )
                    }
                   }
                   else{
                    return (
                    <DashboardOutlinedIcon style={popUpStyle.drawerIcon1}/>
                    )
                   }
                  })()}

                </Text>
                )

          })()}

           {(() => {
           if (open === true){
               return (
                 <Text   className={ clsx(!open && classes.toolbarIconClose, open && classes.toolbarIconOpen)}>
               {(() => {
                   if(data.moduleid === '05')
                   {
                     if(position==='05')
                     {
                      return (
                             <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                       )
                     }
                     else if(position==='AddProductManually')
                     {
                       return (
                        <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>


                         )
                     }
                     else{
                      return (
                     <Text style={popUpStyle.drawerFont1}>{data.modulename}</Text>

                       )
                     }

                   }else if(data.moduleid === '06'){
                    if(position==='06')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else{
                     return (
                    <Text style={popUpStyle.drawerFont1}>{data.modulename}</Text>

                      )
                    }
                   }else if(data.moduleid === '07'){
                    if(position==='07')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else{
                     return (
                    <Text style={popUpStyle.drawerFont1}>{data.modulename}</Text>

                      )
                    }
                   }else if(data.moduleid === '08'){
                    if(position==='08')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else if(position==='selectProductForSubscription')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else if(position==='selectPromotinalSubcription')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else if(position==='selectCustomSubcription')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else if(position==='AddSubscriptionQty')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else{
                     return (
                    <Text style={popUpStyle.drawerFont1}>{data.modulename}</Text>

                      )
                    }
                   }else if(data.moduleid === '09'){
                    if(position==='09')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else  if(position==='8')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else  if(position==='SendInventoryDetails')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else  if(position==='SepacilaRequest')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else  if(position==='SepacilaRequest9')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else  if(position==='9')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else  if(position===6)
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else  if(position===7)
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else  if(position===8)
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else{
                     return (
                    <Text style={popUpStyle.drawerFont1}>{data.modulename}</Text>

                      )
                    }
                   }
                   else if(data.moduleid === '10'){
                    if(position==='10')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else if(position==='ProductInfo')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else{
                     return (
                    <Text style={popUpStyle.drawerFont1}>{data.modulename}</Text>

                      )
                    }
                   }
                   else if(data.moduleid === '12')
                   {
                     if(position==='12')
                     {
                      return (
                             <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                       )
                     }
                     else{
                      return (
                     <Text style={popUpStyle.drawerFont1}>{data.modulename}</Text>

                       )
                     }

                   }
                   else if(data.moduleid === '11'){
                    if(position==='11')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else if(position==='select_transfer_inventory')
                    {
                     return (
                            <Text style={popUpStyle.drawerFont}>{data.modulename}</Text>

                      )
                    }
                    else{
                     return (
                    <Text style={popUpStyle.drawerFont1}>{data.modulename}</Text>

                      )
                    }
                   }
                   else{
                    return (
                    <DashboardOutlinedIcon/>
                    )
                   }
                  })()}
                 </Text>
                 )
             }
           })()}
                   </StyledListItemText>
                   </ListItem>
                   ))}
                  </Text>
                )

              }
                      })()}
                       </List>
                       <List style={{paddingBottom:'0px'}} >
                       <ListItem  alignItems="flex-start" style={{padding : '0px'}} onClick={()=>{openProjectManagementScreen(0)}} >
                       <ListItemText style={popUpStyle.Icons12} >

               {(() => {
               if (open === true){
                   return (
                     <Text className={ clsx(!open && classes.toolbarIconClose1, open && classes.toolbarIconOpen1)}>
                     OTHER
                     </Text>
                     )
                 }
                 else{
                  return(
                    <hr style={popUpStyle.hrStyle}/>
                  )
                }
               })()}
                {/* <ListItemText style={{fontSize:'5px'}} className={classes.toolbarIcon1}  alignItems="flex-start" > */}


                       </ListItemText>
                       </ListItem>
                       </List>
                      <List >
                      {(() => {
              console.log("ISADMIN========");
              console.log(isAdmin);
              if(isAdmin === false){
                    return(
                      <Text>
                      {OrderMenu.map((data) => (
                      <ListItem
                        alignItems="flex-start"
                        style={{ padding: "0px" }}
                        button
                        key={data.modulename}
                        onClick={() => {
                          handleSideNext(data.moduleid);
                        }}
                      >
                        <StyledListItemText style={popUpStyle.Icons1}>
                          {(() => {
                            return (
                              <Text
                                style={{
                                  marginLeft: "0px",
                                  marginBottom: "2px",
                                  alignItems: "baseline",
                                }}
                              >
                                {/* {data.moduleid % 2 === 0 ? <InboxIcon/> : <PhoneInTalkOutlinedIcon/>} */}

                                {(() => {
                                  if (data.moduleid === "12") {
                                    if (position === "12") {
                                      return (
                                        <PhoneInTalkIcon
                                          style={popUpStyle.drawerIcon}
                                        />
                                      );
                                    } else {
                                      return (
                                        <PhoneInTalkOutlinedIcon
                                          style={popUpStyle.drawerIcon1}
                                        />
                                      );
                                    }
                                  } else if (data.moduleid === "allsettings") {
                                    if (position === "allsettings") {
                                      return (
                                        <SettingsIcon style={popUpStyle.drawerIcon} />
                                      );
                                    } else {
                                      return (
                                        <SettingsOutlinedIcon
                                          style={popUpStyle.drawerIcon1}
                                        />
                                      );
                                    }
                                  } else if (data.moduleid === "billing") {
                                    if (position === "billing") {
                                      return (
                                        <CreditCardOutlinedIcon
                                          style={popUpStyle.drawerIcon}
                                        />
                                      );
                                    } else if (position === "PaymentRecieveSetting") {
                                      return (
                                        <CreditCardOutlinedIcon
                                          style={popUpStyle.drawerIcon}
                                        />
                                      );
                                    } else if (position === "cardlistadd") {
                                      return (
                                        <CreditCardOutlinedIcon
                                          style={popUpStyle.drawerIcon}
                                        />
                                      );
                                    } else {
                                      return (
                                        <CreditCardOutlinedIcon
                                          style={popUpStyle.drawerIcon1}
                                        />
                                      );
                                    }
                                  } else if (data.moduleid === "marketplaceSetting") {
                                    if (position === "marketplaceSetting") {
                                      return (
                                        <StoreMallDirectoryIcon
                                          style={popUpStyle.drawerIcon}
                                        />
                                      );
                                    } else {
                                      return (
                                        <StoreMallDirectoryOutlinedIcon
                                          style={popUpStyle.drawerIcon1}
                                        />
                                      );
                                    }
                                  } else if (data.moduleid === "014") {
                                    if (position === "014") {
                                      return (
                                        <HelpIcon style={popUpStyle.drawerIcon} />
                                      );
                                    } else {
                                      return (
                                        <HelpOutlineIcon
                                          style={popUpStyle.drawerIcon1}
                                        />
                                      );
                                    }
                                  }
                                    else if (data.moduleid === "faqs") {
                                    if (position === "faqs") {
                                      return (
                                        <HelpIcon style={popUpStyle.drawerIcon} />
                                      );
                                    } else {
                                      return (
                                        <HelpOutlineIcon
                                          style={popUpStyle.drawerIcon1}
                                        />
                                      );
                                    }
                                  }
                                  else if (data.moduleid === "inst") {
                                    if (position === "inst") {
                                      return (
                                        <HelpIcon style={popUpStyle.drawerIcon} />
                                      );
                                    } else {
                                      return (
                                        <HelpOutlineIcon
                                          style={popUpStyle.drawerIcon1}
                                        />
                                      );
                                    }
                                  }
                                   else if (data.moduleid === "015") {
                                    if (position === "transfer_credit") {
                                      return (
                                        <LibraryAddIcon
                                          style={popUpStyle.drawerIcon}
                                        />
                                      );
                                    } else if (position === "015") {
                                      return (
                                        <LibraryAddIcon
                                          style={popUpStyle.drawerIcon}
                                        />
                                      );
                                    } else {
                                      return (
                                        <LibraryAddOutlinedIcon
                                          style={popUpStyle.drawerIcon1}
                                        />
                                      );
                                    }
                                  } else {
                                    return <DashboardOutlinedIcon />;
                                  }
                                })()}
                              </Text>
                            );
                          })()}

               {(() => {
                            if (open === true) {
                              return (
                                <Text
                                  className={clsx(
                                    !open && classes.toolbarIconClose,
                                    open && classes.toolbarIconOpen
                                  )}
                                >
                                  {(() => {
                                    if (data.moduleid === "12") {
                                      if (position === "12") {
                                        return (
                                          <Text style={popUpStyle.drawerFont}>
                                            {data.modulename}
                                          </Text>
                                        );
                                      } else {
                                        return (
                                          <Text style={popUpStyle.drawerFont1}>
                                            {data.modulename}
                                          </Text>
                                        );
                                      }
                                    } else if (data.moduleid === "allsettings") {
                                      if (position === "allsettings") {
                                        return (
                                          <Text style={popUpStyle.drawerFont}>
                                            {data.modulename}
                                          </Text>
                                        );
                                      } else {
                                        return (
                                          <Text style={popUpStyle.drawerFont1}>
                                            {data.modulename}
                                          </Text>
                                        );
                                      }
                                    } else if (data.moduleid === "billing") {
                                      if (position === "billing") {
                                        return (
                                          <Text style={popUpStyle.drawerFont}>
                                            {data.modulename}
                                          </Text>
                                        );
                                      } else if (
                                        position === "PaymentRecieveSetting"
                                      ) {
                                        return (
                                          <Text style={popUpStyle.drawerFont}>
                                            {data.modulename}
                                          </Text>
                                        );
                                      } else if (position === "cardlistadd") {
                                        return (
                                          <Text style={popUpStyle.drawerFont}>
                                            {data.modulename}
                                          </Text>
                                        );
                                      } else {
                                        return (
                                          <Text style={popUpStyle.drawerFont1}>
                                            {data.modulename}
                                          </Text>
                                        );
                                      }
                                    } else if (
                                      data.moduleid === "marketplaceSetting"
                                    ) {
                                      if (position === "marketplaceSetting") {
                                        return (
                                          <Text style={popUpStyle.drawerFont}>
                                            {data.modulename}
                                          </Text>
                                        );
                                      } else {
                                        return (
                                          <Text style={popUpStyle.drawerFont1}>
                                            {data.modulename}
                                          </Text>
                                        );
                                      }
                                    } else if (data.moduleid === "014") {
                                      if (position === "014") {
                                        return (
                                          <Text style={popUpStyle.drawerFont}>
                                            {data.modulename}
                                          </Text>
                                        );
                                      } else {
                                        return (
                                          <Text style={popUpStyle.drawerFont1}>
                                            {data.modulename}
                                          </Text>
                                        );
                                      }
                                    }else if (data.moduleid === "faqs") {
                                      if (position === "faqs") {
                                        return (
                                          <Text style={popUpStyle.drawerFont}>
                                            {data.modulename}
                                          </Text>
                                        );
                                      } else {
                                        return (
                                          <Text style={popUpStyle.drawerFont1}>
                                            {data.modulename}
                                          </Text>
                                        );
                                      }
                                    }
                                    else if (data.moduleid === "inst") {
                                      if (position === "inst") {
                                        return (
                                          <Text style={popUpStyle.drawerFont}>
                                            {data.modulename}
                                          </Text>
                                        );
                                      } else {
                                        return (
                                          <Text style={popUpStyle.drawerFont1}>
                                            {data.modulename}
                                          </Text>
                                        );
                                      }
                                    }
                                     else if (data.moduleid === "015") {
                                      if (position === "transfer_credit") {
                                        return (
                                          <Text style={popUpStyle.drawerFont}>
                                            {data.modulename}
                                          </Text>
                                        );
                                      } else if (position === "015") {
                                        return (
                                          <Text style={popUpStyle.drawerFont}>
                                            {data.modulename}
                                          </Text>
                                        );
                                      } else {
                                        return (
                                          <Text style={popUpStyle.drawerFont1}>
                                            {data.modulename}
                                          </Text>
                                        );
                                      }
                                    } else {
                                      return <DashboardOutlinedIcon />;
                                    }
                                  })()}
                                </Text>
                              );
                            }
                          })()}
                        </StyledListItemText>
                      </ListItem>
                    ))}
                    </Text>
                    );
              } else{
                  return(
                    <Text>
                    {OrderMenu2.map((data) => (
                    <ListItem
                      alignItems="flex-start"
                      style={{ padding: "0px" }}
                      button
                      key={data.modulename}
                      onClick={() => {
                        handleSideNext(data.moduleid);
                      }}
                    >
                      <StyledListItemText style={popUpStyle.Icons1}>
                        {(() => {
                          return (
                            <Text
                              style={{
                                marginLeft: "0px",
                                marginBottom: "2px",
                                alignItems: "baseline",
                              }}
                            >
                              {/* {data.moduleid % 2 === 0 ? <InboxIcon/> : <PhoneInTalkOutlinedIcon/>} */}

                              {(() => {
                                if (data.moduleid === "12") {
                                  if (position === "12") {
                                    return (
                                      <PhoneInTalkIcon
                                        style={popUpStyle.drawerIcon}
                                      />
                                    );
                                  } else {
                                    return (
                                      <PhoneInTalkOutlinedIcon
                                        style={popUpStyle.drawerIcon1}
                                      />
                                    );
                                  }
                                } else if (data.moduleid === "allsettings") {
                                  if (position === "allsettings") {
                                    return (
                                      <SettingsIcon style={popUpStyle.drawerIcon} />
                                    );
                                  } else {
                                    return (
                                      <SettingsOutlinedIcon
                                        style={popUpStyle.drawerIcon1}
                                      />
                                    );
                                  }
                                } else if (data.moduleid === "billing") {
                                  if (position === "billing") {
                                    return (
                                      <CreditCardOutlinedIcon
                                        style={popUpStyle.drawerIcon}
                                      />
                                    );
                                  } else if (position === "PaymentRecieveSetting") {
                                    return (
                                      <CreditCardOutlinedIcon
                                        style={popUpStyle.drawerIcon}
                                      />
                                    );
                                  } else if (position === "cardlistadd") {
                                    return (
                                      <CreditCardOutlinedIcon
                                        style={popUpStyle.drawerIcon}
                                      />
                                    );
                                  } else {
                                    return (
                                      <CreditCardOutlinedIcon
                                        style={popUpStyle.drawerIcon1}
                                      />
                                    );
                                  }
                                } else if (data.moduleid === "credit") {
                                  if (position === "credit") {
                                    return (
                                      <CreditCardOutlinedIcon
                                        style={popUpStyle.drawerIcon}
                                      />
                                    );
                                  } else if (position === "PaymentRecieveSetting") {
                                    return (
                                      <CreditCardOutlinedIcon
                                        style={popUpStyle.drawerIcon}
                                      />
                                    );
                                  } else if (position === "cardlistadd") {
                                    return (
                                      <CreditCardOutlinedIcon
                                        style={popUpStyle.drawerIcon}
                                      />
                                    );
                                  } else {
                                    return (
                                      <CreditCardOutlinedIcon
                                        style={popUpStyle.drawerIcon1}
                                      />
                                    );
                                  }
                                } else if (data.moduleid === "marketplaceSetting") {
                                  if (position === "marketplaceSetting") {
                                    return (
                                      <StoreMallDirectoryIcon
                                        style={popUpStyle.drawerIcon}
                                      />
                                    );
                                  } else {
                                    return (
                                      <StoreMallDirectoryOutlinedIcon
                                        style={popUpStyle.drawerIcon1}
                                      />
                                    );
                                  }
                                } else if (data.moduleid === "014") {
                                  if (position === "014") {
                                    return (
                                      <HelpIcon style={popUpStyle.drawerIcon} />
                                    );
                                  } else {
                                    return (
                                      <HelpOutlineIcon
                                        style={popUpStyle.drawerIcon1}
                                      />
                                    );
                                  }
                                }else if (data.moduleid === "faqs") {
                                  if (position === "faqs") {
                                    return (
                                      <HelpIcon style={popUpStyle.drawerIcon} />
                                    );
                                  } else {
                                    return (
                                      <HelpOutlineIcon
                                        style={popUpStyle.drawerIcon1}
                                      />
                                    );
                                  }
                                }
                                else if (data.moduleid === "inst") {
                                  if (position === "inst") {
                                    return (
                                      <HelpIcon style={popUpStyle.drawerIcon} />
                                    );
                                  } else {
                                    return (
                                      <HelpOutlineIcon
                                        style={popUpStyle.drawerIcon1}
                                      />
                                    );
                                  }
                                }
                                 else if (data.moduleid === "015") {
                                  if (position === "transfer_credit") {
                                    return (
                                      <LibraryAddIcon
                                        style={popUpStyle.drawerIcon}
                                      />
                                    );
                                  } else if (position === "015") {
                                    return (
                                      <LibraryAddIcon
                                        style={popUpStyle.drawerIcon}
                                      />
                                    );
                                  } else {
                                    return (
                                      <LibraryAddOutlinedIcon
                                        style={popUpStyle.drawerIcon1}
                                      />
                                    );
                                  }
                                } else {
                                  return <DashboardOutlinedIcon />;
                                }
                              })()}
                            </Text>
                          );
                        })()}

                        {(() => {
                          if (open === true) {
                            return (
                              <Text
                                className={clsx(
                                  !open && classes.toolbarIconClose,
                                  open && classes.toolbarIconOpen
                                )}
                              >
                                {(() => {
                                  if (data.moduleid === "12") {
                                    if (position === "12") {
                                      return (
                                        <Text style={popUpStyle.drawerFont}>
                                          {data.modulename}
                                        </Text>
                                      );
                                    } else {
                                      return (
                                        <Text style={popUpStyle.drawerFont1}>
                                          {data.modulename}
                                        </Text>
                                      );
                                    }
                                  } else if (data.moduleid === "allsettings") {
                                    if (position === "allsettings") {
                                      return (
                                        <Text style={popUpStyle.drawerFont}>
                                          {data.modulename}
                                        </Text>
                                      );
                                    } else {
                                      return (
                                        <Text style={popUpStyle.drawerFont1}>
                                          {data.modulename}
                                        </Text>
                                      );
                                    }
                                  } else if (data.moduleid === "billing") {
                                    if (position === "billing") {
                                      return (
                                        <Text style={popUpStyle.drawerFont}>
                                          {data.modulename}
                                        </Text>
                                      );
                                    } else if (
                                      position === "PaymentRecieveSetting"
                                    ) {
                                      return (
                                        <Text style={popUpStyle.drawerFont}>
                                          {data.modulename}
                                        </Text>
                                      );
                                    } else if (position === "cardlistadd") {
                                      return (
                                        <Text style={popUpStyle.drawerFont}>
                                          {data.modulename}
                                        </Text>
                                      );
                                    } else {
                                      return (
                                        <Text style={popUpStyle.drawerFont1}>
                                          {data.modulename}
                                        </Text>
                                      );
                                    }
                                  } else if (data.moduleid === "credit") {
                                    if (position === "credit") {
                                      return (
                                        <Text style={popUpStyle.drawerFont}>
                                          {data.modulename}
                                        </Text>
                                      );
                                    } else if (
                                      position === "PaymentRecieveSetting"
                                    ) {
                                      return (
                                        <Text style={popUpStyle.drawerFont}>
                                          {data.modulename}
                                        </Text>
                                      );
                                    } else if (position === "cardlistadd") {
                                      return (
                                        <Text style={popUpStyle.drawerFont}>
                                          {data.modulename}
                                        </Text>
                                      );
                                    } else {
                                      return (
                                        <Text style={popUpStyle.drawerFont1}>
                                          {data.modulename}
                                        </Text>
                                      );
                                    }
                                  } else if (
                                    data.moduleid === "marketplaceSetting"
                                  ) {
                                    if (position === "marketplaceSetting") {
                                      return (
                                        <Text style={popUpStyle.drawerFont}>
                                          {data.modulename}
                                        </Text>
                                      );
                                    } else {
                                      return (
                                        <Text style={popUpStyle.drawerFont1}>
                                          {data.modulename}
                                        </Text>
                                      );
                                    }
                                  } else if (data.moduleid === "014") {
                                    if (position === "014") {
                                      return (
                                        <Text style={popUpStyle.drawerFont}>
                                          {data.modulename}
                                        </Text>
                                      );
                                    } else {
                                      return (
                                        <Text style={popUpStyle.drawerFont1}>
                                          {data.modulename}
                                        </Text>
                                      );
                                    }
                                  }else if (data.moduleid === "faqs") {
                                    if (position === "faqs") {
                                      return (
                                        <Text style={popUpStyle.drawerFont}>
                                          {data.modulename}
                                        </Text>
                                      );
                                    } else {
                                      return (
                                        <Text style={popUpStyle.drawerFont1}>
                                          {data.modulename}
                                        </Text>
                                      );
                                    }
                                  }
                                  else if (data.moduleid === "inst") {
                                    if (position === "inst") {
                                      return (
                                        <Text style={popUpStyle.drawerFont}>
                                          {data.modulename}
                                        </Text>
                                      );
                                    } else {
                                      return (
                                        <Text style={popUpStyle.drawerFont1}>
                                          {data.modulename}
                                        </Text>
                                      );
                                    }
                                  }
                                   else if (data.moduleid === "015") {
                                    if (position === "transfer_credit") {
                                      return (
                                        <Text style={popUpStyle.drawerFont}>
                                          {data.modulename}
                                        </Text>
                                      );
                                    } else if (position === "015") {
                                      return (
                                        <Text style={popUpStyle.drawerFont}>
                                          {data.modulename}
                                        </Text>
                                      );
                                    } else {
                                      return (
                                        <Text style={popUpStyle.drawerFont1}>
                                          {data.modulename}
                                        </Text>
                                      );
                                    }
                                  } else {
                                    return <DashboardOutlinedIcon />;
                                  }
                                })()}
                              </Text>
                            );
                          }
                        })()}
                      </StyledListItemText>
                    </ListItem>
                  ))}
                  </Text>
                );
            }
          }) ()}
            </List>


                       <View className={classes.root10}>
                      {(() => {
             if (open === true){
                   return (

                   <View style={{

                    backgroundColor:'#0168fa',
                 }}>
                     <Grid container  style={{padding:'5%', height:'50%',
                   width:'100%',
                  }}>
                     <Grid items lg={1} xs={12}></Grid>
                     <Grid items lg={2} xs={12}><FlashOnIcon style={{ color:'#fff'}}/></Grid>
                     <Grid items lg={6} xs={12}>
                     <Text style={{ fontSize: '12px',
           // fontWeight: '700',
            fontFamily: 'Neurial Grotesk", Roboto, system, -apple-system, BlinkMacSystemFont, ".SFNSDisplay-Regular", "Helvetica Neue", Helvetica, Arial, sans-serif',

          fontWeight:'bold',

           color:'#fff',
            transition : 'all 0.25s',}}>Setup Progress</Text>
                     </Grid>
                     <Grid items lg={3} xs={12}>
                     <Text style={{ fontSize: '12px',
           // fontWeight: '700',
            fontFamily: 'Neurial Grotesk", Roboto, system, -apple-system, BlinkMacSystemFont, ".SFNSDisplay-Regular", "Helvetica Neue", Helvetica, Arial, sans-serif',
            color:'#fff',
          fontWeight:'bold',

            transition : 'all 0.25s',}}>{`${now}%`}</Text>
                     </Grid>
                     {/* <Grid items lg={1} xs={12}></Grid> */}
                     <Grid items lg={12} xs={12}>
                     <ProgressBar    variant="determinate" value={now} />
                     </Grid>


                     </Grid>

                     <Grid items lg={12} xs={12}>
                  <ColorButton2
    size='large'
    variant="contained"
    color="primary"
    onClick={()=>{handleClickOpen()}}
    //onClick={()=>{handleNextPage(3)}}
    >
    {<Text style={{ fontSize: '11px',
           // fontWeight: '700',
            fontFamily: 'Neurial Grotesk", Roboto, system, -apple-system, BlinkMacSystemFont, ".SFNSDisplay-Regular", "Helvetica Neue", Helvetica, Arial, sans-serif',
            color: '#FFFFFF',
            fontWeight: '550',
            transition : 'all 0.25s',}}>Setup Wizard</Text> }

  </ColorButton2>
          <br/>
  </Grid>

                 </View>


                  )
                   }
               })()}
                   {(() => {
             if (open === true){
                   return (

                   <View>


                 </View>


                  )
                   }
               })()}
                </View>


                           </Drawer>
                    </View>


                    <View className={ clsx(!open && sideWidthClosed, open && sideWidthOpen)}  >
                    {SwitchHandling()}


                  </View>
                  </View>
                 <Grid>

                 <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      key={`${vertical},${horizontal}`}
      open={open1}
      autoHideDuration={10000}
      onClose={handleClose3}>
      <Alert onClose={handleClose3} severity="success">
      You are all set up now. Please click the "Send Inventory" tab to start sending inventory to ShipHype!
      </Alert>
      </Snackbar>

      <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      key={`${vertical1},${horizontal1}`}
      open={open6}
      autoHideDuration={10000}
      onClose={handleClose6}>
      <Alert onClose={handleClose6} severity="error">
     You have break the process in between of send inventory, Data will be lost.
      </Alert>
      </Snackbar>

{openFeedback === false ? " " : 

<SentFeedbackToAdmin
  userid={userid}
  openfeedback={openFeedback}
  closeFeedback={closeFeedback}
/>
}
                 {(openSprint === false ? " " :
          <MarketPlace
          handleOrder={handleOrderPage}
          openSprint={openSprint}
          user_id={userid}
             handleDashboard={handleSideNext}
          handleNext={handleNext2}
          handleStepPage={handleStepPage}
          handleSprintCancel={handleSprintCancel}
          />)}
           {/* {(openNextReturn === false ? " " :
          <SelectWarehouse
          user_id={userid}
             handleDashboard={handleSideNext}
          openNextReturn={openNextReturn}
          handlePreviousPage={handlePrevious}
          handleNextPage={handleNext2}
          handleStepPage={handleStepPage}
          handleSprintCancel={handleSprintCancel}

          />)} */}
           {(openShipPolicy === false ? " " :
          <ShippingPolicy
          policyData={policyData}
          policyDataId={policyDataId}
          shipData={shipData}
          user_id={userid}

             handleDashboard={handleSideNext}
          openShipPolicy={openShipPolicy}
          handleNextPage={handleNext2}
          handlePreviousPage={handlePrevious}
          handleSprintCancel={handleSprintCancel}
          handleStepPage={handleStepPage}
          />)}
          {/* {(openCarries === false ? " " :
          <ShipingCarries
          user_id={userid}
             handleDashboard={handleSideNext}
          openCarries={openCarries}
          handleNext={handleNext2}
          handlePreviousPage={handlePrevious}
          handleStepPage={handleStepPage}
          handleSprintCancel={handleSprintCancel}


          />)} */}
           {(openReturn === false ? " " :
          <ReturnSetting
          openReturn={openReturn}
          user_id={userid}
             handleDashboard={handleSideNext}
          handleNextPage={handleNext1}
          handlePreviousPage={handlePrevious}
          handleStepPage={handleStepPage}
          handleSprintCancel={handleSprintCancel}


          />)}

          {(openImportProduct === false ? " " :
          <ImportProduct
          openImportProduct={openImportProduct}
          user_id={userid}
             handleDashboard={handleSideNext}
          promotionalData={promotionalData}
          packageData={packageData}
          customePackageFirstId={customePackageFirstId}
          handleStepPage={handleStepPage}
          handleNextPage={handleNext2}
          importData={importData}
          importEbayData={importEbayData}
                importCustData={importCustData}
                selectintegration={selectintegration}
                packaging={packaging}
          handlePreviousPage={handlePrevious}
          handleSprintCancel={handleSprintCancel}

          />)}
          {(openProductList === false ? " " :
          <ProductList
          openProductList={openProductList}
          handleStepPage={handleStepPage}
          user_id={userid}
          promotionalData={promotionalData}
          packageData={packageData}
             handleDashboard={handleSideNext}
          handleNextPage={handleNext2}
          handlePreviousPage={handlePrevious}
          handleSprintCancel={handleSprintCancel}

          />)}
           {(openCustomePromotional === false ? " " :
          <CustomePromotional
          openCustomePromotional={openCustomePromotional}
          handleNextPage={handleNext1}
          handleStepPage={handleStepPage}
          user_id={userid}
             handleDashboard={handleSideNext}
          handleNextPage1={handleNext2}
          handlePreviousPage={handlePrevious}
          handleSprintCancel={handleSprintCancel}

          />)}
          {(openProductImport === false ? " " :
          <ProductImport
          openProductImport={openProductImport}
          handleNextPage={handleNext1}
          handleStepPage={handleStepPage}
          user_id={userid}
          importData={importData}
          importEbayData={importEbayData}
                importCustData={importCustData}
                selectintegration={selectintegration}
                packaging={packaging}
             handleDashboard={handleSideNext}
          handlePreviousPage={handlePrevious}
          handleSprintCancel={handleSprintCancel}

          />)}
           {(openCustomePackaging === false ? " " :
          <CustomePackaging
          openCustomePackaging={openCustomePackaging}
          user_id={userid}
             handleDashboard={handleSideNext}
          handleStepPage={handleStepPage}
          handleNextPage={handleNext2}
          handlePreviousPage={handlePrevious}
          handleSprintCancel={handleSprintCancel}

          />)}
           {(openProductSelection === false ? " " :
        <ProductSelection
          openProductSelection={openProductSelection}
          handleNextPage={handleNext2}
          handleStepPage={handleStepPage}
          user_id={userid}
             handleDashboard={handleSideNext}
          handleNextPage1={handleNext1}
          handlePreviousPage={handlePrevious}
          handleSprintCancel={handleSprintCancel}

          />)}
           {(openSelectStore === false ? " " :
          <SelectStore
          openSelectStore={openSelectStore}
          handleNextPage={handleNext2}
          updateData={updateData}
          handleStepPage={handleStepPage}
          user_id={userid}
             handleDashboard={handleSideNext}
          handlePreviousPage={handlePrevious}
          handleSprintCancel={handleSprintCancel}

          />)}
          {(openCustomerSelection === false ? " " :
          <CustomerSelection
          openCustomerSelection={openCustomerSelection}
          handleStepPage={handleStepPage}
          handleNextPage={handleNext2}
          updateData={updateData}
          user_id={userid}
             handleDashboard={handleSideNext}
          handlePreviousPage={handlePrevious}
          handleSprintCancel={handleSprintCancel}

          />)}
          {(openCreateCustomeIntegration === false ? " " :
          <Createcustomeintegration
          openCreateCustomeIntegration={openCreateCustomeIntegration}
          handleStepPage={handleStepPage}
          user_id={userid}
             handleDashboard={handleSideNext}
          handleNextPage={handleNext2}
          handlePreviousPage={handlePrevious}
          handleSprintCancel={handleSprintCancel}

          />)}

{(openAddCustomerManually === false ? " " :
          <AddCustomerManually
          openAddCustomerManually={openAddCustomerManually}
          handleNextPage={handleNext1}
          handleStepPage={handleStepPage}
          user_id={userid}
             handleDashboard={handleSideNext}
          handlePreviousPage={handlePrevious}
          handleSprintCancel={handleSprintCancel}

          />)}
          {(openSelectCustomer === false ? " " :
          <SelectCustomerManually
          openSelectCustomer={openSelectCustomer}
          handleNextPage={handleNext1}
          handleStepPage={handleStepPage}
          user_id={userid}
          updateData={updateData}
             handleDashboard={handleSideNext}
          handlePreviousPage={handlePrevious}
          handleSprintCancel={handleSprintCancel}

          />)}
          {(openCustomerList === false ? " " :
          <CustomerList
          openCustomerList={openCustomerList}
          handleNextPage={handleNext2}
          handleStepPage={handleStepPage}
          user_id={userid}
          updateData={updateData}
             handleDashboard={handleSideNext}
          handlePreviousPage={handlePrevious}
          handleSprintCancel={handleSprintCancel}

          />)}
           {(openFutureCustomer === false ? " " :
          <FutureCustomer
          openFutureCustomer={openFutureCustomer}
          handleNextPage={handleNext2}
          handleStepPage={handleStepPage}
          user_id={userid}
          updateData={updateData}
             handleDashboard={handleSideNext}
          handlePreviousPage={handlePrevious}
          handleSprintCancel={handleSprintCancel}

          />)}
              {openImportOrder === false ? (
              " "
            ) : (
              <ImportShopfyOrder
                openImport={openImportOrder}
                userid={userid}
                updateData={updateDataOrder}
                handlePreviousPage={handleNext2}
                handleCancle={handleCancleImport}
                handleStepPage={handleStepPage}
              />
            )}

            {openOrderList === false ? (
              " "
            ) : (
              <OrderImportCreateForSetUp
                openorderimportcreate={openOrderList}
                integrationid={integrationid}
                importOrderData={importOrderData}
                handleStepPage={handleStepPage}
                importWorderData={importWorderData}
                userid={userid}
                handlePreviousPage={handleNext2}
                handleCancle={handleCancleImport}
              />
            )}
 {opencustomerimportadd === false ? (
              " "
            ) : (
              <CustomerImportAdd
                opencustomerimportadd={opencustomerimportadd}
                handleNextPage={handleNext2}
                handleStepPage={handleStepPage}
                importData={importData}
                importCustData={importCustData}
                selectintegration={selectintegration}
                packaging={packaging}
                user_id={userid}
                handlePreviousPage={handlePrevious}
          handleSprintCancel={handleSprintCancel}
              />
            )}

            {openorderimportcreate === false ? (
              " "
            ) : (
              <OrderImportCreate
                openorderimportcreate={openorderimportcreate}
                handleNextPage={handleNext2}
          handleStepPage={handleStepPage}
                user_id={userid}
                handlePreviousPage={handlePrevious}
          handleSprintCancel={handleSprintCancel}
              />
            )}


                 </Grid>
      </View>
    );
  }