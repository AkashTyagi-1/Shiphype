import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  fade,
  withStyles,
  makeStyles,
  useTheme,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import { Platform, View, Image, Text, Dimensions } from "react-native";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import ProgressBar from "./feedback/ProgressBar";
import Paper from "@material-ui/core/Paper";
import * as shiphypeservice from "./ShipService/shiphype_service";
import AllOrder from "./RevieveOrder";
import popUpStyle from "./style/popUpStyle";
import SearchableDropdown from "react-native-searchable-dropdown";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import AsyncStorage from "@react-native-community/async-storage";
const data = [
  {
    id: 1,
    name: "All",
  },
  {
    id: 2,
    name: "Processing",
  },

  {
    id: 3,
    name: "OnHold",
  },
  {
    id: 4,
    name: "More",
  },
];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <View
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2} style={{ padding: "0px" }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </View>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

function TabPanel2(props) {
  const { children, value, index, ...other } = props;

  return (
    <View
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2} style={{ padding: "0px" }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </View>
  );
}

TabPanel2.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps2(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(2),
    flexGrow: 1,
    height: "75vh",
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
  tabRoot: {
    fontSize: "12px",
  },
}));

export default function ScrollableTabsButtonAuto(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [valuechild,setValuechild]=React.useState(1);
  const [loading, setLoading] = React.useState(true);
  const [orderStatus, setOrderStatus] = React.useState([]);

  const [warehouse, setWarehouse] = React.useState(0);
  const [userid, setUserid] = React.useState(0);
  const user_id = props.user_id;
  const [userData, setUserData] = React.useState([]);
  const userRoleId = props.userRoleId;
  const [isfirst, setIsfirst] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeCA = (event, newValue) => {
    setValuechild(newValue);
  };

  React.useEffect(() => {
    if (value === -1) {
      setValue(0);
    } else {
      
    }
  }, [value]);
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
          //setUserData(response.data);
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
          setUserData(newArr);
          setUserStatus(true);
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  React.useEffect(() => {
    fetchUserInfo();
    fetchOrderStatusList();
    AsyncStorage.removeItem("ProductSelectAllTabUS");
  }, []);

  const getInternalOrderId = (orderid) => {
    props.getInternalOrderId(orderid);
  };

  const getInternalOrderId1 = (orderid) => {
    props.getEditOrderData(orderid);
  };

  //Make custom button

  const fetchOrderStatusList = () => {
    setLoading(true);
    shiphypeservice
      .fetchOrderStatus()
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          setOrderStatus(response.data);
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
              RECEIVE ORDERS {"\n"}{" "}
            </Text>
          </Grid>
          <Grid item lg={5} style={{ marginTop: "15px" }}>
            <Grid justify="flex-end" container>
              <Grid item style={{ marginRight: "20px" }}>
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
                      setUserid(newValue.id);
                      setIsfirst(false);
                      if (value === 0) {
                        setValue(-1);
                      } else {
                        setValue(0);
                      }
                    } else {
                      setIsfirst(true);
                      setUserid(0);
                      if (value === 0) {
                        setValue(-1);
                      } else {
                        setValue(0);
                      }
                    }
                    console.log("newvalue", newValue);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </View>

      <Grid justify="center">
        <ProgressBar loading={loading} />
      </Grid>
      <View style={popUpStyle.paddingSide}>
        <Grid container justify="space-between">
          <Grid item xs={12} md={2} lg={2}></Grid>
        </Grid>

        <AppBar position="static" color="default" style={{ marginTop: "15px" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            {orderStatus.map((row) => (
              <Tab
                label={
                  <span className={classes.tabRoot}>{row.orderstatusname}</span>
                }
                {...a11yProps(row.orderstatusId)}
              />
            ))}
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <AllOrder
            isfirst={isfirst}
            userid={user_id}
            sellerid={userid}
            userRoleId={userRoleId}
            orderStatus={0}
            valuechild={valuechild}
            getInternalOrderId={getInternalOrderId}
            getInternalOrderId1={getInternalOrderId1}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <AllOrder
            isfirst={isfirst}
            userid={user_id}
            sellerid={userid}
            orderStatus={2}
            valuechild={valuechild}
            userRoleId={userRoleId}
            getInternalOrderId={getInternalOrderId}
            getInternalOrderId1={getInternalOrderId1}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <AllOrder
            isfirst={isfirst}
            userid={user_id}
            sellerid={userid}
            orderStatus={3}
            valuechild={valuechild}
            userRoleId={userRoleId}
            getInternalOrderId={getInternalOrderId}
            getInternalOrderId1={getInternalOrderId1}
          />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <AllOrder
            isfirst={isfirst}
            userid={user_id}
            sellerid={userid}
            orderStatus={4}
            valuechild={valuechild}
            userRoleId={userRoleId}
            getInternalOrderId={getInternalOrderId}
            getInternalOrderId1={getInternalOrderId1}
          />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <AllOrder
            isfirst={isfirst}
            userid={user_id}
            sellerid={userid}
            orderStatus={5}
            valuechild={valuechild}
            userRoleId={userRoleId}
            getInternalOrderId={getInternalOrderId}
            getInternalOrderId1={getInternalOrderId1}
          />
        </TabPanel>
        <TabPanel value={value} index={5}>
          <AllOrder
            isfirst={isfirst}
            userid={user_id}
            sellerid={userid}
            orderStatus={6}
            valuechild={valuechild}
            userRoleId={userRoleId}
            getInternalOrderId={getInternalOrderId}
            getInternalOrderId1={getInternalOrderId1}
          />
        </TabPanel>

        <TabPanel value={value} index={6}>
          <AllOrder
            isfirst={isfirst}
            userid={user_id}
            sellerid={userid}
            orderStatus={7}
            valuechild={valuechild}
            userRoleId={userRoleId}
            getInternalOrderId={getInternalOrderId}
            getInternalOrderId1={getInternalOrderId1}
          />
        </TabPanel>
        <TabPanel value={value} index={7}>
          <AllOrder
            isfirst={isfirst}
            userid={user_id}
            sellerid={userid}
            orderStatus={8}
            valuechild={valuechild}
            userRoleId={userRoleId}
            getInternalOrderId={getInternalOrderId}
            getInternalOrderId1={getInternalOrderId1}
          />
        </TabPanel>
        <TabPanel value={value} index={8}>
          <AllOrder
            isfirst={isfirst}
            userid={user_id}
            sellerid={userid}
            valuechild={valuechild}
            orderStatus={9}
            userRoleId={userRoleId}
            getInternalOrderId={getInternalOrderId}
            getInternalOrderId1={getInternalOrderId1}
          />
        </TabPanel>

        {/* <AppBar position="static" color="default" style={{ marginTop: "15px" }}>
          <Tabs
            value={valuechild}
            onChange={handleChangeCA}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            <Tab label={<span className={classes.tabRoot}>USA</span>} {...a11yProps2(1)} />
            <Tab label={<span className={classes.tabRoot}>CA</span>} {...a11yProps2(2)} />
          </Tabs>
          </AppBar>
          <TabPanel2 value={valuechild} index={1}>
          <AllOrder
            isfirst={isfirst}
            userid={user_id}
            sellerid={userid}
            valuechild={valuechild}
            orderStatus={0}
            userRoleId={userRoleId}
            getInternalOrderId={getInternalOrderId}
            getInternalOrderId1={getInternalOrderId1}
          />
        </TabPanel2>
        <TabPanel2 value={valuechild} index={2}>
          <AllOrder
            isfirst={isfirst}
            userid={user_id}
            sellerid={userid}
            valuechild={valuechild}
            orderStatus={0}
            userRoleId={userRoleId}
            getInternalOrderId={getInternalOrderId}
            getInternalOrderId1={getInternalOrderId1}
          />
        </TabPanel2> */}
      </View>
    </View>
  );
}

ScrollableTabsButtonAuto.propTypes = {
  switchHandling: PropTypes.func,
  refreshOrderScreen: PropTypes.func,
};
