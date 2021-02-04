import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  fade,
  withStyles,
  makeStyles,
  useTheme,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {
  Platform,
  View,
  Image,
  Text,
  Dimensions,
  Clipboard,
} from "react-native";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import * as shiphypeservice from "./ShipService/shiphype_service";
import MaterialTable, { MTableToolbar } from "material-table";
import popUpStyle from "./style/popUpStyle";
import Toast from "./feedback/Toast";
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
import ProgressBar from "./feedback/ProgressBar";
import { forwardRef } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
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
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
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
}));
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
const ColorButton = withStyles((theme) => ({
  root: {
    color: "#fff",
    borderRadius: "3px",
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    height: "100%",
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
export default function ScrollableTabsButtonAuto(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const orderStatusOptions = props.orderStatusOptions;
  let orderStatusId = props.orderStatus;
  const orderTypeOptions = props.orderTypeOptions;
  const orderCouierOptions = props.orderCouierOptions;
  const orderCustomerOptions = props.orderCustomerOptions;
  const orderidsdata = props.internalorder_id.internalorderId;
  const [dataproductData, setdataproductData] = React.useState([]);
  const [orderType, setOrderType] = React.useState([]);
  const [orderStatus, setOrderStatus] = React.useState([]);
  const [orderList, setOrderList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [dataproduct, setDataProduct] = React.useState([]);
  const userid = props.user_id;
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [type, setType] = React.useState("");

  const copyLinkOnClick = (copylink) => {
    Clipboard.setString(copylink);
    setOpen(true);
    setType("success");
    setMsg("Copy to Clipboard");
  };
  const handleGetShipmentId = (rowdata) => {
    props.getShipmentIdFromOrder(rowdata);
  };

  const theme = useTheme();

  const [state, setState] = React.useState({
    column1FilterList: {},
    column2FilterList: {},
    columns: [
      {
        title: "Return ID",
        field: "internalorderId",
        // render: rowData => <Link href="#" onClick={() => handleGetShipmentId(rowData.internalorderId)} variant="body2">
        // {rowData.internalorderId} </Link>
      },
      { title: "Return Date", field: "recievedate", type: "date" },
      {
        title: "Seller Name",
        field: "displayName",
        type: "text",

        // lookup: orderCustomerOptions ,
      },
     
      {
        title: "Order Status",
        field: "orderstatus",

        render: (rowData) => (
          <Text>
            {(() => {
              if (rowData.orderstatus === 5) {
                return (
                  <ColorButtonInTransit> In Transit </ColorButtonInTransit>
                );
              } else if (rowData.orderstatus === 3) {
                return (
                  <ColorButtonProcessed> Processing </ColorButtonProcessed>
                );
              } else if (rowData.orderstatus === 6) {
                return (
                  <ColorButtonInDeliverd> Delivered </ColorButtonInDeliverd>
                );
              } else if (rowData.orderstatus === 4) {
                return <ColorButtonShipped> Shipped </ColorButtonShipped>;
              } else if (rowData.orderstatus === 7) {
                return (
                  <ColorButtonOnHold
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={() => {}}
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
                    onClick={() => {}}
                  >
                    {" "}
                    On Hold
                  </ColorButtonOnHold>
                );
              } else {
                return <ColorButtonNew> NEW RETURN </ColorButtonNew>;
              }
            })()}
          </Text>
        ),
        // lookup: orderStatusOptions ,
      },

      {
        title: "From Name",
        field: "fromname",
        type: "text",

        // lookup: orderCustomerOptions ,
      },
      {
        title: "Warehouse",
        field: "warehouseid",
        lookup: { 1: "US Warehouse", 2: "Canada Warehouse" },
      },
      {
        title: "Carrier",
        field: "carriertitle",
        type: "text",
      },
      {
        title: "Upload Photo",
        field: "uploadphoto",
        type: "text",
      },
      {
        title: "Tracking",
        field: "tracking",
        type: "text",
      },

      { title: "Return Condition", field: "returncondition", type: "text" },
      { title: "Comment", field: "comments", type: "text" },
    ],
    data: [],
  });

  const [state1, setState1] = React.useState({
    columns: [
      { title: "Item Title", field: "productname", type: "text" },
      { title: "Item SKU", field: "productsku", type: "text" },

      { title: "ShipHype Internal SKU", field: "shiphypeSku", type: "text" },
      { title: "Qty", field: "itemquantity", type: "numeric" },
      {
        title: "HS Code",
        field: "hscode",
        type: "text",
      },
      { title: "Item Value", field: "itemvalue", type: "text" },
      {
        title: "Dangerous Goods",
        field: "dangerousgoods",
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
      },
      {
        title: "Packaging",
        field: "packaging",
        width: 50,
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
        lookup: {
          1: "Envelope",
          2: "Courier Bags",
          3: "Poly Bubble Mailer",
          4: "Corrugated Box",
          5: "Corrugated Box (Heavy Duty)",
          6: "Corrugated Box (Cube)",
        },

        //  lookup: promoData ,
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
      },
      { title: "Serial Number Value", field: "serialnovalue", type: "text" },

     
    ],
  });
  //const column1FilterList = state.column1FilterList;
  React.useEffect(() => {
    //   fetchOderType();

    fetchPackingList(userid);
    fetchOrderDetails();
  }, []);
  const fetchPackageForPromotional = (userid, packageDataPro11) => {
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
          var data1 = response.data;
          data1.map((orderCouierOp) => {
            const { packaggingId, packaggingName } = orderCouierOp;
            packageDataPro111[packaggingId] = packaggingName;
          });
          setState1({
            packageDataPro11,
            columns: [
              { title: "Item Title", field: "productname", type: "text" },
              { title: "Item SKU", field: "productsku", type: "text" },

              {
                title: "ShipHype Internal SKU",
                field: "shiphypeSku",
                type: "text",
              },
              { title: "Qty", field: "productquantity", type: "numeric" },
              {
                title: "HS Code",
                field: "hscode",
                type: "text",
              },
              { title: "Item Value", field: "itemvalue", type: "text" },
              {
                title: "Dangerous Goods",
                field: "dangerousgoods",
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
              },
              {
                title: "Packaging",
                field: "packaging",
                width: 50,
                lookup: packageDataPro11,
              },
              {
                title: "Promotional Inserts",
                field: "promotionalpackaging",
                lookup: packageDataPro111,
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
              },
              {
                title: "Serial Number Value",
                field: "serialnovalue",
                type: "text",
              },
             
            ],
          });
        } else {
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const fetchPackingList = (userid) => {
    shiphypeservice
      .fetchCustomePaching(userid)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          var packageDataPro11 = {};
          var data = response.data;
          data.map((orderCouierOp) => {
            const { packaggingId, packaggingName } = orderCouierOp;
            packageDataPro11[packaggingId] = packaggingName;
          });
          //  fetchPackageForPromotional(userid,packageDataPro11);
          setState1({
            packageDataPro11,
            columns: [
              { title: "Item Title", field: "productname", type: "text" },
              { title: "Item SKU", field: "productsku", type: "text" },

              {
                title: "ShipHype Internal SKU",
                field: "shiphypeSku",
                type: "text",
              },
              { title: "Qty", field: "productquantity", type: "numeric" },
              {
                title: "HS Code",
                field: "hscode",
                type: "text",
              },
              { title: "Item Value", field: "itemvalue", type: "text" },
              {
                title: "Dangerous Goods",
                field: "dangerousgoods",
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
              },
              {
                title: "Packaging",
                field: "packaging",
                width: 50,
                lookup: packageDataPro11,
              },
              {
                title: "Promotional Inserts",
                field: "promotionalpackaging",
                width: 50,
                lookup: packageDataPro11,
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
              },
              {
                title: "Serial Number Value",
                field: "serialnovalue",
                type: "text",
              },
              
            ],
          });
        } else {
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const fetchOrderDetails = () => {
    //const userid=5;
    setLoading(true);
    const orderidselect = AsyncStorage.getItem("SelectOrderForReturn");
    AsyncStorage.multiGet(["SelectOrderForReturn"]).then((data) => {
      if (data[0][1] != null) {
        var ProductSelect1 = JSON.parse(data[0][1]);

        console.log("orderidselect", ProductSelect1);
        shiphypeservice
          .fetchOrderDetails(ProductSelect1, userid)
          .then((response) => {
            console.log("status", response.status);
            if (response.status === true) {
              setLoading(false);
              if (response.data[0].shipdate === "0001-01-01T00:00:00") {
                response.data[0].shipdate = "";
              } else if (response.data[0].orderstatus === 1) {
                response.data[0].shipdate = "";
              }
              if (response.data[0].externalorderId === 0) {
                response.data[0].externalorderId = "";
              }
              for (let i = 0; i < response.data[0].product.length; i++) {
                if (response.data[0].product[i].itemvalue === 0) {
                  response.data[0].product[i].itemvalue = "";
                }
              }
              // setOrderList(response.data);
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(response.data[0]);
                return { ...prevState, data };
              });

              setdataproductData(response.data[0].product);
            } else {
              setLoading(false);
              console.log("message", response.message);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  };

  const handleCallbackfunction = () => {
    props.backButtonRouting("15");
  };
  //Show Toast after click event
  const showToast = (open, msg, type) => {
    return (
      <Toast open={open} handleClose={handleClose} type={type} msg={msg} />
    );
  };

  /**
   * Description:Callback function after api call
   */
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <View className={classes.content}>
      {/* <ScrollView> */}
      <View className={classes.appBarSpacer} />

      <View>
        <Grid item container lg={12}>
          <Grid item lg={5} style={{ marginTop: "5px" }}>
            <Link
              onClick={() => {
                props.handleDashboard("01");
              }}
            >
              <Text style={popUpStyle.breadCrundCss1}>DASHBOARD /</Text>
            </Link>
            <Text style={popUpStyle.breadCrundCss}>
              {" "}
              ORDERS / RECEIVE Return ORDER /
            </Text>
            <Text style={popUpStyle.breadCrundCss2}>
              {" "}
              SELECTED ORDER DETAIL {"\n"}{" "}
            </Text>
          </Grid>
          <Grid item lg={3}></Grid>
        </Grid>
      </View>

      <Grid container justify="space-between" spacing={2}>
        <Grid item xs={12} md={4} lg={4}>
          <Text
            style={{
              fontSize: "15px",
              fontWeight: "700",
              // marginLeft:'10px',
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
              color: "#001737",

              transition: "all 0.25s",
            }}
          >
            Selected Order Details
          </Text>
        </Grid>
        <Grid item xs={12} md={4} lg={4}></Grid>
        <Grid
          item
          xs={12}
          md={4}
          lg={4}
          //style={{marginRight:'70px'}}
        >
         <Grid style={{marginLeft:230}}>
              <ColorButton
                size="large"
                variant="contained"
                color="primary"
                // className={classes.profileMargin}
                onClick={() => {
                  handleCallbackfunction();
                }}
              >
                Back
              </ColorButton>
            
          </Grid>
        </Grid>
      </Grid>
      <View className={classes.paper9}>
        <Grid justify="center">
          <ProgressBar loading={loading} />
        </Grid>

        <View style={popUpStyle.paddingSide}>
          <MaterialTable
            style={{ padding: "0px",marginTop: '10px'}}
            //  title="."
            columns={state.columns}
            data={state.data}
            icons={tableIcons}
            components={{
              Container: (props) => <Paper {...props} elevation={0} />,
              Toolbar: (props) => (
                <View
                  style={{
                    backgroundColor: "#fff",
                    height: "45px",
                    fontSize: "12px",
                    padding: 0,
                  }}
                >
                  <MTableToolbar
                    {...props}
                    style={{
                      paddingBottom: "0px",
                      paddingTop: "0px",
                    }}
                  />
                </View>
              ),
            }}
            localization={{
              header: {
                actions: "ACTION",
              },
            }}
            options={{
              paging: false,
              showTitle: false,
              doubleHorizontalScroll: true,
              maxBodyHeight: 390,
              headerStyle: { position: "sticky", top: 0 },
              pageSize: 7,
              pageSizeOptions: [6, 12, 18, 20, 30, 40, 50, 60, 70, 80, 90, 100],
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
              search: false,
              exportButton: false,
            }}
          />

          <Grid
            container
            justify="space-between"
            spacing={2}
            style={{ marginTop: "10px" }}
          >
            <Grid item xs={12} md={10} lg={10}>
              <MaterialTable
                style={{ padding: "0px" }}
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
                    Order Product
                  </Text>
                }
                columns={state1.columns}
                data={dataproductData}
                icons={tableIcons}
                components={{
                  Container: (props) => <Paper {...props} elevation={0} />,
                  Toolbar: (props) => (
                    <View
                      style={{
                        backgroundColor: "#fff",
                        height: "45px",
                        fontSize: "12px",
                        padding: 0,
                      }}
                    >
                      <MTableToolbar
                        {...props}
                        style={{
                          paddingBottom: "0px",
                          paddingTop: "0px",
                        }}
                      />
                    </View>
                  ),
                }}
                localization={{
                  header: {
                    actions: "ACTION",
                  },
                  toolbar: {
                    searchPlaceholder: "Search Order Product",
                  },
                }}
                options={{
                  paging: false,
                  showTitle: true,
                  doubleHorizontalScroll: true,
                  maxBodyHeight: 390,
                  headerStyle: { position: "sticky", top: 0 },
                  pageSize: 7,
                  pageSizeOptions: [
                    6,
                    12,
                    18,
                    20,
                    30,
                    40,
                    50,
                    60,
                    70,
                    80,
                    90,
                    100,
                  ],
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
              />
            </Grid>
          </Grid>
          {showToast(open, msg, type)}
        </View>
      </View>

      {/* </ScrollView> */}
    </View>
  );
}
