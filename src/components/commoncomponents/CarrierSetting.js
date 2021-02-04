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
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import * as shiphypeservice from "./ShipService/shiphype_service";
import Toast from "./feedback/Toast";
import ProgressBar from "./feedback/ProgressBar";
import TextField from "@material-ui/core/TextField";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import popStyle from "./style/popUpStyle";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import MaterialTable, { MTableToolbar } from "material-table";
import { forwardRef } from "react";
import Paper from "@material-ui/core/Paper";
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
import Link from "@material-ui/core/Link";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AddIcon from "@material-ui/icons/Add";
const ColorButtonAdd = withStyles((theme) => ({
  root: {
    borderRadius: "3px",
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    //marginTop:'3%',
    height: "100%",
    padding: "3px",
    width: "250px",
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
const ColorButtonEditRestication = withStyles((theme) => ({
  root: {
    borderRadius: "3px",
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    //marginTop:'3%',
    height: "100%",
    padding: "3px",
    width: "200px",
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
const StyledMTableToolbar = withStyles({
  root: {
    paddingLeft: 0,
    paddingRight: 0,
  },
})(MTableToolbar);
const tableIcons = {
  Add: () => (
    <ColorButtonAdd
      size="large"
      variant="contained"
      color="primary"
      startIcon={<Edit />}
    >
      EDIT SHIPPING POLICIES
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
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  CloudUpload: forwardRef((props, ref) => (
    <CloudUploadIcon {...props} ref={ref} />
  )),
};
const tableIcons2 = {
  Add: () => (
    <ColorButtonEditRestication
      size="large"
      variant="contained"
      color="primary"
      startIcon={<Edit/>}
    >
      EDIT RESTRICTIONS
    </ColorButtonEditRestication>
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
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  CloudUpload: forwardRef((props, ref) => (
    <CloudUploadIcon {...props} ref={ref} />
  )),
};

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(0, 0, 0),
    borderRadius: 0,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(2),
    flexGrow: 1,
    height: "70vh",
    overflow: "auto",
    backgroundColor: "#fff",
  },
  content1: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(2),
    flexGrow: 1,
    height: "80vh",
    overflow: "auto",
    backgroundColor: "#fff",
  },

  profileMargin10: {},
  profileMargin1: {
    marginTop: theme.spacing(2),
    borderRadius: "5px",

    //  marginBottom: theme.spacing(1),
  },
}));

//Make custom button
const ColorButton = withStyles((theme) => ({
  root: {
    color: "#fff",
    borderRadius: "3px",
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    height: "70%",
    width: "100px",
    fontSize: "11px",
    fontWeight: "550",
    color: "#fff",
    backgroundColor: "#0168fa",
    "&:hover": {
      backgroundColor: "#002080",
    },
  },
}))(Button);

/**
 * Description:This function is used for Slide17
 * @param {*} props
 */
export default function Slide17(props) {
  const classes = useStyles();
  //const policyData =props.policyData;

  const policyData = props.policyData;
  const policyDataId = props.policyDataId;
  const sourcePo = props.sourcePo;

  const [shipData, setShipData] = React.useState([]);
  const { openShipPolicy } = props;
  const userid = props.user_id;
  const [loading, setLoading] = React.useState(true);
  const [userData, setUserData] = React.useState([]);
  const [checkA, setCheckedA] = React.useState(true);
  const [ischeck, setIsChecked] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [type, setType] = React.useState("");
  const [status, setStatus] = React.useState(false);
  const [setupdateadd, setupadteAdd] = React.useState(false);
  const [state1, setState1] = React.useState([]);
  const [alreadyEbay, setalreadyEbay] = React.useState(false);
  const [alreadyWoo, setalreadyWoo] = React.useState(false);
  const [alreadyShopify, setalreadyShopify] = React.useState(false);
  const [shipRestricationData, setShipRestricationData] = React.useState([]);
  const {} = state1;
  var valueofsouceid = 0;
  var valueofwarehouseid = 0;
  var valueofsoucedata = 1;
  const shipemntId = [];
  var policyid = 0;
  var service = 1;
  var shipentTypedata = false;
  const userRoleId = parseInt(window.localStorage.roleId);
  const [shippingPolicyStatus, setShippingPolicyStatus] = React.useState(false);

  const shiptype1 = {
    1: "Standard Shipping",
    2: "2-Day Shipping",
    3: "Overnight Shipping",
  };
  const shiptype1data = [
    {
      value: 1,
      label: "Standard Shipping",
    },
    {
      value: 2,
      label: "2-Day Shipping",
    },
    {
      value: 3,
      label: "Overnight Shipping",
    },
  ];
  const shiptype2 = {
    4: "Standard Postage",
    5: "Oversize LetterMail",
  };
  const shiptype2data = [
    {
      value: 4,
      label: "Standard Postage",
    },
    {
      value: 5,
      label: "Oversize LetterMail",
    },
  ];
  const shiptype3 = {
    6: "Pallet Freight",
  };
  const shiptype3data = [
    {
      value: 6,
      label: "Pallet Freight",
    },
  ];

  const orderdestination1 = {
    1: "Canada",
    2: "USA",
    3: "International",
  };
  const orderdestination1data = [
    {
      value: 1,
      label: "Canada",
    },
    {
      value: 2,
      label: "USA",
    },
    {
      value: 3,
      label: "International",
    },
  ];

  const import1 = {
    1: "Yes",
    2: "No",
  };
  const import1data = [
    {
      value: 1,
      label: "Yes",
    },
    {
      value: 2,
      label: "No",
    },
  ];

  const warehouse1 = {
    1: "USA Warehouse",
    2: "Canada Warehouse",
  };
  const warehouse1data = [
    {
      value: 1,
      label: "USA Warehouse",
    },
    {
      value: 2,
      label: "Canada Warehouse",
    },
  ];

  var shiptyepdata = shiptype1;
  var shiptype2data1 = shiptype1data;

  const [shiipingplociyData, setShippingPolicyData] = React.useState([]);

  const [sorceId, setSorceId] = React.useState(0);
  const [warhouseId, setWarehouseId] = React.useState(0);
  const [sericeId, setsericeId] = React.useState(1);
  const [shipemtntypeid, setShipmetnIdId] = React.useState(1);
  const [shipploicyId, setShipploicyId] = React.useState(0);

  let activeStep1=false;
  let isCanada=false;
  let isUsa=false;
  let isInternationl=false;

  /**
   * Description:To do fetch all warehouse for user
   */

  const [state, setState] = React.useState({
    column1FilterList: {},
    columns: [
      {
        title: "Source",
        field: "source",
        lookup: policyData,
        editComponent: (props) => (
          <FormControl className={classes.formControl}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={props.value}
              onChange={(e) => handleChangeSource(e, props)}
            >
              <MenuItem value={0}>Select Source</MenuItem>
              {sourcePo.map((option) => (
                <MenuItem value={option.integrationId}>
                  {option.integrationName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ),
      },
      {
        title: "Policy Name",
        field: "integrationspoliciesId",
        lookup: { 1: "Parcel", 2: "LetterMail", 3: "LTL" },
        editable: "never",
        hidden: true,
      },

      {
        title: "Warehouse",
        field: "warehouseid",
        lookup: { 1: "US Warehouse", 2: "Canada Warehouse" },
        hidden: true,

        editComponent: (props) => (
          <FormControl className={classes.formControl}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={props.value}
              onChange={(e) => handleChangeWarehouseId(e, props)}
            >
              <MenuItem value={0}>Select Warehouse</MenuItem>
              <MenuItem value={1}>US Warehouse</MenuItem>
              <MenuItem value={2}>Canada Warehouse</MenuItem>
            </Select>
          </FormControl>
        ),
      },
      {
        title: "Shipment Type",
        field: "shipmenttype",
        lookup: { 1: "Parcel", 2: "LetterMail", 3: "LTL" },

        editComponent: (props) => (
          <FormControl className={classes.formControl}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={1}
              onChange={(e) => handleChangeShipmentType(e, props)}
            >
              <MenuItem value={0}>Select Shipment Type</MenuItem>
              <MenuItem value={1}>Parcel</MenuItem>
              <MenuItem value={2}>LetterMail</MenuItem>
              <MenuItem value={3}>LTL</MenuItem>
            </Select>
          </FormControl>
        ),
      },
      {
        title: "Shipping Service",
        field: "shippingserviceid",
        lookup: { 1: "Parcel", 2: "LetterMail", 3: "LTL" },
        editComponent: (props) => (
          <FormControl className={classes.formControl}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={1}
              onChange={(e) => handleChangeShippingService(e, props)}
            >
              <MenuItem value={0}>Select Shipping Service</MenuItem>
              <MenuItem value={1}>Standard Shipping</MenuItem>
              <MenuItem value={2}>2-Day Shipping</MenuItem>
              <MenuItem value={3}>Overnight Shipping</MenuItem>
            </Select>
          </FormControl>
        ),
      },
    ],
  });

  const handleChangequality = (event,props) => {
   
     console.log("onchnage",event.target.value);
    props.onChange(event.target.value);    
      };

      const handleChangequality2 = (event,props) => {
   
        console.log("onchnage2",event.target.value);
        console.log("canda",isCanada);
        console.log("usa",isUsa);
        console.log("int",isInternationl);
        if(event.target.value == 1){
          if(isCanada == event.target.value){

          }else{
            props.onChange(event.target.value);
          }
        
        }else if(event.target.value == 2){
          if(isUsa == event.target.value){

          }else{
            props.onChange(event.target.value);
          }
        
        }else if(event.target.value == 3){
          if(isInternationl == event.target.value){

          }else{
          props.onChange(event.target.value);
        }
      }
          
         };
  const [state2, setState2] = React.useState({
    column1FilterList: {},
    columns: [
      {
        title: "Order Destination",
        field: "orderdestination",
        lookup: { 1: "Canada", 2: "USA", 3: "International" },
        editComponent: (props) => (
          <FormControl className={classes.formControl}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={props.value}
              onChange={(e) => handleChangequality2(e, props)}
            >
              <MenuItem disabled={isCanada} value={1}>Canada</MenuItem>
              <MenuItem disabled={isUsa} value={2}>USA</MenuItem>
              <MenuItem disabled={isInternationl} value={3}>International</MenuItem>
            </Select>
          </FormControl>
        ),
      },
      {
        title: "Import",
        field: "importdata",
        lookup: { 1: "Yes", 2: "No" },
        editComponent: (props) => (
          <FormControl className={classes.formControl}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={props.value}
              onChange={(e) => handleChangequality(e, props)}
            >
              <MenuItem value={1}>Yes</MenuItem>
              <MenuItem value={2}>No</MenuItem>
             
            </Select>
          </FormControl>
        ),
      },

      {
        title: "Ship From",
        field: "shippingfrom",
        lookup: { 1: "USA Warehouse", 2: "Canada Warehouse" },
        editComponent: (props) => (

          <View>
        {
          (() => {
            if(props.rowData!==undefined){
            if(props.rowData.importdata === 2)
            {
              return(
                <FormControl className={classes.formControl}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={0}
              disabled={true}
              onChange={(e) => handleChangequality(e, props)}
            >
            
             
            </Select>
          </FormControl>
        )

      }
      else{
        return(
          <FormControl className={classes.formControl}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={props.value}
              disabled={false}
              onChange={(e) => handleChangequality(e, props)}
            >
              <MenuItem value={1}>USA Warehouse</MenuItem>
              <MenuItem value={2}>Canada Warehouse</MenuItem>
             
            </Select>
          </FormControl>
        )
      }
    }
    })()}
    </View>
          
        ),
      },
    ],
  });

  React.useEffect(() => {
    fetchShipPolicy();
    //fetchCarrierSetting();
    // fetchShiphypeCompleteStep();
    fetchShipRestrication();
  }, []);

  const fetchShipPolicy = () => {
    setLoading(true);
    shiphypeservice
      .fetchShipPolicyOrder(userid, 1)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          setShippingPolicyStatus(true);
          setShipData(response.data);
          fetchCarrierSetting(response.data);
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };
  const fetchShipRestrication = () => {
    setLoading(true);
    shiphypeservice
      .fetchrestrication(userid)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setShipRestricationData(response.data);
 
          for(let i=0;i<response.data.length;i++){

            if(response.data[i].orderdestination == 1){
              isCanada=true;
            }else if(response.data[i].orderdestination == 2){
              isUsa=true;
            }else if(response.data[i].orderdestination == 3){
              isInternationl=true;
            }
          }

          setState2({
            columns: [
              {
                title: "Order Destination",
                field: "orderdestination",
                lookup: { 1: "Canada", 2: "USA", 3: "International" },
                editComponent: (props) => (
                  <FormControl className={classes.formControl}>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={props.value}
                      onChange={(e) => handleChangequality2(e, props)}
                    >
                      <MenuItem disabled={isCanada} value={1}>Canada</MenuItem>
                      <MenuItem disabled={isUsa} value={2}>USA</MenuItem>
                      <MenuItem disabled={isInternationl} value={3}>International</MenuItem>
                    </Select>
                  </FormControl>
                ),
              },
              {
                title: "Import",
                field: "importdata",
                lookup: { 1: "Yes", 2: "No" },
                editComponent: (props) => (
                  <FormControl className={classes.formControl}>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={props.value}
                      onChange={(e) => handleChangequality(e, props)}
                    >
                      <MenuItem value={1}>Yes</MenuItem>
                      <MenuItem value={2}>No</MenuItem>
                     
                    </Select>
                  </FormControl>
                ),
              },
        
              {
                title: "Ship From",
                field: "shippingfrom",
                lookup: { 1: "USA Warehouse", 2: "Canada Warehouse" },
                editComponent: (props) => (
        
                  <View>
                {
                  (() => {
                    if(props.rowData!==undefined){
                    if(props.rowData.importdata === 2)
                    {
                      return(
                        <FormControl className={classes.formControl}>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={0}
                      disabled={true}
                      onChange={(e) => handleChangequality(e, props)}
                    >
                    
                     
                    </Select>
                  </FormControl>
                )
        
              }
              else{
                return(
                  <FormControl className={classes.formControl}>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={props.value}
                      disabled={false}
                      onChange={(e) => handleChangequality(e, props)}
                    >
                      <MenuItem value={1}>USA Warehouse</MenuItem>
                      <MenuItem value={2}>Canada Warehouse</MenuItem>
                     
                    </Select>
                  </FormControl>
                )
              }
            }
            })()}
            </View>
                  
                ),
              },
            ],
          });
          setLoading(false);
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const fetchShipRestricationReferh = (user) => {
    setLoading(true);
    shiphypeservice
      .fetchrestrication(user)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setShipRestricationData(response.data);
          for(let i=0;i<response.data.length;i++){

            if(response.data[i].orderdestination == 1){
              isCanada=true;
            }else if(response.data[i].orderdestination == 2){
              isUsa=true;
            }else if(response.data[i].orderdestination == 3){
              isInternationl=true;
            }
          }

          setState2({
            columns: [
              {
                title: "Order Destination",
                field: "orderdestination",
                lookup: { 1: "Canada", 2: "USA", 3: "International" },
                editComponent: (props) => (
                  <FormControl className={classes.formControl}>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={props.value}
                      onChange={(e) => handleChangequality2(e, props)}
                    >
                      <MenuItem disabled={isCanada} value={1}>Canada</MenuItem>
                      <MenuItem disabled={isUsa} value={2}>USA</MenuItem>
                      <MenuItem disabled={isInternationl} value={3}>International</MenuItem>
                    </Select>
                  </FormControl>
                ),
              },
              {
                title: "Import",
                field: "importdata",
                lookup: { 1: "Yes", 2: "No" },
                editComponent: (props) => (
                  <FormControl className={classes.formControl}>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={props.value}
                      onChange={(e) => handleChangequality(e, props)}
                    >
                      <MenuItem value={1}>Yes</MenuItem>
                      <MenuItem value={2}>No</MenuItem>
                     
                    </Select>
                  </FormControl>
                ),
              },
        
              {
                title: "Ship From",
                field: "shippingfrom",
                lookup: { 1: "USA Warehouse", 2: "Canada Warehouse" },
                editComponent: (props) => (
        
                  <View>
                {
                  (() => {
                    if(props.rowData!==undefined){
                    if(props.rowData.importdata === 2)
                    {
                      return(
                        <FormControl className={classes.formControl}>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={0}
                      disabled={true}
                      onChange={(e) => handleChangequality(e, props)}
                    >
                    
                     
                    </Select>
                  </FormControl>
                )
        
              }
              else{
                return(
                  <FormControl className={classes.formControl}>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={props.value}
                      disabled={false}
                      onChange={(e) => handleChangequality(e, props)}
                    >
                      <MenuItem value={1}>USA Warehouse</MenuItem>
                      <MenuItem value={2}>Canada Warehouse</MenuItem>
                     
                    </Select>
                  </FormControl>
                )
              }
            }
            })()}
            </View>
                  
                ),
              },
            ],
          });
          setLoading(false);
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };


  const addShipRestrication = (orderdestination, shippingfrom, importdata) => {
    let warehouse=importdata == 2 ? 0 : shippingfrom;
    setLoading(true);
    shiphypeservice
      .addpolicyrestrication(orderdestination, warehouse, importdata, userid)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          fetchShipRestrication();
          setLoading(false);
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const updateShipRestrication = (
    usershipingpoliciesid,
    orderdestination,
    shippingfrom,
    importdata
  ) => {
    let warehouse=importdata == 2 ? 0 : shippingfrom;
    setLoading(true);
    shiphypeservice
      .updatepolicyrestrication(
        usershipingpoliciesid,
        orderdestination,
        warehouse,
        importdata,
        userid
      )
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          fetchShipRestrication();
          setLoading(false);
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const deleteShipRestrication = (usershipingpoliciesid) => {
    setLoading(true);
    shiphypeservice
      .removerestrication(usershipingpoliciesid)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          fetchShipRestrication();
          setLoading(false);
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
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
  var arrayforshipploicy = [];
  const fetchCarrierSetting = (dataShip) => {
    //  const userid=5;
    setLoading(true);
    shiphypeservice
      .fetchShippingPloicy(userid)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);

          if (response.data[0].sourceid !== null) {
            for (let i = 0; i < dataShip.length; i++) {
              for (let j = 0; j < response.data.length; j++) {
                if (
                  dataShip[i].integrationId ===
                  parseInt(response.data[j].sourceid)
                ) {
                  if (response.data[j].sourceid === "1") {
                    setalreadyEbay(parseInt("1"));
                  } else if (response.data[j].sourceid === "3") {
                    setalreadyWoo(parseInt("3"));
                  } else if (response.data[j].sourceid === "4") {
                    setalreadyShopify(parseInt("4"));
                  }

                  arrayforshipploicy.push(response.data[j]);
                  var ploi = dataShip[i].polocies;
                  //  dataShip[i].polocies.forEach(element => column1FilterList[element.integrationspoliciesId] = element.policytitle)
                  setState({
                    //   column1FilterList,
                    columns: [
                      {
                        title: "Source",
                        field: "sourceid",
                        lookup: policyData,
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
                                  if (rowData.sourceid === "3") {
                                    return (
                                      <Text
                                        style={{
                                          fontSize: "11px",
                                          fontFamily:
                                            '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                          transition: "all 0.25s",
                                        }}
                                      >
                                        WooCommerence
                                      </Text>
                                    );
                                  } else if (rowData.sourceid === "4") {
                                    return (
                                      <Text
                                        style={{
                                          fontSize: "11px",
                                          fontFamily:
                                            '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                          transition: "all 0.25s",
                                        }}
                                      >
                                        Shopify
                                      </Text>
                                    );
                                  } else if (rowData.sourceid === "1") {
                                    return (
                                      <Text
                                        style={{
                                          fontSize: "11px",
                                          fontFamily:
                                            '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                          transition: "all 0.25s",
                                        }}
                                      >
                                        Ebay
                                      </Text>
                                    );
                                  } else if (rowData.sourceid === "2") {
                                    return (
                                      <Text
                                        style={{
                                          fontSize: "11px",
                                          fontFamily:
                                            '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                          transition: "all 0.25s",
                                        }}
                                      >
                                        Amazon
                                      </Text>
                                    );
                                  }
                                })()}
                              </Typography>
                            }
                          />
                        ),
                        editComponent: (props) => (
                          <FormControl className={classes.formControl}>
                            {(() => {
                              if (props.rowData !== undefined) {
                                if (props.rowData.sourceid === "1") {
                                  return (
                                    <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      value={"1"}
                                      onChange={(e) =>
                                        handleChangeSource(e, props)
                                      }
                                    >
                                      <MenuItem value={0}>
                                        Select Source
                                      </MenuItem>
                                      {sourcePo.map((option) => (
                                        <MenuItem value={option.integrationId}>
                                          {option.integrationName}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  );
                                } else if (props.rowData.sourceid === "4") {
                                  return (
                                    <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      value={"4"}
                                      onChange={(e) =>
                                        handleChangeSource(e, props)
                                      }
                                    >
                                      <MenuItem value={0}>
                                        Select Source
                                      </MenuItem>
                                      {sourcePo.map((option) => (
                                        <MenuItem value={option.integrationId}>
                                          {option.integrationName}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  );
                                } else if (props.rowData.sourceid === "3") {
                                  return (
                                    <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      value={"3"}
                                      onChange={(e) =>
                                        handleChangeSource(e, props)
                                      }
                                    >
                                      <MenuItem value={0}>
                                        Select Source
                                      </MenuItem>
                                      {sourcePo.map((option) => (
                                        <MenuItem value={option.integrationId}>
                                          {option.integrationName}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  );
                                } else {
                                  return (
                                    <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      value={"0"}
                                      onChange={(e) =>
                                        handleChangeSource(e, props)
                                      }
                                    >
                                      <MenuItem value={0}>
                                        Select Source
                                      </MenuItem>
                                      {sourcePo.map((option) => (
                                        <MenuItem value={option.integrationId}>
                                          {option.integrationName}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  );
                                }
                              }
                            })()}
                          </FormControl>
                        ),
                      },
                      {
                        title: "Policy Name",
                        field: "integrationspoliciesId",
                        lookup: { 1: "US Warehouse", 2: "Canada Warehouse" },
                        hidden: true,
                      },

                      {
                        title: "Warehouse",
                        field: "warehouseid",
                        lookup: { 1: "US Warehouse", 2: "Canada Warehouse" },
                        hidden: true,
                        editComponent: (props) => (
                          <FormControl className={classes.formControl}>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={response.data[j].warehouseid}
                              onChange={(e) =>
                                handleChangeWarehouseId(e, props)
                              }
                            >
                              <MenuItem value={0}>Select Warehouse</MenuItem>
                              <MenuItem value={1}>US Warehouse</MenuItem>
                              <MenuItem value={2}>Canada Warehouse</MenuItem>
                            </Select>
                          </FormControl>
                        ),
                      },
                      {
                        title: "Shipment Type",
                        field: "shipmenttype",
                        lookup: { 1: "Parcel", 2: "LetterMail", 3: "LTL" },
                        render: (rowData) => (
                          <FormControlLabel
                            // onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
                            // className={classes.quantitycss}
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
                                  if (rowData.shipmenttype === "1") {
                                    return (
                                      <Text
                                        style={{
                                          fontSize: "11px",
                                          fontFamily:
                                            '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                          transition: "all 0.25s",
                                        }}
                                      >
                                        Parcel
                                      </Text>
                                    );
                                  } else if (rowData.shipmenttype === "2") {
                                    return (
                                      <Text
                                        style={{
                                          fontSize: "11px",
                                          fontFamily:
                                            '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                          transition: "all 0.25s",
                                        }}
                                      >
                                        LetterMail
                                      </Text>
                                    );
                                  } else if (rowData.shipmenttype === "3") {
                                    return (
                                      <Text
                                        style={{
                                          fontSize: "11px",
                                          fontFamily:
                                            '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                          transition: "all 0.25s",
                                        }}
                                      >
                                        LTL
                                      </Text>
                                    );
                                  }
                                })()}
                              </Typography>
                            }
                          />
                        ),
                        editComponent: (props) => (
                          <FormControl className={classes.formControl}>
                            {(() => {
                              if (props.rowData !== undefined) {
                                if (props.rowData.shipmenttype === "1") {
                                  return (
                                    <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      value={"1"}
                                      onChange={(e) =>
                                        handleChangeShipmentType(e, props)
                                      }
                                    >
                                      <MenuItem value={0}>
                                        Select Shipment Type
                                      </MenuItem>
                                      <MenuItem value={1}>Parcel</MenuItem>
                                      <MenuItem value={2}>LetterMail</MenuItem>
                                      <MenuItem value={3}>LTL</MenuItem>
                                    </Select>
                                  );
                                } else if (props.rowData.shipmenttype === "2") {
                                  return (
                                    <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      value={"2"}
                                      onChange={(e) =>
                                        handleChangeShipmentType(e, props)
                                      }
                                    >
                                      <MenuItem value={0}>
                                        Select Shipment Type
                                      </MenuItem>
                                      <MenuItem value={1}>Parcel</MenuItem>
                                      <MenuItem value={2}>LetterMail</MenuItem>
                                      <MenuItem value={3}>LTL</MenuItem>
                                    </Select>
                                  );
                                } else if (props.rowData.shipmenttype === "3") {
                                  return (
                                    <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      value={"3"}
                                      onChange={(e) =>
                                        handleChangeShipmentType(e, props)
                                      }
                                    >
                                      <MenuItem value={0}>
                                        Select Shipment Type
                                      </MenuItem>
                                      <MenuItem value={1}>Parcel</MenuItem>
                                      <MenuItem value={2}>LetterMail</MenuItem>
                                      <MenuItem value={3}>LTL</MenuItem>
                                    </Select>
                                  );
                                } else {
                                  return (
                                    <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      value={1}
                                      onChange={(e) =>
                                        handleChangeShipmentType(e, props)
                                      }
                                    >
                                      <MenuItem value={0}>
                                        Select Shipment Type
                                      </MenuItem>
                                      <MenuItem value={1}>Parcel</MenuItem>
                                      <MenuItem value={2}>LetterMail</MenuItem>
                                      <MenuItem value={3}>LTL</MenuItem>
                                    </Select>
                                  );
                                }
                              }
                            })()}
                          </FormControl>
                        ),
                      },
                      {
                        title: "Shipping Service",
                        field: "shippingserviceid",
                        lookup: {
                          1: "Standard Shipping",
                          2: "2-Day Shipping",
                          3: "Overnight Shipping",
                          4: "Standard Postage",
                          5: "Oversize LetterMail",
                          6: "Pallet Freight",
                        },
                        render: (rowData) => (
                          <FormControlLabel
                            // onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
                            // className={classes.quantitycss}
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
                                  if (rowData.shippingserviceid === 1) {
                                    return (
                                      <Text
                                        style={{
                                          fontSize: "11px",
                                          fontFamily:
                                            '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                          transition: "all 0.25s",
                                        }}
                                      >
                                        Standard Shipping
                                      </Text>
                                    );
                                  } else if (rowData.shippingserviceid === 2) {
                                    return (
                                      <Text
                                        style={{
                                          fontSize: "11px",
                                          fontFamily:
                                            '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                          transition: "all 0.25s",
                                        }}
                                      >
                                        2-Day Shipping
                                      </Text>
                                    );
                                  } else if (rowData.shippingserviceid === 3) {
                                    return (
                                      <Text
                                        style={{
                                          fontSize: "11px",
                                          fontFamily:
                                            '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                          transition: "all 0.25s",
                                        }}
                                      >
                                        Overnight Shipping
                                      </Text>
                                    );
                                  } else if (rowData.shippingserviceid === 4) {
                                    return (
                                      <Text
                                        style={{
                                          fontSize: "11px",
                                          fontFamily:
                                            '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                          transition: "all 0.25s",
                                        }}
                                      >
                                        Standard Postage
                                      </Text>
                                    );
                                  } else if (rowData.shippingserviceid === 5) {
                                    return (
                                      <Text
                                        style={{
                                          fontSize: "11px",
                                          fontFamily:
                                            '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                          transition: "all 0.25s",
                                        }}
                                      >
                                        Oversize LetterMail
                                      </Text>
                                    );
                                  } else if (rowData.shippingserviceid === 6) {
                                    return (
                                      <Text
                                        style={{
                                          fontSize: "11px",
                                          fontFamily:
                                            '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                          transition: "all 0.25s",
                                        }}
                                      >
                                        Pallet Freight
                                      </Text>
                                    );
                                  }
                                })()}
                              </Typography>
                            }
                          />
                        ),
                        editComponent: (props) => (
                          <FormControl className={classes.formControl}>
                            {(() => {
                              if (props.rowData !== undefined) {
                                if (props.rowData.shipmenttype === "1") {
                                  return (
                                    <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      value={props.rowData.shippingserviceid}
                                      onChange={(e) =>
                                        handleChangeShippingService(e, props)
                                      }
                                    >
                                      <MenuItem value={0}>
                                        Select Shipping Service
                                      </MenuItem>
                                      <MenuItem value={1}>
                                        Standard Shipping
                                      </MenuItem>
                                      <MenuItem value={2}>
                                        2-Day Shipping
                                      </MenuItem>
                                      <MenuItem value={3}>
                                        Overnight Shipping
                                      </MenuItem>
                                    </Select>
                                  );
                                } else if (props.rowData.shipmenttype === "2") {
                                  return (
                                    <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      value={props.rowData.shippingserviceid}
                                      onChange={(e) =>
                                        handleChangeShippingService(e, props)
                                      }
                                    >
                                      <MenuItem value={0}>
                                        Select Shipping Service
                                      </MenuItem>

                                      <MenuItem value={4}>
                                        Standard Postage
                                      </MenuItem>
                                      <MenuItem value={5}>
                                        Oversize LetterMail
                                      </MenuItem>
                                    </Select>
                                  );
                                } else if (props.rowData.shipmenttype === "3") {
                                  return (
                                    <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      value={props.rowData.shippingserviceid}
                                      onChange={(e) =>
                                        handleChangeShippingService(e, props)
                                      }
                                    >
                                      <MenuItem value={0}>
                                        Select Shipping Service
                                      </MenuItem>

                                      <MenuItem value={6}>
                                        Pallet Freight
                                      </MenuItem>
                                    </Select>
                                  );
                                } else {
                                  return (
                                    <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      value={1}
                                      onChange={(e) =>
                                        handleChangeShippingService(e, props)
                                      }
                                    >
                                      <MenuItem value={0}>
                                        Select Shipping Service
                                      </MenuItem>
                                      <MenuItem value={1}>
                                        Standard Shipping
                                      </MenuItem>
                                      <MenuItem value={2}>
                                        2-Day Shipping
                                      </MenuItem>
                                      <MenuItem value={3}>
                                        Overnight Shipping
                                      </MenuItem>
                                    </Select>
                                  );
                                }
                              }
                            })()}
                          </FormControl>
                        ),
                      },
                    ],
                  });
                }
              }
            }
            setupadteAdd(true);
            setCheckedA(false);
          }

          //bindData(response.data[0]);
          // var carrDat=[];
          //carrDat.push(response.data[0]);
          setShippingPolicyData(arrayforshipploicy);
          // setSorceId(response.data[0].sourceid);
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const setShipementIdModule = (isSprintCreate) => {
    props.shipementIdModule(isSprintCreate);
    //props.handleNext(isSprintCreate);
  };
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

  /*
   * Description:To do close poup after successfully create sprint and on click cancel button
   * @param {*} issprintCreate
   */
  const handleClose1 = (isSprintCreate) => {
    props.handleSprintCancel(isSprintCreate);
  };
  const addNew = (so1, po, wo, sh, shippingserviceid) => {
    setLoading(true);
    if (sorceId === alreadyEbay) {
      setOpen(true);
      setType("error");
      setMsg("Ebay Shipping Policy already added, You can update Ebay Policy");
      setStatus(true);
      setLoading(false);
      service = 1;
      valueofsoucedata = 1;
      valueofsouceid = 0;
      setsericeId(1);
      setShipmetnIdId(1);
      setSorceId(0);
      fetchShipPolicy();
    } else if (sorceId === alreadyShopify) {
      setOpen(true);
      setType("error");
      setMsg(
        "Shopify Shipping Policy already added, You can update Shopify Policy"
      );
      setStatus(true);
      setLoading(false);
      service = 1;
      valueofsoucedata = 1;
      valueofsouceid = 0;
      setsericeId(1);
      setShipmetnIdId(1);
      setSorceId(0);
      fetchShipPolicy();
    } else if (sorceId === alreadyWoo) {
      setOpen(true);
      setType("error");
      setMsg("Woo Shipping Policy already added, You can update Woo Policy");
      setStatus(true);
      setLoading(false);
      service = 1;
      valueofsoucedata = 1;
      valueofsouceid = 0;
      setsericeId(1);
      setShipmetnIdId(1);
      setSorceId(0);
      fetchShipPolicy();
    } else {
      setLoading(true);
      const sih = [];
      sih.push(shipploicyId);
      shiphypeservice
        .addShipemntPolicy(
          sih,
          userid,
          warhouseId,
          shipemtntypeid,
          sorceId,
          sericeId
        )
        .then((response) => {
          console.log("status", response.status);
          if (response.status === true) {
            setOpen(true);
            setType("success");
            setMsg(response.message);
            setStatus(response.status);
            setLoading(false);
            service = 1;
            valueofsoucedata = 1;
            valueofsouceid = 0;
            setsericeId(1);
            setShipmetnIdId(1);
            setSorceId(0);
            setSorceId(0);
            //  addStepStatus();
            fetchShipPolicy();
          } else {
            setOpen(true);
            setType("success");
            setMsg(response.message);
            setStatus(response.status);
            setLoading(false);
            service = 1;
            valueofsoucedata = 1;
            valueofsouceid = 0;
            setsericeId(1);
            setShipmetnIdId(1);
            setSorceId(0);
            fetchShipPolicy();
            //  addStepStatus();
            // fetchShipPolicy();
            //   setLoading(false);
            console.log("message", response.message);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  const updateNew = (q1, so1, po, wo, sh, shippingserviceid) => {
    setLoading(true);
    var so23 = so1;
    var so233 = sh;
    if (sorceId !== 0) {
      so23 = sorceId;
    }
    if (shipemtntypeid !== 0) {
      so233 = shipemtntypeid;
    }
    shiphypeservice
      .updateShipemntPolicy(
        q1,
        shipploicyId,
        userid,
        warhouseId,
        so233,
        so23,
        sericeId
      )
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setOpen(true);
          setType("success");
          setMsg(response.message);
          setStatus(response.status);
          setLoading(false);
          service = 1;
          valueofsoucedata = 1;
          valueofsouceid = 0;
          setsericeId(1);
          setShipmetnIdId(1);
          setSorceId(0);
          //  addStepStatus();
          fetchShipPolicy();
        } else {
          setOpen(true);
          setType("error");
          setMsg(response.message);
          setStatus(response.status);
          setLoading(false);
          service = 1;
          valueofsoucedata = 1;
          valueofsouceid = 0;
          setsericeId(1);
          setShipmetnIdId(1);
          setSorceId(0);
          fetchShipPolicy();
          //  addStepStatus();
          // fetchShipPolicy();
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChangeWarehouseId = (event, props) => {
    setWarehouseId(event.target.value);
    valueofwarehouseid = event.target.value;
    props.onChange(event.target.value);
    // setEnableShippingPlocy(true);
    fetchShipPolicy10(
      event.target.value,
      valueofsoucedata,
      service,
      valueofsouceid,
      policyid
    );
    //  fetchShipPolicy10(event.target.value,valueofsouceid,policyid);
  };

  //const column1FilterList = state.column1FilterList;
  const fetchShipPolicy10 = (value3, value1, value, value2, value4) => {
    setLoading(true);

    //   else{
    shiphypeservice
      .fetchShipPolicyOrder(userid, 1)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          setShippingPolicyStatus(true);
          setShipData(response.data);
          if ((value1 === 0) & (value2 !== 0)) {
            for (let i = 0; i < response.data.length; i++) {
              if (response.data[i].integrationId === parseInt(value2)) {
                var ploi = response.data[i].polocies;
                response.data[i].polocies.forEach(
                  (element) =>
                    (column1FilterList[element.integrationspoliciesId] =
                      element.policytitle)
                );
                setState({
                  column1FilterList,
                  columns: [
                    {
                      title: "Source",
                      field: "source",
                      lookup: policyData,
                      editComponent: (props) => (
                        <FormControl className={classes.formControl}>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={value2}
                            onChange={(e) => handleChangeSource(e, props)}
                          >
                            <MenuItem value={0}>Select Source</MenuItem>
                            {sourcePo.map((option) => (
                              <MenuItem value={option.integrationId}>
                                {option.integrationName}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      ),
                    },
                    {
                      title: "Policy Name",
                      field: "integrationspoliciesId",
                      lookup: { ...column1FilterList },
                      hidden: true,
                      editComponent: (props) => (
                        <FormControl className={classes.formControl}>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={value4}
                            onChange={(e) => handleChangePolicy(e, props)}
                          >
                            <MenuItem value={0}>Select Source</MenuItem>
                            {ploi.map((option) => (
                              <MenuItem value={option.integrationspoliciesId}>
                                {option.policytitle}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      ),
                    },

                    {
                      title: "Warehouse",
                      field: "warehouseid",
                      lookup: { 1: "US Warehouse", 2: "Canada Warehouse" },
                      hidden: true,
                      editComponent: (props) => (
                        <FormControl className={classes.formControl}>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={value3}
                            onChange={(e) => handleChangeWarehouseId(e, props)}
                          >
                            <MenuItem value={0}>Select Warehouse</MenuItem>
                            <MenuItem value={1}>US Warehouse</MenuItem>
                            <MenuItem value={2}>Canada Warehouse</MenuItem>
                          </Select>
                        </FormControl>
                      ),
                    },
                    {
                      title: "Shipment Type",
                      field: "shipmenttype",
                      lookup: { 1: "Parcel", 2: "LetterMail", 3: "LTL" },
                      editComponent: (props) => (
                        <FormControl className={classes.formControl}>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={value1}
                            onChange={(e) => handleChangeShipmentType(e, props)}
                          >
                            <MenuItem value={0}>Select Shipment Type</MenuItem>
                            <MenuItem value={1}>Parcel</MenuItem>
                            <MenuItem value={2}>LetterMail</MenuItem>
                            <MenuItem value={3}>LTL</MenuItem>
                          </Select>
                        </FormControl>
                      ),
                    },
                    {
                      title: "Shipping Service",
                      field: "shippingserviceid",
                      lookup: {
                        1: "Standard Shipping",
                        2: "2-Day Shipping",
                        3: "Overnight Shipping",
                        4: "Standard Postage",
                        5: "Oversize LetterMail",
                        6: "Pallet Freight",
                      },
                      editable: "never",
                    },
                  ],
                });
              }
            }
          } else if ((value2 === 0) & (value1 !== 0)) {
            if (value1 === 1) {
              shiptyepdata = shiptype1;
              shiptype2data1 = shiptype1data;
            } else if (value1 === 2) {
              shiptyepdata = shiptype2;
              shiptype2data1 = shiptype2data;
            } else if (value1 === 3) {
              shiptyepdata = shiptype3;
              shiptype2data1 = shiptype3data;
            }

            // for (let i = 0; i < response.data.length; i++) {
            //   if ( response.data[i].integrationId === parseInt(value2)) {
            //     var ploi=response.data[i].polocies;
            //     response.data[i].polocies.forEach(element => column1FilterList[element.integrationspoliciesId] = element.policytitle)
            setState({
              column1FilterList,
              columns: [
                {
                  title: "Source",
                  field: "source",
                  lookup: policyData,
                  editComponent: (props) => (
                    <FormControl className={classes.formControl}>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={value2}
                        onChange={(e) => handleChangeSource(e, props)}
                      >
                        <MenuItem value={0}>Select Source</MenuItem>
                        {sourcePo.map((option) => (
                          <MenuItem value={option.integrationId}>
                            {option.integrationName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ),
                },
                {
                  title: "Policy Name",
                  field: "integrationspoliciesId",
                  lookup: policyData,
                  hidden: true,
                  editable: "never",
                },

                {
                  title: "Warehouse",
                  field: "warehouseid",
                  lookup: { 1: "US Warehouse", 2: "Canada Warehouse" },
                  hidden: true,
                  editComponent: (props) => (
                    <FormControl className={classes.formControl}>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={value3}
                        onChange={(e) => handleChangeWarehouseId(e, props)}
                      >
                        <MenuItem value={0}>Select Warehouse</MenuItem>
                        <MenuItem value={1}>US Warehouse</MenuItem>
                        <MenuItem value={2}>Canada Warehouse</MenuItem>
                      </Select>
                    </FormControl>
                  ),
                },
                {
                  title: "Shipment Type",
                  field: "shipmenttype",
                  lookup: { 1: "Parcel", 2: "LetterMail", 3: "LTL" },
                  editComponent: (props) => (
                    <FormControl className={classes.formControl}>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={value1}
                        onChange={(e) => handleChangeShipmentType(e, props)}
                      >
                        <MenuItem value={0}>Select Shipment Type</MenuItem>
                        <MenuItem value={1}>Parcel</MenuItem>
                        <MenuItem value={2}>LetterMail</MenuItem>
                        <MenuItem value={3}>LTL</MenuItem>
                      </Select>
                    </FormControl>
                  ),
                },
                {
                  title: "Shipping Service",
                  field: "shippingserviceid",
                  lookup: shiptyepdata,
                  editComponent: (props) => (
                    <FormControl className={classes.formControl}>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={value}
                        onChange={(e) => handleChangeShippingService(e, props)}
                      >
                        <MenuItem value={0}>Select Shipping Service</MenuItem>
                        {shiptype2data1.map((option) => (
                          <MenuItem value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ),
                },
              ],
            });

            //  }
            //           setEmails(shipData[i].polocies);

            //  }
          } else {
            if (value1 === 1) {
              shiptyepdata = shiptype1;
              shiptype2data1 = shiptype1data;
            } else if (value1 === 2) {
              shiptyepdata = shiptype2;
              shiptype2data1 = shiptype2data;
            } else if (value1 === 3) {
              shiptyepdata = shiptype3;
              shiptype2data1 = shiptype3data;
            }

            for (let i = 0; i < response.data.length; i++) {
              if (response.data[i].integrationId === parseInt(value2)) {
                var ploi = response.data[i].polocies;
                response.data[i].polocies.forEach(
                  (element) =>
                    (column1FilterList[element.integrationspoliciesId] =
                      element.policytitle)
                );
                setState({
                  column1FilterList,
                  columns: [
                    {
                      title: "Source",
                      field: "source",
                      lookup: policyData,
                      editComponent: (props) => (
                        <FormControl className={classes.formControl}>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={value2}
                            onChange={(e) => handleChangeSource(e, props)}
                          >
                            <MenuItem value={0}>Select Source</MenuItem>
                            {sourcePo.map((option) => (
                              <MenuItem value={option.integrationId}>
                                {option.integrationName}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      ),
                    },
                    {
                      title: "Policy Name",
                      field: "integrationspoliciesId",
                      lookup: { ...column1FilterList },
                      hidden: true,
                      editComponent: (props) => (
                        <FormControl className={classes.formControl}>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={value4}
                            onChange={(e) => handleChangePolicy(e, props)}
                          >
                            <MenuItem value={0}>Select Source</MenuItem>
                            {ploi.map((option) => (
                              <MenuItem value={option.integrationspoliciesId}>
                                {option.policytitle}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      ),
                    },

                    {
                      title: "Warehouse",
                      field: "warehouseid",
                      lookup: { 1: "US Warehouse", 2: "Canada Warehouse" },
                      hidden: true,
                      editComponent: (props) => (
                        <FormControl className={classes.formControl}>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={value3}
                            onChange={(e) => handleChangeWarehouseId(e, props)}
                          >
                            <MenuItem value={0}>Select Warehouse</MenuItem>
                            <MenuItem value={1}>US Warehouse</MenuItem>
                            <MenuItem value={2}>Canada Warehouse</MenuItem>
                          </Select>
                        </FormControl>
                      ),
                    },
                    {
                      title: "Shipment Type",
                      field: "shipmenttype",
                      lookup: { 1: "Parcel", 2: "LetterMail", 3: "LTL" },
                      editComponent: (props) => (
                        <FormControl className={classes.formControl}>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={value1}
                            onChange={(e) => handleChangeShipmentType(e, props)}
                          >
                            <MenuItem value={0}>Select Shipment Type</MenuItem>
                            <MenuItem value={1}>Parcel</MenuItem>
                            <MenuItem value={2}>LetterMail</MenuItem>
                            <MenuItem value={3}>LTL</MenuItem>
                          </Select>
                        </FormControl>
                      ),
                    },
                    {
                      title: "Shipping Service",
                      field: "shippingserviceid",
                      lookup: shiptyepdata,
                      editComponent: (props) => (
                        <FormControl className={classes.formControl}>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={value}
                            onChange={(e) =>
                              handleChangeShippingService(e, props)
                            }
                          >
                            <MenuItem value={0}>
                              Select Shipping Service
                            </MenuItem>
                            {shiptype2data1.map((option) => (
                              <MenuItem value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      ),
                    },
                  ],
                });
              }
              //           setEmails(shipData[i].polocies);
            }
          }

          //fetchCarrierSetting(response.data);
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
    //}
  };

  const handleChangeShipmentType = (event, props) => {
    setShipmetnIdId(event.target.value);
    valueofsoucedata = event.target.value;
    props.onChange(event.target.value);
    // setEnableShippingPlocy(true);
    fetchShipPolicy8(
      event.target.value,
      valueofsouceid,
      policyid,
      valueofwarehouseid
    );
  };

  const handleChangePolicy = (event, props) => {
    setShipploicyId(event.target.value);
    policyid = event.target.value;
    props.onChange(event.target.value);
    fetchShipPolicy11(
      event.target.value,
      valueofsoucedata,
      service,
      valueofsouceid,
      valueofwarehouseid
    );
  };

  //const column1FilterList = state.column1FilterList;
  const fetchShipPolicy11 = (value3, value1, value, value2, value4) => {
    setLoading(true);

    //   else{
    shiphypeservice
      .fetchShipPolicyOrder(userid, 1)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          setShippingPolicyStatus(true);
          setShipData(response.data);
          if (value1 === 0) {
            for (let i = 0; i < response.data.length; i++) {
              if (response.data[i].integrationId === parseInt(value2)) {
                var ploi = response.data[i].polocies;
                response.data[i].polocies.forEach(
                  (element) =>
                    (column1FilterList[element.integrationspoliciesId] =
                      element.policytitle)
                );
                setState({
                  column1FilterList,
                  columns: [
                    {
                      title: "Source",
                      field: "source",
                      lookup: policyData,
                      editComponent: (props) => (
                        <FormControl className={classes.formControl}>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={value2}
                            onChange={(e) => handleChangeSource(e, props)}
                          >
                            <MenuItem value={0}>Select Source</MenuItem>
                            {sourcePo.map((option) => (
                              <MenuItem value={option.integrationId}>
                                {option.integrationName}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      ),
                    },
                    {
                      title: "Policy Name",
                      field: "integrationspoliciesId",
                      lookup: { ...column1FilterList },
                      hidden: true,
                      editComponent: (props) => (
                        <FormControl className={classes.formControl}>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={value3}
                            onChange={(e) => handleChangePolicy(e, props)}
                          >
                            <MenuItem value={0}>Select Source</MenuItem>
                            {ploi.map((option) => (
                              <MenuItem value={option.integrationspoliciesId}>
                                {option.policytitle}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      ),
                    },

                    {
                      title: "Warehouse",
                      field: "warehouseid",
                      lookup: { 1: "US Warehouse", 2: "Canada Warehouse" },
                      hidden: true,
                      editComponent: (props) => (
                        <FormControl className={classes.formControl}>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={value4}
                            onChange={(e) => handleChangeWarehouseId(e, props)}
                          >
                            <MenuItem value={0}>Select Warehouse</MenuItem>
                            <MenuItem value={1}>US Warehouse</MenuItem>
                            <MenuItem value={2}>Canada Warehouse</MenuItem>
                          </Select>
                        </FormControl>
                      ),
                    },
                    {
                      title: "Shipment Type",
                      field: "shipmenttype",
                      lookup: { 1: "Parcel", 2: "LetterMail", 3: "LTL" },
                      editComponent: (props) => (
                        <FormControl className={classes.formControl}>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={value1}
                            onChange={(e) => handleChangeShipmentType(e, props)}
                          >
                            <MenuItem value={0}>Select Shipment Type</MenuItem>
                            <MenuItem value={1}>Parcel</MenuItem>
                            <MenuItem value={2}>LetterMail</MenuItem>
                            <MenuItem value={3}>LTL</MenuItem>
                          </Select>
                        </FormControl>
                      ),
                    },
                    {
                      title: "Shipping Service",
                      field: "shippingserviceid",
                      lookup: {
                        1: "Standard Shipping",
                        2: "2-Day Shipping",
                        3: "Overnight Shipping",
                        4: "Standard Postage",
                        5: "Oversize LetterMail",
                        6: "Pallet Freight",
                      },
                      editable: "never",
                    },
                  ],
                });
              }
            }
          } else {
            if (value1 === 1) {
              shiptyepdata = shiptype1;
              shiptype2data1 = shiptype1data;
            } else if (value1 === 2) {
              shiptyepdata = shiptype2;
              shiptype2data1 = shiptype2data;
            } else if (value1 === 3) {
              shiptyepdata = shiptype3;
              shiptype2data1 = shiptype3data;
            }

            for (let i = 0; i < response.data.length; i++) {
              if (response.data[i].integrationId === parseInt(value2)) {
                var ploi = response.data[i].polocies;
                response.data[i].polocies.forEach(
                  (element) =>
                    (column1FilterList[element.integrationspoliciesId] =
                      element.policytitle)
                );
                setState({
                  column1FilterList,
                  columns: [
                    {
                      title: "Source",
                      field: "source",
                      lookup: policyData,
                      editComponent: (props) => (
                        <FormControl className={classes.formControl}>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={value2}
                            onChange={(e) => handleChangeSource(e, props)}
                          >
                            <MenuItem value={0}>Select Source</MenuItem>
                            {sourcePo.map((option) => (
                              <MenuItem value={option.integrationId}>
                                {option.integrationName}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      ),
                    },
                    {
                      title: "Policy Name",
                      field: "integrationspoliciesId",
                      lookup: { ...column1FilterList },
                      hidden: true,
                      editComponent: (props) => (
                        <FormControl className={classes.formControl}>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={value3}
                            onChange={(e) => handleChangePolicy(e, props)}
                          >
                            <MenuItem value={0}>Select Source</MenuItem>
                            {ploi.map((option) => (
                              <MenuItem value={option.integrationspoliciesId}>
                                {option.policytitle}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      ),
                    },

                    {
                      title: "Warehouse",
                      field: "warehouseid",
                      lookup: { 1: "US Warehouse", 2: "Canada Warehouse" },
                      hidden: true,
                      editComponent: (props) => (
                        <FormControl className={classes.formControl}>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={value4}
                            onChange={(e) => handleChangeWarehouseId(e, props)}
                          >
                            <MenuItem value={0}>Select Warehouse</MenuItem>
                            <MenuItem value={1}>US Warehouse</MenuItem>
                            <MenuItem value={2}>Canada Warehouse</MenuItem>
                          </Select>
                        </FormControl>
                      ),
                    },
                    {
                      title: "Shipment Type",
                      field: "shipmenttype",
                      lookup: { 1: "Parcel", 2: "LetterMail", 3: "LTL" },
                      editComponent: (props) => (
                        <FormControl className={classes.formControl}>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={value1}
                            onChange={(e) => handleChangeShipmentType(e, props)}
                          >
                            <MenuItem value={0}>Select Shipment Type</MenuItem>
                            <MenuItem value={1}>Parcel</MenuItem>
                            <MenuItem value={2}>LetterMail</MenuItem>
                            <MenuItem value={3}>LTL</MenuItem>
                          </Select>
                        </FormControl>
                      ),
                    },
                    {
                      title: "Shipping Service",
                      field: "shippingserviceid",
                      lookup: shiptyepdata,
                      editComponent: (props) => (
                        <FormControl className={classes.formControl}>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={value}
                            onChange={(e) =>
                              handleChangeShippingService(e, props)
                            }
                          >
                            <MenuItem value={0}>
                              Select Shipping Service
                            </MenuItem>
                            {shiptype2data1.map((option) => (
                              <MenuItem value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      ),
                    },
                  ],
                });
              }
              //           setEmails(shipData[i].polocies);
            }
          }

          //fetchCarrierSetting(response.data);
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
    //}
  };

  //const column1FilterList = state.column1FilterList;
  const fetchShipPolicy9 = (value3, value1, value, value2, value4) => {
    setLoading(false);
    if (value === 0) {
      if (value1 === 1) {
        shiptyepdata = shiptype1;
        shiptype2data1 = shiptype1data;
      } else if (value1 === 2) {
        shiptyepdata = shiptype2;
        shiptype2data1 = shiptype2data;
      } else if (value1 === 3) {
        shiptyepdata = shiptype3;
        shiptype2data1 = shiptype3data;
      }

      setState({
        columns: [
          {
            title: "Source",
            field: "source",
            lookup: policyData,
            editComponent: (props) => (
              <FormControl className={classes.formControl}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={props.rowData.sourceid}
                  onChange={(e) => handleChangeSource(e, props)}
                >
                  <MenuItem value={0}>Select Source</MenuItem>
                  {sourcePo.map((option) => (
                    <MenuItem value={option.integrationId}>
                      {option.integrationName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ),
          },
          {
            title: "Policy Name",
            field: "integrationspoliciesId",
            lookup: { 1: "Parcel", 2: "LetterMail", 3: "LTL" },
            editable: "never",
            hidden: true,
          },

          {
            title: "Warehouse",
            field: "warehouseid",
            lookup: { 1: "US Warehouse", 2: "Canada Warehouse" },
            hidden: true,
            editComponent: (props) => (
              <FormControl className={classes.formControl}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={value4}
                  onChange={(e) => handleChangeWarehouseId(e, props)}
                >
                  <MenuItem value={0}>Select Warehouse</MenuItem>
                  <MenuItem value={1}>US Warehouse</MenuItem>
                  <MenuItem value={2}>Canada Warehouse</MenuItem>
                </Select>
              </FormControl>
            ),
          },
          {
            title: "Shipment Type",
            field: "shipmenttype",
            lookup: { 1: "Parcel", 2: "LetterMail", 3: "LTL" },
            editComponent: (props) => (
              <FormControl className={classes.formControl}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={value1 === 0 ? props.rowData.shipmenttype : value1}
                  onChange={(e) => handleChangeShipmentType(e, props)}
                >
                  <MenuItem value={0}>Select Shipment Type</MenuItem>
                  <MenuItem value={1}>Parcel</MenuItem>
                  <MenuItem value={2}>LetterMail</MenuItem>
                  <MenuItem value={3}>LTL</MenuItem>
                </Select>
              </FormControl>
            ),
          },
          //  { title: 'Shipping Service', field: 'shippingserviceid',lookup: shiptyepdata,
          //  editComponent: props => (
          //   <FormControl className={classes.formControl}>

          //   <Select
          //     labelId="demo-simple-select-label"
          //     id="demo-simple-select"
          //     value={value3}
          //     onChange={e =>handleChangeShippingService(e,props)}
          //   >
          //     <MenuItem value={0}>
          //     Select Shipping Service</MenuItem>
          //     {shiptype2data1.map(option => (

          //          <MenuItem value={option.value}>

          //           {option.label}
          //           </MenuItem>
          //         ))}

          //   </Select>
          //   </FormControl>
          // )

          //  },
          {
            title: "Shipping Service",
            field: "shippingserviceid",
            lookup: {
              1: "Standard Shipping",
              2: "2-Day Shipping",
              3: "Overnight Shipping",
              4: "Standard Postage",
              5: "Oversize LetterMail",
              6: "Pallet Freight",
            },
            render: (rowData) => (
              <FormControlLabel
                // onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
                // className={classes.quantitycss}
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
                      if (rowData.shippingserviceid === 1) {
                        return (
                          <Text
                            style={{
                              fontSize: "11px",
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              transition: "all 0.25s",
                            }}
                          >
                            Standard Shipping
                          </Text>
                        );
                      } else if (rowData.shippingserviceid === 1) {
                        return (
                          <Text
                            style={{
                              fontSize: "11px",
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              transition: "all 0.25s",
                            }}
                          >
                            2-Day Shipping
                          </Text>
                        );
                      } else if (rowData.shippingserviceid === 3) {
                        return (
                          <Text
                            style={{
                              fontSize: "11px",
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              transition: "all 0.25s",
                            }}
                          >
                            Overnight Shipping
                          </Text>
                        );
                      } else if (rowData.shippingserviceid === 4) {
                        return (
                          <Text
                            style={{
                              fontSize: "11px",
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              transition: "all 0.25s",
                            }}
                          >
                            Standard Postage
                          </Text>
                        );
                      } else if (rowData.shippingserviceid === 5) {
                        return (
                          <Text
                            style={{
                              fontSize: "11px",
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              transition: "all 0.25s",
                            }}
                          >
                            Oversize LetterMail
                          </Text>
                        );
                      } else if (rowData.shippingserviceid === 6) {
                        return (
                          <Text
                            style={{
                              fontSize: "11px",
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              transition: "all 0.25s",
                            }}
                          >
                            Pallet Freight
                          </Text>
                        );
                      }
                    })()}
                  </Typography>
                }
              />
            ),
            editComponent: (props) => (
              <FormControl className={classes.formControl}>
                {(() => {
                  if (props.rowData !== undefined) {
                    if (value1 === 1) {
                      return (
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={value3}
                          onChange={(e) =>
                            handleChangeShippingService(e, props)
                          }
                        >
                          <MenuItem value={0}>Select Shipping Service</MenuItem>
                          <MenuItem value={1}>Standard Shipping</MenuItem>
                          <MenuItem value={2}>2-Day Shipping</MenuItem>
                          <MenuItem value={3}>Overnight Shipping</MenuItem>
                        </Select>
                      );
                    } else if (value1 === 2) {
                      return (
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={value3}
                          onChange={(e) =>
                            handleChangeShippingService(e, props)
                          }
                        >
                          <MenuItem value={0}>Select Shipping Service</MenuItem>

                          <MenuItem value={4}>Standard Postage</MenuItem>
                          <MenuItem value={5}>Oversize LetterMail</MenuItem>
                        </Select>
                      );
                    } else if (value1 === 3) {
                      return (
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={value3}
                          onChange={(e) =>
                            handleChangeShippingService(e, props)
                          }
                        >
                          <MenuItem value={0}>Select Shipping Service</MenuItem>

                          <MenuItem value={6}>Pallet Freight</MenuItem>
                        </Select>
                      );
                    } else if (props.rowData.shipmenttype === "1") {
                      return (
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={value3}
                          onChange={(e) =>
                            handleChangeShippingService(e, props)
                          }
                        >
                          <MenuItem value={0}>Select Shipping Service</MenuItem>
                          <MenuItem value={1}>Standard Shipping</MenuItem>
                          <MenuItem value={2}>2-Day Shipping</MenuItem>
                          <MenuItem value={3}>Overnight Shipping</MenuItem>
                        </Select>
                      );
                    } else if (props.rowData.shipmenttype === "2") {
                      return (
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={value3}
                          onChange={(e) =>
                            handleChangeShippingService(e, props)
                          }
                        >
                          <MenuItem value={0}>Select Shipping Service</MenuItem>

                          <MenuItem value={4}>Standard Postage</MenuItem>
                          <MenuItem value={5}>Oversize LetterMail</MenuItem>
                        </Select>
                      );
                    } else if (props.rowData.shipmenttype === "3") {
                      return (
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={value3}
                          onChange={(e) =>
                            handleChangeShippingService(e, props)
                          }
                        >
                          <MenuItem value={0}>Select Shipping Service</MenuItem>

                          <MenuItem value={6}>Pallet Freight</MenuItem>
                        </Select>
                      );
                    } else {
                      return (
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={"0"}
                          onChange={(e) =>
                            handleChangeShippingService(e, props)
                          }
                        >
                          <MenuItem value={0}>Select Shipping Service</MenuItem>
                          <MenuItem value={1}>Standard Shipping</MenuItem>
                          <MenuItem value={2}>2-Day Shipping</MenuItem>
                          <MenuItem value={3}>Overnight Shipping</MenuItem>
                        </Select>
                      );
                    }
                  }
                })()}
              </FormControl>
            ),
          },
        ],
      });
      setLoading(false);
    } else {
      // shiphypeservice
      // .fetchShipPolicyOrder(userid, 1)
      // .then((response) => {
      //   console.log("status", response.status);
      //   if (response.status === true) {
      //     setLoading(false);
      //     setShippingPolicyStatus(true);
      //     setShipData(response.data);

      if (value1 === 1) {
        shiptyepdata = shiptype1;
        shiptype2data1 = shiptype1data;
      } else if (value1 === 2) {
        shiptyepdata = shiptype2;
        shiptype2data1 = shiptype2data;
      } else if (value1 === 3) {
        shiptyepdata = shiptype3;
        shiptype2data1 = shiptype3data;
      }

      // for (let i = 0; i < response.data.length; i++) {
      //   if ( response.data[i].integrationId === parseInt(value)) {
      //     var ploi=response.data[i].polocies;
      //     response.data[i].polocies.forEach(element => column1FilterList[element.integrationspoliciesId] = element.policytitle)
      setState({
        // column1FilterList,
        columns: [
          {
            title: "Source",
            field: "source",
            lookup: policyData,
            editComponent: (props) => (
              <FormControl className={classes.formControl}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={value}
                  onChange={(e) => handleChangeSource(e, props)}
                >
                  <MenuItem value={0}>Select Source</MenuItem>
                  {sourcePo.map((option) => (
                    <MenuItem value={option.integrationId}>
                      {option.integrationName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ),
          },
          {
            title: "Policy Name",
            field: "integrationspoliciesId",
            lookup: { ...column1FilterList },
            hidden: true,
            editComponent: (props) => (
              <FormControl className={classes.formControl}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={value2}
                  onChange={(e) => handleChangePolicy(e, props)}
                >
                  <MenuItem value={0}>Select Source</MenuItem>
                  {ploi.map((option) => (
                    <MenuItem value={option.integrationspoliciesId}>
                      {option.policytitle}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ),
          },

          {
            title: "Warehouse",
            field: "warehouseid",
            lookup: { 1: "US Warehouse", 2: "Canada Warehouse" },
            hidden: true,
            editComponent: (props) => (
              <FormControl className={classes.formControl}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={value4}
                  onChange={(e) => handleChangeWarehouseId(e, props)}
                >
                  <MenuItem value={0}>Select Warehouse</MenuItem>
                  <MenuItem value={1}>US Warehouse</MenuItem>
                  <MenuItem value={2}>Canada Warehouse</MenuItem>
                </Select>
              </FormControl>
            ),
          },
          {
            title: "Shipment Type",
            field: "shipmenttype",
            lookup: { 1: "Parcel", 2: "LetterMail", 3: "LTL" },
            editComponent: (props) => (
              <FormControl className={classes.formControl}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={value1 === 0 ? props.rowData.shipmenttype : value1}
                  onChange={(e) => handleChangeShipmentType(e, props)}
                >
                  <MenuItem value={0}>Select Shipment Type</MenuItem>
                  <MenuItem value={1}>Parcel</MenuItem>
                  <MenuItem value={2}>LetterMail</MenuItem>
                  <MenuItem value={3}>LTL</MenuItem>
                </Select>
              </FormControl>
            ),
          },
          //  { title: 'Shipping Service', field: 'shippingserviceid',lookup: shiptyepdata,
          //  editComponent: props => (
          //   <FormControl className={classes.formControl}>

          //   <Select
          //     labelId="demo-simple-select-label"
          //     id="demo-simple-select"
          //     value={value3}
          //     onChange={e =>handleChangeShippingService(e,props)}
          //   >
          //     <MenuItem value={0}>
          //     Select Shipping Service</MenuItem>
          //     {shiptype2data1.map(option => (

          //          <MenuItem value={option.value}>

          //           {option.label}
          //           </MenuItem>
          //         ))}

          //   </Select>
          //   </FormControl>
          // )

          //  },
          {
            title: "Shipping Service",
            field: "shippingserviceid",
            lookup: {
              1: "Standard Shipping",
              2: "2-Day Shipping",
              3: "Overnight Shipping",
              4: "Standard Postage",
              5: "Oversize LetterMail",
              6: "Pallet Freight",
            },
            render: (rowData) => (
              <FormControlLabel
                // onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
                // className={classes.quantitycss}
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
                      if (value3 === 1) {
                        return (
                          <Text
                            style={{
                              fontSize: "11px",
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              transition: "all 0.25s",
                            }}
                          >
                            Standard Shipping
                          </Text>
                        );
                      } else if (value3 === 1) {
                        return (
                          <Text
                            style={{
                              fontSize: "11px",
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              transition: "all 0.25s",
                            }}
                          >
                            2-Day Shipping
                          </Text>
                        );
                      } else if (value3 === 3) {
                        return (
                          <Text
                            style={{
                              fontSize: "11px",
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              transition: "all 0.25s",
                            }}
                          >
                            Overnight Shipping
                          </Text>
                        );
                      } else if (value3 === 4) {
                        return (
                          <Text
                            style={{
                              fontSize: "11px",
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              transition: "all 0.25s",
                            }}
                          >
                            Standard Postage
                          </Text>
                        );
                      } else if (value3 === 5) {
                        return (
                          <Text
                            style={{
                              fontSize: "11px",
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              transition: "all 0.25s",
                            }}
                          >
                            Oversize LetterMail
                          </Text>
                        );
                      } else if (value3 === 6) {
                        return (
                          <Text
                            style={{
                              fontSize: "11px",
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              transition: "all 0.25s",
                            }}
                          >
                            Pallet Freight
                          </Text>
                        );
                      }
                    })()}
                  </Typography>
                }
              />
            ),
            editComponent: (props) => (
              <FormControl className={classes.formControl}>
                {(() => {
                  if (props.rowData !== undefined) {
                    if (value1 === 1) {
                      return (
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={value3}
                          onChange={(e) =>
                            handleChangeShippingService(e, props)
                          }
                        >
                          <MenuItem value={0}>Select Shipping Service</MenuItem>
                          <MenuItem value={1}>Standard Shipping</MenuItem>
                          <MenuItem value={2}>2-Day Shipping</MenuItem>
                          <MenuItem value={3}>Overnight Shipping</MenuItem>
                        </Select>
                      );
                    } else if (value1 === 2) {
                      return (
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={value3}
                          onChange={(e) =>
                            handleChangeShippingService(e, props)
                          }
                        >
                          <MenuItem value={0}>Select Shipping Service</MenuItem>

                          <MenuItem value={4}>Standard Postage</MenuItem>
                          <MenuItem value={5}>Oversize LetterMail</MenuItem>
                        </Select>
                      );
                    } else if (value1 === 3) {
                      return (
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={value3}
                          onChange={(e) =>
                            handleChangeShippingService(e, props)
                          }
                        >
                          <MenuItem value={0}>Select Shipping Service</MenuItem>

                          <MenuItem value={6}>Pallet Freight</MenuItem>
                        </Select>
                      );
                    } else if (props.rowData.shipmenttype === "1") {
                      return (
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={value3}
                          onChange={(e) =>
                            handleChangeShippingService(e, props)
                          }
                        >
                          <MenuItem value={0}>Select Shipping Service</MenuItem>
                          <MenuItem value={1}>Standard Shipping</MenuItem>
                          <MenuItem value={2}>2-Day Shipping</MenuItem>
                          <MenuItem value={3}>Overnight Shipping</MenuItem>
                        </Select>
                      );
                    } else if (props.rowData.shipmenttype === "2") {
                      return (
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={value3}
                          onChange={(e) =>
                            handleChangeShippingService(e, props)
                          }
                        >
                          <MenuItem value={0}>Select Shipping Service</MenuItem>

                          <MenuItem value={4}>Standard Postage</MenuItem>
                          <MenuItem value={5}>Oversize LetterMail</MenuItem>
                        </Select>
                      );
                    } else if (props.rowData.shipmenttype === "3") {
                      return (
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={value3}
                          onChange={(e) =>
                            handleChangeShippingService(e, props)
                          }
                        >
                          <MenuItem value={0}>Select Shipping Service</MenuItem>

                          <MenuItem value={6}>Pallet Freight</MenuItem>
                        </Select>
                      );
                    } else {
                      return (
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={"0"}
                          onChange={(e) =>
                            handleChangeShippingService(e, props)
                          }
                        >
                          <MenuItem value={0}>Select Shipping Service</MenuItem>
                          <MenuItem value={1}>Standard Shipping</MenuItem>
                          <MenuItem value={2}>2-Day Shipping</MenuItem>
                          <MenuItem value={3}>Overnight Shipping</MenuItem>
                        </Select>
                      );
                    }
                  }
                })()}
              </FormControl>
            ),
          },
        ],
      });
    }
    //         //           setEmails(shipData[i].polocies);

    //               }

    //       //fetchCarrierSetting(response.data);
    //     } else {
    //       setLoading(false);
    //       console.log("message", response.message);
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     setLoading(false);
    //   });
    // }
  };

  const handleChangeShippingService = (event, props) => {
    setsericeId(event.target.value);
    service = event.target.value;
    props.onChange(event.target.value);
    fetchShipPolicy9(
      event.target.value,
      valueofsoucedata,
      valueofsouceid,
      policyid,
      valueofwarehouseid
    );
    // setfucntiondata(event.target.value);
    // setEnableShippingPlocy(true);
    // fetchShipPolicy7(event.target.value);
  };

  const handleChangeSource = (event, props) => {
    setSorceId(event.target.value);
    valueofsouceid = event.target.value;
    props.onChange(event.target.value);
    // setEnableShippingPlocy(true);
    fetchShipPolicy7(
      event.target.value,
      valueofsoucedata,
      service,
      valueofwarehouseid
    );
  };

  const column1FilterList = state.column1FilterList;
  const fetchShipPolicy7 = (value, value1, value2, value3) => {
    // setLoading(true);
    if (value1 === 0) {
      // shiphypeservice
      // .fetchShipPolicyOrder(userid, 1)
      // .then((response) => {
      //   console.log("status", response.status);
      //   if (response.status === true) {
      //     setLoading(false);
      //     setShippingPolicyStatus(true);
      //     setShipData(response.data);
      //     for (let i = 0; i < response.data.length; i++) {
      //       if ( response.data[i].integrationId === parseInt(value)) {
      //         var ploi=response.data[i].polocies;
      //         response.data[i].polocies.forEach(element => column1FilterList[element.integrationspoliciesId] = element.policytitle)

      setState({
        // column1FilterList,
        columns: [
          {
            title: "Source",
            field: "source",
            lookup: policyData,
            editComponent: (props) => (
              <FormControl className={classes.formControl}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={value}
                  onChange={(e) => handleChangeSource(e, props)}
                >
                  <MenuItem value={0}>Select Source</MenuItem>
                  {sourcePo.map((option) => (
                    <MenuItem value={option.integrationId}>
                      {option.integrationName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ),
          },
          {
            title: "Policy Name",
            field: "integrationspoliciesId",
            lookup: { 1: "US Warehouse", 2: "Canada Warehouse" },
            hidden: true,

            editComponent: (props) => (
              <FormControl className={classes.formControl}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={props.value}
                  onChange={(e) => handleChangePolicy(e, props)}
                >
                  <MenuItem value={0}>Select Source</MenuItem>
                  {sourcePo.map((option) => (
                    <MenuItem value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            ),
          },

          {
            title: "Warehouse",
            field: "warehouseid",
            lookup: { 1: "US Warehouse", 2: "Canada Warehouse" },
            hidden: true,
            editComponent: (props) => (
              <FormControl className={classes.formControl}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={value3}
                  onChange={(e) => handleChangeWarehouseId(e, props)}
                >
                  <MenuItem value={0}>Select Warehouse</MenuItem>
                  <MenuItem value={1}>US Warehouse</MenuItem>
                  <MenuItem value={2}>Canada Warehouse</MenuItem>
                </Select>
              </FormControl>
            ),
          },
          {
            title: "Shipment Type",
            field: "shipmenttype",
            lookup: { 1: "Parcel", 2: "LetterMail", 3: "LTL" },

            editComponent: (props) => (
              <FormControl className={classes.formControl}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={props.value}
                  onChange={(e) => handleChangeShipmentType(e, props)}
                >
                  <MenuItem value={0}>Select Shipment Type</MenuItem>
                  <MenuItem value={1}>Parcel</MenuItem>
                  <MenuItem value={2}>LetterMail</MenuItem>
                  <MenuItem value={3}>LTL</MenuItem>
                </Select>
              </FormControl>
            ),
          },
          {
            title: "Shipping Service",
            field: "shippingserviceid",
            lookup: {
              1: "Standard Shipping",
              2: "2-Day Shipping",
              3: "Overnight Shipping",
              4: "Standard Postage",
              5: "Oversize LetterMail",
              6: "Pallet Freight",
            },
            editable: "never",
          },
        ],
      });
    }
    //           setEmails(shipData[i].polocies);

    // }
    //fetchCarrierSetting(response.data);
    //   } else {
    //     setLoading(false);
    //     console.log("message", response.message);
    //   }
    // })
    // .catch((error) => {
    //   console.error(error);
    //   setLoading(false);
    // });
    // }
    else {
      if (value1 === 1) {
        shiptyepdata = shiptype1;
        shiptype2data1 = shiptype1data;
      } else if (value1 === 2) {
        shiptyepdata = shiptype2;
        shiptype2data1 = shiptype2data;
      } else if (value1 === 3) {
        shiptyepdata = shiptype3;
        shiptype2data1 = shiptype3data;
      }

      // shiphypeservice
      // .fetchShipPolicyOrder(userid, 1)
      // .then((response) => {
      //   console.log("status", response.status);
      //   if (response.status === true) {
      //     setLoading(false);
      //     setShippingPolicyStatus(true);
      //     setShipData(response.data);
      //     for (let i = 0; i < response.data.length; i++) {
      //       if ( response.data[i].integrationId === parseInt(value)) {
      //         var ploi=response.data[i].polocies;
      //         response.data[i].polocies.forEach(element => column1FilterList[element.integrationspoliciesId] = element.policytitle)

      setState({
        // column1FilterList,
        columns: [
          {
            title: "Source",
            field: "source",
            lookup: policyData,
            editComponent: (props) => (
              <FormControl className={classes.formControl}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={value}
                  onChange={(e) => handleChangeSource(e, props)}
                >
                  <MenuItem value={0}>Select Source</MenuItem>
                  {sourcePo.map((option) => (
                    <MenuItem value={option.integrationId}>
                      {option.integrationName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ),
          },
          {
            title: "Policy Name",
            field: "integrationspoliciesId",
            lookup: { 1: "US Warehouse", 2: "Canada Warehouse" },
            hidden: true,

            editComponent: (props) => (
              <FormControl className={classes.formControl}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={props.value}
                  onChange={(e) => handleChangePolicy(e, props)}
                >
                  <MenuItem value={0}>Select Source</MenuItem>
                  {sourcePo.map((option) => (
                    <MenuItem value={option.integrationspoliciesId}>
                      {option.policytitle}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ),
          },

          {
            title: "Warehouse",
            field: "warehouseid",
            lookup: { 1: "US Warehouse", 2: "Canada Warehouse" },
            hidden: true,
            editComponent: (props) => (
              <FormControl className={classes.formControl}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  onChange={(e) => handleChangeWarehouseId(e, props)}
                >
                  <MenuItem value={0}>Select Warehouse</MenuItem>
                  <MenuItem value={1}>US Warehouse</MenuItem>
                  <MenuItem value={2}>Canada Warehouse</MenuItem>
                </Select>
              </FormControl>
            ),
          },
          {
            title: "Shipment Type",
            field: "shipmenttype",
            lookup: { 1: "Parcel", 2: "LetterMail", 3: "LTL" },

            editComponent: (props) => (
              <FormControl className={classes.formControl}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={value1}
                  onChange={(e) => handleChangeShipmentType(e, props)}
                >
                  <MenuItem value={0}>Select Shipment Type</MenuItem>
                  <MenuItem value={1}>Parcel</MenuItem>
                  <MenuItem value={2}>LetterMail</MenuItem>
                  <MenuItem value={3}>LTL</MenuItem>
                </Select>
              </FormControl>
            ),
          },
          {
            title: "Shipping Service",
            field: "shippingserviceid",
            lookup: shiptyepdata,
            editComponent: (props) => (
              <FormControl className={classes.formControl}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={value2}
                  onChange={(e) => handleChangeShippingService(e, props)}
                >
                  <MenuItem value={0}>Select Shipping Service</MenuItem>
                  {shiptype2data1.map((option) => (
                    <MenuItem value={option.value}>{option.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            ),
          },
        ],
      });
    }
    //       //           setEmails(shipData[i].polocies);

    //             }
    //       //fetchCarrierSetting(response.data);
    //     } else {
    //       setLoading(false);
    //       console.log("message", response.message);
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     setLoading(false);
    //   });
    // }
  };

  //const column1FilterList = state.column1FilterList;
  const fetchShipPolicy8 = (value1, value, value2, value4) => {
    setLoading(true);
    if (value === 0) {
      if (value1 === 0) {
        if (value1 === 1) {
          shiptyepdata = shiptype1;
          shiptype2data1 = shiptype1data;
        } else if (value1 === 2) {
          shiptyepdata = shiptype2;
          shiptype2data1 = shiptype2data;
        } else if (value1 === 3) {
          shiptyepdata = shiptype3;
          shiptype2data1 = shiptype3data;
        }

        setState({
          columns: [
            {
              title: "Source",
              field: "source",
              lookup: policyData,
              editComponent: (props) => (
                <FormControl className={classes.formControl}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={props.rowData.sourceid}
                    onChange={(e) => handleChangeSource(e, props)}
                  >
                    <MenuItem value={0}>Select Source</MenuItem>
                    {sourcePo.map((option) => (
                      <MenuItem value={option.integrationId}>
                        {option.integrationName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ),
            },
            {
              title: "Policy Name",
              field: "integrationspoliciesId",
              lookup: { 1: "Parcel", 2: "LetterMail", 3: "LTL" },
              editable: "never",
              hidden: true,
            },

            {
              title: "Warehouse",
              field: "warehouseid",
              lookup: { 1: "US Warehouse", 2: "Canada Warehouse" },
              hidden: true,
              editComponent: (props) => (
                <FormControl className={classes.formControl}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value4}
                    onChange={(e) => handleChangeWarehouseId(e, props)}
                  >
                    <MenuItem value={0}>Select Warehouse</MenuItem>
                    <MenuItem value={1}>US Warehouse</MenuItem>
                    <MenuItem value={2}>Canada Warehouse</MenuItem>
                  </Select>
                </FormControl>
              ),
            },
            {
              title: "Shipment Type",
              field: "shipmenttype",
              lookup: { 1: "Parcel", 2: "LetterMail", 3: "LTL" },
              editComponent: (props) => (
                <FormControl className={classes.formControl}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value1}
                    onChange={(e) => handleChangeShipmentType(e, props)}
                  >
                    <MenuItem value={0}>Select Shipment Type</MenuItem>
                    <MenuItem value={1}>Parcel</MenuItem>
                    <MenuItem value={2}>LetterMail</MenuItem>
                    <MenuItem value={3}>LTL</MenuItem>
                  </Select>
                </FormControl>
              ),
            },
            {
              title: "Shipping Service",
              field: "shippingserviceid",
              lookup: shiptyepdata,
              editable: "never",
            },
          ],
        });
        setLoading(false);
      } else {
        if (value1 === 1) {
          shiptyepdata = shiptype1;
          shiptype2data1 = shiptype1data;
        } else if (value1 === 2) {
          shiptyepdata = shiptype2;
          shiptype2data1 = shiptype2data;
        } else if (value1 === 3) {
          shiptyepdata = shiptype3;
          shiptype2data1 = shiptype3data;
        }

        setState({
          columns: [
            {
              title: "Source",
              field: "source",
              lookup: policyData,
              editComponent: (props) => (
                <FormControl className={classes.formControl}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={props.rowData.sourceid}
                    onChange={(e) => handleChangeSource(e, props)}
                  >
                    <MenuItem value={0}>Select Source</MenuItem>
                    {sourcePo.map((option) => (
                      <MenuItem value={option.integrationId}>
                        {option.integrationName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ),
            },
            {
              title: "Policy Name",
              field: "integrationspoliciesId",
              lookup: { 1: "Parcel", 2: "LetterMail", 3: "LTL" },
              editable: "never",
              hidden: true,
            },

            {
              title: "Warehouse",
              field: "warehouseid",
              lookup: { 1: "US Warehouse", 2: "Canada Warehouse" },
              hidden: true,
              editComponent: (props) => (
                <FormControl className={classes.formControl}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value4}
                    onChange={(e) => handleChangeWarehouseId(e, props)}
                  >
                    <MenuItem value={0}>Select Warehouse</MenuItem>
                    <MenuItem value={1}>US Warehouse</MenuItem>
                    <MenuItem value={2}>Canada Warehouse</MenuItem>
                  </Select>
                </FormControl>
              ),
            },
            {
              title: "Shipment Type",
              field: "shipmenttype",
              lookup: { 1: "Parcel", 2: "LetterMail", 3: "LTL" },
              editComponent: (props) => (
                <FormControl className={classes.formControl}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value1}
                    onChange={(e) => handleChangeShipmentType(e, props)}
                  >
                    <MenuItem value={0}>Select Shipment Type</MenuItem>
                    <MenuItem value={1}>Parcel</MenuItem>
                    <MenuItem value={2}>LetterMail</MenuItem>
                    <MenuItem value={3}>LTL</MenuItem>
                  </Select>
                </FormControl>
              ),
            },
            {
              title: "Shipping Service",
              field: "shippingserviceid",
              lookup: shiptyepdata,
              editComponent: (props) => (
                <FormControl className={classes.formControl}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={props.value}
                    onChange={(e) => handleChangeShippingService(e, props)}
                  >
                    <MenuItem value={0}>Select Shipping Service</MenuItem>
                    {shiptype2data1.map((option) => (
                      <MenuItem value={option.value}>{option.label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ),
            },
          ],
        });
        setLoading(false);
      }
    } else {
      shiphypeservice
        .fetchShipPolicyOrder(userid, 1)
        .then((response) => {
          console.log("status", response.status);
          if (response.status === true) {
            setLoading(false);
            setShippingPolicyStatus(true);
            setShipData(response.data);

            if (value1 === 0) {
              if (value1 === 1) {
                shiptyepdata = shiptype1;
                shiptype2data1 = shiptype1data;
              } else if (value1 === 2) {
                shiptyepdata = shiptype2;
                shiptype2data1 = shiptype2data;
              } else if (value1 === 3) {
                shiptyepdata = shiptype3;
                shiptype2data1 = shiptype3data;
              }

              for (let i = 0; i < response.data.length; i++) {
                if (response.data[i].integrationId === parseInt(value)) {
                  var ploi = response.data[i].polocies;
                  response.data[i].polocies.forEach(
                    (element) =>
                      (column1FilterList[element.integrationspoliciesId] =
                        element.policytitle)
                  );
                  setState({
                    column1FilterList,
                    columns: [
                      {
                        title: "Source",
                        field: "source",
                        lookup: policyData,
                        editComponent: (props) => (
                          <FormControl className={classes.formControl}>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={value}
                              onChange={(e) => handleChangeSource(e, props)}
                            >
                              <MenuItem value={0}>Select Source</MenuItem>
                              {sourcePo.map((option) => (
                                <MenuItem value={option.integrationId}>
                                  {option.integrationName}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        ),
                      },
                      {
                        title: "Policy Name",
                        field: "integrationspoliciesId",
                        lookup: { ...column1FilterList },
                        hidden: true,
                        editComponent: (props) => (
                          <FormControl className={classes.formControl}>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={value2}
                              onChange={(e) => handleChangePolicy(e, props)}
                            >
                              <MenuItem value={0}>Select Source</MenuItem>
                              {ploi.map((option) => (
                                <MenuItem value={option.integrationspoliciesId}>
                                  {option.policytitle}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        ),
                      },

                      {
                        title: "Warehouse",
                        field: "warehouseid",
                        lookup: { 1: "US Warehouse", 2: "Canada Warehouse" },
                        hidden: true,
                        editComponent: (props) => (
                          <FormControl className={classes.formControl}>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={value4}
                              onChange={(e) =>
                                handleChangeWarehouseId(e, props)
                              }
                            >
                              <MenuItem value={0}>Select Warehouse</MenuItem>
                              <MenuItem value={1}>US Warehouse</MenuItem>
                              <MenuItem value={2}>Canada Warehouse</MenuItem>
                            </Select>
                          </FormControl>
                        ),
                      },
                      {
                        title: "Shipment Type",
                        field: "shipmenttype",
                        lookup: { 1: "Parcel", 2: "LetterMail", 3: "LTL" },
                        editComponent: (props) => (
                          <FormControl className={classes.formControl}>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={value1}
                              onChange={(e) =>
                                handleChangeShipmentType(e, props)
                              }
                            >
                              <MenuItem value={0}>
                                Select Shipment Type
                              </MenuItem>
                              <MenuItem value={1}>Parcel</MenuItem>
                              <MenuItem value={2}>LetterMail</MenuItem>
                              <MenuItem value={3}>LTL</MenuItem>
                            </Select>
                          </FormControl>
                        ),
                      },
                      {
                        title: "Shipping Service",
                        field: "shippingserviceid",
                        lookup: shiptyepdata,
                        editable: "never",
                      },
                    ],
                  });
                }
                //           setEmails(shipData[i].polocies);
              }
            } else {
              if (value1 === 1) {
                shiptyepdata = shiptype1;
                shiptype2data1 = shiptype1data;
              } else if (value1 === 2) {
                shiptyepdata = shiptype2;
                shiptype2data1 = shiptype2data;
              } else if (value1 === 3) {
                shiptyepdata = shiptype3;
                shiptype2data1 = shiptype3data;
              }

              // for (let i = 0; i < response.data.length; i++) {
              //   if ( response.data[i].integrationId === parseInt(value)) {
              //     var ploi=response.data[i].polocies;
              //     response.data[i].polocies.forEach(element => column1FilterList[element.integrationspoliciesId] = element.policytitle)
              setState({
                // column1FilterList,
                columns: [
                  {
                    title: "Source",
                    field: "source",
                    lookup: policyData,
                    editComponent: (props) => (
                      <FormControl className={classes.formControl}>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={value}
                          onChange={(e) => handleChangeSource(e, props)}
                        >
                          <MenuItem value={0}>Select Source</MenuItem>
                          {sourcePo.map((option) => (
                            <MenuItem value={option.integrationId}>
                              {option.integrationName}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    ),
                  },
                  {
                    title: "Policy Name",
                    field: "integrationspoliciesId",
                    lookup: policyData,
                    hidden: true,
                    editComponent: (props) => (
                      <FormControl className={classes.formControl}>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={value2}
                          onChange={(e) => handleChangePolicy(e, props)}
                        >
                          <MenuItem value={0}>Select Source</MenuItem>
                          {sourcePo.map((option) => (
                            <MenuItem value={option.integrationspoliciesId}>
                              {option.policytitle}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    ),
                  },

                  {
                    title: "Warehouse",
                    field: "warehouseid",
                    lookup: { 1: "US Warehouse", 2: "Canada Warehouse" },
                    hidden: true,
                    editComponent: (props) => (
                      <FormControl className={classes.formControl}>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={value4}
                          onChange={(e) => handleChangeWarehouseId(e, props)}
                        >
                          <MenuItem value={0}>Select Warehouse</MenuItem>
                          <MenuItem value={1}>US Warehouse</MenuItem>
                          <MenuItem value={2}>Canada Warehouse</MenuItem>
                        </Select>
                      </FormControl>
                    ),
                  },
                  {
                    title: "Shipment Type",
                    field: "shipmenttype",
                    lookup: { 1: "Parcel", 2: "LetterMail", 3: "LTL" },
                    editComponent: (props) => (
                      <FormControl className={classes.formControl}>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={value1}
                          onChange={(e) => handleChangeShipmentType(e, props)}
                        >
                          <MenuItem value={0}>Select Shipment Type</MenuItem>
                          <MenuItem value={1}>Parcel</MenuItem>
                          <MenuItem value={2}>LetterMail</MenuItem>
                          <MenuItem value={3}>LTL</MenuItem>
                        </Select>
                      </FormControl>
                    ),
                  },
                  {
                    title: "Shipping Service",
                    field: "shippingserviceid",
                    lookup: shiptyepdata,
                    editComponent: (props) => (
                      <FormControl className={classes.formControl}>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={props.value}
                          onChange={(e) =>
                            handleChangeShippingService(e, props)
                          }
                        >
                          <MenuItem value={0}>Select Shipping Service</MenuItem>
                          {shiptype2data1.map((option) => (
                            <MenuItem value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    ),
                  },
                ],
              });
            }
            //           setEmails(shipData[i].polocies);

            //         }
            // }

            //fetchCarrierSetting(response.data);
          } else {
            setLoading(false);
            console.log("message", response.message);
          }
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
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

  let screenWidth = Dimensions.get("window").width;
  let widthScreen = "";
  let widthScreen1 = "";
  if (screenWidth < 400) {
    widthScreen = classes.content;
  } else if (screenWidth < 690) {
    widthScreen = classes.content;
  } else if (screenWidth < 900) {
    widthScreen = classes.content;
  } else if (screenWidth < 1530) {
    widthScreen = classes.content;
  } else if (screenWidth < 1600) {
    widthScreen = classes.content1;
  } else {
    widthScreen = classes.content;
  }

  const addStepStatus = () => {
    // const userid=userid;
    const shiphypesubsubstepId = 4;
    const shiphypesubstepId = 0;
    const shiphypestepId = 0;
    setLoading(true);
    shiphypeservice
      .addUserStepDoneSofar(
        userid,
        shiphypesubsubstepId,
        shiphypesubstepId,
        shiphypestepId
      )
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          handleNextPage(5);
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };

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
    } else if (index === 5) {
      props.handleStepPage(6);
    }
  };

  return (
    <View className={widthScreen}>
      <Grid justify="center">
        <ProgressBar loading={loading} />
      </Grid>
      <View>
        <Grid style={{ marginLeft: "3px" }}>
          <Text
            style={{
              fontSize: "14px",
              fontWeight: "700",
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
              color: "#001737",

              transition: "all 0.25s",
            }}
          >
            {"\n"}Shipping Policies
          </Text>
          <Text
            style={{
              fontSize: "12px",

              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
              color: "#001737",
              marginTop: "10px",
              transition: "all 0.25s",
            }}
          >
            {"\n"}You can customize your Shipping Policies on this page. {"\n"}
            {"\n"}
          </Text>
        </Grid>
        <form className={classes.form}>
          <Grid container className={classes.root} spacing={1}>
            <Grid container justify="space-between">
              <Grid item lg={11} xs={11}>
                {/* {(setupdateadd===false ? */}
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
                      Select which Shipping Policies you would like to assign to
                      your shipments:
                    </Text>
                  }
                  columns={state.columns}
                  data={shiipingplociyData}
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
                  options={{
                    paging: false,
                    maxBodyHeight: "50vh",
                    doubleHorizontalScroll: true,
                    headerStyle: { position: "sticky", top: 0 },
                    //pageSize:10,
                    //pageSizeOptions:[10,20,30,40,50,100],
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
                  paddingTop: 4,
                  paddingBottom: 4,
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
                  paddingTop: 5,
                  paddingBottom: 5,
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
                            addNew(
                              newData.source,
                              newData.integrationspoliciesId,
                              newData.warehouseid,
                              newData.shipmenttype,
                              newData.shippingserviceid
                            );
                            //
                          }
                          resolve();
                        }, 1000);
                      }),

                      onBulkUpdate: changes =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              
              console.log("changes",changes);
              resolve();
            }, 1000);
          }),  
                    // onRowUpdate: (newData, oldData) =>
                    //   new Promise((resolve, reject) => {
                    //     setTimeout(() => {
                    //       {
                    //         const data = shiipingplociyData;
                    //         const index = data.indexOf(oldData);

                    //         const customproduct_id =
                    //           shiipingplociyData[index].userintegrationpolicyId;

                    //         updateNew(
                    //           customproduct_id,
                    //           newData.sourceid,
                    //           newData.integrationspoliciesId,
                    //           newData.warehouseid,
                    //           newData.shipmenttype,
                    //           newData.shippingserviceid
                    //         );
                    //       }
                    //       resolve();
                    //     }, 1000);
                    //   }),
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </form>
       
        <Grid item lg={11} style={{ marginTop: "5px" }}>
          <Grid justify="flex-end" container>
            <Grid item style={{ marginRight: "0px" }}>
              {userRoleId === 1 ? (
                <Grid
                  item
                  style={{
                    marginTop: "1px",
                    marginBottom: "5px",
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
                        // fetchSellerProductPackingList(newValue.id);
                        // setSellerid(newValue.id);

                        fetchShipRestricationReferh(newValue.id);
                      } else {
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
        <form className={classes.form}>
          <Grid container className={classes.root} spacing={1}>
            <Grid container justify="space-between">
              <Grid item lg={11} xs={11}>
                {/* {(setupdateadd===false ? */}
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
                      Shipping Restriction:
                    </Text>
                  }
                  columns={state2.columns}
                  data={shipRestricationData}
                  icons={tableIcons2}
                  components={{
                    Container: (props) => <Paper {...props} elevation={0} />,

                    Toolbar: (props) => <StyledMTableToolbar {...props} />,
                  }}
                  localization={{
                    toolbar: {
                      searchPlaceholder: "Search ",
                    },
                    header: {
                      actions: "Action",
                    },
                  }}
                  options={{
                    paging: false,
                    maxBodyHeight: "50vh",
                    doubleHorizontalScroll: true,
                    headerStyle: { position: "sticky", top: 0 },
                    //pageSize:10,
                    //pageSizeOptions:[10,20,30,40,50,100],
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
                  paddingTop: 4,
                  paddingBottom: 4,
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
                  paddingTop: 5,
                  paddingBottom: 5,
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
                            addShipRestrication(
                              newData.orderdestination,
                              newData.shippingfrom,
                              newData.importdata
                            );
                            //
                          }
                          resolve();
                        }, 1000);
                      }),
                    // onRowUpdate: (newData, oldData) =>
                    //   new Promise((resolve, reject) => {
                    //     setTimeout(() => {
                    //       {
                    //         const data = shipRestricationData;
                    //         const index = data.indexOf(oldData);

                    //         const usershipingpoliciesid =
                    //           shipRestricationData[index].userShipingPoliciesId;

                    //         updateShipRestrication(
                    //           usershipingpoliciesid,
                    //           newData.orderdestination,
                    //           newData.shippingfrom,
                    //           newData.importdata
                    //         );
                    //       }
                    //       resolve();
                    //     }, 1000);
                    //   }),

                    // onRowDelete: (oldData) =>
                    //   new Promise((resolve, reject) => {
                    //     setTimeout(() => {
                    //       {
                    //         const data = shipRestricationData;
                    //         const index = data.indexOf(oldData);

                    //         const usershipingpoliciesid =
                    //           shipRestricationData[index].userShipingPoliciesId;

                    //         deleteShipRestrication(usershipingpoliciesid);
                    //       }
                    //       resolve();
                    //     }, 1000);
                    //   }),
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </form>
        {showToast(open, msg, type)}
      </View>
    </View>
  );
}
