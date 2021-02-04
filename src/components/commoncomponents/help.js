import React ,{ useState, useEffect } from 'react';
import { fade,withStyles,makeStyles} from '@material-ui/core/styles';
import {Platform,View,Image,Text,Dimensions} from 'react-native';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import * as shiphypeservice from './ShipService/shiphype_service';
import Toast from './feedback/Toast';
import ProgressBar from './feedback/ProgressBar';
import validate from 'validate.js';
import popUpStyle from './style/popUpStyle';
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
import DeleteCard from './Order/updateStatusForHelp'; 
import AddReasonForStatus from './Order/AddReasonForStatus'; 
import ShowTheReply from './Order/ShowTheReply'; 
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


const ColorButtonAdd = withStyles(theme => ({
  root: {
   borderRadius : '3px',
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


const useStyles = makeStyles(theme => ({
    root: { 
      },
    submit: {
      margin: theme.spacing(0, 0, 0),
      borderRadius : 0,
},
textArea:{
  marginTop: theme.spacing(0),
  borderRadius : 0,
},
profileMargin: {
  marginTop: theme.spacing(1),
  borderRadius : 0,
  marginBottom: theme.spacing(1),
},
profileMargin1: {
    marginTop: theme.spacing(1),
    borderRadius : '5px',
  //  marginBottom: theme.spacing(1),
  },
paper: {
  border: '2px solid #ced4da',
  height: 80,
  width: 100,
},
paper1: {
  border: '2px solid #ced4da',
  height: 120,
  width: 100,
  marginLeft: '15%',
  marginTop: '8%'
},
root: {
  flexGrow: 1,
},
avatarsmall: {
  width: theme.spacing(3.5),
  height: theme.spacing(3.5),
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
// grid: {
//   width: 100,
//   height: 100,
// },

}));

const schema = {
  yourname: { 
      presence: { allowEmpty: false, message: 'is required' },
      length: {
        maximum: 32
      }
    },
    youremail: {
      presence: { allowEmpty: false, message: 'is required' },
      email: true,
    length: {
      maximum: 64
      }
    },
   subject:{
    presence: { allowEmpty: false, message: 'is required' },
    
    length: {
      maximum: 64
    }
   },
  
   message:{
    presence: { allowEmpty: false, message: 'is required' },
   
    length: {
      maximum: 64
    }
  
   },
  
  };

  const StyledMTableToolbar = withStyles({
    root: {
      paddingLeft: 0,
      paddingRight: 0,
      fontSize:'12px',
    },
  })(MTableToolbar);
  

/****   For changing the textfield radius  : End *********/
const styles = (theme) => ({
  root: {
    '@media print': {
    margin: 0,
    padding: theme.spacing(2),
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
    height:'60%',
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


  
/**
 * Description:This function is used for CreateSprint for sprint
 * @param {*} props 
 */
export default function CreateSprint(props) {
  
   const classes = useStyles();
    //const {openCreateSprint}= props;
    //const {openReturn}= props;
    const userid=props.user_id;
    const [value, setValue] = React.useState('2');
    const [valueBack, setValueBack] = React.useState('4');
      const [open, setOpen]=React.useState(false);
      const [msg,setMsg]=React.useState('');
      const [UserDataStatus,setUserDataStatus]=React.useState(false);
      const [type,setType]=React.useState('');
      
   const[dataproduct,setDataProduct]=React.useState([]);
   const[userData,setUserData]=React.useState([]);
      const [status,setStatus]=React.useState(false);
      const [loading,setLoading]=React.useState(false);
      const userRoleId =parseInt(window.localStorage.roleId);
      const [users,setUsers]=React.useState([]);
      const [seller,setSeller]=React.useState(0);
 const [openDelete1, setOpenDelete1] = React.useState(false);
 const [openDelete2, setOpenDelete2] = React.useState(false);
const [openDelete, setOpenDelete] = React.useState(false);
const [rowAdminComment , setRowAdminComment ] = React.useState('');
const [cardid,setCardid]=React.useState(0);
const [rowDataForOrder , setRowData] = React.useState([]);
   const [rowStatus , setRowStatus] = React.useState(0);
      const [formState, setFormState] =useState({
        isValid: false,
        values: {},
        touched: {},
        errors: {}
      });
      const [state, setState] = React.useState({
        columns: [
          { title: 'Name',
          field: 'name',type: 'text',editable: 'never'
       },
          { title: 'Email',
           field: 'email',type: 'text',
        },
          { title: 'Subject', field: 'subject',type: 'text',
         
        },
        { title: 'AdminComment', field: 'admincomment',type: 'text',hidden:true,
     
  },
        { title: 'Message', field: 'message',type: 'text',editable: 'never',
       
     },
     { title: 'Creation Date', field: 'createdat',type: 'date',
     
    },
     { title: 'Status', field: 'status',type: 'text',editable: 'never',
     render: rowData => <Text>
                   {(() => {
                      if(rowData.status==='3')
                     {
                       return(
        <ColorButtonProcessed size='large'
        variant="contained"
        color="primary"
        onClick={()=>{
          handleClickOpendelete(rowData.internalorderId,rowData) 
          }}> Processing </ColorButtonProcessed>
                       )
                     }
                     else if(rowData.status==='4')
                     {
                       return(
                        <ColorButtonInDeliverd size='large'
                        variant="contained"
                        color="primary"
                        onClick={()=>{
                          handleClickOpendelete(rowData.internalorderId,rowData) 
                          }}> Resolved </ColorButtonInDeliverd>
                       )
                     }
                    
                     else{
                      return(
                        <ColorButtonNew size='large'
                        variant="contained"
                        color="primary"
                        onClick={()=>{
                          handleClickOpendelete(rowData.internalorderId,rowData) 
                          }}> Open </ColorButtonNew>
                                       )
                     }
               
              })()}</Text>,
       
    },
     
        ],
      
      });
      const handleClickOpendelete = (rowid,rowData) => {
        if(userRoleId===1)
        {  setOpenDelete(true);
          setCardid(rowid);
          setRowData(rowData);
          setRowStatus(rowData.status);
          console.log("rowid",rowid);

        }
        else{
          setOpenDelete2(true);
          setRowAdminComment(rowData.admincomment);
        }
      
        };
        const handleDeleteCancle = () => {
          setOpenDelete(false);
          setOpenDelete1(false);
          setOpenDelete2(false);
         // setOpenOnHoldOrder(false);
         // setOpenCancelOrderSet(false);
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
        const handleRelease =(isSprintCreate)=>{
         
             if(isSprintCreate === 3){
            
              setOpenDelete(false);
              setRowStatus('3');
        setOpenDelete1(true);
             
            }
            else if(isSprintCreate === 4){
            
              setOpenDelete(false);
              setRowStatus('4');
              setOpenDelete1(true);
             
            }
          else {
            
            setOpenConfirmationRelease(true);
            setOpenDelete(false);
           
          }
        }
        React.useEffect(() => {
          fetchCustomePackageingList();
         // fetchUserDetails(userid); 
          fetchUserInfo();   
       } ,[]);
      
    
     const updateStatusForHelp = (statusid)=>{
    
      //  const userid=5;
        setLoading(true);
        shiphypeservice.updateStatusForHelp(rowDataForOrder.userid,rowDataForOrder.helpemailId,rowDataForOrder.name,rowDataForOrder.email,
          rowDataForOrder.subject,rowDataForOrder.message,rowStatus,statusid)
        .then(response => {
         console.log("status",response.status);
              if(response.status === true) {
                setLoading(false);
                setOpenDelete1(false);
                fetchCustomePackageingList();
                   
                         }else{
                          setLoading(false);
                          console.log("message",response.message);
                         }   
            }).catch((error) =>{
                  console.error(error);
            });
      }
      
      const fetchCustomePackageingList = ()=>{
        const uid= (seller === 0 ? userid : seller);
        //  const userid=5;
          setLoading(true);
          shiphypeservice.fetchHelpMeag(uid)
          .then(response => {
           console.log("status",response.status);
                if(response.status === true) {
                  setLoading(false);
                     setDataProduct(response.data);
                     fetchUserDetails(userid);
                           }else{
                            setLoading(false);
                            console.log("message",response.message);
                           }   
              }).catch((error) =>{
                    console.error(error);
              });
        }

        const fetchCustomePackageingList1 = (userid)=>{
          // const uid= (seller === 0 ? userid : seller);
          //  const userid=5;
            setLoading(true);
            shiphypeservice.fetchHelpMeag(userid)
            .then(response => {
             console.log("status",response.status);
                  if(response.status === true) {
                    setLoading(false);
                       setDataProduct(response.data);
                       fetchUserDetails(userid);
                             }else{
                              setLoading(false);
                              console.log("message",response.message);
                             }   
                }).catch((error) =>{
                      console.error(error);
                });
          }
        
        const fetchUserDetails = (userid)=>{
      
          //  const userid=5;
            setLoading(true);
            shiphypeservice.fetchUserDetails(userid)
            .then(response => {
             console.log("status",response.status);
                  if(response.status === true) {
                    setLoading(false);
                    setUserData(response.data);
                    bindData(response.data);
                       

                             }else{
                              setLoading(false);
                              console.log("message",response.message);
                             }   
                }).catch((error) =>{
                      console.error(error);
                });
          }
        const bindData = (data)=>{
        //  console.log("bind call",data);
          
        
         
            setFormState(formState => ({
              ...formState,
              values: {
                ...formState.values,yourname: data.userdetails.displayName,
                checkFrom:false
              },
              touched:{
                ...formState.touched,
                yourname : true
              }
             }));

             setFormState(formState => ({
              ...formState,
              values: {
                ...formState.values,youremail: data.userdetails.userEmail,
                checkFrom:false
              },
              touched:{
                ...formState.touched,
                youremail : true
              }
             }));

             setFormState(formState => ({
              ...formState,
              values: {
                ...formState.values,message: '',
                checkFrom:false
              },
              touched:{
                ...formState.touched,
                message : true
              }
             }));

             setFormState(formState => ({
              ...formState,
              values: {
                ...formState.values,subject: '',
                checkFrom:false
              },
              touched:{
                ...formState.touched,
                subject : true
              }
             }));


            }
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


    
  const ColorButton2 = withStyles(theme => ({
  root: {
    color: '#fff',
    borderRadius : '3px',
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    height:'100%',
    width:'180px',
    // fontSize:'14px',
    // fontWeight: '620',
     //marginTop:'-2px',
     color:'#fff',
     backgroundColor:'#0168fa',
    '&:hover': {
      backgroundColor: '#002080',
      
    },
  },
}))(Button);     
          

         
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

const handleClickHelpSetting = () => {

   const name=formState.values.yourname;
   const email=formState.values.youremail;
   const subject=formState.values.subject;
   const message=formState.values.message;
   const uid= (seller === 0 ? userid : seller);
   setLoading(true);
   shiphypeservice.sendHelp(name,email,subject,message,uid)
        .then(response => {
         console.log("status",response.status);
              if(response.status === true) {
                    setOpen(true);
                    setType('success');
                    setMsg('Someone from our support team will reach out within 24 hours.');
                    setStatus(response.status);
                    setLoading(false);
                    fetchCustomePackageingList();
                    
                         }else{
                    setOpen(true);
                    setType('error');
                    setMsg('Someone from our support team will reach out within 24 hours.');
                    setStatus(response.status);
                    setLoading(false);
                    console.log("message",response.message);
                         }   
            }).catch((error) =>{
                  console.error(error);
            });

  
 };


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
               response.data[a].displayName
                 ? (myObject["name"] = response.data[a].displayName)
                 : null;
               newArr.push(myObject);
              }
              else{
               var myObject = {};
               response.data[a].id ? (myObject["id"] = response.data[a].id) : null;
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

// /**
//     * Description:Callback function after api call
//     */
//    const handleClose = () => {
//      setOpen(false);
//      if(status === true)
//      {
//       props.handleNextPage('01');
//      }
//    };
   
    
    
/**
 * Description:To do close poup after successfully create sprint and on click cancel button
 * @param {*} issprintCreate 
 */
const handleClose1 = (isSprintCreate) => {
  props.closeHelpscreen();
}
let screenWidth = Dimensions.get('window').width;

const hasError = field =>
formState.touched[field] && formState.errors[field] ? true : false;

    return (  
      <View className={classes.content}>
      {/* <ScrollView> */}
     <View className={classes.appBarSpacer} />
         
     <View >
     <Grid item  container lg={12} style={popUpStyle.breadCrumSidePadding} >
            <Grid item  lg={7}   >
            <Link  onClick={()=>{props.handleDashboard('01')}}>
            <Text style={popUpStyle.breadCrundCss1}>DASHBOARD /</Text>
            </Link>
          <Text style={popUpStyle.breadCrundCss2}> HELP CENTER {'\n'} </Text> 
            
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
fetchCustomePackageingList1(newValue.id);
        fetchUserDetails(newValue.id); 
}else{
  setSeller(0);
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
       
              {( userRoleId ===1 ?
              <View style={popUpStyle.paddingSide}>

                    <Grid justify="center">
            <ProgressBar 
             loading={loading}
            />
            </Grid>
            <Grid> {(openDelete === false ? " " :
           <DeleteCard
           rowStatus={rowStatus}
           userid={userid}
           openDeleteCard={openDelete}
        handleRelease={handleRelease}
           handleDeleteCancle={handleDeleteCancle}
         />)}

{(openDelete1 === false ? " " :
           <AddReasonForStatus
           user_id={userid}
           openOnHoldOrder={openDelete1}
           handleConfirmHold={updateStatusForHelp}
           handleDeleteCancle={handleDeleteCancle}
         />)}

{(openDelete2 === false ? " " :
           <ShowTheReply
           user_id={userid}
           openDeleteCard={openDelete2}
           rowAdminComment={rowAdminComment}
          // handleConfirmHold={updateStatusForHelp}
           handleDeleteCancle={handleDeleteCancle}
         />)}
</Grid>
            {showToast(open,msg,type)}
           
                 
         
         <MaterialTable
       title={<Text style={{ fontSize: '13px',
           fontWeight: '700',
           fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
           color: '#001737',
         
           transition : 'all 0.25s',}}>Ticket History</Text> }
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
            searchPlaceholder: "Search Tickets"
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
                  onClick: (event) => fetchCustomePackageingList(),
                },
    ]}
   
       options={{
           paging: false,
           maxBodyHeight: '69vh',
           doubleHorizontalScroll: true,
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
: <View style={popUpStyle.paddingSide}>

<Grid justify="center">
<ProgressBar 
loading={loading}
/>
</Grid>
<Grid> {(openDelete === false ? " " :
<DeleteCard
rowStatus={rowStatus}
userid={userid}
openDeleteCard={openDelete}
handleRelease={handleRelease}
handleDeleteCancle={handleDeleteCancle}
/>)}

{(openDelete1 === false ? " " :
<AddReasonForStatus
user_id={userid}
openOnHoldOrder={openDelete1}
handleConfirmHold={updateStatusForHelp}
handleDeleteCancle={handleDeleteCancle}
/>)}

{(openDelete2 === false ? " " :
<ShowTheReply
user_id={userid}
openDeleteCard={openDelete2}
rowAdminComment={rowAdminComment}
// handleConfirmHold={updateStatusForHelp}
handleDeleteCancle={handleDeleteCancle}
/>)}
</Grid>
{showToast(open,msg,type)}
<Grid style={{marginLeft:'3px'}}>
<Text 
style={{
fontSize: '14px',
fontWeight: '700',
fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
color: '#001737',

transition : 'all 0.25s',
}}>Fill out the form below for any questions or inquiries:{'\n'}{'\n'}
</Text>  

</Grid>
<form >
<Grid  justify="space-between" 
container 
spacing={1} >


<Grid item xs={12} lg={6}  >
<Grid item xs={10} >

<TextField
id="yourname"
name='yourname'
variant="outlined"
fullWidth
error={hasError('yourname')}
helperText={
hasError('yourname') ? formState.errors.yourname[0] : null
}
placeholder="Your Name"
size='small'
type="text"
onChange={handleChange('yourname')}
className={classes.profileMargin1}
value={formState.values.yourname || ''}
/>

</Grid>
<Grid item xs={10} >

<TextField
id="youremail"
name='youremail'
variant="outlined"
fullWidth
error={hasError('youremail')}
helperText={
hasError('youremail') ? formState.errors.youremail[0] : null
}
placeholder="Your Email"
size='small'
type="text"
onChange={handleChange('youremail')}
className={classes.profileMargin1}
value={formState.values.youremail || ''}
/>

</Grid>

<Grid item xs={10} >

<TextField
id="subject"
name='subject'
variant="outlined"
fullWidth
// error={hasError('subject')}
// helperText={
// hasError('subject') ? formState.errors.subject[0] : null
// }
placeholder="Subject"
size='small'
type="text"
onChange={handleChange('subject')}
className={classes.profileMargin1}
value={formState.values.subject}
/>

</Grid>
<Grid item xs={10}>

<TextField
id="message"
name='message'
variant="outlined"
fullWidth
// error={hasError('message')}
// helperText={
// hasError('message') ? formState.errors.message[0] : null
// }
placeholder="Message"
size='small'
type="text"
multiline = {true}
rows={4}
onChange={handleChange('message')}
className={classes.profileMargin1}
value={formState.values.message}
/>

</Grid>

<Grid item xs={10} >
<Grid  justify="flex-end" // Add it here :)
container 
spacing={24} >

<Grid item  style={{marginTop:'5px'}}  >



<ColorButton2
size='large'
variant="contained"
color="primary"
disabled={!formState.isValid}
//className={classes.profileMargin}
onClick={()=>{handleClickHelpSetting()}}
//onClick={()=>{handleNextPage(3)}}
>
{<Text style={{ fontSize: '14px',
// fontWeight: '700',
fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
color: '#FFFFFF',

transition : 'all 0.25s',}}>Send Message</Text> } 

</ColorButton2>
</Grid>


</Grid></Grid>
</Grid>


</Grid>
</form>



<MaterialTable
title={<Text style={{ fontSize: '13px',
fontWeight: '700',
fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
color: '#001737',

transition : 'all 0.25s',}}>Ticket History</Text> }
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
searchPlaceholder: "Search Tickets"
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
                  onClick: (event) => fetchCustomePackageingList(),
                },
  
]}
options={{
paging: false,
maxBodyHeight: '29vh',
doubleHorizontalScroll: true,
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
</View>)}

       </View>


        </View>
    );
  }