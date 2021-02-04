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
  TextInput,
  Dimensions,
} from "react-native";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import * as shiphypeservice from "./ShipService/shiphype_service";
import StepConnector from "@material-ui/core/StepConnector";
import Toast from "./feedback/Toast";
import DateFnsUtils from "@date-io/date-fns";
import ProgressBar from "./feedback//ProgressBar";
import Link from "@material-ui/core/Link";
import popUpStyle from "./style/popUpStyle";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import AsyncStorage from "@react-native-community/async-storage";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { format } from "date-fns";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
/**For Style */
import validate from "validate.js";

const QontoConnector = withStyles({
  line: {
    borderColor: "#3f51b5",
    borderTopWidth: 2,
    borderRadius: 1,
  },
})(StepConnector);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const schema = {
  shipFrom: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 32,
    },
  },
  tracking: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 64,
    },
  },
  returncondiions: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 64,
    },
  },
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
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
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

/**
 * Description:To do show step of task
 */
function getSteps() {
  return [
    "Marketplace Integration",
    "Shipping Profile",
    "Product Import",
    "Product Sync",
    "Import Customers",
  ];
}
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
var selectProductId = [];
var ChildAray = [];
/**
 * Description:This function is used for Slide17
 * @param {*} props
 */
export default function Slide17(props) {
  const classes = useStyles();
  const theme = useTheme();
  const shipmentIds = props.shipmentId;
  const shipmentId11 = props.shipmentId1;
  const [carrierId, setCarrierId] = React.useState(0);
  const [shipmentId, setShipemntId] = React.useState("");
  const [shipmentId1, setShipemntId1] = React.useState(0);
  //const {openAddCustomerManually}= props;
  const [shipData, setShipData] = React.useState([]);
  const [completed, setCompleted] = React.useState(new Set());
  const [extraCarrier, setExtraCariier] = React.useState(false);
  const [carrierCheck, setCarrierChecko] = React.useState(true);
  const steps = getSteps();
  const userid = props.user_id;
  const openPromotionalID = props.openPromotionalID;
  const packagingQuantity = props.packagingQuantity;
  const requestRelatedTo = props.requestRelatedTo;
  const requestDescription = props.requestDescription;
  const promotionalQuantity = props.promotionalQuantity;
  const selectwarehouse = props.selectwarehouse;
  const changedWarehouseid = props.changedWarehouseid;
  const shippedQuantity = props.shippedQuantity;
  const openPackageTypeID = props.openPackageTypeID;
  const openPackageID = props.openPackageID;
  const [checkedA, setCheckedA] = React.useState(true);
  const [open1, setOpen1] = React.useState(false);
  const [state1, setState1] = useState({
    vertical: "center",
    horizontal: "center",
  });
  const { vertical, horizontal } = state1;
  const [shipProfile, setShipprofiledone] = React.useState(false);

  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [type, setType] = React.useState("");
  const [selectedStartDate, setSelectedStartDate] = React.useState(new Date());
  const [editArrangeShip, setEditArrangeShip] = React.useState(0);
  //  const [editArrangeShip,setEditArrangeShip]=React.useState(0);
  const [carrieridagain, setCarrierIDAgin] = React.useState(0);
  const [carriernameagain, setCarriernameAgin] = React.useState("");
  const [status, setStatus] = React.useState(false);
  const [orderCouierType, setOrderCourierType] = React.useState([]);
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });
  const [focusedIndex, setfocusedIndex] = useState(null);
  const [ShippedQty1, setShippedQty] = React.useState([]);
  const [WarehouseId1, setchangedWarehouseid1] = React.useState([]);
  const [EditShippedQty1, EditsetShippedQty] = React.useState([]);
  const [EditWarehouseId1, EditsetchangedWarehouseid1] = React.useState([]);
  const [packagingQuantity1, setpackagingQuantity] = React.useState([]);
  const [changepackaggingId1, setchangedpackaggingId1] = React.useState([]);
  const [EditpackagingQuantity1, EditsetpackagingQuantity] = React.useState([]);
  const [EditchangepackaggingId1, EditsetchangedpackaggingId1] = React.useState(
    []
  );
  const [personName, setPersonName] = React.useState([]);
  const [promotionalQuantity1, setpromotionalQuantity] = React.useState([]);
  const [PromotionalID1, setPromotionalId1] = React.useState([]);
  const [userData, setUserData] = React.useState([]);
  const [EditpromotionalQuantity1, EditsetpromotionalQuantity] = React.useState(
    []
  );
  const [EditPromotionalID1, EditsetPromotionalId1] = React.useState([]);
  const [stateproduct, setStateproduct] = React.useState({
    data: [],
  });
  const [chekd, setcheked] = React.useState(true);
  const [sellerid, setSellerid] = React.useState(0);
  const [selectedItem, setSelectedItem] = React.useState([]);
  const [ShippedQtyOrder, setShippedQtyOrder] = React.useState([]);
  const [ShippedProductId, setShippedProductId] = React.useState([]);
  /**
   * Description:Callback function
   */

  var ids = [];
  var ids2 = [];
  var ids3 = [];
  var Editids = [];
  var Editids2 = [];
  var Editids3 = [];
  var changedWarehouseid1 = [];

  var packaggingId1 = [];
  var changedPromotionalID = [];
  var EditchangedWarehouseid1 = [];
  var EditpackaggingId1 = [];
  var EditchangedPromotionalID = [];

  React.useEffect(() => {
    AsyncStorage.multiRemove(["shipmentId"]);
    if (shipmentIds !== 0) {
      AsyncStorage.multiGet([
        "NewSelectedrowData",
        "NewSelectedCustomerowData",
        "NewSelectedPromotionalrowData",
      ]).then((data) => {
        if (data[0][1] != null) {
          var EditSelectedrowData = JSON.parse(data[0][1]);
          console.log(EditSelectedrowData);
          console.log("EditSelectedrowData");

          EditSelectedrowData.map((item, index) => {
            var data = parseInt(EditSelectedrowData[index].shippedquantity);
            Editids.push(data);
            EditchangedWarehouseid1.push(
              EditSelectedrowData[index].customproductId
            );
          });
          EditsetShippedQty(Editids);
          EditsetchangedWarehouseid1(EditchangedWarehouseid1);
        }
        if (data[1][1] != null) {
          var EditCustomPackges = JSON.parse(data[1][1]);
          console.log(EditCustomPackges);
          console.log("EditCustomPackges");

          EditCustomPackges.map((item, index) => {
            var data2 = parseInt(EditCustomPackges[index].packagingquantity);
            Editids2.push(data2);
            EditpackaggingId1.push(EditCustomPackges[index].packaggingId);
          });
          EditsetpackagingQuantity(Editids2);
          EditsetchangedpackaggingId1(EditpackaggingId1);
        }
        if (data[2][1] != null) {
          var EditSelectPromotional = JSON.parse(data[2][1]);
          console.log(EditSelectPromotional);
          console.log("EditSelectPromotional");

          EditSelectPromotional.map((item, index) => {
            var data3 = parseInt(
              EditSelectPromotional[index].packagingquantity
            );
            Editids3.push(data3);
            EditchangedPromotionalID.push(
              EditSelectPromotional[index].packaggingId
            );
          });
          EditsetpromotionalQuantity(Editids3);
          EditsetPromotionalId1(EditchangedPromotionalID);
        }
      });
    } else {
      AsyncStorage.multiGet([
        "ProductSelect",
        "CustomPackges",
        "SelectPromotional",
      ]).then((data) => {
        if (data[0][1] != null) {
          var ProductSelect = JSON.parse(data[0][1]);
          console.log(ProductSelect);
          console.log("ProductSelect");

          ProductSelect.map((item, index) => {
            var data = parseInt(ProductSelect[index].shippedquantity);
            ids.push(data);
            changedWarehouseid1.push(ProductSelect[index].customproductId);
          });
          setShippedQty(ids);
          setchangedWarehouseid1(changedWarehouseid1);
        }
        if (data[1][1] != null) {
          var CustomPackges = JSON.parse(data[1][1]);
          console.log(CustomPackges);
          console.log("CustomPackges");

          CustomPackges.map((item, index) => {
            var data2 = parseInt(CustomPackges[index].packagingquantity);
            ids2.push(data2);
            packaggingId1.push(CustomPackges[index].packaggingId);
          });
          setpackagingQuantity(ids2);
          setchangedpackaggingId1(packaggingId1);
        }
        if (data[2][1] != null) {
          var SelectPromotional = JSON.parse(data[2][1]);
          console.log(SelectPromotional);
          console.log("SelectPromotional");

          SelectPromotional.map((item, index) => {
            var data3 = parseInt(SelectPromotional[index].packagingquantity);
            ids3.push(data3);
            changedPromotionalID.push(SelectPromotional[index].packaggingId);
          });
          setpromotionalQuantity(ids3);
          setPromotionalId1(changedPromotionalID);
        }
      });
    }
  }, []);

  const handleChangeButton = (qty, productar) => {
    // console.log('returncondiions:',props.returncondiions);
    // console.log('returntracking:',props.returntracking);
    // console.log('returnfromname:',props.returnfromname);
    // console.log('returnselectedStartDate:',props.returnselectedStartDate);
    // console.log('orderwarehouseId:',props.orderwarehouseId);
    // console.log('returncarrierId:',props.returncarrierId);

    // console.log('ShippedProductId:',ShippedProductId);
    // console.log('ShippedQtyOrder:',ShippedQtyOrder);

    // console.log('sellerid:',sellerid);

    setLoading(true);
    const orderDate1 = format(selectedStartDate, "yyyy-MM-dd hh:mm:ss");
    const returncondiions = formState.values.returncondiions;
    const tracking = formState.values.tracking;
    const shipFrom = formState.values.shipFrom;

    let uploadphoto = "";
    if (formState.values.uploadphoto === undefined) {
      uploadphoto = "";
    } else {
      uploadphoto = formState.values.uploadphoto;
    }

    shiphypeservice
      .addReturnOrder(
        returncondiions,
        tracking,
        shipFrom,
        orderDate1,
        props.orderwarehouseId,
        carrierId,
        productar, //productid
        qty, //qty order
        sellerid.id,
        10,
        uploadphoto
      )
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setOpen(true);
          setType("success");
          setMsg(response.message);
          setStatus(response.status);
          setLoading(false);

          AsyncStorage.removeItem("ReturnProductSelect");

          props.handleDashboard("15");
        } else {
          setOpen(true);
          setType("error");
          setMsg(response.message);
          setStatus(response.status);
          setLoading(false);
          setLoading(false);
          AsyncStorage.removeItem("ReturnProductSelect");

          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);
  const handleChangeSwitchA = (event) => {
    setCheckedA(event.target.checked);
    //setState({ ...state, [event.target.name]: event.target.checked });
  };
  const handleChange1 = (event) => {
    setCarrierId(event.target.value);
    if (event.target.value === "9999999999") {
      setExtraCariier(true);
      setCarrierChecko(true);
      // setCarrierId('0');
    } else {
      setExtraCariier(false);
      setCarrierChecko(false);
    }
  };
  const handleStartDateChange = (date, value) => {
    //  setStartsprint(value);
    setSelectedStartDate(date);
    console.log("startdate", value);
  };

  React.useEffect(() => {
    //var ChildAray = [];
    for (let i = 0; i < selectProductId.length; i++) {
      console.log("irun");
      for (let j = 0; j < stateproduct.data.length; j++) {
        console.log("jrun");
        if (
          parseInt(selectProductId[i]) === stateproduct.data[j].customproductId
        ) {
          ChildAray.push(stateproduct.data[j]);
          console.log("jruninsdie");
        }
      }
    }
    AsyncStorage.setItem("ProductReturn", JSON.stringify(ChildAray));
    for (let k = 0; k < ChildAray.length; k++) {
      console.log("asyncvalue", ChildAray[k]);
    }
    console.log("useeffect", selectProductId.length);
    console.log("useeffectdata", stateproduct.data.length);
    console.log("asyncvalue", ChildAray.length);

    ChildAray.map((item, index) => {
      if (item.productquantity == null) {
        ChildAray[index].productquantity = 0;
      } else {
        ChildAray[index].productquantity = 0;
      }
      // } else {
      //   ProductSelect1[index].productquantity = item.productquantity;
      // }
    });
    const updatedaray = [...ChildAray];
    setSelectedItem(updatedaray);
  }, [personName]);

  var flag = false;
  const handleChangeMulpipleProduct = (event) => {
    console.log("selectprofuct", event.target.value);

    if (selectProductId.length === 0) {
      selectProductId.push(event.target.value);
    } else {
      for (let i = 0; i < selectProductId.length; i++) {
        if (event.target.value !== selectProductId[i]) {
          //ids.push(data);
          flag = true;
        } else {
          flag = false;
          break;
        }
      }
      if (flag === true) {
        selectProductId.push(event.target.value);
      } else {
        const index = selectProductId.indexOf(event.target.value);
        if (index > -1) {
          selectProductId.splice(index, 1);
        }
      }
    }
    const updatedaray = [...selectProductId];

    setPersonName(updatedaray);
    console.log("select", selectProductId.length);
    //setPersonName(event.target.value);
  };

  React.useEffect(() => {
    //fetchProductList();
    fetchUserInfo();

    if (ChildAray.length > 0) {
      for (let i =ChildAray.length-1; i > 0; i--) {
        ChildAray.splice(i,1);
      }
    }
    if (ChildAray.length == 1) {
      ChildAray.splice(0,1);
    }
    const updatedaray = [...ChildAray];
    setSelectedItem(updatedaray);

    console.log("CHildar", ChildAray.length);
  }, []);

  const fetchProductList = () => {
    setLoading(true);
    shiphypeservice
      .fetchProductList1(userid)
      .then((response) => {
        console.log(response);
        console.log("fetchProductList1");
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          //setDataProduct(response.data);

          setStateproduct((prevState) => {
            const data = [...prevState.data];

            for (let i = 0; i < response.data.length; i++) {
              data.push(response.data[i]);
            }

            return { ...prevState, data };
          });
        } else {
          //setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        //setLoading(false);
        console.error(error);
      });
  };

  const addOrcheckSkuOfProduct = () => {
    const prsku = formState.values.productsku;
    const prname = formState.values.productname;

    setLoading(true);
    shiphypeservice
      .CheckSkuExist(prsku, prname)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);

          if (response.data !== null) {
            ChildAray.push(response.data);
          }

          for (let k = 0; k < ChildAray.length; k++) {
            console.log("asyncvalue", ChildAray[k]);
          }
          console.log("asyncvalue", ChildAray.length);

          ChildAray.map((item, index) => {
            if (item.itemquantity == null) {
              ChildAray[index].itemquantity = 0;
            } else {
              ChildAray[index].itemquantity = 0;
            }
          });
          const updatedaray = [...ChildAray];
          setSelectedItem(updatedaray);

          setFormState((formState) => ({
            ...formState,
            values: {
              ...formState.values,
              productname: "",
              productname: false,
            },
            touched: {
              ...formState.touched,
              productname: true,
            },
          }));
          setFormState((formState) => ({
            ...formState,
            values: {
              ...formState.values,
              productsku: "",
              checkFrom: false,
            },
            touched: {
              ...formState.touched,
              productsku: true,
            },
          }));
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
                ? (myObject["name"] = response.data[a].displayName)
                : null;
              newArr.push(myObject);
            } else {
              var myObject = {};
              response.data[a].id
                ? (myObject["id"] = response.data[a].id)
                : null;
              response.data[a].userEmail
                ? (myObject["name"] = response.data[a].userEmail)
                : null;
              newArr.push(myObject);
            }
          }
          console.log("array", newArr);
          setUserData(newArr);
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  React.useEffect(() => {
    console.log("changedWarehouseid : ", changedWarehouseid);
    console.log("selectwarehouse :", selectwarehouse);
    console.log("requestDescription : ", requestDescription);
    console.log("requestRelatedTo : ", requestRelatedTo);

    var date = new Date();
    // to add 4 days to current date

    date.setDate(date.getDate() + 3);
    setSelectedStartDate(date);
    //   fetchShiphypeCompleteStep();

    console.log("returncondiions:", props.returncondiions);
    console.log("returntracking:", props.returntracking);
    console.log("returnfromname:", props.returnfromname);
    console.log("returnselectedStartDate:", props.returnselectedStartDate);
    console.log("returncarrierId:", props.returncarrierId);
    if (props.returntracking !== "") {
      setFormState((formState) => ({
        ...formState,
        values: {
          ...formState.values,
          tracking: props.returntracking,
          checkFrom: false,
        },
        touched: {
          ...formState.touched,
          tracking: true,
        },
      }));
    }
    // const returncondiions = formState.values.returncondiions;
    if (props.returncarrierId !== 0) {
      setCarrierId(props.returncarrierId);
      setCarrierChecko(false);
    }

    // const tracking = formState.values.tracking;
    // const shipFrom = formState.values.shipFrom;
    if (props.returnfromname !== "") {
      setFormState((formState) => ({
        ...formState,
        values: {
          ...formState.values,
          shipFrom: props.returnfromname,
          checkFrom: false,
        },
        touched: {
          ...formState.touched,
          shipFrom: true,
        },
      }));
    }

    if (props.returncondiions !== "") {
      setFormState((formState) => ({
        ...formState,
        values: {
          ...formState.values,
          returncondiions: props.returncondiions,
          checkFrom: false,
        },
        touched: {
          ...formState.touched,
          returncondiions: true,
        },
      }));
    }
  }, []);

  const handleClose3 = () => {
    setOpen1(false);
    // handleNextPage(22);
  };

  const fetchArrangeShip = (shipmentIds) => {
    //  const userid=5;

    setLoading(true);
    shiphypeservice
      .fetchArrangeShip(shipmentIds)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          setShipData(response.data);
          if (response.data.length !== 0) {
            setEditArrangeShip(1);
          }
          // bindData(response.data[0].shipping, response.data[0].carrier);
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  /**
   * Description:This function call on type character inside input text
   * @param {} prop
   */
  const handleChange = (prop) => (event) => {
    console.log("email", event.target.value);
    event.persist();
    //setValues({ ...formState.values, [prop]: event.target.value });
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [prop]: event.target.value,
        checkFrom: false,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));
  };

  const bindData = (data1, data) => {
    console.log("bind call", data);

    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        tracking: data1[0].trackingnumber,
        checkFrom: false,
      },
      touched: {
        ...formState.touched,
        tracking: true,
      },
    }));

    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        qtyBox: data1[0].qtybox,
        checkFrom: false,
      },
      touched: {
        ...formState.touched,
        qtyBox: true,
      },
    }));

    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        shipFrom: data1[0].shippingfromname,
        checkFrom: false,
      },
      touched: {
        ...formState.touched,
        shipFrom: true,
      },
    }));

    setSelectedStartDate(data1[0].shipingdate);

    setShipemntId(data1[0].shippingId);

    if (data1[0].carriertitle === "") {
      setCarrierId(data1[0].shippingcarrier);

      setExtraCariier(false);
      setCarrierChecko(false);
    } else if (data1[0].carriertitle === null) {
      setCarrierId(data1[0].shippingcarrier);

      setExtraCariier(false);
      setCarrierChecko(false);
    } else {
      setCarrierId("9999999999");

      setFormState((formState) => ({
        ...formState,
        values: {
          ...formState.values,
          otherCarreir: data1[0].carriertitle,
          checkFrom: false,
        },
        touched: {
          ...formState.touched,
          otherCarreir: true,
        },
      }));

      setCarrierIDAgin(data1[0].shippingcarrier);
      setCarriernameAgin(data1[0].carriertitle);
      setExtraCariier(true);
      setCarrierChecko(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const showToast = (open, msg, type) => {
    return (
      <Toast open={open} handleClose={handleClose} type={type} msg={msg} />
    );
  };
  /*
   * Description:To do close poup after successfully create sprint and on click cancel button
   * @param {*} issprintCreate
   */
  const handleClose1 = (isSprintCreate) => {
    props.handleSprintCancel(isSprintCreate);
  };

  const addArrangeShip = () => {
    const returncondiions = formState.values.returncondiions;
    const tracking = formState.values.tracking;
    const shipFrom = formState.values.shipFrom;
    var ids23 = [];
    var changedWarehouseid2 = [];
    AsyncStorage.setItem("ReturnProductSelect", JSON.stringify(selectedItem));
    AsyncStorage.multiGet(["ReturnProductSelect"]).then((data) => {
      if (data[0][1] != null) {
        var ProductSelect1 = JSON.parse(data[0][1]);
        console.log(ProductSelect1);
        console.log("ProductSelect1");

        ProductSelect1.map((item, index) => {
          var data = parseInt(ProductSelect1[index].itemquantity);
          ids23.push(data);
          changedWarehouseid2.push(ProductSelect1[index].customproductId);
        });
        setShippedQtyOrder(ids23);
        setShippedProductId(changedWarehouseid2);
        console.log("ids3", ids23.length);
        console.log("changeware", changedWarehouseid2.length);
        handleChangeButton(ids23, changedWarehouseid2);
      }
    });

    // selectedStartDate
    // carrierId
    // props.handleSetDataReturn(
    //   returncondiions,
    //   tracking,
    //   shipFrom,
    //   selectedStartDate,
    //   carrierId
    // );

    //props.handleNextPage("SelectReturnProduct");
    //props.setEditCaseOnAdd(true);
    //props.handleNextPage("select_Seller");
    // if(carid===0)
  };

  const addStepStatus = (shiphypeID) => {
    setLoading(true);

    // const userid=user_id;
    const shiphypesubsubstepId = 0;
    const shiphypesubstepId = 11;
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
          props.upadteShipID(shiphypeID);
          props.saveback("8");
          props.handleNextPage("SepacilaRequest");
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  React.useEffect(() => {
    fetchCourierTypeList();
    if (shipmentIds !== 0) {
      fetchArrangeShip(shipmentIds);
    }
    if (shipmentId11 !== 0) {
      fetchArrangeShip(shipmentId11);
    }
  }, []);

  const handleCallbackfunction = () => {
    props.backButtonRouting("selectReturnWarehouseOrder");
  };

  const handleCallbackfunction1 = () => {
    props.backButtonRouting("SepacilaRequest");
  };
  var coouirer = [];
  const fetchCourierTypeList = () => {
    setLoading(true);
    shiphypeservice
      .fetchCourierTypeList(userid)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          for (var i = 0; i < response.data.length; i++) {
            if (response.data[i].carriertype === "default") {
              coouirer.push(response.data[i]);
            }
          }

          setOrderCourierType(coouirer);
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false;
  let screenWidth = Dimensions.get("window").width;

  return (
    <View className={classes.content}>
      <View className={classes.appBarSpacer} />

      <View>
        <Grid item container lg={12}>
          <Grid item lg={7} style={popUpStyle.breadCrumSidePadding}>
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
            <Text style={popUpStyle.breadCrundCss2}>
              {" "}
              Shipping Information {"\n"}{" "}
            </Text>
          </Grid>
        </Grid>
      </View>
      <Grid justify="center">
        <ProgressBar loading={loading} />
      </Grid>

      {/* <ScrollView> */}
      <View>
        <View style={popUpStyle.paddingSide}>
          <Grid container justify="space-between" spacing={2}>
            <Grid item xs={12} md={7} lg={7}>
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
                Please provide the following information :
              </Text>
            </Grid>
            <Grid item xs={12} md={1} lg={1}></Grid>
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
          </Grid>
          <form className={classes.form}>
            <Grid
              justify="space-between" // Add it here :)
              container
              spacing={2}
            >
              <Grid item xs={12} md={6} lg={6} style={{ marginLeft: "0px" }}>
                <Snackbar
                  anchorOrigin={{ vertical, horizontal }}
                  key={`${vertical},${horizontal}`}
                  open={open1}
                  autoHideDuration={3000}
                  onClose={handleClose3}
                >
                  <Alert onClose={handleClose3} severity="error">
                    First Complete the Setup Wizard Steps.
                  </Alert>
                </Snackbar>
                <Grid item xs={8}>
                  <TextField
                    id="shipFrom"
                    name="shipFrom"
                    variant="outlined"
                    fullWidth
                    error={hasError("shipFrom")}
                    helperText={
                      hasError("shipFrom") ? formState.errors.shipFrom[0] : null
                    }
                    placeholder="From Name"
                    size="small"
                    type="text"
                    onChange={handleChange("shipFrom")}
                    className={classes.profileMargin1}
                    value={formState.values.shipFrom || ""}
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    id="tracking"
                    name="tracking"
                    variant="outlined"
                    fullWidth
                    error={hasError("tracking")}
                    helperText={
                      hasError("tracking") ? formState.errors.tracking[0] : null
                    }
                    placeholder="Tracking"
                    size="small"
                    type="text"
                    onChange={handleChange("tracking")}
                    className={classes.profileMargin1}
                    value={formState.values.tracking || ""}
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    id="outlined-select-currency-native"
                    select
                    fullWidth
                    // label="Select Seller"
                    placeholder="Shipping Carrier"
                    value={carrierId}
                    onChange={handleChange1}
                    SelectProps={{
                      native: true,
                    }}
                    size="small"
                    type="text"
                    className={classes.profileMargin11}
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
                      Select Carrier
                    </option>

                    {orderCouierType.map((option) => (
                      <option
                        style={{
                          fontSize: "14px",
                          //fontWeight: '700',
                          paddingLeft: "15px",
                          cursor: "pointer",
                          fontFamily:
                            '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                        }}
                        key={option.carrierId}
                        value={option.carrierId}
                      >
                        {option.carriertitle}
                      </option>
                    ))}
                    {/* <option value="9999999999" style={{ paddingLeft: "3%" }}>
                      Other
                    </option> */}
                  </TextField>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    id="returncondiions"
                    name="returncondiions"
                    variant="outlined"
                    fullWidth
                    error={hasError("returncondiions")}
                    helperText={
                      hasError("returncondiions")
                        ? formState.errors.returncondiions[0]
                        : null
                    }
                    placeholder="Return Condition"
                    size="small"
                    type="text"
                    onChange={handleChange("returncondiions")}
                    className={classes.profileMargin1}
                    value={formState.values.returncondiions || ""}
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    id="uploadphoto"
                    name="uploadphoto"
                    variant="outlined"
                    fullWidth
                    error={hasError("uploadphoto")}
                    helperText={
                      hasError("uploadphoto")
                        ? formState.errors.uploadphoto[0]
                        : null
                    }
                    placeholder="Upload Photo"
                    size="small"
                    type="text"
                    onChange={handleChange("uploadphoto")}
                    className={classes.profileMargin1}
                    value={formState.values.uploadphoto || ""}
                  />
                </Grid>

                <Grid item xs={8}>
                  <Autocomplete
                    id="combo-box-demo"
                    fullWidth
                    options={userData}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        placeholder="Assign Seller"
                        variant="outlined"
                      />
                    )}
                    onChange={(event, newValue) => {
                      if (newValue !== null) {
                        //  fetchProductListById(newValue.id);
                        setSellerid(newValue);
                        setcheked(false);
                      }
                      console.log("newvalue", newValue);
                    }}
                    className={classes.profileMargin1}
                  />
                </Grid>
                <Grid>
                  <Text
                    style={{
                      fontSize: "14px",
                      fontWeight: "700",
                      marginVertical: 10,
                      // marginLeft:'10px',
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                      color: "#001737",

                      transition: "all 0.25s",
                    }}
                  >
                    Add Product to Receive Return ORDERS
                  </Text>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    id="productname"
                    name="productname"
                    variant="outlined"
                    fullWidth
                    error={hasError("productname")}
                    helperText={
                      hasError("productname")
                        ? formState.errors.productname[0]
                        : null
                    }
                    placeholder="Product name"
                    size="small"
                    type="text"
                    onChange={handleChange("productname")}
                    className={classes.profileMargin1}
                    value={formState.values.productname || ""}
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    id="productsku"
                    name="productsku"
                    variant="outlined"
                    fullWidth
                    error={hasError("productsku")}
                    helperText={
                      hasError("productsku")
                        ? formState.errors.productsku[0]
                        : null
                    }
                    placeholder="Product Sku"
                    size="small"
                    type="text"
                    onChange={handleChange("productsku")}
                    className={classes.profileMargin1}
                    value={formState.values.productsku || ""}
                  />
                </Grid>
                {/* <Grid item xs={8}>
                  <TextField
                    id="productqnty"
                    name="productqnty"
                    variant="outlined"
                    fullWidth
                    error={hasError("productqnty")}
                    helperText={
                      hasError("productqnty") ? formState.errors.productqnty[0] : null
                    }
                    placeholder="Product qty"
                    size="small"
                    type="text"
                    onChange={handleChange("productqnty")}
                    className={classes.profileMargin1}
                    value={formState.values.productqnty || ""}
                  />
                </Grid> */}

                <Grid
                  container
                  item
                  xs={8}
                  justify="flex-end"
                  style={{ marginTop: 5 }}
                >
                  <Grid>
                    <ColorButton
                      size="large"
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      disabled={(() => {
                        if (
                          !(formState.values.productsku === undefined) &&
                          !(formState.values.productsku === "")
                        ) {
                          return false;
                        } else if (
                          !(formState.values.productsku === undefined) &&
                          !(formState.values.productsku === "")
                        ) {
                          return false;
                        } else {
                          return true;
                        }
                      })()}
                      onClick={() => {
                        addOrcheckSkuOfProduct();
                      }}
                    >
                      Add
                    </ColorButton>
                  </Grid>
                </Grid>
                {extraCarrier === true ? (
                  <Grid item xs={8}>
                    <TextField
                      id="otherCarreir"
                      name="otherCarreir"
                      variant="outlined"
                      fullWidth
                      error={hasError("otherCarreir")}
                      helperText={
                        hasError("otherCarreir")
                          ? formState.errors.otherCarreir[0]
                          : null
                      }
                      placeholder="Type name of carrier"
                      size="small"
                      type="text"
                      onChange={handleChange("otherCarreir")}
                      className={classes.profileMargin1}
                      value={formState.values.otherCarreir || ""}
                    />
                  </Grid>
                ) : (
                  ""
                )}
                {/* <Grid item xs={8}>
                  <Autocomplete
                    multiple
                    id="tags-outlined"
                    fullWidth
                    options={stateproduct.data}
                    style={{ width: 400 }}
                    getOptionLabel={(option) => option.productname}
                    filterSelectedOptions
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        placeholder="Select Products"
                      />
                    )}
                    onChange={(event, newValue) => {
                      if (newValue !== null) {
                        console.log("newvalue", newValue);
                      }
                      console.log("newvalueouter", newValue);
                    }}
                  />
                </Grid> */}
                {/* <Grid item xs={8}>
                  <TextField
                    id="outlined-select-currency-native"
                    select
                    fullWidth
                    // label="Select Seller"
                    placeholder="Select Product"
                    value="0"
                    onChange={handleChangeMulpipleProduct}
                    SelectProps={{
                      native: true,
                    }}
                    size="small"
                    type="text"
                    className={classes.profileMargin11}
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
                      Select Product
                    </option>

                    {stateproduct.data.map((option, index) => (
                      <option
                        style={{
                          fontSize: "14px",
                          //fontWeight: '700',
                          paddingLeft: "15px",
                          cursor: "pointer",
                          fontFamily:
                            '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                        }}
                        key={option.customproductId}
                        value={option.customproductId}
                      >
                        {option.productname}
                      </option>
                    ))}
                  </TextField>
                </Grid> */}
                <View style={{ height: "20vh", marginHorizontal: "1%" }}>
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
                      Select Product to Receive Return ORDERS
                    </Text>

                    <View
                      style={{
                        height: "5vh",
                        backgroundColor: "#cccccc",
                        flexDirection: "row",
                        width: "100%",
                        marginTop: "1%",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: "14px",
                          fontWeight: "700",
                          width: "30%",
                          fontFamily:
                            '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                          color: "#001737",
                          alignSelf: "center",
                          justifyContent: "center",
                          padding: "1%",
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
                          padding: "1%",
                          width: "30%",
                        }}
                      >
                        NAME
                      </Text>
                      <Text
                        style={{
                          fontSize: "14px",
                          fontWeight: "700",
                          width: "30%",
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
                      {selectedItem.length > 0 ? (
                        selectedItem.map((item, index) => {
                          return (
                            <View>
                              <View style={{ flexDirection: "row" }}>
                                <Text
                                  style={{
                                    padding: "1%",
                                    fontSize: "12px",
                                    color: "#000",
                                    width: "30%",
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
                                <Text
                                  style={{
                                    padding: "1%",
                                    fontSize: "12px",
                                    color: "#000",
                                    width: "30%",
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
                                      setSelectedItem((prevObjs) =>
                                        prevObjs.map((o) => {
                                          if (
                                            o.customproductId ===
                                            item.customproductId
                                          )
                                            return {
                                              ...o,
                                              itemquantity: value,
                                            };
                                          return o;
                                        })
                                      );
                                    }}
                                    value={item.itemquantity}
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
                          style={{
                            color: "#000",
                            textAlign: "center",
                            padding: "1%",
                          }}
                        >
                          No records to display
                        </Text>
                      )}
                    </View>
                  </ScrollView>
                </View>

                {/* <Grid item xs={8}>
                <FormControl>
                  <InputLabel id="demo-mutiple-chip-label">Select Product</InputLabel>
                  <Select
                    labelId="demo-mutiple-chip-label"
                    id="demo-mutiple-chip"
                    multiple
                    fullWidth={true}
                    value={personName}
                    onChange={handleChangeMulpipleProduct}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={(selected) => (
                      <div className={classes.chips}>
                        {selected.map((value) => (
                          <Chip
                            key={value.customproductId}
                            label={value.productname}
                            className={classes.chip}
                          />
                        ))}
                      </div>
                    )}
                    MenuProps={MenuProps}
                  >
                    {stateproduct.data.map((option) => (
                      <MenuItem
                        key={option.customproductId}
                        value={option}
                        style={getStyles(option, personName, theme)}
                      >
                        {option.productname}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                </Grid> */}
                {/* <Grid item xs={8}>
                  <TextField
                    id="qtyBox"
                    name="qtyBox"
                    variant="outlined"
                    fullWidth
                    error={hasError("qtyBox")}
                    helperText={
                      hasError("qtyBox") ? formState.errors.qtyBox[0] : null
                    }
                    placeholder={(props.inventoryLabel===1 ? 'Qty of Boxes' : 'Qty of Pallets')}
                    size="small"
                    type="text"
                    onChange={handleChange("qtyBox")}
                    className={classes.profileMargin1}
                    value={formState.values.qtyBox || ""}
                  />
                </Grid> */}

                <Grid item xs={5}>
                  <MuiPickersUtilsProvider
                    utils={DateFnsUtils}
                    customStyles={{
                      dateInput: {
                        borderLeftWidth: 1,
                        borderRightWidth: 1,
                        borderTopWidth: 1,
                      },
                    }}
                  >
                    <KeyboardDatePicker
                      variant="outlined"
                      format="yyyy-MM-dd"
                      margin="normal"
                      id="startdate"
                      fullWidth
                      disablePast={true}
                      placeholder="Receive Date"
                      value={selectedStartDate}
                      onChange={handleStartDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>

                <Grid container item xs={8} justify="flex-end">
                  <Grid>
                    <ColorButton
                      size="large"
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      disabled={(() => {
                        if (
                          extraCarrier &&
                          formState.isValid &&
                          !(formState.values.otherCarreir === undefined) &&
                          !(formState.values.otherCarreir === "")
                        ) {
                          return false;
                        } else if (formState.isValid && !carrierCheck) {
                          return false;
                        } else {
                          return true;
                        }

                        //   extraCarrier === true && formState.values.otherCarreir === undefined
                        // && !formState.isValid) === true ? true : false
                      })()}
                      onClick={() => {
                        addArrangeShip();
                      }}
                    >
                      {/* {editArrangeShip === 0 ? "Next" : "Update"} */}
                      Next
                    </ColorButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>

          {showToast(open, msg, type)}
        </View>
      </View>
    </View>
  );
}
