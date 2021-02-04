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
import Grid from "@material-ui/core/Grid";
import popUpStyle from "./style/popUpStyle";
import Link from "@material-ui/core/Link";
import AsyncStorage from "@react-native-community/async-storage";
import { Ionicons } from "@expo/vector-icons";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

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
    height: "120vh",
    overflow: "auto",
    backgroundColor: "#fff",
  },
  profileMargin: {
    marginHorizontal: theme.spacing(2),
    borderRadius: 0,
  },
}));

//Make custom button
const ColorButton = withStyles((theme) => ({
  root: {
    color: "#fff",

    borderRadius: "3px",
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    height: "100%",
    width: "90px",
    fontSize: "12px",
    fontWeight: "550",
    color: "#fff",
    backgroundColor: "#0168fa",
    "&:hover": {
      backgroundColor: "#002080",
    },
  },
}))(Button);
const ColorButtonTes = withStyles((theme) => ({
  root: {
    color: "#fff",
    backgroundColor: "#0168fa",
    borderColor: "#0168fa",
    borderRadius: "3px",
    fontWeight: "700",
    height: 45,
    width: 290,
    fontSize: "11px",
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
 * Description:This function is used for Slide17
 * @param {*} props
 */
export default function SelectOrderMainScreen(props) {
  const [focusedIndex, setfocusedIndex] = useState(null);
  const [textArray, setTextArray] = useState([]);
  const [prodtcIdsArray, setProdcutIdsArray] = useState([]);

  const [ProductSelect1, setProductSelect] = React.useState([]);
  const [open1, setOpen1] = React.useState(false);
  const [state1, setState1] = useState({
   vertical: "center",
   horizontal: "center",
 });
 const { vertical, horizontal } = state1;
  const classes = useStyles();
  const handleChangeButton = (id) => {
    props.handleNextPage("SendInventoryPackingType");
    console.log("button value", id);
  };
  // props.editOrder.internalorderId

  React.useEffect(() => {
    if(props.editOrder!==null)
    {
      if (props.editOrder.internalorderId !== 0) {
        AsyncStorage.multiGet([
          'ReturnProductSelect',
        
        ]).then(data => {
          if (data[0][1] != null) {
            var EditNewProductSelect = JSON.parse(data[0][1]);
            console.log(EditNewProductSelect);
            console.log('EditNewProductSelect');
  
            EditNewProductSelect.map((item, index) => {
              if(props.editCaseOnAddOption===true)
              {
                EditNewProductSelect[index].productquantity = EditNewProductSelect[index].productquantity;
              }

              else {
                for(let k=0;k<props.shippingQunatity.length;k++)
                {
                  if(item.customproductId===props.shippingQunatity[k].productid)
                  {
                    EditNewProductSelect[index].productquantity = props.shippingQunatity[k].productquantity;
                  }
                 else
                  {
                    EditNewProductSelect[index].productquantity =0;
                  }
                }
              }
            });
  
            let EdittextArray = Array(EditNewProductSelect.length).fill('');
            // EditsetTextArray(EdittextArray);
            // EditsetProductSelect(EditNewProductSelect);
  
            setTextArray(EdittextArray);
    
            setProductSelect(EditNewProductSelect);
          }
        });
      
      }
      else{
        AsyncStorage.multiGet(["ReturnProductSelect"]).then((data) => {
          if (data[0][1] != null) {
            var ProductSelect1 = JSON.parse(data[0][1]);
            console.log();
    
            ProductSelect1.map((item, index) => {
              if (item.productquantity == null) {
                ProductSelect1[index].productquantity = 0;
              }else {
                ProductSelect1[index].productquantity = 0;
              }
              // } else {
              //   ProductSelect1[index].productquantity = item.productquantity;
              // }
            });
    
            let textArray = Array(ProductSelect1.length).fill("");
            setTextArray(textArray);
    
            setProductSelect(ProductSelect1);
          }
        });
      }
     
    }
    
    else{
      AsyncStorage.multiGet([
      'ReturnProductSelect']).then((data) => {
        if (data[0][1] != null) {
          var ProductSelect1 = JSON.parse(data[0][1]);
          console.log();
  
          ProductSelect1.map((item, index) => {
            if(props.editCaseOnAddOption===true)
            {
              ProductSelect1[index].productquantity = ProductSelect1[index].productquantity;
            }
           else {
              ProductSelect1[index].productquantity = 0;
            }
            // } else {
            //   ProductSelect1[index].productquantity = item.productquantity;
            // }
          });
  
          let textArray = Array(ProductSelect1.length).fill("");
          setTextArray(textArray);
  
          setProductSelect(ProductSelect1);
        }
      });
    }
   
  }, []);

  const handleCallbackfunction = () => {
    // AsyncStorage.setItem("ProductSelect", JSON.stringify(ProductSelect1));
    // var ProductSelect = [];
    // AsyncStorage.multiRemove(["ProductSelect"]);
    props.handleNextPage("SelectReturnProduct");
    // AsyncStorage.clear();
  };
  const handleBorderColor = (index) => {
    return index === focusedIndex ? "red" : "grey";
  };
  const handleClose3 = () => {
    setOpen1(false);
    // handleNextPage(22);
  };
let flag=false;
let productiderror=[];
  const onNextfunction = () => {
    for(let i=0;i<ProductSelect1.length;i++)
    {
      if(ProductSelect1[i].torontostock!==null && ProductSelect1[i].losangelesstock!==null)
      {
         if(parseInt(ProductSelect1[i].productquantity)>parseInt(ProductSelect1[i].losangelesstock)+parseInt(ProductSelect1[i].torontostock))
         {
          productiderror.push(ProductSelect1[i].productname);
          productiderror.push(', ');
          flag=true;
           //return 
         }
      }
      else if(ProductSelect1[i].torontostock ===null && ProductSelect1[i].losangelesstock!==null)
      {
        if(parseInt(ProductSelect1[i].productquantity)>parseInt(ProductSelect1[i].losangelesstock))
        {
          productiderror.push(ProductSelect1[i].productname);
          productiderror.push(', ');
          flag=true;
        }

      } 
      else if(ProductSelect1[i].torontostock ===null && ProductSelect1[i].losangelesstock===null)
      {
        if(parseInt(ProductSelect1[i].productquantity)>0)
        {
          productiderror.push(ProductSelect1[i].productname);
          productiderror.push(', ');
          flag=true;
        }
      } 
      else if(ProductSelect1[i].torontostock !==null && ProductSelect1[i].losangelesstock===null)
      {
        if(parseInt(ProductSelect1[i].productquantity)>parseInt(ProductSelect1[i].torontostock))
        {
          productiderror.push(ProductSelect1[i].productname);
          productiderror.push(', ');
          flag=true;
        }
      } 
    }
    if(flag===true){
      productiderror.pop();
      setProdcutIdsArray(productiderror);

      setOpen1(true);
    }
   else{
    AsyncStorage.setItem("ReturnProductSelect", JSON.stringify(ProductSelect1));
    props.setEditCaseOnAdd(true);
    props.handleNextPage("select_Seller");
   }
  
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
            </Link>{" "}
            <Text style={popUpStyle.breadCrundCss}>
              Receive Return ORDERS / Create ORDER /{" "}
            </Text>
            <Text style={popUpStyle.breadCrundCss2}> ENTER QTY {"\n"} </Text>
          </Grid>
          <Grid item lg={2} />
        </Grid>
      </View>

      {/* <ScrollView> */}
      <View>
        <Grid container justify="space-between" spacing={2}>
        <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            key={`${vertical},${horizontal}`}
            open={open1}
            autoHideDuration={6000}
            onClose={handleClose3}
          >
            <Alert onClose={handleClose3} severity="error">
              [ {prodtcIdsArray} ] does not have enough quantity for this order.
            </Alert>
          </Snackbar>
          {/* <Grid item xs={12} md={4} lg={4}>
            <Text
              style={{
                fontSize: "13px",
                fontWeight: "700",
                // marginLeft:'10px',
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                color: "#001737",

                transition: "all 0.25s",
              }}
            >
              Select Custom Packaging
            </Text>
          </Grid> */}
          <Grid item xs={12} md={4} lg={4} />
          <Grid
            item
            xs={12}
            md={4}
            lg={4}
            //style={{marginRight:'70px'}}
          >
            <Grid container item justify="flex-end">
              <Grid>
                <ColorButton
                  size="large"
                  variant="contained"
                  color="primary"
                  //className={classes.profileMargin}
                  onClick={() => {
                    handleCallbackfunction();
                  }}
                >
                  Back
                </ColorButton>
                &nbsp;&nbsp;
              </Grid>
              <Grid>
                <ColorButton
                  size="large"
                  variant="contained"
                  color="primary"
                  //className={classes.profileMargin}
                  //onClick={()=>{handleCallbackfunction()}}
                  onClick={() => {
                    onNextfunction();
                  }}
                >
                  Next
                </ColorButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </View>

      <form className={classes.form}>
        <Grid container justify="space-between">
          <Grid items xs={12} lg={12}>
            <Grid justify="center" container />
          </Grid>
          <Grid items xs={12} lg={12} style={{ marginTop: "35px" }}>
            <Grid justify="center" container />
          </Grid>
          <Grid items xs={12} lg={12}>
            <Grid justify="center" container />
          </Grid>
        </Grid>
        <View style={{ height: "70vh", marginHorizontal: "1%" }}>
          <ScrollView>
            <Text
              style={{
                fontSize: "14px",
                fontWeight: "700",
                // marginLeft:'10px',
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                color: "#001737",

                transition: "all 0.25s",
              }}
            >
              Select Product to ship
            </Text>

            <View
              style={{
                height: "5vh",
                backgroundColor: "#cccccc",
                flexDirection: "row",
                width: "110%",
                marginTop: "1%",
              }}
            >
              {/* <Text style={{fontSize: '14px',fontWeight: '700', fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',alignSelf:"center",justifyContent:"center",padding:"1%"}}>SKU</Text> */}

              <Text
                style={{
                  fontSize: "14px",
                  fontWeight: "700",
                  fontFamily:
                    '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                  color: "#001737",
                  alignSelf: "center",
                  justifyContent: "center",
                  padding: "1%",
                  width: "40%",
                }}
              >
                 NAME
              </Text>

              <Text
                style={{
                  fontSize: "14px",
                  fontWeight: "700",
                  fontFamily:
                    '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                  color: "#001737",
                  alignSelf: "center",
                  justifyContent: "center",
                  padding: "1%",
                  width: "30%",
                }}
              >
                SKU
               
              </Text>

              <Text
                style={{
                  fontSize: "14px",
                  fontWeight: "700",
                  fontFamily:
                    '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                  color: "#001737",
                  alignSelf: "center",
                  justifyContent: "center",
                }}
              >
                Enter QTY
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                borderWidth: 1,
                borderColor: "#cccccc",
                marginBottom: "1%",
              }}
            >
              {ProductSelect1.length > 0 ? (
                ProductSelect1.map((item, index) => {
                  return (
                    <View>
                      <View style={{ flexDirection: "row" }}>
                        <Text
                          style={{
                            padding: "1%",
                            fontSize: "12px",
                            color: "#000",
                            width: "20%",
                            alignSelf: "center",
                          }}
                        >
                           {item.productname}
                        </Text>
                        <View
                          style={{
                            backgroundColor: "#cccccc",
                            height: "100%",
                            width: 1,
                            marginHorizontal: "3%",
                          }}
                        />
                        <Text
                          style={{
                            padding: "1%",
                            fontSize: "12px",
                            color: "#000",
                            width: "35%",
                            alignSelf: "center",
                          }}
                        >
                          {item.productsku}
                        </Text>
                        <View
                          style={{
                            backgroundColor: "#cccccc",
                            height: "100%",
                            width: 1,
                            marginHorizontal: "3%",
                          }}
                        />
                        <View
                          style={{
                            alignSelf: "center",
                            justifyContent: "center",
                            marginLeft: "0.5%",
                          }}
                        >
                          <TextInput
                            style={{
                              height: 40,
                              marginVertical: 10,
                              borderColor: "#cccccc",
                              borderWidth: 1,
                              alignSelf: "center",
                              justifyContent: "center",
                            }}
                            onChangeText={(value) => {
                              setProductSelect((prevObjs) =>
                                prevObjs.map((o) => {
                                  if (
                                    o.customproductId === item.customproductId
                                  )
                                    return { ...o, productquantity: value };
                                  return o;
                                })
                              );
                            }}
                            value={item.productquantity}
                            // placeholder={"0"}
                            placeholderTextColor={"#000"}
                            onFocus={() => setfocusedIndex(index)}
                            onBlur={() => setfocusedIndex(null)}
                          />
                          {/* <View style={{height:1.5,width:"90%",backgroundColor:"#cccccc",marginTop:"7%"}}/> */}
                        </View>
                      </View>
                      <View
                        style={{
                          backgroundColor: "#cccccc",
                          height: 1,
                          width: "100%",
                        }}
                      />
                    </View>
                  );
                })
              ) : (
                <Text
                  style={{ color: "#000", textAlign: "center", padding: "1%" }}
                >
                  No records to display
                </Text>
              )}
            </View>
          </ScrollView>
        </View>
      </form>
    </View>
  );
}