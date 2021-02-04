import React ,{ useState, useEffect } from 'react';
import clsx from 'clsx';
import { fade,withStyles,makeStyles} from '@material-ui/core/styles';
import {Platform,Linking,View,Image,Text,Dimensions,TouchableOpacity} from 'react-native';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import amazon from './../../assets/icons/amazon.png';
import ebay from './../../assets/icons/ebbay.png';
import bestbuy from './../../assets/icons/bestby.png';
import shipstation from './../../assets/icons/shipstation.png';
import square from './../../assets/icons/squarespace-logo.png';
import m1 from './../../assets/icons/m1.png';
import walmart from './../../assets/icons/walmart.png';
import bigcommerce from './../../assets/icons/bigcommerce.png';
import backerkit from './../../assets/icons/BackerKit-logo.png';
import shopify from './../../assets/icons/shopify.png';
import woocommerce from './../../assets/icons/woocommerce-logo.png';
import esty from './../../assets/icons/1200px-Etsy_logo.svg.png';
import ProgressBar from './feedback//ProgressBar';
import * as shiphypeservice from './ShipService/shiphype_service';

import ConfirmationMessage from './feedback/ConfirmationMessage';
import popUpStyle from './style/popUpStyle';



const useStyles = makeStyles(theme => ({
    root: { 
      },
    submit: {
      margin: theme.spacing(0, 0, 0),
      borderRadius : 0,
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
  height: 80,
  width: 100,
},
paper1: {
 border: '2px solid #0168fa',
 boxShadow: '-10px 10px #0168fa',
 shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5,
  height: 120,
  width: 120,
  marginLeft: '14%',
  cursor:'pointer',
  // marginLeft: '12%',
  marginTop: '8%'
},
appBarSpacer: theme.mixins.toolbar,
content: {
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(2),
  flexGrow: 1,
  height: '60vh',
  overflow: 'auto',
  backgroundColor:'#fff',
},
imageselected:{
  border: '1px solid #00cc00',
  boxShadow: '-10px 10px #00cc00',
  shadowColor: '#000',
     shadowOffset: { width: 0, height: 1 },
     shadowOpacity: 0.8,
     shadowRadius: 2,  
     elevation: 5,
   height: 120,
   width: 120,
   marginLeft: '14%',
   cursor:'pointer',
   //marginLeft: '12%',
   marginTop: '8%'
},
alredayimageselected:{
  border: '1px solid #00cc00',
  boxShadow: '-10px 10px #00cc00',
  shadowColor: '#000',
     shadowOffset: { width: 0, height: 1 },
     shadowOpacity: 0.8,
     shadowRadius: 2,  
     elevation: 5,
   height: 120,
   width: 120,
   marginLeft: '14%',
   //marginLeft: '12%',
   marginTop: '8%'
},
root: {
  flexGrow: 1,
},
avatarsmall: {
  width: theme.spacing(3.5),
  height: theme.spacing(3.5),
},
ImagesDesign:{
  width: '115px', height: '32px',marginTop:'35%'
},
ImagesDesignAmozon:{
  width: '115px', height: '42px',marginTop:'35%'
},
ImagesDesignEbay:{
  width: '115px', height: '42px',marginTop:'35%'
},
// grid: {
//   width: 100,
//   height: 100,
// },

}));




const ColorButton = withStyles(theme => ({
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




const ColorButton1 = withStyles(theme => ({
  root: {
 //   marginLeft:'14%',
  },
}))(Button);


const ColorButton2 = withStyles(theme => ({
  root: {
    // color: '#fff',
    // backgroundColor: '#0168fa',
    //  borderColor: '#0168fa',
    //  borderRadius:'5px',
    //  marginTop:'30px',
   
    //  padding:'1px',
    paddingLeft:'1px',
    paddingTop:'1px',
    paddingRight:'10px',
     
    // border: '1px solid #ced4da',
    '&:hover': {
      // backgroundColor: '#002080',
      // border: '1px solid #ced4da',
     // backgroundColor: '#0168fa',
 
      
    },

    '&:selected': {
     backgroundColor: '#002080',
    },
  },
}))(Button);
  

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

/**
 * Description:This function is used for CreateSprint for sprint
 * @param {*} props 
 */
export default function CreateSprint(props) {
  
   const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [objectData , setObjectData] = React.useState([]);
    const [fetchIntData,setFetchIntData]=React.useState([]);
    const [integrationId, setIntegrationId] = React.useState(0);
    const [selectIntegration,setSelectIntegration]=React.useState(false);
    const [loading,setLoading]=React.useState(true);
    const [amazonid,setAmazon]=React.useState(false);
    const [ebayid,setEbay]=React.useState(false);
    const [shipstatid,setShipstatid]=React.useState(false);
    const [shipfyid,setShipfyid]=React.useState(false);
    const [magentoid,setMagentoid]=React.useState(false);
    const [sqaureid,setSqaureid]=React.useState(false);
    const [backritid,setBackritid]=React.useState(false);
    const [etsyid,setEtsyid]=React.useState(false);
    const [wocommid,setWocommid]=React.useState(false);
    const [bestbyid,setBestbyid]=React.useState(false);
    const [wolmartid,setWolmartid]=React.useState(false);
    const [bigcommid,setBigcommid]=React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [integrateData, setDataForIntegrate] = React.useState(0);
    const userid=props.user_id;
    const [state, setState]=useState({
      vertical: 'top',
      horizontal: 'center',
    });
    const {vertical,horizontal} = state;
    const [open, setOpen] = React.useState(false);



    //const [steps,setSteps]=React.useState([]);
 const selectImage =(data)=>{
  
 
  if(data === integrationId){
    setIntegrationId(0);
    if(fetchIntData.length !== 0){
      setSelectIntegration(true);
    }else{
      setSelectIntegration(false);
    } 
  }else{
    setIntegrationId(data);
    setSelectIntegration(true);
  }
       
  
    console.log("click image",data);
  }

  const opneebayapiInte =(data,url)=>{

    if(data === integrationId){
      setIntegrationId(0);
      if(fetchIntData.length !== 0){
        setSelectIntegration(true);
      }else{
        setSelectIntegration(false);
      } 
    }else{
      setIntegrationId(data);
      setSelectIntegration(true);

      shiphypeservice.addUserIntegration(data,userid)
                    .then(response => {
                     console.log("status",response.status);
                          if(response.status === true) {
                            setLoading(false);
                              
                              addnowpercentage();
                            
                                     }else{
                                      setLoading(false);
                                      console.log("message",response.message);
                                     }   
                        }).catch((error) =>{
                              console.error(error);
                        });
     
    }

    //Linking.openURL(url);
    window.open(url, "", "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=150,width=1000,height=500");
  }



  



  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const selectAlredayImage =(data)=>{
    console.log("selectalredayimage",data);
    setDataForIntegrate(data);
    setOpenDelete(true);
    
  }
 
  const handleDeleteCancle = () => {
    setOpenDelete(false);
  
   };
   const ConframetionCheck = () => {
    setOpenDelete(false);
    if(integrateData === 1){
      setEbay(false);
    }else if(integrateData === 2){
    
      setAmazon(false);
    }else if(integrateData === 3){
      setWocommid(false);
    }else if(integrateData === 4){
      setShipfyid(false);
    }else if(integrateData === 5){
      setMagentoid(false);
    }else if(integrateData === 6){
      setSqaureid(false);
    }else if(integrateData === 7){
      setBackritid(false);
    }else if(integrateData === 8){
      setEtsyid(false);
    }else if(integrateData === 9){
     
      setShipstatid(false);
    }else if(integrateData === 10){
      setBestbyid(false);
    }else if(integrateData === 11){
      setWolmartid(false);
    }else if(integrateData === 12){
      setBigcommid(false);
    }
   };
 /**
     * Description:To do fetch image data
     */
    useEffect(() => {

      fetchImage();
      },[]);


      const ebaygetTokenapi=(code,integrationid,userid)=>{
        shiphypeservice.ebayIntegration(code,integrationid,userid)
        .then(response => {
        
          console.log("token",response);
            
            }).catch((error) =>{
                  console.error(error);
            }); 
      }


      const fetchImage =()=>{
        setLoading(true);
        shiphypeservice.fetchimagelogobyid()
              .then(response => {
               console.log("status",response.status);
                    if(response.status === true) {
                      setLoading(false);
                               setObjectData(response.data);
                               fetchSelectedIntegration();
                               }else{
                                setLoading(false);
                                console.log("message",response.message);
                               }   
                  }).catch((error) =>{
                        console.error(error);
                  });
                }

                const fetchSelectedIntegration =()=>{
                  setLoading(true);
                  shiphypeservice.fetchUserIntegration(userid)
                        .then(response => {
                         console.log("status",response.status);
                              if(response.status === true) {
                                setLoading(false);
                                setFetchIntData(response.data);
                                        if(response.data.length !== 0){
                                          setSelectIntegration(true);
                                          for(let i=0; i<response.data.length;i++){
                                            if(response.data[i].integrationId === 1){
                                              setEbay(true);
                                            }else if(response.data[i].integrationId === 2){
                                            
                                              setAmazon(true);
                                            }else if(response.data[i].integrationId === 3){
                                              setWocommid(true);
                                            }else if(response.data[i].integrationId === 4){
                                              setShipfyid(true);
                                            }else if(response.data[i].integrationId === 5){
                                              setMagentoid(true);
                                            }else if(response.data[i].integrationId === 6){
                                              setSqaureid(true);
                                            }else if(response.data[i].integrationId === 7){
                                              setBackritid(true);
                                            }else if(response.data[i].integrationId === 8){
                                              setEtsyid(true);
                                            }else if(response.data[i].integrationId === 9){
                                             
                                              setShipstatid(true);
                                            }else if(response.data[i].integrationId === 10){
                                              setBestbyid(true);
                                            }else if(response.data[i].integrationId === 11){
                                              setWolmartid(true);
                                            }else if(response.data[i].integrationId === 12){
                                              setBigcommid(true);
                                            }
                                           } 
                                        }
                                         
                                         }else{
                                          setLoading(false);
                                          console.log("message",response.message);
                                         }   
                            }).catch((error) =>{
                                  console.error(error);
                            });
                          }



                const addUserIntegration =(isIntegrationReq)=>{
                  setLoading(true);
                  const integration_id=integrationId;
                  if(integrationId !== 0){
                    shiphypeservice.addUserIntegration(integration_id,userid)
                    .then(response => {
                     console.log("status",response.status);
                          if(response.status === true) {
                            setLoading(false);
                              addStepStatus();
                              addnowpercentage();
                            
                                     }else{
                                      setLoading(false);
                                      console.log("message",response.message);
                                     }   
                        }).catch((error) =>{
                              console.error(error);
                        });
                  }else{
                    handleNext(3); 
                  }
                 
                          }
                          const addnowpercentage =()=>{

                            props.handleOpenaddpercentage(20);

                           }
                          const addStepStatus =()=>{
                            setLoading(true);
                            
                           // const userid=user_id;
                            const shiphypesubsubstepId=0;
                            const shiphypesubstepId=5;
                            const shiphypestepId=0;
                            shiphypeservice.addUserStepDoneSofar(userid,shiphypesubsubstepId,shiphypesubstepId,shiphypestepId)
                                  .then(response => {
                                   console.log("status",response.status);
                                        if(response.status === true) {
                                          setLoading(false);
                                          handleNext(3); 
                                                   }else{
                                                    setLoading(false);
                                                    console.log("message",response.message);
                                                   }   
                                      }).catch((error) =>{
                                            console.error(error);
                                      });
                                    }

 /**
           * Description:To do bind warehouse data
           */
          function BindImages() {
 
              return (
                <Grid container style={{marginLeft:'5%',}}>
          {objectData.map((data,index) => (
             <Grid item lg={2} style={{marginTop:'2%'}}>
        
          {(() => {
            if(data.logo === 'ebay.png'){
              return (
                <Grid items xs={6} lg={2} md={4}>
                <Card className={clsx((integrationId !== 1) && classes.paper1,(integrationId === 1) && classes.imageselected,(ebayid) && classes.alredayimageselected)} variant="outlined"
                 onClick={()=>{(ebayid ? selectAlredayImage(data.integrationId) : opneebayapiInte(data.integrationId,data.redirectUrl))}} > 
                
                <Image className={classes.ImagesDesignEbay} source={ebay} />
                
                </Card>
                </Grid>
                 )
             }
             else if (data.logo === 'amazon.png'){
                   return (
                    <Grid items xs={6} lg={2} md={4}>
                    <Card  className={clsx((integrationId !== 2) && classes.paper1, (integrationId === 2) && classes.imageselected,(amazonid) && classes.alredayimageselected)} variant="outlined"
                    onClick={()=>{(amazonid ? selectAlredayImage(data.integrationId) : selectImage(data.integrationId))}} > 
                    <Image className={classes.ImagesDesignAmozon} source={amazon} />
                    </Card>
                    </Grid>
                     )
                 } else if(data.logo === 'woocommernce.png'){
                  return (
                    <Grid items xs={6} lg={2} md={4}>
                    <Card className={clsx((integrationId !== 3) && classes.paper1, (integrationId === 3) && classes.imageselected,(wocommid) && classes.alredayimageselected)} variant="outlined"
                     onClick={()=>{(wocommid ? selectAlredayImage(data.integrationId) : selectImage(data.integrationId))}} > 
 
                    <Image className={classes.ImagesDesign} source={woocommerce } />
 
                  </Card>
                    </Grid>
                     )
                 }else if(data.logo === 'shipify.png'){
                  return (
                    <Grid items xs={6} lg={2} md={4}>
                    <Card className={clsx((integrationId !== 4) && classes.paper1, (integrationId === 4) && classes.imageselected,(shipfyid) && classes.alredayimageselected)} variant="outlined"
                    onClick={()=>{(shipfyid ? selectAlredayImage(data.integrationId) : selectImage(data.integrationId))}} > 
 
                    <Image className={classes.ImagesDesign} source={shopify} />
 
                 </Card>
                    </Grid>
                     )
                 }else if(data.logo === 'magento.png'){
                  return (
                    <Grid items xs={6} lg={2} md={4}>
                    <Card className={clsx((integrationId !== 5) && classes.paper1, (integrationId === 5) && classes.imageselected,(magentoid) && classes.alredayimageselected)} variant="outlined"
                    onClick={()=>{(magentoid ? selectAlredayImage(data.integrationId) : selectImage(data.integrationId))}} > 
 
                    <Image className={classes.ImagesDesign} source={m1} />
 
                  </Card>
                    </Grid>
                     )
                 }else if(data.logo === 'squarespace.png'){
                  return (
                    <Grid items xs={6} lg={2} md={4}>
                    <Card className={clsx((integrationId !== 6) && classes.paper1, (integrationId === 6) && classes.imageselected,(sqaureid) && classes.alredayimageselected)} variant="outlined"
                    onClick={()=>{(sqaureid ? selectAlredayImage(data.integrationId) : selectImage(data.integrationId))}} > 
 
                    <Image style={{ width: '115px', height: '80px',marginTop:'10%'}} source={square} />
 
                   </Card>
                    </Grid>
                     )
                 }
                 else if(data.logo === 'backerkit.png'){
                  return (
                    <Grid items xs={6} lg={2} md={4}>
                    <Card className={clsx((integrationId !== 7) && classes.paper1, (integrationId === 7) && classes.imageselected,(backritid) && classes.alredayimageselected)} variant="outlined"
                    onClick={()=>{(backritid ? selectAlredayImage(data.integrationId) : selectImage(data.integrationId))}} > 
 
                    <Image className={classes.ImagesDesign} source={backerkit} />
 
                  </Card>
                    </Grid>
                     )
                 }else if(data.logo === 'etsy.png'){
                  return (
                    <Grid items xs={6} lg={2} md={4}>
                    <Card className={clsx((integrationId !== 8) && classes.paper1, (integrationId === 8) && classes.imageselected,(etsyid) && classes.alredayimageselected)} variant="outlined"
                     onClick={()=>{(etsyid ? selectAlredayImage(data.integrationId) : selectImage(data.integrationId))}} > 
 
                    <Image style={{ width: '115px', height: '50px',marginTop:'30%'}} source={esty} />
 
                  </Card>
                    </Grid>
                     )
                 }
                 else if(data.logo === 'shipstation.png'){
                  return (
                    <Grid items xs={6} lg={2} md={4}>
                    <Card className={clsx((integrationId !== 9) && classes.paper1, (integrationId === 9) && classes.imageselected,(shipstatid) && classes.alredayimageselected)} variant="outlined"
                    onClick={()=>{(shipstatid ? selectAlredayImage(data.integrationId) : selectImage(data.integrationId))}} > 
 
                    <Image className={classes.ImagesDesign} source={shipstation} />
 
                  </Card>
                    </Grid>
                     )
                 }else if(data.logo === 'bestbuy.png'){
                  return (
                    <Grid items xs={6} lg={2} md={4}>
                    <Card className={clsx((integrationId !== 10) && classes.paper1, (integrationId === 10) && classes.imageselected,(bestbyid) && classes.alredayimageselected)} variant="outlined"
                    onClick={()=>{(bestbyid ? selectAlredayImage(data.integrationId) : selectImage(data.integrationId))}} > 
                    <Image style={{ width: '130px', height: '102px',marginTop:'4%'}} source={bestbuy} />
 
                  </Card>
                    </Grid>
                     )
                 }else if(data.logo === 'walmart.png'){
                  return (
                    <Grid items xs={6} lg={2} md={4}>
                    <Card className={clsx((integrationId !== 11) && classes.paper1, (integrationId === 11) && classes.imageselected,(wolmartid) && classes.alredayimageselected)} variant="outlined"
                    onClick={()=>{(wolmartid ? selectAlredayImage(data.integrationId) : selectImage(data.integrationId))}} > 
                    <Image className={classes.ImagesDesign} source={walmart} />
                 </Card>
                    </Grid>
                     )
                 }else if(data.logo === 'bigcommerce.png'){
                  return (
                    <Grid items xs={6} lg={2} md={4}>
                    <Card className={clsx((integrationId !== 12) && classes.paper1, (integrationId === 12) && classes.imageselected,(bigcommid) && classes.alredayimageselected)} variant="outlined"
                    onClick={()=>{(bigcommid ? selectAlredayImage(data.integrationId) : selectImage(data.integrationId))}} > 
                    <Image className={classes.ImagesDesign} source={bigcommerce} />
                  </Card>
                    </Grid>
                     )
                 }
               })()}
        
         
        </Grid>
       
            ))}   
          </Grid>
              );
            }
      


let screenWidth = Dimensions.get('window').width;
 
    return (  
        <View className={classes.content}>
        {/* <ScrollView> */}
       <View className={classes.appBarSpacer} />
       <View >
            <Grid item  container lg={12}  >
            <Grid item  lg={7}   style={popUpStyle.breadCrumSidePadding}>
            <Link  onClick={()=>{props.handleDashboard('01')}}>
            <Text style={popUpStyle.breadCrundCss1}>DASHBOARD /</Text>
            </Link>
          <Text style={popUpStyle.breadCrundCss2}> MARKETPLACE INTEGRATION {'\n'} </Text> 
            
              </Grid>
              <Grid item  lg={4} style={{marginTop:'15px'}}>
            
</Grid>
              </Grid>
              </View> 
              <View style={popUpStyle.paddingSide}>
         <Grid style={{marginLeft:'3px'}}>
         <Text 
           style={{
            fontSize: '14px',
            fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
       
            transition : 'all 0.25s',
           }}>Select the marketplace you would like to integrate with:
           </Text>  
           </Grid></View>
        

              <Grid justify="center">
            <ProgressBar 
             loading={loading}
            />
            </Grid>
            <Grid>
{(openDelete === false ? " " :
           <ConfirmationMessage
           openDeleteCard={openDelete}
           integrationId={integrateData}
        userid={userid}
        ConframetionCheck={ConframetionCheck}
           handleDeleteCancle={handleDeleteCancle}
         />)}
</Grid>
         <form className={classes.form}>
         <Grid container  spacing={3}  justify="center">
         <BindImages/>
         <Snackbar 
      anchorOrigin={{ vertical, horizontal }}
      key={`${vertical},${horizontal}`}
      open={open}
      autoHideDuration={1500}
      onClose={handleClose}>
      <Alert onClose={handleClose} severity="error">
      This integration is already selected.Please choose another integration.
      </Alert>
      </Snackbar>
      </Grid>
           </form>


           <Grid  justify="flex-end"
            container 
            spacing={24} >
            
            <Grid item style={{marginRight:'3%',marginTop:'2%'}}>

      
  <ColorButton
    size='large'
    variant="contained"
    color="primary"
    disabled={!selectIntegration}
    className={classes.profileMargin}
    onClick={()=>{addUserIntegration(true)}}
  >
    Save
  </ColorButton>
       </Grid>


       </Grid>
      


        </View>
    );
  }


  