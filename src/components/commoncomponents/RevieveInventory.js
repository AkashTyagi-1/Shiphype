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
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import InputBase from "@material-ui/core/InputBase";
import AddIcon from "@material-ui/icons/Add";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import * as shiphypeservice from "./ShipService/shiphype_service";
import MaterialTable, { MTableToolbar } from "material-table";
import { forwardRef } from "react";
import Paper from "@material-ui/core/Paper";
import Toast from "./feedback/Toast";
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
import ProgressBar from "./feedback/ProgressBar";
import popUpStyle from "./style/popUpStyle";
import TextField from "@material-ui/core/TextField";
import DeleteCard from "./ShowStatus";
import ConfirmationRelease from "./ShipmentStatus/ConfirmationRelease";
import UnReverseInventory from "./ShipmentStatus/UnReverseInventory";
import CancelOrder from "./ShipmentStatus/CancelOrder";
import MoveOrderHold from "./ShipmentStatus/MoveOrderHold";
import Autocomplete from "@material-ui/lab/Autocomplete";
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
    height: "60vh",
    overflow: "auto",
    backgroundColor: "#fff",
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
  paper9: {
    //paddingLeft: theme.spacing(1),
    //paddingRight: theme.spacing(1),
    borderRadius: "0px",
    overflow: "auto",
    // height:'1020vh'
  },
  root: {
    //flexGrow: 1,
    width: "100%",
  },
  quantitycss: {
    color: "#000",
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
    height: "72%",
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

const ColorButtonArrived = withStyles((theme) => ({
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
      backgroundColor:'#009900',
      '&:hover': {
       backgroundColor: '#009900',

     },
    // backgroundColor: "#732673",
    // "&:hover": {
    //   backgroundColor: "#732673",
    // },
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

const StyledMTableToolbar = withStyles({
  root: {
    paddingLeft: 0,
    paddingRight: 0,
  },
})(MTableToolbar);

/**
 * Description:This function is used for Slide17
 * @param {*} props
 */
export default function Slide17(props) {
  const classes = useStyles();
  const [warehouse, setWarehouse] = React.useState("0");
  const { openImportProduct } = props;
  const userid = props.userid;
  const [activeStep, setActiveStep] = React.useState();
  const [completed, setCompleted] = React.useState(new Set());
  const [skipped, setSkipped] = React.useState(new Set());
  const [sellerId, setSellerId] = React.useState(0);
  const [dataproduct, setDataProduct] = React.useState([]);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openConfirmationRelease, setOpenConfirmationRelease] = React.useState(
    false
  );
  const [openUnReverseInventory, setOpenUnReverseInventory] = React.useState(
    false
  );
  const [openCopyOrder, setOpenCopyOrder] = React.useState(false);
  const [openCancelOrder, setOpenCancelOrder] = React.useState(false);
  const [openMoveOnHoldOrder, setOpenMoveOnHoldOrder] = React.useState(false);
  const [openCleanSweepOrder, setOpenCleanSweepOrder] = React.useState(false);

  const [status, setStatus] = React.useState(false);
  const [cardid, setCardid] = React.useState(0);
  const [rowStatus, setRowStatus] = React.useState("");
  const [packingdata, setPackingdata] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [userName, setUserName] = React.useState("All Inventory");
  const [userStatus, setUserStatus] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [type, setType] = React.useState("");
  const [userData, setUserData] = React.useState([]);

  const handleRelease = (isSprintCreate) => {
    if (isSprintCreate === 1) {
      setOpenDelete(false);
      setOpenConfirmationRelease(true);
    } else if (isSprintCreate === 2) {
      setOpenDelete(false);
      setOpenUnReverseInventory(true);
    } else if (isSprintCreate === 3) {
      setOpenDelete(false);
      setOpenCancelOrder(true);
    } else if (isSprintCreate === 4) {
      setOpenDelete(false);
      setOpenMoveOnHoldOrder(true);
    } else {
      setOpenConfirmationRelease(true);
      setOpenDelete(false);
    }
  };

  const handleGetShipmentId = (shipmentId) => {
    props.getShipmentIdFromShipment(shipmentId);
  };

  const theme = useTheme();
  const [state, setState] = React.useState({
    column1FilterList: {},
    columns: [
      {
        title: "Shipment ID",
        field: "shippingId",
        type: "text",
        render: (rowData) => (
          <Link
            href="#"
            onClick={() => handleGetShipmentId(rowData.shippingId)}
            variant="body2"
          >
            {rowData.shippingId}{" "}
          </Link>
        ),
      },
      {
        title: "Ship From Name",
        field: "shippingfromname",
        type: "text",
      },
      {
        title: "Shipping Carrier",
        field: "shippingcarrier",
        type: "text",
      },
      {
        title: "Tracking",
        field: "trackingnumber",
        type: "text",
      },
      {
        title: "Create Date",
        field: "createddate",
        type: "date",
      },
      {
        title: "Seller Name",
        field: "displayName",
        type: "text",
      },

      {
        title: "Seller Email",
        field: "userEmail",
        type: "text",
      },

      {
        title: "Warehouse Name",
        field: "shippingtowarehouseId",
        lookup: { 1: "Canada Warehouse", 2: "US Warehouse" },
      },
      {
        title: "Status",
        field: "shippingstatus",
        type: "text",
        render: (rowData) => (
          <Text>
            {(() => {
              if (rowData.shippingstatus === "Cancel") {
                return (
                  <ColorButtonCancel
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      handleClickOpendelete(
                        rowData.shippingId,
                        rowData.shippingstatus
                      );
                    }}
                  >
                    {" "}
                    {rowData.shippingstatus}{" "}
                  </ColorButtonCancel>
                );
              } else if (rowData.shippingstatus === "Processed") {
                return (
                  <ColorButtonProcessed
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      handleClickOpendelete(
                        rowData.shippingId,
                        rowData.shippingstatus
                      );
                    }}
                  >
                    {" "}
                    {rowData.shippingstatus}{" "}
                  </ColorButtonProcessed>
                );
              } else if (rowData.shippingstatus === "OnHold") {
                return (
                  <ColorButtonOnHold
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      handleClickOpendelete(
                        rowData.shippingId,
                        rowData.shippingstatus
                      );
                    }}
                  >
                    {" "}
                    {rowData.shippingstatus}{" "}
                  </ColorButtonOnHold>
                );
              } else if (rowData.shippingstatus === "Shipped") {
                return (
                  <ColorButtonShipped
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      handleClickOpendelete(
                        rowData.shippingId,
                        rowData.shippingstatus
                      );
                    }}
                  >
                    {" "}
                    {rowData.shippingstatus}{" "}
                  </ColorButtonShipped>
                );
              }else if(rowData.shippingstatus === "Arrived"){
                        return (
                          <ColorButtonArrived
                            size="large"
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              handleClickOpendelete(
                                rowData.shippingId,
                                rowData.shippingstatus
                              );
                            }}
                          >
                            {" "}
                            {rowData.shippingstatus}{" "}
                          </ColorButtonArrived>
                        );
                      } 
              
               else {
                return (
                  <ColorButtonNew
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      handleClickOpendelete(
                        rowData.shippingId,
                        rowData.shippingstatus
                      );
                    }}
                  >
                    {" "}
                    {rowData.shippingstatus}{" "}
                  </ColorButtonNew>
                );
              }
            })()}
          </Text>
        ),
      },
    ],
  });

  const fetchCourierTypeList = (user_id) => {
    setLoading(true);
    shiphypeservice
      .fetchCourierTypeList(user_id)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          //setOrderCourierType(response.data);

          const orderCouierOptions = {};
          response.data.map((orderCouierOp) => {
            const { carrierId, carriertitle } = orderCouierOp;
            orderCouierOptions[carrierId] = carriertitle;
          });

          setState({
            column1FilterList: {},
            columns: [
              {
                title: "Shipment ID",
                field: "shippingId",
                type: "text",
                render: (rowData) => (
                  <Link
                    href="#"
                    onClick={() => handleGetShipmentId(rowData.shippingId)}
                    variant="body2"
                  >
                    {rowData.shippingId}{" "}
                  </Link>
                ),
              },
              {
                title: "Ship From Name",
                field: "shippingfromname",
                type: "text",
              },
              {
                title: "Shipping Carrier",
                field: "shippingcarrier",
                lookup: orderCouierOptions,
              },
              {
                title: "Tracking",
                field: "trackingnumber",
                type: "text",
              },
              {
                title: "Create Date",
                field: "createddate",
                type: "date",
              },
              {
                title: "Seller Name",
                field: "displayName",
                type: "text",
              },

              {
                title: "Seller Email",
                field: "userEmail",
                type: "text",
              },

              {
                title: "Warehouse Name",
                field: "shippingtowarehouseId",
                lookup: { 1: "Canada Warehouse", 2: "US Warehouse" },
              },
              {
                title: "Status",
                field: "shippingstatus",
                type: "text",
                render: (rowData) => (
                  <Text>
                    {(() => {
                      if (rowData.shippingstatus === "Cancel") {
                        return (
                          <ColorButtonCancel
                            size="large"
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              handleClickOpendelete(
                                rowData.shippingId,
                                rowData.shippingstatus
                              );
                            }}
                          >
                            {" "}
                            {rowData.shippingstatus}{" "}
                          </ColorButtonCancel>
                        );
                      } else if (rowData.shippingstatus === "Processed") {
                        return (
                          <ColorButtonProcessed
                            size="large"
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              handleClickOpendelete(
                                rowData.shippingId,
                                rowData.shippingstatus
                              );
                            }}
                          >
                            {" "}
                            {rowData.shippingstatus}{" "}
                          </ColorButtonProcessed>
                        );
                      } else if (rowData.shippingstatus === "OnHold") {
                        return (
                          <ColorButtonOnHold
                            size="large"
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              handleClickOpendelete(
                                rowData.shippingId,
                                rowData.shippingstatus
                              );
                            }}
                          >
                            {" "}
                            {rowData.shippingstatus}{" "}
                          </ColorButtonOnHold>
                        );
                      } else if (rowData.shippingstatus === "Shipped") {
                        return (
                          <ColorButtonShipped
                            size="large"
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              handleClickOpendelete(
                                rowData.shippingId,
                                rowData.shippingstatus
                              );
                            }}
                          >
                            {" "}
                            {rowData.shippingstatus}{" "}
                          </ColorButtonShipped>
                        );
                      } else if(rowData.shippingstatus === "Arrived"){
                        return (
                          <ColorButtonArrived
                            size="large"
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              handleClickOpendelete(
                                rowData.shippingId,
                                rowData.shippingstatus
                              );
                            }}
                          >
                            {" "}
                            {rowData.shippingstatus}{" "}
                          </ColorButtonArrived>
                        );
                      } 
                      
                      else {
                        return (
                          <ColorButtonNew
                            size="large"
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              handleClickOpendelete(
                                rowData.shippingId,
                                rowData.shippingstatus
                              );
                            }}
                          >
                            {" "}
                            {rowData.shippingstatus}{" "}
                          </ColorButtonNew>
                        );
                      }
                    })()}
                  </Text>
                ),
              },
            ],
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

  const handleClickOpendelete = (rowid, status) => {
    setOpenDelete(true);
    setCardid(rowid);
    setRowStatus(status);

    if (status === "New Shipping" || status === "New Shipment") {
      // createOrderPayment(rowid);
    }
    console.log("rowid", rowid);
  };

  const handleConfirmRelease = () => {
    const isDelete = "Processed";
    shiphypeservice
      .updateStatus(cardid, isDelete)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setOpen(true);
          setType("success");
          setMsg(response.message);
          setStatus(response.status);
          setLoading(false);
          setOpenConfirmationRelease(false);
          fetchProductList(sellerId);
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
  };
  const handleConfirmCancel = () => {
    const isDelete = "Cancel";
    shiphypeservice
      .updateStatus(cardid, isDelete)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setOpen(true);
          setType("success");
          setMsg(response.message);
          setStatus(response.status);
          setLoading(false);
          setOpenCancelOrder(false);
          fetchProductList(sellerId);
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
  };
  const handleConfirmDone = () => {
    const isDelete = "Arrived";
    shiphypeservice
      .updateStatus(cardid, isDelete)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setOpen(true);
          setType("success");
          setMsg(response.message);
          setStatus(response.status);
          setLoading(false);
          setOpenUnReverseInventory(false);
          setOpenDelete(false);
          fetchProductList(sellerId);
        } else {
          setOpen(true);
          setType("success");
          setMsg(response.message);
          setStatus(response.status);
          setLoading(false);
          setOpenUnReverseInventory(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleConfirmHold = () => {
    const isDelete = "OnHold";
    shiphypeservice
      .updateStatus(cardid, isDelete)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setOpen(true);
          setType("success");
          setMsg(response.message);
          setStatus(response.status);
          setLoading(false);
          setOpenMoveOnHoldOrder(false);
          fetchProductList(sellerId);
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
  };

  const createOrderPayment = (shippingid) => {
    setLoading(true);
    shiphypeservice
      .createShipmentPayment(shippingid)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleDeleteCancle = () => {
    setOpenDelete(false);
    setOpenConfirmationRelease(false);
    setOpenUnReverseInventory(false);
    setOpenMoveOnHoldOrder(false);
    setOpenCancelOrder(false);
  };

  React.useEffect(() => {
    // fetchProductListOfLastWeek();
    if(props.sellerid === 0){
      shiphypeservice
      .fetchAllShipmentInfo(userid)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          var array = [];
          if(props.orderStatus === 1){
            for (let m = 0; m < response.data.length; m++) {
            
              if (response.data[m].shippingstatus === "New Shipment") {
                array.push(response.data[m]);
              }
            
          }
          const updatedaray = [...array];
          setDataProduct(updatedaray);
          }else if(props.orderStatus === 2){
            for (let m = 0; m < response.data.length; m++) {
            
              if (response.data[m].shippingstatus === "Processed") {
                array.push(response.data[m]);
              }
            
          }
          const updatedaray = [...array];
          setDataProduct(updatedaray);
          }else if(props.orderStatus === 3){
            for (let m = 0; m < response.data.length; m++) {
            
              if (response.data[m].shippingstatus === "Shipped") {
                array.push(response.data[m]);
              }
            
          }
          const updatedaray = [...array];
          setDataProduct(updatedaray);
          } 
          
          else if(props.orderStatus === 4){
            for (let m = 0; m < response.data.length; m++) {
            
              if (response.data[m].shippingstatus === "Arrived") {
                array.push(response.data[m]);
              }
            
          }
          const updatedaray = [...array];
          setDataProduct(updatedaray);
          }
          
          else {
            setDataProduct(response.data);
          }
          
          
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
    //fetchUserInfo();
    fetchCourierTypeList(userid);
    }else{
      shiphypeservice
      .fetchAllShipmentInfo(props.sellerid)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          var array = [];
          if(props.orderStatus === 1){
            for (let m = 0; m < response.data.length; m++) {
            
              if (response.data[m].shippingstatus === "New Shipment") {
                array.push(response.data[m]);
              }
            
          }
          const updatedaray = [...array];
          setDataProduct(updatedaray);
          }else if(props.orderStatus === 2){
            for (let m = 0; m < response.data.length; m++) {
            
              if (response.data[m].shippingstatus === "Processed") {
                array.push(response.data[m]);
              }
            
          }
          const updatedaray = [...array];
          setDataProduct(updatedaray);
          }else if(props.orderStatus === 3){
            for (let m = 0; m < response.data.length; m++) {
            
              if (response.data[m].shippingstatus === "Shipped") {
                array.push(response.data[m]);
              }
            
          }
          const updatedaray = [...array];
          setDataProduct(updatedaray);
          }else {
            setDataProduct(response.data);
          }
          
          
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
    //fetchUserInfo();
    fetchCourierTypeList(props.sellerid);
    }
    
  }, []);

  var newArr = [];
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
          setUserStatus(true);
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const fetchProductListOfLastWeek = () => {
    //const userid=5;
    setLoading(true);
    shiphypeservice
      .fetchProductListOfLastWeek(userid)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          var array = [];
          if(props.orderStatus === 1){
            for (let m = 0; m < response.data.length; m++) {
            
              if (response.data[m].shippingstatus === "New Shipment") {
                array.push(response.data[m]);
              }
            
          }
          const updatedaray = [...array];
          setDataProduct(updatedaray);
          }else if(props.orderStatus === 2){
            for (let m = 0; m < response.data.length; m++) {
            
              if (response.data[m].shippingstatus === "Processed") {
                array.push(response.data[m]);
              }
            
          }
          const updatedaray = [...array];
          setDataProduct(updatedaray);
          }else if(props.orderStatus === 3){
            for (let m = 0; m < response.data.length; m++) {
            
              if (response.data[m].shippingstatus === "Shipped") {
                array.push(response.data[m]);
              }
            
          }
          const updatedaray = [...array];
          setDataProduct(updatedaray);
          }else {
            setDataProduct(response.data);
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
  var uuid1 = 0;
  const fetchProductList = (seller) => {
    if (props.sellerid === 0) {
      fetchProductListOfLastWeek();
    } else {
      if (props.sellerid === 0) {
        uuid1 = userid;
      } else {
        uuid1 = props.sellerid;
      }
      
      setLoading(true);
      shiphypeservice
        .fetchAllShipmentInfo(uuid1)
        .then((response) => {
          console.log("status", response.status);
          if (response.status === true) {
            setLoading(false);
            var array = [];
          if(props.orderStatus === 1){
            for (let m = 0; m < response.data.length; m++) {
            
              if (response.data[m].shippingstatus === "New Shipment") {
                array.push(response.data[m]);
              }
            
          }
          const updatedaray = [...array];
          setDataProduct(updatedaray);
          }else if(props.orderStatus === 2){
            for (let m = 0; m < response.data.length; m++) {
            
              if (response.data[m].shippingstatus === "Processed") {
                array.push(response.data[m]);
              }
            
          }
          const updatedaray = [...array];
          setDataProduct(updatedaray);
          }else if(props.orderStatus === 3){
            for (let m = 0; m < response.data.length; m++) {
            
              if (response.data[m].shippingstatus === "Shipped") {
                array.push(response.data[m]);
              }
            
          }
          const updatedaray = [...array];
          setDataProduct(updatedaray);
          }else {
            setDataProduct(response.data);
          }
          
          } else {
            setLoading(false);
            console.log("message", response.message);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
    //const userid=5;
  };

  var uuid = 0;
  const refreshGrid = () => {
    if (props.sellerid === 0) {
      uuid = userid;
    } else {
      uuid = props.sellerid;
    }
    setLoading(true);
    shiphypeservice
      .fetchAllShipmentInfo(uuid)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          var array = [];
          if(props.orderStatus === 1){
            for (let m = 0; m < response.data.length; m++) {
            
              if (response.data[m].shippingstatus === "New Shipment") {
                array.push(response.data[m]);
              }
            
          }
          const updatedaray = [...array];
          setDataProduct(updatedaray);
          }else if(props.orderStatus === 2){
            for (let m = 0; m < response.data.length; m++) {
            
              if (response.data[m].shippingstatus === "Processed") {
                array.push(response.data[m]);
              }
            
          }
          const updatedaray = [...array];
          setDataProduct(updatedaray);
          }else if(props.orderStatus === 3){
            for (let m = 0; m < response.data.length; m++) {
            
              if (response.data[m].shippingstatus === "Shipped") {
                array.push(response.data[m]);
              }
            
          }
          const updatedaray = [...array];
          setDataProduct(updatedaray);
          }else {
            setDataProduct(response.data);
          }
          
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
    //const userid=5;
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

  return (
    <View className={classes.content}>

      {/* <View >
            <Grid item  container lg={12} style={popUpStyle.breadCrumSidePadding} >
            <Grid item  lg={7}  >
            <Link  onClick={()=>{props.handleDashboard('01')}}>
            <Text style={popUpStyle.breadCrundCss1}>DASHBOARD /</Text>
            </Link>
          <Text style={popUpStyle.breadCrundCss2}> RECEIVE INVENTORY {'\n'} </Text> 
            
              </Grid>
              <Grid item  lg={5} style={{marginTop:'15px'}}>
              <Grid justify="flex-end" container >
            <Grid item style={{marginRight:'20px'}}>
              
            <Autocomplete
      id="combo-box-demo"
      fullWidth
      options={userData}
      getOptionLabel={(option) => option.name}
     
      style={{ width: 400 }}
      renderInput={(params) => <TextField {...params} size="small" placeholder="Search Seller" variant="outlined" />}
      onChange={(event, newValue) => {
          if(newValue !== null){
            // setUserid(newValue.id);
            
            // fetchOrderCharges(newValue.id);
            setSellerId(newValue.id);
           // setUserName(event._targetInst.memoizedProps.children);
            fetchProductList(newValue.id);

          }else{
            setSellerId(0);
            setDataProduct([]);
          }
        console.log("newvalue",newValue);
      }}
    />
            </Grid>
            </Grid>    </Grid>
              </Grid>
              </View>  */}

      <Grid>
        {" "}
        {openDelete === false ? (
          " "
        ) : (
          <DeleteCard
            rowStatus={rowStatus}
            openDeleteCard={openDelete}
            handleRelease={handleRelease}
            handleConfirmDone={handleConfirmDone}
            handleDeleteCancle={handleDeleteCancle}
          />
        )}
        {openConfirmationRelease === false ? (
          " "
        ) : (
          <ConfirmationRelease
            openConfirmatioResealse={openConfirmationRelease}
            handleConfirmRelease={handleConfirmRelease}
            handleConfirmDone={handleConfirmDone}
            handleDeleteCancle={handleDeleteCancle}
          />
        )}
        {openUnReverseInventory === false ? (
          " "
        ) : (
          <UnReverseInventory
            openUnReverseInventory={openUnReverseInventory}
            handleConfirmDone={handleConfirmDone}
            handleDeleteCancle={handleDeleteCancle}
          />
        )}
        {openCancelOrder === false ? (
          " "
        ) : (
          <CancelOrder
            shipmentId={cardid}
            userid={userid}
            status="Cancel"
            openCancelOrder={openCancelOrder}
            handleConfirmCancel={handleConfirmCancel}
            handleDeleteCancle={handleDeleteCancle}
          />
        )}
        {openMoveOnHoldOrder === false ? (
          " "
        ) : (
          <MoveOrderHold
            shipmentId={cardid}
            userid={userid}
            status="OnHold"
            openMoveOnHoldOrder={openMoveOnHoldOrder}
            handleConfirmHold={handleConfirmHold}
            handleDeleteCancle={handleDeleteCancle}
          />
        )}
      </Grid>

      <View className={classes.paper9}>
        <Grid justify="center">
          <ProgressBar loading={loading} />
        </Grid>

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
                Receive Inventory
              </Text>
            }
            columns={state.columns}
            data={dataproduct}
            icons={tableIcons}
            components={{
              Container: (props) => <Paper {...props} elevation={0} />,

              Toolbar: (props) => <StyledMTableToolbar {...props} />,
            }}
            localization={{
              header: {
                actions: "Action",
              },
              toolbar: {
                searchPlaceholder: "Search Shipments",
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
                onClick: (event) => refreshGrid(),
              },
              //   {
              //     icon: () => <RefreshIcon style={{ backgroundColor:'#33cc00',color:'#fff',borderRadius : '3px',margin:'3px',width:30,
              //                 height:30}}/>,
              //   //tooltip: 'Refresh',
              //   position: "toolbar",
              //   onClick: (event) => refreshGrid()
              // }
            ]}
            options={{
              paging: true,
              doubleHorizontalScroll: true,
              maxBodyHeight: "65vh",
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
              search: true,
              exportButton: false,
            }}
          />

          {showToast(open, msg, type)}
        </View>
      </View>

      {/* </ScrollView> */}
    </View>
  );
}
