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
import List from "@material-ui/core/List";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import DialogActions from "@material-ui/core/DialogActions";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
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

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Paper from "@material-ui/core/Paper";
import StepLabel from "@material-ui/core/StepLabel";
import dpd from "../../../assets/icons/dpd.png";
import Checkbox from "@material-ui/core/Checkbox";
import * as shiphypeservice from "../ShipService/shiphype_service";
import Link from "@material-ui/core/Link";
import ProgressBar from "./ProgressBar";
import popStyle from ".././style/popUpStyle";
import ConfirmationMessage from "./ConfirmationMessage";
import ConfirmationCheck from "./ConfirmationCheck";
import StepConnector from "@material-ui/core/StepConnector";
import FetchingShopfyOrder from "./FetchingShopfyOrder";

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-52% + 16px)',
    right: 'calc(48% + 16px)',
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
    border: "1px solid #ced4da",
    boxShadow: "-10px 10px #0168fa",
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
      height: "100px",
      marginTop: "8%",
    },
  },
  ImagesDesign5: {
    width: "115px",
    height: "92px",
    marginTop: "15%",
    "&:hover": {
      width: "115px",
      height: "100px",
      marginTop: "8%",
    },
  },
  ImagesDesign6: {
    width: "115px",
    height: "72px",
    marginTop: "25%",
    "&:hover": {
      width: "115px",
      height: "100px",
      marginTop: "8%",
    },
  },
  ImagesDesign4: {
    width: "130px",
    height: "122px",
    marginTop: "4%",
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
    height: "62px",
    marginTop: "25%",
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
    marginTop: "15%",
    height: "60%",
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

const ColorButton1 = withStyles((theme) => ({
  root: {
    //   marginLeft:'14%',
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
          Select which integration you would like to Import Orders from:
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
  const { openImport } = props;
  const [activeStep, setActiveStep] = React.useState(5);
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

  const [openshopfy, setOpenshopfy] = React.useState(false);
  const userid = props.userid;
  const code = props.code;
  const [state, setState] = useState({
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal } = state;
  const [open, setOpen] = React.useState(false);

  const openShopfyIntegration = (data) => {
    setDataForIntegrateID(data);
    setOpenshopfy(true);
  };

  const cancelShopfyIntegration = (isimport) => {
if(isimport){
  setOpenshopfy(false);
  props.handleCancle(true);
}else{
  setOpenshopfy(false);
} 
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
    if (data === 2) {
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

        shiphypeservice
          .addUserIntegration(data, userid)
          .then((response) => {
            console.log("status", response.status);
            if (response.status === true) {
              setLoading(false);

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
          setSelectIntegration(true);
        } else {
          setSelectIntegration(false);
        }
      } else {
        setIntegrationId(data);
        setSelectIntegration(true);

        shiphypeservice
          .addUserIntegration(data, userid)
          .then((response) => {
            console.log("status", response.status);
            if (response.status === true) {
              setLoading(false);

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
      window.open(
        url,
        "",
        "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=150,width=1000,height=500"
      );
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
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
    } else if (integrateData === 12) {
      setBigcommid(false);
    }
  };
  /**
   * Description:To do fetch image data
   */
  useEffect(() => {
    if (code !== "0") {
      ebaygetTokenapi(code, 1, userid);
    }

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

 

  const module = [];
  const m23 = [];

  const fetchImage = () => {
    setLoading(true);
    shiphypeservice
      .fetchimagelogobyid()
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          setObjectData(response.data);
          module.push(response.data);
          fetchSelectedIntegration(userid);
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchSelectedIntegration = (userid) => {
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
                for (let i = 0; i < module[0].length; i++) {
                  if (module[0][i].integrationId === 1) {
                    m23.push(module[0][i]);
                  }
                }
                setEbay(true);
              } else if (response.data[i].integrationId === 2) {
                for (let i = 0; i < module[0].length; i++) {
                  if (module[0][i].integrationId === 2) {
                    m23.push(module[0][i]);
                  }
                }
                setAmazon(true);
              } else if (response.data[i].integrationId === 3) {
                for (let i = 0; i < module[0].length; i++) {
                  if (module[0][i].integrationId === 3) {
                    m23.push(module[0][i]);
                  }
                }
                setWocommid(true);
              } else if (response.data[i].integrationId === 4) {
                for (let i = 0; i < module[0].length; i++) {
                  if (module[0][i].integrationId === 4) {
                    m23.push(module[0][i]);
                  }
                }
                setShipfyid(true);
              } else if (response.data[i].integrationId === 5) {
                for (let i = 0; i < module[0].length; i++) {
                  if (module[0][i].integrationId === 5) {
                    m23.push(module[0][i]);
                  }
                }
                setMagentoid(true);
              } else if (response.data[i].integrationId === 6) {
                for (let i = 0; i < module[0].length; i++) {
                  if (module[0][i].integrationId === 6) {
                    m23.push(module[0][i]);
                  }
                }
                setSqaureid(true);
              } else if (response.data[i].integrationId === 7) {
                for (let i = 0; i < module[0].length; i++) {
                  if (module[0][i].integrationId === 7) {
                    m23.push(module[0][i]);
                  }
                }
                setBackritid(true);
              } else if (response.data[i].integrationId === 8) {
                for (let i = 0; i < module[0].length; i++) {
                  if (module[0][i].integrationId === 8) {
                    m23.push(module[0][i]);
                  }
                }
                setEtsyid(true);
              } else if (response.data[i].integrationId === 9) {
                for (let i = 0; i < module[0].length; i++) {
                  if (module[0][i].integrationId === 9) {
                    m23.push(module[0][i]);
                  }
                }
                setShipstatid(true);
              } else if (response.data[i].integrationId === 10) {
                for (let i = 0; i < module[0].length; i++) {
                  if (module[0][i].integrationId === 10) {
                    m23.push(module[0][i]);
                  }
                }
                setBestbyid(true);
              } else if (response.data[i].integrationId === 11) {
                for (let i = 0; i < module[0].length; i++) {
                  if (module[0][i].integrationId === 11) {
                    m23.push(module[0][i]);
                  }
                }
                setWolmartid(true);
              } else if (response.data[i].integrationId === 12) {
                for (let i = 0; i < module[0].length; i++) {
                  if (module[0][i].integrationId === 12) {
                    m23.push(module[0][i]);
                  }
                }
                setBigcommid(true);
              }
            }
          }
          setStepDone(m23);
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addnowpercentage = () => {
    props.handleOpenaddpercentage(20);
  };


const updateData=(data)=>{
props.updateData(data,integrateDataid);
}


  /**
   * Description:To do bind warehouse data
   */
  function BindImages() {
    return (
      <Grid container style={{ marginLeft: "5%" }}>
        {stepDone.map((data, index) => (
          <Grid item lg={2} style={{ marginTop: "2%" }}>
            {(() => {
              if (data.logo === "ebay.png") {
                return (
                  <Grid items xs={6} lg={2} md={4}>
                    <Card
                      className={clsx(
                        integrationId !== 1 && classes.paper1,
                        integrationId === 1 && classes.imageselected,
                        ebayid && classes.alredayimageselected
                      )}
                      variant="outlined"
                      // onClick={() => {
                      //   ebayid
                      //     ? selectAlredayImage(data.integrationId)
                      //     : opneebayapiInte(
                      //         data.integrationId,
                      //         data.redirectUrl
                      //       );
                      // }}
                    >
                      <Image
                        className={classes.ImagesDesignEbay}
                        source={ebay}
                      />
                    </Card>
                  </Grid>
                );
              } else if (data.logo === "amazon.png") {
                return (
                  <Grid items xs={6} lg={2} md={4}>
                    <Card
                      className={clsx(
                        integrationId !== 2 && classes.paper1,
                        integrationId === 2 && classes.imageselected,
                        amazonid && classes.alredayimageselected
                      )}
                      variant="outlined"
                      // onClick={() => {
                      //   amazonid
                      //     ? selectAlredayImage(data.integrationId)
                      //     : selectIntegrationForShiphype(
                      //         data.integrationId,
                      //         ""
                      //       );
                      // }}
                    >
                      <Image
                        className={classes.ImagesDesignAmozon}
                        source={amazon}
                      />
                    </Card>
                  </Grid>
                );
              } else if (data.logo === "woocommernce.png") {
                return (
                  <Grid items xs={6} lg={2} md={4}>
                    <Card
                      className={clsx(
                        integrationId !== 3 && classes.paper1,
                        integrationId === 3 && classes.imageselected,
                        wocommid && classes.alredayimageselected
                      )}
                      variant="outlined"
                      onClick={() => {
                        openShopfyIntegration(data.integrationId);
                      }}
                    >
                      <Image className={classes.ImagesDesign} source={woocommerce } />
                      {/* <HoverImage
                        className={classes.ImagesDesign}
                        src={woocommerce}
                        hoverSrc={comingSoon}
                      /> */}
                    </Card>
                  </Grid>
                );
              } else if (data.logo === "shipify.png") {
                return (
                  <Grid items xs={6} lg={2} md={4}>
                    <Card
                      className={clsx(
                        integrationId !== 4 && classes.paper1,
                        integrationId === 4 && classes.imageselected,
                        shipfyid && classes.alredayimageselected
                      )}
                      variant="outlined"
                      onClick={() => {
                        openShopfyIntegration(data.integrationId);
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
              } else if (data.logo === "magento.png") {
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
                        selectAlredayImage1(data.integrationId);
                      }}
                    >
                      {/* <Image className={classes.ImagesDesign} source={m1} /> */}
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
                        {/* <Image style={{ width: '115px', height: '80px',marginTop:'10%'}} source={square} /> */}
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
                      {/* <Image className={classes.ImagesDesign} source={backerkit} /> */}
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
                      {/* <Image style={{ width: '115px', height: '50px',marginTop:'30%'}} source={esty} /> */}
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
                      {/* <Image className={classes.ImagesDesign} source={shipstation} /> */}
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
                      {/* <Image style={{ width: '130px', height: '102px',marginTop:'4%'}} source={bestbuy} /> */}
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
                      {/* <Image className={classes.ImagesDesign} source={walmart} /> */}
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
                      {/* <Image className={classes.ImagesDesign} source={bigcommerce} /> */}
                      <HoverImage
                        className={classes.ImagesDesign}
                        src={bigcommerce}
                        hoverSrc={comingSoon}
                      />
                    </Card>
                  </Grid>
                );
              }
            })()}
          </Grid>
        ))}
      </Grid>
    );
  }

  const steps = getSteps();



  /**
   * Description:To do close poup after successfully create sprint and on click cancel button
   * @param {*} issprintCreate
   */
  const handleClose1 = (isSprintCreate) => {
    props.handleCancle(isSprintCreate);
  };
  /**
   * Description:To do close poup after successfully create sprint and on click cancel button
   * @param {*} issprintCreate
   */
  const handleNext = (isSprintCreate) => {
    // props.handelStepper();
    props.handleNext(isSprintCreate);
  };

  /**
   * Description:To do close poup after successfully create sprint and on click cancel button
   * @param {*} issprintCreate
   */
  const handleNextPage = (isSprintCreate) => {
    props.handleNextPage(isSprintCreate);
  };
  /**
   * Description:To do call function on back button
   * @param {*} isSprintCreate
   */
  const handlePreviousPage = (isSprintCreate) => {
    props.handlePreviousPage(isSprintCreate);
  };

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

  let screenWidth = Dimensions.get("window").width;

  return (
    <View>
      <Dialog
        fullWidth={true}
        maxWidth="md"
        onClose={() => {
          handleClose1(false);
        }}
        aria-labelledby="customized-dialog-title"
        open={openImport}
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
                            //handleStepClick(index);
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
                            //handleStepClick(index);
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
              <FetchingShopfyOrder
                openshopfy1={openshopfy}
                userid={userid}
                updateData={updateData}
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
                  Coming Soon Integration.
                </Alert>
              </Snackbar>
            </Grid>
          </form>

          <Grid
            justify="flex-end" 
            container
            spacing={24}
            style={{ marginTop: "10px" }}
          >
            <Grid items>
              {/* <ColorButton
                size="large"
                variant="contained"
                color="primary"
                className={classes.profileMargin}
                onClick={() => {
                  handlePreviousPage(9);
                }}
              >
                Back
              </ColorButton> */}
              &nbsp;&nbsp;&nbsp;
              <ColorButton
                size="large"
                variant="contained"
                color="primary"
                className={classes.profileMargin}
                onClick={() => {
                  handleClose1(false);
                }}
              >
               Close
              </ColorButton>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </View>
  );
}

CreateSprint.propTypes = {
  openImport: PropTypes.bool,
  projectid: PropTypes.number,
  email: PropTypes.string,
  handleCancle: PropTypes.func,
  handelStepper: PropTypes.func,
  updateData:PropTypes.func
};
