import React ,{ useState, useEffect } from 'react';
import { fade,withStyles,makeStyles, useTheme} from '@material-ui/core/styles';
import {Platform,View,ScrollView,Image,Text,Dimensions} from 'react-native';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import Grid from '@material-ui/core/Grid';
import * as shiphypeservice from './ShipService/shiphype_service';
import StepConnector from '@material-ui/core/StepConnector';
import Toast from './feedback/Toast';
import DateFnsUtils from '@date-io/date-fns';
import ProgressBar from './feedback//ProgressBar';
import popUpStyle from './style/popUpStyle';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
/**For Style */
import validate from 'validate.js';
import MaterialTable , { MTableToolbar }from 'material-table';
import { forwardRef } from 'react';
import Paper from '@material-ui/core/Paper';
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
import Link from '@material-ui/core/Link';
import Autocomplete from '@material-ui/lab/Autocomplete';
import RefreshIcon from '@material-ui/icons/Refresh';


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
const tableIcons = {
 
add: forwardRef((props, ref) => <Add {...props} ref={ref} />),
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
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
    CloudUpload:forwardRef((props, ref) => <CloudUploadIcon {...props} ref={ref} />)
  };

  const StyledMTableToolbar = withStyles({
    root: {
      paddingLeft: 0,
      paddingRight: 0,
      fontSize:'12px',
    },
  })(MTableToolbar);



const schema = {
    compnyname: { 
      presence: { allowEmpty: false, message: 'is required' },
      length: {
        maximum: 32
      }
    },
    name: {
      presence: { allowEmpty: false, message: 'is required' },
     
      length: {
        maximum: 64
      }
    },
   address1:{
    presence: { allowEmpty: false, message: 'is required' },
    
    length: {
      maximum: 64
    }
   },
  
   address2:{
    presence: { allowEmpty: false, message: 'is required' },
   
    length: {
      maximum: 64
    }
  
   },
   city:{
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 100,
      
    }
   },
   state:{
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 100,
      
    }
   },
   country:{
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 100,
      
    }
   },
   phone:{
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 10,
      minimum:10
    }
   },
   zipcode:{
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 8
    }
   },
   email:{
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
   },
  
  };


  const ManualWarehouse = [
    
    {
      id: 1,
      label: 'Canada Warehouse',
    },
    {
      id: 2,
      label: 'US Warehouse',
    },
  ];
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
  height: '120vh',
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
paper: {
  border: '2px solid #ced4da',
  height: 100,
  width: 100,
},
root: {
  //flexGrow: 1,
  width: '100%',
},
paper9: {
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
   borderRadius:'0px',
  overflow: 'auto',
   height:'80vh'
},
  profileMargin1: {
    marginTop: theme.spacing(1),
    borderRadius : '5px',
  //  marginBottom: theme.spacing(1),
  },
  profileMargin11: {
    marginTop: theme.spacing(2),
    borderRadius : '5px',
  //  marginBottom: theme.spacing(1),
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
   margin: {
    margin: theme.spacing(1),
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
      height:'100%',
      width:'150px',
       fontSize:'11px',
       fontWeight: '550',
       color:'#fff',
       backgroundColor:'#0168fa',
    '&:hover': {
      backgroundColor: '#002080',
      
    },
    },
  }))(Button);
 

/**
 * Description:This function is used for Slide17
 * @param {*} props 
 */
export default function Slide17(props) {
  
   const classes = useStyles();
   const shipmentIds=props.shipmentId;
   const [carrierId, setCarrierId] = React.useState('');
   const [tranferData, setTranferData] = React.useState([]);
   const [shipData, setShipData] = React.useState([]);
   const [fromWarehouse,setFromWarehouse]=React.useState('0');
   const [toWarehouse,setToWarehouse]=React.useState('0');
   const [custome,setCustome]=React.useState(1);
   const userid=props.user_id;
   const isAdmin=props.isAdmin;

    const userRoleId =parseInt(window.localStorage.roleId);
    const [users,setUsers]=React.useState([]);
    const [seller,setSeller]=React.useState(0);

   const[dataproduct,setDataProduct]=React.useState([]);
   const[packingdata,setPackingdata]=React.useState([]);
   const [loading,setLoading]=React.useState(true);
   const [open, setOpen]=React.useState(false);
   const [msg,setMsg]=React.useState('');
   const [type,setType]=React.useState('');
   const [selectedStartDate, setSelectedStartDate] = React.useState(new Date());
   const [editArrangeShip,setEditArrangeShip]=React.useState(0);
   const [status,setStatus]=React.useState(false);
  const[orderCouierType,setOrderCourierType]=React.useState([]);
  const [formState, setFormState] =useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });
  const [state, setState] = React.useState({
    columns: [
      { title: 'Transfer ID', field: 'transferinventoryrequestId',type: 'text',editable: 'never',
   
},
      { title: 'Transfer From',
      field: 'transferfrom',type: 'text',editable: 'never'
   },
      { title: 'Transfer To',
       field: 'tranferto',type: 'text',
    },
      { title: 'Date', field: 'date',type: 'date',
     
    },
  
 
 
    ],
  
  });

  /**
   * Description:Callback function
   */
  useEffect(() => {
    
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]
  );
  
  


  const handleChangeFromWarehouse = event =>{
    if(toWarehouse !== ''){
      if(event.target.value === toWarehouse){
        setOpen(true);
        setType('warning');
        setMsg('You can not select same From and To warehouse');
      }else{
        setFromWarehouse(event.target.value);
      }
    }else{
      setFromWarehouse(event.target.value);
    }
    
  }

  const handleChangeToWarehouse = event =>{
      if(event.target.value === '0'){
        setCustome(2);
        if(event.target.value === fromWarehouse){
          setOpen(true);
          setType('warning');
          setMsg('You can not select same From and To warehouse');
        }else{
          setToWarehouse(event.target.value);
        }
      
      }else{
        setCustome(1);
        if(event.target.value === fromWarehouse){
          setOpen(true);
          setType('warning');
          setMsg('You can not select same From and To warehouse');
        }else{
          setToWarehouse(event.target.value);
        }
        
      }
    
 }

   const handleStartDateChange = (date,value) => {
  //  setStartsprint(value);
    setSelectedStartDate(date);
    console.log("startdate",value);

  };

  React.useEffect(() => {
    
   
    var date = new Date();
    // to add 4 days to current date
    
    date.setDate(date.getDate() + 1);
    setSelectedStartDate(date);
 
    fetchWarehouse(userid); 
    fetchTransferInvenroty(userid);
    fetchUserInfo();
    fetchForCheckAdminList();
 } ,[]);

 const fetchForCheckAdminList = ()=>{
  if(userRoleId===1)
  {
    setState({
     // column1FilterList,
     columns: [
      { title: 'Transfer ID', field: 'transferinventoryrequestId',type: 'text',editable: 'never',
   
},
      { title: 'Transfer From',
      field: 'transferfrom',type: 'text',editable: 'never'
   },
      { title: 'Transfer To',
       field: 'tranferto',type: 'text',
    },
    { title: 'Seller',
    field: 'displayName',type: 'text',
 },
 { title: 'Seller Email',
 field: 'userEmail',type: 'text',
},
{ title: 'Seller Company',
field: 'companyName',type: 'text',
},
      { title: 'Date', field: 'date',type: 'date',
     
    },
  
 
 
    ],
  
      });
  }
  else{
    setState({
     // column1FilterList,
     columns: [
      { title: 'Transfer ID', field: 'transferinventoryrequestId',type: 'text',editable: 'never',
   
},
      { title: 'Transfer From',
      field: 'transferfrom',type: 'text',editable: 'never'
   },
      { title: 'Transfer To',
       field: 'tranferto',type: 'text',
    },
      { title: 'Date', field: 'date',type: 'date',
     
    },
  
 
 
    ],
  
      });
  }
 }
  const fetchWarehouse = (userid)=>{
    setLoading(true);
  //  const userid=userid;
  shiphypeservice.fetchWarehouse(userid)
    .then(response => {
     console.log("status",response.status);
          if(response.status === true) {
                       setLoading(false);
                       setShipData(response.data);  
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
  const fetchTransferInvenroty = (userid)=>{
    setLoading(true);
  //  const userid=userid;
  shiphypeservice.fetchTransferInvenroty(userid)
    .then(response => {
     console.log("status",response.status);
          if(response.status === true) {
                       setLoading(false);
                       setTranferData(response.data);  
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
  var uuid=0;
  const refreshGrid=()=>{
    if(seller === 0)
  {
    uuid=userid;
  }
  else{
    uuid=seller;
  }
    setLoading(true);
    //  const userid=userid;
    shiphypeservice.fetchTransferInvenroty(uuid)
      .then(response => {
       console.log("status",response.status);
            if(response.status === true) {
                         setLoading(false);
                         fetchWarehouse(uuid);
                         setTranferData(response.data);  
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
            setUsers(newArr);
             
                     }else{
                      setLoading(false);
                      console.log("message",response.message);
                     }   
        }).catch((error) =>{
              console.error(error);
        });
  }
     /**
   * Description:This function call on type character inside input text
   * @param {} prop 
   */
  const handleChange = prop => event => {
    console.log("email",event.target.value);
    event.persist();
    //setValues({ ...formState.values, [prop]: event.target.value });
    setFormState(formState => ({
     ...formState,
     values: {
       ...formState.values,[prop]:event.target.value,
       checkFrom:false
     },
     touched:{
       ...formState.touched,
       [event.target.name]: true
     }
    }));
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
/*
 * Description:To do close poup after successfully create sprint and on click cancel button
 * @param {*} issprintCreate 
 */
const handleClose1 = (isSprintCreate) => {
  props.handleSprintCancel(isSprintCreate);
}

const addArrangeShip =()=>{

    setLoading(true);
    const uid= (seller === 0 ? userid : seller);
  shiphypeservice.addTransferInvenrotyWarehouse(uid,fromWarehouse,toWarehouse,selectedStartDate)
        .then(response => {
         console.log("status",response.status);
              if(response.status === true) {
                    setOpen(true);
                    setType('success');
                    setMsg(response.message);
                    setStatus(response.status);
                    setLoading(false);
                    handleNextPage();
                         }else{
                    setOpen(true);
                    setType('error');
                    setMsg(response.message);
                    setStatus(response.status);
                    setLoading(false);
                    console.log("message",response.message);
                         }   
            }).catch((error) =>{
                  console.error(error);
            });



          }

          const addWarehouse =()=>{
            const compnyname=formState.values.compnyname;
            const name=formState.values.name;
            const address1=formState.values.address1;

            const address2=formState.values.address2;

            const state=formState.values.state;
            const city=formState.values.city;
            const zipcode=formState.values.zipcode;
            const country=formState.values.country;
            const phone=formState.values.phone;
            const email=formState.values.email;
          //  const phone=formState.values.phone;


            setLoading(true);
            const uid= (seller === 0 ? userid : seller);
          shiphypeservice.addNewCustomeWarehouse(uid,compnyname,name,address1,address2,city,state,zipcode, country,
            phone,email,
            selectedStartDate)
                .then(response => {
                 console.log("status",response.status);
                      if(response.status === true) {
                        
                            setOpen(true);
                            setType('success');
                            setMsg(response.message);
                            setStatus(response.status);
                            setLoading(false);

                            fetchWarehouse();
                            setToWarehouse(response.data);
                            setCustome(1);
                         //  fetchTransferInvenroty(userid);
                          //  handleNextPage();
                                 }else{
                            setOpen(true);
                            setType('error');
                            setMsg(response.message);
                            setStatus(response.status);
                            setLoading(false);
                            console.log("message",response.message);
                                 }   
                    }).catch((error) =>{
                          console.error(error);
                    });
        
        
        
                  }
         
        
          const addArrangeShipDefaultWarehouse =()=>{
            addArrangeShip();
            
          }

         
         
/**
 * Description:To do call function on next button
 * @param {*} isSprintCreate 
 */
const handleNextPage = () => {
    props.updateInventoryWarehouse(fromWarehouse,toWarehouse);
    props.handleNextPage('select_transfer_inventory');
}
/**
 * Description:To do call function on back button
 * @param {*} isSprintCreate 
 */
const handlePreviousPage = (isSprintCreate) => {
  props.handlePreviousPage(isSprintCreate);
} 
     
       
        
        
       
         
        
         const handleCallbackfunction =()=>{
          props.backButtonRouting(7);
        }

         
                    const hasError = field =>
                    formState.touched[field] && formState.errors[field] ? true : false;
          let screenWidth = Dimensions.get('window').width;

    return (  
      <View className={classes.content}>
    <View className={classes.appBarSpacer} />
   
<View>
            <Grid item  container lg={12}  style={popUpStyle.breadCrumSidePadding}>
            <Grid item  lg={7}   >
            <Link  onClick={()=>{props.handleDashboard('01')}}>
          <Text  style={popUpStyle.breadCrundCss1}>DASHBOARD</Text></Link>
          {/* <Text  style={popUpStyle.breadCrundCss}> / INVENTORY /</Text> */}
          <Text  style={popUpStyle.breadCrundCss2}> / TRANSFER INVENTORY {'\n'} </Text> 
          
              </Grid>
              <Grid item  lg={5} style={{marginTop:'15px'}}>
              <Grid justify="flex-end" container >
            <Grid item style={{marginRight:'20px'}}>
{( userRoleId === 1 ? 


<Grid item  style={{ marginTop: "1px",marginBottom:"10px",padding:"0"}}>

<Autocomplete
id="combo-box-demo"
fullWidth
options={users}
getOptionLabel={(option) => option.name}

style={{ width: 400 }}
renderInput={(params) => <TextField {...params} size="small" placeholder="Search Seller" variant="outlined" />}
onChange={(event, newValue) => {
if(newValue !== null){
  setSeller(newValue.id); 
  fetchWarehouse(newValue.id); 
    fetchTransferInvenroty(newValue.id);
}else{
  setShipData([]);
  setTranferData([]);
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
              </View>  
    <Grid justify="center">
            <ProgressBar 
             loading={loading}
            />
            </Grid>
        

         {/* <ScrollView> */}
         <View>
             
         <View style={popUpStyle.paddingSide}>
        

         <Grid container justify="space-between" spacing={2}>
            <Grid item xs={12} md={7} lg={7}>
            <Text style={{ fontSize: '15px',
            fontWeight: '700',
            // marginLeft:'10px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}}>
              
              Transfer Inventory from one warehouse to another:</Text>
              </Grid>
              <Grid item xs={12} md={1} lg={1}></Grid>
              <Grid item xs={12} md={4} lg={4} 
              //style={{marginRight:'70px'}} 
               >
  
              <Grid container item  justify="flex-end">

              </Grid>
            
              </Grid>
              </Grid>

              {(() => {
              if (parseInt(custome) === 1){
                  return (
                    <View>
                    <form className={classes.form}>
         <Grid  justify="space-between"
      container 
      spacing={2}  style={{marginTop:'10px'}}>
         <Grid item xs={12} md={6} lg={6}   style={{marginLeft:'0px'}}>
         <Grid item xs={9} >
         {( userRoleId === 1 ? 

     <TextField
          id="outlined-select-currency-native"
          select
          fullWidth
        //  label="Transfer From"
          value={fromWarehouse}
          onChange={handleChangeFromWarehouse}
          SelectProps={{
            native: true,
          }}
          size='small'
          type="text"
          className={classes.profileMargin1}
          variant="outlined"
        >
             <option value='0' disabled  style={{fontSize: '14px',
            //fontWeight: '700',
            paddingLeft:'15px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>Transfer From</option>
         {shipData.map(option => (
         
         <option  style={{fontSize: '14px',
         //fontWeight: '700',
         paddingLeft:'15px',
         cursor:'pointer',
         fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}
          key={option.warehouseid} value={option.warehouseid}  
            >
          {option.warehousename}
         </option>
       ))}
        </TextField>:
        <TextField
        id="outlined-select-currency-native"
        select
        fullWidth
      //  label="Transfer From"
        value={fromWarehouse}
        onChange={handleChangeFromWarehouse}
        SelectProps={{
          native: true,
        }}
        size='small'
        type="text"
        className={classes.profileMargin1}
        variant="outlined"
      >
           <option value='0' disabled  style={{fontSize: '14px',
          //fontWeight: '700',
          paddingLeft:'15px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>Transfer From</option>
       {ManualWarehouse.map(option => (
       
       <option  style={{fontSize: '14px',
       //fontWeight: '700',
       paddingLeft:'15px',
       cursor:'pointer',
       fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}
        key={option.id} value={option.id}  
          >
        {option.label}
       </option>
     ))}
      </TextField>
         )}

       </Grid>
       <Grid item xs={9} >
    

     <TextField
          id="outlined-select-currency-native"
          select
          fullWidth
      //    label="Transfer To"
          value={toWarehouse}
          onChange={handleChangeToWarehouse}
          SelectProps={{
            native: true,
          }}
          size='small'
          type="text"
          className={classes.profileMargin11}
          variant="outlined"
        >
             <option value='0' disabled  style={{fontSize: '14px',
            //fontWeight: '700',
            paddingLeft:'15px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>Transfer To</option>
     
         {shipData.map(option => (
         
         <option  style={{fontSize: '14px',
         //fontWeight: '700',
         paddingLeft:'15px',
         cursor:'pointer',
         fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}
          key={option.warehouseid} value={option.warehouseid}  
            >
          {option.warehousename}
         </option>
       ))}

        {/* {( isAdmin === true ? <option value='0' style={{paddingLeft:'3%',cursor: 'pointer'}}>New Warehouse</option> : <option value='0' style={{paddingLeft:'3%',cursor: 'pointer'}}>New Warehouse</option>)} */}
        </TextField>
  </Grid>
  
  <Grid item xs={9} lg={4} >
    
  <MuiPickersUtilsProvider utils={DateFnsUtils} customStyles={{
          dateInput: {
              borderLeftWidth: 1,
              borderRightWidth: 1,
              borderTopWidth: 1,
          }
      }}>
     
     <KeyboardDatePicker
         variant="outlined"
         format="yyyy-MM-dd"
         margin="normal"
         id="startdate"
         fullWidth
         disablePast={true}
         placeholder="Start Date"
         value={selectedStartDate}
         
         onChange={handleStartDateChange}
         KeyboardButtonProps={{
           'aria-label': 'change date',
         }}
      
       />  
       
   </MuiPickersUtilsProvider>
  </Grid>
 
          <Grid container item xs={9} justify="flex-end">
            <Grid>
          <ColorButton
          size='large'
          variant="contained"
          color='primary'
            disabled={((fromWarehouse !== '0' && toWarehouse !== '0') === true ? false : true )}
         // disabled={((fromWarehouse !== '' && toWarehouse !== '') === true ? false : true )}
          onClick={()=>{addArrangeShipDefaultWarehouse()}}>
        {( editArrangeShip ===0 ? 'Next' : 'Next')}
        </ColorButton>
            </Grid>
          </Grid>
       </Grid></Grid></form>


                    </View>
                    )}
                    
                     })()}

                     {(() => {
              if (parseInt(custome) === 2){
                  return (
                    <View>

                    <form className={classes.form}>
         <Grid  justify="space-between" 
      container 
      spacing={2} style={{marginTop:'10px'}}>
         <Grid item xs={12} md={6} lg={6}   style={{marginLeft:'0px'}}>
         <Grid item xs={9} >
    
         {/* <TextField
        id="fromwarehouse"
        name='fromwarehouse'
        variant="outlined"
        fullWidth
        label="Transfer From"
        select
       
      
        value={fromWarehouse}
     
        size='small'
        className={classes.profileMargin1}
        onChange={handleChangeFromWarehouse}
        >
         
       {shipData.map(option => (
         
         <option  style={{paddingLeft:'3%',cursor: 'pointer'}} 
          key={option.id} value={option.id}  
            >
           {option.name}
         </option>
       ))}
     </TextField>  */}
     <TextField
          id="outlined-select-currency-native"
          select
          fullWidth
        //  label="Transfer From"
          value={fromWarehouse}
          onChange={handleChangeFromWarehouse}
          SelectProps={{
            native: true,
          }}
          size='small'
          type="text"
          className={classes.profileMargin1}
          variant="outlined"
        >
             <option value='0' disabled  style={{fontSize: '14px',
            //fontWeight: '700',
            paddingLeft:'15px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>Transfer From</option>
         {shipData.map(option => (
         
         <option  style={{fontSize: '14px',
         //fontWeight: '700',
         paddingLeft:'15px',
         cursor:'pointer',
         fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}
          key={option.warehouseid} value={option.warehouseid}  
            >
          {option.warehousename}
         </option>
       ))}
        </TextField>


       </Grid>
       <Grid item xs={9} >
    
       {/* <TextField
        id="towarehouse"
        name='towarehouse'
        variant="outlined"
        fullWidth
        label="Transfer To"
        select
       
      
        value={toWarehouse}
     
        size='small'
        className={classes.profileMargin1}
        onChange={handleChangeToWarehouse}
        >
       {shipData.map(option => (
         
         <option  style={{paddingLeft:'3%',cursor: 'pointer'}} 
          key={option.id} value={option.id}  
            >
           {option.name}
         </option>
        
       ))}
       {( isAdmin === true ? <option value='0' style={{paddingLeft:'3%',cursor: 'pointer'}}>Custom Address</option> : '')}
     </TextField>  */}
      <TextField
          id="outlined-select-currency-native"
          select
          fullWidth
       //   label="Transfer To"
          value={toWarehouse}
          onChange={handleChangeToWarehouse}
          SelectProps={{
            native: true,
          }}
          size='small'
          type="text"
          className={classes.profileMargin11}
          variant="outlined"
        >
             <option value='0' disabled  style={{fontSize: '14px',
            //fontWeight: '700',
            paddingLeft:'15px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>Transfer To</option>
         {shipData.map(option => (
         
         <option  style={{fontSize: '14px',
         //fontWeight: '700',
         paddingLeft:'15px',
         cursor:'pointer',
         fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}
          key={option.warehouseid} value={option.warehouseid}  
            >
          {option.warehousename}
         </option>
       ))}
        {/* {( isAdmin === true ? <option value='0' style={{paddingLeft:'3%',cursor: 'pointer'}}>New Warehouse</option> : <option value='0' style={{paddingLeft:'3%',cursor: 'pointer'}}>New Warehouse</option>)} */}
        </TextField>

  </Grid>
  
  <Grid item xs={9} >
    
         <TextField
           id="compnyname"
           name='compnyname'
           variant="outlined"
           fullWidth
           error={hasError('compnyname')}
           helperText={
              hasError('compnyname') ? formState.errors.compnyname[0] : null
           }
           placeholder="Company name"
           size='small'
           type="text"
           onChange={handleChange('compnyname')}
           className={classes.profileMargin1}
           value={formState.values.compnyname || ''}
         />
    
       </Grid>
       <Grid item xs={9} >
    
         <TextField
           id="name"
           name='name'
           variant="outlined"
           fullWidth
           error={hasError('name')}
           helperText={
             hasError('name') ? formState.errors.name[0] : null
           }
           placeholder="Name"
           size='small'
           type="text"
           onChange={handleChange('name')}
           className={classes.profileMargin1}
           value={formState.values.name || ''}
         />
    
       </Grid>
      
       <Grid item xs={9} >
    
         <TextField
           id="address1"
           name='address1'
           variant="outlined"
           fullWidth
           error={hasError('address1')}
           helperText={
             hasError('address1') ? formState.errors.address1[0] : null
           }
           placeholder="Address 1"
           size='small'
           type="text"
           onChange={handleChange('address1')}
           className={classes.profileMargin1}
           value={formState.values.address1 || ''}
         />
    
       </Grid>
       <Grid item xs={9} >
    
         <TextField
           id="address2"
           name='address2'
           variant="outlined"
           fullWidth
           error={hasError('address2')}
           helperText={
             hasError('address2') ? formState.errors.address2[0] : null
           }
           placeholder="Address 2"
           size='small'
           type="text"
           onChange={handleChange('address2')}
           className={classes.profileMargin1}
           value={formState.values.address2 || ''}
         />
    
       </Grid>
       <Grid item xs={9} >
    
         <TextField
           id="city"
           name='city'
           variant="outlined"
           fullWidth
           error={hasError('city')}
           helperText={
             hasError('city') ? formState.errors.city[0] : null
           }
           placeholder="City"
           size='small'
           type="text"
           onChange={handleChange('city')}
           className={classes.profileMargin1}
          
           value={formState.values.city || ''}
         />
    
       </Grid>
       </Grid>
       
       <Grid item xs={12} md={6} lg={6}   style={{marginLeft:'0px'}}>
       <Grid item xs={9}>
    
         <TextField
           id="state"
           name='state'
           variant="outlined"
           fullWidth
           error={hasError('state')}
           helperText={
             hasError('state') ? formState.errors.state[0] : null
           }
           placeholder="State/Province"
           size='small'
           type="text"
           onChange={handleChange('state')}
           className={classes.profileMargin1}
          
           value={formState.values.state || ''}
         />
    
       </Grid>
       <Grid item xs={9} >
    
         <TextField
           id="zipcode"
           name='zipcode'
           variant="outlined"
           fullWidth
           error={hasError('zipcode')}
           helperText={
             hasError('zipcode') ? formState.errors.zipcode[0] : null
           }
           placeholder="Zip/Postal Code"
           size='small'
           type="text"
           onChange={handleChange('zipcode')}
           className={classes.profileMargin1}
          
           value={formState.values.zipcode || ''}
         />
    
       </Grid>
       <Grid item xs={9} >
    
         <TextField
           id="country"
           name='country'
           variant="outlined"
           fullWidth
           error={hasError('country')}
           helperText={
             hasError('country') ? formState.errors.country[0] : null
           }
           placeholder="Country"
           size='small'
           type="text"
           onChange={handleChange('country')}
           className={classes.profileMargin1}
          
           value={formState.values.country || ''}
         />
    
       </Grid>
       <Grid item xs={9} >
    
         <TextField
           id="phone"
           name='phone'
           variant="outlined"
           fullWidth
           error={hasError('phone')}
           helperText={
             hasError('phone') ? formState.errors.phone[0] : null
           }
           placeholder="Tel"
           size='small'
           type="text"
           onChange={handleChange('phone')}
           className={classes.profileMargin1}
          
           value={formState.values.phone || ''}
         />
    
       </Grid>

       <Grid item xs={9} >
    
    <TextField
      id="email"
      name='email'
      variant="outlined"
      fullWidth
      error={hasError('email')}
      helperText={
        hasError('email') ? formState.errors.email[0] : null
      }
      placeholder="Email"
      size='small'
      type="text"
      onChange={handleChange('email')}
      className={classes.profileMargin1}
     
      value={formState.values.email || ''}
    />

  </Grid>
  <Grid item xs={9} >
    
  <MuiPickersUtilsProvider utils={DateFnsUtils} customStyles={{
          dateInput: {
              borderLeftWidth: 1,
              borderRightWidth: 1,
              borderTopWidth: 1,
          }
      }}>
     
     <KeyboardDatePicker
         variant="outlined"
         format="yyyy-MM-dd"
         margin="normal"
         id="startdate"
         fullWidth
         disablePast={true}
         placeholder="Start Date"
         value={selectedStartDate}
         
         onChange={handleStartDateChange}
         KeyboardButtonProps={{
           'aria-label': 'change date',
         }}
      
       />  
       
   </MuiPickersUtilsProvider>
  </Grid>
 
          <Grid container item xs={9} justify="flex-end">
            <Grid>
          <ColorButton
          size='large'
          variant="contained"
          color='primary'
          disabled={!formState.isValid}
         // disabled={ ((fromWarehouse !== '0' && toWarehouse !== '0' && formState.isValid) === true ? false : true )}
      //    disabled={ ((fromWarehouse !== '' && toWarehouse !== '' && formState.isValid) === true ? false : true )}
          onClick={()=>{addWarehouse()}}>
        {( editArrangeShip ===0 ? 'Save Address' : 'Update Address')}
        </ColorButton>
            </Grid>
          </Grid>
       </Grid></Grid></form>

                    </View>
                    )}
                    
                     })()}

         
  {showToast(open,msg,type)}
        </View>
        <View style={popUpStyle.paddingSide}>

         
<MaterialTable
title={<Text style={{ fontSize: '13px',
  fontWeight: '700',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
  color: '#001737',

  transition : 'all 0.25s',}}>Transfer History</Text> }
columns={state.columns}
data={tranferData}
icons={tableIcons}
components={{
Container: props => <Paper {...props} elevation={0}/>,
 
Toolbar: props => (
  
<StyledMTableToolbar {...props} />

  
)
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
                  position: "toolbar",
                  isFreeAction: true,
                  onClick: (event) => refreshGrid(),
                },
      //   {
      //     icon: () => <RefreshIcon style={{ backgroundColor:'#33cc00',color:'#fff',borderRadius : '3px',margin:'3px',width:30,
      //                 height:30}}/>,
      //   //tooltip: 'Refresh',
      //   position: "toolbar",
      //   onClick: (event) => refreshGrid()
      // }

]}
localization={{
toolbar: {
   searchPlaceholder: "Search Transfers"
},
}}
options={{
  paging: false,
  maxBodyHeight: '35vh',
  headerStyle: { position: 'sticky', top: 0 },
  pageSize:7,
  pageSizeOptions:[6, 12, 18, 20, 30, 40, 50, 60, 70, 80, 90, 100],
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
  paddingRight: 10,
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
  paddingTop:5,
  paddingBottom:5,
  paddingRight: 5,
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
  paddingLeft: 5,
  paddingTop:5,
  paddingBottom:5,
  paddingRight: 5,
},
search: true,
exportButton: false,
}}

/>
</View>
         
           </View>
        </View>
    );
  }