import React ,{ useState, useEffect } from 'react';
import { fade,withStyles,makeStyles, useTheme} from '@material-ui/core/styles';
import {Platform,View,ScrollView,Image,Text,Dimensions} from 'react-native';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import popUpStyle from './style/popUpStyle';
import Link from '@material-ui/core/Link';






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
    const handleChangeButton = (id) => {
      props.invenotyLabelUpdate(id);
        props.handleNextPage(7);
          console.log('button value', id)
          }; 

     
React.useEffect(() => {
 
  } ,[]);
 
 
  


    const handleCallbackfunction =()=>{
        props.handleNextPage('SendInvenotryShipementPacked');
      }


 

    return (  
      <View className={classes.content}>
    <View className={classes.appBarSpacer} />
  
              <View >
            <Grid item  container lg={12}>
            <Grid item  lg={5}   style={popUpStyle.breadCrumSidePadding}>
            <Link  onClick={()=>{props.handleDashboard('01')}}>
            <Text style={popUpStyle.breadCrundCss1}>DASHBOARD /</Text>
            </Link> <Text style={popUpStyle.breadCrundCss}>Send INVENTORY </Text>
          <Text style={popUpStyle.breadCrundCss2}>/ Shipment Type {'\n'} </Text> 
            
              </Grid>
              <Grid item  lg={2} ></Grid>
              </Grid>
              </View>  
        

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
              
              How are you shipping your items?</Text>
              </Grid>
              </Grid>
        <Grid  items xs={12} lg={12} style={{marginTop:'35px'}}>
        <Grid justify="center" container>
      
        <ColorButtonTes
  size='large'
  variant="contained"
  color="primary"
  className={classes.profileMargin}
    onClick={()=>{handleChangeButton(1)}}
    >
Standard Packages
    </ColorButtonTes>

         
          </Grid>
      
        </Grid>
        <Grid  items xs={12} lg={12}>
        <Grid justify="center" 
      container>
       
       <ColorButtonTes
  size='large'
  variant="contained"
  color="primary"
  className={classes.profileMargin}
    onClick={()=>{handleChangeButton(2)}}
    >
Pallets (LTL)
    
    </ColorButtonTes>
         
          </Grid>
      
        </Grid>
       
      </Grid>
        

           </form>

        </View>
    );
  }

