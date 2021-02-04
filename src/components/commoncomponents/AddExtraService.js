import React, { useState, useEffect } from "react";
import { fade, withStyles, makeStyles } from "@material-ui/core/styles";
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
import { Platform, View, Image } from "react-native";
import ProgressBar from "./feedback/ProgressBar";
import Autocomplete from "@material-ui/lab/Autocomplete";
import * as shiphypeservice from "./ShipService/shiphype_service";
import popUpStyle from "./style/popUpStyle";
import validate from "validate.js";
const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(0),
  },

  root: {
    flexGrow: 1,
  },
  form: {
    marginLeft: theme.spacing(0),
  },

  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: "-2px",
    color: theme.palette.grey[500],
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

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
    width: "80px",
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
      <Grid item xs={6} justify="center">
        <Typography
          justify="center"
          variant="body1"
          style={{
            fontSize: "13px",
            fontWeight: "700",
            marginTop: "10px",
            textAlign: "center",
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
          }}
        >
          Add Extra Service
        </Typography>
      </Grid>
    </MuiDialogTitle>
  );
});

const service = [
  {
    id: "kittingcharges",
    name: "kitting Service",
  },
  {
    id: "pickingandpackingservicecharges",
    name: "Picking and Packing Service",
  },
  {
    id: "returnsservicecharges",
    name: "Returns Service",
  },
  {
    id: "internationalorderservicecharges",
    name: "International Order Service",
  },
  {
    id: "specialmerchandiseservicecharges",
    name: "Special Merchandise Service",
  },
  {
    id: "additionalservicecharges",
    name: "Additional Service",
  },
];

const serviceshipment = [
  {
    id: "recievingservicecharges",
    name: "Receiving Service",
  },
  {
    id: "storageservicecharges",
    name: "Storage Service",
  },
  {
    id: "shippingservicecharges",
    name: "Shipping Service",
  },
  {
    id: "insuranceservicecharges",
    name: "Insurance Service",
  },
];

const schema = {
  Amount: {
    presence: { allowEmpty: false, message: "is required" },
  },
};

/**
 * Description:This function is used for InvitePeople for str8line popup
 * @param {*} props
 */
var id = [];
export default function DeleteCard(props) {
  // const [open]= props;
  const classes = useStyles();
  const { openaddextraservice } = props;
  const orderiddata = props.orderid;
  const typepay = props.typepay;
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const [servicename, setServicename] = useState("");

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });

  useEffect(() => {
    id.push(orderiddata);
  }, []);

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

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

  useEffect(() => {}, [servicename]);

  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false;

  useEffect(() => {
    //fetchUserInfo();
  }, []);

  var newArr = [];

  const handleClose = () => {
    props.closeAddExtraService();
  };

  const fetchUserInfo = () => {
    //const userid=5;
    setLoading(true);
    shiphypeservice
      .fetchUserInfo()
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          //setUserData(response.data);
          for (let a = 0; a < response.data.length; a++) {
            if(response.data[a].userEmail==='')
              {
               var myObject = {};
               response.data[a].id ? (myObject["id"] = response.data[a].id) : null;
               response.data[a].displayName
                 ? (myObject["name"] = response.data[a].displayName)
                 : null;
               newArr.push(myObject);
              }
              else{
               var myObject = {};
               response.data[a].id ? (myObject["id"] = response.data[a].id) : null;
               response.data[a].userEmail
                 ? (myObject["name"] = response.data[a].userEmail)
                 : null;
               newArr.push(myObject);
              }
          }
          console.log("array", newArr);
          setUserData(newArr);
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleConfirmStatus = () => {
    if (parseInt(typepay) === 1) {
      const othercharge1 = formState.values.Amount;
      setLoading(true);
      shiphypeservice
        .updateOrderServices(orderiddata.orderid, servicename, othercharge1)
        .then((response) => {
          console.log("status", response.status);
          if (response.status === true) {
            setLoading(false);
            props.refreshOrderCharges();
          } else {
            setLoading(false);
            console.log("message", response.message);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      const othercharge1 = formState.values.Amount;
      setLoading(true);

      shiphypeservice
        .updateShipmentServices(
          orderiddata.shippingid,
          servicename,
          othercharge1
        )
        .then((response) => {
          console.log("status", response.status);
          if (response.status === true) {
            setLoading(false);
            props.refreshOrderCharges();
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

  return (
    <View>
      <Dialog
        maxWidth="xs"
        fullWidth={true}
        open={openaddextraservice}
        onClose={handleClose}
      >
        <Grid item xs={12}>
          <DialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
            style={{
              width: "96%",
              margin: "auto",
              paddingBottom: "0px",
              paddingTop: "0px",
            }}
          ></DialogTitle>
        </Grid>
        <DialogContent style={popUpStyle.sizeOfBody}>
          <Grid justify="center">
            <ProgressBar loading={loading} />
          </Grid>
          <form className={classes.form}>
            <Grid container spacing={1} justify="center">
              <Grid
                item
                xs={10}
                style={{ marginTop: "5px", marginLeft: "8px", padding: "0" }}
              >
                <Autocomplete
                  id="combo-box-demo"
                  fullWidth
                  options={parseInt(typepay) === 1 ? service : serviceshipment}
                  getOptionLabel={(option) => option.name}
                  style={{ width: 302 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      placeholder="Search Service"
                      variant="outlined"
                    />
                  )}
                  onChange={(event, newValue) => {
                    if (newValue !== null) {
                      // setUserid(newValue.id);
                      setServicename(newValue.id);

                      setFormState((formState) => ({
                        ...formState,
                        values: {
                          ...formState.values,
                          Amount: orderiddata[newValue.id],
                          checkFrom: false,
                        },
                        touched: {
                          ...formState.touched,
                          Amount: true,
                        },
                      }));
                    } else {
                      setServicename("");
                    }
                    console.log("newvalue", newValue);
                  }}
                />
              </Grid>

              {servicename === "" ? (
                ""
              ) : (
                <Grid item xs={10} justify="center">
                  <TextField
                    id="Amount"
                    name="Amount"
                    variant="outlined"
                    fullWidth
                    error={hasError("Amount")}
                    helperText={
                      hasError("Amount") ? formState.errors.Amount[0] : null
                    }
                    placeholder="Enter Amount"
                    size="small"
                    type="text"
                    onChange={handleChange("Amount")}
                    className={classes.profileMargin1}
                    value={formState.values.Amount || ""}
                  />
                </Grid>
              )}
              <Grid item xs={4} sm={3} justify="center">
                <ColorButton
                  size="large"
                  variant="contained"
                  color="primary"
                  disabled={servicename === "" ? true : false}
                  onClick={handleConfirmStatus}
                >
                  Submit
                </ColorButton>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </View>
  );
}

DeleteCard.propTypes = {
  openaddextraservice: PropTypes.bool,
  handleClose: PropTypes.func,
  closeAddExtraService: PropTypes.func,
  deleteCard: PropTypes.func,
  refreshOrderCharges: PropTypes.func,
};
