import React ,{ useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fade,withStyles,makeStyles, useTheme} from '@material-ui/core/styles';
import {Platform,View,Image,Text,Dimensions,AsyncStorage} from 'react-native';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import * as shiphypeservice from './ShipService/shiphype_service';
import popUpStyle from './style/popUpStyle';
import Toast from './feedback/Toast';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import MaterialTable , { MTableToolbar }from 'material-table';
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
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import ProgressBar from './feedback/ProgressBar';
import { forwardRef } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import RefreshIcon from '@material-ui/icons/Refresh';
const ColorButtonAdd = withStyles(theme => ({
  root: {
    color: '#fff',
    backgroundColor: '#0168fa',
     borderColor: '#0168fa',
     borderRadius:'3px',
     height:35,
     width:220,
          fontSize:'11px',
          fontWeight:'550',
     fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
    '&:hover': {
      backgroundColor: '#0168fa',
      
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

const ColorButtonAdd1 = withStyles(theme => ({
  root: {
    color: '#fff',
    backgroundColor: '#0168fa',
     borderColor: '#0168fa',
     borderRadius:'3px',
     height:35,
     width:'100px',
          fontSize:'11px',
          fontWeight:'550',
     fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
    '&:hover': {
      backgroundColor: '#0168fa',
      
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
   Create Subscription Box
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
    height: '60vh',
    overflow: 'auto',
    backgroundColor:'#fff',
  },

  quantitycss:{
    width:'90%',
    fontSize:'6px',
    cursor:'pointer',
   },
   tabRoot:{
    fontSize: '12px'
   },
  
}));
const StyledMTableToolbar = withStyles({
    root: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  })(MTableToolbar);
export default function ScrollableTabsButtonAuto(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [loading,setLoading]=React.useState(false);
  const[promotionalPackage,setPromotionalPackage]=React.useState([]);
  const[dataproduct,setDataProduct]=React.useState([]);
  const [warehouse, setWarehouse] = React.useState('0');
  const [sellerId,setsellerId]=React.useState(0);
  const [open, setOpen]=React.useState(false);
  //var selleruserid=0;
  global.selleruserid=0;
  const [msg,setMsg]=React.useState('');
  const [type,setType]=React.useState('');
  const [status,setStatus]=React.useState(false);
  const [userData , setUserData] = React.useState([]);
  const userid=props.user_id;
  const userRoleId =parseInt(window.localStorage.roleId);
  const theme = useTheme()
  const [state, setState] = React.useState({
   columns: [
  //    { title: 'Subscription ID',
  //    field: 'subscriptionboxId',type: 'text',editable: 'never',
  //    render: rowData => 
  //   <Link href="#" onClick={() => handleGetShipmentId(rowData)} variant="body2">
  //    {rowData.subscriptionboxId} </Link>
     
  // },
     
  
     { title: 'NAME', field: 'title',type: 'text'
    
   },{ title: 'SKU',
   field: 'sku',type: 'text'
},
   { title: 'CONTENTS', field: 'description',type: 'text'
    // render: rowData => <Text>
     // {rowData.relatedshippingproductdetails[0].binassigned} </Text>
    
 },

{ title: 'Qty', field: 'quantity',type: 'text',
    
},
   
   ],
  
 });

 const handleGetShipmentId=(rowdata)=>{

  const uid= ((parseInt( window.sessionStorage.getItem('selleruserid')) === 0 ||  window.sessionStorage.getItem('selleruserid') === null )  ? userid : parseInt( window.sessionStorage.getItem('selleruserid')));
  props.getEditOrderData(rowdata,uid);
} 
const column1FilterList = state.column1FilterList;

 React.useEffect(() => {

    fetchOrderList(userid);  
    fetchPackageForPromotional(); 
    fetchForCheckAdminList();
   // handleSetCheckboxValue();
  } ,[]);
  const fetchForCheckAdminList = ()=>{
    if(userRoleId===1)
    {
      setState({
        column1FilterList,
        columns: [
          { title: 'ShipHype Internal ID',
          field: 'subscriptionboxId',type: 'text',editable: 'never',
          render: rowData =><FormControlLabel
         
          onClick={()=>{handleGetShipmentId(rowData)}}
          className={classes.quantitycss}
          control={<Typography style={{marginLeft:'20px',cursor:'pointer',
        }}>
  
  <Text style={{ fontSize: '11px'}}>{rowData.subscriptionboxId}</Text>
              
            </Typography>}
        />  
          
       },
         
       
          { title: 'NAME', field: 'title',type: 'text',
          render: rowData =><FormControlLabel
         
          onClick={()=>{handleGetShipmentId(rowData)}}
          className={classes.quantitycss}
          control={<Typography style={{marginLeft:'20px',cursor:'pointer',
        }}>
  
  <Text style={{ fontSize: '11px'}}>{rowData.title}</Text>
              
            </Typography>}
        />  
         
        }, { title: 'SKU',
        field: 'sku',type: 'text',
        render: rowData =><FormControlLabel
         
        onClick={()=>{handleGetShipmentId(rowData)}}
        className={classes.quantitycss}
        control={<Typography style={{marginLeft:'20px',cursor:'pointer',
      }}>

<Text style={{ fontSize: '11px'}}>{rowData.sku}</Text>
            
          </Typography>}
      />  
     },
        { title: 'CONTENTS', field: 'description',type: 'text',
        render: rowData =><FormControlLabel
         
        onClick={()=>{handleGetShipmentId(rowData)}}
        className={classes.quantitycss}
        control={<Typography style={{marginLeft:'20px',cursor:'pointer',
      }}>

<Text style={{ fontSize: '11px'}}>{rowData.description}</Text>
            
          </Typography>}
      />  
         // render: rowData => <Text>
          // {rowData.relatedshippingproductdetails[0].binassigned} </Text>
         
      },
     
     { title: 'Qty', field: 'quantity',type: 'text',
     render: rowData =><FormControlLabel
         
     onClick={()=>{handleGetShipmentId(rowData)}}
     className={classes.quantitycss}
     control={<Typography style={{marginLeft:'20px',cursor:'pointer',
   }}>

<Text style={{ fontSize: '11px'}}>{rowData.quantity}</Text>
         
       </Typography>}
   />  
         
     },
      
        ],
        });
    }
    else{
      setState({
        column1FilterList,
        columns: [
        
      //     { title: 'Subscription ID',
      //     field: 'subscriptionboxId',type: 'text',editable: 'never',
      //     render: rowData => 
      //    <Link href="#" onClick={() => handleGetShipmentId(rowData)} variant="body2">
      //     {rowData.subscriptionboxId} </Link>
          
      //  },
         
          { title: 'NAME', field: 'title',type: 'text',
          render: rowData =><FormControlLabel
         
          onClick={()=>{handleGetShipmentId(rowData)}}
          className={classes.quantitycss}
          control={<Typography style={{marginLeft:'20px',cursor:'pointer',
        }}>

<Text style={{ fontSize: '11px'}}>{rowData.title}</Text>
              
            </Typography>}
        />  
         
         
        }, { title: 'SKU',
        field: 'sku',type: 'text',
        render: rowData =><FormControlLabel
         
        onClick={()=>{handleGetShipmentId(rowData)}}
        className={classes.quantitycss}
        control={<Typography style={{marginLeft:'20px',cursor:'pointer',
      }}>

<Text style={{ fontSize: '11px'}}>{rowData.sku}</Text>
            
          </Typography>}
      />  
       
     },
    

        { title: 'CONTENTS', field: 'description',type: 'text',editable: 'never',
        render: rowData =><FormControlLabel
         
        onClick={()=>{handleGetShipmentId(rowData)}}
        className={classes.quantitycss}
        control={<Typography style={{marginLeft:'20px',cursor:'pointer',
      }}>

<Text style={{ fontSize: '11px'}}>{rowData.description}</Text>
            
          </Typography>}
      />  
       
         // render: rowData => <Text>
          // {rowData.relatedshippingproductdetails[0].binassigned} </Text>
         
      },
     
     { title: 'Qty', field: 'quantity',type: 'text',editable: 'never',
     render: rowData =><FormControlLabel
         
     onClick={()=>{handleGetShipmentId(rowData)}}
     className={classes.quantitycss}
     control={<Typography style={{marginLeft:'20px',cursor:'pointer',
   }}>

<Text style={{ fontSize: '11px'}}>{rowData.quantity}</Text>
         
       </Typography>}
   />  
    
         
     },
        ],
        });
    }
   }
  const fetchPackageForPromotional = () => {    
    //setLoading(true);
    shiphypeservice.fetchCustomePaching(userid)
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
  const fetchOrderList1 = (userid) => {    
    setLoading(true);
    setsellerId(userid);
 //   selleruserid=userid;
    global.selleruserid = userid;
    //const uid= (sellerId === 0 ? userid : sellerId);
    shiphypeservice.fetchSubscriptionBoxData(userid)
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
  };
 const fetchOrderList = (userid) => {    
    setLoading(true);
    const uid= (sellerId === 0 ? userid : sellerId);
    shiphypeservice.fetchSubscriptionBoxData(uid)
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
  };
  React.useEffect(() => {
    // fetchOrderStatusList();   
    // fetchOrderTypeList();   
    // fetchCourierTypeList();   
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
 
   const handleChange1 = event => {
    setWarehouse(event.target.value);
    fetchOrderList(event.target.value);   
  };
  
  
const opennewOrder=()=>{
  props.updateSubscriptionDataState();
  props.setPackageData(promotionalData);
  props.switchHandling('selectProductForSubscription');
}

React.useEffect(() => {
  // fetchProductListOfLastWeek();   
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
        
           setUserStatus(true);
            
                    }else{
                     setLoading(false);
                     console.log("message",response.message);
                    }   
       }).catch((error) =>{
             console.error(error);
       });
 }

const updataExistsProduct = (id,sku,qty,title,des,useridsub)=>{
  setLoading(true);
  const uid= (sellerId === 0 ? userid : sellerId);
  shiphypeservice.updateSubscriptionShortData(id,sku,qty,title,des,useridsub)
  .then(response => {
   console.log("status",response.status);
        if(response.status === true) {
          setOpen(true);
            setType('success');
            setMsg(response.message);
            setStatus(response.status);
            setLoading(false);
            fetchOrderList(uid);
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
  return (
    <View  className={classes.content}>
    <View className={classes.appBarSpacer} />
    <View >

              <Grid container justify="space-between"  style={popUpStyle.breadCrumSidePadding}>
            <Grid item xs={12} md={4} lg={4}>
            <Link  onClick={()=>{props.handleDashboard('01')}}>
            <Text style={popUpStyle.breadCrundCss1}>DASHBOARD /</Text>
            </Link> <Text style={popUpStyle.breadCrundCss2}> SUBSCRIPTION BOX</Text>
              </Grid>
              
              <Grid item xs={12} md={5} lg={8} >
           
              <Grid  item  xs={12} md={10} lg={12} >
            <Grid style={{marginTop:'6px'}}>
            <Grid justify="flex-end" container >
            <Grid item style={{marginRight:'20px'}}>
            {( userRoleId === 1 ? 


              <Grid item  style={{ marginTop: "15px",padding:"0"}}>
             
             <Autocomplete
       id="combo-box-demo"
       fullWidth
       options={userData}
       getOptionLabel={(option) => option.name}
      
       style={{ width: 400 }}
       renderInput={(params) => <TextField {...params} size="small" placeholder="Search Seller" variant="outlined" />}
       onChange={(event, newValue) => {
           if(newValue !== null){
            setsellerId(newValue.id);
            global.selleruserid=newValue.id;
             window.sessionStorage.setItem('selleruserid', newValue.id);
            
            //localStorage.storeData("selleruserid", newValue.id);
            
             fetchOrderList1(newValue.id);  
           }else{
            setsellerId(0);
            setDataProduct([]);
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
              </Grid>
              </View>  
             
    <Grid justify="center">
    
            <ProgressBar 
             loading={loading}
            />
           
            </Grid>
            <View style={popUpStyle.paddingSide}>
            <MaterialTable
        title={<Text style={{ fontSize: '13px',
            fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}}>Subscription Box List</Text> }
            data={dataproduct}
        columns={state.columns}
      //  data={dataproduct}
        icons={tableIcons}
        components={{
          Container: props => <Paper {...props} elevation={0}/>,
            
          Toolbar: props => (
            <StyledMTableToolbar {...props} />
          )
        }}
        localization={{
        header: {
          actions: "Action",
        },
        toolbar: {
              searchPlaceholder: "Search Kits"
          },
      }}
      // actions={[
            
      //   {
      //   icon: tableIcons.RefreshIcon,
      //   tooltip: 'Refresh',
      //   isFreeAction: true,
      //   onClick: (event) =>  fetchOrderList(userid)
      // }
      // ]}
  
        options={{
            paging: true,
            pageSize:10,
            maxBodyHeight: '70vh',
            doubleHorizontalScroll: true,
            headerStyle: { position: 'sticky', top: 0 },
            pageSizeOptions:[10,20, 30, 40, 50,100],
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
          search: true,
          exportButton: false,
      }}
      actions={[
        {
          icon: () => <ColorButtonAdd
          size='large'
          variant="contained"
          color="primary"
          //startIcon={<AddIcon />}
          >
         Create Subscription Box
        </ColorButtonAdd>,
          onClick: (event, rowData) => {
            opennewOrder();
          },
          isFreeAction: true,
         // tooltip: 'Add Button',
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
                  onClick: (event) => fetchOrderList(userid),
                },    
        // {
        //   icon: () => <RefreshIcon style={{ backgroundColor:'#33cc00',color:'#fff',borderRadius : '3px',margin:'3px',width:30,
        //               height:30}}/>,
        //  // tooltip: 'Refresh',
        //   isFreeAction: true,
        //   onClick: (event) =>  fetchOrderList(userid)
        // }
      ]}
      editable={{
      
        onRowUpdate: (newData, oldData) =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            {

              const data = dataproduct;
              const index = data.indexOf(oldData);
              const customproduct_id=(dataproduct[index].subscriptionboxId);
              updataExistsProduct(customproduct_id,newData.sku,newData.quantity,newData.title,newData.description,newData.userId);
            }
            resolve()
          }, 1000)
        })
      }}
      />
            {showToast(open,msg,type)}
            </View>
    </View>
  );
}