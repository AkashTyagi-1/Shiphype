import React ,{ useState, useEffect } from 'react';
import { fade,withStyles,makeStyles} from '@material-ui/core/styles';
import {Platform,View,Image,Text,Dimensions} from 'react-native';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import PropTypes from "prop-types";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import Stepper from '@material-ui/core/Stepper';

import StepConnector from '@material-ui/core/StepConnector';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import StepLabel from '@material-ui/core/StepLabel';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import * as shiphypeservice from '../ShipService/shiphype_service';
import Toast from './Toast';
import popStyle from '.././style/popUpStyle';
import ProgressBar from './ProgressBar';
import validate from 'validate.js';

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-52% + 16px)',
    right: 'calc(48% + 16px)',
  },
  line: {
    borderColor: '#3f51b5',
    borderTopWidth: 2,
    borderRadius: 1,
  },
})(StepConnector);

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

profileMargin1: {
    marginTop: theme.spacing(1),
    borderRadius : '5px',
  //  marginBottom: theme.spacing(1),
  },

// grid: {
//   width: 100,
//   height: 100,
// },

}));

const schema = {
  Name: {
      presence: { allowEmpty: false, message: 'is required' },
      length: {
        maximum: 32
      }
    },
    Website: {  
      presence: { allowEmpty: false, message: 'is required' },
      length: {
        maximum: 20
      }
    },
  
   
  };

/****   For changing the textfield radius  : End *********/
const styles = (theme) => ({
  root: {
    '@media print': {
    margin: 0,
    padding: theme.spacing(2),
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
    backgroundColor: '#0168fa',
     borderColor: '#0168fa',
     borderRadius:'3px',
     height:45,
     width:290,
          fontSize:'13px',
     fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
    '&:hover': {
      backgroundColor: '#002080',
      
    },
  },
}))(Button);
//Make custom button
const ColorButton3 = withStyles(theme => ({
  root: {
    color: '#fff',
    borderRadius : '3px',
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    height:'65%',
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
//Make custom button
const ColorButton2 = withStyles(theme => ({
  root: {
    color: '#fff',
    borderRadius : '3px',
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    height:'65%',
    width:'170px',
     fontSize:'11px',
     fontWeight: '550',
     color:'#fff',
     backgroundColor:'#0168fa',
    '&:hover': {
      backgroundColor: '#002080',
      
    },
  },
}))(Button);
let screenWidth = Dimensions.get('window').width;
  const DialogTitle = withStyles(styles)(props => {
    
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        {onClose ? (
            <Grid container item xs={12} justify="flex-end">
          <IconButton aria-label="close" className={classes.closeButton} onClick={props.onClose}>
            <CloseIcon />
          </IconButton>
          </Grid>
        ) : null}
        <Grid item xs={5}>
        <Typography justify="center" variant="body1" style={{fontSize: '16px',
            fontWeight: '700',
            marginLeft:'11px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>Request Custom Integration</Typography></Grid>
      </MuiDialogTitle>
    );
  });
  function getSteps() {
    return ['Marketplace Integration', 'Shipping Profile', 'Return Settings','Import Products','Import Customers'];
  }
/**
 * Description:This function is used for CreateSprint for sprint
 * @param {*} props 
 */
export default function CreateCustomeIntegration(props) {
  
   const classes = useStyles();
    //const {openCreateSprint}= props;
    const {openCreateCustomeIntegration}= props;
    const [activeStep, setActiveStep] = React.useState(0);
    const [open, setOpen]=React.useState(false);
    const [msg,setMsg]=React.useState('');
    const [type,setType]=React.useState('');
    const [status,setStatus]=React.useState(false);
    const [loading,setLoading]=React.useState(false);
    const steps = getSteps();
    const username='NKT'; 
    const userid=props.user_id;
    const [formState, setFormState] =useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

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
 * Description:To do close poup after successfully create sprint and on click cancel button
 * @param {*} issprintCreate 
 */
const handleClose1 = (isSprintCreate) => {
  props.handleSprintCancel(isSprintCreate);
}


/**
 * Description:To do call custome integration api
 */
const handleClickCustomIntegration = () => {

 // const reciepent='vishal.tyagi@quicklivesolutions.com';
  const subject='Request for custom integration by '+username;
  const integrationname=formState.values.Name;
  const website=formState.values.Website;
  const additionalnotes=formState.values.additionalnotes;
  console.log("subject",subject);
  setLoading(true);
  shiphypeservice.requestCustomeIntegration(subject,integrationname,website,additionalnotes)
 .then(response => {
 console.log("status",response.status);
     if(response.status === true) {
                  setOpen(true);
                  setType('success');
                  setMsg(response.message);
                  setStatus(response.status);
                  setLoading(false);
                }else{
                  setOpen(true);
                  setType('error');
                  setMsg(response.message);
                  setStatus(response.status);
                  setLoading(false);
                  console.log("message",response.message);
                }   
   }).catch((error) =>{
         console.error(error);
   });
};

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

//Show Toast after click event
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
     * Description:Callback function after api call
     */
    const handleClose = () => {
      setOpen(false);
      if(status === true)
      {
        handleNextPage(16);
      }else{
       
      }
    };
    
/**
 * Description:To do call function on back button
 * @param {*} isSprintCreate 
 */
const handleNextPage = (isSprintCreate) => {
  props.handleNextPage(isSprintCreate);
//props.handleNext(isSprintCreate);
}
const handleStepClick=(index)=>{
  console.log("indexprint",index);

    if(index === 0){
      props.handleStepPage(1);
    }
    else if(index === 1){
      props.handleStepPage(2);
    }
    else if(index === 2){
      props.handleStepPage(3);
    }
    else if(index === 3){
      props.handleStepPage(4);
    }
    else if(index === 4){
      props.handleStepPage(5);
    }
    else if (index === 5) {
      props.handleStepPage(6);
    }
  
  }
    const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

    return (  
      <View>
      <Dialog 
       fullWidth={true}
       maxWidth="md"
        onClose={()=>{handleClose1(false)}} 
        aria-labelledby="customized-dialog-title" 
        open={openCreateCustomeIntegration}>
        <Grid item xs={12} >
       
        {(() => {
              if (screenWidth>690){
                  return (
                    <View>
                   <Stepper activeStep={activeStep} alternativeLabel connector={<QontoConnector />}>
                   {steps.map((label, index) => (
          <Step key={label}>
            <StepButton onClick={()=>{handleStepClick(index)}}>
          <Text style={popStyle.stepperCss}>{label}</Text>
            </StepButton>
          </Step>
        ))}
      </Stepper>
                    </View>
                    )
                }
              })()}

              <DialogTitle id="customized-dialog-title" onClose={()=>{handleClose1(false)}}  style={{width:'96%',margin:'auto',paddingBottom:'0px',paddingTop:'0px'}}>
       
       </DialogTitle>
       </Grid>
      
         <DialogContent  style={{width:'96%',margin:'auto'}}>
         {(() => {
              if (screenWidth<690){
                  return (
                    <View>
                     <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
                    </View>
                    )
                }
              })()}

              <Grid justify="center">
            <ProgressBar 
             loading={loading}
            />
            </Grid>
         <form className={classes.form}>
         <Grid container>


         <Grid item xs={12} md={6} lg={6}>
         <Grid item xs={10} style={{
             marginLeft:'15px',
           }}>
    
         <TextField
           id="iname"
           name='Name'
           variant="outlined"
           fullWidth
           error={hasError('Name')}
           helperText={
              hasError('Name') ? formState.errors.Name[0] : null
           }
           placeholder="Integration Name"
           size='small'
           type="text"
           onChange={handleChange('Name')}
           className={classes.profileMargin1}
           value={formState.values.Name || ''}
         />
    
       </Grid>
       <Grid item xs={10} style={{
             marginLeft:'15px',
           }}>
    
         <TextField
           id="website"
           name='Website'
           variant="outlined"
           fullWidth
           error={hasError('Website')}
           helperText={
              hasError('Website') ? formState.errors.Website[0] : null
           }
           placeholder="Integration website"
           size='small'
           type="text"
           onChange={handleChange('Website')}
           className={classes.profileMargin1}
           value={formState.values.Website || ''}
         />
    
       </Grid>
       <Grid item xs={10} style={{
             marginLeft:'15px',
           }}>
    
    <TextField
                id="additionalnotes"
                name="additionalnotes"
                variant="outlined"
                fullWidth
                // error={hasError('additionalnotes')}
                // helperText={
                //   hasError('additionalnotes') ? formState.errors.additionalnotes[0] : null
                // }
                placeholder="Additional Notes"
                size='small'
                type="text"
              // style = {{height: 70}}
                multiline = {true}
                rows={3}
                onChange={handleChange('additionalnotes')}
                value={formState.values.additionalnotes}
                className={classes.profileMargin1}
              />
       </Grid>
       </Grid>
       <Grid items xs={12} lg={12}>
       <Grid  justify="flex-end" // Add it here :)
 container 
 spacing={24} >
   <Grid items >
          {/* <Text style={{color:'#0039e6',marginTop:'20%'}}>{'\n'}Request Custom Integration 
</Text> */}
       </Grid>


       <Grid items   >
       <ColorButton3
       size='large'
       variant="contained"
       color="primary"
       className={classes.profileMargin}
       onClick={()=>{handleNextPage(16)}}>
          Back
       </ColorButton3> &nbsp;&nbsp;&nbsp;
       <ColorButton2
       size='large'
       variant="contained"
       color="primary"
       className={classes.profileMargin}
       disabled={!formState.isValid}
       onClick={()=>{handleClickCustomIntegration()}}>
          Send Request
       </ColorButton2>
       </Grid>
       {showToast(open,msg,type)}
       </Grid>


       </Grid>
     
      </Grid>
        

           </form>


       
        </DialogContent>
      </Dialog>


        </View>
    );
  }


  CreateCustomeIntegration.propTypes = {
    openCreateCustomeIntegration: PropTypes.bool,
    handleCloseSprintPoupup: PropTypes.func
  };