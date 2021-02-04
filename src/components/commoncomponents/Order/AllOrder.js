import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  fade,
  withStyles,
  makeStyles,
  useTheme,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Platform, View, Image, Text, Dimensions } from "react-native";

import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import * as shiphypeservice from ".././ShipService/shiphype_service";
import MaterialTable, { MTableToolbar } from "material-table";
import Typography from "@material-ui/core/Typography";
import Toast from ".././feedback/Toast";
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
import Grid from "@material-ui/core/Grid";
import DeleteCard from "./ShowStatusOrderForSeller";
import OnHoldOrder from "./OnHoldOrder";
import OnCanceled from "./OnCanceled";
import { format } from "date-fns";
import TrackingURLNotExits from "./TrackingURLNotExits";
import ProgressBar from ".././feedback/ProgressBar";
import { forwardRef } from "react";
import RefreshIcon from "@material-ui/icons/Refresh";
import AsyncStorage from "@react-native-community/async-storage";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import popUpStyle from "../style/popUpStyle";
import moment from "moment";

const ColorButtonRefresh = withStyles((theme) => ({
  root: {
    borderRadius: "3px",
    height: "100%",
    padding: "3px",
    width: "100px",
    fontSize: "11px",
    fontWeight: "550",
    color: "#fff",
    boxShadow:'none',
    backgroundColor: "#33cc00",
    "&:hover": {
      color: "#fff",
      backgroundColor: "#33cc00",
    },
    "&:MuiIconButton-root:hover":{
      backgroundColor: "#33cc00",
    },
  },
}))(Button);


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

const ColorButtonAdd1 = withStyles((theme) => ({
  root: {
    borderRadius: "3px",
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    //marginTop:'3%',
    height: "100%",
    padding: "3px",
    width: "100px",
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

const tableIcons = {
  Add: () => (
    <ColorButtonAdd
      size="large"
      variant="contained"
      color="primary"
      startIcon={<AddIcon />}
    >
      Create Subscription Box
    </ColorButtonAdd>
  ),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  RefreshIcon: forwardRef((props, ref) => (
    <RefreshIcon {...props} ref={ref} color="action" />
  )),
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

const StyledMTableToolbar = withStyles({
  root: {
    paddingLeft: 0,
    paddingRight: 0,
  },
})(MTableToolbar);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "75vh",
    overflow: "auto",
    backgroundColor: "#fff",
  },
  quantitycss: {
    width: "90%",
    fontSize: "6px",
    cursor: "pointer",
  },
}));

//Make custom button
const ColorButtonProcessed = withStyles((theme) => ({
  root: {
    color: "#fff",
    borderRadius: "3px",
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    height: "75%",
    width: "100px",
    fontSize: "11px",
    fontWeight: "550",
    color: "#fff",
    padding: 0,
    paddingBottom: "3px",
    paddingTop: "3px",
    backgroundColor: "#0168fa",
    "&:hover": {
      backgroundColor: "#0168fa",
    },
  },
}))(Button);
const ColorButtonCancel = withStyles((theme) => ({
  root: {
    color: "#fff",
    borderRadius: "3px",
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    height: "75%",
    width: "100px",
    fontSize: "11px",
    fontWeight: "550",
    color: "#fff",
    padding: 0,
    paddingBottom: "3px",
    paddingTop: "3px",
    backgroundColor: "#e60000",
    "&:hover": {
      backgroundColor: "#e60000",
    },
  },
}))(Button);
const ColorButtonShipped = withStyles((theme) => ({
  root: {
    color: "#fff",
    borderRadius: "3px",
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    height: "75%",
    width: "100px",
    fontSize: "11px",
    fontWeight: "550",
    color: "#fff",
    padding: 0,
    paddingBottom: "3px",
    paddingTop: "3px",
    //  backgroundColor:'#009900',
    //  '&:hover': {
    //   backgroundColor: '#009900',

    // },
    backgroundColor: "#732673",
    "&:hover": {
      backgroundColor: "#732673",
    },
  },
}))(Button);
const ColorButtonNew = withStyles((theme) => ({
  root: {
    color: "#fff",
    borderRadius: "3px",
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    height: "75%",
    width: "100px",
    fontSize: "11px",
    fontWeight: "550",
    color: "#fff",
    padding: 0,
    paddingBottom: "3px",
    paddingTop: "3px",
    backgroundColor: "#33cc00",
    "&:hover": {
      backgroundColor: "#33cc00",
    },
  },
}))(Button);
const ColorButtonOnHold = withStyles((theme) => ({
  root: {
    color: "#fff",
    borderRadius: "3px",
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    height: "75%",
    width: "100px",
    fontSize: "11px",
    fontWeight: "550",
    color: "#fff",
    padding: 0,
    paddingBottom: "3px",
    paddingTop: "3px",
    backgroundColor: "#808080",
    "&:hover": {
      backgroundColor: "#808080",
    },
  },
}))(Button);
const ColorButtonException = withStyles((theme) => ({
  root: {
    color: "#fff",
    borderRadius: "3px",
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    height: "75%",
    width: "100px",
    fontSize: "11px",
    fontWeight: "550",
    color: "#fff",
    padding: 0,
    paddingBottom: "3px",
    paddingTop: "3px",
    backgroundColor: "#992600",
    "&:hover": {
      backgroundColor: "#992600",
    },
  },
}))(Button);

const ColorButtonInTransit = withStyles((theme) => ({
  root: {
    color: "#fff",
    borderRadius: "3px",
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    height: "75%",
    width: "100px",
    fontSize: "11px",
    fontWeight: "550",
    color: "#000",
    padding: 0,
    paddingBottom: "3px",
    paddingTop: "3px",
    backgroundColor: "#d9d9d9",
    "&:hover": {
      backgroundColor: "#d9d9d9",
    },
  },
}))(Button);

const ColorButtonInDeliverd = withStyles((theme) => ({
  root: {
    color: "#fff",
    borderRadius: "3px",
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    height: "75%",
    width: "100px",
    fontSize: "11px",
    fontWeight: "550",
    color: "#fff",
    padding: 0,
    paddingBottom: "3px",
    paddingTop: "3px",
    backgroundColor: "#002db3",
    "&:hover": {
      backgroundColor: "#002db3",
    },
  },
}))(Button);
export default function ScrollableTabsButtonAuto(props) {
  const classes = useStyles();
  const orderStatusOptions = props.orderStatusOptions;
  let orderStatusId = props.orderStatus;
  const orderTypeOptions = props.orderTypeOptions;
  const orderCouierOptions = props.orderCouierOptions;
  const orderCustomerOptions = props.orderCustomerOptions;
  const [orderList, setOrderList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [dataproduct, setDataProduct] = React.useState([]);
  const userid = props.userid;
  const userRoleId = parseInt(window.localStorage.roleId);
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [type, setType] = React.useState("");
  const [openDelete, setOpenDelete] = React.useState(false);
  const [cardid, setCardid] = React.useState(0);
  const [cardid1, setCardid1] = React.useState([]);
  const [rowDataForOrder, setRowData] = React.useState([]);
  const [rowStatus, setRowStatus] = React.useState(0);

  const [changedWarehouseid, setchangedWarehouseid] = React.useState([]);
  const [openOnHoldOrder, setOpenOnHoldOrder] = React.useState(false);
  const [openChecked, setOpenChekced] = React.useState(false);
  const [openCancelOrderSet, setOpenCancelOrderSet] = React.useState(false);
  const [stateproduct1, setStateproduct1] = React.useState({
    data: [],
  });
  const [openTrackingURL, setopenTrackingURL] = React.useState(false);
  const handleGetShipmentId = (rowdata) => {
    props.getShipmentIdFromOrder(rowdata);
  };

  const handleClickTrack = (rowid, rowData) => {
    if (rowData.trackingurl === null) {
      setopenTrackingURL(true);
    } else if (rowData.trackingurl === "") {
      setopenTrackingURL(true);
    } else {
      window.open(rowData.trackingurl, "_blank");
    }

    console.log("rowid", rowid);
  };

  var ids = [];
  var ProductSelect = [];
  const theme = useTheme();
  const [selectproduct, setSelectproduct] = React.useState(true);

  const [state, setState] = React.useState({
    column1FilterList: {},
    column2FilterList: {},
    selectproduct: false,
    columns: [
      // { title: 'ShipHype Id', field: 'internalorderId',type: 'text',
      //     render: rowData => <Link href="#" onClick={() => handleGetShipmentId(rowData)} variant="body2">
      //      {rowData.internalorderId} </Link>
      //   },
      {
        title: "",
        render: (rowData) => (
          <FormGroup>
            {(() => {
              if (rowData !== undefined) {
                return (
                  <FormControlLabel
                    style={popUpStyle.checkboxPosition2}
                    control={
                      <Checkbox
                        id={rowData.internalorderId}
                        checked={(() => {
                          for (let i = 0; i < ids.length; i++) {
                            if (rowData.internalorderId === parseInt(ids[i])) {
                              return true;
                            }
                          }
                        })()}
                        onChange={() => {
                          handleChangeCheckbox(rowData.internalorderId);
                          handleChangeRowClickCustome(rowData.internalorderId, rowData);
                        }}
                        color="primary"
                      />
                    }
                    className={classes.radioButtonCss}
                    InputProps={{
                      inputProps: { style: { borderRadius: 0 } },
                      style: { borderRadius: 0 },
                    }}
                  />
                );
              }
            })()}
          </FormGroup>
        ),
      },
      { title: "Platform Id", field: "externalorderId", type: "text",
      render: (rowData) => (
        <FormControlLabel
          onClick={() => {
            handleChangeCheckbox(rowData.internalorderId);
                          handleChangeRowClickCustome(rowData.internalorderId, rowData);
          }}
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
                 {rowData.externalorderId === null ?  '  ' : rowData.externalorderId}
              </Text>
            </Typography>
          }
        />
      ),
    },
      { title: "Order Date", field: "orderdate", type: "text",
      render: (rowData) => (
        <FormControlLabel
          onClick={() => {
            handleChangeCheckbox(rowData.internalorderId);
                          handleChangeRowClickCustome(rowData.internalorderId, rowData);
          }}
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
                {moment(rowData.orderdate).format("MM/DD/YYYY")}
              </Text>
            </Typography>
          }
        />
      ),
    },
      // { title: 'Courier Id', field: 'courierid', type: 'text'},
      
      { title: "Order Id", field: "sellerorderid", type: "text",
      render: (rowData) => (
        <FormControlLabel
          onClick={() => {
            handleChangeCheckbox(rowData.internalorderId);
                          handleChangeRowClickCustome(rowData.internalorderId, rowData);
          }}
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
                {rowData.sellerorderid === null ? ' ' : rowData.sellerorderid}
              </Text>
            </Typography>
          }
        />
      ),
    },
     
      { title: "Source", field: "source", type: "text",
      render: (rowData) => (
        <FormControlLabel
          onClick={() => {
            handleChangeCheckbox(rowData.internalorderId);
                          handleChangeRowClickCustome(rowData.internalorderId, rowData);
          }}
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
                {rowData.source}
              </Text>
            </Typography>
          }
        />
      ),
    },
      {
        title: "Order Type",
        field: "ordertype",
        lookup: { 1: "Integration", 2: "Manual", 3: "Subscription Box" },
        render: (rowData) => (
          <FormControlLabel
            onClick={() => {
              handleChangeCheckbox(rowData.internalorderId);
                          handleChangeRowClickCustome(rowData.internalorderId, rowData);
            }}
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
                  if (rowData.ordertype === 1) {
                    return (
                      <Text
                        style={{
                          fontSize: "11px",
                          fontFamily:
                            '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                          transition: "all 0.25s",
                        }}
                      >
                        Integration
                      </Text>
                    );
                  }else if(rowData.ordertype === 2){
                    return (
                      <Text
                        style={{
                          fontSize: "11px",
                          fontFamily:
                            '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                          transition: "all 0.25s",
                        }}
                      >
                        Manual
                      </Text>
                    );
                  }
                   else {
                    return (
                      <Text
                        style={{
                          fontSize: "11px",
                          fontFamily:
                            '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                          transition: "all 0.25s",
                        }}
                      >
                        Subscription Box
                      </Text>
                    );
                  }
                })()}
              </Typography>
            }
          />
        ),
        
      }, 
      { title: "Customer Name", field: "recipientname", type: "text",
      render: (rowData) => (
        <FormControlLabel
          onClick={() => {
            handleChangeCheckbox(rowData.internalorderId);
                          handleChangeRowClickCustome(rowData.internalorderId, rowData);
          }}
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
            {rowData.firstname} {rowData.lastname}{" "}
          </Text>
            </Typography>
          }
        />
      ),
    },
      {
        title: "Order Country",
        field: "ordercountry",
        type: "text",
        render: (rowData) => (
          <FormControlLabel
            onClick={() => {
              handleChangeCheckbox(rowData.internalorderId);
                            handleChangeRowClickCustome(rowData.internalorderId, rowData);
            }}
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
              {rowData.ordercountry}
            </Text>
              </Typography>
            }
          />
        ),
      },
      {
        title: "Warehouse",
        field: "warehouseid",
        lookup: { 1: "US Warehouse", 2: "Canada Warehouse" },
        render: (rowData) => (
          <FormControlLabel
            onClick={() => {
              handleChangeCheckbox(rowData.internalorderId);
                          handleChangeRowClickCustome(rowData.internalorderId, rowData);
            }}
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
                  if (rowData.warehouseid === 1) {
                    return (
                      <Text
                        style={{
                          fontSize: "11px",
                          fontFamily:
                            '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                          transition: "all 0.25s",
                        }}
                      >
                        US Warehouse
                      </Text>
                    );
                  }
                   else {
                    return (
                      <Text
                        style={{
                          fontSize: "11px",
                          fontFamily:
                            '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                          transition: "all 0.25s",
                        }}
                      >
                        Canada Warehouse
                      </Text>
                    );
                  }
                })()}
              </Typography>
            }
          />
        ),
      },

      {
        title: "Customer Type",
        field: "customertype",
        lookup: { 1: "Residential", 2: "Business" },
        render: (rowData) => (
          <FormControlLabel
            onClick={() => {
              handleChangeCheckbox(rowData.internalorderId);
                          handleChangeRowClickCustome(rowData.internalorderId, rowData);
            }}
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
                  if (rowData.customertype === 1) {
                    return (
                      <Text
                        style={{
                          fontSize: "11px",
                          fontFamily:
                            '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                          transition: "all 0.25s",
                        }}
                      >
                        Residential
                      </Text>
                    );
                  }
                   else {
                    return (
                      <Text
                        style={{
                          fontSize: "11px",
                          fontFamily:
                            '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                          transition: "all 0.25s",
                        }}
                      >
                        Business
                      </Text>
                    );
                  }
                })()}
              </Typography>
            }
          />
        ),
        //  lookup: orderCustomerOptions ,
      },

      {
        title: "Order Status",
        field: "orderstatus",

        render: (rowData) => (
          <Text>
            {(() => {
              if (rowData.orderstatus === 5) {
                return (
                  <ColorButtonInTransit
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      handleClickOpendelete(rowData.internalorderId, rowData);
                    }}
                  >
                    {" "}
                    In Transit{" "}
                  </ColorButtonInTransit>
                );
              } else if (rowData.orderstatus === 3) {
                return (
                  <ColorButtonProcessed
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      handleClickOpendelete(rowData.internalorderId, rowData);
                    }}
                  >
                    {" "}
                    Processing{" "}
                  </ColorButtonProcessed>
                );
              } else if (rowData.orderstatus === 6) {
                return (
                  <ColorButtonInDeliverd
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      handleClickOpendelete(rowData.internalorderId, rowData);
                    }}
                  >
                    {" "}
                    Delivered{" "}
                  </ColorButtonInDeliverd>
                );
              } else if (rowData.orderstatus === 4) {
                return (
                  <ColorButtonShipped
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      handleClickOpendelete(rowData.internalorderId, rowData);
                    }}
                  >
                    {" "}
                    Shipped{" "}
                  </ColorButtonShipped>
                );
              } else if (rowData.orderstatus === 7) {
                return (
                  <ColorButtonOnHold
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      handleClickOpendelete(rowData.internalorderId, rowData);
                    }}
                  >
                    {" "}
                    On Hold
                  </ColorButtonOnHold>
                );
              } else if (rowData.orderstatus === 8) {
                return (
                  <ColorButtonOnHold
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      handleClickOpendelete(rowData.internalorderId, rowData);
                    }}
                  >
                    {" "}
                    On Hold
                  </ColorButtonOnHold>
                );
              } else if (rowData.orderstatus === 9) {
                return (
                  <ColorButtonCancel
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      handleClickOpendelete(rowData.internalorderId, rowData);
                    }}
                  >
                    {" "}
                    Cancelled{" "}
                  </ColorButtonCancel>
                );
              } else {
                return (
                  <ColorButtonNew
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      handleClickOpendelete(rowData.internalorderId, rowData);
                    }}
                  >
                    {" "}
                    New Order{" "}
                  </ColorButtonNew>
                );
              }
            })()}
          </Text>
        ),
        lookup: orderStatusOptions,
      },
      {
        title: "Track Order",
        field: "trackingurl",

        render: (rowData) => (
          <Text>
            <ColorButtonProcessed
              size="large"
              variant="contained"
              color="primary"
              onClick={() => {
                if (rowData.orderstatus === 4) {
                  handleClickTrack(rowData.internalorderId, rowData);
                }
              }}
            >
              {" "}
              Track{" "}
            </ColorButtonProcessed>
          </Text>
        ),
      },
      { title: "Shipping Courier", field: "shippingpolicy", type: "text",
        
          render: (rowData) => (
            <FormControlLabel
              onClick={() => {
                handleChangeCheckbox(rowData.internalorderId);
                              handleChangeRowClickCustome(rowData.internalorderId, rowData);
              }}
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
                    {rowData.shippingpolicy === null ? '  ' : rowData.shippingpolicy}
                  </Text>
                </Typography>
              }
            />
          ),},
          { title: "Tracking #", field: "tracking", type: "text",
          render: (rowData) => (
            <FormControlLabel
              onClick={() => {
                handleChangeCheckbox(rowData.internalorderId);
                              handleChangeRowClickCustome(rowData.internalorderId, rowData);
              }}
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
                    {rowData.tracking === "" ? '  ' : rowData.tracking}
                  </Text>
                </Typography>
              }
            />
          ),
        },
          {
            title: "Shipping Service",
            field: "shipmenttype",
            type: "text",

            render: (rowData) => (
              <FormControlLabel
              onClick={() => {
                handleChangeCheckbox(rowData.internalorderId);
                              handleChangeRowClickCustome(rowData.internalorderId, rowData);
              }}
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
              <Text>
                {(() => {
                  if (rowData.shipmenttype === "10") {
                    return (
                      <Text
                        style={{
                          fontSize: "11px",
                          fontFamily:
                            '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                          transition: "all 0.25s",
                        }}
                      >
                        Custom Shipping Label
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
                        2-Day Shipping
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
                        Overnight Shipping
                      </Text>
                    );
                  } else if (rowData.shipmenttype === "4") {
                    return (
                      <Text
                        style={{
                          fontSize: "11px",
                          fontFamily:
                            '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                          transition: "all 0.25s",
                        }}
                      >
                        Stamped Postage
                      </Text>
                    );
                  } else if (rowData.shipmenttype === "5") {
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
                  } else if (rowData.shipmenttype === "6") {
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
                  }else if (rowData.shipmenttype === "1") {
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
              }else{
                return (
                  <Text
                    style={{
                      fontSize: "11px",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                      transition: "all 0.25s",
                    }}
                  >
                   {' '}
                  </Text>
                );
              }
                })()}
              </Text>
              </Typography>
              }
            />
            ),
          },

      { title: "Ship Date", field: "shipdate", type: "date" },
    ],
  });
  const fetchOrderListWithAdminCheck = () => {
    if (userRoleId === 1) {
      setState({
        //  column1FilterList,
        columns: [
          {
            title: "",
            render: (rowData) => (
              <FormGroup>
                {(() => {
                  if (rowData !== undefined) {
                    return (
                      <FormControlLabel
                        style={popUpStyle.checkboxPosition2}
                        control={
                          <Checkbox
                            id={rowData.internalorderId}
                            checked={(() => {
                              for (let i = 0; i < ids.length; i++) {
                                if (rowData.internalorderId === parseInt(ids[i])) {
                                  return true;
                                }
                              }
                            })()}
                            onChange={() => {
                              handleChangeCheckbox(rowData.internalorderId);
                              handleChangeRowClickCustome(rowData.internalorderId, rowData);
                            }}
                            color="primary"
                          />
                        }
                        className={classes.radioButtonCss}
                        InputProps={{
                          inputProps: { style: { borderRadius: 0 } },
                          style: { borderRadius: 0 },
                        }}
                      />
                    );
                  }
                })()}
              </FormGroup>
            ),
          },
          {
            title: "ShipHype Id",
            field: "internalorderId",
            type: "text",
           
            render: (rowData) => (
              <FormControlLabel
                onClick={() => {
                  handleChangeCheckbox(rowData.internalorderId);
                                handleChangeRowClickCustome(rowData.internalorderId, rowData);
                }}
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
                    <Link
                href="#"
                onClick={() => handleGetOrderDetails(rowData.internalorderId)}
                variant="body2"
              >
                {rowData.internalorderId}{" "}
              </Link>
                  </Typography>
                }
              />
            ),
          
          },

          { title: "Platform Id", field: "externalorderId", type: "text",
          render: (rowData) => (
            <FormControlLabel
              onClick={() => {
                handleChangeCheckbox(rowData.internalorderId);
                              handleChangeRowClickCustome(rowData.internalorderId, rowData);
              }}
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
                    {rowData.externalorderId === null ? ' ' : rowData.externalorderId}
                  </Text>
                </Typography>
              }
            />
          ),
        },
        { title: "Order Date", field: "orderdate", type: "text",
        render: (rowData) => (
          <FormControlLabel
            onClick={() => {
              handleChangeCheckbox(rowData.internalorderId);
                            handleChangeRowClickCustome(rowData.internalorderId, rowData);
            }}
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
                  {moment(rowData.orderdate).format("MM/DD/YYYY")}
                </Text>
              </Typography>
            }
          />
        ),
      },
          { title: "Courier Id", field: "courierid", type: "text",
          render: (rowData) => (
            <FormControlLabel
              onClick={() => {
                handleChangeCheckbox(rowData.internalorderId);
                              handleChangeRowClickCustome(rowData.internalorderId, rowData);
              }}
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
                    {rowData.courierid === null ? ' ' : rowData.courierid}
                  </Text>
                </Typography>
              }
            />
          ),
        },
          {
            title: "Order Id",
            field: "sellerorderid",
            type: "text",
            
            render: (rowData) => (
              <FormControlLabel
                onClick={() => {
                  handleChangeCheckbox(rowData.internalorderId);
                                handleChangeRowClickCustome(rowData.internalorderId, rowData);
                }}
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
                    <Link
                href="#"
                onClick={() => handleGetOrderDetails(rowData.internalorderId)}
                variant="body2"
              >
                {rowData.sellerorderid}{" "}
              </Link>
                  </Typography>
                }
              />
            ),
          },
          { title: "Source", field: "source", type: "text",
          render: (rowData) => (
            <FormControlLabel
              onClick={() => {
                handleChangeCheckbox(rowData.internalorderId);
                              handleChangeRowClickCustome(rowData.internalorderId, rowData);
              }}
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
                    {rowData.source}
                  </Text>
                </Typography>
              }
            />
          ),
        },
          {
            title: "Order Type",
            field: "ordertype",
            lookup: { 1: "Integration", 2: "Manual", 3: "Subscription Box" },
            render: (rowData) => (
              <FormControlLabel
                onClick={() => {
                  handleChangeCheckbox(rowData.internalorderId);
                              handleChangeRowClickCustome(rowData.internalorderId, rowData);
                }}
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
                      if (rowData.ordertype === 1) {
                        return (
                          <Text
                            style={{
                              fontSize: "11px",
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              transition: "all 0.25s",
                            }}
                          >
                            Integration
                          </Text>
                        );
                      }else if(rowData.ordertype === 2){
                        return (
                          <Text
                            style={{
                              fontSize: "11px",
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              transition: "all 0.25s",
                            }}
                          >
                            Manual
                          </Text>
                        );
                      }
                       else {
                        return (
                          <Text
                            style={{
                              fontSize: "11px",
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              transition: "all 0.25s",
                            }}
                          >
                            Subscription Box
                          </Text>
                        );
                      }
                    })()}
                  </Typography>
                }
              />
            ),
            //   lookup: orderTypeOptions ,
          },
          //    { title: 'Order Type', field: 'itemvaluecurrency',type: 'text'},
          { title: "Customer Name", field: "recipientname", type: "text",
      render: (rowData) => (
        <FormControlLabel
          onClick={() => {
            handleChangeCheckbox(rowData.internalorderId);
                          handleChangeRowClickCustome(rowData.internalorderId, rowData);
          }}
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
            {rowData.firstname} {rowData.lastname}{" "}
          </Text>
            </Typography>
          }
        />
      ),
    },
          {
            title: "Order Country",
            field: "ordercountry",
            type: "text",
            render: (rowData) => (
              <FormControlLabel
                onClick={() => {
                  handleChangeCheckbox(rowData.internalorderId);
                                handleChangeRowClickCustome(rowData.internalorderId, rowData);
                }}
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
                      {rowData.ordercountry}
                    </Text>
                  </Typography>
                }
              />
            ),
            //lookup: { 1: 'United States', 2: 'Canada' },
          },
          {
            title: "Warehouse",
            field: "warehouseid",
            lookup: { 1: "US Warehouse", 2: "Canada Warehouse" },
            render: (rowData) => (
              <FormControlLabel
                onClick={() => {
                  handleChangeCheckbox(rowData.internalorderId);
                              handleChangeRowClickCustome(rowData.internalorderId, rowData);
                }}
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
                      if (rowData.warehouseid === 1) {
                        return (
                          <Text
                            style={{
                              fontSize: "11px",
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              transition: "all 0.25s",
                            }}
                          >
                            US Warehouse
                          </Text>
                        );
                      }
                       else {
                        return (
                          <Text
                            style={{
                              fontSize: "11px",
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              transition: "all 0.25s",
                            }}
                          >
                            Canada Warehouse
                          </Text>
                        );
                      }
                    })()}
                  </Typography>
                }
              />
            ),
          },
    
          {
            title: "Customer Type",
            field: "customertype",
            lookup: { 1: "Residential", 2: "Business" },
            render: (rowData) => (
              <FormControlLabel
                onClick={() => {
                  handleChangeCheckbox(rowData.internalorderId);
                              handleChangeRowClickCustome(rowData.internalorderId, rowData);
                }}
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
                      if (rowData.customertype === 1) {
                        return (
                          <Text
                            style={{
                              fontSize: "11px",
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              transition: "all 0.25s",
                            }}
                          >
                            Residential
                          </Text>
                        );
                      }
                       else {
                        return (
                          <Text
                            style={{
                              fontSize: "11px",
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              transition: "all 0.25s",
                            }}
                          >
                            Business
                          </Text>
                        );
                      }
                    })()}
                  </Typography>
                }
              />
            ),
            //  lookup: orderCustomerOptions ,
          },

          {
            title: "Order Status",
            field: "orderstatus",

            render: (rowData) => (
              <Text>
                {(() => {
                  if (rowData.orderstatus === 5) {
                    return (
                      <ColorButtonInTransit
                        size="large"
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          handleClickOpendelete(
                            rowData.internalorderId,
                            rowData
                          );
                        }}
                      >
                        {" "}
                        In Transit{" "}
                      </ColorButtonInTransit>
                    );
                  } else if (rowData.orderstatus === 3) {
                    return (
                      <ColorButtonProcessed
                        size="large"
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          handleClickOpendelete(
                            rowData.internalorderId,
                            rowData
                          );
                        }}
                      >
                        {" "}
                        Processing{" "}
                      </ColorButtonProcessed>
                    );
                  } else if (rowData.orderstatus === 6) {
                    return (
                      <ColorButtonInDeliverd
                        size="large"
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          handleClickOpendelete(
                            rowData.internalorderId,
                            rowData
                          );
                        }}
                      >
                        {" "}
                        Delivered{" "}
                      </ColorButtonInDeliverd>
                    );
                  } else if (rowData.orderstatus === 4) {
                    return (
                      <ColorButtonShipped
                        size="large"
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          handleClickOpendelete(
                            rowData.internalorderId,
                            rowData
                          );
                        }}
                      >
                        {" "}
                        Shipped{" "}
                      </ColorButtonShipped>
                    );
                  } else if (rowData.orderstatus === 7) {
                    return (
                      <ColorButtonOnHold
                        size="large"
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          handleClickOpendelete(
                            rowData.internalorderId,
                            rowData
                          );
                        }}
                      >
                        {" "}
                        On Hold
                      </ColorButtonOnHold>
                    );
                  } else if (rowData.orderstatus === 8) {
                    return (
                      <ColorButtonOnHold
                        size="large"
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          handleClickOpendelete(
                            rowData.internalorderId,
                            rowData
                          );
                        }}
                      >
                        {" "}
                        On Hold
                      </ColorButtonOnHold>
                    );
                  } else if (rowData.orderstatus === 9) {
                    return (
                      <ColorButtonCancel
                        size="large"
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          handleClickOpendelete(
                            rowData.internalorderId,
                            rowData
                          );
                        }}
                      >
                        {" "}
                        Cancelled{" "}
                      </ColorButtonCancel>
                    );
                  } else {
                    return (
                      <ColorButtonNew
                        size="large"
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          handleClickOpendelete(
                            rowData.internalorderId,
                            rowData
                          );
                        }}
                      >
                        {" "}
                        New Order{" "}
                      </ColorButtonNew>
                    );
                  }
                })()}
              </Text>
            ),
            lookup: orderStatusOptions,
          },
          {
            title: "Track Order",
            field: "trackingurl",

            render: (rowData) => (
              <Text>
                <ColorButtonProcessed
                  size="large"
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    if (rowData.orderstatus === 4) {
                      handleClickTrack(rowData.internalorderId, rowData);
                    }
                  }}
                >
                  {" "}
                  Track{" "}
                </ColorButtonProcessed>
              </Text>
            ),
          },
          { title: "Shipping Courier", field: "shippingpolicy", type: "text",
        
          render: (rowData) => (
            <FormControlLabel
              onClick={() => {
                handleChangeCheckbox(rowData.internalorderId);
                              handleChangeRowClickCustome(rowData.internalorderId, rowData);
              }}
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
                    {rowData.shippingpolicy === null ? '  ' : rowData.shippingpolicy}
                  </Text>
                </Typography>
              }
            />
          ),},
          { title: "Tracking #", field: "tracking", type: "text",
          render: (rowData) => (
            <FormControlLabel
              onClick={() => {
                handleChangeCheckbox(rowData.internalorderId);
                              handleChangeRowClickCustome(rowData.internalorderId, rowData);
              }}
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
                    {rowData.tracking === "" ? '  ' : rowData.tracking}
                  </Text>
                </Typography>
              }
            />
          ),
        },
          {
            title: "Shipping Service",
            field: "shipmenttype",
            type: "text",

            render: (rowData) => (
              <FormControlLabel
              onClick={() => {
                handleChangeCheckbox(rowData.internalorderId);
                              handleChangeRowClickCustome(rowData.internalorderId, rowData);
              }}
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
              <Text>
                {(() => {
                  if (rowData.shipmenttype === "10") {
                    return (
                      <Text
                        style={{
                          fontSize: "11px",
                          fontFamily:
                            '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                          transition: "all 0.25s",
                        }}
                      >
                        Custom Shipping Label
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
                        2-Day Shipping
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
                        Overnight Shipping
                      </Text>
                    );
                  } else if (rowData.shipmenttype === "4") {
                    return (
                      <Text
                        style={{
                          fontSize: "11px",
                          fontFamily:
                            '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                          transition: "all 0.25s",
                        }}
                      >
                        Stamped Postage
                      </Text>
                    );
                  } else if (rowData.shipmenttype === "5") {
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
                  } else if (rowData.shipmenttype === "6") {
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
                  }else if (rowData.shipmenttype === "1") {
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
              }else{
                return (
                  <Text
                    style={{
                      fontSize: "11px",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                      transition: "all 0.25s",
                    }}
                  >
                   {' '}
                  </Text>
                );
              }
                })()}
              </Text>
              </Typography>
              }
            />
            ),
          },
          { title: "Ship Date", field: "shipdate", type: "date" },
        ],
      });
    } else {
      setState({
        // column1FilterList,
        columns: [
          //       { title: 'ShipHype Id', field: 'internalorderId',type: 'text',
          //   render: rowData => <Link href="#" onClick={() => handleGetShipmentId(rowData)} variant="body2">
          //    {rowData.internalorderId} </Link>
          // },
          {
            title: "",
            render: (rowData) => (
              <FormGroup>
                {(() => {
                  if (rowData !== undefined) {
                    return (
                      <FormControlLabel
                        style={popUpStyle.checkboxPosition2}
                        control={
                          <Checkbox
                            id={rowData.internalorderId}
                            checked={(() => {
                              for (let i = 0; i < ids.length; i++) {
                                if (rowData.internalorderId === parseInt(ids[i])) {
                                  return true;
                                }
                              }
                            })()}
                            onChange={() => {
                              handleChangeCheckbox(rowData.internalorderId);
                              handleChangeRowClickCustome(rowData.internalorderId, rowData);
                            }}
                            color="primary"
                          />
                        }
                        className={classes.radioButtonCss}
                        InputProps={{
                          inputProps: { style: { borderRadius: 0 } },
                          style: { borderRadius: 0 },
                        }}
                      />
                    );
                  }
                })()}
              </FormGroup>
            ),
          },
          { title: "Platform Id", field: "externalorderId", type: "text",
          render: (rowData) => (
            <FormControlLabel
              onClick={() => {
                handleChangeCheckbox(rowData.internalorderId);
                              handleChangeRowClickCustome(rowData.internalorderId, rowData);
              }}
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
                    {rowData.externalorderId === null ? ' ' : rowData.externalorderId}
                  </Text>
                </Typography>
              }
            />
          ),
        },
        { title: "Order Date", field: "orderdate", type: "text",
        render: (rowData) => (
          <FormControlLabel
            onClick={() => {
              handleChangeCheckbox(rowData.internalorderId);
                            handleChangeRowClickCustome(rowData.internalorderId, rowData);
            }}
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
                  {moment(rowData.orderdate).format("MM/DD/YYYY")}
                </Text>
              </Typography>
            }
          />
        ),
      },
          // { title: 'Courier Id', field: 'courierid', type: 'text'},
          {
            title: "Order Id",
            field: "sellerorderid",
            type: "text",
            
            render: (rowData) => (
              <FormControlLabel
                onClick={() => {
                  handleChangeCheckbox(rowData.internalorderId);
                                handleChangeRowClickCustome(rowData.internalorderId, rowData);
                }}
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
                    <Link
                href="#"
                onClick={() => handleGetOrderDetails(rowData.internalorderId)}
                variant="body2"
              >
                {rowData.sellerorderid}{" "}
              </Link>
                  </Typography>
                }
              />
            ),
          },
          { title: "Source", field: "source", type: "text",
      render: (rowData) => (
        <FormControlLabel
          onClick={() => {
            handleChangeCheckbox(rowData.internalorderId);
                          handleChangeRowClickCustome(rowData.internalorderId, rowData);
          }}
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
                {rowData.source}
              </Text>
            </Typography>
          }
        />
      ),
    },
          {
            title: "Order Type",
            field: "ordertype",
            lookup: { 1: "Integration", 2: "Manual", 3: "Subscription Box" },
            render: (rowData) => (
              <FormControlLabel
                onClick={() => {
                  handleChangeCheckbox(rowData.internalorderId);
                              handleChangeRowClickCustome(rowData.internalorderId, rowData);
                }}
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
                      if (rowData.ordertype === 1) {
                        return (
                          <Text
                            style={{
                              fontSize: "11px",
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              transition: "all 0.25s",
                            }}
                          >
                            Integration
                          </Text>
                        );
                      }else if(rowData.ordertype === 2){
                        return (
                          <Text
                            style={{
                              fontSize: "11px",
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              transition: "all 0.25s",
                            }}
                          >
                            Manual
                          </Text>
                        );
                      }
                       else {
                        return (
                          <Text
                            style={{
                              fontSize: "11px",
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              transition: "all 0.25s",
                            }}
                          >
                            Subscription Box
                          </Text>
                        );
                      }
                    })()}
                  </Typography>
                }
              />
            ),
            //   lookup: orderTypeOptions ,
          },
          //    { title: 'Order Type', field: 'itemvaluecurrency',type: 'text'},
          { title: "Customer Name", field: "recipientname", type: "text",
      render: (rowData) => (
        <FormControlLabel
          onClick={() => {
            handleChangeCheckbox(rowData.internalorderId);
                          handleChangeRowClickCustome(rowData.internalorderId, rowData);
          }}
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
            {rowData.firstname} {rowData.lastname}{" "}
          </Text>
            </Typography>
          }
        />
      ),
    },
          {
            title: "Order Country",
            field: "ordercountry",
            type: "text",
            render: (rowData) => (
              <FormControlLabel
                onClick={() => {
                  handleChangeCheckbox(rowData.internalorderId);
                                handleChangeRowClickCustome(rowData.internalorderId, rowData);
                }}
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
                      {rowData.ordercountry}
                    </Text>
                  </Typography>
                }
              />
            ),
            //lookup: { 1: 'United States', 2: 'Canada' },
          },
          {
            title: "Warehouse",
            field: "warehouseid",
            lookup: { 1: "US Warehouse", 2: "Canada Warehouse" },
            render: (rowData) => (
              <FormControlLabel
                onClick={() => {
                  handleChangeCheckbox(rowData.internalorderId);
                              handleChangeRowClickCustome(rowData.internalorderId, rowData);
                }}
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
                      if (rowData.warehouseid === 1) {
                        return (
                          <Text
                            style={{
                              fontSize: "11px",
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              transition: "all 0.25s",
                            }}
                          >
                            US Warehouse
                          </Text>
                        );
                      }
                       else {
                        return (
                          <Text
                            style={{
                              fontSize: "11px",
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              transition: "all 0.25s",
                            }}
                          >
                            Canada Warehouse
                          </Text>
                        );
                      }
                    })()}
                  </Typography>
                }
              />
            ),
          },
    
          {
            title: "Customer Type",
            field: "customertype",
            lookup: { 1: "Residential", 2: "Business" },
            render: (rowData) => (
              <FormControlLabel
                onClick={() => {
                  handleChangeCheckbox(rowData.internalorderId);
                              handleChangeRowClickCustome(rowData.internalorderId, rowData);
                }}
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
                      if (rowData.customertype === 1) {
                        return (
                          <Text
                            style={{
                              fontSize: "11px",
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              transition: "all 0.25s",
                            }}
                          >
                            Residential
                          </Text>
                        );
                      }
                       else {
                        return (
                          <Text
                            style={{
                              fontSize: "11px",
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              transition: "all 0.25s",
                            }}
                          >
                            Business
                          </Text>
                        );
                      }
                    })()}
                  </Typography>
                }
              />
            ),
            //  lookup: orderCustomerOptions ,
          },

          {
            title: "Order Status",
            field: "orderstatus",

            render: (rowData) => (
              <Text>
                {(() => {
                  if (rowData.orderstatus === 5) {
                    return (
                      <ColorButtonInTransit
                        size="large"
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          handleClickOpendelete(
                            rowData.internalorderId,
                            rowData
                          );
                        }}
                      >
                        {" "}
                        In Transit{" "}
                      </ColorButtonInTransit>
                    );
                  } else if (rowData.orderstatus === 3) {
                    return (
                      <ColorButtonProcessed
                        size="large"
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          handleClickOpendelete(
                            rowData.internalorderId,
                            rowData
                          );
                        }}
                      >
                        {" "}
                        Processing{" "}
                      </ColorButtonProcessed>
                    );
                  } else if (rowData.orderstatus === 6) {
                    return (
                      <ColorButtonInDeliverd
                        size="large"
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          handleClickOpendelete(
                            rowData.internalorderId,
                            rowData
                          );
                        }}
                      >
                        {" "}
                        Delivered{" "}
                      </ColorButtonInDeliverd>
                    );
                  } else if (rowData.orderstatus === 4) {
                    return (
                      <ColorButtonShipped
                        size="large"
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          handleClickOpendelete(
                            rowData.internalorderId,
                            rowData
                          );
                        }}
                      >
                        {" "}
                        Shipped{" "}
                      </ColorButtonShipped>
                    );
                  } else if (rowData.orderstatus === 7) {
                    return (
                      <ColorButtonOnHold
                        size="large"
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          handleClickOpendelete(
                            rowData.internalorderId,
                            rowData
                          );
                        }}
                      >
                        {" "}
                        On Hold
                      </ColorButtonOnHold>
                    );
                  } else if (rowData.orderstatus === 8) {
                    return (
                      <ColorButtonOnHold
                        size="large"
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          handleClickOpendelete(
                            rowData.internalorderId,
                            rowData
                          );
                        }}
                      >
                        {" "}
                        On Hold
                      </ColorButtonOnHold>
                    );
                  } else if (rowData.orderstatus === 9) {
                    return (
                      <ColorButtonCancel
                        size="large"
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          handleClickOpendelete(
                            rowData.internalorderId,
                            rowData
                          );
                        }}
                      >
                        {" "}
                        Cancelled{" "}
                      </ColorButtonCancel>
                    );
                  } else {
                    return (
                      <ColorButtonNew
                        size="large"
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          handleClickOpendelete(
                            rowData.internalorderId,
                            rowData
                          );
                        }}
                      >
                        {" "}
                        New Order{" "}
                      </ColorButtonNew>
                    );
                  }
                })()}
              </Text>
            ),
            lookup: orderStatusOptions,
          },
          {
            title: "Track Order",
            field: "trackingurl",

            render: (rowData) => (
              <Text>
                <ColorButtonProcessed
                  size="large"
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    if (rowData.orderstatus === 4) {
                      handleClickTrack(rowData.internalorderId, rowData);
                    }
                  }}
                >
                  {" "}
                  Track{" "}
                </ColorButtonProcessed>
              </Text>
            ),
          },
          { title: "Shipping Courier", field: "shippingpolicy", type: "text",
        
          render: (rowData) => (
            <FormControlLabel
              onClick={() => {
                handleChangeCheckbox(rowData.internalorderId);
                              handleChangeRowClickCustome(rowData.internalorderId, rowData);
              }}
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
                    {rowData.shippingpolicy === null ? '  ' : rowData.shippingpolicy}
                  </Text>
                </Typography>
              }
            />
          ),},
          { title: "Tracking #", field: "tracking", type: "text",
          render: (rowData) => (
            <FormControlLabel
              onClick={() => {
                handleChangeCheckbox(rowData.internalorderId);
                              handleChangeRowClickCustome(rowData.internalorderId, rowData);
              }}
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
                    {rowData.tracking === "" ? '  ' : rowData.tracking}
                  </Text>
                </Typography>
              }
            />
          ),
        },
          {
            title: "Shipping Service",
            field: "shipmenttype",
            type: "text",

            render: (rowData) => (
              <FormControlLabel
              onClick={() => {
                handleChangeCheckbox(rowData.internalorderId);
                              handleChangeRowClickCustome(rowData.internalorderId, rowData);
              }}
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
              <Text>
                {(() => {
                  if (rowData.shipmenttype === "10") {
                    return (
                      <Text
                        style={{
                          fontSize: "11px",
                          fontFamily:
                            '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                          transition: "all 0.25s",
                        }}
                      >
                        Custom Shipping Label
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
                        2-Day Shipping
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
                        Overnight Shipping
                      </Text>
                    );
                  } else if (rowData.shipmenttype === "4") {
                    return (
                      <Text
                        style={{
                          fontSize: "11px",
                          fontFamily:
                            '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                          transition: "all 0.25s",
                        }}
                      >
                        Stamped Postage
                      </Text>
                    );
                  } else if (rowData.shipmenttype === "5") {
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
                  } else if (rowData.shipmenttype === "6") {
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
                  }else if (rowData.shipmenttype === "1") {
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
              }else{
                return (
                  <Text
                    style={{
                      fontSize: "11px",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                      transition: "all 0.25s",
                    }}
                  >
                   {' '}
                  </Text>
                );
              }
                })()}
              </Text>
              </Typography>
              }
            />
            ),
          },

          { title: "Ship Date", field: "shipdate", type: "date" },
        ],
      });
    }
  };

  const handleClickOpendelete1 = () => {
    setOpenDelete(true);

    // setRowStatus(rowData.orderstatus);
    //    console.log("rowid",rowid);
  };
  const handleClickOpendelete = (rowid, rowData) => {
    setOpenDelete(true);
    setCardid(rowid);
    setRowData(rowData);
    setRowStatus(rowData.orderstatus);
    console.log("rowid", rowid);
  };
  const handleDeleteCancle = () => {
    setOpenDelete(false);
    setOpenOnHoldOrder(false);
    setopenTrackingURL(false);
    setOpenCancelOrderSet(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const showToast = (open, msg, type) => {
    return (
      <Toast open={open} handleClose={handleClose} type={type} msg={msg} />
    );
  };
  const handleRelease = (isSprintCreate) => {
    if (isSprintCreate === 6) {
      setOpenDelete(false);
      setOpenOnHoldOrder(true);
    } else if (isSprintCreate === 7) {
      setOpenDelete(false);
      setOpenCancelOrderSet(true);
    } else if (isSprintCreate === "Edit") {
      setOpenDelete(false);
      handleGetShipmentId(rowDataForOrder);
    } else if (isSprintCreate === "Delete") {
      setOpenDelete(false);
      deleteCreatedOrder(cardid);
    } else {
      setOpenConfirmationRelease(true);
      setOpenDelete(false);
    }
  };

  const handleGetOrderDetails = (shipmentId) => {
    props.getOrerDetails(shipmentId);
  };
  //const column1FilterList = state.column1FilterList;
  React.useEffect(() => {
    setOpenChekced(false);
    AsyncStorage.multiGet(["ProductSelectAllTabAll"]).then((data) => {
      if (data[0][1] != null) {
        ProductSelect = JSON.parse(data[0][1]);
        console.log("Orderselect", ProductSelect);
        if (ProductSelect.length > 0) {
          setOpenChekced(!openChecked);
          ProductSelect.forEach((item) => {
            ids.push(item);
          });
        }
      }
    });
    fetchOrderList();
    fetchOrderListWithAdminCheck();
  }, []);

  const fetchOrderList = () => {
    //const userid=5;
    setLoading(true);
    shiphypeservice
      .fetchOrderList(userid, orderStatusId)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          // 0001-01-01T00:00:00
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].shipdate === "0001-01-01T00:00:00") {
              response.data[i].shipdate = "";
            } else if (response.data[i].orderstatus === 1) {
              response.data[i].shipdate = "";
            }
            if (response.data[i].externalorderId === 0) {
              response.data[i].externalorderId = "";
            }
          }
          setOrderList(response.data);
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

  useEffect(() => {
    // fetchOderType();
  }, []);

  const updataExistsOrder = (
    orderId,
    orderNo,
    source,
    orderType,
    name,
    country,
    tracking,
    couier,
    orderStatus,
    customerType,
    orderDate1,
    shipDate1
  ) => {
    //  const orderDate1=  format(orderDate, "yyyy-MM-dd hh:mm:ss");
    //const shipDate1=  format(shipDate, "yyyy-MM-dd hh:mm:ss");
    shiphypeservice
      .updateOrder(
        orderId,
        orderNo,
        source,
        orderType,
        name,
        country,
        tracking,
        couier,
        orderStatus,
        customerType,
        orderDate1,
        shipDate1,
        userid
      )
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);

          fetchOrderList();
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addNewOrder = (
    orderNo,
    source,
    orderType,
    name,
    country,
    tracking,
    couier,
    orderStatus,
    customerType,
    orderDate,
    shipDate
  ) => {
    const orderDate1 = format(orderDate, "yyyy-MM-dd hh:mm:ss");
    const shipDate1 = format(shipDate, "yyyy-MM-dd hh:mm:ss");
    shiphypeservice
      .addOrder(
        orderNo,
        source,
        orderType,
        name,
        country,
        tracking,
        couier,
        orderStatus,
        customerType,
        orderDate1,
        shipDate1,
        userid
      )
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);

          fetchOrderList();
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteCreatedOrder = (order_id) => {
    setLoading(true);
    let orderiddata = [];
    orderiddata.push(order_id);
    shiphypeservice
      .deleteOrder(orderiddata)
      .then((response) => {
        if (response.status === true) {
          setLoading(false);
          fetchOrderList();
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  let changedWarehouseid1 = [];
  const handleConfirmHoldOrder = (tracking, edit, reaionID) => {
    const rowDataOr = rowDataForOrder;
    if (cardid === 0) {
      changedWarehouseid1 = changedWarehouseid;
    } else {
      changedWarehouseid1.push(cardid);
    }
    if (edit === 0) {
      shiphypeservice
        .AddOrderReson(changedWarehouseid1, tracking, 7, rowDataOr.userId)
        .then((response) => {
          console.log("status", response.status);
          if (response.status === true) {
            handleConfirmOnHoldStatus();
          } else {
            handleConfirmOnHoldStatus();
            console.log("message", response.message);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      //changedWarehouseid
      shiphypeservice
        .UpdateOrderReson(
          changedWarehouseid1,
          tracking,
          7,
          rowDataOr.userId,
          reaionID
        )
        .then((response) => {
          console.log("status", response.status);
          if (response.status === true) {
            handleConfirmOnHoldStatus();
          } else {
            handleConfirmOnHoldStatus();
            console.log("message", response.message);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }

    const handleConfirmOnHoldStatus = () => {
      const isDelete = 7;
      //changedWarehouseid
      shiphypeservice
        .updateOrderStatus(changedWarehouseid1, isDelete)
        .then((response) => {
          console.log("status", response.status);
          if (response.status === true) {
            setOpen(true);
            setType("success");
            setMsg(response.message);
            setStatus(response.status);
            setLoading(false);
            setOpenOnHoldOrder(false);
            var fruits = [];

            window.sessionStorage.setItem("dataItem", JSON.stringify(fruits));
            fetchOrderList();
          } else {
            setOpen(true);
            setType("success");
            setMsg(response.message);
            setStatus(response.status);
            setLoading(false);
            setOpenOnHoldOrder(false);
            console.log("message", response.message);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
    // const isDelete=4;
  };

  const handleConfirmCancelSet = (tracking, edit) => {
    const rowDataOr = rowDataForOrder;
    if (cardid === 0) {
      changedWarehouseid1 = changedWarehouseid;
    } else {
      changedWarehouseid1.push(cardid);
    }
    if (edit === 0) {
      //changedWarehouseid
      shiphypeservice
        .AddOrderReson(changedWarehouseid1, tracking, 7, rowDataOr.userId)
        .then((response) => {
          console.log("status", response.status);
          if (response.status === true) {
            handleConfirmCancelStatus();
          } else {
            handleConfirmCancelStatus();
            console.log("message", response.message);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      //changedWarehouseid
      shiphypeservice
        .UpdateOrderReson(changedWarehouseid1, tracking, 7, rowDataOr.userId)
        .then((response) => {
          console.log("status", response.status);
          if (response.status === true) {
            handleConfirmCancelStatus();
          } else {
            handleConfirmCancelStatus();
            console.log("message", response.message);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  const handleConfirmCancelStatus = () => {
    if (cardid === 0) {
      changedWarehouseid1 = changedWarehouseid;
    } else {
      changedWarehouseid1.push(cardid);
    }
    const isDelete = 9;
    //changedWarehouseid
    shiphypeservice
      .updateOrderStatus(changedWarehouseid1, isDelete)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setOpen(true);
          setType("success");
          setMsg(response.message);
          setStatus(response.status);
          setLoading(false);
          setOpenCancelOrderSet(false);
          var fruits = [];

          window.sessionStorage.setItem("dataItem", JSON.stringify(fruits));
          fetchOrderList();
        } else {
          setOpen(true);
          setType("success");
          setMsg(response.message);
          setStatus(response.status);
          setLoading(false);
          setOpenCancelOrderSet(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  var flag1 = false;

  const handleChangeCheckbox = (data) => {
    setOpenChekced(true);
    if (ids.length === 0) {
      ids.push(data);
      AsyncStorage.setItem(
        "ProductSelectAllTabAll",
        JSON.stringify(ids)
      );
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
        AsyncStorage.setItem(
          "ProductSelectAllTabAll",
          JSON.stringify(ids)
        );
      } else {
        const index = ids.indexOf(data);
        if (index > -1) {
          ids.splice(index, 1);
          if (ids.length === 0) {
            setOpenChekced(false);
            AsyncStorage.removeItem("ProductSelectAllTabAll");
          }else{
            AsyncStorage.setItem(
              "ProductSelectAllTabAll",
              JSON.stringify(ids)
            );
          }
        }
       
      }
    }
   
    const updatedaray = [...ids];

    setchangedWarehouseid(updatedaray);
    setCardid(0);
   
  };
  var flag = false;

  const handleChangeRowClickCustome = (data, rowdata) => {
    //setOpenChekced(true);
    var Values = [];

    //get olds values
    Values = JSON.parse(window.sessionStorage.getItem("dataItem"));

    

    if (Values.length === 0) {
      Values.push(data);
    } else {
      for (let i = 0; i < Values.length; i++) {
        if (data !== Values[i]) {
          //ids.push(data);
          flag = true;
        } else {
          flag = false;
          break;
        }
      }
      if (flag === true) {
        Values.push(data);
      } else {
        const index = Values.indexOf(data);
        if (index > -1) {
          Values.splice(index, 1);
          if (Values.length === 0) {
            //  setOpenChekced(false);
          } else {
          }
        }
      }
    }
    console.log("arraylenghtafter", ids.length);
    window.sessionStorage.setItem("dataItem", JSON.stringify(Values));

    const updatedaray = [...Values];

    //push new value
    //  Values.push(data);

    //saved values

    setchangedWarehouseid(updatedaray);
  };

  return (
    <View>
      <Grid justify="center">
        <ProgressBar loading={loading} />
      </Grid>
      <Grid>
        {" "}
        {openDelete === false ? (
          " "
        ) : (
          <DeleteCard
            rowStatus={rowStatus}
            userid={userid}
            openDeleteCard={openDelete}
            handleRelease={handleRelease}
            handleDeleteCancle={handleDeleteCancle}
          />
        )}
        {openOnHoldOrder === false ? (
          " "
        ) : (
          <OnHoldOrder
            userid={userid}
            openOnHoldOrder={openOnHoldOrder}
            // orderId={cardid}
            rowStatus={rowStatus}
            handleConfirmHold={handleConfirmHoldOrder}
            handleDeleteCancle={handleDeleteCancle}
          />
        )}
        {openCancelOrderSet === false ? (
          " "
        ) : (
          <OnCanceled
            userid={userid}
            // orderId={cardid}
            rowStatus={rowStatus}
            openCancelOrderSet={openCancelOrderSet}
            handleConfirmHold={handleConfirmCancelSet}
            handleDeleteCancle={handleDeleteCancle}
          />
        )}
        {openTrackingURL === false ? (
          " "
        ) : (
          <TrackingURLNotExits
            rowStatus={rowStatus}
            userid={userid}
            openDeleteCard={openTrackingURL}
            handleDeleteCancle={handleDeleteCancle}
          />
        )}
      </Grid>
      <View>
          {openChecked === true ? 
      <MaterialTable
        style={{ padding: "0px" }}
        //  title="."
        columns={state.columns}
        data={orderList}
        icons={tableIcons}
        components={{
          Container: (props) => <Paper {...props} elevation={0} />,
          Toolbar: (props) => <StyledMTableToolbar {...props} />,
        }}
        localization={{
          toolbar: {
            searchPlaceholder: "Search Orders",
          },
          header: {
            actions: "ACTION",
          },
        }}
        options={{
          paging: true,
          showTitle: false,
          maxBodyHeight: "55vh",
          doubleHorizontalScroll: true,
          headerStyle: { position: "sticky", top: 0 },
          pageSize: 20,
          pageSizeOptions: [10, 20, 30, 40, 50],
          addRowPosition: "first",
          actionsColumnIndex: -1,
          exportFileName: "Product Table",
          headerStyle: {
            backgroundColor: "#cccccc",
            color: "#000",

            textTransform: "uppercase",
            width: 20,
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

            width: 20,
            whiteSpace: "nowrap",
            textAlign: "left",
            flexDirection: "row",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontSize: "11px",
            paddingLeft: 5,
            paddingTop: 5,
            paddingBottom: 5,
            paddingRight: 5,
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
          selection: false,
          showTextRowsSelected: false,
          showSelectAllCheckbox: false,
          selectionProps: (rowData) => ({
            // checked: rowData.customproductId === changedWarehouseid,
            color: "primary",
          }),
        }}
        actions={[
          {
            tooltip: "Remove All Selected Users",
            icon: () => (
              <ColorButtonAdd
                size="large"
                variant="contained"
                color="primary"
                //startIcon={<AddIcon />}
              >
                Update Selected Order Status
              </ColorButtonAdd>
            ),
            isFreeAction: true,
            onClick: (event, rowData) => {
              handleClickOpendelete1();
            },
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
            onClick: (event) => fetchOrderList(),
          },
          // {
          //   icon: () => <RefreshIcon style={{ backgroundColor:'#33cc00',color:'#fff',borderRadius : '3px',margin:'3px',}}/>,
          //   tooltip: 'Refresh',
          //   isFreeAction: true,
          //   onClick: (event) => fetchOrderList()
          // }
        ]}
        onSelectionChange={(rows) => {
          //handleChangeCheckbox(rows);
        }}
        // onRowClick={(event, rowData) => {
        //   console.log("rowclick", rowData);
         
        //   handleChangeRowClickCustome(rowData.internalorderId, rowData);
        //   setStateproduct1((prevState) => {
        //     let data1 = [...prevState.data];
        //     let index = data1.indexOf(rowData);
        //     data1[index].tableData.checked = !data1[index].tableData.checked;

        //     return { ...prevState, data1 };
        //   });
        // }}
      />

      :  <MaterialTable
        style={{ padding: "0px" }}
        //  title="."
        columns={state.columns}
        data={orderList}
        icons={tableIcons}
        components={{
          Container: (props) => <Paper {...props} elevation={0} />,
          Toolbar: (props) => <StyledMTableToolbar {...props} />,
        }}
        localization={{
          toolbar: {
            searchPlaceholder: "Search Orders",
          },
          header: {
            actions: "ACTION",
          },
        }}
        options={{
          paging: true,
          showTitle: false,
          maxBodyHeight: "55vh",
          doubleHorizontalScroll: true,
          headerStyle: { position: "sticky", top: 0 },
          pageSize: 20,
          pageSizeOptions: [10, 20, 30, 40, 50],
          addRowPosition: "first",
          actionsColumnIndex: -1,
          exportFileName: "Product Table",
          headerStyle: {
            backgroundColor: "#cccccc",
            color: "#000",

            textTransform: "uppercase",
            width: 20,
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

            width: 20,
            whiteSpace: "nowrap",
            textAlign: "left",
            flexDirection: "row",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontSize: "11px",
            paddingLeft: 5,
            paddingTop: 5,
            paddingBottom: 5,
            paddingRight: 5,
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
          selection: false,
          showTextRowsSelected: false,
          showSelectAllCheckbox: false,
          selectionProps: (rowData) => ({
            // checked: rowData.customproductId === changedWarehouseid,
            color: "primary",
          }),
        }}
        actions={[
          
          {
            icon: () => (
              <ColorButtonRefresh
                size="large"
                variant="contained"
                color="primary"
                backgroundColor="red"
                startIcon={<RefreshIcon />}
              >
                Refresh
              </ColorButtonRefresh>
            ),
            //tooltip: "Refresh",
            isFreeAction: true,
            onClick: (event) => fetchOrderList(),
          },
          // {
          //   icon: () => <RefreshIcon style={{ backgroundColor:'#33cc00',color:'#fff',borderRadius : '3px',margin:'3px',}}/>,
          //   tooltip: 'Refresh',
          //   isFreeAction: true,
          //   onClick: (event) => fetchOrderList()
          // }
        ]}
        onSelectionChange={(rows) => {
          //handleChangeCheckbox(rows);
        }}
        // onRowClick={(event, rowData) => {
        //   console.log("rowclick", rowData);
         
        //   handleChangeRowClickCustome(rowData.internalorderId, rowData);
        //   setStateproduct1((prevState) => {
        //     let data1 = [...prevState.data];
        //     let index = data1.indexOf(rowData);
        //     data1[index].tableData.checked = !data1[index].tableData.checked;

        //     return { ...prevState, data1 };
        //   });
        // }}
      /> }</View>
      {showToast(open, msg, type)}
    </View>
  );
}
