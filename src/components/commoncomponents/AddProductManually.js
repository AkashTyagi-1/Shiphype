import React ,{ useState, useEffect } from 'react';
import { fade,withStyles,makeStyles, useTheme} from '@material-ui/core/styles';
import {Platform,View,ScrollView,Image,Text,Dimensions} from 'react-native';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import Grid from '@material-ui/core/Grid';
import * as shiphypeservice from './ShipService/shiphype_service';
import StepConnector from '@material-ui/core/StepConnector';
import Toast from './feedback/Toast';
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from '@material-ui/core/Checkbox';
import Paper from "@material-ui/core/Paper";
import ProgressBar from './feedback//ProgressBar';
import Link from '@material-ui/core/Link';
import popUpStyle from './style/popUpStyle';
import MaterialTable, { MTableToolbar } from "material-table";
import { forwardRef } from "react";
import AddBox from "@material-ui/icons/AddBox";

import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import AddIcon from "@material-ui/icons/Add";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {ExcelRenderer, OutTable} from 'react-excel-renderer';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
/**For Style */
import ProductImport from "../../assets/icons/ProductImport.xlsx";
import validate1 from 'validate.js';
import Select from '@material-ui/core/Select';

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
const QontoConnector = withStyles({
 
  line: {
    borderColor: '#3f51b5',
    borderTopWidth: 2,
    borderRadius: 1,
  },
})(StepConnector);

const StyledMTableToolbar = withStyles({
  root: {
    paddingLeft: 0,
    paddingRight: 0,
  },
})(MTableToolbar);

const schema = {
  
//   torontostock: {
//     presence: { allowEmpty: false, message: 'is required' },
//     length: {
//       maximum: 64
//     }
//   },
  
//   losangelesstock:{
//   presence: { allowEmpty: false, message: 'is required' },
 
//   length: {
//     maximum: 64
//   }
//  },

 
 itemvalue:{
  presence: { allowEmpty: false, message: 'is required' },
  
  length: {
    maximum: 11
  }
 },
 hscode:{
  presence: { allowEmpty: false, message: 'is required' },
 
  length: {
    maximum: 64
  }

 },

};


const dangerousGood = [
    
  {
    id: true,
    label: 'Yes',
  },
  {
    id: false,
    label: 'No',
  },
  
];




const ColorButton2 = withStyles(theme => ({
    root: {
      color: '#fff',
      backgroundColor: '#ff9900',
       borderColor: '#e68a00',
       borderRadius:'3px',
       height:45,
       width:290,
            fontSize:'11px',
       fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
      '&:hover': {
        backgroundColor: '#e68a00',
        
      },
    },
  }))(Button);
  //Make custom button
  const ColorButton4 = withStyles(theme => ({
    root: {
      color: '#fff',
      backgroundColor: '#00b33c',
       borderColor: '#009933',
       borderRadius:'3px',
       height:45,
       width:290,
            fontSize:'11px',
       fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
      '&:hover': {
        backgroundColor: '#00cc44',
        
      },
    },
  }))(Button);

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
  height: '100vh',
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
 
  const ColorButton1 = withStyles(theme => ({
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
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  var ids=[];
/**
 * Description:This function is used for Slide17
 * @param {*} props 
 */
export default function Slide17(props) {
  
   const classes = useStyles();
   const [packingPallet, setPackingPallet] = React.useState(1);
   const userid=props.user_id;
   const[shipData,setShipData]=React.useState([]);
   const [loading,setLoading]=React.useState(true);
   const [open, setOpen]=React.useState(false);
   const [msg,setMsg]=React.useState('');
   const [type,setType]=React.useState('');
  const promotionalData = props.promotionalData;
  const packageData=props.packageDataPro;
   const [selectedStartDate, setSelectedStartDate] = React.useState(new Date());
   const [customePack, setCustomePack] = React.useState(0);
   const [promotioanlIn,setPromotioanlIn]=React.useState(0);
   const [value,setValue]=React.useState(1);
   const [status,setStatus]=React.useState(false);
  const[customPackaging,setDataProduct]=React.useState([]);
  const[promotionalInserts,setDataProduct2]=React.useState([]);
  const[countryName,setChangeCountry]=React.useState(0);
  const[wahouseValue,setWarehouseValue]=React.useState(0);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [openProductName, setOpenProductName] = React.useState(false);
  const [open11, setOpen11] = React.useState(false);
  var valueofsouceid=3;
  var valueofprom=13;
  const [sorceId, setSorceId] = React.useState(4);
  const handleClose3 = () => {
    setOpen1(false);
    // handleNextPage(22);
  };
  const handleClose4 = () => {
    setOpen2(false);
    // handleNextPage(22);
  };
  const handleClose5 = () => {
    setOpen3(false);
    // handleNextPage(22);
  };
  const handleCloseProductName = () => {
    setOpenProductName(false);
    // handleNextPage(22);
  };
  const handleClose31 = () => {
    setOpen11(false);
    // handleNextPage(22);
  };
  let activeStep1=false;
  const handleChangequality = (event,props) => {
  //   fullinventorycount=event.target.checked;
  // //  setFromAction(false);
   activeStep1=event.target.checked;
  props.onChange(event.target.checked);
 // setActiveStep2(true);
    
    };

  const [formState, setFormState] =useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });
  const [state1, setState1] = useState({
    vertical: "center",
    horizontal: "center",
  });
  const { vertical, horizontal } = state1;
  const handleChangeSwitchA = (event) => {
    setCheckedA(event.target.checked);
    //setState({ ...state, [event.target.name]: event.target.checked });
  };

 
  const [openaddproduct,setOpenaddproduct]=React.useState(false);

  const addNewProductOpen=()=>{
    setOpenaddproduct(true);
  }
  const addNewProductCancel=()=>{
    setOpenaddproduct(false);
    fetchProductList();
  }

  const ColorButtonAdd = withStyles((theme) => ({
    root: {
      borderRadius: "3px",
      //  paddingTop: '9%',
      //  paddingBottom: '9%',
      //marginTop:'3%',
      height: "100%",
      padding: "3px",
      width: "130px",
      fontSize: "11px",
      fontWeight: "550",
      color: "#fff",
      backgroundColor: "#0168fa",
      //  paddingLeft: '22%',
      //  paddingRight: '22%',
      "&:hover": {
        color: "#fff",
        backgroundColor: "#0168fa",
      },
    },
  }))(Button);
  // const myTextIcon = React.useRef(null);
  //Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  const tableIcons = {
    Add: () => (
      <ColorButtonAdd
        size="large"
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
      >
        Product
      </ColorButtonAdd>
    ),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
    CloudUpload: forwardRef((props, ref) => (
      <CloudUploadIcon {...props} ref={ref} />
    )),
  };

  

  const validate = {
    productsku: (s) => (s.length > 0 ? "" : "Sku id required"),
    productname: (s) => (s.length > 0 ? "" : "Product Name is required"),
    hscode: (s) => (s.length > 0 ? "" : "HS code is required"),
    itemvalue: (s) => (s.length > 0 ? "" : "Item Value is required"),
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
    validateInput: false,
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
    const change = (e) => {
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
    const change = (e) => {
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
    const change = (e) => {
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
    const change = (e) => {
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
    const change = (e) => {
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

  /**
   * Description:To do update internationalshipping value
   * @param {*} data
   */
  const handleChangeCheckboxInternational = (data) => {
    var str = data.itemvaluecurrency;
    var currency = str.slice(0, 1);
    var currencyvalue = str.slice(1, 5);
    console.log("data", data);
    updataExistsProduct(
      data.customproductId,
      data.productsku,
      data.productname,
      true,
      !data.internationalshipping,
      data.dangerousgoods,
      data.hscode,
      parseInt(currencyvalue),
      currency,
      data.itemquantity,
      data.packaging,
      userid
    );
  };

  /**
   * Description:To do update dangerous goods
   * @param {*} data
   */
  const handleChangeDangerousgood = (data) => {
    var str = data.itemvaluecurrency;
    var currency = str.slice(0, 1);
    var currencyvalue = str.slice(1, 5);
    console.log("data", data);
    updataExistsProduct(
      data.customproductId,
      data.productsku,
      data.productname,
      true,
      data.internationalshipping,
      !data.dangerousgoods,
      data.hscode,
      parseInt(currencyvalue),
      currency,
      data.itemquantity,
      data.packaging,
      userid
    );
  };

  const theme = useTheme();
  const [state, setState] = React.useState({
    column1FilterList: {},
    columns: [
      { title: "Assign Product Name", field: "productname", type: "text" },
      { title: "Assign Product SKU", field: "productsku", type: "text" },
      // { title: "Serial Number", field: "serialno", type: "text" },

      {
        title: "Ships International",
        field: "internationalshipping",
        type: "boolean",
        editComponent: props => (
          
          <FormControlLabel
            control={<Checkbox checked={props.value} 
            onChange={e =>handleChangequality(e,props)}
           // onChange={e => props.onChange(e.target.checked)}
            name="qualitycontrol" color="primary" />}
            value="1"
          />
        )
      
      },
      { title: "HS Code", field: "hscode", type: "text" , editComponent: props => (
        <View>
        {
          (() => {
            if(props.rowData!==undefined){
            if(props.rowData.internationalshipping===true)
            {
              return(
                <TextField 
                id="standard-basic" 
                  type="text"
                  value={props.value}
                  disabled={false}
                  onChange={e => props.onChange(e.target.value)}
                />
        )

      }
      else{
        return(
          <TextField 
          id="standard-basic" 
            type="text"
            value={props.value}
            disabled={true}
            onChange={e => props.onChange(e.target.value)}
          />
        )
      }
    }
    })()}
    </View>
      
      )},
      { title: "Item Value", field: "itemvalue", type: "numeric",editComponent: props => (
        <View>
        {
          (() => {
            if(props.rowData!==undefined){
            if(props.rowData.internationalshipping===true)
            {
              return(
                <TextField 
        id="standard-basic" 
          type="text"
          value={props.value}
          disabled={!activeStep1}
          onChange={e => props.onChange(e.target.value)}
        />
        )

      }
      else{
        return(
          <TextField 
          id="standard-basic" 
            type="text"
            value={props.value}
            disabled={true}
            onChange={e => props.onChange(e.target.value)}
          />
        )
      }
    }
    })()}
    </View>
       
      ) 
    },
      {
        title: "Dangerous Goods",
        field: "dangerousgoods",
        type: "boolean",
        
        editComponent: props => (
          <FormControlLabel
            control={<Checkbox checked={props.value} 
      //      onChange={e =>handleChangequality(e,props)}
            onChange={e => props.onChange(e.target.checked)}
            name="qualitycontrol" color="primary" />}
            value="1"
          />
        )


      },
      {
        title: "Serial Number",
        field: "serialno",
        type: "boolean",
        render: rowData =><FormControlLabel
         
        control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
        
      
         {(() => {
          if(rowData.serialno===true)
          {
            return(
              <Text style={{ fontSize: '11px', 
              fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
              transition : 'all 0.25s',}}>Yes</Text>
              )
            }
            else{
              return(
                <Text style={{ fontSize: '11px', 
                fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                transition : 'all 0.25s',}}>No</Text>
                )
            }
            })()}
        </Typography>}
        />,
        editComponent: props => (
          <FormControlLabel
            control={<Checkbox checked={props.value} 
      //      onChange={e =>handleChangequality(e,props)}
            onChange={e => props.onChange(e.target.checked)}
            name="qualitycontrol" color="primary" />}
            value="1"
          />
        )
  
  
      },
      {
        title: "Do Not Process",
        field: "isprocess",
        type: "boolean",
        render: rowData =><FormControlLabel
       
        control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
        
      
         {(() => {
          if(rowData.isprocess===true)
          {
            return(
              <Text style={{ fontSize: '11px', 
              fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
              transition : 'all 0.25s',}}>Product Deactivated</Text>
              )
            }
            else{
              return(
                <Text style={{ fontSize: '11px', 
                fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                transition : 'all 0.25s',}}></Text>
                )
            }
            })()}
        </Typography>}
        />,
        editComponent: props => (
          <FormControlLabel
            control={<Checkbox checked={props.value} 
      //      onChange={e =>handleChangequality(e,props)}
            onChange={e => props.onChange(e.target.checked)}
            name="qualitycontrol" color="primary" />}
            value="1"
          />
        )


      },
     
      {
        title: "Packaging",
        field: "packaging",
        lookup:packageData,
      
      },
      {
        title: "Promotional Inserts",
        field: "promotionalpackaging",
     

        lookup: promotionalData,
      },

     
    ],
    data: [
      
    ],
  });

  const column1FilterList = state.column1FilterList;
  React.useEffect(() => {
   // fetchProductList();

   for(let i=ids.length;i>0;i--){
    ids.splice(i, 1);
   }
   if(ids.length === 1){
    ids.splice(0, 1);
  }
   console.log("arrayempty",ids.length);
  }, []);
  const handleOpenFormPage = ()=>{
    setValue(2);
  }

  React.useEffect(() => {
    fetchPackingList(userid);
} ,[]);

const fetchPackingList = (userid)=>{

  setLoading(true);
 shiphypeservice.fetchCustomePachingAsc(userid,1,true)
 .then(response => {
  console.log("status",response.status);
       if(response.status === true) {
         setLoading(false);
         //setPackingdata(response.data);
         var packageDataPro11 = {};
         var data=response.data;
         data.map(orderCouierOp => {
             const { packaggingId, packaggingName } = orderCouierOp;
             packageDataPro11[ packaggingId ] = packaggingName
         })
         fetchPackageForPromotional(userid,packageDataPro11,data);
          
               console.log("packingdata",response.data);
                        }else{
                         setLoading(false);
                         console.log("message",response.message);
                        }   
           }).catch((error) =>{
                 console.error(error);
           });
          
}
const fetchPackageForPromotional = (userid,packageDataPro11,data11) => {

  var column1FilterList2 = state.column1FilterList2;
  setLoading(true);
  shiphypeservice.fetchCustomePachingAsc(userid,2,true)
        .then(response => {
         console.log("status",response.status);
              if(response.status === true) {
                setLoading(false);
              //setPromotionalPackage(response.data);
              var packageDataPro111 = {};
  var data1=response.data;
  data1.map(orderCouierOp => {
      const { packaggingId, packaggingName } = orderCouierOp;
      packageDataPro111[ packaggingId ] = packaggingName
  })

  setState({
    packageDataPro111,
  columns: [
    { title: "Assign Product Name", field: "productname", type: "text" },
    { title: "Assign Product SKU", field: "productsku", type: "text" },
    // { title: "Serial Number", field: "serialno", type: "text" },
    {
      title: "Ships International",
      field: "internationalshipping",
      type: "boolean",
      editComponent: props => (
        <FormControlLabel
          control={<Checkbox checked={props.value} 
          onChange={e =>handleChangequality(e,props)}
         // onChange={e => props.onChange(e.target.checked)}
          name="qualitycontrol" color="primary" />}
          value="1"
        />
      )
    
    },
    { title: "HS Code", field: "hscode", type: "text" , editComponent: props => (
      <View>
        {
          (() => {
            if(props.rowData!==undefined){
            if(props.rowData.internationalshipping===undefined)
            {
              return(
                <TextField 
                id="standard-basic" 
                  type="text"
                  value={props.value}
                  disabled={true}
                  onChange={e => props.onChange(e.target.value)}
                />
        )

      }
      else if(props.rowData.internationalshipping===false)
      {
        return(
          <TextField 
          id="standard-basic" 
            type="text"
            value={props.value}
            disabled={true}
            onChange={e => props.onChange(e.target.value)}
          />
  )

}
      else{
        return(
          <TextField 
          id="standard-basic" 
            type="text"
            value={props.value}
            disabled={false}
            onChange={e => props.onChange(e.target.value)}
          />
        )
      }
    }
    })()}
    </View>
      
      // <TextField 
      // id="standard-basic" 
      //   type="text"
      //   value={props.value}
      //   disabled={!activeStep1}
      //   onChange={e => props.onChange(e.target.value)}
      // />
    )},
    { title: "Item Value", field: "itemvalue", type: "numeric",editComponent: props => (
      // <TextField 
      // id="standard-basic" 
      //   type="text"
      //   value={props.value}
      //   disabled={!activeStep1}
      //   onChange={e => props.onChange(e.target.value)}
      // />
      <View>
      {
        (() => {
          if(props.rowData!==undefined){
          if(props.rowData.internationalshipping===undefined)
          {
            return(
              <TextField 
              id="standard-basic" 
                type="text"
                value={props.value}
                disabled={true}
                onChange={e => props.onChange(e.target.value)}
              />
      )

    }
    else if(props.rowData.internationalshipping===false)
          {
            return(
              <TextField 
              id="standard-basic" 
                type="text"
                value={props.value}
                disabled={true}
                onChange={e => props.onChange(e.target.value)}
              />
      )

    }
    else{
      return(
        <TextField 
        id="standard-basic" 
          type="text"
          value={props.value}
          disabled={false}
          onChange={e => props.onChange(e.target.value)}
        />
      )
    }
  }
  })()}
  </View>
    ) 
  },
    {
      title: "Dangerous Goods",
      field: "dangerousgoods",
      type: "boolean",
      
      editComponent: props => (
        <FormControlLabel
          control={<Checkbox checked={props.value} 
    //      onChange={e =>handleChangequality(e,props)}
          onChange={e => props.onChange(e.target.checked)}
          name="qualitycontrol" color="primary" />}
          value="1"
        />
      )


    },
    {
      title: "Serial Number",
      field: "serialno",
      type: "boolean",
      render: rowData =><FormControlLabel
       
      control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
      
    
       {(() => {
        if(rowData.serialno===true)
        {
          return(
            <Text style={{ fontSize: '11px', 
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            transition : 'all 0.25s',}}>Yes</Text>
            )
          }
          else{
            return(
              <Text style={{ fontSize: '11px', 
              fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
              transition : 'all 0.25s',}}>No</Text>
              )
          }
          })()}
      </Typography>}
      />,
      editComponent: props => (
        <FormControlLabel
          control={<Checkbox checked={props.value} 
    //      onChange={e =>handleChangequality(e,props)}
          onChange={e => props.onChange(e.target.checked)}
          name="qualitycontrol" color="primary" />}
          value="1"
        />
      )


    },
    {
      title: "Do Not Process",
      field: "isprocess",
      type: "boolean",
      render: rowData =><FormControlLabel
       
      control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
      
    
       {(() => {
        if(rowData.isprocess===true)
        {
          return(
            <Text style={{ fontSize: '11px', 
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            transition : 'all 0.25s',}}>Product Deactivated</Text>
            )
          }
          else{
            return(
              <Text style={{ fontSize: '11px', 
              fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
              transition : 'all 0.25s',}}></Text>
              )
          }
          })()}
      </Typography>}
      />,
      editComponent: props => (
        <FormControlLabel
          control={<Checkbox checked={props.value} 
    //      onChange={e =>handleChangequality(e,props)}
          onChange={e => props.onChange(e.target.checked)}
          name="qualitycontrol" color="primary" />}
          value="1"
        />
      )


    },
    {
      title: "Packaging",
      field: "packaging",
      lookup:packageDataPro11,
      editComponent: props => (
        <FormControl className={classes.formControl}>
        
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={(props.value===undefined ? valueofsouceid : props.value)}
          onChange={e =>handleChangeSource(e,props)}
        >
          <MenuItem value={0}>  
          Select Source</MenuItem>
        {data11.map(option => (
          <MenuItem value={option.packaggingId}>  
          {option.packaggingName}</MenuItem>
         
         ))}
         
        </Select>
      </FormControl>
      ),
     
    },
    {
      title: "Promotional Inserts",
      field: "promotionalpackaging",
   

      lookup: packageDataPro111,
      editComponent: props => (
        <FormControl className={classes.formControl}>
        
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={(props.value===undefined ? valueofprom : props.value)}
          onChange={e =>handleChangeSource(e,props)}
        >
          <MenuItem value={0}>  
          Select Source</MenuItem>
        {data1.map(option => (
          <MenuItem value={option.packaggingId}>  
          {option.packaggingName}</MenuItem>
         
         ))}
         
        </Select>
      </FormControl>
      ),
    },
  ],
  data: [
      
  ],

});

}else{
  setLoading(false);
  console.log("message",response.message);
 }
}).catch((error) =>{
console.error(error);
});
}
const handleChangeSource  = (event,props) =>{
  // setSorceId(event.target.value);
   //valueofsouceid=event.target.value;
  props.onChange(event.target.value);
};
  /**
   * Description:Callback function
   */
  useEffect(() => {
    
    const errors = validate1(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]
  );
  
  
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


 const handleCallbackfunction =()=>{
     if(value===2)
     {
         setValue(1);
     }
     else{
        props.handleDashboard('05');
     }
  
}
  
    const addArrangeShip =()=>{
        setLoading(true);
      
         const productname=formState.values.productname;
      const productsku=formState.values.productsku;
        //  const torontostock=formState.values.torontostock;
        //  const losangelesstock=formState.values.losangelesstock;
         const itemvalue=formState.values.itemvalue;
         const hscode=formState.values.hscode;
         const country=countryName;
         const noofpackages=packingPallet;
         const custo=customePack;
         const promo=promotioanlIn;
         const wahouseValue1=wahouseValue;
         shiphypeservice.addProductManually(productsku,productname,noofpackages,country,hscode,itemvalue,'USD',custo,userid,promo,wahouseValue1)
    .then(response => {
     console.log("status",response.status);
          if(response.status === true) {
            setOpen(true);
            setType('success');
            setMsg(response.message);
            setStatus(response.status);
            setLoading(false);
              
            addStepStatus();
                     }
                     else if(response.status === 400)
                     {
                      setOpen(true);
                      setType('error');
                      setMsg(response.title);
                      setStatus(response.status);
                      setLoading(false);
                        
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
               

                const handleChangeCountry = event => {
                    setChangeCountry(event.target.value);
                  };
                  const handleChangePromotional = event => {
                    setPromotioanlIn(event.target.value);
                  };
                  const handleChangeCustomePackaging = event => {
                    setCustomePack(event.target.value);
                  };
                  const handleChangePackingPallete = event => {
                    setPackingPallet(event.target.value);
                  };
                  const handleChangeWarehouse = event => {
                    setWarehouseValue(event.target.value);
                  };

  //    const handleClose = () => {
  //     setOpen(false);
  //   };
  //   const showToast =(open,msg,type)=>{ 
   
  //     return(
  //   <Toast
  //    open={open}
  //    handleClose={handleClose}
  //    type={type}
  //    msg={msg}
  //   />
  //  )
  //   }

    const fetchProductList = () => {
      //const userid=5;
      setLoading(true);
      shiphypeservice
        .fetchProductList(userid)
        .then((response) => {
          console.log("status", response.status);
          if (response.status === true) {
            setLoading(false);
            setDataProduct(response.data);
          } else {
            setLoading(false);
            console.log("message", response.message);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };

  
    const deleteProduct = (customproduct_id,oldData) => {
      setLoading(true);
      var pushds=[];
pushds.push(customproduct_id);

      shiphypeservice
        .deleteProduct(pushds)
        .then((response) => {
          console.log("status", response.status);
          if (response.status === true) {
            setLoading(false);
            setState((prevState) => {
              const data = [...prevState.data];
              data.splice(data.indexOf(oldData), 1);
              ids.splice(data.indexOf(oldData), 1);
              return { ...prevState, data };
            });
           
            //fetchProductList();
          } else {
            setLoading(false);
            console.log("message", response.message);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
  
    
  
    const addNewProduct = (
      productsku,
      serialno,
      productname,
      domesticshipping,
      internationalshipping,
      dangerousgoods,
      isprocess,
      hscode,
      itemvalue,
      itemcurrency,
      itemquantity,
      packaging,
      userid,
      promotionalPackage,
      warehouseid,newData
    ) => {

      if(isprocess===undefined)
    {
      isprocess=false;
    }
    if(serialno===undefined)
    {
      serialno=false;
    }
     if(packaging === undefined){
      // setOpen2(true);
      packaging=valueofsouceid;
    }
   if(promotionalPackage === undefined){
    promotionalPackage=valueofprom;
   }


      if (productsku === undefined) {
        setOpen1(true);
      } 
    else if(packaging === 0){
      setOpen2(true);
     //packaging=valueofsouceid;
   }else if(promotionalPackage === 0){
    setOpen3(true);
   }
   else  if(productname === undefined){
    setOpenProductName(true);
   //packaging=valueofsouceid;
 }
      else
      if(internationalshipping===true)
      {
        if(hscode === undefined ){
          setOpen11(true);
        }
        else if(itemvalue === undefined)
        {
          setOpen11(true);
        }
        else if(hscode === null ){
          setOpen11(true);
        }
        else if(itemvalue === null)
        {
          setOpen11(true);
        }
        else{
          setLoading(true);
          shiphypeservice
            .addProduct(

              productsku,
              productname,
              domesticshipping,
              internationalshipping,
              dangerousgoods,
              hscode,
              itemvalue,
              itemcurrency,
              itemquantity,
              packaging,
              userid,
              promotionalPackage,
              warehouseid,
              isprocess,
              serialno
            )
            .then((response) => {
              console.log("status", response.status);
              if (response.status === true) {
                setOpen(true);
                setType("success");
                setMsg(response.message);
                setStatus(response.status);
                setLoading(false);
                ids.push(response.data);
                console.log("arraylenght",ids.length);
                setState((prevState) => {
                  const data = [...prevState.data];
                  if(newData.packaging===undefined)
                  {
                    newData.packaging= valueofsouceid;
                  }
                  if(newData.promotionalpackaging === undefined){
                    newData.promotionalpackaging=valueofprom;
                  }
                  data.push(newData);
                  return { ...prevState, data };
                });
               // fetchProductList();
              } else if (response.status === 400) {
                setOpen(true);
                setType("error");
                setMsg(response.title);
                setStatus(response.status);
                setLoading(false);
              } else {
                setOpen(true);
                setType("error");
                setMsg(response.message);
                setStatus(response.status);
                setLoading(false);
                console.log("message", response.message);
              }
            })
            .catch((error) => {
              console.error(error);
            });
        }
      } 
      else {
        setLoading(true);
        shiphypeservice
          .addProduct(
            productsku,
            productname,
            domesticshipping,
            internationalshipping,
            dangerousgoods,
            hscode,
            itemvalue,
            itemcurrency,
            itemquantity,
            packaging,
            userid,
            promotionalPackage,
            warehouseid,
            isprocess,
            serialno
          )
          .then((response) => {
            console.log("status", response.status);
            if (response.status === true) {
              setOpen(true);
              setType("success");
              setMsg(response.message);
              setStatus(response.status);
              setLoading(false);
              ids.push(response.data);
              console.log("arraylenght",ids.length);
              setState((prevState) => {
                const data = [...prevState.data];
                if(newData.packaging===undefined)
                  {
                    newData.packaging= valueofsouceid;
                  }
                  if(newData.promotionalpackaging === undefined){
                    newData.promotionalpackaging=valueofprom;
                  }
                data.push(newData);
                return { ...prevState, data };
              });
             // fetchProductList();
            } else if (response.status === 400) {
              setOpen(true);
              setType("error");
              setMsg(response.title);
              setStatus(response.status);
              setLoading(false);
            } else {
              setOpen(true);
              setType("error");
              setMsg(response.message);
              setStatus(response.status);
              setLoading(false);
              console.log("message", response.message);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    };
  
    const updataExistsProduct = (
      customproduct_id,
      productsku,
      serialno,
      productname,
      domesticshipping,
      internationalshipping,
      dangerousgoods,
      isprocess,
      hscode,
      itemvalue,
      itemcurrency,
      itemquantity,
      packaging,
      userid,
      promotional,warehouseid,newData,oldData
    ) => {

      if(isprocess===undefined)
    {
      isprocess=false;
    }
    if(serialno===undefined)
    {
      serialno=false;
    }

      console.log("arrayvalue12",ids.length);
      if (productsku === undefined) {
        setOpen1(true);
      } 
      else  if(packaging === 0){
        setOpen2(true);
       //packaging=valueofsouceid;
     }else if(promotional === 0){
      setOpen3(true);
     }
     else  if(productname === ''){
      setOpenProductName(true);
     //packaging=valueofsouceid;
   }
      else
      if(internationalshipping===true)
      {
        if(hscode === undefined ){
          setOpen11(true);
        }
        else if(itemvalue === undefined)
        {
          setOpen11(true);
        }
        else if(hscode === null ){
          setOpen11(true);
        }
        else if(itemvalue === null)
        {
          setOpen11(true);
        }
        else{
          setLoading(true);
      shiphypeservice
        .updateProduct(
          customproduct_id,
          productsku,
          productname,
          domesticshipping,
          internationalshipping,
          dangerousgoods,
          hscode,
          itemvalue,
          itemcurrency,
          itemquantity,
          packaging,
          userid,
          promotional,warehouseid,isprocess,
          serialno
        )
        .then((response) => {
          console.log("status", response.status);
          if (response.status === true) {
            setOpen(true);
            setType("success");
            setMsg(response.message);
            setStatus(response.status);
            setLoading(false);
  
            setState((prevState) => {
              const data = [...prevState.data];
              data[data.indexOf(oldData)] = newData;
              return { ...prevState, data };
            });
            //fetchProductList();
          } else {
            setOpen(true);
            setType("success");
            setMsg(response.message);
            setStatus(response.status);
            setLoading(false);
            console.log("message", response.message);
          }
        })
        .catch((error) => {
          console.error(error);
        });
        }
      }
      else{
        setLoading(true);
        shiphypeservice
          .updateProduct(
            customproduct_id,
            productsku,
            productname,
            domesticshipping,
            internationalshipping,
            dangerousgoods,
            hscode,
            itemvalue,
            itemcurrency,
            itemquantity,
            packaging,
            userid,
            promotional,warehouseid,isprocess,serialno
          )
          .then((response) => {
            console.log("status", response.status);
            if (response.status === true) {
              setOpen(true);
              setType("success");
              setMsg(response.message);
              setStatus(response.status);
              setLoading(false);
    
              setState((prevState) => {
                const data = [...prevState.data];
                data[data.indexOf(oldData)] = newData;
                return { ...prevState, data };
              });
              //fetchProductList();
            } else {
              setOpen(true);
              setType("success");
              setMsg(response.message);
              setStatus(response.status);
              setLoading(false);
              console.log("message", response.message);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
      
    };
    const handleClose = () => {
      setOpen(false);
    };
    const showToast = (open, msg, type) => {
      return (
        <Toast open={open} handleClose={handleClose} type={type} msg={msg} />
      );
    };

    const handleCaptureInvoice = (event) => {
      const target=event.target;
      const fileReader = new FileReader();
      const file=target.files[0];
      var formData =  new FormData();
      if(file.type==='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
      {
        ExcelRenderer(file, (err, resp) => {
          if(err){
            console.log(err);            
          }
          else{
            shiphypeservice.uploadProductSheet(resp.rows,userid)
        .then(response => {
         console.log("status",response.status);
              if(response.status === true) {
                  console.log('done');
                  setOpen(true);
                  setType('success');
                  setMsg(response.message);
                  setStatus(response.status);
                  setLoading(false);
                         }else{
                          console.log("message",response.message);
                          setOpen(true);
                          setType('error');
                          setMsg(response.message);
                          setStatus(response.status);
                          setLoading(false);
                         }   
            }).catch((error) =>{
                  console.error(error);
            });
            console.log(resp);
          }
        });     
      }
  else if(file.type==='application/vnd.ms-excel')
  {
    ExcelRenderer(file, (err, resp) => {
      if(err){
        console.log(err);            
      }
      else{
       
      
        shiphypeservice.uploadProductSheet(resp.rows,userid)
    .then(response => {
     console.log("status",response.status);
          if(response.status === true) {
              console.log('done');
              setOpen(true);
              setType('success');
              setMsg(response.message);
              setStatus(response.status);
              setLoading(false);
                     }else{
                      console.log("message",response.message);
                      setOpen(true);
                      setType('error');
                      setMsg(response.message);
                      setStatus(response.status);
                      setLoading(false);
                     }   
        }).catch((error) =>{
              console.error(error);
        });
        console.log(resp);
      }
    });     
  }
  else{

    setOpen(true);
    setType('error');
    setMsg('File Type is Invaild');
    setStatus(false);
    setLoading(false);


  }

             
    
    
     
   
    };

const addStepStatus =()=>{
  setLoading(true);
  
 // const userid=user_id;
  const shiphypesubsubstepId=8;
  const shiphypesubstepId=0;
  const shiphypestepId=0;
  shiphypeservice.addUserStepDoneSofar(userid,shiphypesubsubstepId,shiphypesubstepId,shiphypestepId)
        .then(response => {
         console.log("status",response.status);
              if(response.status === true) {
                setLoading(false);
                props.handleDashboard('05');
                         }else{
                          setLoading(false);
                          console.log("message",response.message);
                         }   
            }).catch((error) =>{
                  console.error(error);
            });
          }


                    const hasError = field =>
                    formState.touched[field] && formState.errors[field] ? true : false;
          let screenWidth = Dimensions.get('window').width;

    return (  
      <View className={classes.content}>
    <View className={classes.appBarSpacer} />
    
    {(() => {
            if (value === 1) {
              return (
                <View >
                <Grid item  container lg={12}  >
                <Grid item  lg={5}  style={popUpStyle.breadCrumSidePadding} >
                <Link  onClick={()=>{props.handleDashboard('01')}}>
                <Text style={popUpStyle.breadCrundCss1}>DASHBOARD
                </Text></Link>
                <Text style={popUpStyle.breadCrundCss}> / PRODUCTS /</Text>
              <Text style={popUpStyle.breadCrundCss2}> ADD PRODUCTS {'\n'} </Text> 
              
                  </Grid>
                  <Grid item  lg={2} ></Grid>
                 
                  </Grid>
                  </View>  
                );
            }
          })()}

{(() => {
            if (value === 2) {
              return (
                <View >
                <Grid item  container lg={12}  >
                <Grid item  lg={5}  style={popUpStyle.breadCrumSidePadding} >
                <Link  onClick={()=>{props.handleDashboard('01')}}>
                <Text style={popUpStyle.breadCrundCss1}>DASHBOARD
                </Text></Link>
                <Text style={popUpStyle.breadCrundCss}> / PRODUCTS / ADD PRODUCTS /</Text>
              <Text style={popUpStyle.breadCrundCss2}> ADD PRODUCTS MANUALLY {'\n'} </Text> 
              
                  </Grid>
                  <Grid item  lg={2} ></Grid>
                 
                  </Grid>
                  </View>  
                );
            }
          })()}

    <Grid justify="center">
            <ProgressBar 
             loading={loading}
            />
            </Grid>
        

         {/* <ScrollView> */}
         <View >
         <View style={popUpStyle.paddingSide}>
       

         <Grid container justify="space-between" spacing={2}>
            <Grid item xs={12} md={7} lg={7}>
            <Text style={{ fontSize: '15px',
            //fontWeight: '700',
            // marginLeft:'10px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}}>
              
              {/* Please provide the pickup address and shipment details for your shipment: */}
              </Text>
              </Grid>
              <Grid item xs={12} md={1} lg={1} ></Grid>
              <Grid item xs={12} md={4} lg={4} 
              //style={{marginRight:'70px'},} 
               >
  
              <Grid container item  justify="flex-end">

              <Grid>
              <ColorButton1
       size='large'
       variant="contained"
       color="primary"
      // className={classes.profileMargin}
       onClick={()=>{handleCallbackfunction()}}
       >
          Back
       </ColorButton1>
    
              </Grid>
            
              </Grid>
            
            
              </Grid>
              </Grid>
              {(() => {
            if (value === 1) {
              return (
<form className={classes.form}>
         <Grid container   justify="center" >

        
       
        <Grid  items xs={12} lg={12}>
        <Grid justify="center" // Add it here :)
      container>
       
        <ColorButton2
    size='large'
    variant="contained"
    color="primary"
    className={classes.profileMargin}
    onClick={()=>{handleOpenFormPage()}}
  
    //onClick={()=>{navigation.navigate('Dashboard')}}
  >
    Add Products Manually
     {/* {language.copyandsaveobject} */}
  
  </ColorButton2>
         
          </Grid>
      
        </Grid>
        <Grid  items xs={12} lg={12}>
        <Grid justify="center" // Add it here :)
      container>
      <form id="createForm" name="createForm" novalidate enctype="multipart/form-data">
      <ColorButton4
   size='large'
   variant="contained"
   component="label"
   color="primary"
   className={classes.profileMargin}
   startIcon={<CloudUploadIcon />}
  >
    Upload Product Sheet
    <input
    type="file"
    onChange={handleCaptureInvoice}
    style={{ display: "none" }}
  />
     {/* {language.copyandsaveobject} */}
  
  </ColorButton4>
         </form>
          </Grid>
      
        </Grid>
        <Grid  items xs={12} lg={12} style={{marginTop:'10px'}}>
        <Grid justify="center" // Add it here :)
      container>
      <form id="createForm" name="createForm" novalidate enctype="multipart/form-data">
      <a href={ProductImport} download> Download Sample Sheet</a>
         </form>
          </Grid>
      
        </Grid>
       <Grid items xs={12} lg={12}>
       <Grid  justify="flex-end" // Add it here :)
 container 
 spacing={24} >
   <Grid items >
         
       </Grid>


     
       </Grid>


       </Grid>
     
      </Grid>
        

           </form>
                );
            }
          })()}
              {(() => {
            if (value === 2) {
              return (
                <form className={classes.form}>
                        {openaddproduct === false ? (
              " "
            ) : (
              <NewProductAdd
                openaddproduct={openaddproduct}
                userid={userid}
                addNewProductCancel={addNewProductCancel}
              />
            )}
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            key={`${vertical},${horizontal}`}
            open={open1}
            autoHideDuration={3000}
            onClose={handleClose3}
          >
            <Alert onClose={handleClose3} severity="error">
              Product SKU must be filled.
            </Alert>
          </Snackbar>
          
          <form className={classes.form}>
            <Grid container className={classes.root} spacing={1}>
              <Grid item xs={12} lg={12}>
                {/* <ScrollView> */}
                <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            key={`${vertical},${horizontal}`}
            open={open11}
            autoHideDuration={3000}
            onClose={handleClose31}
          >
            <Alert onClose={handleClose31} severity="error">
              H.S. Code and Item value must be for items shipping international.
            </Alert>
          </Snackbar>
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            key={`${vertical},${horizontal}`}
            open={open2}
            autoHideDuration={3000}
            onClose={handleClose4}
          >
            <Alert onClose={handleClose4} severity="error">
            Custom Packaging must be selected.
            </Alert>
          </Snackbar>
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            key={`${vertical},${horizontal}`}
            open={open3}
            autoHideDuration={3000}
            onClose={handleClose5}
          >
            <Alert onClose={handleClose5} severity="error">
            Promotional must be selected.
            </Alert>
          </Snackbar>
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            key={`${vertical},${horizontal}`}
            open={openProductName}
            autoHideDuration={3000}
            onClose={handleCloseProductName}
          >
            <Alert onClose={handleCloseProductName} severity="error">
            Product Name must be filled.
            </Alert>
          </Snackbar>
                <View>
                  <MaterialTable
                  style={{ padding: "0px",marginTop: '10px'}}
                    title={
                      <Text
                        style={{
                          fontSize: "13px",
                          fontWeight: "700",
                          fontFamily:
                            '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                          color: "#001737",

                          transition: "all 0.25s",
                        }}
                      >
                        Add Products Manually
                      </Text>
                    }
                    columns={state.columns}
                    data={state.data}
                    icons={tableIcons}
                    components={{
                      Container: (props) => <Paper {...props} elevation={0} />,
                      Toolbar: (props) => <StyledMTableToolbar {...props} />,
                    }}
                    localization={{
                      toolbar: {
                        searchPlaceholder: "Search Products",
                      },
                      header: {
                        actions: "ACTION",
                      },
                    }}

                    options={{
                      paging: false,
                      maxBodyHeight: "55vh",
                      headerStyle: { position: "sticky", top: 0 },
                      actionsColumnIndex: -1,
                      doubleHorizontalScroll: true,
                      pageSize: 10,
                      pageSizeOptions: [10, 20, 30, 40, 50],
                      exportFileName: "Product Table",
                      addRowPosition: "first",
                      doubleHorizontalScroll: true,

                      headerStyle: {
                        backgroundColor: "#cccccc",
                        color: "#000",

                        width: 26,
                        whiteSpace: "nowrap",
                        textAlign: "left",
                        flexDirection: "row",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontSize: "12px",
                        paddingLeft: 5,
                        paddingTop: 8,
                        paddingBottom: 8,
                        textTransform: "uppercase",
                        paddingRight: 0,
                        //     backgroundColor: theme.palette.primary.table,
                        fontWeight: "bold",
                        //color: theme.palette.primary.main,
                      },
                      cellStyle: {
                        backgroundColor: "#fff",
                        color: "#000",
                        border: "1px solid #cccccc",

                        width: 26,
                        whiteSpace: "nowrap",
                        textAlign: "left",
                        flexDirection: "row",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontSize: "11px",
                        paddingLeft: 12,
                        paddingTop: 0,
                        paddingBottom: 0,
                        paddingRight: 0,
                      },
                      rowStyle: {
                        backgroundColor: "#fff",
                        color: "#000",
                        border: "1px solid #cccccc",

                        width: 26,
                        whiteSpace: "nowrap",
                        textAlign: "left",
                        flexDirection: "row",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        paddingLeft: 0,
                        paddingTop: 0,
                        paddingBottom: 0,
                        paddingRight: 0,
                      },
                      search: false,
                      exportButton: false,
                    }}
                    editable={{
                      onRowAdd: (newData) =>
                        new Promise((resolve, reject) => {
                          setTimeout(() => {
                            {
                             
                            //  if(newData.packaging === undefined){
                            //   setOpen(true);
                            // setType("error");
                            // setMsg(
                            //   "Packaging must be selected"
                            // );
                            // reject();


                            // return;
                            //  }else{
                            //   console.log("sku", newData.productsku);
                            //   console.log("name", newData.productname);
                            //   var str = newData.itemvaluecurrency;
                            //   var currency = "USD";
                            //   var currencyvalue = newData.itemvalue;
                            //   console.log("currency", currency);
                            //   console.log("currencyvalue", currencyvalue);
                             
                            //   addNewProduct(
                            //     newData.productsku,
                            //     newData.serialno,
                            //     newData.productname,
                            //     true,
                            //     newData.internationalshipping,
                            //     newData.dangerousgoods,
                            //     newData.isprocess,
                            //     newData.hscode,
                            //     currencyvalue,
                            //     currency,
                            //     0,
                            //     newData.packaging,
                            //     userid,
                            //     newData.promotionalpackaging,
                            //     newData.warehouseid,newData
                            //   );
                            //  }
                            var str = newData.itemvaluecurrency;
                              var currency = "USD";
                               var currencyvalue = newData.itemvalue;
                               console.log("currency", currency);
                               console.log("currencyvalue", currencyvalue);
                             
                              addNewProduct(
                                newData.productsku,
                                newData.serialno,
                                newData.productname,
                                true,
                                newData.internationalshipping,
                                newData.dangerousgoods,
                                newData.isprocess,
                                newData.hscode,
                                currencyvalue,
                                currency,
                                0,
                                newData.packaging,
                                userid,
                                newData.promotionalpackaging,
                                newData.warehouseid,newData
                              );
                            }

                           
                            resolve();
                            
                          }, 1000);
                        }),
                      onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                          setTimeout(() => {
                            {
                           

                          //  if(newData.packaging === undefined){
                          //   setOpen(true);
                          //   setType("error");
                          //   setMsg(
                          //     "Packaging must be selected."
                          //   );
                          //   reject();
                          //   return;
                          //  }else{
                          //    const dataup=state.data;
                          //     const index = dataup.indexOf(oldData);
                          //     // data[index] = newData;
                          //     // setState({ data }, () => resolve());

                          //     const customproduct_id =ids[index];
                          //       //dataproduct[index].customproductId;


                          //     console.log("sku", newData.productsku);
                          //     console.log("name", newData.productname);
                          //     console.log("customproduct_id", ids[index]);
                          //     console.log("arrayvalue",ids.length);
                          //     console.log("index", index);
                          //     var str = newData.itemvaluecurrency;
                          //     var currency = "USD";
                          //     var currencyvalue = newData.itemvalue;
                          //     console.log("currency", currency);
                          //     console.log("currencyvalue", currencyvalue);
                          //     updataExistsProduct(
                          //       customproduct_id,
                          //       newData.productsku,
                          //       newData.serialno,
                          //       newData.productname,
                          //       true,
                          //       newData.internationalshipping,
                          //       newData.dangerousgoods,
                          //       newData.isprocess,
                          //       newData.hscode,
                          //       currencyvalue,
                          //       currency,
                          //       0,
                          //       newData.packaging,
                          //       userid,
                          //       newData.promotionalpackaging,
                          //       newData.warehouseid,newData,oldData
                          //     );
                          //  }
                           const dataup=state.data;
                              const index = dataup.indexOf(oldData);
                              // data[index] = newData;
                              // setState({ data }, () => resolve());

                              const customproduct_id =ids[index];
                                //dataproduct[index].customproductId;


                              console.log("sku", newData.productsku);
                              console.log("name", newData.productname);
                              console.log("customproduct_id", ids[index]);
                              console.log("arrayvalue",ids.length);
                              console.log("index", index);
                              var str = newData.itemvaluecurrency;
                              var currency = "USD";
                              var currencyvalue = newData.itemvalue;
                              console.log("currency", currency);
                              console.log("currencyvalue", currencyvalue);
                              updataExistsProduct(
                                customproduct_id,
                                newData.productsku,
                                newData.serialno,
                                newData.productname,
                                true,
                                newData.internationalshipping,
                                newData.dangerousgoods,
                                newData.isprocess,
                                newData.hscode,
                                currencyvalue,
                                currency,
                                0,
                                newData.packaging,
                                userid,
                                newData.promotionalpackaging,
                                newData.warehouseid,newData,oldData
                              );
                            }
                            resolve();
                          }, 1000);
                        }),
                      onRowDelete: (oldData) =>
                        new Promise((resolve, reject) => {
                          setTimeout(() => {
                            {
                             // const data = dataproduct;
                              const dataup=state.data;
                              const index = dataup.indexOf(oldData);
                              const customproduct_id =ids[index];
                             
                              deleteProduct(customproduct_id,oldData);
                            }
                            resolve();
                          }, 1000);
                        }),
                    }}
                  />
               
                </View>
                {/* </ScrollView> */}
              </Grid>
            </Grid>
          </form></form>
       
                );
            }
          })()}
        
  {showToast(open,msg,type)}
        </View>
       
         
           </View>
        </View>
    );
  }
