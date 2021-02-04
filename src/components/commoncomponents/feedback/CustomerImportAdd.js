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
import * as shiphypeservice from "../ShipService/shiphype_service";
import Typography from "@material-ui/core/Typography";
import popStyle from ".././style/popUpStyle";
import MaterialTable, { MTableToolbar } from "material-table";
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
import { forwardRef } from "react";
import Paper from "@material-ui/core/Paper";
import Toast from "./Toast";
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
  quantitycss:{
    width:'90%',
    fontSize:'6px',
    cursor:'pointer',
    underline: {
     "&&&:before": {
       borderBottom: "none"
     },
     "&&:after": {
       borderBottom: "none"
     }
   } 
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
      <Grid item xs={12}>
        {/* <Typography
          justify="center"
          variant="body1"
          style={{
            fontSize: "14px",
            //fontWeight: '700',
            marginLeft: "10px",
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
          }}
        >
          Select Customer from Integration
        </Typography> */}
      </Grid>
    </MuiDialogTitle>
  );
});
function getSteps() {
  return [
    "Marketplace Integration",
    "Shipping Profile",
    "Return Settings",
    "Import Products",
    "Import Customers",
  ];
}
/**
 * Description:This function is used for CreateSprint for sprint
 * @param {*} props
 */
export default function CreateSprint(props) {
  const classes = useStyles();
  //const {openCreateSprint}= props;
  const { opencustomerimportadd } = props;
  const dataproduct = props.importData;
  const wodata = props.importCustData;
  const integrationid = props.selectintegration;
  const userid = props.user_id;
  const [activeStep, setActiveStep] = React.useState(3);
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

  const StyledMTableToolbar = withStyles({
    root: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  })(MTableToolbar);
  const [loading, setLoading] = React.useState(false);

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

  const steps = getSteps();

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
      { title: "Customer ID", field: "id", type: "text",
      render: rowData =><FormControlLabel
         
      onClick={()=>{handleChangeCheckbox(rowData)}}
      className={classes.quantitycss}
      control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
    transition : 'all 0.25s',}}>{rowData.id}</Text>
          
        </Typography>}
    />  
     },
      { title: "First Name", field: "first_name", type: "text",render: rowData =><FormControlLabel
         
      onClick={()=>{handleChangeCheckbox(rowData)}}
      className={classes.quantitycss}
      control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
    transition : 'all 0.25s',}}>{rowData.first_name}</Text>
          
        </Typography>}
    />   },

      { title: "Last Name", field: "last_name", type: "text",
      render: rowData =><FormControlLabel
         
      onClick={()=>{handleChangeCheckbox(rowData)}}
      className={classes.quantitycss}
      control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
    transition : 'all 0.25s',}}>{rowData.last_name}</Text>
          
        </Typography>}
    />   },
      { title: "Phone", field: "phone", type: "text" ,
      render: rowData =><FormControlLabel
         
      onClick={()=>{handleChangeCheckbox(rowData)}}
      className={classes.quantitycss}
      control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
    transition : 'all 0.25s',}}>{rowData.phone}</Text>
          
        </Typography>}
    />  },

      {
        title: "Address",
        field: "addresses",
        type: "text",
        render: rowData =><FormControlLabel
         
      onClick={()=>{handleChangeCheckbox(rowData)}}
      className={classes.quantitycss}
      control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
    transition : 'all 0.25s',}}>{rowData.addresses[0].address2}</Text>
          
        </Typography>}
    />  
      },
      {
        title: "City",
        field: "addresses",
        type: "text",
        render: rowData =><FormControlLabel
         
      onClick={()=>{handleChangeCheckbox(rowData)}}
      className={classes.quantitycss}
      control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
    transition : 'all 0.25s',}}>{rowData.addresses[0].city}</Text>
          
        </Typography>}
    />  
      },

      {
        title: "PostCode",
        field: "addresses",
        type: "text",
        render: rowData =><FormControlLabel
         
      onClick={()=>{handleChangeCheckbox(rowData)}}
      className={classes.quantitycss}
      control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
    transition : 'all 0.25s',}}>{rowData.addresses[0].zip}</Text>
          
        </Typography>}
    />  
      },

      {
        title: "State",
        field: "addresses",
        type: "text",
        render: rowData =><FormControlLabel
         
      onClick={()=>{handleChangeCheckbox(rowData)}}
      className={classes.quantitycss}
      control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
    transition : 'all 0.25s',}}>{rowData.addresses[0].province}</Text>
          
        </Typography>}
    />  
      },

      {
        title: "Country",
        field: "addresses",
        type: "text",
        render: rowData =><FormControlLabel
         
      onClick={()=>{handleChangeCheckbox(rowData)}}
      className={classes.quantitycss}
      control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
    transition : 'all 0.25s',}}>{rowData.addresses[0].country}</Text>
          
        </Typography>}
    />  
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
      { title: "Customer ID", field: "id", type: "text",
      render: rowData =><FormControlLabel
         
      onClick={()=>{handleChangeCheckbox(rowData)}}
      className={classes.quantitycss}
      control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
    transition : 'all 0.25s',}}>{rowData.id}</Text>
          
        </Typography>}
    />  
    },
      { title: "First Name", field: "first_name", type: "text",
      render: rowData =><FormControlLabel
         
      onClick={()=>{handleChangeCheckbox(rowData)}}
      className={classes.quantitycss}
      control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
    transition : 'all 0.25s',}}>{rowData.first_name}</Text>
          
        </Typography>}
    />  
    },

      { title: "Last Name", field: "last_name", type: "text",
      render: rowData =><FormControlLabel
         
      onClick={()=>{handleChangeCheckbox(rowData)}}
      className={classes.quantitycss}
      control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
    transition : 'all 0.25s',}}>{rowData.last_name}</Text>
          
        </Typography>}
    />   },
      {
        title: "Phone",
        field: "billing",
        type: "text",
        render: rowData =><FormControlLabel
         
      onClick={()=>{handleChangeCheckbox(rowData)}}
      className={classes.quantitycss}
      control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
    transition : 'all 0.25s',}}>{rowData.billing.phone}</Text>
          
        </Typography>}
    />  
      },

      {
        title: "Address",
        field: "billing",
        type: "text",
        render: rowData =><FormControlLabel
         
      onClick={()=>{handleChangeCheckbox(rowData)}}
      className={classes.quantitycss}
      control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
    transition : 'all 0.25s',}}>{rowData.billing.address_1}</Text>
          
        </Typography>}
    />  
      },
      {
        title: "City",
        field: "billing",
        type: "text",
        render: rowData =><FormControlLabel
         
      onClick={()=>{handleChangeCheckbox(rowData)}}
      className={classes.quantitycss}
      control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
    transition : 'all 0.25s',}}>{rowData.billing.city}</Text>
          
        </Typography>}
    />  
      },

      {
        title: "PostCode",
        field: "billing",
        type: "text",
        render: rowData =><FormControlLabel
         
      onClick={()=>{handleChangeCheckbox(rowData)}}
      className={classes.quantitycss}
      control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
    transition : 'all 0.25s',}}>{rowData.billing.postcode}</Text>
          
        </Typography>}
    />  
      },

      {
        title: "State",
        field: "billing",
        type: "text",
        render: rowData =><FormControlLabel
         
      onClick={()=>{handleChangeCheckbox(rowData)}}
      className={classes.quantitycss}
      control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
    transition : 'all 0.25s',}}>{rowData.billing.state}</Text>
          
        </Typography>}
    />  
      },

      {
        title: "Country",
        field: "billing",
        type: "text",
        render: rowData =><FormControlLabel
         
      onClick={()=>{handleChangeCheckbox(rowData)}}
      className={classes.quantitycss}
      control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
    transition : 'all 0.25s',}}>{rowData.billing.country}</Text>
          
        </Typography>}
    />  
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
        addNewCustomer(
          userid,
          data.first_name,
          data.last_name,
          data.addresses[0].company,
          data.addresses[0].address2,
          data.addresses[0].address2,
          data.addresses[0].city,
          data.addresses[0].province,
          data.addresses[0].zip,
          data.addresses[0].country,
          data.addresses[0].phone,
          data.email,
          "1",
          data.id
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
          addNewCustomer(
            userid,
            data.first_name,
            data.last_name,
            data.addresses[0].company,
            data.addresses[0].address2,
            data.addresses[0].address2,
            data.addresses[0].city,
            data.addresses[0].province,
            data.addresses[0].zip,
            data.addresses[0].country,
            data.addresses[0].phone,
            data.email,
            "1",
            data.id
          );
        } else {
          const index = ids.indexOf(data.id);
          if (index > -1) {
            ids.splice(index, 1);
            //deleteCustomer(data.id);
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
          { title: "Customer ID", field: "id", type: "text",
          render: rowData =><FormControlLabel
             
          onClick={()=>{handleChangeCheckbox(rowData)}}
          className={classes.quantitycss}
          control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
    
    <Text style={{ fontSize: '11px', 
        fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
        transition : 'all 0.25s',}}>{rowData.id}</Text>
              
            </Typography>}
        />  
         },
          { title: "First Name", field: "first_name", type: "text",render: rowData =><FormControlLabel
             
          onClick={()=>{handleChangeCheckbox(rowData)}}
          className={classes.quantitycss}
          control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
    
    <Text style={{ fontSize: '11px', 
        fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
        transition : 'all 0.25s',}}>{rowData.first_name}</Text>
              
            </Typography>}
        />   },
    
          { title: "Last Name", field: "last_name", type: "text",
          render: rowData =><FormControlLabel
             
          onClick={()=>{handleChangeCheckbox(rowData)}}
          className={classes.quantitycss}
          control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
    
    <Text style={{ fontSize: '11px', 
        fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
        transition : 'all 0.25s',}}>{rowData.last_name}</Text>
              
            </Typography>}
        />   },
          { title: "Phone", field: "phone", type: "text" ,
          render: rowData =><FormControlLabel
             
          onClick={()=>{handleChangeCheckbox(rowData)}}
          className={classes.quantitycss}
          control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
    
    <Text style={{ fontSize: '11px', 
        fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
        transition : 'all 0.25s',}}>{rowData.phone}</Text>
              
            </Typography>}
        />  },
    
          {
            title: "Address",
            field: "addresses",
            type: "text",
            render: rowData =><FormControlLabel
             
          onClick={()=>{handleChangeCheckbox(rowData)}}
          className={classes.quantitycss}
          control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
    
    <Text style={{ fontSize: '11px', 
        fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
        transition : 'all 0.25s',}}>{rowData.addresses[0].address2}</Text>
              
            </Typography>}
        />  
          },
          {
            title: "City",
            field: "addresses",
            type: "text",
            render: rowData =><FormControlLabel
             
          onClick={()=>{handleChangeCheckbox(rowData)}}
          className={classes.quantitycss}
          control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
    
    <Text style={{ fontSize: '11px', 
        fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
        transition : 'all 0.25s',}}>{rowData.addresses[0].city}</Text>
              
            </Typography>}
        />  
          },
    
          {
            title: "PostCode",
            field: "addresses",
            type: "text",
            render: rowData =><FormControlLabel
             
          onClick={()=>{handleChangeCheckbox(rowData)}}
          className={classes.quantitycss}
          control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
    
    <Text style={{ fontSize: '11px', 
        fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
        transition : 'all 0.25s',}}>{rowData.addresses[0].zip}</Text>
              
            </Typography>}
        />  
          },
    
          {
            title: "State",
            field: "addresses",
            type: "text",
            render: rowData =><FormControlLabel
             
          onClick={()=>{handleChangeCheckbox(rowData)}}
          className={classes.quantitycss}
          control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
    
    <Text style={{ fontSize: '11px', 
        fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
        transition : 'all 0.25s',}}>{rowData.addresses[0].province}</Text>
              
            </Typography>}
        />  
          },
    
          {
            title: "Country",
            field: "addresses",
            type: "text",
            render: rowData =><FormControlLabel
             
          onClick={()=>{handleChangeCheckbox(rowData)}}
          className={classes.quantitycss}
          control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
    
    <Text style={{ fontSize: '11px', 
        fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
        transition : 'all 0.25s',}}>{rowData.addresses[0].country}</Text>
              
            </Typography>}
        />  
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
        addNewCustomer(
          userid,
          data.first_name,
          data.last_name,
          data.billing.company,
          data.billing.address_1,
          data.billing.address_1,
          data.billing.city,
          data.billing.state,
          data.billing.postcode,
          data.billing.country,
          data.billing.phone,
          data.email,
          "1",
          data.id
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
          addNewCustomer(
            userid,
            data.first_name,
            data.last_name,
            data.billing.company,
            data.billing.address_1,
            data.billing.address_1,
            data.billing.city,
            data.billing.state,
            data.billing.postcode,
            data.billing.country,
            data.billing.phone,
            data.email,
            "1",
            data.id
          );
        } else {
          const index = ids.indexOf(data.id);
          if (index > -1) {
            ids.splice(index, 1);
            deleteCustomer(data.id);
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
                        style={{
                          paddingBottom: "0px",
                          paddingTop: "0px",
                          height: "25px",
                        }}
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
          { title: "Customer ID", field: "id", type: "text",
      render: rowData =><FormControlLabel
         
      onClick={()=>{handleChangeCheckbox(rowData)}}
      className={classes.quantitycss}
      control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
    transition : 'all 0.25s',}}>{rowData.id}</Text>
          
        </Typography>}
    />  
    },
      { title: "First Name", field: "first_name", type: "text",
      render: rowData =><FormControlLabel
         
      onClick={()=>{handleChangeCheckbox(rowData)}}
      className={classes.quantitycss}
      control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
    transition : 'all 0.25s',}}>{rowData.first_name}</Text>
          
        </Typography>}
    />  
    },

      { title: "Last Name", field: "last_name", type: "text",
      render: rowData =><FormControlLabel
         
      onClick={()=>{handleChangeCheckbox(rowData)}}
      className={classes.quantitycss}
      control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
    transition : 'all 0.25s',}}>{rowData.last_name}</Text>
          
        </Typography>}
    />   },
      {
        title: "Phone",
        field: "billing",
        type: "text",
        render: rowData =><FormControlLabel
         
      onClick={()=>{handleChangeCheckbox(rowData)}}
      className={classes.quantitycss}
      control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
    transition : 'all 0.25s',}}>{rowData.billing.phone}</Text>
          
        </Typography>}
    />  
      },

      {
        title: "Address",
        field: "billing",
        type: "text",
        render: rowData =><FormControlLabel
         
      onClick={()=>{handleChangeCheckbox(rowData)}}
      className={classes.quantitycss}
      control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
    transition : 'all 0.25s',}}>{rowData.billing.address_1}</Text>
          
        </Typography>}
    />  
      },
      {
        title: "City",
        field: "billing",
        type: "text",
        render: rowData =><FormControlLabel
         
      onClick={()=>{handleChangeCheckbox(rowData)}}
      className={classes.quantitycss}
      control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
    transition : 'all 0.25s',}}>{rowData.billing.city}</Text>
          
        </Typography>}
    />  
      },

      {
        title: "PostCode",
        field: "billing",
        type: "text",
        render: rowData =><FormControlLabel
         
      onClick={()=>{handleChangeCheckbox(rowData)}}
      className={classes.quantitycss}
      control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
    transition : 'all 0.25s',}}>{rowData.billing.postcode}</Text>
          
        </Typography>}
    />  
      },

      {
        title: "State",
        field: "billing",
        type: "text",
        render: rowData =><FormControlLabel
         
      onClick={()=>{handleChangeCheckbox(rowData)}}
      className={classes.quantitycss}
      control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
    transition : 'all 0.25s',}}>{rowData.billing.state}</Text>
          
        </Typography>}
    />  
      },

      {
        title: "Country",
        field: "billing",
        type: "text",
        render: rowData =><FormControlLabel
         
      onClick={()=>{handleChangeCheckbox(rowData)}}
      className={classes.quantitycss}
      control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
    transition : 'all 0.25s',}}>{rowData.billing.country}</Text>
          
        </Typography>}
    />  
      },
        ],
      });
    }
  };

  const addNewCustomer = (
    userId,
    firstname,
    lastname,
    companyname,
    addressline1,
    addressline2,
    city,
    state,
    zip,
    country,
    phone,
    email,
    customertype,
    externalcustomer_id
  ) => {
    setLoading(true);
    shiphypeservice
      .addNewCustomerShopfy(
        userId,
        firstname,
        lastname,
        companyname,
        addressline1,
        addressline2,
        city,
        state,
        zip,
        country,
        phone,
        email,
        customertype,
        externalcustomer_id
      )
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          // setOpen(true);
          // setType("success");
          // setMsg(response.message);
          // setStatus(response.status);
          setLoading(false);
        } else {
          // setOpen(true);
          // setType("error");
          // setMsg(response.message);
          // setStatus(response.status);
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  /**
   * Description:To do delete customer
   * @param {*} customproduct_id
   */
  const deleteCustomer = (externalcustomer_id) => {
    setLoading(true);
    shiphypeservice
      .deleteIntegrationCustomer(externalcustomer_id)
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
    props.handleSprintCancel(isSprintCreate);
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

  useEffect(() => {
    // fetchShiphypeCompleteStep();
    //  fetchProductList();
  }, []);

  const fetchShiphypeCompleteStep = () => {
    //  const userid=userid;
    shiphypeservice
      .fetchStepCompleteStatus(userid)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          //setLoading(false);

          if (response.data.length !== 0) {
            for (let i = 0; i < response.data.length; i++) {
              if (response.data[i].shiphypesubstepId === 5) {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
              } else if (response.data[i].shiphypesubstepId === 6) {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
              } else if (response.data[i].shiphypesubstepId === 7) {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
              } else if (response.data[i].shiphypesubstepId === 8) {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
              } else if (response.data[i].shiphypesubstepId === 9) {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
              } else {
              }
            }
          }
        } else {
          //setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchProductList = () => {
    //const userid=5;
    setLoading(true);
    shiphypeservice
      .fetchProductList(userid)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          setDataProduct(response.data);
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
    }
    else if (index === 5) {
      props.handleStepPage(6);
    }
  };
  let screenWidth = Dimensions.get("window").width;
  return (
    <View>
      <Dialog
        fullWidth={true}
        maxWidth="xl"
        // className={classes.dialog}
        onClose={() => {
          handleClose1(false);
        }}
        open={opencustomerimportadd}
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
          {/* <View >

<Grid item  container lg={12}  >
<Grid item  lg={1} ></Grid>
<Grid item  lg={5}
style={{ marginLeft:'4px'}}
>
<Text style={popStyle.breadCrundCss}>SETUP WIZARD / IMPORT PRODUCT /</Text>
<Text style={popStyle.breadCrundCss2}> ADD PRODUCT </Text> 

</Grid>
<Grid item  lg={6} ></Grid>

</Grid>

</View> */}
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
                        <StepLabel>
                          <Text style={{ color: "#002080" }}>{label}</Text>
                        </StepLabel>
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
          <form className={classes.form}>
            <Grid container spacing={2}>
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
                               fontWeight: '700',
                              fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              color: "#001737",
    
                              transition: "all 0.25s",
                            }}
                          >
                             Select Customers to Import
                          </Text>
                        }
                        icons={tableIcons}
                        components={{
                          Container: (props) => (
                            <Paper {...props} elevation={0} />
                          ),
                          Toolbar: (props) => (
                            <StyledMTableToolbar {...props} />
                          ),
                        }}
                        localization={{
                          toolbar: {
                            searchPlaceholder: "Search Customer",
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
                            textTransform: 'uppercase',
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
                          Container: (props) => (
                            <Paper {...props} elevation={0} />
                          ),
                          Toolbar: (props) => (
                            <StyledMTableToolbar {...props} />
                          ),
                        }}
                        localization={{
                          toolbar: {
                            searchPlaceholder: "Search Customer",
                          },
                        }}
                        // onRowClick={(event, rowData) => {
                        //   handleChangeCheckbox(rowData.customproductId);
                        // }}
                        options={{
                          paging: false,
                          showTitle: false,
                          doubleHorizontalScroll: true,
              maxBodyHeight: '53vh',
              headerStyle: { position: 'sticky', top: 0 },
                          //pageSize:5,
                          //pageSizeOptions:[6, 12, 18, 20, 30, 40, 50, 60, 70, 80, 90, 100],
                          addRowPosition: "first",
                          actionsColumnIndex: -1,
                          exportFileName: "Product Table",
                          headerStyle: {
                            backgroundColor: "#cccccc",
                            color: "#000",
                            textTransform: 'uppercase',
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

                {showToast(open, msg, type)}
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
              <ColorButton
                size="large"
                variant="contained"
                color="primary"
                className={classes.profileMargin}
                onClick={() => {
                  handlePreviousPage(14);
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
                  handleNextPage(20, 17);
                }}

                //onClick={()=>{navigation.navigate('Dashboard')}}
              >
                NEXT
                {/* {language.copyandsaveobject} */}
              </ColorButton>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </View>
  );
}

CreateSprint.propTypes = {
  opencustomerimportadd: PropTypes.bool,
  handleCloseSprintPoupup: PropTypes.func,
};
