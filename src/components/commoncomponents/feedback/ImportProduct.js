import React, { useState, useEffect } from "react";
import {
  fade,
  withStyles,
  makeStyles,
  useTheme,
} from "@material-ui/core/styles";
import {
  Platform,
  View,
  ScrollView,
  Image,
  Text,
  Dimensions,
} from "react-native";

import Checkbox from '@material-ui/core/Checkbox';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import PropTypes from "prop-types";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import Stepper from "@material-ui/core/Stepper";
import StepConnector from "@material-ui/core/StepConnector";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import InputBase from "@material-ui/core/InputBase";
import StepButton from "@material-ui/core/StepButton";
import style from "../../usermanagement/style/style";
import AddBoxIcon from "@material-ui/icons/AddBox";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import * as shiphypeservice from "../ShipService/shiphype_service";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import MaterialTable, { MTableToolbar } from "material-table";
import { forwardRef } from "react";
import Paper from "@material-ui/core/Paper";
import Toast from "./Toast";
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
import ProgressBar from "./ProgressBar";
import AddIcon from "@material-ui/icons/Add";
import popStyle from ".././style/popUpStyle";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import NewProductAdd from './NewProductAdd';
import Select from '@material-ui/core/Select';

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: "calc(-52% + 16px)",
    right: "calc(48% + 16px)",
  },
  line: {
    borderColor: "#3f51b5",
    borderTopWidth: 2,
    borderRadius: 1,
  },
})(StepConnector);

const data = [
  {
    productid: "LS-0001",
    productname: "Touch screen apple iphone",
    sellingprice: "$18",
    shipinternational: "yes",
    hscode: "FS008",
    packing: "Corrugated Box",
  },
  {
    productid: "LS-0002",
    productname: "Battery for apple iphone",
    sellingprice: "$19",
    shipinternational: "no",
    hscode: "FS009",
    packing: "Polly Bubble Mailer",
  },
];

const packageingType = [
  {
    value: "w2",
    label: "Corrugated Box",
  },
  {
    value: "w3",
    label: "Poly Bubble Mailer",
  },
];

 const AntSwitch = withStyles((theme) => ({
  root: {
    // width: 48,
    // height: 26,
    // padding: 0,
    display: 'flex',
    //background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    background: theme.palette.primary.main,
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
        borderColor: theme.palette.primary.main,
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

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "0px solid #ced4da",
    fontSize: 15,
    padding: "2px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 0,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(0, 0, 0),
    borderRadius: 0,
  },
  textArea: {
    marginTop: theme.spacing(0),
    borderRadius: 0,
  },
  profileMargin: {
    marginTop: theme.spacing(2),
    borderRadius: 0,
  },
  paper: {
    border: "2px solid #ced4da",
    height: 100,
    width: 100,
  },
  root: {
    //flexGrow: 1,
    width: "100%",
  },
  profileMargin10: {},

  // grid: {
  //   width: 100,
  //   height: 100,
  // },
}));

/****   For changing the textfield radius  : End *********/
const styles = (theme) => ({
  root: {
    "@media print": {
      margin: 0,
      padding: theme.spacing(1),
      borderRadius: 0,
    },
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: "-2px",
    color: theme.palette.grey[500],
  },
});
//Make custom button
const ColorButton = withStyles((theme) => ({
  root: {
    color: "#fff",
    borderRadius: "3px",
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    height: "60%",
    width: "90px",
    fontSize: "11px",
    fontWeight: "550",
    color: "#fff",
    backgroundColor: "#0168fa",
    "&:hover": {
      backgroundColor: "#002080",
    },
  },
}))(Button);

const StyledMTableToolbar = withStyles({
  root: {
    paddingLeft: 0,
    paddingRight: 0,
  },
})(MTableToolbar);

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      {onClose ? (
        <Grid container item xs={10} justify="flex-end">
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={props.onClose}
          >
            <CloseIcon />
          </IconButton>
        </Grid>
      ) : null}
      <Grid item container xs={12} lg={12}>
     
      </Grid>{" "}
    </MuiDialogTitle>
  );
});

/**
 * Description:To do show step of task
 */
function getSteps() {
  return [
    "Marketplace Integration",
    "Shipping Profile",
    "Return Settings",
    "Import Products",
    "Import Customers",
  ];
}
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
  const { openImportProduct } = props;
  const userid = props.user_id;
  const promotionalData = props.promotionalData;
  const packageData=props.packageData;
  const customePackageFirstId=props.customePackageFirstId;
  const [activeStep, setActiveStep] = React.useState(3);
  const steps = getSteps();
  const [dataproduct, setDataProduct] = React.useState([]);
  const [status, setStatus] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [open1, setOpen1] = React.useState(false);
  const [open11, setOpen11] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  var valueofsouceid=3;
  const [state1, setState1] = useState({
    vertical: "top",
    horizontal: "center",
  });
 let activeStep1=false;
  const handleChangequality = (event,props) => {
   activeStep1=event.target.checked;
  props.onChange(event.target.checked);
    };

  const { vertical, horizontal } = state1;
  const [type, setType] = React.useState("");


 
  const [openaddproduct,setOpenaddproduct]=React.useState(false);

  const addNewProductCancel=()=>{
    setOpenaddproduct(false);
    fetchProductList();
  }

  const ColorButtonAdd = withStyles((theme) => ({
    root: {
      borderRadius: "3px",
      height: "100%",
      padding: "3px",
      width: "130px",
      fontSize: "11px",
      fontWeight: "550",
      color: "#fff",
      backgroundColor: "#0168fa",
      "&:hover": {
        color: "#fff",
        backgroundColor: "#0168fa",
      },
    },
  }))(Button);
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

 

  

  const theme = useTheme();
  const [state, setState] = React.useState({
    column1FilterList: {},
    columns: [
      { title: "Assign Product Name", field: "productname", type: "text" , width: 50},
      { title: "Assign Product SKU", field: "productsku", type: "text" , width: 50},
      // { title: "Serial Number", field: "serialno", type: "text" },

      {
        title: "Ships International",
        field: "internationalshipping",
        type: "boolean",width: 50,
        render: rowData =><FormControlLabel
        
      //  onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
       // className={classes.quantitycss}
        control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
        
        
         {(() => {
          if(rowData.internationalshipping===true)
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
            onChange={e =>handleChangequality(e,props)}
           // onChange={e => props.onChange(e.target.checked)}
            name="qualitycontrol" color="primary" />}
            value="1"
          />
        )
      },
      { title: "HS Code", field: "hscode", type: "text" , width: 50, editComponent: props => (
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
      )},
      { title: "Item Value", field: "itemvalue", type: "numeric", width: 50,editComponent: props => (
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
        type: "boolean", width: 50,
        render: rowData =><FormControlLabel
       
       control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
       fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
       
     
        {(() => {
         if(rowData.dangerousgoods===true)
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
        type: "boolean", width: 50,
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
        field: "packaging", width: 50,

        lookup:packageData
        //lookup: { 1: 'Envelope', 2: 'Courier Bags' ,3:'Poly Bubble Mailer',4:'Corrugated Box',5:'Corrugated Box (Heavy Duty)',6:'Corrugated Box (Cube)'},

      },
      {
        title: "Promotional Inserts",
        field: "promotionalpackaging",
        lookup: promotionalData, width: 50
      },

    ],
    data: [
      
    ],
  });
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
    var pushds=[];
pushds.push(customproduct_id);
    setLoading(true);
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

  const handleClose31 = () => {
    setOpen11(false);
    // handleNextPage(22);
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

    if (productsku === undefined) {
      setOpen1(true);
    } 
    // else if(packaging === undefined){
    //   // setOpen2(true);
    //   packaging=valueofsouceid;
    // }
    else if(productname === undefined){
      setOpen3(true);
    }
    else  if(packaging === 0){
      setOpen2(true);
     //packaging=valueofsouceid;
   }
   
   else if(internationalshipping===true)
    {
      if(hscode === undefined || itemvalue === undefined){
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
          isprocess,serialno
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
              data.push(newData);
              return { ...prevState, data };
            });
           // fetchProductList();
          } else if (response.status === 400) {
            setOpen(true);
            setType("success");
            setMsg(response.title);
            setStatus(response.status);
            setLoading(false);
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
          isprocess,serialno
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
              data.push(newData);
              return { ...prevState, data };
            });
           // fetchProductList();
          } else if (response.status === 400) {
            setOpen(true);
            setType("success");
            setMsg(response.title);
            setStatus(response.status);
            setLoading(false);
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
    else if(packaging === undefined){
      // setOpen2(true);
      packaging=valueofsouceid;
    }
    else  if(packaging === 0){
      setOpen2(true);
     //packaging=valueofsouceid;
   }
   else  if(productname === ''){
    setOpen3(true);
   //packaging=valueofsouceid;
 }

   else if(internationalshipping===true)
    {
      if(hscode === undefined || itemvalue === undefined){
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
            promotional,warehouseid,
            isprocess,serialno
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
          promotional,warehouseid,
          isprocess,serialno
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

  
  /*
   * Description:To do close poup after successfully create sprint and on click cancel button
   * @param {*} issprintCreate
   */
  const handleClose1 = (isSprintCreate) => {
    props.handleSprintCancel(isSprintCreate);
  };

  const addStepStatus = () => {
    // if (dataproduct.length > 0 && dataproduct.length < 2) {
      // const userid=user_id;
      // const shiphypesubsubstepId = 8;
      // const shiphypesubstepId = 0;
      // const shiphypestepId = 0;
      // setLoading(true);
      // shiphypeservice
      //   .addUserStepDoneSofar(
      //     userid,
      //     shiphypesubsubstepId,
      //     shiphypesubstepId,
      //     shiphypestepId
      //   )
      //   .then((response) => {
      //     console.log("status", response.status);
      //     if (response.status === true) {
      //       setLoading(false);
            handleNextPage(13);
        //   } else {
        //     setLoading(false);
        //     console.log("message", response.message);
        //   }
        // })
        // .catch((error) => {
        //   console.error(error);
        // });
    // } else {
    //   handleNextPage(13);
    // }
  };

  /**
   * Description:To do call function on next button
   * @param {*} isSprintCreate
   */
  const handleNextPage = (isSprintCreate) => {
    props.handleNextPage(isSprintCreate);
    //props.handleNext(isSprintCreate);
  };
  /**
   * Description:To do call function on back button
   * @param {*} isSprintCreate
   */
  const handlePreviousPage = (isSprintCreate) => {
    props.handlePreviousPage(isSprintCreate);
    //props.handleNext(isSprintCreate);
  };

  /**
   *
   */
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


  let screenWidth = Dimensions.get("window").width;
  const handleStepClick = (index) => {
    console.log("indexprint", index);

    if (index === 0) {
      props.handleStepPage(1);
    } else if (index === 1) {
      props.handleStepPage(2);
    } else if (index === 2) {
      props.handleStepPage(3);
    } else if (index === 3) {
      props.handleStepPage(4);
    } else if (index === 4) {
      props.handleStepPage(5);
    }
    else if (index === 5) {
      props.handleStepPage(6);
    }
  };

  return (
    <View>
      <Dialog
        maxWidth="xl"
        fullWidth={true}
        className={classes.dialog}
        onClose={() => {
          handleClose1(false);
        }}
        aria-labelledby="customized-dialog-title"
        open={openImportProduct}
      >
        <Grid item xs={12}>
          {(() => {
            if (screenWidth > 690) {
              return (
                <View>
                  <Stepper
                    activeStep={activeStep}
                    alternativeLabel
                    connector={<QontoConnector />}
                  >
                    {steps.map((label, index) => (
                      <Step key={label}>
                        <StepButton
                          onClick={() => {
                            handleStepClick(index);
                          }}
                        >
                          <Text style={popStyle.stepperCss}>{label}</Text>
                        </StepButton>
                      </Step>
                    ))}
                  </Stepper>
                </View>
              );
            }
          })()}
       
          <DialogTitle
            id="customized-dialog-title"
            onClose={() => {
              handleClose1(false);
            }}
            style={{
              width: "96%",
              margin: "auto",
              paddingBottom: "0px",
              paddingTop: "0px",
            }}
          ></DialogTitle>
        </Grid>

        <DialogContent style={{ width: "96%", margin: "auto" }}>
          {(() => {
            if (screenWidth < 690) {
              return (
                <View>
                  <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((label, index) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </View>
              );
            }
          })()}
          <Grid justify="center">
            <ProgressBar loading={loading} />
          </Grid>

          {openaddproduct === false ? (
              " "
            ) : (
              <NewProductAdd
                openaddproduct={openaddproduct}
                userid={userid}
                addNewProductCancel={addNewProductCancel}
              />
            )}
            
          <form className={classes.form}>
            <Grid container className={classes.root} spacing={1}>
              <Grid>
              <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            key={`${vertical},${horizontal}`}
            open={open11}
            autoHideDuration={2000}
            onClose={handleClose31}
          >
            <Alert onClose={handleClose31} severity="error">
              H.S. Code and Item value must be filled for items shipping international.
            </Alert>
          </Snackbar>
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            key={`${vertical},${horizontal}`}
            open={open1}
            autoHideDuration={2000}
            onClose={handleClose3}
          >
            <Alert onClose={handleClose3} severity="error">
              Product SKU must be filled.
            </Alert>
          </Snackbar>
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            key={`${vertical},${horizontal}`}
            open={open2}
            autoHideDuration={2000}
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
            autoHideDuration={2000}
            onClose={handleClose5}
          >
            <Alert onClose={handleClose4} severity="error">
              Product Name must be filled.
            </Alert>
          </Snackbar>
              </Grid>

              <Grid item xs={12} lg={12}>
                {/* <ScrollView> */}
                <View>
                  <MaterialTable
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
                        fontWeight: "bold",
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
                             
                              console.log("sku", newData.productsku);
                              console.log("name", newData.productname);
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
                             const dataup=state.data;
                              const index = dataup.indexOf(oldData);
                              const customproduct_id =ids[index];
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
                  {showToast(open, msg, type)}
                </View>
                {/* </ScrollView> */}
              </Grid>
            </Grid>
          </form>
        
        </DialogContent>
        <DialogActions>
          <Grid justify="flex-end" container spacing={1}>
            <Grid item>
              <ColorButton
                size="large"
                variant="contained"
                color="primary"
                className={classes.profileMargin}
                onClick={() => {
                  handlePreviousPage(9);
                }}
              >
                Back
              </ColorButton>
              &nbsp;&nbsp;
              <ColorButton
                size="large"
                variant="contained"
                color="primary"
                className={classes.profileMargin}
                disabled={(state.data.length === 0 ? true : false)}
                onClick={() => {
                  addStepStatus();
                }}
              >
                NEXT
              </ColorButton>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </View>
  );
}

Slide17.propTypes = {
  openImportProduct: PropTypes.bool,
  handleSprintCancel: PropTypes.func,
  handleNextPage: PropTypes.func,
};