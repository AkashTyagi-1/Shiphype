import React ,{ useState, useEffect } from 'react';
import clsx from 'clsx';
import { fade,withStyles,makeStyles, useTheme} from '@material-ui/core/styles';
import {Platform,View,ScrollView,Image,Text,Dimensions} from 'react-native';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import * as shiphypeservice from './ShipService/shiphype_service';
import StepConnector from '@material-ui/core/StepConnector';
import popUpStyle from './style/popUpStyle';
import Link from '@material-ui/core/Link';
import ProgressBar from './feedback/ProgressBar';
import AsyncStorage from "@react-native-community/async-storage";
const QontoConnector = withStyles({
 
  line: {
    borderColor: '#3f51b5',
    borderTopWidth: 2,
    borderRadius: 1,
  },
})(StepConnector);


const ColorButton3 = withStyles(theme => ({
  root: {
    color: '#fff',
    borderRadius : '3px',
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    height:'60%',
    width:'90px',
     fontSize:'11px',
     fontWeight: '550',
     color:'#fff',
     backgroundColor:'#0168fa',

    '&:hover': {
      backgroundColor: '#002080',
      
    },
  },
}))(Button);


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
textArea:{
  marginTop: theme.spacing(0),
  borderRadius : 0,
},
profileMargin: {
  marginTop: theme.spacing(2),
  borderRadius : 0,
},
paper: {
  border: '2px solid #ced4da',
  height: 100,
  width: 100,
},
root: {
  //flexGrow: 1,
  width: '100%',
},
profileMargin10: {
  
  },
  
  profileMargin1: {
    marginTop: theme.spacing(1),
    borderRadius : '5px',
    
  //  marginBottom: theme.spacing(1),
  },
  button2 :{
    border : ' 1px solid #c0ccda',
    borderRadius : '5px',
    // paddingTop: '10%',
    // paddingBottom: '10%',
    height:'100%',
    width:'100px',
    fontSize:'11px',
    fontWeight: '550',
    color:'rgba(27, 46, 75, 0.7)',
    // paddingLeft: '22%',
    // paddingRight: '22%',
    
  },
  buttonHome :{
   // border : ' 1px solid #c0ccda',
    borderRadius : '5px',
    // paddingTop: '10%',
    // paddingBottom: '10%',
    fontSize:'11px',
    fontWeight: '550',
    color:'#fff',
    backgroundColor:'#000',
    // paddingLeft: '22%',
    // paddingRight: '22%',
    height:'100%',
    width:'100px',
    '&:hover': {
      color:'#fff',
      backgroundColor:'#000',
    },
  },
  buttonOrder :{
    // border : ' 1px solid #c0ccda',
     borderRadius : '5px',
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    height:'100%',
    width:'110px',
     fontSize:'11px',
     fontWeight: '550',
     color:'#fff',
     backgroundColor:'#0168fa',
    //  paddingLeft: '22%',
    //  paddingRight: '22%',
     '&:hover': {
       color:'#fff',
       backgroundColor:'#0168fa',
     },
   },
   margin: {
    margin: theme.spacing(1),
  },

  radioButtonCss:{
    color:'#000',fontSize:'2px',    height: '25px'
  },
// grid: {
//   width: 100,
//   height: 100,
// },
normal :{
  marginTop: theme.spacing(2),
    borderRadius : '0px',
    height:100,
     width:290,
     fontWeight:'700',
    backgroundColor:'#0168fa',
    color:'#fff',
    '&:hover': {
      backgroundColor: '#002080',
      color:'#fff',
    },
    
  },
  disabledButton: {
    backgroundColor:'#808080',
    color:'#fff',
  },
  normalSelected :{
    marginTop: theme.spacing(2),
    borderRadius : '0px',
    height:100,
    width:290,
    fontWeight:'700',
    backgroundColor:'#002080',
    color:'#fff',
    '&:hover': {
      backgroundColor: '#002080',
      color:'#fff',
    },
    
  },
  urgent :{
    marginTop: theme.spacing(2),
    borderRadius : '0px',
    height:100,
     width:290,
     fontWeight:'700',
    backgroundColor:'#0168fa',
    color:'#fff',
    '&:hover': {
      backgroundColor: '#002080',
      color:'#fff',
    },
    
    
    
  },
  urgentSelected :{
    marginTop: theme.spacing(2),
    borderRadius : '0px',
     height:100,
     width:290,
     fontWeight:'700',
    backgroundColor:'#002080',
    color:'#fff',
    '&:hover': {
      backgroundColor: '#002080',
      color:'#fff',
    },
    
    
  },
}));


/****   For changing the textfield radius  : End *********/
const styles = (theme) => ({
  root: {
    '@media print': {
    margin: 0,
    padding: theme.spacing(1),
    borderRadius:0
    },
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: '-2px',
    color: theme.palette.grey[500],
  },
 
});
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
       height:45,
       width:290,
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
   const userid=props.user_id;
   const [radioValue,setRadioValue] = React.useState(0);
   const [loading, setLoading] = React.useState(false);
   const[value,setValue]=React.useState('');
   const[promotionalPackage,setPromotionalPackage]=React.useState([]);
   const[packageresp,setPackageresp]=React.useState([]);
    
          React.useEffect(() => {
            //fetchOrderList(userid);  
            fetchPackageForPromotional(); 
           // handleSetCheckboxValue();
           shiphypeservice.fetchCustomePaching(userid,1)
                  .then(response => {
                   console.log("status",response.status);
                        if(response.status === true) {
                          setLoading(false);
                          setPackageresp(response.data);
                                   }else{
                                    setLoading(false);
                                    console.log("message",response.message);
                                   }   
                      }).catch((error) =>{
                            console.error(error);
                      });
          } ,[]);
          const fetchPackageForPromotional = () => {    
            setLoading(true);
            shiphypeservice.fetchCustomePaching(userid,2)
                  .then(response => {
                   console.log("status",response.status);
                        if(response.status === true) {
                          setLoading(false);
                          setPromotionalPackage(response.data);
                                   }else{
                                    setLoading(false);
                                    console.log("message",response.message);
                                   }   
                      }).catch((error) =>{
                            console.error(error);
                      });
          };
          
          const promotionalData = {};
          promotionalPackage.map(orderCouierOp => {
              const { packaggingId, packaggingName } = orderCouierOp;
              promotionalData[ packaggingId ] = packaggingName
          })
          const packageData = {};
          packageresp.map(orderCouierOp => {
              const { packaggingId, packaggingName } = orderCouierOp;
              packageData[ packaggingId ] = packaggingName
          })

          const handleChangeButton = (id) => {
            AsyncStorage.removeItem("ProductSelect1");
              // setProjectid(row);
                setRadioValue(id);
                props.setOrderKind(id,promotionalData,packageData);
                props.handleNextPage('select_Order_Product');
                //props.handleNextPage('manual_order');
                console.log('button value', id)
                }; 
      
React.useEffect(() => {
    // fetchCustomePackageingList();
  //   fetchShiphypeCompleteStep(); 
  
  if(props.editOrder !== null){
    setRadioValue(props.editOrder.orderkind);
  }
  } ,[]);
 
 
 
  

    const handleCallbackfunction =()=>{
      //  props.backButtonRouting('ShippingPolicyOrder');
        props.backButtonRouting('02');
      }


          let screenWidth = Dimensions.get('window').width;

    return (  
      <View className={classes.content}>
    <View className={classes.appBarSpacer} />
  
              <View >
            <Grid item  container lg={12}>
            <Grid item  lg={5}   style={popUpStyle.breadCrumSidePadding}>
            <Link  onClick={()=>{props.handleDashboard('01')}}>
            <Text style={popUpStyle.breadCrundCss1}>DASHBOARD /</Text>
            </Link> <Text style={popUpStyle.breadCrundCss}>ORDERS / MANUAL ORDER / </Text>
          <Text style={popUpStyle.breadCrundCss2}> Warehouse {'\n'} </Text> 
            
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
            {/* <Text style={{ fontSize: '15px',
          fontWeight: '700',
            // marginLeft:'10px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}}>
              
              Select Order Type</Text> */}
              </Grid>
              <Grid item xs={12} md={4} lg={4} ></Grid>
              <Grid item xs={12} md={4} lg={4} 
              //style={{marginRight:'70px'}} 
               >
  
              <Grid container item  justify="flex-end">

              <Grid>
              {/* <ColorButton
       size='large'
       variant="contained"
       color="primary"
      // className={classes.profileMargin}
       onClick={()=>{handleCallbackfunction()}}
       >
          Back
       </ColorButton>*/}
       &nbsp;&nbsp; 
    
              </Grid>
            <Grid>
              <ColorButton
      size='large'
       variant="contained"
       color="primary"
      // className={classes.profileMargin}
       onClick={()=>{handleCallbackfunction()}}

       >
         Back
       </ColorButton>
    
              </Grid>
              </Grid>
            
              </Grid>
              </Grid>
              </View>


              <form className={classes.form}>
         <Grid container   justify="space-between" >

         <Grid  items xs={12} lg={12}>
        <Grid justify="center" container>
        <Text style={{ fontSize: '15px',
          fontWeight: '700',
            // marginLeft:'10px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}}>
              
              Select Warehouse</Text>
              </Grid>
              </Grid>
        <Grid  items xs={12} lg={12} style={{marginTop:'35px'}}>
        <Grid justify="center" container>
      
        <ColorButtonTes
  size='large'
  variant="contained"
  color="primary"
  className={classes.profileMargin}
  //  className={clsx((radioValue !== 1) && classes.normal, (radioValue === 1) && classes.normalSelected)}
    onClick={()=>{handleChangeButton(2)}}
   // startIcon={<ShoppingCartIcon />}
    >
    Canada Warehouse
  
    </ColorButtonTes>

         
          </Grid>
      
        </Grid>
        <Grid  items xs={12} lg={12}>
        <Grid justify="center" // Add it here :)
      container>
       
       <ColorButtonTes
  //  className={clsx((radioValue !==2 ) && classes.urgent, (radioValue === 2) && classes.urgentSelected)}
  size='large'
  variant="contained"
  color="primary"
  className={classes.profileMargin}
    onClick={()=>{handleChangeButton(1)}}
    //startIcon={<CropOriginalIcon />}
    >
   US Warehouse
    
    </ColorButtonTes>
         
          </Grid>
      
        </Grid>
       
      </Grid>
        

           </form>

         {/* <form className={classes.form}>
         <Grid  justify="space-between" alignItems="center"
      container 
      spacing={2} >
         <Grid item xs={12} md={12} lg={12}   >
         
  
    <Grid item xs={12} md={12} lg={12} container spacing={1} direction='column' > 
    <Grid item xs={5} md={5} lg={5} >
    
   
    </Grid>
    <Grid item xs={5} md={5} lg={5}>            
    
    </Grid>

  </Grid>
       </Grid>
      
       </Grid></form> */}

  
       
       
         
           
        </View>
    );
  }
