import React from "react";
import clsx from "clsx";
import {
  Platform,
  View,
  Image,
  Text,
  Dimensions,
} from "react-native";
import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import popUpStyle from "./style/popUpStyle";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import Link from "@material-ui/core/Link";
import PropTypes from "prop-types";
import * as shiphypeService from "./ShipService/shiphype_service";
import validate from "validate.js";
import Toast from "./feedback/Toast";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import FormLabel from "@material-ui/core/FormLabel";
import paypal from "../../assets/icons/paypal.png"
import ProgressBar from './feedback/ProgressBar';

import {
  SquarePaymentForm,
  CreditCardNumberInput,
  CreditCardExpirationDateInput,
  CreditCardPostalCodeInput,
  CreditCardCVVInput,
  CreditCardSubmitButton,
} from "react-square-payment-form";
import "react-square-payment-form/lib/default.css";
const schema = {
  name: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 64,
    },
  },
  familyname: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 64,
    },
  },
  email_address: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 64,
    },
  },
  phone_number: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 64,
    },
  },
  reference_id: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 64,
    },
  },
  note: {
    presence: { allowEmpty: false, message: "is required" },
  },
};

const currencyData =[
{
  "id":1,
  "currency":"USD"
},
{
  "id":2,
  "currency":"CAD"
}

];


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
  paper1: {
    padding: theme.spacing(2),
    borderRadius: "0px",
    overflow: "auto",
    border: "1px solid #cccccc",
  },
  paper9: {
    padding: theme.spacing(2),
    borderRadius: "0px",
    overflow: "auto",
    // height:'80vh'
  },
  paper2: {
    height: "auto",
    width: "98%",
    borderRadius: "0px",
    //  overflow: 'auto',
    border: "1px solid #cccccc",
    color: "#fff",
    textAlign: "center",
  },
  button4: {
    border: " 1px solid #fff",
    borderRadius: "0px",
    color: "#fff",
    height: "auto",
    width: "100%",
    border: "1px solid #cccccc",
    textAlign: "center",
  },
  ImagesDesign: {
    width: "100px",
    height: "38px",
    marginTop: "0px",
    marginRight: "50px",
  },
  setupbutton9: {
    border: " 1px solid #fff",
    borderRadius: "0px",
    color: "#fff",
    marginTop: "2%",
    height: "120vh",
    width: "100%",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(3),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    border: "1px solid #cccccc",
    textAlign: "center",
  },
  footCss9: {
    // border : ' 1px solid #fff',
    borderRadius: "8%",
    height: 250,
    color: "#fff",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(3),
    // paddingLeft: theme.spacing(4),
    // paddingRight: theme.spacing(4),
    // border:'1px solid #cccccc',
    textAlign: "center",
  },
  paper7: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
    borderRadius: "0px",
    overflow: "auto",
    border: " 1px solid #fff",

    color: "#fff",
    backgroundColor: "#0168fa",
    borderColor: "#0168fa",
    "&:hover": {
      backgroundColor: "#0168fa",
      borderColor: "#0168fa",
    },
  },
  button7: {
    border: " 1px solid #fff",
    borderRadius: "0px",
    border: "1px solid #cccccc",
    color: "#fff",
    textAlign: "center",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    marginTop: "3px",
    // paddingLeft: theme.spacing(14),
    // paddingRight: theme.spacing(14),
  },
  Dashboardpaper: {
    border: "1px solid #ced4da",
    // boxShadow: '7px 2px 2px #cccccc',
    // shadowColor: '#000',
    //    shadowOffset: { width: 0, height: 1 },
    //    shadowOpacity: 0.8,
    //    shadowRadius: 2,
    //    elevation: 5,
    height: 100,
    width: 270,

    marginLeft: "5%",
    marginTop: "8%",
  },
  title: {
    marginLeft: "1%",
  },
  Dashboardpaper2: {
    border: "1px solid #ced4da",
    // boxShadow: '7px 2px 2px #cccccc',
    // shadowColor: '#000',
    //    shadowOffset: { width: 0, height: 1 },
    //    shadowOpacity: 0.8,
    //    shadowRadius: 2,
    //    elevation: 5,
    height: 500,
    width: 270,
    borderRadius: "2px",
    marginLeft: "6px",

    marginTop: "1%",
  },
  Dashboardpaper3: {
    border: "1px solid #ced4da",
    // boxShadow: '7px 2px 2px #cccccc',
    // shadowColor: '#000',
    //    shadowOffset: { width: 0, height: 1 },
    //    shadowOpacity: 0.8,
    //    shadowRadius: 2,
    //    elevation: 5,
    height: 500,
    width: 270,
    borderRadius: "2px",
    marginLeft: "77px",

    marginTop: "1%",
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
  dividerFullWidth1: {
    marginTop: "1%",
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

  sqcreditcard:{
    width: '100%',
    height: 20,
    marginTop: '10px',
    backgroundColor: "#0168fa",
    borderRadius: 4,
    cursor: 'pointer',
    display: 'block',
    color: '#fff',
    fontSize: 12,
    fontWeight: 700,
    textAlign: 'center',
    border: 0,
  }

}));

export default function Payment(props) {
  const classes = useStyles();
  const [completed, setCompleted] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);
  const [progressBar, setProgress] = React.useState(true);
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight1);
  const [editSprint, setEditSprint] = React.useState(null);
  const [value, setValue] = React.useState("9");
  const [value1, setValue1] = React.useState("2");
  const [openPageExits, setPageExits] = React.useState(0);
  const [dataproduct, setDataProduct] = React.useState([]);
  const [moduleid, setModuleid] = React.useState([]);
  const [changedWarehouseid, setchangedWarehouseid] = React.useState([]);
  const [changedOptionid, setchangedOptionid] = React.useState([]);
  const [optionid, setOptionId] = React.useState([]);
  const [editRoleData, setEditRoleData] = React.useState(null);
  const [warehouseStatus, setWarehouseStatus] = React.useState(false);
  const [qualitycontrol, setQualitycontrol] = React.useState(false);
  const [termscondition, setTermscondition] = React.useState(false);
  const [defaultcard, setDefaultcard] = React.useState(false);
  const [shipData, setShipData] = React.useState([]);
  const [isNext, setIsNext] = React.useState(false);
  const [cardData, setCardData] = React.useState({});
  const [saveNonce, setSaveNonce] = React.useState("");
  const [cardid, setCardid] = React.useState(0);

  const [selectcurrency,setSelectcurrency]=React.useState("USD");
  //const [selectproduct,setSelectproduct]=React.useState(false);

  const userid = props.user_id;
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [type, setType] = React.useState("");
  const [status, setStatus] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const module = [];
  const optionArray = [];

  const [state, setState] = React.useState({
    errorMessages: [],
  });

  const [sandboxid, setSandboxid] = React.useState(
    "sq0idp-M0v9HeKe4ti2AtsXEGlbyg"
  );
  const [formState, setFormState] = React.useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });
  const handleChangeRadio = (event) => {
    // if(event.target.value !== "3"){

    // }else{
    //   props.openSquareView();
    // }
    setValue1(event.target.value);
  };
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


  const handleChange1=(event)=>{
setSelectcurrency(event.target.value);
  }
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
  /**
   * screen size
   */

  let screenWidth = Dimensions.get("window").width;
  console.log(screenWidth);
  let setupwizrd = 0;
  let setupbutton = 0;
  let setupbutton9 = 0;
  let footCss = 0;
  let footCss9 = 0;
  if (screenWidth < 400) {
    setupwizrd = classes.paper7;
    setupbutton = classes.button7;
    footCss = classes.footCss;
  } else if (screenWidth < 690) {
    setupwizrd = classes.paper7;
    setupbutton = classes.button7;
    footCss = classes.footCss;
  } else if (screenWidth < 1530) {
    setupwizrd = classes.paper2;
    setupbutton = classes.button4;
    footCss = classes.footCss9;
    setupbutton9 = classes.setupbutton9;
  } else {
    setupwizrd = classes.paper2;
    setupbutton = classes.button4;
    footCss = classes.footCss9;
  }
  React.useEffect(() => {
    function tick() {
      progress.current();
    }
    const timer = setInterval(tick, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const addEditCard = () => {
    setLoading(true);
    if (props.editCard === null) {
      if (shipData.length < 3) {
        const cardholdername = formState.values.name;
        const cardnumber = cardData.last_4;
        // const expiredate1=formState.values.expire;
        const expiredate = cardData.exp_month + "/" + cardData.exp_year;
        const cvvnumber = "111";
        const defaultcardselect = defaultcard;
        const currency="USD";
        shiphypeService
          .addCreditCard(
            cardholdername,
            cardnumber,
            expiredate,
            cvvnumber,
            userid,
            defaultcardselect,
            saveNonce,currency
          )
          .then((response) => {
            console.log("status", response.status);
            if (response.status === true) {
              setCardid(response.data.customercardId);
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
      } else {
        setOpen(true);
        setType("error");
        setMsg("You can not add more than three card");
        //setStatus(response.status);
        setLoading(false);
      }
    } else {
      const customercardId = props.editCard.customercardId;
      const cardholdername = formState.values.name;
      const cardnumber = formState.values.ccnumber;
      const expiredate1 = formState.values.expire;
      const expiredate = expiredate1 + "/" + formState.values.expire1;
      const cvvnumber = formState.values.cvv;
      const defaultcardselect = defaultcard;
      const currency="USD";
      shiphypeService
        .updateCreditCard(
          customercardId,
          cardholdername,
          cardnumber,
          expiredate,
          cvvnumber,
          defaultcardselect,
          userid,
          currency
        )
        .then((response) => {
          console.log("status", response.status);
          if (response.status === true) {
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
    }
  };

  const addStepStatus = () => {
    setLoading(true);

    // const userid=user_id;
    const shiphypesubsubstepId = 0;
    const shiphypesubstepId = 13;
    const shiphypestepId = 0;

    const given_name = formState.values.name;
    const family_name = formState.values.familyname;
    const email_address = formState.values.email_address;
    const phone_number = formState.values.phone_number;
    const reference_id = formState.values.reference_id;
    const note = formState.values.note;
    const customercardid = cardid;
    const card_nonce = saveNonce;
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
          setLoading(true);
          shiphypeService
            .createSquareupCustomer(
              given_name,
              family_name,
              email_address,
              phone_number,
              reference_id,
              note,
              customercardid
            )
            .then((response) => {
              console.log("status", response.status);
              if (response.status === true) {
                setLoading(false);

                shiphypeService
                  .createSquareupCustomerCard(
                    card_nonce,
                    response.data,
                    customercardid
                  )
                  .then((response) => {
                    console.log("status", response.status);
                    if (response.status === true) {
                      setLoading(false);
                      props.handleNextPage("PaymentRecieveSetting");
                    } else {
                      setLoading(false);
                      console.log("message", response.message);
                    }
                  })
                  .catch((error) => {
                    console.error(error);
                  });
              } else {
                setLoading(false);
                console.log("message", response.message);
              }
            })
            .catch((error) => {
              console.error(error);
            });

          //setIsNext(false);
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
   * Description:To do set value of checkbox
   * @param {*} event
   */
  const handleChangeprintsku = (event) => {
    setTermscondition(event.target.checked);
  };

  /**
   * Description:To do set default card
   */
  const handleChangeDefaultCard = (event) => {
    setDefaultcard(event.target.checked);
  };

  const openTermsAndCondition = () => {
    console.log("openterms");
  };

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

  const cardNonceResponseReceived = (errors, nonce, cardData) => {
    if (errors) {
      setState({ errorMessages: errors.map((error) => error.message) });
      setOpen(true);
      setType("error");
      setMsg(errors[0].message);
      setStatus(false);
      console.log("errormes", errors[0].message);
      return;
    }
    setState({ errorMessages: [] });
    setIsNext(true);
    setCardData(cardData);
    setSaveNonce(nonce);
    //alert("nonce created: " + nonce);
    console.log("nonce", nonce);
    console.log("carddata", cardData);
  };

  //Make custom button
  const ColorButton = withStyles((theme) => ({
    root: {
      color: '#fff',
      borderRadius : '3px',
      //  paddingTop: '9%',
      //  paddingBottom: '9%',
      height:'100%',
      width:'90px',
       fontSize:'11px',
       fontWeight: '550',
       color:'#fff',
       backgroundColor:'#0168fa',
    '&:hover': {
      backgroundColor: '#002080',
      
    },
    },
  }))(Button);
  const ColorButton2 = withStyles((theme) => ({
    root: {
      color: "#fff",
      backgroundColor: "#0168fa",
      borderColor: "#0168fa",
      paddingTop: "0%",
      paddingBottom: "0%",
      paddingLeft: "8%",
      paddingRight: "8%",
      marginTop: "1%",
      marginBottom: "1%",
      borderRadius: "3px",
      "&:hover": {
        backgroundColor: "#002080",
      },
    },
  }))(Button);
  const handleClickOpen = () => {
    setEditSprint(null);
    setOpenMarketPlace(true);

    console.log("click button");
  };

  const handleNext = () => {};
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

  React.useEffect(() => {
    fetchCard();
  }, []);

  const fetchCard = () => {
    setLoading(true);
    shiphypeService
      .fetchCreditCard(userid)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          setShipData(response.data);
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
    if (props.editCard !== null) {
      bindData(props.editCard);
    }
  }, []);

  const bindData = (data) => {
    console.log("bind call", data);

    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        name: data.cardholdername,
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
        ccnumber: data.cardnumber,
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
        zipcode: "201303",
        checkFrom: false,
      },
      touched: {
        ...formState.touched,
        zipcode: true,
      },
    }));

    const str = data.expiredate;
    const strCopy = str.split("/");

    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        expire: strCopy[0],
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
        expire1: strCopy[1],
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
        cvv: data.cvvnumber,
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

  const nextPage10 = () => {
    props.handleNextPage("billing");
  };

  /**
   * Description:Callback function after api call
   */
  const handleClose = () => {
    setOpen(false);
    if (status === true) {
      addStepStatus();
    } else {
    }
  };

  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false;
  return (
    <View className={classes.content}>
      <View className={classes.appBarSpacer} />

      <View>
        {/* <Grid container justify="space-between">
          <Grid
            item
            xs={12}
            md={4}
            lg={4}
            style={popUpStyle.breadCrumSidePadding}
          >
             <Link  onClick={()=>{props.handleDashboard('01')}}>
            <Text style={popUpStyle.breadCrundCss1}>DASHBOARD /</Text>
            </Link>
            <Text style={popUpStyle.breadCrundCss}>  Billing </Text>
          <Text style={popUpStyle.breadCrundCss2}> / add payment method {'\n'} </Text> 
          </Grid>
          <Grid item xs={12} md={3} lg={3}></Grid>

        </Grid> */}

        <Grid item  container lg={12}>
            <Grid item  lg={8}  style={popUpStyle.breadCrumSidePadding}
            //style={{ marginLeft:'4px'}}
            >
          <Link  onClick={()=>{props.handleDashboard('01')}}>
            <Text style={popUpStyle.breadCrundCss1}>DASHBOARD /</Text>
            </Link>
            {/* <Text style={popUpStyle.breadCrundCss}>  Billing </Text> */}
            <Text style={popUpStyle.breadCrundCss}> Billing</Text>
          <Text style={popUpStyle.breadCrundCss2}> / ADD PAYMENT METHOD {'\n'} </Text> 
          
              </Grid>
              <Grid item lg={3}  style={{marginLeft:'20px',marginTop:'15px'}}>
              <Grid container item  justify="flex-end">
              <ColorButton
                          size="large"
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            nextPage10();
                          }}
                        >
                          Back
                        </ColorButton>

</Grid>
           </Grid>  
              
              </Grid>
      </View>

      <Grid justify="center">
            <ProgressBar 
             loading={loading}
            />
            </Grid>
      <View className={classes.paper9}>
        <View style={popUpStyle.paddingSide}>
          {(() => {
            if (parseInt(value1) === 1) {
              return (
                <View>
                  <View>
                    <FormControl component="fieldset">
                      <RadioGroup
                        row
                        aria-label="position"
                        name="position"
                        defaultValue="top"
                        value={value1}
                        onChange={handleChangeRadio}
                      >
                        <Grid container style={{ marginLeft: "0px" }}>
                          <Grid item xs={12} md={2}>
                            <Grid container>
                              <Grid item xs={12} md={2}>
                                <FormControlLabel
                                  value="2"
                                  control={<Radio color="primary" />}
                                />
                              </Grid>

                              <Grid item xs={12} md={10}>
                                <Grid container>
                                  <CreditCardIcon
                                    style={{ marginTop: "10px" }}
                                    defaultValue="bottom"
                                  />
                                  {/* </Grid> */}

                                  {/* <Grid item xs={12} md={4}> */}
                                  <FormLabel
                                    component="legend"
                                    style={{
                                      color: "#4D5051",
                                      marginTop: "15px",
                                      fontSize: "12px",
                                    }}
                                  >
                                    CREDIT CARD
                                  </FormLabel>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>

                          <Grid item xs={12} md={2}>
                            <Grid container>
                              <Grid item xs={12} md={2}>
                                <FormControlLabel
                                  value="1"
                                  control={<Radio color="primary" />}
                                />
                              </Grid>

                              <Grid item xs={12} md={8}>
                                <Grid container>
                                  {/* <CreditCardIcon
                                    defaultValue="bottom"
                                    style={{ marginTop: "10px" }}
                                  /> */}
                                  <Image className={classes.ImagesDesign} source={paypal} />
                                 

                                  
                                  {/* <FormLabel
                                    component="legend"
                                    style={{
                                      color: "#4D5051",
                                      marginTop: "15px",
                                      fontSize: "12px",
                                    }}
                                  >
                                    PAYPAL
                                  </FormLabel> */}
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </RadioGroup>
                    </FormControl>
                  </View>

                  {/* befor code was here */}

                  <View>
                    <Grid
                      item
                      xs={12}
                      md={6}
                      lg={6}
                      justify="flex-start"
                      className={classes.dividerFullWidth1}
                    >
                      <Text
                        style={{
                          fontSize: "13px",
                          fontWeight: "700",
                          marginLeft: "2px",
                          fontFamily:
                            '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                          color: "#4D5051",

                          transition: "all 0.25s",
                        }}
                      >
                        Click the button below to authorize Payments from PayPal:
                      </Text>
                    </Grid>

                    <Grid item xs={12} md={2} lg={2}></Grid>
                  </View>

                  <View>
                    <Grid
                      item
                      xs={12}
                      md={4}
                      lg={4}
                      justify="flex-start"
                      className={classes.dividerFullWidth1}
                    >
                      <Button
                        variant="contained"
                        size="large"
                        style={{
                          fontSize: "13px",
                          fontWeight: "normal",
                          marginTop: "20px",
                          color: "white",
                          backgroundColor: "#0168fa",
                          // #2B8DD3
                        }}
                      >
                        CONNECT TO PAYPAL
                      </Button>
                    </Grid>

                    <Grid item xs={12} md={4} lg={4}>
                      {" "}
                    </Grid>
                  </View>

                  <View>
                    <Grid
                      container
                      item
                      xs={12}
                      md={6}
                      justify="center"
                      style={{ marginTop: "15px" }}
                    >
                      <Grid></Grid>

                      <Grid style={{ marginLeft: "10px" }}>
                        {/* <ColorButton
                          size="large"
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            nextPage10();
                          }}
                        >
                          Back
                        </ColorButton> */}
                        &nbsp;&nbsp;&nbsp;
                        {/* <Button variant="contained" color="secondary">
                          Add PayPal
                        </Button> */}
                      </Grid>
                    </Grid>
                  </View>
                </View>
              );
            }
          })()}

          {(() => {
            if (parseInt(value1) === 2) {
              return (
                <View>
                  <View>
                    <FormControl component="fieldset">
                      <RadioGroup
                        row
                        aria-label="position"
                        name="position"
                        defaultValue="top"
                        value={value1}
                        onChange={handleChangeRadio}
                      >
                        <Grid container style={{ marginLeft: "0px" }}>
                          <Grid item xs={12} md={2}>
                            <Grid container>
                              <Grid item xs={12} md={2}>
                                <FormControlLabel
                                  value="2"
                                  control={<Radio color="primary" />}
                                />
                              </Grid>

                              <Grid item xs={12} md={10}>
                                <Grid container>
                                  <CreditCardIcon
                                    style={{ marginTop: "10px" }}
                                    defaultValue="bottom"
                                  />

                                  <FormLabel
                                    component="legend"
                                    style={{
                                      color: "#4D5051",
                                      marginTop: "15px",
                                      fontSize: "12px",
                                    }}
                                  >
                                    CREDIT CARD
                                  </FormLabel>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>

                          <Grid item xs={12} md={2}>
                            <Grid container>
                              <Grid item xs={12} md={2}>
                                <FormControlLabel
                                  value="1"
                                  control={<Radio color="primary" />}
                                />
                              </Grid>

                              <Grid item xs={12} md={8}>
                                <Grid container>
                                  {/* <CreditCardIcon
                                    defaultValue="bottom"
                                    style={{ marginTop: "10px" }}
                                  /> */}
                                  <Image className={classes.ImagesDesign} source={paypal} />
                                  {/* <FormLabel
                                    component="legend"
                                    style={{
                                      color: "#4D5051",
                                      marginTop: "15px",
                                      fontSize: "12px",
                                    }}
                                  >
                                    PAYPAL
                                  </FormLabel> */}
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </RadioGroup>
                    </FormControl>
                  </View>

                  {/* befor code was here */}

                  <View>
                    <View>
                      <Grid container>
                        <CreditCardIcon
                          style={{ color: "#4D5051", marginTop: "10px" }}
                          defaultValue="bottom"
                        />
                        {/* </Grid> */}

                        {/* <Grid item xs={12} md={4}> */}
                        <FormLabel
                          style={{
                            color: "#4D5051",
                            marginLeft: "20px",
                            marginTop: "15px",
                          }}
                        >
                          Add credit or debit card
                        </FormLabel>
                      </Grid>
                    </View>

                    {isNext === false ? (
                      <div>
                        {showToast(open, msg, type)}
                        <SquarePaymentForm
                          sandbox={false}
                          applicationId={sandboxid}
                          cardNonceResponseReceived={cardNonceResponseReceived}
                          
                          inputStyles={[{
    fontSize: '16px',
    fontFamily: 'Helvetica Neue',
    padding: '10px',
    color: '#373F4A',
    lineHeight: '12px',
    placeholderColor: '#BDBFBF'
  }]}
                        >
                          <fieldset className="sq-fieldset">
                            <CreditCardNumberInput />

                            <div className="sq-form-third">
                              <CreditCardExpirationDateInput />
                            </div>
                            <div className="sq-form-third">
                              <CreditCardPostalCodeInput />
                            </div>
                            <div className="sq-form-third">
                              <CreditCardCVVInput />
                            </div>
                          </fieldset>

                          <CreditCardSubmitButton className="sq-creditcard">Next</CreditCardSubmitButton>
                        </SquarePaymentForm>
                      </div>
                    ) : (
                      <form className={classes.form}>
                        {showToast(open, msg, type)}
                        <Grid
                          justify="space-between" // Add it here :)
                          container
                          spacing={2}
                        >
                          <Grid
                            item
                            xs={12}
                            md={6}
                            lg={6}
                            style={{ marginLeft: "0px" }}
                          >
                            <Grid item xs={10}>
                              <TextField
                                id="name"
                                name="name"
                                variant="outlined"
                                fullWidth
                                error={hasError("name")}
                                helperText={
                                  hasError("name")
                                    ? formState.errors.name[0]
                                    : null
                                }
                                placeholder="Cardholder name"
                                size="small"
                                type="text"
                                onChange={handleChange("name")}
                                className={classes.profileMargin1}
                                value={formState.values.name || ""}
                              />
                            </Grid>
                            <Grid item xs={10}>
                              <TextField
                                id="familyname"
                                name="familyname"
                                variant="outlined"
                                fullWidth
                                error={hasError("familyname")}
                                helperText={
                                  hasError("familyname")
                                    ? formState.errors.familyname[0]
                                    : null
                                }
                                placeholder="Family Name"
                                size="small"
                                type="text"
                                onChange={handleChange("familyname")}
                                className={classes.profileMargin1}
                                value={formState.values.familyname || ""}
                              />
                            </Grid>
                            <Grid item xs={10}>
                              <TextField
                                id="email_address"
                                name="email_address"
                                variant="outlined"
                                fullWidth
                                error={hasError("email_address")}
                                helperText={
                                  hasError("email_address")
                                    ? formState.errors.email_address[0]
                                    : null
                                }
                                placeholder="Email address"
                                size="small"
                                type="text"
                                onChange={handleChange("email_address")}
                                className={classes.profileMargin1}
                                value={formState.values.email_address || ""}
                              />
                            </Grid>
                            <Grid item xs={10}>
                              <TextField
                                id="phone_number"
                                name="phone_number"
                                variant="outlined"
                                fullWidth
                                error={hasError("phone_number")}
                                helperText={
                                  hasError("phone_number")
                                    ? formState.errors.phone_number[0]
                                    : null
                                }
                                placeholder="Phone number"
                                size="small"
                                type="number"
                                onChange={handleChange("phone_number")}
                                className={classes.profileMargin1}
                                value={formState.values.phone_number || ""}
                              />
                            </Grid>
                            <Grid item xs={10}>
                              <TextField
                                id="reference_id"
                                name="reference_id"
                                variant="outlined"
                                fullWidth
                                error={hasError("reference_id")}
                                helperText={
                                  hasError("reference_id")
                                    ? formState.errors.reference_id[0]
                                    : null
                                }
                                placeholder="Reference id"
                                size="small"
                                type="text"
                                onChange={handleChange("reference_id")}
                                className={classes.profileMargin1}
                                value={formState.values.reference_id || ""}
                              />
                            </Grid>
                            <Grid item xs={10}>
                              <TextField
                                id="note"
                                name="note"
                                variant="outlined"
                                fullWidth
                                error={hasError("note")}
                                helperText={
                                  hasError("note")
                                    ? formState.errors.note[0]
                                    : null
                                }
                                placeholder="Note"
                                size="small"
                                type="text"
                                onChange={handleChange("note")}
                                className={classes.profileMargin1}
                                value={formState.values.note || ""}
                              />
                            </Grid>

                            {/* <Grid item xs={10} style={{marginTop:'5px'}}>
          
    <TextField
          id="outlined-select-currency-native"
          select
          fullWidth
        //  label="Payment Currency"
          value={selectcurrency}
          onChange={handleChange1}
          SelectProps={{
            native: true,
          }}
          size='medium'
          type="text"
          style={{fontSize: '12px',
          //fontWeight: '700',
          
          fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}
          variant="outlined"
        >
            <option value='0' disabled  style={{fontSize: '14px',
            //fontWeight: '700',
            paddingLeft:'15px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>Select Currency</option>
     
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
        </TextField>


              </Grid> */}
             
                            <Grid items lg={10} spacing={1} container>
                              <Grid
                                items
                                xs={8}
                                md={4}
                                lg={2}
                                style={{ marginTop: "5px", marginLeft: "5px" }}
                              >
                                <FormGroup>
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        checked={defaultcard}
                                        onChange={handleChangeDefaultCard}
                                        name="defaultcard"
                                      />
                                    }
                                    label="Default"
                                  />
                                </FormGroup>
                              </Grid>
                            </Grid>

                            <Grid items lg={10} spacing={1} container>
                              <Grid
                                items
                                lg={1}
                                style={{ marginTop: "5px", marginLeft: "5px" }}
                              >
                                <FormGroup>
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        checked={termscondition}
                                        onChange={handleChangeprintsku}
                                        name="termscondition"
                                      />
                                    }
                                  />
                                </FormGroup>
                              </Grid>
                              <Grid items lg={9}>
                                <Link
                                  underline="always"
                                  onClick={() => {
                                    openTermsAndCondition();
                                  }}
                                >
                                  <Text style={{ color: "#0000FF" }}>
                                    {"\n"}Terms and conditions
                                  </Text>
                                </Link>
                              </Grid>
                            </Grid>

                            <Grid
                              container
                              item
                              xs={10}
                              justify="flex-end"
                              style={{ marginTop: "15px" }}
                            >
                              <Grid></Grid>

                              <Grid style={{ marginLeft: "10px" }}>
                                <ColorButton
                                  size="small"
                                  variant="contained"
                                  color="primary"
                                  onClick={() => {
                                    nextPage10();
                                  }}
                                >
                                  Back
                                </ColorButton>
                                &nbsp;&nbsp;&nbsp;
                                <ColorButton
                                  size="small"
                                  variant="contained"
                                  color="primary"
                                  className={classes.submit}
                                  disabled={!formState.isValid}
                                  onClick={() => {
                                    addEditCard();
                                  }}
                                >
                                  SAVE
                                </ColorButton>
                              </Grid>
                            </Grid>
                            <Grid items style={{ marginTop: "10px" }}>
                              <Link
                                underline="always"
                                onClick={() => {
                                  handleNext();
                                }}
                              >
                                <Text style={{ color: "#0000FF" }}>
                                  {"\n"}Request Additional Payment Method
                                </Text>
                              </Link>
                            </Grid>
                          </Grid>
                        </Grid>
                      </form>
                    )}
                  </View>
                </View>
              );
            }
          })()}
        </View>
      </View>
    </View>
  );
}

Payment.propTypes = {
  handleNextPage: PropTypes.func,
  openSquareView: PropTypes.func,
};
