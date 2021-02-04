import React ,{ useState, useEffect } from 'react';
import { fade,withStyles,makeStyles, useTheme} from '@material-ui/core/styles';
import {Platform,View,ScrollView,Image,Text,Dimensions, StyleSheet,TouchableOpacity } from 'react-native';
import Button from '@material-ui/core/Button';
import PropTypes from "prop-types";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import StepConnector from '@material-ui/core/StepConnector';
import InputBase from '@material-ui/core/InputBase';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import * as shiphypeservice from './ShipService/shiphype_service';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import MaterialTable , { MTableToolbar }from 'material-table';
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
import AddIcon from '@material-ui/icons/Add';
import popUpStyle from './style/popUpStyle';
import Link from '@material-ui/core/Link';
import Typography from "@material-ui/core/Typography";
import RefreshIcon from '@material-ui/icons/Refresh';
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
   quantitycss:{
    width:'90%',
    fontSize:'6px',
    cursor:'pointer',
    underline: {
     "&&&:before": {
       borderBottom: "none"
     },
     "&&:after": {
       borderBottom: "none"
     }
   } 
   },
   paper9: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
     borderRadius:'0px',
     overflow: 'auto',
    // height:'1020vh'
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
   const uuserdid=props.uuserdid;
   const [selectproduct,setSelectproduct]=React.useState(true);
  const [changedWarehouseid, setchangedWarehouseid] = React.useState([]);
  const [openPackageType, setchangePackageType] = React.useState([]);
  const shipmentId=props.shipmentId;
  const [editRoleData,setEditRoleData]=React.useState(null);
  var ids=[];
  var ids2=[];
  var ids3=[];

  const [stateproduct, setStateproduct] = React.useState({
    data: [],
  });


   const theme = useTheme()
   const [state, setState] = React.useState({
    selectproduct:false,
    columns: [
      { title: '',
        render: rowData => <FormGroup>
        
        <FormControlLabel style={popUpStyle.checkboxPosition}
          control={<Checkbox 
            id={rowData.packaggingId}

            checked={
                (() => {
                  for(let i=0; i<ids.length;i++)
                 
                  {
                    if(editRoleData !== null){
                    if(editRoleData.moduleinfo!==0){
                    if (rowData.packaggingId  === parseInt(ids[i])){
                      return (
                          true
                        )
                    }
                  }
                  else{
                    if (rowData.packaggingId  === parseInt(ids[i])){
                      return (
                          true
                        )
                    }
                  }
                }
                else{
                  if (rowData.packaggingId  === parseInt(ids[i])){
                    return (
                        true
                      )
                  }
                }
                  }
                 
                  })()}
            
            onChange={()=>{handleChangeCheckbox(rowData)}}
            
            color="primary"
           />}
            className={classes.radioButtonCss}
            InputProps={{ inputProps: { style: {  borderRadius: 0 }, }, style: { borderRadius: 0 }, }}
           
            
        />
          
       </FormGroup>
      
      },
      {
        title: "ShipHype Internal ID",
        field: "packaggingId",
        type: "text",
        editable: "never",
        render: rowData =><FormControlLabel
         
           onClick={()=>{handleChangeCheckbox(rowData)}}
           className={classes.quantitycss}
           control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
         fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
         fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
         transition : 'all 0.25s',}}>{rowData.packaggingId}</Text>
               
             </Typography>}
         />  
      },
      { title: "SKU", field: "assignSku", type: "text",render: rowData =><FormControlLabel
         
      onClick={()=>{handleChangeCheckbox(rowData)}}
      className={classes.quantitycss}
      control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
    transition : 'all 0.25s',}}>{(rowData.assignSku === null ? "no sku" : rowData.assignSku )}</Text>
          
        </Typography>}
    />   },
      { title: "Name", field: "packaggingName", type: "text",render: rowData =><FormControlLabel
         
      onClick={()=>{handleChangeCheckbox(rowData)}}
      className={classes.quantitycss}
      control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
    transition : 'all 0.25s',}}>{rowData.packaggingName}</Text>
          
        </Typography>}
    />   },
      {
        title: 'Type',
        field: 'packaggingtypeId',
        lookup: { 1: 'Custom Packaging', 2: 'Promotional Inserts' },
      },
      
    ],
  });

  React.useEffect(() => {
    fetchCustomePackageingList(); 
 } ,[]);


 const fetchCustomePackageingList = ()=>{

  //  const userid=5;
    setLoading(true);
    shiphypeservice.fetchCustomePaching(uuserdid,1)
    .then(response => {
     console.log("status",response.status);
          if(response.status === true) {
               setLoading(false);
               //setDataProduct(response.data);
               setStateproduct((prevState) => {
                const data = [...prevState.data];
    
                for (let i = 0; i < response.data.length; i++) {
                  
                  if(response.data[i].packagingtype !== "default"){
                    data.push(response.data[i]);
                  }
                  
                }
    
                return { ...prevState, data };
              });
    if(shipmentId !== 0){
      fetchArrangeShip(shipmentId);
    }
              
                     }else{
                      setLoading(false);
                      console.log("message",response.message);
                     }   
        }).catch((error) =>{
              console.error(error);
        });
  }
 

  const fetchArrangeShip = (shipmentId)=>{
 
    //setLoading(true);
    // shiphypeservice.fetchArrangeShip(shipmentId)
    // .then(response => {
    //  console.log("status",response.status);
    //       if(response.status === true) {
    //            setLoading(false);
               if(props.editOrder.custompackaging !== 0){
                setCheckedA(false);
if(props.editOrder.custompackaging !== 0){
for(let i=0;i<props.editOrder.custompackaging.length;i++){
ids.push(props.editOrder.custompackaging[i].custompackagingId);
}

  
var ids3=[];
for(let i=0;i<ids.length ;i++){
  console.log("arrayvalue",ids[i]);
  ids3.push(1);
}

  const updatedaray=[...ids];

  setchangedWarehouseid(updatedaray);

  const updatedaray1=[...ids3];

  setchangePackageType(updatedaray1);
  
setState({
columns: [

  { title: '',
        render: rowData => <FormGroup>
        
        <FormControlLabel style={popUpStyle.checkboxPosition}
          control={<Checkbox 
            id={rowData.packaggingId}

            checked={
                (() => {
                  for(let i=0; i<ids.length;i++)
                 
                  {
                    if(editRoleData !== null){
                    if(editRoleData.moduleinfo!==0){
                    if (rowData.packaggingId  === parseInt(ids[i])){
                      return (
                          true
                        )
                    }
                  }
                  else{
                    if (rowData.packaggingId  === parseInt(ids[i])){
                      return (
                          true
                        )
                    }
                  }
                }
                else{
                  if (rowData.packaggingId  === parseInt(ids[i])){
                    return (
                        true
                      )
                  }
                }
                  }
                 
                  })()}
            
            onChange={()=>{handleChangeCheckbox(rowData)}}
            
            color="primary"
           />}
            className={classes.radioButtonCss}
            InputProps={{ inputProps: { style: {  borderRadius: 0 }, }, style: { borderRadius: 0 }, }}
           
            
        />
          
       </FormGroup>
      
      },
      {
        title: "ShipHype Internal ID",
        field: "packaggingId",
        type: "text",
        editable: "never",
        render: rowData =><FormControlLabel
         
           onClick={()=>{handleChangeCheckbox(rowData)}}
           className={classes.quantitycss}
           control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
         fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
         fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
         transition : 'all 0.25s',}}>{rowData.packaggingId}</Text>
               
             </Typography>}
         />  
      },
      { title: "SKU", field: "assignSku", type: "text",render: rowData =><FormControlLabel
         
      onClick={()=>{handleChangeCheckbox(rowData)}}
      className={classes.quantitycss}
      control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
    transition : 'all 0.25s',}}>{(rowData.assignSku === null ? "no sku" : rowData.assignSku )}</Text>
          
        </Typography>}
    />   },
      { title: "Name", field: "packaggingName", type: "text",render: rowData =><FormControlLabel
         
      onClick={()=>{handleChangeCheckbox(rowData)}}
      className={classes.quantitycss}
      control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
    transition : 'all 0.25s',}}>{rowData.packaggingName}</Text>
          
        </Typography>}
    />   },
    
      {
        title: 'Type',
        field: 'packaggingtypeId',
        lookup: { 1: 'Custom Packaging', 2: 'Promotional Inserts' },
      },
      
], 
})

}

               }
               
        //              }else{
        //               setLoading(false);
        //               console.log("message",response.message);
        //              }   
        // }).catch((error) =>{
        //       console.error(error);
        // });
  }


    const onNextfunction=()=>{
        console.log("product",changedWarehouseid.length);
        for(let i=0;i<changedWarehouseid.length ;i++){
            console.log("productid",changedWarehouseid[i]);
            console.log("productid",openPackageType[i]);
            
        } 
        props.updateSelectCustomeArray(changedWarehouseid,openPackageType);
        props.handleNextPage('AddSubscriptionQty');
    }
    var flag =false;
    const handleChangeCheckbox = (data) => {
      setCheckedA(false);
      if(ids.length === 0){
        ids.push(data.packaggingId);
      }else{
        for(let i=0;i<ids.length ;i++){
        if(data.packaggingId !== ids[i]){
          //ids.push(data);
          flag=true;
        }else{
          flag=false;
          break; 
        }
        
        }
        if(flag === true){
          ids.push(data.packaggingId); 
        }else{
          const index =  ids.indexOf(data.packaggingId);
          if (index > -1) {
            ids.splice(index, 1);
          }
        }
        
      }


        if(ids3.length === 0){
          ids3.push(data.packaggingtypeId);
        }else{
          for(let i=0;i<ids3.length ;i++){
          if(data.packaggingtypeId !== ids3[i]){
            //ids.push(data);
            flag=true;
          }else{
            flag=false;
            break; 
          }
          
          }
          if(flag === true){
            ids3.push(data.packaggingtypeId); 
          }else{
            const index =  ids3.indexOf(data.packaggingtypeId);
            if (index > -1) {
              ids3.splice(index, 1);
            }
          }
          
        }
        const updatedaray=[...ids];
        const updatedaray1=[...ids3];
    
        setchangedWarehouseid(updatedaray);
        setchangePackageType(updatedaray1);


        setState({
          columns: [
          
            { title: '',
                  render: rowData => <FormGroup>
                  
                  <FormControlLabel style={popUpStyle.checkboxPosition}
                    control={<Checkbox 
                      id={rowData.packaggingId}
          
                      checked={
                          (() => {
                            for(let i=0; i<ids.length;i++)
                           
                            {
                              if(editRoleData !== null){
                              if(editRoleData.moduleinfo!==0){
                              if (rowData.packaggingId  === parseInt(ids[i])){
                                return (
                                    true
                                  )
                              }
                            }
                            else{
                              if (rowData.packaggingId  === parseInt(ids[i])){
                                return (
                                    true
                                  )
                              }
                            }
                          }
                          else{
                            if (rowData.packaggingId  === parseInt(ids[i])){
                              return (
                                  true
                                )
                            }
                          }
                            }
                           
                            })()}
                      
                      onChange={()=>{handleChangeCheckbox(rowData)}}
                      
                      color="primary"
                     />}
                      className={classes.radioButtonCss}
                      InputProps={{ inputProps: { style: {  borderRadius: 0 }, }, style: { borderRadius: 0 }, }}
                     
                      
                  />
                    
                 </FormGroup>
                
                },
                {
                  title: "ShipHype Internal ID",
                  field: "packaggingId",
                  type: "text",
                  editable: "never",
                  render: rowData =><FormControlLabel
                   
                     onClick={()=>{handleChangeCheckbox(rowData)}}
                     className={classes.quantitycss}
                     control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
                   fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
          
          <Text style={{ fontSize: '11px', 
                   fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                   transition : 'all 0.25s',}}>{rowData.packaggingId}</Text>
                         
                       </Typography>}
                   />  
                },
                { title: "SKU", field: "assignSku", type: "text",render: rowData =><FormControlLabel
                   
                onClick={()=>{handleChangeCheckbox(rowData)}}
                className={classes.quantitycss}
                control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
          
          <Text style={{ fontSize: '11px', 
              fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
              transition : 'all 0.25s',}}>{(rowData.assignSku === null ? "no sku" : rowData.assignSku )}</Text>
                    
                  </Typography>}
              />   },
                { title: "Name", field: "packaggingName", type: "text",render: rowData =><FormControlLabel
                   
                onClick={()=>{handleChangeCheckbox(rowData)}}
                className={classes.quantitycss}
                control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
          
          <Text style={{ fontSize: '11px', 
              fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
              transition : 'all 0.25s',}}>{rowData.packaggingName}</Text>
                    
                  </Typography>}
              />   },
              
                {
                  title: 'Type',
                  field: 'packaggingtypeId',
                  lookup: { 1: 'Custom Packaging', 2: 'Promotional Inserts' },
                },
                
          ], 
          })
      };

      const handleCallbackfunction =()=>{
        props.backButtonRouting('selectPromotinalSubcription');
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
        <View className={classes.content}>
      <View className={classes.appBarSpacer} />
    
<View >
            <Grid item  container lg={12}  >
            <Grid item  lg={5}  style={popUpStyle.breadCrumSidePadding}>
            <Link  onClick={()=>{props.handleDashboard('01')}}>
            <Text style={popUpStyle.breadCrundCss1}>DASHBOARD /</Text>
            </Link><Text style={popUpStyle.breadCrundCss}> SUBSCRIPTION BOX /</Text>
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
               
         <View >
         <View className={classes.paper9} >
         <View style={popUpStyle.paddingSide}>



  <Grid container justify="space-between" spacing={2}>
{/* <Grid item xs={12} md={7} lg={7}>
<Text style={{ fontSize: '13px',
fontWeight: '700',
// marginLeft:'10px',
fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
color: '#001737',

transition : 'all 0.25s',}}>
  
  Select which Packaging you would like to use for this Subscription Box</Text>
  </Grid> */}
  <Grid item xs={12} md={1} lg={1} ></Grid>
  <Grid item xs={12} md={4} lg={4} 
  //style={{marginRight:'70px'}} 
   >

  <Grid container item  justify="flex-end">

  <Grid>
  <ColorButton
size='large'
variant="contained"
color="primary"
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
disabled={checkedA}
//onClick={()=>{handleCallbackfunction()}}
onClick={()=>{onNextfunction()}}
>
Next
</ColorButton>

  </Grid>
  </Grid>

  </Grid>
  </Grid>
  </View>
  
 
  
          <MaterialTable
        title={<Text style={{ fontSize: '13px',
            fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
            marginLeft:'5px',
            transition : 'all 0.25s',}}>Select which Packaging you would like to use for this Subscription Box</Text> }
        columns={state.columns}
        data={stateproduct.data}
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
          toolbar: {
            searchPlaceholder: "Search Packaging"
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
                  onClick: (event) =>  fetchCustomePackageingList(),
                },   
        //   {
        //     icon: () => <RefreshIcon style={{ backgroundColor:'#33cc00',color:'#fff',borderRadius : '3px',margin:'3px',}}/>,
        //   tooltip: 'Refresh',
        //   isFreeAction: true,
        //   onClick: (event) =>   fetchCustomePackageingList()
        // }
        ]}
        options={{
            paging: false,
            doubleHorizontalScroll: true,
            maxBodyHeight: '70vh',
            headerStyle: { position: 'sticky', top: 0 },
            pageSize:7,
            pageSizeOptions:[6, 12, 18, 20, 30, 40, 50, 60, 70, 80, 90, 100],
            showTitle: true,
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
            paddingTop:10,
            paddingBottom:10,
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
          selectionProps: rowData => ({
           
            // checked: rowData.customproductId === changedWarehouseid,
            // color: 'primary'
          
         
        })
      }}
      onSelectionChange={(rows) => {
        handleChangeCheckbox(rows);
    }}
      />
      </View>
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