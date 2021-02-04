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
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import * as shiphypeservice from "./ShipService/shiphype_service";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import MaterialTable, { MTableToolbar } from "material-table";
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
import Typography from "@material-ui/core/Typography";
import AsyncStorage from "@react-native-community/async-storage";
import RefreshIcon from '@material-ui/icons/Refresh';
import { TrafficRounded } from "@material-ui/icons";
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
    borderRadius: 0,
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
      Packing
    </ColorButtonAdd>
  ),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  RefreshIcon: forwardRef((props, ref) => <RefreshIcon {...props} ref={ref} color='action'/>),
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
  profileMargin10: {},

  button2: {
    border: " 1px solid #c0ccda",
    borderRadius: "5px",
    // paddingTop: '10%',
    // paddingBottom: '10%',
    height: "100%",
    width: "100px",
    fontSize: "11px",
    fontWeight: "550",
    color: "rgba(27, 46, 75, 0.7)",
    // paddingLeft: '22%',
    // paddingRight: '22%',
  },
  buttonHome: {
    // border : ' 1px solid #c0ccda',
    borderRadius: "5px",
    // paddingTop: '10%',
    // paddingBottom: '10%',
    fontSize: "11px",
    fontWeight: "550",
    color: "#fff",
    backgroundColor: "#000",
    // paddingLeft: '22%',
    // paddingRight: '22%',
    height: "100%",
    width: "100px",
    "&:hover": {
      color: "#fff",
      backgroundColor: "#000",
    },
  },
  buttonOrder: {
    // border : ' 1px solid #c0ccda',
    borderRadius: "5px",
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    height: "100%",
    width: "110px",
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
  // grid: {
  //   width: 100,
  //   height: 100,
  // },
}));

const StyledMTableToolbar = withStyles({
  root: {
    paddingLeft: 0,
    paddingRight: 0,
    fontSize: "12px",
  },
})(MTableToolbar);

//Make custom button
const ColorButton = withStyles((theme) => ({
  root: {
    color: "#fff",
    borderRadius: "3px",
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    height: "68%",
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
 * Description:This function is used for Slide17
 * @param {*} props
 */
export default function Slide17(props) {
  const classes = useStyles();
  const [dataproduct, setDataProduct] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [type, setType] = React.useState("");
  const userid = props.user_id;
  const [changedWarehouseid, setchangedWarehouseid] = React.useState([]);
  const [openPackageType, setchangePackageType] = React.useState([]);
  const shipmentId = props.shipmentId;
  const [editRoleData, setEditRoleData] = React.useState(null);
  var ids = [];
  var ids2 = [];
  var ids3 = [];
  var SelectPromotional = [];

  var Data = [];
  var NewSelectedPromotionalrow = [];
  var NewQTYupdate = [];

  const [stateproduct, setStateproduct] = React.useState({
    data: [],
  });
  const theme = useTheme();
  const [state, setState] = React.useState({
    selectproduct: false,
    columns: [
      {
        title: "",
        editable: "never",
        render: (rowData) => (
          <FormGroup>
            <FormControlLabel
              style={popUpStyle.checkboxPosition}
              control={
                <Checkbox
                  id={rowData.packaggingId}
                  checked={(() => {
                    for (let i = 0; i < ids.length; i++) {
                      if (editRoleData !== null) {
                        if (editRoleData.moduleinfo !== 0) {
                          if (rowData.packaggingId === parseInt(ids[i])) {
                            return true;
                          }
                        } else {
                          if (rowData.packaggingId === parseInt(ids[i])) {
                            return true;
                          }
                        }
                      } else {
                        if (rowData.packaggingId === parseInt(ids[i])) {
                          return true;
                        }
                      }
                    }
                  })()}
                  onChange={() => {
                    handleChangeCheckbox(rowData, rowData.packaggingId,FormatListBulletedRounded);
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
          </FormGroup>
        ),
      },

      {
        title: "SKU",
        field: "assignSku",
        type: "text",
        editable: "never",
        render: (rowData) => (
          <FormControlLabel
            onClick={() => {
              handleChangeCheckbox(rowData, rowData.packaggingId,true);
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
                  {rowData.assignSku === null ? "no sku" : rowData.assignSku}
                </Text>
              </Typography>
            }
          />
        ),
      },
      {
        title: "Name",
        field: "packaggingName",
        type: "text",
        editable: "never",
        render: (rowData) => (
          <FormControlLabel
            onClick={() => {
              handleChangeCheckbox(rowData, rowData.packaggingId,TrafficRounded,true);
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
                  {rowData.packaggingName}
                </Text>
              </Typography>
            }
          />
        ),
      },
      {
        title: "Current Qty",
        field: "packagingquantity",
        type: "numeric",
        render: (rowData) => (
          <FormControlLabel
            onClick={() => {
              handleChangeCheckbox(rowData, rowData.packaggingId);
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
                {shipmentId !== 0 ? (
                  <Text
                    style={{
                      fontSize: "11px",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                      transition: "all 0.25s",
                    }}
                  >
                    {rowData.packagingquantity === null
                      ? "0"
                      : rowData.packagingquantity}
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontSize: "11px",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                      transition: "all 0.25s",
                    }}
                  >
                    {rowData.packagingquantity === null
                      ? "0"
                      : rowData.packagingquantity}
                  </Text>
                )}
              </Typography>
            }
          />
        ),
      },
     //  { title: 'Current Qty', field: 'losangelesstock1',type: 'text',editable: 'never',
     //    render: rowData => <Text>
     //      {(() => {
     //        if(rowData!==undefined){
     //         if(rowData.torontostock!==null && rowData.losangelesstock!==null)
     //         {
     //
     //  return(
     //    <FormControlLabel
     //
     //    onClick={()=>{handleChangeCheckbox(rowData, rowData.packaggingId)}}
     //    className={classes.quantitycss}
     //    control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
     //    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
     //
     //    <Text style={{ fontSize: '11px',
     //    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
     //    transition : 'all 0.25s',}}>{parseInt(rowData.losangelesstock)+parseInt(rowData.torontostock)}</Text>
     //
     //    </Typography>}
     //    />
     //  )
     //
     //         }
     //         else if(rowData.torontostock ===null && rowData.losangelesstock!==null)
     //         {
     //
     //  return(
     //    <FormControlLabel
     //
     //    onClick={()=>{handleChangeCheckbox(rowData, rowData.packaggingId)}}
     //    className={classes.quantitycss}
     //    control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
     //    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
     //
     //    <Text style={{ fontSize: '11px',
     //    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
     //    transition : 'all 0.25s',}}>{parseInt(rowData.losangelesstock)}</Text>
     //
     //    </Typography>}
     //    />
     //  )
     //
     //         }
     //         else if(rowData.torontostock ===null && rowData.losangelesstock===null)
     //         {
     //
     //  return(
     //    <FormControlLabel
     //
     //    onClick={()=>{handleChangeCheckbox(rowData, rowData.packaggingId)}}
     //    className={classes.quantitycss}
     //    control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
     //    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
     //
     //    <Text style={{ fontSize: '11px',
     //    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
     //    transition : 'all 0.25s',}}>0</Text>
     //
     //    </Typography>}
     //    />
     //  )
     //
     //         }
     //         else if(rowData.torontostock !==null && rowData.losangelesstock===null)
     //         {
     //
     //  return(
     //    <FormControlLabel
     //
     //    onClick={()=>{handleChangeCheckbox(rowData, rowData.packaggingId)}}
     //    className={classes.quantitycss}
     //    control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
     //    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
     //
     //    <Text style={{ fontSize: '11px',
     //    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
     //    transition : 'all 0.25s',}}>{parseInt(rowData.torontostock)}</Text>
     //
     //    </Typography>}
     //    />
     //  )
     //
     //         }
     //        }
     //
     //           })()}
     //     </Text>
     //
     // },
    ],
  });

  React.useEffect(() => {
    console.log(shipmentId);
    console.log("shipmentId");
    fetchCustomePackageingList();
  }, []);

  const fetchCustomePackageingList = () => {
    //  const userid=5;
    setLoading(true);
    shiphypeservice
      .fetchCustomePaching(userid, 2)
      .then((response) => {
        console.log(response);
        console.log("fetchCustomePaching");
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          setDataProduct(response.data);
          setStateproduct((prevState) => {
            const data = [...prevState.data];

            for (let i = 0; i < response.data.length; i++) {
              data.push(response.data[i]);
            }

            return { ...prevState, data };
          });
          if (shipmentId !== 0) {
            fetchArrangeShip(shipmentId);
          } else {
            AsyncStorage.multiGet(["SelectPromotional"]).then((data) => {
              if (data[0][1] != null) {
                SelectPromotional = JSON.parse(data[0][1]);

                if (SelectPromotional.length > 0) {
                  SelectPromotional.forEach((item) => {
                    ids.push(item.packaggingId);
                    ids3.push(item.packaggingtypeId);

                    const updatedaray = [...ids];
                    const updatedaray1 = [...ids3];

                    setchangedWarehouseid(updatedaray);
                    setchangePackageType(updatedaray1);
                  });
                }
              }
            });
          }
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchArrangeShip = (shipmentId) => {
    setLoading(true);
    shiphypeservice
      .fetchArrangeShip(shipmentId)
      .then((response) => {
        console.log(response);
        console.log("fetchArrangeShip");
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          if (response.data.length !== 0) {
            if (response.data[0].getshippingpromotionalinsert.length !== 0) {
              for (
                let i = 0;
                i < response.data[0].getshippingpromotionalinsert.length;
                i++
              ) {
                ids.push(
                  response.data[0].getshippingpromotionalinsert[i]
                    .promotionalinserts
                );
              }

              if (response.data[0].getshippingtypepackaging.length !== 0) {
                for (
                  let i = 0;
                  i < response.data[0].getshippingtypepackaging.length;
                  i++
                ) {
                  ids3.push(
                    response.data[0].getshippingtypepackaging[i].packagingtypeId
                  );
                }
              }

              const updatedaray = [...ids];

              setchangedWarehouseid(updatedaray);

              NewQTYupdate = response.data[0].getshippingpromotionalinsert;
              console.log(NewQTYupdate);
              console.log("NewQTYupdate");

              for (var i = 0; i < ids.length; i++) {
                Data.push({
                  packaggingId: ids[i],
                });
              }
              console.log(Data);
              console.log("DtaNew");

              setStateproduct((prevState) => {
                const data = [...prevState.data];
                data.map((item, index) => {
                  NewQTYupdate.map((item1, index1) => {
                    if (item1.promotionalinserts == item.packaggingId) {
                      console.log("in===");
                      item.packagingquantity = item1.promotionalinsertquantity;
                    }
                  });

                  Data.map((item2, index2) => {
                    if (item2.packaggingId == item.packaggingId) {
                      NewSelectedPromotionalrow.push(item);
                    }
                  });
                });
                AsyncStorage.setItem(
                  "NewSelectedPromotionalrowData",
                  JSON.stringify(NewSelectedPromotionalrow)
                );
                return { ...prevState, data };
              });

              setState({
                columns: [
                  {
                    title: "",
                    editable: "never",
                    render: (rowData) => (
                      <FormGroup>
                        <FormControlLabel
                          style={popUpStyle.checkboxPosition}
                          control={
                            <Checkbox
                              id={rowData.packaggingId}
                              checked={(() => {
                                for (let i = 0; i < ids.length; i++) {
                                  if (editRoleData !== null) {
                                    if (editRoleData.moduleinfo !== 0) {
                                      if (
                                        rowData.packaggingId ===
                                        parseInt(ids[i])
                                      ) {
                                        return true;
                                      }
                                    } else {
                                      if (
                                        rowData.packaggingId ===
                                        parseInt(ids[i])
                                      ) {
                                        return true;
                                      }
                                    }
                                  } else {
                                    if (
                                      rowData.packaggingId === parseInt(ids[i])
                                    ) {
                                      return true;
                                    }
                                  }
                                }
                              })()}
                              onChange={() => {
                                handleChangeCheckbox(
                                  rowData,
                                  rowData.packaggingId,
                                  true
                                );
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
                      </FormGroup>
                    ),
                  },

                  {
                    title: "SKU",
                    field: "assignSku",
                    type: "text",
                    editable: "never",
                    render: (rowData) => (
                      <FormControlLabel
                        onClick={() => {
                          handleChangeCheckbox(rowData, rowData.packaggingId,true);
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
                              {rowData.assignSku === null
                                ? "no sku"
                                : rowData.assignSku}
                            </Text>
                          </Typography>
                        }
                      />
                    ),
                  },
                  {
                    title: "Name",
                    field: "packaggingName",
                    type: "text",
                    editable: "never",
                    render: (rowData) => (
                      <FormControlLabel
                        onClick={() => {
                          handleChangeCheckbox(rowData, rowData.packaggingId,true);
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
                              {rowData.packaggingName}
                            </Text>
                          </Typography>
                        }
                      />
                    ),
                  },
                  {
                    title: "Current Qty",
                    field: "packagingquantity",
                    type: "numeric",
                    render: (rowData) => (
                      <FormControlLabel
                        onClick={() => {
                          handleChangeCheckbox(rowData, rowData.packaggingId,true);
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
                            {shipmentId !== 0 ? (
                              <Text
                                style={{
                                  fontSize: "11px",
                                  fontFamily:
                                    '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                  transition: "all 0.25s",
                                }}
                              >
                                {rowData.packagingquantity === null
                                  ? "0"
                                  : rowData.packagingquantity}
                              </Text>
                            ) : (
                              <Text
                                style={{
                                  fontSize: "11px",
                                  fontFamily:
                                    '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                  transition: "all 0.25s",
                                }}
                              >
                                {rowData.packagingquantity === null
                                  ? "0"
                                  : rowData.packagingquantity}
                              </Text>
                            )}
                          </Typography>
                        }
                      />
                    ),
                  },
     //              { title: 'Current Qty', field: 'losangelesstock1',type: 'text',editable: 'never',
     //    render: rowData => <Text>
     //      {(() => {
     //        if(rowData!==undefined){
     //         if(rowData.torontostock!==null && rowData.losangelesstock!==null)
     //         {
     //
     //  return(
     //    <FormControlLabel
     //
     //    onClick={()=>{handleChangeCheckbox(rowData, rowData.packaggingId)}}
     //    className={classes.quantitycss}
     //    control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
     //    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
     //
     //    <Text style={{ fontSize: '11px',
     //    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
     //    transition : 'all 0.25s',}}>{parseInt(rowData.losangelesstock)+parseInt(rowData.torontostock)}</Text>
     //
     //    </Typography>}
     //    />
     //  )
     //
     //         }
     //         else if(rowData.torontostock ===null && rowData.losangelesstock!==null)
     //         {
     //
     //  return(
     //    <FormControlLabel
     //
     //    onClick={()=>{handleChangeCheckbox(rowData, rowData.packaggingId)}}
     //    className={classes.quantitycss}
     //    control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
     //    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
     //
     //    <Text style={{ fontSize: '11px',
     //    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
     //    transition : 'all 0.25s',}}>{parseInt(rowData.losangelesstock)}</Text>
     //
     //    </Typography>}
     //    />
     //  )
     //
     //         }
     //         else if(rowData.torontostock ===null && rowData.losangelesstock===null)
     //         {
     //
     //  return(
     //    <FormControlLabel
     //
     //    onClick={()=>{handleChangeCheckbox(rowData, rowData.packaggingId)}}
     //    className={classes.quantitycss}
     //    control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
     //    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
     //
     //    <Text style={{ fontSize: '11px',
     //    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
     //    transition : 'all 0.25s',}}>0</Text>
     //
     //    </Typography>}
     //    />
     //  )
     //
     //         }
     //         else if(rowData.torontostock !==null && rowData.losangelesstock===null)
     //         {
     //
     //  return(
     //    <FormControlLabel
     //
     //    onClick={()=>{handleChangeCheckbox(rowData, rowData.packaggingId)}}
     //    className={classes.quantitycss}
     //    control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
     //    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
     //
     //    <Text style={{ fontSize: '11px',
     //    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
     //    transition : 'all 0.25s',}}>{parseInt(rowData.torontostock)}</Text>
     //
     //    </Typography>}
     //    />
     //  )
     //
     //         }
     //        }
     //
     //           })()}
     //     </Text>
     //
     // },
                ],
              });
            }
          }
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onNextfunction = () => {
    console.log("product", changedWarehouseid.length);
    var ids5 = [];
    for (let i = 0; i < changedWarehouseid.length; i++) {
      console.log("productid", changedWarehouseid[i]);
      for (let j = 0; j < stateproduct.data.length; j++) {
        if (changedWarehouseid[i] === stateproduct.data[j].packaggingId) {
          if (stateproduct.data[j].packagingquantity === null) {
            ids5.push(1);
          } else {
            ids5.push(stateproduct.data[j].packagingquantity);
          }
        }
      }
    }
    props.updateSelectCustomeArray(changedWarehouseid, openPackageType, ids5);
    props.handleNextPage("SelectMainScreen");
    console.log(shipmentId);
    console.log("shipmentId Next");
    AsyncStorage.setItem("shipmentId", shipmentId);
  };

  // const onNextfunction = () => {
  //   console.log("product", changedWarehouseid.length);
  //   var ids5 = [];
  //   for (let i = 0; i < changedWarehouseid.length; i++) {
  //     console.log("productid", changedWarehouseid[i]);
  //     for(let j=0;j<stateproduct.data.length;j++){
  //       if(changedWarehouseid[i] === stateproduct.data[j].packaggingId){
  //         if(stateproduct.data[j].packagingquantity === null){
  //           ids5.push(1);
  //         }else{
  //           ids5.push(stateproduct.data[j].packagingquantity);
  //         }
  //       }
  //     }

  //   }

  //   props.updateSelectCustomeArray(changedWarehouseid,openPackageType,ids5);
  //   props.handleNextPage("sendInventoryPromotional");
  // };

  var flag = false;

  const handleChangeCheckbox = (data, ID ,isrow) => {
    if (shipmentId !== 0) {
      if (event.target.checked == true || isrow === true) {
        NewSelectedPromotionalrow.map((item, index) => {
          console.log(NewSelectedPromotionalrow[index].packagingId == ID);

          if (NewSelectedPromotionalrow[index].packaggingId == ID) {
            console.log("true");
            NewSelectedPromotionalrow.splice(index, 1);
            NewSelectedPromotionalrow = NewSelectedPromotionalrow;
            console.log(NewSelectedPromotionalrow);
            console.log("DeleItem=====");
          }
        });
        NewSelectedPromotionalrow.push(data);
        console.log(NewSelectedPromotionalrow);
        console.log("pushItem====");
        AsyncStorage.setItem(
          "NewSelectedPromotionalrowData",
          JSON.stringify(NewSelectedPromotionalrow)
        );
      } else {
        console.log("else part");
        NewSelectedPromotionalrow.map((item, index) => {
          console.log(NewSelectedPromotionalrow[index].packagingId == ID);

          if (NewSelectedPromotionalrow[index].packaggingId == ID) {
            console.log("true");
            NewSelectedPromotionalrow.splice(index, 1);
            NewSelectedPromotionalrow = NewSelectedPromotionalrow;
            console.log(NewSelectedPromotionalrow);
            console.log("DeleItem=====");
          }
        });
        AsyncStorage.setItem(
          "NewSelectedPromotionalrowData",
          JSON.stringify(NewSelectedPromotionalrow)
        );
      }
    } else {
      if (event.target.checked == true || isrow === true) {
        SelectPromotional.map((item, index) => {
          if (SelectPromotional[index].packaggingId == ID) {
            SelectPromotional.splice(index, 1);
            SelectPromotional = SelectPromotional;
          }
        });
        SelectPromotional.push(data);

        AsyncStorage.setItem(
          "SelectPromotional",
          JSON.stringify(SelectPromotional)
        );
      } else {
        SelectPromotional.map((item, index) => {
          if (SelectPromotional[index].packaggingId == ID) {
            SelectPromotional.splice(index, 1);
            SelectPromotional = SelectPromotional;
          }
        });
        AsyncStorage.setItem(
          "SelectPromotional",
          JSON.stringify(SelectPromotional)
        );
      }
    }

    if (ids.length === 0) {
      ids.push(data.packaggingId);
    } else {
      for (let i = 0; i < ids.length; i++) {
        if (data.packaggingId !== ids[i]) {
          //ids.push(data);
          flag = true;
        } else {
          flag = false;
          break;
        }
      }
      if (flag === true) {
        ids.push(data.packaggingId);
      } else {
        const index = ids.indexOf(data.packaggingId);
        if (index > -1) {
          ids.splice(index, 1);
        }
      }
    }

    if (ids3.length === 0) {
      ids3.push(data.packaggingtypeId);
    } else {
      for (let i = 0; i < ids3.length; i++) {
        if (data.packaggingtypeId !== ids3[i]) {
          //ids.push(data);
          flag = true;
        } else {
          flag = false;
          break;
        }
      }
      if (flag === true) {
        ids3.push(data.packaggingtypeId);
      } else {
        const index = ids3.indexOf(data.packaggingtypeId);
        if (index > -1) {
          ids3.splice(index, 1);
        }
      }
    }
    const updatedaray = [...ids];
    const updatedaray1 = [...ids3];

    setchangedWarehouseid(updatedaray);
    setchangePackageType(updatedaray1);

    setState({
      columns: [
        {
          title: "",
          render: (rowData) => (
            <FormGroup>
              <FormControlLabel
                style={popUpStyle.checkboxPosition}
                control={
                  <Checkbox
                    id={rowData.packaggingId}
                    checked={(() => {
                      for (let i = 0; i < ids.length; i++) {
                        if (editRoleData !== null) {
                          if (editRoleData.moduleinfo !== 0) {
                            if (rowData.packaggingId === parseInt(ids[i])) {
                              return true;
                            }
                          } else {
                            if (rowData.packaggingId === parseInt(ids[i])) {
                              return true;
                            }
                          }
                        } else {
                          if (rowData.packaggingId === parseInt(ids[i])) {
                            return true;
                          }
                        }
                      }
                    })()}
                    onChange={() => {
                      handleChangeCheckbox(rowData, rowData.packaggingId,false);
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
            </FormGroup>
          ),
        },
      
        {
          title: "SKU",
          field: "assignSku",
          type: "text",
          render: (rowData) => (
            <FormControlLabel
              onClick={() => {
                handleChangeCheckbox(rowData, rowData.packaggingId,true);
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
                    {rowData.assignSku === null ? "no sku" : rowData.assignSku}
                  </Text>
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
                handleChangeCheckbox(rowData, rowData.packaggingId,true);
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
                    {rowData.packaggingName}
                  </Text>
                </Typography>
              }
            />
          ),
        },
        {
          title: "Current Qty",
          field: "packagingquantity",
          type: "numeric",
          render: (rowData) => (
            <FormControlLabel
              onClick={() => {
                handleChangeCheckbox(rowData, rowData.packaggingId,true);
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
                  {shipmentId !== 0 ? (
                    <Text
                      style={{
                        fontSize: "11px",
                        fontFamily:
                          '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                        transition: "all 0.25s",
                      }}
                    >
                      {rowData.packagingquantity === null
                        ? "0"
                        : rowData.packagingquantity}
                    </Text>
                  ) : (
                    <Text
                      style={{
                        fontSize: "11px",
                        fontFamily:
                          '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                        transition: "all 0.25s",
                      }}
                    >
                      {rowData.packagingquantity === null
                        ? "0"
                        : rowData.packagingquantity}
                    </Text>
                  )}
                </Typography>
              }
            />
          ),
        },
     //    { title: 'Current Qty', field: 'losangelesstock1',type: 'text',editable: 'never',
     //    render: rowData => <Text>
     //      {(() => {
     //        if(rowData!==undefined){
     //         if(rowData.torontostock!==null && rowData.losangelesstock!==null)
     //         {
     //
     //  return(
     //    <FormControlLabel
     //
     //    onClick={()=>{handleChangeCheckbox(rowData, rowData.packaggingId)}}
     //    className={classes.quantitycss}
     //    control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
     //    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
     //
     //    <Text style={{ fontSize: '11px',
     //    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
     //    transition : 'all 0.25s',}}>{parseInt(rowData.losangelesstock)+parseInt(rowData.torontostock)}</Text>
     //
     //    </Typography>}
     //    />
     //  )
     //
     //         }
     //         else if(rowData.torontostock ===null && rowData.losangelesstock!==null)
     //         {
     //
     //  return(
     //    <FormControlLabel
     //
     //    onClick={()=>{handleChangeCheckbox(rowData, rowData.packaggingId)}}
     //    className={classes.quantitycss}
     //    control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
     //    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
     //
     //    <Text style={{ fontSize: '11px',
     //    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
     //    transition : 'all 0.25s',}}>{parseInt(rowData.losangelesstock)}</Text>
     //
     //    </Typography>}
     //    />
     //  )
     //
     //         }
     //         else if(rowData.torontostock ===null && rowData.losangelesstock===null)
     //         {
     //
     //  return(
     //    <FormControlLabel
     //
     //    onClick={()=>{handleChangeCheckbox(rowData, rowData.packaggingId)}}
     //    className={classes.quantitycss}
     //    control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
     //    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
     //
     //    <Text style={{ fontSize: '11px',
     //    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
     //    transition : 'all 0.25s',}}>0</Text>
     //
     //    </Typography>}
     //    />
     //  )
     //
     //         }
     //         else if(rowData.torontostock !==null && rowData.losangelesstock===null)
     //         {
     //
     //  return(
     //    <FormControlLabel
     //
     //    onClick={()=>{handleChangeCheckbox(rowData, rowData.packaggingId)}}
     //    className={classes.quantitycss}
     //    control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
     //    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
     //
     //    <Text style={{ fontSize: '11px',
     //    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
     //    transition : 'all 0.25s',}}>{parseInt(rowData.torontostock)}</Text>
     //
     //    </Typography>}
     //    />
     //  )
     //
     //         }
     //        }
     //
     //           })()}
     //     </Text>
     //
     // },
      ],
    });
  };

  const handleCallbackfunction = () => {
    props.backButtonRouting(8);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const showToast = (open, msg, type) => {
    return (
      <Toast open={open} handleClose={handleClose} type={type} msg={msg} />
    );
  };

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
            </Link>
            <Text style={popUpStyle.breadCrundCss}> SEND INVENTORY /</Text>
            <Text style={popUpStyle.breadCrundCss2}>
              {" "}
              Promotional Inserts {"\n"}{" "}
            </Text>
          </Grid>
          <Grid item lg={2} />
        </Grid>
      </View>

      <View style={popUpStyle.paddingSide}>
        <Grid justify="center">
          <ProgressBar loading={loading} />
        </Grid>

        <Grid container justify="space-between" spacing={2}>
          {/* <Grid item xs={12} md={4} lg={4}>
<Text style={{ fontSize: '13px',
fontWeight: '700',
// marginLeft:'10px',
fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
color: '#001737',

transition : 'all 0.25s',}}>

  Select Promotional Inserts</Text>
  </Grid> */}
          <Grid item xs={12} md={4} lg={4} />
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
                    handleCallbackfunction();
                  }}
                >
                  Back
                </ColorButton>
                &nbsp;&nbsp;
              </Grid>
              <Grid>
                <ColorButton
                  size="large"
                  variant="contained"
                  color="primary"
                  className={classes.profileMargin}
                  //onClick={()=>{handleCallbackfunction()}}
                  onClick={() => {
                    onNextfunction();
                  }}
                >
                  Next
                </ColorButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <MaterialTable
        style={{ padding: "0px",marginTop: '10px'}}
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
              Select Promotional Inserts
            </Text>
          }
          columns={state.columns}
          data={stateproduct.data}
          icons={tableIcons}
          components={{
            Container: (props) => <Paper {...props} elevation={0} />,

            Toolbar: (props) => <StyledMTableToolbar {...props} />,
          }}
          localization={{
            header: {
              actions: "ACTION",
            },
            toolbar: {
              searchPlaceholder: "Search Promotional Inserts",
            },
          }}

          actions={[
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
          //     icon: () => <RefreshIcon style={{ backgroundColor:'#33cc00',color:'#fff',borderRadius : '3px',margin:'3px',}}/>,
          //   tooltip: 'Refresh',
          //   isFreeAction: true,
          //   onClick: (event) =>   fetchCustomePackageingList()
          // }
          ]}


          options={{
            paging: false,
            maxBodyHeight: 410,
            doubleHorizontalScroll: true,
            headerStyle: { position: "sticky", top: 0 },
            pageSize: 7,
            pageSizeOptions: [6, 12, 18, 20, 30, 40, 50, 60, 70, 80, 90, 100],
            showTitle: true,
            selection: false,
            showSelectAllCheckbox: false,
            showTextRowsSelected: false,
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
              paddingTop: 0,
              paddingBottom: 0,
              paddingRight: 0,
            },
            search: true,
            exportButton: false,
            selectionProps: (rowData) => ({
              // checked: rowData.customproductId === changedWarehouseid,
              // color: 'primary'
            }),
          }}
          onSelectionChange={(rows) => {
            //handleChangeCheckbox(rows);
          }}

          // editable={{
          //
          //         onRowUpdate: (newData, oldData) =>
          //           new Promise((resolve, reject) => {
          //             setTimeout(() => {
          //               {
          //
          //                 //const data = dataproduct;
          //                 const data = stateproduct.data;
          //                 const index = data.indexOf(oldData);
          //                 // data[index] = newData;
          //                 // setState({ data }, () => resolve());
          //
          //                 const packaggingId=stateproduct.data[index].packaggingId;
          //                 console.log("customproduct_id", packaggingId);
          //                 console.log("index", index);
          //                 setStateproduct((prevState) => {
          //           const data = [...prevState.data];
          //           data[data.indexOf(oldData)] = newData;
          //           return { ...prevState, data };
          //         });
          //               //updataExistsPackaging(packaggingId,newData.assignSku,newData.packaggingName,stateproduct.data[index].torontostock,stateproduct.data[index].losangelesstock,newData,oldData);
          //               }
          //               resolve();
          //             }, 1000);
          //           }),
          //       }}
        />
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