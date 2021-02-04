import React ,{ useState, useEffect } from 'react';
import clsx from 'clsx';
import {Platform,View,Image,Text,Dimensions,ProgressBar, ShadowPropTypesIOS} from 'react-native';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import icon from '../../assets/icons/defaultprofile.png';
import Avatar from '@material-ui/core/Avatar';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import MarketPlace from './feedback/MarketPlace';
import ShippingPolicy from './feedback/shippingPolicy';
import CustomerSelection from './feedback/CustomerSelection';
import bestbuy from '../../assets/icons/Start_600x600.png';
import searchicons from '../../assets/icons/Setupwizard_600x600.png';
import hand from '../../assets/icons/agreement_600x600.png';

import popUpStyle from './style/popUpStyle';
import CustomerImportAdd from "./feedback/CustomerImportAdd";
import Toast from './feedback/Toast';

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
import DeleteCard from './Order/EnableDisable';
import HomeIcon from '@material-ui/icons/Home';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import * as shiphypeService from './ShipService/shiphype_service';
import SpeakerNotesOutlinedIcon from '@material-ui/icons/SpeakerNotesOutlined';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import CallToActionOutlinedIcon from '@material-ui/icons/CallToActionOutlined';
import Link from '@material-ui/core/Link';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import ImportShopfyOrder from './feedback/ImportShopfyOrder';
import OrderImportCreate from "./feedback/OrderImportCreate";
import OrderImportCreateForSetUp from "./feedback/OrderImportCreateForSetUp";

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
      width: '100px',marginLeft:'42%', height: '63px',marginTop:'2.8%',
      borderRadius:'10%',backgroundColor:'#fff',
    },
    ServiceImage1:{
      width: '100px',marginLeft:'38%', height: '63px',marginTop:'3%',
      borderRadius:'10%',backgroundColor:'#fff',
    },
    ServiceImage2:{
      width: '100px',marginLeft:'40%', height: '63px',marginTop:'3%',
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
      backgroundColor:'#fff',
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
     button22 :{
      border : ' 1px solid #c0ccda',
      borderRadius :'3px',
      // paddingTop: '10%',
      // paddingBottom: '10%',
     // marginLeft:'40px',
      height:'24%',
      width:'100px',
      fontSize:'11px',
      fontWeight: '550',
      color:'rgba(27, 46, 75, 0.7)',
      // paddingLeft: '22%',
      // paddingRight: '22%',
      
    },
    buttonCal2 :{
      border : ' 1px solid #c0ccda',
      borderRadius :'3px',
      // paddingTop: '10%',
      // paddingBottom: '10%',
      height:'24%',
      marginLTop:'5px',
     // marginRight:'10px',
      width:'180px',
      fontSize:'11px',
      fontWeight: '550',
      color:'rgba(27, 46, 75, 0.7)',
      // paddingLeft: '22%',
      // paddingRight: '22%',
      
    },
    buttonHome2 :{
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
      height:'24%',
      width:'100px',
      '&:hover': {
        color:'#fff',
        backgroundColor:'#595959',
      },
    },
    buttonOrder2 :{
       borderRadius : '3px',
       marginLTop:'5px',
      height:'24%',
      width:'110px',
       fontSize:'11px',
       fontWeight: '550',
       color:'#fff',
       backgroundColor:'#0168fa',
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
     margin: {
      margin: theme.spacing(1),
    },

    button3 :{
      border : ' 1px solid #fff',
      borderRadius : '5px',
    },
   
    button5 :{
      border : ' 1px solid #fff',
      borderRadius : '5px',
     height:'110%',
     width:'50%',
      color: '#fff',
    backgroundColor: '#0158d4',
    borderColor: '#0153c7',
    
    marginBottom:'1%',
    '&:hover': {
      backgroundColor:'#1a1aff',
      color:'#ffffff',
      },
    },
    container: {
      paddingTop: theme.spacing(4),
     // paddingBottom: theme.spacing(4),
    },
    paper1: {
      padding: theme.spacing(3),
       borderRadius:'4px',
      overflow: 'auto',
     border:'1px solid #E0E0E0',
    },
    paper9: {
      padding: theme.spacing(2),
       borderRadius:'0px',
      overflow: 'auto',
       height:'80vh'
    },
    paper2: {
     
      height:170,
      width:'99%',
       borderRadius:'4px',
    //  overflow: 'auto',
      border: '1px solid #E0E0E0',
     color: '#fff',
     textAlign:'center'
   
    },
    button4 :{
      border : ' 1px solid #fff',
      borderRadius:'4px',
      color: '#fff',
      height:170,
      width:'100%',
      border:'1px solid #E0E0E0',
      textAlign:'center'
   
    
    },
    setupbutton9:{
      border : ' 1px solid #fff',
      borderRadius:'4px',
      color: '#fff',
      marginTop:'1%',
     // height:'100%',
      width:'100%',
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
       paddingLeft: theme.spacing(2),
       paddingRight: theme.spacing(2),
      border:'1px solid #E0E0E0',
      textAlign:'center'
    },
    footCss9:{
     // border : ' 1px solid #fff',
      borderRadius:'8%',
      //height:'80%',
      color: '#fff',
       paddingTop: theme.spacing(1),
       paddingBottom: theme.spacing(2),
      // paddingLeft: theme.spacing(4),
      // paddingRight: theme.spacing(4),
    // border:'1px solid #cccccc',
      textAlign:'center'
    },
    paper7: {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
      paddingLeft: theme.spacing(10),
      paddingRight: theme.spacing(10),
      borderRadius:'0px',
      overflow: 'auto',
      border : ' 1px solid #fff',
    
     color: '#fff',
     backgroundColor: '#0168fa',
     borderColor: '#0168fa',
     '&:hover': {
      backgroundColor: '#0168fa',
     borderColor: '#0168fa',
      },
    
    },
    button7 :{
      border : ' 1px solid #fff',
      borderRadius:'0px',
      border:'1px solid #cccccc',
      color: '#fff',
      textAlign:'center',
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      marginTop:'3px',
      // paddingLeft: theme.spacing(14),
      // paddingRight: theme.spacing(14),
    
    },
    footCss:{
     // border : ' 1px solid #fff',
      borderRadius:'8%',
     // border:'1px solid #cccccc',
      color: '#fff',
      textAlign:'center',
      paddingTop: theme.spacing(1),
    //  paddingBottom: theme.spacing(1),
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
      marginLeft:'75px',
      width: theme.spacing(5.5),
      height: theme.spacing(5.5),
    },
    avatarsmall1: {
      marginLeft:'60px',
      width: theme.spacing(5.5),
      height: theme.spacing(5.5),
    },
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
    radioButtonCss:{
      color:'#000',fontSize:'8px',    height: '25px'
    },
  }));

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }



  export default function Dashboard(props) {
    const classes = useStyles();
    const [completed, setCompleted] = React.useState(0);
    const [buffer, setBuffer] = React.useState(0);
    const [progressBar, setProgress] = React.useState(true);
    
  const [editSprint,setEditSprint]=React.useState(null);
  const[value,setValue]=React.useState('7');
  const [openShipPolicy, setOpenShipPloicy] = React.useState(false);
  const [openCarries, setOpenCarries] = React.useState(false);
  const [openSprint, setOpenMarketPlace] = React.useState(false);
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

  const [openImportOrder, setOpenImportOrder] = React.useState(false);
  const [openOrderList, setOpenOrderList] = React.useState(false);

  const [policyDataId, setPolicyDataId] = React.useState(0);
  const [openAddCustomerManually, setOpenAddCustomerManually] = React.useState(false);
  const [shipmentData , setShipmentId] = React.useState([]);
  const [openPageExits, setPageExits] = React.useState(0);
  const [stepdonedata,setStepdonedata]=React.useState([]);
  const [marketdone,setMarketdone]=React.useState(false);
  const [integrationid, setIntegrationid] = React.useState(null);
  
  const [importOrderData, setImportOrderData] = React.useState(null);
  const [importWorderData, setImportWorderData] = React.useState(null);
  const [importEbayData,setImportEbayData]=React.useState(null);
  const [loading,setLoading]=React.useState(false);
  const [shippolicydone,setShippolicydone]=React.useState(false);
  const [returnsettingdone,setReturnsettingdone]=React.useState(false);
  const [productimportdone,setProductimportdone]=React.useState(false);
  const [connectCredit,setConnect]=React.useState(false);
  const [recieveSet,setRecievSet]=React.useState(false);
  const [orderSet,setOrderset]=React.useState(false);
  const [enabeSet,setEnableset]=React.useState(false);
  const [pricePlan,setPricePlan]=React.useState(false);
  const [sentInvo,setSentInvo]=React.useState(false);
  const [customerimportdone,setCustomerimportdone]=React.useState(false);

  const [openDelete, setOpenDelete] = React.useState(false);
  const [enableTrue, setEnableTrue] = React.useState(true);
  const[promotionalPackage,setPromotionalPackage]=React.useState([]);

  const[customePackage,setCustomePackage]=React.useState([]);
  const[customePackageFirstId,setCustomePackageFirstId]=React.useState(0);
  const [importData, setImportData] = React.useState(null);
  const [importCustData, setImportCustData] = React.useState(null);
  const [selectintegration, setSelectintegration] = React.useState(0);
  const [packaging, setPackaging] = React.useState(61);
  const [shipData, setShipData] = React.useState([]);
  const [opencustomerimportadd, setOpencustomerimportadd] = React.useState(
    false
  );
  const [openorderimportcreate, setOpenorderimportcreate] = React.useState(
    false
  );
 


  const userid=props.user_id;
  const [state, setState] = React.useState({
    MarketPlaceIntegration: false,
    ShippingProfile: false,
  //  ProductImport:false,
    ProductSync:false,
    ImportCustomers:false,
  });

  const [state1, setState1]=useState({
    vertical: 'right',
    horizontal: 'right',
  });
  const {vertical,horizontal} = state1;
  const [open1, setOpen1]=React.useState(false);
  const handleDeleteCancle = () => {
    setOpenDelete(false);
  
   };

   const enableFunction = () => {
    if(enableTrue===true)
    {
     // addStepStatus();
      setEnableTrue(false);
      setOpenDelete(false);
  
    }
    else{
      //addStepStatus();
      setEnableTrue(true);
      setOpenDelete(false);
    }
    
  }
  const handleChangeRadio = (event) => {

  }

  React.useEffect(() => {
    fetchPackingList1(userid);
    if(Object.keys(policyData).length === 0)
    { 
      fetchShipPolicy(2);
    }

    
  }, []);
  const fetchShipPolicy = (id) => {
    setLoading(true);
    shiphypeService
      .fetchShipPolicyOrder(userid, 1)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
         // setShippingPolicyStatus(true);
         if(response.data.length===0)
         {
           setPolicyDataId(0);
         }
         else{
           setPolicyDataId(response.data[0].integrationId);
         }
        
          setShipData(response.data);
          if(id===10)
          {
            setOpenShipPloicy(true);
          }
         else if(id===2)
          {
           // setOpenShipPloicy(true);
          }
          else if(id===11)
          {
            setEditSprint(null);
            setOpenMarketPlace(false);
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
          else{
            setOpenShipPloicy(true);
            setOpenCarries(false);
            setOpenReturn(false);
            setOpenNextReturn(false);
            setOpenMarketPlace(false);
          }
        
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



   const fetchPackingList1 = (userid)=>{
  
    shiphypeService.fetchCustomePaching(userid,1)
    .then(response => {
     console.log("status",response.status);
          if(response.status === true) {
            setLoading(false);
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


  const updateDataOrder=(data,integrationid)=>{

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
  const handleChangeRadio1 = (event) => {
    if(event===8)
    {
      setOpenMarketPlace(true);
    }
    else if(event===10)
    {
      fetchShipPolicy(10);
     // setOpenShipPloicy(true);
    }
    else if(event===11)
    {
      setOpenCarries(true);
    }
    else if(event===12)
    {
      setOpenReturn(true);
    }
    else if(event===13)
    {
      setOpenCustomePromotional(true);
    }
    else if(event===14)
    {
      //fetchPackageForPromotional(); 
      fetchPackingList();
       fetchPackageForPromotional(); 
      setOpenProductSelection(true);
    }
    else if(event===15)
    {
      setOpenCustomerSelection(true);
    }
    else if(event===16)
    {
      props.handleNextOption('09');
    }
    else if(event===19)
    {
      props.handleNextOption('billing');
    }
    else if(event===20)
    {
      props.handleNextOption('cardlistadd');
    }
    else if(event===21)
    {
      props.handleNextOptionSetting1('allsettings',2);
    }
    else if(event===22)
    {
      props.handleNextOptionSetting1('allsettings',1);
    }
    else if(event===23)
    {
      setOpenDelete(true);
    }
  }
  
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

    React.useEffect(() => {
     
    //  fetchShiphypeCompleteStep1();
      fetchShiphypeCompleteStep(); 
      if(props.openMarketPlace === true ){
        setOpenMarketPlace(true);
      }else{
        setOpenMarketPlace(false);
      }
if(props.code !==undefined)
{
  if(props.code !== '0'){
    setOpenMarketPlace(true);
  }
}


      
           
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

                     setStepdonedata(response.data);
                     if(response.data.length !== 0){
                      for(let i=0; i<response.data.length;i++){
                        if(response.data[i].shiphypesubstepId === 5){
                          setMarketdone(true);
                       
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
                          setShippolicydone(true);
                          
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
                           setReturnsettingdone(true);
                           
                           if(flag5===true)
                           {
                             textValueId=textValueId+1;
                             flag5=false;
                           }
                        }else if(response.data[i].shiphypesubsubstepId === 7){
                          //  setCustomepackingdone(true);
                          
                          //  if(flag6===true)
                          //  {
                          //    textValueId=textValueId+1;
                          //    flag6=false;
                          //  }
                        }else if(response.data[i].shiphypesubsubstepId === 8){
                          setProductimportdone(true);
                         
                          if(flag7===true)
                          {
                            textValueId=textValueId+1;
                            flag7=false;
                          }
                        }else if(response.data[i].shiphypesubstepId === 9){
                          setCustomerimportdone(true);
                        
                          if(flag8===true)
                          {
                            textValueId=textValueId+1;
                            flag8=false;
                          }
                       }
                       else if(response.data[i].shiphypesubstepId === 11){
                        setSentInvo(true);
                     
                        if(flag9===true)
                          {
                            textValueId=textValueId+1;
                            flag9=false;
                          }
                     }
                     else if(response.data[i].shiphypesubstepId === 12){
                      setPricePlan(true);
                    
                      if(flag10===true)
                      {
                        textValueId=textValueId+1;
                        flag10=false;
                      }
                   }
                   else if(response.data[i].shiphypesubstepId === 13){
                    setConnect(true);
                  
                    if(flag11===true)
                    {
                      textValueId=textValueId+1;
                      flag11=false;
                    }
                 }
                 else if(response.data[i].shiphypesubstepId === 14){
                  setRecievSet(true);
               
                  if(flag12===true)
                          {
                            textValueId=textValueId+1;
                            flag12=false;
                          }
               }
               else if(response.data[i].shiphypesubstepId === 15){
                setOrderset(true);
             
                if(flag13===true)
                {
                  textValueId=textValueId+1;
                  flag13=false;
                }
             }
             else if(response.data[i].shiphypesubstepId === 16){
              setEnableset(true);
             
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
                      props.handleNextPage(1);
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
                      setNow(85);
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
  
  const handleOpenaddpercentage = (percentage) => {
   
   };

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
  if(screenWidth<400)
{
  setupwizrd=classes.paper7;
  setupbutton= classes.button7;
  footCss=classes.footCss;
  setupwizrd=classes.paper2;
  setupbutton= classes.button4;
  footCss=classes.footCss9;
  setupbutton9=classes.setupbutton9;
  
  button1=classes.button22;
  button2=classes.buttonHome2;
  button3=classes.buttonOrder2;
  button4=classes.buttonCal2;

  s1=classes.setWizardImage1;
  s2=classes.ServiceImage1;
  s3=classes.servcieImg1;

  s4=classes.avatarsmall1;
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

button1=classes.button22;
button2=classes.buttonHome2;
button3=classes.buttonOrder2;
button4=classes.buttonCal2;

s1=classes.setWizardImage1;
s2=classes.ServiceImage1;
s3=classes.servcieImg1;

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
  
  s1=classes.setWizardImage1;
  s2=classes.ServiceImage2;
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
  
  button1=classes.button2;
  button2=classes.buttonHome;
  button3=classes.buttonOrder;
  button4=classes.buttonCal;

  s1=classes.setWizardImage1;
  s2=classes.ServiceImage1;
  s3=classes.servcieImg1;
  s4=classes.avatarsmall1;

}
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
       const handleSprintCancel = (isSprintCreate) => {
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
    setOpenSelectCustomer(false);
    setOpenCustomerSelection(false);
    setOpenAddCustomerManually(false);
    setOpenCustomerList(false);
    setOpenFutureCustomer(false);
    setOpencustomerimportadd(false);
    setOpenorderimportcreate(false);
    setOpenOrderList(false);
    setOpenImportOrder(false);
  };

  
  const handleOrderPage =()=>{

 setOpenMarketPlace(false);
    props.handleOrderPage('02');
  }
         const handleStepPage =(isSprintCreate)=>{
          
         if(isSprintCreate===1)
         {
          setEditSprint(null);
          setOpenMarketPlace(true);
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
          fetchShipPolicy(11);
          // setEditSprint(null);
          // setOpenMarketPlace(false);
          // setOpenNextReturn(false);
       
          // setOpenShipPloicy(true);
          // setOpenCarries(false);
          // setOpenReturn(false);
          // setOpenReturnPreFilled(false);
          // setOpenCustomePromotional(false);
          // setOpenCustomePackaging(false);
          // setOpenProductImport(false);
          // setOpenImportProduct(false);
          // setOpenProductList(false);
          // setOpenProductSelection(false);
          // setOpenSelectStore(false);
          // setOpenCustomerSelection(false);
          // setOpenCreateCustomeIntegration(false);
          // setOpenSelectCustomer(false);
          // setOpenCustomerSelection(false);
          // setOpenAddCustomerManually(false);
          // setOpenCustomerList(false);
          // setOpenFutureCustomer(false);
          // setOpenOrderList(false);
          // setOpenImportOrder(false);
         }
         else if(isSprintCreate===3)
         {
          setEditSprint(null);
          setOpenMarketPlace(false);
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
          setOpenSelectCustomer(false);
          setOpenAddCustomerManually(false);
          setOpenCustomerList(false);
          setOpenFutureCustomer(false);
          setOpenOrderList(false);
          setOpenImportOrder(true);
         }

         else{
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
         /**
          * Description;To do cancel Sprint poup screen
          */
         const handlePrevious = (isSprintCreate) => {
          if (isSprintCreate === 1) {
            setOpenNextReturn(false);
            setOpenMarketPlace(true);
            setOpenShipPloicy(false);
          } else if (isSprintCreate === 2) {
            setOpenNextReturn(true);
            setOpenShipPloicy(false);
          } else if (isSprintCreate === 3) {
            fetchShipPolicy();
           // setOpenShipPloicy(true);
            //setOpenCarries(false);
          }  else if (isSprintCreate === 27) {
   
            setOpenCustomerSelection(false);
            setOpenCustomerList(false);
            setOpenOrderList(false);
            setOpenFutureCustomer(false);
            setOpenImportOrder(true);
          }   else if (isSprintCreate === 4) {
            fetchShipPolicy();
          //  setOpenShipPloicy(true);
           // setOpenReturn(false);
          } else if (isSprintCreate === 5) {
            setOpenReturn(true);
            setOpenReturnPreFilled(false);
            setOpenMarketPlace(false);
            setOpenCustomePromotional(false);
          } else if (isSprintCreate === 6) {
            setOpenReturn(true);
            setOpenReturnPreFilled(false);
          setOpenCustomePromotional(false);
           
          } else if (isSprintCreate === 7) {
            setOpenCustomePromotional(true);
            setOpenCustomePackaging(false);
          } else if (isSprintCreate === 8) {
            if (openPageExits !== 0 && openPageExits !== 5) {
              handleNext(openPageExits);
              setPageExits(0);
            } else {
              setOpenCustomePackaging(true);
              setOpenProductSelection(false);
            }
          } else if (isSprintCreate === 9) {
            fetchPackageForPromotional();
            fetchPackingList();
            setOpenProductSelection(true);
            setOpenSelectStore(false);
            setOpenProductList(false);
            setOpenImportProduct(false);
          } else if (isSprintCreate === 10) {
            setOpenSelectStore(true);
            setOpenProductImport(false);
          } else if (isSprintCreate === 11) {
            setOpenProductImport(true);
            setOpenImportProduct(false);
          } else if (isSprintCreate === 12) {
            if (openPageExits !== 0 && openPageExits !== 5 && openPageExits !== 7) {
              handleNext(openPageExits);
              setPageExits(0);
            } else {
              setOpenImportProduct(true);
              setOpenProductList(false);
            }
          } else if (isSprintCreate === 13) {
            setOpenProductList(true);
            setOpenCustomerSelection(false);
          } else if (isSprintCreate === 14) {
            // setOpenProductList(true);
            setOpenCustomerSelection(true);
            setOpenAddCustomerManually(false);
            setOpenSelectCustomer(false);
          } else if (isSprintCreate === 17) {
            // setOpenProductList(true);
            //    setOpenCustomerSelection(false);
            if (
              openPageExits !== 11 &&
              openPageExits !== 0 &&
              openPageExits !== 5 &&
              openPageExits !== 7
            ) {
              handleNext(openPageExits);
              setPageExits(0);
            } else {
              setOpenCustomerList(false);
              setOpenSelectCustomer(true);
            }
          } else if (isSprintCreate === 18) {
            // setOpenProductList(true);
            // setOpenCustomerSelection(true);
            setOpenCustomerList(false);
            setOpenAddCustomerManually(true);
          } else if (isSprintCreate === 20) {
            // setOpenProductList(true);
            // setOpenCustomerSelection(true);
            setOpenCustomerList(true);
            setOpenFutureCustomer(false);
          } else if (isSprintCreate === 15) {
            // setOpenProductList(true);
            setOpenCreateCustomeIntegration(true);
          } else {
            setOpenProductList(false);
            setOpenImportProduct(false);
            setOpenReturnPreFilled(false);
            setOpenReturn(false);
            setOpenCarries(false);
            setOpenShipPloicy(false);
            setOpenNextReturn(false);
            setOpenMarketPlace(true);
          }
        };


         const handleNext1 =(isSprintCreate,pageExits)=>{

          fetchShiphypeCompleteStep();
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
         const handleNext = (isSprintCreate) => {
    fetchShiphypeCompleteStep();
    // fetchShiphypeCompleteStep1();

    if (isSprintCreate === 2) {
      setOpenNextReturn(true);
      setOpenMarketPlace(false);
    } else if (isSprintCreate === 3) {
      fetchShipPolicy();
      // setOpenShipPloicy(true);
      // setOpenNextReturn(false);
      // setOpenMarketPlace(false);
    } else if (isSprintCreate === 4) {
      setOpenCarries(true);
      setOpenShipPloicy(false);
      setOpenMarketPlace(false);
    } else if (isSprintCreate === 5) {
      setOpenReturn(true);
      setOpenCarries(false);
      setOpenMarketPlace(false);
      setOpenShipPloicy(false);
      setOpenMarketPlace(false);
      setOpenCustomePromotional(false);
    } else if (isSprintCreate === 6) {
      setOpenReturnPreFilled(true);
      setOpenReturn(false);
    } else if (isSprintCreate === 7) {
      setOpenCustomePromotional(true);
      setOpenReturnPreFilled(false);
      setOpenCustomePackaging(false);
      setOpenProductSelection(false);
      setOpenReturn(false);
    } else if (isSprintCreate === 8) {
      setOpenCustomePackaging(true);
      setOpenCustomePromotional(false);
    } else if (isSprintCreate === 9) {
      fetchPackageForPromotional();
      fetchPackingList();
      setOpenProductSelection(true);
      setOpenCustomePackaging(false);
      setOpenCustomePromotional(false);
    } else if (isSprintCreate === 10) {
      setOpenSelectStore(true);
      setOpenProductSelection(false);
    } else if (isSprintCreate === 11) {
      setOpenProductImport(true);
      setOpenSelectStore(false);
      setOpenProductList(false);
    } else if (isSprintCreate === 12) {
      setOpenImportProduct(true);

      setOpenProductSelection(false);
      setOpenProductImport(false);
    } else if (isSprintCreate === 13) {
      setOpenProductList(true);
      setOpenImportProduct(false);
    } else if (isSprintCreate === 14) {
      setOpenProductSelection(false);
      setOpenProductList(false);
      setOpenCustomerSelection(true);
    } else if (isSprintCreate === 15) {
      //  setOpenProductList(false);
      setOpenMarketPlace(false);
      setOpenCreateCustomeIntegration(true);
    } else if (isSprintCreate === 16) {
      //  setOpenProductList(false);
      setOpenMarketPlace(true);
      setOpenCreateCustomeIntegration(false);
    } else if (isSprintCreate === 17) {
      //  setOpenProductList(false);
      setOpenSelectCustomer(true);
      setOpenCustomerSelection(false);
      setOpenCustomerList(false);
    } else if (isSprintCreate === 18) {
      //  setOpenProductList(false);

      setOpenAddCustomerManually(true);
      setOpenCustomerSelection(false);
      setOpenCustomerList(false);
    } else if (isSprintCreate === 20) {
      // setOpenProductList(true);
      // setOpenCustomerSelection(true);
      setOpencustomerimportadd(false);
      setOpenCustomerList(true);
      setOpenSelectCustomer(false);
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
    } else if (isSprintCreate === 22) {
      // setOpenProductList(true);
      // setOpenCustomerSelection(true);
      setOpenFutureCustomer(false);
      setOpen1(true);
      // props.handleNextPage(1);
    } else if(isSprintCreate === 23){
      setOpenSelectCustomer(false);
      setOpencustomerimportadd(true);
      
    } else {
      setOpenSelectCustomer(false);
      setOpenCustomerSelection(false);
      setOpenAddCustomerManually(false);
      setOpenCustomerList(false);
      setOpenMarketPlace(false);
      setOpenCreateCustomeIntegration(false);
    }
  };
  const handleCancleImport = (isimport) => {
    if(isimport){
     setValue(1);
     setOpenOrderList(true);
     setOpenImportOrder(false);
    }else{
     setValue(0);
     setOpenOrderList(false);
     setOpenImportOrder(false);
    }
  };

         const handleClose3 = () => {
          setOpen1(false);
         // handleNextPage(22);
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
       //Make custom button
       const ColorButton9 = withStyles(theme => ({
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
          //  paddingLeft: '22%',
          //  paddingRight: '22%',
          '&:hover': {
            backgroundColor: '#002080',
            
          },
        },
      }))(Button);
const ColorButton2 = withStyles(theme => ({
  root: {
    color: '#fff',
    borderRadius : '3px',
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    height:'100%',
    width:'170px',
     fontSize:'11px',
     fontWeight: '550',
     color:'#fff',
     backgroundColor:'#0168fa',
    '&:hover': {
      backgroundColor: '#002080',
      
    },
  },
}))(Button);

const ColorButtonBlog = withStyles(theme => ({
  root: {
    // color: '#fff',
    // borderRadius : '3px',
    
    // height:'100%',
    // width:'170px',
    //  fontSize:'11px',
    //  fontWeight: '550',
    //  color:'#fff',
    //  backgroundColor:'#0168fa',
    // '&:hover': {
    //   backgroundColor: '#002080',
      
    // },

   
      borderRadius :'3px',
      // paddingTop: '10%',
      // paddingBottom: '10%',
      backgroundColor:'#fff',
      height:'70%',
    
      width:'100px',
      fontSize:'11px',
      fontWeight: '550',
      color:'#000',
      '&:hover': {
        backgroundColor: '#fff',
        color:'#000',
      },
  },
}))(Button);


const ColorButtonHome = withStyles(theme => ({
  root: {
    // color: '#fff',
    // borderRadius : '3px',
   
    // height:'100%',
    // width:'170px',
    //  fontSize:'11px',
    //  fontWeight: '550',
    //  color:'#fff',
    //  backgroundColor:'#0168fa',
    // '&:hover': {
    //   backgroundColor: '#002080',
      
    // },
    borderRadius : '3px',
    fontSize:'11px',
    fontWeight: '550',
    color:'#fff',
    backgroundColor:'#000',
    marginLeft:'8px',
    height:'70%',
     
    width:'100px',
    '&:hover': {
      color:'#fff',
      backgroundColor:'#000',
    },
  },
}))(Button);

const ColorButtonOrder = withStyles(theme => ({
  root: {
    // color: '#fff',
    // borderRadius : '3px',
    // height:'100%',
    // width:'170px',
    //  fontSize:'11px',
    //  fontWeight: '550',
    //  color:'#fff',
    //  backgroundColor:'#0168fa',
    // '&:hover': {
    //   backgroundColor: '#002080',
      
    // },

    borderRadius : '3px',
    height:'70%',
    
      width:'110px',
      fontSize:'11px',
      fontWeight: '550',
       marginLeft:'8px',
       color:'#fff',
       backgroundColor:'#0168fa',
      '&:hover': {
        color:'#fff',
        backgroundColor: '#0168fa',
      },
  },
}))(Button);

const ColorButtonShippingCalculator = withStyles(theme => ({
  root: {
    // color: '#fff',
    // borderRadius : '3px',
    
    // height:'100%',
    // width:'170px',
    //  fontSize:'11px',
    //  fontWeight: '550',
    //  color:'#fff',
    //  backgroundColor:'#0168fa',
    // '&:hover': {
    //   backgroundColor: '#002080',
      
    // },
    
    borderRadius :'3px',
    backgroundColor:'#fff',
    height:'70%',
   
    width:'210px',
    fontSize:'11px',
      fontWeight: '550',
    marginLeft:'8px',
      marginRight:'18px',
    color:'#000',
    '&:hover': {
      backgroundColor: '#fff',
      color:'#000',
    },
    // border : ' 1px solid #c0ccda',
    //   borderRadius :'3px',
    //   height:'94%',
    //   marginLeft:'8px',
    //   marginRight:'18px',
    //   width:'180px',
    //   fontSize:'11px',
    //   fontWeight: '600',
    //   color:'rgba(27, 46, 75, 0.7)',
  },
}))(Button);
const BorderLinearProgress = withStyles({
  root: {
    height: 20,
    // backgroundColor: lighten('#ff6c5c', 0.5),
    border: '2px solid #ced4da',
     backgroundColor:'#FDFEFE ',
  },
  bar: {
    borderRadius: 0,
    backgroundColor: '#0168fa',
  },
})(LinearProgress);

const ProgressBar = () => {
 

  const containerStyles = {
    height: 16,
    width: '97%',
    backgroundColor: "#fff",
    borderRadius: '15px',
   marginLeft:'15px',
  
    border: '1px solid #CCCCCC',
  }

  const fillerStyles = {
    height: '100%',
    width: `${now}%`,
    backgroundColor: '#0168fa',
    borderRadius: 'inherit',
    textAlign: 'right'
   
  }

  const labelStyles = {
   
    color: 'white',
    fontWeight: '8',
   
  }
  const paddingBottom = {
    paddingBottom:'5px',
    color: 'white',
    fontSize:'13px',
    fontWeight: '10px',
   
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


const fetchPackageForPromotional = () => {    
  //setLoading(true);
  shiphypeService.fetchCustomePaching(userid,2)
        .then(response => {
         console.log("status",response.status);
              if(response.status === true) {
              //  setLoading(false);
                setPromotionalPackage(response.data);
                         }else{
                          setLoading(false);
                          console.log("message",response.message);
                         }   
            }).catch((error) =>{
                  console.error(error);
            });
};

const promotionalData = {};
promotionalPackage.map(orderCouierOp => {
    const { packaggingId, packaggingName } = orderCouierOp;
    promotionalData[ packaggingId ] = packaggingName
})
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

const updateData = (data, integrateDataid) => {
  if(integrateDataid === 3){
    setImportCustData(data);
    setImportData(null);
    setImportEbayData(null);
  }else if(integrateDataid === 1){
    setImportEbayData(data);
    setImportCustData(null);
    setImportData(null);
  }
  else{
    setImportData(data);
    setImportEbayData(null);
    setImportCustData(null);
  }
   
    setSelectintegration(integrateDataid);
  };


    const handleClickOpen = () => {    
      setEditSprint(null);
     //setOpenCarries(true);
       setOpenMarketPlace(true);
   //  setOpenReturnPreFilled(true);
 //  setOpenCustomePackaging(true);
     //setOpenCustomePromotional(true);
   //setOpenShipPloicy(true);
   //   setOpenReturn(true);
// setOpenProductImport(true);
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
            <Snackbar 
       //  style={{right:'-210px'}}
      anchorOrigin={{ vertical, horizontal }}
  key={`${vertical},${horizontal}`}
      open={open1}
      autoHideDuration={100000}
      onClose={handleClose3}>
      <Alert onClose={handleClose3} severity="success">
      You are all set up now. Please click the "Send Inventory" tab to start sending inventory to ShipHype!   
      </Alert>
      </Snackbar>
      </Grid>
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
           }}>Fulfillment Dashboard</Text>
           </Grid> 
              </Grid>
           
<Grid item xs={12} md={8} lg={8} >

  <Grid container item  justify="flex-end" >
<Grid style={{marginTop:'17px'}}>

                  <ColorButtonBlog
    size='large'
    variant="contained"
    color="primary"
    onClick={()=>{handleClickBlog()}}
    startIcon={<SpeakerNotesOutlinedIcon />}
    >BLOG
    
   
  </ColorButtonBlog>

  <ColorButtonHome
    size='large'
    variant="contained"
    color="primary"
    onClick={()=>{handleClickHome()}}
    startIcon={<HomeIcon />}
    >
    Home
   
  </ColorButtonHome>

  <ColorButtonOrder
    size='large'
    variant="contained"
    color="primary"
    onClick={()=>{handleClickOrder()}}
    startIcon={<LocalShippingIcon />}
    >
    ORDERS
   
  </ColorButtonOrder>

  <ColorButtonShippingCalculator
    size='large'
    variant="contained"
    color="primary"
    onClick={()=>{handleClickCalulator()}}
    startIcon={<CallToActionOutlinedIcon />}
    >
    Shipping Calculator
   
  </ColorButtonShippingCalculator>
  
{/* <Button  className={button1}  onClick={()=>{handleClickBlog()}} startIcon={<SpeakerNotesOutlinedIcon />}>BLOG</Button>
<Button  className={button2}   onClick={()=>{handleClickHome()}} startIcon={<HomeIcon style={{ color:'#fff'}}/>}>Home</Button>
<Button  className={button3}  onClick={()=>{handleClickOrder()}}  startIcon={<LocalShippingIcon style={{ color:'#fff'}}/>}>ORDERS</Button>
<Button  className={button4} onClick={()=>{handleClickCalulator()}} startIcon={<CallToActionOutlinedIcon/>}>Shipping Calculator</Button> */}
</Grid>
              </Grid>
              </Grid>
           
              </Grid>
             
              </View>  


              <View className={classes.root}> 
          {/* {(() => {
            
            return (
                
              <View>
                   <ProgressBar   variant="determinate" value={now} />


             </View>
            

            )


               })()}  */}
             
             
          </View>



              <View className={classes.paper9} >
            
            <View className={classes.paper1}>
            <Grid container spacing={2}>
              <Grid items lg={6} >
          <Text style={{ fontSize: '14px',
             fontWeight: '700',
             fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
             color: '#001737',
           // paddingLeft:'2px',
             transition : 'all 0.25s',}} >
            Welcome to ShipHype,{'\n'}</Text>
            <Text style={{ fontSize: '14px',
            // fontWeight: '700',
             fontFamily: 'system-ui',
             color: '#001737',
          //  paddingLeft:'2px',
             transition : 'all 0.25s',}} >
             Your dashboard will provide you complete control of all your orders. You'll have the ability to 
             view, edit, cancel or modify all your orders. Let's get you started. Please click the blue Setup
             Wizard button to get started with Order Fulfillment. Feel free to reach out to me directly if you
             have any questions: waleed@shiphype.com{'\n'} 
            </Text>
            {/* <Text style={{ fontSize: '14px',
            // fontWeight: '700',
             fontFamily: 'system-ui',
             color: '#001737',
            paddingLeft:'2px',
             transition : 'all 0.25s',}} >
           view, edit, cancel or modify all your orders. Let's get you started. Please click the blue Setup{'\n'} 
           </Text>
            <Text style={{ fontSize: '14px',
            // fontWeight: '700',
             fontFamily: 'system-ui',
             color: '#001737',
            paddingLeft:'2px',
             transition : 'all 0.25s',}} >
               Wizard button to get started with Order Fulfillment. Feel free to reach out to me directly if you {'\n'}</Text>

             <Text style={{ fontSize: '14px',
            // fontWeight: '700',
             fontFamily: 'system-ui',
             color: '#001737',
            paddingLeft:'2px',
             transition : 'all 0.25s',}} >
               have any questions: waleed@shiphype.com
             </Text> */}
            
              </Grid>
            
              <Grid items lg={6}>
              <Grid  justify="space-between" container spacing={2}>
        <Grid item lg={3} ></Grid>
        <Grid item lg={9} >
              <Avatar alt="Remy Sharp" src={icon} className={s4} /> 
            <Text style={{ fontSize: '11px',
           // fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          marginLeft:'10%',
            transition : 'all 0.25s',}}>Founder & CEO{'\n'} </Text><Text style={{ fontSize: '11px',
            // fontWeight: '700',
             fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
             color: '#001737',
           marginLeft:'8%',
             transition : 'all 0.25s',}}>  Waleed Shahzad</Text> 
              </Grid>
              </Grid>
              </Grid>
              </Grid>
              </View>
            
             
              <Grid  justify="space-between" container style={{ marginTop:'1%',}} >
             
              <Grid items  lg={7} xs={12}>
              <View className={setupwizrd}>
             
             
              <Grid justify="center" // Add it here :)
      container>
      <Grid items lg={12} xs={12}> 
      <Image className={s1} source={searchicons} /> 
                </Grid>
                <Grid items lg={12} xs={12}> <Text style={{ fontSize: '11px',
           // fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}} >Setup Wizard{'\n'}</Text></Grid>
                <Grid items lg={12} xs={12}>
                  <ColorButton2
    size='large'
    variant="contained"
    color="primary"
    onClick={()=>{handleClickOpen()}}
   
    >
    {<Text style={{ fontSize: '11px',
           // fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#FFFFFF',
            fontWeight: '550',
            transition : 'all 0.25s',}}>Setup Wizard</Text> } 
   
  </ColorButton2>
  
  </Grid>
  </Grid>
              {/* <Button  style={{color:'#fff'}} }></Button>
               */}
              
              </View>
                </Grid>
              
                <Grid items  lg={5} xs={12}>
                <View className={setupbutton}>
                  <Grid justify="center" // Add it here :)
      container>
         <Grid items lg={12} xs={12}>  <Image className={s2} source={hand} /> </Grid>
               <Grid items lg={12} xs={12} > <Text style={{ fontSize: '11px',
           // fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}}>Service Level Agreements (SLAs){'\n'}</Text></Grid>
               <Grid items lg={12} xs={12} >     
                  <ColorButton9
    size='large'
    variant="contained"
    color="primary"
    onClick={()=>{handleClickService()}}
    //onClick={()=>{handleNextPage(3)}}
    > 
    {<Text style={{ fontSize: '11px',
           // fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#FFFFFF',
            fontWeight: '550',
            transition : 'all 0.25s',}}>View</Text> } 
   
  </ColorButton9>
  </Grid>
  </Grid>
              </View>

             
     

              {openSprint === false ? (
              " "
            ) : (
              <MarketPlace

               handleOrder={handleOrderPage}
                code={props.code}
                openSprint={openSprint}
                user_id={userid}
                handleNext={handleNext}
                handleStepPage={handleStepPage}
                handleSprintCancel={handleSprintCancel}
                handleOpenaddpercentage={handleOpenaddpercentage}
                editSprint={editSprint}
              />
            )}
            {/* {openNextReturn === false ? (
              " "
            ) : (
              <SelectWarehouse
                user_id={userid}
                openNextReturn={openNextReturn}
                handlePreviousPage={handlePrevious}
                handleNextPage={handleNext}
                handleStepPage={handleStepPage}
                handleOpenaddpercentage={handleOpenaddpercentage}
                handleSprintCancel={handleSprintCancel}
              />
            )} */}
            {openShipPolicy === false ? (
              " "
            ) : (
              <ShippingPolicy
                user_id={userid}
                openShipPolicy={openShipPolicy}
                handleNextPage={handleNext}
                policyData={policyData}
                policyDataId={policyDataId}
                shipData={shipData}
                handlePreviousPage={handlePrevious}
                handleSprintCancel={handleSprintCancel}
                handleStepPage={handleStepPage}
                shipementIdModule={setShipementIdModule}
                handleOpenaddpercentage={handleOpenaddpercentage}
                shipementId={shipementId}
              />
            )}
            {/* {openCarries === false ? (
              " "
            ) : (
              <ShipingCarries
                user_id={userid}
                openCarries={openCarries}
                shipmentData={shipmentData}
                handleNext={handleNext}
                handlePreviousPage={handlePrevious}
                handleStepPage={handleStepPage}
                handleSprintCancel={handleSprintCancel}
                handleOpenaddpercentage={handleOpenaddpercentage}
              />
            )} */}
            {openReturn === false ? (
              " "
            ) : (
              <ReturnSetting
                openReturn={openReturn}
                user_id={userid}
                handleNextPage={handleNext1}
                handlePreviousPage={handlePrevious}
                handleStepPage={handleStepPage}
                handleSprintCancel={handleSprintCancel}
                handleOpenaddpercentage={handleOpenaddpercentage}
              />
            )}
         
            {openImportProduct === false ? (
              " "
            ) : (
              <ImportProduct
                openImportProduct={openImportProduct}
                user_id={userid}
                promotionalData={promotionalData}
                packageData={packageData}
                customePackageFirstId={customePackageFirstId}
                handleStepPage={handleStepPage}
                handleNextPage={handleNext}
                handlePreviousPage={handlePrevious}
                handleSprintCancel={handleSprintCancel}
              />
            )}
            {openProductList === false ? (
              " "
            ) : (
              <ProductList
                openProductList={openProductList}
                handleStepPage={handleStepPage}
                user_id={userid}
                promotionalData={promotionalData}
                packageData={packageData}
                handleNextPage={handleNext}
                handlePreviousPage={handlePrevious}
                handleSprintCancel={handleSprintCancel}
              />
            )}
            {openCustomePromotional === false ? (
              " "
            ) : (
              <CustomePromotional
                openCustomePromotional={openCustomePromotional}
                handleNextPage={handleNext1}
                handleStepPage={handleStepPage}
                user_id={userid}
                handleNextPage1={handleNext}
                handlePreviousPage={handlePrevious}
                handleSprintCancel={handleSprintCancel}
              />
            )}
            {openProductImport === false ? (
              " "
            ) : (
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
                handlePreviousPage={handlePrevious}
                handleSprintCancel={handleSprintCancel}
              />
            )}
            {openCustomePackaging === false ? (
              " "
            ) : (
              <CustomePackaging
                openCustomePackaging={openCustomePackaging}
                user_id={userid}
                handleStepPage={handleStepPage}
                handleNextPage={handleNext}
                handlePreviousPage={handlePrevious}
                handleSprintCancel={handleSprintCancel}
              />
            )}
            {openProductSelection === false ? (
              " "
            ) : (
              <ProductSelection
                openProductSelection={openProductSelection}
                handleNextPage={handleNext}
                handleStepPage={handleStepPage}
                user_id={userid}
                handleNextPage1={handleNext1}
                handlePreviousPage={handlePrevious}
                handleSprintCancel={handleSprintCancel}
              />
            )}
            {openSelectStore === false ? (
              " "
            ) : (
              <SelectStore
                openSelectStore={openSelectStore}
                updateData={updateData}
                handleNextPage={handleNext}
                handleStepPage={handleStepPage}
                user_id={userid}
                handlePreviousPage={handlePrevious}
                handleSprintCancel={handleSprintCancel}
              />
            )}
            {openCustomerSelection === false ? (
              " "
            ) : (
              <CustomerSelection
                openCustomerSelection={openCustomerSelection}
                handleStepPage={handleStepPage}
                handleNextPage={handleNext}
                updateData={updateData}
                user_id={userid}
                handlePreviousPage={handlePrevious}
                handleSprintCancel={handleSprintCancel}
              />
            )}
            {openCreateCustomeIntegration === false ? (
              " "
            ) : (
              <Createcustomeintegration
                openCreateCustomeIntegration={openCreateCustomeIntegration}
                handleStepPage={handleStepPage}
                user_id={userid}
                handleNextPage={handleNext}
                handlePreviousPage={handlePrevious}
                handleSprintCancel={handleSprintCancel}
              />
            )}

            {openAddCustomerManually === false ? (
              " "
            ) : (
              <AddCustomerManually
                openAddCustomerManually={openAddCustomerManually}
                handleNextPage={handleNext1}
                handleStepPage={handleStepPage}
                user_id={userid}
                handlePreviousPage={handlePrevious}
                handleSprintCancel={handleSprintCancel}
              />
            )}
            {openSelectCustomer === false ? (
              " "
            ) : (
              <SelectCustomerManually
                openSelectCustomer={openSelectCustomer}
                handleNextPage={handleNext}
                handleStepPage={handleStepPage}
                user_id={userid}
                updateData={updateData}
                handlePreviousPage={handlePrevious}
                handleSprintCancel={handleSprintCancel}
              />
            )}
            {openCustomerList === false ? (
              " "
            ) : (
              <CustomerList
                openCustomerList={openCustomerList}
                handleNextPage={handleNext}
                handleStepPage={handleStepPage}
                user_id={userid}
                updateData={updateData}
                handlePreviousPage={handlePrevious}
                handleSprintCancel={handleSprintCancel}
              />
            )}
            {openFutureCustomer === false ? (
              " "
            ) : (
              <FutureCustomer
                openFutureCustomer={openFutureCustomer}
                handleNextPage={handleNext}
                handleStepPage={handleStepPage}
                user_id={userid}
                updateData={updateData}
                handlePreviousPage={handlePrevious}
                handleSprintCancel={handleSprintCancel}
              />
            )}
            {opencustomerimportadd === false ? (
              " "
            ) : (
              <CustomerImportAdd
                opencustomerimportadd={opencustomerimportadd}
                handleNextPage={handleNext}
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
                handleNextPage={handleNext}
                handleStepPage={handleStepPage}
                user_id={userid}
                handlePreviousPage={handlePrevious}
                handleSprintCancel={handleSprintCancel}
              />
            )}



            {openImportOrder === false ? (
              " "
            ) : (
              <ImportShopfyOrder
                openImport={openImportOrder}
                userid={userid}
                updateData={updateDataOrder}
                handleStepPage={handleStepPage}
                handlePreviousPage={handleNext}
                handleCancle={handleCancleImport}
              />
            )}

            {openOrderList === false ? (
              " "
            ) : (
              <OrderImportCreateForSetUp
                openorderimportcreate={openOrderList}
                integrationid={integrationid}
                importOrderData={importOrderData}
                importWorderData={importWorderData}
                userid={userid}
                handleStepPage={handleStepPage}
                handlePreviousPage={handleNext}
                handleCancle={handleCancleImport}
              />
            )}
            {openDelete === false ? (
              " "
            ) : (
              <DeleteCard
                openDeleteCard={openDelete}
                enableTrue={enableTrue}
                handleStepPage={handleStepPage}
                userid={userid}
                handleNextPage={handleNext}
                enableFunction={enableFunction}
                handleDeleteCancle={handleDeleteCancle}
              />
            )}
                </Grid>
                {/* <Snackbar 
      anchorOrigin={{ vertical, horizontal }}
      key={`${vertical},${horizontal}`}
      open={open1}
      autoHideDuration={10000}
      onClose={handleClose3}>
      <Alert onClose={handleClose3} severity="success">
      You are all set up now. Please click the "Send Inventory" tab to start sending inventory to ShipHype!
      </Alert>
      </Snackbar> */}
                </Grid>
                <View className={setupbutton9}>
                <Grid container justify="space-between">
               
                
                <Grid items xs={10} md={4} lg={4}>
               


                <View className={footCss}>
                <Box mt={10}>
                <Grid items lg={12} xs={12}>  <Image className={s3}  source={bestbuy} /> </Grid>
                <Typography justify="center" variant="h4" style={{lineHeight:'0.5'}}>
      
        <Text style={{fontSize: '14px',
        fontWeight:'700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif'}}>Getting Started:
      
      </Text>   
      <Text style={{fontSize: '14px',
     //   fontWeight:'700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif'}}>
        {'\n'}ShipHype Checklist {'\n'}</Text>
        <Text style={{fontSize: '13px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif'}}>{textValue} of 12 Completed</Text>
        </Typography>
        </Box>
       
            </View>  
          </Grid>

        <Grid item xs={10} md={4} lg={4} >
               
        <View className={footCss}>
        <FormGroup>
        <FormControl component="fieldset">
     
        <RadioGroup aria-label="carries" name="carries" value={value} >
     
       <FormControlLabel value="7" className={classes.radioButtonCss}  control={<Radio color="primary" checked={true}/>} label={<Text style={{ fontSize: '12px',
           // fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}}>Create Account</Text> }/>
        {(() => { 
          if(marketdone===true)
          {
            return(
              <FormControlLabel value="8" onClick={()=>{handleChangeRadio1(8)}} className={classes.radioButtonCss}  control={<Radio color="primary" checked={marketdone}/>} label={<Text style={{ fontSize: '12px',
              // fontWeight: '700',
               fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
               color: '#001737',
             
               transition : 'all 0.25s',}}>Start Setup Wizard</Text> }/>
            )
          }
          else if(marketdone===true)
          {
            return(
              <FormControlLabel value="8" onClick={()=>{handleChangeRadio1(8)}} className={classes.radioButtonCss}  control={<Radio color="primary" checked={marketdone}/>} label={<Text style={{ fontSize: '12px',
              // fontWeight: '700',
               fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
               color: '#001737',
              // textDecorationLine: 'underline',
               transition : 'all 0.25s',}}>Start Setup Wizard</Text> }/>
            )
          }
          else{
            return(
              <FormControlLabel value="8" onClick={()=>{handleChangeRadio1(8)}} className={classes.radioButtonCss}  control={<Radio color="primary" checked={marketdone}/>} label={<Text style={{ fontSize: '12px',
              // fontWeight: '700',
               fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
               color: '#001737',
             
               transition : 'all 0.25s',}}>Start Setup Wizard</Text> }/>
            )
          }
             })()}
      
      {(() => { 
if(shippolicydone===true)
{
return(
  <FormControlLabel value="10"  onClick={()=>{handleChangeRadio1(10)}} className={classes.radioButtonCss} control={<Radio color="primary" checked={shippolicydone}/>} label={<Text style={{ fontSize: '12px',
  // fontWeight: '700',
   fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
   color: '#001737',
 
   transition : 'all 0.25s',}}>Shipping Policies</Text> }/>
)
}
else if(marketdone===true )
{
return(
  <FormControlLabel value="10"  onClick={()=>{handleChangeRadio1(10)}} className={classes.radioButtonCss} control={<Radio color="primary" checked={shippolicydone}/>} label={<Text style={{ fontSize: '12px',
  // fontWeight: '700',
   fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
   color: '#0168fa',
   textDecorationLine: 'underline',
   transition : 'all 0.25s',}}>Shipping Policies</Text> }/>
)
}
else{
return(
  <FormControlLabel value="10"  onClick={()=>{handleChangeRadio1(10)}} className={classes.radioButtonCss} control={<Radio color="primary" checked={shippolicydone}/>} label={<Text style={{ fontSize: '12px',
  // fontWeight: '700',
   fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
   color: '#001737',
 
   transition : 'all 0.25s',}}>Shipping Policies</Text> }/>
)
}
})()}

{/* {(() => { 
if(carrierselectiondone===true)
{
return(
  <FormControlLabel value="11"  onClick={()=>{handleChangeRadio1(11)}} className={classes.radioButtonCss} control={<Radio color="primary" checked={carrierselectiondone}/>} label={<Text style={{ fontSize: '12px',
  // fontWeight: '700',
   fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
   color: '#001737',
 
   transition : 'all 0.25s',}}>Carrier Selection</Text> }/>
)
}
else if(returnsettingdone===true  || shippolicydone===true)
{
return(
  <FormControlLabel value="11"  onClick={()=>{handleChangeRadio1(11)}} className={classes.radioButtonCss} control={<Radio color="primary" checked={carrierselectiondone}/>} label={<Text style={{ fontSize: '12px',
  // fontWeight: '700',
   fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
   color: '#0168fa',
   textDecorationLine: 'underline',
 
   transition : 'all 0.25s',}}>Carrier Selection</Text> }/>
)
}
else{
  return(
    <FormControlLabel value="11"  onClick={()=>{handleChangeRadio1(11)}} className={classes.radioButtonCss} control={<Radio color="primary" checked={carrierselectiondone}/>} label={<Text style={{ fontSize: '12px',
    // fontWeight: '700',
     fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
     color: '#001737',
   
     transition : 'all 0.25s',}}>Carrier Selection</Text> }/>
  )
}
})()} */}

{(() => { 
if(returnsettingdone===true)
{
return(
  <FormControlLabel value="12"  onClick={()=>{handleChangeRadio1(12)}} className={classes.radioButtonCss} control={<Radio color="primary" checked={returnsettingdone}/>} label={<Text style={{ fontSize: '12px',
  // fontWeight: '700',
   fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
   color: '#001737',
 
   transition : 'all 0.25s',}}>Return Settings</Text> }/>
)
}
else if(shippolicydone===true)
{
return(
  <FormControlLabel value="12"  onClick={()=>{handleChangeRadio1(12)}} className={classes.radioButtonCss} control={<Radio color="primary" checked={returnsettingdone}/>} label={<Text style={{ fontSize: '12px',
  // fontWeight: '700',
   fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
   color: '#0168fa',
   textDecorationLine: 'underline',
 
   transition : 'all 0.25s',}}>Return Settings</Text> }/>
)
}
else{
  return(
    <FormControlLabel value="12"  onClick={()=>{handleChangeRadio1(12)}} className={classes.radioButtonCss} control={<Radio color="primary" checked={returnsettingdone}/>} label={<Text style={{ fontSize: '12px',
    // fontWeight: '700',
     fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
     color: '#001737',
   
     transition : 'all 0.25s',}}>Return Settings</Text> }/>
  )
}
})()}

{/* {(() => { 
if(customepackingdone===true)
{
return(
  <FormControlLabel value="13" onClick={()=>{handleChangeRadio1(13)}}  className={classes.radioButtonCss} control={<Radio color="primary" checked={customepackingdone}/>} label={<Text style={{ fontSize: '12px',
  // fontWeight: '700',
   fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
   color: '#001737',
 
   transition : 'all 0.25s',}}>Custom packaging</Text> }/>
)
}
else if(returnsettingdone===true  || productimportdone===true)
{
return(
  <FormControlLabel value="13" onClick={()=>{handleChangeRadio1(13)}}  className={classes.radioButtonCss} control={<Radio color="primary" checked={customepackingdone}/>} label={<Text style={{ fontSize: '12px',
  // fontWeight: '700',
   fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
   color: '#0168fa',
   textDecorationLine: 'underline',
 
   transition : 'all 0.25s',}}>Custom packaging</Text> }/>
)
}
else{
  return(
    <FormControlLabel value="13" onClick={()=>{handleChangeRadio1(13)}}  className={classes.radioButtonCss} control={<Radio color="primary" checked={customepackingdone}/>} label={<Text style={{ fontSize: '12px',
    // fontWeight: '700',
     fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
     color: '#001737',
   
     transition : 'all 0.25s',}}>Custom packaging</Text> }/>
  )
}
})()} */}

{(() => { 
if(productimportdone===true)
{
return(
  <FormControlLabel value="14" onClick={()=>{handleChangeRadio1(14)}}  className={classes.radioButtonCss} control={<Radio color="primary" checked={productimportdone}/>} label={<Text style={{ fontSize: '12px',
  // fontWeight: '700',
   fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
   color: '#001737',
 
   transition : 'all 0.25s',}}>Import Products</Text> }/>
)
}
else if(returnsettingdone===true)
{
return(
  <FormControlLabel value="14" onClick={()=>{handleChangeRadio1(14)}}  className={classes.radioButtonCss} control={<Radio color="primary" checked={productimportdone}/>} label={<Text style={{ fontSize: '12px',
  // fontWeight: '700',
   fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
   color: '#0168fa',
   textDecorationLine: 'underline',
 
   transition : 'all 0.25s',}}>Import Products</Text> }/>
)
}
else{
  return(
    <FormControlLabel value="14" onClick={()=>{handleChangeRadio1(14)}}  className={classes.radioButtonCss} control={<Radio color="primary" checked={productimportdone}/>} label={<Text style={{ fontSize: '12px',
    // fontWeight: '700',
     fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
     color: '#001737',
   
     transition : 'all 0.25s',}}>Import Products</Text> }/>
  )
}
})()}

{(() => { 
if(customerimportdone===true)
{
return(
  <FormControlLabel value="15" onClick={()=>{handleChangeRadio1(15)}} className={classes.radioButtonCss} control={<Radio color="primary" checked={customerimportdone}/>} label={<Text style={{ fontSize: '12px',
  // fontWeight: '700',
   fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
   color: '#001737',
 
   transition : 'all 0.25s',}}>Import Customers</Text> }/>
)
}
else if(productimportdone===true)
{
return(
  <FormControlLabel value="15" onClick={()=>{handleChangeRadio1(15)}} className={classes.radioButtonCss} control={<Radio color="primary" checked={customerimportdone}/>} label={<Text style={{ fontSize: '12px',
  // fontWeight: '700',
   fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
   color: '#0168fa',
   textDecorationLine: 'underline',
 
   transition : 'all 0.25s',}}>Import Customers</Text> }/>
)
}
else{
  return(
    <FormControlLabel value="15" onClick={()=>{handleChangeRadio1(15)}} className={classes.radioButtonCss} control={<Radio color="primary" checked={customerimportdone}/>} label={<Text style={{ fontSize: '12px',
    // fontWeight: '700',
     fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
     color: '#001737',
   
     transition : 'all 0.25s',}}>Import Customers</Text> }/>
  )
}
})()}

{(() => { 
if(sentInvo===true)
{
return(
  <FormControlLabel value="16"  onClick={()=>{handleChangeRadio1(16)}} className={classes.radioButtonCss} control={<Radio color="primary" checked={sentInvo}/>} label={<Text style={{ fontSize: '12px',
  // fontWeight: '700',
   fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
   color: '#001737',
 
   transition : 'all 0.25s',}}>Send Inventory</Text> }/>
)
}
else if(customerimportdone===true)
{
return(
  <FormControlLabel value="16"  onClick={()=>{handleChangeRadio1(16)}} className={classes.radioButtonCss} control={<Radio color="primary" checked={sentInvo}/>} label={<Text style={{ fontSize: '12px',
  // fontWeight: '700',
   fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
   color: '#0168fa',
   textDecorationLine: 'underline',
 
   transition : 'all 0.25s',}}>Send Inventory</Text> }/>
)
}
else{
  return(
    <FormControlLabel value="16"  onClick={()=>{handleChangeRadio1(16)}} className={classes.radioButtonCss} control={<Radio color="primary" checked={sentInvo}/>} label={<Text style={{ fontSize: '12px',
    // fontWeight: '700',
     fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
     color: '#001737',
   
     transition : 'all 0.25s',}}>Send Inventory</Text> }/>
  )
}
})()}

{(() => { 
if(pricePlan===true)
{
return(
  <FormControlLabel value="19"  onClick={()=>{handleChangeRadio1(19)}} className={classes.radioButtonCss} control={<Radio color="primary" checked={pricePlan}/>} label={<Text style={{ fontSize: '12px',
  // fontWeight: '700',
   fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
   color: '#001737',
 
   transition : 'all 0.25s',}}>Price Plan Agreement</Text> }/>
)
}
else if(sentInvo===true)
{
return(
  <FormControlLabel value="19"  onClick={()=>{handleChangeRadio1(19)}} className={classes.radioButtonCss} control={<Radio color="primary" checked={pricePlan}/>} label={<Text style={{ fontSize: '12px',
  // fontWeight: '700',
   fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
   color: '#0168fa',
   textDecorationLine: 'underline',
 
 
   transition : 'all 0.25s',}}>Price Plan Agreement</Text> }/>
)
}
else{
  return(
    <FormControlLabel value="19"  onClick={()=>{handleChangeRadio1(19)}} className={classes.radioButtonCss} control={<Radio color="primary" checked={pricePlan}/>} label={<Text style={{ fontSize: '12px',
    // fontWeight: '700',
     fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
     color: '#001737',
   
     transition : 'all 0.25s',}}>Price Plan Agreement</Text> }/>
  )
}
})()}

{(() => { 
if(connectCredit===true)
{
return(
  <FormControlLabel value="20"  onClick={()=>{handleChangeRadio1(20)}}  className={classes.radioButtonCss} control={<Radio color="primary" checked={connectCredit}/>} label={<Text style={{ fontSize: '12px',
           // fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}}>Payment Method</Text> }/>
)
}
else if(pricePlan===true)
{
return(
  <FormControlLabel value="20"  onClick={()=>{handleChangeRadio1(20)}}  className={classes.radioButtonCss} control={<Radio color="primary" checked={connectCredit}/>} label={<Text style={{ fontSize: '12px',
           // fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#0168fa',
            textDecorationLine: 'underline',
          
            transition : 'all 0.25s',}}>Payment Method</Text> }/>
)
}
else{
  return(
    <FormControlLabel value="20"  onClick={()=>{handleChangeRadio1(20)}}  className={classes.radioButtonCss} control={<Radio color="primary" checked={connectCredit}/>} label={<Text style={{ fontSize: '12px',
           // fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}}>Payment Method</Text> }/>
  )
}
})()}

{(() => { 
if(recieveSet===true)
{
return(
  <FormControlLabel value="21"  onClick={()=>{handleChangeRadio1(21)}} className={classes.radioButtonCss} control={<Radio color="primary" checked={recieveSet} />} label={<Text style={{ fontSize: '12px',
           // fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}}>Receiving Settings</Text> }/>
)
}
else if(connectCredit===true)
{
return(
  <FormControlLabel value="21"  onClick={()=>{handleChangeRadio1(21)}} className={classes.radioButtonCss} control={<Radio color="primary" checked={recieveSet} />} label={<Text style={{ fontSize: '12px',
           // fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#0168fa',
            textDecorationLine: 'underline',
          
          
            transition : 'all 0.25s',}}>Receiving Settings</Text> }/>
)
}
else{
  return(
    <FormControlLabel value="21"  onClick={()=>{handleChangeRadio1(21)}} className={classes.radioButtonCss} control={<Radio color="primary" checked={recieveSet} />} label={<Text style={{ fontSize: '12px',
           // fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}}>Receiving Settings</Text> }/>
  )
}
})()}

{(() => { 
if(orderSet===true)
{
return(
  <FormControlLabel value="22"  onClick={()=>{handleChangeRadio1(22)}}  className={classes.radioButtonCss} control={<Radio color="primary" checked={orderSet}/>} label={<Text style={{ fontSize: '12px',
  // fontWeight: '700',
   fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
   color: '#001737',
 
   transition : 'all 0.25s',}}>Order Settings</Text> }/>
)
}
else if(recieveSet===true)
{
return(
  <FormControlLabel value="22"  onClick={()=>{handleChangeRadio1(22)}}  className={classes.radioButtonCss} control={<Radio color="primary" checked={orderSet}/>} label={<Text style={{ fontSize: '12px',
  // fontWeight: '700',
   fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
   color: '#0168fa',
   textDecorationLine: 'underline',
 
   transition : 'all 0.25s',}}>Order Settings</Text> }/>
)
}
else{
  return(
    <FormControlLabel value="22"  onClick={()=>{handleChangeRadio1(22)}}  className={classes.radioButtonCss} control={<Radio color="primary" checked={orderSet}/>} label={<Text style={{ fontSize: '12px',
    // fontWeight: '700',
     fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
     color: '#001737',
   
     transition : 'all 0.25s',}}>Order Settings</Text> }/>
  )
}
})()}

{(() => { 
if(enabeSet===true)
{
return(
  <FormControlLabel value="23"  onClick={()=>{handleChangeRadio1(23)}} className={classes.radioButtonCss} control={<Radio color="primary" checked={enabeSet}/>} label={<Text style={{ fontSize: '12px',
  // fontWeight: '700',
   fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
   color: '#001737',
 
   transition : 'all 0.25s',}}>Enable Fulfilment</Text> }/>
)
}
else if(orderSet===true)
{
return(
  <FormControlLabel value="23"  onClick={()=>{handleChangeRadio1(23)}} className={classes.radioButtonCss} control={<Radio color="primary" checked={enabeSet}/>} label={<Text style={{ fontSize: '12px',
  // fontWeight: '700',
   fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
   color: '#0168fa',
   textDecorationLine: 'underline',
 
   transition : 'all 0.25s',}}>Enable Fulfilment</Text> }/>
)
}
else{
  return(
    <FormControlLabel value="23"  onClick={()=>{handleChangeRadio1(23)}} className={classes.radioButtonCss} control={<Radio color="primary" checked={enabeSet}/>} label={<Text style={{ fontSize: '12px',
    // fontWeight: '700',
     fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
     color: '#001737',
   
     transition : 'all 0.25s',}}>Enable Fulfilment</Text> }/>
  )
}
})()}

     
      
     
      
      
     
       
      
       
       
     
      
     
       
     </RadioGroup>
   </FormControl>
        </FormGroup>
      </View>

  </Grid>
 
  <Grid item xs={10} md={4} lg={4} >
               
        <View className={footCss}>
       
      </View>

  </Grid>
  
                </Grid>
                </View>  
               
               
                </View>
               
        </View>

    
        );
  }