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
} from "react-native";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import PropTypes from "prop-types";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepConnector from "@material-ui/core/StepConnector";
import InputBase from "@material-ui/core/InputBase";
import StepButton from "@material-ui/core/StepButton";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import * as shiphypeservice from "../ShipService/shiphype_service";
import Switch from "@material-ui/core/Switch";
import MaterialTable, { MTableToolbar } from "material-table";
import { forwardRef } from "react";
import Paper from "@material-ui/core/Paper";
import Toast from "./Toast";
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
import ProgressBar from "./ProgressBar";
import AddIcon from "@material-ui/icons/Add";
import popStyle from ".././style/popUpStyle";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

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
      ADD ITEM
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


const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-52% + 16px)',
    right: 'calc(48% + 16px)',
  },
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
  profileMargin10: {},

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
    height: "60%",
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

const StyledMTableToolbar = withStyles({
  root: {
    paddingLeft: 0,
    paddingRight: 0,
  },
})(MTableToolbar);

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
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
      <Grid item container xs={12} lg={12}></Grid>{" "}
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
    "Return Settings",
    "Import Products",
    "Import Customers",
  ];
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
/**
 * Description:This function is used for Slide17
 * @param {*} props
 */
export default function Slide17(props) {
  const classes = useStyles();
  const { openCustomePackaging } = props;
  const [activeStep, setActiveStep] = React.useState(2);
  const steps = getSteps();
  const [dataproduct, setDataProduct] = React.useState([]);
  const [stepDone, setStepDone] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [type, setType] = React.useState("");
  const [open1, setOpen1] = React.useState(false);
  const [state1, setState1] = useState({
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal } = state1;
  const userid = props.user_id;
  

  const validate = {
    assignSku: (s) => (s.length > 0 ? "" : "SKU must be filled."),
    packaggingName: (s) => (s.length > 0 ? "" : "Name must be filled."),
  };



  const editComponent = ({ onChange, value, ...rest }) => {
    const [currentValue, setValue] = useState(value);
    const [error, setError] = useState("");
    const change = (e) => {
      const newValue = e.target.value;
      setValue(newValue);
      const errorMesasge = validate[rest.columnDef.field](newValue);
      setError(errorMesasge);
      if (!errorMesasge) {
        onChange(newValue);
      }
    };
    return (
      <TextField
        {...rest}
        error={error}
        helperText={error}
        value={currentValue}
        onChange={change}
      />
    );
  };

  
  const theme = useTheme();
  const [state, setState] = React.useState({
    columns: [
      {
        title: "ASSIGN NAME",
        field: "packaggingName",
        type: "text",
        editComponent,
      },
      { title: "ASSIGN SKU", field: "assignSku", type: "text", editComponent },

      {
        title: "TYPE",
        field: "packaggingtypeId",
        lookup: { 1: "Custom Packaging", 2: "Promotional Inserts" },
      },
    ],
    // data: [
    //   { itemsku: 'LS-00001', itemname: 'Polymer bag shiny', type: 1 },
    //   { itemsku: 'LS-00002', itemname: 'Brochure', type: 1 },

    // ],
  });

  React.useEffect(() => {
    fetchCustomePackageingList();
  }, []);

  const fetchCustomePackageingList = () => {
    //  const userid=5;
    setLoading(true);
    var packagin=[];
    shiphypeservice
      .fetchCustomePaching(userid)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          if(response.data.length !== 0){
            for(let i=0; i<response.data.length; i++){
if(response.data[i].packagingtype !== "default"){
  packagin.push(response.data[i]);
}
            }
          }
          setDataProduct(packagin);
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
 
  const deleteCustomePacking = (packagging_id) => {
    shiphypeservice
      .deleteCustomePacking(packagging_id)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          fetchCustomePackageingList();
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
  const addNewPackaging = (itemsku, itemname, type) => {
    if (itemsku === undefined) {
      setOpen1(true);
    } else {
      shiphypeservice
        .addCustomePacking(itemsku, itemname, type, userid)
        .then((response) => {
          console.log("status", response.status);
          if (response.status === true) {
            setOpen(true);
            setType("success");
            setMsg(response.message);
            setStatus(response.status);
            setLoading(false);

            fetchCustomePackageingList();
          } else {
            setOpen(true);
            setType("success");
            setMsg(response.message);
            setStatus(response.status);
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
    packaggingtypeid
  ) => {
    shiphypeservice
      .updatePackageing(
        packagging_id,
        assignsku,
        packaggingname,
        packaggingtypeid,
        userid
      )
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);

          fetchCustomePackageingList();
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

  

  /*
   * Description:To do close poup after successfully create sprint and on click cancel button
   * @param {*} issprintCreate
   */
  const handleClose1 = (isSprintCreate) => {
    props.handleSprintCancel(isSprintCreate);
  };

  /**
   * Description:To do call function on next button
   * @param {*} isSprintCreate
   */

  const addStepStatus = () => {
   
    // if(dataproduct.length > 0 && dataproduct.length <2){
      const shiphypesubsubstepId = 7;
      const shiphypesubstepId = 0;
      const shiphypestepId = 0;
      setLoading(true);
      shiphypeservice
        .addUserStepDoneSofar(
          userid,
          shiphypesubsubstepId,
          shiphypesubstepId,
          shiphypestepId
        )
        .then((response) => {
          console.log("status", response.status);
          if (response.status === true) {
            setLoading(false);
            handleNextPage(9);
          } else {
            setLoading(false);
            console.log("message", response.message);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    // }else{
    //   handleNextPage(9);
    // }
    
  };

  const handleNextPage = (isSprintCreate) => {
    props.handleNextPage(isSprintCreate);
    //props.handleNext(isSprintCreate);
  };
  /**
   * Description:To do call function on back button
   * @param {*} isSprintCreate
   */
  const handlePreviousPage = (isSprintCreate) => {
    props.handlePreviousPage(isSprintCreate);
    //props.handleNext(isSprintCreate);
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
    }
    else if (index === 5) {
      props.handleStepPage(6);
    }
  };
  let screenWidth = Dimensions.get("window").width;

  return (
    <View>
      <Dialog
        maxWidth="md"
        fullWidth={true}
        className={classes.dialog}
        onClose={() => {
          handleClose1(false);
        }}
        aria-labelledby="customized-dialog-title"
        open={openCustomePackaging}
      >
        <Grid item xs={12}>
          {(() => {
            if (screenWidth > 690) {
              return (
                <View>
                  <Stepper
                    activeStep={activeStep}
                    alternativeLabel
                    connector={<QontoConnector />}
                  >
                    {steps.map((label, index) => (
                      <Step key={label}>
                        <StepButton
                          onClick={() => {
                            handleStepClick(index);
                          }}
                        >
                          <Text style={popStyle.stepperCss}>{label}</Text>
                        </StepButton>
                      </Step>
                    ))}
                  </Stepper>
                </View>
              );
            }
          })()}
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

        <DialogContent style={{ width: "96%", margin: "auto" }}>
          {(() => {
            if (screenWidth < 690) {
              return (
                <View>
                  <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((label, index) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </View>
              );
            }
          })()}
          <Grid justify="center">
            <ProgressBar loading={loading} />
          </Grid>
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            key={`${vertical},${horizontal}`}
            open={open1}
            autoHideDuration={3000}
            onClose={handleClose3}
          >
            <Alert onClose={handleClose3} severity="error">
              Assign SKU must be filled.
            </Alert>
          </Snackbar>
          
          <form className={classes.form}>
            <Grid container className={classes.root} spacing={1}>
              <Grid item xs={12} lg={12}>
                {/* <ScrollView> */}
                <View>
                  <MaterialTable
                    title={
                      <Text
                        style={{
                          fontSize: "13px",
                          // fontWeight: '700',
                          fontFamily:
                            '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                          color: "#001737",

                          transition: "all 0.25s",
                        }}
                      >
                        Add Custom Packaging or Promotional Inserts
                      </Text>
                    }
                    columns={state.columns}
                    data={dataproduct}
                    icons={tableIcons}
                    components={{
                      Container: (props) => <Paper {...props} elevation={0} />,
                      Toolbar: (props) => <StyledMTableToolbar {...props} />,
                    }}
                    localization={{
                      header: {
                        actions: "ACTION",
                      },
                    }}
                    options={{
                      paging: false,
                      maxBodyHeight: '55vh',
                    //  doubleHorizontalScroll: true,
                      headerStyle: { position: 'sticky', top: 0 },
                      addRowPosition: 'first',
                      actionsColumnIndex: -1,
                      exportFileName: "Product Table",
                      headerStyle: {
                          backgroundColor: '#cccccc',
                          color: '#000',
                         
              
                          width: 15,
                          whiteSpace: 'nowrap',
                          textAlign: 'left',
                          flexDirection: 'row',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          paddingLeft: 5,
                          paddingTop:8,
                          paddingBottom:8,
                          paddingRight: 0,
                          fontSize:'12px',
                     //     backgroundColor: theme.palette.primary.table,
                         fontWeight: 'bold',
                        //color: theme.palette.primary.main,
                      },
                      cellStyle: {
                        backgroundColor: "#fff",
                        color: "#000",
                        border: "1px solid #cccccc",

                        width: 15,
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
                      search: false,
                      exportButton: false,
                    }}
                    editable={{
                      onRowAdd: (newData) =>
                        new Promise((resolve, reject) => {
                          setTimeout(() => {
                            {  if (newData.packaggingName===undefined)
                              {
                                setOpen(true);
                                          setType('error');
                                          setMsg("Name must be filled.");
                                          reject();
                                          return;
                              }
                             else if (newData.assignSku===undefined)
                              {
                                setOpen(true);
                                          setType('error');
                                          setMsg("SKU must be filled.");
                                          reject();
                                          return;
                              }
                              else{
                              console.log("sku", newData.assignSku);
                              console.log("name", newData.packaggingName);
                              addNewPackaging(
                                newData.assignSku,
                                newData.packaggingName,
                                newData.packaggingtypeId
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
                              if (newData.packaggingName==='')
                              {
                                setOpen(true);
                                          setType('error');
                                          setMsg("Name must be filled.");
                                          reject();
                                          return;
                              }
                             else if (newData.assignSku==='')
                              {
                                setOpen(true);
                                          setType('error');
                                          setMsg("SKU must be filled.");
                                          reject();
                                          return;
                              }
                              else{
                             const data = dataproduct;
                              const index = data.indexOf(oldData);
                              
                              const packaggingId =
                                dataproduct[index].packaggingId;
                              updataExistsPackaging(
                                packaggingId,
                                newData.assignSku,
                                newData.packaggingName,
                                newData.packaggingtypeId
                              );
                              }
                            }
                            resolve();
                          }, 1000);
                        }),
                      onRowDelete: (oldData) =>
                        new Promise((resolve, reject) => {
                          setTimeout(() => {
                            {
                              const data = dataproduct;
                              const index = data.indexOf(oldData);
                              const packaggingId =
                                dataproduct[index].packaggingId;
                              deleteCustomePacking(packaggingId);
                            }
                            resolve();
                          }, 1000);
                        }),
                    }}
                  />
                  {showToast(open, msg, type)}
                </View>
                {/* </ScrollView> */}
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Grid justify="flex-end" container spacing={1}>
            <Grid item>
              <ColorButton
                size="large"
                variant="contained"
                color="primary"
                className={classes.profileMargin}
                onClick={() => {
                  handlePreviousPage(7);
                }}
              >
                Back
              </ColorButton>
              &nbsp;&nbsp;
              <ColorButton
                size="large"
                variant="contained"
                color="primary"
                className={classes.profileMargin}
                onClick={() => {
                  addStepStatus();
                }}
              >
                NEXT
              </ColorButton>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </View>
  );
}

Slide17.propTypes = {
  openCustomePackaging: PropTypes.bool,
  handleSprintCancel: PropTypes.func,
  handleNextPage: PropTypes.func,
};
