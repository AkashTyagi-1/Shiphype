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
/**For Style */
import popUpStyle from ".././style/popUpStyle";
import Divider from '@material-ui/core/Divider';



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
      <Grid item xs={6} justify="flex-start">
        <Typography
          justify="center"
          variant="body1"
          style={{
            fontSize: "16px",
            fontWeight: "700",
            marginTop: "20px",
            marginBottom: "20px",
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
          }}
        >
          Charges
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

  const { openivalue } = props;
  const user_id = props.userid;
  const rowDataForOrder = props.rowData;
  
  const handleClose1 = (isdone) => {
    props.handlecancel();
  };

  function removeHst(rowData){
    var price=rowData.total_price;
    for(let i=0;i<rowData.charges.length;i++){
      if(rowData.charges[i].charge_name === "HST ON"){
    price=rowData.total_price - rowData.charges[i].charge_amount;
    break;
      }
    }
    return (Math.round(price * 100) / 100).toFixed(2);
    
    }
  return (
    <View>
      <Dialog
        maxWidth="xs"
        fullWidth={true}
        className={classes.dialog}
        onClose={() => {
          handleClose1(true);
        }}
        aria-labelledby="customized-dialog-title"
        open={openivalue}
      >
        <Grid item xs={12}>
          <DialogTitle
            id="customized-dialog-title"
            onClose={() => {
              handleClose1(true);
            }}
            style={{
              width: "96%",
              margin: "auto",
              paddingBottom: "0px",
              paddingTop: "0px",
            }}
          ></DialogTitle>
        </Grid>
        {/* <Grid justify="center">
          <ProgressBar loading={loading} />
        </Grid> */}
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
                  <Grid>
                    <Typography justify="center" variant="body1"></Typography>
                  </Grid>
                  <Grid items xs={12} lg={12}>
                    <Grid
                      justify="space-between" 
                      container
                    >
                      <Text
                        style={{
                          fontSize: "14px",
                          fontWeight: "700",
                          marginTop: "10px",
                          fontFamily:
                            '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                        }}
                      >
                        Delivery Date(Est):
                      </Text>
                      <Text
                        style={{
                          fontSize: "12px",
                          // fontWeight: '700',
                          marginTop: "10px",
                          marginBottom: "10px",
                          fontFamily:
                            '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                        }}
                      >
                        {rowDataForOrder.max_delivery_date}
                      </Text>
                      </Grid>
                      </Grid>
                     <Divider/>
                  {rowDataForOrder.charges.map(data => (  
                  <Grid items xs={12} lg={12}>
                    <Grid
                      justify="space-between" 
                      container
                    >
                    {(data.charge_name === "HST ON"  || data.charge_name === "GST ON" || data.charge_name === "GST" || data.charge_name === "QST ON") === true ?  "" : (
                      <Text
                        style={{
                          fontSize: "14px",
                          fontWeight: "700",
                          marginTop: "10px",
                          fontFamily:
                            '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                        }}
                      >
                        {data.charge_name}
                      </Text>

                    )}
                    {(data.charge_name === "HST ON"  || data.charge_name === "GST ON" || data.charge_name === "GST" || data.charge_name === "QST ON") === true ?  "" : (
                      <Text
                        style={{
                          fontSize: "12px",
                          // fontWeight: '700',
                          marginTop: "10px",
                          marginBottom: "10px",
                          fontFamily:
                            '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                        }}
                      >
                        ${data.charge_amount}
                      </Text>

                    )}
                      
                      </Grid>
                      </Grid>
                      ))}
                      <Divider/>
                      <Grid items xs={12} lg={12}>
                    <Grid
                      justify="space-between" 
                      container
                    >
                      <Text
                        style={{
                          fontSize: "14px",
                          fontWeight: "700",
                          marginTop: "10px",
                          fontFamily:
                            '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                        }}
                      >
                       Total:
                      </Text>
                      <Text
                        style={{
                          fontSize: "12px",
                          // fontWeight: '700',
                          marginTop: "10px",
                          marginBottom: "10px",
                          fontFamily:
                            '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                        }}
                      >
                      ${removeHst(rowDataForOrder)}
                        {/* ${rowDataForOrder.total_price} */}
                      </Text>
                      </Grid>
                      </Grid>
                      </Grid>
                  </Grid>
              </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </View>
  );
}

ShippingProfile.propTypes = {
    openivalue: PropTypes.bool,
    handlecancel: PropTypes.func,
};