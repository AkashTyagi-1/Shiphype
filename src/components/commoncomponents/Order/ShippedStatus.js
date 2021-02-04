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
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepConnector from "@material-ui/core/StepConnector";
import Toast from "../feedback/Toast";
import ProgressBar from "../feedback/ProgressBar";
import * as shiphypeservice from ".././ShipService/shiphype_service";
/**For Style */
import popUpStyle from ".././style/popUpStyle";
import Autocomplete from "@material-ui/lab/Autocomplete";

import validate from "validate.js";

const QontoConnector = withStyles({
  line: {
    borderColor: "#3f51b5",
    borderTopWidth: 2,
    borderRadius: 1,
  },
})(StepConnector);

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
  tracking: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 64,
    },
  },
};

/**
 * Description:This function is used for Select warehouse
 * @param {*} props
 */
export default function ShippingProfile(props) {
  const classes = useStyles();

  const { openMoveOnHoldOrder } = props;
  const user_id = props.userid;
  const rowDataForOrder = props.rowDataForOrder;
  const ordercustomerId = props.rowDataForOrder.customerId;
  const [loading, setLoading] = React.useState(false);
  const [carrierId, setCarrierId] = React.useState(props.carrierId);
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [type, setType] = React.useState("");
  const [pdfData, setPdfData] = React.useState("");
  const [status, setStatus] = React.useState(false);
  const [warehouseData, setWarehouseData] = React.useState([]);

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

  
  
  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);
  const handleChange1 = (event) => {
    setCarrierId(event.carrierId);
  };
  /**
   * Description:This function call on type character inside input text
   * @param {} prop
   */
  const handleChange = (prop) => (event) => {
    console.log("email", event.target.value);
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

  const handleClose1 = (isdone) => {
    props.handleDeleteCancle(true);
  };

  const handleChangeShipped = () => {
    if (carrierId === 2 || carrierId === 4) {
      upsIntegrationCall();
    } else {
      props.handleConfirmHold("123456", carrierId);
    }
    // props.handleConfirmHold(formState.values.tracking,carrierId)
  };
  const showToast = (open, msg, type) => {
    return (
      <Toast open={open} handleClose={handleClose} type={type} msg={msg} />
    );
  };
  const handleClose = () => {
    setOpen(false);
  };

  const upsIntegrationCall = () => {
    
  const inputdata=props.shipinput;


    const ship = {
      origin: {
        country: inputdata.origin.country,
        postal_code: inputdata.origin.postal_code,
        province: inputdata.origin.province,
        city: inputdata.origin.city,
        name: inputdata.origin.name,
        address1: inputdata.origin.address1,
        address2: inputdata.origin.address2,
        phone: inputdata.origin.phone,
        fax: null,
        address_type: inputdata.origin.address_type,
        company_name: inputdata.origin.company_name,
      },
      destination: {
        country: inputdata.destination.country,
        postal_code: inputdata.destination.postal_code,
        province: inputdata.destination.province,
        city: inputdata.destination.city,
        name: inputdata.destination.name,
        address1: inputdata.destination.address1,
        address2: inputdata.destination.address2,
        phone: inputdata.destination.phone,
        fax: null,
        address_type: inputdata.destination.address_type,
        company_name: inputdata.destination.company_name,
      },
      service: {
        service_code: props.parcelData.service_code,
        service_name: props.parcelData.service_name,
      },
      ship_date: props.parcelData.min_delivery_date,

      customs_invoice: {
        //reason_for_export : "sale",
        bill_to: "Consignee",
        invoice_currency: props.parcelData.currency,
        items: [
          {
            description: "My TEST - My PRODUCT",
            harmonized_code: "12345",
            origin_country_code: "CA",
            quantity: 1,
            unit_price: 15.05,
            weight: 30,
            weightUnit: "lbs",
            sku: "SKU CODE1",
          },
          {
            description: "My TEST - My PRODUCT2",
            harmonized_code: "67890",
            origin_country_code: "CA",
            quantity: 2,
            unit_price: 5.5,
            weight: 12,
            weightUnit: "lbs",
            sku: "SKU CODE2",
          },
        ],
      },
      packaging_information: {
        packaging_type: "My Packaging",
        packages: [
          {
            length:inputdata.packaging_information.packages[0].length,
            width:inputdata.packaging_information.packages[0].width,
            height:inputdata.packaging_information.packages[0].height,
              
            weight:inputdata.packaging_information.packages[0].weight,
            weightUnit: "lbs",
            insurance_amount:inputdata.packaging_information.packages[0].insurance_amount,
            description: "TEST",
            freight_class: "77.5",
            nmfc_code: "12345",
            type: "pallet",
          },
        ],
      },
    };

    console.log("shipdata", ship);
    setLoading(true);
    shiphypeservice
      .sentShipmentRequest(ship)
      .then((response) => {
        console.log("status", response.status);
        //setLoading(false);
        setLoading(false);
       // setPdfData('data:application/pdf;base64,'+response.shipment.documents[0].base64_encoded_string);
        downloadPDF(response.shipment.documents[0].base64_encoded_string);
        props.handleConfirmHold(response.shipment.master_tracking_num,response.shipment.order_id,response.shipment.service_name,response.shipment.tracking_url,props.parcelData.min_delivery_date);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        setOpen(true);
        setType("error");
        setMsg("Unable to process JSON Ship Request null");
      });
  };
  function downloadPDF(pdf) {
    const linkSource = `data:application/pdf;base64,${pdf}`;
    const downloadLink = document.createElement("a");
    const fileName = "shipping label.pdf";
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
    // downloadLink.style.position = 'fixed';
    // downloadLink.style.right = '0';
    // downloadLink.style.bottom = '0';
    // downloadLink.style.width = '0';
    // downloadLink.style.height = '0';
    // downloadLink.style.border = '0';
    // downloadLink.src = downloadLink.href;
    // document.body.appendChild(downloadLink);
    // let pdfWindow = window.open("");
    // pdfWindow.document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64," + pdf +"'></iframe>");


    // var pdfWindow = window.open("", '_blank');
    //             pdfWindow.document.write("<iframe width='100%' style='margin: -8px;border: none;' height='100%' src='data:application/pdf;base64, " + encodeURI(pdf) + "'></iframe>'");
 
 
 
    // var bin = atob(pdf);
// console.log('File Size:', Math.round(bin.length / 1024), 'KB');
// console.log('PDF Version:', bin.match(/^.PDF-([0-9.]+)/)[1]);
// console.log('Create Date:', bin.match(/<xmp:CreateDate>(.+?)<\/xmp:CreateDate>/)[1]);
// console.log('Modify Date:', bin.match(/<xmp:ModifyDate>(.+?)<\/xmp:ModifyDate>/)[1]);
// console.log('Creator Tool:', bin.match(/<xmp:CreatorTool>(.+?)<\/xmp:CreatorTool>/)[1]);
//Open the pdf-------------------------------------
// Embed the PDF into the HTML page and show it to the user
// var obj = document.createElement('object');
// obj.style.width = '100%';
// obj.style.height = '842pt';
// obj.type = 'application/pdf';
// obj.data = 'data:application/pdf;base64,' + pdf;
// window.open(document.body.appendChild(obj),'_blank');
//---------------------------------------------

// for download -----------------
// create a download anchor tag
// var downloadLink      = document.createElement('a');
// downloadLink.target   = '_blank';
// downloadLink.download = 'name_to_give_saved_file.pdf';

// // convert downloaded data to a Blob
// var blob = new Blob([pdf], { type: 'application/pdf' });

// // create an object URL from the Blob
// var URL = window.URL || window.webkitURL;
// var downloadUrl = URL.createObjectURL(blob);

// // set object URL as the anchor's href
// downloadLink.href = downloadUrl;

// // append the anchor to document body
// document.body.appendChild(downloadLink);

// // fire a click event on the anchor
// downloadLink.click();

// // cleanup: remove element and revoke object URL
// document.body.removeChild(downloadLink);
// URL.revokeObjectURL(downloadUrl);
//---------------------------------------


// Insert a link that allows the user to download the PDF file
// var link = document.createElement('a');
// link.innerHTML = 'Download PDF file';
// link.download = 'file.pdf';
// link.href = 'data:application/octet-stream;base64,' + pdf;
// document.body.appendChild(link);


    //downloadLink.click();
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
        open={openMoveOnHoldOrder}
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
                        Are you sure you want to use the this carrier for
                        Parcel?
                      </Text>
                      {/* Download the Pdf document */}
                      {/* <form id="createForm" name="createForm" novalidate enctype="multipart/form-data">
      <a href={pdfData} download title='Download pdf document'> Download Sample Sheet</a>
         </form> */}
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
                        You will get Tracking number after change shipped status
                        of order{" "}
                      </Text>
                      <Grid item xs={10} style={{ marginTop: "2px" }}>
                        {carrierId === 2 || carrierId === 4 ? (
                          <TextField
                            id="packageDescription"
                            name="packageDescription"
                            variant="outlined"
                            fullWidth
                            multiline={true}
                            rows={2}
                            error={hasError("packageDescription")}
                            helperText={
                              hasError("packageDescription")
                                ? formState.errors.packageDescription[0]
                                : null
                            }
                            placeholder="Package Description"
                            size="small"
                            type="text"
                            onChange={handleChange("packageDescription")}
                            className={classes.profileMargin1}
                            value={formState.values.packageDescription || ""}
                          />
                        ) : (
                          ""
                        )}
                      </Grid>

                      <Grid item xs={10} style={{ marginTop: "2px" }}>
                        {carrierId === 2 || carrierId === 4 ? (
                          <TextField
                            id="packagingCode"
                            name="packagingCode"
                            variant="outlined"
                            fullWidth
                            error={hasError("packagingCode")}
                            helperText={
                              hasError("packagingCode")
                                ? formState.errors.packagingCode[0]
                                : null
                            }
                            placeholder="Packaging Code"
                            size="small"
                            type="text"
                            onChange={handleChange("packagingCode")}
                            className={classes.profileMargin1}
                            value={formState.values.packagingCode || ""}
                          />
                        ) : (
                          ""
                        )}
                      </Grid>

                      <Grid item xs={10} style={{ marginTop: "2px" }}>
                        {carrierId === 2 || carrierId === 4 ? (
                          <TextField
                            id="packageWeight"
                            name="packageWeight"
                            variant="outlined"
                            fullWidth
                            error={hasError("packageWeight")}
                            helperText={
                              hasError("packageWeight")
                                ? formState.errors.packageWeight[0]
                                : null
                            }
                            placeholder="Package Weight"
                            size="small"
                            type="text"
                            onChange={handleChange("packageWeight")}
                            className={classes.profileMargin1}
                            value={formState.values.packageWeight || ""}
                          />
                        ) : (
                          ""
                        )}
                      </Grid>

                      <Grid item xs={10} style={{ marginTop: "2px" }}>
                        {carrierId === 4 ? (
                          <TextField
                            id="packageLength"
                            name="packageLength"
                            variant="outlined"
                            fullWidth
                            error={hasError("packageLength")}
                            helperText={
                              hasError("packageLength")
                                ? formState.errors.packageLength[0]
                                : null
                            }
                            placeholder="Package Length"
                            size="small"
                            type="text"
                            onChange={handleChange("packageLength")}
                            className={classes.profileMargin1}
                            value={formState.values.packageLength || ""}
                          />
                        ) : (
                          ""
                        )}
                      </Grid>

                      <Grid item xs={10} style={{ marginTop: "2px" }}>
                        {carrierId === 4 ? (
                          <TextField
                            id="packageWidth"
                            name="packageWidth"
                            variant="outlined"
                            fullWidth
                            error={hasError("packageWidth")}
                            helperText={
                              hasError("packageWidth")
                                ? formState.errors.packageWidth[0]
                                : null
                            }
                            placeholder="Package Width"
                            size="small"
                            type="text"
                            onChange={handleChange("packageWidth")}
                            className={classes.profileMargin1}
                            value={formState.values.packageWidth || ""}
                          />
                        ) : (
                          ""
                        )}
                      </Grid>

                      <Grid item xs={10} style={{ marginTop: "2px" }}>
                        {carrierId === 4 ? (
                          <TextField
                            id="packageHeight"
                            name="packageHeight"
                            variant="outlined"
                            fullWidth
                            error={hasError("packageHeight")}
                            helperText={
                              hasError("packageHeight")
                                ? formState.errors.packageHeight[0]
                                : null
                            }
                            placeholder="Package Height"
                            size="small"
                            type="text"
                            onChange={handleChange("packageHeight")}
                            className={classes.profileMargin1}
                            value={formState.values.packageHeight || ""}
                          />
                        ) : (
                          ""
                        )}
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
                    onClick={() => {
                      props.handleDeleteCancle(true);
                    }}
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
                    onClick={() => {
                      upsIntegrationCall();
                    }}
                  >
                    Yes
                  </ColorButton>
                </Grid>
              </Grid>
            </Grid>

            {showToast(open, msg, type)}
          </Grid>
        </DialogActions>
      </Dialog>
    </View>
  );
}

ShippingProfile.propTypes = {
  openMoveOnHoldOrder: PropTypes.bool,
  handleDeleteCancle: PropTypes.func,
};
