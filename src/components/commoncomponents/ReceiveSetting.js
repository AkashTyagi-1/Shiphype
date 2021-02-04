import React ,{ useState, useEffect } from 'react';
import { fade,withStyles,makeStyles, useTheme} from '@material-ui/core/styles';
import {Platform,View,ScrollView,Image,Text,Dimensions} from 'react-native';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import Grid from '@material-ui/core/Grid';
import * as shiphypeservice from './ShipService/shiphype_service';
import StepConnector from '@material-ui/core/StepConnector';
import Toast from './feedback/Toast';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import validate from 'validate.js';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


const schema = {
  shipFrom: {
    
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32
    }
  },
  shipFromAttn: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 64
    }
  },
  address1: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 64
    }
  },
  
  address2:{
  presence: { allowEmpty: false, message: 'is required' },
 
  length: {
    maximum: 64
  }
 },

 zipCode:{
  presence: { allowEmpty: false, message: 'is required' },
 
  length: {
    maximum: 64
  }

 },
 city:{
  presence: { allowEmpty: false, message: 'is required' },
  
  length: {
    maximum: 11
  }
 },
 state:{
  presence: { allowEmpty: false, message: 'is required' },
 
  length: {
    maximum: 64
  }

 },
 country:{
  presence: { allowEmpty: false, message: 'is required' },
 
  length: {
    maximum: 64
  }

 },
 phone:{
  presence: { allowEmpty: false, message: 'is required' },
 
  length: {
    maximum: 10
  }

 },
 packagePallets:{
  presence: { allowEmpty: false, message: 'is required' },
 
  length: {
    maximum: 64
  }

 },
 length:{
  presence: { allowEmpty: false, message: 'is required' },
 
  length: {
    maximum: 64
  }

 },
 hieght:{
  presence: { allowEmpty: false, message: 'is required' },
 
  length: {
    maximum: 64
  }

 },
 width:{
  presence: { allowEmpty: false, message: 'is required' },
 
  length: {
    maximum: 64
  }

 },
 packagePalletsWeight:{
  presence: { allowEmpty: false, message: 'is required' },
 
  length: {
    maximum: 64
  }

 },

};


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
    height: '80vh',
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
profileMargin11: {
  marginTop: theme.spacing(2),
  borderRadius : '5px',
  },
  profileMargin1: {
    marginTop: theme.spacing(1),
    borderRadius : '5px',
    
  //  marginBottom: theme.spacing(1),
  },
  
   margin: {
    margin: theme.spacing(1),
  },


// grid: {
//   width: 100,
//   height: 100,
// },

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
      height:'70%',
      width:'100px',
       fontSize:'11px',
       fontWeight: '550',
       color:'#fff',
       backgroundColor:'#0168fa',
    '&:hover': {
      backgroundColor: '#002080',
      
    },
    },
  }))(Button);
 

 

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
/**
 * Description:This function is used for Slide17
 * @param {*} props 
 */
export default function Slide17(props) {
  
   const classes = useStyles();
   const userid=props.user_id;
   const [loading,setLoading]=React.useState(true);
   const [open, setOpen]=React.useState(false);
   const [msg,setMsg]=React.useState('');
   const [type,setType]=React.useState(''); 
   const [open1, setOpen1]=React.useState(false);
   const [state1, setState1]=useState({
     vertical: 'center',
     horizontal: 'center',
   });
   const {vertical,horizontal} = state1;
   const [shipProfile,setShipprofiledone]=React.useState(false);
   const [startsprint,setStartsprint]=React.useState(0);
   const [status,setStatus]=React.useState(false);
  const[orderCouierType,setOrderCourierType]=React.useState([]);
  const [requestRelatedTovalue, setValueRequestRelated] = React.useState([]);
  const [qualitycontrol,setQualitycontrol]=React.useState(false);
  const [printsku,setPrintsku]=React.useState(false);
  const [addrequest,setAddrequest]=React.useState(false);
  const [formState, setFormState] =useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

   /**
    * Description:To do set value of checkbox
    * @param {*} event 
    */
    const handleChangeprintsku = (event) => {
    setPrintsku(event.target.checked);

    };    
        
  /**
   * Description:Callback function
   */
  useEffect(() => {
    
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]
  );

     /**
   * Description:This function call on type character inside input text
   * @param {} prop 
   */
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
React.useEffect(() => {
    // fetchCustomePackageingList();
     fetchSpecilRequest();    
  } ,[]);
 
 
  const fetchSpecilRequest = ()=>{
 
   //  const userid=5;
     setLoading(true);
     shiphypeservice.fetchSpecilRequest(userid)
     .then(response => {
      console.log("status",response.status);
           if(response.status === true) {
             setLoading(false);
              //  setShipData(response.data);
               
                setValueRequestRelated(response.data[0].requestRelatedTo);
                      if(response.data[0].requestRelatedTo !== 0)
                      {
                        let string=response.data[0].requestRelatedTo.split(',');
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
                       if(response.data[0].requestDescription!=='')
                       {
                        setAddrequest(true);
                       }

                       setFormState(formState => ({
                        ...formState,
                        values: {
                          ...formState.values,anyspecialrequest:response.data[0].requestDescription,
                          checkFrom:false
                        },
                        touched:{
                          ...formState.touched,
                          anyspecialrequest: true
                        }
                       }));
                        
                     
                    }else{
                        setLoading(false);
                        console.log("message",response.message);
                       } 
                    }  
          }).catch((error) =>{
                console.error(error);
          });
    }  

    const addStepStatus =()=>{
      setLoading(true);
      
     // const userid=user_id;
      const shiphypesubsubstepId=0;
      const shiphypesubstepId=14;
      const shiphypestepId=0;
      shiphypeservice.addUserStepDoneSofar(userid,shiphypesubsubstepId,shiphypesubstepId,shiphypestepId)
            .then(response => {
             console.log("status",response.status);
                  if(response.status === true) {
                    setLoading(false);
                    props.handleNextPage('PaymentRecieveSetting');
                             }else{
                              setLoading(false);
                              console.log("message",response.message);
                             }   
                }).catch((error) =>{
                      console.error(error);
                });
              }

    const sentSpecialRequest =()=>{
      if(shipProfile===false)
  {
    setOpen1(true);
  }
  else{
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

      
       const requestDescription=formState.values.anyspecialrequest;
       
        shiphypeservice.sendSpecailRequestFromUser(userid,requestRelatedTo,requestDescription)
    .then(response => {
     console.log("status",response.status);
          if(response.status === true) {
            setOpen(true);
            setType('success');
            setMsg(response.message);
            setStatus(response.status);
            setLoading(false);
            addStepStatus();
         //   fetchArrangeShip(shipmentId);
                     }else{
                        setOpen(true);
                        setType('error');
                        setMsg(response.message);
                        setStatus(response.status);
                        props.handleNextPage('PaymentRecieveSetting');
                        setLoading(false);
                      setLoading(false);
                      console.log("message",response.message);
                     }   
        }).catch((error) =>{
              console.error(error);
        });
      }
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
    React.useEffect(() => {
      fetchShiphypeCompleteStep(); 
     } ,[]);
     const fetchShiphypeCompleteStep = ()=>{
    
      //  const userid=userid;
      shiphypeservice.fetchStepCompleteStatus(userid)
        .then(response => {
         console.log("status",response.status);
              if(response.status === true) {
                   if(response.data.length !== 0){
                    for(let i=0; i<response.data.length;i++){
                      if(response.data[i].shiphypesubstepId === 13){
                        setShipprofiledone(true);
                       
                       
                      }else{
    
                     }
                   }
                  }
                  
                         }else{
                          console.log("message",response.message);
                         }   
            }).catch((error) =>{
                  console.error(error);
            });
      }
      const handleClose3 = () => {
        setOpen1(false);
       // handleNextPage(22);
      };
    /**
    /**
    * Description:To do checklist of steps
    */
       const handleChangequality = (event) => {
       setQualitycontrol(event.target.checked);
       };
   
    
    const handleChangeprAddRequest =(event)=>{
     setAddrequest(event.target.checked);
    }

        
       
         
        
         
        
                    const hasError = field =>
                    formState.touched[field] && formState.errors[field] ? true : false;
          let screenWidth = Dimensions.get('window').width;

    return (  
      <View className={classes.content}>
   
         <View >
         <Grid style={{marginLeft:'8px'}}>
         <Text 
           style={{
            fontSize: '14px',
            fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
       
            transition : 'all 0.25s',
           }}>{'\n'}Shipment Receiving Settings
            
        
           </Text>  
         </Grid>
         <Grid style={{marginLeft:'8px'}}>
        
           <Text 
           style={{
            fontSize: '12px',
            
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          marginTop:'10px',
            transition : 'all 0.25s',
           }}>We’ll notify you as soon as we receive your shipment. 
  {'\n'}
           Please let us know if you would like us to perform any special requests upon receiving inventory:
            {'\n'}{'\n'}
           </Text>  
         </Grid>
         <Grid  justify="space-between"
      container 
      spacing={1} >
        <Grid items lg={12}  style={{
            marginLeft:'8px',
           }} >
               <Snackbar 
      anchorOrigin={{ vertical, horizontal }}
      key={`${vertical},${horizontal}`}
      open={open1}
      autoHideDuration={3000}
      onClose={handleClose3}>
      <Alert onClose={handleClose3} severity="error">
      First Connect Credit Card.
      </Alert>
      </Snackbar>
         <FormGroup>
          <FormControlLabel
           color="primary"
            control={<Checkbox checked={qualitycontrol} onChange={handleChangequality} color="primary" name="qualitycontrol" />}
            label= {<Text style={{ fontSize: '12px',
           // fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}}>Quality Control</Text> } value="1"
          />
          </FormGroup>

          <Grid item item xs={8} md={3} lg={3} style={{
            
          }}>
          {(qualitycontrol === false  ? '' :
         
    <TextField
                id="qualitycontrolrequest"
                name="qualitycontrolrequest"
                variant="outlined"
                fullWidth
               
                placeholder="Provide Additional Information"
                size='small'
                type="text"
              
                multiline = {true}
                rows={3}
                onChange={handleChange('qualitycontrolrequest')}
                value={formState.values.qualitycontrolrequest}
                className={classes.profileMargin1}
              />
     
     )} 
</Grid>
          <FormGroup>
          <FormControlLabel
           color="primary"
            control={<Checkbox checked={printsku} onChange={handleChangeprintsku} color="primary" name="printsku" />}
            label= {<Text style={{ fontSize: '12px',
           // fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}}>Print SKU</Text> } value="2"
          />
          </FormGroup>

          <Grid item item xs={8} md={3} lg={3} style={{
            
          }}>
          {(printsku === false  ? '' :
    
    <TextField
                id="printskurequest"
                name="printskurequest"
                variant="outlined"
                fullWidth
               
                placeholder="Provide Additional Information"
                size='small'
                type="text"
              
                multiline = {true}
                rows={3}
                onChange={handleChange('printskurequest')}
                value={formState.values.printskurequest}
                className={classes.profileMargin1}
              />
     
     )} 
</Grid>
          <FormGroup>
          <FormControlLabel
           color="primary"
            control={<Checkbox checked={addrequest} onChange={handleChangeprAddRequest} color="primary" name="addrequest" />}
            label= {<Text style={{ fontSize: '12px',
           // fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}}>Additional Request</Text> }  value="3"
          />
          </FormGroup>
    
         </Grid> 
              </Grid>


              

              <Grid item item xs={8} md={3} lg={3} style={{
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
       <Grid container item xs={12} justify="flex-start" style={{marginRight:'10px'}}>
            <Grid >
          <ColorButton
          size='large'
          variant="contained"
          color='primary'
          className={classes.profileMargin11}
        
          onClick={()=>{sentSpecialRequest()}}>
         Save
        </ColorButton>
            </Grid>
          </Grid>
  {showToast(open,msg,type)}
        </View>
       
         
           
        </View>
    );
  }

