import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { fade, withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Platform,
  Linking,
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Card from "@material-ui/core/Card";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import PropTypes from "prop-types";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import amazon from "../../../assets/icons/amazon.png";
import ebay from "../../../assets/icons/ebbay.png";
import bestbuy from "../../../assets/icons/bestby.png";
import shipstation from "../../../assets/icons/shipstation.png";
import square from "../../../assets/icons/squarespace-logo.png";
import m1 from "../../../assets/icons/m1.png";
import walmart from "../../../assets/icons/walmart.png";
import bigcommerce from "../../../assets/icons/bigcommerce.png";
import backerkit from "../../../assets/icons/BackerKit-logo.png";
import shopify from "../../../assets/icons/shopify.png";
import woocommerce from "../../../assets/icons/woocommerce-logo.png";
import esty from "../../../assets/icons/1200px-Etsy_logo.svg.png";
import comingSoon from "../../../assets/icons/comingSoon1.png";
import HoverImage from "react-hover-image";
import Tooltip from "@material-ui/core/Tooltip";
import Wix from "../../../assets/icons/wix.JPG";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import * as shiphypeservice from "../ShipService/shiphype_service";
import Link from "@material-ui/core/Link";
import ProgressBar from "./ProgressBar";
import popStyle from ".././style/popUpStyle";
import ConfirmationMessage from "./ConfirmationMessage";
import ConfirmationCheck from "./ConfirmationCheck";
import StepConnector from "@material-ui/core/StepConnector";

import ShopfyIntegrationUi from "./ShopfyIntegrationUi";
import WooCommerceIntegrationUi from "./WooCommerceIntegrationUi";
import SquareSpaceIntegrationUI from "./SquareSpaceIntegrationUi";
import WixIntegrationUi from "./WixIntegrationUi";
const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: "calc(-52% + 16px)",
    right: "calc(48% + 16px)",
  },
  line: {
    borderColor: "#3f51b5",
    borderTopWidth: 2,
    borderRadius: 1,
  },
  circle: {
    width: 18,
    height: 18,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
})(StepConnector);

const useStyles = makeStyles((theme) => ({
  root: {},
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
    height: 80,
    width: 100,
  },
  paper1: {
    border: "2px solid #ced4da",
    boxShadow: "-10px 10px #0168fa",
    // boxShadow: '10px 5px 5px #cccccc',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    height: 120,
    width: 120,
    marginLeft: "14%",
    cursor: "pointer",
    // marginLeft: '12%',
    marginTop: "8%",
  },

  imageselected: {
    border: "1px solid #00cc00",
    boxShadow: "-10px 10px #00cc00",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    height: 120,
    width: 120,
    marginLeft: "14%",
    cursor: "pointer",
    //marginLeft: '12%',
    marginTop: "8%",
  },
  alredayimageselected: {
    border: "1px solid #00cc00",
    boxShadow: "-10px 10px #00cc00",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    height: 120,
    width: 120,
    marginLeft: "14%",
    //marginLeft: '12%',
    marginTop: "8%",
  },
  root: {
    flexGrow: 1,
  },
  avatarsmall: {
    width: theme.spacing(3.5),
    height: theme.spacing(3.5),
  },
  ImagesDesign: {
    width: "115px",
    height: "62px",
    marginTop: "25%",
    "&:hover": {
      width: "115px",
      height: "62px",
      marginTop: "25%",
    },
  },
  ImagesDesign5: {
    width: "116px",
    height: "106px",
    marginTop: "5%",
    "&:hover": {
      width: "115px",
      height: "100px",
      marginTop: "8%",
    },
  },
  ImagesDesign6: {
    width: "115px",
    height: "72px",
    marginTop: "16%",
    "&:hover": {
      width: "115px",
      height: "100px",
      marginTop: "8%",
    },
  },
  ImagesDesign4: {
    width: "130px",
    height: "122px",
    marginTop: "-1%",
    marginLeft: "-8px",
    "&:hover": {
      width: "115px",
      height: "100px",
      marginTop: "8%",
    },
  },
  ImagesDesign2: {
    width: "115px",
    height: "60px",
    marginTop: "30%",
    "&:hover": {
      width: "115px",
      height: "100px",
      marginTop: "8%",
    },
  },
  ImagesDesign1: {
    width: "115px",
    height: "90px",
    marginTop: "10%",
    "&:hover": {
      width: "115px",
      height: "100px",
      marginTop: "8%",
    },
  },
  ImagesDesignAmozon: {
    width: "115px",
    height: "93px",
    marginTop: "17%",
    // '&:hover': {
    //   width: '115px', height: '100px',marginTop:'8%',
    // }
  },
  ImagesDesignEbay: {
    width: "115px",
    height: "42px",
    marginTop: "35%",
  },
  ImagesDesignShop: {
    width: "115px",
    height: "100px",
    marginTop: "8%",
    "&:hover": {
      width: "115px",
      height: "100px",
      marginTop: "8%",
    },
  },
  ImagesDesignSquareSpace:{
    width: '115px', height: '70px',marginTop:'15%'
  },
  ImagesDesignShopify:{
    width: '115px', height: '70px',marginTop:'15%'
  },
  // grid: {
  //   width: 100,
  //   height: 100,
  // },
}));

const schema = {
  sprintname: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 32,
    },
  },
  sprintgoal: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 300,
    },
  },
};

// const ColorButton = withStyles(theme => ({
//   root: {

//     backgroundColor:'#00bfbf',

//   },
// }))(Button);

/****   For changing the textfield radius  : End *********/
const styles = (theme) => ({
  root: {
    "@media print": {
      margin: 0,
      padding: theme.spacing(2),
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

const ColorButton = withStyles((theme) => ({
  root: {
    color: "#fff",
    borderRadius: "3px",
    //  paddingTop: '9%',
    marginTop: "50%",
    height: "18%",
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

const ColorButton4 = withStyles((theme) => ({
  root: {
    color: "#fff",
    borderRadius: "3px",
    //  paddingTop: '9%',
    marginTop: "5%",
    marginBottom: "2%",
    height: "28%",
    width: "280px",
    fontSize: "11px",
    fontWeight: "550",
    color: "#fff",
    backgroundColor: "#ff9900",
    borderColor: "#e68a00",

    "&:hover": {
      backgroundColor: "#e68a00",
    },
  },
}))(Button);

const ColorButton2 = withStyles((theme) => ({
  root: {
    // color: '#fff',
    // backgroundColor: '#0168fa',
    //  borderColor: '#0168fa',
    //  borderRadius:'5px',
    //  marginTop:'30px',

    //  padding:'1px',
    paddingLeft: "1px",
    paddingTop: "1px",
    paddingRight: "10px",

    // border: '1px solid #ced4da',
    "&:hover": {
      // backgroundColor: '#002080',
      // border: '1px solid #ced4da',
      // backgroundColor: '#0168fa',
    },

    "&:selected": {
      backgroundColor: "#002080",
    },
  },
}))(Button);
const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      {onClose ? (
        <Grid container item xs={12} justify="flex-end">
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={props.onClose}
          >
            <CloseIcon />
          </IconButton>
        </Grid>
      ) : null}
      <Grid item xs={12}>
        <Typography
          justify="center"
          variant="body1"
          style={{
            fontSize: "14px",
            fontWeight: '700',
            marginLeft: "41px",
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
          }}
        >
          {" "}
          Select the marketplace you would like to integrate with:
        </Typography>
      </Grid>
    </MuiDialogTitle>
  );
});
function getSteps() {
  return [
    "Marketplace Integration",
    "Shipping Profile",
    "Return Settings",
    "Import Products",
    "Import Customers",
  ];
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

/**
 * Description:This function is used for CreateSprint for sprint
 * @param {*} props
 */
export default function CreateSprint(props) {
  const classes = useStyles();
  //const {openCreateSprint}= props;
  const { openSprint } = props;
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState(new Set());
  const [objectData, setObjectData] = React.useState([]);
  const [stepDone, setStepDone] = React.useState([]);
  const [fetchIntData, setFetchIntData] = React.useState([]);
  const [integrationId, setIntegrationId] = React.useState(0);
  const [selectIntegration, setSelectIntegration] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [amazonid, setAmazon] = React.useState(false);
  const [ebayid, setEbay] = React.useState(false);
  const [shipstatid, setShipstatid] = React.useState(false);
  const [shipfyid, setShipfyid] = React.useState(false);
  const [magentoid, setMagentoid] = React.useState(false);
  const [sqaureid, setSqaureid] = React.useState(false);
  const [backritid, setBackritid] = React.useState(false);
  const [etsyid, setEtsyid] = React.useState(false);
  const [wocommid, setWocommid] = React.useState(false);
  const [bestbyid, setBestbyid] = React.useState(false);
  const [wolmartid, setWolmartid] = React.useState(false);
  const [bigcommid, setBigcommid] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [integrateData, setDataForIntegrate] = React.useState(0);

  const [integrateDataid, setDataForIntegrateID] = React.useState(0);
  const [integrateDataUrl, setDataForIntegrateUrl] = React.useState("");
  const [openDelete1, setOpenDelete1] = React.useState(false);
  //OpenShopfy integration screen

  const [openwoocommerce, setOpenwoocommerce] = React.useState(false);

  const [openshopfy, setOpenshopfy] = React.useState(false);
  const [openwix,setOpenwix]=React.useState(false);
  let screenWidth = Dimensions.get("window").width;
  let screenHeight = Dimensions.get("window").height;
  const userid = props.user_id;
  const code = props.code;
  const [state, setState] = useState({
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal } = state;
  const [open, setOpen] = React.useState(false);
  const [open9, setOpen9] = React.useState(false);
const [opensquarespace,setOpensquarespace]=React.useState(false);
  const openShopfyIntegration = (data) => {
    window.sessionStorage.setItem("integrationid", 4);
    setDataForIntegrateID(data);
    setOpenshopfy(true);
  };

  const openSquareSpace=(data)=>{
    if(data === 13){
      setOpenwix(true);
    }else{
      setOpensquarespace(true);
    }
    setDataForIntegrateID(data);
     
  }
  const openWoocommerceIntegration = (data) => {
    setDataForIntegrateID(data);
    setOpenwoocommerce(true);
  };

  const cancelShopfyIntegration = () => {
    fetchSelectedIntegration(userid);
    setOpenwoocommerce(false);
    setOpenshopfy(false);
    setOpensquarespace(false);
    setOpenwix(false)
  };

  //const [steps,setSteps]=React.useState([]);
  const selectImage = (data) => {
    if (data === integrationId) {
      setIntegrationId(0);
      if (fetchIntData.length !== 0) {
        setSelectIntegration(true);
      } else {
        setSelectIntegration(false);
      }
    } else {
      setIntegrationId(data);
      setSelectIntegration(true);
    }

    console.log("click image", data);
  };
  const selectIntegrationForShiphype = (data, URL) => {
    console.log("selectalredayimage", data);
    setDataForIntegrateUrl(URL);
    setDataForIntegrateID(data);
    setOpenDelete1(true);
  };
  const ConframetionCheck1 = () => {
    setOpenDelete1(false);
    opneebayapiInte(integrateDataid, integrateDataUrl);
  };
  const opneebayapiInte = (data, url) => {
    window.sessionStorage.setItem("integrationid", data);
    if (data === 2) {
      if (data === integrationId) {
        setIntegrationId(0);
        if (fetchIntData.length !== 0) {
          //setSelectIntegration(true);
        } else {
          setSelectIntegration(false);
        }
      } else {
        setIntegrationId(data);
        //setSelectIntegration(true);

        shiphypeservice
          .addUserIntegration(data, userid)
          .then((response) => {
            console.log("status", response.status);
            if (response.status === true) {
              setLoading(false);
              //  setOpen9(true);
              addnowpercentage();
            } else {
              setLoading(false);
              console.log("message", response.message);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }

      // Linking.openURL(url);
      //window.open(url, "", "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=150,width=1000,height=500");
    } else {
      if (data === integrationId) {
          setIntegrationId(0);
        if (fetchIntData.length !== 0) {
          //setSelectIntegration(true);
        } else {
         // setSelectIntegration(false);
        }
      } else {
        setIntegrationId(data);
       // setSelectIntegration(true);

        // shiphypeservice
        //   .addUserIntegration(data, userid)
        //   .then((response) => {
        //     console.log("status", response.status);
        //     if (response.status === true) {
        //       setLoading(false);

        //       addnowpercentage();
        //     } else {
        //       setLoading(false);
        //       console.log("message", response.message);
        //     }
        //   })
        //   .catch((error) => {
        //     console.error(error);
        //   });
      }
      window.sessionStorage.setItem("intid", 1);
    
      var ebayurl='https://auth.ebay.com/oauth2/authorize?client_id=NishantT-Shiphype-PRD-f193e18a1-6800bbd2&redirect_uri=Nishant_Tyagi-NishantT-Shiphy-tkrdemk&response_type=code&scope=https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.inventory%20https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.account%20https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.fulfillment&prompt=login';
      window.open(ebayurl, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=150,width="+{screenWidth}+",height="+{screenHeight}+"fullscreen=yes");
      // window.open( "https://auth.ebay.com/oauth2/authorize?client_id=NishantT-Shiphype-PRD-f193e18a1-6800bbd2&redirect_uri=Nishant_Tyagi-NishantT-Shiphy-tkrdemk&response_type=code&scope=https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.inventory%20https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.account%20https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.fulfillment&prompt=login","_blank");
      // Linking.openURL(url);
      // window.open(
      //   "https://auth.ebay.com/oauth2/authorize?client_id=NishantT-Shiphype-PRD-f193e18a1-6800bbd2&redirect_uri=Nishant_Tyagi-NishantT-Shiphy-tkrdemk&response_type=code&scope=https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.inventory%20https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.account%20https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.fulfillment&prompt=login",
      //   "",
      //   "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=150,width=1000,height=500"
      // );
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleClose9 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen9(false);
    addnowpercentage();
  };

  const selectAlredayImage = (data) => {
    console.log("selectalredayimage", data);
    setDataForIntegrate(data);
    setOpenDelete(true);
  };

  const selectAlredayImage1 = (data) => {
    // console.log("selectalredayimage",data);
    // setDataForIntegrate(data);
    setOpen(true);
  };

  const handleDeleteCancle = () => {
    setOpenDelete(false);
    setOpenDelete1(false);
  };
  const ConframetionCheck = () => {
    setOpenDelete(false);
    if (integrateData === 1) {
      setEbay(false);
    } else if (integrateData === 2) {
      setAmazon(false);
    } else if (integrateData === 3) {
      setWocommid(false);
    } else if (integrateData === 4) {
      setShipfyid(false);
    } else if (integrateData === 5) {
      setMagentoid(false);
    } else if (integrateData === 6) {
      setSqaureid(false);
    } else if (integrateData === 7) {
      setBackritid(false);
    } else if (integrateData === 8) {
      setEtsyid(false);
    } else if (integrateData === 9) {
      setShipstatid(false);
    } else if (integrateData === 10) {
      setBestbyid(false);
    } else if (integrateData === 11) {
      setWolmartid(false);
    } else if (integrateData === 13) {
      setBigcommid(false);
    }
  };
  /**
   * Description:To do fetch image data
   */
  useEffect(() => {
    if (code !== "0") {
     // ebaygetTokenapi(code, 1, userid);
    }

    //  fetchShiphypeCompleteStep();
    fetchImage();
  }, []);

  const ebaygetTokenapi = (code, integrationid, userid) => {
    shiphypeservice
      .ebayIntegration(code, integrationid, userid)
      .then((response) => {
        console.log("token", response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // const fetchShiphypeCompleteStep = ()=>{

  //  // const userid=user_id;
  //   shiphypeservice.fetchStepCompleteStatus(userid)
  //   .then(response => {
  //    console.log("status",response.status);
  //         if(response.status === true) {
  //           //setLoading(false);
  //              setStepDone(response.data);
  //              if(response.data.length !== 0){
  //               for(let i=0; i<response.data.length;i++){
  //                 setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //                }
  //              }
  //                    }else{
  //                     //setLoading(false);
  //                     console.log("message",response.message);
  //                    }
  //       }).catch((error) =>{
  //             console.error(error);
  //       });
  // }

  const fetchShiphypeCompleteStep = () => {
    //  const userid=userid;
    shiphypeservice
      .fetchStepCompleteStatus(userid)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          //setLoading(false);

          if (response.data.length !== 0) {
            for (let i = 0; i < response.data.length; i++) {
              if (response.data[i].shiphypesubstepId === 5) {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
              } else if (response.data[i].shiphypesubstepId === 6) {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
              } else if (response.data[i].shiphypesubstepId === 7) {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
              } else if (response.data[i].shiphypesubstepId === 8) {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
              } else if (response.data[i].shiphypesubstepId === 9) {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
              } else {
              }
            }
          }
        } else {
          //setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchImage = () => {
    setLoading(true);
    var arr=[];
    arr.push(1);
    arr.push(3);
    arr.push(4);
    arr.push(6);
    arr.push(13);
    shiphypeservice
      .fetchimagelogobyid(arr)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          setObjectData(response.data);
          fetchSelectedIntegration();
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchSelectedIntegration = () => {
    setLoading(true);
    shiphypeservice
      .fetchUserIntegration(userid)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          setFetchIntData(response.data);
          if (response.data.length !== 0) {
            setSelectIntegration(true);
            for (let i = 0; i < response.data.length; i++) {
              if (response.data[i].integrationId === 1) {
                setEbay(true);
              } else if (response.data[i].integrationId === 2) {
                setAmazon(true);
              } else if (response.data[i].integrationId === 3) {
                setWocommid(true);
              } else if (response.data[i].integrationId === 4) {
                setShipfyid(true);
              } else if (response.data[i].integrationId === 5) {
                setMagentoid(true);
              } else if (response.data[i].integrationId === 6) {
                setSqaureid(true);
              } else if (response.data[i].integrationId === 7) {
                setBackritid(true);
              } else if (response.data[i].integrationId === 8) {
                setEtsyid(true);
              } else if (response.data[i].integrationId === 9) {
                setShipstatid(true);
              } else if (response.data[i].integrationId === 10) {
                setBestbyid(true);
              } else if (response.data[i].integrationId === 11) {
                setWolmartid(true);
              } else if (response.data[i].integrationId === 13) {
                setBigcommid(true);
              }
            }
          }
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addUserIntegration = (isIntegrationReq) => {
    setLoading(true);
    const integration_id = integrationId;
    if (integrationId !== 0) {
      shiphypeservice
        .addUserIntegration(integration_id, userid)
        .then((response) => {
          console.log("status", response.status);
          if (response.status === true) {
            setLoading(false);
            addStepStatus(true);
            addnowpercentage();
          } else {
            setLoading(false);
            console.log("message", response.message);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      handleNext(3);
    }
  };
  const addnowpercentage = () => {
    props.handleOpenaddpercentage(20);
  };
  const addStepStatus = (isdone) => {
    if (fetchIntData.length > 0 && fetchIntData.length < 2) {
      // const userid=user_id;
      const shiphypesubsubstepId = 0;
      const shiphypesubstepId = 5;
      const shiphypestepId = 0;
      setLoading(true);
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
            if(isdone === true){
              handleNext(3);
            }else{
              handleNext(5);
            }
            
          } else {
            setLoading(false);
            console.log("message", response.message);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      if(isdone === true){
        handleNext(3);
      }else{
        handleNext(5);
      }
    }
  };

  /**
   * Description:To do bind warehouse data
   */
  function BindImages() {
    return (
      <Grid container style={{ marginLeft: "5%",marginTop:"20px" }}>
        {objectData.map((data, index) => (
          <Grid item lg={2} style={{ marginTop: "2%" }}>
            {(() => {
              if (data.logo === "ebay.png") {
                return (
                  <Grid items xs={6} lg={2} md={4}>
                    <Card
                      className={clsx(
                        integrationId !== 1 && classes.paper1,
                        integrationId === 1 && classes.paper1,
                        ebayid && classes.alredayimageselected
                      )}
                      variant="outlined"
                      onClick={() => {
                        ebayid
                          ? selectAlredayImage(data.integrationId)
                          : opneebayapiInte(
                              data.integrationId,
                              data.redirectUrl
                            );
                      }}
                    >
                      <Image
                        className={classes.ImagesDesignEbay}
                        source={ebay}
                      />
                    </Card>
                  </Grid>
                );
              }
              
               {/* else if (data.logo === "amazon.png") {
                return (
                  <Grid items xs={6} lg={2} md={4}>
                    <Card
                      className={clsx(
                        integrationId !== 2 && classes.paper1,
                        integrationId === 2 && classes.imageselected,
                        amazonid && classes.alredayimageselected
                      )}
                      variant="outlined"
                      onClick={() => {
                        amazonid
                          ? selectAlredayImage(data.integrationId)
                          : selectIntegrationForShiphype(
                              data.integrationId,
                              ""
                            );
                      }}
                    >
                      <Image className={classes.ImagesDesignAmozon} source={amazon} />
                      <HoverImage
               className={classes.ImagesDesignAmozon}
     src={amazon}
     hoverSrc={comingSoon}
   />
                    </Card>
                  </Grid>
                );
              } else */}
              
               if (data.logo === "woocommernce.png") {
                return (
                  <Grid items xs={6} lg={2} md={4}>
                    <Card
                      className={clsx(
                        integrationId !== 3 && classes.paper1,
                        integrationId === 3 && classes.paper1,
                        wocommid && classes.alredayimageselected
                      )}
                      variant="outlined"
                      onClick={() => {
                        wocommid
                          ? selectAlredayImage(data.integrationId)
                          : openWoocommerceIntegration(data.integrationId);
                      }}
                    >
                      <Image
                        className={classes.ImagesDesign}
                        source={woocommerce}
                      />
                      {/* <HoverImage
                          className={classes.ImagesDesign}
                          src={woocommerce}
                          hoverSrc={comingSoon}
                        /> */}
                    </Card>
                  </Grid>
                );
              } else if (data.logo === "shopify.png") {
                return (
                  <Grid items xs={6} lg={2} md={4}>
                    <Card
                      className={clsx(
                        integrationId !== 4 && classes.paper1,
                        integrationId === 4 && classes.paper1,
                        shipfyid && classes.alredayimageselected
                      )}
                      variant="outlined"
                      onClick={() => {
                        shipfyid
                          ? selectAlredayImage(data.integrationId)
                          : openShopfyIntegration(data.integrationId);
                      }}
                    >
                      <Image
                        className={classes.ImagesDesignShop}
                        source={shopify}
                      />
                      {/* <HoverImage
                      className={classes.ImagesDesign}
            src={shopify}
            hoverSrc={comingSoon}
          /> */}
                    </Card>
                  </Grid>
                );
              }
             
              else if (data.logo === "squarespace.png") {
                return (
                  <Grid items xs={6} lg={2} md={4}>
                      <Card
                        className={clsx(
                          integrationId !== 6 && classes.paper1,
                          integrationId === 6 && classes.paper1,
                          sqaureid && classes.alredayimageselected
                        )}
                        variant="outlined"
                        onClick={() => {
                          sqaureid
                          ? selectAlredayImage(data.integrationId)
                          : openSquareSpace(data.integrationId);
                      }}
                      >
                        <Image  className={classes.ImagesDesignSquareSpace} source={square} />
                        {/* <HoverImage
                          className={classes.ImagesDesign1}
                          src={square}
                          hoverSrc={comingSoon}
                        /> */}
                      </Card>
                   
                  </Grid>
                );
              } 
              else if (data.logo === "wix.png") {
                return (
                  <Grid items xs={6} lg={2} md={4}>
                    <Card
                      className={clsx(
                        integrationId !== 13 && classes.paper1,
                        integrationId === 13 && classes.paper1,
                        bigcommid && classes.alredayimageselected
                      )}
                      variant="outlined"
                      onClick={() => {
                        bigcommid
                          ? selectAlredayImage(data.integrationId)
                          : openSquareSpace(data.integrationId);
                      }}
                    >
                      <Image className={classes.ImagesDesign} source={Wix} />
                      {/* <HoverImage
                        className={classes.ImagesDesign}
                        src={bigcommerce}
                        hoverSrc={comingSoon}
                      /> */}
                    </Card>
                  </Grid>
                );
              }
               {/* else if (data.logo === "magento.png") {
                return (
                  <Grid items xs={6} lg={2} md={4}>
                    <Card
                      className={clsx(
                        integrationId !== 5 && classes.paper1,
                        integrationId === 5 && classes.imageselected,
                        magentoid && classes.alredayimageselected
                      )}
                      variant="outlined"
                      

                      onClick={() => {
                        magentoid
                          ? selectAlredayImage(data.integrationId)
                          : selectIntegrationForShiphype(
                              data.integrationId,
                              ""
                            );
                      }}
                    >
                      <Image className={classes.ImagesDesign} source={m1} />
                      <HoverImage
                        className={classes.ImagesDesign}
                        src={m1}
                        hoverSrc={comingSoon}
                      />
                    </Card>
                  </Grid>
                );
              } else if (data.logo === "squarespace.png") {
                return (
                  <Grid items xs={6} lg={2} md={4}>
                    <Tooltip title="coming soon">
                      <Card
                        className={clsx(
                          integrationId !== 6 && classes.paper1,
                          integrationId === 6 && classes.imageselected,
                          sqaureid && classes.alredayimageselected
                        )}
                        variant="outlined"
                        onClick={() => {
                          selectAlredayImage1(data.integrationId);
                        }}
                      >
                        <Image style={{ width: '115px', height: '80px',marginTop:'10%'}} source={square} />
                        <HoverImage
                          className={classes.ImagesDesign1}
                          src={square}
                          hoverSrc={comingSoon}
                        />
                      </Card>
                    </Tooltip>
                  </Grid>
                );
              } else if (data.logo === "backerkit.png") {
                return (
                  <Grid items xs={6} lg={2} md={4}>
                    <Card
                      className={clsx(
                        integrationId !== 7 && classes.paper1,
                        integrationId === 7 && classes.imageselected,
                        backritid && classes.alredayimageselected
                      )}
                      variant="outlined"
                      onClick={() => {
                        selectAlredayImage1(data.integrationId);
                      }}
                    >
                      <Image className={classes.ImagesDesign} source={backerkit} />
                      <HoverImage
                        className={classes.ImagesDesign6}
                        src={backerkit}
                        hoverSrc={comingSoon}
                      />
                    </Card>
                  </Grid>
                );
              } else if (data.logo === "etsy.png") {
                return (
                  <Grid items xs={6} lg={2} md={4}>
                    <Card
                      className={clsx(
                        integrationId !== 8 && classes.paper1,
                        integrationId === 8 && classes.imageselected,
                        etsyid && classes.alredayimageselected
                      )}
                      variant="outlined"
                      onClick={() => {
                        selectAlredayImage1(data.integrationId);
                      }}
                    >
                      <Image style={{ width: '115px', height: '50px',marginTop:'30%'}} source={esty} />
                      <HoverImage
                        className={classes.ImagesDesign2}
                        src={esty}
                        hoverSrc={comingSoon}
                      />
                    </Card>
                  </Grid>
                );
              } else if (data.logo === "shipstation.png") {
                return (
                  <Grid items xs={6} lg={2} md={4}>
                    <Card
                      className={clsx(
                        integrationId !== 9 && classes.paper1,
                        integrationId === 9 && classes.imageselected,
                        shipstatid && classes.alredayimageselected
                      )}
                      variant="outlined"
                      onClick={() => {
                        selectAlredayImage1(data.integrationId);
                      }}
                    >
                      <Image className={classes.ImagesDesign} source={shipstation} />
                      <HoverImage
                        className={classes.ImagesDesign5}
                        src={shipstation}
                        hoverSrc={comingSoon}
                      />
                    </Card>
                  </Grid>
                );
              } else if (data.logo === "bestbuy.png") {
                return (
                  <Grid items xs={6} lg={2} md={4}>
                    <Card
                      className={clsx(
                        integrationId !== 10 && classes.paper1,
                        integrationId === 10 && classes.imageselected,
                        bestbyid && classes.alredayimageselected
                      )}
                      variant="outlined"
                      onClick={() => {
                        selectAlredayImage1(data.integrationId);
                      }}
                    >
                      <Image style={{ width: '130px', height: '102px',marginTop:'4%'}} source={bestbuy} />
                      <HoverImage
                        className={classes.ImagesDesign4}
                        src={bestbuy}
                        hoverSrc={comingSoon}
                      />
                    </Card>
                  </Grid>
                );
              } else if (data.logo === "walmart.png") {
                return (
                  <Grid items xs={6} lg={2} md={4}>
                    <Card
                      className={clsx(
                        integrationId !== 11 && classes.paper1,
                        integrationId === 11 && classes.imageselected,
                        wolmartid && classes.alredayimageselected
                      )}
                      variant="outlined"
                      onClick={() => {
                        selectAlredayImage1(data.integrationId);
                      }}
                    >
                      <Image className={classes.ImagesDesign} source={walmart} />
                      <HoverImage
                        className={classes.ImagesDesign}
                        src={walmart}
                        hoverSrc={comingSoon}
                      />
                    </Card>
                  </Grid>
                );
              } else if (data.logo === "bigcommerce.png") {
                return (
                  <Grid items xs={6} lg={2} md={4}>
                    <Card
                      className={clsx(
                        integrationId !== 12 && classes.paper1,
                        integrationId === 12 && classes.imageselected,
                        bigcommid && classes.alredayimageselected
                      )}
                      variant="outlined"
                      onClick={() => {
                        selectAlredayImage1(data.integrationId);
                      }}
                    >
                      <Image className={classes.ImagesDesign} source={bigcommerce} />
                      <HoverImage
                        className={classes.ImagesDesign}
                        src={bigcommerce}
                        hoverSrc={comingSoon}
                      />
                    </Card>
                  </Grid>
                );
              } */}
            })()}
          </Grid>
        ))}
      </Grid>
    );
  }

  const steps = getSteps();

  // const handleStep = () => {
  //   //props.handelStepper();
  //   //setActiveStep(activeStep + 1);
  // };

  const handleStep = () => {
    setActiveStep(activeStep + 1);
  };

  React.useEffect(() => {
    //  handleStep();
  }, []);

  /**
   * Description:To do close poup after successfully create sprint and on click cancel button
   * @param {*} issprintCreate
   */
  const handleClose1 = (isSprintCreate) => {
    props.handleSprintCancel(isSprintCreate);
  };
  /**
   * Description:To do close poup after successfully create sprint and on click cancel button
   * @param {*} issprintCreate
   */
  const handleNext = (isSprintCreate) => {
    // props.handelStepper();
    props.handleNext(isSprintCreate);
  };

  // const handleStepClick=(index)=>{
  // console.log("indexprint",index);
  // if(index !== 0){
  //   if(index === 1){
  //     handleNext(3);
  //   }

  // }
  // }
  const handleStepClick = (index) => {
    console.log("indexprint", index);

    if (index === 0) {
      props.handleStepPage(1);
    } else if (index === 1) {
      props.handleStepPage(2);
    } else if (index === 2) {
      props.handleStepPage(3);
    } else if (index === 3) {
      props.handleStepPage(4);
    } else if (index === 4) {
      props.handleStepPage(5);
    }
    else if (index === 5) {
      props.handleStepPage(6);
    }
  };



  return (
    <View>
      <Dialog
        fullWidth={true}
        maxWidth="md"
        onClose={() => {
          handleClose1(false);
        }}
        aria-labelledby="customized-dialog-title"
        open={openSprint}
      >
        <Grid item xs={12}>
          {(() => {
            if (screenWidth > 690) {
              return (
                <View>
                  <Stepper
                    activeStep={activeStep}
                    alternativeLabel
                    lineHorizontal={11}
                    connector={<QontoConnector />}
                  >
                    {steps.map((label, index) => (
                      <Step key={label}>
                        <StepButton
                          onClick={() => {
                            handleStepClick(index);
                          }}
                        >
                          <Text style={popStyle.stepperCss}>{label}</Text>
                        </StepButton>
                      </Step>
                    ))}
                  </Stepper>
                </View>
              );
            }
          })()}
          {/* <View >

<Grid item  container lg={12}  >
<Grid item  lg={1} ></Grid>
<Grid item  lg={5}
style={{ marginLeft:'4px'}}
>
<Text style={popStyle.breadCrundCss}>SETUP WIZARD /</Text>
<Text style={popStyle.breadCrundCss2}> MARKETPLACE INTEGRATION{'\n'} </Text> 

</Grid>
<Grid item  lg={6} ></Grid>

</Grid>

</View> */}

          <DialogTitle
            id="customized-dialog-title"
            onClose={() => {
              handleClose1(false);
            }}
            style={{
              width: "96%",
              margin: "auto",
              paddingBottom: "0px",
              paddingTop: "0px",
            }}
          ></DialogTitle>
        </Grid>

        <DialogContent style={{ width: "96%", margin: "auto" }}>
          {/* <Grid item xs={12}>
        <Typography justify="center" variant="body1" style={{fontSize: '14px',
          
            marginLeft:'10px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>Select any of the store integration of your choice
</Typography></Grid> */}
          {(() => {
            if (screenWidth < 690) {
              return (
                <View>
                  <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((label, index) => (
                      <Step key={label} style={{ padding: "0px" }}>
                        <StepButton
                          onClick={() => {
                            handleStepClick(index);
                          }}
                        >
                          {label}
                        </StepButton>
                      </Step>
                    ))}
                  </Stepper>
                </View>
              );
            }
          })()}

          <Grid justify="center">
            <ProgressBar loading={loading} />
          </Grid>
          <Grid>
            {openDelete === false ? (
              " "
            ) : (
              <ConfirmationMessage
                openDeleteCard={openDelete}
                integrationId={integrateData}
                userid={userid}
                ConframetionCheck={ConframetionCheck}
                handleDeleteCancle={handleDeleteCancle}
              />
            )}

            {openDelete1 === false ? (
              " "
            ) : (
              <ConfirmationCheck
                openDeleteCard={openDelete1}
                //  integrationId={integrateData}
                userid={userid}
                ConframetionCheck={ConframetionCheck1}
                handleDeleteCancle={handleDeleteCancle}
              />
            )}

            {openshopfy === false ? (
              " "
            ) : (
              <ShopfyIntegrationUi
                openshopfy={openshopfy}
                userid={userid}
                integrateDataid={integrateDataid}
                handleCancle={cancelShopfyIntegration}
              />
            )}
            {openwoocommerce === false ? (
              " "
            ) : (
              <WooCommerceIntegrationUi
                openwoocommerce={openwoocommerce}
                userid={userid}
                integrateDataid={integrateDataid}
                handleCancle={cancelShopfyIntegration}
              />
            )}
            {opensquarespace === false ? (
              " "
            ) : (
              <SquareSpaceIntegrationUI
                opensquarespace={opensquarespace}
                userid={userid}
                integrateDataid={integrateDataid}
                handleCancle={cancelShopfyIntegration}
              />
            )}
            {openwix === false ? (
              " "
            ) : (
              <WixIntegrationUi
                openwix={openwix}
                userid={userid}
                integrateDataid={integrateDataid}
                handleCancle={cancelShopfyIntegration}
              />
            )}
          </Grid>
          <form className={classes.form}>
            <Grid container spacing={3} justify="center">
              <BindImages />
              <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                key={`${vertical},${horizontal}`}
                open={open}
                autoHideDuration={1500}
                onClose={handleClose}
              >
                <Alert onClose={handleClose} severity="error">
                  This integration is not available yet.
                </Alert>
              </Snackbar>

              <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                key={`${vertical},${horizontal}`}
                open={open9}
                autoHideDuration={1500}
                onClose={handleClose9}
              >
                <Alert onClose={handleClose9} severity="success">
                  Integration Done.
                </Alert>
              </Snackbar>
            </Grid>
          </form>

          <Grid
            justify="space-between" // Add it here :)
            container
            spacing={24}
            style={{ marginTop: "10px" }}
          >
            <Grid
              items
              style={{
                marginLeft: "41px",
                marginTop: "15px",
                marginBottom: "15px",
              }}
            >
              <ColorButton4
                size="large"
                variant="contained"
                color="primary"
                className={classes.profileMargin}
                onClick={() => {
                  //handleNext(5);
                 // handleNext(3);
                  addStepStatus(false);
                }}
              >
                I WILL CREATE ORDERS MANUALLY
              </ColorButton4>

              <Text>
                {" "}
                {"\n"}
                {"\n"}Blue = Inactive{"\n"}Green = Integration Active
              </Text>
              <Link
                onClick={() => {
                  handleNext(15);
                }}
                style={{ marginTop: "10%" }}
              >
                <Text style={{ color: "#0000FF", cursor: "pointer" }}>
                  {"\n"}
                  {"\n"}Request Custom Integration
                </Text>
              </Link>
            </Grid>
            <Grid items></Grid>
            <Grid items>
              <ColorButton
                size="large"
                variant="contained"
                color="primary"
                className={classes.profileMargin}
                onClick={() => {
                  //handleNext(5);
                  addStepStatus(false);
                }}
              >
                SKIP
              </ColorButton>
              &nbsp;&nbsp;&nbsp;
              <ColorButton
                size="large"
                variant="contained"
                color="primary"
                disabled={!selectIntegration}
                className={classes.profileMargin}
                onClick={() => {
                  addStepStatus(true);
                }}
              >
                NEXT
              </ColorButton>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </View>
  );
}

CreateSprint.propTypes = {
  openCreateSprint: PropTypes.bool,
  projectid: PropTypes.number,
  email: PropTypes.string,
  handleCloseSprintPoupup: PropTypes.func,
  handelStepper: PropTypes.func,
};