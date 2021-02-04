import React, { useState, useEffect } from "react";

import clsx from "clsx";
import { fade, withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Platform,
  View,
  Image,
  Text,
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
} from "react-native";
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
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import ProgressBar from ".././feedback//ProgressBar";
import * as shiphypeservice from ".././ShipService/shiphype_service";
/**For Style */
import popUpStyle from ".././style/popUpStyle";
import moment from "moment";
import validate from "validate.js";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
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
  profileMarginLeft: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
    borderRadius: 0,
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

const ColorButton3 = withStyles((theme) => ({
  root: {
    color: "#fff",
    backgroundColor: "#0168fa",
    borderRadius: "3px",
    height: 36,
    width: 100,
    marginLeft: "3px",
    fontSize: "12px",
    fontWeight: "550",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
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
      <Grid item xs={12} justify="center">
        <Typography
          justify="center"
          variant="body1"
          style={{
            fontSize: "16px",
            fontWeight: "700",
            marginTop: "20px",
            marginBottom: "20px",
            textAlign: "center",
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
          }}
        >
          Reply to Seller
        </Typography>
      </Grid>
    </MuiDialogTitle>
  );
});

/**
 * Description:To do show step of task
 */
function getSteps() {
  return [
    "Marketplace Integration",
    "Shipping Profile",
    "Product Import",
    "Product Sync",
    "Import Customers",
  ];
}
const schema = {
  Reason: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 1540,
    },
  },
};
const Item = ({ item, index }) => (
  <View
    style={{
      alignItems: item.usertype === "Admin" ? "flex-start" : "flex-start",
      justifyContent: "flex-start",
      borderRadius: 5,
      backgroundColor: index % 2 == 0 ? "#fff" : "#D3D3D3",
    }}
  >
    <Text
      style={{
        color: "#000",
        fontSize: "12px",
        marginLeft: item.usertype === "Admin" ? "5px" : "5px",
        marginRight: item.usertype === "Admin" ? "0px" : "0px",
      }}
    >
      {item.message}
    </Text>
    <Text
      style={{
        color: "#000",
        fontSize: "10px",
        marginLeft: item.usertype === "Admin" ? "5px" : "5px",
        marginRight: item.usertype === "Admin" ? "0px" : "0px",
      }}
    >
      {moment(item.createdate).format("MMM D, YYYY h:mma")}
    </Text>
  </View>
);


const ItemA = ({ item }) => (
  <View>
  <ImageBackground
    //onPress={()=>{window.open(`https://api.shiphype.com/api/Files/DownloadFiles?fileid=${fileid}`)}}
    style={{
      width: 65,
      height: 65,
      flexDirection: "column",
      borderRadius: 5,
      marginHorizontal: 5,
      marginVertical: 5,
      backgroundColor: "#0168fa",
    }}
    source={{ uri: "data:image/png;base64," + item.filecontent }}
  >
    <View
      style={{
        alignItems: "flex-end",
        marginTop: 10,
        marginRight: 10,
        justifyContent: "flex-start",
      }}
    ></View>
  </ImageBackground>
  <Text
      style={{
        color: "#000",
        fontSize: "12px",
        marginLeft: item.usertype === "Admin" ? "5px" : "5px",
        marginRight: item.usertype === "Admin" ? "0px" : "0px",
      }}
    >
      {item.usertype}
    </Text>
  </View>
);

const ItemPDF = ({ item }) => (
  <View>
  <ImageBackground
    onPress={() => {
      window.open(
        `https://api.shiphype.com/api/Files/DownloadFiles?fileid=${item.fileId}`
      );
    }}
    style={{
      width: 65,
      height: 65,
      flexDirection: "column",
      borderRadius: 5,
      marginHorizontal: 5,
      marginVertical: 5,
    }}
    source={require("../../../assets/icons/free_pdf_download_icon.png")}
  >
    <View
      style={{
        alignItems: "flex-end",
        marginTop: 10,
        marginRight: 10,
        justifyContent: "flex-start",
      }}
    >
      <CloudDownloadIcon
        onClick={() => {
          window.open(
            `https://api.shiphype.com/api/Files/DownloadFiles?fileid=${item.fileId}`
          );
        }}
      />
    </View>
  </ImageBackground>
  <Text
      style={{
        color: "#000",
        fontSize: "12px",
        marginLeft: item.usertype === "Admin" ? "5px" : "5px",
        marginRight: item.usertype === "Admin" ? "0px" : "0px",
      }}
    >
      {item.usertype}
    </Text>
  </View>
);

const ItemExcel = ({ item }) => (
  <View>
  <ImageBackground
    onPress={() => {
      window.open(
        `https://api.shiphype.com/api/Files/DownloadFiles?fileid=${item.fileId}`
      );
    }}
    style={{
      width: 65,
      height: 65,
      flexDirection: "column",
      borderRadius: 5,
      marginHorizontal: 5,
      marginVertical: 5,
    }}
    source={require("../../../assets/icons/excel_icon.png")}
  >
    <View
      style={{
        alignItems: "flex-end",
        marginTop: 10,
        marginRight: 10,
        justifyContent: "flex-start",
      }}
    >
      <CloudDownloadIcon
        onClick={() => {
          window.open(
            `https://api.shiphype.com/api/Files/DownloadFiles?fileid=${item.fileId}`
          );
        }}
      />
    </View>
  </ImageBackground>
  <Text
      style={{
        color: "#000",
        fontSize: "12px",
        marginLeft: item.usertype === "Admin" ? "5px" : "5px",
        marginRight: item.usertype === "Admin" ? "0px" : "0px",
      }}
    >
      {item.usertype}
    </Text>
  </View>
);

const ItemWord = ({ item }) => (
  <View>
  <ImageBackground
    onPress={() => {
      window.open(
        `https://api.shiphype.com/api/Files/DownloadFiles?fileid=${item.fileId}`
      );
    }}
    style={{
      width: 65,
      height: 65,
      flexDirection: "column",
      borderRadius: 5,
      marginHorizontal: 5,
      marginVertical: 5,
    }}
    source={require("../../../assets/icons/word_icon.png")}
  >
    <View
      style={{
        alignItems: "flex-end",
        marginTop: 10,
        marginRight: 10,
        justifyContent: "flex-start",
      }}
    >
      <CloudDownloadIcon
        onClick={() => {
          window.open(
            `https://api.shiphype.com/api/Files/DownloadFiles?fileid=${item.fileId}`
          );
        }}
      />
    </View>
  </ImageBackground>
  <Text
      style={{
        color: "#000",
        fontSize: "12px",
        marginLeft: item.usertype === "Admin" ? "5px" : "5px",
        marginRight: item.usertype === "Admin" ? "0px" : "0px",
      }}
    >
      {item.usertype}
    </Text>
  </View>
);
/**
 * Description:This function is used for Select warehouse
 * @param {*} props
 */
export default function ShippingProfile(props) {
  const classes = useStyles();

  const { openOnHoldOrder } = props;
  const userid = props.user_id;

  const [loading, setLoading] = React.useState(false);
  const [carrierId, setCarrierId] = React.useState("");

  const [orderCouierType, setOrderCourierType] = React.useState([]);
  const [editCase, setEdit] = React.useState(0);
  const [resonId, setResionId] = React.useState(0);
  const [nooffile, setNooffile] = React.useState(0);
  const [selectFiles, setSelectFiles] = React.useState([]);
  const [data, setData] = React.useState([]);
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

  const renderItem = ({ item, index }) => (
    <View style={{ marginLeft: "10px" }}>
      {item.filecontent === null && item.message !== null ? (
        <Item item={item} index={index} />
      ) : (
        <View>
          {item.filetype === "application/pdf" ? (
            <ItemPDF item={item} />
          ) : (
            <View>
              {item.filetype ===
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ? (
                <ItemExcel item={item} />
              ) : (
                <View>
                  {item.filetype ===
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? (
                    <ItemWord item={item} />
                  ) : (
                    <View>
                    {item.filecontent === null && item.message === null ? <Text></Text> :  <ItemA item={item} />}
                    </View>
                   
                   
                  )}
                </View>
              )}
            </View>
          )}
        </View>
      )}
    </View>
  );

  const { gilad, jason, antoine, ppt, doc } = state;
  React.useEffect(() => {
    // fetchOrderStatus();
    fetchShipRestricationReferh(props.rowAdminComment);
  }, []);

  const fetchShipRestricationReferh = (requestworkorder_id) => {
    setLoading(true);
    shiphypeservice
      .fetchchat(requestworkorder_id)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setData(response.data);
          setLoading(false);
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };
  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  const handleCapture = (event) => {
    const target = event.target.files;
    var array = [];
    console.log("fileselect", target);
    setNooffile(event.target.files.length);
    for (let i = 0; i < event.target.files.length; i++) {
      array.push(event.target.files[i]);
    }
    const updatedaray = [...array];
    setSelectFiles(updatedaray);
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
    props.handleDeleteCancle();
  };
  const handleChangeShipped = () => {
    setLoading(true);
    props.handleConfirmHold(formState.values.Reason, selectFiles);
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
        open={openOnHoldOrder}
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
                    <FlatList
                      data={data}
                      renderItem={renderItem}
                      keyExtractor={(item) => item.messageId}
                     
                    />
                    <Grid justify="center" container>
                      <Grid item xs={12} style={{ marginTop: "10px" }}>
                        <TextField
                          id="Reason"
                          name="Reason"
                          variant="outlined"
                          fullWidth
                          error={hasError("Reason")}
                          helperText={
                            hasError("Reason")
                              ? formState.errors.Reason[0]
                              : null
                          }
                          placeholder="Reply"
                          size="small"
                          type="text"
                          multiline={true}
                          rows={1}
                          onChange={handleChange("Reason")}
                          className={classes.profileMargin1}
                          value={formState.values.Reason || ""}
                        />
                      </Grid>

                      <Grid
                        items
                        container
                        xs={12}
                        md={12}
                        lg={8}
                        style={{ marginTop: "10px" }}
                      >
                        <Grid item lg={8}>
                          <Text>Upload Attachment (optional): </Text>
                        </Grid>
                        <Grid item lg={2}>
                          <ColorButton3
                            size="large"
                            variant="contained"
                            component="label"
                            color="primary"
                            startIcon={<CloudUploadIcon />}
                            //disabled={packageBool}
                            //onClick={()=>{handleNextPage(10)}}
                          >
                            Upload
                            <input
                              type="file"
                              multiple
                              onChange={handleCapture}
                              style={{ display: "none" }}
                            />
                          </ColorButton3>
                        </Grid>
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
                <Grid item justify="center"></Grid>

                <Grid item>
                  <ColorButton
                    size="large"
                    variant="contained"
                    color="primary"
                    className={classes.profileMargin}
                    onClick={() => {
                      props.handleRelease(4);
                    }}
                  >
                    Mark Resolved
                    {/* {language.copyandsaveobject} */}
                  </ColorButton>

                  <ColorButton
                    size="large"
                    variant="contained"
                    color="primary"
                    className={classes.profileMarginLeft}
                    onClick={handleChangeShipped}
                  >
                    Reply
                  </ColorButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogActions>
        {/* <DialogActions style={{ margin: "auto" }}>
          <Grid justify="flex-end" container spacing={24}>
            <Grid item>
              <Grid container spacing={1} justify="center">
                <Grid item justify="center"></Grid>

                <Grid item justify="center">
                  <ColorButton
                    size="large"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleChangeShipped}
                  >
                    SUBMIT
                  </ColorButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogActions> */}
      </Dialog>
    </View>
  );
}

ShippingProfile.propTypes = {
  openOnHoldOrder: PropTypes.bool,
  //  handleNextPage: PropTypes.func,
  handleDeleteCancle: PropTypes.func,
};
