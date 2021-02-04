import React from "react";
import clsx from "clsx";
import {
  Platform,
  View,
  Image,
  Text,
  Dimensions,
  ImageBackground,
} from "react-native";
import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import PropTypes from "prop-types";
import * as shiphypeservice from "./ShipService/shiphype_service";
import popUpStyle from "./style/popUpStyle";
import Toast from "./feedback/Toast";
import ProgressBar from "./feedback/ProgressBar";

import { forwardRef } from "react";
import Paper from "@material-ui/core/Paper";
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
import MaterialTable, { MTableToolbar } from "material-table";
import DeleteCard from "./Order/updateStatusForHelp";
import AddReasonForStatus from "./Order/AddReasonForStatus";
import ShowTheReply from "./Order/ShowTheReply";
import Autocomplete from "@material-ui/lab/Autocomplete";
import RefreshIcon from "@material-ui/icons/Refresh";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { SettingsCellTwoTone } from "@material-ui/icons";
export const BASE_URL = "https://api.shiphype.com/api/";
import axios from "axios";
import ShowRequestWorkOrderAttachments from './dialog/ShowRequestWorkOrderAttachments';

const ColorButtonAdd = withStyles((theme) => ({
  root: {
    borderRadius: "3px",
    height: "100%",
    padding: "3px",
    width: "100px",
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

const tableIcons = {
  add: forwardRef((props, ref) => <Add {...props} ref={ref} />),
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
const StyledMTableToolbar = withStyles({
  root: {
    paddingLeft: 0,
    paddingRight: 0,
    fontSize: "12px",
  },
})(MTableToolbar);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },

  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
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

  button5: {
    border: " 1px solid #fff",
    borderRadius: "5px",
    height: "110%",
    width: "50%",
    color: "#fff",
    backgroundColor: "#0158d4",
    borderColor: "#0153c7",

    marginBottom: "1%",
    "&:hover": {
      backgroundColor: "#1a1aff",
      color: "#ffffff",
    },
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper1: {
    padding: theme.spacing(2),
    borderRadius: "0px",
    overflow: "auto",
    border: "1px solid #cccccc",
  },
  paper9: {
    // paddingLeft: theme.spacing(1),
    //paddingRight: theme.spacing(1),
    borderRadius: "0px",
    overflow: "auto",
    //height:'60vh'
  },
  paper2: {
    height: "auto",
    width: "98%",
    borderRadius: "0px",
    //  overflow: 'auto',
    border: "1px solid #cccccc",
    color: "#fff",
    textAlign: "center",
  },
  button4: {
    border: " 1px solid #fff",
    borderRadius: "0px",
    color: "#fff",
    height: "auto",
    width: "100%",
    border: "1px solid #cccccc",
    textAlign: "center",
  },
  setupbutton9: {
    border: " 1px solid #fff",
    borderRadius: "0px",
    color: "#fff",
    marginTop: "2%",
    height: "120vh",
    width: "100%",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(3),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    border: "1px solid #cccccc",
    textAlign: "center",
  },
  footCss9: {
    // border : ' 1px solid #fff',
    borderRadius: "8%",
    height: 250,
    color: "#fff",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(3),
    // paddingLeft: theme.spacing(4),
    // paddingRight: theme.spacing(4),
    // border:'1px solid #cccccc',
    textAlign: "center",
  },
  paper7: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
    borderRadius: "0px",
    overflow: "auto",
    border: " 1px solid #fff",

    color: "#fff",
    backgroundColor: "#0168fa",
    borderColor: "#0168fa",
    "&:hover": {
      backgroundColor: "#0168fa",
      borderColor: "#0168fa",
    },
  },
  button7: {
    border: " 1px solid #fff",
    borderRadius: "0px",
    border: "1px solid #cccccc",
    color: "#fff",
    textAlign: "center",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    marginTop: "3px",
    // paddingLeft: theme.spacing(14),
    // paddingRight: theme.spacing(14),
  },
  Dashboardpaper: {
    border: "1px solid #ced4da",
    // boxShadow: '7px 2px 2px #cccccc',
    // shadowColor: '#000',
    //    shadowOffset: { width: 0, height: 1 },
    //    shadowOpacity: 0.8,
    //    shadowRadius: 2,
    //    elevation: 5,
    height: 100,
    width: 270,

    marginLeft: "5%",
    marginTop: "8%",
  },
  title: {
    marginLeft: "1%",
  },
  Dashboardpaper2: {
    border: "1px solid #ced4da",
    // boxShadow: '7px 2px 2px #cccccc',
    // shadowColor: '#000',
    //    shadowOffset: { width: 0, height: 1 },
    //    shadowOpacity: 0.8,
    //    shadowRadius: 2,
    //    elevation: 5,
    height: 500,
    width: 270,
    borderRadius: "2px",
    marginLeft: "6px",

    marginTop: "1%",
  },
  Dashboardpaper3: {
    border: "1px solid #ced4da",
    // boxShadow: '7px 2px 2px #cccccc',
    // shadowColor: '#000',
    //    shadowOffset: { width: 0, height: 1 },
    //    shadowOpacity: 0.8,
    //    shadowRadius: 2,
    //    elevation: 5,
    height: 500,
    width: 270,
    borderRadius: "2px",
    marginLeft: "77px",

    marginTop: "1%",
  },
  dividerFullWidth1: {
    marginTop: "4%",
  },
  fontsizepaper: {
    fontSize: 10,
    text: "bold",
    marginLeft: "10px",
    marginTop: "10px",
  },
  numbersize: {
    fontSize: 18,
    text: "bold",
    marginLeft: "10px",
  },
  numbersizepercentage: {
    fontSize: 10,
    color: "#F6072F",
    marginTop: "10px",
    marginLeft: "3px",
  },

  numbersizepercentage2: {
    fontSize: 10,
    color: "#0FB559",
    marginTop: "10px",
    marginLeft: "3px",
  },
  fontsizepaper3: {
    fontSize: 12,
    text: "bold",
    marginLeft: "10px",
    marginTop: "10px",
  },
  typography: {
    marginTop: "10px",
    marginLeft: theme.spacing(2),
  },
  footCss: {
    // border : ' 1px solid #fff',
    borderRadius: "8%",
    // border:'1px solid #cccccc',
    color: "#fff",
    textAlign: "center",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    marginTop: "3px",
  },
  paper: {
    padding: theme.spacing(1),
    paddingLeft: "0px",
    borderRadius: "0px",
    overflow: "auto",
    backgroundColor: "#fff",
  },
  fixedHeight: {
    height: 240,
  },
  avatarsmall: {
    marginLeft: "50px",
    width: theme.spacing(5.5),
    height: theme.spacing(5.5),
  },
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  fixedHeight1: {
    height: 480,
  },
  chartContainer: {
    height: 400,
    position: "relative",
  },
  radioButtonCss: {
    color: "#000",
    fontSize: "8px",
    height: "25px",
  },
  profileMargin: {
    marginTop: theme.spacing(0),
    borderRadius: 0,
    marginRight: "0px",
  },
  profileMargin1: {
    marginTop: theme.spacing(1),
    borderRadius: "5px",
  },
}));

const ColorButtonInDeliverd = withStyles((theme) => ({
  root: {
    color: "#fff",
    borderRadius: "3px",
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    height: "75%",
    width: "100px",
    fontSize: "11px",
    fontWeight: "550",
    color: "#fff",
    padding: 0,
    paddingBottom: "3px",
    paddingTop: "3px",
    backgroundColor: "#002db3",
    "&:hover": {
      backgroundColor: "#002db3",
    },
  },
}))(Button);
//Make custom button
const ColorButtonProcessed = withStyles((theme) => ({
  root: {
    color: "#fff",
    borderRadius: "3px",
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    height: "75%",
    width: "100px",
    fontSize: "11px",
    fontWeight: "550",
    color: "#fff",
    padding: 0,
    paddingBottom: "3px",
    paddingTop: "3px",
    backgroundColor: "#0168fa",
    "&:hover": {
      backgroundColor: "#0168fa",
    },
  },
}))(Button);
const ColorButtonAwaiting = withStyles((theme) => ({
  root: {
    color: "#fff",
    borderRadius: "3px",
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    height: "75%",
    width: "100px",
    fontSize: "10px",
    fontWeight: "550",
    color: "#fff",
    padding: 0,
    paddingBottom: "3px",
    paddingTop: "3px",
    backgroundColor: "red",
    "&:hover": {
      backgroundColor: "red",
    },
  },
}))(Button);


const ColorButtonNew = withStyles((theme) => ({
  root: {
    color: "#fff",
    borderRadius: "3px",
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    height: "75%",
    width: "100px",
    fontSize: "11px",
    fontWeight: "550",
    color: "#fff",
    padding: 0,
    paddingBottom: "3px",
    paddingTop: "3px",
    backgroundColor: "#33cc00",
    "&:hover": {
      backgroundColor: "#33cc00",
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

export default function ArrangeShipping(props) {
  const classes = useStyles();

  const [completed, setCompleted] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);
  const [progressBar, setProgress] = React.useState(true);
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight1);
  const [editSprint, setEditSprint] = React.useState(null);
  const [value, setValue] = React.useState("8");
  const user_id = props.user_id;
  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [type, setType] = React.useState("");
  const [formAction, setFromAction] = React.useState(true);
  const [fullinventorycount, setFullinventorycount] = React.useState(false);
  const [fullinventorycount1, setFullinventorycount1] = React.useState(0);
  const [qualitycontrol, setQualitycontrol] = React.useState(false);
  const [qualitycontrol1, setQualitycontrol1] = React.useState(0);
  const [repackagingproducts, setRepackagingproduct] = React.useState(false);
  const [repackagingproducts1, setRepackagingproduct1] = React.useState(0);
  const [baggingproducts, setBaggingproducts] = React.useState(false);
  const [baggingproducts1, setBaggingproducts1] = React.useState(0);
  const [anyothergenerictask, setAnyothergenerictask] = React.useState(true);
  const [anyothergenerictask1, setAnyothergenerictask1] = React.useState(0);
  const [requestData, setRequestOrderData] = React.useState([]);
  const [checkcount, setCheckcount] = React.useState(false);
  const userRoleId = parseInt(window.localStorage.roleId);
  const [users, setUsers] = React.useState([]);
  const [seller, setSeller] = React.useState(0);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openDelete1, setOpenDelete1] = React.useState(false);
  const [openDelete2, setOpenDelete2] = React.useState(false);
  const [cardid, setCardid] = React.useState(0);
  const [rowDataForOrder, setRowData] = React.useState([]);
  const [rowStatus, setRowStatus] = React.useState(0);
  const [rowAdminComment, setRowAdminComment] = React.useState(null);
  const [isLow, setIsLow] = React.useState(false);
  const [nooffile, setNooffile] = React.useState(0);
  const [selectFiles, setSelectFiles] = React.useState([]);
  const [selectAttachment, setSelectAttachment] = React.useState([{fileid:0}]);
  const [openAttachement, setOpenAttachement] = React.useState(null);
  const [additionalinformation,setAdditionalinformation]=React.useState('');
  //const [selectproduct,setSelectproduct]=React.useState(false);
  const module = [];
  const optionArray = [];
  const [formState, setFormState] = React.useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });

  const openAttachemntPoupup=(data)=>{
    
    const valueLengthWidthHeight = [...selectAttachment];
    for (var i = 0; valueLengthWidthHeight.length !== 0; i++) {
      valueLengthWidthHeight.pop({
        fileid:0,
      });
    }
    for (var j = 0; j < data.fileids.length; j++) {
      valueLengthWidthHeight.push({
        fileid:data.fileids[j],
      });
    }
console.log("filedata",valueLengthWidthHeight)
    setSelectAttachment(valueLengthWidthHeight);
    setOpenAttachement(true);
  }


  const closeAttachments=()=>{
    const valueLengthWidthHeight = [...selectAttachment];
    for (var i = 0; valueLengthWidthHeight.length !== 0; i++) {
      valueLengthWidthHeight.pop({
        fileid:0,
      });
    }
    
    setSelectAttachment(valueLengthWidthHeight);
    setOpenAttachement(false);
  }
 
  const handlechangeAdditional=(event)=>{
    console.log("valuechanhe",event.target.value);
    setAdditionalinformation(event.target.value);
  }

  React.useEffect(() => {
    if (checkcount === true) {
    }
  }, [checkcount]);

  const [state, setState] = React.useState({
    columns: [
      {
        title: "Request Id",
        field: "requestworkorderId",
        type: "text",
        editable: "never",
      },
      {
        title: "Creation Date",
        field: "createdat",
        type: "date",
        editable: "never",
      },
      {
        title: "Subject",
        field: "type",
        type: "text",

        lookup: {
          1: "Full Inventory Count",
          2: "Quality Control",
          3: "Repackaging Product",
          4: "Bagging Product",
          5: "Something Else",
        },
      },
      { title: "Comment", field: "comments", type: "text" },
      {
        title: "AdminComment",
        field: "admincomments",
        type: "text",
        hidden: true,
      },
      { title: "Priority", field: "priority", type: "text" },
      {
        title: "Status",
        field: "statusOpenClosed",
        type: "text",
        editable: "never",
        render: (rowData) => (
          <Text>
            {(() => {
              if (rowData.statusOpenClosed === "3") {
                return (
                  <ColorButtonProcessed
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      handleClickOpendelete(rowData.requestworkorderId, rowData);
                    }}
                  >
                    {" "}
                    Processing{" "}
                  </ColorButtonProcessed>
                );
              } else if (rowData.statusOpenClosed === "4") {
                return (
                  <ColorButtonInDeliverd
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      handleClickOpendelete(rowData.requestworkorderId, rowData);
                    }}
                  >
                    {" "}
                    Resolved{" "}
                  </ColorButtonInDeliverd>
                );
              } else {
                return (
                  <ColorButtonNew
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      handleClickOpendelete(rowData.requestworkorderId, rowData);
                    }}
                  >
                    {" "}
                    Open{" "}
                  </ColorButtonNew>
                );
              }
            })()}
          </Text>
        ),
      },
    ],
  });

  React.useEffect(() => {
    fetchForCheckAdminList();
  }, []);

  const fetchForCheckAdminList = () => {
    if (userRoleId === 1) {
      setState({
        // column1FilterList,
        columns: [
          {
            title: "Request Id",
            field: "requestworkorderId",
            type: "text",
            editable: "never",
          },
          {
            title: "Creation Date",
            field: "createdat",
            type: "date",
            editable: "never",
          },
          {
            title: "Subject",
            field: "type",
            type: "text",

            lookup: {
              1: "Full Inventory Count",
              2: "Quality Control",
              3: "Repackaging Product",
              4: "Bagging Product",
              5: "Something Else",
            },
          },
          { title: "Comment", field: "comments", type: "text" },
          { title: "Seller Email", field: "userEmail", type: "text" },
          { title: "Seller Name", field: "displayName", type: "text" },
          { title: "Seller Company", field: "companyName", type: "text" },
          {
            title: "AdminComment",
            field: "admincomments",
            type: "text",
            hidden: true,
          },
          { title: "Priority", field: "priority", type: "text" },
          {
            title: "Status",
            field: "statusOpenClosed",
            type: "text",
            editable: "never",
            render: (rowData) => (
              <Text>
                {(() => {
                  if (rowData.statusOpenClosed === "3") {
                    return (
                      <ColorButtonAwaiting
                        size="large"
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          handleClickOpendelete(
                            rowData.requestworkorderId,
                            rowData
                          );
                        }}
                      >
                        {" "}
                        Awaiting Reply{" "}
                      </ColorButtonAwaiting>
                    );
                  }else if(rowData.statusOpenClosed === "5"){
                    return (
                      <ColorButtonProcessed
                        size="large"
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          handleClickOpendelete(
                            rowData.requestworkorderId,
                            rowData
                          );
                        }}
                      >
                        {" "}
                        New Reply{" "}
                      </ColorButtonProcessed>
                    );
                  }
                   else if (rowData.statusOpenClosed === "4") {
                    return (
                      <ColorButtonInDeliverd
                        size="large"
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          handleClickOpendelete(
                            rowData.requestworkorderId,
                            rowData
                          );
                        }}
                      >
                        {" "}
                        Resolved{" "}
                      </ColorButtonInDeliverd>
                    );
                  } else {
                    return (
                      <ColorButtonNew
                        size="large"
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          handleClickOpendelete(
                            rowData.requestworkorderId,
                            rowData
                          );
                        }}
                      >
                        {" "}
                        Open{" "}
                      </ColorButtonNew>
                    );
                  }
                })()}
              </Text>
            ),
          },
          // {
          //   title: "Attachments",
          //   field: "fileids",
          //   type: "text",
          //   editable: "never",
          //   render: (rowData) => (
          //     <ColorButtonProcessed
          //               size="large"
          //               variant="contained"
          //               color="primary"
          //               onClick={() => {
          //                 openAttachemntPoupup(rowData)
          //               }}
          //               endIcon={<AddPhotoAlternateIcon/>}
          //             >
          //               {" "}
          //               Open{" "}
          //             </ColorButtonProcessed>
              
          //   ),
          // },
        ],
      });
    } else {
      setState({
        // column1FilterList,
        columns: [
          {
            title: "Request Id",
            field: "requestworkorderId",
            type: "text",
            editable: "never",
          },
          {
            title: "Creation Date",
            field: "createdat",
            type: "date",
            editable: "never",
          },
          {
            title: "Subject",
            field: "type",
            type: "text",

            lookup: {
              1: "Full Inventory Count",
              2: "Quality Control",
              3: "Repackaging Product",
              4: "Bagging Product",
              5: "Something Else",
            },
          },
          { title: "Comment", field: "comments", type: "text", hidden: false },
          {
            title: "AdminComment",
            field: "admincomments",
            type: "text",
            hidden: true,
          },
          { title: "Priority", field: "priority", type: "text" },
          {
            title: "Status",
            field: "statusOpenClosed",
            type: "text",
            editable: "never",
            render: (rowData) => (
              <Text>
                {(() => {
                  if (rowData.statusOpenClosed === "3") {
                    return (
                      <ColorButtonProcessed
                        size="large"
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          handleClickOpendelete(
                            rowData.requestworkorderId,
                            rowData
                          );
                        }}
                      >
                        {" "}
                        New Reply{" "}
                      </ColorButtonProcessed>
                    );
                  }else if(rowData.statusOpenClosed === "5"){
                    return (
                      <ColorButtonAwaiting
                        size="large"
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          handleClickOpendelete(
                            rowData.requestworkorderId,
                            rowData
                          );
                        }}
                      >
                        {" "}
                        Awaiting Reply{" "}
                      </ColorButtonAwaiting>
                    );
                  }
                   else if (rowData.statusOpenClosed === "4") {
                    return (
                      <ColorButtonInDeliverd
                        size="large"
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          handleClickOpendelete(
                            rowData.requestworkorderId,
                            rowData
                          );
                        }}
                      >
                        {" "}
                        Resolved{" "}
                      </ColorButtonInDeliverd>
                    );
                  } else {
                    return (
                      <ColorButtonNew
                        size="large"
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          handleClickOpendelete(
                            rowData.requestworkorderId,
                            rowData
                          );
                        }}
                      >
                        {" "}
                        Open{" "}
                      </ColorButtonNew>
                    );
                  }
                })()}
              </Text>
            ),
          },
        ],
      });
    }
  };

  const handleClickOpendelete = (rowid, rowData) => {
    if (userRoleId === 1) {
      setOpenDelete1(true);
      setCardid(rowid);
      setRowData(rowData);
      setRowStatus("3");
      setRowAdminComment(rowData.requestworkorderId);
      console.log("rowid", rowid);
    } else {
      setOpenDelete2(true);
      setRowData(rowData);
      setRowAdminComment(rowData.requestworkorderId);
    }
  };
  const handleDeleteCancle = () => {
    setOpenDelete(false);
    setOpenDelete1(false);
    setOpenDelete2(false);
    setRowAdminComment(null);
    // setOpenOnHoldOrder(false);
    // setOpenCancelOrderSet(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const showToast = (open, msg, type) => {
    return (
      <Toast open={open} handleClose={handleClose} type={type} msg={msg} />
    );
  };
  const handleRelease = (isSprintCreate) => {
    if (isSprintCreate === 3) {
      setOpenDelete(false);

      setRowStatus("3");
      setOpenDelete1(true);
    } else if (isSprintCreate === 4) {
      setRowStatus("4");
      setOpenDelete1(false);
      updateStatusForHelp1("4");
    } else if (isSprintCreate === 5) {
      updateStatusForHelp1("4");
    } else {
      setOpenConfirmationRelease(true);
      setOpenDelete(false);
    }
  };
  const updateStatusForHelp1 = (statusid) => {
    //fetchRequestWorkOrder();
    //const user_id=5;
    setLoading(true);
    shiphypeservice
      .updateStatusForREequest(
        rowDataForOrder.userid,
        rowDataForOrder.requestworkorderId,
        rowDataForOrder.type,
        rowDataForOrder.comments,
        0,
        statusid,
        rowDataForOrder.admincomments,
        "Admin"
      )
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          setOpenDelete1(false);
          fetchRequestWorkOrder();
          setOpenDelete2(false);
          setRowAdminComment(null);
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const updateStatusForHelp = (statusid, filearray) => {
    setOpenDelete1(false);
    setRowAdminComment(null);

    setLoading(true);
    shiphypeservice
      .updateStatusForREequest(
        rowDataForOrder.userid,
        rowDataForOrder.requestworkorderId,
        rowDataForOrder.type,
        rowDataForOrder.comments,
        0,
        rowStatus,
        statusid,
        "Admin"
      )
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          setOpenDelete1(false);

          for (let i = 0; i < filearray.length; i++) {
            uploadfiles(rowDataForOrder.requestworkorderId, filearray[i], "Admin");
            fetchRequestWorkOrder();
          }
          if(filearray.length === 0){
            fetchRequestWorkOrder();
          }
         
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  //  if(statusid === undefined){
  //   setOpenDelete1(false);
  //   setRowAdminComment(null);
  //   for (let i = 0; i < filearray.length; i++) {
  //     uploadfiles(rowDataForOrder.requestworkorderId, filearray[i], i);
  //     fetchRequestWorkOrder();
  //   }
  //   if(filearray.length === 0){
  //     fetchRequestWorkOrder();
  //   }
  //  }else{
  //   setLoading(true);
  //   shiphypeservice
  //     .updateStatusForREequest(
  //       rowDataForOrder.userid,
  //       rowDataForOrder.requestworkorderId,
  //       rowDataForOrder.type,
  //       rowDataForOrder.comments,
  //       0,
  //       rowStatus,
  //       statusid,
  //       "Admin"
  //     )
  //     .then((response) => {
  //       console.log("status", response.status);
  //       if (response.status === true) {
  //         setLoading(false);
  //         setOpenDelete1(false);

  //         for (let i = 0; i < filearray.length; i++) {
  //           uploadfiles(rowDataForOrder.requestworkorderId, filearray[i], i);
  //           fetchRequestWorkOrder();
  //         }
  //         if(filearray.length === 0){
  //           fetchRequestWorkOrder();
  //         }
         
  //       } else {
  //         setLoading(false);
  //         console.log("message", response.message);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  //  }
    
  };

  const updateStatusForHelpSeller = (statusid, filearray) => {
   
    console.log("staid",statusid);
    setOpenDelete2(false);
    setRowAdminComment(null);
    setLoading(true);
    shiphypeservice
      .updateStatusForREequest(
        rowDataForOrder.userid,
        rowDataForOrder.requestworkorderId,
        rowDataForOrder.type,
        rowDataForOrder.comments,
        0,
        "5",
        statusid,
        "Seller"
      )
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          setOpenDelete2(false);
          setRowAdminComment(null);
          for (let i = 0; i < filearray.length; i++) {
            uploadfiles(rowDataForOrder.requestworkorderId, filearray[i], "Seller");
            fetchRequestWorkOrder();
          }
          if(filearray.length === 0){
            fetchRequestWorkOrder();
          }
         
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
    // if(statusid === undefined){
    //   setOpenDelete2(false);
    //   setRowAdminComment(null);
    //   for (let i = 0; i < filearray.length; i++) {
    //     uploadfiles(rowDataForOrder.requestworkorderId, filearray[i], i);
    //     fetchRequestWorkOrder();
    //   }
    //   if(filearray.length === 0){
    //     fetchRequestWorkOrder();
    //   }
    // }else{
    //   setLoading(true);
    //   shiphypeservice
    //     .updateStatusForREequest(
    //       rowDataForOrder.userid,
    //       rowDataForOrder.requestworkorderId,
    //       rowDataForOrder.type,
    //       rowDataForOrder.comments,
    //       0,
    //       "5",
    //       statusid,
    //       "Seller"
    //     )
    //     .then((response) => {
    //       console.log("status", response.status);
    //       if (response.status === true) {
    //         setLoading(false);
    //         setOpenDelete2(false);
    //         setRowAdminComment(null);
    //         for (let i = 0; i < filearray.length; i++) {
    //           uploadfiles(rowDataForOrder.requestworkorderId, filearray[i], i);
    //           fetchRequestWorkOrder();
    //         }
    //         if(filearray.length === 0){
    //           fetchRequestWorkOrder();
    //         }
           
    //       } else {
    //         setLoading(false);
    //         console.log("message", response.message);
    //       }
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // }
    
  };
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
                ? (myObject["displayName"] = response.data[a].displayName)
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
              response.data[a].displayName
                ? (myObject["displayName"] = response.data[a].displayName)
                : null;
              response.data[a].userEmail
                ? (myObject["name"] = response.data[a].userEmail)
                : null;
              newArr.push(myObject);
            }
          }
          console.log("array", newArr);
          setUsers(newArr);
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [state1, setState1] = React.useState({
    MarketPlaceIntegration: false,
    ShippingProfile: false,
    //  ProductImport:false,
    ProductSync: false,
    ImportCustomers: false,
  });

  const handleChangeRadio = (event) => {
    setValue(event.target.value);
  };
  const {
    MarketPlaceIntegration,
    ShippingProfile,
    ProductSync,
    ImportCustomers,
  } = state1;
  const progress = React.useRef(() => {});
  React.useEffect(() => {
    progress.current = () => {
      if (completed > 100) {
        setProgress(false);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setCompleted(completed + diff);
        setBuffer(completed + diff + diff2);
      }
    };
  });
  /**
   * screen size
   */

  let screenWidth = Dimensions.get("window").width;
  console.log(screenWidth);
  let setupwizrd = 0;
  let setupbutton = 0;
  let setupbutton9 = 0;
  let footCss = 0;
  let footCss9 = 0;
  if (screenWidth < 400) {
    setupwizrd = classes.paper7;
    setupbutton = classes.button7;
    footCss = classes.footCss;
  } else if (screenWidth < 690) {
    setupwizrd = classes.paper7;
    setupbutton = classes.button7;
    footCss = classes.footCss;
  } else if (screenWidth < 1530) {
    setupwizrd = classes.paper2;
    setupbutton = classes.button4;
    footCss = classes.footCss9;
    setupbutton9 = classes.setupbutton9;
  } else {
    setupwizrd = classes.paper2;
    setupbutton = classes.button4;
    footCss = classes.footCss9;
  }
  React.useEffect(() => {
    fetchRequestWorkOrder();
    fetchUserInfo();
  }, []);

  /**
   * Description:To do checklist of steps
   */
  const handleChangequality = (event) => {
    setFullinventorycount(event.target.checked);
    setFromAction(false);
    if (event.target.checked === true) {
      setFullinventorycount1(1);
    } else {
      setFullinventorycount1(0);
    }
  };

  /**
   * Description:To do set value of checkbox
   * @param {*} event
   */
  const handleChangeprintsku = (event) => {
    setQualitycontrol(event.target.checked);
    setFromAction(false);
    if (event.target.checked === true) {
      setQualitycontrol1(1);
    } else {
      setQualitycontrol1(0);
    }
  };

  const handleChangeprAddRequest = (event) => {
    setRepackagingproduct(event.target.checked);
    setFromAction(false);
    if (event.target.checked === true) {
      setRepackagingproduct1(1);
    } else {
      setRepackagingproduct1(0);
    }
  };

  const handleChangeprAddRequest1 = (event) => {
    setBaggingproducts(event.target.checked);
    setFromAction(false);
    if (event.target.checked === true) {
      setBaggingproducts1(1);
    } else {
      setBaggingproducts1(0);
    }
  };

  const handleChangeprAddRequest2 = (event) => {
    setAnyothergenerictask(event.target.checked);
    setFromAction(false);
    if (event.target.checked === true) {
      setAnyothergenerictask1(1);
    } else {
      setAnyothergenerictask1(0);
    }
  };

  const handleLowProprtChange = (event) => {
    setIsLow(!isLow);
  };
  const handleHeighProprtChange = (event) => {
    setIsHeigh(!isHeigh);
  };
  const handleChange = (prop) => (event) => {
    setFromAction(false);
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

  //Make custom button
  const ColorButton = withStyles((theme) => ({
    root: {
      color: "#fff",
      borderRadius: "3px",
      //  paddingTop: '9%',
      //  paddingBottom: '9%',
      height: "80%",
      width: "100px",
      fontSize: "11px",
      fontWeight: "550",
      color: "#fff",
      backgroundColor: "#0168fa",
      "&:hover": {
        backgroundColor: "#002080",
      },
    },
  }))(Button);

  const handleClickOpen = () => {
    setEditSprint(null);
    setOpenMarketPlace(true);

    console.log("click button");
  };

  /**
   * Description:To do call next page
   */
  const onNextfunction = () => {
    const fullinventorycount2 = fullinventorycount;
    const qualitycontrol2 = qualitycontrol;
    const repackagingproducts2 = repackagingproducts;
    const baggingproducts2 = baggingproducts;
    const anyothergenerictask2 = anyothergenerictask;
    const commentsfullinventorycount =
      formState.values.fullinventoryrequest === "undefined" ||
      fullinventorycount === false
        ? ""
        : formState.values.fullinventoryrequest;
    const commentsqualitycontrolnts =
      formState.values.qualitycontrolrequest === "undefined" ||
      qualitycontrol === false
        ? ""
        : formState.values.qualitycontrolrequest;
    const commentsrepackagingproducts =
      formState.values.repackingproductrequest === "undefined" ||
      repackagingproducts === false
        ? ""
        : formState.values.repackingproductrequest;
    const commentsbaggingproducts =
      formState.values.baggingproductsrequest === "undefined" ||
      baggingproducts === false
        ? ""
        : formState.values.baggingproductsrequest;
    const commentsanyothergenerictask =
    additionalinformation === "" ||
      anyothergenerictask === false
        ? ""
        : additionalinformation;
    const uid = seller === 0 ? user_id : seller;
    let priority=isLow === true ? 'High' : 'Low';
    setLoading(true);

    console.log("fullinventorycount", fullinventorycount);
    // if(requestworkorderid === 0){
    shiphypeservice
      .addRequestWorkOrder(
        uid,
        fullinventorycount2,
        commentsfullinventorycount,
        qualitycontrol2,
        commentsqualitycontrolnts,
        repackagingproducts2,
        commentsrepackagingproducts,
        baggingproducts2,
        commentsbaggingproducts,
        anyothergenerictask2,
        commentsanyothergenerictask,
        priority
      )
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setOpen(true);
          setType("success");
          setMsg(response.message);
          setLoading(false);
          setAdditionalinformation('');
          setIsLow(false);
          if (nooffile === 0) {
          } else {
            try {
              for (let k = 0; k < selectFiles.length; k++) {
                uploadfiles(response.data, selectFiles[k], "Seller");
                if (k === selectFiles.length - 1) {
                  // setCheckcount(true);
                  fetchRequestWorkOrder();
                }
              }
            } catch (error) {
              console.log(error);
            } finally {
            }
          }

          setFormState((formState) => ({
            ...formState,
            values: {
              ...formState.values,
              somethingelserequest: "",
              checkFrom: false,
            },
            touched: {
              ...formState.touched,
              somethingelserequest: true,
            },
          }));

          setFormState((formState) => ({
            ...formState,
            values: {
              ...formState.values,
              assignsubject: "",
              checkFrom: false,
            },
            touched: {
              ...formState.touched,
              assignsubject: true,
            },
          }));
        } else {
          setOpen(true);
          setType("error");
          setMsg(response.message);

          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
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

  const uploadfiles = (requestid, filesdata,type) => {
    var formData = new FormData();
    formData.append("requestworkorderid", requestid);
    formData.append("userid", user_id);
    formData.append("usertype", type);
    formData.append("file", filesdata);
    
    axios
      .post(BASE_URL + "Files/UploadFiles", formData)
      .then(function (response) {

        for(let i=0;i<response.data.length;i++){
          if(response.data[i].status === true){
            setOpen(true);
            setType("success");
            setMsg(response.data[i].message);
            setLoading(false);
          }else{
            setOpen(true);
            setType("error");
            setMsg(response.data[i].message);
            setLoading(false);
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const fetchRequestWorkOrder = () => {
    setLoading(true);
    const uid = seller === 0 ? user_id : seller;
    shiphypeservice
      .fetchRequestWorkOrder(uid)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          setRequestOrderData(response.data);
          setSelectFiles([]);
          setCheckcount(false);
          setNooffile(0);
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const fetchRequestWorkOrder1 = (user_id) => {
    setLoading(true);

    shiphypeservice
      .fetchRequestWorkOrder(user_id)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          setRequestOrderData(response.data);
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View className={classes.content}>
      <View className={classes.appBarSpacer} />

      <View className={classes.paper}>
        <Grid item container lg={12}>
          <Grid
            item
            lg={7}
            //style={{ marginLeft:'4px'}}
          >
            <Link
              onClick={() => {
                props.handleDashboard("01");
              }}
            >
              <Text style={popUpStyle.breadCrundCss1}>
                &nbsp;&nbsp;&nbsp;&nbsp;DASHBOARD /
              </Text>
            </Link>
            <Text style={popUpStyle.breadCrundCss2}>
              {" "}
              REQUEST WORK ORDER {"\n"}{" "}
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
                      options={users}
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
                          setSeller(newValue.id);
                          fetchRequestWorkOrder1(newValue.id);
                        } else {
                          setSeller(0);
                          setRequestOrderData([]);
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

      <View style={popUpStyle.paddingSide}>
        <View>
          <Grid container justify="space-between" spacing={2}>
            <Grid item xs={12} md={4} lg={4}></Grid>
            <Grid item xs={12} md={4} lg={4}></Grid>
            <Grid
              item
              xs={12}
              md={4}
              lg={4}
              //style={{marginRight:'70px'}}
            >
              <Grid container item justify="flex-end"></Grid>
            </Grid>
          </Grid>
        </View>

        <Grid justify="center">
          <ProgressBar loading={loading} />
        </Grid>

        <Grid>
          {" "}
          {openDelete === false ? (
            " "
          ) : (
            <DeleteCard
              rowStatus={rowStatus}
              user_id={user_id}
              openDeleteCard={openDelete}
              handleRelease={handleRelease}
              handleDeleteCancle={handleDeleteCancle}
            />
          )}
          {openDelete1 === false ? (
            " "
          ) : (
            <AddReasonForStatus
              user_id={user_id}
              openOnHoldOrder={openDelete1}
               rowAdminComment={rowAdminComment}
               handleRelease={handleRelease}
              handleConfirmHold={updateStatusForHelp}
              handleDeleteCancle={handleDeleteCancle}
            />
          )}
          {openDelete2 === false ? (
            " "
          ) : (
            <ShowTheReply
              user_id={user_id}
              openDeleteCard={openDelete2}
              rowAdminComment={rowAdminComment}
              handleRelease={handleRelease}
              handleConfirmHold={updateStatusForHelpSeller}
              handleDeleteCancle={handleDeleteCancle}
            />
          )}
          {openAttachement === false ? (
            " "
          ) : (
            <ShowRequestWorkOrderAttachments
              user_id={user_id}
              openAttachement={openAttachement}
              closeAttachments={closeAttachments}
              selectAttachment={selectAttachment}
            />
          )}
        </Grid>

        <Grid item xs={12} md={4} lg={4}>
          {userRoleId === 1 ? (
            ""
          ) : (
            <Text
              style={{
                fontSize: "16px",
                fontWeight: "700",
                marginLeft: "2px",
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                color: "#001737",

                transition: "all 0.25s",
              }}
            >
              Request Work Order{"\n"}
            </Text>
          )}
        </Grid>

        {userRoleId === 1 ? (
          <>
           
          </>
        ) : (
          <>
            <Grid item item xs={8} md={3} lg={3} style={{}}>
              <TextField
                id="assignsubject"
                name="assignsubject"
                variant="outlined"
                fullWidth
                placeholder="Assign Name (Optional)"
                size="small"
                type="text"
                multiline={true}
                rows={1}
                onChange={handleChange("assignsubject")}
                value={formState.values.assignsubject}
                className={classes.profileMargin1}
              />
            </Grid>

            
            {userRoleId === 1 ? (
              ""
            ) : (
              <Text
                style={{
                  fontSize: "14px",
                  // fontWeight: '700',
                  marginLeft: "2px",
                  fontFamily:
                    '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                  color: "#001737",
marginTop:'10px',
                  transition: "all 0.25s",
                }}
              >
                What would you like us to do?
              </Text>
            )}
            <Grid item item xs={8} md={3} lg={3} style={{}}>
              <TextField
                id="somethingelserequest"
                name="somethingelserequest"
                variant="outlined"
                fullWidth
                placeholder="Please provide complete information on what exactly you would like us to do."
                size="small"
                autoComplete
                multiline={true}
                value={additionalinformation}
                rows={3}
                onChange={(event)=>{handlechangeAdditional(event)}}
                className={classes.profileMargin1}
              />
            </Grid>
          </>
        )}

        <FormGroup>
          {userRoleId === 1 ? (
            ""
          ) : (
            <FormControlLabel
              control={
                <Checkbox
                  checked={isLow}
                  onChange={handleLowProprtChange}
                  name="addrequest"
                  color="primary"
                />
              }
              label={
                <Text
                  style={{
                    fontSize: "12px",
                    // fontWeight: '700',
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                    color: "#001737",

                    transition: "all 0.25s",
                  }}
                >
                  High Priority
                </Text>
              }
              value="heigh"
            />
          )}
        </FormGroup>

        

        <Grid items container xs={12} md={12} lg={8}>
          {userRoleId === 1 ? (
            ""
          ) : (
            <>
              <Grid item lg={3}>
                <Text>Upload Attachment (optional):</Text>
              </Grid>
            </>
          )}
          {userRoleId === 1 ? (
            ""
          ) : (
            <>
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
            </>
          )}
        </Grid>
        <Grid
          container
          item
          xs={12}
          justify="flex-start"
          style={{ marginRight: "10px" }}
        >
          {userRoleId === 1 ? (
            ""
          ) : (
            <Grid>
              <ColorButton
                size="large"
                variant="contained"
                color="primary"
                disabled={additionalinformation === '' ? true : false}
                className={classes.profileMargin1}
                onClick={() => {
                  onNextfunction();
                }}
              >
                Submit
              </ColorButton>
            </Grid>
          )}
        </Grid>

        {showToast(open, msg, type)}
      </View>
      <View style={popUpStyle.paddingSide}>
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
              Work Order History
            </Text>
          }
          columns={state.columns}
          data={requestData}
          icons={tableIcons}
          components={{
            Container: (props) => <Paper {...props} elevation={0} />,

            Toolbar: (props) => <StyledMTableToolbar {...props} />,
          }}
          localization={{
            toolbar: {
              searchPlaceholder: "Search Work Orders",
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
              onClick: (event) => fetchRequestWorkOrder(),
            },
          ]}
          options={{
            paging: false,
            maxBodyHeight: userRoleId === 1 ? "60vh" : "29vh",
            headerStyle: { position: "sticky", top: 0 },
            pageSize: 7,
            pageSizeOptions: [6, 12, 18, 20, 30, 40, 50, 60, 70, 80, 90, 100],
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
              paddingRight: 10,
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
              paddingTop: 5,
              paddingBottom: 5,
              paddingRight: 5,
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
              paddingLeft: 5,
              paddingTop: 5,
              paddingBottom: 5,
              paddingRight: 5,
            },
            search: true,
            exportButton: false,
          }}
        />
      </View>
    </View>
  );
}

ArrangeShipping.propTypes = {
  getSpecialRequestvalue: PropTypes.func,
  handleNextPage: PropTypes.func,
  backButtonRouting: PropTypes.func,
};
