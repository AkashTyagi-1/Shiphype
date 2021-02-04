import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { fade, makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import ListItemText from "@material-ui/core/ListItemText";
import Main from "./Main";
import {
  Platform,
  ScrollView,
  View,
  Image,
  Dimensions,
  Text,
  ViewBase,
  ImageBackground,
} from "react-native";
import pageLoader from "../../assets/icons/page-loader.gif";
import backgroundImage from "../../assets/banner/backgroundDesign.png";
import * as shiphypeService from "./ShipService/shiphype_service";
import * as localStorage from "./localstorage/LocalStorage";
import queryString from "query-string";
import Toast from './feedback/Toast';
import AsyncStorage from "@react-native-community/async-storage";
import Button from '@material-ui/core/Button';

const StyledListItemText = withStyles({
  root: {
    width: "14px",
    padding: "0px",
    marginLeft: "15px",
    fontSize: "10px",
    marginTop: "0px",
    marginBottom: "0px",
  },
})(ListItemText);

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright Â© "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
  "@global": {
    "*::-webkit-scrollbar": {
      width: "0.4em",
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.2)",
      outline: "1px solid slategrey",
    },
  },

  root: {
    display: "flex",
    overflowY: "auto",
    overflowX: "auto",
    //backgroundColor:'red'
  },
  toolbar: {
    paddingRight: 15,
    paddingLeft: 12, // keep right padding when drawer closed
    backgroundColor: "#fff",
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    backgroundColor: "#00bfbf",
    zIndex: theme.zIndex.drawer + 1,
    elevation: 0,

    borderBottom: "1px solid #cccccc",
    shadowOpacity: 0,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  toolbarIcon1: {
    textAlign: "left",

    display: "contents",
    alignItems: "flex-end",
    justifyContent: "center",
    flexDirection: "row",
    position: "absolute",
  },

  //
  toolbarIcon2: {
    marginTop: "15px",
    width: "15px",
    paddingLeft: "0px",
    paddingRight: "0px",
    paddingTop: "0px",
    paddingBottom: "0px",
    marginRight: "10px",
    fontSize: "10px",
  },
  toolbarIcon3: {
    marginTop: "5%",
    width: "15px",
    paddingLeft: "0px",
    paddingRight: "0px",
    paddingTop: "0px",
    paddingBottom: "0px",
    marginRight: "10px",
    fontSize: "10px",
  },

  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    elevation: 0,
    shadowOpacity: 0,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    alignItems: "center",
    justifyContent: "center",
    color: "grey",
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  // drawerPaper: {
  //   position: 'relative',
  //   whiteSpace: 'nowrap',
  //   backgroundColor:'#00bfbf',
  //   width: drawerWidth,
  //   height:'100vh',
  //   transition: theme.transitions.create('width', {
  //   easing: theme.transitions.easing.sharp,
  //   duration: theme.transitions.duration.enteringScreen,
  //   }),
  // },
  drawerPaper: {
    position: "relative",
    whiteSpace: "wrap",
    backgroundColor: "#fff",
    width: drawerWidth,
    height: "100vh",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    backgroundColor: "#fff",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(8.7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(8.7),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  root10: {
    display: "flex",
  },
  paperlogo: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    padding: "1%",
    alignItems: Platform.OS === "android" ? "center" : "left",
  },
  avatarsmall: {
    width: theme.spacing(3.5),
    height: theme.spacing(3.5),
  },
  drawerWithOpen: {
    width: "15%",
  },
  drawerWithClosed: {
    width: "3%",
  },
  sideWithOpen: {
    width: "85%",
  },
  sideWithClosed: {
    width: "97%",
  },

  drawerWithOpen1: {
    width: "65%",
  },
  drawerWithClosed1: {
    width: "14%",
  },
  sideWithOpen1: {
    width: "35%",
  },
  sideWithClosed1: {
    width: "86%",
  },

  drawerWithOpen2: {
    width: "30%",
  },
  drawerWithClosed2: {
    width: "10%",
  },
  sideWithOpen2: {
    width: "70%",
  },
  sideWithClosed2: {
    width: "90%",
  },

  drawerWithOpen4: {
    width: "30%",
  },
  drawerWithClosed4: {
    width: "10%",
  },
  sideWithOpen4: {
    width: "70%",
  },
  sideWithClosed4: {
    width: "90%",
  },

  drawerWithOpen3: {
    width: "17.50%",
  },
  drawerWithClosed3: {
    width: "4.60%",
  },
  sideWithOpen3: {
    width: "83%",
  },
  sideWithClosed3: {
    width: "96%",
  },

  drawerWithOpen6: {
    width: "11.55%",
  },
  drawerWithClosed6: {
    width: "3.60%",
  },
  sideWithOpen6: {
    width: "89%",
  },
  sideWithClosed6: {
    width: "96%",
  },

  drawerWithOpen5: {
    width: "14.50%",
  },
  drawerWithClosed5: {
    width: "4.60%",
  },
  sideWithOpen5: {
    width: "85.50%",
  },
  sideWithClosed5: {
    width: "95.40%",
  },

  dropDownIcon: {
    alignItems: "baseline",
    fontSize: "16px",
    fontFamily:
      'Neurial Grotesk", Roboto, system, -apple-system, BlinkMacSystemFont, ".SFNSDisplay-Regular", "Helvetica Neue", Helvetica, Arial, sans-serif',

    //  textTransform: 'uppercase',
    color: "#001737",
  },
  search: {
    position: "relative",
    borderRadius: "0px",
    border: "1px solid #FFFFFF",
    //backgroundColor: ,
    // '&:hover': {
    //   backgroundColor: fade(theme.palette.common.white, 0.25),
    // },
    marginLeft: 0,
    width: "100%",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#cccccc",
  },
  inputRoot: {
    color: "#000",
    fontSize: "14px",
    fontFamily:
      'Neurial Grotesk", Roboto, system, -apple-system, BlinkMacSystemFont, ".SFNSDisplay-Regular", "Helvetica Neue", Helvetica, Arial, sans-serif',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      "&:focus": {},
    },
  },
  toolbarIconOpen: {
    marginLeft: "4px",
    marginTop: "3%",
    alignItems: "baseline",
    position: "absolute",
    fontSize: "12px",
    // fontFamily: 'Neurial Grotesk", Roboto, system, -apple-system, BlinkMacSystemFont, ".SFNSDisplay-Regular", "Helvetica Neue", Helvetica, Arial, sans-serif',

    //  textTransform: 'uppercase',
    color: "#001737",
    "&:hover": {
      color: "#0158d4",
    },
    "&$selected": {
      color: "#0158d4",
    },
  },
  dropDownIconHover: {
    width: "30px",
    "&:hover": {
      cursor: "pointer",
      color: "#0158d4",
    },
  },
  dropDownIconHover7: {
    width: "30px",
    "&:hover": {
      cursor: "pointer",
      color: "#0158d4",
    },
  },
  toolbarIconClose: {
    marginBottom: "2px",
    alignItems: "baseline",
    fontSize: 500,
    // fontFamily: 'Neurial Grotesk", Roboto, system, -apple-system, BlinkMacSystemFont, ".SFNSDisplay-Regular", "Helvetica Neue", Helvetica, Arial, sans-serif',
  },
  toolbarIconOpen1: {
    marginLeft: "4px",
    alignItems: "baseline",
    position: "absolute",
    fontSize: "13px",
    fontWeight: "700",
    // fontFamily: 'Neurial Grotesk", Roboto, system, -apple-system, BlinkMacSystemFont, ".SFNSDisplay-Regular", "Helvetica Neue", Helvetica, Arial, sans-serif',

    textTransform: "uppercase",
    color: "#001737",

    transition: "all 0.25s",
  },
  toolbarIconClose1: {
    marginBottom: "2px",
    alignItems: "baseline",
    //   fontFamily: 'Neurial Grotesk", Roboto, system, -apple-system, BlinkMacSystemFont, ".SFNSDisplay-Regular", "Helvetica Neue", Helvetica, Arial, sans-serif',
  },
}));

export default function PageLoader({ navigation }) {
  const classes = useStyles();

  const [position, setPosition] = React.useState(2);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [userRoleId, setUserRoleId] = React.useState(1);
  const [loading, setLoading] = React.useState(true);
  const [user_id, setUserID] = React.useState(0);
  //Orderdata
  const [loginUserName, setLoginUserName] = React.useState("");

  const [code, setCode] = React.useState(navigation.getParam("code", "0"));
  const [settingLoad, setSettingLoad] = React.useState(true);
  const [open, setOpen]=React.useState(false);
  const [status,setStatus]=React.useState(false);
  const [ebaydone,setEbaydone]=React.useState(false);
  const [msg,setMsg]=React.useState('');
  const [type,setType]=React.useState('');
  //Setup Wizard
  const [state1, setState1] = useState({
    vertical: "top",
    horizontal: "center",
  });
  const [now, setNow] = React.useState(2);

  const [promotionalPackage, setPromotionalPackage] = React.useState([]);

  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 20;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);


  /**
   * Description:To do call module api
   */
  useEffect(() => {
   
    getURLValue();

    const decoded = decodeURIComponent("1%7CFP3k53qipJsiSSVdHh%2FTLpjYNE9%2FASPhT%2B1atk7WjHU%3D%7CFq%2BsbcI%2B2Wf5%2BfeyVFwVHDD5CcIOaIb7v4pXqNMfnK0%3D");
    console.log("decodeurl",decoded);
    
    console.log("userid",window.sessionStorage.getItem("userid"));
  }, []);

 
const updateebayDone=()=>{
  setEbaydone(false);
}
  const fetchUserDetails = (user) => {
    //const user_id=5;
    setLoading(true);
    shiphypeService
      .fetchUserDetail(user)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          
          var fruits =[];

          window.sessionStorage.setItem('dataItem', JSON.stringify(fruits));
          setLoginUserName(response.data.userdetails.displayName);
          localStorage.storeData("userid", response.data.userdetails.id);
          setUserID(response.data.userdetails.id);
          window.sessionStorage.setItem("userid", response.data.userdetails.id);
          AsyncStorage.setItem(
            "userid",
            JSON.stringify(response.data.userdetails.id)
          );
          if (response.data.userrole === "administrator") {
            setIsAdmin(true);
            setUserRoleId(1);
          } else {
            setIsAdmin(false);
            setUserRoleId(2);
          }
          setPosition(0);
          setSettingLoad(false);

          fetchAffiliateProgram(user);

         
        } else {
          setLoading(false);

          
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCallbackfunction =()=>{
    window.open('http://app.shiphype.com/', '_self');
 
}

  const fetchUserDetails1 = (user) => {
    //const user_id=5;
    setLoading(true);
    shiphypeService
      .fetchUserDetail(user)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          if (response.data.userdetails.isaffiliate === "false") {
            createAffiliateCode(user);
          }

          var fruits = [];

          window.sessionStorage.setItem("dataItem", JSON.stringify(fruits));

          setLoginUserName(response.data.userdetails.displayName);
          localStorage.storeData("userid", response.data.userdetails.id);
          setUserID(response.data.userdetails.id);
          window.sessionStorage.setItem("userid", response.data.userdetails.id);
          AsyncStorage.setItem(
            "userid",
            JSON.stringify(response.data.userdetails.id)
          );
          if (response.data.userrole === "administrator") {
            setIsAdmin(true);
            setUserRoleId(1);
          } else {
            setIsAdmin(false);
            setUserRoleId(2);
          }
          setPosition(0);
          setSettingLoad(false);
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchAffiliateProgram = (user) => {
    setLoading(true);
    shiphypeService
      .fetchAffiliateCode(user)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          if (response.data !== null) {
            if (response.data.length === 0) {
              createAffiliateCode(user);
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

  /**
   * Description:
   */
  const createAffiliateCode = (user) => {
    setLoading(true);
    shiphypeService
      .createAffiliateCode(user)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const ebaygetTokenapi = (code, integrationid, userid) => {
    shiphypeService
      .ebayIntegration(code, integrationid, userid)
      .then((response) => {
        if(response.status === true){
 AsyncStorage.setItem(
            "token",
            JSON.stringify(response.status)
          );
          setEbaydone(true);
          setOpen(true);
          setType('success');
          setMsg("Integration Successfully");
          setStatus(response.status);
          

   window.close();
parent.HandleClose2();
          console.log("sicess run");
          window.localStorage.storeData("ebaytokendone",response.status);
          window.localStorage.setItem("ebaytokendone",response.status);
          //window.sessionStorage.setItem("ebaytokendone", response.status);
        }else{
          // setEbaydone(true);
          // setOpen(false);
          // setType('success');
          // setMsg("Integration Successfully");
          // setStatus(response.status);
          // console.log("fail run");
          // localStorage.storeData("ebaytokendone",response.status);
          //window.sessionStorage.setItem("ebaytokendone", null);
          //window.localStorage.setItem("ebaytokendone",response.status);
        }
            
        console.log("token", response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };
  const showToast =(open,msg,type)=>{ 
 
    return(
  <Toast
   open={open}
   handleClose={handleClose}
   type={type}
   msg={msg}
  />
 )
  }

  const ColorButton2 = withStyles(theme => ({
    root: {
      color: '#fff',
      borderRadius : '3px',
      //  paddingTop: '9%',
      //  paddingBottom: '9%',
      height:45,
      width:350,
       fontSize:'11px',
       fontWeight: '550',
       color:'#fff',
       backgroundColor:'#0168fa',
      '&:hover': {
        backgroundColor: '#002080',
        
      },
    },
  }))(Button);


  const logout = () => {};

  /**
   * Description:To do call logout api
   */
  const getURLValue12 = () => {
    var vars = [];
    const windowUrl = window.location.search;

    if(window.location.pathname === "")
    {
      if(window.sessionStorage.getItem("userid") !== null)
      {
        var fruits =[];
        window.sessionStorage.setItem('dataItem', JSON.stringify(fruits));

        setUserID(parseInt(window.sessionStorage.getItem("userid")));
        setLoginUserName( window.sessionStorage.getItem("userName"));
        setUserRoleId(parseInt(window.sessionStorage.getItem("roleId")));
        if(parseInt(window.sessionStorage.getItem("roleId"))===1)
        {
          setIsAdmin(true);
        }
        else{
          setIsAdmin(false);
        }
        setPosition(0);
        setSettingLoad(false);
        console.log("uperconditionrun");
      }
      else{
        window.open('https://shiphype.com/', '_self');
        console.log("belowconditionrun");
      }
    }
    else{

      console.log("dusriconditionrun");
      var parts = window.location.href.replace(
        /[?&]+([^=&]+)=([^&]*)/gi,
        function (m, key, value) {
          vars[key] = value;
          setUserID(vars.id);
          setCode(vars.code);
          console.log(vars.success);
          ebaygetTokenapi(vars.code,1,window.sessionStorage.getItem("userid"));
          if(window.sessionStorage.getItem("intid") === 1){
       
          }else{
            shopfyIntegrationToken1(
              vars.code,
              window.sessionStorage.getItem("storename"),
              window.sessionStorage.getItem("userid"),
              4
            );
          }

          if(vars.success === 1){
            WoocommerceToken(window.sessionStorage.getItem("userid"),window.sessionStorage.getItem("storename"));
          }else{
            WoocommerceToken(window.sessionStorage.getItem("userid"),window.sessionStorage.getItem("storename"));
 
          }
          const decoded = decodeURIComponent(vars.code);

          squareSpaceIntegration( decoded,window.sessionStorage.getItem("userid"),6,window.sessionStorage.getItem("storename"),);
          WixIntegrationToken1(
            vars.code,
            window.sessionStorage.getItem("userid"),
            13,
            window.sessionStorage.getItem("storename"),
          );
          
          console.log("location hrf", windowUrl);
          const parsed = queryString.parse(windowUrl);
          console.log("parsedvalue", parsed);
          console.log("uuuuid", window.sessionStorage.getItem("userid"));
          console.log("storename", window.sessionStorage.getItem("storename"));
  
          const store_url = "https://www.quicklivesolutions.com";
          const endpoint = "/wc-auth/v1/authorize";
          const params = {
            app_name: "quicklivesolutions.com",
            scope: "read_write",
            user_id: 168,
            return_url: 'https://app.shiphype.com/',
            callback_url: "https://shiphype.com/",
          };
          const querydata=queryString.stringify(params).replace(/%20/g, '+');
          console.log("authenticatinda",store_url + endpoint + '?' + querydata);
          if (window.location.pathname === "/") {
            if(window.sessionStorage.getItem("userid") !== null){
              fetchUserDetails(window.sessionStorage.getItem("userid"));
            }else{
              fetchUserDetails(vars.id);
            }
            console.log("call");
          } else {
            if(window.sessionStorage.getItem("userid") !== null){
              fetchUserDetails1(window.sessionStorage.getItem("userid"));
              console.log("call1");
            }else{
              fetchUserDetails1(vars.id);
            }
            
          }
        }
      );
    }
  };

  const getURLValue = () => {
    var vars = [];
    const windowUrl = window.location.search;
    if(windowUrl==='')
    {

      AsyncStorage.multiGet(["userid"]).then((data) => {
        if (data[0][1] != null) {
          var ProductSelect1 = JSON.parse(data[0][1]);
          var fruits =[];
        window.sessionStorage.setItem('dataItem', JSON.stringify(fruits));
        fetchUserDetails(ProductSelect1);
        // setUserID(parseInt(ProductSelect1));
        // setLoginUserName( window.sessionStorage.getItem("userName"));
        // setUserRoleId(parseInt(window.sessionStorage.getItem("roleId")));
        // if(parseInt(window.sessionStorage.getItem("roleId"))===1)
        // {
        //   setIsAdmin(true);
        // }
        // else{
        //   setIsAdmin(false);
        // }
        // setPosition(0);
        // setSettingLoad(false);
          console.log("useridget", ProductSelect1);
        }else{
          window.open('https://shiphype.com/', '_self');
        }
      });
      // if(window.sessionStorage.getItem("userid") === null)
      // {
        
      // }
      // else{
        
        
      // }

     
      // window.sessionStorage.getItem("roleId");
      // window.sessionStorage.getItem("isadmin");
      // window.sessionStorage.getItem("userName");
      // window.sessionStorage.getItem("setnow");
    }
    else{
      var parts = window.location.href.replace(
        /[?&]+([^=&]+)=([^&]*)/gi,
        function (m, key, value) {
          vars[key] = value;
          setUserID(vars.id);
          setCode(vars.code);
          ebaygetTokenapi(vars.code,1,window.sessionStorage.getItem("userid"));
          if(window.sessionStorage.getItem("intid") === 1){
          }else{
            shopfyIntegrationToken1(
              vars.code,
              window.sessionStorage.getItem("storename"),
              window.sessionStorage.getItem("userid"),
              4
            );
          }
          if(vars.success === 1){
            WoocommerceToken(window.sessionStorage.getItem("userid"),window.sessionStorage.getItem("storename"));
          }else{
            WoocommerceToken(window.sessionStorage.getItem("userid"),window.sessionStorage.getItem("storename"));
 
          }

          const decoded = decodeURIComponent(vars.code);
          squareSpaceIntegration(decoded,window.sessionStorage.getItem("userid"),6,window.sessionStorage.getItem("storename"));
          WixIntegrationToken1(
            vars.code,
            window.sessionStorage.getItem("userid"),
            13,
            window.sessionStorage.getItem("storename"),
          );
          console.log("location hrf", windowUrl);
          const parsed = queryString.parse(windowUrl);
          console.log("parsedvalue", parsed);
          console.log("uuuuid", window.sessionStorage.getItem("userid"));
          console.log("storename", window.sessionStorage.getItem("storename"));
          const store_url = "https://www.quicklivesolutions.com";
          const endpoint = "/wc-auth/v1/authorize";
          const params = {
            app_name: "quicklivesolutions.com",
            scope: "read_write",
            user_id: 168,
            return_url: 'https://app.shiphype.com/',
            callback_url: "https://shiphype.com/",
          };
          const querydata=queryString.stringify(params).replace(/%20/g, '+');
          console.log("authenticatinda",store_url + endpoint + '?' + querydata);
          if (window.location.pathname === "/") {
            if(window.sessionStorage.getItem("userid") !== null){
              fetchUserDetails(window.sessionStorage.getItem("userid"));
            }else{
             
              if(vars.id===undefined)
              {
                window.open('https://shiphype.com/', '_self');
              }
              else{
                localStorage.storeData("userid", vars.id);
                //setUserID(response.data.userdetails.id);
                window.sessionStorage.setItem("userid",vars.id);
                AsyncStorage.setItem(
                  "userid",
                  JSON.stringify(vars.id)
                );
                fetchUserDetails(vars.id);
              }
            }
            console.log("call");
          } else {
            if(window.sessionStorage.getItem("userid") !== null){
              fetchUserDetails1(window.sessionStorage.getItem("userid"));
              console.log("call1");
            }else{
              if(vars.id===undefined)
              {
                window.open('https://shiphype.com/', '_self');
              }
              else{
                localStorage.storeData("userid", vars.id);
                //setUserID(response.data.userdetails.id);
                window.sessionStorage.setItem("userid",vars.id);
                AsyncStorage.setItem(
                  "userid",
                  JSON.stringify(vars.id)
                );
                
                fetchUserDetails1(vars.id);
              }
              fetchUserDetails1(vars.id);
            }
          }
        }
      );
    }
  }

  const shopfyIntegrationToken1 = (
    code,
    storename,
    user_id,
    integration_id
  ) => {
    shiphypeService
      .shopfyIntegrationToken(code, storename, user_id, integration_id)
      .then((response) => {
        if(response.status === true){
          AsyncStorage.setItem(
            "token",
            JSON.stringify(response.status)
          );          
          window.close();  
window.opener.HandleClose2();
      }
        console.log("token", response);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const WixIntegrationToken1 = (
    code,
    user_id,
    integration_id,
    storename,
  ) => {
    shiphypeService
      .WixIntegrationToken(code, user_id, integration_id,storename)
      .then((response) => {
        if(response.status === true){
          AsyncStorage.setItem(
            "token",
            JSON.stringify(response.status)
          );          
          window.close();  
window.opener.HandleClose2();
      }
        console.log("token", response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const squareSpaceIntegration = (
    code,
    user_id,
    integration_id,
    storename
  ) => {
    shiphypeService
      .squareSpaceIntegration(code, user_id, integration_id,storename)
      .then((response) => {
        if(response.status === true){
          AsyncStorage.setItem(
            "token",
            JSON.stringify(response.status)
          );          
          window.close();  
      }
        console.log("token", response);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  const WoocommerceToken = (
    user_id,
    storename
  ) => {
    shiphypeService
      .wocommerceToken(user_id,storename)
      .then((response) => {
        if(response.status === true){         
          window.close();  
      }
      })
      .catch((error) => {
        console.error(error);
      });
  };


  React.useEffect(() => {
    fetchShiphypeCompleteStep1();
  }, []);
  const fetchShiphypeCompleteStep1 = () => {
    //  const user_id=user_id;
    shiphypeService
      .fetchStepCompleteStatus(user_id)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          //setLoading(false);
          //  setStepDone(response.data);
          if (response.data.length !== 0) {
            console.log("lenght", response.data.length);
            for (let i = 0; i < response.data.length; i++) {
              if (response.data[i].shiphypesubstepId === 5) {
                setNow(6);
              } else if (response.data[i].shiphypesubsubstepId === 3) {
                setNow(12);
              } else if (response.data[i].shiphypesubsubstepId === 4) {
                setNow(18);
              } else if (response.data[i].shiphypesubsubstepId === 5) {
                setNow(24);
              } else if (response.data[i].shiphypesubsubstepId === 6) {
                setNow(30);
              } else if (response.data[i].shiphypesubsubstepId === 7) {
                setNow(36);
              } else if (response.data[i].shiphypesubsubstepId === 8) {
                setNow(42);
              } else if (response.data[i].shiphypesubstepId === 9) {
                setNow(48);
              } else if (response.data[i].shiphypesubstepId === 11) {
                setNow(54);
              } else if (response.data[i].shiphypesubstepId === 12) {
                setNow(60);
              } else if (response.data[i].shiphypesubstepId === 13) {
                setNow(66);
              } else if (response.data[i].shiphypesubstepId === 14) {
                setNow(78);
              } else if (response.data[i].shiphypesubstepId === 15) {
                setNow(89);
              } else if (response.data[i].shiphypesubstepId === 16) {
                setNow(100);
              } else {
                setNow(50);
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

  /**
   * Description:This function return curent component on click side drawer
   */
  const SwitchHandling = () => {
    if (position === 0) {
      return (
        <Main
          isAdmin={isAdmin}
          loginUserName={loginUserName}
          code={code}
          now={now}
          userRoleId={userRoleId}
          user_id={user_id}
          navigation={navigation}
          pageLoad={true}
          ebaydone={ebaydone}
          updateebayDone={updateebayDone}
        />
      );
    } else {
    }
  };
  /**
   * Created by:React team
   * Use: when user select any drawer item get position from drawer list and open component
   * Created date: 2020/03/19
   */

  //  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <View className={classes.root}>
      {(() => {
        if (settingLoad === true) {
          return (
            <View style={{ height: "100vh" }}>
              <ImageBackground
                source={backgroundImage}
                style={{
                  flex: 1,

                  resizeMode: "cover",
                }}
              >
                <Grid
                  justify="space-between"
                  container
                  style={{ marginTop: "10%" }}
                >
                  <Grid
                    justify="center" // Add it here :)
                    container
                  >
                    <Grid items>
                      <Image
                        style={{ width: "382px", height: "300px" }}
                        source={pageLoader}
                      />
                      <br />
                      <ColorButton2
                      size='large'
                      variant="contained"
                      color="primary"
                     // className={classes.profileMargin}
                      onClick={()=>{handleCallbackfunction()}}
                      > If there is a loading issue, simply click Here</ColorButton2>
                       
                    </Grid>
                  </Grid>
                </Grid>
              </ImageBackground>
              {showToast(open,msg,type)}
            </View>
            
          );
        } else {
          return(
            <View>{SwitchHandling()}
           
          </View>
          ); 
        }
      })()}
    </View>
  );
}