import React, {useState, useEffect} from 'react';
import {fade, withStyles, makeStyles, useTheme} from '@material-ui/core/styles';
import {
  Platform,
  View,
  ScrollView,
  Image,
  Text,
  Dimensions,
  TextInput,
} from 'react-native';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import popUpStyle from './style/popUpStyle';
import Link from '@material-ui/core/Link';
import AsyncStorage from '@react-native-community/async-storage';
import {Ionicons} from '@expo/vector-icons';

const useStyles = makeStyles(theme => ({
  submit: {
    margin: theme.spacing(0, 0, 0),
    borderRadius: 0,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(2),
    flexGrow: 1,
    height: '120vh',
    overflow: 'auto',
    backgroundColor: '#fff',
  },
  profileMargin: {
    marginHorizontal: theme.spacing(2),
    borderRadius: 0,
  },
}));

//Make custom button
const ColorButton = withStyles(theme => ({
  root: {
    color: '#fff',

    borderRadius: '3px',
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    height: '100%',
    width: '90px',
    fontSize: '12px',
    fontWeight: '550',
    color: '#fff',
    backgroundColor: '#0168fa',
    '&:hover': {
      backgroundColor: '#002080',
    },
  },
}))(Button);
const ColorButtonTes = withStyles(theme => ({
  root: {
    color: '#fff',
    backgroundColor: '#0168fa',
    borderColor: '#0168fa',
    borderRadius: '3px',
    fontWeight: '700',
    height: 45,
    width: 290,
    fontSize: '11px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
    '&:hover': {
      backgroundColor: '#002080',
    },
  },
}))(Button);

/**
 * Description:This function is used for Slide17
 * @param {*} props
 */
export default function Slide17(props) {
  const [focusedIndex, setfocusedIndex] = useState(null);
  const [textArray, setTextArray] = useState([]);
  const [textArray2, setTextArray2] = useState([]);
  const [textArray3, setTextArray3] = useState([]);

  const [EdittextArray, EditsetTextArray] = useState([]);
  const [EdittextArray2, EditsetTextArray2] = useState([]);
  const [EdittextArray3, EditsetTextArray3] = useState([]);

  const [ProductSelect1, setProductSelect] = React.useState([]);
  const [CustomPackges1, setCustomPackges] = React.useState([]);
  const [SelectPromotional1, setSelectPromotional] = React.useState([]);

  const [EditProductSelect1, EditsetProductSelect] = React.useState([]);
  const [EditCustomPackges1, EditsetCustomPackges] = React.useState([]);
  const [EditSelectPromotional1, EditsetSelectPromotional] = React.useState([]);
  const [ShipmentIds, setShipmentIds] = useState([]);

  const classes = useStyles();
  const handleChangeButton = id => {
    props.handleNextPage('SendInventoryPackingType');
    console.log('button value', id);
  };

  React.useEffect(
    () => {
      AsyncStorage.multiGet(['shipmentId']).then(data => {
        if (data[0][1] != null) {
          var ShipmentId = parseInt(data[0][1]);
          console.log(ShipmentId);
          console.log('ShipmentId');
          if (ShipmentId !== 0) {
            console.log('in ship');
          } else {
            setShipmentIds(ShipmentId);
          }

          if (ShipmentId !== 0) {
            AsyncStorage.multiGet([
              'NewSelectedrowData',
              'NewSelectedCustomerowData',
              'NewSelectedPromotionalrowData',
            ]).then(data => {
              if (data[0][1] != null) {
                var EditNewProductSelect = JSON.parse(data[0][1]);
                console.log(EditNewProductSelect);
                console.log('EditNewProductSelect');

                EditNewProductSelect.map((item, index) => {
                  if (item.shippedquantity === null) {
                    EditNewProductSelect[index].shippedquantity = 0;
                  } else {
                    EditNewProductSelect[
                      index
                    ].shippedquantity = item.shippedquantity;
                  }
                });

                let EdittextArray = Array(EditNewProductSelect.length).fill('');
                EditsetTextArray(EdittextArray);
                EditsetProductSelect(EditNewProductSelect);
              }
              if (data[1][1] != null) {
                var EditCustomPackges = JSON.parse(data[1][1]);
                console.log(EditCustomPackges);
                console.log('EditCustomPackges');

                EditCustomPackges.map((item, index) => {
                  if (item.packagingquantity === null) {
                    EditCustomPackges[index].packagingquantity = 0;
                  } else {
                    EditCustomPackges[
                      index
                    ].packagingquantity = item.packagingquantity;
                  }
                });

                let EdittextArray2 = Array(EditCustomPackges.length).fill('');
                EditsetTextArray2(EdittextArray2);
                EditsetCustomPackges(EditCustomPackges);
              }
              if (data[2][1] != null) {
                var EditSelectPromotional = JSON.parse(data[2][1]);
                console.log(EditSelectPromotional);
                console.log('EditSelectPromotional');

                EditSelectPromotional.map((item, index) => {
                  if (item.packagingquantity === null) {
                    EditSelectPromotional[index].packagingquantity = 0;
                  } else {
                    EditSelectPromotional[
                      index
                    ].packagingquantity = item.packagingquantity;
                  }
                });

                let EdittextArray3 = Array(EditSelectPromotional.length).fill(
                  '',
                );
                EditsetTextArray3(EdittextArray3);

                EditsetSelectPromotional(EditSelectPromotional);
              }
            });
          } else {
            AsyncStorage.multiGet([
              'ProductSelect',
              'CustomPackges',
              'SelectPromotional',
            ]).then(data => {
              if (data[0][1] != null) {
                var ProductSelect = JSON.parse(data[0][1]);
                console.log(ProductSelect);
                console.log('ProductSelect');

                ProductSelect.map((item, index) => {
                  if (item.shippedquantity === null) {
                    ProductSelect[index].shippedquantity = 0;
                  } else {
                    ProductSelect[index].shippedquantity = 0;
                  }
                });

                let textArray = Array(ProductSelect.length).fill('');
                setTextArray(textArray);
                setProductSelect(ProductSelect);
              }
              if (data[1][1] != null) {
                var CustomPackges = JSON.parse(data[1][1]);
                console.log(CustomPackges);
                console.log('CustomPackges');

                CustomPackges.map((item, index) => {
                  if (item.packagingquantity === null) {
                    CustomPackges[index].packagingquantity = 0;
                  } else {
                    CustomPackges[index].packagingquantity = 0;
                  }
                });

                let textArray2 = Array(CustomPackges.length).fill('');
                setTextArray2(textArray2);

                setCustomPackges(CustomPackges);
              }
              if (data[2][1] != null) {
                var SelectPromotional = JSON.parse(data[2][1]);
                console.log(SelectPromotional);
                console.log('SelectPromotional');

                SelectPromotional.map((item, index) => {
                  if (item.packagingquantity === null) {
                    SelectPromotional[index].packagingquantity = 0;
                  } else {
                    SelectPromotional[index].packagingquantity = 0;
                  }
                });

                let textArray3 = Array(SelectPromotional.length).fill('');
                setTextArray3(textArray3);

                setSelectPromotional(SelectPromotional);
              }
            });
          }
        } else {
          AsyncStorage.multiGet([
            'ProductSelect',
            'CustomPackges',
            'SelectPromotional',
          ]).then(data => {
            if (data[0][1] != null) {
              var ProductSelect = JSON.parse(data[0][1]);
              console.log(ProductSelect);
              console.log('ProductSelect');

              ProductSelect.map((item, index) => {
                if (item.shippedquantity === null) {
                  ProductSelect[index].shippedquantity = 0;
                } else {
                  ProductSelect[index].shippedquantity = 0;
                }
              });

              let textArray = Array(ProductSelect.length).fill('');
              setTextArray(textArray);
              setProductSelect(ProductSelect);
            }
            if (data[1][1] != null) {
              var CustomPackges = JSON.parse(data[1][1]);
              console.log(CustomPackges);
              console.log('CustomPackges');

              CustomPackges.map((item, index) => {
                if (item.packagingquantity === null) {
                  CustomPackges[index].packagingquantity = 0;
                } else {
                  CustomPackges[index].packagingquantity = 0;
                }
              });

              let textArray2 = Array(CustomPackges.length).fill('');
              setTextArray2(textArray2);

              setCustomPackges(CustomPackges);
            }
            if (data[2][1] != null) {
              var SelectPromotional = JSON.parse(data[2][1]);
              console.log(SelectPromotional);
              console.log('SelectPromotional');

              SelectPromotional.map((item, index) => {
                if (item.packagingquantity === null) {
                  SelectPromotional[index].packagingquantity = 0;
                } else {
                  SelectPromotional[index].packagingquantity = 0;
                }
              });

              let textArray3 = Array(SelectPromotional.length).fill('');
              setTextArray3(textArray3);

              setSelectPromotional(SelectPromotional);
            }
          });
        }
      });
    },
    [],
  );

  const handleCallbackfunction = () => {
    // AsyncStorage.setItem("ProductSelect", JSON.stringify(ProductSelect1));
    // var ProductSelect = [];
    // AsyncStorage.multiRemove(["ProductSelect"]);
    props.handleNextPage('sendInventoryPromotional');
    // AsyncStorage.clear();
  };
  const handleBorderColor = index => {
    return index === focusedIndex ? 'red' : 'grey';
  };

  const onNextfunction = () => {
    console.log(ShipmentIds);
    console.log('ShipmentIds');
    if (ShipmentIds !== 0) {
      AsyncStorage.setItem(
        'NewSelectedrowData',
        JSON.stringify(EditProductSelect1),
      );
      AsyncStorage.setItem(
        'NewSelectedCustomerowData',
        JSON.stringify(EditCustomPackges1),
      );
      AsyncStorage.setItem(
        'NewSelectedPromotionalrowData',
        JSON.stringify(EditSelectPromotional1),
      );
    } else {
      AsyncStorage.setItem('ProductSelect', JSON.stringify(ProductSelect1));
      AsyncStorage.setItem('CustomPackges', JSON.stringify(CustomPackges1));
      AsyncStorage.setItem(
        'SelectPromotional',
        JSON.stringify(SelectPromotional1),
      );
    }

    props.handleNextPage('SendInventroyLocation');
  };

  return (
    <View className={classes.content}>
      <View className={classes.appBarSpacer} />

      <View>
        <Grid item container lg={12}>
          <Grid item lg={5} style={popUpStyle.breadCrumSidePadding}>
            <Link
              onClick={() => {
                props.handleDashboard('01');
              }}
            >
              <Text style={popUpStyle.breadCrundCss1}>DASHBOARD /</Text>
            </Link>{' '}
            <Text style={popUpStyle.breadCrundCss}>Send INVENTORY / </Text>
            <Text style={popUpStyle.breadCrundCss2}> ENTER QTY {'\n'} </Text>
          </Grid>
          <Grid item lg={2} />
        </Grid>
      </View>

      {/* <ScrollView> */}
      <View>
        <Grid container justify="space-between" spacing={2}>
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
          <Grid items xs={12} lg={12} style={{marginTop: '35px'}}>
            <Grid justify="center" container />
          </Grid>
          <Grid items xs={12} lg={12}>
            <Grid justify="center" container />
          </Grid>
        </Grid>
        <View style={{height: '70vh', marginHorizontal: '1%'}}>
          <ScrollView>
            <Text
              style={{
                fontSize: '14px',
                fontWeight: '700',
                // marginLeft:'10px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                color: '#001737',

                transition: 'all 0.25s',
              }}
            >
              Select Product
            </Text>

            <View
              style={{
                height: '5vh',
                backgroundColor: '#cccccc',
                flexDirection: 'row',
                width: '110%',
                marginTop: '1%',
              }}
            >
              {/* <Text style={{fontSize: '14px',fontWeight: '700', fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',alignSelf:"center",justifyContent:"center",padding:"1%"}}>SKU</Text> */}

              <Text
                style={{
                  fontSize: '14px',
                  fontWeight: '700',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                  color: '#001737',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  padding: '1%',
                  width: '40%',
                }}
              >
                NAME
              </Text>

              <Text
                style={{
                  fontSize: '14px',
                  fontWeight: '700',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                  color: '#001737',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  padding: '1%',
                  width: '30%',
                }}
              >
                SKU
              </Text>

              <Text
                style={{
                  fontSize: '14px',
                  fontWeight: '700',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                  color: '#001737',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  padding: '1%',
                }}
              >
                Enter QTY
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                borderWidth: 1,
                borderColor: '#cccccc',
                marginBottom: '1%',
              }}
            >
              {ShipmentIds !== 0
                ? EditProductSelect1.length > 0
                    ? EditProductSelect1.map((item, index) => {
                        return (
                          <View>
                            <View style={{flexDirection: 'row'}}>
                              <Text
                                style={{
                                  padding: '1%',
                                  fontSize: '12px',
                                  color: '#000',
                                  width: '30%',
                                  alignSelf: 'center',
                                }}
                              >
                                {item.productname}
                              </Text>
                              <View
                                style={{
                                  backgroundColor: '#cccccc',
                                  height: '100%',
                                  width: 1,
                                  marginHorizontal: '3%',
                                }}
                              />

                              <Text
                                style={{
                                  padding: '1%',
                                  fontSize: '12px',
                                  color: '#000',
                                  width: '25%',
                                  alignSelf: 'center',
                                  marginLeft: '7%',
                                }}
                              >
                                {item.productsku}
                              </Text>
                              <View
                                style={{
                                  backgroundColor: '#cccccc',
                                  height: '100%',
                                  width: 1,
                                  marginHorizontal: '3%',
                                }}
                              />
                              <View
                                style={{
                                  alignSelf: 'center',
                                  justifyContent: 'center',
                                  marginLeft: '4%',
                                }}
                              >
                                <TextInput
                                  style={{
                                    height: 40,
                                    marginVertical: 10,
                                    borderColor: '#cccccc',
                                    borderWidth: 1,
                                    alignSelf: 'center',
                                    justifyContent: 'center',
                                  }}
                                  onChangeText={value => {
                                    EditsetProductSelect(prevObjs =>
                                      prevObjs.map(o => {
                                        if (
                                          o.customproductId ===
                                          item.customproductId
                                        )
                                          return {...o, shippedquantity: value};
                                        return o;
                                      }));
                                  }}
                                  value={item.shippedquantity}
                                  // placeholder={"0"}
                                  placeholderTextColor={'#000'}
                                  onFocus={() => setfocusedIndex(index)}
                                  onBlur={() => setfocusedIndex(null)}
                                />
                                {/* <View style={{height:1.5,width:"90%",backgroundColor:"#cccccc",marginTop:"7%"}}/> */}
                              </View>
                            </View>
                            <View
                              style={{
                                backgroundColor: '#cccccc',
                                height: 1,
                                width: '100%',
                              }}
                            />
                          </View>
                        );
                      })
                    : <Text
                        style={{
                          color: '#000',
                          textAlign: 'center',
                          padding: '1%',
                        }}
                      >
                        No records to display
                      </Text>
                : ProductSelect1.length > 0
                    ? ProductSelect1.map((item, index) => {
                        return (
                          <View>
                            <View style={{flexDirection: 'row'}}>
                              <Text
                                style={{
                                  padding: '1%',
                                  fontSize: '12px',
                                  color: '#000',
                                  width: '30%',
                                  alignSelf: 'center',
                                }}
                              >
                                {item.productname}
                              </Text>
                              <View
                                style={{
                                  backgroundColor: '#cccccc',
                                  height: '100%',
                                  width: 1,
                                  marginHorizontal: '3%',
                                }}
                              />

                              <Text
                                style={{
                                  padding: '1%',
                                  fontSize: '12px',
                                  color: '#000',
                                  width: '25%',
                                  alignSelf: 'center',
                                  marginLeft: '7%',
                                }}
                              >
                                {item.productsku}
                              </Text>
                              <View
                                style={{
                                  backgroundColor: '#cccccc',
                                  height: '100%',
                                  width: 1,
                                  marginHorizontal: '3%',
                                }}
                              />
                              <View
                                style={{
                                  alignSelf: 'center',
                                  justifyContent: 'center',
                                  marginLeft: '4%',
                                }}
                              >
                                <TextInput
                                  style={{
                                    height: 40,
                                    marginVertical: 10,
                                    borderColor: '#cccccc',
                                    borderWidth: 1,
                                    alignSelf: 'center',
                                    justifyContent: 'center',
                                  }}
                                  onChangeText={value => {
                                    setProductSelect(prevObjs =>
                                      prevObjs.map(o => {
                                        if (
                                          o.customproductId ===
                                          item.customproductId
                                        )
                                          return {...o, shippedquantity: value};
                                        return o;
                                      }));
                                  }}
                                  value={item.shippedquantity}
                                  // placeholder={"0"}
                                  placeholderTextColor={'#000'}
                                  onFocus={() => setfocusedIndex(index)}
                                  onBlur={() => setfocusedIndex(null)}
                                />
                                {/* <View style={{height:1.5,width:"90%",backgroundColor:"#cccccc",marginTop:"7%"}}/> */}
                              </View>
                            </View>
                            <View
                              style={{
                                backgroundColor: '#cccccc',
                                height: 1,
                                width: '100%',
                              }}
                            />
                          </View>
                        );
                      })
                    : <Text
                        style={{
                          color: '#000',
                          textAlign: 'center',
                          padding: '1%',
                        }}
                      >
                        No records to display
                      </Text>}
            </View>

            <Text
              style={{
                fontSize: '14px',
                fontWeight: '700',
                // marginLeft:'10px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                color: '#001737',

                transition: 'all 0.25s',
              }}
            >
              Select Custom Packaging
            </Text>

            <View
              style={{
                height: '5vh',
                backgroundColor: '#cccccc',
                flexDirection: 'row',
                width: '110%',
                marginTop: '1%',
              }}
            >
              {/* <Text style={{fontSize: '14px',fontWeight: '700', fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',alignSelf:"center",justifyContent:"center",padding:"1%"}}>SKU</Text> */}

              <Text
                style={{
                  fontSize: '14px',
                  fontWeight: '700',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                  color: '#001737',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  padding: '1%',
                  width: '40%',
                }}
              >
                NAME
              </Text>
              <Text
                style={{
                  fontSize: '14px',
                  fontWeight: '700',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                  color: '#001737',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  padding: '1%',
                  width: '30%',
                }}
              >
                SKU
              </Text>

              <Text
                style={{
                  fontSize: '14px',
                  fontWeight: '700',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                  color: '#001737',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  padding: '1%',
                }}
              >
                Enter QTY
              </Text>
            </View>

            <View
              style={{
                width: '100%',
                borderWidth: 1,
                borderColor: '#cccccc',
                marginBottom: '1%',
              }}
            >
              {ShipmentIds !== 0
                ? EditCustomPackges1.length > 0
                    ? EditCustomPackges1.map((item, index) => {
                        return (
                          <View>
                            <View style={{flexDirection: 'row'}}>
                              <Text
                                style={{
                                  padding: '1%',
                                  fontSize: '12px',
                                  color: '#000',
                                  width: '30%',
                                  alignSelf: 'center',
                                }}
                              >
                                {item.packaggingName}
                              </Text>
                              <View
                                style={{
                                  backgroundColor: '#cccccc',
                                  height: '100%',
                                  width: 1,
                                  marginHorizontal: '3%',
                                }}
                              />

                              <Text
                                style={{
                                  padding: '1%',
                                  fontSize: '12px',
                                  color: '#000',
                                  width: '25%',
                                  alignSelf: 'center',
                                  marginLeft: '7%',
                                }}
                              >
                                {item.assignSku}
                              </Text>
                              <View
                                style={{
                                  backgroundColor: '#cccccc',
                                  height: '100%',
                                  width: 1,
                                  marginHorizontal: '3%',
                                }}
                              />
                              <View
                                style={{
                                  alignSelf: 'center',
                                  justifyContent: 'center',
                                  marginLeft: '4%',
                                }}
                              >
                                <TextInput
                                  style={{
                                    height: 40,
                                    marginVertical: 10,
                                    borderColor: '#cccccc',
                                    borderWidth: 1,
                                  }}
                                  onChangeText={value => {
                                    EditsetCustomPackges(prevObjs =>
                                      prevObjs.map(o => {
                                        if (
                                          o.packaggingId === item.packaggingId
                                        )
                                          return {
                                            ...o,
                                            packagingquantity: value,
                                          };
                                        return o;
                                      }));
                                  }}
                                  value={item.packagingquantity}
                                  // placeholder={"0"}
                                  placeholderTextColor={'#000'}
                                  onFocus={() => setfocusedIndex(index)}
                                  onBlur={() => setfocusedIndex(null)}
                                />
                                {/* <View style={{height:1.5,width:"90%",backgroundColor:"#cccccc",marginTop:"7%"}}/> */}
                              </View>
                            </View>
                            <View
                              style={{
                                backgroundColor: '#cccccc',
                                height: 1,
                                width: '100%',
                              }}
                            />
                          </View>
                        );
                      })
                    : <Text
                        style={{
                          color: '#000',
                          textAlign: 'center',
                          padding: '1%',
                        }}
                      >
                        No records to display
                      </Text>
                : CustomPackges1.length > 0
                    ? CustomPackges1.map((item, index) => {
                        return (
                          <View>
                            <View style={{flexDirection: 'row'}}>
                              <Text
                                style={{
                                  padding: '1%',
                                  fontSize: '12px',
                                  color: '#000',
                                  width: '30%',
                                  alignSelf: 'center',
                                }}
                              >
                                {item.packaggingName}
                              </Text>
                              <View
                                style={{
                                  backgroundColor: '#cccccc',
                                  height: '100%',
                                  width: 1,
                                  marginHorizontal: '3%',
                                }}
                              />
                              <Text
                                style={{
                                  padding: '1%',
                                  fontSize: '12px',
                                  color: '#000',
                                  width: '25%',
                                  alignSelf: 'center',
                                  marginLeft: '7%',
                                }}
                              >
                                {item.assignSku}
                              </Text>
                              <View
                                style={{
                                  backgroundColor: '#cccccc',
                                  height: '100%',
                                  width: 1,
                                  marginHorizontal: '3%',
                                }}
                              />
                              <View
                                style={{
                                  alignSelf: 'center',
                                  justifyContent: 'center',
                                  marginLeft: '4%',
                                }}
                              >
                                <TextInput
                                  style={{
                                    height: 40,
                                    marginVertical: 10,
                                    borderColor: '#cccccc',
                                    borderWidth: 1,
                                  }}
                                  onChangeText={value => {
                                    setCustomPackges(prevObjs =>
                                      prevObjs.map(o => {
                                        if (
                                          o.packaggingId === item.packaggingId
                                        )
                                          return {
                                            ...o,
                                            packagingquantity: value,
                                          };
                                        return o;
                                      }));
                                    AsyncStorage.setItem(
                                      'CustomPackges',
                                      JSON.stringify(CustomPackges1),
                                    );
                                  }}
                                  value={item.packagingquantity}
                                  // placeholder={"0"}
                                  placeholderTextColor={'#000'}
                                  onFocus={() => setfocusedIndex(index)}
                                  onBlur={() => setfocusedIndex(null)}
                                />
                                {/* <View style={{height:1.5,width:"90%",backgroundColor:"#cccccc",marginTop:"7%"}}/> */}
                              </View>
                            </View>
                            <View
                              style={{
                                backgroundColor: '#cccccc',
                                height: 1,
                                width: '100%',
                              }}
                            />
                          </View>
                        );
                      })
                    : <Text
                        style={{
                          color: '#000',
                          textAlign: 'center',
                          padding: '1%',
                        }}
                      >
                        No records to display
                      </Text>}
            </View>

            <Text
              style={{
                fontSize: '14px',
                fontWeight: '700',
                // marginLeft:'10px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                color: '#001737',

                transition: 'all 0.25s',
              }}
            >
              Select Promotional Insert
            </Text>

            <View
              style={{
                height: '5vh',
                backgroundColor: '#cccccc',
                flexDirection: 'row',
                width: '110%',
                marginTop: '1%',
              }}
            >
              {/* <Text style={{fontSize: '14px',fontWeight: '700', fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',alignSelf:"center",justifyContent:"center",padding:"1%"}}>SKU</Text> */}

              <Text
                style={{
                  fontSize: '14px',
                  fontWeight: '700',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                  color: '#001737',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  padding: '1%',
                  width: '40%',
                }}
              >
                NAME
              </Text>

              <Text
                style={{
                  fontSize: '14px',
                  fontWeight: '700',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                  color: '#001737',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  padding: '1%',
                  width: '30%',
                }}
              >
                SKU
              </Text>

              <Text
                style={{
                  fontSize: '14px',
                  fontWeight: '700',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                  color: '#001737',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  padding: '1%',
                }}
              >
                Enter QTY
              </Text>
            </View>

            <View
              style={{
                width: '100%',
                borderWidth: 1,
                borderColor: '#cccccc',
                marginBottom: '1%',
              }}
            >
              {ShipmentIds !== 0
                ? EditSelectPromotional1.length > 0
                    ? EditSelectPromotional1.map((item, index) => {
                        return (
                          <View>
                            <View style={{flexDirection: 'row'}}>
                              <Text
                                style={{
                                  fontSize: '12px',
                                  color: '#000',
                                  padding: '1%',
                                  width: '30%',
                                  alignSelf: 'center',
                                }}
                              >
                                {item.packaggingName}
                              </Text>
                              <View
                                style={{
                                  backgroundColor: '#cccccc',
                                  height: '100%',
                                  width: 1,
                                  marginHorizontal: '3%',
                                }}
                              />

                              <Text
                                style={{
                                  padding: '1%',
                                  fontSize: '12px',
                                  color: '#000',
                                  width: '25%',
                                  alignSelf: 'center',
                                  marginLeft: '7%',
                                }}
                              >
                                {item.assignSku}
                              </Text>
                              <View
                                style={{
                                  backgroundColor: '#cccccc',
                                  height: '100%',
                                  width: 1,
                                  marginHorizontal: '3%',
                                }}
                              />
                              <View
                                style={{
                                  alignSelf: 'center',
                                  justifyContent: 'center',
                                  marginLeft: '4%',
                                }}
                              >
                                <TextInput
                                  style={{
                                    height: 40,
                                    marginVertical: 10,
                                    borderColor: '#cccccc',
                                    borderWidth: 1,
                                  }}
                                  onChangeText={value => {
                                    EditsetSelectPromotional(prevObjs =>
                                      prevObjs.map(o => {
                                        if (
                                          o.packaggingId === item.packaggingId
                                        )
                                          return {
                                            ...o,
                                            packagingquantity: value,
                                          };
                                        return o;
                                      }));
                                  }}
                                  value={item.packagingquantity}
                                  // placeholder={"0"}
                                  placeholderTextColor={'#000'}
                                  onFocus={() => setfocusedIndex(index)}
                                  onBlur={() => setfocusedIndex(null)}
                                />
                                {/* <View style={{height:1.5,width:"90%",backgroundColor:"#cccccc",marginTop:"7%"}}/> */}
                              </View>
                            </View>
                            <View
                              style={{
                                backgroundColor: '#cccccc',
                                height: 1,
                                width: '100%',
                              }}
                            />
                          </View>
                        );
                      })
                    : <Text
                        style={{
                          color: '#000',
                          textAlign: 'center',
                          padding: '1%',
                        }}
                      >
                        No records to display
                      </Text>
                : SelectPromotional1.length > 0
                    ? SelectPromotional1.map((item, index) => {
                        return (
                          <View>
                            <View style={{flexDirection: 'row'}}>
                              <Text
                                style={{
                                  fontSize: '12px',
                                  color: '#000',
                                  padding: '1%',
                                  width: '30%',
                                  alignSelf: 'center',
                                }}
                              >
                                {item.packaggingName}
                              </Text>
                              <View
                                style={{
                                  backgroundColor: '#cccccc',
                                  height: '100%',
                                  width: 1,
                                  marginHorizontal: '3%',
                                }}
                              />
                              <Text
                                style={{
                                  padding: '1%',
                                  fontSize: '12px',
                                  color: '#000',
                                  width: '25%',
                                  alignSelf: 'center',
                                  marginLeft: '7%',
                                }}
                              >
                                {item.assignSku}
                              </Text>
                              <View
                                style={{
                                  backgroundColor: '#cccccc',
                                  height: '100%',
                                  width: 1,
                                  marginHorizontal: '3%',
                                }}
                              />
                              <View
                                style={{
                                  alignSelf: 'center',
                                  justifyContent: 'center',
                                  marginLeft: '4%',
                                }}
                              >
                                <TextInput
                                  style={{
                                    height: 40,
                                    marginVertical: 10,
                                    borderColor: '#cccccc',
                                    borderWidth: 1,
                                  }}
                                  onChangeText={value => {
                                    setSelectPromotional(prevObjs =>
                                      prevObjs.map(o => {
                                        if (
                                          o.packaggingId === item.packaggingId
                                        )
                                          return {
                                            ...o,
                                            packagingquantity: value,
                                          };
                                        return o;
                                      }));
                                    AsyncStorage.setItem(
                                      'SelectPromotional',
                                      JSON.stringify(SelectPromotional1),
                                    );
                                  }}
                                  value={item.packagingquantity}
                                  // placeholder={"0"}
                                  placeholderTextColor={'#000'}
                                  onFocus={() => setfocusedIndex(index)}
                                  onBlur={() => setfocusedIndex(null)}
                                />
                                {/* <View style={{height:1.5,width:"90%",backgroundColor:"#cccccc",marginTop:"7%"}}/> */}
                              </View>
                            </View>
                            <View
                              style={{
                                backgroundColor: '#cccccc',
                                height: 1,
                                width: '100%',
                              }}
                            />
                          </View>
                        );
                      })
                    : <Text
                        style={{
                          color: '#000',
                          textAlign: 'center',
                          padding: '1%',
                        }}
                      >
                        No records to display
                      </Text>}
            </View>
          </ScrollView>
        </View>
      </form>
    </View>
  );
}