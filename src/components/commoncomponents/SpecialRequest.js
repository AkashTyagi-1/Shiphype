import React from 'react';
import clsx from 'clsx';
import {Platform,View,Image,Text,Dimensions} from 'react-native';
import { makeStyles,withStyles , useTheme} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import Divider from '@material-ui/core/Divider';
import PropTypes from "prop-types";
import * as shiphypeservice from './ShipService/shiphype_service';
import popUpStyle from './style/popUpStyle';
import Toast from './feedback/Toast';
import Link from '@material-ui/core/Link';
import { format } from 'date-fns';
import ProgressBar from './feedback/ProgressBar';
import AsyncStorage from "@react-native-community/async-storage";


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
   
    button5 :{
      border : ' 1px solid #fff',
      borderRadius : '5px',
     height:'110%',
     width:'50%',
      color: '#fff',
    backgroundColor: '#0158d4',
    borderColor: '#0153c7',
    
    marginBottom:'1%',
    '&:hover': {
      backgroundColor:'#1a1aff',
      color:'#ffffff',
      },
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper1: {
      padding: theme.spacing(2),
       borderRadius:'0px',
      overflow: 'auto',
     border:'1px solid #cccccc',
    },
    paper9: {
     // paddingLeft: theme.spacing(1),
      //paddingRight: theme.spacing(1),
       borderRadius:'0px',
      overflow: 'auto',
       //height:'60vh'
    },
    paper2: {
     
      height:'auto',
      width:'98%',
       borderRadius:'0px',
    //  overflow: 'auto',
      border: '1px solid #cccccc',
     color: '#fff',
     textAlign:'center'
   
    },
    button4 :{
      border : ' 1px solid #fff',
      borderRadius:'0px',
      color: '#fff',
      height:'auto',
      width:'100%',
      border:'1px solid #cccccc',
      textAlign:'center'
   
    
    },
    setupbutton9:{
      border : ' 1px solid #fff',
      borderRadius:'0px',
      color: '#fff',
      marginTop:'2%',
      height:'120vh',
      width:'100%',
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(3),
       paddingLeft: theme.spacing(2),
       paddingRight: theme.spacing(2),
      border:'1px solid #cccccc',
      textAlign:'center'
    },
    footCss9:{
     // border : ' 1px solid #fff',
      borderRadius:'8%',
      height:250,
      color: '#fff',
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(3),
      // paddingLeft: theme.spacing(4),
      // paddingRight: theme.spacing(4),
    // border:'1px solid #cccccc',
      textAlign:'center'
    },
    paper7: {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
      paddingLeft: theme.spacing(10),
      paddingRight: theme.spacing(10),
      borderRadius:'0px',
      overflow: 'auto',
      border : ' 1px solid #fff',
    
     color: '#fff',
     backgroundColor: '#0168fa',
     borderColor: '#0168fa',
     '&:hover': {
      backgroundColor: '#0168fa',
     borderColor: '#0168fa',
      },
    
    },
    button7 :{
      border : ' 1px solid #fff',
      borderRadius:'0px',
      border:'1px solid #cccccc',
      color: '#fff',
      textAlign:'center',
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      marginTop:'3px',
      // paddingLeft: theme.spacing(14),
      // paddingRight: theme.spacing(14),
    
    },
    Dashboardpaper: {
      border: '1px solid #ced4da',
      // boxShadow: '7px 2px 2px #cccccc',
      // shadowColor: '#000',
      //    shadowOffset: { width: 0, height: 1 },
      //    shadowOpacity: 0.8,
      //    shadowRadius: 2,  
      //    elevation: 5,
       height: 100,
       width: 270,
     
     
       marginLeft: '5%',
       marginTop: '8%'
     },
     title:{
      marginLeft: '1%',
     },
     Dashboardpaper2:{
      border: '1px solid #ced4da',
      // boxShadow: '7px 2px 2px #cccccc',
      // shadowColor: '#000',
      //    shadowOffset: { width: 0, height: 1 },
      //    shadowOpacity: 0.8,
      //    shadowRadius: 2,  
      //    elevation: 5,
       height: 500,
       width: 270,
      borderRadius:'2px',
      marginLeft:'6px',
      
       marginTop: '1%'
     },
     Dashboardpaper3:{
      border: '1px solid #ced4da',
      // boxShadow: '7px 2px 2px #cccccc',
      // shadowColor: '#000',
      //    shadowOffset: { width: 0, height: 1 },
      //    shadowOpacity: 0.8,
      //    shadowRadius: 2,  
      //    elevation: 5,
       height: 500,
       width: 270,
      borderRadius:'2px',
      marginLeft:'77px',
     
       marginTop: '1%'
     },
     dividerFullWidth1: {
     marginTop:'4%',
      
    },
    fontsizepaper: {
      fontSize: 10,
      text:'bold',
      marginLeft:'10px',
      marginTop:'10px',
    },
    numbersize:{
      fontSize: 18,
      text:'bold',
      marginLeft:'10px',
    },
    numbersizepercentage:{
      fontSize:10,
      color: '#F6072F',
      marginTop:'10px',
      marginLeft:'3px',
    },
    
    numbersizepercentage2:{
      fontSize:10,
      color: '#0FB559',
      marginTop:'10px',
      marginLeft:'3px',
    },
    fontsizepaper3:{
      fontSize: 12,
      text:'bold',
      marginLeft:'10px',
      marginTop:'10px',
    },
    typography:{
      marginTop:'10px',
      marginLeft:theme.spacing(2),
    },
    footCss:{
     // border : ' 1px solid #fff',
      borderRadius:'8%',
     // border:'1px solid #cccccc',
      color: '#fff',
      textAlign:'center',
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      marginTop:'3px',
    },
    paper: {
      padding: theme.spacing(1),
      paddingLeft:'0px',
       borderRadius:'0px',
      overflow: 'auto',
      backgroundColor:'#fff',
    },
    fixedHeight: {
      height: 240,
    },
    avatarsmall: {
      marginLeft:'50px',
      width: theme.spacing(5.5),
      height: theme.spacing(5.5),
    },
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
    fixedHeight1: {
      height: 480,
    },
    chartContainer: {
      height: 400,
      position: 'relative'
    },
    radioButtonCss:{
        color:'#000',fontSize:'8px',    height: '25px'
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
    const shipmentId=props.shipmentId;
    const valueofArrange=props.valueofArrange;
    const [completed, setCompleted] = React.useState(0);
    const [buffer, setBuffer] = React.useState(10);
    const [progressBar, setProgress] = React.useState(true);
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight1);   
    const [editSprint,setEditSprint]=React.useState(null);
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
   const [open, setOpen]=React.useState(false);
   const [msg,setMsg]=React.useState('');
   const [type,setType]=React.useState('');

  const [state1, setState1] = React.useState({
    MarketPlaceIntegration: false,
    ShippingProfile: false,
  //  ProductImport:false,
    ProductSync:false,
    ImportCustomers:false,
  });

  const handleChangeRadio = (event) => {
    setValue(event.target.value);
   
  };
  const { MarketPlaceIntegration, ShippingProfile,ProductSync,ImportCustomers} = state1;
    const progress = React.useRef(() => {});
    React.useEffect(() => {
      progress.current = () => {
        if (completed > 100) {
          setProgress(false);
        } else {
          const diff = Math.random() * 10;
          const diff2 = Math.random() * 10;
          setCompleted(completed + diff);
          setBuffer(completed + diff + diff2);
        }
      };
    });
  /**
   * screen size
   */

  let screenWidth = Dimensions.get('window').width;
  console.log(screenWidth);
  let setupwizrd=0;
  let setupbutton=0;
  let setupbutton9=0;
 let footCss=0;
 let footCss9=0;
  if(screenWidth<400)
{
  setupwizrd=classes.paper7;
  setupbutton= classes.button7;
  footCss=classes.footCss;
}
else if(screenWidth<690)
{
  setupwizrd=classes.paper7;
setupbutton= classes.button7;
footCss=classes.footCss;
}
else if(screenWidth<1530){
setupwizrd=classes.paper2;
setupbutton= classes.button4;
footCss=classes.footCss9;
setupbutton9=classes.setupbutton9;

}
else{
  setupwizrd=classes.paper2;
  setupbutton= classes.button4;
  footCss=classes.footCss9;

}
    React.useEffect(() => {
      function tick() {
        progress.current();
      }
      const timer = setInterval(tick, 500);
  
      return () => {
        clearInterval(timer);
      };
    }, []);

/**
 * Description:To do checklist of steps
 */
    const handleChangequality = (event) => {
    setQualitycontrol(event.target.checked);
    };


    const handleCallbackfunction =()=>{
        if(valueofArrange == 8)
        { 
            props.backButtonRouting(props.saveback);

        }
        else{
            props.backButtonRouting(props.saveback);
        }
     
    }
   /**
    * Description:To do set value of checkbox
    * @param {*} event 
    */
    const handleChangeprintsku = (event) => {
    setPrintsku(event.target.checked);

    }; 
    
    const handleChangeprAddRequest =(event)=>{
     setAddrequest(event.target.checked);
    }
    React.useEffect(() => {
      console.log('shipemntId : ', shipmentId);
           //   fetchWarehouse();
           if(shipmentId !== 0){
            fetchArrangeShip(shipmentId);
           }   
           
               
           } ,[]);

           const fetchArrangeShip = (shipmentId)=>{
      
            //  const userid=5;
              setLoading(true);
              shiphypeservice.fetchArrangeShip(shipmentId)
              .then(response => {
               console.log("status",response.status);
                    if(response.status === true) {
                      setLoading(false);
                      if(response.data[0].shipping[0].checked === 0)
                      {
                        setValue('8');
                      }
                      else{
                        setValue('9');
                      }
                      setValueRequestRelated(response.data[0].specialrequest[0].requestRelatedTo);
                      if(response.data[0].specialrequest[0].requestRelatedTo !== 0)
                      {
                        let string=response.data[0].specialrequest[0].requestRelatedTo.split(',');
                       for(let i=0;i<string.length;i++)
                       {
                        if(string[i]!==1)
                        {
                          setQualitycontrol(true);
                        }
                        if(string[i]!==2){
                          setPrintsku(true);
                        }
                       }

                       setFormState(formState => ({
                        ...formState,
                        values: {
                          ...formState.values,anyspecialrequest:response.data[0].specialrequest[0].requestDescription,
                          checkFrom:false
                        },
                        touched:{
                          ...formState.touched,
                          anyspecialrequest: true
                        }
                       }));
                        
                      }
                  //    setValue(response.data[0][0].shippingTowarehouseId);
         
          setRadioselect(false);
                        // setEditArrangeShip(1);
                       //  bindData(response.data);
                         
                               }else{
                                setLoading(false);
                                console.log("message",response.message);
                               }   
                  }).catch((error) =>{
                        console.error(error);
                  });
            }  

    const handleChange = prop => event => {
        console.log("email",event.target.value);
        event.persist();
        //setValues({ ...formState.values, [prop]: event.target.value });
        setFormState(formState => ({
         ...formState,
         values: {
           ...formState.values,[prop]:event.target.value,
           checkFrom:false
         },
         touched:{
           ...formState.touched,
           [event.target.name]: true
         }
        }));
    };   
    
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
const ColorButton2 = withStyles(theme => ({
  root: {
    color: '#fff',
    backgroundColor: '#0168fa',
     borderColor: '#0168fa',
     paddingTop: '0%',
     paddingBottom: '0%',
     paddingLeft: '8%',
     paddingRight: '8%',
    marginTop:'1%',
    marginBottom:'1%',
    borderRadius:'3px',
    '&:hover': {
      backgroundColor: '#002080',
      
    },
  },
}))(Button);
    const handleClickOpen = () => {    
      setEditSprint(null);
      setOpenMarketPlace(true);
      
      console.log("click button");
    };


      const sentSpecialRequest =()=>{
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

        const requestDescription =(formState.values.anyspecialrequest === undefined ? '' : formState.values.anyspecialrequest);
        setLoading(true);
        shiphypeservice.sendSpecailRequest(shipmentId,requestRelatedTo,requestDescription)
        .then(response => {
        console.log("status",response.status);
          if(response.status === true) {
             setOpen(true);
             setType('success');
             setMsg(response.message);
          AsyncStorage.removeItem("ProductSelect");
          AsyncStorage.removeItem("CustomPackges");
          AsyncStorage.removeItem("SelectPromotional");
           
             setLoading(false);
           
                     }else{
                      setOpen(true);
                      setType('error');
            setMsg(response.message);
           
            setLoading(false);
                      console.log("message",response.message);
                     }   
        }).catch((error) =>{
              console.error(error);
        });
      
      }

      const handleClose = () => {
        setOpen(false);
        onNextfunction();
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
    props.updateShipmentId1();
    props.handleDashboard('09');
    //props.handleDashboard('01');
  }else{
    props.getSpecialRequestvalue(requestRelatedTo,formState.values.anyspecialrequest);
    props.updateShipmentId1();
    props.handleDashboard('09');
    //props.handleDashboard('01');
  }
  

}else{
  if(addrequest === false){
    props.getSpecialRequestvalue(requestRelatedTo,'');
    props.updateShipmentId1();
    props.handleDashboard('09');
    props.handleDashboard('01');
  }else{
    props.getSpecialRequestvalue(requestRelatedTo,formState.values.anyspecialrequest);
    props.updateShipmentId1();
    props.handleDashboard('09');
    props.handleDashboard('01');
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
          <Text style={popUpStyle.breadCrundCss2}> Shipment Receiving Instructions {'\n'} </Text> 
        
              </Grid>
             
             
              </Grid>
               
              </View>  

              <Grid justify="center">
            <ProgressBar 
             loading={loading}
            />
            </Grid>
            
              
              <View style={popUpStyle.paddingSide}>
            
              <Grid container justify="space-between" spacing={2}>
            <Grid item xs={12} md={4} lg={4}>
            <Text style={{ fontSize: '16px',
            fontWeight: '700',
             marginLeft:'2px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}}>
              
              Shipment Receiving Instructions</Text>
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
              <ColorButton
       size='large'
       variant="contained"
       color="primary"
       className={classes.profileMargin}
      // disabled={(qualitycontrol === true || printsku === true) === true ? false : true}
       //onClick={()=>{handleCallbackfunction()}}
       onClick={()=>{sentSpecialRequest()}}
       >
        Complete
       </ColorButton>
    
              </Grid>
              </Grid>
            
              </Grid>
              </Grid>
             
              

             

              <Grid item xs={12} md={4} lg={4}>
         
              </Grid>

              <Grid item   lg={12} style={{marginLeft:'3px',marginTop:'10px'}}>
          
              <Text 
           style={{
            fontSize: '12px',
            
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          marginTop:'10px',
            transition : 'all 0.25s',
           }}>We’ll notify you as soon as we receive your shipment. 
  {'\n'}
  Do you have any special instructions for us for when we receive your items?
            {'\n'}{'\n'}
           </Text>  
          
            </Grid>

              <Grid  justify="space-between"
      container 
      spacing={1} style={{
            marginTop:'15px',
           }} >
        <Grid items lg={12}  style={{
            marginLeft:'8px',
           }} >
         <FormGroup>
          {/* <FormControlLabel
            control={<Checkbox checked={qualitycontrol} color="primary" onChange={handleChangequality} name="qualitycontrol" />}
            label= {<Text style={{ fontSize: '12px',
           // fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}}>Quality Control</Text> } value="1"
          />
          <FormControlLabel
            control={<Checkbox checked={printsku} color="primary" onChange={handleChangeprintsku} name="printsku" />}
            label= {<Text style={{ fontSize: '12px',
           // fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}}>Print SKU</Text> } value="2"
          /> */}
          <FormControlLabel
            control={<Checkbox checked={addrequest} color="primary" onChange={handleChangeprAddRequest} name="addrequest" />}
            label= {<Text style={{ fontSize: '12px',
           // fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}}>Additional Request</Text> }  value="3"
          />
          </FormGroup>
    
         </Grid> 
              </Grid>


              

              <Grid item item xs={8} md={4} lg={4} style={{
             //marginLeft:'15px',
           }}>
    {(addrequest === false ? '' :
    
    <TextField
                id="anyspecialrequest"
                name="anyspecialrequest"
                variant="outlined"
                fullWidth
               
                placeholder="Any special request"
                size='small'
                type="text"
              
                multiline = {true}
                rows={3}
                onChange={handleChange('anyspecialrequest')}
                value={formState.values.anyspecialrequest}
                className={classes.profileMargin1}
              />
     
     )} 
              
       </Grid>
       {showToast(open,msg,type)} 
                </View>
               
        </View>

    
        );
  }

  ArrangeShipping.propTypes = {
    getSpecialRequestvalue:PropTypes.func,
    handleNextPage: PropTypes.func,
    backButtonRouting:PropTypes.func
  };