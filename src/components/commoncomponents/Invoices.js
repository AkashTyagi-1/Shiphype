import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  fade,
  withStyles,
  makeStyles,
  useTheme,
} from "@material-ui/core/styles";
import { Platform, View, Image, Text, Dimensions } from "react-native";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import ProgressBar from "./feedback/ProgressBar";
import * as shiphypeservice from "./ShipService/shiphype_service";
import popUpStyle from "./style/popUpStyle";
import AddBoxIcon from "@material-ui/icons/AddBox";
import TextField from "@material-ui/core/TextField";
import Toast from "./feedback/Toast";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import AddExtraService from "./AddExtraService";
import TransactionSuccessful from "./dialog/TransactionSuccesfully";
import TransactionFail from "./dialog/TransactionFail";
import PaymentWarning from "./dialog/PaymentWarning";
import AddExtraChargesSupplier from "./dialog/AddExtraChargesSupplier";
import EditCharge from "./dialog/EditCharge";

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
    height: "75vh",
    overflow: "auto",
    backgroundColor: "#fff",
  },

  button2: {
    border: " 1px solid #c0ccda",
    borderRadius: "5px",
    // paddingTop: '10%',
    // paddingBottom: '10%',
    height: "100%",
    width: "100px",
    fontSize: "11px",
    fontWeight: "550",
    color: "rgba(27, 46, 75, 0.7)",
    // paddingLeft: '22%',
    // paddingRight: '22%',
  },
  buttonHome: {
    // border : ' 1px solid #c0ccda',
    borderRadius: "5px",
    // paddingTop: '10%',
    // paddingBottom: '10%',
    fontSize: "11px",
    fontWeight: "550",
    color: "#fff",
    backgroundColor: "#000",
    // paddingLeft: '22%',
    // paddingRight: '22%',
    height: "100%",
    width: "100px",
    "&:hover": {
      color: "#fff",
      backgroundColor: "#000",
    },
  },
  buttonOrder: {
    // border : ' 1px solid #c0ccda',
    borderRadius: "5px",
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    height: "100%",
    width: "110px",
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
  tabRoot: {
    fontSize: "12px",
  },
  rootcard: {
    width: "100%",
    flexGrow: 1,
    marginTop: "5px",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

const selectOption = [
  {
    id: "1",
    name: "Order",
  },
  {
    id: "2",
    name: "Shipment",
  },
  {
    id: "4",
    name: "Due Payment",
  },
];

const currencyData = [
  {
    id: 1,
    currency: "USD",
  },
  {
    id: 2,
    currency: "CAD",
  },
];

//Make custom button
const ColorButton = withStyles((theme) => ({
  root: {
    color: "#fff",
    borderRadius: "3px",
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    height: "100%",
    width: "170px",
    fontSize: "11px",
    fontWeight: "550",
    color: "#fff",
    backgroundColor: "#0168fa",
    "&:hover": {
      backgroundColor: "#002080",
    },
  },
}))(Button);

export default function Invoices(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [userid, setUserid] = useState(0);
  const [dataproduct, setDataProduct] = React.useState([]);
  const [dataproductship, setDataProductship] = React.useState([]);
  const isAdmin = props.isAdmin;
  const user_id = props.user_id;
  const [userData, setUserData] = useState([]);
  const userRoleId = props.userRoleId;
  const [selectedItems, setSelectedItems] = useState([]);
  const [sourceid, setSourceid] = useState("");
  const [customerid, setCustomerid] = useState("");
  const [isdata, setIsdata] = useState(false);
  const [openaddextraservice, setOpenaddextraservice] = useState(false);
  const [opentransactionsucess, setOpentransactionsucess] = useState(false);
  const [opentransactionfail, setOpentransactionfail] = useState(false);
  const [transactionId, setTransactionId] = useState("12345");
  const [typepay, setTypepay] = useState(4);
  const [orderid, setOrderid] = useState(null);
  const [cardData, setCardData] = useState([]);
  const [isdefault, setIsdefault] = useState(false);
  const [paymentwarning, setPaymentwarning] = useState(false);
  const [selectcurrency, setSelectcurrency] = useState("USD");
  const [opencustomecharge, setOpencustomecharge] = useState(false);
  const [isinvoice, setIsinvoice] = useState(false);
  const [selectedtype, setSelectedtype] = useState(selectOption[2]);
  const [duePayment, setDuePayment] = useState([]);
  const [openeditcharge,setOpeneditcharge]=useState(false);
  const [chargeData,setChargeData]=useState(null);
  var newArr = [];

  useEffect(() => {
    fetchUserInfo();
    //fetchOrderCharges(user_id);
    fetchShipmentCharges(user_id);
    //fetchduePayment(user_id);
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
          //setUserData(response.data);
          for (let a = 0; a < response.data.length; a++) {
            if(response.data[a].userEmail==='')
              {
               var myObject = {};
               response.data[a].id ? (myObject["id"] = response.data[a].id) : null;
               response.data[a].displayName ? (myObject["displayName"] = response.data[a].displayName) : null;
               response.data[a].displayName
                 ? (myObject["name"] = response.data[a].displayName)
                 : null;
               newArr.push(myObject);
              }
              else{
               var myObject = {};
               response.data[a].id ? (myObject["id"] = response.data[a].id) : null;
               response.data[a].displayName ? (myObject["displayName"] = response.data[a].displayName) : null;
               response.data[a].userEmail
                 ? (myObject["name"] = response.data[a].userEmail)
                 : null;
               newArr.push(myObject);
              }
          }
          console.log("array", newArr);
          setUserData(newArr);
          // setUserStatus(true);
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChange1 = (event) => {
    setSelectcurrency(event.target.value);
  };

  const fetchShipmentCharges = (userid) => {
    setLoading(true);
    shiphypeservice
      .fetchShipmentCharges(userid)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          setDataProductship(response.data);
          // for(let i=0;i<response.data.length;i++){
          //   setTotalamount((prevActiveStep) => prevActiveStep + response.data[i].totalcharges);
          // }
          if (response.data.length === 0) {
            setIsdata(false);
          } else {
            setIsdata(true);
          }
          console.log("array", newArr);
          fetchCard(userid);
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchOrderCharges = (userid) => {
    setLoading(true);
    shiphypeservice
      .fetchOrderCharges(userid)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          setDataProduct(response.data);
          // for(let i=0;i<response.data.length;i++){
          //   setTotalamount((prevActiveStep) => prevActiveStep + response.data[i].totalcharges);
          // }
          if (response.data.length === 0) {
            setIsdata(false);
          } else {
            setIsdata(true);
          }
          console.log("array", newArr);
          fetchCard(userid);
          fetchduePayment(userid);
          props.refreshUnpaid(userid);
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchduePayment = (userid) => {
    setLoading(true);
    shiphypeservice
      .paymentHistory(userid)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          setDuePayment(response.data);
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchCard = (userid) => {
    shiphypeservice
      .fetchCreditCard(userid)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setCardData(response.data);
          for (let i = 0; i < response.data.length; i++) {
            if (userid === response.data[i].userId && response.data[i].defaultcard === true) {
              setIsdefault(response.data[i].defaultcard);
              setSourceid(response.data[i].sqaureupcustomercardid);
              setCustomerid(response.data[i].sqaureupcustomerid);
              break;
            }
          }
        } else {
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const paymentDeduct=(totalamount, orderid)=>{
    //const totalamount = formState.values.Amount;
    //const description = formState.values.Description;
    //const currency=selectcurrency.currency;
    setLoading(true);
    shiphypeservice
        .paymentDeduct(userid,totalamount,"payment")
        .then((response) => {
          console.log("status", response.status);
          if (response.status === true) {
            setLoading(false);
            if (parseInt(typepay) === 1) {
              handleConfirmStatus(userid, orderid, response.data.currenttransactionId);
            } else if (parseInt(typepay) === 4) {
              handleConfirmStatusUpdate(
                userid,
                orderid,
                response.data.currenttransactionId
              );
            } else {
              handleConfirmStatusShipment(
                userid,
                orderid,
                response.data.currenttransactionId
              );
            }
          } else {
            setOpentransactionfail(true);
            setLoading(false);
            console.log("message", response.message);
          }
        })
        .catch((error) => {
          console.error(error);
        });
  }


  const doPaymentOrder = (totalamount, orderid) => {
    if (cardData.length === 0) {
      setPaymentwarning(true);
    } else {
      
      // setOrderid(orderid);
      const amount_money = {
        amount: parseInt(totalamount),
        currency: "USD",
      };
      const source_id = sourceid;
      const customer_id = customerid;
      const autocomplete = true;
      const reference_id = "0";
      const note = "no notes";

      setLoading(true);
      shiphypeservice
        .doPayment(
          amount_money,
          source_id,
          customer_id,
          autocomplete,
          reference_id,
          note,
          userid
        )
        .then((response) => {
          console.log("status", response.status);
          if (response.status === true) {
            setLoading(false);
            if (parseInt(typepay) === 1) {
              handleConfirmStatus(userid, orderid, response.data.payment.id);
            } else if (parseInt(typepay) === 4) {
              handleConfirmStatusUpdate(
                userid,
                orderid,
                response.data.payment.id
              );
            } else {
              handleConfirmStatusShipment(
                userid,
                orderid,
                response.data.payment.id
              );
            }
          } else {
            setOpentransactionfail(true);
            setLoading(false);
            console.log("message", response.message);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleConfirmStatusUpdate = (userid, orderid, transaction) => {
    setLoading(true);
    shiphypeservice
      .updateDuePayment(
        orderid.duepaymentId,
        userid,
        orderid.description,
        orderid.amount,
        "Done"
      )
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          setTransactionId(transaction);
          setOpentransactionsucess(true);
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleConfirmStatus = (userid, orderid, transaction) => {
    const isDelete = 6;
    //changedWarehouseid
    setLoading(true);
    let changedWarehouseid1 = [];
    changedWarehouseid1.push(orderid);

    shiphypeservice
      .updateOrderStatus(changedWarehouseid1, isDelete)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          setTransactionId(transaction);
          setOpentransactionsucess(true);
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleConfirmStatusShipment = (userid, orderid, transaction) => {
    setLoading(true);

    const isDelete = "Shipped";
    shiphypeservice
      .updateStatus(orderid, isDelete)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          setTransactionId(transaction);
          setOpentransactionsucess(true);
        } else {
          setLoading(false);

          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const cancelpoupup = () => {
    setPaymentwarning(false);
  };
  const refreshPage = () => {
    setTransactionId(0);
    setOpentransactionsucess(false);
    setOpentransactionfail(false);

    if (parseInt(typepay) === 1) {
      if (userid === 0) {
        fetchOrderCharges(user_id);
      } else {
        fetchOrderCharges(userid);
      }
    } else if (parseInt(typepay) === 4) {
      if (userid === 0) {
        fetchduePayment(user_id);
        props.refreshUnpaid(user_id);
      } else {
        fetchduePayment(userid);
        props.refreshUnpaid(userid);
      }
    } else {
      if (userid === 0) {
        fetchShipmentCharges(user_id);
      } else {
        fetchShipmentCharges(userid);
      }
    }
  };

  const openAddExtraService = (orderid) => {
    setOrderid(orderid);
    setOpenaddextraservice(true);
  };

  const closeAddExtraService = () => {
    setOrderid(null);
    setOpenaddextraservice(false);
    setOpentransactionsucess(false);
  };

  const refreshOrderCharges = () => {
    setOrderid(null);
    setOpenaddextraservice(false);

    if (parseInt(typepay) === 1) {
      fetchOrderCharges(userid);
    } else if (parseInt(typepay) === 4) {
      fetchduePayment(userid);
    } else {
      fetchShipmentCharges(userid);
    }
  };

  const openCustomCharge = () => {
    setOpencustomecharge(true);
  };

  const openEditCharge = (data) => {
    setChargeData(data);
    setOpeneditcharge(true);
  };

  const closeCustomCharge = () => {
    setChargeData(null);
    setOpencustomecharge(false);
    setOpeneditcharge(false);
    fetchduePayment(userid);
    props.refreshUnpaid(userid);
  };

  return (
    <View className={classes.content}>
      <View className={classes.appBarSpacer} />
      <View>
        <Grid item container lg={12}>
          <Grid item lg={5} style={popUpStyle.breadCrumSidePadding}>
            <Link
              onClick={() => {
                props.handleDashboard("01");
              }}
            >
              <Text style={popUpStyle.breadCrundCss1}>DASHBOARD /</Text>
            </Link>
            <Text style={popUpStyle.breadCrundCss2}>
              {" "}
              CHARGE CUSTOMER {"\n"}{" "}
            </Text>
          </Grid>

          {isAdmin === true ? (
            <Grid item style={{ marginTop: "15px", padding: "0" }}>
              <Autocomplete
                id="combo-box-demo"
                fullWidth
                options={userData}
                getOptionLabel={(option) => option.name}
                style={{ width: 200 }}
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
                    setUserid(newValue.id);
                    if (value === 0) {
                      setValue(1);
                    } else {
                      setValue(0);
                    }
                    fetchOrderCharges(newValue.id);
                  } else {
                    setDataProduct([]);
                    setDuePayment([]);
                    setUserid(0);
                  }
                  console.log("newvalue", newValue);
                }}
              />
            </Grid>
          ) : (
            ""
          )}

          <Grid
            item
            style={{ marginLeft: "2px", marginTop: "15px", padding: "0" }}
          >
            <Autocomplete
              id="combo-box-demo"
              fullWidth
              options={selectOption}
              value={selectedtype}
              getOptionLabel={(option) => option.name}
              style={{ width: 200 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  placeholder="Search Option"
                  variant="outlined"
                />
              )}
              onChange={(event, newValue) => {
                if (newValue !== null) {
                  setTypepay(newValue.id);
                  setSelectedtype(newValue);
                  if (newValue.id === "2") {
                    if (userid === 0) {
                      fetchShipmentCharges(user_id);
                    } else {
                      fetchShipmentCharges(userid);
                    }
                  } else if (newValue.id === "4") {
                    if (userid === 0) {
                      fetchduePayment(user_id);
                    } else {
                      fetchduePayment(userid);
                    }
                  }
                } else {
                  setSelectedtype(selectOption[0]);
                  setTypepay("1");
                }
                console.log("newvalue", newValue);
              }}
            />
          </Grid>
          <Grid
            item
            style={{ marginLeft: "2px", marginTop: "15px", padding: "0" }}
          >
            <ColorButton
              size="medium"
              variant="contained"
              color="primary"
              disabled={userid === 0 ? true : false}
              onClick={() => {
                openCustomCharge();
              }}
            >
              Custom Charge
            </ColorButton>
          </Grid>
        </Grid>
      </View>

      <Grid justify="center">
        <ProgressBar loading={loading} />
      </Grid>
      {openaddextraservice === false ? null : (
        <AddExtraService
          openaddextraservice={openaddextraservice}
          closeAddExtraService={closeAddExtraService}
          typepay={typepay}
          orderid={orderid}
          refreshOrderCharges={refreshOrderCharges}
        />
      )}
     
      {opentransactionsucess === false ? null : (
        <TransactionSuccessful
          opentransactionsucess={opentransactionsucess}
          closeAddExtraService={closeAddExtraService}
          transactionId={transactionId}
          isinvoice={isinvoice}
          refreshPage={refreshPage}
        />
      )}
      {opentransactionfail === false ? null : (
        <TransactionFail
          opentransactionfail={opentransactionfail}
          refreshPage={refreshPage}
          isinvoice={isinvoice}
        />
      )}
      {paymentwarning === false ? null : (
        <PaymentWarning
          paymentwarning={paymentwarning}
          refreshPage={cancelpoupup}
          isinvoice={isinvoice}
        />
      )}
      {openeditcharge === false ? null : (
        <EditCharge
          openeditcharge={openeditcharge}
          refreshPage={closeCustomCharge}
          chargeData={chargeData}
          userid={userid}
        />
      )}
      {opencustomecharge === false ? null : (
        <AddExtraChargesSupplier
          opencustomecharge={opencustomecharge}
          refreshPage={closeCustomCharge}
          userid={userid}
        />
      )}

      {(() => {
        if (parseInt(typepay) === 3) {
          return (
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid>
                <Text
                  style={{
                    fontSize: "20px",
                    fontWeight: "700",
                    marginLeft: "20px",
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                  }}
                >
                  There is no Order or Shipment for Payment.Please Select Seller
                  and Option first.
                </Text>
              </Grid>
            </View>
          );
        }
      })()}

      {(() => {
        if (parseInt(typepay) === 1) {
          if (dataproduct.length === 0) {
            return (
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Grid>
                  <Text
                    style={{
                      fontSize: "20px",
                      fontWeight: "700",
                      marginLeft: "20px",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                    }}
                  >
                    Still now you don't have any Order for Payment.
                  </Text>
                </Grid>
              </View>
            );
          } else {
            return (
              <List>
                {dataproduct.map((data, index) => (
                  <Grid item xs={12} md={12} lg={12}>
                    <Card className={classes.rootcard} variant="outlined">
                      <CardContent>
                        <Typography
                          style={{
                            fontSize: "13px",
                            fontWeight: 700,
                            color: "#000",
                          }}
                          color="textSecondary"
                          gutterBottom
                        >
                          Order Id: {data.orderid}
                        </Typography>
                        <Grid container spacing={0}>
                          <Grid
                            container
                            item
                            xs={10}
                            md={2}
                            direction="column"
                            alignItems="flex-start"
                          >
                            <Typography
                              style={{
                                fontSize: "13px",
                                fontWeight: 700,
                                color: "#000",
                              }}
                              color="textSecondary"
                              gutterBottom
                            >
                              Service Name
                            </Typography>
                            {data.kittingcharges === null ||
                            data.kittingcharges === 0 ? null : (
                              <Typography
                                style={{ fontSize: "12px" }}
                                color="textSecondary"
                              >
                                kitting
                              </Typography>
                            )}
                            {data.pickingandpackingservicecharges === null ||
                            data.pickingandpackingservicecharges ===
                              0 ? null : (
                              <Typography
                                style={{ fontSize: "12px" }}
                                color="textSecondary"
                              >
                                Picking and Packing
                              </Typography>
                            )}
                            {data.returnsservicecharges === null ||
                            data.returnsservicecharges === 0 ? null : (
                              <Typography
                                style={{ fontSize: "12px" }}
                                color="textSecondary"
                              >
                                Returns
                              </Typography>
                            )}
                            {data.internationalorderservicecharges === null ||
                            data.internationalorderservicecharges ===
                              0 ? null : (
                              <Typography
                                style={{ fontSize: "12px" }}
                                color="textSecondary"
                              >
                                International Order
                              </Typography>
                            )}
                            {data.specialmerchandiseservicecharges === null ||
                            data.specialmerchandiseservicecharges ===
                              0 ? null : (
                              <Typography
                                style={{ fontSize: "12px" }}
                                color="textSecondary"
                              >
                                Special Merchandise
                              </Typography>
                            )}
                            {data.additionalservicecharges === null ||
                            data.additionalservicecharges === 0 ? null : (
                              <Typography
                                style={{ fontSize: "12px" }}
                                color="textSecondary"
                              >
                                Additional
                              </Typography>
                            )}
                            <Typography
                              style={{
                                fontSize: "13px",
                                fontWeight: 700,
                                color: "#000",
                              }}
                              color="textSecondary"
                            >
                              Total Charges
                            </Typography>
                          </Grid>

                          <Grid
                            container
                            item
                            xs={10}
                            md={6}
                            direction="column"
                            alignItems="flex-start"
                          >
                            <Typography
                              style={{
                                fontSize: "13px",
                                fontWeight: 700,
                                color: "#000",
                              }}
                              color="textSecondary"
                              gutterBottom
                            >
                              Charges
                            </Typography>
                            {data.kittingcharges === null ||
                            data.kittingcharges === 0 ? null : (
                              <Typography
                                style={{ fontSize: "12px" }}
                                color="textSecondary"
                              >
                                ${data.kittingcharges}
                              </Typography>
                            )}
                            {data.pickingandpackingservicecharges === null ||
                            data.pickingandpackingservicecharges ===
                              0 ? null : (
                              <Typography
                                style={{ fontSize: "12px" }}
                                color="textSecondary"
                              >
                                ${data.pickingandpackingservicecharges}
                              </Typography>
                            )}
                            {data.returnsservicecharges === null ||
                            data.returnsservicecharges === 0 ? null : (
                              <Typography
                                style={{ fontSize: "12px" }}
                                color="textSecondary"
                              >
                                ${data.returnsservicecharges}
                              </Typography>
                            )}
                            {data.internationalorderservicecharges === null ||
                            data.internationalorderservicecharges ===
                              0 ? null : (
                              <Typography
                                style={{ fontSize: "12px" }}
                                color="textSecondary"
                              >
                                ${data.internationalorderservicecharges}
                              </Typography>
                            )}
                            {data.specialmerchandiseservicecharges === null ||
                            data.specialmerchandiseservicecharges ===
                              0 ? null : (
                              <Typography
                                style={{ fontSize: "12px" }}
                                color="textSecondary"
                              >
                                ${data.specialmerchandiseservicecharges}
                              </Typography>
                            )}
                            {data.additionalservicecharges === null ||
                            data.additionalservicecharges === 0 ? null : (
                              <Typography
                                style={{ fontSize: "12px" }}
                                color="textSecondary"
                              >
                                ${data.additionalservicecharges}
                              </Typography>
                            )}
                            <Typography
                              style={{
                                fontSize: "13px",
                                fontWeight: 700,
                                color: "#000",
                              }}
                              color="textSecondary"
                            >
                              ${data.totalcharges}
                            </Typography>

                            <Grid
                              item
                              style={{ marginLeft: "70px", cursor: "pointer" }}
                            >
                              {isAdmin === true ? (
                                <Grid justify="flex-end">
                                  <ColorButton
                                    size="large"
                                    variant="contained"
                                    color="primary"
                                    // disabled={!isdata}
                                    onClick={() => {
                                      openAddExtraService(data);
                                    }}
                                  >
                                    Add/Edit Service
                                  </ColorButton>
                                </Grid>
                              ) : null}
                              <Grid
                                justify="flex-end"
                                style={{ marginTop: "10px" }}
                              >
                                <ColorButton
                                  size="large"
                                  variant="contained"
                                  color="primary"
                                  disabled={!defaultcard}
                                  onClick={() => {
                                    paymentDeduct(
                                      data.totalcharges,
                                      data.orderid
                                    );
                                  }}
                                >
                                  {isAdmin === true ? "Charge" : "Pay"}
                                </ColorButton>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </List>
            );
          }
        }
      })()}

      {(() => {
        if (parseInt(typepay) === 2) {
          if (dataproductship.length === 0) {
            return (
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Grid>
                  <Text
                    style={{
                      fontSize: "20px",
                      fontWeight: "700",
                      marginLeft: "20px",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                    }}
                  >
                    Still now you don't have any Shipment for Payment.
                  </Text>
                </Grid>
              </View>
            );
          } else {
            return (
              <List>
                {dataproductship.map((data, index) => (
                  <Grid item xs={12} md={12} lg={12}>
                    <Card className={classes.rootcard} variant="outlined">
                      <CardContent>
                        <Typography
                          style={{
                            fontSize: "13px",
                            fontWeight: 700,
                            color: "#000",
                          }}
                          color="textSecondary"
                          gutterBottom
                        >
                          Shipment Id: {data.shippingid}
                        </Typography>
                        <Grid container spacing={0}>
                          <Grid
                            container
                            item
                            xs={10}
                            md={2}
                            direction="column"
                            alignItems="flex-start"
                          >
                            <Typography
                              style={{
                                fontSize: "13px",
                                fontWeight: 700,
                                color: "#000",
                              }}
                              color="textSecondary"
                              gutterBottom
                            >
                              Service Name
                            </Typography>
                            {data.recievingservicecharges === null ||
                            data.recievingservicecharges === 0 ? null : (
                              <Typography
                                style={{ fontSize: "12px" }}
                                color="textSecondary"
                              >
                                Receiving
                              </Typography>
                            )}
                            {data.storageservicecharges === null ||
                            data.storageservicecharges === 0 ? null : (
                              <Typography
                                style={{ fontSize: "12px" }}
                                color="textSecondary"
                              >
                                Storage
                              </Typography>
                            )}
                            {data.shippingservicecharges === null ||
                            data.shippingservicecharges === 0 ? null : (
                              <Typography
                                style={{ fontSize: "12px" }}
                                color="textSecondary"
                              >
                                Shipping
                              </Typography>
                            )}
                            {data.insuranceservicecharges === null ||
                            data.insuranceservicecharges === 0 ? null : (
                              <Typography
                                style={{ fontSize: "12px" }}
                                color="textSecondary"
                              >
                                Insurance
                              </Typography>
                            )}
                            <Typography
                              style={{
                                fontSize: "13px",
                                fontWeight: 700,
                                color: "#000",
                              }}
                              color="textSecondary"
                            >
                              Total Charges
                            </Typography>
                          </Grid>

                          <Grid
                            container
                            item
                            xs={10}
                            md={6}
                            direction="column"
                            alignItems="flex-start"
                          >
                            <Typography
                              style={{
                                fontSize: "13px",
                                fontWeight: 700,
                                color: "#000",
                              }}
                              color="textSecondary"
                              gutterBottom
                            >
                              Charges
                            </Typography>
                            {data.recievingservicecharges === null ||
                            data.recievingservicecharges === 0 ? null : (
                              <Typography
                                style={{ fontSize: "12px" }}
                                color="textSecondary"
                              >
                                ${data.recievingservicecharges}
                              </Typography>
                            )}
                            {data.storageservicecharges === null ||
                            data.storageservicecharges === 0 ? null : (
                              <Typography
                                style={{ fontSize: "12px" }}
                                color="textSecondary"
                              >
                                ${data.storageservicecharges}
                              </Typography>
                            )}
                            {data.shippingservicecharges === null ||
                            data.shippingservicecharges === 0 ? null : (
                              <Typography
                                style={{ fontSize: "12px" }}
                                color="textSecondary"
                              >
                                ${data.shippingservicecharges}
                              </Typography>
                            )}
                            {data.insuranceservicecharges === null ||
                            data.insuranceservicecharges === 0 ? null : (
                              <Typography
                                style={{ fontSize: "12px" }}
                                color="textSecondary"
                              >
                                ${data.insuranceservicecharges}
                              </Typography>
                            )}
                            <Typography
                              style={{
                                fontSize: "13px",
                                fontWeight: 700,
                                color: "#000",
                              }}
                              color="textSecondary"
                            >
                              ${data.totalcharges}
                            </Typography>

                            <Grid
                              item
                              style={{ marginLeft: "70px", cursor: "pointer" }}
                            >
                              {isAdmin === true ? (
                                <Grid justify="flex-end">
                                  <ColorButton
                                    size="large"
                                    variant="contained"
                                    color="primary"
                                    // disabled={!isdata}
                                    onClick={() => {
                                      openAddExtraService(data);
                                    }}
                                  >
                                    Add/Edit Service
                                  </ColorButton>
                                </Grid>
                              ) : null}
                              <Grid
                                justify="flex-end"
                                style={{ marginTop: "10px" }}
                              >
                                <ColorButton
                                  size="large"
                                  variant="contained"
                                  color="primary"
                                  // disabled={!isdata}
                                  onClick={() => {
                                    paymentDeduct(
                                      data.totalcharges,
                                      data.shippingid
                                    );
                                  }}
                                >
                                  {isAdmin === true ? "Charge" : "Pay"}
                                </ColorButton>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </List>
            );
          }
        }
      })()}

      {(() => {
        if (parseInt(typepay) === 4) {
          if (duePayment.length === 0) {
            return (
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Grid>
                  <Text
                    style={{
                      fontSize: "20px",
                      fontWeight: "700",
                      marginLeft: "20px",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                    }}
                  >
                    Still now you don't have any Due Payment.
                  </Text>
                </Grid>
              </View>
            );
          } else {
            return (
              <List>
                {duePayment.map((data, index) => (
                  <Grid item xs={12} md={12} lg={12}>
                    <Card className={classes.rootcard} variant="outlined">
                      <CardContent>
                        {/* <Typography
                          style={{
                            fontSize: "13px",
                            fontWeight: 700,
                            color: "#FF0000",
                          }}
                          color="#FF0000"
                          gutterBottom
                        >
                          Due Payment due to Invalid/Incomplete account details
                          for deduct payment.
                        </Typography> */}
                        <Grid container spacing={0}>
                          <Grid
                            container
                            item
                            xs={10}
                            md={2}
                            direction="column"
                            alignItems="flex-start"
                          >
                            <Typography
                              style={{
                                fontSize: "13px",
                                fontWeight: 700,
                                color: "#000",
                              }}
                              color="textSecondary"
                              gutterBottom
                            >
                              Due Payment ID:
                            </Typography>
                            <Typography
                              style={{ fontSize: "12px" }}
                              color="textSecondary"
                            >
                              Description:
                            </Typography>
                            <Typography
                              style={{ fontSize: "12px" }}
                              color="textSecondary"
                            >
                              Deducted from Credit:
                            </Typography>
                            <Typography
                              style={{ fontSize: "12px" }}
                              color="textSecondary"
                            >
                              Amount:
                            </Typography>
                            
                            <Typography
                              style={{ fontSize: "12px" }}
                              color="textSecondary"
                            >
                              Unpaid:
                            </Typography>
                          </Grid>

                          <Grid
                            container
                            item
                            xs={10}
                            md={6}
                            direction="column"
                            alignItems="flex-start"
                          >
                            <Typography
                              style={{
                                fontSize: "13px",
                                fontWeight: 700,
                                color: "#000",
                              }}
                              color="textSecondary"
                              gutterBottom
                            >
                              {data.currenttransactionId}
                            </Typography>
                            {data.description === null ? (<Typography
                              style={{ fontSize: "12px" }}
                              color="textSecondary"
                            >
                              no description
                            </Typography>) : (
                              <Typography
                              style={{ fontSize: "12px" }}
                              color="textSecondary"
                            >
                              {data.description}
                            </Typography>
                            )} 
                            <Typography
                              style={{ fontSize: "12px" }}
                              color="textSecondary"
                            >
                               ${data.transact}
                             
                            </Typography>
                            <Typography
                              style={{ fontSize: "12px" }}
                              color="textSecondary"
                            >
                             ${data.totalamount}
                            </Typography>
                            
                            <Typography
                              style={{ fontSize: "12px" }}
                              color="textSecondary"
                            >
                            {data.unpaid}
                            </Typography>
                            <Grid
                              item
                              style={{ marginLeft: "70px", cursor: "pointer" }}
                            >
                              <Grid
                                justify="flex-end"
                                style={{ marginTop: "10px" }}
                              >
                                <ColorButton
                                  size="large"
                                  variant="contained"
                                  color="primary"
                                  //disabled={!isdata}
                                  onClick={() => {
                                    openEditCharge(data);
                                  }}
                                >
                                  {isAdmin === true ? "Edit Charge" : "Pay"}
                                </ColorButton>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </List>
            );
          }
        }
      })()}
    </View>
  );
}
