import React, { useState, useEffect, useLayoutEffect } from "react";
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
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputBase from "@material-ui/core/InputBase";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import * as shiphypeservice from "./ShipService/shiphype_service";
import Switch from "@material-ui/core/Switch";
import MaterialTable, { MTableToolbar } from "material-table";
import { forwardRef } from "react";
import Paper from "@material-ui/core/Paper";
import Toast from "./feedback/Toast";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ProductOption from "./Order/openProductOption";
import ViewColumn from "@material-ui/icons/ViewColumn";
import ProgressBar from "./feedback/ProgressBar";
import popUpStyle from "./style/popUpStyle";
import Link from "@material-ui/core/Link";
import Checkbox from "@material-ui/core/Checkbox";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import FormGroup from "@material-ui/core/FormGroup";
import Select from "@material-ui/core/Select";

import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import RefreshIcon from "@material-ui/icons/Refresh";

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
    paddingRight:0,
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

const ColorButtonRefresh = withStyles((theme) => ({
  root: {
    borderRadius: "3px",
    height: "100%",
    padding: "3px",
    width: "100px",
    fontSize: "11px",
    fontWeight: "550",
    paddingLeft:0,
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
  // Add: () => (
  //   <ColorButtonAdd
  //     size="large"
  //     variant="contained"
  //     color="primary"
  //     startIcon={<AddIcon />}
  //   >
  //     Product
  //   </ColorButtonAdd>
  // ),
  RefreshIcon: forwardRef((props, ref) => (
    <RefreshIcon {...props} ref={ref} color="action" />
  )),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => (
    <Clear {...props} ref={ref} color="action" />
  )),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  CloudUpload: forwardRef((props, ref) => (
    <CloudUploadIcon {...props} ref={ref} />
  )),
};

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
  "@global": {
    "*::-webkit-scrollbar": {
      width: "0.5em",
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.2)",
      outline: "1px solid slategrey",
    },
  },
  submit: {
    margin: theme.spacing(0, 0, 0),
    borderRadius: 0,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(2),
    flexGrow: 1,
    height: "60vh",
    overflow: "auto",
    backgroundColor: "#fff",
  },
  quantitycss: {
    width: "90%",
    fontSize: "6px",
    cursor: "pointer",
    underline: {
      "&&&:before": {
        borderBottom: "none",
      },
      "&&:after": {
        borderBottom: "none",
      },
    },
  },

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
    backgroundColor: "#0168fa",
    borderColor: "#0168fa",
    borderRadius: "3px",
    padding: "1px",
    paddingLeft: "10px",
    paddingRight: "10px",
    "&:hover": {
      backgroundColor: "#002080",
    },
  },
}))(Button);

const StyledMTableToolbar = withStyles((theme) =>({
  root: {
    paddingLeft: 0,
    paddingRight: 0,
    
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.00),
        }
      : {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.00),
        },
  spacer: {
    flex: "1 1 10%",
  },
  actions: {
    paddingLeft:0,
    paddingRight:0,
    margin:0,
    padding:0,
    justifyContent:'center',
    "&:hover": {
      color: "#fff",
     // backgroundColor: "#000",
    },
  },
}))(MTableToolbar);

const ColorButton3 = withStyles((theme) => ({
  root: {
    color: "#fff",
    backgroundColor: "#0168fa",
    borderRadius: "3px",
    height: 26,
    width: 130,
    marginTop: "10px",
    marginLeft: "3px",
    fontSize: "11px",
    padding: 0,
    //  fontWeight: '550',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
    "&:hover": {
      backgroundColor: "#002080",
    },
  },
}))(Button);
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
/**

/**
 * Description:This function is used for Slide17
 * @param {*} props 
 */
export default function Slide17(props) {
  const classes = useStyles();
  const [warehouse, setWarehouse] = React.useState("0");
  const { openImportProduct } = props;
  const userid = props.user_id;
  const promotionalData = props.promotionalData;
  const [sellerid, setSellerid] = React.useState(0);
  const [fileData, setInvoiceFile] = React.useState([]);
  const [promotionalPackage, setPromotionalPackage] = React.useState([]);
  const [customePackage, setCustomePackage] = React.useState([]);
  const [skipped, setSkipped] = React.useState(new Set());
  const userRoleId = parseInt(window.localStorage.roleId);
  const [status, setStatus] = React.useState(false);
  const [checkedA, setCheckedA] = React.useState(true);
  const [dataproduct, setDataProduct] = React.useState([]);
  const [packingdata, setPackingdata] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [type, setType] = React.useState("");
  const [openProduct, setOpenProduct] = React.useState(false);
  const [open11, setOpen11] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [openProductName, setOpenProductName] = React.useState(false);
  var ids1 = [];

  const handleClose31 = () => {
    setOpen11(false);
    // handleNextPage(22);
  };
  const handleClose4 = () => {
    setOpen2(false);
    // handleNextPage(22);
  };
  const handleCloseProductName = () => {
    setOpenProductName(false);
    // handleNextPage(22);
  };
  const [state1, setState1] = useState({
    vertical: "center",
    horizontal: "center",
  });
  const { vertical, horizontal } = state1;
  // const [type,setAdmin]=React.useState('');
  const [userData, setUserData] = React.useState([]);
  const handleChangeSwitchA = (event) => {
    setCheckedA(event.target.checked);
    //setState({ ...state, [event.target.name]: event.target.checked });
  };
  const [changedWarehouseid, setchangedWarehouseid] = React.useState([]);
  const [openChecked, setOpenChekced] = React.useState(false);
  var ids = [];
  const [stateproduct1, setStateproduct1] = React.useState({
    data: [],
  });

  let activeStep1 = true;
  const handleChangequality = (event, props) => {
    //   fullinventorycount=event.target.checked;
    // //  setFromAction(false);
    console.log("runhandlechange", event.target.checked);
    activeStep1 = event.target.checked;
    props.onChange(event.target.checked);
    // setActiveStep2(true);
  };

  //  React.useEffect(() => {
  //   const unsubscribe = props.navigation.addListener('focus', () => {
  //     // Screen was focused
  //     // Do something
  //     console.log("focuednavigation","run34nav");
  //   });

  //   return unsubscribe;
  // }, [props.navigation]);

  React.useEffect(() => {
    fetchPackingList(userid);
    console.log("focuedchnaged", "run34");
  }, []);

  //  useLayoutEffect(() => {
  //   //fetchPackingList();
  //   console.log("focuedchnaged12","run12");
  //   //window.location.reload(false);
  // },[]);

  const opennewOrder = (rowid, rowData) => {
    props.handleDashboard(
      "AddProductManually",
      packageDataPro1,
      promotionalDataAdd
    );
  };
  const handleDeleteCancle = () => {
    setOpenProduct(false);
  };

  const handleAddProductManually = () => {
    setOpenProduct(false);
    props.handleDashboard("AddProductManually");
  };

  const validate = {
    productsku: (s) => (s.length > 0 ? "" : "Sku id required"),
    productname: (s) => (s.length > 0 ? "" : "Product Name is required"),
    hscode: (s) => (s.length > 0 ? "" : "HS code is required"),
    itemvalue: (s) => (s.length > 0 ? "" : "Item Value is required"),
  };

  var flag = false;

  const theme = useTheme();
  const [state, setState] = React.useState({
    // column1FilterList: {},
    // column1FilterList2: {},
    columns: [
      //     { title: '',
      //     render: rowData => <FormGroup>
      //       {(() => {

      //        if(rowData!==undefined){
      //          return(
      //     <FormControlLabel style={popUpStyle.checkboxPosition}
      //       control={<Checkbox
      //         id={rowData.customproductId}

      //         checked={
      //             (() => {
      //               for(let i=0; i<ids.length;i++)

      //               {

      //               if (rowData.customproductId  === parseInt(ids[i])){
      //                 return (
      //                     true
      //                   )
      //               }

      //               }

      //               })()}

      //         onChange={()=>{handleChangeCheckbox(rowData.customproductId)}}

      //         color="primary"
      //        />}
      //         className={classes.radioButtonCss}
      //         InputProps={{ inputProps: { style: {  borderRadius: 0 }, }, style: { borderRadius: 0 }, }}

      //     />
      //        )
      // }

      // })()}
      //    </FormGroup>
      //     },
      {
        title: "Item Name",
        field: "productname",
        type: "text",
        render: (rowData) => (
          <FormControlLabel
            //onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
            className={classes.quantitycss}
            control={
              <Typography
                style={{
                  marginLeft: "20px",
                  fontSize: "2px",
                  cursor: "pointer",
                  fontFamily:
                    '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                }}
              >
                <Text
                  style={{
                    fontSize: "11px",
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                    transition: "all 0.25s",
                  }}
                >
                  {rowData.productname === null || rowData.productname === "" ?  '  ' : rowData.productname}
                </Text>
              </Typography>
            }
          />
        ),
      },
      {
        title: "Item SKU",
        field: "productsku",
        type: "text",
        render: (rowData) => (
          <FormControlLabel
            //onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
            className={classes.quantitycss}
            control={
              <Typography
                style={{
                  marginLeft: "20px",
                  fontSize: "2px",
                  cursor: "pointer",
                  fontFamily:
                    '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                }}
              >
                <Text
                  style={{
                    fontSize: "11px",
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                    transition: "all 0.25s",
                  }}
                >
                  {rowData.productsku === null || rowData.productsku === "" ? ' ' : rowData.productsku}
                </Text>
              </Typography>
            }
          />
        ),
      },
      //  { title: "Serial Number", field: "serialno", type: "text", render: rowData =><FormControlLabel

      //  // onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
      //   className={classes.quantitycss}
      //   control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
      //   fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

      //   <Text style={{ fontSize: '11px',
      //   fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
      //   transition : 'all 0.25s',}}>{rowData.serialno}</Text>

      //   </Typography>}
      //   />

      //    },

      {
        title: "Ships International",
        field: "internationalshipping",
        render: (rowData) => (
          <FormControlLabel
            // onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
            className={classes.quantitycss}
            control={
              <Typography
                style={{
                  marginLeft: "20px",
                  fontSize: "2px",
                  cursor: "pointer",
                  fontFamily:
                    '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                }}
              >
                {(() => {
                  if (rowData.internationalshipping === true) {
                    return (
                      <Text
                        style={{
                          fontSize: "11px",
                          fontFamily:
                            '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                          transition: "all 0.25s",
                        }}
                      >
                        Yes
                      </Text>
                    );
                  } else {
                    return (
                      <Text
                        style={{
                          fontSize: "11px",
                          fontFamily:
                            '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                          transition: "all 0.25s",
                        }}
                      >
                        No
                      </Text>
                    );
                  }
                })()}
              </Typography>
            }
          />
        ),
        editComponent: (props) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={props.value}
                onChange={(e) => handleChangequality(e, props)}
                // onChange={e => props.onChange(e.target.checked)}
                name="qualitycontrol"
                color="primary"
              />
            }
            value="1"
          />
        ),
      },
      {
        title: "HS Code",
        field: "hscode",
        type: "text",
        render: (rowData) => (
          <FormControlLabel
            //onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
            className={classes.quantitycss}
            control={
              <Typography
                style={{
                  marginLeft: "20px",
                  fontSize: "2px",
                  cursor: "pointer",
                  fontFamily:
                    '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                }}
              >
                <Text
                  style={{
                    fontSize: "11px",
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                    transition: "all 0.25s",
                  }}
                >
                  {rowData.hscode}
                </Text>
              </Typography>
            }
          />
        ),
        editComponent: (props) => (
          <TextField
            id="standard-basic"
            type="text"
            value={props.value}
            disabled={!activeStep1}
            onChange={(e) => props.onChange(e.target.value)}
          />
        ),
      },
      {
        title: "Item Value",
        field: "itemvalue",
        type: "numeric",
        render: (rowData) => (
          <FormControlLabel
            //onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
            className={classes.quantitycss}
            control={
              <Typography
                style={{
                  marginLeft: "20px",
                  fontSize: "2px",
                  cursor: "pointer",
                  fontFamily:
                    '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                }}
              >
                <Text
                  style={{
                    fontSize: "11px",
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                    transition: "all 0.25s",
                  }}
                >
                  {rowData.itemvalue}
                </Text>
              </Typography>
            }
          />
        ),
        editComponent: (props) => (
          <TextField
            id="standard-basic"
            type="text"
            value={props.value}
            disabled={!activeStep1}
            onChange={(e) => props.onChange(e.target.value)}
          />
        ),
      },
      {
        title: "Dangerous Goods",
        field: "dangerousgoods",
        type: "boolean",
        render: (rowData) => (
          <FormControlLabel
            // onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
            className={classes.quantitycss}
            control={
              <Typography
                style={{
                  marginLeft: "20px",
                  fontSize: "2px",
                  cursor: "pointer",
                  fontFamily:
                    '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                }}
              >
                {(() => {
                  if (rowData.dangerousgoods === true) {
                    return (
                      <Text
                        style={{
                          fontSize: "11px",
                          fontFamily:
                            '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                          transition: "all 0.25s",
                        }}
                      >
                        Yes
                      </Text>
                    );
                  } else {
                    return (
                      <Text
                        style={{
                          fontSize: "11px",
                          fontFamily:
                            '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                          transition: "all 0.25s",
                        }}
                      >
                        No
                      </Text>
                    );
                  }
                })()}
              </Typography>
            }
          />
        ),
        editComponent: (props) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={props.value}
                //      onChange={e =>handleChangequality(e,props)}
                onChange={(e) => props.onChange(e.target.checked)}
                name="qualitycontrol"
                color="primary"
              />
            }
            value="1"
          />
        ),
      },
      {
        title: "Serial Number",
        field: "serialno",
        type: "boolean",
        render: (rowData) => (
          <FormControlLabel
            control={
              <Typography
                style={{
                  marginLeft: "20px",
                  fontSize: "2px",
                  cursor: "pointer",
                  fontFamily:
                    '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                }}
              >
                {(() => {
                  if (rowData.serialno === true) {
                    return (
                      <Text
                        style={{
                          fontSize: "11px",
                          fontFamily:
                            '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                          transition: "all 0.25s",
                        }}
                      >
                        Yes
                      </Text>
                    );
                  } else {
                    return (
                      <Text
                        style={{
                          fontSize: "11px",
                          fontFamily:
                            '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                          transition: "all 0.25s",
                        }}
                      >
                        No
                      </Text>
                    );
                  }
                })()}
              </Typography>
            }
          />
        ),
        editComponent: (props) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={props.value}
                //      onChange={e =>handleChangequality(e,props)}
                onChange={(e) => props.onChange(e.target.checked)}
                name="qualitycontrol"
                color="primary"
              />
            }
            value="1"
          />
        ),
      },
      {
        title: "Do Not Process",
        field: "isprocess",
        type: "boolean",
        render: (rowData) => (
          <FormControlLabel
            //  onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
            className={classes.quantitycss}
            control={
              <Typography
                style={{
                  marginLeft: "20px",
                  fontSize: "2px",
                  cursor: "pointer",
                  fontFamily:
                    '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                }}
              >
                {(() => {
                  if (rowData.isprocess === true) {
                    return (
                      <Text
                        style={{
                          fontSize: "11px",
                          fontFamily:
                            '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                          transition: "all 0.25s",
                        }}
                      >
                        Product Deactivated
                      </Text>
                    );
                  } else {
                    return (
                      <Text
                        style={{
                          fontSize: "11px",
                          fontFamily:
                            '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                          transition: "all 0.25s",
                        }}
                      ></Text>
                    );
                  }
                })()}
              </Typography>
            }
          />
        ),
        editComponent: (props) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={props.value}
                //      onChange={e =>handleChangequality(e,props)}
                onChange={(e) => props.onChange(e.target.checked)}
                name="qualitycontrol"
                color="primary"
              />
            }
            value="1"
          />
        ),
      },
      {
        title: "Packaging",
        field: "packaging",
        //lookup: { 1: 'Corrugated Box', 2: 'Letter' },

        lookup: {
          1: "Envelope",
          2: "Courier Bags",
          3: "Poly Bubble Mailer",
          4: "Corrugated Box",
          5: "Corrugated Box (Heavy Duty)",
          6: "Corrugated Box (Cube)",
        },
      },
      {
        title: "Promotional Inserts",
        field: "promotionalpackaging",
        //lookup: { 1: 'Corrugated Box', 2: 'Letter' },

        lookup: promotionalData,
      },
      {
        title: "Total Stock",
        field: "losangelesstock1",
        type: "text",
        editable: "never",
        render: (rowData) => (
          <Text>
            {(() => {
              if (rowData !== undefined) {
                if (
                  rowData.torontostock !== null &&
                  rowData.losangelesstock !== null
                ) {
                  return (
                    <FormControlLabel
                      //onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
                      className={classes.quantitycss}
                      control={
                        <Typography
                          style={{
                            marginLeft: "20px",
                            fontSize: "2px",
                            cursor: "pointer",
                            fontFamily:
                              '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                          }}
                        >
                          <Text
                            style={{
                              fontSize: "11px",
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              transition: "all 0.25s",
                            }}
                          >
                            {parseInt(rowData.losangelesstock) +
                              parseInt(rowData.torontostock)}
                          </Text>
                        </Typography>
                      }
                    />
                  );
                } else if (
                  rowData.torontostock === null &&
                  rowData.losangelesstock !== null
                ) {
                  return (
                    <FormControlLabel
                      //onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
                      className={classes.quantitycss}
                      control={
                        <Typography
                          style={{
                            marginLeft: "20px",
                            fontSize: "2px",
                            cursor: "pointer",
                            fontFamily:
                              '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                          }}
                        >
                          <Text
                            style={{
                              fontSize: "11px",
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              transition: "all 0.25s",
                            }}
                          >
                            {parseInt(rowData.losangelesstock)}
                          </Text>
                        </Typography>
                      }
                    />
                  );
                } else if (
                  rowData.torontostock === null &&
                  rowData.losangelesstock === null
                ) {
                  return (
                    <FormControlLabel
                      //onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
                      className={classes.quantitycss}
                      control={
                        <Typography
                          style={{
                            marginLeft: "20px",
                            fontSize: "2px",
                            cursor: "pointer",
                            fontFamily:
                              '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                          }}
                        >
                          <Text
                            style={{
                              fontSize: "11px",
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              transition: "all 0.25s",
                            }}
                          >
                            0
                          </Text>
                        </Typography>
                      }
                    />
                  );
                } else if (
                  rowData.torontostock !== null &&
                  rowData.losangelesstock === null
                ) {
                  return (
                    <FormControlLabel
                      //onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
                      className={classes.quantitycss}
                      control={
                        <Typography
                          style={{
                            marginLeft: "20px",
                            fontSize: "2px",
                            cursor: "pointer",
                            fontFamily:
                              '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                          }}
                        >
                          <Text
                            style={{
                              fontSize: "11px",
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              transition: "all 0.25s",
                            }}
                          >
                            {parseInt(rowData.torontostock)}
                          </Text>
                        </Typography>
                      }
                    />
                  );
                }
              }
            })()}
          </Text>
        ),
      },
      {
        title: "Toronto Stock",
        field: "torontostock",
        type: "text",
        // render: rowData =><FormControlLabel

        // //onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
        // className={classes.quantitycss}
        // control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
        // fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

        // <Text style={{ fontSize: '11px',
        // fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
        // transition : 'all 0.25s',}}>{rowData.torontostock}</Text>

        // </Typography>}
        // />
      },
      {
        title: "Los Angeles Stock",
        field: "losangelesstock",
        type: "text",
        //   render: rowData =><FormControlLabel

        //  // onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
        //   className={classes.quantitycss}
        //   control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
        //   fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

        //   <Text style={{ fontSize: '11px',
        //   fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
        //   transition : 'all 0.25s',}}>{rowData.losangelesstock}</Text>

        //   </Typography>}
        //   />
      },
      {
        title: "Total Sold",
        field: "totalsold",
        type: "numeric",
        editable: "never",
        hidden: true,
        render: (rowData) => (
          <FormControlLabel
            // onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
            className={classes.quantitycss}
            control={
              <Typography
                style={{
                  marginLeft: "20px",
                  fontSize: "2px",
                  cursor: "pointer",
                  fontFamily:
                    '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                }}
              >
                <Text
                  style={{
                    fontSize: "11px",
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                    transition: "all 0.25s",
                  }}
                >
                  {rowData.totalsold}
                </Text>
              </Typography>
            }
          />
        ),
      },
      {
        title: "itemquantity",
        field: "itemquantity",
        type: "numeric",
        editable: "never",
        hidden: true,
      },
    ],
    data: [],
  });

  const handleCaptureInvoice = (event) => {
    const target = event.target;
    const fileReader = new FileReader();
    // const name = target.accept.includes('image') ? 'images' : 'videos';

    fileReader.readAsDataURL(target.files[0]);
    setInvoiceFile(target.files[0]);
    // setLoading(true);
    // shiphypeservice.uploadInvoiceData(target.files[0],userid)
    // .then(response => {
    //  console.log("status",response.status);
    //       if(response.status === true) {
    //         setLoading(false);

    //                  }else{
    //                   setLoading(false);
    //                   console.log("message",response.message);
    //                  }
    //     }).catch((error) =>{
    //           console.error(error);
    //     });
  };

  const fetchSellerProductPackingList = (userid) => {
    fetchPackingList(userid);
    fetchProductList1(userid);
  };
  const fetchPackingList = (userid) => {
    var column1FilterList = state.column1FilterList;
    if (userRoleId === 1) {
      //const userid=14;
      setLoading(true);
      shiphypeservice
        .fetchCustomePaching(userid, 1)
        .then((response) => {
          console.log("status", response.status);
          if (response.status === true) {
            setLoading(false);
            //setPackingdata(response.data);
            var packageDataPro11 = {};
            var data = response.data;
            data.map((orderCouierOp) => {
              const { packaggingId, packaggingName } = orderCouierOp;
              packageDataPro11[packaggingId] = packaggingName;
            });
            //  response.data.forEach(element => column1FilterList[element.packaggingId] = element.packaggingName)
            setPackingdata(packageDataPro11);
            fetchPackageForPromotional(userid, packageDataPro11);

            console.log("packingdata", response.data);
          } else {
            setLoading(false);
            console.log("message", response.message);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      //const userid=14;
      setLoading(true);
      shiphypeservice
        .fetchCustomePaching(userid, 1)
        .then((response) => {
          console.log("status", response.status);
          if (response.status === true) {
            setLoading(false);
            // setPackingdata(response.data);
            var packageDataPro11 = {};
            var data = response.data;
            data.map((orderCouierOp) => {
              const { packaggingId, packaggingName } = orderCouierOp;
              packageDataPro11[packaggingId] = packaggingName;
            });

            //response.data.forEach(element => column1FilterList[element.packaggingId] = element.packaggingName)
            setPackingdata(packageDataPro11);
            fetchPackageForPromotional(userid, packageDataPro11, data);

            console.log("packingdata", response.data);
            // fetchProductList();
          } else {
            setLoading(false);
            console.log("message", response.message);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const fetchPackingList1 = () => {
    shiphypeservice
      .fetchCustomePaching(userid, 1)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          setCustomePackage(response.data);
          // if(response.data.length !== 0){
          //   setPackaging(response.data[0].packaggingId);
          // }
          // console.log("packingdata",response.data);
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const packageDataPro1 = {};
  customePackage.map((orderCouierOp) => {
    const { packaggingId, packaggingName } = orderCouierOp;
    packageDataPro1[packaggingId] = packaggingName;
  });

  const fetchPackageForPromotional = (userid, packageDataPro11, data1) => {
    var column1FilterList2 = state.column1FilterList2;
    setLoading(true);
    shiphypeservice
      .fetchCustomePaching(userid, 2)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          setPromotionalPackage(response.data);
          var packageDataPro111 = {};
          var data11 = response.data;
          data11.map((orderCouierOp) => {
            const { packaggingId, packaggingName } = orderCouierOp;
            packageDataPro111[packaggingId] = packaggingName;
          });

          //response.data.forEach(element => column1FilterList2[element.packaggingId] = element.packaggingName)

          if (userRoleId === 1) {
            setState({
              packageDataPro111,
              columns: [
                //  { title: 'ShipHype Internal ID',
                //  field: 'customproductId',type: 'text',editable: 'never',
                //  render: rowData =><FormControlLabel

                //  // onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
                //   className={classes.quantitycss}
                //   control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
                //   fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

                //   <Text style={{ fontSize: '11px',
                //   fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                //   transition : 'all 0.25s',}}>{rowData.customproductId}</Text>

                //   </Typography>}
                //   />

                // },
                {
                  title: "Item Name",
                  field: "productname",
                  type: "text",
                  render: (rowData) => (
                    <FormControlLabel
                      // onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
                      className={classes.quantitycss}
                      control={
                        <Typography
                          style={{
                            marginLeft: "20px",
                            fontSize: "2px",
                            cursor: "pointer",
                            fontFamily:
                              '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                          }}
                        >
                          <Text
                            style={{
                              fontSize: "11px",
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              transition: "all 0.25s",
                            }}
                          >
                            {rowData.productname}
                          </Text>
                        </Typography>
                      }
                    />
                  ),
                },
                {
                  title: "Item SKU",
                  field: "productsku",
                  type: "text",
                  render: (rowData) => (
                    <FormControlLabel
                      // onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
                      className={classes.quantitycss}
                      control={
                        <Typography
                          style={{
                            marginLeft: "20px",
                            fontSize: "2px",
                            cursor: "pointer",
                            fontFamily:
                              '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                          }}
                        >
                          <Text
                            style={{
                              fontSize: "11px",
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              transition: "all 0.25s",
                            }}
                          >
                            {rowData.productsku}
                          </Text>
                        </Typography>
                      }
                    />
                  ),
                },
                //  { title: "Serial Number", field: "serialno", type: "text", render: rowData =><FormControlLabel

                //  // onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
                //   className={classes.quantitycss}
                //   control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
                //   fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

                //   <Text style={{ fontSize: '11px',
                //   fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                //   transition : 'all 0.25s',}}>{rowData.serialno}</Text>

                //   </Typography>}
                //   />

                //    },
                {
                  title: "ShipHype Internal SKU",
                  field: "shiphypeSku",
                  type: "text",
                  render: (rowData) => (
                    <FormControlLabel
                      // onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
                      className={classes.quantitycss}
                      control={
                        <Typography
                          style={{
                            marginLeft: "20px",
                            fontSize: "2px",
                            cursor: "pointer",
                            fontFamily:
                              '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                          }}
                        >
                          <Text
                            style={{
                              fontSize: "11px",
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              transition: "all 0.25s",
                            }}
                          >
                            {rowData.shiphypeSku}
                          </Text>
                        </Typography>
                      }
                    />
                  ),
                },

                {
                  title: "Ships International",
                  field: "internationalshipping",
                  render: (rowData) => (
                    <FormControlLabel
                      //  onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
                      className={classes.quantitycss}
                      control={
                        <Typography
                          style={{
                            marginLeft: "20px",
                            fontSize: "2px",
                            cursor: "pointer",
                            fontFamily:
                              '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                          }}
                        >
                          {(() => {
                            if (rowData.internationalshipping === true) {
                              return (
                                <Text
                                  style={{
                                    fontSize: "11px",
                                    fontFamily:
                                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                    transition: "all 0.25s",
                                  }}
                                >
                                  Yes
                                </Text>
                              );
                            } else {
                              return (
                                <Text
                                  style={{
                                    fontSize: "11px",
                                    fontFamily:
                                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                    transition: "all 0.25s",
                                  }}
                                >
                                  No
                                </Text>
                              );
                            }
                          })()}
                        </Typography>
                      }
                    />
                  ),
                  editComponent: (props) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={props.value}
                          onChange={(e) => handleChangequality(e, props)}
                          // onChange={e => props.onChange(e.target.checked)}
                          name="qualitycontrol"
                          color="primary"
                        />
                      }
                      value="1"
                    />
                  ),
                },
                {
                  title: "HS Code",
                  field: "hscode",
                  type: "text",
                  render: (rowData) => (
                    <FormControlLabel
                      // onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
                      className={classes.quantitycss}
                      control={
                        <Typography
                          style={{
                            marginLeft: "20px",
                            fontSize: "2px",
                            cursor: "pointer",
                            fontFamily:
                              '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                          }}
                        >
                          <Text
                            style={{
                              fontSize: "11px",
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              transition: "all 0.25s",
                            }}
                          >
                            {rowData.hscode}
                          </Text>
                        </Typography>
                      }
                    />
                  ),
                  editComponent: (props) => (
                    <View>
                      {(() => {
                        if (props.rowData !== undefined) {
                          if (
                            props.rowData.internationalshipping === undefined
                          ) {
                            return (
                              <TextField
                                id="standard-basic"
                                type="text"
                                value={props.value}
                                disabled={true}
                                onChange={(e) => props.onChange(e.target.value)}
                              />
                            );
                          } else if (
                            props.rowData.internationalshipping === false
                          ) {
                            return (
                              <TextField
                                id="standard-basic"
                                type="text"
                                value={props.value}
                                disabled={true}
                                onChange={(e) => props.onChange(e.target.value)}
                              />
                            );
                          } else {
                            return (
                              <TextField
                                id="standard-basic"
                                type="text"
                                value={props.value}
                                disabled={false}
                                onChange={(e) => props.onChange(e.target.value)}
                              />
                            );
                          }
                        }
                      })()}
                    </View>

                    //  <TextField
                    //  id="standard-basic"
                    //    type="text"
                    //    value={props.value}
                    //    disabled={!activeStep1}
                    //    onChange={e => props.onChange(e.target.value)}
                    //  />
                  ),
                },
                {
                  title: "Item Value",
                  field: "itemvalue",
                  type: "numeric",
                  render: (rowData) => (
                    <FormControlLabel
                      // onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
                      className={classes.quantitycss}
                      control={
                        <Typography
                          style={{
                            marginLeft: "20px",
                            fontSize: "2px",
                            cursor: "pointer",
                            fontFamily:
                              '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                          }}
                        >
                          <Text
                            style={{
                              fontSize: "11px",
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              transition: "all 0.25s",
                            }}
                          >
                            {rowData.itemvalue}
                          </Text>
                        </Typography>
                      }
                    />
                  ),
                  editComponent: (props) => (
                    //  <TextField
                    //  id="standard-basic"
                    //    type="text"
                    //    value={props.value}
                    //    disabled={!activeStep1}
                    //    onChange={e => props.onChange(e.target.value)}
                    //  />
                    <View>
                      {(() => {
                        if (props.rowData !== undefined) {
                          if (
                            props.rowData.internationalshipping === undefined
                          ) {
                            return (
                              <TextField
                                id="standard-basic"
                                type="text"
                                value={props.value}
                                disabled={true}
                                onChange={(e) => props.onChange(e.target.value)}
                              />
                            );
                          } else if (
                            props.rowData.internationalshipping === false
                          ) {
                            return (
                              <TextField
                                id="standard-basic"
                                type="text"
                                value={props.value}
                                disabled={true}
                                onChange={(e) => props.onChange(e.target.value)}
                              />
                            );
                          } else {
                            return (
                              <TextField
                                id="standard-basic"
                                type="text"
                                value={props.value}
                                disabled={false}
                                onChange={(e) => props.onChange(e.target.value)}
                              />
                            );
                          }
                        }
                      })()}
                    </View>
                  ),
                },
                {
                  title: "Dangerous Goods",
                  field: "dangerousgoods",
                  type: "boolean",
                  render: (rowData) => (
                    <FormControlLabel
                      //  onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
                      className={classes.quantitycss}
                      control={
                        <Typography
                          style={{
                            marginLeft: "20px",
                            fontSize: "2px",
                            cursor: "pointer",
                            fontFamily:
                              '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                          }}
                        >
                          {(() => {
                            if (rowData.dangerousgoods === true) {
                              return (
                                <Text
                                  style={{
                                    fontSize: "11px",
                                    fontFamily:
                                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                    transition: "all 0.25s",
                                  }}
                                >
                                  Yes
                                </Text>
                              );
                            } else {
                              return (
                                <Text
                                  style={{
                                    fontSize: "11px",
                                    fontFamily:
                                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                    transition: "all 0.25s",
                                  }}
                                >
                                  No
                                </Text>
                              );
                            }
                          })()}
                        </Typography>
                      }
                    />
                  ),
                  editComponent: (props) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={props.value}
                          //      onChange={e =>handleChangequality(e,props)}
                          onChange={(e) => props.onChange(e.target.checked)}
                          name="qualitycontrol"
                          color="primary"
                        />
                      }
                      value="1"
                    />
                  ),
                },
                {
                  title: "Serial Number",
                  field: "serialno",
                  type: "boolean",
                  render: (rowData) => (
                    <FormControlLabel
                      control={
                        <Typography
                          style={{
                            marginLeft: "20px",
                            fontSize: "2px",
                            cursor: "pointer",
                            fontFamily:
                              '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                          }}
                        >
                          {(() => {
                            if (rowData.serialno === true) {
                              return (
                                <Text
                                  style={{
                                    fontSize: "11px",
                                    fontFamily:
                                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                    transition: "all 0.25s",
                                  }}
                                >
                                  Yes
                                </Text>
                              );
                            } else {
                              return (
                                <Text
                                  style={{
                                    fontSize: "11px",
                                    fontFamily:
                                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                    transition: "all 0.25s",
                                  }}
                                >
                                  No
                                </Text>
                              );
                            }
                          })()}
                        </Typography>
                      }
                    />
                  ),
                  editComponent: (props) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={props.value}
                          //      onChange={e =>handleChangequality(e,props)}
                          onChange={(e) => props.onChange(e.target.checked)}
                          name="qualitycontrol"
                          color="primary"
                        />
                      }
                      value="1"
                    />
                  ),
                },
                {
                  title: "Do Not Process",
                  field: "isprocess",
                  type: "boolean",
                  render: (rowData) => (
                    <FormControlLabel
                      //  onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
                      className={classes.quantitycss}
                      control={
                        <Typography
                          style={{
                            marginLeft: "20px",
                            fontSize: "2px",
                            cursor: "pointer",
                            fontFamily:
                              '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                          }}
                        >
                          {(() => {
                            if (rowData.isprocess === true) {
                              return (
                                <Text
                                  style={{
                                    fontSize: "11px",
                                    fontFamily:
                                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                    transition: "all 0.25s",
                                  }}
                                >
                                  Product Deactivated
                                </Text>
                              );
                            } else {
                              return (
                                <Text
                                  style={{
                                    fontSize: "11px",
                                    fontFamily:
                                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                    transition: "all 0.25s",
                                  }}
                                ></Text>
                              );
                            }
                          })()}
                        </Typography>
                      }
                    />
                  ),
                  editComponent: (props) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={props.value}
                          //      onChange={e =>handleChangequality(e,props)}
                          onChange={(e) => props.onChange(e.target.checked)}
                          name="qualitycontrol"
                          color="primary"
                        />
                      }
                      value="1"
                    />
                  ),
                },
                {
                  title: "Packaging",
                  field: "packaging",
                  //lookup: { 1: 'Corrugated Box', 2: 'Letter' }, packageDataPro111[ packaggingId ] = packaggingName
                  lookup: packageDataPro11,
                  //  editComponent: props => (
                  //   <FormControl className={classes.formControl}>

                  //   <Select
                  //     labelId="demo-simple-select-label"
                  //     id="demo-simple-select"
                  //     value={4}
                  //     onChange={e =>handleChangeSource(e,props)}
                  //   >
                  //     <MenuItem value={0}>
                  //     Select Source</MenuItem>
                  //   {data1.map(option => (
                  //     <MenuItem value={option.packaggingId}>
                  //     {option.packaggingName}</MenuItem>

                  //    ))}

                  //   </Select>
                  // </FormControl>
                  // )
                  //lookup: { 1: 'Envelope', 2: 'Courier Bags' ,3:'Poly Bubble Mailer',4:'Corrugated Box',5:'Corrugated Box (Heavy Duty)',6:'Corrugated Box (Cube)'},
                },

                {
                  title: "Promotional Inserts",
                  field: "promotionalpackaging",
                  //lookup: { 1: 'Corrugated Box', 2: 'Letter' },

                  lookup: packageDataPro111,
                },
                {
                  title: "Total Stock",
                  field: "losangelesstock1",
                  type: "text",
                  editable: "never",
                  render: (rowData) => (
                    <Text>
                      {(() => {
                        if (rowData !== undefined) {
                          if (
                            rowData.torontostock !== null &&
                            rowData.losangelesstock !== null
                          ) {
                            return (
                              <FormControlLabel
                                //  onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
                                className={classes.quantitycss}
                                control={
                                  <Typography
                                    style={{
                                      marginLeft: "20px",
                                      fontSize: "2px",
                                      cursor: "pointer",
                                      fontFamily:
                                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                    }}
                                  >
                                    <Text
                                      style={{
                                        fontSize: "11px",
                                        fontFamily:
                                          '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                        transition: "all 0.25s",
                                      }}
                                    >
                                      {parseInt(rowData.losangelesstock) +
                                        parseInt(rowData.torontostock)}
                                    </Text>
                                  </Typography>
                                }
                              />
                            );
                          } else if (
                            rowData.torontostock === null &&
                            rowData.losangelesstock !== null
                          ) {
                            return (
                              <FormControlLabel
                                // onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
                                className={classes.quantitycss}
                                control={
                                  <Typography
                                    style={{
                                      marginLeft: "20px",
                                      fontSize: "2px",
                                      cursor: "pointer",
                                      fontFamily:
                                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                    }}
                                  >
                                    <Text
                                      style={{
                                        fontSize: "11px",
                                        fontFamily:
                                          '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                        transition: "all 0.25s",
                                      }}
                                    >
                                      {parseInt(rowData.losangelesstock)}
                                    </Text>
                                  </Typography>
                                }
                              />
                            );
                          } else if (
                            rowData.torontostock === null &&
                            rowData.losangelesstock === null
                          ) {
                            return (
                              <FormControlLabel
                                // onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
                                className={classes.quantitycss}
                                control={
                                  <Typography
                                    style={{
                                      marginLeft: "20px",
                                      fontSize: "2px",
                                      cursor: "pointer",
                                      fontFamily:
                                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                    }}
                                  >
                                    <Text
                                      style={{
                                        fontSize: "11px",
                                        fontFamily:
                                          '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                        transition: "all 0.25s",
                                      }}
                                    >
                                      0
                                    </Text>
                                  </Typography>
                                }
                              />
                            );
                          } else if (
                            rowData.torontostock !== null &&
                            rowData.losangelesstock === null
                          ) {
                            return (
                              <FormControlLabel
                                //  onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
                                className={classes.quantitycss}
                                control={
                                  <Typography
                                    style={{
                                      marginLeft: "20px",
                                      fontSize: "2px",
                                      cursor: "pointer",
                                      fontFamily:
                                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                    }}
                                  >
                                    <Text
                                      style={{
                                        fontSize: "11px",
                                        fontFamily:
                                          '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                        transition: "all 0.25s",
                                      }}
                                    >
                                      {parseInt(rowData.torontostock)}
                                    </Text>
                                  </Typography>
                                }
                              />
                            );
                          }
                        }
                      })()}
                    </Text>
                  ),
                },
                { title: "Toronto Stock", field: "torontostock", type: "text" },
                {
                  title: "Los Angeles Stock",
                  field: "losangelesstock",
                  type: "text",
                },
                {
                  title: "Total Sold",
                  field: "totalsold",
                  type: "numeric",
                  editable: "never",
                  hidden: true,
                  render: (rowData) => (
                    <FormControlLabel
                      //  onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
                      className={classes.quantitycss}
                      control={
                        <Typography
                          style={{
                            marginLeft: "20px",
                            fontSize: "2px",
                            cursor: "pointer",
                            fontFamily:
                              '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                          }}
                        >
                          <Text
                            style={{
                              fontSize: "11px",
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              transition: "all 0.25s",
                            }}
                          >
                            {rowData.totalsold}
                          </Text>
                        </Typography>
                      }
                    />
                  ),
                },
                {
                  title: "itemquantity",
                  field: "itemquantity",
                  type: "numeric",
                  editable: "never",
                  hidden: true,
                },
              ],
              data: [],
            });
          } else {
            setState({
              packageDataPro111,
              columns: [
                {
                  title: "Item Name",
                  field: "productname",
                  type: "text",
                  render: (rowData) => (
                    <FormControlLabel
                      // onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
                      className={classes.quantitycss}
                      control={
                        <Typography
                          style={{
                            marginLeft: "20px",
                            fontSize: "2px",
                            cursor: "pointer",
                            fontFamily:
                              '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                          }}
                        >
                          <Text
                            style={{
                              fontSize: "11px",
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              transition: "all 0.25s",
                            }}
                          >
                            {rowData.productname}
                          </Text>
                        </Typography>
                      }
                    />
                  ),
                },
                {
                  title: "Item SKU",
                  field: "productsku",
                  type: "text",
                  render: (rowData) => (
                    <FormControlLabel
                      //  onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
                      className={classes.quantitycss}
                      control={
                        <Typography
                          style={{
                            marginLeft: "20px",
                            fontSize: "2px",
                            cursor: "pointer",
                            fontFamily:
                              '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                          }}
                        >
                          <Text
                            style={{
                              fontSize: "11px",
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              transition: "all 0.25s",
                            }}
                          >
                            {rowData.productsku}
                          </Text>
                        </Typography>
                      }
                    />
                  ),
                },
                //  { title: "Serial Number", field: "serialno", type: "text", render: rowData =><FormControlLabel

                //  // onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
                //   className={classes.quantitycss}
                //   control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
                //   fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

                //   <Text style={{ fontSize: '11px',
                //   fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                //   transition : 'all 0.25s',}}>{rowData.serialno}</Text>

                //   </Typography>}
                //   />

                //    },

                {
                  title: "Ships International",
                  field: "internationalshipping",
                  render: (rowData) => (
                    <FormControlLabel
                      //   onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
                      className={classes.quantitycss}
                      control={
                        <Typography
                          style={{
                            marginLeft: "20px",
                            fontSize: "2px",
                            cursor: "pointer",
                            fontFamily:
                              '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                          }}
                        >
                          {(() => {
                            if (rowData.internationalshipping === true) {
                              return (
                                <Text
                                  style={{
                                    fontSize: "11px",
                                    fontFamily:
                                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                    transition: "all 0.25s",
                                  }}
                                >
                                  Yes
                                </Text>
                              );
                            } else {
                              return (
                                <Text
                                  style={{
                                    fontSize: "11px",
                                    fontFamily:
                                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                    transition: "all 0.25s",
                                  }}
                                >
                                  No
                                </Text>
                              );
                            }
                          })()}
                        </Typography>
                      }
                    />
                  ),
                  editComponent: (props) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={props.value}
                          onChange={(e) => handleChangequality(e, props)}
                          // onChange={e => props.onChange(e.target.checked)}
                          name="qualitycontrol"
                          color="primary"
                        />
                      }
                      value="1"
                    />
                  ),
                },
                {
                  title: "HS Code",
                  field: "hscode",
                  type: "text",
                  render: (rowData) => (
                    <FormControlLabel
                      // onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
                      className={classes.quantitycss}
                      control={
                        <Typography
                          style={{
                            marginLeft: "20px",
                            fontSize: "2px",
                            cursor: "pointer",
                            fontFamily:
                              '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                          }}
                        >
                          <Text
                            style={{
                              fontSize: "11px",
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              transition: "all 0.25s",
                            }}
                          >
                            {rowData.hscode}
                          </Text>
                        </Typography>
                      }
                    />
                  ),
                  editComponent: (props) => (
                    //  <TextField
                    //  id="standard-basic"
                    //    type="text"
                    //    value={props.value}
                    //    disabled={!activeStep1}
                    //    onChange={e => props.onChange(e.target.value)}
                    //  />
                    <View>
                      {(() => {
                        if (props.rowData !== undefined) {
                          if (
                            props.rowData.internationalshipping === undefined
                          ) {
                            return (
                              <TextField
                                id="standard-basic"
                                type="text"
                                value={props.value}
                                disabled={true}
                                onChange={(e) => props.onChange(e.target.value)}
                              />
                            );
                          } else if (
                            props.rowData.internationalshipping === false
                          ) {
                            return (
                              <TextField
                                id="standard-basic"
                                type="text"
                                value={props.value}
                                disabled={true}
                                onChange={(e) => props.onChange(e.target.value)}
                              />
                            );
                          } else {
                            return (
                              <TextField
                                id="standard-basic"
                                type="text"
                                value={props.value}
                                disabled={false}
                                onChange={(e) => props.onChange(e.target.value)}
                              />
                            );
                          }
                        }
                      })()}
                    </View>
                  ),
                },
                {
                  title: "Item Value",
                  field: "itemvalue",
                  type: "numeric",
                  render: (rowData) => (
                    <FormControlLabel
                      //onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
                      className={classes.quantitycss}
                      control={
                        <Typography
                          style={{
                            marginLeft: "20px",
                            fontSize: "2px",
                            cursor: "pointer",
                            fontFamily:
                              '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                          }}
                        >
                          <Text
                            style={{
                              fontSize: "11px",
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              transition: "all 0.25s",
                            }}
                          >
                            {rowData.itemvalue}
                          </Text>
                        </Typography>
                      }
                    />
                  ),
                  editComponent: (props) => (
                    //  <TextField
                    //  id="standard-basic"
                    //    type="text"
                    //    value={props.value}
                    //    disabled={!activeStep1}
                    //    onChange={e => props.onChange(e.target.value)}
                    //  />
                    <View>
                      {(() => {
                        if (props.rowData !== undefined) {
                          if (
                            props.rowData.internationalshipping === undefined
                          ) {
                            return (
                              <TextField
                                id="standard-basic"
                                type="text"
                                value={props.value}
                                disabled={true}
                                onChange={(e) => props.onChange(e.target.value)}
                              />
                            );
                          } else if (
                            props.rowData.internationalshipping === false
                          ) {
                            return (
                              <TextField
                                id="standard-basic"
                                type="text"
                                value={props.value}
                                disabled={true}
                                onChange={(e) => props.onChange(e.target.value)}
                              />
                            );
                          } else {
                            return (
                              <TextField
                                id="standard-basic"
                                type="text"
                                value={props.value}
                                disabled={false}
                                onChange={(e) => props.onChange(e.target.value)}
                              />
                            );
                          }
                        }
                      })()}
                    </View>
                  ),
                },
                {
                  title: "Dangerous Goods",
                  field: "dangerousgoods",
                  type: "boolean",
                  render: (rowData) => (
                    <FormControlLabel
                      // onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
                      className={classes.quantitycss}
                      control={
                        <Typography
                          style={{
                            marginLeft: "20px",
                            fontSize: "2px",
                            cursor: "pointer",
                            fontFamily:
                              '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                          }}
                        >
                          {(() => {
                            if (rowData.dangerousgoods === true) {
                              return (
                                <Text
                                  style={{
                                    fontSize: "11px",
                                    fontFamily:
                                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                    transition: "all 0.25s",
                                  }}
                                >
                                  Yes
                                </Text>
                              );
                            } else {
                              return (
                                <Text
                                  style={{
                                    fontSize: "11px",
                                    fontFamily:
                                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                    transition: "all 0.25s",
                                  }}
                                >
                                  No
                                </Text>
                              );
                            }
                          })()}
                        </Typography>
                      }
                    />
                  ),
                  editComponent: (props) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={props.value}
                          //      onChange={e =>handleChangequality(e,props)}
                          onChange={(e) => props.onChange(e.target.checked)}
                          name="qualitycontrol"
                          color="primary"
                        />
                      }
                      value="1"
                    />
                  ),
                },
                {
                  title: "Serial Number",
                  field: "serialno",
                  type: "boolean",
                  render: (rowData) => (
                    <FormControlLabel
                      control={
                        <Typography
                          style={{
                            marginLeft: "20px",
                            fontSize: "2px",
                            cursor: "pointer",
                            fontFamily:
                              '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                          }}
                        >
                          {(() => {
                            if (rowData.serialno === true) {
                              return (
                                <Text
                                  style={{
                                    fontSize: "11px",
                                    fontFamily:
                                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                    transition: "all 0.25s",
                                  }}
                                >
                                  Yes
                                </Text>
                              );
                            } else {
                              return (
                                <Text
                                  style={{
                                    fontSize: "11px",
                                    fontFamily:
                                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                    transition: "all 0.25s",
                                  }}
                                >
                                  No
                                </Text>
                              );
                            }
                          })()}
                        </Typography>
                      }
                    />
                  ),
                  editComponent: (props) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={props.value}
                          //      onChange={e =>handleChangequality(e,props)}
                          onChange={(e) => props.onChange(e.target.checked)}
                          name="qualitycontrol"
                          color="primary"
                        />
                      }
                      value="1"
                    />
                  ),
                },
                {
                  title: "Do Not Process",
                  field: "isprocess",
                  type: "boolean",
                  render: (rowData) => (
                    <FormControlLabel
                      //  onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
                      className={classes.quantitycss}
                      control={
                        <Typography
                          style={{
                            marginLeft: "20px",
                            fontSize: "2px",
                            cursor: "pointer",
                            fontFamily:
                              '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                          }}
                        >
                          {(() => {
                            if (rowData.isprocess === true) {
                              return (
                                <Text
                                  style={{
                                    fontSize: "11px",
                                    fontFamily:
                                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                    transition: "all 0.25s",
                                  }}
                                >
                                  Product Deactivated
                                </Text>
                              );
                            } else {
                              return (
                                <Text
                                  style={{
                                    fontSize: "11px",
                                    fontFamily:
                                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                    transition: "all 0.25s",
                                  }}
                                ></Text>
                              );
                            }
                          })()}
                        </Typography>
                      }
                    />
                  ),
                  editComponent: (props) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={props.value}
                          //      onChange={e =>handleChangequality(e,props)}
                          onChange={(e) => props.onChange(e.target.checked)}
                          name="qualitycontrol"
                          color="primary"
                        />
                      }
                      value="1"
                    />
                  ),
                },
                {
                  title: "Packaging",
                  field: "packaging",
                  //lookup: { 1: 'Corrugated Box', 2: 'Letter' },

                  //lookup: { 1: 'Envelope', 2: 'Courier Bags' ,3:'Poly Bubble Mailer',4:'Corrugated Box',5:'Corrugated Box (Heavy Duty)',6:'Corrugated Box (Cube)'},
                  lookup: packageDataPro11,
                  //  editComponent: props => (
                  //   <FormControl className={classes.formControl}>

                  //   <Select
                  //     labelId="demo-simple-select-label"
                  //     id="demo-simple-select"
                  //     value={4}
                  //     onChange={e =>handleChangeSource(e,props)}
                  //   >
                  //     <MenuItem value={0}>
                  //     Select Source</MenuItem>
                  //   {data1.map(option => (
                  //     <MenuItem value={option.packaggingId}>
                  //     {option.packaggingName}</MenuItem>

                  //    ))}

                  //   </Select>
                  // </FormControl>
                  // )
                },
                {
                  title: "Promotional Inserts",
                  field: "promotionalpackaging",
                  //lookup: { 1: 'Corrugated Box', 2: 'Letter' },

                  lookup: packageDataPro111,
                },
                {
                  title: "Total Stock",
                  field: "losangelesstock1",
                  type: "text",
                  editable: "never",
                  render: (rowData) => (
                    <Text>
                      {(() => {
                        if (rowData !== undefined) {
                          if (
                            rowData.torontostock !== null &&
                            rowData.losangelesstock !== null
                          ) {
                            return (
                              <FormControlLabel
                                // onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
                                className={classes.quantitycss}
                                control={
                                  <Typography
                                    style={{
                                      marginLeft: "20px",
                                      fontSize: "2px",
                                      cursor: "pointer",
                                      fontFamily:
                                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                    }}
                                  >
                                    <Text
                                      style={{
                                        fontSize: "11px",
                                        fontFamily:
                                          '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                        transition: "all 0.25s",
                                      }}
                                    >
                                      {parseInt(rowData.losangelesstock) +
                                        parseInt(rowData.torontostock)}
                                    </Text>
                                  </Typography>
                                }
                              />
                            );
                          } else if (
                            rowData.torontostock === null &&
                            rowData.losangelesstock !== null
                          ) {
                            return (
                              <FormControlLabel
                                // onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
                                className={classes.quantitycss}
                                control={
                                  <Typography
                                    style={{
                                      marginLeft: "20px",
                                      fontSize: "2px",
                                      cursor: "pointer",
                                      fontFamily:
                                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                    }}
                                  >
                                    <Text
                                      style={{
                                        fontSize: "11px",
                                        fontFamily:
                                          '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                        transition: "all 0.25s",
                                      }}
                                    >
                                      {parseInt(rowData.losangelesstock)}
                                    </Text>
                                  </Typography>
                                }
                              />
                            );
                          } else if (
                            rowData.torontostock === null &&
                            rowData.losangelesstock === null
                          ) {
                            return (
                              <FormControlLabel
                                // onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
                                className={classes.quantitycss}
                                control={
                                  <Typography
                                    style={{
                                      marginLeft: "20px",
                                      fontSize: "2px",
                                      cursor: "pointer",
                                      fontFamily:
                                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                    }}
                                  >
                                    <Text
                                      style={{
                                        fontSize: "11px",
                                        fontFamily:
                                          '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                        transition: "all 0.25s",
                                      }}
                                    >
                                      0
                                    </Text>
                                  </Typography>
                                }
                              />
                            );
                          } else if (
                            rowData.torontostock !== null &&
                            rowData.losangelesstock === null
                          ) {
                            return (
                              <FormControlLabel
                                //  onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
                                className={classes.quantitycss}
                                control={
                                  <Typography
                                    style={{
                                      marginLeft: "20px",
                                      fontSize: "2px",
                                      cursor: "pointer",
                                      fontFamily:
                                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                    }}
                                  >
                                    <Text
                                      style={{
                                        fontSize: "11px",
                                        fontFamily:
                                          '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                        transition: "all 0.25s",
                                      }}
                                    >
                                      {parseInt(rowData.torontostock)}
                                    </Text>
                                  </Typography>
                                }
                              />
                            );
                          }
                        }
                      })()}
                    </Text>
                  ),
                },
                {
                  title: "Toronto Stock",
                  field: "torontostock",
                  type: "text",
                  editable: "never",
                },
                {
                  title: "Los Angeles Stock",
                  field: "losangelesstock",
                  type: "text",
                  editable: "never",
                },
                {
                  title: "Total Sold",
                  field: "totalsold",
                  type: "numeric",
                  editable: "never",
                  hidden: true,
                  render: (rowData) => (
                    <FormControlLabel
                      // onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
                      className={classes.quantitycss}
                      control={
                        <Typography
                          style={{
                            marginLeft: "20px",
                            fontSize: "2px",
                            cursor: "pointer",
                            fontFamily:
                              '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                          }}
                        >
                          <Text
                            style={{
                              fontSize: "11px",
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              transition: "all 0.25s",
                            }}
                          >
                            {rowData.totalsold}
                          </Text>
                        </Typography>
                      }
                    />
                  ),
                },
                {
                  title: "itemquantity",
                  field: "itemquantity",
                  type: "numeric",
                  editable: "never",
                  hidden: true,
                },
              ],
              data: [],
            });
          }
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const promotionalDataAdd = {};
  promotionalPackage.map((orderCouierOp) => {
    const { packaggingId, packaggingName } = orderCouierOp;
    promotionalDataAdd[packaggingId] = packaggingName;
  });

  React.useEffect(() => {
    fetchPackingList1();
    fetchProductList();
  }, []);

  var uuid = 0;
  const fetchProductList = () => {
    if (sellerid === 0) {
      uuid = userid;
    } else {
      uuid = sellerid;
    }
    //const userid=5;
    setLoading(true);
    shiphypeservice
      .fetchProductList(uuid)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].itemvalue === 0) {
              response.data[i].itemvalue = "";
            }
          }
          setDataProduct(response.data);
          setStateproduct1((prevState) => {
            const data = [];

            return { ...prevState, data };
          });
          setState((prevState) => {
            const data = [];

            return { ...prevState, data };
          });

          setStateproduct1((prevState) => {
            const data = [...prevState.data];

            for (let i = 0; i < response.data.length; i++) {
              data.push(response.data[i]);
            }

            return { ...prevState, data };
          });

          setState((prevState) => {
            const data = [...prevState.data];

            for (let i = 0; i < response.data.length; i++) {
              ids1.push(response.data[i]);
              data.push(response.data[i]);
            }

            return { ...prevState, data };
          });
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchProductList1 = (uuid) => {
    setLoading(true);
    shiphypeservice
      .fetchProductList(uuid)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].itemvalue === 0) {
              response.data[i].itemvalue = "";
            }
          }
          setDataProduct(response.data);

          setStateproduct1((prevState) => {
            const data = [];

            return { ...prevState, data };
          });
          setState((prevState) => {
            const data = [];
            return { ...prevState, data };
          });

          setState((prevState) => {
            const data = [...prevState.data];

            for (let i = 0; i < response.data.length; i++) {
              ids1.push(response.data[i]);
              data.push(response.data[i]);
            }

            return { ...prevState, data };
          });
          setStateproduct1((prevState) => {
            const data = [...prevState.data];

            for (let i = 0; i < response.data.length; i++) {
              data.push(response.data[i]);
            }

            return { ...prevState, data };
          });
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteMultipleProduct = () => {
   
    shiphypeservice
      .deleteProduct(changedWarehouseid)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setOpen(true);
          setType("success");
          setMsg(response.message);
          setStatus(response.status);
          setLoading(false);

          // setStateproduct1((prevState) => {
          //   const data = [...prevState.data];
          //   data.splice(data.indexOf(oldData), 1);
          //   return { ...prevState, data };
          // });
          fetchProductList();
        } else {
          setOpen(true);
          setType("error");
          setMsg("Fail to delete Product becasue it used somewhere.");
          setStatus(response.status);
          setLoading(false);
          fetchProductList();
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteProduct = (customproduct_id, oldData) => {
    var pushds = [];
    pushds.push(customproduct_id);
    shiphypeservice
      .deleteProduct(pushds)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setOpen(true);
          setType("success");
          setMsg(response.message);
          setStatus(response.status);
          setLoading(false);

          setStateproduct1((prevState) => {
            const data = [...prevState.data];
            data.splice(data.indexOf(oldData), 1);
            return { ...prevState, data };
          });
          //fetchProductList();
        } else {
          setOpen(true);
          setType("error");
          setMsg("Fail to delete Product becasue it used somewhere.");
          setStatus(response.status);
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
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
    tor,
    los,
    shiphypeSKU,
    prmot
  ) => {
    if (tor === null) {
      tor = 0;
    }
    if (los === null) {
      los = 0;
    }
    if (prmot === null) {
      prmot = 0;
    }
    if (isprocess === undefined) {
      isprocess = false;
    }
    if (isNaN(isprocess)) {
      isprocess = false;
    }
    if (isprocess === null) {
      isprocess = false;
    }

    if (serialno === undefined) {
      serialno = false;
    }
    if (isNaN(serialno)) {
      serialno = false;
    }
    if (serialno === null) {
      serialno = false;
    }

    // serialno
    if (packaging === 0) {
      setOpen2(true);
      //packaging=valueofsouceid;
    } else if (productname === "") {
      setOpenProductName(true);
      //packaging=valueofsouceid;
    } else if (internationalshipping === true) {
      if (hscode === undefined) {
        setOpen11(true);
      } else if (itemvalue === undefined) {
        setOpen11(true);
      } else if (hscode === null) {
        setOpen11(true);
      } else if (itemvalue === null) {
        setOpen11(true);
      } else {
        setLoading(true);

        shiphypeservice
          .updateProduct1(
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
            tor,
            los,
            shiphypeSKU,
            prmot,
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
              //fetchProductList();
            } else if (response.status === 400) {
              setOpen(true);
              setType("error");
              setMsg("Packaging is required");
              setStatus(true);
              setLoading(false);
              console.log("message", response.message);
            } else {
              setOpen(true);
              setType("error");
              setMsg(response.message);
              setStatus(true);
              setLoading(false);
              console.log("message", response.message);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    } else {
      if (itemvalue === null) {
        itemvalue = 0;
      }
      if (isNaN(itemvalue)) {
        itemvalue = 0;
      }
      setLoading(true);

      shiphypeservice
        .updateProduct1(
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
          tor,
          los,
          shiphypeSKU,
          prmot,
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
            // fetchProductList();
          } else if (response.status === 400) {
            setOpen(true);
            setType("error");
            setMsg("Packaging is required");
            setStatus(true);
            setLoading(false);
            console.log("message", response.message);
          } else {
            setOpen(true);
            setType("error");
            setMsg(response.message);
            setStatus(true);
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
  var newArr = [];
  React.useEffect(() => {
    // fetchProductListOfLastWeek();
    fetchUserInfo();
  }, []);

  const fetchUserInfo = () => {
    //const userid=5;
    setLoading(true);
    shiphypeservice
      .fetchUserInfo()
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          for (let a = 0; a < response.data.length; a++) {
            if (response.data[a].userEmail === "") {
              var myObject = {};
              response.data[a].id
                ? (myObject["id"] = response.data[a].id)
                : null;
              response.data[a].displayName
                ? (myObject["displayName"] = response.data[a].displayName)
                : null;
              response.data[a].displayName
                ? (myObject["name"] = response.data[a].displayName)
                : null;
              newArr.push(myObject);
            } else {
              var myObject = {};
              response.data[a].id
                ? (myObject["id"] = response.data[a].id)
                : null;
              response.data[a].displayName
                ? (myObject["displayName"] = response.data[a].displayName)
                : null;
              response.data[a].userEmail
                ? (myObject["name"] = response.data[a].userEmail)
                : null;
              newArr.push(myObject);
            }
          }
          console.log("array", newArr);
          setUserData(newArr);
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  var flag1 = false;
 
  const handleChangeCheckbox2 = (data) => {
   
    if (ids.length === 0) {
      ids.push(data);
      
    } else {
      for (let i = 0; i < ids.length; i++) {
        if (data !== ids[i]) {
          //ids.push(data);
          flag1 = true;
        } else {
          flag1 = false;
          break;
        }
      }
      if (flag1 === true) {
        ids.push(data);
       
      } else {
        const index = ids.indexOf(data);
        if (index > -1) {
          ids.splice(index, 1);
         
        }
       
      }
    }
   
    const updatedaray=[...ids];

    setchangedWarehouseid(updatedaray);
   
   
  };


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


  let screenWidth = Dimensions.get("window").width;

  return (
    <View className={classes.content}>
      {/* <ScrollView> */}
      <View className={classes.appBarSpacer} />
      <View>
        <Grid item container lg={12} style={popUpStyle.breadCrumSidePadding}>
          <Grid item lg={7}>
            <Link
              onClick={() => {
                props.handleDashboard("01");
              }}
            >
              <Text style={popUpStyle.breadCrundCss1}>DASHBOARD /</Text>
            </Link>
            <Text style={popUpStyle.breadCrundCss2}> PRODUCTS {"\n"} </Text>
          </Grid>
          <Grid item lg={5} style={{ marginTop: "15px" }}>
            <Grid justify="flex-end" container>
              <Grid item style={{ marginRight: "20px" }}>
                {userRoleId === 1 ? (
                  <Grid
                    item
                    style={{
                      marginTop: "1px",
                      marginBottom: "10px",
                      padding: "0",
                    }}
                  >
                    <Autocomplete
                      id="combo-box-demo"
                      fullWidth
                      options={userData}
                      getOptionLabel={(option) => option.name}
                      style={{ width: 400 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size="small"
                          placeholder="Search Seller"
                          variant="outlined"
                        />
                      )}
                      onChange={(event, newValue) => {
                        if (newValue !== null) {
                          fetchSellerProductPackingList(newValue.id);
                          setSellerid(newValue.id);
                        } else {
                          setDataProduct([]);

                          setStateproduct1((prevState) => {
                            const data = [];

                            return { ...prevState, data };
                          });
                          setState((prevState) => {
                            const data = [];
                            return { ...prevState, data };
                          });

                          setState((prevState) => {
                            const data = [];

                            return { ...prevState, data };
                          });
                          setStateproduct1((prevState) => {
                            const data = [];

                            return { ...prevState, data };
                          });
                        }
                        console.log("newvalue", newValue);
                      }}
                    />
                  </Grid>
                ) : (
                  ""
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </View>
      <View className={classes.paper9}>
        <Grid justify="center">
          <ProgressBar loading={loading} />
        </Grid>

        <View style={popUpStyle.paddingSide}>
          <Grid>
            {" "}
            {openProduct === false ? (
              " "
            ) : (
              <ProductOption
                userid={userid}
                openProductCard={openProduct}
                handleAddProductManually={handleAddProductManually}
                handleDeleteCancle={handleDeleteCancle}
              />
            )}
            <Snackbar
              anchorOrigin={{ vertical, horizontal }}
              key={`${vertical},${horizontal}`}
              open={open11}
              autoHideDuration={3000}
              onClose={handleClose31}
            >
              <Alert onClose={handleClose31} severity="error">
                H.S. Code and Item value must be for items shipping
                international.
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
              open={openProductName}
              autoHideDuration={3000}
              onClose={handleCloseProductName}
            >
              <Alert onClose={handleCloseProductName} severity="error">
                Product Name must be filled.
              </Alert>
            </Snackbar>
          </Grid>

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
                Product List
              </Text>
            }
            columns={state.columns}
            data={stateproduct1.data}
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
                actions: "Action",
              },
            }}
            actions={[
              {
          tooltip: 'Remove All Selected Product',
          icon: () => <ColorButtonAdd
          size='large'
          variant="contained"
          color="primary"
          //startIcon={<AddIcon />}
          >
        Remove Products
        </ColorButtonAdd>,
         onClick: (event, rowData) => {
          deleteMultipleProduct();
        },
        },
{
                icon: () => (
                  <ColorButtonAdd
                    size="large"
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                  >
                    Product
                  </ColorButtonAdd>
                ),
                iconProps: { style: { fontSize: "14px", color: "green",paddingRight:0 } },
                onClick: (event, rowData) => {
                  opennewOrder();
                },
                isFreeAction: true,
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
                  iconProps: { style: { fontSize: "14px", color: "green",paddingLeft:0 } },
                  isFreeAction: true,
                  onClick: (event) => fetchProductList(),
                },
             
              
            ]}
           
            options={{
              paging: true,
              maxBodyHeight: "60vh",
              doubleHorizontalScroll: true,
              headerStyle: { position: "sticky", top: 0 },
              pageSize: 10,
              pageSizeOptions: [10, 20, 30, 40, 50, 100],
              showTitle: true,
              addRowPosition: "first",
              actionsColumnIndex: -1,
              exportFileName: "Product Table",
              headerStyle: {
                backgroundColor: "#cccccc",
                color: "#000",
                textTransform: "uppercase",
                width: 26,
                whiteSpace: "nowrap",
                textAlign: "left",
                flexDirection: "row",
                overflow: "hidden",
                textOverflow: "ellipsis",
                paddingLeft: 5,
                paddingTop: 8,
                paddingBottom: 8,
                paddingRight: 0,
                fontSize: "12px",
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
                fontSize: "12px",
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
              
              search: true,
              exportButton: false,
              
               selection: true,
          showTextRowsSelected: false,
          showSelectAllCheckbox:false,
          selectionProps: rowData => ({
           
            // checked: rowData.customproductId === changedWarehouseid,
             color: 'primary'
          
         
        })

        
              // exportCsv: (columns, data) => {
              //   alert('You should develop a code to export ' + data.length + ' rows');
              // }
            }}
            onSelectionChange={(rows) => {
        handleChangeCheckbox(rows);
    }}
            onRowClick={(event, rowData) => {
              console.log("rowclick", rowData);
              setOpenChekced(false);
              //handleChangeRowClickCustome(rowData.internalorderId);
              handleChangeCheckbox2(rowData.internalorderId);
              setStateproduct1((prevState) => {
                let data1 = [...prevState.data];
                      let index = data1.indexOf(rowData);
                      data1[index].tableData.checked = !data1[index].tableData.checked;

                    return { ...prevState, data1 };
                  });
            }}
            editable={{
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    {
                      const dataup = stateproduct1.data;
                      const index1 = dataup.indexOf(oldData);

                      const data1 = stateproduct1.data;
                      const index = dataup.indexOf(oldData);
                      const customproduct_id = dataup[index].customproductId;
                      console.log("sku", newData.productsku);
                      console.log("name", newData.productname);
                      console.log("customproduct_id", customproduct_id);
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
                        parseInt(currencyvalue),
                        currency,
                        newData.itemquantity,
                        newData.packaging,
                        newData.userid,
                        newData.torontostock,
                        newData.losangelesstock,
                        newData.shiphypeSku,
                        newData.promotionalpackaging
                      );

                      setStateproduct1((prevState) => {
                        const data = [...prevState.data];
                        data[data.indexOf(oldData)] = newData;
                        return { ...prevState, data };
                      });
                    }
                    resolve();
                  }, 1000);
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    {
                      const data1 = stateproduct1.data;
                      const index = data1.indexOf(oldData);
                      const customproduct_id =
                        stateproduct1.data[index].customproductId;
                      deleteProduct(customproduct_id, oldData);
                    }
                    resolve();
                  }, 1000);
                }),
            }}
          />
          {/* )} */}
          {showToast(open, msg, type)}
        </View>
      </View>

      {/* </ScrollView> */}
    </View>
  );
}

Slide17.propTypes = {
  openImportProduct: PropTypes.bool,
  handleSprintCancel: PropTypes.func,
  handleNextPage: PropTypes.func,
};
