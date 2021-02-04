import {
  fade,
  withStyles,
  makeStyles,
  useTheme,
} from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";

import {
  Platform,
  View,
  ScrollView,
  Image,
  Text,
  Dimensions,
  TextInput,
} from "react-native";
import * as shiphypeservice from "./ShipService/shiphype_service";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
// import {
//   Table,
//   THead,
//   TH,
//   TBody,
//   TFoot,
//   TR,
//   TD,
//   Caption,
//   B,
//   BR,
// } from '@expo/html-elements';
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
  profileMargin10: {
    marginTop: theme.spacing(2),
    border: "1px solid #cccccc",
    padding: "2%",
  },
  profileMargin1: {
    // border : '1px solid #cccccc',
    //  padding:'1%',
    marginLeft: "8px",
  },
  button2: {
    //border : ' 1px solid #cccccc',
    //  borderRadius : '5px',
    paddingTop: "1%",
    paddingBottom: "1%",
    paddingLeft: "0%",
    paddingRight: "0%",
    textTransform: "none",
    color: "#0158d4",
  },
  buttonGreen: {
    paddingTop: "1%",
    paddingBottom: "1%",
    paddingLeft: "0%",
    paddingRight: "0%",
    textTransform: "none",
    color: "#00b300",
  },
  checkBox23: {
    paddingBottom: "0px",
    paddingTop: "0px",
    height: "25px",
  },
  checkBoxColor: {
    color: "#0158d4",
  },
  profileMargin11: {
    marginTop: theme.spacing(2),
    borderRadius: "5px",

    //  marginBottom: theme.spacing(1),
  },
  // grid: {
  //   width: 100,
  //   height: 100,
  // },
}));

const arr = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
];

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

/**
 * Description:This function is used for Slide17
 * @param {*} props
 */
export default function PrintInternalPackagingSlip(props) {
  const [loading, setLoading] = React.useState(true);
  const classes = useStyles();
  const [Orderdate, setOrderdate] = React.useState("");
  const [OrderTime, setOrderTime] = React.useState("");
  const [OrderID, setOrederID] = React.useState("");
  const [OrderID1, setOrederID1] = React.useState("");
  const [shippingSerice, setShippingSerives] = React.useState("");
  const [Companyname, setcompanyname] = React.useState("");
  const [Email, setemail] = React.useState("");

  const [shippingmethod, setshippingmethod] = React.useState("");
  const [useremail, setUserEmail] = React.useState("");
  const [companyname, setCompanyname] = React.useState("");

  const [ItemTotal, setItemTotal] = React.useState("");
  const [PackagingTotal, setPackagingTotal] = React.useState("");
  const [PromotionalTotal, setpromotionalItemTotal] = React.useState("");

  const [TotalQty, setTotalQTY] = React.useState("");
  const [PackagingTotalQty, setPackagingTotalQTY] = React.useState("");
  const [PromotionalTotalQty, setpromotionalTotalQTY] = React.useState("");

  const [ProductList, setproductList] = React.useState([]);
  const [PackagingList, setpackagingList] = React.useState([]);
  const [PromotionalList, setpromotionalList] = React.useState([]);
  const [setCuttofTime, setsetCuttofTime] = React.useState(
    "Default Cutoff Time (12PM)"
  );
 
  const [packagingSlipI, setPackagingSlipI] = React.useState(
    "No Packing Slips"
  );
 
  const [signtaureRequired, setSigntaureRequired] = React.useState("No");

  const [orderInoivceI, setOrderInvoiceI] = React.useState(
    "Add Invoice Inside"
  );

 
  const [otherOptionS, setOtherOptionS] = React.useState(
    "Fragile Item (Extra Bubble Bag)"
  );
  const [customerType, setCustomerType] = React.useState("B2B (Businesses)");
 
  const [insuranceOptionD, setInsuranceOptionD] = React.useState(
    "Enable Insurance"
  );

  React.useEffect(() => {
    console.log("components======");
    let search = window.location.search;
    let params = new URLSearchParams(search);
    console.log(params);
    console.log("params");
    let shiphype_id = params.get("shiphype_id");
    let user_id = params.get("user_id");

    let shippingmethod = params.get("shippingmethod");
    let useremail = params.get("useremail");
    let companyname = params.get("companyname");
    //let multipleidselect = params.get("multipleidselect");

    setshippingmethod(shippingmethod);
    setUserEmail(useremail);
    setCompanyname(companyname);
    //console.log("multipleidselect", multipleidselect);
    console.log(shiphype_id);
    console.log("shiphype_id");

    console.log(user_id);
    console.log("user_id");

    fetchOrderDetails(shiphype_id, user_id);
    fetchOrderSetting(user_id);
  }, []);

  const fetchOrderSetting = (userid) => {
    //  const userid=5;
    //setLoading(true);
    shiphypeservice
      .fetchOrderSetting(userid)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          //setLoading(false);
          //setShipData(response.data);
          // setOrderSettingId(response.data[0].userordersettingId);
          // bindData(response.data);

          if (response.data[0].selectcutofftime !== null) {
            setsetCuttofTime("Custom Cutoff Time");
          }
          if (response.data[0].canadawarehouse !== null) {
            setsetCuttofTime("Custom Cutoff Time");
          }
          if (response.data[0].addpackingslipinside === "1") {
            setPackagingSlipI("No Packing Slips");
          }

          if (response.data[0].addpackingslipinside === "2") {
            setPackagingSlipI("Add Packing Slip Inside");
          }

          if (response.data[0].addpackingslipinside === "3") {
            setPackagingSlipI("Add Packing Slip Outside");
          }

          if (response.data[0].addpackingslipinside === "4") {
            setPackagingSlipI("Add Packing Slip Inside + Outside");
          }

          if (response.data[0].addinvoiceinside === "1") {
            // setOrderInvoiceI(false);

            setOrderInvoiceI("Add Invoice Inside");
          }

          if (response.data[0].addinvoiceinside === "2") {
            setOrderInvoiceI("Add Invoice Outside");
          }

          if (response.data[0].addinvoiceinside === "3") {
            setOrderInvoiceI(" Add Invoice Inside + Outside");
          }
          if (response.data[0].addinvoiceinside === "4") {
            setOrderInvoiceI("No Invoice");
          }

          if (response.data[0].shippinginsurance === "1") {
            setOtherOptionS("Fragile Item (Extra Bubble Bag)");
          }

          if (response.data[0].shippinginsurance === "2") {
            setOtherOptionS("Standard Item");
          }
          if (response.data[0].customertype === "1") {
            setCustomerType("B2B (Businesses)");
          }

          if (response.data[0].customertype === "2") {
            setCustomerType("B2C (Individuals)");
          }

          if (response.data[0].disableinsurance === "1") {
            setInsuranceOptionD("Enable Insurance");
          }

          if (response.data[0].disableinsurance === "2") {
            setInsuranceOptionD("Disable Insurance");
          }

          if (response.data[0].signature === "1") {
            setSigntaureRequired("Yes");
          }
          if (response.data[0].signature === "2") {
            setSigntaureRequired("No");
          }
        } else {
          // setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  var pack = [];
  var promo = [];
  const fetchOrderDetails = (internalorder_id, userid) => {
    //const userid=5;
    setLoading(true);
    shiphypeservice
      .fetchOrderDetails(internalorder_id, userid)
      .then((response) => {
        console.log(response);
        console.log("response======");
        console.log("status", response.status);
        if (response.status === true) {
          console.log(response);
          console.log("fetchOrderDetails=======");
          console.log(response.data[0].product);
          console.log(response.data[0].orderdate);

          var str = response.data[0].orderdate.split("T");
          var DateOrder = str;

          setOrderdate(DateOrder[0]);
          setOrderTime(DateOrder[1]);
          setOrederID(response.data[0].internalorderId);
          setOrederID1(response.data[0].sellerorderid);
          if (response.data[0].shipmenttype === "1") {
            setShippingSerives("Standard Shipping");
          } else if (response.data[0].shipmenttype === "2") {
            setShippingSerives("2-Day Shipping");
          } else if (response.data[0].shipmenttype === "3") {
            setShippingSerives("Overnight Shipping");
          } else if (response.data[0].shipmenttype === "4") {
            setShippingSerives("Stamped Postage");
          } else if (response.data[0].shipmenttype === "5") {
            setShippingSerives("Oversize LetterMail");
          } else if (response.data[0].shipmenttype === "6") {
            setShippingSerives("Pallet Freight");
          }else if(response.data[0].shipmenttype === "10"){
            setShippingSerives("Custom Shipping Label");
          }
          // else{
          //   setShippingSerives('Standard Shipping');

          // }
          //  setShippingSerives()
          setcompanyname(response.data[0].customer.companyname);
          setemail(response.data[0].customer.email);

          if (response.data[0].product.length > 0) {
            for (let k = 0; k < response.data[0].product.length; k++) {
              if (response.data[0].product[k].productpackaging.length > 0) {
                response.data[0].product[k].productpackaging[0].torontostock =
                  response.data[0].product[k].productquantity;
                pack.push(response.data[0].product[k].productpackaging[0]);
              }
              if (
                response.data[0].product[k].productpromotionalpackaging.length >
                0
              ) {
                response.data[0].product[
                  k
                ].productpromotionalpackaging[0].torontostock =
                  response.data[0].product[k].productquantity;
                promo.push(
                  response.data[0].product[k].productpromotionalpackaging[0]
                );
              }
            }

            console.log("in======");
            setproductList(response.data[0].product);
            setItemTotal(response.data[0].product.length);
            let amount = response.data[0].product.reduce(
              (prev, next) => prev + next.productquantity,
              0
            );
            setTotalQTY(amount);

            setpackagingList(pack);
            //  setPackagingTotal(pack.length)
            setpromotionalList(promo);
            //setpromotionalItemTotal(promo.length)
          }

          //     if (response.data[0].orderpackaging.length > 0) {
          //       console.log('in======');
          //       setpackagingList(response.data[0].orderpackaging);
          //       setPackagingTotal(response.data[0].orderpackaging.length)
          //       let amount = response.data[0].orderpackaging.reduce(
          //   (prev, next) => prev + next.packagingquantity,
          //   0,
          // );
          //       setPackagingTotalQTY(amount);
          //     }

          //     if (response.data[0].orderpromotionalinsert.length > 0) {
          //       console.log('in======');
          //       setpromotionalList(response.data[0].orderpromotionalinsert);
          //       setpromotionalItemTotal(response.data[0].orderpromotionalinsert.length)
          //       let amount = response.data[0].orderpromotionalinsert.reduce(
          //   (prev, next) => prev + next.promotionalinsertquantity,
          //   0,
          // );
          //       setpromotionalTotalQTY(amount);
          //     }
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
     <ScrollView>
      {arr.map((item) => {
        return (
         
          <View
            style={{
              height: "auto",
              backgroundColor: "#FFFFFF",
              width: "100%",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: "1%",
                  marginLeft: "1%",
                }}
              >
                <Text
                  style={{
                    fontSize: "16px",
                    display: "inline-block",
                    fontWeight: "700",
                    width: "120%",
                  }}
                >
                  ShipHype ID :{" "}
                </Text>

                <Text
                  style={{
                    color: "#000",
                    fontSize: 16,
                    fontWeight: "400",
                  }}
                >
                  {OrderID}
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: "1%",
                  marginLeft: "1%",
                }}
              >
                <Text
                  style={{
                    fontSize: "16px",
                    display: "inline-block",
                    fontWeight: "700",
                    width: "120%",
                  }}
                >
                  Order :{" "}
                </Text>

                <Text
                  style={{
                    color: "#000",
                    fontSize: 16,
                    fontWeight: "400",
                  }}
                >
                  {OrderID1}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginLeft: "1%",
                marginVertical: 2,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "#000",
                  fontWeight: "700",
                }}
              >
                Order Date :{" "}
              </Text>
              <Text
                style={{
                  color: "#000",
                  fontSize: 16,
                  fontWeight: "400",
                }}
              >
                {Orderdate}
                {"  "}
              </Text>
              <Text
                style={{
                  color: "#000",
                  fontSize: 16,
                  fontWeight: "400",
                }}
              >
                {OrderTime}{" "}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginLeft: "1%",
                marginBottom: "1%",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "#000",
                  fontWeight: "700",
                }}
              >
                Shipping Method :{" "}
              </Text>

              <Text
                style={{
                  color: "#000",
                  fontSize: 16,
                  fontWeight: "400",
                }}
              >
                {shippingSerice}
              </Text>
            </View>

            <View
              style={{
                height: "100%",
                backgroundColor: "#FFFFFF",
                width: "100%",
              }}
            >
              <View
                style={{
                  width: "98%",
                  borderWidth: 1,
                  bordercolor: "#000",
                  justifyContent: "center",
                  marginLeft: "1%",
                  marginTop: "2%",
                  height: "4%",
                }}
              >
                <Text
                  style={{
                    fontWeight: "700",
                    color: "#000",
                    fontSize: 16,
                    marginLeft: "1%",
                  }}
                >
                  Products
                </Text>
              </View>

              <View
                style={{
                  width: "98%",
                  borderWidth: 1,
                  bordercolor: "#000",
                  height: "4%",
                  flexDirection: "row",
                  marginLeft: "1%",
                }}
              >
                <Text
                  style={{
                    fontWeight: "700",
                    color: "#000",
                    fontSize: 15,
                    alignSelf: "center",
                    width: "30%",
                    textAlign: "center",
                  }}
                >
                  SKU
                </Text>
                <View style={{ borderWidth: 1, bordercolor: "#000" }} />

                <Text
                  style={{
                    fontWeight: "700",
                    color: "#000",
                    fontSize: 15,
                    alignSelf: "center",
                    width: "20%",
                    textAlign: "center",
                  }}
                >
                  ITEM NAME
                </Text>
                <View style={{ borderWidth: 1, bordercolor: "#000" }} />
                <Text
                  style={{
                    fontWeight: "700",
                    color: "#000",
                    fontSize: 15,
                    alignSelf: "center",
                    textAlign: "center",
                    width: "15%",
                  }}
                >
                  DANGEROUS GOODS
                </Text>
                <View style={{ borderWidth: 1, bordercolor: "#000" }} />
                <Text
                  style={{
                    fontWeight: "700",
                    color: "#000",
                    fontSize: 15,
                    alignSelf: "center",
                    width: "10%",
                    textAlign: "center",
                  }}
                >
                  SHIPHYPE SKU
                </Text>
                <View style={{ borderWidth: 1, bordercolor: "#000" }} />
                <Text
                  style={{
                    fontWeight: "700",
                    color: "#000",
                    fontSize: 15,
                    alignSelf: "center",
                    textAlign: "center",
                    width: "10%",
                  }}
                >
                  SHIPPED
                </Text>
                <View style={{ borderWidth: 1, bordercolor: "#000" }} />
                <Text
                  style={{
                    fontWeight: "700",
                    color: "#000",
                    fontSize: 15,
                    alignSelf: "center",
                    textAlign: "center",
                    width: "10%",
                  }}
                >
                  SERIAL NUMBER
                </Text>
                <View style={{ borderWidth: 1, bordercolor: "#000" }} />
                <Text
                  style={{
                    fontWeight: "700",
                    color: "#000",
                    fontSize: 15,
                    alignSelf: "center",
                    textAlign: "center",
                    width: "5%",
                  }}
                >
                  QTY
                </Text>
              </View>

              {ProductList.map((item, index) => {
                return (
                  <View
                    style={{
                      width: "98%",
                      borderWidth: 1,
                      bordercolor: "#000",
                      height: "5%",
                      flexDirection: "row",
                      marginLeft: "1%",
                    }}
                  >
                    <Text
                      style={{
                        color: "#000",
                        fontSize: 15,
                        alignSelf: "center",
                        width: "30%",
                        textAlign: "center",
                      }}
                    >
                      {item.productsku}
                    </Text>
                    <View style={{ borderWidth: 1, bordercolor: "#000" }} />

                    <Text
                      style={{
                        color: "#000",
                        fontSize: 15,
                        alignSelf: "center",
                        width: "20%",
                        textAlign: "center",
                      }}
                    >
                      {item.productname}
                    </Text>
                    <View style={{ borderWidth: 1, bordercolor: "#000" }} />

                    <Text
                      style={{
                        color: "#000",
                        fontSize: 15,
                        alignSelf: "center",
                        width: "15%",
                        textAlign: "center",
                      }}
                    >
                      {item.dangerousgoods === true ? "Yes" : "No"}
                    </Text>

                    <View style={{ borderWidth: 1, bordercolor: "#000" }} />
                    <Text
                      style={{
                        color: "#000",
                        fontSize: 15,
                        alignSelf: "center",
                        width: "10%",
                        textAlign: "center",
                      }}
                    >
                      {item.shiphypeSku}
                    </Text>
                    <View style={{ borderWidth: 1, bordercolor: "#000" }} />
                    <Text
                      style={{
                        color: "#000",
                        fontSize: 15,
                        alignSelf: "center",
                        textAlign: "center",
                        width: "10%",
                      }}
                    />
                    <View style={{ borderWidth: 1, bordercolor: "#000" }} />
                    <Text
                      style={{
                        color: "#000",
                        fontSize: 15,
                        alignSelf: "center",
                        textAlign: "center",
                        width: "10%",
                      }}
                    >
                      {item.serialnovalue}
                    </Text>
                    <View style={{ borderWidth: 1, bordercolor: "#000" }} />

                    {item.productquantity > 1 ? (
                      <Text
                        style={{
                          color: "#000",
                          fontSize: 17,
                          alignSelf: "center",
                          textAlign: "center",
                          fontWeight: "bold",
                          width: "5%",
                        }}
                      >
                        {item.productquantity}
                      </Text>
                    ) : (
                      <Text
                        style={{
                          color: "#000",
                          fontSize: 15,
                          alignSelf: "center",
                          textAlign: "center",
                          width: "5%",
                        }}
                      >
                        {item.productquantity}
                      </Text>
                    )}
                  </View>
                );
              })}

              <View
                style={{
                  width: "98%",
                  borderWidth: 1,
                  bordercolor: "#000",
                  justifyContent: "center",
                  marginLeft: "1%",
                  marginTop: "2%",
                  height: "4%",
                }}
              >
                <Text
                  style={{
                    fontWeight: "700",
                    color: "#000",
                    fontSize: 16,
                    marginLeft: "1%",
                  }}
                >
                  Packaging
                </Text>
              </View>

              <View
                style={{
                  width: "98%",
                  borderWidth: 1,
                  bordercolor: "#000",
                  height: "4%",
                  flexDirection: "row",
                  marginLeft: "1%",
                }}
              >
                <Text
                  style={{
                    fontWeight: "700",
                    color: "#000",
                    fontSize: 15,
                    alignSelf: "center",
                    width: "20%",
                    textAlign: "center",
                  }}
                >
                  SKU
                </Text>
                <View style={{ borderWidth: 1, bordercolor: "#000" }} />

                <Text
                  style={{
                    fontWeight: "700",
                    color: "#000",
                    fontSize: 15,
                    alignSelf: "center",
                    width: "40%",
                    textAlign: "center",
                  }}
                >
                  ITEM NAME
                </Text>
                <View style={{ borderWidth: 1, bordercolor: "#000" }} />
                <Text
                  style={{
                    fontWeight: "700",
                    color: "#000",
                    fontSize: 15,
                    alignSelf: "center",
                    width: "20%",
                    textAlign: "center",
                  }}
                >
                  SHIPHYPE SKU
                </Text>
                {/* <View style={{borderWidth: 1, bordercolor: '#000'}} />
          <Text
            style={{
              fontWeight: '700',
              color: '#000',
              fontSize: 15,
              alignSelf: 'center',
              textAlign: 'center',
              width: '15%',
            }}
          >
            SHIPPED
          </Text>
          <View style={{borderWidth: 1, bordercolor: '#000'}} />
          <Text
            style={{
              fontWeight: '700',
              color: '#000',
              fontSize: 15,
              alignSelf: 'center',
              textAlign: 'center',
              width: '10%',
            }}
          >
            QTY
          </Text> */}
              </View>

              {PackagingList.map((item, index) => {
                return (
                  <View
                    style={{
                      width: "98%",
                      borderWidth: 1,
                      bordercolor: "#000",
                      height: "4%",
                      flexDirection: "row",
                      marginLeft: "1%",
                    }}
                  >
                    <Text
                      style={{
                        color: "#000",
                        fontSize: 15,
                        alignSelf: "center",
                        width: "20%",
                        textAlign: "center",
                      }}
                    >
                      {item.assignSku}
                    </Text>
                    <View style={{ borderWidth: 1, bordercolor: "#000" }} />

                    <Text
                      style={{
                        color: "#000",
                        fontSize: 15,
                        alignSelf: "center",
                        width: "40%",
                        textAlign: "center",
                      }}
                    >
                      {item.packaggingName}
                    </Text>
                    <View style={{ borderWidth: 1, bordercolor: "#000" }} />

                    <Text
                      style={{
                        color: "#000",
                        fontSize: 15,
                        alignSelf: "center",
                        width: "20%",
                        textAlign: "center",
                      }}
                    >
                      {item.shiphypeSku}
                    </Text>
                    {/* <View style={{borderWidth: 1, bordercolor: '#000'}} /> */}
                    {/* <Text
                style={{
                  color: '#000',
                  fontSize: 15,
                  alignSelf: 'center',
                  textAlign: 'center',
                  width: '15%',
                }}
              />
              <View style={{borderWidth: 1, bordercolor: '#000'}} /> */}
                    {/* {(item.productquantity>1 ? 
             <Text
             style={{
               color: '#000',
               fontSize: 17,
               alignSelf: 'center',
               textAlign: 'center',
               fontWeight:'bold',
               width: '10%',
             }}
           >
             {item.productquantity}
           </Text>

:
<Text
                style={{
                  color: '#000',
                  fontSize: 15,
                  alignSelf: 'center',
                  textAlign: 'center',
                  width: '10%',
                }}
              >
                {item.productquantity}
              </Text>

)}  */}
                  </View>
                );
              })}

              <View
                style={{
                  width: "98%",
                  borderWidth: 1,
                  bordercolor: "#000",
                  justifyContent: "center",
                  marginLeft: "1%",
                  marginTop: "2%",
                  height: "4%",
                }}
              >
                <Text
                  style={{
                    fontWeight: "700",
                    color: "#000",
                    fontSize: 16,
                    marginLeft: "1%",
                  }}
                >
                  Promotional Inserts
                </Text>
              </View>

              <View
                style={{
                  width: "98%",
                  borderWidth: 1,
                  bordercolor: "#000",
                  height: "4%",
                  flexDirection: "row",
                  marginLeft: "1%",
                }}
              >
                <Text
                  style={{
                    fontWeight: "700",
                    color: "#000",
                    fontSize: 15,
                    alignSelf: "center",
                    width: "20%",
                    textAlign: "center",
                  }}
                >
                  SKU
                </Text>
                <View style={{ borderWidth: 1, bordercolor: "#000" }} />

                <Text
                  style={{
                    fontWeight: "700",
                    color: "#000",
                    fontSize: 15,
                    alignSelf: "center",
                    width: "40%",
                    textAlign: "center",
                  }}
                >
                  ITEM NAME
                </Text>
                <View style={{ borderWidth: 1, bordercolor: "#000" }} />
                <Text
                  style={{
                    fontWeight: "700",
                    color: "#000",
                    fontSize: 15,
                    alignSelf: "center",
                    width: "20%",
                    textAlign: "center",
                  }}
                >
                  SHIPHYPE SKU
                </Text>
                {/* <View style={{borderWidth: 1, bordercolor: '#000'}} />
          <Text
            style={{
              fontWeight: '700',
              color: '#000',
              fontSize: 15,
              alignSelf: 'center',
              textAlign: 'center',
              width: '15%',
            }}
          >
            SHIPPED
          </Text>
          <View style={{borderWidth: 1, bordercolor: '#000'}} />
          <Text
            style={{
              fontWeight: '700',
              color: '#000',
              fontSize: 15,
              alignSelf: 'center',
              textAlign: 'center',
              width: '10%',
            }}
          >
            QTY
          </Text> */}
              </View>

              {PromotionalList.map((item, index) => {
                return (
                  <View
                    style={{
                      width: "98%",
                      borderWidth: 1,
                      bordercolor: "#000",
                      height: "4%",
                      flexDirection: "row",
                      marginLeft: "1%",
                    }}
                  >
                    <Text
                      style={{
                        color: "#000",
                        fontSize: 15,
                        alignSelf: "center",
                        width: "20%",
                        textAlign: "center",
                      }}
                    >
                      {item.assignSku}
                    </Text>
                    <View style={{ borderWidth: 1, bordercolor: "#000" }} />

                    <Text
                      style={{
                        color: "#000",
                        fontSize: 15,
                        alignSelf: "center",
                        width: "40%",
                        textAlign: "center",
                      }}
                    >
                      {item.packaggingName}
                    </Text>
                    <View style={{ borderWidth: 1, bordercolor: "#000" }} />

                    <Text
                      style={{
                        color: "#000",
                        fontSize: 15,
                        alignSelf: "center",
                        width: "20%",
                        textAlign: "center",
                      }}
                    >
                      {item.shiphypeSku}
                    </Text>
                    {/* <View style={{borderWidth: 1, bordercolor: '#000'}} /> */}
                    {/* <Text
                style={{
                  color: '#000',
                  fontSize: 15,
                  alignSelf: 'center',
                  textAlign: 'center',
                  width: '15%',
                }}
              />
              <View style={{borderWidth: 1, bordercolor: '#000'}} /> */}
                    {/* {(item.productquantity>1 ? 
             <Text
             style={{
               color: '#000',
               fontSize: 17,
               alignSelf: 'center',
               textAlign: 'center',
               fontWeight:'bold',
               width: '10%',
             }}
           >
             {item.productquantity}
           </Text>

:
<Text
                style={{
                  color: '#000',
                  fontSize: 15,
                  alignSelf: 'center',
                  textAlign: 'center',
                  width: '10%',
                }}
              >
                {item.productquantity}
              </Text>

)}  */}
                  </View>
                );
              })}

              <View
                style={{
                  flexDirection: "row",
                  marginTop: "3%",
                  marginLeft: "1%",
                }}
              >
                <Text
                  style={{ fontSize: 16, color: "#000", fontWeight: "700" }}
                >
                  Issued By :{" "}
                </Text>
                <Text
                  style={{
                    color: "#000",
                    fontSize: 16,
                    fontWeight: "400",
                    width: "90%",
                  }}
                >
                  ShipHype
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  marginTop: "1%",
                  marginLeft: "1%",
                }}
              >
                <Text
                  style={{ fontSize: 16, color: "#000", fontWeight: "700" }}
                >
                  Date :{" "}
                </Text>
                <Text
                  style={{
                    color: "#000",
                    fontSize: 16,
                    fontWeight: "400",
                  }}
                >
                  {Orderdate}
                  {"  "}
                </Text>
                <Text
                  style={{
                    color: "#000",
                    fontSize: 16,
                    fontWeight: "400",
                  }}
                >
                  {OrderTime}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: "3%",
                  marginLeft: "1%",
                }}
              >
                <Text
                  style={{ fontSize: 16, color: "#000", fontWeight: "700" }}
                >
                  Seller Company :{" "}
                </Text>
                <Text
                  style={{
                    color: "#000",
                    fontSize: 16,
                    fontWeight: "400",
                  }}
                >
                  {companyname}
                </Text>
              </View>
              <View
                style={{ flexDirection: "row", marginTop: 1, marginLeft: "1%" }}
              >
                <Text
                  style={{ fontSize: 16, color: "#000", fontWeight: "700" }}
                >
                  Seller Email :{" "}
                </Text>
                <Text
                  style={{
                    color: "#000",
                    fontSize: 16,
                    fontWeight: "400",
                  }}
                >
                  {useremail}
                </Text>
              </View>
              <View
                style={{ flexDirection: "row", marginTop: 1, marginLeft: "1%" }}
              >
                <Text
                  style={{ fontSize: 16, color: "#000", fontWeight: "700" }}
                >
                  Cutoff Time :{" "}
                </Text>
                <Text
                  style={{
                    color: "#000",
                    fontSize: 16,
                    fontWeight: "400",
                  }}
                >
                  {setCuttofTime}
                </Text>
              </View>

              <View
                style={{ flexDirection: "row", marginTop: 1, marginLeft: "1%" }}
              >
                <Text
                  style={{ fontSize: 16, color: "#000", fontWeight: "700" }}
                >
                  Packing Slip :{" "}
                </Text>
                <Text
                  style={{
                    color: "#000",
                    fontSize: 16,
                    fontWeight: "400",
                  }}
                >
                  {packagingSlipI}
                </Text>
              </View>

              <View
                style={{ flexDirection: "row", marginTop: 1, marginLeft: "1%" }}
              >
                <Text
                  style={{ fontSize: 16, color: "#000", fontWeight: "700" }}
                >
                  Order Invoice :{" "}
                </Text>
                <Text
                  style={{
                    color: "#000",
                    fontSize: 16,
                    fontWeight: "400",
                  }}
                >
                  {orderInoivceI}
                </Text>
              </View>

              <View
                style={{ flexDirection: "row", marginTop: 1, marginLeft: "1%" }}
              >
                <Text
                  style={{ fontSize: 16, color: "#000", fontWeight: "700" }}
                >
                  Item Fragility :{" "}
                </Text>
                <Text
                  style={{
                    color: "#000",
                    fontSize: 16,
                    fontWeight: "400",
                  }}
                >
                  {otherOptionS}
                </Text>
              </View>
              <View
                style={{ flexDirection: "row", marginTop: 1, marginLeft: "1%" }}
              >
                <Text
                  style={{ fontSize: 16, color: "#000", fontWeight: "700" }}
                >
                  Shipping Insurance :{" "}
                </Text>
                <Text
                  style={{
                    color: "#000",
                    fontSize: 16,
                    fontWeight: "400",
                  }}
                >
                  {insuranceOptionD}
                </Text>
              </View>
              <View
                style={{ flexDirection: "row", marginTop: 1, marginLeft: "1%" }}
              >
                <Text
                  style={{ fontSize: 16, color: "#000", fontWeight: "700" }}
                >
                  Signature Required :{" "}
                </Text>
                <Text
                  style={{
                    color: "#000",
                    fontSize: 16,
                    fontWeight: "400",
                  }}
                >
                  {signtaureRequired}
                </Text>
              </View>
              <View
                style={{ flexDirection: "row", marginTop: 1, marginLeft: "1%" }}
              >
                <Text
                  style={{ fontSize: 16, color: "#000", fontWeight: "700" }}
                >
                  Default Customer Type :{" "}
                </Text>
                <Text
                  style={{
                    color: "#000",
                    fontSize: 16,
                    fontWeight: "400",
                  }}
                >
                  {customerType}
                </Text>
              </View>

              <View
                style={{ flexDirection: "row", marginTop: 1, marginLeft: "1%" }}
              >
                <Text
                  style={{ fontSize: 16, color: "#000", fontWeight: "700" }}
                >
                  ITEM TOTAL :{" "}
                </Text>
                <Text
                  style={{
                    color: "#000",
                    fontSize: 16,
                    fontWeight: "400",
                    width: "90%",
                  }}
                >
                  {ItemTotal + PackagingTotal + PromotionalTotal}
                </Text>
              </View>

              <View
                style={{ flexDirection: "row", marginTop: 1, marginLeft: "1%" }}
              >
                <Text
                  style={{ fontSize: 16, color: "#000", fontWeight: "700" }}
                >
                  QTY TOTAL :{" "}
                </Text>
                <Text
                  style={{
                    color: "#000",
                    fontSize: 16,
                    fontWeight: "400",
                    width: "90%",
                  }}
                >
                  {TotalQty + PackagingTotalQty + PromotionalTotalQty}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  marginTop: "3%",
                  marginLeft: "1%",
                }}
              >
                <Text
                  style={{ fontSize: 18, color: "#000", fontWeight: "400" }}
                >
                  Note :{" "}
                </Text>
              </View>
            </View>
          </View>
         
        );
      })}
      </ScrollView>
    </>
  );
}
