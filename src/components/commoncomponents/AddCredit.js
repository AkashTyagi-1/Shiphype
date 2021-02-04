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
  TextInput,
} from "react-native";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import Grid from "@material-ui/core/Grid";
import * as shiphypeService from "./ShipService/shiphype_service";
import Toast from "./feedback/Toast";
import ProgressBar from "./feedback/ProgressBar";
import popUpStyle from "./style/popUpStyle";
import validate from "validate.js";


import Link from "@material-ui/core/Link";
// $50, $100, $250, $500, $1000;

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
    height: "90vh",
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
  paper9: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    borderRadius: "0px",
    overflow: "auto",
    height: "80vh",
  },
  profileMargin1: {
    marginTop: theme.spacing(1),
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
    height: "30px",
    width: "100px",
    fontSize: "12px",
    fontWeight: "550",
    color: "#fff",
    backgroundColor: "#0168fa",
    "&:hover": {
      backgroundColor: "#002080",
    },
  },
}))(Button);

const ColorButtonEdit = withStyles((theme) => ({
  root: {
    color: "#fff",
    borderRadius: "3px",
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    height: "100%",
    width: "150px",
    fontSize: "11px",
    fontWeight: "550",
    color: "#fff",
    backgroundColor: "#D3D3D3",
    "&:hover": {
      backgroundColor: "#D3D3D3",
    },
  },
}))(Button);
const ColorButton21 = withStyles((theme) => ({
  root: {
    color: "#fff",
    borderRadius: "3px",
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    height: "100%",
    width: "180px",
    fontSize: "11px",
    fontWeight: "550",
    color: "#fff",
    backgroundColor: "#00b33c",
    borderColor: "#009933",
    "&:hover": {
      backgroundColor: "#00cc44",
    },
  },
}))(Button);

/**
 * Description:This function is used for Slide17
 * @param {*} props
 */
export default function AddCredit(props) {
  const classes = useStyles();
  const [value, onChangeText] = React.useState("");
  const user_id = props.user_id;
  //const [userid, setUserid] = useState(0);
  const [userData, setUserData] = useState([]);
  const [sourceid, setSourceid] = useState("");
  const [currency, setCurrency] = useState("");
  const [customerid, setCustomerid] = useState("");
  const [cardData, setCardData] = useState([]);
  const [creditData, setCreditData] = React.useState([]);
  const [idempotenctkey, setIdempontencyKey] = React.useState("");

  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [type, setType] = React.useState("");
  const [status, setStatus] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    fetchUserInfo();
    fetchCard();
  }, []);


  const fetchUserInfo = () => {
    //const userid=5;
    setLoading(true);
    shiphypeService
      .fetchUserInfo()
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          console.log("res");
          console.log(response);
          setUserData(response.data);
          console.log(userData);
          for (let a = 0; a < response.data.length; a++) {
            if(response.data[a].userEmail==='')
              {
               var myObject = {};
               response.data[a].id ? (myObject["id"] = response.data[a].id) : null;
               response.data[a].displayName
                 ? (myObject["name"] = response.data[a].displayName)
                 : null;
               newArr.push(myObject);
              }
              else{
               var myObject = {};
               response.data[a].id ? (myObject["id"] = response.data[a].id) : null;
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


  const fetchCard = () => {
    console.log("FETCH CARD=======");
    shiphypeService
      .fetchCreditCard(user_id)
      .then((response) => {
        console.log(response);
        if (response.status === true) {
          setCardData(response.data);
          for (let i = 0; i < response.data.length; i++) {
            console.log("===default card===")
            console.log(response.data[i].defaultcard);
            if (response.data[i].defaultcard === true) {
              // setIsdefault(response.data[i].defaultcard);
              setCurrency(response.data[i].currency)
              setIdempontencyKey(response.data[i].nonce)
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


  const addCredit = () => {
    const amount_money = {
      amount: value,
      currency: currency,
    };

    const source_id = sourceid;
    const customer_id = customerid;
    const autocomplete = true;
    const reference_id = "";
    const note = "no notes";

    const app_fee_money ={
      // amount: "0",
      currency: currency,
    }

    setLoading(true);

    shiphypeService
      .squareupPayment(
        idempotenctkey,
        amount_money,
        source_id,
        customer_id,
        autocomplete,
        reference_id,
        note,
        app_fee_money,
        user_id,
      )
      .then((response) => {
        console.log("status");
        console.log(response.message);
        console.log(response.status);
        if (response.status === true) {
          setCreditData(response.data);
          setOpen(true);
          setType("success");
          setMsg(response.message);
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
  };



  //Show Toast after click event
  const showToast = (open, msg, type) => {
    return (
      <Toast open={open} handleClose={handleClose} type={type} msg={msg} />
    );
  };

  const handleClose = () => {
    setOpen(false);
    if (status === true) {
    console.log("loggg");
    props.UpdatedCredit();
    } else {
    }
  };

  const [data, setData] = React.useState([
    {
      id: 1,
      label: "$100",
      value: "100",
      recomanded: false,
    },
    {
      id: 2,
      label: "$250",
      value: "250",
      recomanded: false,
    },
    {
      id: 3,
      label: "$500",
      value: "500",
      recomanded: false,
    },
    {
      id: 4,
      label: "$1000",
      value: "1000",
      recomanded: true,
    },
    {
      id: 5,
      label: "$2000",
      value: "2000",
      recomanded: false,
    },
  ]);





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
              <Text style={popUpStyle.breadCrundCss1}>DASHBOARD / </Text>
            </Link>
            <Text style={popUpStyle.breadCrundCss2}>
              {" "}
              ACCOUNT SETTING {"\n"}{" "}
            </Text>
          </Grid>
          <Grid item lg={3}></Grid>
        </Grid>
      </View>
      <Grid justify="center">
        <ProgressBar loading={loading} />
      </Grid>
      <View>
        <Grid item xs={12} md={4} lg={4}>
          <Text style={popUpStyle.creditAmountLabel}>
            Please select the credit amount you would like to load:
          </Text>
        </Grid>
        <View style={popUpStyle.CreditAmountCurrencyIcon}>
          <Text>$ {"  "}</Text>
          <TextInput
            style={[popUpStyle.enterAmount,{width: '7%',fontSize: "18px"}]}
            onChangeText={(text) => onChangeText(text)}
            Placeholder={"Enter Amount"}
            value={value}
          />
            <Text style={[{marginLeft: "10px",fontSize: "17px"}]}>USD</Text>
        </View>
        <View style={{ flexDirection: "row" }}>

          {data.map((item) => {
            return (
              <View style={{ margin: 10 }}>
                <ColorButton
                  size="large"
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    onChangeText(item.value);
                  }}
                >
                  {item.label}
                </ColorButton>
                {item.recomanded ? (
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: "13px",
                      marginTop: 5,
                      fontWeight: "700",
                      color: "#000",
                    }}
                  >
                    Recommended
                  </Text>
                ) : null}
              </View>
            );
          })}
        </View>
        {showToast(open, msg, type)}
        <Grid justify="center" style={{ marginLeft: "12%", marginTop: "5%" }}>
          &nbsp;&nbsp;{" "}
          <ColorButton21
            size="large"
            variant="contained"
            color="primary"
            onClick={() => {
            addCredit();
            }}
          >
            CONTINUE
          </ColorButton21>
        </Grid>
      </View>
    </View>
  );
}
