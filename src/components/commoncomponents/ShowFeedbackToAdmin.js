import React, { useState, useEffect } from "react";
import { fade, withStyles, makeStyles } from "@material-ui/core/styles";
import { Platform, View, Image, Text, Dimensions } from "react-native";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import * as shiphypeservice from "./ShipService/shiphype_service";
import ProgressBar from "./feedback/ProgressBar";
import popUpStyle from "./style/popUpStyle";
import MaterialTable, { MTableToolbar } from "material-table";
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
import Link from "@material-ui/core/Link";
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

const useStyles = makeStyles((theme) => ({
  root: {},
  submit: {
    margin: theme.spacing(0, 0, 0),
    borderRadius: 0,
  },
  textArea: {
    marginTop: theme.spacing(0),
    borderRadius: 0,
  },
  profileMargin: {
    marginTop: theme.spacing(1),
    borderRadius: 0,
    marginBottom: theme.spacing(1),
  },
  profileMargin1: {
    marginTop: theme.spacing(1),
    borderRadius: "5px",
    //  marginBottom: theme.spacing(1),
  },
  paper: {
    border: "2px solid #ced4da",
    height: 80,
    width: 100,
  },
  paper1: {
    border: "2px solid #ced4da",
    height: 120,
    width: 100,
    marginLeft: "15%",
    marginTop: "8%",
  },
  root: {
    flexGrow: 1,
  },
  avatarsmall: {
    width: theme.spacing(3.5),
    height: theme.spacing(3.5),
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

/**
 * Description:This function is used for CreateSprint for sprint
 * @param {*} props
 */
export default function ShowFeedbackToAdmin(props) {
  const classes = useStyles();

  const userid = props.user_id;

  const [dataproduct, setDataProduct] = React.useState([]);
  const [userData, setUserData] = React.useState([]);
  const [status, setStatus] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const userRoleId = parseInt(window.localStorage.roleId);
  const [users, setUsers] = React.useState([]);
  const [seller, setSeller] = React.useState(0);

  const [state, setState] = React.useState({
    columns: [
      { title: "Name", field: "name", type: "text", editable: "never" },
      { title: "Email", field: "createdby", type: "text" },
      { title: "Feedback", field: "feedbackcomment", type: "text" },
      { title: "Creation Date", field: "createdate", type: "date" },
    ],
  });

  React.useEffect(() => {
    fetchCustomePackageingList();
  }, []);

  const fetchCustomePackageingList = () => {
    const uid = seller === 0 ? userid : seller;
    setLoading(true);
    shiphypeservice
      .fetchFeedback(uid)
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
   * Description:To do close poup after successfully create sprint and on click cancel button
   * @param {*} issprintCreate
   */
  const handleClose1 = (isSprintCreate) => {
    props.closeHelpscreen();
  };
  let screenWidth = Dimensions.get("window").width;

  return (
    <View className={classes.content}>
      {/* <ScrollView> */}
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
            <Text style={popUpStyle.breadCrundCss2}> FEEDBACKS {"\n"} </Text>
          </Grid>
        </Grid>

        {userRoleId === 1 ? (
          <View style={popUpStyle.paddingSide}>
            <Grid justify="center">
              <ProgressBar loading={loading} />
            </Grid>

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
                  Feedback History
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
                toolbar: {
                  searchPlaceholder: "Search feedback",
                },
                header: {
                  actions: "ACTION",
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
              ]}
              options={{
                paging: false,
                maxBodyHeight: "69vh",
                doubleHorizontalScroll: true,
                headerStyle: { position: "sticky", top: 0 },
                pageSize: 20,
                pageSizeOptions: [
                  6,
                  12,
                  18,
                  20,
                  30,
                  40,
                  50,
                  60,
                  70,
                  80,
                  90,
                  100,
                ],
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
        ) : (
          <View style={popUpStyle.paddingSide}></View>
        )}
      </View>
    </View>
  );
}
