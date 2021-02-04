import React, { useState, useEffect } from "react";
import {
  fade,
  withStyles,
  makeStyles,
  useTheme,
} from "@material-ui/core/styles";
import { Platform, View, Image, Text, Dimensions } from "react-native";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import PropTypes from "prop-types";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import Stepper from "@material-ui/core/Stepper";
import StepConnector from "@material-ui/core/StepConnector";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import StepLabel from "@material-ui/core/StepLabel";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import * as shiphypeservice from "./ShipService/shiphype_service";
import Typography from "@material-ui/core/Typography";
import popStyle from "./style/popUpStyle";
import popUpStyle from "./style/popUpStyle";
import MaterialTable, { MTableToolbar } from "material-table";

import Link from "@material-ui/core/Link";
import RemoveIcon from "@material-ui/icons/Remove";
import TextField from "@material-ui/core/TextField";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import ProgressBar from "./feedback/ProgressBar";
import { forwardRef } from "react";
import Paper from "@material-ui/core/Paper";
import Toast from "./feedback/Toast";

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: "calc(-52% + 16px)",
    right: "calc(48% + 16px)",
  },
  line: {
    borderColor: "#3f51b5",
    borderTopWidth: 2,
    borderRadius: 1,
  },
})(StepConnector);

const ColorButtonAdd = withStyles((theme) => ({
  root: {
    borderRadius: "3px",
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    //marginTop:'3%',
    height: "100%",
    padding: "3px",
    width: "130px",
    fontSize: "11px",
    fontWeight: "550",
    color: "#fff",
    backgroundColor: "#0168fa",
    //  paddingLeft: '22%',
    //  paddingRight: '22%',
    "&:hover": {
      color: "#fff",
      backgroundColor: "#0168fa",
    },
  },
}))(Button);

const tableIcons = {
  Add: () => (
    <ColorButtonAdd
      size="large"
      variant="contained"
      color="primary"
      startIcon={<AddIcon />}
    >
      Product
    </ColorButtonAdd>
  ),

  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  CloudUpload: forwardRef((props, ref) => (
    <CloudUploadIcon {...props} ref={ref} />
  )),
};

function createData(name, id, type, price) {
  return { name, id, type, price };
}

const rows = [
  createData("Img 01", "LS-00001", "Touch Screen Apple iphone", "$18"),
  createData("Img 02", "LS-00002", "Battery for iphone", "$9"),
];
const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    "& > * + *": {
      marginTop: theme.spacing(3),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(2),
    flexGrow: 1,
    height: "120vh",
    overflow: "auto",
    backgroundColor: "#fff",
  },
  submit: {
    margin: theme.spacing(0, 0, 0),
    borderRadius: 0,
  },
  textArea: {
    marginTop: theme.spacing(0),
    borderRadius: 0,
  },
  profileMargin: {
    marginTop: theme.spacing(0),
    borderRadius: 0,
  },
  paper: {
    border: "2px solid #ced4da",
    height: 80,
    width: 100,
  },
  paper1: {
    border: "2px solid #ced4da",
    height: 80,
    width: 100,
  },
  root: {
    flexGrow: 1,
  },
  avatarsmall: {
    width: theme.spacing(3.5),
    height: theme.spacing(3.5),
  },
  // grid: {
  //   width: 100,
  //   height: 100,
  // },
  table: {
    minWidth: "100%",
    border: "1px solid #CCCCCC",
    marginTop: theme.spacing(1),
  },
  tablehead: {
    border: "1px solid #CCCCCC",
    backgroundColor: "#CCCCCC",
    color: "#000000",
    fontWeight: "bold",
    textAlign: "left",
  },
  tableCell: {
    border: "1px solid #CCCCCC",
    textAlign: "left",
  },

  TableRow: {
    minWidth: "100%",
    textDecoration: "underline",
    // border: '1px solid black',
  },
  button: {
    border: " 1px solid #000000",
    borderRadius: "0px",
    marginTop: theme.spacing(1),
  },
  quantitycss: {
    width: "90%",
    fontSize: "6px",
    cursor: "pointer",
    underline: {
      "&&&:before": {
        borderBottom: "none",
      },
      "&&:after": {
        borderBottom: "none",
      },
    },
  },
}));

const schema = {
  sprintname: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 32,
    },
  },
  sprintgoal: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 300,
    },
  },
};
const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));
const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

/****   For changing the textfield radius  : End *********/
const styles = (theme) => ({
  root: {
    "@media print": {
      margin: 0,
      padding: theme.spacing(2),
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
    width: "90px",
    fontSize: "11px",
    fontWeight: "550",
    color: "#fff",
    backgroundColor: "#0168fa",
    "&:hover": {
      backgroundColor: "#002080",
    },
  },
}))(Button);

/**
 * Description:This function is used for CreateSprint for sprint
 * @param {*} props
 */
export default function CreateSprint(props) {
  const classes = useStyles();
  //const {openCreateSprint}= props;
  const { openorderimportcreate } = props;
  const dataproduct = props.importOrderData;
  const wodata = props.importWorderData;
  const integrationid = props.integrationid;
  const ebayorder = props.importEbayorderData;
  const userid = props.userid;
  const [activeStep, setActiveStep] = React.useState(5);
  const [completed, setCompleted] = React.useState(new Set());
  const [skipped, setSkipped] = React.useState(new Set());
  const [changedOptionid, setchangedOptionid] = React.useState([]);
  const [optionid, setOptionId] = React.useState([]);
  const [editRoleData, setEditRoleData] = React.useState(null);
  //const[dataproduct,setDataProduct]=React.useState([]);
  const [dataOptionLength, setDataOptionLength] = React.useState(4);
  const [optionStatus, setOptionStatus] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [type, setType] = React.useState("");
  const [status, setStatus] = React.useState(false);
  var ids = [];
  var insertOrderDetailsProxy = [];
  const [orderdatapuch, setOrderdatapuch] = React.useState([]);
  const [promotionalPackage, setPromotionalPackage] = React.useState([]);
  const [customePackage, setCustomePackage] = React.useState([]);
  const StyledMTableToolbar = withStyles({
    root: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  })(MTableToolbar);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    console.log("ebaydata", ebayorder);
    fetchPackageForPromotional(userid);
    fetchPackingList1(userid);
  }, []);
  const module = [];
  const optionArray = [];

  const [checkedA, setCheckedA] = React.useState(false);

  /**
   * Description:Custome switch
   */
  const AntSwitch = withStyles((theme) => ({
    root: {
      width: 28,
      height: 16,
      padding: 0,
      display: "flex",
    },
    switchBase: {
      padding: 2,
      color: theme.palette.grey[500],
      "&$checked": {
        transform: "translateX(12px)",
        color: theme.palette.common.white,
        "& + $track": {
          opacity: 1,
          backgroundColor: theme.palette.primary.main,
          borderColor: theme.palette.primary.main,
        },
      },
    },
    thumb: {
      width: 12,
      height: 12,
      boxShadow: "none",
    },
    track: {
      border: `1px solid ${theme.palette.grey[500]}`,
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: theme.palette.common.white,
    },
    checked: {},
  }))(Switch);

  const packageDataPro1 = {};
  customePackage.map((orderCouierOp) => {
    const { packaggingId, packaggingName } = orderCouierOp;
    packageDataPro1[packaggingId] = packaggingName;
  });

  const promotionalDataAdd = {};
  promotionalPackage.map((orderCouierOp) => {
    const { packaggingId, packaggingName } = orderCouierOp;
    promotionalDataAdd[packaggingId] = packaggingName;
  });

  const fetchPackageForPromotional = (userid) => {
    setLoading(true);
    shiphypeservice.fetchCustomePaching(userid, 2).then((response) => {
      console.log("status", response.status);
      if (response.status === true) {
        setLoading(false);
        setPromotionalPackage(response.data);
      }
    });
  };

  const fetchPackingList1 = (userid) => {
    shiphypeservice
      .fetchCustomePaching(userid, 1)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          setCustomePackage(response.data);
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const theme = useTheme();
  const [state, setState] = React.useState({
    columns: [
      {
        title: "Checkbox",

        render: (rowData) => (
          <FormGroup>
            {(() => {
              if (rowData !== undefined) {
                return (
                  <FormControlLabel
                    style={popStyle.checkboxPosition}
                    control={
                      <Checkbox
                        id={rowData.id}
                        checked={(() => {
                          for (let i = 0; i < ids.length; i++) {
                            if (editRoleData !== null) {
                              if (editRoleData.moduleinfo !== 0) {
                                if (rowData.id === parseInt(ids[i])) {
                                  return true;
                                }
                              } else {
                                if (rowData.id === parseInt(ids[i])) {
                                  return true;
                                }
                              }
                            } else {
                              if (rowData.id === parseInt(ids[i])) {
                                return true;
                              }
                            }
                          }
                        })()}
                        onChange={() => {
                          handleChangeCheckbox(rowData);
                        }}
                        color="primary"
                      />
                    }
                    className={classes.radioButtonCss}
                    InputProps={{
                      inputProps: { style: { borderRadius: 0 } },
                      style: { borderRadius: 0 },
                    }}
                  />
                );
              }
            })()}
          </FormGroup>
        ),
      },

      {
        title: "Order",
        field: "name",
        type: "text",
        render: (rowData) => (
          <FormControlLabel
            onClick={() => {
              handleChangeCheckbox(rowData);
            }}
            className={classes.quantitycss}
            control={
              <Typography
                style={{
                  marginLeft: "20px",
                  fontSize: "2px",
                  cursor: "pointer",
                  fontFamily:
                    '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                }}
              >
                <Text
                  style={{
                    fontSize: "11px",
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                    transition: "all 0.25s",
                  }}
                >
                  {rowData.name}
                </Text>
              </Typography>
            }
          />
        ),
      },
      {
        title: "Date",
        field: "created_at",
        type: "date",
      },

      {
        title: "Customer",
        field: "customer",
        type: "text",

        render: (rowData) => (
          <FormControlLabel
            onClick={() => {
              handleChangeCheckbox(rowData);
            }}
            className={classes.quantitycss}
            control={
              <Typography
                style={{
                  marginLeft: "20px",
                  fontSize: "2px",
                  cursor: "pointer",
                  fontFamily:
                    '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                }}
              >
                {(() => {
                  if ("customer" in rowData) {
                    return (
                      <Text
                        style={{
                          fontSize: "11px",
                          fontFamily:
                            '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                          transition: "all 0.25s",
                        }}
                      >
                        {rowData.customer.first_name}
                      </Text>
                    );
                  } else {
                    return (
                      <Text
                        style={{
                          fontSize: "11px",
                          fontFamily:
                            '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                          transition: "all 0.25s",
                        }}
                      >
                        No Customer
                      </Text>
                    );
                  }
                })()}
              </Typography>
            }
          />
        ),
      },
    ],
  });

  const [stateWo, setStateWo] = React.useState({
    columns: [
      {
        title: "Checkbox",

        render: (rowData) => (
          <FormGroup>
            {(() => {
              if (rowData !== undefined) {
                return (
                  <FormControlLabel
                    style={popStyle.checkboxPosition}
                    control={
                      <Checkbox
                        id={rowData.id}
                        checked={(() => {
                          for (let i = 0; i < ids.length; i++) {
                            if (editRoleData !== null) {
                              if (editRoleData.moduleinfo !== 0) {
                                if (rowData.id === parseInt(ids[i])) {
                                  return true;
                                }
                              } else {
                                if (rowData.id === parseInt(ids[i])) {
                                  return true;
                                }
                              }
                            } else {
                              if (rowData.id === parseInt(ids[i])) {
                                return true;
                              }
                            }
                          }
                        })()}
                        onChange={() => {
                          handleChangeCheckbox(rowData);
                        }}
                        color="primary"
                      />
                    }
                    className={classes.radioButtonCss}
                    InputProps={{
                      inputProps: { style: { borderRadius: 0 } },
                      style: { borderRadius: 0 },
                    }}
                  />
                );
              }
            })()}
          </FormGroup>
        ),
      },
      {
        title: "Order ID",
        field: "id",
        type: "text",

        render: (rowData) => (
          <FormControlLabel
            onClick={() => {
              handleChangeCheckbox(rowData);
            }}
            className={classes.quantitycss}
            control={
              <Typography
                style={{
                  marginLeft: "20px",
                  fontSize: "2px",
                  cursor: "pointer",
                  fontFamily:
                    '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                }}
              >
                <Text
                  style={{
                    fontSize: "11px",
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                    transition: "all 0.25s",
                  }}
                >
                  {rowData.id}
                </Text>
              </Typography>
            }
          />
        ),
      },
      {
        title: "Customer ID",
        field: "customer_id",
        type: "text",
        render: (rowData) => (
          <FormControlLabel
            onClick={() => {
              handleChangeCheckbox(rowData);
            }}
            className={classes.quantitycss}
            control={
              <Typography
                style={{
                  marginLeft: "20px",
                  fontSize: "2px",
                  cursor: "pointer",
                  fontFamily:
                    '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                }}
              >
                <Text
                  style={{
                    fontSize: "11px",
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                    transition: "all 0.25s",
                  }}
                >
                  {rowData.customer_id}
                </Text>
              </Typography>
            }
          />
        ),
      },

      {
        title: "Order Status",
        field: "status",
        type: "text",
        render: (rowData) => (
          <FormControlLabel
            onClick={() => {
              handleChangeCheckbox(rowData);
            }}
            className={classes.quantitycss}
            control={
              <Typography
                style={{
                  marginLeft: "20px",
                  fontSize: "2px",
                  cursor: "pointer",
                  fontFamily:
                    '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                }}
              >
                <Text
                  style={{
                    fontSize: "11px",
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                    transition: "all 0.25s",
                  }}
                >
                  {rowData.status}
                </Text>
              </Typography>
            }
          />
        ),
      },
      {
        title: "Date Created",
        field: "date_created",
        type: "text",

        render: (rowData) => (
          <FormControlLabel
            onClick={() => {
              handleChangeCheckbox(rowData);
            }}
            className={classes.quantitycss}
            control={
              <Typography
                style={{
                  marginLeft: "20px",
                  fontSize: "2px",
                  cursor: "pointer",
                  fontFamily:
                    '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                }}
              >
                <Text
                  style={{
                    fontSize: "11px",
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                    transition: "all 0.25s",
                  }}
                >
                  {rowData.date_created}
                </Text>
              </Typography>
            }
          />
        ),
      },
    ],
  });

  const [stateEba, setStateEba] = React.useState({
    columns: [
      {
        title: "Checkbox",

        render: (rowData) => (
          <FormGroup>
            {(() => {
              if (rowData !== undefined) {
                return (
                  <FormControlLabel
                    style={popStyle.checkboxPosition}
                    control={
                      <Checkbox
                        id={rowData.OrderID}
                        checked={(() => {
                          for (let i = 0; i < ids.length; i++) {
                            if (editRoleData !== null) {
                              if (editRoleData.moduleinfo !== 0) {
                                if (
                                  parseInt(
                                    rowData.OrderID.replace(/-/g, "")
                                  ) === parseInt(ids[i])
                                ) {
                                  return true;
                                }
                              } else {
                                if (
                                  parseInt(
                                    rowData.OrderID.replace(/-/g, "")
                                  ) === parseInt(ids[i])
                                ) {
                                  return true;
                                }
                              }
                            } else {
                              if (
                                parseInt(rowData.OrderID.replace(/-/g, "")) ===
                                parseInt(ids[i])
                              ) {
                                return true;
                              }
                            }
                          }
                        })()}
                        onChange={() => {
                          handleChangeCheckbox(rowData);
                        }}
                        color="primary"
                      />
                    }
                    className={classes.radioButtonCss}
                    InputProps={{
                      inputProps: { style: { borderRadius: 0 } },
                      style: { borderRadius: 0 },
                    }}
                  />
                );
              }
            })()}
          </FormGroup>
        ),
      },
      {
        title: "Order ID",
        field: "OrderID",
        type: "text",

        render: (rowData) => (
          <FormControlLabel
            onClick={() => {
              handleChangeCheckbox(rowData);
            }}
            className={classes.quantitycss}
            control={
              <Typography
                style={{
                  marginLeft: "20px",
                  fontSize: "2px",
                  cursor: "pointer",
                  fontFamily:
                    '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                }}
              >
                <Text
                  style={{
                    fontSize: "11px",
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                    transition: "all 0.25s",
                  }}
                >
                  {rowData.OrderID}
                </Text>
              </Typography>
            }
          />
        ),
      },
      {
        title: "Title",
        field: "TransactionArray",
        type: "text",

        render: (rowData) => (
          <FormControlLabel
            onClick={() => {
              handleChangeCheckbox(rowData);
            }}
            className={classes.quantitycss}
            control={
              <Typography
                style={{
                  marginLeft: "20px",
                  fontSize: "2px",
                  cursor: "pointer",
                  fontFamily:
                    '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                }}
              >
                <Text
                  style={{
                    fontSize: "11px",
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                    transition: "all 0.25s",
                  }}
                >
                  {rowData.TransactionArray.Transaction.Item.Title}
                </Text>
              </Typography>
            }
          />
        ),
      },

      {
        title: "Sold Quantity",
        field: "TransactionArray",
        type: "text",

        render: (rowData) => (
          <FormControlLabel
            onClick={() => {
              handleChangeCheckbox(rowData);
            }}
            className={classes.quantitycss}
            control={
              <Typography
                style={{
                  marginLeft: "20px",
                  fontSize: "2px",
                  cursor: "pointer",
                  fontFamily:
                    '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                }}
              >
                <Text
                  style={{
                    fontSize: "11px",
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                    transition: "all 0.25s",
                  }}
                >
                  {rowData.TransactionArray.Transaction.QuantityPurchased}
                </Text>
              </Typography>
            }
          />
        ),
      },
      {
        title: "Customer Name",
        field: "ShippingAddress",
        type: "text",
        render: (rowData) => (
          <FormControlLabel
            onClick={() => {
              handleChangeCheckbox(rowData);
            }}
            className={classes.quantitycss}
            control={
              <Typography
                style={{
                  marginLeft: "20px",
                  fontSize: "2px",
                  cursor: "pointer",
                  fontFamily:
                    '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                }}
              >
                <Text
                  style={{
                    fontSize: "11px",
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                    transition: "all 0.25s",
                  }}
                >
                  {rowData.ShippingAddress.Name}
                </Text>
              </Typography>
            }
          />
        ),
      },

      {
        title: "Order Status",
        field: "OrderStatus",
        type: "text",
        render: (rowData) => (
          <FormControlLabel
            onClick={() => {
              handleChangeCheckbox(rowData);
            }}
            className={classes.quantitycss}
            control={
              <Typography
                style={{
                  marginLeft: "20px",
                  fontSize: "2px",
                  cursor: "pointer",
                  fontFamily:
                    '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                }}
              >
                <Text
                  style={{
                    fontSize: "11px",
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                    transition: "all 0.25s",
                  }}
                >
                  {rowData.OrderStatus}
                </Text>
              </Typography>
            }
          />
        ),
      },
      {
        title: "Date Created",
        field: "CreatedTime",
        type: "date",

        // render: (rowData) => (
        //   <FormControlLabel
        //     onClick={() => {
        //       handleChangeCheckbox(rowData);
        //     }}
        //     className={classes.quantitycss}
        //     control={
        //       <Typography
        //         style={{
        //           marginLeft: "20px",
        //           fontSize: "2px",
        //           cursor: "pointer",
        //           fontFamily:
        //             '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
        //         }}
        //       >
        //         <Text
        //           style={{
        //             fontSize: "11px",
        //             fontFamily:
        //               '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
        //             transition: "all 0.25s",
        //           }}
        //         >
        //           {rowData.CreatedTime}
        //         </Text>
        //       </Typography>
        //     }
        //   />
        // ),
      },
    ],
  });

  var flag = false;
  const handleChangeCheckbox = (data) => {
    if (integrationid === 4) {
      //addNewProduct(data.sku,data.title,true,true,true,'hs-345',parseInt(data.price),'$',parseInt(data.position),packaging,userid,data.product_id)
      console.log("selectidrun");
      console.log("selectid", data);
      console.log("arraylenght", ids.length);

      setCheckedA(false);
      if (ids.length === 0) {
        ids.push(data.id);

        const arrayshop = data.order_status_url;
        const arrayshop1 = arrayshop.split("/");
        console.log("arrayshop", arrayshop1);
        const customer = {
          userId: props.user_id,
          externalcustomer_id: "customer" in data ? data.customer.id : 0,
          firstname: "customer" in data ? data.customer.first_name : "",
          lastname: "customer" in data ? data.customer.last_name : "",
          companyname: "",
          countrycode:
            "customer" in data
              ? data.customer.default_address.country_code
              : "",
          addressline1:
            "customer" in data ? data.customer.default_address.address1 : "",
          addressline2:
            "customer" in data ? data.customer.default_address.address2 : "",
          city: "customer" in data ? data.customer.default_address.city : "",
          state:
            "customer" in data ? data.customer.default_address.province : "",
          zip: "customer" in data ? data.customer.default_address.zip : "",
          country:
            "customer" in data ? data.customer.default_address.country : "",
          phone: "customer" in data ? data.customer.default_address.phone : "",
          email: "customer" in data ? data.customer.email : "",
          customertype: 1,
          shop_id: arrayshop1[3],
        };

        const product = [
          {
            externalproduct_id:
              "line_items" in data ? data.line_items[0].product_id : 0,
            productsku: "line_items" in data ? data.line_items[0].sku : "",
            productname: "line_items" in data ? data.line_items[0].title : "",
            domesticshipping: true,
            internationalshipping: false,
            dangerousgoods: false,
            hscode: "",
            itemvalue: 1,
            itemcurrency: "$",
            itemquantity: 1,
            packaging: 0,
            userid: props.user_id,
            promotionalpackaging: 0,
            torontostock: "",
            losangelesstock: "",
            photo: 0,
            warehouseid: "2",
          },
        ];

        const CustomerName =
          "customer" in data ? data.customer.first_name : "No Customer";
        const CustomerCountry =
          "customer" in data ? data.customer.default_address.country : "";
        const Warehouse = CustomerCountry === "Canada" ? 2 : 2;

        var productIds = [];
        var productquantity = [];
        var productIdsArray = [];
        if (data.line_items instanceof Array) {
          for (let i = 0; i < data.line_items.length; i++) {
            productIds.push(data.line_items[i].sku);
            productquantity.push(data.line_items[i].quantity);
            productIdsArray.push(data.line_items[i].product_id);
          }
        } else {
          productIds.push(data.line_items.sku);
          productquantity.push(data.line_items.quantity);
          productIdsArray.push(data.line_items.product_id);
        }

        insertOrderDetailsProxy.push({
          externalorder_id: data.name,
          externaluniqueid: data.id,
          source: "Shopify",
          ordertype: 1,
          recipientname: CustomerName,
          ordercountry: CustomerCountry,
          tracking: "",
          shippingcourier: 1,
          orderstatus: 1,
          orderdate: data.created_at,
          customertype: 2,
          orderkind: 1,
          shippingpolicy_id: 1,
          user_id: props.user_id,
          option_id: 1,
          dangerousgoods: 1,
          warehouseid: Warehouse,
          customer: customer,
          product: product,
          skus: productIds,
          productIds: productIdsArray,
          productquantity: productquantity,
        });

        // createIntegrationOrder(
        //   data.name,
        //   data.id,
        //   "Shopify",
        //   1,
        //   CustomerName,
        //   CustomerCountry,
        //   "",
        //   1,
        //   1,
        //   data.created_at,
        //   2,
        //   1,
        //   1,
        //   props.user_id,
        //   1,
        //   1,
        //   Warehouse,
        //   customer,
        //   product,
        //   productIds,
        //   productIdsArray,
        //   productquantity,
        //   data
        // );
        console.log("insertOrderDetailsProxy", insertOrderDetailsProxy);
      } else {
        for (let i = 0; i < ids.length; i++) {
          if (data.id !== ids[i]) {
            //ids.push(data);
            flag = true;
          } else {
            flag = false;
            break;
          }
        }
        if (flag === true) {
          ids.push(data.id);

          const arrayshop = data.order_status_url;
          const arrayshop1 = arrayshop.split("/");
          console.log("arrayshop", arrayshop1);
          const customer = {
            userId: props.user_id,
            externalcustomer_id: "customer" in data ? data.customer.id : 0,
            firstname: "customer" in data ? data.customer.first_name : "",
            lastname: "customer" in data ? data.customer.last_name : "",
            companyname: "",
            countrycode:
              "customer" in data
                ? data.customer.default_address.country_code
                : "",
            addressline1:
              "customer" in data ? data.customer.default_address.address1 : "",
            addressline2:
              "customer" in data ? data.customer.default_address.address2 : "",
            city: "customer" in data ? data.customer.default_address.city : "",
            state:
              "customer" in data ? data.customer.default_address.province : "",
            zip: "customer" in data ? data.customer.default_address.zip : "",
            country:
              "customer" in data ? data.customer.default_address.country : "",
            phone:
              "customer" in data ? data.customer.default_address.phone : "",
            email: "customer" in data ? data.customer.email : "",
            customertype: 1,
            shop_id: arrayshop1[3],
          };

          const product = [
            {
              externalproduct_id:
                "line_items" in data ? data.line_items[0].product_id : 0,
              productsku: "line_items" in data ? data.line_items[0].sku : "",
              productname: "line_items" in data ? data.line_items[0].title : "",
              domesticshipping: true,
              internationalshipping: false,
              dangerousgoods: false,
              hscode: "",
              itemvalue: 1,
              itemcurrency: "$",
              itemquantity: 1,
              packaging: 0,
              userid: props.user_id,
              promotionalpackaging: 0,
              torontostock: "",
              losangelesstock: "",
              photo: 0,
              warehouseid: "2",
            },
          ];
          var productIds = [];
          var productquantity = [];
          var productIdsArray = [];
          if (data.line_items instanceof Array) {
            for (let i = 0; i < data.line_items.length; i++) {
              productIds.push(data.line_items[i].sku);
              productquantity.push(data.line_items[i].quantity);
              productIdsArray.push(data.line_items[i].product_id);
            }
          } else {
            productIds.push(data.line_items.sku);
            productquantity.push(data.line_items.quantity);
            productIdsArray.push(data.line_items.product_id);
          }
          const CustomerName =
            "customer" in data ? data.customer.first_name : "No Customer";
          const CustomerCountry =
            "customer" in data ? data.customer.default_address.country : "";

          const Warehouse = CustomerCountry === "Canada" ? 2 : 2;

          insertOrderDetailsProxy.push({
            externalorder_id: data.name,
            externaluniqueid: data.id,
            source: "Shopify",
            ordertype: 1,
            recipientname: CustomerName,
            ordercountry: CustomerCountry,
            tracking: "",
            shippingcourier: 1,
            orderstatus: 1,
            orderdate: data.created_at,
            customertype: 2,
            orderkind: 1,
            shippingpolicy_id: 1,
            user_id: props.user_id,
            option_id: 1,
            dangerousgoods: 1,
            warehouseid: Warehouse,
            customer: customer,
            product: product,
            skus: productIds,
            productIds: productIdsArray,
            productquantity: productquantity,
          });

          console.log("insertOrderDetailsProxy", insertOrderDetailsProxy);
          // createIntegrationOrder(
          //   data.name,
          //   data.id,
          //   "Shopify",
          //   1,
          //   CustomerName,
          //   CustomerCountry,
          //   "",
          //   1,
          //   1,
          //   data.created_at,
          //   2,
          //   1,
          //   1,
          //   props.user_id,
          //   1,
          //   1,
          //   Warehouse,
          //   customer,
          //   product,
          //   productIds,
          //   productIdsArray,
          //   productquantity,
          //   data
          // );
        } else {
          const index = ids.indexOf(data.id);
          if (index > -1) {
            ids.splice(index, 1);
            insertOrderDetailsProxy.splice(index, 1);
            //deleteIntegrationOrder(data.id);

            console.log("insertOrderDetailsProxy", insertOrderDetailsProxy);
          }
        }
      }
      console.log("arraylenghtafter", ids.length);

      var ids3 = [];
      for (let i = 0; i < ids.length; i++) {
        console.log("arrayvalue", ids[i]);
        ids3.push(1);
      }
      const arr = [...insertOrderDetailsProxy];
      setOrderdatapuch(arr);
      //const updatedaray=[...ids];

      //setchangedWarehouseid(updatedaray);

      const updatedaray1 = [...ids3];

      // setshippedQuantity(updatedaray1);

      setState({
        columns: [
          {
            title: "Checkbox",

            render: (rowData) => (
              <FormGroup>
                {(() => {
                  if (rowData !== undefined) {
                    return (
                      <FormControlLabel
                        style={popStyle.checkboxPosition}
                        control={
                          <Checkbox
                            id={rowData.id}
                            checked={(() => {
                              for (let i = 0; i < ids.length; i++) {
                                if (editRoleData !== null) {
                                  if (editRoleData.moduleinfo !== 0) {
                                    if (rowData.id === parseInt(ids[i])) {
                                      return true;
                                    }
                                  } else {
                                    if (rowData.id === parseInt(ids[i])) {
                                      return true;
                                    }
                                  }
                                } else {
                                  if (rowData.id === parseInt(ids[i])) {
                                    return true;
                                  }
                                }
                              }
                            })()}
                            onChange={() => {
                              handleChangeCheckbox(rowData);
                            }}
                            color="primary"
                          />
                        }
                        className={classes.radioButtonCss}
                        InputProps={{
                          inputProps: { style: { borderRadius: 0 } },
                          style: { borderRadius: 0 },
                        }}
                      />
                    );
                  }
                })()}
              </FormGroup>
            ),
          },

          {
            title: "Order",
            field: "name",
            type: "text",
            render: (rowData) => (
              <FormControlLabel
                onClick={() => {
                  handleChangeCheckbox(rowData);
                }}
                className={classes.quantitycss}
                control={
                  <Typography
                    style={{
                      marginLeft: "20px",
                      fontSize: "2px",
                      cursor: "pointer",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: "11px",
                        fontFamily:
                          '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                        transition: "all 0.25s",
                      }}
                    >
                      {rowData.name}
                    </Text>
                  </Typography>
                }
              />
            ),
          },
          {
            title: "Date",
            field: "created_at",
            type: "date",
          },

          {
            title: "Customer",
            field: "customer",
            type: "text",

            render: (rowData) => (
              <FormControlLabel
                onClick={() => {
                  handleChangeCheckbox(rowData);
                }}
                className={classes.quantitycss}
                control={
                  <Typography
                    style={{
                      marginLeft: "20px",
                      fontSize: "2px",
                      cursor: "pointer",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                    }}
                  >
                    {(() => {
                      if ("customer" in rowData) {
                        return (
                          <Text
                            style={{
                              fontSize: "11px",
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              transition: "all 0.25s",
                            }}
                          >
                            {rowData.customer.first_name}
                          </Text>
                        );
                      } else {
                        return (
                          <Text
                            style={{
                              fontSize: "11px",
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              transition: "all 0.25s",
                            }}
                          >
                            No Customer
                          </Text>
                        );
                      }
                    })()}
                  </Typography>
                }
              />
            ),
          },
        ],
      });
    } else if (integrationid === 3) {
      //addNewProduct(data.sku,data.title,true,true,true,'hs-345',parseInt(data.price),'$',parseInt(data.position),packaging,userid,data.product_id)
      console.log("selectidrun");
      console.log("selectid", data);
      console.log("arraylenght", ids.length);
      setCheckedA(false);
      if (ids.length === 0) {
        ids.push(data.id);
        addNewOrder(
          data.id,
          "Default source",
          1,
          data.date_created,
          data.date_modified,
          userid,
          data.customer_id,
          1,
          1,
          1,
          data.line_items
        );
      } else {
        for (let i = 0; i < ids.length; i++) {
          if (data.id !== ids[i]) {
            //ids.push(data);
            flag = true;
          } else {
            flag = false;
            break;
          }
        }
        if (flag === true) {
          ids.push(data.id);
          addNewOrder(
            data.id,
            "Default source",
            1,
            data.date_created,
            data.date_modified,
            userid,
            data.customer_id,
            1,
            1,
            1,
            data.line_items
          );
        } else {
          const index = ids.indexOf(data.id);
          if (index > -1) {
            ids.splice(index, 1);
            deleteIntegrationOrder(data.id);
          }
        }
      }
      console.log("arraylenghtafter", ids.length);

      var ids3 = [];
      for (let i = 0; i < ids.length; i++) {
        console.log("arrayvalue", ids[i]);
        ids3.push(1);
      }

      //const updatedaray=[...ids];

      //setchangedWarehouseid(updatedaray);

      const updatedaray1 = [...ids3];

      // setshippedQuantity(updatedaray1);

      setStateWo({
        columns: [
          {
            title: "Checkbox",
            render: (rowData) => (
              <FormGroup>
                {(() => {
                  if (rowData !== undefined) {
                    return (
                      <FormControlLabel
                        style={popStyle.checkboxPosition}
                        control={
                          <Checkbox
                            id={rowData.id}
                            checked={(() => {
                              for (let i = 0; i < ids.length; i++) {
                                if (editRoleData !== null) {
                                  if (editRoleData.moduleinfo !== 0) {
                                    if (rowData.id === parseInt(ids[i])) {
                                      return true;
                                    }
                                  } else {
                                    if (rowData.id === parseInt(ids[i])) {
                                      return true;
                                    }
                                  }
                                } else {
                                  if (rowData.id === parseInt(ids[i])) {
                                    return true;
                                  }
                                }
                              }
                            })()}
                            onChange={() => {
                              handleChangeCheckbox(rowData);
                            }}
                            color="primary"
                          />
                        }
                        className={classes.radioButtonCss}
                        InputProps={{
                          inputProps: { style: { borderRadius: 0 } },
                          style: { borderRadius: 0 },
                        }}
                      />
                    );
                  }
                })()}
              </FormGroup>
            ),
          },
          {
            title: "Order ID",
            field: "id",
            type: "text",

            render: (rowData) => (
              <FormControlLabel
                onClick={() => {
                  handleChangeCheckbox(rowData);
                }}
                className={classes.quantitycss}
                control={
                  <Typography
                    style={{
                      marginLeft: "20px",
                      fontSize: "2px",
                      cursor: "pointer",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: "11px",
                        fontFamily:
                          '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                        transition: "all 0.25s",
                      }}
                    >
                      {rowData.id}
                    </Text>
                  </Typography>
                }
              />
            ),
          },
          {
            title: "Customer ID",
            field: "customer_id",
            type: "text",
            render: (rowData) => (
              <FormControlLabel
                onClick={() => {
                  handleChangeCheckbox(rowData);
                }}
                className={classes.quantitycss}
                control={
                  <Typography
                    style={{
                      marginLeft: "20px",
                      fontSize: "2px",
                      cursor: "pointer",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: "11px",
                        fontFamily:
                          '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                        transition: "all 0.25s",
                      }}
                    >
                      {rowData.customer_id}
                    </Text>
                  </Typography>
                }
              />
            ),
          },

          {
            title: "Order Status",
            field: "status",
            type: "text",
            render: (rowData) => (
              <FormControlLabel
                onClick={() => {
                  handleChangeCheckbox(rowData);
                }}
                className={classes.quantitycss}
                control={
                  <Typography
                    style={{
                      marginLeft: "20px",
                      fontSize: "2px",
                      cursor: "pointer",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: "11px",
                        fontFamily:
                          '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                        transition: "all 0.25s",
                      }}
                    >
                      {rowData.status}
                    </Text>
                  </Typography>
                }
              />
            ),
          },
          {
            title: "Date Created",
            field: "date_created",
            type: "text",

            render: (rowData) => (
              <FormControlLabel
                onClick={() => {
                  handleChangeCheckbox(rowData);
                }}
                className={classes.quantitycss}
                control={
                  <Typography
                    style={{
                      marginLeft: "20px",
                      fontSize: "2px",
                      cursor: "pointer",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: "11px",
                        fontFamily:
                          '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                        transition: "all 0.25s",
                      }}
                    >
                      {rowData.date_created}
                    </Text>
                  </Typography>
                }
              />
            ),
          },
        ],
      });
    } else if (integrationid === 1) {
      //addNewProduct(data.sku,data.title,true,true,true,'hs-345',parseInt(data.price),'$',parseInt(data.position),packaging,userid,data.product_id)
      console.log("selectidrun");
      console.log("selectid", data);
      console.log("arraylenght", ids.length);
      console.log("selectid", data);
      setCheckedA(false);
      if (ids.length === 0) {
        ids.push(parseInt(data.OrderID.replace(/-/g, "")));
        var productquantity = [];
        //productIds.push(data.TransactionArray.Transaction.Item.ItemID);
        productquantity.push(
          data.TransactionArray.Transaction.QuantityPurchased
        );
        const customer = {
          userId: props.user_id,
          externalcustomer_id: parseInt(data.ShippingAddress.AddressID),
          firstname: data.ShippingAddress.Name,
          lastname: "",
          companyname: "",
          countrycode: data.ShippingAddress.Country,
          addressline1: data.ShippingAddress.Street1,
          addressline2: data.ShippingAddress.Street2,
          city: data.ShippingAddress.CityName,
          state: data.ShippingAddress.StateOrProvince,
          zip: data.ShippingAddress.PostalCode,
          country: data.ShippingAddress.CountryName,
          phone: data.ShippingAddress.Phone,
          email: "",
          customertype: 1,
        };
        const product = [];
        // const product=[
        //   {
        //       "externalproduct_id": parseInt(data.TransactionArray.Transaction.Item.ItemID),
        //       "productsku": data.TransactionArray.Transaction.Item.SKU,
        //       "productname": data.TransactionArray.Transaction.Item.Title,
        //       "domesticshipping": true,
        //       "internationalshipping": false,
        //       "dangerousgoods": false,
        //       "hscode": "",
        //       "itemvalue": 1,
        //       "itemcurrency": "$",
        //       "itemquantity": parseInt(data.TransactionArray.Transaction.QuantityPurchased),
        //       "packaging": 0,
        //       "userid": props.user_id,
        //       "promotionalpackaging": 0,
        //       "torontostock": "",
        //       "losangelesstock": "",
        //       "photo": 0,
        //       "warehouseid": "2"
        //   }
        // ]
        var productIds = [];
        if (data.TransactionArray.Transaction.Item instanceof Array) {
          for (
            let i = 0;
            i < data.TransactionArray.Transaction.Item.length;
            i++
          ) {
            productIds.push(data.TransactionArray.Transaction.Item[i].SKU);
          }
        } else {
          productIds.push(data.TransactionArray.Transaction.Item.SKU);
        }
        const Warehouse = data.ShippingAddress.CountryName === "Canada" ? 2 : 2;
        createIntegrationOrder(
          parseInt(data.OrderID.replace(/-/g, "")),
          0,
          "eBay",
          1,
          data.ShippingAddress.Name,
          data.ShippingAddress.CountryName,
          "",
          1,
          1,
          data.CreatedTime,
          2,
          1,
          1,
          props.user_id,
          1,
          1,
          Warehouse,
          customer,
          product,
          productIds,
          productIds,
          productIds,
          data
        );
        // addNewOrder(
        //   data.id,
        //   "Default source",
        //   1,
        //   data.date_created,
        //   data.date_modified,
        //   userid,
        //   data.customer_id,
        //   1,
        //   1,
        //   1,
        //   data.line_items
        // );
      } else {
        for (let i = 0; i < ids.length; i++) {
          if (parseInt(data.OrderID.replace(/-/g, "")) !== ids[i]) {
            //ids.push(data);
            flag = true;
          } else {
            flag = false;
            break;
          }
        }
        if (flag === true) {
          ids.push(parseInt(data.OrderID.replace(/-/g, "")));
          //var productIds=[];
          var productquantity = [];
          //productIds.push(data.TransactionArray.Transaction.Item.ItemID);
          productquantity.push(
            data.TransactionArray.Transaction.QuantityPurchased
          );
          const customer = {
            userId: props.user_id,
            externalcustomer_id: data.ShippingAddress.AddressID,
            firstname: data.ShippingAddress.Name,
            lastname: "",
            companyname: "",
            countrycode: data.ShippingAddress.Country,
            addressline1: data.ShippingAddress.Street1,
            addressline2: data.ShippingAddress.Street2,
            city: data.ShippingAddress.CityName,
            state: data.ShippingAddress.StateOrProvince,
            zip: data.ShippingAddress.PostalCode,
            country: data.ShippingAddress.CountryName,
            phone: data.ShippingAddress.Phone,
            email: "",
            customertype: 1,
          };
          const product = [];
          // const product=[
          //   {
          //       "externalproduct_id": parseInt(data.TransactionArray.Transaction.Item.ItemID),
          //       "productsku": data.TransactionArray.Transaction.Item.SKU,
          //       "productname": data.TransactionArray.Transaction.Item.Title,
          //       "domesticshipping": true,
          //       "internationalshipping": false,
          //       "dangerousgoods": false,
          //       "hscode": "",
          //       "itemvalue": 1,
          //       "itemcurrency": "$",
          //       "itemquantity": parseInt(data.TransactionArray.Transaction.QuantityPurchased),
          //       "packaging": 0,
          //       "userid": props.user_id,
          //       "promotionalpackaging": 0,
          //       "torontostock": "",
          //       "losangelesstock": "",
          //       "photo": 0,
          //       "warehouseid": "2"
          //   }
          // ]

          var productIds = [];
          if (data.TransactionArray.Transaction.Item instanceof Array) {
            for (
              let i = 0;
              i < data.TransactionArray.Transaction.Item.length;
              i++
            ) {
              productIds.push(data.TransactionArray.Transaction.Item[i].SKU);
            }
          } else {
            productIds.push(data.TransactionArray.Transaction.Item.SKU);
          }
          const Warehouse =
            data.ShippingAddress.CountryName === "Canada" ? 2 : 2;
          createIntegrationOrder(
            parseInt(data.OrderID.replace(/-/g, "")),
            0,
            "eBay",
            1,
            data.ShippingAddress.Name,
            data.ShippingAddress.CountryName,
            "",
            1,
            1,
            data.CreatedTime,
            2,
            1,
            1,
            props.user_id,
            1,
            1,
            Warehouse,
            customer,
            product,
            productIds,
            productIds,
            productIds,
            data
          );
          // addNewOrder(
          //   data.id,
          //   "Default source",
          //   1,
          //   data.date_created,
          //   data.date_modified,
          //   userid,
          //   data.customer_id,
          //   1,
          //   1,
          //   1,
          //   data.line_items
          // );
        } else {
          const index = ids.indexOf(parseInt(data.OrderID.replace(/-/g, "")));
          if (index > -1) {
            ids.splice(index, 1);
            //deleteIntegrationOrder(parseInt(data.OrderID.replace(/-/g, "")));
          }
        }
      }
      console.log("arraylenghtafter", ids.length);

      var ids3 = [];
      for (let i = 0; i < ids.length; i++) {
        console.log("arrayvalue", ids[i]);
        ids3.push(1);
      }

      //const updatedaray=[...ids];

      //setchangedWarehouseid(updatedaray);

      const updatedaray1 = [...ids3];

      // setshippedQuantity(updatedaray1);

      setStateEba({
        columns: [
          {
            title: "Checkbox",

            render: (rowData) => (
              <FormGroup>
                {(() => {
                  if (rowData !== undefined) {
                    return (
                      <FormControlLabel
                        style={popStyle.checkboxPosition}
                        control={
                          <Checkbox
                            id={rowData.OrderID}
                            checked={(() => {
                              for (let i = 0; i < ids.length; i++) {
                                if (editRoleData !== null) {
                                  if (editRoleData.moduleinfo !== 0) {
                                    if (
                                      parseInt(
                                        rowData.OrderID.replace(/-/g, "")
                                      ) === parseInt(ids[i])
                                    ) {
                                      return true;
                                    }
                                  } else {
                                    if (
                                      parseInt(
                                        rowData.OrderID.replace(/-/g, "")
                                      ) === parseInt(ids[i])
                                    ) {
                                      return true;
                                    }
                                  }
                                } else {
                                  if (
                                    parseInt(
                                      rowData.OrderID.replace(/-/g, "")
                                    ) === parseInt(ids[i])
                                  ) {
                                    return true;
                                  }
                                }
                              }
                            })()}
                            onChange={() => {
                              handleChangeCheckbox(rowData);
                            }}
                            color="primary"
                          />
                        }
                        className={classes.radioButtonCss}
                        InputProps={{
                          inputProps: { style: { borderRadius: 0 } },
                          style: { borderRadius: 0 },
                        }}
                      />
                    );
                  }
                })()}
              </FormGroup>
            ),
          },
          {
            title: "Order ID",
            field: "OrderID",
            type: "text",

            render: (rowData) => (
              <FormControlLabel
                onClick={() => {
                  handleChangeCheckbox(rowData);
                }}
                className={classes.quantitycss}
                control={
                  <Typography
                    style={{
                      marginLeft: "20px",
                      fontSize: "2px",
                      cursor: "pointer",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: "11px",
                        fontFamily:
                          '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                        transition: "all 0.25s",
                      }}
                    >
                      {rowData.OrderID}
                    </Text>
                  </Typography>
                }
              />
            ),
          },
          {
            title: "Title",
            field: "TransactionArray",
            type: "text",

            render: (rowData) => (
              <FormControlLabel
                onClick={() => {
                  handleChangeCheckbox(rowData);
                }}
                className={classes.quantitycss}
                control={
                  <Typography
                    style={{
                      marginLeft: "20px",
                      fontSize: "2px",
                      cursor: "pointer",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: "11px",
                        fontFamily:
                          '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                        transition: "all 0.25s",
                      }}
                    >
                      {rowData.TransactionArray.Transaction.Item.Title}
                    </Text>
                  </Typography>
                }
              />
            ),
          },

          {
            title: "Sold Quantity",
            field: "TransactionArray",
            type: "text",

            render: (rowData) => (
              <FormControlLabel
                onClick={() => {
                  handleChangeCheckbox(rowData);
                }}
                className={classes.quantitycss}
                control={
                  <Typography
                    style={{
                      marginLeft: "20px",
                      fontSize: "2px",
                      cursor: "pointer",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: "11px",
                        fontFamily:
                          '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                        transition: "all 0.25s",
                      }}
                    >
                      {rowData.TransactionArray.Transaction.QuantityPurchased}
                    </Text>
                  </Typography>
                }
              />
            ),
          },
          {
            title: "Customer Name",
            field: "ShippingAddress",
            type: "text",
            render: (rowData) => (
              <FormControlLabel
                onClick={() => {
                  handleChangeCheckbox(rowData);
                }}
                className={classes.quantitycss}
                control={
                  <Typography
                    style={{
                      marginLeft: "20px",
                      fontSize: "2px",
                      cursor: "pointer",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: "11px",
                        fontFamily:
                          '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                        transition: "all 0.25s",
                      }}
                    >
                      {rowData.ShippingAddress.Name}
                    </Text>
                  </Typography>
                }
              />
            ),
          },

          {
            title: "Order Status",
            field: "OrderStatus",
            type: "text",
            render: (rowData) => (
              <FormControlLabel
                onClick={() => {
                  handleChangeCheckbox(rowData);
                }}
                className={classes.quantitycss}
                control={
                  <Typography
                    style={{
                      marginLeft: "20px",
                      fontSize: "2px",
                      cursor: "pointer",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: "11px",
                        fontFamily:
                          '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                        transition: "all 0.25s",
                      }}
                    >
                      {rowData.OrderStatus}
                    </Text>
                  </Typography>
                }
              />
            ),
          },
          {
            title: "Date Created",
            field: "CreatedTime",
            type: "date",

            // render: (rowData) => (
            //   <FormControlLabel
            //     onClick={() => {
            //       handleChangeCheckbox(rowData);
            //     }}
            //     className={classes.quantitycss}
            //     control={
            //       <Typography
            //         style={{
            //           marginLeft: "20px",
            //           fontSize: "2px",
            //           cursor: "pointer",
            //           fontFamily:
            //             '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            //         }}
            //       >
            //         <Text
            //           style={{
            //             fontSize: "11px",
            //             fontFamily:
            //               '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            //             transition: "all 0.25s",
            //           }}
            //         >
            //           {rowData.CreatedTime}
            //         </Text>
            //       </Typography>
            //     }
            //   />
            // ),
          },
        ],
      });
    }
  };

  const bulkOrder = () => {
    const newarra = [...orderdatapuch];
    setLoading(true);
    shiphypeservice
      .addBulkOrder(newarra)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setOpen(true);
          setType("warning");
          let m = "";
          for (let i = 0; i < response.data.length; i++) {
            m = m + "" + response.data[i];
          }
          setMsg(m);
          setStatus(response.status);
          setLoading(false);
          //props.handleNextPage("02");
          // handleChangeCheckbox(data);
        } else {
          setOpen(true);
          setType("error");
          setMsg(response.message);
          setStatus(response.status);
          setLoading(false);
          // handleChangeCheckbox(data);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
        props.handleNextPage("02");
      });
  };

  const createIntegrationOrder = (
    externalorder_id,
    externaluniqueid,
    source,
    ordertype,
    recipientname,
    ordercountry,
    tracking,
    shippingcourier,
    orderstatus,
    orderdate,
    customertype,
    orderkind,
    shippingpolicy_id,
    user_id,
    option_id,
    dangerousgoods,
    warehouseid,
    customer,
    product,
    skus,
    productIds,
    productquantity,
    data
  ) => {
    setLoading(true);
    shiphypeservice
      .createOrderIntegration(
        externalorder_id,
        externaluniqueid,
        source,
        ordertype,
        recipientname,
        ordercountry,
        tracking,
        shippingcourier,
        orderstatus,
        orderdate,
        customertype,
        orderkind,
        shippingpolicy_id,
        user_id,
        option_id,
        dangerousgoods,
        warehouseid,
        customer,
        product,
        skus,
        productIds,
        productquantity
      )
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setOpen(true);
          setType("warning");
          setMsg(response.message);
          setStatus(response.status);
          setLoading(false);
          handleChangeCheckbox(data);
        } else {
          setOpen(true);
          setType("error");
          setMsg(response.message);
          setStatus(response.status);
          setLoading(false);
          handleChangeCheckbox(data);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const addNewOrder = (
    externalorder_id,
    source,
    orderstatus,
    orderdate,
    shipdate,
    user_id,
    customer_id,
    shippingcourier,
    ordertype,
    customertype,
    productIds1
  ) => {
    var productIds = [];
    for (let i = 0; i < productIds1.length; i++) {
      productIds.push(productIds1[i].id);
    }
    setLoading(true);
    shiphypeservice
      .addImportOrder(
        externalorder_id,
        source,
        orderstatus,
        orderdate,
        shipdate,
        user_id,
        customer_id,
        shippingcourier,
        ordertype,
        customertype,
        productIds
      )
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setOpen(true);
          setType("success");
          setMsg(response.message);
          setStatus(response.status);
          setLoading(false);
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

  const deleteIntegrationOrder = (externalorder_id) => {
    setLoading(true);
    shiphypeservice
      .deleteIntegrationOrder(externalorder_id)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setOpen(true);
          setType("success");
          setMsg(response.message);
          setStatus(response.status);
          setLoading(false);
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

  const showToast = (open, msg, type) => {
    return (
      <Toast open={open} handleClose={handleClose} type={type} msg={msg} />
    );
  };

  const handleClose = () => {
    setOpen(false);
    props.handleNextPage("02");
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const [formState, setFormState] = React.useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });

  /**
   * Description:To do close poup after successfully create sprint and on click cancel button
   * @param {*} issprintCreate
   */
  const handleClose1 = (isSprintCreate) => {
    props.handleCancle(isSprintCreate);
  };
  /**
   * Description:To do close poup after successfully create sprint and on click cancel button
   * @param {*} issprintCreate
   */
  const handleNextPage = (isSprintCreate, initPage) => {
    props.handleNextPage(isSprintCreate, initPage);
  };
  /**
   * Description:To do call function on back button
   * @param {*} isSprintCreate
   */
  const handlePreviousPage = (isSprintCreate) => {
    props.handlePreviousPage(isSprintCreate);
    //props.handleNext(isSprintCreate);
  };
  // /**
  //            * Description:This function call on type character inside input text
  //            * @param {} prop
  //            */
  //           const handleChange = (event) => {
  //             setState({ ...state, [event.target.name]: event.target.checked });
  //           };

  /**
   * Description:To do call userlist component
   */
  const addDeleteRowProduct = (row, event) => {
    if (event.target.checked === true) {
      /**
       * For Edit Check the checkbox ids
       */
      if (optionStatus !== false) {
        const checkId = parseInt(event.target.id);

        setOptionId([...optionid[0], checkId]);
        setOptionStatus(false);
      } else {
        const checkId = parseInt(event.target.id);
        setOptionId([...optionid, checkId]);
      }
    } else {
      /**
       * For Edit Check the checkbox ids
       */

      if (optionStatus !== false) {
        const moduleidaccess = [...optionid[0]];
        // const index = moduleidaccess.indexOf(event.target.id);
        const checkId = parseInt(event.target.id);
        const filteredItems = moduleidaccess.filter((item) => item !== checkId);
        setOptionId(filteredItems);
        setOptionStatus(false);
      } else {
        const moduleidaccess = [...optionid];
        const checkId = parseInt(event.target.id);
        // const index = moduleidaccess.indexOf(event.target.id);
        const filteredItems = moduleidaccess.filter((item) => item !== checkId);
        setOptionId(filteredItems);
      }
    }
  };
  const handleStepClick = (index) => {
    console.log("indexprint", index);

    if (index === 0) {
      props.handleStepPage(1);
    } else if (index === 1) {
      props.handleStepPage(2);
    } else if (index === 2) {
      props.handleStepPage(3);
    } else if (index === 3) {
      props.handleStepPage(4);
    } else if (index === 4) {
      props.handleStepPage(5);
    } else if (index === 5) {
      props.handleStepPage(6);
    }
  };
  let screenWidth = Dimensions.get("window").width;
  return (
    <View className={classes.content}>
      <View className={classes.appBarSpacer} />

      <View>
        <Grid item container lg={12}>
          <Grid item lg={5} style={popUpStyle.breadCrumSidePadding}>
            <Link
              onClick={() => {
                props.handleDashboard("01");
              }}
            >
              <Text style={popUpStyle.breadCrundCss1}>DASHBOARD /</Text>
            </Link>{" "}
            <Text style={popUpStyle.breadCrundCss}>
              ORDERS / Import Order /{" "}
            </Text>
            <Text style={popUpStyle.breadCrundCss2}>Select Order</Text>
          </Grid>
          <Grid item lg={2}></Grid>
        </Grid>
      </View>
      <View>
        <Grid container spacing={1}>
          <Grid item xs={12} md={8} lg={8}>
            <View>
              <Text style={{ color: "red" }}>
                Make sure your product sku exists in ShipHype system before you
                import the orders.
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ color: "red" }}>If not,</Text>
                <Link
                  onClick={() => {
                    //props.handleNextPage("05");
                    props.handleDashboard2(
                      "AddProductManually",
                      packageDataPro1,
                      promotionalDataAdd
                    );
                  }}
                >
                  <Text
                    style={{
                      color: "#0000FF",
                      cursor: "pointer",
                      marginHorizontal: "2px",
                    }}
                  >
                    Click Here
                  </Text>
                </Link>
                <Text style={{ color: "red" }}>to add your Product sku.</Text>
              </View>
            </View>
          </Grid>

          <Grid
            item
            xs={12}
            md={4}
            lg={4}
            //style={{marginRight:'70px'}}
          >
            <Grid container item justify="flex-end">
              <Grid>
                <ColorButton
                  size="large"
                  variant="contained"
                  color="primary"
                  className={classes.profileMargin}
                  onClick={() => {
                    props.handleNextPage("importOrderShopify");
                  }}
                >
                  Back
                </ColorButton>
              </Grid>
              &nbsp;
              <Grid>
                <ColorButton
                  size="large"
                  variant="contained"
                  color="primary"
                  className={classes.profileMargin}
                  onClick={() => {
                    bulkOrder();
                  }}
                >
                  Next
                </ColorButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </View>

      <Grid justify="center">
        <ProgressBar loading={loading} />
      </Grid>
      <form className={classes.form}>
        <Grid container spacing={2}>
          {showToast(open, msg, type)}
          <Grid item xs={12} justify="flex-start">
            {(() => {
              if (parseInt(integrationid) === 4) {
                return (
                  <MaterialTable
                    style={{ padding: "0px" }}
                    columns={state.columns}
                    data={dataproduct}
                    title={
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
                        Select which orders you would like to Import
                      </Text>
                    }
                    icons={tableIcons}
                    components={{
                      Container: (props) => <Paper {...props} elevation={0} />,
                      Toolbar: (props) => <StyledMTableToolbar {...props} />,
                    }}
                    localization={{
                      toolbar: {
                        searchPlaceholder: "Search Order",
                      },
                      header: {
                        actions: "ACTION",
                      },
                    }}
                    // onRowClick={(event, rowData) => {
                    //   handleChangeCheckbox(rowData.customproductId);
                    // }}

                    options={{
                      paging: false,
                      showTitle: true,
                      maxBodyHeight: "60vh",
                      doubleHorizontalScroll: true,

                      headerStyle: { position: "sticky", top: 0 },
                      //pageSize:5,
                      //pageSizeOptions:[6, 12, 18, 20, 30, 40, 50, 60, 70, 80, 90, 100],
                      addRowPosition: "first",
                      actionsColumnIndex: -1,
                      exportFileName: "Product Table",
                      headerStyle: {
                        backgroundColor: "#cccccc",
                        color: "#000",

                        width: 26,
                        whiteSpace: "nowrap",
                        textAlign: "left",
                        flexDirection: "row",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontSize: "12px",
                        paddingLeft: 5,
                        paddingTop: 8,
                        paddingBottom: 8,
                        paddingRight: 0,
                        //     backgroundColor: theme.palette.primary.table,
                        fontWeight: "normal",
                        //color: theme.palette.primary.main,
                      },
                      cellStyle: {
                        backgroundColor: "#fff",
                        color: "#000",
                        border: "1px solid #cccccc",

                        width: 26,
                        whiteSpace: "nowrap",
                        textAlign: "left",
                        flexDirection: "row",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontSize: "11px",
                        paddingLeft: 5,
                        paddingTop: 0,
                        paddingBottom: 0,
                        paddingRight: 0,
                      },
                      rowStyle: {
                        backgroundColor: "#fff",
                        color: "#000",
                        border: "1px solid #cccccc",

                        width: 26,
                        whiteSpace: "nowrap",
                        textAlign: "left",
                        flexDirection: "row",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        paddingLeft: 0,
                        paddingTop: 0,
                        paddingBottom: 0,
                        paddingRight: 0,
                      },
                      selection: false,
                      showSelectAllCheckbox: false,
                      showTextRowsSelected: false,
                      search: true,
                      exportButton: false,

                      selectionProps: (rowData) => ({}),
                    }}
                    onSelectionChange={(rows) => {
                      //handleChangeCheckbox(rows);
                    }}
                  />
                );
              }
            })()}

            {(() => {
              if (parseInt(integrationid) === 3) {
                return (
                  <MaterialTable
                    style={{ padding: "0px" }}
                    columns={stateWo.columns}
                    data={wodata}
                    icons={tableIcons}
                    components={{
                      Container: (props) => <Paper {...props} elevation={0} />,
                      Toolbar: (props) => <StyledMTableToolbar {...props} />,
                    }}
                    localization={{
                      toolbar: {
                        searchPlaceholder: "Search Order",
                      },
                    }}
                    // onRowClick={(event, rowData) => {
                    //   handleChangeCheckbox(rowData.customproductId);
                    // }}
                    options={{
                      paging: false,
                      showTitle: false,
                      maxBodyHeight: "60vh",
                      headerStyle: { position: "sticky", top: 0 },
                      //pageSize:5,
                      //pageSizeOptions:[6, 12, 18, 20, 30, 40, 50, 60, 70, 80, 90, 100],
                      addRowPosition: "first",
                      actionsColumnIndex: -1,
                      exportFileName: "Product Table",
                      headerStyle: {
                        backgroundColor: "#cccccc",
                        color: "#000",

                        width: 26,
                        whiteSpace: "nowrap",
                        textAlign: "left",
                        flexDirection: "row",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontSize: "12px",
                        paddingLeft: 5,
                        paddingTop: 8,
                        paddingBottom: 8,
                        paddingRight: 0,
                        //     backgroundColor: theme.palette.primary.table,
                        fontWeight: "normal",
                        //color: theme.palette.primary.main,
                      },
                      cellStyle: {
                        backgroundColor: "#fff",
                        color: "#000",
                        border: "1px solid #cccccc",

                        width: 26,
                        whiteSpace: "nowrap",
                        textAlign: "left",
                        flexDirection: "row",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontSize: "11px",
                        paddingLeft: 5,
                        paddingTop: 0,
                        paddingBottom: 0,
                        paddingRight: 0,
                      },
                      rowStyle: {
                        backgroundColor: "#fff",
                        color: "#000",
                        border: "1px solid #cccccc",

                        width: 26,
                        whiteSpace: "nowrap",
                        textAlign: "left",
                        flexDirection: "row",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        paddingLeft: 0,
                        paddingTop: 0,
                        paddingBottom: 0,
                        paddingRight: 0,
                      },
                      selection: false,
                      showSelectAllCheckbox: false,
                      showTextRowsSelected: false,
                      search: true,
                      exportButton: false,

                      selectionProps: (rowData) => ({}),
                    }}
                    onSelectionChange={(rows) => {
                      //handleChangeCheckbox(rows);
                    }}
                  />
                );
              }
            })()}
            {(() => {
              if (parseInt(integrationid) === 1) {
                return (
                  <MaterialTable
                    style={{ padding: "0px" }}
                    columns={stateEba.columns}
                    data={ebayorder}
                    icons={tableIcons}
                    components={{
                      Container: (props) => <Paper {...props} elevation={0} />,
                      Toolbar: (props) => <StyledMTableToolbar {...props} />,
                    }}
                    localization={{
                      toolbar: {
                        searchPlaceholder: "Search Order",
                      },
                    }}
                    // onRowClick={(event, rowData) => {
                    //   handleChangeCheckbox(rowData.customproductId);
                    // }}
                    options={{
                      paging: true,
                      showTitle: false,
                      maxBodyHeight: "60vh",
                      headerStyle: { position: "sticky", top: 0 },
                      pageSize: 10,
                      pageSizeOptions: [10, 20, 30, 40, 50, 100],
                      addRowPosition: "first",
                      actionsColumnIndex: -1,
                      exportFileName: "Product Table",
                      headerStyle: {
                        backgroundColor: "#cccccc",
                        color: "#000",

                        width: 26,
                        whiteSpace: "nowrap",
                        textAlign: "left",
                        flexDirection: "row",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontSize: "12px",
                        paddingLeft: 5,
                        paddingTop: 8,
                        paddingBottom: 8,
                        paddingRight: 0,
                        //     backgroundColor: theme.palette.primary.table,
                        fontWeight: "normal",
                        //color: theme.palette.primary.main,
                      },
                      cellStyle: {
                        backgroundColor: "#fff",
                        color: "#000",
                        border: "1px solid #cccccc",

                        width: 26,
                        whiteSpace: "nowrap",
                        textAlign: "left",
                        flexDirection: "row",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontSize: "11px",
                        paddingLeft: 5,
                        paddingTop: 0,
                        paddingBottom: 0,
                        paddingRight: 0,
                      },
                      rowStyle: {
                        backgroundColor: "#fff",
                        color: "#000",
                        border: "1px solid #cccccc",

                        width: 26,
                        whiteSpace: "nowrap",
                        textAlign: "left",
                        flexDirection: "row",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        paddingLeft: 0,
                        paddingTop: 0,
                        paddingBottom: 0,
                        paddingRight: 0,
                      },
                      selection: false,
                      showSelectAllCheckbox: false,
                      showTextRowsSelected: false,
                      search: true,
                      exportButton: false,

                      selectionProps: (rowData) => ({}),
                    }}
                    onSelectionChange={(rows) => {
                      //handleChangeCheckbox(rows);
                    }}
                  />
                );
              }
            })()}
          </Grid>
        </Grid>
      </form>

      <Grid
        justify="space-between" // Add it here :)
        container
        spacing={24}
      >
        <Grid items></Grid>

        <Grid items>
          {/* <ColorButton
                size="large"
                variant="contained"
                color="primary"
                className={classes.profileMargin}
                onClick={() => {
                  handlePreviousPage(14);
                }}
              >
                Back
              </ColorButton> */}
          &nbsp;&nbsp;
          {/* <ColorButton
            size="large"
            variant="contained"
            color="primary"
            className={classes.profileMargin}
            onClick={() => {
              props.handleNextPage('02');
            }}

            
          >
            Next
           
          </ColorButton> */}
        </Grid>
      </Grid>
    </View>
  );
}

CreateSprint.propTypes = {
  openorderimportcreate: PropTypes.bool,
  handleCloseSprintPoupup: PropTypes.func,
};
