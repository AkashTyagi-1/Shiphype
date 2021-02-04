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
import Card from "@material-ui/core/Card";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import amazon from "../../assets/icons/amazon.png";
import ebay from "../../assets/icons/ebbay.png";
import bestbuy from "../../assets/icons/bestby.png";
import shipstation from "../../assets/icons/shipstation.png";
import square from "../../assets/icons/squarespace-logo.png";
import m1 from "../../assets/icons/m1.png";
import walmart from "../../assets/icons/walmart.png";
import bigcommerce from "../../assets/icons/bigcommerce.png";
import backerkit from "../../assets/icons/BackerKit-logo.png";
import shopify from "../../assets/icons/shopify.png";
import woocommerce from "../../assets/icons/woocommerce-logo.png";
import esty from "../../assets/icons/1200px-Etsy_logo.svg.png";
import comingSoon from "../../assets/icons/comingSoon1.png";
import HoverImage from "react-hover-image";
import Tooltip from "@material-ui/core/Tooltip";
import * as shiphypeservice from "./ShipService/shiphype_service";
import Link from "@material-ui/core/Link";
import ProgressBar from "./feedback/ProgressBar";
import ConfirmationMessage from "./feedback/ConfirmationMessage";
import ConfirmationCheck from "./feedback/ConfirmationCheck";
import StepConnector from "@material-ui/core/StepConnector";
import Wix from "../../assets/icons/wix.JPG";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import popUpStyle from "./style/popUpStyle";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import ShopfyIntegrationUi from "./feedback/ShopfyIntegrationUi";
import WooCommerceIntegrationUi from "./feedback/WooCommerceIntegrationUi";
import SquareSpaceIntegrationUI from "./feedback/SquareSpaceIntegrationUi";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import popStyle from "./style/popUpStyle";
import WixIntegrationUi from "./feedback/WixIntegrationUi";
const QontoConnector = withStyles({
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
    //  border: '2px solid #ced4da',
    //  boxShadow: '-10px 10px #0168fa',
    // boxShadow: '10px 5px 5px #cccccc',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    height: 100,
    width: 120,
    marginLeft: "14%",
    cursor: "pointer",
    // marginLeft: '12%',
  },

  imageselected: {
    //   border: '1px solid #0168fa',
    //   boxShadow: '-10px 10px #0168fa',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    height: 100,
    width: 120,
    marginLeft: "14%",
    cursor: "pointer",
    //marginLeft: '12%',
  },
  alredayimageselected: {
    //   border: '1px solid #0168fa',
    //   boxShadow: '-10px 10px #0168fa',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    height: 100,
    width: 120,
    marginLeft: "14%",
    //marginLeft: '12%',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(2),
    flexGrow: 1,
    height: "60vh",
    overflow: "auto",
    backgroundColor: "#fff",
  },
  root: {
    flexGrow: 1,
  },
  avatarsmall: {
    width: theme.spacing(3.5),
    height: theme.spacing(3.5),
  },
  table: {
    minWidth: "100%",
    border: "1px solid #CCCCCC",
    marginTop: theme.spacing(1),
  },
  tablehead: {
    border: "1px solid #e6e6e6",
    backgroundColor: "#e6e6e6",
    color: "#000000",
    fontWeight: "bold",
    textAlign: "left",
  },
  tableCell: {
    border: "1px solid #CCCCCC",
    textAlign: "left",
  },

  TableRow: {
    minWidth: "100%",
    textDecoration: "underline",
    // border: '1px solid black',
  },
  ImagesDesign: {
    width: "115px",
    height: "62px",
    marginTop: "25%",
    // '&:hover': {
    //   width: '115px', height: '62px',marginTop:'8%',
    // }
  },
  ImagesDesign5: {
    width: "115px",
    height: "92px",
    marginTop: "15%",
    // '&:hover': {
    //   width: '115px', height: '92px',marginTop:'8%',
    // }
  },
  ImagesDesign6: {
    width: "115px",
    height: "72px",
    marginTop: "25%",
    // '&:hover': {
    //   width: '115px', height: '72px',marginTop:'8%',
    // }
  },
  ImagesDesign4: {
    width: "130px",
    height: "122px",
    marginTop: "4%",
    // '&:hover': {
    //   width: '130px', height: '122px',marginTop:'8%',
    // }
  },
  ImagesDesign2: {
    width: "115px",
    height: "60px",
    marginTop: "30%",
    // '&:hover': {
    //   width: '115px', height: '60px',marginTop:'8%',
    // }
  },
  ImagesDesign1: {
    width: "115px",
    height: "90px",
    marginTop: "10%",
    // '&:hover': {
    //   width: '115px', height: '90px',marginTop:'8%',
    // }
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
  ImagesDesignSquareSpace: {
    width: "115px",
    height: "70px",
    marginTop: "15%",
  },
  ImagesDesignShopify: {
    width: "115px",
    height: "70px",
    marginTop: "15%",
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
    //  paddingBottom: '9%',
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
  const [cardid, setCardid] = React.useState(0);
  const [openDelete1, setOpenDelete1] = React.useState(false);
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

  const userRoleId = parseInt(window.localStorage.roleId);
  const [users, setUsers] = React.useState([]);
  const [seller, setSeller] = React.useState(0);
  const [openwoocommerce, setOpenwoocommerce] = React.useState(false);
  //const [steps,setSteps]=React.useState([]);

  const [integrateDataid, setDataForIntegrateID] = React.useState(0);
  const [openshopfy, setOpenshopfy] = React.useState(false);
  const [ebayintegrationid, setEbayintegrationid] = React.useState(null);
  const [shopifyintegrationid, setShopifyintegrationid] = React.useState(null);
  const [ebayactive, setEbayactive] = React.useState(false);
  const [shopifyactive, setShopifyactive] = React.useState(false);
  const [opensquarespace, setOpensquarespace] = React.useState(false);
  const [openwix, setOpenwix] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const openSquareSpace = (data) => {
    if (data === 13) {
      setOpenwix(true);
    } else {
      setOpensquarespace(true);
    }
    setDataForIntegrateID(data);
  };

  const handleDeleteCancle = () => {
    setOpenDelete(false);
    setWocommid(false);
    setShipfyid(false);
    setEbay(false);
    fetchSelectedIntegration(userid);
  };
  const ConframetionCheck = () => {
    setOpenDelete(false);
    setWocommid(false);
    setShipfyid(false);
    setEbay(false);
    fetchSelectedIntegration(userid);
  };
  const selectIntegrationForShiphype = (data, URL) => {
    console.log("selectalredayimage", data);
    //setDataForIntegrateUrl(URL);
    setDataForIntegrateID(data);
    setOpenDelete1(true);
  };
  /**
   * Description:To do fetch image data
   */
  useEffect(() => {
    if (code !== "0") {
      ebaygetTokenapi(code, 1, userid);
    }

    fetchImage();
    fetchUserInfo();
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

  const handleChangeCheckbox = (event, integrationidselect) => {
    console.log("checked", event.target.checked);
    var isactive = 0;
    if (event.target.checked) {
      isactive = 1;
    } else {
      isactive = 0;
    }
    if (integrationidselect === 1) {
      setEbayactive(event.target.checked);
      shiphypeservice
        .add30MinutesSYnc(isactive, ebayintegrationid)
        .then((response) => {
          console.log("token", response);
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (integrationidselect === 4) {
      setShopifyactive(event.target.checked);
      shiphypeservice
        .add30MinutesSYnc(isactive, shopifyintegrationid)
        .then((response) => {
          console.log("token", response);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
    }
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
                ? (myObject["displayName"] = response.data[a].displayName)
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
              response.data[a].displayName
                ? (myObject["displayName"] = response.data[a].displayName)
                : null;
              response.data[a].userEmail
                ? (myObject["name"] = response.data[a].userEmail)
                : null;
              newArr.push(myObject);
            }
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

  const module = [];
  const m23 = [];
  const fetchImage = () => {
    var arr = [];
    arr.push(4);
    arr.push(3);
    arr.push(1);
    arr.push(6);
    arr.push(13);
    setLoading(true);
    shiphypeservice
      .fetchimagelogobyid(arr)
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
          setOpenDelete1(false);
          setEbay(false);
          setShipfyid(false);
          setSqaureid(false);
          setBigcommid(false);
          setFetchIntData(response.data);
          if (response.data.length !== 0) {
            setSelectIntegration(true);
            for (let i = 0; i < response.data.length; i++) {
              if (response.data[i].integrationId === 1) {
                setEbay(true);
                setShipfyid(false);
                setSqaureid(false);
                setBigcommid(false);
                setEbayintegrationid(response.data[i].userintegrationId);
                if (response.data[i].isactive === 1) {
                  setEbayactive(true);
                } else {
                  setEbayactive(false);
                }
              } else if (response.data[i].integrationId === 2) {
                setAmazon(true);
              } else if (response.data[i].integrationId === 3) {
                setWocommid(true);
              } else if (response.data[i].integrationId === 4) {
                setShipfyid(true);
                setShopifyintegrationid(response.data[i].userintegrationId);
                if (response.data[i].isactive === 1) {
                  setShopifyactive(true);
                } else {
                  setShopifyactive(false);
                }
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
              } else {
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

  /**
   * Description:To do bind warehouse data
   */
  function BindImages() {
    return <View></View>;
  }

  const openShopfyIntegration = (data) => {
    setDataForIntegrateID(data);
    setOpenshopfy(true);
  };

  const openWoocommerceIntegration = (data) => {
    setDataForIntegrateID(data);
    setOpenwoocommerce(true);
  };
  const cancelShopfyIntegration = () => {
    fetchSelectedIntegration(userid);
    setOpenwoocommerce(false);
    setOpenshopfy(false);
    setOpensquarespace(false);
    setOpenwix(false);
    fetchSelectedIntegration(userid);
  };
  const ConframetionCheck1 = () => {
    fetchSelectedIntegration(userid);

    //fetchSelectedIntegration(userid);
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
    } else {
      if (data === integrationId) {
        setIntegrationId(0);
        if (fetchIntData.length !== 0) {
        } else {
        }
      } else {
        setIntegrationId(data);
      }
      window.sessionStorage.setItem("intid", 1);
      // window.open( "https://auth.ebay.com/oauth2/authorize?client_id=NishantT-Shiphype-PRD-f193e18a1-6800bbd2&redirect_uri=Nishant_Tyagi-NishantT-Shiphy-tkrdemk&response_type=code&scope=https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.inventory%20https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.account%20https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.fulfillment&prompt=login","_blank");
      var ebayurl =
        "https://auth.ebay.com/oauth2/authorize?client_id=NishantT-Shiphype-PRD-f193e18a1-6800bbd2&redirect_uri=Nishant_Tyagi-NishantT-Shiphy-tkrdemk&response_type=code&scope=https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.inventory%20https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.account%20https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.fulfillment&prompt=login";
      window.open(
        ebayurl,
        "_blank",
        "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=150,width=" +
          { screenWidth } +
          ",height=" +
          { screenHeight } +
          "fullscreen=yes"
      );
    }
  };
  /**
   * Description:To do close poup after successfully create sprint and on click cancel button
   * @param {*} issprintCreate
   */
  const handleNext = (isSprintCreate) => {
    // props.handelStepper();
    props.handleNext(isSprintCreate);
  };

  const selectAlredayImage = (data) => {
    console.log("selectalredayimage", data);
    setDataForIntegrate(data);
    setOpenDelete(true);
  };
  const changeGroupComponent = (rowid) => {
    setOpenDelete(true);
    setCardid(rowid);
    console.log("rowid", rowid);
  };

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
            <Text style={popUpStyle.breadCrundCss2}> Integrations {"\n"} </Text>
          </Grid>
          <Grid item lg={5} style={{ marginTop: "15px" }}>
            <Grid justify="flex-end" container>
              <Grid item style={{ marginRight: "20px" }}>
                {userRoleId === 1 ? (
                  <Grid
                    item
                    style={{
                      marginTop: "1px",
                      marginBottom: "10px",
                      padding: "0",
                    }}
                  >
                    <Autocomplete
                      id="combo-box-demo"
                      fullWidth
                      options={users}
                      getOptionLabel={(option) => option.name}
                      style={{ width: 400 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size="small"
                          placeholder="Search Seller"
                          variant="outlined"
                        />
                      )}
                      onChange={(event, newValue) => {
                        if (newValue !== null) {
                          setSeller(newValue.id);
                          setWocommid(false);
                          setShipfyid(false);
                          setEbay(false);
                          fetchSelectedIntegration(newValue.id);
                        }
                        console.log("newvalue", newValue);
                      }}
                    />
                  </Grid>
                ) : (
                  ""
                )}
              </Grid>
            </Grid>{" "}
          </Grid>{" "}
        </Grid>
      </View>
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
      <Grid justify="center">
        <ProgressBar loading={loading} />
      </Grid>
      {/* <Grid>
{(openDelete === false ? " " :
           <ConfirmationMessage
           openDeleteCard={openDelete}
           integrationId={integrateData}
        userid={userid}
        market={cardid}
        ConframetionCheck={ConframetionCheck}
           handleDeleteCancle={handleDeleteCancle}
         />)}
</Grid> */}
      <View style={popUpStyle.paddingSide}>
        <form className={classes.form}>
          <Grid container spacing={3} justify="center">
            <Grid item lg={11} xs={12}>
              <TableContainer>
                <Table
                  className={classes.table}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.tablehead}>
                        INTEGRATIONS
                      </TableCell>
                      <TableCell className={classes.tablehead} align="center">
                        CONNECTION
                      </TableCell>
                      {/* <TableCell className={classes.tablehead} align="left">30MINUTES SYNC</TableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {objectData.map((data, index) => (
                      <TableRow>
                        <TableCell className={classes.tableCell}>
                          {(() => {
                            if (data.logo === "ebay.png") {
                              return (
                                <Grid items xs={6} lg={12} md={4}>
                                  <Card
                                    className={clsx(
                                      integrationId !== 1 && classes.paper1,
                                      integrationId === 1 &&
                                        classes.imageselected,
                                      ebayid && classes.alredayimageselected
                                    )}
                                    variant="outlined"
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
                                <Grid items xs={6} lg={12} md={4}>
                                  <Card
                                    className={clsx(
                                      integrationId !== 2 && classes.paper1,
                                      integrationId === 2 &&
                                        classes.imageselected,
                                      amazonid && classes.alredayimageselected
                                    )}
                                    variant="outlined"
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
                                <Grid items xs={6} lg={12} md={4}>
                                  <Card
                                    className={clsx(
                                      integrationId !== 3 && classes.paper1,
                                      integrationId === 3 &&
                                        classes.imageselected,
                                      wocommid && classes.alredayimageselected
                                    )}
                                    variant="outlined"
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
                                <Grid items xs={6} lg={12} md={4}>
                                  <Card
                                    className={clsx(
                                      integrationId !== 4 && classes.paper1,
                                      integrationId === 4 &&
                                        classes.imageselected,
                                      shipfyid && classes.alredayimageselected
                                    )}
                                    variant="outlined"
                                  >
                                    <Image
                                      className={classes.ImagesDesignShopify}
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
                                <Grid items xs={6} lg={12} md={4}>
                                  <Card
                                    className={clsx(
                                      integrationId !== 5 && classes.paper1,
                                      integrationId === 5 &&
                                        classes.imageselected,
                                      magentoid && classes.alredayimageselected
                                    )}
                                    variant="outlined"
                                  >
                                    {/* <Image className={classes.ImagesDesign} source={m1} /> */}

                                    {/* <HoverImage
                                className={classes.ImagesDesign}
                      src={m1}
                      hoverSrc={comingSoon}
                    /> */}
                                  </Card>
                                </Grid>
                              );
                            } else if (data.logo === "squarespace.png") {
                              return (
                                <Grid items xs={6} lg={12} md={4}>
                                  <Card
                                    className={clsx(
                                      integrationId !== 6 && classes.paper1,
                                      integrationId === 6 &&
                                        classes.imageselected,
                                      sqaureid && classes.alredayimageselected
                                    )}
                                    variant="outlined"
                                  >
                                    <Image
                                      className={
                                        classes.ImagesDesignSquareSpace
                                      }
                                      source={square}
                                    />

                                    {/* <HoverImage
                    className={classes.ImagesDesign1}
          src={square}
          hoverSrc={comingSoon}
        /> */}
                                  </Card>
                                </Grid>
                              );
                            } else if (data.logo === "backerkit.png") {
                              return (
                                <Grid items xs={6} lg={12} md={4}>
                                  <Card
                                    className={clsx(
                                      integrationId !== 7 && classes.paper1,
                                      integrationId === 7 &&
                                        classes.imageselected,
                                      backritid && classes.alredayimageselected
                                    )}
                                    variant="outlined"
                                  >
                                    {/* <Image className={classes.ImagesDesign} source={backerkit} /> */}

                                    {/* <HoverImage
                    className={classes.ImagesDesign6}
          src={backerkit}
          hoverSrc={comingSoon}
        /> */}
                                  </Card>
                                </Grid>
                              );
                            } else if (data.logo === "etsy.png") {
                              return (
                                <Grid items xs={6} lg={12} md={4}>
                                  <Card
                                    className={clsx(
                                      integrationId !== 8 && classes.paper1,
                                      integrationId === 8 &&
                                        classes.imageselected,
                                      etsyid && classes.alredayimageselected
                                    )}
                                    variant="outlined"
                                  >
                                    {/* <Image style={{ width: '115px', height: '50px',marginTop:'30%'}} source={esty} /> */}

                                    {/* <HoverImage
                                className={classes.ImagesDesign2}
                      src={esty}
                      hoverSrc={comingSoon}
                    /> */}
                                  </Card>
                                </Grid>
                              );
                            } else if (data.logo === "shipstation.png") {
                              return (
                                <Grid items xs={6} lg={12} md={4}>
                                  <Card
                                    className={clsx(
                                      integrationId !== 9 && classes.paper1,
                                      integrationId === 9 &&
                                        classes.imageselected,
                                      shipstatid && classes.alredayimageselected
                                    )}
                                    variant="outlined"
                                  >
                                    {/* <Image className={classes.ImagesDesign} source={shipstation} /> */}

                                    {/* <HoverImage
                                className={classes.ImagesDesign5}
                      src={shipstation}
                      hoverSrc={comingSoon}
                    /> */}
                                  </Card>
                                </Grid>
                              );
                            } else if (data.logo === "bestbuy.png") {
                              return (
                                <Grid items xs={6} lg={12} md={4}>
                                  <Card
                                    className={clsx(
                                      integrationId !== 10 && classes.paper1,
                                      integrationId === 10 &&
                                        classes.imageselected,
                                      bestbyid && classes.alredayimageselected
                                    )}
                                    variant="outlined"
                                  >
                                    {/* <Image style={{ width: '130px', height: '102px',marginTop:'4%'}} source={bestbuy} /> */}

                                    {/* <HoverImage
                                className={classes.ImagesDesign4}
                      src={bestbuy}
                      hoverSrc={comingSoon}
                    />
                          */}
                                  </Card>
                                </Grid>
                              );
                            } else if (data.logo === "walmart.png") {
                              return (
                                <Grid items xs={6} lg={12} md={4}>
                                  <Card
                                    className={clsx(
                                      integrationId !== 11 && classes.paper1,
                                      integrationId === 11 &&
                                        classes.imageselected,
                                      wolmartid && classes.alredayimageselected
                                    )}
                                    variant="outlined"
                                  >
                                    {/* <Image className={classes.ImagesDesign} source={walmart} /> */}

                                    {/* <HoverImage
                                className={classes.ImagesDesign}
                      src={walmart}
                      hoverSrc={comingSoon}
                    /> */}
                                  </Card>
                                </Grid>
                              );
                            } else if (data.logo === "wix.png") {
                              return (
                                <Grid items xs={6} lg={12} md={4}>
                                  <Card
                                    className={clsx(
                                      integrationId !== 13 && classes.paper1,
                                      integrationId === 13 &&
                                        classes.imageselected,
                                      bigcommid && classes.alredayimageselected
                                    )}
                                    variant="outlined"
                                  >
                                    <Image
                                      className={classes.ImagesDesign}
                                      source={Wix}
                                    />

                                    {/* <HoverImage
                    className={classes.ImagesDesign}
          src={bigcommerce}
          hoverSrc={comingSoon}
        /> */}
                                  </Card>
                                </Grid>
                              );
                            }
                          })()}
                        </TableCell>
                        <TableCell className={classes.tableCell} align="center">
                          {(() => {
                            if (data.logo === "ebay.png") {
                              if (ebayid === true) {
                                return (
                                  <ColorButton
                                    size="large"
                                    variant="contained"
                                    color="primary"
                                    // disabled={!wocommid}
                                    className={classes.profileMargin}
                                    onClick={() => {
                                      ebayid
                                        ? selectAlredayImage(data.integrationId)
                                        : opneebayapiInte(
                                            data.integrationId,
                                            data.redirectUrl
                                          );
                                    }}
                                  >
                                    DISABLE
                                  </ColorButton>
                                );
                              } else {
                                return (
                                  <ColorButton
                                    size="large"
                                    variant="contained"
                                    color="primary"
                                    // disabled={!wocommid}
                                    className={classes.profileMargin}
                                    onClick={() => {
                                      ebayid
                                        ? selectAlredayImage(data.integrationId)
                                        : opneebayapiInte(
                                            data.integrationId,
                                            data.redirectUrl
                                          );
                                    }}
                                  >
                                    ENABLE
                                  </ColorButton>
                                );
                              }
                            } else if (data.logo === "amazon.png") {
                              return (
                                <ColorButton
                                  size="large"
                                  variant="contained"
                                  color="primary"
                                  disabled={!amazonid}
                                  className={classes.profileMargin}
                                  // onClick={() => {
                                  //   amazonid
                                  //     ? selectAlredayImage(data.integrationId)
                                  //     : selectIntegrationForShiphype(
                                  //         data.integrationId,
                                  //         ""
                                  //       );
                                  // }}
                                >
                                  ENABLE
                                </ColorButton>
                              );
                            } else if (data.logo === "woocommernce.png") {
                              if (wocommid === true) {
                                return (
                                  <ColorButton
                                    size="large"
                                    variant="contained"
                                    color="primary"
                                    // disabled={!wocommid}
                                    className={classes.profileMargin}
                                    onClick={() => {
                                      wocommid
                                        ? selectAlredayImage(data.integrationId)
                                        : openWoocommerceIntegration(
                                            data.integrationId
                                          );
                                    }}
                                  >
                                    DISABLE
                                  </ColorButton>
                                );
                              } else {
                                return (
                                  <ColorButton
                                    size="large"
                                    variant="contained"
                                    color="primary"
                                    // disabled={!wocommid}
                                    className={classes.profileMargin}
                                    onClick={() => {
                                      wocommid
                                        ? selectAlredayImage(data.integrationId)
                                        : openWoocommerceIntegration(
                                            data.integrationId
                                          );
                                    }}
                                  >
                                    ENABLE
                                  </ColorButton>
                                );
                              }
                            } else if (data.logo === "shopify.png") {
                              if (shipfyid === true) {
                                return (
                                  <ColorButton
                                    size="large"
                                    variant="contained"
                                    color="primary"
                                    //disabled={!shipfyid}
                                    className={classes.profileMargin}
                                    onClick={() => {
                                      shipfyid
                                        ? selectAlredayImage(data.integrationId)
                                        : openShopfyIntegration(
                                            data.integrationId
                                          );
                                    }}
                                  >
                                    DISABLE
                                  </ColorButton>
                                );
                              } else {
                                return (
                                  <ColorButton
                                    size="large"
                                    variant="contained"
                                    color="primary"
                                    //disabled={!shipfyid}
                                    className={classes.profileMargin}
                                    onClick={() => {
                                      shipfyid
                                        ? selectAlredayImage(data.integrationId)
                                        : openShopfyIntegration(
                                            data.integrationId
                                          );
                                    }}
                                  >
                                    ENABLE
                                  </ColorButton>
                                );
                              }
                            } else if (data.logo === "magento.png") {
                              return (
                                <ColorButton
                                  size="large"
                                  variant="contained"
                                  color="primary"
                                  disabled={!magentoid}
                                  className={classes.profileMargin}
                                  //  onClick={()=>{changeGroupComponent(data.integrationId)}}
                                >
                                  ENABLE
                                </ColorButton>
                              );
                            } else if (data.logo === "squarespace.png") {
                              if (sqaureid === true) {
                                return (
                                  <ColorButton
                                    size="large"
                                    variant="contained"
                                    color="primary"
                                    //disabled={!shipfyid}
                                    className={classes.profileMargin}
                                    onClick={() => {
                                      sqaureid
                                        ? selectAlredayImage(data.integrationId)
                                        : openSquareSpace(data.integrationId);
                                    }}
                                  >
                                    DISABLE
                                  </ColorButton>
                                );
                              } else {
                                return (
                                  <ColorButton
                                    size="large"
                                    variant="contained"
                                    color="primary"
                                    //disabled={!shipfyid}
                                    className={classes.profileMargin}
                                    onClick={() => {
                                      sqaureid
                                        ? selectAlredayImage(data.integrationId)
                                        : openSquareSpace(data.integrationId);
                                    }}
                                  >
                                    ENABLE
                                  </ColorButton>
                                );
                              }
                            } else if (data.logo === "wix.png") {
                              if (bigcommid === true) {
                                return (
                                  <ColorButton
                                    size="large"
                                    variant="contained"
                                    color="primary"
                                    //disabled={!shipfyid}
                                    className={classes.profileMargin}
                                    onClick={() => {
                                      bigcommid
                                        ? selectAlredayImage(data.integrationId)
                                        : openSquareSpace(data.integrationId);
                                    }}
                                  >
                                    DISABLE
                                  </ColorButton>
                                );
                              } else {
                                return (
                                  <ColorButton
                                    size="large"
                                    variant="contained"
                                    color="primary"
                                    //disabled={!shipfyid}
                                    className={classes.profileMargin}
                                    onClick={() => {
                                      bigcommid
                                        ? selectAlredayImage(data.integrationId)
                                        : openSquareSpace(data.integrationId);
                                    }}
                                  >
                                    ENABLE
                                  </ColorButton>
                                );
                              }
                            } else if (data.logo === "backerkit.png") {
                              return (
                                <ColorButton
                                  size="large"
                                  variant="contained"
                                  color="primary"
                                  disabled={!backritid}
                                  className={classes.profileMargin}
                                  //    onClick={()=>{changeGroupComponent(data.integrationId)}}
                                >
                                  ENABLE
                                </ColorButton>
                              );
                            } else if (data.logo === "etsy.png") {
                              return (
                                <ColorButton
                                  size="large"
                                  variant="contained"
                                  color="primary"
                                  disabled={!etsyid}
                                  className={classes.profileMargin}
                                  //   onClick={()=>{changeGroupComponent(data.integrationId)}}
                                >
                                  ENABLE
                                </ColorButton>
                              );
                            } else if (data.logo === "shipstation.png") {
                              return (
                                <ColorButton
                                  size="large"
                                  variant="contained"
                                  color="primary"
                                  disabled={!shipstatid}
                                  className={classes.profileMargin}
                                  // onClick={()=>{changeGroupComponent(data.integrationId)}}
                                >
                                  ENABLE
                                </ColorButton>
                              );
                            } else if (data.logo === "bestbuy.png") {
                              return (
                                <ColorButton
                                  size="large"
                                  variant="contained"
                                  color="primary"
                                  disabled={!bestbyid}
                                  className={classes.profileMargin}
                                  //   onClick={()=>{changeGroupComponent(data.integrationId)}}
                                >
                                  ENABLE
                                </ColorButton>
                              );
                            } else if (data.logo === "walmart.png") {
                              return (
                                <ColorButton
                                  size="large"
                                  variant="contained"
                                  color="primary"
                                  disabled={!wolmartid}
                                  className={classes.profileMargin}
                                  // onClick={()=>{changeGroupComponent(data.integrationId)}}
                                >
                                  ENABLE
                                </ColorButton>
                              );
                            } else if (data.logo === "bigcommerce.png") {
                              return (
                                <ColorButton
                                  size="large"
                                  variant="contained"
                                  color="primary"
                                  disabled={!bigcommid}
                                  className={classes.profileMargin}
                                  //   onClick={()=>{changeGroupComponent(data.integrationId)}}
                                >
                                  ENABLE
                                </ColorButton>
                              );
                            }
                          })()}
                        </TableCell>
                        {/* <TableCell  className={classes.tableCell} align="left">
                {(() => {
            if(data.logo === 'ebay.png'){
              if(ebayid === true)
              {
               return (
                <FormGroup>
               <FormControlLabel
                    style={popStyle.checkboxPosition}
                    control={
                      <Checkbox
                        id={data.integrationId}
                        checked={ebayactive}
                        onChange={() => {
                          handleChangeCheckbox(event,data.integrationId);
                        }}
                        color="primary"
                      />
                    }
                    label= {ebayactive ? <Text style={{ fontSize: '12px',
           // fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
            transition : 'all 0.25s',}}>Sync Start</Text> : <Text style={{ fontSize: '12px',
           // fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
            transition : 'all 0.25s',}}>Sync Stop</Text> }
                    className={classes.radioButtonCss}
                    InputProps={{
                      inputProps: { style: { borderRadius: 0 } },
                      style: { borderRadius: 0 },
                    }}
                  />
              </FormGroup>
             
                  )
              }
              else{
               return (
               
                <FormGroup>
               <FormControlLabel
                    style={popStyle.checkboxPosition}
                    control={
                      <Checkbox
                        id={data.integrationId}
                        checked={ebayactive}
                        onChange={() => {
                          handleChangeCheckbox(event,data.integrationId);
                        }}
                        color="primary"
                      />
                    }
                    label= {ebayactive ? <Text style={{ fontSize: '12px',
           // fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
            transition : 'all 0.25s',}}>Sync Start</Text> : <Text style={{ fontSize: '12px',
           // fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
            transition : 'all 0.25s',}}>Sync Stop</Text>}
                    className={classes.radioButtonCss}
                    InputProps={{
                      inputProps: { style: { borderRadius: 0 } },
                      style: { borderRadius: 0 },
                    }}
                  />
              </FormGroup>
                  )
              }
                        }
            
             else if (data.logo === 'amazon.png'){
               
                   return (

                    <FormGroup>
               <FormControlLabel
                    style={popStyle.checkboxPosition}
                    control={
                      <Checkbox
                        id={data.integrationId}
                        onChange={() => {
                          handleChangeCheckbox(event,data.integrationId);
                        }}
                        color="primary"
                      />
                    }
                    label= {<Text style={{ fontSize: '12px',
           // fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
            transition : 'all 0.25s',}}>Sync Start</Text> }
                    className={classes.radioButtonCss}
                    InputProps={{
                      inputProps: { style: { borderRadius: 0 } },
                      style: { borderRadius: 0 },
                    }}
                  />
              </FormGroup>
                     )
    
                 } else 
                 if(data.logo === 'woocommernce.png'){
                 if(wocommid===true)
                 {
                  return (
                    <FormGroup>
               <FormControlLabel
                    style={popStyle.checkboxPosition}
                    control={
                      <Checkbox
                        id={data.integrationId}
                        onChange={() => {
                          handleChangeCheckbox(event,data.integrationId);
                        }}
                        color="primary"
                      />
                    }
                    label= {<Text style={{ fontSize: '12px',
           // fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
            transition : 'all 0.25s',}}>Sync Stop</Text> }
                    className={classes.radioButtonCss}
                    InputProps={{
                      inputProps: { style: { borderRadius: 0 } },
                      style: { borderRadius: 0 },
                    }}
                  />
              </FormGroup>
                     )
                 }
                 else{
                  return (
                    <FormGroup>
               <FormControlLabel
                    style={popStyle.checkboxPosition}
                    control={
                      <Checkbox
                        id={data.integrationId}
                        onChange={() => {
                          handleChangeCheckbox(event,data.integrationId);
                        }}
                        color="primary"
                      />
                    }
                    label= {<Text style={{ fontSize: '12px',
           // fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
            transition : 'all 0.25s',}}>Sync Stop</Text> }
                    className={classes.radioButtonCss}
                    InputProps={{
                      inputProps: { style: { borderRadius: 0 } },
                      style: { borderRadius: 0 },
                    }}
                  />
              </FormGroup>
                     )
                 }      
                 }else if(data.logo === 'shopify.png'){
                    if(shipfyid===true)
                    {
                      return (
                <FormGroup>
               <FormControlLabel
                    style={popStyle.checkboxPosition}
                    control={
                      <Checkbox
                        id={data.integrationId}
                        checked={shopifyactive}
                        onChange={() => {
                          handleChangeCheckbox(event,data.integrationId);
                        }}
                        color="primary"
                      />
                    }
                    label= {shopifyactive ? <Text style={{ fontSize: '12px',
           // fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
            transition : 'all 0.25s',}}>Sync Start</Text> : <Text style={{ fontSize: '12px',
           // fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
            transition : 'all 0.25s',}}>Sync Stop</Text> }
                    className={classes.radioButtonCss}
                    InputProps={{
                      inputProps: { style: { borderRadius: 0 } },
                      style: { borderRadius: 0 },
                    }}
                  />
              </FormGroup>
             
                         )
                    }
                    else{
                      return (

                        <FormGroup>
               <FormControlLabel
                    style={popStyle.checkboxPosition}
                    control={
                      <Checkbox
                        id={data.integrationId}
                        checked={shopifyactive}
                        onChange={() => {
                          handleChangeCheckbox(event,data.integrationId);
                        }}
                        color="primary"
                      />
                    }
                    label= { shopifyactive ? <Text style={{ fontSize: '12px',
           // fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
            transition : 'all 0.25s',}}>Sync Start</Text> : <Text style={{ fontSize: '12px',
           // fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
            transition : 'all 0.25s',}}>Sync Stop</Text> }
                    className={classes.radioButtonCss}
                    InputProps={{
                      inputProps: { style: { borderRadius: 0 } },
                      style: { borderRadius: 0 },
                    }}
                  />
              </FormGroup>
                         )
                    }      
                 }
                 else if(data.logo === 'magento.png'){
                  return (
                    <FormGroup>
               <FormControlLabel
                    style={popStyle.checkboxPosition}
                    control={
                      <Checkbox
                        id={data.integrationId}
                        onChange={() => {
                          handleChangeCheckbox(data.integrationId);
                        }}
                        color="primary"
                      />
                    }
                    className={classes.radioButtonCss}
                    InputProps={{
                      inputProps: { style: { borderRadius: 0 } },
                      style: { borderRadius: 0 },
                    }}
                  />
              </FormGroup>


                     )
                        
                 }else if(data.logo === 'squarespace.png'){
                   
                  return (
                    <FormGroup>
               <FormControlLabel
                    style={popStyle.checkboxPosition}
                    control={
                      <Checkbox
                        id={data.integrationId}
                        onChange={() => {
                          handleChangeCheckbox(data.integrationId);
                        }}
                        color="primary"
                      />
                    }
                    className={classes.radioButtonCss}
                    InputProps={{
                      inputProps: { style: { borderRadius: 0 } },
                      style: { borderRadius: 0 },
                    }}
                  />
              </FormGroup>


                  
                     )
                        
                 }
                 else if(data.logo === 'backerkit.png'){
                  
                  return (
                    <FormGroup>
               <FormControlLabel
                    style={popStyle.checkboxPosition}
                    control={
                      <Checkbox
                        id={data.integrationId}
                        onChange={() => {
                          handleChangeCheckbox(data.integrationId);
                        }}
                        color="primary"
                      />
                    }
                    className={classes.radioButtonCss}
                    InputProps={{
                      inputProps: { style: { borderRadius: 0 } },
                      style: { borderRadius: 0 },
                    }}
                  />
              </FormGroup>

                     )
                        
                 }else if(data.logo === 'etsy.png'){
                  
                  return (
                    <FormGroup>
               <FormControlLabel
                    style={popStyle.checkboxPosition}
                    control={
                      <Checkbox
                        id={data.integrationId}
                        onChange={() => {
                          handleChangeCheckbox(data.integrationId);
                        }}
                        color="primary"
                      />
                    }
                    className={classes.radioButtonCss}
                    InputProps={{
                      inputProps: { style: { borderRadius: 0 } },
                      style: { borderRadius: 0 },
                    }}
                  />
              </FormGroup>


                     )
                        }
                 
                 else if(data.logo === 'shipstation.png'){
                  
                  return (
                    <FormGroup>
               <FormControlLabel
                    style={popStyle.checkboxPosition}
                    control={
                      <Checkbox
                        id={data.integrationId}
                        onChange={() => {
                          handleChangeCheckbox(data.integrationId);
                        }}
                        color="primary"
                      />
                    }
                    className={classes.radioButtonCss}
                    InputProps={{
                      inputProps: { style: { borderRadius: 0 } },
                      style: { borderRadius: 0 },
                    }}
                  />
              </FormGroup>
                     )
                        
                 }else if(data.logo === 'bestbuy.png'){
                    
                  return (
                    <FormGroup>
               <FormControlLabel
                    style={popStyle.checkboxPosition}
                    control={
                      <Checkbox
                        id={data.integrationId}
                        onChange={() => {
                          handleChangeCheckbox(data.integrationId);
                        }}
                        color="primary"
                      />
                    }
                    className={classes.radioButtonCss}
                    InputProps={{
                      inputProps: { style: { borderRadius: 0 } },
                      style: { borderRadius: 0 },
                    }}
                  />
              </FormGroup>


                     )
                        
                 }else if(data.logo === 'walmart.png'){
                   
                  return (
                    <FormGroup>
               <FormControlLabel
                    style={popStyle.checkboxPosition}
                    control={
                      <Checkbox
                        id={data.integrationId}
                        onChange={() => {
                          handleChangeCheckbox(data.integrationId);
                        }}
                        color="primary"
                      />
                    }
                    className={classes.radioButtonCss}
                    InputProps={{
                      inputProps: { style: { borderRadius: 0 } },
                      style: { borderRadius: 0 },
                    }}
                  />
              </FormGroup>

                     )
                        
                 }else if(data.logo === 'bigcommerce.png'){
                  
                  return (
                    <FormGroup>
               <FormControlLabel
                    style={popStyle.checkboxPosition}
                    control={
                      <Checkbox
                        id={data.integrationId}
                        onChange={() => {
                          handleChangeCheckbox(data.integrationId);
                        }}
                        color="primary"
                      />
                    }
                    className={classes.radioButtonCss}
                    InputProps={{
                      inputProps: { style: { borderRadius: 0 } },
                      style: { borderRadius: 0 },
                    }}
                  />
              </FormGroup>

                     )
                        
                 }
               })()}

                </TableCell> */}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Snackbar
              anchorOrigin={{ vertical, horizontal }}
              key={`${vertical},${horizontal}`}
              open={open}
              autoHideDuration={1500}
              onClose={handleClose}
            >
              <Alert onClose={handleClose} severity="error">
                This integration is already selected.Please choose another
                integration.
              </Alert>
            </Snackbar>
          </Grid>
        </form>
      </View>
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
