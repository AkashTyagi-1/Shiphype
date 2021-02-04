import React ,{ useState, useEffect } from 'react';
import clsx from 'clsx';
import { fade,withStyles,makeStyles, useTheme} from '@material-ui/core/styles';
import {Platform,View,ScrollView,Image,Text,Dimensions} from 'react-native';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import StepConnector from '@material-ui/core/StepConnector';
import Switch from '@material-ui/core/Switch';
import popUpStyle from './style/popUpStyle';
import ProgressBar from './feedback/ProgressBar';
import * as shiphypeservice from './ShipService/shiphype_service';



  const AntSwitch = withStyles((theme) => ({
    root: {
      // width: 48,
      // height: 26,
      // padding: 0,
      display: 'flex',
      //background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      background: theme.palette.primary.main,
      borderRadius: 3,
      border: 0,
      width: 48,
      //color: 'white',
      height: 26,
      padding: '0 30px',
     // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    switchBase: {
      padding: 1,
      color: theme.palette.common.white,
      '&$checked': {
        transform: 'translateX(28px)',
        color: theme.palette.common.white,
        '& + $track': {
          opacity: 1,
          backgroundColor: theme.palette.common.white,
          borderColor: theme.palette.primary.main,
        },
      },
    },
    thumb: {
      width: 30,
      height: 24,
      borderRadius: 0,
      border: `1px solid`
      //boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    track: {
      border: `1px solid ${theme.palette.common.white}`,
      borderRadius: 0,
     // opacity: 1,
      backgroundColor: theme.palette.primary.main,
    },
    checked: {},
  }))(Switch);

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
    //border : ' 1px solid #cccccc',
  //  borderRadius : '5px',
    paddingTop: '1%',
    paddingBottom: '1%',
    paddingLeft: '0%',
    paddingRight: '0%',
    textTransform: 'none',
    color:'#0158d4',
  },
  buttonGreen :{
    paddingTop: '1%',
    paddingBottom: '1%',
    paddingLeft: '0%',
    paddingRight: '0%',
    textTransform: 'none',
    color:'#00b300',
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
  normalSelected :{
   
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
    backgroundColor:'#0168fa',
    color:'#fff',
    '&:hover': {
      backgroundColor: '#002080',
      color:'#fff',
        },
  },
}));


const ColorButtonTes = withStyles(theme => ({
  root: {
    color: '#fff',
    backgroundColor: '#0168fa',
     borderColor: '#0168fa',
     borderRadius:'3px',
     height:45,
     fontWeight:'700',
     width:290,
          fontSize:'11px',
     fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
    '&:hover': {
      backgroundColor: '#002080',
      
    },
  },
}))(Button);
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
       fontSize:'11px',
       fontWeight: '550',
       color:'#fff',
       backgroundColor:'#0168fa',
      '&:hover': {
        backgroundColor: '#002080',
        
      },
    },
  }))(Button);
 

 

/**
 * Description:This function is used for Slide17
 * @param {*} props 
 */
export default function SelectShippingType(props) {
  
   const classes = useStyles();
  
   const [radioValue,setRadioValue] = React.useState(0);
   const userid=props.user_id;
   const [open, setOpen]=React.useState(false);
   const [msg,setMsg]=React.useState('');
   const [type,setType]=React.useState('');
   const [loading,setLoading]=React.useState(true);
   const[promotionalPackage,setPromotionalPackage]=React.useState([]);


    const handleChangeButton = (id) => {
        // setProjectid(row);
          setRadioValue(id);
          props.setShipingOptionUpdate(id,promotionalData);
          //  props.handleNextPage('ShippingPolicyOrder');
        //    props.handleNextPage('select_dangrous_goods');
      //  props.handleNextPage('select_ship_type');
      props.handleNextPage('select_Order_Product');  
      console.log('button value', id)
          }; 

        
  /**
   * Description:Callback function
   */
  useEffect(() => {
    if(props.editOrder!==null)
    {
      setRadioValue(1);
        if(props.editOrder.optionId === 1)
        {
        setRadioValue(props.editOrder.optionId);
        }
        else if(props.editOrder.optionId === 2)
        {
          setRadioValue(props.editOrder.optionId);
        }
        else{
          setRadioValue(0);
        }
    }
  
  }, []
  );


  React.useEffect(() => {
    //fetchOrderList(userid);  
    fetchPackageForPromotional(); 
   // handleSetCheckboxValue();
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

    const handleCallbackfunction =()=>{
        //props.backButtonRouting('select_ship_type');
     //   props.backButtonRouting('select_customer_kind');
     props.backButtonRouting('select_order_type');
      }
    

   
 


    return (  
      <View className={classes.content}>
    <View className={classes.appBarSpacer} />
  
              <View >
            <Grid item  container lg={12}>
            <Grid item  lg={5}   style={popUpStyle.breadCrumSidePadding}>
            <Link  onClick={()=>{props.handleDashboard('01')}}>
            <Text style={popUpStyle.breadCrundCss1}>DASHBOARD /</Text>
            </Link><Text style={popUpStyle.breadCrundCss}> ORDERS / MANUAL ORDER /</Text>
          <Text style={popUpStyle.breadCrundCss2}> SHIPPING DESTINATION {'\n'} </Text> 
            
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
              
              Select Shipping Destination</Text> */}
              </Grid>
              <Grid item xs={12} md={4} lg={4} ></Grid>
              <Grid item xs={12} md={4} lg={4} 
              //style={{marginRight:'70px'}} 
               >
  
              <Grid container item  justify="flex-end">

              <Grid>
              <ColorButton
       size='large'
       variant="contained"
       color="primary"
      // className={classes.profileMargin}
       onClick={()=>{handleCallbackfunction()}}
       >
          Back
       </ColorButton>&nbsp;&nbsp;
    
              </Grid>
            <Grid>
              {/* <ColorButton
       size='large'
       variant="contained"
       color="primary"
       //className={classes.profileMargin}
       onClick={()=>{onNextfunction()}}
       >
          Next
       </ColorButton> */}
    
              </Grid>
              </Grid>
            
              </Grid>
              </Grid>
        

       <form className={classes.form}>
         <Grid container   justify="space-between" style={{marginTop:'0px'}}>
         <Grid  items xs={12} lg={12}>
        <Grid justify="center" container>
        <Text style={{ fontSize: '15px',
            fontWeight: '700',
            // marginLeft:'10px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          textAlign:'center',
            transition : 'all 0.25s',}}>
              
              Select Shipping Destination</Text>
              </Grid></Grid>
        
        <Grid  items xs={12} lg={12} style={{marginTop:'35px'}}>
        <Grid justify="center" container>
      
        <ColorButtonTes
  //  className={clsx((radioValue !==2 ) && classes.urgent, (radioValue === 2) && classes.urgentSelected)}
  size='large'
  variant="contained"
  color="primary"
  className={classes.profileMargin}
   // className={clsx((radioValue !== 1) && classes.normal, (radioValue === 1) && classes.normalSelected)}
    onClick={()=>{handleChangeButton(1)}}
    >
   Domestic Shipping
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
    //className={clsx((radioValue !==2 ) && classes.urgent, (radioValue === 2) && classes.urgentSelected)}
    
    onClick={()=>{handleChangeButton(2)}}
    >
   International Shipping
    
    </ColorButtonTes>
         
          </Grid>
      
        </Grid>
       
      </Grid>
           </form>

        </View>
       
         
           
        </View>
    );
  }

