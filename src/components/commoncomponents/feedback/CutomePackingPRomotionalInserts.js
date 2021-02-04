import React ,{ useState, useEffect } from 'react';
import clsx from 'clsx';
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
import Typography from '@material-ui/core/Typography';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import StepLabel from '@material-ui/core/StepLabel';
import Paper from '@material-ui/core/Paper';

import ProgressBar from './ProgressBar';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import StepConnector from '@material-ui/core/StepConnector';
import * as shiphypeservice from '../ShipService/shiphype_service';
import popStyle from '.././style/popUpStyle';

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
paper: {
  border: '2px solid #ced4da',
  height: 80,
  width: 100,
},
paper1: {
  border: '2px solid #fff',
  height: 150,
  width: '95%',
 textAlign:'center',
},
paper2: {
  border: '2px solid #ced4da',
  height: 100,
  width: '95%',
 textAlign:'center',
 marginTop: '3px',
},
root: {
  flexGrow: 1,
},
avatarsmall: {
  width: theme.spacing(3.5),
  height: theme.spacing(3.5),
},
normal :{
   
  marginTop: theme.spacing(2),
  borderRadius : '0px',
  height:50,
   width:190,
   backgroundColor:'#0168fa',
   color:'#fff',
   '&:hover': {
    backgroundColor: '#002080',
    
  },
    
  },
  normalSelected :{
   
    marginTop: theme.spacing(2),
    borderRadius : '0px',
    height:50,
     width:190,
     backgroundColor:'#0168fa',
     color:'#fff',
     '&:hover': {
      backgroundColor: '#002080',
      
    },
    
  },
  urgent :{
   
    marginTop: theme.spacing(2),
    borderRadius : '0px',
    height:50,
     width:190,
     backgroundColor:'#0168fa',
     color:'#fff',
     '&:hover': {
      backgroundColor: '#002080',
      
    },
    
    
  },
  urgentSelected :{
   
    marginTop: theme.spacing(2),
    borderRadius : '0px',
    height:50,
     width:190,
    backgroundColor:'#0168fa',
    color:'#fff',
    '&:hover': {
      backgroundColor: '#002080',
      
    },
    
    
  },
// grid: {
//   width: 100,
//   height: 100,
// },

}));

const dataOption = [
  {
    id: '1',
    label: 'Domestic Shipping',
    selected :'false'
  },
 
];

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
     borderRadius: '3px',
     height:'70%',
     width:'90px',
          fontSize:'11px',
     fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
    '&:hover': {
      backgroundColor: '#002080',
      
    },
  },
}))(Button);
const ColorButtonTes1 = withStyles(theme => ({
  root: {
    color: '#fff',
    backgroundColor: '#0168fa',
     borderColor: '#0168fa',
     borderRadius:'3px',
     height:45,
     width:290,
          fontSize:'11px',
     fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
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
     height:45,
     width:290,
          fontSize:'11px',
     fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
    '&:hover': {
      backgroundColor: '#002080',
      
    },
  },
}))(Button);
//Make custom button
const ColorButton2 = withStyles(theme => ({
  root: {
    color: '#fff',
    backgroundColor: '#0168fa',
     borderColor: '#0168fa',
     borderRadius:'3px',
     height:45,
     width:290,
          fontSize:'11px',
     fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
    '&:hover': {
      backgroundColor: '#002080',
      
    },
  },
  
}))(Button);

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
        <Grid item xs={12}>
        <Typography justify="center" variant="body1" style={{fontSize: '14px',marginLeft:'15px',
            fontWeight: '600',
            textAlign:'center',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>Will you be sending us your own Custom Packaging or Promotional Inserts to ship your orders?
</Typography></Grid>
      </MuiDialogTitle>
    );
  });
  function getSteps() {
    return ['Marketplace Integration', 'Shipping Profile', 'Return Settings','Import Products','Import Customers'];
  }
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
/**
 * Description:This function is used for CreateSprint for sprint
 * @param {*} props 
 */
export default function CreateSprint(props) {
  
   const classes = useStyles();
    //const {openCustomePromotional}= props;
    const {openCustomePromotional}= props;
    const [activeStep, setActiveStep] = React.useState(2);
    const [completed, setCompleted] = React.useState(new Set());
    const [skipped, setSkipped] = React.useState(new Set());
    const [loading,setLoading]=React.useState(true);
    const [open1, setOpen1]=React.useState(false);
    const [state1, setState1]=useState({
      vertical: 'top',
      horizontal: 'center',
    });
    const {vertical,horizontal} = state1;
    const [shipProfile,setShipprofiledone]=React.useState(false);
    
   const userid=props.user_id;
    const [changedOptionid, setchangedOptionid] = React.useState([]);
    const [optionid, setOptionId] = React.useState([]);

    
    const [checkedA,setCheckedA]=React.useState(2);
    const handleChangeSwitchA = (value) => {
      if(shipProfile===false)
  {
    setOpen1(true);
  }
  else{
      setCheckedA(value);
      if(value === 2)
      {
        props.handleNextPage1(8);
      }
      else{
        props.handleNextPage(9,7);
      }
    }
     // console.log('Stausts Promotional',event.target.checked);
      //setState({ ...state, [event.target.name]: event.target.checked });
    };

  const steps = getSteps();

  

  
       /**
 * Description:To do fetch all warehouse for user
 */
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
                  if(response.data[i].shiphypesubsubstepId === 6){
                    setShipprofiledone(true);
                   
                   
                  }else{

                 }
               }
              }
              setLoading(false);
                     }else{
                      console.log("message",response.message);
                     }   
        }).catch((error) =>{
              console.error(error);
        });
  }
    
/**
 * Description:To do close poup after successfully create sprint and on click cancel button
 * @param {*} issprintCreate 
 */
const handleClose1 = (isSprintCreate) => {
  props.handleSprintCancel(isSprintCreate);
}

/**
 * Description:To do call function on back button
 * @param {*} isSprintCreate 
 */
const handlePreviousPage = (isSprintCreate) => {
  props.handlePreviousPage(isSprintCreate);
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
  const handleClose3 = () => {
    setOpen1(false);
   // handleNextPage(22);
  };

let screenWidth = Dimensions.get('window').width;
    return (  
      <View>
      <Dialog 
       fullWidth={true}
       maxWidth="md"
        onClose={()=>{handleClose1(false)}} 
        aria-labelledby="customized-dialog-title" 
        open={openCustomePromotional}>
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
      {/* <View >

<Grid item  container lg={12}  >
<Grid item  lg={1} ></Grid>
<Grid item  lg={5}
style={{ marginLeft:'4px'}}
>
<Text style={popStyle.breadCrundCss}>SETUP WIZARD / SHIPPING PROFILE /</Text>
<Text style={popStyle.breadCrundCss2}> SELECT CUSTOM PACKAGING AND PROMOTINAL INSERTS</Text> 

</Grid>
<Grid item  lg={6} ></Grid>

</Grid>

</View> */}
        <DialogTitle id="customized-dialog-title" onClose={()=>{handleClose1(false)}}>
       
        </DialogTitle>
       </Grid>
      
         <DialogContent>
         <Grid justify="center">
            <ProgressBar 
             loading={loading}
            />
            </Grid>
         <Snackbar 
      anchorOrigin={{ vertical, horizontal }}
      key={`${vertical},${horizontal}`}
      open={open1}
      autoHideDuration={3000}
      onClose={handleClose3}>
      <Alert onClose={handleClose3} severity="error">
      First Complete the Return Setting screen.
      </Alert>
      </Snackbar>
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
         <form className={classes.form}>
         <Grid container   justify="center" >

        
        <Grid  items xs={12} lg={12}>
        <Grid justify="center" // Add it here :)
      container>
        <Paper   className={classes.paper1} variant='outlined' >
        <Grid container   justify="center" >

        
<Grid  items xs={12} lg={12}>
<Grid justify="center" container>

<ColorButtonTes
    size='large'
    variant="contained"
    color="primary"
    className={classes.profileMargin}
  //  className={clsx((checkedA!==1) && classes.normal, (checkedA === 1) && classes.normalSelected)}
    onClick={()=>{handleChangeSwitchA(1)}}
    >
No
    </ColorButtonTes>
  </Grid>

</Grid>
<Grid  items xs={12} lg={12}>
<Grid justify="center" container>
<ColorButtonTes1
    //className={clsx((checkedA !==2 ) && classes.urgent, (checkedA === 2) && classes.urgentSelected)}
    size='large'
    variant="contained"
    color="primary"
    className={classes.profileMargin}
    onClick={()=>{handleChangeSwitchA(2)}}
    >
  Yes
    
    </ColorButtonTes1>
  </Grid>

</Grid>
</Grid>

        <Text>{'\n'}{'\n'}{'\n'}
</Text>
          </Paper>
          </Grid>
      
        </Grid>
       
      </Grid>
        
           </form>


           <Grid  justify="space-between" // Add it here :)
 container 
 spacing={24} >
   <Grid items >
          {/* <Text style={{color:'#0039e6',marginTop:'20%'}}>{'\n'}Request Custom Integration 
</Text> */}
       </Grid>


       <Grid items   >
      
       <ColorButton
       size='large'
       variant="contained"
       color="primary"
       className={classes.profileMargin}
       onClick={()=>{handlePreviousPage(6)}}>
          Back
       </ColorButton>&nbsp;&nbsp;
 
 
       </Grid>


       </Grid>

        
        </DialogContent>
      </Dialog>


        </View>
    );
  }


  CreateSprint.propTypes = {
    openCustomePromotional: PropTypes.bool,
    handleCloseSprintPoupup: PropTypes.func
  };