import React ,{ useState, useEffect } from 'react';
import { fade,withStyles,makeStyles} from '@material-ui/core/styles';
import {Platform,View,Image,Text,Dimensions,Clipboard} from 'react-native';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import * as shiphypeservice from './ShipService/shiphype_service';
import Toast from './feedback/Toast';
import ProgressBar from './feedback/ProgressBar';

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
import Autocomplete from '@material-ui/lab/Autocomplete';
//import validate from 'validate.js';

const transfer=[
  {
    "id":"1",
    "type":"PayPal"
  },
  {
    "id":"2",
    "type":"ACH"
  },
  {
    "id":"3",
    "type":"Cheque/Check"
  },
  {
    "id":"4",
    "type":"Email Money Transfer"
  },
  {
    "id":"5",
    "type":"Wire Transfer"
  },
];

const dataProduct=[{
"earnings":"$45",
"affiliatecode":"1qazxsw23edc",
"affiliatelink":"https://shiphype.com/register/"

}
];


const ColorButtonTes = withStyles(theme => ({
  root: {
    color: '#fff',
    backgroundColor: '#0168fa',
     borderColor: '#0168fa',
     borderRadius : '3px',
     height:35,
     width:190,
          fontSize:'11px',
          fontWeight:'700',
     fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
    '&:hover': {
      backgroundColor: '#0168fa',
      
    },
  },
}))(Button);

const ColorButtonAdd = withStyles(theme => ({
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


const StyledMTableToolbar = withStyles({
  root: {
    paddingLeft: 0,
    paddingRight: 0,
    fontSize:'12px',
  },
})(MTableToolbar);


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
Dashboardpaper: {
    border: '1px solid #ced4da',
     height: 100,
     width: 240,
   
   
     //marginLeft: '5%',
     //marginTop: '8%'
   },
   fontsizepaper: {
    fontSize: 15,
    text:'bold',
    marginLeft:'10px',
    marginTop:'10px',
  },
  numbersize:{
    fontSize: 14,
    text:'bold',
    marginLeft:'10px',
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

  const tableIcons = {
    Add: () => <ColorButtonAdd
    size='large'
    variant="contained"
    color="primary"
    startIcon={<AddIcon />}
    >
     Add
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

const ColorButton3 = withStyles(theme => ({
    root: {
      color: '#fff',
      backgroundColor: '#0168fa',
       borderRadius: '3px',
       height:30,
       width:150,
       marginTop:'0px',
       marginLeft:'3px',
            fontSize:'12px',
            fontWeight: '550',
       fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
      '&:hover': {
        backgroundColor: '#002080',
        
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

    const [value, setValue] = React.useState('2');
    const [valueBack, setValueBack] = React.useState('4');
    const [warehouse, setWarehouse] = React.useState(0);
      const [open, setOpen]=React.useState(false);
      const [msg,setMsg]=React.useState('');
      const [UserDataStatus,setUserDataStatus]=React.useState(false);
      const [type,setType]=React.useState('');
      const [sellerId,setsellerId]=React.useState(0);
      const [status,setStatus]=React.useState(false);
      const [loading,setLoading]=React.useState(false);
      const isAdmin=props.isAdmin;
      const userId=props.user_id;
      const userRoleId =parseInt(window.localStorage.roleId);
      const [userData,setUserData]=React.useState([]);
      const [users,setUsers]=React.useState([]);
      const [copylink,setCopylink]=React.useState('testlink@123jcndcn');
      const [transfercredit,setTransfercredit]=React.useState(false);
      const [formState, setFormState] =useState({
        isValid: false,
        values: {},
        touched: {},
        errors: {}
      });
    
/**
   * Description:Callback function
   */
  // useEffect(() => {
    
  //   const errors = validate(formState.values, schema);

  //   setFormState(formState => ({
  //     ...formState,
  //     isValid: errors ? false : true,
  //     errors: errors || {}
  //   }));
  // }, [formState.values]
  // );

React.useEffect(()=>{
console.log("isAdmin",props.isAdmin);
fetchAffiliateProgram(userId);
},[]);
    
const validate = {
  affiliatecode1: s => (s.length < 8 ? "" : "Length is more than 7."),
};
  
const editComponent = ({ onChange, value, ...rest }) => {
  const [currentValue, setValue] = useState(value);
  const [error, setError] = useState("");
  const change = e => {
    const newValue = e.target.value;
    setValue(newValue);
    const errorMesasge = validate[rest.columnDef.field](newValue);
    setError(errorMesasge);
    if (!errorMesasge) {
      onChange(newValue);
    }
  };
  return (
    <TextField
      {...rest}
      error={error}
      helperText={error}
      value={currentValue}
      onChange={change}
    />
  );
};


const [state, setState] = React.useState({
  columns: [
    { title: 'UserName',
    field: 'displayName',type: 'text',editable: 'never'
 },
 { title: 'Email',
    field: 'userEmail',type: 'text',editable: 'never'
 },
    { title: 'Earnings (USD)',
    field: 'earningtodate',type: 'text',editable: 'never'
 },
    { title: 'Affiliate Code',
     field: 'affiliatecode1',type: 'text',editComponent
  },
    { title: 'Affiliate Link', field: 'affiliatelink',type: 'text',editable: 'never'
   
  },
    {
      title: 'Copy Link',
      render: rowData =><Grid item xs={5}>
      <ColorButton3
      size='small'
      variant="contained"
      component="label"
      color="primary"
      
      onClick={()=>{copyLinkOnClick(rowData.affiliatelink)}}
      >
     Copy Link
      </ColorButton3>
     
       
        </Grid>
    },
    
  ],
});

const [state1, setState1] = React.useState({
  columns: [
    { title: 'Earnings (USD)',
    field: 'earningtodate',type: 'text',editable: 'never'
 },
    { title: 'Affiliate Code',
     field: 'affiliatecode1',type: 'text',editComponent
  },
    { title: 'Affiliate Link', field: 'affiliatelink',type: 'text',editable: 'never'
   
  },
    {
      title: 'Copy Link',
      render: rowData =><Grid item xs={5}>
      <ColorButton3
      size='small'
      variant="contained"
      component="label"
      color="primary"
      
      onClick={()=>{copyLinkOnClick(rowData.affiliatelink)}}
      >
     Copy Link
      </ColorButton3>
     
       
        </Grid>
    },
    
  ],
});
const copyLinkOnClick=(copylink)=>{
    Clipboard.setString(copylink);
    setOpen(true);
    setType('success');
    setMsg('Copy to Clipboard');  
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

React.useEffect(() => {
  // fetchProductListOfLastWeek();   
   fetchUserInfo();   
} ,[]);

var newArr = [];
// const fetchUserInfo = ()=>{

//    //const userid=5;
//    setLoading(true);
//    shiphypeservice.fetchUserInfo()
//    .then(response => {
//     console.log("status",response.status);
//          if(response.status === true) {
//            setLoading(false);
//            for (let a = 0; a < response.data.length; a++) {
//             var myObject = {};
//             response.data[a].id ? (myObject["id"] = response.data[a].id) : null;
//             response.data[a].userEmail
//               ? (myObject["name"] = response.data[a].userEmail)
//               : null;
//             newArr.push(myObject);
//           }
//           console.log("array", newArr);
//           setUsers(newArr);
        
          
            
//                     }else{
//                      setLoading(false);
//                      console.log("message",response.message);
//                     }   
//        }).catch((error) =>{
//              console.error(error);
//        });
//  }


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

const fetchAffiliateProgram = (user)=>{

  setLoading(true);
  const uid= (sellerId === 0 ? userId : sellerId);

  shiphypeservice.fetchAffiliateCode(uid)
  .then(response => {
   console.log("status",response.status);
        if(response.status === true) {
          setLoading(false);
          if(response.data !== null){
            setUserData(response.data);
          }
          
                   }else{
                    setLoading(false);
                    console.log("message",response.message);
                   }   
      }).catch((error) =>{
            console.error(error);
      });
}

const fetchAffiliateProgramSelect = (user)=>{

  setLoading(true);
  const uid= (sellerId === 0 ? userId : sellerId);

  shiphypeservice.fetchAffiliateCode(user)
  .then(response => {
   console.log("status",response.status);
        if(response.status === true) {
          setLoading(false);
          if(response.data !== null){
            setUserData(response.data);
          }
          
                   }else{
                    setLoading(false);
                    console.log("message",response.message);
                   }   
      }).catch((error) =>{
            console.error(error);
      });
}

const updateAffilateCode = (userid,affiliatecode,earningtodate) => {

   setLoading(true);
   shiphypeservice.editAffiliateCode(userid,affiliatecode,earningtodate)
        .then(response => {
         console.log("status",response.status);
              if(response.status === true) {
                    setOpen(true);
                    setType('success');
                    setMsg(response.message);
                    setStatus(response.status);
                    setLoading(false);
                    fetchAffiliateProgram(userId);
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

  
 };

//Show Toast after click event
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

/**
    * Description:Callback function after api call
    */
   const handleClose = () => {
     setOpen(false);
    
    
   };

   const handleDeleteCancle=()=>{
    setTransfercredit(false);
   }
   
   const handleChange1 = event => {
 //   setWarehouse(event.target.value);
    props.openTransferCredit();
  }; 
    
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
     
     <View className={classes.appBarSpacer} />
         
     <View >
            <Grid item  container lg={12} style={popUpStyle.breadCrumSidePadding} >
            <Grid item  lg={7}   >
            <Link  onClick={()=>{props.handleDashboard('01')}}>
            <Text style={popUpStyle.breadCrundCss1}>DASHBOARD /</Text>
            </Link>
          <Text style={popUpStyle.breadCrundCss2}> AFFILIATE PROGRAM {'\n'} </Text> 
            
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
  setsellerId(newValue.id);
  fetchAffiliateProgramSelect(newValue.id); 
 
//  if(value === 0){
//    setValue(1);
//  }else{
//   setValue(0);
//  }
}else{
  setsellerId(0);
  setUserData([]);
}
console.log("newvalue",newValue);
}}
/>
</Grid>

: '')}
            
              
              </Grid></Grid></Grid>
             
              </Grid>
              
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
          
        transition : 'all 0.25s',}}>Affiliate Program</Text> }
        columns={( userRoleId === 1 ? state.columns : state1.columns)}
        data={userData}
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

        actions={[
        {
          icon: () =><ColorButtonTes
    size='large'
    variant="contained"
    color="primary"
    onClick={()=>{handleChange1()}}
    >
     Transfer Credit
    </ColorButtonTes>,
          onClick: (event, rowData) => {
            handleChange1();
          },
          isFreeAction: true,
        }
      ]}

      
        options={{
            paging: false,
            doubleHorizontalScroll: true,
            maxBodyHeight: '70vh',
            headerStyle: { position: 'sticky', top: 0 },
            pageSize:7,
            pageSizeOptions:[6, 12, 18, 20, 30, 40, 50, 60, 70, 80, 90, 100],
            showTitle: false,
            selection: false,
            showSelectAllCheckbox:false,
            showTextRowsSelected:false,
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
          search: false,
          exportButton: false,
      }}

      editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {

                  const data = userData;
                  const index = data.indexOf(oldData);
                  
                  updateAffilateCode(userId,newData.affiliatecode1,newData.earningtodate);
                }
                resolve()
              }, 1000)
            }),
        }}


      />

       {showToast(open,msg,type)}
       </View>
      
                    </View>
                    
      
                  
        </View>
    );
  }

