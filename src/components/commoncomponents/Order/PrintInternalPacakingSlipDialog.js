import React, { useState, useEffect } from "react";

import clsx from "clsx";
import { fade, withStyles, makeStyles } from "@material-ui/core/styles";
import { Platform, View, Image, Text, Dimensions } from "react-native";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import PropTypes from "prop-types";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import StepConnector from "@material-ui/core/StepConnector";

import ProgressBar from "../feedback/ProgressBar";
import * as shiphypeservice from "../ShipService/shiphype_service";
/**For Style */
import popUpStyle from "../style/popUpStyle";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import validate from "validate.js";

const pickUPTime = [
  {
    id: 1,
    label: "10 AM",
  },
  {
    id: 2,
    label: "11 AM",
  },
  {
    id: 3,
    label: "12 AM",
  },
  {
    id: 4,
    label: "1 PM",
  },
  {
    id: 5,
    label: "2 PM",
  },
  {
    id: 5,
    label: "3 PM",
  },
  {
    id: 6,
    label: "4 PM",
  },
  // {
  //   id: 7,
  //   label: '5 PM',
  // },
  // {
  //   id: 8,
  //   label: '6 PM',
  // },
];

const pickUPTime1 = [
  {
    id: 1,
    label: "10 AM",
  },
  {
    id: 2,
    label: "11 AM",
  },
  {
    id: 3,
    label: "12 AM",
  },
  {
    id: 4,
    label: "1 PM",
  },
  {
    id: 5,
    label: "2 PM",
  },
  {
    id: 5,
    label: "3 PM",
  },
  {
    id: 6,
    label: "4 PM",
  },
  // {
  //   id: 7,
  //   label: '5 PM',
  // },
  // {
  //   id: 8,
  //   label: '6 PM',
  // },
];

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
  checkBox23: {
    paddingBottom: "0px",
    paddingTop: "0px",
    height: "25px",
  },
  checkBoxColor: {
    color: "#0158d4",
  },
  profileMargin11: {
    marginTop: theme.spacing(2),
    borderRadius: "5px",

    //  marginBottom: theme.spacing(1),
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
          Internal Packaging Slip
        </Typography>
      </Grid>
    </MuiDialogTitle>
  );
});

/**
 * Description:This function is used for Select warehouse
 * @param {*} props
 */
export default function PrintInternalPacakingSlipDialog(props) {
  const classes = useStyles();

  const { openinternalslip } = props;
  const userid = props.user_id;
  const [shipTimeDate, setShipTimeDate] = React.useState(0);
  const [shipTimeDate1, setShipTimeDate1] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [carrierId, setCarrierId] = React.useState("");
  const [optionEnabled, setOptionEnabled] = React.useState(true);
  const [orderCouierType, setOrderCourierType] = React.useState([]);
  const [editCase, setEdit] = React.useState(0);
  const [resonId, setResionId] = React.useState(0);
  const [setCuttofTime, setsetCuttofTime] = React.useState("1");
  const [enatime, enableTime] = React.useState(true);

  const handleChangeShipDateTime = (event) => {
    setShipTimeDate(event.target.value);
    setOptionEnabled(false);
  };

  const handleChangeShipDateTime1 = (event) => {
    setShipTimeDate1(event.target.value);
    setOptionEnabled(false);
  };
  const handleChangeCutofTime = (event) => {
    setsetCuttofTime(event.target.value);
    if (event.target.value === "1") {
      enableTime(true);
    } else {
      enableTime(false);
    }
  };

  const handleChange1 = (event) => {
    setCarrierId(event.target.value);
  };

  const handleClose1 = () => {
    props.handleDeleteCancle();
  };
  const handleChangeShipped = () => {
    setLoading(true);
    props.handleRelease(101);

    //props.handleConfirmHold(formState.values.Reason,editCase,resonId)
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
        open={openinternalslip}
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
         
          <form className={classes.form}>
            <Grid container className={classes.root} spacing={1}>
              <Grid container justify="space-between">
                <Grid item xs={12} md={12} lg={12}>
                  
                  <Grid items xs={12} lg={12}>
                    <Grid justify="center" container>
                      <Grid item xs={10}>
                        <Text
                          style={{
                            fontSize: "13px",
                            fontWeight: "700",
                            fontFamily:
                              '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                            color: "#001737",
                            transition: "all 0.25s",
                          }}
                        >
                          {"\n"}Select Cutoff Time
                        </Text>
                      </Grid>
                      <Grid item xs={10}>
                        <FormGroup>
                          <FormControl component="fieldset">
                            <RadioGroup
                              aria-label="carries"
                              name="carries"
                              value={setCuttofTime}
                              onChange={handleChangeCutofTime}
                            >
                              <FormControlLabel
                                value="1"
                                className={classes.checkBox23}
                                control={<Radio color="primary" />}
                                label={
                                  <Text
                                    style={{
                                      fontSize: "12px",
                                      // fontWeight: '700',
                                      fontFamily:
                                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                      color: "#001737",

                                      transition: "all 0.25s",
                                    }}
                                  >
                                    Default Cutoff Time (12PM)
                                  </Text>
                                }
                              />
                              <FormControlLabel
                                value="2"
                                className={classes.checkBox23}
                                control={<Radio color="primary" />}
                                label={
                                  <Text
                                    style={{
                                      fontSize: "12px",
                                      // fontWeight: '700',
                                      fontFamily:
                                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                      color: "#001737",

                                      transition: "all 0.25s",
                                    }}
                                  >
                                    Custom Cutoff Time
                                  </Text>
                                }
                              />
                            </RadioGroup>
                          </FormControl>
                        </FormGroup>
                      </Grid>

                      <Grid item xs={10}>
                        <TextField
                          id="outlined-select-currency-native"
                          select
                          fullWidth
                          //   label="US Warehouse"
                          value={shipTimeDate}
                          disabled={enatime}
                          onChange={handleChangeShipDateTime}
                          SelectProps={{
                            native: true,
                          }}
                          size="small"
                          type="text"
                          className={classes.profileMargin11}
                          style={{
                            fontSize: "12px",
                            //fontWeight: '700',
                            fontFamily:
                              '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                          }}
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
                            US Warehouse
                          </option>

                          {pickUPTime.map((option) => (
                            <option
                              style={{
                                fontSize: "14px",
                                //fontWeight: '700',
                                paddingLeft: "15px",
                                cursor: "pointer",
                                fontFamily:
                                  '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              }}
                              key={option.id}
                              value={option.id}
                            >
                              {option.label}
                            </option>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={10}>
                        <TextField
                          id="outlined-select-currency-native"
                          select
                          fullWidth
                          //  label="Canada Warehouse"
                          value={shipTimeDate1}
                          disabled={enatime}
                          onChange={handleChangeShipDateTime1}
                          SelectProps={{
                            native: true,
                          }}
                          size="small"
                          type="text"
                          className={classes.profileMargin11}
                          style={{
                            fontSize: "12px",
                            //fontWeight: '700',
                            fontFamily:
                              '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                          }}
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
                            Canada Warehouse
                          </option>

                          {pickUPTime1.map((option) => (
                            <option
                              style={{
                                fontSize: "14px",
                                //fontWeight: '700',
                                paddingLeft: "15px",
                                cursor: "pointer",
                                fontFamily:
                                  '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              }}
                              key={option.id}
                              value={option.id}
                            >
                              {option.label}
                            </option>
                          ))}
                        </TextField>
                      </Grid>
                    </Grid>
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
                  <ColorButton1
                    size="large"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={()=>{handleClose1()}}
                  >
                    No
                  </ColorButton1>
                </Grid>

                <Grid item justify="center">
                  <ColorButton
                    size="large"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={()=>{handleChangeShipped()}}
                  >
                    Print Slip
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

PrintInternalPacakingSlipDialog.propTypes = {
  openinternalslip: PropTypes.bool,
  //  handleNextPage: PropTypes.func,
  handleDeleteCancle: PropTypes.func,
};
