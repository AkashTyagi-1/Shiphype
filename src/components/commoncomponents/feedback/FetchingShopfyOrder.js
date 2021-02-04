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

import { format } from 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import validate from "validate.js";

const useStyles = makeStyles((theme) => ({
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
    height: "70%",
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
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    height: "70%",
    width: "30px",
    fontSize: "11px",
    fontWeight: "550",
    color: "#fff",
    backgroundColor: "#0168fa",
    "&:hover": {
      backgroundColor: "#002080",
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
      <Grid item xs={7} justify="flex-start">
        <Typography
          justify="center"
          variant="body1"
          style={{
            fontSize: "13px",
            fontWeight: "700",
            marginTop: "20px",
            marginBottom: "20px",
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
          }}
        >
          Import Orders from Integration
        </Typography>
      </Grid>
    </MuiDialogTitle>
  );
});

/**
 * Description:This function is used for Select warehouse
 * @param {*} props
 */
export default function ShippingProfile(props) {
  const classes = useStyles();

  const { openshopfy1 } = props;
  const userid = props.userid;
  const integrateDataid = props.integrateDataid;
  const ebaytoken=props.ebaytoken;
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [type, setType] = React.useState("");
  const [status, setStatus] = React.useState(false);
  const [fetchstatus, setFetchstatus] = React.useState("");
  const [data, setData] = React.useState([]);
  const [orderData, setOrderData] = React.useState([]);
  const [buttontext, setButtontext] = React.useState("Start Import");
  // const [productIds, setproductIds] = React.useState([]);

  const [selectedorderDate, setSelectedorderDate] = React.useState(new Date());
  const [selectedorderDate1, setSelectedorderDate1] = React.useState(new Date());
  const [selectedpickDate, setSelectedpickDate] = React.useState(new Date());
  const [startsprint,setStartsprint]=React.useState(0);
  const [endsprint,setEndsprint]=React.useState(0);

  const showToast = (open, msg, type) => {
    return (
      <Toast open={open} handleClose={handleClose} type={type} msg={msg} />
    );
  };


  React.useEffect(()=>{
    var date = new Date();
    // to add 4 days to current date
    date.setDate(date.getDate() - 60);
    setSelectedpickDate(date);
  },[]);


  const handleClose = () => {
    setOpen(false);
  };

  const handleClose1 = (isimport) => {
    props.handleCancle(isimport);
  };

  const handleStartDateChangePick = (date,value) => {
    setStartsprint(value);
    setSelectedpickDate(date);
    console.log("startdate",value);

  };

  const handleStartDateChangeFrom = (date,value) => {
    setEndsprint(value);
    setSelectedorderDate(date);
    setSelectedorderDate1(date);
    console.log("enddate",value);

  };

  useEffect(() => {
    if (integrateDataid === 3) {
      setLoading(true);
      // shiphypeservice
      //   .getShopfydetails(userid, 3)
      //   .then((response) => {
      //     console.log("status", response.status);
      //     if (response.status === true) {
      //       setLoading(false);
      //       setData(response.data);
      //     } else {
      //       setLoading(false);
      //       console.log("message", response.message);
      //     }
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
    } else {
     // fetchShopfyDetils(userid);
    }
  }, []);

  const fetchShopfyDetils = (userid) => {
    setLoading(true);
    shiphypeservice
      .getShopfydetails(userid, 4)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          setData(response.data);
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchShopfyProducts = () => {
    if (integrateDataid === 3) {
      if (buttontext === "Start Import") {
        const websitename = data.appname;
        const consumerkey = data.apikey;
        const consumersecret = data.apipass;

        setLoading(true);
        setFetchstatus("Importing Orders ...");
        shiphypeservice
          .fetchWoocommerceOrder(consumerkey, consumersecret, websitename)
          .then((response) => {
            console.log("status", response.status);
            if (response.status === true) {
              setLoading(false);
              //setOrderData(response.data);
              props.updateData(response.data);
              props.handleCancle(true);
              //  for(let i=0;i<response.data.length;i++){
              //   addNewOrder(response.data[i].id,response.data[i].source_name,1,response.data[i].created_at,response.data[i].processed_at,userid,response.data[i].user_id,1,1,1,
              //     response.data[i].line_items
              //     )
              //  }
              setLoading(false);
              setFetchstatus("Import Done");
              //setButtontext("Start Import");
            } else {
              setLoading(false);
              console.log("message", response.message);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
      }
    }else if(integrateDataid === 1){
      const enddatetime=  format(selectedorderDate, "yyyy-MM-dd hh:mm:ss");
      const startdatetime=  format(selectedpickDate, "yyyy-MM-dd hh:mm:ss");
      const token = props.ebaytoken;
      // const startdatetime = "2020-04-12T21:59:59.005Z";
      // const enddatetime = "2020-05-07T21:59:59.005Z";
      const entriesperpage = 5;
      setLoading(true);
      setFetchstatus("Importing Orders ...");
      shiphypeservice
        .getEbayOrder(token,startdatetime, enddatetime)
        .then((response) => {
          if("Errors" in response.GetOrdersResponse){
            setLoading(false);
            setFetchstatus(response.GetOrdersResponse.Errors.ShortMessage);
          }else if(response.GetOrdersResponse.OrderArray === null){
            setLoading(false);
            setFetchstatus("No Order exists between this date");
          }else{ 
            if(response.GetOrdersResponse.OrderArray.Order instanceof Array){
              props.updateData(response.GetOrdersResponse.OrderArray.Order);
            }else{
              var pack=[];
              pack.push(response.GetOrdersResponse.OrderArray.Order);
              props.updateData(pack);
            }
           // props.updateData(response.GetOrdersResponse.OrderArray.Order);
            props.handleCancle(true);
            setLoading(false);
            setFetchstatus("Import Done");
          }
            
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    } else {
      if (buttontext === "Start Import") {
        const storename=props.appname;
        const code=props.shopifytoken;

         const enddatetime=  format(selectedorderDate1.setDate(selectedorderDate1.getDate() + 1), "yyyy-MM-dd hh:mm:ss");
        // const enddatetime=  format(selectedorderDate, "yyyy-MM-dd hh:mm:ss");
        const startdatetime=  format(selectedpickDate, "yyyy-MM-dd hh:mm:ss");
        setLoading(true);
        setFetchstatus("Importing Orders ...");
        shiphypeservice
          .fetchShopfyOrder(code,storename,startdatetime,enddatetime)
          .then((response) => {
            console.log("status", response.status);
            if (response.status === true) {
              setLoading(false);
              //setOrderData(response.data);
              props.updateData(response.data);

              props.handleCancle(true);
              //  for(let i=0;i<response.data.length;i++){
              //   addNewOrder(response.data[i].id,response.data[i].source_name,1,response.data[i].created_at,response.data[i].processed_at,userid,response.data[i].user_id,1,1,1,
              //     response.data[i].line_items
              //     )
              //  }
              setLoading(false);
              setFetchstatus("Import Done");
              //setButtontext("Start Import");
            } else {
              setLoading(false);
              console.log("message", response.message);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
      }
    }
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
        open={openshopfy1}
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
          </Grid>
          <form className={classes.form}>
            <Grid container className={classes.root} spacing={1}>
              <Grid container justify="space-between">
                <Grid item xs={12} md={12} lg={12}>
                  <Grid items xs={12} lg={12}>
                    <Grid justify="center">
                      <Text
                        style={{
                          fontSize: "13px",
                          fontWeight: "700",
                          marginTop: "2px",
                          fontFamily:
                            '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                        }}
                      >
                        {fetchstatus}
                      </Text>
                    </Grid>
                      <Grid item xs={12} justify="center" container direction="column">
                      <Grid item xs={12} style={{marginBottom:'2px'}}>
                      <Grid>
                      <Text
                        style={{
                          fontSize: "12px",
                          fontWeight: "700",
                          marginTop: "10px",
                          fontFamily:
                            '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                        }}
                      >
                      Please select a range to import orders:
                      </Text>
                      </Grid>
                      <Text
                        style={{
                          fontSize: "12px",
                          fontWeight: "700",
                          marginTop: "2px",
                          fontFamily:
                            '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                        }}
                      >
                      Start Date
                      </Text>
  <MuiPickersUtilsProvider utils={DateFnsUtils} customStyles={{
          dateInput: {
              borderLeftWidth: 1,
              borderRightWidth: 1,
              borderTopWidth: 1,
          }
      }}>
     
     <KeyboardDatePicker
         variant="outlined"
         format="yyyy-MM-dd"
         margin="normal"
         id="pickingTime"
         fullWidth
         disablePast={false}
         placeholder="Start Date"
         value={selectedpickDate}
         
         onChange={handleStartDateChangePick}
         KeyboardButtonProps={{
           'aria-label': 'change date',
         }}
      
       />  
   </MuiPickersUtilsProvider>
  </Grid>

  <Grid item xs={12} style={{marginBottom:'2px'}}>
                      <Text
                        style={{
                          fontSize: "12px",
                          fontWeight: "700",
                          marginTop: "2px",
                          fontFamily:
                            '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                        }}
                      >
                      End Date
                      </Text>
  <MuiPickersUtilsProvider utils={DateFnsUtils} customStyles={{
          dateInput: {
              borderLeftWidth: 1,
              borderRightWidth: 1,
              borderTopWidth: 1,
          }
      }}>
     
     <KeyboardDatePicker
         variant="outlined"
         format="yyyy-MM-dd"
         margin="normal"
         id="pickingTime"
         fullWidth
         disablePast={false}
         placeholder="End Date"
         value={selectedorderDate}
         
         onChange={handleStartDateChangeFrom}
         KeyboardButtonProps={{
           'aria-label': 'change date',
         }}
      
       />  
   </MuiPickersUtilsProvider>
  </Grid>
  </Grid>
                      {showToast(open, msg, type)}
                   
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions style={{ margin: "auto" }}>
          <Grid justify="flex-end" container spacing={24}>
            <Grid item>
              <Grid container spacing={1} justify="center">
                <Grid item justify="center">
                  <ColorButton
                    size="large"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={() => {
                      fetchShopfyProducts();
                    }}
                  >
                    {buttontext}
                  </ColorButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </View>
  );
}

ShippingProfile.propTypes = {
  openshopfy1: PropTypes.bool,
  handleCancle: PropTypes.func,
  updateData: PropTypes.func,
};
