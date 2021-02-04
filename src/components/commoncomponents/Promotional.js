import React, { useState, useEffect } from "react";
import {
  fade,
  withStyles,
  makeStyles,
  useTheme,
} from "@material-ui/core/styles";
import {
  Platform,
  View,
  ScrollView,
  Image,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import StepConnector from "@material-ui/core/StepConnector";
import InputBase from "@material-ui/core/InputBase";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import * as shiphypeservice from "./ShipService/shiphype_service";
import MaterialTable, { MTableToolbar, MTableAction } from "material-table";
import { forwardRef } from "react";
import Paper from "@material-ui/core/Paper";
import Toast from "./feedback/Toast";
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
import AddIcon from "@material-ui/icons/Add";
import popUpStyle from "./style/popUpStyle";
import Autocomplete from "@material-ui/lab/Autocomplete";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import FormGroup from "@material-ui/core/FormGroup";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import RefreshIcon from "@material-ui/icons/Refresh";
const ColorButtonRefresh = withStyles((theme) => ({
  root: {
    borderRadius: "3px",
    height: "100%",
    padding: "3px",
    width: "100px",
    fontSize: "11px",
    fontWeight: "550",
    color: "#fff",
    backgroundColor: "#33cc00",
    //  paddingLeft: '22%',
    //  paddingRight: '22%',
    "&:hover": {
      color: "#fff",
      backgroundColor: "#33cc00",
    },
  },
}))(Button);

const ColorButtonAdd = withStyles((theme) => ({
  root: {
    borderRadius: "3px",
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    //marginTop:'3%',
    height: "100%",
    padding: "3px",
    width: "180px",
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
  //   Add: () => <ColorButtonAdd
  //   size='large'
  //   variant="contained"
  //   color="primary"
  //   startIcon={<AddIcon />}
  //   >
  //    Promotional Inserts
  // </ColorButtonAdd>,
  RefreshIcon: forwardRef((props, ref) => (
    <RefreshIcon {...props} ref={ref} color="action" />
  )),
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

const data = [
  {
    productid: "LS-0001",
    productname: "Touch screen apple iphone",
    sellingprice: "$18",
    shipinternational: "yes",
    hscode: "FS008",
    packing: "Corrugated Box",
  },
  {
    productid: "LS-0002",
    productname: "Battery for apple iphone",
    sellingprice: "$19",
    shipinternational: "no",
    hscode: "FS009",
    packing: "Polly Bubble Mailer",
  },
];

const packageingType = [
  {
    value: "w2",
    label: "Corrugated Box",
  },
  {
    value: "w3",
    label: "Poly Bubble Mailer",
  },
];

const QontoConnector = withStyles({
  line: {
    borderColor: "#3f51b5",
    borderTopWidth: 2,
    borderRadius: 1,
  },
})(StepConnector);

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "0px solid #ced4da",
    fontSize: 15,
    padding: "2px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 0,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(0, 0, 0),
    borderRadius: 0,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(2),
    flexGrow: 1,
    height: "80vh",
    overflow: "auto",
    backgroundColor: "#fff",
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

const StyledMTableToolbar = withStyles({
  root: {
    paddingLeft: 0,
    paddingRight: 0,
    fontSize: "12px",
  },
})(MTableToolbar);

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
    backgroundColor: "#0168fa",
    borderColor: "#0168fa",
    borderRadius: "3px",
    padding: "1px",
    paddingLeft: "10px",
    paddingRight: "10px",
    "&:hover": {
      backgroundColor: "#002080",
    },
  },
}))(Button);

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
/**
 * Description:This function is used for Slide17
 * @param {*} props
 */
export default function Slide17(props) {
  const classes = useStyles();
  const [warehouse, setWarehouse] = React.useState("0");
  const { openCustomePackaging } = props;
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState(new Set());
  const [skipped, setSkipped] = React.useState(new Set());
  const [sellerid, setSellerid] = React.useState(0);
  const [stateproduct, setStateproduct] = React.useState({
    data: [],
  });
  const [stepDone, setStepDone] = React.useState([]);
  let [singleFile, setSingleFile] = useState(null);
  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);

  const [status, setStatus] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [type, setType] = React.useState("");
  const [userData, setUserData] = React.useState([]);
  const userid = props.user_id;
  const userRoleId = parseInt(window.localStorage.roleId);
  const [open1, setOpen1] = React.useState(false);
  const [state1, setState1] = useState({
    vertical: "center",
    horizontal: "center",
  });
  const addActionRef = React.useRef();
  const { vertical, horizontal } = state1;
  const [changedWarehouseid, setchangedWarehouseid] = React.useState([]);
  const [openChecked, setOpenChekced] = React.useState(false);
  var ids = [];
  var ids1 = [];

  const validate = {
    assignSku: (s) => (s.length > 0 ? "" : "Assign Sku id required"),
    packaggingName: (s) => (s.length > 0 ? "" : "Product Name is required"),
  };

  var flag = false;
  const handleChangeCheckbox = (data) => {
    // var ids=[];
    //  var ids2=[];
    setOpenChekced(true);
    if (ids.length === 0) {
      ids.push(data);
    } else {
      for (let i = 0; i < ids.length; i++) {
        if (data !== ids[i]) {
          //ids.push(data);
          flag = true;
        } else {
          flag = false;
          break;
        }
      }
      if (flag === true) {
        ids.push(data);
      } else {
        const index = ids.indexOf(data);
        if (index > -1) {
          ids.splice(index, 1);
          if (ids.length === 0) {
            setOpenChekced(false);
          }
        }
      }
    }
    console.log("arraylenghtafter", ids.length);

    //fetchCustomePackageingList();
    const updatedaray = [...ids];

    setchangedWarehouseid(updatedaray);

    if (userRoleId === 1) {
      setState({
        column1FilterList,
        columns: [
          {
            title: "",
            render: (rowData) => (
              <FormGroup>
                {(() => {
                  if (rowData !== undefined) {
                    return (
                      <FormControlLabel
                        style={popUpStyle.checkboxPosition}
                        control={
                          <Checkbox
                            id={rowData.packaggingId}
                            checked={(() => {
                              for (let i = 0; i < ids.length; i++) {
                                if (rowData.packaggingId === parseInt(ids[i])) {
                                  return true;
                                }
                              }
                            })()}
                            onChange={() => {
                              handleChangeCheckbox(rowData.packaggingId);
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
            title: "ShipHype Internal ID",
            field: "packaggingId",
            type: "text",
            editable: "never",
            render: (rowData) => (
              <FormControlLabel
                onClick={() => {
                  handleChangeCheckbox(rowData.packaggingId);
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
                      if (rowData !== undefined) {
                        return (
                          <Text
                            style={{
                              fontSize: "11px",
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              transition: "all 0.25s",
                            }}
                          >
                            {rowData.packaggingId}
                          </Text>
                        );
                      }
                    })()}
                  </Typography>
                }
              />
            ),
          },

          {
            title: "Name",
            field: "packaggingName",
            type: "text",
            render: (rowData) => (
              <FormControlLabel
                onClick={() => {
                  handleChangeCheckbox(rowData.packaggingId);
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
                      {rowData.packaggingName === null || rowData.packaggingName === "" ? ' ' : rowData.packaggingName}
                    </Text>
                  </Typography>
                }
              />
            ),
          },
          {
            title: "SKU",
            field: "assignSku",
            type: "text",
            render: (rowData) => (
              <FormControlLabel
                onClick={() => {
                  handleChangeCheckbox(rowData.packaggingId);
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
                      {rowData.assignSku === null || rowData.assignSku === "" ? ' ' : rowData.assignSku}
                    </Text>
                  </Typography>
                }
              />
            ),
          },

          {
            title: "Total Stock",
            field: "losangelesstock1",
            type: "text",
            editable: "never",
            render: (rowData) => (
              <Text>
                {(() => {
                  if (rowData !== undefined) {
                    if (
                      rowData.torontostock !== null &&
                      rowData.losangelesstock !== null
                    ) {
                      return (
                        <FormControlLabel
                          onClick={() => {
                            handleChangeCheckbox(rowData.packaggingId);
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
                                {parseInt(rowData.losangelesstock) +
                                  parseInt(rowData.torontostock)}
                              </Text>
                            </Typography>
                          }
                        />
                      );
                    } else if (
                      rowData.torontostock === null &&
                      rowData.losangelesstock !== null
                    ) {
                      return (
                        <FormControlLabel
                          onClick={() => {
                            handleChangeCheckbox(rowData.packaggingId);
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
                                {parseInt(rowData.losangelesstock)}
                              </Text>
                            </Typography>
                          }
                        />
                      );
                    } else if (
                      rowData.torontostock === null &&
                      rowData.losangelesstock === null
                    ) {
                      return (
                        <FormControlLabel
                          onClick={() => {
                            handleChangeCheckbox(rowData.packaggingId);
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
                                0
                              </Text>
                            </Typography>
                          }
                        />
                      );
                    } else if (
                      rowData.torontostock !== null &&
                      rowData.losangelesstock === null
                    ) {
                      return (
                        <FormControlLabel
                          onClick={() => {
                            handleChangeCheckbox(rowData.packaggingId);
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
                                {parseInt(rowData.torontostock)}
                              </Text>
                            </Typography>
                          }
                        />
                      );
                    }
                  }
                })()}
              </Text>
            ),
          },
          {
            title: "Toronto Stock",
            field: "torontostock",
            type: "text",
            render: (rowData) => (
              <FormControlLabel
                onClick={() => {
                  handleChangeCheckbox(rowData.packaggingId);
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
                      {rowData.torontostock === null || rowData.torontostock === "" ?  '  ' : rowData.torontostock}
                    </Text>
                  </Typography>
                }
              />
            ),
          },
          {
            title: "Los Angeles Stock",
            field: "losangelesstock",
            type: "text",
            render: (rowData) => (
              <FormControlLabel
                onClick={() => {
                  handleChangeCheckbox(rowData.packaggingId);
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
                      {rowData.losangelesstock === null || rowData.losangelesstock === "" ? ' ' : rowData.losangelesstock}
                    </Text>
                  </Typography>
                }
              />
            ),
          },
        ],
        
      });
    } else {
      setState({
        column1FilterList,
        columns: [
          {
            title: "",
            render: (rowData) => (
              <FormGroup>
                {(() => {
                  if (rowData !== undefined) {
                    return (
                      <FormControlLabel
                        style={popUpStyle.checkboxPosition}
                        control={
                          <Checkbox
                            id={rowData.packaggingId}
                            checked={(() => {
                              for (let i = 0; i < ids.length; i++) {
                                if (rowData.packaggingId === parseInt(ids[i])) {
                                  return true;
                                }
                              }
                            })()}
                            onChange={() => {
                              handleChangeCheckbox(rowData.packaggingId);
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
            title: "Name",
            field: "packaggingName",
            type: "text",
            render: (rowData) => (
              <FormControlLabel
                onClick={() => {
                  handleChangeCheckbox(rowData.packaggingId);
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
                      {rowData.packaggingName === null || rowData.packaggingName === "" ? ' ' : rowData.packaggingName}
                    </Text>
                  </Typography>
                }
              />
            ),
          },
          {
            title: "SKU",
            field: "assignSku",
            type: "text",
            render: (rowData) => (
              <FormControlLabel
                onClick={() => {
                  handleChangeCheckbox(rowData.packaggingId);
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
                      {rowData.assignSku === null || rowData.assignSku === "" ? ' ' : rowData.assignSku}
                    </Text>
                  </Typography>
                }
              />
            ),
          },

          {
            title: "Total Stock",
            field: "losangelesstock1",
            type: "text",
            editable: "never",
            render: (rowData) => (
              <Text>
                {(() => {
                  if (rowData !== undefined) {
                    if (
                      rowData.torontostock !== null &&
                      rowData.losangelesstock !== null
                    ) {
                      return (
                        <FormControlLabel
                          onClick={() => {
                            handleChangeCheckbox(rowData.packaggingId);
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
                                {parseInt(rowData.losangelesstock) +
                                  parseInt(rowData.torontostock)}
                              </Text>
                            </Typography>
                          }
                        />
                      );
                    } else if (
                      rowData.torontostock === null &&
                      rowData.losangelesstock !== null
                    ) {
                      return (
                        <FormControlLabel
                          onClick={() => {
                            handleChangeCheckbox(rowData.packaggingId);
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
                                {parseInt(rowData.losangelesstock)}
                              </Text>
                            </Typography>
                          }
                        />
                      );
                    } else if (
                      rowData.torontostock === null &&
                      rowData.losangelesstock === null
                    ) {
                      return (
                        <FormControlLabel
                          onClick={() => {
                            handleChangeCheckbox(rowData.packaggingId);
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
                                0
                              </Text>
                            </Typography>
                          }
                        />
                      );
                    } else if (
                      rowData.torontostock !== null &&
                      rowData.losangelesstock === null
                    ) {
                      return (
                        <FormControlLabel
                          onClick={() => {
                            handleChangeCheckbox(rowData.packaggingId);
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
                                {parseInt(rowData.torontostock)}
                              </Text>
                            </Typography>
                          }
                        />
                      );
                    }
                  }
                })()}
              </Text>
            ),
          },
          {
            title: "Toronto Stock",
            field: "torontostock",
            type: "text",
            editable: "never",
            render: (rowData) => (
              <FormControlLabel
                onClick={() => {
                  handleChangeCheckbox(rowData.packaggingId);
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
                      if (rowData !== undefined) {
                        return (
                          <Text
                            style={{
                              fontSize: "11px",
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              transition: "all 0.25s",
                            }}
                          >
                            {rowData.torontostock}
                          </Text>
                        );
                      }
                    })()}
                  </Typography>
                }
              />
            ),
          },
          {
            title: "Los Angeles Stock",
            field: "losangelesstock",
            type: "text",
            editable: "never",
            render: (rowData) => (
              <FormControlLabel
                onClick={() => {
                  handleChangeCheckbox(rowData.packaggingId);
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
                      if (rowData !== undefined) {
                        return (
                          <Text
                            style={{
                              fontSize: "11px",
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              transition: "all 0.25s",
                            }}
                          >
                            {rowData.losangelesstock === null || rowData.losangelesstock === "" ? ' ' : rowData.losangelesstock}
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
    }
  };

  const handleChangeCheckbox5 = () => {
    setOpenChekced(false);
    var ids9 = [];

    const updatedaray = [...ids9];

    setchangedWarehouseid(updatedaray);

    if (userRoleId === 1) {
      setState({
        column1FilterList,
        columns: [
          {
            title: "",
            render: (rowData) => (
              <FormGroup>
                {(() => {
                  if (rowData !== undefined) {
                    return (
                      <FormControlLabel
                        style={popUpStyle.checkboxPosition}
                        control={
                          <Checkbox
                            id={rowData.packaggingId}
                            checked={(() => {
                              for (let i = 0; i < ids.length; i++) {
                                if (rowData.packaggingId === parseInt(ids[i])) {
                                  return true;
                                }
                              }
                            })()}
                            onChange={() => {
                              handleChangeCheckbox(rowData.packaggingId);
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
            title: "ShipHype Internal ID",
            field: "packaggingId",
            type: "text",
            editable: "never",
            render: (rowData) => (
              <FormControlLabel
                onClick={() => {
                  handleChangeCheckbox(rowData.packaggingId);
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
                      if (rowData !== undefined) {
                        return (
                          <Text
                            style={{
                              fontSize: "11px",
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              transition: "all 0.25s",
                            }}
                          >
                            {rowData.packaggingId}
                          </Text>
                        );
                      }
                    })()}
                  </Typography>
                }
              />
            ),
          },

          {
            title: "Name",
            field: "packaggingName",
            type: "text",
            render: (rowData) => (
              <FormControlLabel
                onClick={() => {
                  handleChangeCheckbox(rowData.packaggingId);
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
                      {rowData.packaggingName === null || rowData.packaggingName === "" ? ' ' : rowData.packaggingName}
                    </Text>
                  </Typography>
                }
              />
            ),
          },
          {
            title: "SKU",
            field: "assignSku",
            type: "text",
            render: (rowData) => (
              <FormControlLabel
                onClick={() => {
                  handleChangeCheckbox(rowData.packaggingId);
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
                      {rowData.assignSku === null || rowData.assignSku === "" ? ' ' : rowData.assignSku}
                    </Text>
                  </Typography>
                }
              />
            ),
          },

          {
            title: "Total Stock",
            field: "losangelesstock1",
            type: "text",
            editable: "never",
            render: (rowData) => (
              <Text>
                {(() => {
                  if (rowData !== undefined) {
                    if (
                      rowData.torontostock !== null &&
                      rowData.losangelesstock !== null
                    ) {
                      return (
                        <FormControlLabel
                          onClick={() => {
                            handleChangeCheckbox(rowData.packaggingId);
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
                                {parseInt(rowData.losangelesstock) +
                                  parseInt(rowData.torontostock)}
                              </Text>
                            </Typography>
                          }
                        />
                      );
                    } else if (
                      rowData.torontostock === null &&
                      rowData.losangelesstock !== null
                    ) {
                      return (
                        <FormControlLabel
                          onClick={() => {
                            handleChangeCheckbox(rowData.packaggingId);
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
                                {parseInt(rowData.losangelesstock)}
                              </Text>
                            </Typography>
                          }
                        />
                      );
                    } else if (
                      rowData.torontostock === null &&
                      rowData.losangelesstock === null
                    ) {
                      return (
                        <FormControlLabel
                          onClick={() => {
                            handleChangeCheckbox(rowData.packaggingId);
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
                                0
                              </Text>
                            </Typography>
                          }
                        />
                      );
                    } else if (
                      rowData.torontostock !== null &&
                      rowData.losangelesstock === null
                    ) {
                      return (
                        <FormControlLabel
                          onClick={() => {
                            handleChangeCheckbox(rowData.packaggingId);
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
                                {parseInt(rowData.torontostock)}
                              </Text>
                            </Typography>
                          }
                        />
                      );
                    }
                  }
                })()}
              </Text>
            ),
          },
          {
            title: "Toronto Stock",
            field: "torontostock",
            type: "text",
            render: (rowData) => (
              <FormControlLabel
                onClick={() => {
                  handleChangeCheckbox(rowData.packaggingId);
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
                      {rowData.torontostock === null || rowData.torontostock === "" ?  '  ' : rowData.torontostock}
                    </Text>
                  </Typography>
                }
              />
            ),
          },
          {
            title: "Los Angeles Stock",
            field: "losangelesstock",
            type: "text",
            render: (rowData) => (
              <FormControlLabel
                onClick={() => {
                  handleChangeCheckbox(rowData.packaggingId);
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
                      {rowData.losangelesstock === null || rowData.losangelesstock === "" ? ' ' : rowData.losangelesstock}
                    </Text>
                  </Typography>
                }
              />
            ),
          },
        ],
        
      });
    } else {
      setState({
        column1FilterList,
        columns: [
          {
            title: "",
            render: (rowData) => (
              <FormGroup>
                {(() => {
                  if (rowData !== undefined) {
                    return (
                      <FormControlLabel
                        style={popUpStyle.checkboxPosition}
                        control={
                          <Checkbox
                            id={rowData.packaggingId}
                            checked={(() => {
                              for (let i = 0; i < ids.length; i++) {
                                if (rowData.packaggingId === parseInt(ids[i])) {
                                  return true;
                                }
                              }
                            })()}
                            onChange={() => {
                              handleChangeCheckbox(rowData.packaggingId);
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
            title: "Name",
            field: "packaggingName",
            type: "text",
            render: (rowData) => (
              <FormControlLabel
                onClick={() => {
                  handleChangeCheckbox(rowData.packaggingId);
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
                      {rowData.packaggingName === null || rowData.packaggingName === "" ? ' ' : rowData.packaggingName}
                    </Text>
                  </Typography>
                }
              />
            ),
          },
          {
            title: "SKU",
            field: "assignSku",
            type: "text",
            render: (rowData) => (
              <FormControlLabel
                onClick={() => {
                  handleChangeCheckbox(rowData.packaggingId);
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
                      {rowData.assignSku === null || rowData.assignSku === "" ? ' ' : rowData.assignSku}
                    </Text>
                  </Typography>
                }
              />
            ),
          },

          {
            title: "Total Stock",
            field: "losangelesstock1",
            type: "text",
            editable: "never",
            render: (rowData) => (
              <Text>
                {(() => {
                  if (rowData !== undefined) {
                    if (
                      rowData.torontostock !== null &&
                      rowData.losangelesstock !== null
                    ) {
                      return (
                        <FormControlLabel
                          onClick={() => {
                            handleChangeCheckbox(rowData.packaggingId);
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
                                {parseInt(rowData.losangelesstock) +
                                  parseInt(rowData.torontostock)}
                              </Text>
                            </Typography>
                          }
                        />
                      );
                    } else if (
                      rowData.torontostock === null &&
                      rowData.losangelesstock !== null
                    ) {
                      return (
                        <FormControlLabel
                          onClick={() => {
                            handleChangeCheckbox(rowData.packaggingId);
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
                                {parseInt(rowData.losangelesstock)}
                              </Text>
                            </Typography>
                          }
                        />
                      );
                    } else if (
                      rowData.torontostock === null &&
                      rowData.losangelesstock === null
                    ) {
                      return (
                        <FormControlLabel
                          onClick={() => {
                            handleChangeCheckbox(rowData.packaggingId);
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
                                0
                              </Text>
                            </Typography>
                          }
                        />
                      );
                    } else if (
                      rowData.torontostock !== null &&
                      rowData.losangelesstock === null
                    ) {
                      return (
                        <FormControlLabel
                          onClick={() => {
                            handleChangeCheckbox(rowData.packaggingId);
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
                                {parseInt(rowData.torontostock)}
                              </Text>
                            </Typography>
                          }
                        />
                      );
                    }
                  }
                })()}
              </Text>
            ),
          },
          {
            title: "Toronto Stock",
            field: "torontostock",
            type: "text",
            editable: "never",
            render: (rowData) => (
              <FormControlLabel
                onClick={() => {
                  handleChangeCheckbox(rowData.packaggingId);
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
                      if (rowData !== undefined) {
                        return (
                          <Text
                            style={{
                              fontSize: "11px",
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              transition: "all 0.25s",
                            }}
                          >
                            {rowData.torontostock}
                          </Text>
                        );
                      }
                    })()}
                  </Typography>
                }
              />
            ),
          },
          {
            title: "Los Angeles Stock",
            field: "losangelesstock",
            type: "text",
            editable: "never",
            render: (rowData) => (
              <FormControlLabel
                onClick={() => {
                  handleChangeCheckbox(rowData.packaggingId);
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
                      if (rowData !== undefined) {
                        return (
                          <Text
                            style={{
                              fontSize: "11px",
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              transition: "all 0.25s",
                            }}
                          >
                            {rowData.losangelesstock === null || rowData.losangelesstock === "" ? ' ' : rowData.losangelesstock}
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
    }
  };

  const theme = useTheme();
  const [state, setState] = React.useState({
    columns: [
      {
        title: "",
        render: (rowData) => (
          <FormGroup>
            {(() => {
              if (rowData !== undefined) {
                return (
                  <FormControlLabel
                    style={popUpStyle.checkboxPosition}
                    control={
                      <Checkbox
                        id={rowData.packaggingId}
                        checked={(() => {
                          for (let i = 0; i < ids.length; i++) {
                            if (rowData.packaggingId === parseInt(ids[i])) {
                              return true;
                            }
                          }
                        })()}
                        onChange={() => {
                          handleChangeCheckbox(rowData.packaggingId);
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
        title: "Name",
        field: "packaggingName",
        type: "text",
        render: (rowData) => (
          <FormControlLabel
            onClick={() => {
              handleChangeCheckbox(rowData.packaggingId);
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
                  {rowData.packaggingName === null || rowData.packaggingName === "" ? ' ' : rowData.packaggingName}
                </Text>
              </Typography>
            }
          />
        ),
      },
      {
        title: "SKU",
        field: "assignSku",
        type: "text",
        render: (rowData) => (
          <FormControlLabel
            onClick={() => {
              handleChangeCheckbox(rowData.packaggingId);
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
                  {rowData.assignSku === null || rowData.assignSku === "" ? ' ' : rowData.assignSku}
                </Text>
              </Typography>
            }
          />
        ),
      },

      {
        title: "Total Stock",
        field: "losangelesstock1",
        type: "text",
        editable: "never",
        render: (rowData) => (
          <Text>
            {(() => {
              if (rowData !== undefined) {
                if (
                  rowData.torontostock !== null &&
                  rowData.losangelesstock !== null
                ) {
                  return (
                    <FormControlLabel
                      onClick={() => {
                        handleChangeCheckbox(rowData.packaggingId);
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
                            {parseInt(rowData.losangelesstock) +
                              parseInt(rowData.torontostock)}
                          </Text>
                        </Typography>
                      }
                    />
                  );
                } else if (
                  rowData.torontostock === null &&
                  rowData.losangelesstock !== null
                ) {
                  return (
                    <FormControlLabel
                      onClick={() => {
                        handleChangeCheckbox(rowData.packaggingId);
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
                            {parseInt(rowData.losangelesstock)}
                          </Text>
                        </Typography>
                      }
                    />
                  );
                } else if (
                  rowData.torontostock === null &&
                  rowData.losangelesstock === null
                ) {
                  return (
                    <FormControlLabel
                      onClick={() => {
                        handleChangeCheckbox(rowData.packaggingId);
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
                            0
                          </Text>
                        </Typography>
                      }
                    />
                  );
                } else if (
                  rowData.torontostock !== null &&
                  rowData.losangelesstock === null
                ) {
                  return (
                    <FormControlLabel
                      onClick={() => {
                        handleChangeCheckbox(rowData.packaggingId);
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
                            {parseInt(rowData.torontostock)}
                          </Text>
                        </Typography>
                      }
                    />
                  );
                }
              }
            })()}
          </Text>
        ),
      },
      {
        title: "Toronto Stock",
        field: "torontostock",
        type: "text",
        render: (rowData) => (
          <FormControlLabel
            onClick={() => {
              handleChangeCheckbox(rowData.packaggingId);
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
                  {rowData.torontostock === null || rowData.torontostock === "" ? ' ' : rowData.torontostock}
                </Text>
              </Typography>
            }
          />
        ),
      },
      {
        title: "Los Angeles Stock",
        field: "losangelesstock",
        type: "text",
        render: (rowData) => (
          <FormControlLabel
            onClick={() => {
              handleChangeCheckbox(rowData.packaggingId);
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
                  {rowData.losangelesstock === null || rowData.losangelesstock === "" ? ' ' : rowData.losangelesstock}
                </Text>
              </Typography>
            }
          />
        ),
      },
      // {
      //   title: 'Type',
      //   field: 'packaggingtypeId',
      //   lookup: { 1: 'Custom Packaging', 2: 'Promotional Inserts' },
      // },
    ],
    
  });
  const column1FilterList = state.column1FilterList;

  React.useEffect(() => {
    fetchCustomePackageingList();
    fetchForCheckAdminList();
    //fetchShiphypeCompleteStep();
  }, []);
  const fetchForCheckAdminList = () => {
    if (userRoleId === 1) {
      setState({
        column1FilterList,
        columns: [
          {
            title: "",
            render: (rowData) => (
              <FormGroup>
                {(() => {
                  if (rowData !== undefined) {
                    return (
                      <FormControlLabel
                        style={popUpStyle.checkboxPosition}
                        control={
                          <Checkbox
                            id={rowData.packaggingId}
                            checked={(() => {
                              for (let i = 0; i < ids.length; i++) {
                                if (rowData.packaggingId === parseInt(ids[i])) {
                                  return true;
                                }
                              }
                            })()}
                            onChange={() => {
                              handleChangeCheckbox(rowData.packaggingId);
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
            title: "ShipHype Internal ID",
            field: "packaggingId",
            type: "text",
            editable: "never",
            render: (rowData) => (
              <FormControlLabel
                onClick={() => {
                  handleChangeCheckbox(rowData.packaggingId);
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
                      if (rowData !== undefined) {
                        return (
                          <Text
                            style={{
                              fontSize: "11px",
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              transition: "all 0.25s",
                            }}
                          >
                            {rowData.packaggingId}
                          </Text>
                        );
                      }
                    })()}
                  </Typography>
                }
              />
            ),
          },

          {
            title: "Name",
            field: "packaggingName",
            type: "text",
            render: (rowData) => (
              <FormControlLabel
                onClick={() => {
                  handleChangeCheckbox(rowData.packaggingId);
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
                      {rowData.packaggingName === null || rowData.packaggingName === "" ? ' ' : rowData.packaggingName}
                    </Text>
                  </Typography>
                }
              />
            ),
          },
          {
            title: "SKU",
            field: "assignSku",
            type: "text",
            render: (rowData) => (
              <FormControlLabel
                onClick={() => {
                  handleChangeCheckbox(rowData.packaggingId);
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
                      {rowData.assignSku === null || rowData.assignSku === "" ? ' ' : rowData.assignSku}
                    </Text>
                  </Typography>
                }
              />
            ),
          },

          {
            title: "Total Stock",
            field: "losangelesstock1",
            type: "text",
            editable: "never",
            render: (rowData) => (
              <Text>
                {(() => {
                  if (rowData !== undefined) {
                    if (
                      rowData.torontostock !== null &&
                      rowData.losangelesstock !== null
                    ) {
                      return (
                        <FormControlLabel
                          onClick={() => {
                            handleChangeCheckbox(rowData.packaggingId);
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
                                {parseInt(rowData.losangelesstock) +
                                  parseInt(rowData.torontostock)}
                              </Text>
                            </Typography>
                          }
                        />
                      );
                    } else if (
                      rowData.torontostock === null &&
                      rowData.losangelesstock !== null
                    ) {
                      return (
                        <FormControlLabel
                          onClick={() => {
                            handleChangeCheckbox(rowData.packaggingId);
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
                                {parseInt(rowData.losangelesstock)}
                              </Text>
                            </Typography>
                          }
                        />
                      );
                    } else if (
                      rowData.torontostock === null &&
                      rowData.losangelesstock === null
                    ) {
                      return (
                        <FormControlLabel
                          onClick={() => {
                            handleChangeCheckbox(rowData.packaggingId);
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
                                0
                              </Text>
                            </Typography>
                          }
                        />
                      );
                    } else if (
                      rowData.torontostock !== null &&
                      rowData.losangelesstock === null
                    ) {
                      return (
                        <FormControlLabel
                          onClick={() => {
                            handleChangeCheckbox(rowData.packaggingId);
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
                                {parseInt(rowData.torontostock)}
                              </Text>
                            </Typography>
                          }
                        />
                      );
                    }
                  }
                })()}
              </Text>
            ),
          },
          {
            title: "Toronto Stock",
            field: "torontostock",
            type: "text",
            render: (rowData) => (
              <FormControlLabel
                onClick={() => {
                  handleChangeCheckbox(rowData.packaggingId);
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
                      {rowData.torontostock === null || rowData.torontostock === "" ?  '  ' : rowData.torontostock}
                    </Text>
                  </Typography>
                }
              />
            ),
          },
          {
            title: "Los Angeles Stock",
            field: "losangelesstock",
            type: "text",
            render: (rowData) => (
              <FormControlLabel
                onClick={() => {
                  handleChangeCheckbox(rowData.packaggingId);
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
                      {rowData.losangelesstock === null || rowData.losangelesstock === "" ? ' ' : rowData.losangelesstock}
                    </Text>
                  </Typography>
                }
              />
            ),
          },
        ],
       
      });
    } else {
      setState({
        column1FilterList,
        columns: [
          {
            title: "",
            render: (rowData) => (
              <FormGroup>
                {(() => {
                  if (rowData !== undefined) {
                    return (
                      <FormControlLabel
                        style={popUpStyle.checkboxPosition}
                        control={
                          <Checkbox
                            id={rowData.packaggingId}
                            checked={(() => {
                              for (let i = 0; i < ids.length; i++) {
                                if (rowData.packaggingId === parseInt(ids[i])) {
                                  return true;
                                }
                              }
                            })()}
                            onChange={() => {
                              handleChangeCheckbox(rowData.packaggingId);
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
            title: "Name",
            field: "packaggingName",
            type: "text",
            render: (rowData) => (
              <FormControlLabel
                onClick={() => {
                  handleChangeCheckbox(rowData.packaggingId);
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
                      {rowData.packaggingName === null || rowData.packaggingName === "" ? ' ' : rowData.packaggingName}
                    </Text>
                  </Typography>
                }
              />
            ),
          },
          {
            title: "SKU",
            field: "assignSku",
            type: "text",
            render: (rowData) => (
              <FormControlLabel
                onClick={() => {
                  handleChangeCheckbox(rowData.packaggingId);
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
                      {rowData.assignSku === null || rowData.assignSku === "" ? ' ' : rowData.assignSku}
                    </Text>
                  </Typography>
                }
              />
            ),
          },

          {
            title: "Total Stock",
            field: "losangelesstock1",
            type: "text",
            editable: "never",
            render: (rowData) => (
              <Text>
                {(() => {
                  if (rowData !== undefined) {
                    if (
                      rowData.torontostock !== null &&
                      rowData.losangelesstock !== null
                    ) {
                      return (
                        <FormControlLabel
                          onClick={() => {
                            handleChangeCheckbox(rowData.packaggingId);
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
                                {parseInt(rowData.losangelesstock) +
                                  parseInt(rowData.torontostock)}
                              </Text>
                            </Typography>
                          }
                        />
                      );
                    } else if (
                      rowData.torontostock === null &&
                      rowData.losangelesstock !== null
                    ) {
                      return (
                        <FormControlLabel
                          onClick={() => {
                            handleChangeCheckbox(rowData.packaggingId);
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
                                {parseInt(rowData.losangelesstock)}
                              </Text>
                            </Typography>
                          }
                        />
                      );
                    } else if (
                      rowData.torontostock === null &&
                      rowData.losangelesstock === null
                    ) {
                      return (
                        <FormControlLabel
                          onClick={() => {
                            handleChangeCheckbox(rowData.packaggingId);
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
                                0
                              </Text>
                            </Typography>
                          }
                        />
                      );
                    } else if (
                      rowData.torontostock !== null &&
                      rowData.losangelesstock === null
                    ) {
                      return (
                        <FormControlLabel
                          onClick={() => {
                            handleChangeCheckbox(rowData.packaggingId);
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
                                {parseInt(rowData.torontostock)}
                              </Text>
                            </Typography>
                          }
                        />
                      );
                    }
                  }
                })()}
              </Text>
            ),
          },
          {
            title: "Toronto Stock",
            field: "torontostock",
            type: "text",
            editable: "never",
            render: (rowData) => (
              <FormControlLabel
                onClick={() => {
                  handleChangeCheckbox(rowData.packaggingId);
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
                      if (rowData !== undefined) {
                        return (
                          <Text
                            style={{
                              fontSize: "11px",
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              transition: "all 0.25s",
                            }}
                          >
                            {rowData.torontostock}
                          </Text>
                        );
                      }
                    })()}
                  </Typography>
                }
              />
            ),
          },
          {
            title: "Los Angeles Stock",
            field: "losangelesstock",
            type: "text",
            editable: "never",
            render: (rowData) => (
              <FormControlLabel
                onClick={() => {
                  handleChangeCheckbox(rowData.packaggingId);
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
                      if (rowData !== undefined) {
                        return (
                          <Text
                            style={{
                              fontSize: "11px",
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              transition: "all 0.25s",
                            }}
                          >
                            {rowData.losangelesstock === null || rowData.losangelesstock === "" ? ' ' : rowData.losangelesstock}
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
    }
  };
  var uuid = 0;
  const fetchCustomePackageingList = () => {
    //  const userid=5;
    if (sellerid === 0) {
      uuid = userid;
    } else {
      uuid = sellerid;
    }
    var packagin = [];
    setLoading(true);
    shiphypeservice
      .fetchCustomePaching(uuid, 2)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);

          if (response.data.length !== 0) {
            for (let i = 0; i < response.data.length; i++) {
              if (response.data[i].packagingtype !== "default") {
                packagin.push(response.data[i]);
              }
            }
          }
          setStateproduct((prevState) => {
            const data = [];

            return { ...prevState, data };
          });

          setStateproduct((prevState) => {
            const data = [...prevState.data];

            for (let i = 0; i < response.data.length; i++) {
              if (response.data[i].packagingtype !== "default") {
                ids1.push(response.data[i]);
                data.push(response.data[i]);
              }
            }

            return { ...prevState, data };
          });
         
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const deleteCustomePacking1 = () => {
    setLoading(true);
    shiphypeservice
      .deleteCustomePacking(changedWarehouseid)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setOpen(true);
          setType("success");
          setMsg(response.message);
          setStatus(response.status);
          setLoading(false);
          fetchCustomePackageingList();
          handleChangeCheckbox5();
        } else {
          setOpen(true);
          setType("error");
          setMsg("Fail to delete packageing may be used somewhere.");
          setStatus(response.status);
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const deleteCustomePacking = (packagging_id) => {
    var arrPu = [];
    arrPu.push(packagging_id);
    shiphypeservice
      .deleteCustomePacking(arrPu)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          setOpen(true);
          setType("success");
          setMsg(response.message);
          setStatus(response.status);
          setLoading(false);
          fetchCustomePackageingList();
          handleChangeCheckbox5();
        } else {
          setOpen(true);
          setType("error");
          setMsg("Fail to delete packageing may be used somewhere.");
          setStatus(response.status);
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addNewPackaging = (itemsku, itemname, tor, los) => {
    if (sellerid === 0) {
      uuid = userid;
    } else {
      uuid = sellerid;
    }
    if (itemsku === undefined) {
      setOpen1(true);
    } else {
      shiphypeservice
        .addCustomePacking1(itemsku, itemname, 2, tor, los, uuid)
        .then((response) => {
          console.log("status", response.status);
          if (response.status === true) {
            setLoading(false);
            // ids1.push(response.data);

            // setState((prevState) => {
            //   const data = [...prevState.data];

            //   data.push(response.data);
            //   return { ...prevState, data };
            // });
            // setState((prevState) => {
            //   const data = [...prevState.data];
            //   // if(newData.packaging===undefined)
            //   // {
            //   //   newData.packaging= valueofsouceid;
            //   // }
            //   data.push(newData);
            //   return { ...prevState, data };
            // });
            fetchCustomePackageingList();
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

  const updataExistsPackaging = (
    packagging_id,
    assignsku,
    packaggingname,
    tor,
    los,
    useridid
  ) => {
    if (sellerid === 0) {
      uuid = userid;
    } else {
      uuid = sellerid;
    }
    shiphypeservice
      .updatePackageing1(
        packagging_id,
        assignsku,
        packaggingname,
        2,
        tor,
        los,
        useridid
      )
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);

          // fetchCustomePackageingList();
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleClose = () => {
    setOpen(false);
  };
  const showToast = (open, msg, type) => {
    return (
      <Toast open={open} handleClose={handleClose} type={type} msg={msg} />
    );
  };

  const handleChange1 = (event) => {
    setWarehouse(event.target.value);
    fetchProductListById(event.target.value);
  };

  React.useEffect(() => {
    // fetchProductListOfLastWeek();
    fetchUserInfo();
  }, []);

  var newArr = [];
  const fetchUserInfo = () => {
    //const userid=5;
    setLoading(true);
    shiphypeservice
      .fetchUserInfo()
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          for (let a = 0; a < response.data.length; a++) {
            if (response.data[a].userEmail === "") {
              var myObject = {};
              response.data[a].id
                ? (myObject["id"] = response.data[a].id)
                : null;
              response.data[a].displayName
                ? (myObject["name"] = response.data[a].displayName)
                : null;
              newArr.push(myObject);
            } else {
              var myObject = {};
              response.data[a].id
                ? (myObject["id"] = response.data[a].id)
                : null;
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
  const fetchProductListById = (User) => {
    var packagin = [];
    //const userid=5;
    setLoading(true);
    shiphypeservice
      .fetchCustomePaching(User, 2)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          if (response.data.length !== 0) {
            for (let i = 0; i < response.data.length; i++) {
              if (response.data[i].packagingtype !== "default") {
                packagin.push(response.data[i]);
              }
            }
          }

          setStateproduct((prevState) => {
            const data = [];

            return { ...prevState, data };
          });

          setStateproduct((prevState) => {
            const data = [...prevState.data];

            for (let i = 0; i < response.data.length; i++) {
              if (response.data[i].packagingtype !== "default") {
                ids1.push(response.data[i]);
                data.push(response.data[i]);
              }
            }

            return { ...prevState, data };
          });
        
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleClose3 = () => {
    setOpen1(false);
    // handleNextPage(22);
  };

  /**
   *
   */

  return (
    <View className={classes.content}>
      <View className={classes.appBarSpacer} />

      <View>
        <Grid item container lg={12} style={popUpStyle.breadCrumSidePadding}>
          <Grid item lg={7}>
            <Link
              onClick={() => {
                props.handleDashboard("01");
              }}
            >
              <Text style={popUpStyle.breadCrundCss1}>DASHBOARD /</Text>
            </Link>
            <Text style={popUpStyle.breadCrundCss2}>
              {" "}
              PROMOTIONAL INSERTS {"\n"}{" "}
            </Text>
          </Grid>
          <Grid item lg={5} style={{ marginTop: "15px" }}>
            <Grid justify="flex-end" container>
              <Grid item style={{ marginRight: "20px" }}>
                {userRoleId === 1 ? (
                  <Grid
                    item
                    style={{
                      marginTop: "1px",
                      marginBottom: "10px",
                      padding: "0",
                    }}
                  >
                    <Autocomplete
                      id="combo-box-demo"
                      fullWidth
                      options={userData}
                      getOptionLabel={(option) => option.name}
                      style={{ width: 400 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size="small"
                          placeholder="Search Seller"
                          variant="outlined"
                        />
                      )}
                      onChange={(event, newValue) => {
                        if (newValue !== null) {
                          fetchProductListById(newValue.id);
                          setSellerid(newValue.id);
                          //  if(value === 0){
                          //    setValue(1);
                          //  }else{
                          //   setValue(0);
                          //  }
                        } else {
                          setSellerid(0);

                          var packagin = [];
                          setStateproduct((prevState) => {
                            const data = [];
                            return { ...prevState, data };
                          });

                          setStateproduct((prevState) => {
                            const data = [];
                            return { ...prevState, data };
                          });
                          
                        }
                        console.log("newvalue", newValue);
                      }}
                    />
                  </Grid>
                ) : (
                  ""
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </View>
      <Grid justify="center">
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          key={`${vertical},${horizontal}`}
          open={open1}
          autoHideDuration={6000}
          onClose={handleClose3}
        >
          <Alert onClose={handleClose3} severity="error">
            Item SKU must be filled.
          </Alert>
        </Snackbar>
        <ProgressBar loading={loading} />
      </Grid>

      <View style={popUpStyle.paddingSide}>
        {openChecked === true ? (
          <MaterialTable
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
                Promotional Inserts List
              </Text>
            }
            columns={state.columns}
            data={stateproduct.data}
            icons={tableIcons}
            components={{
              Container: (props) => <Paper {...props} elevation={0} />,

              Toolbar: (props) => <StyledMTableToolbar {...props} />,

              Action: (props) => {
                //If isn't the add action
                if (
                  typeof props.action === typeof Function ||
                  props.action.tooltip !== "Add"
                ) {
                  return <MTableAction {...props} />;
                } else {
                  return (
                    <div ref={addActionRef} onClick={props.action.onClick} />
                  );
                }
              },
            }}
            localization={{
              header: {
                actions: "Action",
              },
              toolbar: {
                searchPlaceholder: "Search Promotional Inserts",
              },
            }}
            actions={[
              {
                tooltip: "Delete Promotionals",
                icon: () => <DeleteOutline />,
                isFreeAction: openChecked,
                onClick: (event, rowData) => {
                  deleteCustomePacking1();
                },
              },
              {
                icon: () => (
                  <ColorButtonAdd
                    size="large"
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                  >
                    Promotional Inserts
                  </ColorButtonAdd>
                ),
                onClick: (event, rowData) => {
                  addActionRef.current.click();
                },
                isFreeAction: true,
                //tooltip: "Add Button",
              },
              {
                icon: () => (
                  <ColorButtonRefresh
                    size="large"
                    variant="contained"
                    color="primary"
                    startIcon={<RefreshIcon />}
                  >
                    Refresh
                  </ColorButtonRefresh>
                ),
                //tooltip: "Refresh",
                isFreeAction: true,
                onClick: (event) => fetchCustomePackageingList(),
              },
            ]}
            options={{
              paging: true,
              maxBodyHeight: "60vh",
              doubleHorizontalScroll: true,
              headerStyle: { position: "sticky", top: 0 },
              pageSize: 10,
              pageSizeOptions: [10, 20, 30, 40, 50, 100],
              showTitle: true,
              addRowPosition: "first",
              actionsColumnIndex: -1,
              exportFileName: "Product Table",
              headerStyle: {
                backgroundColor: "#cccccc",
                color: "#000",

                textTransform: "uppercase",
                width: 26,
                whiteSpace: "nowrap",
                textAlign: "left",
                flexDirection: "row",
                overflow: "hidden",
                textOverflow: "ellipsis",
                paddingLeft: 5,
                paddingTop: 8,
                paddingBottom: 8,
                paddingRight: 0,
                fontSize: "12px",
                //     backgroundColor: theme.palette.primary.table,
                fontWeight: "bold",
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
                paddingTop: 10,
                paddingBottom: 10,
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
                paddingTop: 20,
                paddingBottom: 20,
                paddingRight: 0,
              },
              search: true,
              exportButton: false,
            }}

            editable={{
              onRowAdd: (newData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    {
                      // if (!newData.productsku || !newData.productname || !newData.hscode || !newData.itemvaluecurrency || !newData.packaging) {

                      //     setOpen(true);
                      //     setType('error');
                      //     setMsg("All field is required.");
                      //     reject();
                      //     return;
                      // }
                      // resolve();
                      if (newData.packaggingName === undefined) {
                        setOpen(true);
                        setType("error");
                        setMsg("Package Name must be filled.");
                        reject();
                        return;
                      } else {
                        console.log("sku", newData.assignSku);
                        console.log("name", newData.packaggingName);
                        // var str=newData.itemvaluecurrency;
                        // var currency = str.slice(0, 1);
                        // var currencyvalue=str.slice(1, 5);
                        // console.log("currency",currency);
                        // console.log("currencyvalue",currencyvalue);
                        addNewPackaging(
                          newData.assignSku,
                          newData.packaggingName,
                          newData.torontostock,
                          newData.losangelesstock
                        );
                      }
                    }
                    resolve();
                  }, 1000);
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    {
                      // if (!newData.productsku || !newData.productname || !newData.hscode || !newData.itemvaluecurrency || !newData.packaging) {

                      //           setOpen(true);
                      //           setType('error');
                      //           setMsg("All field is required.");
                      //           reject();
                      //           return;
                      //       }
                      //       resolve();
                      if (newData.packaggingName === "") {
                        setOpen(true);
                        setType("error");
                        setMsg("Package Name must be filled.");
                        reject();
                        return;
                      } else {
                        const dataup = stateproduct.data;
                        const index = dataup.indexOf(oldData);
                        // data[index] = newData;
                        // setState({ data }, () => resolve());

                        const packaggingId = dataup[index].packaggingId;
                        updataExistsPackaging(
                          packaggingId,
                          newData.assignSku,
                          newData.packaggingName,
                          newData.torontostock,
                          newData.losangelesstock,
                          newData.userId
                        );
                        setStateproduct((prevState) => {
                          const data = [...prevState.data];
                          data[data.indexOf(oldData)] = newData;
                          return { ...prevState, data };
                        });
                      }
                    }
                    resolve();
                  }, 1000);
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    {
                      // const data = dataproduct;
                      // const index = data.indexOf(oldData);
                      // const packaggingId=(dataproduct[index].packaggingId);
                      const dataup = stateproduct.data;
                      const index = dataup.indexOf(oldData);
                      const packaggingId = dataup[index].packaggingId;

                      deleteCustomePacking(packaggingId);
                    }
                    resolve();
                  }, 1000);
                }),
            }}
          />
        ) : (
          <MaterialTable
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
                Promotional Inserts List
              </Text>
            }
            columns={state.columns}
            data={stateproduct.data}
            icons={tableIcons}
            components={{
              Container: (props) => <Paper {...props} elevation={0} />,

              Toolbar: (props) => <StyledMTableToolbar {...props} />,
              Action: (props) => {
                //If isn't the add action
                if (
                  typeof props.action === typeof Function ||
                  props.action.tooltip !== "Add"
                ) {
                  return <MTableAction {...props} />;
                } else {
                  return (
                    <div ref={addActionRef} onClick={props.action.onClick} />
                  );
                }
              },
            }}
            localization={{
              header: {
                actions: "Action",
              },
              toolbar: {
                searchPlaceholder: "Search Promotional Inserts",
              },
            }}
            options={{
              paging: true,
              toolbarButtonAlignment: "right",
              actionsColumnIndex: -1,
              maxBodyHeight: "60vh",
              doubleHorizontalScroll: true,
              headerStyle: { position: "sticky", top: 0 },
              pageSize: 10,
              pageSizeOptions: [10, 20, 30, 40, 50, 100],
              showTitle: true,
              addRowPosition: "first",
              exportFileName: "Product Table",
              headerStyle: {
                backgroundColor: "#cccccc",
                color: "#000",

                textTransform: "uppercase",
                width: 26,
                whiteSpace: "nowrap",
                textAlign: "left",
                flexDirection: "row",
                overflow: "hidden",
                textOverflow: "ellipsis",
                paddingLeft: 5,
                paddingTop: 8,
                paddingBottom: 8,
                paddingRight: 0,
                fontSize: "12px",
                //     backgroundColor: theme.palette.primary.table,
                fontWeight: "bold",
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
              search: true,
              exportButton: false,
            }}
            editable={{
              onRowAdd: (newData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    {
                      // if (!newData.productsku || !newData.productname || !newData.hscode || !newData.itemvaluecurrency || !newData.packaging) {

                      //     setOpen(true);
                      //     setType('error');
                      //     setMsg("All field is required.");
                      //     reject();
                      //     return;
                      // }
                      // resolve();
                      if (newData.packaggingName === undefined) {
                        setOpen(true);
                        setType("error");
                        setMsg("Package Name must be filled.");
                        reject();
                        return;
                      } else {
                        console.log("sku", newData.assignSku);
                        console.log("name", newData.packaggingName);
                        // var str=newData.itemvaluecurrency;
                        // var currency = str.slice(0, 1);
                        // var currencyvalue=str.slice(1, 5);
                        // console.log("currency",currency);
                        // console.log("currencyvalue",currencyvalue);
                        addNewPackaging(
                          newData.assignSku,
                          newData.packaggingName,
                          newData.torontostock,
                          newData.losangelesstock
                        );
                      }
                    }
                    resolve();
                  }, 1000);
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    {
                      // if (!newData.productsku || !newData.productname || !newData.hscode || !newData.itemvaluecurrency || !newData.packaging) {

                      //           setOpen(true);
                      //           setType('error');
                      //           setMsg("All field is required.");
                      //           reject();
                      //           return;
                      //       }
                      //       resolve();
                      if (newData.packaggingName === "") {
                        setOpen(true);
                        setType("error");
                        setMsg("Package Name must be filled.");
                        reject();
                        return;
                      } else {
                        const dataup = stateproduct.data;
                        const index = dataup.indexOf(oldData);
                        // data[index] = newData;
                        // setState({ data }, () => resolve());

                        const packaggingId = dataup[index].packaggingId;
                        updataExistsPackaging(
                          packaggingId,
                          newData.assignSku,
                          newData.packaggingName,
                          newData.torontostock,
                          newData.losangelesstock,
                          newData.userId
                        );
                        setStateproduct((prevState) => {
                          const data = [...prevState.data];
                          data[data.indexOf(oldData)] = newData;
                          return { ...prevState, data };
                        });
                      }
                    }
                    resolve();
                  }, 1000);
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    {
                      // const data = dataproduct;
                      // const index = data.indexOf(oldData);
                      // const packaggingId=(dataproduct[index].packaggingId);
                      const dataup = stateproduct.data;
                      const index = dataup.indexOf(oldData);
                      const packaggingId = dataup[index].packaggingId;

                      deleteCustomePacking(packaggingId);
                    }
                    resolve();
                  }, 1000);
                }),
            }}
            actions={[
              {
                icon: () => (
                  <ColorButtonAdd
                    size="large"
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                  >
                    Promotional Inserts
                  </ColorButtonAdd>
                ),
                onClick: (event, rowData) => {
                  addActionRef.current.click();
                },
                isFreeAction: true,
                //tooltip: "Add Button",
              },

              {
                icon: () => (
                  <ColorButtonRefresh
                    size="large"
                    variant="contained"
                    color="primary"
                    startIcon={<RefreshIcon />}
                  >
                    Refresh
                  </ColorButtonRefresh>
                ),
                //tooltip: "Refresh",
                isFreeAction: true,
                onClick: (event) => fetchCustomePackageingList(),
              },
              //   {
              //     icon: () => <RefreshIcon style={{ backgroundColor:'#33cc00',color:'#fff',borderRadius : '3px',margin:'3px',width:30,
              //                 height:30}}/>,
              //   //tooltip: 'Refresh',
              //   position: "toolbar",
              //   onClick: (event) => fetchCustomePackageingList()
              // }
            ]}
          />
        )}
        {showToast(open, msg, type)}
      </View>
      {/* </ScrollView> */}
    </View>
  );
}

Slide17.propTypes = {
  openCustomePackaging: PropTypes.bool,
  handleSprintCancel: PropTypes.func,
  handleNextPage: PropTypes.func,
};
