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
    marginTop: theme.spacing(2),
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
const schema = {
  // shipFrom: {
  //   presence: { allowEmpty: false, message: "is required" },
  //   length: {
  //     maximum: 32,
  //   },
  // },
  // tracking: {
  //   presence: { allowEmpty: false, message: "is required" },
  //   length: {
  //     maximum: 64,
  //   },
  // },
  // qtyBox: {
  //   presence: { allowEmpty: false, message: "is required" },
  //   length: {
  //     maximum: 64,
  //   },
  // },
};
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
          Confirmation Check
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

  const { openManualTrackingOrder } = props;
  const userid = props.user_id;
  //   let lengthwidthHeight=props.lengthwidthHeight;
  const [loading, setLoading] = React.useState(false);
  const [carrierId, setCarrierId] = React.useState("");
  const [lengthwidthHeight, setLengthWidthH] = useState([
    { customproduct_id: 0, productname: 0, serialnovalue: 0 },
  ]);
  const [lengthwidthHeightChild, setLengthWidthHChild] = useState([]);
  const [orderCouierType, setOrderCourierType] = React.useState([]);
  const [editCase, setEdit] = React.useState(0);
  const [resonId, setResionId] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [type, setType] = React.useState("");
  const [status, setStatus] = React.useState(false);
  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
    ppt: false,
    doc: false,
  });
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });

  React.useEffect(() => {
    console.log("heightweidth", props.lengthwidthHeight);
    const valueLengthWidthHeight = [...lengthwidthHeightChild];
    var count = 1;
    for (let i = 0; i < props.lengthwidthHeight.length; i++) {
      for (let j = 0; j < props.lengthwidthHeight[i].quantity; j++) {
        //valueLengthWidthHeight.push(props.lengthwidthHeight[i]);
        valueLengthWidthHeight.push({
          customproduct_id: props.lengthwidthHeight[i].customproduct_id,
          orderid: props.lengthwidthHeight[i].orderid,
          userid: props.lengthwidthHeight[i].userid,
          productname: props.lengthwidthHeight[i].productname,
          serialnovalue: 0,
          series: count,
        });
        count++;
      }
    }
    setLengthWidthHChild(valueLengthWidthHeight);
    setLengthWidthH(props.lengthwidthHeight);
    // fetchOrderStatus();
  }, []);

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  const handleClose1 = () => {
    props.handleDeleteCancle();
  };
  const handleChangeShipped = () => {
    setLoading(true);
    console.log("hitapi", lengthwidthHeightChild);

    shiphypeservice
        .updateProductSerialNumber(
          lengthwidthHeightChild
        )
        .then((response) => {
          console.log("status", response.status);
          if (response.status === true) {
            setLoading(false);
            props.handleConfirmHold('Done');
            //fetchProductList();
          } else {
            setLoading(false);
            props.handleConfirmHold('Done');
          }
        })
        .catch((error) => {
          console.error(error);
        });

    //props.handleConfirmHold(formState.values.Tracking,carrierId,'')
  };
  const handleChange1 = (event) => {
    setCarrierId(event.target.value);
  };

  function handleChange10(i, event) {
    console.log("ivalue", i);
    const values = [...lengthwidthHeightChild];
    values[i].serialnovalue = event.target.value;
    setLengthWidthHChild(values);
  }

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
        open={openManualTrackingOrder}
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
                  <Grid>
                    <Typography justify="center" variant="body1"></Typography>
                  </Grid>
                  <Grid items xs={12} lg={12}>
                    <Grid
                      justify="center" // Add it here :)
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
                        Add Serial Number for the product.
                      </Text>
                      <Grid item xs={12}>
                        {lengthwidthHeightChild.map((field, idx) => {
                          return (
                            <View key={`${field}-${idx}`}>
                              <Grid item xs={12}>
                                <Grid justify="space-between" container>
                                  <Grid lg={5}>
                                    <TextField
                                      id="length"
                                      name="length"
                                      variant="outlined"
                                      fullWidth
                                      label="Product Name"
                                      size="small"
                                      type="text"
                                      className={classes.profileMargin1}
                                      value={field.productname}
                                    />
                                  </Grid>

                                  <Grid lg={5}>
                                    <TextField
                                      id="width"
                                      name="width"
                                      variant="outlined"
                                      fullWidth
                                      label="Serial Number"
                                      size="small"
                                      type="text"
                                      onChange={(e) => handleChange10(idx, e)}
                                      className={classes.profileMargin1}
                                      value={field.serialnovalue}
                                    />
                                  </Grid>
                                </Grid>
                              </Grid>
                            </View>
                          );
                        })}
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
                {/* <Grid item  justify="center">
        <ColorButton1
          size='large'
          variant="contained"
          color='primary'
          className={classes.submit}
          onClick={props.handleDeleteCancle()}
        >
      No
        </ColorButton1>
        </Grid> */}

                <Grid item justify="center">
                  <ColorButton
                    size="large"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleChangeShipped}
                  >
                    Add
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
  openManualTrackingOrder: PropTypes.bool,
  //  handleNextPage: PropTypes.func,
  handleDeleteCancle: PropTypes.func,
};
