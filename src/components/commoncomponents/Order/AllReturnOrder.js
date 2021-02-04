import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  fade,
  withStyles,
  makeStyles,
  useTheme,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";

import Button from "@material-ui/core/Button";
import { Platform, View, Image, Text, Dimensions } from "react-native";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import popUpStyle from ".././style/popUpStyle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import * as shiphypeservice from ".././ShipService/shiphype_service";
import MaterialTable, { MTableToolbar } from "material-table";

import Toast from ".././feedback/Toast";
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
import Grid from "@material-ui/core/Grid";
import RefreshIcon from "@material-ui/icons/Refresh";

import { format } from "date-fns";
import ProgressBar from ".././feedback/ProgressBar";
import { forwardRef } from "react";

import OnHoldOrder from "./OnHoldOrder";
import OnCanceled from "./OnCanceled";
import ReplyToReturnOrder from "./ReplyToReturnOrder";

import DeleteCard from "./ShowStatusOrderForSeller";
import AsyncStorage from "@react-native-community/async-storage";
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
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  RefreshIcon: forwardRef((props, ref) => (
    <RefreshIcon {...props} ref={ref} color="action" />
  )),
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

const StyledMTableToolbar = withStyles({
  root: {
    paddingLeft: 0,
    paddingRight: 0,
  },
})(MTableToolbar);

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
    underline: {
      "&&&:before": {
        borderBottom: "none",
      },
      "&&:after": {
        borderBottom: "none",
      },
    },
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
// const ColorButtonOnHold = withStyles(theme => ({
//   root: {
//     color: '#fff',
//     borderRadius :'3px',
//     //  paddingTop: '9%',
//     //  paddingBottom: '9%',
//     height:'75%',
//     width:'100px',
//      fontSize:'11px',
//      fontWeight: '550',
//      color:'#fff',
//      backgroundColor:'#990000',
//      '&:hover': {
//       backgroundColor: '#990000',

//     },

//   },
// }))(Button);
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
  const [value, setValue] = React.useState(0);
  const orderStatusOptions = props.orderStatusOptions;
  const sellerid = props.sellerid;
  let orderStatusId = props.orderStatus;
  const orderTypeOptions = props.orderTypeOptions;
  const orderCouierOptions = props.orderCouierOptions;
  const orderCustomerOptions = props.orderCustomerOptions;
  const [packingdata, setPackingdata] = React.useState([]);
  const [orderType, setOrderType] = React.useState([]);
  const [orderStatus, setOrderStatus] = React.useState([]);
  const [orderList, setOrderList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [dataproduct, setDataProduct] = React.useState([]);
  const userid = props.userid;
  const userRoleId = props.userRoleId;
  const [openChecked, setOpenChekced] = React.useState(false);
  const [selectproduct, setSelectproduct] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [type, setType] = React.useState("");
  const [openDelete, setOpenDelete] = React.useState(false);
  const [cardid, setCardid] = React.useState(0);
  const [cardid1, setCardid1] = React.useState([]);
  const [rowDataForOrder, setRowData] = React.useState([]);
  const [rowStatus, setRowStatus] = React.useState(0);

  const [openOnHoldOrder, setOpenOnHoldOrder] = React.useState(false);
  const [changedWarehouseid, setchangedWarehouseid] = React.useState([]);
  const [openCancelOrderSet, setOpenCancelOrderSet] = React.useState(false);
  const [orderid, setOrderid] = React.useState(0);
  const [openReply, setOpenReply] = React.useState(false);
  const handleGetShipmentId = (rowdata) => {
    props.getShipmentIdFromOrder(rowdata);
  };

  const openOrderdetailsforSeller = (shipmentId) => {
    if (userid !== 1) {
      AsyncStorage.setItem("SelectOrderForReturn", JSON.stringify(shipmentId));
      props.openSellerRetunrOrderDetails();
    }
  };
  var ids = [];

  const theme = useTheme();

  const [state, setState] = React.useState({
    column1FilterList: {},
    column2FilterList: {},
    selectproduct: false,
    columns: [
      // { title: 'ShipHype Id', field: 'internalorderId',type: 'text',
      // //   render: rowData => <Link href="#" onClick={() => handleGetShipmentId(rowData)} variant="body2">
      // //    {rowData.internalorderId} </Link>
      // },

      {
        title: "Return Id",
        field: "internalorderId",
        type: "text",
        render: (rowData) => (
          <Link
            href="#"
            onClick={() => openOrderdetailsforSeller(rowData.internalorderId)}
            variant="body2"
          >
            {rowData.internalorderId}{" "}
          </Link>
        ),
      },
      {
        title: "Return Date",
        field: "recievedate",
        type: "date",
        
      },
      // render: rowData =><FormControlLabel

      // // onClick={()=>{handleChangeCheckbox(rowData.internalorderId)}}
      // className={classes.quantitycss}
      // control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
      // fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

      // <Text style={{ fontSize: '11px',
      // fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
      // transition : 'all 0.25s',}}>{rowData.externalorderId}</Text>

      // </Typography>}
      // />

      {
        title: "From Name",
        field: "fromname",
        type: "text",
        render: (rowData) => (
          <FormControlLabel
            // onClick={()=>{handleChangeCheckbox(rowData.internalorderId)}}
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
                  {rowData.fromname}
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
            // onClick={()=>{handleChangeCheckbox(rowData.internalorderId)}}
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
        title: "Status",
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
                      //handleClickOpendelete(rowData.internalorderId, rowData);
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
                    NEW RETURN{" "}
                  </ColorButtonNew>
                );
              }
            })()}
          </Text>
        ),
        lookup: orderStatusOptions,
      },
      { title: "Shipping Courier", field: "carriertitle", type: "text" },
      { title: "Tracking #", field: "tracking", type: "text" },

      // { title: 'Order Status', field: 'itemvaluecurrency',type: 'text'},
     
      { title: "Return Condition", field: "returncondition", type: "text" },
      { title: "Comment", field: "comments", type: "text" },
    ],
    // data: [
    //   { name: 'Mehmet', surname: 'Baran', birthYear: 1987,shipping:2, birthCity: 63 },
    //   {
    //     name: 'Zerya Betül',
    //     surname: 'Baran',
    //     birthYear: 2017,
    //     birthCity: 34,
    //     shipping:2,
    //   },
    // ],
  });

  //const column1FilterList = state.column1FilterList;
  React.useEffect(() => {
    //   fetchOderType();
    if (sellerid === 0) {
      fetchOrderList(userid);
    } else {
      fetchOrderList(sellerid);
    }
  }, []);
  const handleClickOpendelete1 = () => {
    setOpenDelete(true);

    // setRowStatus(rowData.orderstatus);
    //    console.log("rowid",rowid);
  };
  const handleClickOpendelete = (rowid, rowData) => {
    setOrderid(rowData);
    console.log("orderrow", rowData);
    setOpenReply(true);
  };

  const handleDeleteCancle = () => {
    setOrderid(0);
    setOpenReply(false);
    if (sellerid === 0) {
      fetchOrderList(userid);
    } else {
      fetchOrderList(sellerid);
    }
  };

  const handleRelease = (isSprintCreate) => {
    if (isSprintCreate === 6) {
      setOpenDelete(false);
      setOpenOnHoldOrder(true);
    } else if (isSprintCreate === 7) {
      setOpenDelete(false);
      setOpenCancelOrderSet(true);
    } else {
      setOpenConfirmationRelease(true);
      setOpenDelete(false);
    }
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
            //handleChangeCheckbox5();
            if (sellerid === 0) {
              fetchOrderList(userid);
            } else {
              fetchOrderList(sellerid);
            }
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

  const fetchRefersh = () => {
    if (sellerid === 0) {
      fetchOrderList(userid);
    } else {
      fetchOrderList(sellerid);
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
          //   handleChangeCheckbox5();
          if (sellerid === 0) {
            fetchOrderList(userid);
          } else {
            fetchOrderList(sellerid);
          }
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

  var flag = false;
  const handleChangeCheckbox = (data) => {
    setOpenChekced(true);
    console.log("selectidrun");
    console.log("selectid", data);
    console.log("arraylenght", ids.length);
    // setCheckedA(false);
    if (ids.length === 0) {
      ids.push(data);
    } else {
      for (let i = 0; i < ids.length; i++) {
        if (data !== ids[i]) {
          //ids.push(data);
          flag = true;
        } else {
          flag = false;
          break;
        }
      }
      if (flag === true) {
        ids.push(data);
      } else {
        const index = ids.indexOf(data);
        if (index > -1) {
          ids.splice(index, 1);
          if (ids.length === 0) {
            setOpenChekced(false);
          }
        }
      }
    }
    console.log("arraylenghtafter", ids.length);
    const updatedaray = [...ids];

    setchangedWarehouseid(updatedaray);
    setCardid(0);

    setState({
      columns: [
        {
          title: "Checkbox",
          render: (rowData) => (
            <FormGroup>
              {(() => {
                if (rowData !== undefined) {
                  return (
                    <FormControlLabel
                      style={popUpStyle.checkboxPosition}
                      control={
                        <Checkbox
                          id={rowData.internalorderId}
                          checked={(() => {
                            for (let i = 0; i < ids.length; i++) {
                              if (
                                rowData.internalorderId === parseInt(ids[i])
                              ) {
                                return true;
                              }
                            }
                          })()}
                          onChange={() => {
                            handleChangeCheckbox(rowData.internalorderId);
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
            <Link
              href="#"
              onClick={() => handleGetShipmentId(rowData)}
              variant="body2"
            >
              {rowData.internalorderId}{" "}
            </Link>
          ),
        },

        {
          title: "Order Id",
          field: "externalorderId",
          type: "text",
          render: (rowData) => (
            <FormControlLabel
              onClick={() => {
                handleChangeCheckbox(rowData.internalorderId);
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
                    {rowData.externalorderId}
                  </Text>
                </Typography>
              }
            />
          ),
        },
        {
          title: "Order Date",
          field: "orderdate",
          type: "date",
          render: (rowData) => (
            <FormControlLabel
              onClick={() => {
                handleChangeCheckbox(rowData.internalorderId);
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
                    {rowData.orderdate}
                  </Text>
                </Typography>
              }
            />
          ),
        },
        {
          title: "Source",
          field: "source",
          type: "text",
          render: (rowData) => (
            <FormControlLabel
              onClick={() => {
                handleChangeCheckbox(rowData.internalorderId);
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
          //lookup: { 1: 'Integration', 2: 'Letter' },

          lookup: orderTypeOptions,
          render: (rowData) => (
            <FormControlLabel
              onClick={() => {
                handleChangeCheckbox(rowData.internalorderId);
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
                    } else if (rowData.ordertype === 2) {
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
        //    { title: 'Order Type', field: 'itemvaluecurrency',type: 'text'},
        {
          title: "Recipient Name",
          field: "recipientname",
          type: "text",
          render: (rowData) => (
            <FormControlLabel
              onClick={() => {
                handleChangeCheckbox(rowData.internalorderId);
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
                    {rowData.recipientname}
                  </Text>
                </Typography>
              }
            />
          ),
        },
        {
          title: "Order Country",
          field: "ordercountry",
          lookup: { 1: "United States", 2: "Canada" },
          render: (rowData) => (
            <FormControlLabel
              onClick={() => {
                handleChangeCheckbox(rowData.internalorderId);
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
                    if (rowData.ordercountry === 1) {
                      return (
                        <Text
                          style={{
                            fontSize: "11px",
                            fontFamily:
                              '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                            transition: "all 0.25s",
                          }}
                        >
                          United States
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
                          Canada
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
          title: "Warehouse",
          field: "warehouseid",
          lookup: { 1: "US Warehouse", 2: "Canada Warehouse" },
          render: (rowData) => (
            <FormControlLabel
              onClick={() => {
                handleChangeCheckbox(rowData.internalorderId);
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
          //lookup: { 1: 'Corrugated Box', 2: 'Letter' },

          lookup: { 1: "Business", 2: "Residential" },
          render: (rowData) => (
            <FormControlLabel
              onClick={() => {
                handleChangeCheckbox(rowData.internalorderId);
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
                          Business
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
                          Residential
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
                       // handleClickOpendelete(rowData.internalorderId, rowData);
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
                      NEW RETURN{" "}
                    </ColorButtonNew>
                  );
                }
              })()}
            </Text>
          ),
          lookup: orderStatusOptions,
        },
        { title: "Shipping Courier", field: "shippingpolicy", type: "text" },
        { title: "Tracking #", field: "tracking", type: "text" },
        {
          title: "Shipping Service",
          field: "shipmenttype",
          type: "text",

          render: (rowData) => (
            <Text>
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
                      Standard Shipping
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
                }
              })()}
            </Text>
          ),
        },
        // { title: 'Order Status', field: 'itemvaluecurrency',type: 'text'},
       
        {
          title: "Ship Date",
          field: "shipdate",
          type: "date",
          render: (rowData) => (
            <FormControlLabel
              onClick={() => {
                handleChangeCheckbox(rowData.internalorderId);
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
                    {rowData.shipdate}
                  </Text>
                </Typography>
              }
            />
          ),
        },
      ],
    });
  };

  const handleChangeCheckbox5 = () => {
    setOpenChekced(false);
    var ids9 = [];

    //console.log("arraylenghtafter",ids.length);
    const updatedaray = [...ids9];

    setchangedWarehouseid(updatedaray);
    setCardid(0);

    setState({
      columns: [
        {
          title: "Checkbox",
          render: (rowData) => (
            <FormGroup>
              {(() => {
                if (rowData !== undefined) {
                  return (
                    <FormControlLabel
                      style={popUpStyle.checkboxPosition}
                      control={
                        <Checkbox
                          id={rowData.internalorderId}
                          checked={(() => {
                            for (let i = 0; i < ids9.length; i++) {
                              if (
                                rowData.internalorderId === parseInt(ids9[i])
                              ) {
                                return true;
                              }
                            }
                          })()}
                          onChange={() => {
                            handleChangeCheckbox(rowData.internalorderId);
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
            <Link
              href="#"
              onClick={() => handleGetShipmentId(rowData)}
              variant="body2"
            >
              {rowData.internalorderId}{" "}
            </Link>
          ),
        },

        {
          title: "Order Id",
          field: "externalorderId",
          type: "text",
          render: (rowData) => (
            <FormControlLabel
              onClick={() => {
                handleChangeCheckbox(rowData.internalorderId);
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
                    {rowData.externalorderId}
                  </Text>
                </Typography>
              }
            />
          ),
        },
        {
          title: "Source",
          field: "source",
          type: "text",
          render: (rowData) => (
            <FormControlLabel
              onClick={() => {
                handleChangeCheckbox(rowData.internalorderId);
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
          //lookup: { 1: 'Integration', 2: 'Letter' },

          lookup: orderTypeOptions,
          render: (rowData) => (
            <FormControlLabel
              onClick={() => {
                handleChangeCheckbox(rowData.internalorderId);
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
                    } else if (rowData.ordertype === 2) {
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
        //    { title: 'Order Type', field: 'itemvaluecurrency',type: 'text'},
        {
          title: "Recipient Name",
          field: "recipientname",
          type: "text",
          render: (rowData) => (
            <FormControlLabel
              onClick={() => {
                handleChangeCheckbox(rowData.internalorderId);
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
                    {rowData.recipientname}
                  </Text>
                </Typography>
              }
            />
          ),
        },
        {
          title: "Order Country",
          field: "ordercountry",
          lookup: { 1: "United States", 2: "Canada" },
          render: (rowData) => (
            <FormControlLabel
              onClick={() => {
                handleChangeCheckbox(rowData.internalorderId);
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
                    if (rowData.ordercountry === 1) {
                      return (
                        <Text
                          style={{
                            fontSize: "11px",
                            fontFamily:
                              '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                            transition: "all 0.25s",
                          }}
                        >
                          United States
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
                          Canada
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
          title: "Warehouse",
          field: "warehouseid",
          lookup: { 1: "US Warehouse", 2: "Canada Warehouse" },
          render: (rowData) => (
            <FormControlLabel
              onClick={() => {
                handleChangeCheckbox(rowData.internalorderId);
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
          //lookup: { 1: 'Corrugated Box', 2: 'Letter' },

          lookup: { 1: "Business", 2: "Residential" },
          render: (rowData) => (
            <FormControlLabel
              onClick={() => {
                handleChangeCheckbox(rowData.internalorderId);
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
                          Business
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
                          Residential
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
                      NEW RETURN{" "}
                    </ColorButtonNew>
                  );
                }
              })()}
            </Text>
          ),
          lookup: orderStatusOptions,
        },
        { title: "Shipping Courier", field: "shippingpolicy", type: "text" },
        { title: "Tracking #", field: "tracking", type: "text" },
        {
          title: "Shipping Service",
          field: "shipmenttype",
          type: "text",

          render: (rowData) => (
            <Text>
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
                      Standard Shipping
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
                }
              })()}
            </Text>
          ),
        },
        // { title: 'Order Status', field: 'itemvaluecurrency',type: 'text'},
        {
          title: "Order Date",
          field: "orderdate",
          type: "date",
          render: (rowData) => (
            <FormControlLabel
              onClick={() => {
                handleChangeCheckbox(rowData.internalorderId);
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
                    {rowData.orderdate}
                  </Text>
                </Typography>
              }
            />
          ),
        },
        {
          title: "Ship Date",
          field: "shipdate",
          type: "date",
          render: (rowData) => (
            <FormControlLabel
              onClick={() => {
                handleChangeCheckbox(rowData.internalorderId);
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
                    {rowData.shipdate}
                  </Text>
                </Typography>
              }
            />
          ),
        },
      ],
    });
  };

  const fetchOrderList = (userid) => {
    if (props.isfirst === true) {
      if (sellerid === 0) {
        setLoading(false);
        setOrderList([]);
      } else {
        //const userid=5;
        setLoading(true);
        shiphypeservice
          .fetchreturnorder(userid)
          .then((response) => {
            console.log("status", response.status);
            if (response.status === true) {
              setLoading(false);
              setOrderList(response.data);
            } else {
              setLoading(false);
              console.log("message", response.message);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    } else {
      //const userid=5;
      setLoading(true);
      shiphypeservice
        .fetchreturnorder(userid)
        .then((response) => {
          console.log("status", response.status);
          if (response.status === true) {
            setLoading(false);
            setOrderList(response.data);
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

  useEffect(() => {
    // fetchOderType();
  }, []);

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
        {openReply === false ? (
          " "
        ) : (
          <ReplyToReturnOrder
            userid={userid}
            orderid={orderid}
            openOnHoldOrder={openReply}
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
      </Grid>
      {openChecked === true ? (
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
            pageSize: 10,
            pageSizeOptions: [10, 20, 30, 40, 50, 100],
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
          }}
          actions={[
            {
              tooltip: "Update Select Order Status",
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
              isFreeAction: openChecked,
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
              onClick: (event) => fetchRefersh(),
            },
          ]}
        />
      ) : (
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
              onClick: (event) => fetchRefersh(),
            },
          ]}
          options={{
            paging: true,
            showTitle: false,
            maxBodyHeight: "55vh",
            doubleHorizontalScroll: true,
            headerStyle: { position: "sticky", top: 0 },
            pageSize: 10,
            pageSizeOptions: [10, 20, 30, 40, 50, 100],
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
              paddingTop: 10,
              paddingBottom: 10,
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
          }}
        />
      )}
    </View>
  );
}
