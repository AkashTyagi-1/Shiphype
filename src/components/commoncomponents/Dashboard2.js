import React from 'react';
import clsx from 'clsx';
import {Platform,View,Image,Text,Dimensions,ScrollView} from 'react-native';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import HomeIcon from '@material-ui/icons/Home';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';

import  { data, options } from './feedback/Chart';
import { Bar } from 'react-chartjs-2';
import LineDemo  from './feedback/Chart1';
import LineDemo1  from './feedback/Chart2';
import Mapchart from './feedback/Mapchart';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import popUpStyle from './style/popUpStyle';

import SaveAltIcon from '@material-ui/icons/SaveAlt';
import BarChartIcon from '@material-ui/icons/BarChart';
import RefreshIcon from '@material-ui/icons/Refresh';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';
import NotInterestedOutlinedIcon from '@material-ui/icons/NotInterestedOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
//import Areoplane from '../../assets/icons/airplane.png';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import * as shiphypeService from './ShipService/shiphype_service';

import ProgressBar from './feedback/ProgressBar';
import SpeakerNotesOutlinedIcon from '@material-ui/icons/SpeakerNotesOutlined';
import CallToActionOutlinedIcon from '@material-ui/icons/CallToActionOutlined';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },

  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
 
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    backgroundColor:'#fff',
  },
  setWizardImage:{
    width: '66px', height: '63px',marginLeft:'47%',marginTop:'2%',borderRadius:'10%',
  },
  setWizardImage1:{
    width: '66px', height: '63px',marginLeft:'45%',marginTop:'2%',borderRadius:'10%',
  },
  serviceImage:{
    width: '66px',marginLeft:'45%', height: '63px',marginTop:'2.8%',
    borderRadius:'10%',backgroundColor:'#fff',
  },
  ServiceImage1:{
    width: '66px',marginLeft:'43%', height: '63px',marginTop:'3%',
    borderRadius:'10%',backgroundColor:'#fff',
  },
  servcieImg:{
    width: '66px',marginLeft:'43%', height: '63px',marginTop:'3%',
   borderRadius:'50%'
  },
  servcieImg1:{
    width: '66px',marginLeft:'40%', height: '63px',marginTop:'2%',
   borderRadius:'50%'
  },
  button2 :{
    border : ' 1px solid #c0ccda',
    borderRadius :'3px',
    // paddingTop: '10%',
    // paddingBottom: '10%',
    height:'94%',
    width:'100px',
    fontSize:'11px',
    fontWeight: '600',
    color:'rgba(27, 46, 75, 0.7)',
    // paddingLeft: '22%',
    // paddingRight: '22%',
    
  },
  buttonCal :{
    border : ' 1px solid #c0ccda',
    borderRadius :'3px',
    // paddingTop: '10%',
    // paddingBottom: '10%',
    height:'94%',
    marginLeft:'8px',
    marginRight:'18px',
    width:'180px',
    fontSize:'11px',
    fontWeight: '600',
    color:'rgba(27, 46, 75, 0.7)',
    // paddingLeft: '22%',
    // paddingRight: '22%',
    
  },
  buttonHome :{
    borderRadius : '3px',
    fontSize:'11px',
    fontWeight: '550',
    color:'#fff',
    backgroundColor:'#000',
    marginLeft:'8px',
    height:'94%',
    width:'100px',
    '&:hover': {
      color:'#fff',
      backgroundColor:'#595959',
    },
  },
  buttonOrder :{
    // border : ' 1px solid #c0ccda',
     borderRadius : '3px',
    height:'94%',
    width:'110px',
     fontSize:'11px',
     fontWeight: '550',
     marginLeft:'8px',
     color:'#fff',
     backgroundColor:'#0168fa',
    //  paddingLeft: '22%',
    //  paddingRight: '22%',
    '&:hover': {
      color:'#fff',
      backgroundColor: '#002080',
      
    },
   },


   button21 :{
    border : ' 1px solid #c0ccda',
    borderRadius :'3px',
    // paddingTop: '10%',
    // paddingBottom: '10%',
   // marginLeft:'40px',
    height:'94%',
    width:'100px',
    fontSize:'11px',
    fontWeight: '550',
    color:'rgba(27, 46, 75, 0.7)',
    // paddingLeft: '22%',
    // paddingRight: '22%',
    
  },
  buttonCal1 :{
    border : ' 1px solid #c0ccda',
    borderRadius :'3px',
    // paddingTop: '10%',
    // paddingBottom: '10%',
    height:'94%',
    marginLeft:'30px',
   // marginRight:'10px',
    width:'180px',
    fontSize:'11px',
    fontWeight: '550',
    color:'rgba(27, 46, 75, 0.7)',
    // paddingLeft: '22%',
    // paddingRight: '22%',
    
  },
  buttonHome1 :{
   // border : ' 1px solid #c0ccda',
    borderRadius : '3px',
    // paddingTop: '10%',
    // paddingBottom: '10%',
    fontSize:'11px',
    fontWeight: '550',
    color:'#fff',
    backgroundColor:'#000',
     marginLeft:'10px',
    // paddingLeft: '22%',
    // paddingRight: '22%',
    height:'94%',
    width:'100px',
    '&:hover': {
      color:'#fff',
      backgroundColor:'#595959',
    },
  },
  buttonOrder1 :{
    // border : ' 1px solid #c0ccda',
     borderRadius : '3px',
      marginLeft:'15px',
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    height:'94%',
    width:'110px',
     fontSize:'11px',
     fontWeight: '550',
     color:'#fff',
     backgroundColor:'#0168fa',
    //  paddingLeft: '22%',
    //  paddingRight: '22%',
    '&:hover': {
      color:'#fff',
      backgroundColor: '#002080',
      
    },
   },
 
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper1: {
    padding: theme.spacing(2),
     borderRadius:'0px',
    overflow: 'auto',
   border:'1px solid #cccccc',
  },
  paper9: {
    padding: theme.spacing(2),
     borderRadius:'0px',
    overflow: 'auto',
     height:'80vh'
  },
  paper2: {
   
    height:'auto',
    width:'98%',
     borderRadius:'0px',
  //  overflow: 'auto',
    border: '1px solid #cccccc',
   color: '#fff',
   textAlign:'center'
 
  },
  
  footCss9:{
   // border : ' 1px solid #fff',
    borderRadius:'8%',
    height:250,
    color: '#fff',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(3),

    textAlign:'center'
  },
  
  
  Dashboardpaper: {
    border: '1px solid #ced4da',
     height: 100,
     width: 240,
   
   
     marginLeft: '5%',
     marginTop: '8%'
   },
   title:{
    marginLeft: '1%',
   },
   Dashboardpaper2:{
    border: '1px solid #ced4da',
     height: 500,
     width: 270,
    borderRadius:'2px',
    marginLeft:'6px',
    
     marginTop: '1%'
   },
   Dashboardpaper3:{
    border: '1px solid #ced4da',
     height: 500,
     width: 270,
    borderRadius:'2px',
    marginLeft:'77px',
   
     marginTop: '1%'
   },
   Dashboardpaperforscreen2:{
    border: '1px solid #ced4da',
     height: 500,
     width: 200,
    borderRadius:'2px',
    marginLeft:'6px',
    
     marginTop: '1%'
   },
   Dashboardpaperforscreen3:{
    border: '1px solid #ced4da',
     height:345,
     width: 270,
    borderRadius:'2px',
    marginLeft:'77px',
   
     marginTop: '1%'
   },
   Dashboardpaperforscreen4:{
    border: '1px solid #ced4da',
    height:150,
    width: 270,
   borderRadius:'2px',
   marginLeft:'60px',
  
    marginTop: '-11%'
   },
   dividerFullWidth1: {
   marginTop:'4%',
    
  },
  root1: {
    flexGrow: 1,
    margin:theme.spacing(6),
  },

// my designing  starting here


  paperoffirstscreen11:{
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height:'80vh',
    marginTop:theme.spacing(2),
  },
  paperofsecondscreen22:{
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height:'61vh',
    marginTop:theme.spacing(3),
  },
  paperofsecondscreen33:{

    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginTop:theme.spacing(2),
    height:'15vh',
  },


  paperoffirstscreen111:{
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height:'80vh',
    marginTop:theme.spacing(2),
  },
  paperofsecondscreen221:{
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height:'90vh',
    marginTop:theme.spacing(3),
  },
  paperofsecondscreen333:{
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginTop:theme.spacing(2),
    height:'30vh'
  },
  setupviewforsecondscreentable:{
    marginTop:theme.spacing(11),
  },




  setupviewforfirstscreenviewthird1:{
    padding: theme.spacing(2),
    //textAlign: 'center',
    color: theme.palette.text.secondary,
    height:'95vh',
    marginTop:theme.spacing(2),
    
  },
  setupviewforsecondscreenviewthird2:{
    padding: theme.spacing(2),
    //textAlign: 'center',
    color: theme.palette.text.secondary,
    height:'95vh',
    marginTop:theme.spacing(2),
    
  },
  setupviewforthirdscreenviewthird3:{
    padding: theme.spacing(2),
    //textAlign: 'center',
    color: theme.palette.text.secondary,
    height:'95vh',
    marginTop:theme.spacing(2),
  
  },

  setupviewforfirstscreenviewthird4:{
    padding: theme.spacing(2),
    //textAlign: 'center',
    color: theme.palette.text.secondary,
    height:'105vh',
    marginTop:theme.spacing(2),
    
  },
  setupviewforsecondscreenviewthird5:{
    padding: theme.spacing(2),
    //textAlign: 'center',
    color: theme.palette.text.secondary,
    height:'105vh',
    marginTop:theme.spacing(2),
    
  },
  setupviewforthirdscreenviewthird6:{
    padding: theme.spacing(2),
    //textAlign: 'center',
    color: theme.palette.text.secondary,
    height:'105vh',
    marginTop:theme.spacing(2),
  
  },

  setupviewforfirstscreenviewthird7:{
    padding: theme.spacing(2),
    //textAlign: 'center',
    color: theme.palette.text.secondary,
    height:'120vh',
    marginTop:theme.spacing(2),
    
  },
  setupviewforsecondscreenviewthird8:{
    padding: theme.spacing(2),
    //textAlign: 'center',
    color: theme.palette.text.secondary,
    height:'120vh',
    marginTop:theme.spacing(2),
    
  },
  setupviewforthirdscreenviewthird9:{
    padding: theme.spacing(2),
    //textAlign: 'center',
    color: theme.palette.text.secondary,
    height:'120vh',
    marginTop:theme.spacing(2),
  
  },







  setupviewforfirstscreenviewthird11:{
    padding: theme.spacing(2),
    //textAlign: 'center',
    color: theme.palette.text.secondary,
    height:'90vh',
    marginTop:theme.spacing(2),
     
  },
  setupviewforsecondscreenviewthird22:{
    padding: theme.spacing(2),
    //textAlign: 'center',
    color: theme.palette.text.secondary,
    height:'90vh',
    marginTop:theme.spacing(2),
    
  },
  setupviewforthirdscreenviewthird33:{
    padding: theme.spacing(2),
    //textAlign: 'center',
    color: theme.palette.text.secondary,
    height:'90vh',
    marginTop:theme.spacing(2),
   
  },
  setupviewforchartContainerforthirdscreen4:{
    height: 300,
    position: 'relative',
    marginTop:theme.spacing(3),
  },
  setupviewforchartContainerforthirdscreen44:{
    height: 300,
    position: 'relative'
  
  },
// my designing ending here






  paperoffirstscreen1:{
    padding: theme.spacing(2),
    //textAlign: 'center',
    color: theme.palette.text.secondary,
    height:'65vh',
    marginTop:theme.spacing(2),
   
  },
  paperofsecondscreen1: {
     padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height:'80vh',
   
  },
  paperofsecondscreen2: {
     padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height:'65vh',
    marginTop:theme.spacing(2),
  
  },
  paperofsecondscreen3: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginTop:theme.spacing(2),
    height:'15vh',
    
  },
  fontsizepaper: {
    fontSize: 10,
    text:'bold',
    marginLeft:'10px',
    marginTop:'10px',
  },
  numbersize:{
    fontSize: 18,
    text:'bold',
    marginLeft:'10px',
  },
  numbersizepercentage:{
    fontSize:10,
    color: '#F6072F',
    marginTop:'10px',
    marginLeft:'3px',
  },
  
  numbersizepercentage2:{
    fontSize:10,
    color: '#0FB559',
    marginTop:'10px',
    marginLeft:'3px',
  },
  fontsizepaper3:{
    fontSize: 12,
    text:'bold',
    marginLeft:'1px',
    marginTop:'10px',
  },
  typography:{
    marginTop:'10px',
    marginLeft:theme.spacing(2),
  },
  typographylowinventary:{
    marginTop:'10px',
    marginLeft:theme.spacing(1),
  },
  typography2:{
    marginTop:'8px',
    marginLeft:theme.spacing(1),
    fontSize: 12,
   
  },
  typography3:{
    marginTop:'8px',
    marginLeft:theme.spacing(1),
    fontSize: 12,
   
  },
  footCss:{
   // border : ' 1px solid #fff',
    borderRadius:'8%',
   // border:'1px solid #cccccc',
    color: '#fff',
    textAlign:'center',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    marginTop:'3px',
  },
  paper: {
    padding: theme.spacing(1),
    borderRadius:'0px',
   overflow: 'auto',
   backgroundColor:'#fff',
  },
  fixedHeight: {
    height: 240,
  },
  avatarsmall: {
    marginLeft:'50px',
    width: theme.spacing(5.5),
    height: theme.spacing(5.5),
  },
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  // fixedHeight1: {
  //   height: 305,
  // },
  chartContainer: {
    height: 300,
    position: 'relative'
  },

  chartContainer1: {
    height: 70,
    //position: 'relative'
  },
  chartContainer4: {
    height: 300,
    //position: 'relative'
  },
  paperforcard1: {
     
    width: theme.spacing(4),
    height: theme.spacing(4),
    backgroundColor: "#06E3D4"
  },
  paperforcard2: {
   
    width: theme.spacing(4),
    height: theme.spacing(4),
    backgroundColor: "#F87BB4"
  },
  paperforcard3: {
   
    width: theme.spacing(4),
    height: theme.spacing(4),
    backgroundColor: "#98BBD3"
  },


  barchart1:{
  color:'white',
  width: theme.spacing(3),
  height: theme.spacing(3),
  marginTop:'2px'
  
  },
  barchart2:{
    color:'white',
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginTop:'2px'
    
  },
  barchart3:{
    color:'white',
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginTop:'2px'
  
  },
}));

  // let screenWidth = Dimensions.get('window').width;
  // // console.log(screenWidth);
  //  let scrollHeight=0;
  //  if(screenWidth<400)
  //  {
  //     scrollHeight='47vh';
  //  }
  //  else if(screenWidth<690)
  //  {
  //     scrollHeight='30vh';
  //  }
  //  else{
  //     scrollHeight='80vh';
  //  }
  export default function Dashboard(props) {
    const classes = useStyles();
    const [completed, setCompleted] = React.useState(0);
    const [buffer, setBuffer] = React.useState(10);
    const [progressBar, setProgress] = React.useState(true);
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight1);   
  const [editSprint,setEditSprint]=React.useState(null);
  const[value,setValue]=React.useState('7');
  const [openShipPolicy, setOpenShipPloicy] = React.useState(false);
  const [openCarries, setOpenCarries] = React.useState(false);
  const [openSprint, setOpenMarketPlace] = React.useState(false);
  const [openNextReturn, setOpenNextReturn] = React.useState(false);
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
  const [openPageExits, setPageExits] = React.useState(0);
  //  const [Grosstaxnetearning,setGrosstaxnetearning]=React.useState([]);
  // const [Totalselesavgsels,setTotalselesavgsels]=React.useState([]);

  const [shipedToday,setShipedToday]=React.useState(3137);
  const [shipedTodayP,setShipedTodayP]=React.useState('0.7%');
  const [pendingOrder,setPendingOrder]=React.useState(13);
  const [pendingOrderP,setPendingOrderP]=React.useState('1.2%');
  const [holdOrder,setHoldOrder]=React.useState(2);
  const [holdOrderP,setHoldOrderP]=React.useState('2.1%');
  const [savingtoOrder,setSavingtoOrder]=React.useState(306.20);
  const [savingtoOrderP,setSavingtoOrderP]=React.useState('0.3%');
  const [loading,setLoading]=React.useState(true);

  const [state, setState] = React.useState({
    MarketPlaceIntegration: false,
    ShippingProfile: false,
  //  ProductImport:false,
    ProductSync:false,
    ImportCustomers:false,
  });
  function createData(name: string, calories: string, fat: string, carbs:string , protein: string) {
    return { name, calories, fat, carbs, protein };
  }
  
function createDatafortransectionhistory(icon:string , payment:string ,paymentdate:string,money:string , paymentstatus:string){

return{icon , payment ,paymentdate, money , paymentstatus};
}
function createDatafortopsellingproduct(iconcircle:string,payment:string ,paymentdate:string, iconmessage:String,iconinvalide:string,iconepeople:string){
  return{iconcircle,payment ,paymentdate , iconmessage,iconinvalide,iconepeople} ;
};

function createGrosstaxnetearning(grossearning:string ,taxwithheld:string , netearning:string){
  return{grossearning,taxwithheld,netearning} ;
};
function createTotalselesavgsels(totalseles:string,avgsales:string){
  return{totalseles,avgsales} ;
};



  const rows = [
    createData('03/05/2018', '1050', '+$32580', '+$32580', '+$32580'),
    createData('03/05/2018', '1050', '+$32580', '+$32580', '+$32580'),
    createData('03/05/2018', '1050', '+$32580', '+$32580', '+$32580'),
    createData('03/05/2018', '1050', '+$32580', '+$32580', '+$32580'),
    createData('03/05/2018', '1050', '+$32580', '+$32580', '+$32580'),
    createData('03/05/2018', '1050', '+$32580', '+$32580', '+$32580'),
    createData('03/05/2018', '1050', '+$32580', '+$32580', '+$32580'),
    createData('03/05/2018', '1050', '+$32580', '+$32580', '+$32580'),
    createData('03/05/2018', '1050', '+$32580', '+$32580', '+$32580'),
    createData('03/05/2018', '1050', '+$32580', '+$32580', '+$32580'),
    createData('03/05/2018', '1050', '+$32580', '+$32580', '+$32580'),
    createData('03/05/2018', '1050', '+$32580', '+$32580', '+$32580'),
    createData('03/05/2018', '1050', '+$32580', '+$32580', '+$32580'),
    createData('03/05/2018', '1050', '+$32580', '+$32580', '+$32580'),
    createData('03/05/2018', '1050', '+$32580', '+$32580', '+$32580'),
    createData('03/05/2018', '1050', '+$32580', '+$32580', '+$32580'),
    createData('03/05/2018', '1050', '+$32580', '+$32580', '+$32580'),
    createData('03/05/2018', '1050', '+$32580', '+$32580', '+$32580'),
    createData('03/05/2018', '1050', '+$32580', '+$32580', '+$32580'),
    createData('03/05/2018', '1050', '+$32580', '+$32580', '+$32580'),
    createData('03/05/2018', '1050', '+$32580', '+$32580', '+$32580'),
    createData('03/05/2018', '1050', '+$32580', '+$32580', '+$32580'),
    createData('03/05/2018', '1050', '+$32580', '+$32580', '+$32580'),
    createData('03/05/2018', '1050', '+$32580', '+$32580', '+$32580'),
    createData('03/05/2018', '1050', '+$32580', '+$32580', '+$32580'),
    createData('03/05/2018', '1050', '+$32580', '+$32580', '+$32580'),
    createData('03/05/2018', '1050', '+$32580', '+$32580', '+$32580'),
    createData('03/05/2018', '1050', '+$32580', '+$32580', '+$32580'),
    createData('03/05/2018', '1050', '+$32580', '+$32580', '+$32580'),
    createData('03/05/2018', '1050', '+$32580', '+$32580', '+$32580'),
    // createData('03/05/2018', '1050', '+$32580', '32580', '32580'),
    // createData('03/05/2018', '1050', '+$32580', '32580', '32580'),
    // createData('03/05/2018', '1050', '+$32580', '32580', '32580'),
    // createData('03/05/2018', '1050', '+$32580', '32580', '32580'),
    // createData('03/04/2018', 980, 32580, 32580, 32580),
    // createData('03/04/2018', 980, 32580, 325804,32580),
    // createData('03/04/2018', 980, 32580, 32580, 32580),
    // createData('03/04/2018', 980, 32580, 32580, 32580),
    // createData('03/04/2018', 980, 32580, 32580, 32580),
  ];

const shipData =[

  createDatafortransectionhistory('CheckCircleIcon', 'payment from #1032250', 'Mar 21,2019,3:30pm', ' +$250.00', ' completed'),
  createDatafortransectionhistory('CancelIcon', 'payment from #1032250', 'Mar 21,2019,3:30pm', ' +$250.00', 'declined'),
  createDatafortransectionhistory('CheckCircleIcon', 'payment from #1032250', 'Mar 21,2019,3:30pm', ' +$250.00', ' completed'),
  createDatafortransectionhistory('CancelIcon', 'payment from #1032250', 'Mar 21,2019,3:30pm', ' +$250.00', 'declined'),
  createDatafortransectionhistory('CheckCircleIcon', 'payment from #1032250', 'Mar 21,2019,3:30pm', ' +$250.00', ' completed'),
  createDatafortransectionhistory('CancelIcon', 'payment from #1032250', 'Mar 21,2019,3:30pm', ' +$250.00', 'declined'),
  createDatafortransectionhistory('CheckCircleIcon', 'payment from #1032250', 'Mar 21,2019,3:30pm', ' +$250.00', ' completed'),
  createDatafortransectionhistory('CancelIcon', 'payment from #1032250', 'Mar 21,2019,3:30pm', ' +$250.00', 'declined'),
  createDatafortransectionhistory('CheckCircleIcon', 'payment from #1032250', 'Mar 21,2019,3:30pm', ' +$250.00', ' completed'),
  createDatafortransectionhistory('CancelIcon', 'payment from #1032250', 'Mar 21,2019,3:30pm', ' +$250.00', 'declined'),
  createDatafortransectionhistory('CheckCircleIcon', 'payment from #1032250', 'Mar 21,2019,3:30pm', ' +$250.00', ' completed'),
  createDatafortransectionhistory('CancelIcon', 'payment from #1032250', 'Mar 21,2019,3:30pm', ' +$250.00', 'declined'),
  createDatafortransectionhistory('CheckCircleIcon', 'payment from #1032250', 'Mar 21,2019,3:30pm', ' +$250.00', ' completed'),
  createDatafortransectionhistory('CancelIcon', 'payment from #1032250', 'Mar 21,2019,3:30pm', ' +$250.00', 'declined'),
  createDatafortransectionhistory('CheckCircleIcon', 'payment from #1032250', 'Mar 21,2019,3:30pm', ' +$250.00', ' completed'),
  createDatafortransectionhistory('CancelIcon', 'payment from #1032250', 'Mar 21,2019,3:30pm', ' +$250.00', 'declined'),
  createDatafortransectionhistory('CheckCircleIcon', 'payment from #1032250', 'Mar 21,2019,3:30pm', ' +$250.00', ' completed'),
  createDatafortransectionhistory('CancelIcon', 'payment from #1032250', 'Mar 21,2019,3:30pm', ' +$250.00', 'declined'),
  createDatafortransectionhistory('CheckCircleIcon', 'payment from #1032250', 'Mar 21,2019,3:30pm', ' +$250.00', ' completed'),
  createDatafortransectionhistory('CancelIcon', 'payment from #1032250', 'Mar 21,2019,3:30pm', ' +$250.00', 'declined'),
  createDatafortransectionhistory('CheckCircleIcon', 'payment from #1032250', 'Mar 21,2019,3:30pm', ' +$250.00', ' completed'),
  createDatafortransectionhistory('CancelIcon', 'payment from #1032250', 'Mar 21,2019,3:30pm', ' +$250.00', 'declined'),
  createDatafortransectionhistory('CheckCircleIcon', 'payment from #1032250', 'Mar 21,2019,3:30pm', ' +$250.00', ' completed'),
  createDatafortransectionhistory('CancelIcon', 'payment from #1032250', 'Mar 21,2019,3:30pm', ' +$250.00', 'declined'),
  createDatafortransectionhistory('CheckCircleIcon', 'payment from #1032250', 'Mar 21,2019,3:30pm', ' +$250.00', ' completed'),
  createDatafortransectionhistory('CancelIcon', 'payment from #1032250', 'Mar 21,2019,3:30pm', ' +$250.00', 'declined'),
  createDatafortransectionhistory('CheckCircleIcon', 'payment from #1032250', 'Mar 21,2019,3:30pm', ' +$250.00', ' completed'),
  createDatafortransectionhistory('CancelIcon', 'payment from #1032250', 'Mar 21,2019,3:30pm', ' +$250.00', 'declined'),
  createDatafortransectionhistory('CheckCircleIcon', 'payment from #1032250', 'Mar 21,2019,3:30pm', ' +$250.00', ' completed'),
  createDatafortransectionhistory('CancelIcon', 'payment from #1032250', 'Mar 21,2019,3:30pm', ' +$250.00', 'declined'),
  createDatafortransectionhistory('CheckCircleIcon', 'payment from #1032250', 'Mar 21,2019,3:30pm', ' +$250.00', ' completed'),
  createDatafortransectionhistory('CancelIcon', 'payment from #1032250', 'Mar 21,2019,3:30pm', ' +$250.00', 'declined'),
  createDatafortransectionhistory('CheckCircleIcon', 'payment from #1032250', 'Mar 21,2019,3:30pm', ' +$250.00', ' completed'),
  createDatafortransectionhistory('CancelIcon', 'payment from #1032250', 'Mar 21,2019,3:30pm', ' +$250.00', 'declined'),
  createDatafortransectionhistory('CheckCircleIcon', 'payment from #1032250', 'Mar 21,2019,3:30pm', ' +$250.00', ' completed'),
  createDatafortransectionhistory('CancelIcon', 'payment from #1032250', 'Mar 21,2019,3:30pm', ' +$250.00', 'declined'),
  createDatafortransectionhistory('CheckCircleIcon', 'payment from #1032250', 'Mar 21,2019,3:30pm', ' +$250.00', ' completed'),
  createDatafortransectionhistory('CancelIcon', 'payment from #1032250', 'Mar 21,2019,3:30pm', ' +$250.00', 'declined'),
 
 
  
];
  

const shipData2 =[

  createDatafortopsellingproduct('', 'payment from #1032250', 'Mar 21,2019,3:30pm', '', '',''),
  createDatafortopsellingproduct('', 'payment from #1032250', 'Mar 21,2019,3:30pm', '', '',''),
  createDatafortopsellingproduct('', 'payment from #1032250', 'Mar 21,2019,3:30pm', '', '',''),
  createDatafortopsellingproduct('', 'payment from #1032250', 'Mar 21,2019,3:30pm', '', '',''),
  createDatafortopsellingproduct('', 'payment from #1032250', 'Mar 21,2019,3:30pm', '', '',''),
  createDatafortopsellingproduct('', 'payment from #1032250', 'Mar 21,2019,3:30pm', '', '',''),
  createDatafortopsellingproduct('', 'payment from #1032250', 'Mar 21,2019,3:30pm', '', '',''),
  createDatafortopsellingproduct('', 'payment from #1032250', 'Mar 21,2019,3:30pm', '', '',''),
  createDatafortopsellingproduct('', 'payment from #1032250', 'Mar 21,2019,3:30pm', '', '',''),
  createDatafortopsellingproduct('', 'payment from #1032250', 'Mar 21,2019,3:30pm', '', '',''),
  createDatafortopsellingproduct('', 'payment from #1032250', 'Mar 21,2019,3:30pm', '', '',''),
  createDatafortopsellingproduct('', 'payment from #1032250', 'Mar 21,2019,3:30pm', '', '',''),
  createDatafortopsellingproduct('', 'payment from #1032250', 'Mar 21,2019,3:30pm', '', '',''),
  createDatafortopsellingproduct('', 'payment from #1032250', 'Mar 21,2019,3:30pm', '', '',''),
  createDatafortopsellingproduct('', 'payment from #1032250', 'Mar 21,2019,3:30pm', '', '',''),
  createDatafortopsellingproduct('', 'payment from #1032250', 'Mar 21,2019,3:30pm', '', '',''),
  createDatafortopsellingproduct('', 'payment from #1032250', 'Mar 21,2019,3:30pm', '', '',''),
  createDatafortopsellingproduct('', 'payment from #1032250', 'Mar 21,2019,3:30pm', '', '',''),
  createDatafortopsellingproduct('', 'payment from #1032250', 'Mar 21,2019,3:30pm', '', '',''),
  createDatafortopsellingproduct('', 'payment from #1032250', 'Mar 21,2019,3:30pm', '', '',''),
  createDatafortopsellingproduct('', 'payment from #1032250', 'Mar 21,2019,3:30pm', '', '',''),
  createDatafortopsellingproduct('', 'payment from #1032250', 'Mar 21,2019,3:30pm', '', '',''),
  createDatafortopsellingproduct('', 'payment from #1032250', 'Mar 21,2019,3:30pm', '', '',''),
  createDatafortopsellingproduct('', 'payment from #1032250', 'Mar 21,2019,3:30pm', '', '',''),
  createDatafortopsellingproduct('', 'payment from #1032250', 'Mar 21,2019,3:30pm', '', '',''),
  createDatafortopsellingproduct('', 'payment from #1032250', 'Mar 21,2019,3:30pm', '', '',''),
  createDatafortopsellingproduct('', 'payment from #1032250', 'Mar 21,2019,3:30pm', '', '',''),
  createDatafortopsellingproduct('', 'payment from #1032250', 'Mar 21,2019,3:30pm', '', '',''),
  createDatafortopsellingproduct('', 'payment from #1032250', 'Mar 21,2019,3:30pm', '', '',''),
  createDatafortopsellingproduct('', 'payment from #1032250', 'Mar 21,2019,3:30pm', '', '',''),
  createDatafortopsellingproduct('', 'payment from #1032250', 'Mar 21,2019,3:30pm', '', '',''),
  createDatafortopsellingproduct('', 'payment from #1032250', 'Mar 21,2019,3:30pm', '', '',''),
  createDatafortopsellingproduct('', 'payment from #1032250', 'Mar 21,2019,3:30pm', '', '',''),
  createDatafortopsellingproduct('', 'payment from #1032250', 'Mar 21,2019,3:30pm', '', '',''),
  createDatafortopsellingproduct('', 'payment from #1032250', 'Mar 21,2019,3:30pm', '', '',''),
  createDatafortopsellingproduct('', 'payment from #1032250', 'Mar 21,2019,3:30pm', '', '',''),
  createDatafortopsellingproduct('', 'payment from #1032250', 'Mar 21,2019,3:30pm', '', '',''),
  createDatafortopsellingproduct('', 'payment from #1032250', 'Mar 21,2019,3:30pm', '', '',''),
  createDatafortopsellingproduct('', 'payment from #1032250', 'Mar 21,2019,3:30pm', '', '',''),
  createDatafortopsellingproduct('', 'payment from #1032250', 'Mar 21,2019,3:30pm', '', '',''),
  createDatafortopsellingproduct('', 'payment from #1032250', 'Mar 21,2019,3:30pm', '', '',''),
  createDatafortopsellingproduct('', 'payment from #1032250', 'Mar 21,2019,3:30pm', '', '',''),
  createDatafortopsellingproduct('', 'payment from #1032250', 'Mar 21,2019,3:30pm', '', '',''),
  createDatafortopsellingproduct('', 'payment from #1032250', 'Mar 21,2019,3:30pm', '', '',''),
  createDatafortopsellingproduct('', 'payment from #1032250', 'Mar 21,2019,3:30pm', '', '',''),
  createDatafortopsellingproduct('', 'payment from #1032250', 'Mar 21,2019,3:30pm', '', '',''),
  createDatafortopsellingproduct('', 'payment from #1032250', 'Mar 21,2019,3:30pm', '', '',''),
  createDatafortopsellingproduct('', 'payment from #1032250', 'Mar 21,2019,3:30pm', '', '',''),
 
];




  const rows2 = [
    createData('03/05/2018', 1050, 32580, 32580, 32580),
    createData('03/04/2018', 980, 32580, 32580, 32580),
    createData('03/04/2018', 980, 32580, 325804,32580),
    createData('03/04/2018', 980, 32580, 32580, 32580),
    createData('03/05/2018', 1050, 32580, 32580, 32580),
    createData('03/04/2018', 980, 32580, 32580, 32580),
    createData('03/04/2018', 980, 32580, 325804,32580),
    createData('03/04/2018', 980, 32580, 32580, 32580),
    createData('03/05/2018', 1050, 32580, 32580, 32580),
    createData('03/04/2018', 980, 32580, 32580, 32580),
    createData('03/04/2018', 980, 32580, 325804,32580),
    createData('03/04/2018', 980, 32580, 32580, 32580),
    createData('03/05/2018', 1050, 32580, 32580, 32580),
    createData('03/04/2018', 980, 32580, 32580, 32580),
    createData('03/04/2018', 980, 32580, 325804,32580),
    createData('03/04/2018', 980, 32580, 32580, 32580),
    createData('03/05/2018', 1050, 32580, 32580, 32580),
    createData('03/04/2018', 980, 32580, 32580, 32580),
    createData('03/04/2018', 980, 32580, 325804,32580),
    createData('03/04/2018', 980, 32580, 32580, 32580),
    createData('03/05/2018', 1050, 32580, 32580, 32580),
    createData('03/04/2018', 980, 32580, 32580, 32580),
    createData('03/04/2018', 980, 32580, 325804,32580),
    createData('03/04/2018', 980, 32580, 32580, 32580),
    
    
  ];
  // const rootElement = document.getElementById("root");
  // ReactDOM.render(<App />, rootElement);
const Grosstaxnetearning =[

  createGrosstaxnetearning('$1958,104','$1958,104','$1958,104'),

];

const  Totalselesavgsels=[
  createTotalselesavgsels('$1958,104','$1958,104'),
];

  const handleChangeRadio = (event) => {
    setValue(event.target.value);
   
  };
  const { MarketPlaceIntegration, ShippingProfile,ProductSync,ImportCustomers} = state;
    const progress = React.useRef(() => {});
    React.useEffect(() => {
      progress.current = () => {
        if (completed > 100) {
          setProgress(false);
        } else {
          const diff = Math.random() * 10;
          const diff2 = Math.random() * 10;
          setCompleted(completed + diff);
          setBuffer(completed + diff + diff2);
        }
      };
    });
  /**
   * screen size
   */

//   let screenWidth = Dimensions.get('window').width;
//   console.log(screenWidth);
//   let setupwizrd=0;
//   let setupbutton=0;
//   let setupbutton9=0;
//  let footCss=0;
//  let scrollHeight=0;
//  let footCss9=0;
//   if(screenWidth<400)
// {
//   setupwizrd=classes.paper7;
//   setupbutton= classes.button7;
//   footCss=classes.footCss;
//   scrollHeight='47vh';
// }
// else if(screenWidth<690)
// {
//   setupwizrd=classes.paper7;
// setupbutton= classes.button7;
// footCss=classes.footCss;
// scrollHeight='30vh';
// }
// else if(screenWidth<1530){
// setupwizrd=classes.paper2;
// setupbutton= classes.button4;
// footCss=classes.footCss9;
// setupbutton9=classes.setupbutton9;
// scrollHeight='80vh';

// }
// else{
//   setupwizrd=classes.paper2;
//   setupbutton= classes.button4;
//   footCss=classes.footCss9;
//   scrollHeight='80vh';
// }

let screenWidth1 = Dimensions.get('window').width;
  console.log(screenWidth1);
  let setupviewforfirstscreen=0;
  let setupviewforsecondscreen=0;
  let setupviewforthirdscreen=0;
  let setupviewforsecondscreentable=0;


  let setupviewforfirstscreenviewthird=0;
  let setupviewforsecondscreenviewthird=0;
  let setupviewforthirdscreenviewthird=0;
  let setupviewforchartContainerforthirdscreen=0;
//  let footCss=0;
//  let footCss9=0;
  if(screenWidth1<400)
{
  setupviewforfirstscreen=classes.paperoffirstscreen111;
  setupviewforsecondscreen=classes.paperofsecondscreen221;
  setupviewforthirdscreen=classes.paperofsecondscreen333;
  setupviewforsecondscreentable=classes.setupviewforsecondscreentable;

  setupviewforfirstscreenviewthird=classes.setupviewforfirstscreenviewthird1;
  setupviewforsecondscreenviewthird=classes.setupviewforsecondscreenviewthird2;
  setupviewforthirdscreenviewthird=classes.setupviewforthirdscreenviewthird3;
  setupviewforchartContainerforthirdscreen=classes.setupviewforchartContainerforthirdscreen4;

}else if(screenWidth1<690){




  setupviewforfirstscreenviewthird=classes.setupviewforfirstscreenviewthird4;
  setupviewforsecondscreenviewthird=classes.setupviewforsecondscreenviewthird5;
  setupviewforthirdscreenviewthird=classes.setupviewforthirdscreenviewthird6;
  setupviewforchartContainerforthirdscreen=classes.setupviewforchartContainerforthirdscreen4;

}else if(screenWidth1<1500){




  setupviewforfirstscreenviewthird=classes.setupviewforfirstscreenviewthird7;
  setupviewforsecondscreenviewthird=classes.setupviewforsecondscreenviewthird8;
  setupviewforthirdscreenviewthird=classes.setupviewforthirdscreenviewthird9;
  setupviewforchartContainerforthirdscreen=classes.setupviewforchartContainerforthirdscreen4;
}
else{
  setupviewforfirstscreen=classes.paperoffirstscreen11;
  setupviewforsecondscreen=classes.paperofsecondscreen22;
  setupviewforthirdscreen=classes.paperofsecondscreen33;
 

  setupviewforfirstscreenviewthird=classes.setupviewforfirstscreenviewthird11;
  setupviewforsecondscreenviewthird=classes.setupviewforsecondscreenviewthird22;
  setupviewforthirdscreenviewthird=classes.setupviewforthirdscreenviewthird33;
  setupviewforchartContainerforthirdscreen=classes.setupviewforchartContainerforthirdscreen44;

}
React.useEffect(() => {
 fetchOrderOverview(props.user_id);
}, []);

const fetchOrderOverview = (userid) => {    
  setLoading(true);
  shiphypeService.fetchOrderOverview(userid)
        .then(response => {
         console.log("status",response.status);
              if(response.status === true) {
                setLoading(false);
                setShipedToday(response.data[0].shipped);
                setShipedTodayP(response.data[0].shippedpercentage);
                setPendingOrder(response.data[0].pending);
                setPendingOrderP(response.data[0].pendingpercentage);
                setHoldOrder(response.data[0].onhold);
                setHoldOrderP(response.data[0].onholdpercentage);
                setSavingtoOrder(response.data[0].savingtodate);
                //setSavingtoOrderP(response.data.savingtodate);
                         }else{
                          setLoading(false);
                          console.log("message",response.message);
                         }   
            }).catch((error) =>{
                  console.error(error);
            });
};

    React.useEffect(() => {
      function tick() {
        progress.current();
      }
      const timer = setInterval(tick, 500);
  
      return () => {
        clearInterval(timer);
      };
    }, []);

/**
 * Description:To do checklist of steps
 */
    const handleChange = (event) => {
      setState({ ...state, [event.target.name]: event.target.checked });
    };
/**
          * Description;To do cancel Sprint poup screen
          */
         const handleSprintCancel =(isSprintCreate)=>{
          
         
            setEditSprint(null);
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
          
         } 
         /**
          * Description;To do cancel Sprint poup screen
          */
         const handlePrevious =(isSprintCreate)=>{
          if(isSprintCreate === 1){
            
            setOpenNextReturn(false);
            setOpenMarketPlace(true);
           
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
            setOpenCarries(true);
            setOpenReturn(false);
           
          }
          else if(isSprintCreate === 5){
            setOpenReturn(true);
            setOpenReturnPreFilled(false);  
            setOpenCustomePromotional(false);
           
          }
          else if(isSprintCreate === 6){
            if(openPageExits!==0)
            {
              handleNext(openPageExits);
              setPageExits(0);
            }
            else{ 
              setOpenReturnPreFilled(true);
            setOpenCustomePromotional(false);
             }
            
           
          }
          else if(isSprintCreate === 7){
           
              setOpenCustomePromotional(true);
              setOpenCustomePackaging(false);
            
           
          }
          else if(isSprintCreate === 8){
            setOpenCustomePackaging(true);
            setOpenProductSelection(false);
           
          }
          else if(isSprintCreate === 9){
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
            if(openPageExits!==0 && openPageExits!==5)
            {
              handleNext(openPageExits);
              setPageExits(0);
            }
            else{ 
              setOpenImportProduct(true);
            setOpenProductList(false);
             }
            
           
           
          }
          else if(isSprintCreate === 13){
            setOpenProductList(true);
            setOpenCustomerSelection(false);
           
          }
          else if(isSprintCreate === 14){
           // setOpenProductList(true);
            setOpenCustomerSelection(true);
           
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
            setOpenMarketPlace(true);
          }
          
         } 
         const handleNext1 =(isSprintCreate,pageExits)=>{
           if(isSprintCreate === 6){
            setOpenReturnPreFilled(true);
            setOpenReturn(false);
           
           
          }
          else if(isSprintCreate === 13){
            setOpenProductList(true);
            setOpenProductImport(false);
          //  setOpenReturn(false); 
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

         }
         /**
          * Description;To do cancel Sprint poup screen
          */
         const handleNext =(isSprintCreate)=>{
          
          if(isSprintCreate === 2){
            
            setOpenNextReturn(true);
            setOpenMarketPlace(false);
           
          }
          else if(isSprintCreate === 3){
            setOpenShipPloicy(true);
            setOpenNextReturn(false);
          
           
          }   
         else if(isSprintCreate === 4){
            setOpenCarries(true);
            setOpenShipPloicy(false);
           
          }
          else if(isSprintCreate === 5){
            setOpenReturn(true);
            setOpenCarries(false);
            setOpenCustomePromotional(false);
           
          }
          else if(isSprintCreate === 6){
            setOpenReturnPreFilled(true);
            setOpenReturn(false);
           
          }
          else if(isSprintCreate === 7){
            setOpenCustomePromotional(true);
            setOpenReturnPreFilled(false);  
            setOpenReturn(false);
          }
          else if(isSprintCreate === 8){
            setOpenCustomePackaging(true);
            setOpenCustomePromotional(false);
          }
          else if(isSprintCreate === 9){
            setOpenProductSelection(true);
            setOpenCustomePackaging(false);
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
            setOpenImportProduct(false);
          }
          else if(isSprintCreate === 14){
            setOpenProductList(false);
            setOpenCustomerSelection(true);
          }
          else if(isSprintCreate === 15){
          //  setOpenProductList(false);
          setOpenMarketPlace(false);
            setOpenCreateCustomeIntegration(true);
          }
          else if(isSprintCreate === 16){
            //  setOpenProductList(false);
            setOpenMarketPlace(true);
            setOpenCreateCustomeIntegration(false);
            }else{
            
            setOpenMarketPlace(false); 
            setOpenCreateCustomeIntegration(false);
          }
          
         } 
         
         let screenWidth = Dimensions.get('window').width;
  console.log(screenWidth);
  let setupwizrd=0;
  let setupbutton=0;
  let setupbutton9=0;
 let footCss=0;
 let footCss9=0;
 let button1='';
 let button2='';
 let button3='';
 let button4='';
 let s1='';
 let s2='';
 let s4='';
 let s3='';
 let scrollHeight='';
  if(screenWidth<400)
{
  setupwizrd=classes.paper7;
  setupbutton= classes.button7;
  footCss=classes.footCss;
  setupwizrd=classes.paper2;
  setupbutton= classes.button4;
  footCss=classes.footCss9;
  setupbutton9=classes.setupbutton9;
  
  button1=classes.button2;
  button2=classes.buttonHome;
  button3=classes.buttonOrder;
  button4=classes.buttonCal;

  s1=classes.setWizardImage1;
  s2=classes.ServiceImage1;
  s3=classes.servcieImg1;

  s4=classes.avatarsmall1;
  scrollHeight='47vh';
}
else if(screenWidth<690)
{
  setupwizrd=classes.paper7;
setupbutton= classes.button7;
footCss=classes.footCss;
setupwizrd=classes.paper2;
setupbutton= classes.button4;
footCss=classes.footCss9;
setupbutton9=classes.setupbutton9;

button1=classes.button2;
button2=classes.buttonHome;
button3=classes.buttonOrder;
button4=classes.buttonCal;

s1=classes.setWizardImage1;
s2=classes.ServiceImage1;
s3=classes.servcieImg1;
scrollHeight='30vh';
s4=classes.avatarsmall1;

}
else if(screenWidth<1300)
 {
  setupwizrd=classes.paper2;
  setupbutton= classes.button4;
  footCss=classes.footCss9;
  setupbutton9=classes.setupbutton9;
  button1=classes.button2;
  button2=classes.buttonHome;
  button3=classes.buttonOrder;
  button4=classes.buttonCal;

  s1=classes.setWizardImage1;
  s2=classes.ServiceImage1;
  s3=classes.servcieImg1;
  s4=classes.avatarsmall1;
  scrollHeight='80vh';
 }


 else if(screenWidth<1600){
  setupwizrd=classes.paper2;
  setupbutton= classes.button4;
  footCss=classes.footCss9;
  setupbutton9=classes.setupbutton9;
  
  button1=classes.button2;
  button2=classes.buttonHome;
  button3=classes.buttonOrder;
  button4=classes.buttonCal;
  scrollHeight='80vh';
  s1=classes.setWizardImage1;
  s2=classes.ServiceImage1;
  s3=classes.servcieImg1;
  s4=classes.avatarsmall1;
  }
  else if(screenWidth<2000){
    setupwizrd=classes.paper2;
    setupbutton= classes.button4;
    footCss=classes.footCss9;
    setupbutton9=classes.setupbutton9;
    
    button1=classes.button2;
    button2=classes.buttonHome;
    button3=classes.buttonOrder;
    button4=classes.buttonCal;
    scrollHeight='80vh';
    s1=classes.setWizardImage;
    s2=classes.serviceImage;
    s3=classes.servcieImg;
    s4=classes.avatarsmall;
    
    }
else{
  setupwizrd=classes.paper2;
  setupbutton= classes.button4;
  footCss=classes.footCss9;

  setupwizrd=classes.paper2;
  setupbutton= classes.button4;
  footCss=classes.footCss9;
  setupbutton9=classes.setupbutton9;
  scrollHeight='80vh';
  button1=classes.button2;
  button2=classes.buttonHome;
  button3=classes.buttonOrder;
  button4=classes.buttonCal;

  s1=classes.setWizardImage1;
  s2=classes.ServiceImage1;
  s3=classes.servcieImg1;
  s4=classes.avatarsmall1;

}

const handleClickService = () => {    
  window.open('https://shiphype.com/service-guidelines/', '_blank');
};

const handleClickCalulator = () => {    
  window.open('https://shiphype.com/shipping-calculator/', '_blank');
};

const handleClickHome = () => {    
  window.open('https://shiphype.com/', '_blank');
};

const handleClickBlog = () => {    
  window.open('https://shiphype.com/blog/', '_blank');
};

const handleClickOrder = () => {    
  props.handleOrder('02');
};
         //Make custom button
const ColorButton = withStyles(theme => ({
  root: {
    color: '#fff',
    backgroundColor: '#0168fa',
     borderColor: '#0168fa',
     paddingTop: '0%',
     paddingBottom: '0%',
     paddingLeft: '8%',
     paddingRight: '8%',
     marginTop:'1%',
     marginBottom:'6%',
    borderRadius:'3px',
    '&:hover': {
      backgroundColor: '#002080',
      
    },
  },
}))(Button);
const ColorButton2 = withStyles(theme => ({
  root: {
    color: '#fff',
    backgroundColor: '#0168fa',
     borderColor: '#0168fa',
     paddingTop: '0%',
     paddingBottom: '0%',
     paddingLeft: '8%',
     paddingRight: '8%',
    marginTop:'1%',
    marginBottom:'1%',
    borderRadius:'3px',
    '&:hover': {
      backgroundColor: '#002080',
      
    },
  },
}))(Button);
    const handleClickOpen = () => {    
      setEditSprint(null);
      setOpenMarketPlace(true);
      
      console.log("click button");
    };
    return(
        <View className={classes.content}>
           <View className={classes.appBarSpacer} />
         
          {/* <View className={classes.root}> 
          {(() => {
            if(progressBar===true){
              return (
                <View>
                <LinearProgress variant="buffer" value={completed} valueBuffer={buffer} />
             
              
               
                                </View>
              )
             
            }
           
               })()} 
            
          </View> */}
         
               
                {/* <IconButton color="primary" aria-haspopup="true" onClick={handleClick} size ="small">
                <Avatar alt="Remy Sharp" src={icon} className={classes.small} /> 
                <img style={{ width: 6, height: 6,marginRight:4}} src={dwn1} />
                </IconButton>*/}
             <View className={classes.paper}>
            <Grid item  container lg={12}  >
            <Grid item xs={12} md={4} lg={4} >
              <Grid style={{marginLeft:'10px'}}>
             <Text style={popUpStyle.breadCrundCss}>
              
           DASHBOARD /</Text><Text style={popUpStyle.breadCrundCss2}> OVERVIEW{'\n'}</Text>
           <Text 
           style={{
            fontSize: '19px',
        
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
            color: '#3b4863',
            fontWeight: '600',
            transition : 'all 0.25s',
           }}>Welcome To Dashboard</Text>
           </Grid> 
              </Grid>
           
<Grid item xs={12} md={8} lg={8} >

  <Grid container item  justify="flex-end" >
<Grid style={{marginTop:'10px'}}>
<Button  className={button1}  onClick={()=>{handleClickBlog()}} startIcon={<SpeakerNotesOutlinedIcon />}>BLOG</Button>
<Button  className={button2}   onClick={()=>{handleClickHome()}} startIcon={<HomeIcon style={{ color:'#fff'}}/>}>Home</Button>
<Button  className={button3}  onClick={()=>{handleClickOrder()}}  startIcon={<LocalShippingIcon style={{ color:'#fff'}}/>}>ORDERS</Button>
<Button  className={button4} onClick={()=>{handleClickCalulator()}} startIcon={<CallToActionOutlinedIcon/>}>Shipping Calculator</Button>
</Grid>
              </Grid>
              </Grid>
           
              </Grid>
              </View>  
              <Grid justify="center">
            <ProgressBar 
             loading={loading}
            />
            </Grid>
              <View className={classes.paper9} >
             
            <View>
            <Grid container spacing={2}>
             
          {/* <Text> Welcome To Shiphype,{'\n'} The next step to complete the startup wizard so you can start
             shipping right {'\n'} away, Feel free to reach out to me directly, if 
             you have any question :{'\n'} waleed@shiphype.com</Text> */}
               <Typography className={classes.title} color="textSecondary" gutterBottom>
               The next step is to send your products to the warehouse of your choice . <Link href="#">Click HERE
  
  </Link>  to start sending products.
        </Typography>
            
             <Grid container >
        
             <Grid items xs={12} lg={3} >
         
        
            <Paper   className={classes.Dashboardpaper} variant='outlined'>
            <Typography className={classes.fontsizepaper} color="textPrimary" gutterBottom>
            SHIFT TODAY
            </Typography>
            <Grid container>

            <Typography className={classes.numbersize}  color="textPrimary" gutterBottom>
           {shipedToday}
            </Typography>
            <Typography className={classes.numbersizepercentage}   gutterBottom>
           {shipedTodayP} %
            </Typography>
            </Grid>
            <View className={classes.chartContainer1}>
          <LineDemo/>
          </View>
           </Paper>
         
           </Grid>

           <Grid items xs={12} lg={3} >
         
        
         <Paper   className={classes.Dashboardpaper} variant='outlined'>
         <Typography className={classes.fontsizepaper} color="textPrimary" gutterBottom>
          PANDING ORDERS
            </Typography>
            <Grid container>
            <Typography className={classes.numbersize}  color="textPrimary" gutterBottom>
            {pendingOrder}
            </Typography>
            <Typography className={classes.numbersizepercentage2}>
          {pendingOrderP} %
            </Typography>
           

            </Grid>
            <View className={classes.chartContainer1}>
          <LineDemo/>
          </View>
        </Paper>
      
        </Grid>
        <Grid items xs={12} lg={3}>
         
        
         <Paper   className={classes.Dashboardpaper} variant='outlined'>
         <Typography className={classes.fontsizepaper} color="textPrimary" gutterBottom>
           ON HOLD
            </Typography>
            <Grid container>
            <Typography className={classes.numbersize}  color="textPrimary" gutterBottom>
            {holdOrder}
            </Typography>
            <Typography className={classes.numbersizepercentage2}   gutterBottom>
           {holdOrderP} %
            </Typography>
           
            </Grid>
            <View className={classes.chartContainer1}>
          <LineDemo/>
          </View>
        </Paper>
      
        </Grid>
        <Grid items xs={12} lg={3} >
         
        
         <Paper   className={classes.Dashboardpaper} variant='outlined'>
         <Typography className={classes.fontsizepaper} color="textPrimary" gutterBottom>
           SAVING TO DATE
            </Typography>
            <Grid container>
            <Typography className={classes.numbersize}  color="textPrimary" gutterBottom>
            ${savingtoOrder}
            </Typography>
            <Typography className={classes.numbersizepercentage}   gutterBottom>
           {savingtoOrderP}
            </Typography>
            
            </Grid>
            <View className={classes.chartContainer1}>
          <LineDemo/>
          </View>
        </Paper>
      
        </Grid>
         </Grid>
          
              </Grid>
              </View>
              <br/>

              <view className={classes.root}>
         <Grid container spacing={2}>
       
        <Grid item xs={12} md={7}>
          <Paper  variant='outlined' className={classes.paperofsecondscreen2}>

          <Grid container>
                <Grid items xs={12} lg={3} >
         
              <Typography className={classes.typography} >
              Spending Breakdown
            </Typography> 
            </Grid>

          
            <Grid items xs={12} lg={3} justify='flex-end' >
            <FormControl component="fieldset">
     
      <FormGroup aria-label="position" row>
        
        <FormControlLabel
          value="end"
          control={<Checkbox color="primary" />}
          label="Shipping"
          labelPlacement="end"
        />
      </FormGroup>
    </FormControl>
       </Grid>
       <Grid items xs={12} lg={3} justify='flex-end'>
            <FormControl component="fieldset">
     
      <FormGroup aria-label="position" row>
        
        <FormControlLabel
          value="end"
          control={<Checkbox color="primary" />}
          label="Picking"
          labelPlacement="end"
        />
      </FormGroup>
    </FormControl>
       </Grid>
       <Grid items xs={12} lg={3}justify='flex-end' >
            <FormControl component="fieldset">
     
      <FormGroup aria-label="position" row>
        
        <FormControlLabel
          value="end"
          control={<Checkbox color="primary" />}
          label="Storage"
          labelPlacement="end"
        />
      </FormGroup>
    </FormControl>
       </Grid>




            </Grid>



            <Divider className={classes.dividerFullWidth1}>
               
               </Divider>
              
        
           <View className={classes.chartContainer4}>
          <LineDemo1/>
          </View>
          </Paper>
        </Grid>




        <Grid item xs={12} md={5}>
          <Paper  variant='outlined' className={classes.paperoffirstscreen1}>
              <Grid items xs={12} lg={12} >
         
        
        
         <Typography className={classes.fontsizepaper3} color="textPrimary" gutterBottom>
          Fullfillment history
            </Typography>
       
      
        </Grid>

        <Grid items xs={12} lg={12} >
         
        
        <Typography className={classes.fontsizepaper} color="textSecondary" gutterBottom>
              
        Number of customers who have active subscription with you
        </Typography>
        
              </Grid>

          <div className={classes.chartContainer}>
          <Bar
            data={data}
            options={options}
          />
          </div>
          </Paper>
        </Grid>
       
      </Grid>
    </view>





{/* +++++++++++sandeep screen start+++++++++++++ */}
{/* className={classes.root}  */}
{/* className={classes.paperoffirstscreen11} */}
    <View className={classes.root}>
         <Grid container spacing={2}>
       
         <Grid item xs={12} md={4}  >
          <Card  variant='outlined'className={setupviewforfirstscreen} >
          <Grid container justify='space-between'>

<Grid items xs={12} lg={4} >

<Typography className={classes.typography} >
Sales Revenue
</Typography> 
</Grid>




<Grid items xs={12} lg={4} >
<FormControl className={classes.formControl}>

<Select
labelId="demo-simple-select-helper-label"
id="demo-simple-select-helper"
// value={age}
// onChange={handleChange}
>
<MenuItem value="">
<em>USA</em>
</MenuItem>
<MenuItem value={10}>INDIA</MenuItem>
<MenuItem value={20}>CHINA</MenuItem>
<MenuItem value={30}>THILAND</MenuItem>
</Select>

</FormControl>


</Grid>




</Grid>
<Divider className={classes.dividerFullWidth1}>
               
               </Divider>

               <div>
              <Mapchart/>
            </div>

 {/* {((
function App() {
  return (
    <div>
      <Mapchart />
    </div>
  );
}
))}   */}
  {/* style={{  maxHeight:130}} */}
  <ScrollView>
<Grid xs={12}   md={12}>
<View  style={{ overflow: 'hidden', maxHeight:150 }}>
<TableContainer >
      <Table  size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
           
            <TableCell align="center" style={{fontSize:9,fontWeight:'bold'}}>STATE</TableCell>
            <TableCell align="center" style={{fontSize:9,fontWeight:'bold'}}>ORDERS</TableCell>
            <TableCell align="center" style={{fontSize:9,fontWeight:'bold'}}>EARNING</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows2.map((row) => (
            <TableRow key={row.name}>
             
              <TableCell align="center" style={{fontSize:9,fontWeight:'bold'}}>{row.calories}</TableCell>
              <TableCell  align="center" style={{fontSize:9,fontWeight:'bold'}}>{row.fat}</TableCell>
              <TableCell  align="center" style={{fontSize:9,fontWeight:'bold'}}>{row.carbs}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
</View>
</Grid>

</ScrollView>
          </Card>
        </Grid>




        {/* className={classes.paperofsecondscreen22} */}

        <Grid container xs={12} md={8}>
        <Grid  xs={12}   md={12}  >
          <Card  variant='outlined'  className={setupviewforsecondscreen} >
         
          <Grid items xs={12} md={5} >

<Typography className={classes.typography2} >
Low Inventory Alert
</Typography> 
</Grid>
         {/* <Typography className={classes.typography2} >
             Low Inventory Alert
            </Typography>  */}

  <Grid container  justify='space-between'>

<Grid items xs={12}  lg={8}>


<Typography className={classes.typographywithgraycolor}>


Your sales and referral earning over the last 30 days
</Typography> 

</Grid>




<Grid items xs={12}  lg={4} >
<FormControl className={classes.formControl}>
{/* <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" /> */}
{/* <IOSSwitch checked={state.checkedB} onChange={handleChange} name="checkedB" /> */}
<Grid container>
<Button  style={{height:'4vh',width:'5px',fontSize:12,borderRadius:'0px', borderTopLeftRadius:'3px',borderBottomLeftRadius:'3px'}} variant="outlined">Range</Button>
<Button  style={{height:'4vh',width:'5px',borderRadius:'0px', fontSize:12 , borderTopRightRadius:'3px',borderBottomRightRadius:'3px' }} variant="outlined">Period</Button>
</Grid>


</FormControl>


</Grid>




</Grid>

   
   
{/* <Grid container xs={12} spacing={3} style={{height:'25vh'}} > */}

<view  className={classes.rootforcard}>
           <List>
          {Grosstaxnetearning.map((data,index) => (
      <Grid container xs={12} md={12} spacing={3} style={{height:'18vh',marginTop:'25px'}} >
      {/* style={{ backgroundColor: "#06E3D4" }}
      style={{ backgroundColor: "#F87BB4" }}
      style={{ backgroundColor: "#98BBD3  " }} */}
        <Grid item xs={12} md={4} >
        <Grid container  >
          <Paper  variant="outlined" className={classes.paperforcard1}> 
          <BarChartIcon className={classes.barchart1}/>
           </Paper>
           <Grid>
           <Typography style={{marginLeft:'5px',marginTop:'4px',fontSize:8,fontWeight:'bold'}} >
          GROSS EARNING
          </Typography>
          <Typography style={{marginLeft:'5px',marginTop:'8px',fontSize:14,fontWeight:'bold'}} >
          {/* $1958,104 */}
          {data.grossearning}
          </Typography>
          </Grid>
          </Grid>
        </Grid>
       

        <Grid item xs={12} md={4} >
        <Grid container >
          <Paper  variant="outlined" className={classes.paperforcard2}> 
          <BarChartIcon className={classes.barchart2}/>
           </Paper>
           <Grid>
           <Typography style={{marginLeft:'5px',marginTop:'4px',fontSize:8,fontWeight:'bold',}} >
          TAX EITHHELD
          </Typography>
          <Typography style={{marginLeft:'5px',marginTop:'8px',fontSize:14,fontWeight:'bold'}} >
          {/* $1958,104 */}
          {data.taxwithheld}
          </Typography>
          </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={4} >
        <Grid container >
          <Paper  variant="outlined" className={classes.paperforcard3}> 
          <BarChartIcon className={classes.barchart3} />
           </Paper>
           <Grid>
           <Typography style={{marginLeft:'5px',marginTop:'4px',fontSize:8,fontWeight:'bold'}} >
          NET EARNING
          </Typography>
          <Typography style={{marginLeft:'5px',marginTop:'8px',fontSize:14,fontWeight:'bold'}} >
          {/* $1958,104 */}
          {data.netearning}
          </Typography>
          </Grid>
          </Grid>
        </Grid>

      </Grid>
       ))}
       </List>
    </view>
{/* </Grid>  */}

{/* <Grid  style={{height:'25vh'}} >


</Grid> */}
{/* <ScrollView> */}
{/* className={classes.rootforcard} */}
<Grid xs={12}   md={12}>
 
 
<View className={classes.rootforcard} >
<View  style={{ overflow: 'hidden', maxHeight:200 }}>
<TableContainer className={setupviewforsecondscreentable} >
      <Table  size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell style={{fontSize:9,fontWeight:'bold'}} align="center">DATE</TableCell>
            <TableCell style={{fontSize:9,fontWeight:'bold'}} align="center">SALES COUNT</TableCell>
            <TableCell style={{fontSize:9,fontWeight:'bold'}} align="center">GROSS EARNING</TableCell>
            <TableCell style={{fontSize:9,fontWeight:'bold'}} align="center">TAX WITHHELD</TableCell>
            <TableCell style={{fontSize:9,fontWeight:'bold'}} align="center">NET EARNING</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell  style={{fontSize:9,fontWeight:'bold'}} align="center" component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell  style={{fontSize:9,fontWeight:'bold'}} align="center">{row.calories}</TableCell>
              <TableCell className={classes.numbersizepercentage2} align="center">{row.fat}</TableCell>
              <TableCell style={{fontSize:9,fontWeight:'bold',color:'#F87BB4'}} align="center">{row.carbs}</TableCell>
              <TableCell style={{fontSize:9,fontWeight:'bold'}} align="center">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </View>
 
</View>

</Grid>

          </Card>
        </Grid>





        {/* className={classes.paperofsecondscreen33} */}

        <Grid  xs={12}   md={12}  >
          <Card  variant='outlined' className={setupviewforthirdscreen} >

          
        <Grid container  spacing={2}>
          <Grid item  >
          <SaveAltIcon style={{height:'70px', width:'70px',marginTop:'5px',paddingLeft:'25px',color:'#CED3D6 ' }} />
          </Grid>
          <Grid item  zeroMinWidth>
            <Typography noWrap style={{fontSize:9,fontWeight:'bold',marginTop:'18px',marginRight:'140px',color:'#060808'}}> Download your earning in CSV formet</Typography>
            <Typography noWrap style={{fontSize:9,fontWeight:'bold',marginTop:'18px',color:'#CED3D6'}}> open in a spreadsheet and perform your own calucations,graphing etc </Typography>
            {/* <Typography noWrap style={{fontSize:9,fontWeight:'bold',marginTop:'10px'}}> open in a spreadsheet and perform your own calucations,graphing etc</Typography> */}
          </Grid>
         
        </Grid>
      
          </Card>
        </Grid>


       </Grid>
       
       
      </Grid>
    </View>
    {/* my second screen code end */}






{/* my thired screen code start form here */}

      <View className={classes.root}>
      <Grid container spacing={2}>
      


         {/* first grid start from here */}

    
        <Grid item xs={12} md={4} lg={4}>
          
          <Card variant='outlined'    className={setupviewforfirstscreenviewthird} >


          <Grid container justify="space-between">

<Grid items xs={12} md={6} lg={6} >

<Typography className={classes.typography} >
Transection History
</Typography> 
</Grid>

<Grid items xs={12} md={6} lg={6}  >

<RefreshIcon style={{marginLeft:'120px'}}/>
<MoreVertIcon/>

</Grid>




</Grid>
              <Divider className={classes.dividerFullWidth1}>
               </Divider>




              
               <View style={{ overflow: 'hidden', maxHeight:580 }}>
               <TableContainer >
      <Table  size="small" aria-label="a dense table">
        {/* <TableHead>
          <TableRow>
           
            <TableCell align="center" style={{fontSize:9,fontWeight:'bold'}}>STATE</TableCell>
            <TableCell align="center" style={{fontSize:9,fontWeight:'bold'}}>ORDERS</TableCell>
            <TableCell align="center" style={{fontSize:9,fontWeight:'bold'}}>EARNING</TableCell>
            
          </TableRow>
        </TableHead> */}
        
        <TableBody>
          {shipData.map((row1) => (
            <TableRow >
            {/* key={row.name} */}
             <Grid container >
             <Grid items xs={12} md={2} lg={2} >
             <TableCell >
            
             {(() => {
              if ( row1.icon=='CheckCircleIcon'){
                  return (
                    <CheckCircleIcon style={{color:'#22BD4E',marginTop:'15px'}}/>
                  )
                }else if(row1.icon=='CancelIcon'){
                  return (
                  <CancelIcon style={{color:'#C3C6BF',marginTop:'15px'}}/>
                  )
                }else if(row1.icon=='FiberManualRecordIcon'){
                  return (
                  <FiberManualRecordIcon style={{color:'#F94931',marginTop:'15px'}}/>
                  )
                }
                })()}

                {/* <CheckCircleIcon style={{color:'#22BD4E',marginTop:'15px'}}/>  */}
               {/* <CancelIcon style={{color:'#C3C6BF',marginTop:'15px'}}/> */}
             {/* <FiberManualRecordIcon style={{color:'#F94931',marginTop:'15px'}}/> */}
         {/* <Image style={{backgroundColor:'#F94931',borderRadius:'6px', marginTop:'20px',height:'20px',width:'20px'}} source={Areoplane} /> */}
             </TableCell>
             </Grid>

             <Grid items xs={12} md={7} lg={7}  >

         <view  className={classes.rootforcard}>
     
 
        <Grid item xs={12} md={12} >
        <Grid container  >
     
           <Grid>
     

           <TableCell  >
           <Typography style={{marginLeft:'10px',marginTop:'8px',fontSize:14,fontWeight:'bold'}} >
           {/* payment from #10322 */}
           {row1.payment}
          </Typography>
           <Typography style={{marginLeft:'10px',marginTop:'4px',fontSize:8,fontWeight:'bold'}} >
           {/* Mar 21,2019,3:30pm */}
           {row1.paymentdate}
          </Typography>
          </TableCell>


          </Grid>
          </Grid>
        </Grid>
      
           </view>
           </Grid>



<Grid items xs={12} md={3} lg={3}  >
<view  className={classes.rootforcard}>

   
        <Grid item xs={12} md={12} >
        <Grid container  >
       
           <Grid>
           <TableCell  >

           <Typography style={{marginLeft:'10px',marginTop:'8px',fontSize:14,fontWeight:'bold'}} >
          {/* +$250.00 */}
          {row1.money}
          </Typography>

               <Typography style={{marginLeft:'10px',marginTop:'4px',fontSize:8,fontWeight:'bold',color:'#22BD4E'}} >
                {/* completed */}
                {row1.paymentstatus}
                </Typography>
        


{/* 
          {(() => {
              if (row1.paymentstatus=='completed'){
               
                }else if(row1.paymentstatus=='declined'){
                  return (
                    <Typography style={{marginLeft:'10px',marginTop:'4px',fontSize:8,fontWeight:'bold',color:'#EC1E3D'}} >
                
                    {row1.paymentstatus}
                     </Typography>
                  )
                }
                })()} */}



        
     
         

         
          </TableCell>
          </Grid>
          </Grid>
        </Grid>
      
    </view>


</Grid>

</Grid>
            </TableRow>
           ))}
        </TableBody>
        
      </Table>
    </TableContainer>
    </View>


{/* 
               <Grid container justify="space-between">

<Grid items xs={12} md={16} lg={6} >

<Typography className={classes.typography} >
View all Transection
</Typography> 
</Grid>


<Grid items xs={12} md={16} lg={6} justify='center'>

<ArrowDownwardOutlinedIcon/>
</Grid>



</Grid> */}



          </Card>
        </Grid>

{/* first grid ending  here */}


{/* second grid start  here */}
        <Grid item xs={12} md={4}  lg={4}>
          <Card variant='outlined'  className={setupviewforsecondscreenviewthird}  >

          <Grid container justify='space-between'>

<Grid items xs={12} md={6}  lg={6} >

<Typography className={classes.typography} >
Top Selling Product
</Typography> 
</Grid>





<Grid items xs={12} md={6} lg={6}  >

<RefreshIcon style={{marginLeft:'120px'}}/>
<MoreVertIcon/>

</Grid>
</Grid>

               <Divider className={classes.dividerFullWidth1}>
               </Divider>

      

               <View style={{ overflow: 'hidden', maxHeight:570}}>
               <TableContainer >
              <Table  size="small" aria-label="a dense table">
        {/* <TableHead>
          <TableRow>
           
            <TableCell align="center" style={{fontSize:9,fontWeight:'bold'}}>STATE</TableCell>
            <TableCell align="center" style={{fontSize:9,fontWeight:'bold'}}>ORDERS</TableCell>
            <TableCell align="center" style={{fontSize:9,fontWeight:'bold'}}>EARNING</TableCell>
            
          </TableRow>
        </TableHead> */}
         
        <TableBody>
          {shipData2.map((row3) => (
            <TableRow >
            {/* key={row.name} */}
             <Grid container >
             <Grid items xs={12} md={1} lg={1} >
             <TableCell > <FiberManualRecordOutlinedIcon style={{color:'#88DD1A',marginTop:'15px'}}/></TableCell>
             </Grid>
            
             <Grid items xs={12} md={7} lg={7}  >

         <view  className={classes.rootforcard}>
     
      {/* style={{ backgroundColor: "#06E3D4" }}
      style={{ backgroundColor: "#F87BB4" }}
      style={{ backgroundColor: "#98BBD3  " }} */}
        <Grid item xs={12} md={12} >
        <Grid container  >
          {/* <Paper  variant="outlined" className={classes.paperforcard1}> 
          <BarChartIcon className={classes.barchart1}/>
           </Paper> */}
           <Grid>
           {/* icon , payment ,paymentdate, money , paymentstatus */}

           <TableCell  >
           <Typography style={{marginLeft:'10px',marginTop:'8px',fontSize:14,fontWeight:'bold'}} >
           {/* payment from #10322 */}
           {row3.payment}
          </Typography>
           <Typography style={{marginLeft:'10px',marginTop:'4px',fontSize:8,fontWeight:'bold'}} >
           {/* Mar 21,2019,3:30pm */}
           {row3.paymentdate}
          </Typography>
          </TableCell>


          </Grid>
          </Grid>
        </Grid>
      
           </view>
           </Grid>


           <Grid items xs={12} md={4} lg={4}  >
       <view  >

   
        <Grid item xs={12} md={12} lg={12} >
        <Grid container  >
       
           <Grid>
        
           <TableCell > 
             <MailOutlineOutlinedIcon style={{marginTop:'15px'}} />
            <NotInterestedOutlinedIcon style={{marginTop:'15px',marginLeft:'3px'}}/>
            <PersonOutlineOutlinedIcon style={{marginTop:'15px',marginLeft:'3px'}} />
            </TableCell>
         
          </Grid>
          </Grid>
        </Grid>
      
    </view>


</Grid>


{/* <Grid items xs={12} md={1} lg={1}  >

<TableCell > <MailOutlineOutlinedIcon style={{marginTop:'15px',marginRight:'15px'}}/></TableCell>

</Grid>

<Grid items xs={12} md={1} lg={1}  >

<TableCell > <NotInterestedOutlinedIcon style={{marginTop:'15px',marginRight:'15px'}}/></TableCell>

</Grid>
<Grid items xs={12} md={1} lg={1}  >

<TableCell > <PersonOutlineOutlinedIcon style={{marginTop:'15px',marginRight:'20px'}}/></TableCell>

</Grid> */}
</Grid>
            </TableRow>
           ))}
        </TableBody>
      
      </Table>
    </TableContainer>
</View>

               {/* <Divider className={classes.dividerFullWidth1}>
               </Divider>



               <Grid container justify="space-between">

<Grid items xs={12} md={16} lg={6} >

<Typography className={classes.typography} >
View more customer
</Typography> 
</Grid>


<Grid items xs={12} md={16} lg={6} justify='center'>

<ArrowDownwardOutlinedIcon/>
</Grid>



</Grid>
               <Divider className={classes.dividerFullWidth1}>
               </Divider> */}

          </Card>
        </Grid>
{/* second grid ending  here */}





{/* third grid start  here */}
        <Grid item xs={12} md={4}  lg={4}>
          <Card variant='outlined' className={setupviewforthirdscreenviewthird}  >
          <Grid container justify='space-between'>

<Grid items xs={12} md={5} lg={5} >

<Typography className={classes.typography} >
RealTime Sales
</Typography> 
</Grid>





<Grid items xs={12} md={7} lg={7}  >

<FormControl component="fieldset">
   
      <RadioGroup row aria-label="position" name="position" defaultValue="top" style={{marginLeft:'10px'}}>
      
        <FormControlLabel value="1" control={<Radio color="primary" />} label="Today" />
        <FormControlLabel value="2" control={<Radio  color="primary" />} label="Yesterday" />
      </RadioGroup>
    </FormControl>

</Grid>
</Grid>

               <Divider className={classes.dividerFullWidth1}>
               </Divider>


               <view  className={classes.rootforcard}>
               <List>
          {Totalselesavgsels.map((data,index) => (
      <Grid container xs={12} md={12} spacing={3} style={{height:'18vh',marginTop:'25px'}} >
      {/* style={{ backgroundColor: "#06E3D4" }}
      style={{ backgroundColor: "#F87BB4" }}
      style={{ backgroundColor: "#98BBD3  " }} */}
        <Grid item xs={12} md={6} >
        <Grid container  >
          {/* <Paper  variant="outlined" className={classes.paperforcard1}> 
          <BarChartIcon className={classes.barchart1}/>
           </Paper> */}
           <Grid>
           <Typography style={{marginLeft:'5px',marginTop:'8px',fontSize:14,fontWeight:'bold'}} >
          {/* $1958,104 */}
          {data.totalseles}
          </Typography>
           <Typography style={{marginLeft:'5px',marginTop:'4px',fontSize:8,fontWeight:'bold'}} >
           Total Sales
          </Typography>
       
          </Grid>
          </Grid>
        </Grid>
       

        <Grid item xs={12} md={6} >
        <Grid container >
          {/* <Paper  variant="outlined" className={classes.paperforcard2}> 
          <BarChartIcon className={classes.barchart2}/>
           </Paper> */}
           <Grid>
           <Typography style={{marginLeft:'5px',marginTop:'8px',fontSize:14,fontWeight:'bold'}} >
          {/* $1958,104 */}
          {data.avgsales}
          </Typography>
           <Typography style={{marginLeft:'5px',marginTop:'4px',fontSize:8,fontWeight:'bold',}} >
         Avg sales per day
          </Typography>
       
          </Grid>
          </Grid>
        </Grid>

        

      </Grid>
         ))}
         </List>
    </view>





    <div className={setupviewforchartContainerforthirdscreen}>
          <Bar
            data={data}
            options={options}
          />
          </div>










          </Card>
        </Grid>
      {/* third grid ending  here */}

      </Grid>
    </View>
{/* my thired screen code ending here */}


          
                </View>
               
        </View>

    
        );
  }