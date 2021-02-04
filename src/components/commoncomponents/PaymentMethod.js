import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { Platform, View, Image, Text, Dimensions,TextInput} from "react-native";
import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Link from "@material-ui/core/Link";
import * as shiphypeService from "./ShipService/shiphype_service";
import validate from "validate.js";
import Toast from "./feedback/Toast";
import EditIcon from "@material-ui/icons/Edit";
import DeleteCard from "./DeleteCard";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import popUpStyle from "./style/popUpStyle";
import MakeDefaultCard from "./MakeDefaultCard";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import ProgressBar from "./feedback/ProgressBar";

const schema = {
  name: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 32,
    },
  },
  ccnumber: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 64,
    },
  },
  zipcode: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 8,
    },
  },
  expire: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 64,
    },
  },
  cvv: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 3,
    },
  },
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },

  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },

  appBarSpacer: theme.mixins.toolbar,
  content: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(2),
    flexGrow: 1,
    height: "100vh",
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

  button5: {
    border: " 1px solid #fff",
    borderRadius: "5px",
    height: "110%",
    width: "50%",
    color: "#fff",
    backgroundColor: "#0158d4",
    borderColor: "#0153c7",

    marginBottom: "1%",
    "&:hover": {
      backgroundColor: "#1a1aff",
      color: "#ffffff",
    },
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  dividerFullWidth1: {
    marginTop: "4%",
  },
  fontsizepaper: {
    fontSize: 10,
    text: "bold",
    marginLeft: "10px",
    marginTop: "10px",
  },
  numbersize: {
    fontSize: 18,
    text: "bold",
    marginLeft: "10px",
  },
  numbersizepercentage: {
    fontSize: 10,
    color: "#F6072F",
    marginTop: "10px",
    marginLeft: "3px",
  },

  numbersizepercentage2: {
    fontSize: 10,
    color: "#0FB559",
    marginTop: "10px",
    marginLeft: "3px",
  },
  fontsizepaper3: {
    fontSize: 12,
    text: "bold",
    marginLeft: "10px",
    marginTop: "10px",
  },
  typography: {
    marginTop: "10px",
    marginLeft: theme.spacing(2),
  },
  footCss: {
    // border : ' 1px solid #fff',
    borderRadius: "8%",
    // border:'1px solid #cccccc',
    color: "#fff",
    textAlign: "center",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    marginTop: "3px",
  },
  paper: {
    padding: theme.spacing(1),
    borderRadius: "0px",
    overflow: "auto",
    backgroundColor: "#fff",
  },

  paperlist: {
    padding: theme.spacing(1.5),
    color: theme.palette.text.secondary,
    margin: "10px",
    width: "100%",
    border: "1px solid #ced4da",
    //boxShadow: '-10px 10px #8c8c8c',
  },

  paperlist1: {
    padding: theme.spacing(1.5),
    color: theme.palette.text.secondary,
    margin: "10px",
    width: "80%",
    border: "1px solid #ced4da",
    //boxShadow: '-10px 10px #8c8c8c',
  },
  fixedHeight: {
    height: 240,
  },
  avatarsmall: {
    marginLeft: "50px",
    width: theme.spacing(5.5),
    height: theme.spacing(5.5),
  },
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  fixedHeight1: {
    height: 480,
  },
  chartContainer: {
    height: 400,
    position: "relative",
  },
  radioButtonCss: {
    color: "#000",
    fontSize: "8px",
    height: "25px",
  },
  profileMargin: {
    marginTop: theme.spacing(0),
    borderRadius: 0,
    marginRight: "0px",
  },
  profileMargin1: {
    marginTop: theme.spacing(1),
    borderRadius: "5px",
  },

  normal: {
    borderRadius: "5px",
    width: 165,
    height: 37,
    marginLeft: "10px",
    backgroundColor: "#b3b3b3",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#b3b3b3",
      color: "#fff",
    },
  },
  normalSelected: {
    borderRadius: "5px",
    width: 165,
    height: 37,
    backgroundColor: "#0168fa",
    marginLeft: "10px",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#0168fa",
      color: "#fff",
    },
  },
  urgent: {
    borderRadius: "5px",
    width: 165,
    height: 37,
    backgroundColor: "#b3b3b3",
    marginLeft: "5px",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#b3b3b3",
      color: "#fff",
    },
  },
  urgentSelected: {
    borderRadius: "5px",
    width: 165,
    height: 37,
    backgroundColor: "#0168fa",
    marginLeft: "5px",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#0168fa",
      color: "#fff",
    },
  },
  veryUrgent: {
    borderRadius: "5px",
    width: 165,
    height: 37,
    backgroundColor: " #b3b3b3",
    marginLeft: "5px",
    color: "#fff",
    "&:hover": {
      backgroundColor: " #b3b3b3",
      color: "#fff",
    },
  },
  //  profileMargin10: {
  //   marginTop: theme.spacing(2),

  //   borderRadius : '0',

  // },
  veryUrgentSelected: {
    borderRadius: "5px",
    width: 165,
    height: 37,
    backgroundColor: "#0168fa",
    marginLeft: "5px",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#0168fa",
      color: "#fff",
    },
  },

  ImagesDesign: {
    width: "65px",
    height: "65px",
    //  marginTop:'5px',
    //  marginRight:'50px'
  },

  hairline1: {
    marginTop: theme.spacing(2),
    backgroundColor: "#A2A2A2",
    height: 3,
  },
}));
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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


//=====================================================================================Add credit button design start=======================================================================//
const ColorButtonlabel = withStyles((theme) => ({
  root: {
    color: "#fff",
    borderRadius: "3px",
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    height: "30px",
    width: "100px",
    fontSize: "13px",
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

//=====================================================================================Add credit button design End=========================================================================//
export default function PaymentMethods(props) {
  const classes = useStyles();
  const [completed, setCompleted] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);
  const [progressBar, setProgress] = React.useState(true);
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight1);
  const [editSprint, setEditSprint] = React.useState(null);
  const [value, setValue] = React.useState("9");
  const [qualitycontrol, setQualitycontrol] = React.useState(false);
  const [termscondition, setTermscondition] = React.useState(false);
  const [shipData, setShipData] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const userRoleId = parseInt(window.localStorage.roleId);
  const [open1, setOpen1] = React.useState(false);
  const [state2, setState2] = useState({
    vertical: "center",
    horizontal: "center",
  });
  const { vertical, horizontal } = state2;
  const [shipProfile, setShipprofiledone] = React.useState(false);

  //   const [plandata,setPlandata]=React.useState([]);
  // const array = plandata.isEmpty();
  // console.log(array)
  const [plandata, setPlandata] = React.useState(false);
  const [plandatabyid, setPlandatabyid] = React.useState([]);
  const [userplanId, setUserplanid] = React.useState(0);

  const [radioValue, setRadioValue] = React.useState(1);
  //const [selectproduct,setSelectproduct]=React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openDefaultCard, setOpenDefaultCard] = React.useState(false);
  const [cardid, setCardid] = React.useState(0);
  const [selectrowdata, setSelectrowdata] = React.useState(null);
  const userid = props.user_id;
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [type, setType] = React.useState("");
  const [status, setStatus] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [selectcurrency, setSelectcurrency] = React.useState(currencyData[0]);

  //=================================================== Add Credit useState start ===================================================================//

  const [data, setData] = React.useState([
    {
      id: 1,
      label: "$100",
      currencyvalue: "100",
      recomanded: false,
    },
    {
      id: 2,
      label: "$250",
      currencyvalue: "250",
      recomanded: false,
    },
    {
      id: 3,
      label: "$500",
      currencyvalue: "500",
      recomanded: false,
    },
    {
      id: 4,
      label: "$1000",
      currencyvalue: "1000",
      recomanded: true,
    },
    {
      id: 5,
      label: "$2000",
      currencyvalue: "2000",
      recomanded: false,
    },
  ]);

  const [currencyvalue, onChangeText] = React.useState("");
  const [userData, setUserData] = useState([]);
  const [sourceid, setSourceid] = useState("");
  const [currency, setCurrency] = useState("");
  const [customerid, setCustomerid] = useState("");
  const [cardData, setCardData] = useState([]);
  const [loadingcredit, setloadingcredit] = React.useState(false);
  const [creditData, setCreditData] = React.useState([]);
  const [idempotenctkey, setIdempontencyKey] = React.useState("");

  //=================================================== Add Credit useState start ===================================================================//

  const module = [];
  const optionArray = [];
  const [formState, setFormState] = React.useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });

  React.useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  const [state1, setState1] = React.useState({
    MarketPlaceIntegration: false,
    ShippingProfile: false,
    //  ProductImport:false,
    ProductSync: false,
    ImportCustomers: false,
  });

  const handleChangeRadio = (event) => {
    setValue1(event.target.value);
  };

  const handleChangeButton = (id) => {
    // setProjectid(row);
    // setRadioValue(id);
    console.log("button value", id);
  };

  // const handleChangeRadio = (event) => {
  //   setValue(event.target.value);

  // };
  const {
    MarketPlaceIntegration,
    ShippingProfile,
    ProductSync,
    ImportCustomers,
  } = state1;
  const progress = React.useRef(() => {});
  React.useEffect(() => {
    progress.current = () => {
      if (completed > 100) {
        setProgress(false);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setCompleted(completed + diff);
        setBuffer(completed + diff + diff2);
      }
    };
  });

  React.useEffect(() => {
    function tick() {
      progress.current();
    }
    const timer = setInterval(tick, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  React.useEffect(() => {
    fetchCard(userid);
    fetchOrderCount(userid);
    fetchShiphypeCompleteStep(userid);
    fetchplan(userid);
    fetchUserInfo();
  }, []);

  var newArr = [];
  const fetchUserInfo = () => {
    //const userid=5;
    setLoading(true);
    shiphypeService
      .fetchUserInfo()
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          for (let a = 0; a < response.data.length; a++) {
            var myObject = {};
            response.data[a].id ? (myObject["id"] = response.data[a].id) : null;
            response.data[a].userEmail
              ? (myObject["name"] = response.data[a].userEmail)
              : null;
            newArr.push(myObject);
          }
          console.log("array", newArr);
          setUsers(newArr);
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
    setLoading(true);
    shiphypeService
      .fetchCreditCard(userid)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          setShipData(response.data);
          //===================================================================Add credit Screen data for add credit api start============================================//
          for (let i = 0; i < response.data.length; i++) {
            console.log("===default card===");
            console.log(response.data[i].defaultcard);
            if (response.data[i].defaultcard === true) {
              // setIsdefault(response.data[i].defaultcard);
              setCurrency(response.data[i].currency);
              setIdempontencyKey(response.data[i].nonce);
              setSourceid(response.data[i].sqaureupcustomercardid);
              setCustomerid(response.data[i].sqaureupcustomerid);
              break;
            }
          }
          //===================================================================Add credit Screen data for add credit api start============================================//
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchOrderCount = (userid) => {
    setLoading(true);
    shiphypeService
      .fetchOrderCount(userid)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          if (response.data < 500) {
            setRadioValue(1);
          } else if (response.data >= 500 && response.data < 1000) {
            setRadioValue(2);
          } else {
            setRadioValue(3);
          }
          // setShipData(response.data);
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchShiphypeCompleteStep = (userid) => {
    //  const userid=userid;
    shiphypeService
      .fetchStepCompleteStatus(userid)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          if (response.data.length !== 0) {
            for (let i = 0; i < response.data.length; i++) {
              if (response.data[i].shiphypesubstepId === 11) {
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

  const handleClickOpendelete = (rowid) => {
    setOpenDelete(true);
    setCardid(rowid);
    console.log("rowid", rowid);
  };

  const handleClickOpendefault = (rowid) => {
    if (rowid.defaultcard === false) {
      setOpenDefaultCard(true);
      //setCardid(rowid);
      setSelectrowdata(rowid);
      console.log("rowid", rowid);
    } else {
    }
  };

  const handleDeleteCancle = () => {
    setOpenDelete(false);
    setOpenDefaultCard(false);
    setSelectrowdata(null);
  };

  //Make custom button
  const ColorButton = withStyles((theme) => ({
    root: {
      color: "#fff",
      borderRadius: "3px",
      //  paddingTop: '9%',
      //  paddingBottom: '9%',
      height: "100%",
      width: "250px",
      fontSize: "11px",
      fontWeight: "550",
      color: "#fff",
      backgroundColor: "#0168fa",
      "&:hover": {
        backgroundColor: "#002080",
      },
    },
  }))(Button);

  const ColorButtonRemove = withStyles((theme) => ({
    root: {
      borderRadius: "3px",
      //  paddingTop: '9%',
      //  paddingBottom: '9%',
      height: "100%",
      width: "250px",
      fontSize: "11px",
      fontWeight: "900",
      color: "#0168fa",
      borderColor: "#002080",
      borderWidth: 5,
      backgroundColor: "#fff",
      "&:hover": {
        backgroundColor: "#fff",
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

  const handleNext = () => {
    addStepStatus();
  };

  const addStepStatus = () => {
    setLoading(true);

    // const userid=user_id;
    const shiphypesubsubstepId = 0;
    const shiphypesubstepId = 12;
    const shiphypestepId = 0;
    shiphypeService
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
          props.handleNextPage("cardlistadd");
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleEdit = (data) => {
    console.log("clickedit");
    props.handleeditcard(data);
  };
  /**
   * Description:To do call next page
   */
  const onNextfunction = () => {
    var requestRelatedTo = "";
    if (qualitycontrol === true && printsku === false) {
      requestRelatedTo = "checked";
    } else if (qualitycontrol === true && printsku === true) {
      requestRelatedTo = "checked,checked";
    } else if (qualitycontrol === false && printsku === true) {
      requestRelatedTo = "checked";
    } else {
      requestRelatedTo = "";
    }

    if (requestRelatedTo === "") {
      props.getSpecialRequestvalue(
        requestRelatedTo,
        formState.values.anyspecialrequest
      );
      props.handleNextPage(value);
    } else {
      props.getSpecialRequestvalue(
        requestRelatedTo,
        formState.values.anyspecialrequest
      );
      props.handleNextPage(value);
    }
  };

  const bindData = (data) => {
    console.log("bind call", data);

    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        name: data[0].name,
        checkFrom: false,
      },
      touched: {
        ...formState.touched,
        name: true,
      },
    }));

    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        ccnumber: data[0].shipfrom,
        checkFrom: false,
      },
      touched: {
        ...formState.touched,
        ccnumber: true,
      },
    }));

    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        zipcode: data[0].address1,
        checkFrom: false,
      },
      touched: {
        ...formState.touched,
        zipcode: true,
      },
    }));

    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        expire: data[0].address2,
        checkFrom: false,
      },
      touched: {
        ...formState.touched,
        expire: true,
      },
    }));

    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        cvv: data[0].city,
        checkFrom: false,
      },
      touched: {
        ...formState.touched,
        cvv: true,
      },
    }));
  };

  //Show Toast after click event
  const showToast = (open, msg, type) => {
    return (
      <Toast open={open} handleClose={handleClose} type={type} msg={msg} />
    );
  };
  // calling  add plan api
  const addPlan = () => {
    handleNext();
    //   console.log("click button");
    // setLoading(true);
    //   const plan_id = radioValue;
    //   const user_id = userid;
    //    shiphypeService.addPlan(user_id,plan_id)
    //          .then(response => {
    //           console.log("status",response.status);
    //                if(response.status === true) {
    //                      setOpen(true);
    //                      setType('success');
    //                      setMsg(response.message);
    //                      setStatus(response.status);
    //                      setLoading(false);
    //                      handleNext();

    //                           }else{
    //                      setOpen(true);
    //                      setType('error');
    //                      setMsg(response.message);
    //                      setStatus(response.status);
    //                      setLoading(false);
    //                      console.log("message",response.message);
    //                           }
    //              }).catch((error) =>{
    //                    console.error(error);
    //              });
  };

  const fetchplan = (userid) => {
    setLoading(true);

    shiphypeService
      .fetchplanbyid(userid)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          if (response.data.length === 0) {
            // setPlandata(response.data);
            setPlandata(true);
          } else {
            // setPlandatabyid(response.data);

            // userplanId
            for (let i = 0; i < response.data.length; i++) {
              if (response.data[i].planId === 1) {
                //handleChangeButton(1);
                // setRadioValue(response.data[i].planId);
                setUserplanid(response.data[i].userplanId);
              } else if (response.data[i].planId === 2) {
                //handleChangeButton(2);
                // setRadioValue(response.data[i].planId);
                setUserplanid(response.data[i].userplanId);
              } else if (response.data[i].planId === 3) {
                //handleChangeButton(3);
                // setRadioValue(response.data[i].planId);
                setUserplanid(response.data[i].userplanId);
              }
              // else if(response.data[i].userplanId === 15){
              //   setUserplanid(15);

              // }
            }
          }
          // handleChangeButton(3);
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // planId
  // plandata

  // update plan api call

  const updatePlan = () => {
    handleNext();
    // setLoading(true);
    // console.log("click button update");
    // userplanId
    //   // const userplan_id = 15;
    //   const userplan_id =  userplanId;
    //   const plan_id = radioValue;
    //   const user_id = userid;
    //    shiphypeService.updatePlan(userplan_id,user_id,plan_id)
    //          .then(response => {
    //           console.log("status",response.status);
    //                if(response.status === true) {
    //                      setOpen(true);
    //                      setType('success');
    //                      setMsg(response.message);
    //                      setStatus(response.status);
    //                      setLoading(false);
    //                      handleNext();

    //                           }else{
    //                      setOpen(true);
    //                      setType('error');
    //                      setMsg(response.message);
    //                      setStatus(response.status);
    //                      setLoading(false);
    //                      console.log("message",response.message);
    //                           }
    //              }).catch((error) =>{
    //                    console.error(error);
    //              });
  };

  let screenWidth = Dimensions.get("window").width;
  console.log(screenWidth);
  let paperlist = 0;
  let setupbutton = 0;
  let setupbutton9 = 0;
  let footCss = 0;
  let footCss9 = 0;
  if (screenWidth < 400) {
    paperlist = classes.paperlist;
  } else if (screenWidth < 690) {
    paperlist = classes.paperlist;
  } else if (screenWidth < 1530) {
    paperlist = classes.paperlist;
  } else {
    paperlist = classes.paperlist1;
  }

  const deleteCard = () => {
    setOpenDelete(false);
    setLoading(true);
    shiphypeService
      .deleteCreditCard(cardid)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
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

  const updateCardDefault = () => {
    setOpenDefaultCard(false);
    if (selectrowdata !== null) {
      setLoading(true);
      shiphypeService
        .updateCreditCard(
          selectrowdata.customercardId,
          selectrowdata.cardholdername,
          selectrowdata.cardnumber,
          selectrowdata.expiredate,
          selectrowdata.cvvnumber,
          true,
          userid,
          selectrowdata.currency
        )
        .then((response) => {
          console.log("status", response.status);
          if (response.status === true) {
            setLoading(false);
            fetchCard(userid);
            setSelectrowdata(null);
          } else {
            setLoading(false);
            console.log("message", response.message);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  //============================================================================Add Credit Functions start======================================================================//

  const addCredit = () => {




    const amount_money = {
      amount: currencyvalue*100,
      currency: currency,
    };

    console.log("LOGGGGFGDF");
      console.log(amount_money.amount);
      if(amount_money.amount >= 100){
        const source_id = sourceid;
        const customer_id = customerid;
        const autocomplete = true;
        const reference_id = "";
        const note = "no notes";

        const app_fee_money = {
          // amount: "0",
          currency: currency,
        };

        setloadingcredit(true);

        console.log("USER IDDDDDDDD");
        console.log(userid);
        console.log(idempotenctkey);
        console.log(amount_money);
        console.log(source_id);
        console.log(customer_id);
        console.log(autocomplete);
        console.log(reference_id);
        console.log(note);
        console.log(app_fee_money);
        console.log(userid);


        if(idempotenctkey && source_id != null){
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
              userid
            )
            .then((response) => {
              console.log("status");
              console.log(response);
              console.log("response=====");
              console.log(response.message);
              console.log(response.status);
              if (response.status === true) {
                setCreditData(response.data);
                setOpen(true);
                setType("success");
                setMsg(response.message);
                setStatus(response.status);
                setloadingcredit(false);
              } else if(response.status == false){
                setOpen(true);
                setType("error");
                setMsg(response.message);
                setStatus(response.status);
                setloadingcredit(false);
                console.log("message", response.message);
              }


            })
            .catch((error) => {
              console.error(error);
            });
        }else {
          console.log("else part=====");

            setOpen(true);
            setType("error");
            setMsg("Please select payment method ");
              setloadingcredit(false);
        }

      } else if(amount_money.amount==""){
        setOpen(true);
        setType("error");
        setMsg("Please select a Payment Method");
        setloadingcredit(false);
      } else{
        setOpen(true);
        setType("error");
        setMsg("Please enter atleast $100");
        setloadingcredit(false);
      }


  };

  //============================================================================Add Credit Functions End========================================================================//

  /**
   * Description:Callback function after api call
   */
  const handleClose = () => {
    setOpen(false);
    if (status === true) {
      props.UpdatedCredit(); //Add Credit props for updated credit/////////////////////////

    } else {
    }
  };

  const handleChange1 = (event) => {
    setSelectcurrency(event.target.value);
  };
  const handleViewPricePlan = () => {
    window.open("https://shiphype.com/fulfillment-pricing/", "_blank");
  };
  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false;
  return (
    <View className={classes.content}>
      <View className={classes.appBarSpacer} />
      <View>
        <Grid item container lg={12} style={popUpStyle.breadCrumSidePadding}>
          <Grid
            item
            lg={7}
            //style={{ marginLeft:'4px'}}
          >
            <Link
              onClick={() => {
                props.handleDashboard("01");
              }}
            >
              <Text style={popUpStyle.breadCrundCss1}>DASHBOARD /</Text>
            </Link>
            {/* <Text style={popUpStyle.breadCrundCss}>  Billing </Text> */}
            <Text style={popUpStyle.breadCrundCss2}>
              {" "}
              Credits & Billing {"\n"}{" "}
            </Text>
          </Grid>
        </Grid>
      </View>
      <View style={[popUpStyle.paddingSide, { marginVertical: 15 }]}>
        <Grid container justify="space-between">
          <Grid item xs={12} md={4} lg={4}>
            <Text
              style={{
                fontSize: "16px",
                fontWeight: "700",
                marginLeft: "2px",
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                color: "#001737",

                transition: "all 0.25s",
              }}
            >
              Credits
            </Text>
          </Grid>
        </Grid>
      </View>
      {/*===============================================================================================Add credit Design start=======================================================================*/}

      <View style={{ marginTop: 15, marginLeft: 7, width: 600 }}>
        <Grid justify="left">
          <ProgressBar loading={loadingcredit} />
        </Grid>
        <Grid>
          <Text style={popUpStyle.creditAmountLabel}>
            Please select the credit amount you would like to load:
          </Text>
        </Grid>
        <View style={popUpStyle.CreditAmountCurrencyIcon}>
          <Text>$ {"  "}</Text>
          <TextInput
            style={[popUpStyle.enterAmount, { width: "20%", fontSize: "18px" }]}
            onChangeText={(text) => onChangeText(text)}
            Placeholder={"Enter Amount"}
            value={currencyvalue}
          />

          <Text style={[{ marginLeft: "10px", fontSize: "17px" }]}>USD</Text>
          {showToast(open, msg, type)}
        </View>

        <View style={{ flexDirection: "row" }}>
          {data.map((item) => {
            return (
              <View style={{ margin: 10,marginTop: 20}}>
                <ColorButtonlabel
                  size="large"
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    onChangeText(item.currencyvalue);
                  }}
                >

                  {item.label}
                </ColorButtonlabel>
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

          <View style={{marginLeft: 120,marginBottom: 15}}>

            <View>

              <ColorButton
                size="large"
                variant="contained"
                color="primary"
                //className={classes.submit}
                //   disabled={!formState.isValid}
                onClick={() => {}}
              >
                Edit Auto Reload
              </ColorButton>
              </View>
              <View style={{marginTop: 20}}>

              <ColorButtonRemove
                size="large"
                variant="contained"
                color="primary"
                //className={classes.submit}
                //   disabled={!formState.isValid}
                onClick={() => {}}
              >
                Remove Auto Reload
              </ColorButtonRemove>
            </View>

          </View>
        </View>

        <Grid
          justify="center"
          style={{ marginLeft: "12%", marginTop: "1%", marginBottom: "4%" }}
        >
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

      {/*===============================================================================================Add credit Design End========================================================================*/}

      {/*    <Grid>
        &nbsp;&nbsp;{" "}
        <ColorButton
          size="large"
          variant="contained"
          color="primary"
          //className={classes.submit}
          //   disabled={!formState.isValid}
          onClick={() => {
            props.handleDashboard("add_credit");
          }}
        >
          Add Credits
        </ColorButton>
      </Grid>*/}

      <View>
        <View style={[popUpStyle.paddingSide,{marginTop: "30px"}]}>
          <Grid container justify="space-between">
            <Grid item xs={12} md={4} lg={4}>
              <Text
                style={{
                  fontSize: "16px",
                  fontWeight: "700",
                  marginLeft: "2px",
                  fontFamily:
                    '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                  color: "#001737",

                  transition: "all 0.25s",
                }}
              >
                Payment Methods
              </Text>
            </Grid>
            <Grid item xs={12} md={4} lg={4}></Grid>
            <Grid item xs={12} md={4} lg={4}>
              <Text>{"\n"}</Text>
            </Grid>
          </Grid>
        </View>

        <Grid justify="center">
          <ProgressBar loading={loading} />
        </Grid>

        {/* my code here */}

        {(() => {
          if (plandata == true) {
            return (
              <View>
                <Grid
                  item
                  xs={12}
                  style={{ marginLeft: "10px" }}
                >
                  <Grid item container spacing={0} justify="space-warp">
                    {/* <Grid >
                    <Button
                                        varient="outlined"

                                        className={clsx((radioValue!==1) && classes.normal, (radioValue === 1) && classes.normalSelected)}

                                        >

                                      {<Text style={{ fontSize: '12px',

                                fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                               color: '#fff',
                                transition : 'all 0.25s',}}>0-499 ORDERS/MO</Text>}

                                        </Button>
                    </Grid> */}
                    {/* <Grid className={classes.hairline1} item xs ={(Platform.OS === 'android') ? 0.5 : 1}>
                             </Grid>
                    <Grid  >
                    <Button

                                        className={clsx((radioValue!==2) && classes.urgent, (radioValue===2) && classes.urgentSelected)}

                                        >
                                         {<Text style={{ fontSize: '12px',

                                fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                               color: '#fff',
                                transition : 'all 0.25s',}}>500-9,999 ORDERS/MO</Text>}

                                        </Button>
                    </Grid> */}
                    {/* <Grid className={classes.hairline1} item xs ={(Platform.OS === 'android') ? 0.5 : 1} >
                             </Grid>
                    <Grid >
                    <Button

                                        className={clsx((radioValue!==3) && classes.veryUrgent, (radioValue===3) && classes.veryUrgentSelected)}

                                        >
                                            {<Text style={{ fontSize: '12px',

                                fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                               color: '#fff',
                                transition : 'all 0.25s',}}>10,000+ ORDERS/MO</Text>}

                                        </Button>
                    </Grid> */}

                {/*    <Grid
                      item
                      style={{
                        marginLeft: "10px",
                        marginTop: "10px",
                        padding: "0",
                      }}
                    >
                      {/* <TextField
          id="outlined-select-currency-native"
          select
         fullWidth
        //  label="Payment Currency"
          value={selectcurrency}
          onChange={handleChange1}
          SelectProps={{
            native: true,
          }}
          size='small'
          type="text"
          style={{fontSize: '12px',
          //fontWeight: '700',

          fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}
          variant="outlined"
        >
         {currencyData.map(option => (

         <option  style={{fontSize: '14px',
         //fontWeight: '700',
         paddingLeft:'15px',
         cursor:'pointer',
         fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}
          key={option.id} value={option.currency}
            >
          {option.currency}
         </option>
       ))}
        </TextField> */}

                  {/*    <Autocomplete
                        id="combo-box-demo"
                        fullWidth
                        options={currencyData}
                        getOptionLabel={(option) => option.currency}
                        value={selectcurrency}
                        style={{ width: 300 }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            placeholder="Search Currency"
                            variant="outlined"
                          />
                        )}
                        onChange={(event, newValue) => {
                          if (newValue !== null) {
                            setSelectcurrency(newValue);
                          }
                          console.log("newvalue", newValue);
                        }}
                      />
                    </Grid>
                    <Grid style={{ marginLeft: "10px" }}>
                      <Link
                        underline="always"
                        onClick={() => {
                          handleViewPricePlan();
                        }}
                      >
                        <Text
                          style={{
                            color: "#0000FF",
                            marginTop: "10%",
                            cursor: "pointer",
                          }}
                        >
                          {"\n"}View Pricing Plans
                        </Text>
                      </Link>
                    </Grid>*/}
                  </Grid>
                </Grid>
              </View>
            );
          } else {
            return (
              <View>
                <Grid
                  item
                  xs={12}
                  style={{ marginLeft: "10px"}}
                >
                  <Grid item container spacing={0} justify="space-warp">
                    {/* <Grid >

<Button
                    varient="outlined"

                    className={clsx((radioValue!==1) && classes.normal, (radioValue === 1) && classes.normalSelected)}

                    >

                  {<Text style={{ fontSize: '12px',

            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
           color: '#fff',

            transition : 'all 0.25s',}}>0-499 ORDERS/MO</Text>}

                    </Button>

</Grid> */}

                    {/* <Grid className={classes.hairline1} item xs ={(Platform.OS === 'android') ? 0.5 : 1}>
         </Grid>

<Grid  >

<Button


                    className={clsx((radioValue!==2) && classes.urgent, (radioValue===2) && classes.urgentSelected)}


                    >
                     {<Text style={{ fontSize: '12px',

            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
           color: '#fff',

            transition : 'all 0.25s',}}>500-9,999 ORDERS/MO</Text>}

                    </Button>


</Grid> */}

                    {/* <Grid className={classes.hairline1} item xs ={(Platform.OS === 'android') ? 0.5 : 1} >
         </Grid>
<Grid >

<Button


                    className={clsx((radioValue!==3) && classes.veryUrgent, (radioValue===3) && classes.veryUrgentSelected)}


                    >
                        {<Text style={{ fontSize: '12px',

            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
           color: '#fff',

            transition : 'all 0.25s',}}>10,000+ ORDERS/MO</Text>}

                    </Button>

</Grid> */}
                {/*    <Grid
                      item
                      style={{
                        marginLeft: "10px",
                        padding: "0",
                      }}
                    >
                      <Autocomplete
                        id="combo-box-demo"
                        fullWidth
                        options={currencyData}
                        getOptionLabel={(option) => option.currency}
                        value={selectcurrency}
                        style={{ width: 300 }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            placeholder="Search Currency"
                            variant="outlined"
                          />
                        )}
                        onChange={(event, newValue) => {
                          if (newValue !== null) {
                            setSelectcurrency(newValue);
                          }
                          console.log("newvalue", newValue);
                        }}
                      />
                    </Grid>
                    <Grid style={{ marginLeft: "10px" }}>
                      <Link
                        underline="always"
                        onClick={() => {
                          handleViewPricePlan();
                        }}
                      >
                        <Text
                          style={{
                            color: "#0000FF",
                            marginTop: "10%",
                            cursor: "pointer",
                          }}
                        >
                          {"\n"}View Pricing Plans
                        </Text>
                      </Link>
                    </Grid>*/}
                  </Grid>
                </Grid>
              </View>
            );
          }
        })()}

        {/* my code ending here */}

        {(() => {
          if (plandata === true) {
            return (
              <View>
                <Grid
                  container
                  item
                  justify="flex-start"
                  style={{ marginTop: "1%", marginLeft: "18px" }}
                >
                  {/* onClick={()=>{handleNext()}} */}

                  <Grid>
                    <ColorButton21
                      size="large"
                      variant="contained"
                      color="primary"
                      //className={classes.submit}
                      //   disabled={!formState.isValid}
                      onClick={() => {
                        addPlan();
                      }}
                    >
                      Add Payment Method
                    </ColorButton21>
                    {/* <Link underline='always'  onClick={()=>{addPlan()}}><Text  style={{color:'#0000FF',cursor: 'pointer'}}>
              </Text></Link> */}
                  </Grid>
                  <Grid>
                    &nbsp;&nbsp;{" "}
                    <ColorButton
                      size="large"
                      variant="contained"
                      color="primary"
                      //className={classes.submit}
                      //   disabled={!formState.isValid}
                      onClick={() => {
                        props.updateHeaderTransaction("Current Statements");
                        // props.handleDashboard("historytransaction")
                      }}
                    >
                      Current Statements
                    </ColorButton>
                    &nbsp;&nbsp;
                    <ColorButton
                      size="large"
                      variant="contained"
                      color="primary"
                      //className={classes.submit}
                      //   disabled={!formState.isValid}
                      onClick={() => {
                        props.updateHeaderTransaction("All Statements");
                        // props.handleDashboard("historytransaction")
                      }}
                    >
                      All Statements
                    </ColorButton>
                    &nbsp;&nbsp;
                    <ColorButton
                      size="large"
                      variant="contained"
                      color="primary"
                      //className={classes.submit}
                      //   disabled={!formState.isValid}
                      onClick={() => {
                        props.updateHeaderTransaction("All Transactions");
                        // props.handleDashboard("historytransaction")
                      }}
                    >
                      All Transactions
                    </ColorButton>
                  </Grid>
                </Grid>
              </View>
            );
          } else {
            return (
              <View>
                <Grid
                  container
                  item
                  justify="flex-start"
                  style={{ marginTop: "3%", marginLeft: "18px" }}
                >
                  {/* onClick={()=>{handleNext()}} */}

                  <Grid>
                    {/* <Link underline='always'  onClick={()=>{updatePlan()}}><Text  style={{color:'#0000FF',cursor: 'pointer'}}>Add Payment Method
                   </Text></Link>
                    */}

                    <ColorButton21
                      size="large"
                      variant="contained"
                      color="primary"
                      //className={classes.submit}
                      //   disabled={!formState.isValid}
                      onClick={() => {
                        updatePlan();
                      }}
                    >
                      Add Payment Method
                    </ColorButton21>
                  </Grid>
                  <Grid>
                    &nbsp;&nbsp;{" "}
                    <ColorButton
                      size="large"
                      variant="contained"
                      color="primary"
                      //className={classes.submit}
                      //   disabled={!formState.isValid}
                      onClick={() => {
                        props.updateHeaderTransaction("Current Statements");
                        // props.handleDashboard("historytransaction")
                      }}
                    >
                      Current Statements
                    </ColorButton>
                    &nbsp;&nbsp;
                    <ColorButton
                      size="large"
                      variant="contained"
                      color="primary"
                      //className={classes.submit}
                      //   disabled={!formState.isValid}
                      onClick={() => {
                        props.updateHeaderTransaction("All Statements");
                        // props.handleDashboard("historytransaction")
                      }}
                    >
                      All Statements
                    </ColorButton>
                    &nbsp;&nbsp;
                    <ColorButton
                      size="large"
                      variant="contained"
                      color="primary"
                      //className={classes.submit}
                      //   disabled={!formState.isValid}
                      onClick={() => {
                        props.updateHeaderTransaction("All Transactions");
                        //props.handleDashboard("historytransaction")
                      }}
                    >
                      All Transactions
                    </ColorButton>
                  </Grid>
                </Grid>
              </View>
            );
          }
        })()}

        <Grid justify="center">
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            key={`${vertical},${horizontal}`}
            open={open1}
            autoHideDuration={3000}
            onClose={handleClose3}
          >
            <Alert onClose={handleClose3} severity="error">
              First Create the Send Inventory.
            </Alert>
          </Snackbar>
        </Grid>
        <Box mr={3}>
          <List>
            {shipData.map((data, index) => (
              <Grid item xs={12} md={9} lg={7} style={{ marginLeft: "10px" }}>
                <Paper className={paperlist}>
                  <Grid items xs={12} md={12} lg={12} container>
                    <Grid items xs={3} md={3} lg={3} alignItems="center">
                      <Typography style={{ fontSize: 16 }}>
                        ************
                        {data.cardnumber.substr(data.cardnumber.length - 4)}
                      </Typography>
                    </Grid>
                    <Grid items xs={3} md={2} lg={2} justify="center">
                      <Typography style={{ fontSize: 14 }}>
                        {data.cardholdername}
                      </Typography>
                    </Grid>
                    <Grid items xs={3} md={2} lg={2} justify="center">
                      <Typography style={{ fontSize: 14 }}>
                        {data.expiredate}
                      </Typography>
                    </Grid>
                    <Grid items xs={3} md={2} lg={2} justify="flex-end">
                      <Typography
                        style={{ fontSize: 14 }}
                        onClick={() => {
                          handleClickOpendefault(data);
                        }}
                      >
                        {data.defaultcard === true ? "Default" : "Set default"}
                      </Typography>
                    </Grid>
                    {/* <Grid items xs={2} md={1} lg={1}  justify="center">
    <Typography style={{fontSize:14}}  onClick={()=>{
      //handleClickOpendefault(data)
      }}>
   {data.currency}
    </Typography></Grid> */}
                    <Grid
                      items
                      xs={3}
                      md={1}
                      lg={1}
                      justify="flex-end"
                      style={{ marginLeft: "8%", cursor: "pointer" }}
                    >
                      <EditIcon
                        fontSize="small"
                        onClick={() => {
                          handleEdit(data);
                        }}
                      />
                    </Grid>
                    <Grid
                      items
                      xs={3}
                      md={1}
                      lg={1}
                      justify="flex-end"
                      style={{ cursor: "pointer" }}
                    >
                      <DeleteIcon
                        fontSize="small"
                        onClick={() => {
                          handleClickOpendelete(data.customercardId);
                        }}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))}
          </List>
        </Box>

        <DeleteCard
          openDeleteCard={openDelete}
          deleteCard={deleteCard}
          handleDeleteCancle={handleDeleteCancle}
        />

        <MakeDefaultCard
          openDefaultCard={openDefaultCard}
          updateCardDefault={updateCardDefault}
          handleDeleteCancle={handleDeleteCancle}
        />
      </View>
    </View>
  );
}