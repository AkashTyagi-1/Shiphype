import React ,{ useState, useEffect } from 'react';
import { fade,withStyles,makeStyles, useTheme} from '@material-ui/core/styles';
import {Platform,View,ScrollView,Image,Text,Dimensions, StyleSheet,TouchableOpacity } from 'react-native';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from "@material-ui/core/TextField";
import DialogActions from '@material-ui/core/DialogActions';
import PropTypes from "prop-types";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import Stepper from '@material-ui/core/Stepper';
import Link from '@material-ui/core/Link';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import InputBase from '@material-ui/core/InputBase';
import NativeSelect from '@material-ui/core/NativeSelect';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import StepButton from '@material-ui/core/StepButton';
import AddBoxIcon from '@material-ui/icons/AddBox';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import * as shiphypeservice from './ShipService/shiphype_service';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import MaterialTable , { MTableToolbar }from 'material-table';
import { forwardRef } from 'react';
import Paper from '@material-ui/core/Paper';
import Toast from './feedback/Toast';
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
import ProgressBar from './feedback/ProgressBar';
import AddIcon from '@material-ui/icons/Add';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import popUpStyle from './style/popUpStyle';
import HomeIcon from '@material-ui/icons/Home';
import RefreshIcon from '@material-ui/icons/Refresh';
const ColorButtonRefresh = withStyles(theme => ({
  root: {
   borderRadius : '3px',
   //  paddingTop: '9%',
   //  paddingBottom: '9%',
   //marginTop:'3%',
   height:'100%',
   padding:'1px',
   width:'-2px',
    color:'#fff',
    backgroundColor:'#33cc00',
      //  paddingLeft: '22%',
      //  paddingRight: '22%',
       '&:hover': {
         color:'#fff',
         backgroundColor:'#33cc00',
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
  Add: () => <ColorButtonAdd
  size='large'
  variant="contained"
  color="primary"
  startIcon={<AddIcon />}
  >
   Packing
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
        'productid':'LS-0001',
        'productname':'Touch screen apple iphone',
        'sellingprice':'$18',
        'shipinternational':'yes',
        'hscode':'FS008',
        'packing':'Corrugated Box'
    },
    {
        'productid':'LS-0002',
        'productname':'Battery for apple iphone',
        'sellingprice':'$19',
        'shipinternational':'no',
        'hscode':'FS009',
        'packing':'Polly Bubble Mailer'
    },
   
 
]

const packageingType = [
   
    {
      value: 'w2',
      label: 'Corrugated Box',
    },
    {
      value: 'w3',
      label: 'Poly Bubble Mailer',
    },
  ];

  const QontoConnector = withStyles({
 
    line: {
      borderColor: '#3f51b5',
      borderTopWidth: 2,
      borderRadius: 1,
    },
  })(StepConnector);
  
const BootstrapInput = withStyles(theme => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '0px solid #ced4da',
      fontSize: 15,
      padding: '2px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 0,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }))(InputBase);
  

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
  height: '80vh',
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
profileMargin10: {
  
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

// grid: {
//   width: 100,
//   height: 100,
// },

}));

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
    backgroundColor: '#0168fa',
     borderColor: '#0168fa',
     borderRadius:'3px',
     padding:'1px',
     paddingLeft:'10px',
     paddingRight:'10px',
    '&:hover': {
      backgroundColor: '#002080',
      
    },
    },
  }))(Button);


  const DialogTitle = withStyles(styles)(props => {
    
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        {onClose ? (
            <Grid container item xs={10} justify="flex-end">
          <IconButton aria-label="close" className={classes.closeButton} onClick={props.onClose}>
            <CloseIcon />
          </IconButton>
          </Grid>
        ) : null}
          <Grid item container xs={12} lg={12}>
          {/* <Grid items xs={12} lg={7}>
          <Typography justify="center" variant="body1" style={{fontSize: '16px',
            fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>Product Import
</Typography>
          </Grid> */}
          {/* <Grid items xs={12} lg={1}></Grid>
          <Grid items xs={12} lg={4}>
          <Grid  justify="flex-end"
        container 
        spacing={2} >
        <Grid item >
        <ArrowDownwardIcon  style={{height:30,width:30}}/>
            </Grid>

            <Grid item  >
          <CloudUploadIcon style={{height:30,width:30}}/>
            </Grid>

            <Grid item  >
          <AddBoxIcon style={{height:30,width:30}}/>
            </Grid>
            </Grid>
          </Grid>
       */}
</Grid>  </MuiDialogTitle>
    );
  });

  /**
   * Description:To do show step of task
   */
  function getSteps() {
    return ['Marketplace Integration', 'Shipping Profile', 'Product Import','Product Sync','Import Customers'];
  }

/**
 * Description:This function is used for Slide17
 * @param {*} props 
 */
export default function Slide17(props) {
  
   const classes = useStyles();
   const [warehouse, setWarehouse] = React.useState('');
   const {openCustomePackaging}= props;
   const [activeStep, setActiveStep] = React.useState(0);
   const [completed, setCompleted] = React.useState(new Set());
   const [skipped, setSkipped] = React.useState(new Set());
   const steps = getSteps();
   const [checkedA,setCheckedA]=React.useState(true);
   const[dataproduct,setDataProduct]=React.useState([]);
   const [stepDone,setStepDone]=React.useState([]);
   let [singleFile, setSingleFile] = useState(null);
   const [loading,setLoading]=React.useState(true);
   const [open, setOpen]=React.useState(false);
   const [msg,setMsg]=React.useState('');
   const [type,setType]=React.useState('');
   const userid=props.user_id;
   const handleChangeSwitchA = (event) => {
     setCheckedA(event.target.checked);
     //setState({ ...state, [event.target.name]: event.target.checked });
   };

   const validate = {
    assignSku: s => (s.length > 0 ? "" : "Assign Sku id required"),
    packaggingName: s => (s.length > 0 ? "" : "Product Name is required"),
  
  };


   const [skuError, setSkuError] = React.useState({
    error: false,
    label: "",
    helperText: "",
    validateInput: false,
});
const [nameError, setNameError] = useState({
  error: false,
  label: "",
  helperText: "",
  validateInput: false
});

const [hscodeError, setHscodeError] = React.useState({
  error: false,
  label: "",
  helperText: "",
  validateInput: false,
});

const [itemvalueError, setItemvalueError] = React.useState({
  error: false,
  label: "",
  helperText: "",
  validateInput: false,
});

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

const editComponent1 = ({ onChange, value, ...rest }) => {
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
      placeholder="Product SKU"
      onChange={change}
    />
  );
};

const editComponentName = ({ onChange, value, ...rest }) => {
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
      placeholder="Product Name"
      onChange={change}
    />
  );
};

const editComponentHS = ({ onChange, value, ...rest }) => {
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
      placeholder="HS Code"
      onChange={change}
    />
  );
};

const editComponentCurr = ({ onChange, value, ...rest }) => {
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
      placeholder="Item Value"
      onChange={change}
    />
  );
};
   const theme = useTheme()
   const [state, setState] = React.useState({
    columns: [
      { title: 'SKU',
       field: 'assignSku',type: 'text',editComponent
    },
      { title: 'Name', field: 'packaggingName',type: 'text',editComponent
     
    },
    
      {
        title: 'Type',
        field: 'packaggingtypeId',
        lookup: { 1: 'Custom Packaging', 2: 'Promotional Inserts' },
      },
      
    ],
    // data: [
    //   { itemsku: 'LS-00001', itemname: 'Polymer bag shiny', type: 1 },
    //   { itemsku: 'LS-00002', itemname: 'Brochure', type: 1 },
      
    // ],
  });

  React.useEffect(() => {
    fetchCustomePackageingList();
    fetchShiphypeCompleteStep();    
 } ,[]);


 const fetchCustomePackageingList = ()=>{

  //  const userid=5;
    setLoading(true);
    shiphypeservice.fetchCustomePaching(userid,1)
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
  const fetchShiphypeCompleteStep = ()=>{

    //  const userid=userid;
      shiphypeservice.fetchStepCompleteStatus(userid)
      .then(response => {
       console.log("status",response.status);
            if(response.status === true) {
              //setLoading(false);
                 setStepdonedata(response.data);
                 if(response.data.length !== 0){
                  for(let i=0; i<response.data.length;i++){
                    if(response.data[i].shiphypesubstepId === 5){
                      setActiveStep((prevActiveStep) => prevActiveStep + 1);
                    }else if(response.data[i].shiphypesubstepId === 6){
                      setActiveStep((prevActiveStep) => prevActiveStep + 1);
                    }else if(response.data[i].shiphypesubstepId === 7){
                      setActiveStep((prevActiveStep) => prevActiveStep + 1);
                    }else if(response.data[i].shiphypesubstepId === 8){
                      setActiveStep((prevActiveStep) => prevActiveStep + 1);
                    }else if(response.data[i].shiphypesubstepId === 9){
                      setActiveStep((prevActiveStep) => prevActiveStep + 1);
                    }else {
  
                   }
                 }
                }
                       }else{
                        //setLoading(false);
                        console.log("message",response.message);
                       }   
          }).catch((error) =>{
                console.error(error);
          });
    }
  const deleteCustomePacking = (packagging_id)=>{

    shiphypeservice.deleteCustomePacking(packagging_id)
    .then(response => {
     console.log("status",response.status);
          if(response.status === true) {
            setLoading(false);
            fetchCustomePackageingList();
               
                     }else{
                      setLoading(false);
                      console.log("message",response.message);
                     }   
        }).catch((error) =>{
              console.error(error);
        });
  }

  const addNewPackaging = (itemsku,itemname,type)=>{

    
    shiphypeservice.addCustomePacking(itemsku,itemname,type,userid)
    .then(response => {
     console.log("status",response.status);
          if(response.status === true) {
            setLoading(false);
              
            fetchCustomePackageingList();
                     }else{
                      setLoading(false);
                      console.log("message",response.message);
                     }   
        }).catch((error) =>{
              console.error(error);
        });
  }


  const updataExistsPackaging = (packagging_id,assignsku,packaggingname,packaggingtypeid)=>{
 
    shiphypeservice.updatePackageing(packagging_id,assignsku,packaggingname,packaggingtypeid,userid)
    .then(response => {
     console.log("status",response.status);
          if(response.status === true) {
            setLoading(false);
              
            fetchCustomePackageingList();
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

  
   /**
 * Description:Custome switch
 */
const AntSwitch = withStyles((theme) => ({
  root: {
    // width: 48,
    // height: 26,
    // padding: 0,
    display: 'flex',
    //background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    background: theme.palette.grey[500],
    borderRadius: 3,
    border: 0,
    width: 48,
    //color: 'white',
    height: 26,
    padding: '0 30px',
   // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  switchBase: {
    padding: 1,
    color: theme.palette.common.white,
    '&$checked': {
      transform: 'translateX(28px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.common.white,
        borderColor: theme.palette.grey[500],
      },
    },
  },
  thumb: {
    width: 30,
    height: 24,
    borderRadius: 0,
    border: `1px solid`
    //boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  track: {
    border: `1px solid ${theme.palette.common.white}`,
    borderRadius: 0,
   // opacity: 1,
    backgroundColor: theme.palette.primary.main,
  },
  checked: {},
}))(Switch);

/*
 * Description:To do close poup after successfully create sprint and on click cancel button
 * @param {*} issprintCreate 
 */
const handleClose1 = (isSprintCreate) => {
  props.handleSprintCancel(isSprintCreate);
}

/**
 * Description:To do call function on next button
 * @param {*} isSprintCreate 
 */

const addStepStatus =()=>{
  setLoading(true);
  
 // const userid=user_id;
  const shiphypesubsubstepId=7;
  const shiphypesubstepId=0;
  const shiphypestepId=0;
  shiphypeservice.addUserStepDoneSofar(userid,shiphypesubsubstepId,shiphypesubstepId,shiphypestepId)
        .then(response => {
         console.log("status",response.status);
              if(response.status === true) {
                setLoading(false);
                handleNextPage(9); 
                         }else{
                          setLoading(false);
                          console.log("message",response.message);
                         }   
            }).catch((error) =>{
                  console.error(error);
            });
          }

const handleNextPage = (isSprintCreate) => {
    props.handleNextPage(isSprintCreate);
  //props.handleNext(isSprintCreate);
}
/**
 * Description:To do call function on back button
 * @param {*} isSprintCreate 
 */
const handlePreviousPage = (isSprintCreate) => {
  props.handlePreviousPage(isSprintCreate);
//props.handleNext(isSprintCreate);
} 
     
        /**
         * 
         */
        const handleChange1 = event => {
            setWarehouse(event.target.value);
          };


        const totalSteps = () => {
            return getSteps().length;
          };
         
        
          const skippedSteps = () => {
            return skipped.size;
          };
        
          const completedSteps = () => {
            return completed.size;
          };
        
          const allStepsCompleted = () => {
            return completedSteps() === totalSteps() - skippedSteps();
          };
        
          const isLastStep = () => {
            return activeStep === totalSteps() - 1;
          };
        
        
         
          const handleStep = (step) => () => {
            setActiveStep(step);
          };
//                  /**
//  * Description:To do fetch all warehouse for user
//  */
// React.useEffect(() => {
 

//   for(let i=0; i<2;i++){
//    setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   }
      
    
     
     
//  } ,[]);
          // let screenWidth = Dimensions.get('window').width;
          // let uploadImage = async () => {
          //   //Check if any file is selected or not
          //   if (singleFile != null) {
          //     //If file selected then create FormData
          //     const fileToUpload = singleFile;
          //     const data = new FormData();
          //     data.append('name', 'Image Upload');
          //     data.append('file_attachment', fileToUpload);
          //     //Please change file upload URL
          //     let res = await fetch(
          //       'http://localhost/upload.php',
          //       {
          //         method: 'post',
          //         body: data,
          //         headers: {
          //           'Content-Type': 'multipart/form-data; ',
          //         },
          //       }
          //     );
          //     let responseJson = await res.json();
          //     if (responseJson.status == 1) {
          //       alert('Upload Successful');
          //     }
          //   } else {
          //     //if no file selected the show alert
          //     alert('Please Select File first');
          //   }
          // };
        
          // let selectFile = async () => {
          //   //Opening Document Picker to select one file
          //   try {
          //     const res = await DocumentPicker.pick({
          //       //Provide which type of file you want user to pick
          //       type: [DocumentPicker.types.allFiles],
          //       //There can me more options as well
          //       // DocumentPicker.types.allFiles
          //       // DocumentPicker.types.images
          //       // DocumentPicker.types.plainText
          //       // DocumentPicker.types.audio
          //       // DocumentPicker.types.pdf
          //     });
          //     //Printing the log realted to the file
          //     console.log('res : ' + JSON.stringify(res));
          //     //Setting the state to show single file attributes
          //     setSingleFile(res);
          //   } catch (err) {
          //     setSingleFile(null);
          //     //Handling any exception (If any)
          //     if (DocumentPicker.isCancel(err)) {
          //       //If user canceled the document selection
          //       alert('Canceled from single doc picker');
          //     } else {
          //       //For Unknown Error
          //       alert('Unknown Error: ' + JSON.stringify(err));
          //       throw err;
          //     }
          //   }
          // };

    return (  
        <View className={classes.content}>
      <View className={classes.appBarSpacer} />
        {/* <Grid container justify="space-between">
                <Grid item xs={12} md={6} lg={6} style={{marginTop:'10px'}}>
                 <Text style={{fontSize: '20px',
                fontWeight: '500',
              
              
                fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
                  
                  Custom Packaging List</Text>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
      
                 
                 
                  </Grid>
                  </Grid> */}
<View >
            <Grid item  container lg={12}  >
            <Grid item  lg={5}  style={popUpStyle.breadCrumSidePadding}>
            <Link  onClick={()=>{props.handleDashboard('01')}}>
            <Text style={popUpStyle.breadCrundCss1}>DASHBOARD /</Text>
            </Link><Text style={popUpStyle.breadCrundCss}> SEND INVENTORY /</Text>
          <Text style={popUpStyle.breadCrundCss2}> CUSTOM PACKAGING {'\n'} </Text> 
           
              </Grid>
              <Grid item  lg={2} ></Grid>
           
              </Grid>
              </View>  
        <Grid justify="center">
                <ProgressBar 
                 loading={loading}
                />
                </Grid>
              
                <View style={popUpStyle.paddingSide}>
         <Grid container justify="space-between" spacing={2}>
            <Grid item xs={12} md={4} lg={4}>
            <Text style={{ fontSize: '15px',
            fontWeight: '700',
            // marginLeft:'10px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}}>
              
              Custom Packaging List</Text>
              </Grid>
              <Grid item xs={12} md={4} lg={4}></Grid>
              <Grid item xs={12} md={4} lg={4}>
  
              <Grid container item  justify="flex-end">

              <Grid>
              <ColorButton
       size='large'
       variant="contained"
       color="primary"
      // className={classes.profileMargin}
       onClick={()=>{handleCallbackfunction()}}
       >
          Back
       </ColorButton>&nbsp;&nbsp;
    
              </Grid>
            <Grid>
              <ColorButton
       size='large'
       variant="contained"
       color="primary"
       //className={classes.profileMargin}
       onClick={()=>{onNextfunction()}}
       >
          Next
       </ColorButton>
    
              </Grid>
              </Grid>
            
              </Grid>
              </Grid>
          <MaterialTable
          
        title={<Text style={{ fontSize: '13px',
           // fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}}>Custom Packaging List</Text> }
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

        actions={[
            
          {
            icon: () => <RefreshIcon style={{ backgroundColor:'#33cc00',color:'#fff',borderRadius : '3px',margin:'3px',}}/>,
          tooltip: 'Refresh',
          isFreeAction: true,
          onClick: (event) =>   fetchCustomePackageingList()
        }
        ]}


        options={{
            paging: false,
            maxBodyHeight: 410,
            doubleHorizontalScroll: true,
            headerStyle: { position: 'sticky', top: 0 },
            pageSize:7,
            pageSizeOptions:[6, 12, 18, 20, 30, 40, 50, 60, 70, 80, 90, 100],
            showTitle: false,
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
        // editable={{
        //   onRowAdd: newData =>
        //     new Promise((resolve, reject) => {
        //       setTimeout(() => {
        //         {
                 
        //                 // if (!newData.productsku || !newData.productname || !newData.hscode || !newData.itemvaluecurrency || !newData.packaging) {
                            
        //                 //     setOpen(true);
        //                 //     setType('error');
        //                 //     setMsg("All field is required.");
        //                 //     reject();
        //                 //     return;
        //                 // }
        //                 // resolve();
                 
        //           console.log("sku",newData.assignSku);
        //           console.log("name",newData.packaggingName);
        //           // var str=newData.itemvaluecurrency;
        //           // var currency = str.slice(0, 1);
        //           // var currencyvalue=str.slice(1, 5);
        //           // console.log("currency",currency);
        //           // console.log("currencyvalue",currencyvalue);
        //           addNewPackaging(newData.assignSku,newData.packaggingName,newData.packaggingtypeId);
        //         }
        //         resolve()
        //       }, 1000)
        //     }),
        //   onRowUpdate: (newData, oldData) =>
        //     new Promise((resolve, reject) => {
        //       setTimeout(() => {
        //         {

        //           // if (!newData.productsku || !newData.productname || !newData.hscode || !newData.itemvaluecurrency || !newData.packaging) {
                            
        //           //           setOpen(true);
        //           //           setType('error');
        //           //           setMsg("All field is required.");
        //           //           reject();
        //           //           return;
        //           //       }
        //           //       resolve();


        //           const data = dataproduct;
        //           const index = data.indexOf(oldData);
        //           // data[index] = newData;
        //           // setState({ data }, () => resolve());

        //           const packaggingId=(dataproduct[index].packaggingId);
        //           updataExistsPackaging(packaggingId,newData.assignSku,newData.packaggingName,newData.packaggingtypeId);
        //         }
        //         resolve()
        //       }, 1000)
        //     }),
        //   onRowDelete: oldData =>
        //     new Promise((resolve, reject) => {
        //       setTimeout(() => {
        //         {
        //           const data = dataproduct;
        //           const index = data.indexOf(oldData);
        //           const packaggingId=(dataproduct[index].packaggingId);
        //           deleteCustomePacking(packaggingId);
        //         }
        //         resolve()
        //       }, 1000)
        //     }),
        // }}
      />
  {showToast(open,msg,type)}
        </View>
          {/* </ScrollView> */}
        
        </View>
    );
  }


  Slide17.propTypes = {
    openCustomePackaging: PropTypes.bool,
    handleSprintCancel: PropTypes.func,
    handleNextPage: PropTypes.func
  };