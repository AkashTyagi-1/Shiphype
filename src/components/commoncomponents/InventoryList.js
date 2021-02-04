import React from 'react';
import clsx from 'clsx';
import {Platform,View,Image,Text,Dimensions,ProgressBar} from 'react-native';
import { makeStyles,withStyles , useTheme} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import * as shiphypeservice from './ShipService/shiphype_service';
import MaterialTable , { MTableToolbar }from 'material-table';
import PropTypes from "prop-types";

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
import popUpStyle from './style/popUpStyle';
import { forwardRef } from 'react';
const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
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
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  CloudUpload:forwardRef((props, ref) => <CloudUploadIcon {...props} ref={ref} />)
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
      height: '50vh',
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
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
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
     // border : ' 1px solid #fff',
      borderRadius:'8%',
      height:250,
      color: '#fff',
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(3),
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
      // boxShadow: '7px 2px 2px #cccccc',
      // shadowColor: '#000',
      //    shadowOffset: { width: 0, height: 1 },
      //    shadowOpacity: 0.8,
      //    shadowRadius: 2,  
      //    elevation: 5,
       height: 500,
       width: 270,
      borderRadius:'2px',
      marginLeft:'6px',
      
       marginTop: '1%'
     },
     Dashboardpaper3:{
      border: '1px solid #ced4da',
      // boxShadow: '7px 2px 2px #cccccc',
      // shadowColor: '#000',
      //    shadowOffset: { width: 0, height: 1 },
      //    shadowOpacity: 0.8,
      //    shadowRadius: 2,  
      //    elevation: 5,
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
      paddingLeft:'0px',
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
        color:'#000',fontSize:'8px',    height: '25px'
      },
      quantitycss:{
       width:'20px',
       underline: {
        "&&&:before": {
          borderBottom: "none"
        },
        "&&:after": {
          borderBottom: "none"
        }
      } 
      },
      buttoncss:{
        width:'5px' 
       }
  }));

  export default function InventoryList(props) {
    const classes = useStyles();
    const userid=props.user_id;
    const shipmentId=props.shipmentId;
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
  const[dataproduct,setDataProduct]=React.useState([]);
  const [moduleid, setModuleid] = React.useState([]);
  const [changedWarehouseid, setchangedWarehouseid] = React.useState([]);
  const [changedOptionid, setchangedOptionid] = React.useState([]);
  const [optionid, setOptionId] = React.useState([]);
  const [editRoleData,setEditRoleData]=React.useState(null);
  const [warehouseStatus,setWarehouseStatus]=React.useState(false);
  const [quantitychange,setQuantitychange]=React.useState(1);

  //const [selectproduct,setSelectproduct]=React.useState(false);
  const module=[];
  const optionArray=[];



  const [loading,setLoading]=React.useState(true);


  const handleChangeRadio = (event) => {
    setValue(event.target.value);
   
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


            const [selectproduct,setSelectproduct]=React.useState(true);

           
            const handleGetShipmentId=(shipmentId)=>{
                props.getShipmentIdFromOrder(shipmentId);
              } 
                  
    const theme = useTheme()

    const [state, setState] = React.useState({
        column1FilterList: {},
        column2FilterList: {},
        columns: [  
          { title: 'Shipment ID', field: 'shippingId',type: 'text',
          render: rowData => <Link href="#" onClick={() => handleGetShipmentId(rowData.shippingId)}variant="body2">
           {rowData.shippingId} </Link>
        },
    
       
          { title: 'Shippingfromname', field: 'shippingfromname', type: 'text'},
          { title: 'Address', field: 'addressline1', type: 'text'},
          {
            title: 'Zipcode',
            field: 'zipcode',
          },
     
          { title: 'City', field: 'city',type: 'text'},
          { title: 'State', field: 'state',type: 'text'},
          { title: 'Country', field: 'country',type: 'text'},
          {
            title: 'Pickuptimefrom',
            field: 'pickuptimefrom',
          },
          { title: 'Phone', field: 'telephone', 
         
        },
          {
            title: 'WarehouseId',
            field: 'shippingtowarehouseId', 
          },
        
          { title: 'Ship Date', field: 'shipingdate',type: 'date'},
        ],
        
      });
    

const onNextfunction=()=>{
    console.log("product",changedWarehouseid.length);
    for(let i=0;i<changedWarehouseid.length ;i++){
        console.log("productid",changedWarehouseid[i]);
        
    } 
    props.updateSelectProductArray(changedWarehouseid);
    props.handleNextPage(7);
}

   const handleChangeCheckbox = (data) => {
    var ids=[];
    console.log("productlength",data.length);
    for(let i=0;i<data.length ;i++){
        console.log("productid",data[i].customproductId);
        ids.push(data[i].customproductId);
    }
    const updatedaray=[...ids];
    setchangedWarehouseid(updatedaray);
    
  };
  const productArray=[31,33];

   React.useEffect(() => {
    fetchOrderList(userid);   
   // handleSetCheckboxValue();
 } ,[]);


 const handleSetCheckboxValue = () => {
  var ids=[];
  console.log("productlength Set ",productArray.length);
  for(let i=0;i<productArray.length ;i++){
      console.log("productid set ",productArray[i]);
      ids.push(productArray[i]);
  }
  const updatedaray=[...ids];
  setchangedWarehouseid(updatedaray);
  
};
const StyledMTableToolbar = withStyles({
    root: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  })(MTableToolbar);

  const fetchOrderList = (userid)=>{

    //const userid=5;
    setLoading(true);
    shiphypeservice.fetchAllShip(userid)
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


const handleCallbackfunction =()=>{
  props.backButtonRouting('09');
}

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
            <Grid item  lg={5}  style={popUpStyle.breadCrumSidePadding}
            //style={{marginLeft:'10px'}}
            >
         <Link  onClick={()=>{props.handleDashboard('01')}}>
            <Text style={popUpStyle.breadCrundCss1}>DASHBOARD /</Text>
            </Link>
          <Text style={popUpStyle.breadCrundCss2}> INVENTORY {'\n'} </Text> 
          
              </Grid>
             
             
              </Grid>
               
              </View>  
             
              <View className={classes.paper9} >
             
            
            <View>

           
              <Grid container justify="space-between" spacing={2}>
           
              <Grid item xs={12} md={4} lg={4} ></Grid>
              <Grid item xs={12} md={4} lg={4} 
              //style={{marginRight:'70px'}} 
               >
  
              <Grid container item  justify="flex-end">

             
              </Grid>
            
              </Grid>
              </Grid>
              </View>
              
              <View style={popUpStyle.paddingSide}>

              <MaterialTable
        style={{padding:'0px'}}
        title={<Text style={{ fontSize: '13px',
           // fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}}>User Inventory List</Text> }
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
          header: {
            actions: "ACTION",
          },
        }}
        options={{
        paging: false,
        showTitle: true,
        doubleHorizontalScroll: true,
        pageSize:5,
        pageSizeOptions:[6, 12, 18, 20, 30, 40, 50, 60, 70, 80, 90, 100],
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
            paddingTop:0,
            paddingBottom:0,
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
        

        selectionProps: rowData => ({
      })
      }}
      
        
        onSelectionChange={(rows) => {
            handleChangeCheckbox(rows);
        }}
      />
 </View>
                </View>
               
        </View>

    
        );
  }

  InventoryList.propTypes = {
    getShipmentIdFromOrder:PropTypes.func,
    handleNextPage: PropTypes.func,
    backButtonRouting:PropTypes.func
  };