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
import StepConnector from "@material-ui/core/StepConnector";
import Toast from "./feedback/Toast";
import DateFnsUtils from "@date-io/date-fns";
import ProgressBar from "./feedback//ProgressBar";
import Link from "@material-ui/core/Link";
import popUpStyle from "./style/popUpStyle";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import AsyncStorage from "@react-native-community/async-storage";
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
  qtyBox: {
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

/**
 * Description:This function is used for Slide17
 * @param {*} props
 */
export default function Slide17(props) {
  const classes = useStyles();
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
  const [promotionalQuantity1, setpromotionalQuantity] = React.useState([]);
  const [PromotionalID1, setPromotionalId1] = React.useState([]);

  const [EditpromotionalQuantity1, EditsetpromotionalQuantity] = React.useState(
    []
  );
  const [EditPromotionalID1, EditsetPromotionalId1] = React.useState([]);

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
    console.log("changedWarehouseid : ", changedWarehouseid);
    console.log("selectwarehouse :", selectwarehouse);
    console.log("requestDescription : ", requestDescription);
    console.log("requestRelatedTo : ", requestRelatedTo);

    var date = new Date();
    // to add 4 days to current date

    date.setDate(date.getDate() + 3);
    setSelectedStartDate(date);
    //   fetchShiphypeCompleteStep();
  }, []);

  React.useEffect(() => {
    fetchShiphypeCompleteStep();
  }, []);
  const fetchShiphypeCompleteStep = () => {
    //  const userid=userid;
    shiphypeservice
      .fetchStepCompleteStatus(userid)
      .then((response) => {
        console.log(response);
        console.log("fetchStepCompleteStatus");
        console.log("status", response.status);
        if (response.status === true) {
          if (response.data.length !== 0) {
            for (let i = 0; i < response.data.length; i++) {
              if (response.data[i].shiphypesubstepId === 9) {
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
          bindData(response.data[0].shipping, response.data[0].carrier);
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
    }
    else if (data1[0].carriertitle === null) {
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

  // const addArrangeShip =()=>{
  //   if(extraCarrier===true)
  //   {
  //     const otherCarreir=formState.values.otherCarreir;
  //     shiphypeservice.addCarrier(userid,otherCarreir)
  //           .then(response => {
  //            console.log("status",response.status);
  //                 if(response.status === true) {
  //                   //setCarrierId
  //                   addArrangeShip4();
  //                            }else{

  //                       console.log("message",response.message);
  //                            }
  //               }).catch((error) =>{
  //                     console.error(error);
  //               });
  //   }
  //   else{
  //     addArrangeShip4(0);
  //   }
  // }
  const addArrangeShip = () => {
    // if(carid===0)
    // {
    var shippingCarrier = "0";
    if (carrierId === "9999999999") {
      shippingCarrier = "0";
    } else {
      shippingCarrier = carrierId;
    }

    // }
    // else{
    //const shippingCarrier=carid;

    //  }
    // if(shipProfile===false)
    // {
    //   setOpen1(true);
    // }
    // else{
      //props.inventoryLocation
      //props.inventoryPackgingType
      //props.inventoryShipemntType
      //props.inventoryLabel
    setLoading(true);
    console.log(shipmentIds);

    if (shipmentIds !== 0) {
      if (editArrangeShip === 0) {
        const shipFrom = formState.values.shipFrom;
        const tracking = formState.values.tracking;
        const qtyBox = formState.values.qtyBox;
        const otherCarreir = formState.values.otherCarreir;

        console.log(EditWarehouseId1);
        console.log(EditShippedQty1);
        console.log(EditchangepackaggingId1);
        console.log(EditPromotionalID1);
        console.log(EditpackagingQuantity1);
        console.log(EditpromotionalQuantity1);
        console.log("Edit Add Orders");

        shiphypeservice
          .addArrangeShip(
            userid,
            EditWarehouseId1,
            EditShippedQty1,
            shipFrom,
            selectwarehouse,
            tracking,
            selectedStartDate,
            shippingCarrier,
            0,
            "New Shipment",
            openPackageTypeID,
            EditchangepackaggingId1,
            EditPromotionalID1,
            EditpackagingQuantity1,
            EditpromotionalQuantity1,
            otherCarreir,
            props.inventoryLocation,
      props.inventoryPackgingType,
      props.inventoryShipemntType,
      props.inventoryLabel,
      qtyBox
          )
          .then((response) => {
            console.log("status", response.status);
            if (response.status === true) {
              setOpen(true);
              setShipemntId1(response.data);
              setType("success");
              setMsg(response.message);
              setStatus(response.status);
              setLoading(false);
              addStepStatus(response.data);

              // sentSpecialRequest(response.data);
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
        console.log("else part========");
        const shipFrom = formState.values.shipFrom;
        const tracking = formState.values.tracking;
        const qtyBox = formState.values.qtyBox;
        //const shippingCarrier=carrierId;

        if (carrierId === "9999999999") {
          shippingCarrier = "0";
        } else {
          shippingCarrier = carrierId;
        }

        const shiphypeID = shipmentId;
        var otherCarreir = formState.values.otherCarreir;

        if (carriernameagain === otherCarreir) {
          shippingCarrier = carrieridagain;
        }

        //const productIdsarry=shipData[0].productid;
        // const selectedStartDate=format(selectedStartDate, "yyyy-MM-dd hh:mm:ss");
        console.log(EditWarehouseId1);
        console.log(EditShippedQty1);
        console.log(EditchangepackaggingId1);
        console.log(EditPromotionalID1);
        console.log(EditpackagingQuantity1);
        console.log(EditpromotionalQuantity1);
        console.log("Edit update Order");
        shiphypeservice
          .updateArrangeShip(
            shiphypeID,
            EditWarehouseId1,
            EditShippedQty1,
            shipFrom,
            selectwarehouse,
            tracking,
            selectedStartDate,
            shippingCarrier,
            0,
            openPackageTypeID,
            EditchangepackaggingId1,
            EditPromotionalID1,
            EditpackagingQuantity1,
            EditpromotionalQuantity1,
            otherCarreir,
            props.inventoryLocation,
            props.inventoryPackgingType,
            props.inventoryShipemntType,
            props.inventoryLabel,
            qtyBox
          )
          .then((response) => {
            console.log(response);
            console.log("response ======");
            console.log("status", response.status);
            if (response.status === true) {
              props.updateShipmentId();
              setOpen(true);
              setType("success");
              setMsg(response.message);
              setStatus(response.status);
              setLoading(false);
              addStepStatus(shiphypeID);
              setShipemntId1(shiphypeID);
              // sentSpecialRequest(shiphypeID);
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
    } else {
      if (editArrangeShip === 0) {
        const shipFrom = formState.values.shipFrom;
        const tracking = formState.values.tracking;
        const qtyBox = formState.values.qtyBox;
        const otherCarreir = formState.values.otherCarreir;

        console.log(WarehouseId1);
        console.log(ShippedQty1);
        console.log(changepackaggingId1);
        console.log(PromotionalID1);
        console.log(packagingQuantity1);
        console.log(promotionalQuantity1);

        shiphypeservice
          .addArrangeShip(
            userid,
            WarehouseId1,
            ShippedQty1,
            shipFrom,
            selectwarehouse,
            tracking,
            selectedStartDate,
            shippingCarrier,
            0,
            "New Shipment",
            openPackageTypeID,
            changepackaggingId1,
            PromotionalID1,
            packagingQuantity1,
            promotionalQuantity1,
            otherCarreir,
            props.inventoryLocation,
            props.inventoryPackgingType,
            props.inventoryShipemntType,
            props.inventoryLabel,
            qtyBox
          )
          .then((response) => {
            console.log("status", response.status);
            if (response.status === true) {
              setOpen(true);
              setShipemntId1(response.data);
              setType("success");
              setMsg(response.message);
              setStatus(response.status);
              setLoading(false);
              addStepStatus(response.data);

              // sentSpecialRequest(response.data);
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
        console.log("else part========");
        const shipFrom = formState.values.shipFrom;
        const tracking = formState.values.tracking;
        const qtyBox = formState.values.qtyBox;
        //const shippingCarrier=carrierId;

        if (carrierId === "9999999999") {
          shippingCarrier = "0";
        } else {
          shippingCarrier = carrierId;
        }

        const shiphypeID = shipmentId;
        var otherCarreir = formState.values.otherCarreir;

        if (carriernameagain === otherCarreir) {
          shippingCarrier = carrieridagain;
        }

        //const productIdsarry=shipData[0].productid;
        // const selectedStartDate=format(selectedStartDate, "yyyy-MM-dd hh:mm:ss");
        console.log(WarehouseId1);
        console.log(ShippedQty1);
        console.log(changepackaggingId1);
        console.log(PromotionalID1);
        console.log(packagingQuantity1);
        console.log(promotionalQuantity1);
        shiphypeservice
          .updateArrangeShip(
            shiphypeID,
            WarehouseId1,
            ShippedQty1,
            shipFrom,
            selectwarehouse,
            tracking,
            selectedStartDate,
            shippingCarrier,
            0,
            openPackageTypeID,
            changepackaggingId1,
            PromotionalID1,
            packagingQuantity1,
            promotionalQuantity1,
            otherCarreir,
            props.inventoryLocation,
            props.inventoryPackgingType,
            props.inventoryShipemntType,
            props.inventoryLabel,
            qtyBox
          )
          .then((response) => {
            console.log(response);
            console.log("response ======");
            console.log("status", response.status);
            if (response.status === true) {
              props.updateShipmentId();
              setOpen(true);
              setType("success");
              setMsg(response.message);
              setStatus(response.status);
              setLoading(false);
              addStepStatus(shiphypeID);
              setShipemntId1(shiphypeID);
              // sentSpecialRequest(shiphypeID);
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
    props.backButtonRouting(7);
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
              <Text style={popUpStyle.breadCrundCss1}>DASHBOARD</Text>
            </Link>
            <Text style={popUpStyle.breadCrundCss}> / SEND INVENTORY /</Text>
            <Text style={popUpStyle.breadCrundCss}> ARRANGING SHIP / </Text>
            <Text style={popUpStyle.breadCrundCss2}>
              {" "}
              Seller Arranges Shipping {"\n"}{" "}
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
                Please provide the following information once you've shipped
                products to us:
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
                    <option value="9999999999" style={{ paddingLeft: "3%" }}>
                      Other
                    </option>
                  </TextField>
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

                  <Grid item xs={8}>
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
                </Grid>


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
                      placeholder="Start Date"
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
                      {editArrangeShip === 0 ? "Save" : "Update"}
                    </ColorButton>
                  </Grid>
                </Grid>
                {(parseInt(selectwarehouse) === 1 ? 
          <Grid item xs={12} lg={8}>
   
    
    <Text style={{ fontSize: '16px',
      fontWeight: '700',
       marginLeft:'2px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
      color: '#001737',
    
      transition : 'all 0.25s',}}>
      
  {"\n"}SHIPHYPE CANADA{"\n"}</Text>
<Text style={{ fontSize: '14px',
     // fontWeight: '700',
       marginLeft:'2px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
      color: '#001737',
    
      transition : 'all 0.25s',}}>
        
        50 PRINCE ANDREW PLACE{"\n"}
        DOCK 7{"\n"}
        TORONTO, ONTARIO M3C 2H4{"\n"}
        CANADA{"\n"}
        Phone: +1 (416) 320-5958{"\n"}
        Email: SUPPORT@SHIPHYPE.COM</Text></Grid>
        : 
        <Grid item xs={12} lg={8}>
        <Text style={{ fontSize: '16px',
      fontWeight: '700',
       marginLeft:'2px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
      color: '#001737',
    
      transition : 'all 0.25s',}}>
      
  {"\n"}SHIPHYPE USA{"\n"}</Text>
<Text style={{ fontSize: '14px',
     // fontWeight: '700',
       marginLeft:'2px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
      color: '#001737',
    
      transition : 'all 0.25s',}}>
        
        2760 E SPRING ST{"\n"}
        UNIT 202{"\n"}
        LONG BEACH,CA 90806{"\n"}
        UNITED STATES{"\n"}
        Phone: +1 (416) 320-5958{"\n"}
        Email: support@shiphype.com</Text> </Grid>)}
              </Grid>
            </Grid>
          </form>

          {showToast(open, msg, type)}
        </View>
      </View>
    </View>
  );
}