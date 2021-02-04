import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { fade, withStyles, makeStyles } from "@material-ui/core/styles";
import { Platform, View, Image, Text, Dimensions } from "react-native";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import PropTypes from "prop-types";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import StepConnector from "@material-ui/core/StepConnector";
import Toast from "./Toast";
import ProgressBar from ".././feedback//ProgressBar";
import * as shiphypeservice from ".././ShipService/shiphype_service";
/**For Style */
import popUpStyle from ".././style/popUpStyle";
import IntegrationSuccesfully from '../dialog/IntegrationSuccesfully';
import validate from "validate.js";

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(0, 1, 0),
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
    marginTop: "2px",
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
  checkBoxColor: {
    color: "#0158d4",
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
    width: "180px",
    fontSize: "11px",
    fontWeight: "550",
    color: "#fff",
    backgroundColor: "#0168fa",
    "&:hover": {
      backgroundColor: "#002080",
    },
  },
}))(Button);
//Make custom button
const ColorButton1 = withStyles((theme) => ({
  root: {
    color: "#fff",
    borderRadius: "3px",
    height: "100%",
    width: "300px",
    fontSize: "11px",
    fontWeight: "550",
    color: "#fff",
    backgroundColor: "#008000",
    "&:hover": {
      backgroundColor: "#008000",
    },
  },
}))(Button);

const DialogTitle = withStyles(styles)((props) => {
  const {
    children,
    classes,
    onClose,
    onChangeValue,
    warehouse,
    warehouses,
    ...other
  } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      {onClose ? (
        <Grid container item xs={10} justify="flex-end">
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={props.onClose}
          >
            <CloseIcon />
          </IconButton>
        </Grid>
      ) : null}
      <Grid item xs={12} justify="center">
        <Typography
          justify="center"
          variant="body1"
          style={{
            fontSize: "16px",
            fontWeight: "700",
            marginTop: "20px",
            marginBottom: "20px",
            textAlign:'center',
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
          }}
        >
          WooCommerce Integration
        </Typography>
      </Grid>
    </MuiDialogTitle>
  );
});

const schema = {
  AppName: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 200,
    },
  },
  ConsumerKey: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 200,
    },
  },
  Consumersecret: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 200,
    },
  },
};

/**
 * Description:This function is used for Select warehouse
 * @param {*} props
 */
export default function ShippingProfile(props) {
  const classes = useStyles();

  const { openwoocommerce } = props;
  const userid = props.userid;

  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [type, setType] = React.useState("");
  const [status, setStatus] = React.useState(false);
  const [step,setStep]=React.useState(1);
  const [integrationopen,setIntegrationopen]=React.useState(false);
  const [inegrationStatus, setStausofInstgartion] = React.useState(false);
  let screenWidth = Dimensions.get('window').width;
  let screenHeight = Dimensions.get("window").height;
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  const showToast = (open, msg, type) => {
    return (
      <Toast open={open} handleClose={handleClose} type={type} msg={msg} />
    );
  };

  const handleClose = () => {
    setOpen(false);
  };
  /**
   * Description:This function call on type character inside input text
   * @param {} prop
   */
  const handleChange = (prop) => (event) => {
    console.log("Reason", event.target.value);
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

  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false;

  const handleClose1 = () => {
    setIntegrationopen(false);
    props.handleCancle();
  };

  const sendShopfyDetails2 = () => {
    const appname = formState.values.AppName;
    //var myArray = appname.split('.');
    
    //const appname1=myArray[1]+".com"
    //console.log("appname1",appname1);
    //const apikey = formState.values.ConsumerKey;
    //const apipass = formState.values.Consumersecret;

    const url1="https://";
    const url2=appname;
    const url3="/wc-auth/v1/authorize?app_name=";
    const url4=appname1;
    const url5="&scope=read_write&user_id=";
    const url6="168";
    const url7="&return_url=https://shiphype.com/&callback_url=https://shiphype.com/";
    const url8=url1+url2+url3+url4+url5+url6+url7;
    window.open(
      url8,
      "",   
      "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=150,width=1000,height=500"
    );


    setLoading(true);
    shiphypeservice
      .sendShopfydetail(userid, 3, appname1, apikey, apipass)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setOpen(true);
          setType("success");
          setMsg(response.message);
          setStatus(response.status);
          setLoading(false);
          setStep(3);
         
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
  };
  let flag=false;

  const fetchUserIntegrationShopify = (useridshopify)=>{

    //const userid=5;
    setLoading(true);
    if(flag===true)
    {
      shiphypeservice.fetchUserIntegration(useridshopify)
      .then(response => {
       console.log("status",response.status);
            if(response.status === true) {
              setLoading(false);
              if(response.data.length!==0)
              { 
                for(let i=0;i<response.data.length;i++)
                {
                  if(response.data[i].integrationId===3)
                  {
                    setStausofInstgartion(false);
                    flag=false;
                    HandleClose2();
                  }

                }
                if(flag===true)
                {
                  fetchUserIntegrationShopify(userid);
                }
                
              }
              else{
                fetchUserIntegrationShopify(userid);
              }

            
                       }else{
                        fetchUserIntegrationShopify(userid);
                        setLoading(false);
                        console.log("message",response.message);
                       }   
          }).catch((error) =>{
                console.error(error);
          });
    }
   
  }
   function HandleClose2(){
    setIntegrationopen(true);
  };
  const sendShopfyDetails = () => {
    const appStorename=formState.values.AppName;
    shiphypeservice.checkShopifyIntegration(userid,3,appStorename)
          .then(response => {
           console.log("status",response.status);
                if(response.status === true) {
                 // setMsg(response.message);
          setLoading(false);
          setStausofInstgartion(true);
          window.sessionStorage.setItem("storename", formState.values.AppName);
          const appname=formState.values.AppName;
          const url1="https://www.";
          const url2=appname;
          const url3=`/wc-auth/v1/authorize?app_name=${appname}&scope=read_write&user_id=${userid}&return_url=https://app.shiphype.com/&callback_url=https://api.shiphype.com/api/WooCommerce/callback`;
          const url4=url1+url2+url3;
          window.open(url4, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=150,width="+{screenWidth}+",height="+{screenHeight}+"fullscreen=yes");
         // HandleClose2();
         flag=true;
         fetchUserIntegrationShopify(userid);

                           }else{
                            //setLoading(false);
                            setOpen(true);
                            setType("error");
                            setMsg(response.message);
                            setStatus(response.status);
                            setLoading(false);
                            console.log("message",response.message);
                           }   
              }).catch((error) =>{
                    console.error(error);
              });


    
    
  };


  return (
    <View>
      <Dialog
        maxWidth="xs"
        fullWidth={true}
        className={classes.dialog}
        onClose={() => {
          handleClose1(false);
        }}
        aria-labelledby="customized-dialog-title"
        open={openwoocommerce}
      >
        <Grid item xs={12}>
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
        <Grid justify="center">
          <ProgressBar loading={loading} />
        </Grid>
        <DialogContent style={popUpStyle.sizeOfBody}>
          <Grid container justify="space-between">
            <Grid item xs={12} md={6} lg={6}></Grid>
            <Grid item xs={12} md={6} lg={6} container justify="flex-end">
              <Grid item xs={4} md={6} lg={6}></Grid>
            </Grid>
            {integrationopen === false ? (
              " "
            ) : (
              <IntegrationSuccesfully
                integrationopen={integrationopen}
                handleClose1={handleClose1}
              />
            )}
          </Grid>
          <form className={classes.form}>
            <Grid container className={classes.root} spacing={1}>
              <Grid container justify="space-between">
                <Grid item xs={12} md={12} lg={12}>
                  <Grid items xs={12} lg={12}>
                    <Grid justify="center" container>
                    {(() => {
            if (parseInt(step) === 1) {
              return (
                <Grid container justify="center">
                <Grid container justify="center" direction="row">

                <Typography
          justify="center"
          
          variant="body1"
          style={{
            fontSize: "16px",
            fontWeight: "700",
            marginTop:"9px",
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
          }}
        >
          https://
        </Typography>
                      <Grid item xs={10}>
                        <TextField
                          id="AppName"
                          name="AppName"
                          variant="outlined"
                          fullWidth
                          error={hasError("AppName")}
                          helperText={
                            hasError("AppName")
                              ? formState.errors.AppName[0]
                              : null
                          }
                          placeholder="Store Name"
                          size="small"
                          type="text"
                          onChange={handleChange("AppName")}
                          className={classes.profileMargin1}
                          value={formState.values.AppName || ""}
                        />
                      </Grid>
                      
                      </Grid>
                      <Grid justify="center" container spacing={24} style={{marginTop:'5px'}}>
            <Grid item>
              <Grid container spacing={1} justify="center">
                <Grid item justify="center">
                  <ColorButton
                    size="large"
                    variant="contained"
                    color="primary"
                    disabled={(formState.values.AppName === undefined || hasError("AppName") === true) === true ? true : false}
                    className={classes.submit}
                    onClick={() => {
                      sendShopfyDetails();
                    }}
                  >
                    Link Store
                  </ColorButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

                      </Grid>
                      );
            }
          })()}

          {(() => {
            if (parseInt(step) === 2) {
              return (
                <Grid container justify="center">
                <Grid container justify="center">
                <Grid item xs={10}>
                        <TextField
                          id="ConsumerKey"
                          name="ConsumerKey"
                          variant="outlined"
                          fullWidth
                          error={hasError("ConsumerKey")}
                          helperText={
                            hasError("ConsumerKey")
                              ? formState.errors.ConsumerKey[0]
                              : null
                          }
                          placeholder="Consumer Key"
                          size="small"
                          type="text"
                          onChange={handleChange("ConsumerKey")}
                          className={classes.profileMargin1}
                          value={formState.values.ConsumerKey || ""}
                        />
                      </Grid>

                      <Grid item xs={10}>
                        <TextField
                          id="Consumersecret"
                          name="Consumersecret"
                          variant="outlined"
                          fullWidth
                          error={hasError("Consumersecret")}
                          helperText={
                            hasError("Consumersecret")
                              ? formState.errors.Consumersecret[0]
                              : null
                          }
                          placeholder="Consumer password"
                          size="small"
                          type="text"
                          onChange={handleChange("Consumersecret")}
                          className={classes.profileMargin1}
                          value={formState.values.Consumersecret || ""}
                        />
                      </Grid>
                      </Grid>
                      <Grid justify="center" container spacing={24} style={{marginTop:'5px'}}>
            <Grid item>
              <Grid container spacing={1} justify="center">
                <Grid item justify="center">
                  <ColorButton
                    size="large"
                    variant="contained"
                    color="primary"
                    disabled={(formState.values.ConsumerKey === undefined || hasError("ConsumerKey") === true || formState.values.Consumersecret === undefined || hasError("Consumersecret") === true) === true ? true : false}
                    className={classes.submit}
                    onClick={() => {
                      
                      sendShopfyDetails();
                    }}
                  >
                   Login
                  </ColorButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

                      </Grid>
                      );
            }
          })()}

          {(() => {
            if (parseInt(step) === 3) {
              return (
                <Grid container justify="center">
                
                      <Grid justify="center" container spacing={24} style={{marginTop:'15px'}}>
            <Grid item>
              <Grid container spacing={1} justify="center">
                <Grid item justify="center">
                  <ColorButton1
                    size="large"
                    variant="contained"
                    color="primary"
                    //disabled={(formState.values.WebSiteName === undefined || hasError("WebSiteName") === true) === true ? true : false}
                    className={classes.submit}
                    onClick={() => {
                      props.handleCancle();
                    }}
                  >
                    Success
                  </ColorButton1>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

                      </Grid>
                      );
            }
          })()}
                      
                      {showToast(open, msg, type)}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions style={{ margin: "auto" }}>
          {/* <Grid justify="flex-end" container spacing={24}>
            <Grid item>
              <Grid container spacing={1} justify="center">
                <Grid item justify="center">
                  <ColorButton
                    size="large"
                    variant="contained"
                    color="primary"
                    disabled={!formState.isValid}
                    className={classes.submit}
                    onClick={() => {
                      sendShopfyDetails();
                    }}
                  >
                    Save
                  </ColorButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid> */}
        </DialogActions>
      </Dialog>
    </View>
  );
}

ShippingProfile.propTypes = {
  openwoocommerce: PropTypes.bool,
  handleCancle: PropTypes.func,
};
