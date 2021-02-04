import React ,{ useState, useEffect } from 'react';
import clsx from 'clsx';
import { fade,withStyles,makeStyles, useTheme} from '@material-ui/core/styles';
import {Platform,View,ScrollView,Image,Text,Dimensions} from 'react-native';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import popUpStyle from './style/popUpStyle';
import Link from '@material-ui/core/Link';
import * as shiphypeservice from './ShipService/shiphype_service';
import ProgressBar from './feedback/ProgressBar';

import TextField from "@material-ui/core/TextField";
import Autocomplete from '@material-ui/lab/Autocomplete';
import AsyncStorage from "@react-native-community/async-storage";
import * as localStorage from "./localstorage/LocalStorage";

const useStyles = makeStyles(theme => ({
    submit: {
      margin: theme.spacing(0, 0, 0),
      borderRadius : 0,
},
appBarSpacer: theme.mixins.toolbar,
content: {
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(2),
  flexGrow: 1,
  height: '120vh',
  overflow: 'auto',
  backgroundColor:'#fff',
},
profileMargin: {
  marginTop: theme.spacing(2),
  borderRadius : 0,
},
}));


//Make custom button
const ColorButton = withStyles(theme => ({
    root: {
      color: '#fff',
      borderRadius : '3px',
      //  paddingTop: '9%',
      //  paddingBottom: '9%',
      height:'100%',
      width:'90px',
       fontSize:'12px',
       fontWeight: '550',
       color:'#fff',
       backgroundColor:'#0168fa',
      '&:hover': {
        backgroundColor: '#002080',
        
      },
    },
  }))(Button);
  const ColorButtonTes = withStyles(theme => ({
    root: {
      color: '#fff',
      backgroundColor: '#0168fa',
       borderColor: '#0168fa',
       borderRadius:'3px',
       fontWeight:'700',
       height:35,
       width:150,
            fontSize:'11px',
       fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
      '&:hover': {
        backgroundColor: '#002080',
        
      },
    },
  }))(Button);

/**
 * Description:This function is used for Slide17
 * @param {*} props 
 */
export default function ManualOrder(props) {
  
   const classes = useStyles();  
   const [radioValue,setRadioValue] = React.useState(0);
   const [loading, setLoading] = React.useState(false);
   const[promotionalPackage,setPromotionalPackage]=React.useState([]);
   const userid=props.user_id;
   const [userData , setUserData] = React.useState([]);
  
   const [sellerid,setSellerid]=React.useState(0);
   const promotionalData = {};
  
   React.useEffect(() => {
    // fetchProductListOfLastWeek();   
     fetchUserInfo();   
  } ,[]);

  const handleChangeButton = (data) => {
    localStorage.storeData("userName",data.displayName);
    window.sessionStorage.setItem("userName",data.displayName);

// localStorage.storeData("code",props.code);
// window.sessionStorage.setItem("code", props.code);
var fruits =[];

          window.sessionStorage.setItem('dataItem', JSON.stringify(fruits));
          localStorage.storeData("userid", data.id);
          
          window.sessionStorage.setItem("userid", data.id);
          AsyncStorage.setItem(
            "userid",
            JSON.stringify(data.id)
          );

          localStorage.storeData("imitate", true);
          
          window.sessionStorage.setItem("imitate", true);
          AsyncStorage.setItem(
            "imitate",
            JSON.stringify(true)
          );

localStorage.storeData("roleId",2);
window.sessionStorage.setItem("roleId",2);

localStorage.storeData("isadmin",false);
window.sessionStorage.setItem("isadmin", false);
props.handleDashboard('01');
//props.navigation.navigate('Overview',{position:'01'});
      
      }; 


  var newArr = [];
  const fetchUserInfo = ()=>{
  
     //const userid=5;
     setLoading(true);
     shiphypeservice.fetchUserInfo()
     .then(response => {
      console.log("status",response.status);
           if(response.status === true) {
             setLoading(false);
             for (let a = 0; a < response.data.length; a++) {
              // var myObject = {};
              // response.data[a].id ? (myObject["id"] = response.data[a].id) : null;
              // response.data[a].displayName ? (myObject["displayName"] = response.data[a].displayName) : null;
              // response.data[a].userEmail
              //   ? (myObject["name"] = response.data[a].userEmail)
              //   : null;
              // newArr.push(myObject);


              if(response.data[a].userEmail==='')
              {
               var myObject = {};
               response.data[a].id ? (myObject["id"] = response.data[a].id) : null;
               response.data[a].displayName ? (myObject["displayName"] = response.data[a].displayName) : null;
               response.data[a].displayName
                 ? (myObject["name"] = response.data[a].displayName)
                 : null;
               newArr.push(myObject);
              }
              else{
               var myObject = {};
               response.data[a].id ? (myObject["id"] = response.data[a].id) : null;
               response.data[a].displayName ? (myObject["displayName"] = response.data[a].displayName) : null;
               response.data[a].userEmail
                 ? (myObject["name"] = response.data[a].userEmail)
                 : null;
               newArr.push(myObject);
              }
            }
            console.log("array", newArr);
             setUserData(newArr);
          
            
              
                      }else{
                       setLoading(false);
                       console.log("message",response.message);
                      }   
         }).catch((error) =>{
               console.error(error);
         });
   }
 



    return (  
      <View className={classes.content}>
    <View className={classes.appBarSpacer} />
  
              <View >
            <Grid item  container lg={12}>
            <Grid item  lg={5}   style={popUpStyle.breadCrumSidePadding}>
            <Link  onClick={()=>{props.handleDashboard('01')}}>
            <Text style={popUpStyle.breadCrundCss1}>DASHBOARD /</Text>
            </Link> 
            {/* <Text style={popUpStyle.breadCrundCss}>ORDERS / MANUAL ORDER / </Text> */}
          <Text style={popUpStyle.breadCrundCss2}> Imitate  {'\n'} </Text> 
            
              </Grid>
              <Grid item  lg={2} ></Grid>
              </Grid>
              </View>  
              <Grid justify="center">
            <ProgressBar 
             loading={loading}
            />
            </Grid>

         {/* <ScrollView> */}
         
         <View style={popUpStyle.paddingSide}>
         <Grid container justify="space-between" spacing={2}>
            <Grid item xs={12} md={4} lg={4}>
       
              </Grid>
              <Grid item xs={12} md={4} lg={4} ></Grid>
              <Grid item xs={12} md={4} lg={4} 
              //style={{marginRight:'70px'}} 
               >
  
              <Grid container item  justify="flex-end">

              <Grid>
       
     
              </Grid>
            <Grid>
              {/* <ColorButton
      size='large'
       variant="contained"
       color="primary"
      // className={classes.profileMargin}
       onClick={()=>{handleCallbackfunction()}}

       >
         Back
       </ColorButton> */}
    
              </Grid>
              </Grid>
            
              </Grid>
              </Grid>
              </View>
              <View style={popUpStyle.paddingSide}>

              <form className={classes.form}>
         <Grid container   justify="space-between" >

         <Grid  items xs={12} lg={12}>
       
        <Text style={{ fontSize: '16px',
          fontWeight: '700',
            // marginLeft:'10px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}}>
              
              Select Seller For Imitation </Text>
            
              </Grid>
        <Grid  items xs={12} lg={12} style={{marginTop:'35px'}}>
       
        <Autocomplete
       id="combo-box-demo"
       fullWidth
       options={userData}
       getOptionLabel={(option) => option.name}
      
       style={{ width: 400 }}
       renderInput={(params) => <TextField {...params} size="small" placeholder="Search Seller" variant="outlined" />}
       onChange={(event, newValue) => {
           if(newValue !== null){
          //  fetchProductListById(newValue.id); 
            setSellerid(newValue);
         
           }
         console.log("newvalue",newValue);
       }}
     />

         
       
      
        </Grid>
        <Grid  items xs={12} lg={12}>
      
       <ColorButtonTes
  size='large'
  variant="contained"
  color="primary"
  className={classes.profileMargin}
    onClick={()=>{handleChangeButton(sellerid)}}
    >
   {/* Subscription Box Order */}
  Submit
    
    </ColorButtonTes>
         
         
      
        </Grid>
       
      </Grid>
        

           </form>
</View>

        </View>
    );
  }

