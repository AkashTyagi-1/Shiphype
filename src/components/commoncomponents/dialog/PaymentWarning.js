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
import { Platform, View, Image, Text } from "react-native";
import ProgressBar from "../feedback/ProgressBar";
import popUpStyle from "../style/popUpStyle";
import CrossFail from "../../../assets/icons/crossfail.png";

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
  ImagesDesignEbay: {
    width: "115px",
    height: "115px",
    marginTop: "5%",
    marginLeft: "35%",
    justifyContent: "center",
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
          Transaction Error
        </Typography>
      </Grid>
    </MuiDialogTitle>
  );
});

/**
 * Description:This function is used for InvitePeople for str8line popup
 * @param {*} props
 */

export default function DeleteCard(props) {
  // const [open]= props;
  const classes = useStyles();
  const { paymentwarning } = props;
  const transactionId = props.transactionId;
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    //props.closeAddExtraService();
    if (props.isinvoice === false) {
      props.refreshPage();
    } else {
      props.refreshPage1();
    }
  };

  const handleConfirmStatus = () => {
    if (props.isinvoice === false) {
      props.refreshPage();
    } else {
      props.refreshPage1();
    }
  };

  return (
    <View>
      <Dialog
        maxWidth="xs"
        fullWidth={true}
        open={paymentwarning}
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
                style={{ justifyContent: "center", padding: "0" }}
              >
                <Image
                  className={classes.ImagesDesignEbay}
                  source={CrossFail}
                />
              </Grid>

              <Grid item xs={10} style={{ marginTop: "5px", padding: "0" }}>
                <Text>
                  You don,t have any default credit card add for payment.So
                  please first add credit card from Billing section.
                </Text>
              </Grid>
              <Grid item xs={4} sm={3} justify="center">
                <ColorButton
                  size="large"
                  variant="contained"
                  color="primary"
                  onClick={handleConfirmStatus}
                >
                  Close
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
  paymentwarning: PropTypes.bool,
  handleClose: PropTypes.func,
  closeAddExtraService: PropTypes.func,
  deleteCard: PropTypes.func,
  refreshPage: PropTypes.func,
};
