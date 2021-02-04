import React ,{ useState, useEffect } from 'react';
import { fade,withStyles,makeStyles, useTheme} from '@material-ui/core/styles';
import {Platform,View,ScrollView,Image,Text,Dimensions} from 'react-native';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import AddIcon from '@material-ui/icons/Add';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import * as shiphypeservice from './ShipService/shiphype_service';
import MaterialTable , { MTableToolbar }from 'material-table';

import FormControlLabel from '@material-ui/core/FormControlLabel';

import Typography from "@material-ui/core/Typography";
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
import popUpStyle from './style/popUpStyle';
import Link from '@material-ui/core/Link';

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
  height: '60vh',
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

quantitycss:{
  color:'#000',
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
        borderRadius : '3px',
        //  paddingTop: '9%',
        //  paddingBottom: '9%',
        //marginTop:'3%',
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
   const userid=props.user_id;
   const shipmentId=props.shipmentIdProduct;
   const[dataproduct,setDataProduct]=React.useState([]);
   const[dataPromotional,setDataPromotional]=React.useState([]);
   const[dataCustom,setDatacustom]=React.useState([]);
   const[dataShippingData,setDataShippingData]=React.useState([]);
   const [loading,setLoading]=React.useState(true);
   const [open, setOpen]=React.useState(false);
   const [status,setStatus]=React.useState(false);
   const [msg,setMsg]=React.useState('');
   const [type,setType]=React.useState('');
   const [productDataUpdate, setProductDataUpdate] = useState([{ shippingID: shipmentId ,productID :0,shippedquantity:0,
    binassigned:'',receivequantity:'',is_deleted:false}]);
    const [customDataUpdate, setcusotmDataUpdate] = useState([{ shippingID: shipmentId ,userid :userid,packagingids:[],
      packagingquantity:[]}]);
      const [promotionalDataUpdate, setPromotionalDataUpdate] = useState([{ shippingID: shipmentId ,userid :userid,promotionalinsertids:[],
        promotionalinsertsquantity:[]}]);

   const theme = useTheme()
   const [state, setState] = React.useState({
    column1FilterList: {},
    columns: [
      { title: 'Item Title', field: 'productname',type: 'text',editable: 'never'
      
    },
      { title: 'Item SKU',
        field: 'productsku',type: 'text',editable: 'never'
    
    },
    {
        title: 'Quantity',
        field: 'shippedquantity',
        type: 'text',editable: 'never'
      },
    
     
     
     
     
    ],
    
  });


  const [state1, setState1] = React.useState({
    column1FilterList: {},
    columns: [
      { title: 'Promotional', field: 'name',type: 'text',editable: 'never'
      
    },
      { title: 'Item SKU',
        field: 'shiphypesku',type: 'text',editable: 'never'
    
    },
    {
        title: 'Quantity',
        field: 'promotionalinsertquantity',
        type: 'text',editable: 'never'
      },
      
      
    
    
     
     
    ],
    
  });

  const [state2, setState2] = React.useState({
    column1FilterList: {},
    columns: [
      { title: 'Custom Packaging', field: 'name',type: 'text',editable: 'never'
      
    },
      { title: 'Item SKU',
        field: 'shiphypesku',type: 'text',editable: 'never'
    
    },
    {
        title: 'Quantity',
        field: 'packagingquantity',
        type: 'text',editable: 'never'
      },
    
     
   
     
     
    ],
    
  });
 
  const [state3, setState3] = React.useState({
    column1FilterList: {},
    columns: [
      { title: 'Shipment ID', field: 'shippingId',type: 'text',
   
    },
    { title: 'Ship From Name', field: 'shippingfromname', type: 'text',

},
{ title: 'Address', field: 'addressline1', type: 'text',
},
{
title: 'Pickup Time From',
field: 'pickuptimefrom',
},
{ title: 'Phone', field: 'telephone',

},
    {
    title: 'Warehouse',
    field: 'shippingtowarehouseId',
    lookup: { 1: 'Canada Warehouse', 2: 'US Warehouse' },
    },
    {
      title: 'Shipper',
      field: 'shipper',
      lookup: { 1: 'My Location', 2: 'My Distributor' },
      },
      {
        title: 'Shipment Type',
        field: 'shipmenttype',
        lookup: { 1: 'Standard Packages', 2: 'Pallets (LTL)' },
        },
        {
          title: 'Shipment Packing',
          field: 'shipmentPackaging',
          lookup: { 1: '1 SKU per box', 2: 'Multiple SKUs per box' },
          },
          {
            title: 'Label Type',
            field: 'labeltype',
            lookup: { 2: 'Batched SKUs', 1: 'Individually Barcoded' },
            },
    {
      title: 'Shipping Carrier',
      field: 'shippingcarrier',
      },

      {
        title: 'Tracking',
        field: 'trackingnumber',
       

        },

       

      { title: 'Ship Date', field: 'shipingdate',type: 'date',
      
      },
   
     
     
    ],
    
  });


  
  React.useEffect(() => {
    // fetchShipemntDetails();
    fetchCourierTypeList(userid);
    fetchShipemntDetails();
    fetchProductList();   
   
 } ,[]);

 const fetchCourierTypeList =(userid)=>{
  setLoading(true);
  shiphypeservice.fetchCourierTypeList(userid)
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

setState3({
  columns: [
    { title: 'Shipment ID', field: 'shippingId',type: 'text',
   
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
{ title: 'Address', field: 'addressline1', type: 'text',
render: rowData =><FormControlLabel

           onClick={()=>{handleGetShipmentId(rowData)}}
           className={classes.quantitycss}
           control={<Typography style={{marginLeft:'20px',cursor:'pointer',
         }}>

<Text style={{ fontSize: '11px'}}>{rowData.addressline1 === null ? '         ' : rowData.addressline1}</Text>

             </Typography>}
         />
},
{
title: 'Pickup Time From',
field: 'pickuptimefrom',
render: rowData =><FormControlLabel

           onClick={()=>{handleGetShipmentId(rowData)}}
           className={classes.quantitycss}
           control={<Typography style={{marginLeft:'20px',cursor:'pointer',
         }}>

<Text style={{ fontSize: '11px'}}>{rowData.pickuptimefrom === null ? '      ' : rowData.pickuptimefrom}</Text>

             </Typography>}
         />
},
{ title: 'Phone', field: 'telephone',
render: rowData =><FormControlLabel

           onClick={()=>{handleGetShipmentId(rowData)}}
           className={classes.quantitycss}
           control={<Typography style={{marginLeft:'20px',cursor:'pointer',
         }}>

<Text style={{ fontSize: '11px'}}>{rowData.telephone === null ? '        ' : rowData.telephone }</Text>

             </Typography>}
         />

},
    {
    title: 'Warehouse',
    field: 'shippingtowarehouseId',
    lookup: { 1: 'Canada Warehouse', 2: 'US Warehouse' },
    },
    {
      title: 'Shipper',
      field: 'shipper',
      lookup: { 1: 'My Location', 2: 'My Distributor' },
      },
      {
        title: 'Shipment Type',
        field: 'shipmenttype',
        lookup: { 1: 'Standard Packages', 2: 'Pallets (LTL)' },
        },
        {
          title: 'Shipment Packing',
          field: 'shipmentPackaging',
          lookup: { 1: '1 SKU per box', 2: 'Multiple SKUs per box' },
          },
          {
            title: 'Label Type',
            field: 'labeltype',
            lookup: { 2: 'Batched SKUs', 1: 'Individually Barcoded' },
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

       

      { title: 'Ship Date', field: 'shipingdate',type: 'date',
      
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

 const fetchShipemntDetails = ()=>{

    //const userid=5;
    setLoading(true);
    shiphypeservice.fetchArrangeShip(shipmentId)
    .then(response => {
     console.log("status",response.status);
          if(response.status === true) {

            setLoading(false);
               setDataShippingData(response.data[0].shipping);
              
                     }else{
                      setLoading(false);
                      console.log("message",response.message);
                     }   
        }).catch((error) =>{
              console.error(error);
        });
  }

  const fetchProductList = ()=>{

    //const userid=5;
    setLoading(true);
    shiphypeservice.fetchShipmentProductList(shipmentId)
    .then(response => {
     console.log("status",response.status);
          if(response.status === true) {

            setLoading(false);
               setDataProduct(response.data[0].shippingproduct);
               setDataPromotional(response.data[0].shippingpromotionalinsert);
               setDatacustom(response.data[0].shippingpackaging);
             
                     }else{
                      setLoading(false);
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


    return (  
        <View className={classes.content}>
         {/* <ScrollView> */}
        <View className={classes.appBarSpacer} />

                  <View >
            <Grid item  container lg={12}  >
            <Grid item  lg={9}   style={popUpStyle.breadCrumSidePadding}>
            <Link  onClick={()=>{props.handleDashboard('01')}}>
            <Text style={popUpStyle.breadCrundCss1}>DASHBOARD /</Text>
            </Link>
          <Text style={popUpStyle.breadCrundCss2}> Send INVENTORY / SHIPMENT Details {'\n'} </Text> 
            
              </Grid>
              <Grid item xs={12} md={2} lg={2} >
              <Grid container item  justify="flex-end" >
            <Grid style={{marginTop:'3%'}}>
            <ColorButton
    size='large'
    variant="contained"
    color="primary"
    //className={classes.profileMargin}
    onClick={()=>{props.handleNextPage('09')}}
    >
    Back
  </ColorButton>
              </Grid>
              </Grid>
              </Grid>
              </Grid>
              </View> 
              <View className={classes.paper9}> 
        <Grid justify="center">
                <ProgressBar 
                 loading={loading}
                />
                </Grid>
            

                <View style={popUpStyle.paddingSide}>
                <MaterialTable
        title={<Text style={{ fontSize: '13px',
           // fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}}>Send Inventory Shipping Details - {shipmentId}</Text> }
        columns={state3.columns}
        data={dataShippingData}
        icons={tableIcons}
        localization={{ body: { editRow: { deleteText: 'Are You Sure You want to delete this Custom Packaging from this shipment ?' } } }}
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
            paging:false,
            doubleHorizontalScroll: true,
            maxBodyHeight: 410,
            headerStyle: { position: 'sticky', top: 0 },
           // pageSize:6,
            //pageSizeOptions:[6,7, 9, 10, 11, 12, 15, 20, 30, 40, 50, 60, 70],
            showTitle: true,
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
          search: true,
          exportButton: false,
      }}
    
        
      />
       <Grid
            container
            justify="space-between"
            spacing={2}
            style={{ marginTop: "10px" }}
          >
            <Grid item xs={12} md={8} lg={8}>
          <MaterialTable
        title={<Text style={{ fontSize: '13px',
           // fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}}>Send Inventory Products - {shipmentId}</Text> }
        columns={state.columns}
        data={dataproduct}
        icons={tableIcons}
        localization={{ body: { editRow: { deleteText: 'Are You Sure You want to delete this product from this shipment ?' } } }}
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
            paging:false,
            doubleHorizontalScroll: true,
            maxBodyHeight: 410,
            headerStyle: { position: 'sticky', top: 0 },
           // pageSize:6,
            //pageSizeOptions:[6,7, 9, 10, 11, 12, 15, 20, 30, 40, 50, 60, 70],
            showTitle: true,
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
          search: true,
          exportButton: false,
      }}
    
      />

<MaterialTable
        title={<Text style={{ fontSize: '13px',
           // fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}}>Send Inventory Promotional - {shipmentId}</Text> }
        columns={state1.columns}
        data={dataPromotional}
        icons={tableIcons}
        localization={{ body: { editRow: { deleteText: 'Are You Sure You want to delete this promotional insert from this shipment ?' } } }}
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
            paging:false,
            doubleHorizontalScroll: true,
            maxBodyHeight: 410,
            headerStyle: { position: 'sticky', top: 0 },
           // pageSize:6,
            //pageSizeOptions:[6,7, 9, 10, 11, 12, 15, 20, 30, 40, 50, 60, 70],
            showTitle: true,
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
          search: true,
          exportButton: false,
      }}
  
      />

      
<MaterialTable
        title={<Text style={{ fontSize: '13px',
           // fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}}>Send Inventory Custom Packaging - {shipmentId}</Text> }
        columns={state2.columns}
        data={dataCustom}
        icons={tableIcons}
        localization={{ body: { editRow: { deleteText: 'Are You Sure You want to delete this Custom Packaging from this shipment ?' } } }}
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
            paging:false,
            doubleHorizontalScroll: true,
            maxBodyHeight: 410,
            headerStyle: { position: 'sticky', top: 0 },
           // pageSize:6,
            //pageSizeOptions:[6,7, 9, 10, 11, 12, 15, 20, 30, 40, 50, 60, 70],
            showTitle: true,
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
          search: true,
          exportButton: false,
      }}
   
      />
      </Grid>
      </Grid>
  {showToast(open,msg,type)}
        </View>
        </View>
         
        {/* </ScrollView> */}
        </View>
         
    );
  }

