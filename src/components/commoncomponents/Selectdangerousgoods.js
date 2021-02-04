import React ,{ useState, useEffect } from 'react';
import clsx from 'clsx';
import { fade,withStyles,makeStyles, useTheme} from '@material-ui/core/styles';
import {Platform,View,ScrollView,Image,Text,Dimensions} from 'react-native';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import * as shiphypeservice from './ShipService/shiphype_service';
import StepConnector from '@material-ui/core/StepConnector';
import Toast from './feedback/Toast';
import Switch from '@material-ui/core/Switch';
import Link from '@material-ui/core/Link';
import popUpStyle from './style/popUpStyle';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
/**For Style */


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
    backgroundColor:'#808080',
    color:'#fff',
    '&:hover': {
        backgroundColor:'#808080',
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
      
        backgroundColor:'#0168fa',
        color:'#fff',
        },
    
  },
  urgent :{
   
    marginTop: theme.spacing(2),
    borderRadius : '0px',
    height:100,
     width:290,
     fontWeight:'700',
    backgroundColor:'#808080',
    color:'#fff',
    '&:hover': {
        backgroundColor:'#808080',
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
        backgroundColor:'#0168fa',
        color:'#fff',
        },
  },
}));

const ColorButtonUpload = withStyles(theme => ({
  root: {
   borderRadius : '3px',
   //  paddingTop: '9%',
   //  paddingBottom: '9%',
   //marginTop:'3%',
   height:'100%',
   padding:'3px',
    width:'130px',
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
   * Description:To do show step of task
   */
  function getSteps() {
    return ['Marketplace Integration', 'Shipping Profile', 'Product Import','Product Sync','Import Customers'];
  }

/**
 * Description:This function is used for Slide17
 * @param {*} props 
 */
export default function SelectShippingType(props) {
  
   const classes = useStyles();
   const [open, setOpen]=React.useState(false);
   const [msg,setMsg]=React.useState('');
   const [type,setType]=React.useState('');
   const [dangerousGoodId, setDangerousGoodId] = React.useState(0);

          const handleChangeButtonGood = (id) => {
            // setProjectid(row);
            
            if(dangerousGoodId === 0){
              setDangerousGoodId(id);
             
            }else{
              setDangerousGoodId(0);
             
            }
              
            props.setShipingDangrousGoodUpdate(id);
            //  props.handleNextPage('ShippingPolicyOrder');
              props.handleNextPage('additional_order_options'); 
              console.log('button value', id)
              }; 


  /**
   * Description:Callback function
   */
  useEffect(() => {
    if(props.editOrder!==null)
    {
        if(props.editOrder.dangerousgoods === "1")
        {
          setDangerousGoodId(parseInt(props.editOrder.dangerousgoods));
         console.log("dangerousgood",props.editOrder.dangerousgoods);
        }
        else
        {
          setDangerousGoodId(0);
         
        }
       
    }
  
  }, []
  );

 

    const handleCallbackfunction =()=>{
    //    props.backButtonRouting('ShippingPolicyOrder');
    props.handleNextPage('select_ship_type');
      }


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


    return (  
      <View className={classes.content}>
    <View className={classes.appBarSpacer} />
  
              <View >
            <Grid item  container lg={12}>
            <Grid item  lg={5}   style={popUpStyle.breadCrumSidePadding}>
            <Link  onClick={()=>{props.handleDashboard('01')}}>
            <Text style={popUpStyle.breadCrundCss1}>DASHBOARD /</Text>
            </Link><Text style={popUpStyle.breadCrundCss}>  ORDERS / MANUAL ORDER /</Text>
          <Text style={popUpStyle.breadCrundCss2}> SHIPPING OPTIONS {'\n'} </Text> 
            
              </Grid>
              <Grid item  lg={2} ></Grid>
              </Grid>
              </View>  
        

         {/* <ScrollView> */}
         <View style={popUpStyle.paddingSide}>
         <Grid container justify="space-between" spacing={2}>
            <Grid item xs={12} md={4} lg={4}>
            <Text style={{ fontSize: '15px',
            fontWeight: '700',
            // marginLeft:'10px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}}>
              
              Select Dangerous Good</Text>
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
            
    
              </Grid>
              </Grid>
            
              </Grid>
              </Grid>
        
              
       <form className={classes.form}>
       <Grid item xs={12} lg={12} style={{marginTop:'10px'}}>
       <Grid justify="center"
      container>
            <Text style={{ fontSize: '15px',
            //fontWeight: '700',
            // marginLeft:'10px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}}>
              
              Is the item you are shipping considered "Dangerous Goods"?</Text></Grid>
              </Grid>

       <Grid container   justify="space-between" style={{marginTop:'20px'}}>

        
<Grid  items xs={12} lg={12}>
<Grid justify="center"
      container>
       
       <Button
    className={clsx((dangerousGoodId !== 1 ) && classes.urgent, (dangerousGoodId === 1) && classes.urgentSelected)}
    
    onClick={()=>{handleChangeButtonGood(1)}}
    >
  Yes
    
    </Button>
         

    

          </Grid>

</Grid>
<Grid  items xs={12} lg={12}>
<Grid justify="center"
      container>
       
       <Button
    className={clsx((dangerousGoodId !== 0 ) && classes.urgent, (dangerousGoodId === 0) && classes.urgentSelected)}
    
    onClick={()=>{handleChangeButtonGood(0)}}
    >
  No
    
    </Button>

          </Grid>

</Grid>

</Grid>
        
           </form>

  {showToast(open,msg,type)}
        </View>
       
         
           
        </View>
    );
  }

