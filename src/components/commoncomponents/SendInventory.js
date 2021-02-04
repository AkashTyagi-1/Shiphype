import React from 'react';
import clsx from 'clsx';
import {Platform,View,Image,Text,Dimensions} from 'react-native';
import { makeStyles,withStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Link from '@material-ui/core/Link';
import * as shiphypeService from './ShipService/shiphype_service';
import popUpStyle from './style/popUpStyle';
import MaterialTable , { MTableToolbar }from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
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
import { format } from 'date-fns';
import Typography from "@material-ui/core/Typography";
import DeleteCard from './ShowStatus';
import CancelOrder from './ShipmentStatus/CancelOrder';
import ProgressBar from "./feedback/ProgressBar";
import AsyncStorage from "@react-native-community/async-storage";
import RefreshIcon from '@material-ui/icons/Refresh';
import moment from "moment";
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
const ColorButtonAdd1 = withStyles(theme => ({
  root: {
   borderRadius : 0,
   //  paddingTop: '9%',
   //  paddingBottom: '9%',
   //marginTop:'3%',
   height:'100%',
   padding:'3px',
   width:'130px',
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
import { forwardRef } from 'react';
const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  RefreshIcon: forwardRef((props, ref) => <RefreshIcon {...props} ref={ref} color='action'/>),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
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
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

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
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(2),
      flexGrow: 1,
      height: '100vh',
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
      overflow: 'auto'
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
    button4 :{
      border : ' 1px solid #fff',
      borderRadius:'0px',
      color: '#fff',
      height:'auto',
      width:'100%',
      border:'1px solid #cccccc',
      textAlign:'center'


    },
    setupbutton9:{
      border : ' 1px solid #fff',
      borderRadius:'0px',
      color: '#fff',
      marginTop:'2%',
      height:'120vh',
      width:'100%',
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(3),
       paddingLeft: theme.spacing(2),
       paddingRight: theme.spacing(2),
      border:'1px solid #cccccc',
      textAlign:'center'
    },
    footCss9:{
        //border : ' 1px solid #fff',
        //borderRadius:'8%',
        //height:250,
        color: '#fff',
        paddingTop: theme.spacing(0),
       // margin: theme.spacing(1),
       // margin: '1px',
        paddingBottom: theme.spacing(0),
        // paddingLeft: theme.spacing(4),
        // paddingRight: theme.spacing(4),
        border:'1px solid #cccccc',
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
    Dashboardpaper: {
      border: '1px solid #ced4da',
      // boxShadow: '7px 2px 2px #cccccc',
      // shadowColor: '#000',
      //    shadowOffset: { width: 0, height: 1 },
      //    shadowOpacity: 0.8,
      //    shadowRadius: 2,
      //    elevation: 5,
       height: 100,
       width: 270,


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
     dividerFullWidth1: {
     marginTop:'4%',

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
      marginLeft:'10px',
      marginTop:'10px',
    },
    typography:{
      marginTop:'10px',
      marginLeft:theme.spacing(2),
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
    fixedHeight1: {
      height: 480,
    },
    chartContainer: {
      height: 400,
      position: 'relative'
    },
    radioButtonCss:{
        color:'#000',fontSize:'2px',    height: '25px'
      },

      normal :{
        border : ' 1px solid #c0ccda',
        marginTop: theme.spacing(2),
        borderRadius : '3px',
        fontSize:'11px',
        height:40,
         width:290,
          backgroundColor:'#fff',
          color:'#000',
          '&:hover': {
              //backgroundColor:'#0168fa',
              //color:'#fff',
              },

        },

        buttonCal :{
          border : ' 1px solid #c0ccda',
          borderRadius :'3px',
          // paddingTop: '10%',
          // paddingBottom: '10%',
          height:'100%',
          marginLeft:'6px',
          marginRight:'10px',
          width:'180px',
          fontSize:'11px',
          fontWeight: '550',
          color:'rgba(27, 46, 75, 0.7)',
          // paddingLeft: '22%',
          // paddingRight: '22%',

        },
        normalSelected :{

          marginTop: theme.spacing(2),
          borderRadius : '3px',
          fontSize:'11px',
          height:40,
           width:290,
          backgroundColor:'#0168fa',
          color:'#fff',
          '&:hover': {

              //backgroundColor:'#0168fa',
              //color:'#fff',
              },

        },
        urgent :{
          border : ' 1px solid #c0ccda',
          marginTop: theme.spacing(2),
          borderRadius : '3px',
          fontSize:'11px',
          height:40,
           width:290,
          backgroundColor:'#0168fa',
          color:'#fff',
          '&:hover': {
             backgroundColor:'#0168fa',
              color:'#fff',
              },
        },
        urgentSelected :{

          marginTop: theme.spacing(2),
          borderRadius : '3px',
          fontSize:'11px',
          height:40,
           width:290,
          backgroundColor:'#0168fa',
          color:'#fff',
          '&:hover': {
              backgroundColor:'#0168fa',
              color:'#fff',
              },
        },
        urgentSelected1 :{
          border : ' 1px solid #c0ccda',
          marginTop: theme.spacing(2),
          borderRadius : '3px',
          fontSize:'11px',
          height:40,
           width:250,
          backgroundColor:'#fff',
          color:'#000',
          '&:hover': {
            border : ' 1px solid #c0ccda',
            backgroundColor:'#fff',
            color:'#000',
              },
        },

        quantitycss:{
          width:'90%',
          fontSize:'6px',
          cursor:'pointer',
         },
  }));




  const ColorButton = withStyles(theme => ({
    root: {
      color: '#fff',
      borderRadius : '3px',
      //  paddingTop: '9%',
      //  paddingBottom: '9%',
      height:'100%',
      width:'170px',
      fontSize:'10px',
      fontWeight: '500',
       color:'#fff',
       backgroundColor:'#0168fa',
    '&:hover': {
      backgroundColor: '#0168fa',

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


  export default function SendInventory(props) {
    const classes = useStyles();
    const userid=props.user_id;
    const shipmentId=props.shipmentId;
    const [selectwarehouse,setSelectwarehouse]=React.useState(0);
    const [data,setData]=React.useState([]);
    const [loading,setLoading]=React.useState(false);
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight1);
  const[value,setValue]=React.useState(0);
  const[promotionalPackage,setPromotionalPackage]=React.useState([]);
  const [radioselect,setRadioselect]=React.useState(true);
  const[dataproduct,setDataProduct]=React.useState([]);
  const[packingdata,setPackingdata]=React.useState([]);
  const [dangerousGoodId, setDangerousGoodId] = React.useState(0);
  const [cardid,setCardid]=React.useState(0);
  const [rowStatus,setRowStatus]=React.useState('');
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openCancelOrder, setOpenCancelOrder] = React.useState(false);
  const handleGetShipmentId=(rowData)=>{
    // setLoading(true);
    // shiphypeService.fetchCustomePaching(userid)
    //       .then(response => {
    //        console.log("status",response.status);
    //             if(response.status === true) {
    //              setLoading(false);
    //             const promotionalData1 = {};
    //             response.data.map(orderCouierOp => {
    //     const { packaggingId, packaggingName } = orderCouierOp;
    //     promotionalData1[ packaggingId ] = packaggingName
    // })
    const promotionalData1 = {};
    props.handleSelectWarehouse(rowData.shippingtowarehouseId,promotionalData1);
    props.getShipmentIdFromOrder(rowData.shippingId);         //setPromotionalPackage(response.data);
              //              }else{
              //               setLoading(false);
              //               console.log("message",response.message);
              //              }
              // }).catch((error) =>{
              //       console.error(error);
              // });


  }
  const handleGetShipmentId34=(rowData)=>{
    props.getShipmentIdFromShipment(rowData.shippingId);
   

  }

const theme = useTheme()

const [state, setState] = React.useState({
column1FilterList: {},
column2FilterList: {},
columns: [
{ title: 'Shipment ID', field: 'shippingId',type: 'text',
render: rowData => <Link href="#" onClick={() => handleGetShipmentId34(rowData)} variant="body2">
{rowData.shippingId} </Link>
},
{ title: 'Creation Date', field: 'createddate',type: 'text',
    render: rowData =><FormControlLabel

           onClick={()=>{handleGetShipmentId(rowData)}}
           className={classes.quantitycss}
           control={<Typography style={{marginLeft:'20px',cursor:'pointer',
         }}>

<Text style={{ fontSize: '11px'}}>{moment(rowData.createddate).format("MM/DD/YYYY")}</Text>

             </Typography>}
         />

  },

{ title: 'Ship From Name', field: 'shippingfromname', type: 'text',
render: rowData =><FormControlLabel

           onClick={()=>{handleGetShipmentId(rowData)}}
           className={classes.quantitycss}
           control={<Typography style={{marginLeft:'20px',cursor:'pointer',
         }}>

<Text style={{ fontSize: '11px'}}>{rowData.shippingfromname === null ? '' : rowData.shippingfromname}</Text>

             </Typography>}
         />

},
// { title: 'Address', field: 'addressline1', type: 'text',
// render: rowData =><FormControlLabel

//            onClick={()=>{handleGetShipmentId(rowData)}}
//            className={classes.quantitycss}
//            control={<Typography style={{marginLeft:'20px',cursor:'pointer',
//          }}>

// <Text style={{ fontSize: '11px'}}>{rowData.addressline1 === null ? '' : rowData.addressline1}</Text>

//              </Typography>}
//          />
// },
// {
// title: 'Pickup Time From',
// field: 'pickuptimefrom',
// render: rowData =><FormControlLabel

//            onClick={()=>{handleGetShipmentId(rowData)}}
//            className={classes.quantitycss}
//            control={<Typography style={{marginLeft:'20px',cursor:'pointer',
//          }}>

// <Text style={{ fontSize: '11px'}}>{rowData.pickuptimefrom === null ? '' : rowData.pickuptimefrom}</Text>

//              </Typography>}
//          />
// },
// { title: 'Phone', field: 'telephone',
// render: rowData =><FormControlLabel

//            onClick={()=>{handleGetShipmentId(rowData)}}
//            className={classes.quantitycss}
//            control={<Typography style={{marginLeft:'20px',cursor:'pointer',
//          }}>

// <Text style={{ fontSize: '11px'}}>{rowData.telephone === null ? '' : rowData.telephone}</Text>

//              </Typography>}
//          />

// },
{
  title: 'Warehouse',
  field: 'shippingtowarehouseId',
  lookup: { 1: 'Canada Warehouse', 2: 'US Warehouse' },

  render: (rowData) => (
    <FormControlLabel
      onClick={()=>{handleGetShipmentId(rowData)}}
      className={classes.quantitycss}
      control={
        <Typography
          style={{
            marginLeft: "20px",
            fontSize: "2px",
            cursor: "pointer",
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
          }}
        >
          {(() => {
            if (rowData.shippingtowarehouseId === 1) {
              return (
                <Text
                  style={{
                    fontSize: "11px",
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                    transition: "all 0.25s",
                  }}
                >
                  US Warehouse
                </Text>
              );
            }
             else {
              return (
                <Text
                  style={{
                    fontSize: "11px",
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                    transition: "all 0.25s",
                  }}
                >
                  Canada Warehouse
                </Text>
              );
            }
          })()}
        </Typography>
      }
    />
  ),
  },
{
  title: 'Shipping Carrier',
  field: 'shippingcarrier',
  lookup: packingdata,
  },
{
  title: 'Tracking',
  field: 'trackingnumber',
  render: rowData =><FormControlLabel

           onClick={()=>{handleGetShipmentId(rowData)}}
           className={classes.quantitycss}
           control={<Typography style={{marginLeft:'20px',cursor:'pointer',
         }}>

<Text style={{ fontSize: '11px'}}>{rowData.trackingnumber === null ? '' : rowData.trackingnumber}</Text>

             </Typography>}
         />

  },

  {
    title: 'Seller Name',
    field: 'displayName',
    render: rowData =><FormControlLabel

           onClick={()=>{handleGetShipmentId(rowData)}}
           className={classes.quantitycss}
           control={<Typography style={{marginLeft:'20px',cursor:'pointer',
         }}>

<Text style={{ fontSize: '11px'}}>{rowData.displayName === null ? '' : rowData.displayName}</Text>

             </Typography>}
         />

    },
    {
      title: 'Seller Email',
      field: 'userEmail',
      render: rowData =><FormControlLabel

           onClick={()=>{handleGetShipmentId(rowData)}}
           className={classes.quantitycss}
           control={<Typography style={{marginLeft:'20px',cursor:'pointer',
         }}>

<Text style={{ fontSize: '11px'}}>{rowData.userEmail === null ? '' : rowData.userEmail}</Text>

             </Typography>}
         />

      },

     
{ title: 'Status', field: 'shippingstatus',type: 'text',
render: rowData => <Text>
{(() => {
  if(rowData.shippingstatus==='Cancel')
  {
    return(
     <ColorButtonCancel
      onClick={()=>{
          handleClickOpendelete(rowData.shippingId,rowData.shippingstatus)
          }}
     > {rowData.shippingstatus} </ColorButtonCancel>
    )
  }
  else if(rowData.shippingstatus==='Processed')
  {
    return(
<ColorButtonProcessed
 onClick={()=>{
          handleClickOpendelete(rowData.shippingId,rowData.shippingstatus)
          }}
> {rowData.shippingstatus} </ColorButtonProcessed>
    )
  }
  else if(rowData.shippingstatus==='OnHold')
  {
    return(
     <ColorButtonOnHold

     onClick={()=>{
          handleClickOpendelete(rowData.shippingId,rowData.shippingstatus)
          }}
     > {rowData.shippingstatus} </ColorButtonOnHold>
    )
  }
  else if(rowData.shippingstatus==='Shipped')
  {
    return(
     <ColorButtonShipped

     onClick={()=>{
          handleClickOpendelete(rowData.shippingId,rowData.shippingstatus)
          }}
     > {rowData.shippingstatus} </ColorButtonShipped>
    )
  }
  else{
   return(
     <ColorButtonNew

     onClick={()=>{
          handleClickOpendelete(rowData.shippingId,rowData.shippingstatus)
          }}
     > {rowData.shippingstatus} </ColorButtonNew>
                    )
  }

})()}</Text>,},


{ title: 'Edit', field: 'shippingstatus9',type: 'text',
render: rowData => 

<ColorButtonProcessed
 onClick={() => handleGetShipmentId(rowData)}
> Edit</ColorButtonProcessed>
   },
],

});

React.useEffect(() => {
  fetchCourierTypeList(userid);
  fetchOrderList(userid);
  //fetchPackageForPromotional();
 // handleSetCheckboxValue();
} ,[]);
//  const fetchPackageForPromotional = () => {
//     //setLoading(true);
//     shiphypeService.fetchCustomePaching(userid)
//           .then(response => {
//            console.log("status",response.status);
//                 if(response.status === true) {
//                 //  setLoading(false);
//                   setPromotionalPackage(response.data);
//                            }else{
//                             setLoading(false);
//                             console.log("message",response.message);
//                            }
//               }).catch((error) =>{
//                     console.error(error);
//               });
//   };
  const promotionalData = {};
//   promotionalPackage.map(orderCouierOp => {
//       const { packaggingId, packaggingName } = orderCouierOp;
//       promotionalData[ packaggingId ] = packaggingName
//   })

  const handleRelease =(isSprintCreate)=>{
    if(isSprintCreate === 1){

      setOpenDelete(false);
      setOpenConfirmationRelease(true);

    }
    else if(isSprintCreate === 2){

      setOpenDelete(false);
      setOpenUnReverseInventory(true);

    }
    else if(isSprintCreate === 3){

      setOpenDelete(false);
      setOpenCancelOrder(true);

    }
    else if(isSprintCreate === 4){

      setOpenDelete(false);
      setOpenMoveOnHoldOrder(true);

    }
    else {

      setOpenConfirmationRelease(true);
      setOpenDelete(false);

    }
  }

  const handleClickOpendelete = (rowid,status) => {
    setOpenDelete(true);
    setCardid(rowid);
    setRowStatus(status);
    console.log("rowid",rowid);
    };

const fetchCourierTypeList =(userid)=>{
  setLoading(true);
  shiphypeService.fetchCourierTypeList(userid)
        .then(response => {
         console.log("status",response.status);
              if(response.status === true) {
                setLoading(false);
                //setOrderCourierType(response.data);

                const orderCouierOptions = {};
                response.data.map(orderCouierOp => {
    const { carrierId, carriertitle } = orderCouierOp;
    orderCouierOptions[ carrierId ] = carriertitle
})

setState({
  columns: [
    { title: 'Shipment ID', field: 'shippingId',type: 'text',
    render: rowData => <Link href="#" onClick={() => handleGetShipmentId34(rowData)} variant="body2">
    {rowData.shippingId} </Link>
    },
    { title: 'Creation Date', field: 'createddate',type: 'text',
    render: rowData =><FormControlLabel

           onClick={()=>{handleGetShipmentId(rowData)}}
           className={classes.quantitycss}
           control={<Typography style={{marginLeft:'20px',cursor:'pointer',
         }}>

<Text style={{ fontSize: '11px'}}>{moment(rowData.createddate).format("MM/DD/YYYY")}</Text>

             </Typography>}
         />

  },
    { title: 'Ship From Name', field: 'shippingfromname', type: 'text',
render: rowData =><FormControlLabel

           onClick={()=>{handleGetShipmentId(rowData)}}
           className={classes.quantitycss}
           control={<Typography style={{marginLeft:'20px',cursor:'pointer',
         }}>

<Text style={{ fontSize: '11px'}}>{rowData.shippingfromname === null ? '         ' : rowData.shippingfromname}</Text>

             </Typography>}
         />

},
// { title: 'Address', field: 'addressline1', type: 'text',
// render: rowData =><FormControlLabel

//            onClick={()=>{handleGetShipmentId(rowData)}}
//            className={classes.quantitycss}
//            control={<Typography style={{marginLeft:'20px',cursor:'pointer',
//          }}>

// <Text style={{ fontSize: '11px'}}>{rowData.addressline1 === null ? '         ' : rowData.addressline1}</Text>

//              </Typography>}
//          />
// },
// {
// title: 'Pickup Time From',
// field: 'pickuptimefrom',
// render: rowData =><FormControlLabel

//            onClick={()=>{handleGetShipmentId(rowData)}}
//            className={classes.quantitycss}
//            control={<Typography style={{marginLeft:'20px',cursor:'pointer',
//          }}>

// <Text style={{ fontSize: '11px'}}>{rowData.pickuptimefrom === null ? '      ' : rowData.pickuptimefrom}</Text>

//              </Typography>}
//          />
// },
// { title: 'Phone', field: 'telephone',
// render: rowData =><FormControlLabel

//            onClick={()=>{handleGetShipmentId(rowData)}}
//            className={classes.quantitycss}
//            control={<Typography style={{marginLeft:'20px',cursor:'pointer',
//          }}>

// <Text style={{ fontSize: '11px'}}>{rowData.telephone === null ? '        ' : rowData.telephone }</Text>

//              </Typography>}
//          />

// },
    {
    title: 'Warehouse',
    field: 'shippingtowarehouseId',
    lookup: { 1: 'Canada Warehouse', 2: 'US Warehouse' },

    render: (rowData) => (
      <FormControlLabel
        onClick={()=>{handleGetShipmentId(rowData)}}
        className={classes.quantitycss}
        control={
          <Typography
            style={{
              marginLeft: "20px",
              fontSize: "2px",
              cursor: "pointer",
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            }}
          >
            {(() => {
              if (rowData.shippingtowarehouseId === 1) {
                return (
                  <Text
                    style={{
                      fontSize: "11px",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                      transition: "all 0.25s",
                    }}
                  >
                    US Warehouse
                  </Text>
                );
              }
               else {
                return (
                  <Text
                    style={{
                      fontSize: "11px",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                      transition: "all 0.25s",
                    }}
                  >
                    Canada Warehouse
                  </Text>
                );
              }
            })()}
          </Typography>
        }
      />
    ),
    },
    {
      title: 'Shipping Carrier',
      field: 'shippingcarrier',
      lookup: orderCouierOptions,
      },
      {
        title: 'Tracking',
        field: 'trackingnumber',
        render: rowData =><FormControlLabel

                 onClick={()=>{handleGetShipmentId(rowData)}}
                 className={classes.quantitycss}
                 control={<Typography style={{marginLeft:'20px',cursor:'pointer',
               }}>

      <Text style={{ fontSize: '11px'}}>{rowData.trackingnumber === null ? '         ' : rowData.trackingnumber}</Text>

                   </Typography>}
               />

        },

        {
          title: 'Seller Name',
          field: 'displayName',
          render: rowData =><FormControlLabel

                 onClick={()=>{handleGetShipmentId(rowData)}}
                 className={classes.quantitycss}
                 control={<Typography style={{marginLeft:'20px',cursor:'pointer',
               }}>

      <Text style={{ fontSize: '11px'}}>{rowData.displayName === null ? '        ' : rowData.displayName}</Text>

                   </Typography>}
               />

          },
          {
            title: 'Seller Email',
            field: 'userEmail',
            render: rowData =><FormControlLabel

                 onClick={()=>{handleGetShipmentId(rowData)}}
                 className={classes.quantitycss}
                 control={<Typography style={{marginLeft:'20px',cursor:'pointer',
               }}>

      <Text style={{ fontSize: '11px'}}>{rowData.userEmail === null ? '         ' : rowData.userEmail}</Text>

                   </Typography>}
               />

            },

      // { title: 'Creation Date', field: 'createddate',type: 'date',
     
      // },
    { title: 'Status', field: 'shippingstatus',type: 'text',
    render: rowData => <Text>
    {(() => {
      if(rowData.shippingstatus==='Cancel')
      {
        return(
         <ColorButtonCancel

         onClick={()=>{
          handleClickOpendelete(rowData.shippingId,rowData.shippingstatus)
          }}
         > {rowData.shippingstatus} </ColorButtonCancel>
        )
      }
      else if(rowData.shippingstatus==='Processed')
      {
        return(
    <ColorButtonProcessed
     onClick={()=>{
          handleClickOpendelete(rowData.shippingId,rowData.shippingstatus)
          }}
    > {rowData.shippingstatus} </ColorButtonProcessed>
        )
      }
      else if(rowData.shippingstatus==='OnHold')
      {
        return(
         <ColorButtonOnHold
          onClick={()=>{
          handleClickOpendelete(rowData.shippingId,rowData.shippingstatus)
          }}
         > {rowData.shippingstatus} </ColorButtonOnHold>
        )
      }
      else if(rowData.shippingstatus==='Shipped')
      {
        return(
         <ColorButtonShipped
          onClick={()=>{
          handleClickOpendelete(rowData.shippingId,rowData.shippingstatus)
          }}
         > {rowData.shippingstatus} </ColorButtonShipped>
        )
      }
      else{
       return(
         <ColorButtonNew
          onClick={()=>{
          handleClickOpendelete(rowData.shippingId,rowData.shippingstatus)
          }}
         > {rowData.shippingstatus} </ColorButtonNew>
                        )
      }

    })()}</Text>,},
    { title: 'Edit', field: 'shippingstatus9',type: 'text',
render: rowData => 

<ColorButtonProcessed
 onClick={() => handleGetShipmentId(rowData)}
> Edit</ColorButtonProcessed>
   },
    ],
})

                         }else{
                          setLoading(false);
                          console.log("message",response.message);
                         }
            }).catch((error) =>{
                  console.error(error);
            });
          }

const StyledMTableToolbar = withStyles({
  root: {
    paddingLeft: 0,
    paddingRight: 0,
  },
})(MTableToolbar);

const fetchOrderList = (userid)=>{

  //const userid=5;
  setLoading(true);
  shiphypeService.fetchAllShipmentInfo(userid)
    .then(response => {
     console.log("status",response.status);
          if(response.status === true) {
            setLoading(false);
               setDataProduct(response.data);
               
                     }else{
                      setLoading(false);
                      console.log("message",response.message);
                     }
        }).catch((error) =>{
              console.error(error);
        });
}


  const [state1, setState1] = React.useState({
    MarketPlaceIntegration: false,
    ShippingProfile: false,
  //  ProductImport:false,
    ProductSync:false,
    ImportCustomers:false,
  });

  const handleChangeRadio = (id) => {

    AsyncStorage.removeItem("ProductSelect");
    AsyncStorage.removeItem("CustomPackges");
    AsyncStorage.removeItem("SelectPromotional");

    setValue(id);

    setSelectwarehouse(id);
    setRadioselect(false);

    props.handleSelectWarehouse(id,promotionalData);
    props.handleNextPage(6);

   console.log("radiobutton",id);
  };




    React.useEffect(() => {
console.log('shipemntId : ', shipmentId);
       // fetchWarehouse();
        if(shipmentId !== 0){
          fetchArrangeShip();
        }


     } ,[]);

     const fetchArrangeShip = ()=>{

      //  const userid=5;
        setLoading(true);
        shiphypeService.fetchArrangeShip(shipmentId)
        .then(response => {
         console.log("status",response.status);
              if(response.status === true) {
                setLoading(false);
                setSelectwarehouse(response.data[0].shipping[0].shippingtowarehouseId);
                setValue(response.data[0].shipping[0].shippingtowarehouseId);

                 setRadioselect(false);
                  // setEditArrangeShip(1);
                 //  bindData(response.data);

                         }else{
                          setLoading(false);
                          console.log("message",response.message);
                         }
            }).catch((error) =>{
                  console.error(error);
            });
      }


     const fetchWarehouse = ()=>{
       setLoading(true);
    //  const userid=16;
     shiphypeService.fetchWarehouse(userid)
       .then(response => {
        console.log("status",response.status);
             if(response.status === true) {
                          setLoading(false);
                          setData(response.data);
                        }
                        else{
                         setLoading(false);
                          console.log("message",response.message);
                        }
           }).catch((error) =>{
                 console.error(error);
                 setLoading(false);
           });

     }
     const handleDeleteCancle = () => {
      setOpenDelete(false);
      setOpenCancelOrder(false);
     };

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


const handleChangeButtonGood = (id) => {
  // setProjectid(row);

  if(dangerousGoodId === 0){
    setDangerousGoodId(id);

  }else{
    setDangerousGoodId(0);

  }


    console.log('button value', id)
    };
    const handleConfirmCancel = () => {
      const isDelete='Cancel';
      shiphypeService.updateStatus(cardid,isDelete)
      .then(response => {
       console.log("status",response.status);
            if(response.status === true) {
              // setOpen(true);
              // setType('success');
              // setMsg(response.message);
              // setStatus(response.status);
              setLoading(false);
              setOpenCancelOrder(false);
              fetchOrderList(userid);

                       }else{
                        // setOpen(true);
                        // setType('success');
                        // setMsg(response.message);
                        // setStatus(response.status);
                        setLoading(false);
                        console.log("message",response.message);
                       }
          }).catch((error) =>{
                console.error(error);
          });
    }

    function BindWarehouse() {
        //setDataLength(data.length);

          return (
            <List style={{paddingBottom:'1px',paddingTop:'1px'}}>

      {data.map((data,index) => (
      <FormGroup>
      <View className={classes.footCss9}>


      <FormControl component="fieldset">

     <RadioGroup aria-label="carries" name="carries" value={value} onChange={handleChangeRadio}>

    <FormControlLabel

    value={data.id}
    className={classes.radioButtonCss}
    control={<Radio
     id={data.id}
     color="primary"

      checked={radioselect}

/>}
    label={data.name} />
    </RadioGroup>
      </FormControl>
        </View>
         {/* <Divider/> */}
     </FormGroup>
        ))}

      </List>

          );

        }
    return(
        <View className={classes.content}>
           <View className={classes.appBarSpacer} />

          <View >
            <Grid item  container lg={12}  >
            <Grid item  lg={5}  style={popUpStyle.breadCrumSidePadding}>
            <Link  onClick={()=>{props.handleDashboard('01')}}>
            <Text style={popUpStyle.breadCrundCss1}>DASHBOARD /</Text>
            </Link>
          <Text style={popUpStyle.breadCrundCss2}> SEND INVENTORY {'\n'} </Text>

              </Grid>
              <Grid item  lg={1} ></Grid>

              </Grid>
              </View>
              <Grid>
              {(openDelete === false ? " " :
           <DeleteCard
           rowStatus={rowStatus}
           openDeleteCard={openDelete}
           handleRelease={handleRelease}
           handleDeleteCancle={handleDeleteCancle}
         />)}

{(openCancelOrder === false ? " " :
          <CancelOrder
          shipmentId={cardid}
          userid={userid}
          status='Cancel'
          openCancelOrder={openCancelOrder}
          handleConfirmCancel={handleConfirmCancel}
          handleDeleteCancle={handleDeleteCancle}
          /> )}
         </Grid>
              <View style={popUpStyle.paddingSide}>
              <Grid justify="center">
            <ProgressBar loading={loading} />
          </Grid>
              <Grid justify="center"
      container>
        <Text style={{ fontSize: '15px',
            fontWeight: '700',
            // marginLeft:'10px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',

            transition : 'all 0.25s',}}>

    Select the Warehouse you would like to Send Inventory to:{'\n'}{'\n'}</Text>

              </Grid>

              </View>
              <View style={popUpStyle.paddingSide}>
              <Grid container alignItems="center"  justify="space-between" style={{marginTop:'0px'}}>


<Grid  items xs={12} lg={12}>
<Grid justify="center"
      container>

       <Button
    className={clsx((value !== 1 ) && classes.urgent, (value === 1) && classes.urgentSelected)}

    onClick={()=>{handleChangeRadio(1)}}
    >


          Canada Warehouse
    </Button>




          </Grid>

</Grid>
<Grid  items xs={12} lg={12}>
<Grid justify="center"
      container>

       <Button
    className={clsx((value !== 2 ) && classes.urgent, (value === 2) && classes.urgentSelected)}

    onClick={()=>{handleChangeRadio(2)}}
    >

          US Warehouse

    </Button>

          </Grid>

</Grid>

</Grid>


                <MaterialTable
        style={{padding:'0px'}}
        title={<Text style={{ fontSize: '13px',
            fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',

            transition : 'all 0.25s',}}>Shipment History</Text> }
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
            searchPlaceholder: "Search Shipments"
        },
        header: {
          actions: "ACTION",
        },
    }}
    actions={[
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
                  onClick: (event) =>  fetchOrderList(userid),
                },        
    //   {
    //     icon: () => <RefreshIcon style={{ backgroundColor:'#33cc00',color:'#fff',borderRadius : '3px',margin:'3px',}}/>,
    //   tooltip: 'Refresh',
    //   isFreeAction: true,
    //   onClick: (event) =>   fetchOrderList(userid)
    // }
    ]}


        options={{
        paging: false,
        showTitle: true,
        maxBodyHeight: '40vh',
        doubleHorizontalScroll: true,
        headerStyle: { position: 'sticky', top: 0 },
        //pageSize:5,
        //pageSizeOptions:[6, 12, 18, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        addRowPosition: 'first',
        actionsColumnIndex: -1,
        exportFileName: "Product Table",
        headerStyle: {
            backgroundColor: '#cccccc',
            color: '#000',
            textTransform: 'uppercase',

            width: 40,
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
            fontSize:'11px',
            paddingLeft: 5,
            paddingTop:7,
            paddingBottom:7,
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
          selection: false,
          showSelectAllCheckbox:false,
          showTextRowsSelected:false,
          search: true,
          exportButton: false,



      }}


      />
</View>


        </View>


        );
  }
