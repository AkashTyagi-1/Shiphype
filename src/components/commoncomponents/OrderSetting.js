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
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import * as shiphypeservice from "./ShipService/shiphype_service";
import Toast from "./feedback/Toast";
import ProgressBar from "./feedback//ProgressBar";

import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

const pickUPTime = [
  {
    id: 1,
    label: "10 AM",
  },
  {
    id: 2,
    label: "11 AM",
  },
  {
    id: 3,
    label: "12 AM",
  },
  {
    id: 4,
    label: "1 PM",
  },
  {
    id: 5,
    label: "2 PM",
  },
  {
    id: 5,
    label: "3 PM",
  },
  {
    id: 6,
    label: "4 PM",
  },
  // {
  //   id: 7,
  //   label: '5 PM',
  // },
  // {
  //   id: 8,
  //   label: '6 PM',
  // },
];

const pickUPTime1 = [
  {
    id: 1,
    label: "10 AM",
  },
  {
    id: 2,
    label: "11 AM",
  },
  {
    id: 3,
    label: "12 AM",
  },
  {
    id: 4,
    label: "1 PM",
  },
  {
    id: 5,
    label: "2 PM",
  },
  {
    id: 5,
    label: "3 PM",
  },
  {
    id: 6,
    label: "4 PM",
  },
  // {
  //   id: 7,
  //   label: '5 PM',
  // },
  // {
  //   id: 8,
  //   label: '6 PM',
  // },
];
const ColorButtonTes = withStyles((theme) => ({
  root: {
    color: "#fff",
    backgroundColor: "#0168fa",
    borderColor: "#0168fa",
    borderRadius: "3px",
    height: 45,
    width: 290,
    fontSize: "11px",
    fontWeight: "700",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
    "&:hover": {
      backgroundColor: "#0168fa",
    },
  },
}))(Button);
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
    height: "80vh",
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
  profileMargin1: {
    marginTop: theme.spacing(1),
    borderRadius: "5px",

    //  marginBottom: theme.spacing(1),
  },
  profileMargin11: {
    marginTop: theme.spacing(2),
    borderRadius: "5px",

    //  marginBottom: theme.spacing(1),
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
  checkBox23: {
    paddingBottom: "0px",
    paddingTop: "0px",
    height: "25px",
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
    height: "80%",
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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
/**
 * Description:This function is used for Slide17
 * @param {*} props
 */
export default function Slide17(props) {
  const classes = useStyles();
  const [shipTimeDate, setShipTimeDate] = React.useState(0);
  const [shipTimeDate1, setShipTimeDate1] = React.useState(0);
  const [shipData, setShipData] = React.useState([]);
  const [orderSettingId, setOrderSettingId] = React.useState(0);
  const userid = props.user_id;
  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [type, setType] = React.useState("");
  const [status, setStatus] = React.useState(false);
  const [optionEnabled, setOptionEnabled] = React.useState(true);
  const [open1, setOpen1] = React.useState(false);
  const [state1, setState1] = useState({
    vertical: "center",
    horizontal: "center",
  });
  const { vertical, horizontal } = state1;
  const [shipProfile, setShipprofiledone] = React.useState(false);

  const [packagingSlipI, setPackagingSlipI] = React.useState("1");
  const [canadaCutOfTime, setCanadaCutOfTime] = React.useState(3);
  const [usCutOfTime, setUsCutOfTime] = React.useState(3);
  const [signtaureRequired, setSigntaureRequired] = React.useState("2");

  const [orderInoivceI, setOrderInvoiceI] = React.useState("4");

  const [otherOptionF, setOtherOptionF] = React.useState(false);
  const [otherOptionS, setOtherOptionS] = React.useState("2");
  const [customerType, setCustomerType] = React.useState("2");
  const [insuranceOptionE, setInsuranceOptionE] = React.useState(false);
  const [insuranceOptionD, setInsuranceOptionD] = React.useState("2");
  const [setCuttofTime, setsetCuttofTime] = React.useState("1");
  const [enatime, enableTime] = React.useState(true);
  const [printsku, setPrintsku] = React.useState(false);
  var screenWidth = Dimensions.get("window").width;

  React.useEffect(() => {
    fetchOrderSetting();
    console.log("screenWidth", screenWidth);
    //   fetchShiphypeCompleteStep();
  }, []);

  React.useEffect(() => {
    fetchWarehouse();
    // fetchShiphypeCompleteStep();
  }, []);

  const fetchWarehouse = () => {
    setLoading(true);
    //  const userid=userid;
    shiphypeservice
      .fetchB2BCustomer(userid)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          //setData(response.data);

          //  setchangedWarehouseid(response.data[0].customertypeId);
          if (response.data[0].selected == true) {
            //  setUpdateData(false);
            setCustomerType("1");
          } else if (response.data[1].selected == true) {
            // setUpdateData(false);
            setCustomerType("2");
          } else {
            // setUpdateData(true);
          }
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

  React.useEffect(() => {
    fetchShiphypeCompleteStep();
  }, []);
  const fetchShiphypeCompleteStep = () => {
    //  const userid=userid;
    shiphypeservice
      .fetchStepCompleteStatus(userid)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          if (response.data.length !== 0) {
            for (let i = 0; i < response.data.length; i++) {
              if (response.data[i].shiphypesubstepId === 14) {
                setShipprofiledone(true);
              } else {
              }
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
  const handleClose3 = () => {
    setOpen1(false);
    // handleNextPage(22);
  };
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
  const fetchOrderSetting = () => {
    //  const userid=5;
    setLoading(true);
    shiphypeservice
      .fetchOrderSetting(userid)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          setShipData(response.data);
          setOrderSettingId(response.data[0].userordersettingId);
          bindData(response.data);
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const bindData = (data) => {
    console.log("bind call", data);
    setShipTimeDate(data[0].selectcutofftime);
    setShipTimeDate1(data[0].canadawarehouse);

    if (data[0].selectcutofftime !== null) {
      setsetCuttofTime("2");
      enableTime(false);
    }
    if (data[0].canadawarehouse !== null) {
      setsetCuttofTime("2");
      enableTime(false);
      setOptionEnabled(false);
    }
    // setSigntaureRequired(data[0].signature);
    // setSigntaureRequired(data[0].selectcutofftime);
    // setSigntaureRequired(data[0].selectcutofftime);
    if (data[0].signature === "1") {
      setSigntaureRequired("1");
    }
    if (data[0].signature === "2") {
      setSigntaureRequired("2");
    }
    if (data[0].addpackingslipinside === "1") {
      setPackagingSlipI("1");
    }

    if (data[0].addpackingslipinside === "2") {
      setPackagingSlipI("2");
    }

    if (data[0].addpackingslipinside === "3") {
      setPackagingSlipI("3");
    }

    if (data[0].addpackingslipinside === "4") {
      setPackagingSlipI("4");
    }

    if (data[0].addinvoiceinside === "1") {
      // setOrderInvoiceI(false);

      setOrderInvoiceI("1");
    }

    if (data[0].addinvoiceinside === "2") {
      setOrderInvoiceI("2");
    }

    if (data[0].addinvoiceinside === "3") {
      setOrderInvoiceI("3");
    }
    if (data[0].addinvoiceinside === "4") {
      setOrderInvoiceI("4");
    }

    if (data[0].shippinginsurance === "1") {
      setOtherOptionS("1");
    }

    if (data[0].shippinginsurance === "2") {
      setOtherOptionS("2");
    }
    if (data[0].customertype === "1") {
      setCustomerType("1");
    }

    if (data[0].customertype === "2") {
      setCustomerType("2");
    }

    if (data[0].disableinsurance === "1") {
      setInsuranceOptionD("1");
    }

    if (data[0].disableinsurance === "2") {
      setInsuranceOptionD("2");
    }
  };

  const addOrderSetting = () => {
    if (shipProfile === false) {
      setOpen1(true);
    } else {
      if (shipData.length === 0) {
        const shipTimeDate2 = shipTimeDate;
        const shipTimeDate3 = shipTimeDate1;
        const packagingSlipNo1 = "0";
        const packagingSlipI1 = packagingSlipI;
        const packagingSlipO1 = "0";
        const packagingSlipB1 = "0";
        const orderInoivceB1 = "0";
        const orderInoivceO1 = "0";
        const orderInoivceI1 = orderInoivceI;
        const otherOptionF1 = otherOptionF;
        const otherOptionS1 = otherOptionS;
        const customerType1 = customerType;
        const insuranceOptionE1 = insuranceOptionE;
        const insuranceOptionD1 = insuranceOptionD;
        const signtaureRequired1 = signtaureRequired;

        shiphypeservice
          .addOrderSetting(
            shipTimeDate2,
            shipTimeDate3,
            packagingSlipNo1,
            packagingSlipI1,
            packagingSlipO1,
            packagingSlipB1,
            orderInoivceI1,
            orderInoivceO1,
            orderInoivceB1,
            otherOptionF1,
            otherOptionS1,
            insuranceOptionE1,
            insuranceOptionD1,
            customerType1,
            userid,
            signtaureRequired1
          )
          .then((response) => {
            console.log("status", response.status);
            if (response.status === true) {
              setOpen(true);
              setType("success");
              setMsg(response.message);
              setStatus(response.status);
              setLoading(false);
              addStepStatus();
              fetchOrderSetting();
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
      } else {
        const orderSettingId1 = orderSettingId;
        const shipTimeDate2 = shipTimeDate;
        const shipTimeDate3 = shipTimeDate1;
        const packagingSlipNo1 = "0";
        const packagingSlipI1 = packagingSlipI;
        const packagingSlipO1 = "0";
        const packagingSlipB1 = "0";
        const orderInoivceB1 = "0";
        const orderInoivceO1 = "0";
        const orderInoivceI1 = orderInoivceI;
        const otherOptionF1 = otherOptionF;
        const otherOptionS1 = otherOptionS;
        const customerType1 = customerType;
        const insuranceOptionE1 = insuranceOptionE;
        const insuranceOptionD1 = insuranceOptionD;
        const signtaureRequired1 = signtaureRequired;

        shiphypeservice
          .updateOrderSetting(
            orderSettingId1,
            shipTimeDate2,
            shipTimeDate3,
            packagingSlipNo1,
            packagingSlipI1,
            packagingSlipO1,
            packagingSlipB1,
            orderInoivceI1,
            orderInoivceO1,
            orderInoivceB1,
            otherOptionF1,
            otherOptionS1,
            insuranceOptionE1,
            insuranceOptionD1,
            customerType1,
            userid,
            signtaureRequired1
          )
          .then((response) => {
            console.log("status", response.status);
            if (response.status === true) {
              setOpen(true);
              setType("success");
              setMsg(response.message);
              setStatus(response.status);
              setLoading(false);
              addStepStatus();
              fetchOrderSetting();
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
  };
  const handleExtraServicePricing = () => {
    window.open("https://shiphype.com/complete-price-list/", "_blank");
  };

  const handlePackagingSlipI = (event) => {
    setPackagingSlipI(event.target.value);
  };

  const handleChangeCutofTime = (event) => {
    setsetCuttofTime(event.target.value);
    if (event.target.value === "1") {
      enableTime(true);
    } else {
      enableTime(false);
    }
  };

  const handleCanadaCutofTime = (event) => {
    setCanadaCutOfTime(parseInt(event.target.value));
  };

  const handleUsCutofTime = (event) => {
    setUsCutOfTime(parseInt(event.target.value));
  };

  const handleOrderInvoiceI = (event) => {
    setOrderInvoiceI(event.target.value);
  };

  const handleOtherOptionS = (event) => {
    setOtherOptionS(event.target.value);
  };

  const handleCustomerType = (event) => {
    setCustomerType(event.target.value);
  };

  const handleSignature = (event) => {
    setSigntaureRequired(event.target.value);
  };
  const handleInsuranceOptionE = (event) => {
    setInsuranceOptionE(event.target.checked);
  };

  const handleInsuranceOptionD = (event) => {
    setInsuranceOptionD(event.target.value);
  };
  /**
   * Description:To do set value of checkbox
   * @param {*} event
   */
  const handleChangeprintsku = (event) => {
    setPrintsku(event.target.checked);
  };

  const addStepStatus = () => {
    setLoading(true);

    // const userid=user_id;
    const shiphypesubsubstepId = 0;
    const shiphypesubstepId = 15;
    const shiphypestepId = 0;
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
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChangeShipDateTime = (event) => {
    setShipTimeDate(event.target.value);
    setOptionEnabled(false);
  };
  const handleChangeShipDateTime1 = (event) => {
    setShipTimeDate1(event.target.value);
    setOptionEnabled(false);
  };
  const handleStartDateChange = (date, value) => {
    setStartsprint(value);
    setSelectedStartDate(date);
    console.log("startdate", value);
  };

  React.useEffect(() => {
    // fetchCustomePackageingList();
    //   fetchShiphypeCompleteStep();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };
  const showToast = (open, msg, type) => {
    return (
      <Toast open={open} handleClose={handleClose} type={type} msg={msg} />
    );
  };

  return (
    <View className={widthScreen}>
      <Grid justify="center">
        <ProgressBar loading={loading} />
      </Grid>
      <View>
        <form className={classes.form}>
          <Grid
            justify="space-between" // Add it here :)
            container
            spacing={2}
            style={{ marginLeft: "3px" }}
          >
            <Grid item xs={12} md={5} lg={6}>
              <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                key={`${vertical},${horizontal}`}
                open={open1}
                autoHideDuration={3000}
                onClose={handleClose3}
              >
                <Alert onClose={handleClose3} severity="error">
                  First Complete the Recieve Settting Steps.
                </Alert>
              </Snackbar>

              <Grid item xs={10}>
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
                  {"\n"}Order Settings
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
                  {"\n"}You can customize your order settings on this page.{" "}
                  {"\n"}
                </Text>
              </Grid>
              <Grid item xs={10}>
                <Text
                  style={{
                    fontSize: "13px",
                    fontWeight: "700",
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                    color: "#001737",
                    marginTop: "10px",
                    transition: "all 0.25s",
                  }}
                >
                  {"\n"}Select Cutoff Time
                </Text>
              </Grid>
              <Grid item xs={10}>
                <FormGroup>
                  <FormControl component="fieldset">
                    <RadioGroup
                      aria-label="carries"
                      name="carries"
                      value={setCuttofTime}
                      onChange={handleChangeCutofTime}
                    >
                      <FormControlLabel
                        value="1"
                        className={classes.checkBox23}
                        control={<Radio color="primary" />}
                        label={
                          <Text
                            style={{
                              fontSize: "12px",
                              // fontWeight: '700',
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              color: "#001737",

                              transition: "all 0.25s",
                            }}
                          >
                            Default Cutoff Time (12PM)
                          </Text>
                        }
                      />
                      <FormControlLabel
                        value="2"
                        className={classes.checkBox23}
                        control={<Radio color="primary" />}
                        label={
                          <Text
                            style={{
                              fontSize: "12px",
                              // fontWeight: '700',
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              color: "#001737",

                              transition: "all 0.25s",
                            }}
                          >
                            Custom Cutoff Time
                          </Text>
                        }
                      />
                    </RadioGroup>
                  </FormControl>
                </FormGroup>
              </Grid>

              <Grid item xs={10}>
                <TextField
                  id="outlined-select-currency-native"
                  select
                  fullWidth
                  //   label="US Warehouse"
                  value={shipTimeDate}
                  disabled={enatime}
                  onChange={handleChangeShipDateTime}
                  SelectProps={{
                    native: true,
                  }}
                  size="small"
                  type="text"
                  className={classes.profileMargin11}
                  style={{
                    fontSize: "12px",
                    //fontWeight: '700',
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                  }}
                  variant="outlined"
                >
                  <option
                    value="0"
                    disabled
                    style={{
                      fontSize: "14px",
                      //fontWeight: '700',
                      paddingLeft: "15px",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                    }}
                  >
                    US Warehouse
                  </option>

                  {pickUPTime.map((option) => (
                    <option
                      style={{
                        fontSize: "14px",
                        //fontWeight: '700',
                        paddingLeft: "15px",
                        cursor: "pointer",
                        fontFamily:
                          '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                      }}
                      key={option.id}
                      value={option.id}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  id="outlined-select-currency-native"
                  select
                  fullWidth
                  //  label="Canada Warehouse"
                  value={shipTimeDate1}
                  disabled={enatime}
                  onChange={handleChangeShipDateTime1}
                  SelectProps={{
                    native: true,
                  }}
                  size="small"
                  type="text"
                  className={classes.profileMargin11}
                  style={{
                    fontSize: "12px",
                    //fontWeight: '700',
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                  }}
                  variant="outlined"
                >
                  <option
                    value="0"
                    disabled
                    style={{
                      fontSize: "14px",
                      //fontWeight: '700',
                      paddingLeft: "15px",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                    }}
                  >
                    Canada Warehouse
                  </option>

                  {pickUPTime1.map((option) => (
                    <option
                      style={{
                        fontSize: "14px",
                        //fontWeight: '700',
                        paddingLeft: "15px",
                        cursor: "pointer",
                        fontFamily:
                          '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                      }}
                      key={option.id}
                      value={option.id}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={10}>
                <Text
                  style={{
                    fontSize: "14px",
                    fontWeight: "700",
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                    color: "#001737",
                    marginTop: "10px",
                    transition: "all 0.25s",
                  }}
                >
                  {"\n"}Packing Slip
                </Text>
              </Grid>
              <Grid item xs={10}>
                <FormGroup>
                  <FormControl component="fieldset">
                    <RadioGroup
                      aria-label="carries"
                      name="carries"
                      value={packagingSlipI}
                      onChange={handlePackagingSlipI}
                    >
                      <FormControlLabel
                        value="1"
                        className={classes.checkBox23}
                        control={<Radio color="primary" />}
                        label={
                          <Text
                            style={{
                              fontSize: "12px",
                              // fontWeight: '700',
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              color: "#001737",

                              transition: "all 0.25s",
                            }}
                          >
                            No Packing Slips
                          </Text>
                        }
                      />
                      <FormControlLabel
                        value="2"
                        className={classes.checkBox23}
                        control={<Radio color="primary" />}
                        label={
                          <Text
                            style={{
                              fontSize: "12px",
                              // fontWeight: '700',
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              color: "#001737",

                              transition: "all 0.25s",
                            }}
                          >
                            Add Packing Slip Inside
                          </Text>
                        }
                      />
                      <FormControlLabel
                        value="3"
                        className={classes.checkBox23}
                        control={<Radio color="primary" />}
                        label={
                          <Text
                            style={{
                              fontSize: "12px",
                              // fontWeight: '700',
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              color: "#001737",

                              transition: "all 0.25s",
                            }}
                          >
                            Add Packing Slip Outside
                          </Text>
                        }
                      />
                      <FormControlLabel
                        value="4"
                        className={classes.checkBox23}
                        control={<Radio color="primary" />}
                        label={
                          <Text
                            style={{
                              fontSize: "12px",
                              // fontWeight: '700',
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              color: "#001737",

                              transition: "all 0.25s",
                            }}
                          >
                            Add Packing Slip Inside + Outside
                          </Text>
                        }
                      />
                    </RadioGroup>
                  </FormControl>
                </FormGroup>
              </Grid>
              <Grid item xs={10}>
                <Text
                  style={{
                    fontSize: "14px",
                    fontWeight: "700",
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                    color: "#001737",
                    marginTop: "10px",
                    transition: "all 0.25s",
                  }}
                >
                  {"\n"}Order Invoice
                </Text>
              </Grid>
              <Grid item xs={10}>
                <FormGroup>
                  <FormControl component="fieldset">
                    <RadioGroup
                      aria-label="carries"
                      name="carries"
                      value={orderInoivceI}
                      onChange={handleOrderInvoiceI}
                    >
                      <FormControlLabel
                        value="4"
                        className={classes.checkBox23}
                        control={<Radio color="primary" />}
                        label={
                          <Text
                            style={{
                              fontSize: "12px",
                              // fontWeight: '700',
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              color: "#001737",

                              transition: "all 0.25s",
                            }}
                          >
                            No Invoice{" "}
                          </Text>
                        }
                      />
                      <FormControlLabel
                        value="1"
                        className={classes.checkBox23}
                        control={<Radio color="primary" />}
                        label={
                          <Text
                            style={{
                              fontSize: "12px",
                              // fontWeight: '700',
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              color: "#001737",

                              transition: "all 0.25s",
                            }}
                          >
                            Add Invoice Inside
                          </Text>
                        }
                      />
                      <FormControlLabel
                        value="2"
                        className={classes.checkBox23}
                        control={<Radio color="primary" />}
                        label={
                          <Text
                            style={{
                              fontSize: "12px",
                              // fontWeight: '700',
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              color: "#001737",

                              transition: "all 0.25s",
                            }}
                          >
                            Add Invoice Outside
                          </Text>
                        }
                      />
                      <FormControlLabel
                        value="3"
                        className={classes.checkBox23}
                        control={<Radio color="primary" />}
                        label={
                          <Text
                            style={{
                              fontSize: "12px",
                              // fontWeight: '700',
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              color: "#001737",

                              transition: "all 0.25s",
                            }}
                          >
                            Add Invoice Inside + Outside
                          </Text>
                        }
                      />
                    </RadioGroup>
                  </FormControl>
                </FormGroup>
              </Grid>
              <Grid item xs={10}>
                <Text
                  style={{
                    fontSize: "14px",
                    fontWeight: "700",
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                    color: "#001737",
                    marginTop: "10px",
                    transition: "all 0.25s",
                  }}
                >
                  {"\n"}Item Fragility
                </Text>
              </Grid>
              <Grid item xs={10}>
                <FormGroup>
                  <FormControl component="fieldset">
                    <RadioGroup
                      aria-label="carries"
                      name="carries"
                      value={otherOptionS}
                      onChange={handleOtherOptionS}
                    >
                      <FormControlLabel
                        value="2"
                        className={classes.checkBox23}
                        control={<Radio color="primary" />}
                        label={
                          <Text
                            style={{
                              fontSize: "12px",
                              // fontWeight: '700',
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              color: "#001737",

                              transition: "all 0.25s",
                            }}
                          >
                            Standard Item
                          </Text>
                        }
                      />
                      <FormControlLabel
                        value="1"
                        className={classes.checkBox23}
                        control={<Radio color="primary" />}
                        label={
                          <Text
                            style={{
                              fontSize: "12px",
                              // fontWeight: '700',
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              color: "#001737",

                              transition: "all 0.25s",
                            }}
                          >
                            Fragile Item (Extra Bubble Bag)
                          </Text>
                        }
                      />
                    </RadioGroup>
                  </FormControl>
                </FormGroup>
              </Grid>

              <Grid item xs={10}>
                <Text
                  style={{
                    fontSize: "14px",
                    fontWeight: "700",
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                    color: "#001737",
                    marginTop: "10px",
                    transition: "all 0.25s",
                  }}
                >
                  {"\n"}Shipping Insurance
                </Text>
              </Grid>
              <Grid item xs={10}>
                <FormGroup>
                  <FormControl component="fieldset">
                    <RadioGroup
                      aria-label="carries"
                      name="carries"
                      value={insuranceOptionD}
                      onChange={handleInsuranceOptionD}
                    >
                      <FormControlLabel
                        value="2"
                        className={classes.checkBox23}
                        control={<Radio color="primary" />}
                        label={
                          <Text
                            style={{
                              fontSize: "12px",
                              // fontWeight: '700',
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              color: "#001737",

                              transition: "all 0.25s",
                            }}
                          >
                            Disable Insurance
                          </Text>
                        }
                      />
                      <FormControlLabel
                        value="1"
                        className={classes.checkBox23}
                        control={<Radio color="primary" />}
                        label={
                          <Text
                            style={{
                              fontSize: "12px",
                              // fontWeight: '700',
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              color: "#001737",

                              transition: "all 0.25s",
                            }}
                          >
                            Enable Insurance
                          </Text>
                        }
                      />
                    </RadioGroup>
                  </FormControl>
                </FormGroup>
              </Grid>

              <Grid item xs={10}>
                <Text
                  style={{
                    fontSize: "14px",
                    fontWeight: "700",
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                    color: "#001737",
                    marginTop: "10px",
                    transition: "all 0.25s",
                  }}
                >
                  {"\n"}Signature Required
                </Text>
              </Grid>
              <Grid item xs={10}>
                <FormGroup>
                  <FormControl component="fieldset">
                    <RadioGroup
                      aria-label="carries"
                      name="carries"
                      value={signtaureRequired}
                      onChange={handleSignature}
                    >
                      <FormControlLabel
                        value="2"
                        className={classes.checkBox23}
                        control={<Radio color="primary" />}
                        label={
                          <Text
                            style={{
                              fontSize: "12px",
                              // fontWeight: '700',
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              color: "#001737",

                              transition: "all 0.25s",
                            }}
                          >
                            No
                          </Text>
                        }
                      />
                      <FormControlLabel
                        value="1"
                        className={classes.checkBox23}
                        control={<Radio color="primary" />}
                        label={
                          <Text
                            style={{
                              fontSize: "12px",
                              // fontWeight: '700',
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              color: "#001737",

                              transition: "all 0.25s",
                            }}
                          >
                            Yes
                          </Text>
                        }
                      />
                    </RadioGroup>
                  </FormControl>
                </FormGroup>
              </Grid>

              <Grid item xs={10}>
                <Text
                  style={{
                    fontSize: "14px",
                    fontWeight: "700",
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                    color: "#001737",
                    marginTop: "10px",
                    transition: "all 0.25s",
                  }}
                >
                  {"\n"}Default Customer Type
                </Text>
              </Grid>
              <Grid item xs={10}>
                <FormGroup>
                  <FormControl component="fieldset">
                    <RadioGroup
                      aria-label="carries"
                      name="carries"
                      value={customerType}
                      onChange={handleCustomerType}
                    >
                      <FormControlLabel
                        value="2"
                        className={classes.checkBox23}
                        control={<Radio color="primary" />}
                        label={
                          <Text
                            style={{
                              fontSize: "12px",
                              // fontWeight: '700',
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              color: "#001737",

                              transition: "all 0.25s",
                            }}
                          >
                            B2C (Individuals)
                          </Text>
                        }
                      />
                      <FormControlLabel
                        value="1"
                        className={classes.checkBox23}
                        control={<Radio color="primary" />}
                        label={
                          <Text
                            style={{
                              fontSize: "12px",
                              // fontWeight: '700',
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              color: "#001737",

                              transition: "all 0.25s",
                            }}
                          >
                            B2B (Businesses)
                          </Text>
                        }
                      />
                    </RadioGroup>
                  </FormControl>
                </FormGroup>
              </Grid>

              <Grid
                container
                item
                xs={12}
                justify="flex-start"
                style={{ marginRight: "10px" }}
              >
                <Grid>
                  <ColorButton
                    size="large"
                    variant="contained"
                    color="primary"
                    className={classes.profileMargin1}
                    onClick={() => {
                      addOrderSetting();
                    }}
                  >
                    Save
                  </ColorButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Grid xs={10}>
                <Grid justify="center" container>
                  <Text
                    style={{
                      fontSize: "18px",
                      fontWeight: "700",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                      color: "#001737",
                      marginTop: "10px",
                      transition: "all 0.25s",
                    }}
                  >
                    {"\n"}
                    {"\n"}
                    {"\n"}
                    {"\n"}SCROLL DOWN FOR MORE OPTIONS
                  </Text>
                </Grid>
              </Grid>
              <Grid xs={10}>
                <Grid justify="center" container>
                  <ColorButtonTes
                    size="large"
                    variant="contained"
                    color="primary"
                    className={classes.profileMargin}
                    //  className={clsx((checkedA!==1) && classes.normal, (checkedA === 1) && classes.normalSelected)}
                    onClick={() => {
                      handleExtraServicePricing();
                    }}
                  >
                    Extra Services Pricing
                  </ColorButtonTes>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>

        {showToast(open, msg, type)}
      </View>
    </View>
  );
}
