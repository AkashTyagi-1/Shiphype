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
import Typography from "@material-ui/core/Typography";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
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
    height: "98%",
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

  const [stateproduct, setStateproduct] = React.useState({
    data: [],
  });

  var ids = [];
  var ids2 = [];
  var ids3 = [];

  const theme = useTheme();
  const [state, setState] = React.useState({
    selectproduct: false,
    columns: [
      {
        title: "Checkbox",
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
          </FormGroup>
        ),
      },
      {
        title: "ShipHype Internal ID",
        field: "packaggingId",
        type: "text",
        editable: "never",hidden:true,
        render: rowData =><FormControlLabel
         
           onClick={()=>{handleChangeCheckbox(rowData)}}
           className={classes.quantitycss}
           control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
         fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
         fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
         transition : 'all 0.25s',}}>{rowData.packaggingId}</Text>
               
             </Typography>}
         />  
      },
      { title: "SKU", field: "assignSku", type: "text",render: rowData =><FormControlLabel
         
      onClick={()=>{handleChangeCheckbox(rowData)}}
      className={classes.quantitycss}
      control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
    transition : 'all 0.25s',}}>{(rowData.assignSku === null ? "no sku" : rowData.assignSku )}</Text>
          
        </Typography>}
    />   },
      { title: "Name", field: "packaggingName", type: "text",render: rowData =><FormControlLabel
         
      onClick={()=>{handleChangeCheckbox(rowData)}}
      className={classes.quantitycss}
      control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
    transition : 'all 0.25s',}}>{rowData.packaggingName}</Text>
          
        </Typography>}
    />   },
      {
        title: "Qty",
        field: "packagingquantity",
        type: "numeric",
        render: rowData =><FormControlLabel
         
           onClick={()=>{handleChangeCheckbox(rowData)}}
           className={classes.quantitycss}
           control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
         fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
         fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
         transition : 'all 0.25s',}}>{(rowData.packagingquantity === null ? '0' : rowData.packagingquantity )}</Text>
               
             </Typography>}
         />  
      },
    ],
  });

  React.useEffect(() => {
    fetchCustomePackageingList();
  }, []);

  const fetchCustomePackageingList = () => {
    //  const userid=5;
    setLoading(true);
    shiphypeservice
      .fetchCustomePaching(userid, 1)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          setDataProduct(response.data);

          setStateproduct((prevState) => {
            const data = [...prevState.data];

            for (let i = 0; i < response.data.length; i++) {
              if(response.data[i].packagingtype !== "default"){
                data.push(response.data[i]);
              }
            }

            return { ...prevState, data };
          });

          if (shipmentId !== 0) {
            fetchArrangeShip(shipmentId);
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
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          if (response.data.length !== 0) {
            if (response.data[0].getshippingpackaging.length !== 0) {
              for (
                let i = 0;
                i < response.data[0].getshippingpackaging.length;
                i++
              ) {
                ids.push(response.data[0].getshippingpackaging[i].packagingId);
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

              const updatedaray1 = [...ids3];

              setchangePackageType(updatedaray1);

              setState({
                columns: [
                  {
                    title: "Checkbox",
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
                      </FormGroup>
                    ),
                  },
                  {
                    title: "ShipHype Internal ID",
                    field: "packaggingId",
                    type: "text",
                    editable: "never",hidden:true,
                    render: rowData =><FormControlLabel
                     
                       onClick={()=>{handleChangeCheckbox(rowData)}}
                       className={classes.quantitycss}
                       control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
                     fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
            
            <Text style={{ fontSize: '11px', 
                     fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                     transition : 'all 0.25s',}}>{rowData.packaggingId}</Text>
                           
                         </Typography>}
                     />  
                  },
                  { title: "SKU", field: "assignSku", type: "text",render: rowData =><FormControlLabel
                     
                  onClick={()=>{handleChangeCheckbox(rowData)}}
                  className={classes.quantitycss}
                  control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
            
            <Text style={{ fontSize: '11px', 
                fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                transition : 'all 0.25s',}}>{(rowData.assignSku === null ? "no sku" : rowData.assignSku )}</Text>
                      
                    </Typography>}
                />   },
                  { title: "Name", field: "packaggingName", type: "text",render: rowData =><FormControlLabel
                     
                  onClick={()=>{handleChangeCheckbox(rowData)}}
                  className={classes.quantitycss}
                  control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
            
            <Text style={{ fontSize: '11px', 
                fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                transition : 'all 0.25s',}}>{rowData.packaggingName}</Text>
                      
                    </Typography>}
                />   },
                  {
                    title: "Qty",
                    field: "packagingquantity",
                    type: "numeric",
                    render: rowData =><FormControlLabel
                     
                       onClick={()=>{handleChangeCheckbox(rowData)}}
                       className={classes.quantitycss}
                       control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
                     fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
            
            <Text style={{ fontSize: '11px', 
                     fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                     transition : 'all 0.25s',}}>{(rowData.packagingquantity === null ? '0' : rowData.packagingquantity )}</Text>
                           
                         </Typography>}
                     />  
                  },
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


  const updataExistsPackaging = (packagging_id,assignsku,packaggingname,tor,los,newData,oldData)=>{
    setLoading(true);
              
    shiphypeservice.updatePackageing1(packagging_id,assignsku,packaggingname,1,tor,los,userid)
    .then(response => {
     console.log("status",response.status);
          if(response.status === true) {
            setLoading(false);
            setStateproduct((prevState) => {
              const data = [...prevState.data];
              data[data.indexOf(oldData)] = newData;
              return { ...prevState, data };
            });
                     }else{
                      setLoading(false);
                      console.log("message",response.message);
                     }   
        }).catch((error) =>{
              console.error(error);
        });
  }
  
  const onNextfunction = () => {
    console.log("product", changedWarehouseid.length);
    var ids5 = [];
    for (let i = 0; i < changedWarehouseid.length; i++) {
      console.log("productid", changedWarehouseid[i]);
      for(let j=0;j<stateproduct.data.length;j++){
        if(changedWarehouseid[i] === stateproduct.data[j].packaggingId){
          if(stateproduct.data[j].packagingquantity === null){
            ids5.push(1);
          }else{
            ids5.push(stateproduct.data[j].packagingquantity);
          }
        }
      }
      
    }

   // props.updateSelectCustomeArray(changedWarehouseid,openPackageType,ids5);
    props.handleNextPage("select_tranfer_inventoryPromoyinal");
  };



  var flag = false;
  const handleChangeCheckbox = (data) => {
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
          title: "Checkbox",
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
            </FormGroup>
          ),
        },
        {
          title: "ShipHype Internal ID",
          field: "packaggingId",
          type: "text",
          editable: "never",hidden:true,
          render: rowData =><FormControlLabel
           
             onClick={()=>{handleChangeCheckbox(rowData)}}
             className={classes.quantitycss}
             control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
           fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
  
  <Text style={{ fontSize: '11px', 
           fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
           transition : 'all 0.25s',}}>{rowData.packaggingId}</Text>
                 
               </Typography>}
           />  
        },
        { title: "SKU", field: "assignSku", type: "text",render: rowData =><FormControlLabel
           
        onClick={()=>{handleChangeCheckbox(rowData)}}
        className={classes.quantitycss}
        control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
  
  <Text style={{ fontSize: '11px', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
      transition : 'all 0.25s',}}>{(rowData.assignSku === null ? "no sku" : rowData.assignSku )}</Text>
            
          </Typography>}
      />   },
        { title: "Name", field: "packaggingName", type: "text",render: rowData =><FormControlLabel
           
        onClick={()=>{handleChangeCheckbox(rowData)}}
        className={classes.quantitycss}
        control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
  
  <Text style={{ fontSize: '11px', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
      transition : 'all 0.25s',}}>{rowData.packaggingName}</Text>
            
          </Typography>}
      />   },
        {
          title: "Qty",
          field: "packagingquantity",
          type: "numeric",
          render: rowData =><FormControlLabel
           
             onClick={()=>{handleChangeCheckbox(rowData)}}
             className={classes.quantitycss}
             control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
           fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
  
  <Text style={{ fontSize: '11px', 
           fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
           transition : 'all 0.25s',}}>{(rowData.packagingquantity === null ? '0' : rowData.packagingquantity )}</Text>
                 
               </Typography>}
           />  
        },
      ],
    });
  };

  const handleCallbackfunction = () => {
    props.backButtonRouting('select_transfer_inventory');
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
            <Text style={popUpStyle.breadCrundCss}> TRANSFER INVENTORY /</Text>
            <Text style={popUpStyle.breadCrundCss2}>
              {" "}
              CUSTOM PACKAGING {"\n"}{" "}
            </Text>
          </Grid>
          <Grid item lg={2}></Grid>
        </Grid>
      </View>

      <View style={popUpStyle.paddingSide}>
        <Grid justify="center">
          <ProgressBar loading={loading} />
        </Grid>

        <Grid container justify="space-between" spacing={2}>
          {/* <Grid item xs={12} md={4} lg={4}>
            <Text
              style={{
                fontSize: "13px",
                fontWeight: "700",
                // marginLeft:'10px',
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                color: "#001737",

                transition: "all 0.25s",
              }}
            >
              Select Custom Packaging
            </Text>
          </Grid> */}
          <Grid item xs={12} md={4} lg={4}></Grid>
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
                  //className={classes.profileMargin}
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
                  //className={classes.profileMargin}
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
              Select Custom Packaging
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
              searchPlaceholder: "Search Packaging",
            },
          }}
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
            handleChangeCheckbox(rows);
          }}

          // editable={{
            
          //   onRowUpdate: (newData, oldData) =>
          //     new Promise((resolve, reject) => {
          //       setTimeout(() => {
          //         {
                   
          //           //const data = dataproduct;
          //           const data = stateproduct.data;
          //           const index = data.indexOf(oldData);
          //           // data[index] = newData;
          //           // setState({ data }, () => resolve());

          //           const packaggingId=stateproduct.data[index].packaggingId;
          //           console.log("customproduct_id", packaggingId);
          //           console.log("index", index);
                    
          //         updataExistsPackaging(packaggingId,newData.assignSku,newData.packaggingName,stateproduct.data[index].torontostock,stateproduct.data[index].losangelesstock,newData,oldData);
          //         }
          //         resolve();
          //       }, 1000);
          //     }),
          // }}
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
