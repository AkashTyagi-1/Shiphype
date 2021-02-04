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
import { Platform, View, Image,Text,StyleSheet } from "react-native";
import ProgressBar from "../feedback/ProgressBar";
import Autocomplete from "@material-ui/lab/Autocomplete";
import * as shiphypeservice from "../ShipService/shiphype_service";
import popUpStyle from "../style/popUpStyle";
import TransactionSuccessful from "./TransactionSuccesfully";
import TransactionFail from "./TransactionFail";
import PaymentWarning from "./PaymentWarning";
import validate from "validate.js";
import Toast from "../feedback/Toast";
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
  profileMargin1: {
    // border : '1px solid #cccccc',
    //  padding:'1%',
    //marginLeft: "8px",
    marginTop: "2px",
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
        <Grid container item xs={6} justify="flex-end">
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
            fontSize: "13px",
            fontWeight: "700",
            marginLeft:"100px",
            marginTop: "10px",
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
          }}
        >
          Submit Your Feedback
        </Typography>
      </Grid>
    </MuiDialogTitle>
  );
});



const schema = {
  
  Feedback: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 1000,
    },
  },
};

/**
 * Description:This function is used for InvitePeople for str8line popup
 * @param {*} props
 */

export default function SentFeedbackToAdmin(props) {
  // const [open]= props;
  const classes = useStyles();
  const { openfeedback } = props;
  const userid=props.userid;
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [type, setType] = React.useState("");
  const [status, setStatus] = React.useState(false);
 
 
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

 

  const handleClose = () => {
    props.closeFeedback();
  };

 


  const paymentDeduct=()=>{
   
    const description = formState.values.Feedback;
    
    setLoading(true);
      shiphypeservice
        .sendFeedback(userid,description)
        .then((response) => {
          console.log("status", response.status);
          if (response.status === true) {
            setLoading(false);
            setOpen(true);
            setType("success");
            setMsg(response.message);
          } else {
            //setOpentransactionfail(true);
            setLoading(false);
            setOpen(true);
            setType("error");
            setMsg(response.message);
            console.log("message", response.message);
          }
        })
        .catch((error) => {
          console.error(error);
        });
  }

  const showToast = (open, msg, type) => {
    return (
      <Toast open={open} handleClose={handleClose1} type={type} msg={msg} />
    );
  };
  const handleClose1 = () => {
    setOpen(false);
    props.closeFeedback();
  };

  return (
    <View>
      <Dialog
        maxWidth="xs"
        fullWidth={true}
        open={openfeedback}
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

          <View style={newstyle.drawline}></View>
          <form className={classes.form}>
            {showToast(open, msg, type)}
            <Grid container spacing={1} justify="center">
           
             <Text style={{fontSize: "12px"}}>If you have suggestions on how we can improve our dashboard, please submit your request here. All requests are reviewed by higher level management.</Text>
              <Grid item xs={12} justify="center">
                <TextField
                  id="Feedback"
                  name="Feedback"
                  variant="outlined"
                  fullWidth
                  error={hasError("Feedback")}
                  multiline={true}
                  rows={4}
                  helperText={
                    hasError("Feedback")
                      ? formState.errors.Feedback[0]
                      : null
                  }
                  size="small"
                  type="text"
                  onChange={handleChange("Feedback")}
                  className={classes.profileMargin1}
                  value={formState.values.Feedback || ""}
                />
              </Grid>
              <Grid item xs={4} sm={3} justify="center">
                <ColorButton
                  size="large"
                  variant="contained"
                  color="primary"
                  disabled={
                    (formState.isValid) === true
                      ? false
                      : true
                  }
                  onClick={paymentDeduct}
                >
                  Submit
                </ColorButton>
                {/* &nbsp;&nbsp;
                <ColorButton
                  size="large"
                  variant="contained"
                  color="primary"
                  
                  onClick={handleClose}
                >
                  Cancel
                </ColorButton> */}
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </View>
  );
}

const newstyle=StyleSheet.create({
drawline:{
  display: 'flex',
  flexDirection: 'row',
  borderBottomWidth: 1,
  marginVertical: 5,
  borderBottomColor: '#D3D3D3'
}
});

SentFeedbackToAdmin.propTypes = {
  opencustomecharge: PropTypes.bool,
  handleClose: PropTypes.func,
  closeAddExtraService: PropTypes.func,
  deleteCard: PropTypes.func,
  refreshOrderCharges: PropTypes.func,
};
