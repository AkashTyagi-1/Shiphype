import React from 'react';
import clsx from 'clsx';
import {Platform,View,Image,Text,Dimensions,ProgressBar} from 'react-native';
import { makeStyles,withStyles , useTheme} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import PropTypes from "prop-types";
import * as shiphypeservice from './ShipService/shiphype_service';
import popUpStyle from './style/popUpStyle';

import Link from '@material-ui/core/Link';
import { format } from 'date-fns';




const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
  
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: 'none',
    },
    title: {
      flexGrow: 1,
    },
   
    appBarSpacer: theme.mixins.toolbar,
    content: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(2),
      flexGrow: 1,
      height: '80vh',
      overflow: 'auto',
      backgroundColor:'#fff',
    },
    
      profileMargin: {
        marginTop: theme.spacing(0),
        borderRadius : 0,
        marginRight:'0px',
      },
      profileMargin1: {
        marginTop: theme.spacing(1),
        borderRadius : '5px',
      },
  }));

  export default function ArrangeShipping(props) {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight1);   
    const[value,setValue]=React.useState('8');
  const [qualitycontrol,setQualitycontrol]=React.useState(false);
  const [printsku,setPrintsku]=React.useState(false);
  const [addrequest,setAddrequest]=React.useState(false);
  //const [selectproduct,setSelectproduct]=React.useState(false);
  const module=[];
  const optionArray=[];
  const [formState, setFormState] =React.useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });


  const [loading,setLoading]=React.useState(false);
  const [state1, setState1] = React.useState({
    MarketPlaceIntegration: false,
    ShippingProfile: false,
  //  ProductImport:false,
    ProductSync:false,
    ImportCustomers:false,
  });

  
  
   
    const handleChangeButton = (id) => {
      // setProjectid(row);
     // setValue(id);
      var requestRelatedTo='';
      if(qualitycontrol === true && printsku === false){
        requestRelatedTo='1';
      }else if(qualitycontrol === true && printsku === true){
        requestRelatedTo='1,2';
      }else if(qualitycontrol === false && printsku === true){
        requestRelatedTo='2';
      }else{
        requestRelatedTo='';
      }
    
    if(requestRelatedTo === ''){
      if(addrequest === false){
        props.getSpecialRequestvalue(requestRelatedTo,'');
        props.handleNextPage(id);
      }else{
        props.getSpecialRequestvalue(requestRelatedTo,formState.values.anyspecialrequest);
        props.handleNextPage(id);
      }
      
    
    }else{
      if(addrequest === false){
        props.getSpecialRequestvalue(requestRelatedTo,'');
        props.handleNextPage(id);
      }else{
        props.getSpecialRequestvalue(requestRelatedTo,formState.values.anyspecialrequest);
        props.handleNextPage(id);
      }
    }


        console.log('button value', id)
        }; 


    const handleCallbackfunction =()=>{
      props.backButtonRouting('SendIneventoryShipping');
    }
  
    
  
 
       const ColorButtonTes = withStyles(theme => ({
    root: {
      color: '#fff',
      backgroundColor: '#0168fa',
       borderColor: '#0168fa',
       borderRadius:'3px',
       fontWeight:'700',
       height:45,
       width:430,
            fontSize:'11px',
       fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
      '&:hover': {
        backgroundColor: '#002080',
        
      },
    },
  }))(Button);     
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
 * Description:To do call next page
 */
const onNextfunction=()=>{
var requestRelatedTo='';
  if(qualitycontrol === true && printsku === false){
    requestRelatedTo='1';
  }else if(qualitycontrol === true && printsku === true){
    requestRelatedTo='1,2';
  }else if(qualitycontrol === false && printsku === true){
    requestRelatedTo='2';
  }else{
    requestRelatedTo='';
  }

if(requestRelatedTo === ''){
  if(addrequest === false){
    props.getSpecialRequestvalue(requestRelatedTo,'');
    props.handleNextPage(value);
  }else{
    props.getSpecialRequestvalue(requestRelatedTo,formState.values.anyspecialrequest);
    props.handleNextPage(value);
  }
  

}else{
  if(addrequest === false){
    props.getSpecialRequestvalue(requestRelatedTo,'');
    props.handleNextPage(value);
  }else{
    props.getSpecialRequestvalue(requestRelatedTo,formState.values.anyspecialrequest);
    props.handleNextPage(value);
  }
}
    
}

    return(
        <View className={classes.content}>
           <View className={classes.appBarSpacer} />
              
          <View className={classes.paper}>
            <Grid item  container lg={12}  >
            <Grid item  lg={5}  style={popUpStyle.breadCrumSidePadding}
            //style={{ marginLeft:'4px'}}
            >
        <Link  onClick={()=>{props.handleDashboard('01')}}>
            <Text style={popUpStyle.breadCrundCss1}>DASHBOARD
            </Text></Link>
            <Text style={popUpStyle.breadCrundCss}> / SEND INVENTORY /</Text>
          <Text style={popUpStyle.breadCrundCss2}> ARRANGING SHIPPING {'\n'} </Text> 
        
              </Grid>
              <Grid item  lg={2} ></Grid>
             
              </Grid>
               
              </View>  

             
             
            
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
         <Grid container   justify="space-between" >

         <Grid  items xs={12} lg={12}>
        <Grid justify="center" container>
        <Text style={{ fontSize: '15px',
          fontWeight: '700',
            // marginLeft:'10px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}}>
              
              Who is arranging shipping to ShipHype's warehouse?</Text>
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
    onClick={()=>{handleChangeButton('8')}}
   // startIcon={<ShoppingCartIcon />}
    >
   I will arrange my own shipping to ShipHype's warehouse
    </ColorButtonTes>

         
          </Grid>
      
        </Grid>
        <Grid  items xs={12} lg={12} style={{marginTop:'25px'}}>
        <Grid justify="center" // Add it here :)
      container>
       
       <ColorButtonTes
  //  className={clsx((radioValue !==2 ) && classes.urgent, (radioValue === 2) && classes.urgentSelected)}
  size='large'
  variant="contained"
  color="primary"
  className={classes.profileMargin}
    onClick={()=>{handleChangeButton('9')}}
    //startIcon={<CropOriginalIcon />}
    >
   I need ShipHype to arrange shipping
    
    </ColorButtonTes>
         
          </Grid>
      
        </Grid>
       
      </Grid>
        

           </form>
             
                </View>
               
        </View>

    
        );
  }

  ArrangeShipping.propTypes = {
    getSpecialRequestvalue:PropTypes.func,
    handleNextPage: PropTypes.func,
    backButtonRouting:PropTypes.func
  };