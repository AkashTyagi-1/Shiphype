import React ,{ useState, useEffect } from 'react';
import clsx from 'clsx';
import { fade,withStyles,makeStyles} from '@material-ui/core/styles';
import {Platform,View,Image,Text,Dimensions} from 'react-native';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import PropTypes from "prop-types";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Stepper from '@material-ui/core/Stepper';
import StepConnector from '@material-ui/core/StepConnector';

import Toast from './Toast';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import InputBase from '@material-ui/core/InputBase';
import Switch from '@material-ui/core/Switch';
import StepButton from '@material-ui/core/StepButton';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import ProgressBar from '../feedback/ProgressBar';
import * as shiphypeService from '../ShipService/shiphype_service';
import popStyle from '.././style/popUpStyle';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

/**For Style */
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
  marginRight:'8px',
},

profileMargin1: {
   
   // border : '1px solid #cccccc',
  //  padding:'1%',
  marginLeft:'8px',

  },
  MuiTypography:{
    lineHeight:'2.5',
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
  footCss9:{
     //border : ' 1px solid #fff',
     //borderRadius:'8%',
     //height:250,
     color: '#fff',
     paddingTop: theme.spacing(0),
    // margin: theme.spacing(1),
    // margin: '1px',
     paddingBottom: theme.spacing(0),
     // paddingLeft: theme.spacing(4),
     // paddingRight: theme.spacing(4),
     border:'1px solid #cccccc',
     textAlign:'center'
   },
   instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  button: {
    marginRight: theme.spacing(1),
  },
// grid: {
//   width: 100,
//   height: 100,
// },

}));

const schema = {
    sprintname: {
      presence: { allowEmpty: false, message: 'is required' },
      length: {
        maximum: 32
      }
    },
    sprintgoal: {  
      presence: { allowEmpty: false, message: 'is required' },
      length: {
        maximum: 300
      }
    },
   
  };

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

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const DialogTitle = withStyles(styles)(props => {
    
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        {onClose ? (
            <Grid container item xs={12}  justify="flex-end">
          <IconButton aria-label="close" className={classes.closeButton} onClick={props.onClose}>
            <CloseIcon />
          </IconButton>
          </Grid>
        ) : null}
        <Grid item xs={12} >
        <Typography justify="center" variant="body1" style={{fontSize: '14px',
            fontWeight: '600',
            //marginLeft:'40%',
            textAlign:'center',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>Are your customers mostly Individuals or Businesses?</Typography></Grid>
      </MuiDialogTitle>
    );
  });

  /**
   * Description:To do show step of task
   */
  function getSteps() {
    return ['Marketplace Integration', 'Shipping Profile', 'Return Settings','Import Products','Import Customers',];
  }

/**
 * Description:This function is used for Select warehouse
 * @param {*} props 
 */
export default function FutureCustomer(props) {
  
   const classes = useStyles();
   const [loading,setLoading]=React.useState(true);
   const {openFutureCustomer}= props;
   const [activeStep, setActiveStep] = React.useState(4);
   const steps = getSteps();
   const [checkedA,setCheckedA]=React.useState(true);
   const [updateData,setUpdateData]=React.useState(false);
    const [data , setData] = React.useState([]);
    const [changedWarehouseid, setchangedWarehouseid] = React.useState([1]);
    const [state, setState]=useState({
      vertical: 'top',
      horizontal: 'center',
    });
    const {vertical,horizontal} = state;
    const [open, setOpen]=React.useState(false);
    const [msg,setMsg]=React.useState('');
    const [type,setType]=React.useState('');
    const [status,setStatus]=React.useState(false);
    const userid=props.user_id;
    const [formState, setFormState] =React.useState({
        isValid: false,
        values: {},
        touched: {},
        errors: {}
      });
    
  /**
 * Description:To do fetch all warehouse for user
 */
React.useEffect(() => {

     fetchWarehouse();
  // fetchShiphypeCompleteStep(); 
  
      
  } ,[]);
 
  const fetchWarehouse = ()=>{
    setLoading(true);
  //  const userid=userid;
  shiphypeService.fetchB2BCustomer(userid)
    .then(response => {
     console.log("status",response.status);
          if(response.status === true) {
                       setLoading(false);
                        setData(response.data);  

                     
                      //  setchangedWarehouseid(response.data[0].customertypeId);
                        if(response.data[0].selected==true)
                        {
                          setUpdateData(true);
                          setchangedWarehouseid(response.data[0].customertypeId);
                        }
                        else if (response.data[1].selected==true)
                        {
                          setUpdateData(true);
                          setchangedWarehouseid(response.data[1].customertypeId);
                        }else{
                          setUpdateData(false);
                        }
                        
                     }
                     else{
                      setLoading(false);
                       console.log("message",response.message);
                     }   
        }).catch((error) =>{
              console.error(error);
              setLoading(false);
        });
  }

  


      React.useEffect(() => {
        const errors = validate(formState.values, schema);
    
        setFormState(formState => ({
          ...formState,
          isValid: errors ? false : true,
          errors: errors || {}
        }));
      }, [formState.values]);

      
 

/*
 * Description:To do close poup after successfully create sprint and on click cancel button
 * @param {*} issprintCreate 
 */
const handleClose1 = (isSprintCreate) => {
  props.handleSprintCancel(isSprintCreate);
}

/**
 * Description:To do call function on next button
 * @param {*} isSprintCreate 
 */
const handleNextPage = (isSprintCreate) => {
    props.handleNextPage(isSprintCreate);
  //props.handleNext(isSprintCreate);
}
/**
 * Description:To do call function on back button
 * @param {*} isSprintCreate 
 */
const handlePreviousPage = (isSprintCreate) => {
  props.handlePreviousPage(isSprintCreate);
//props.handleNext(isSprintCreate);
}


  

        
       
          let screenWidth = Dimensions.get('window').width;


          const addWarehouseOption =(changedWarehouseid)=>{
           if(updateData===true){
            setLoading(true); 
            shiphypeService.updateB2BCustomerType(changedWarehouseid,userid)
        .then(response => {
         console.log("status",response.status);
              if(response.status === true) {
                setLoading(false);
             //   handleNextPage(22);
                setOpen(true);
                // setOpen(true);
                  setType('success');
                  setMsg('You are all set up now. Please click the "Send Inventory" tab to start sending inventory to ShipHype!');
                  setStatus(true);


              
                         }else{
                          setLoading(false);
                          console.log("message",response.message);
                         }   
            }).catch((error) =>{
                  console.error(error);
            });
           
           }
              else{
                setLoading(true); 
              shiphypeService.addB2BCustomerType(changedWarehouseid,userid)
          .then(response => {
           console.log("status",response.status);
                if(response.status === true) {
                  setLoading(false);
               //   handleNextPage(22);
                  setOpen(true);
                  // setOpen(true);
                    setType('success');
                    setMsg('You are all set up now. Please click the "Send Inventory" tab to start sending inventory to ShipHype!');
                    setStatus(true);


                
                           }else{
                            setLoading(false);
                            console.log("message",response.message);
                           }   
              }).catch((error) =>{
                    console.error(error);
              });
             
              }
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
            
              var ids=[];
              const handleChangeSwitchA = (value) => {
                setCheckedA(value);
                setchangedWarehouseid(value);
                ids.push(value);
                addWarehouseOption(value);
                handleNextPage(22);
              };

              const handleClose = () => {
                setOpen(false);
                handleNextPage(22);
              };
           
      
    return (  
      <View>
      <Dialog 
        maxWidth="md"
        fullWidth={true}
        className={classes.dialog} 
        onClose={()=>{handleClose1(false)}} 
        aria-labelledby="customized-dialog-title" 
        open={openFutureCustomer}>
        <Grid item xs={12} >
        {(() => {
              if (screenWidth>690){
                  return (
                    <View>
                  <Stepper activeStep={activeStep} alternativeLabel  connector={<QontoConnector />}>
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
                    <Text>{'\n'}</Text>
                    <Stepper  activeStep={activeStep}>
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
         <Grid container className={classes.root} spacing={1}>
      
<Grid>
</Grid>
<Snackbar 
      anchorOrigin={{ vertical, horizontal }}
      key={`${vertical},${horizontal}`}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}>
      <Alert onClose={handleClose} severity="success">
      You are all set up now. Please click the "Send Inventory" tab to start sending inventory to ShipHype!
      </Alert>
      </Snackbar>
     

         <Grid item xs={12} lg={12} style={{ marginLeft:'10px',padding:'0px'}} >
     
        <Grid container   justify="center" >

        
<Grid  items xs={12} lg={12}>
<Grid justify="center" container>

<ColorButtonTes
    size='large'
    variant="contained"
    color="primary"
    className={classes.profileMargin}
    onClick={()=>{handleChangeSwitchA(1)}}
    >
      RESIDENTIAL
    </ColorButtonTes>
  </Grid>

</Grid>
<Grid  items xs={12} lg={12}>
<Grid justify="center" container>
<ColorButtonTes1
   size='large'
   variant="contained"
   color="primary"
   className={classes.profileMargin}
    onClick={()=>{handleChangeSwitchA(2)}}
    >
  BUSINESSES
    
    </ColorButtonTes1>
  </Grid>

</Grid>
</Grid>

        <Text>{'\n'}{'\n'}{'\n'}
</Text>
         </Grid>
       
         </Grid>
           </form>
           </DialogContent>
<DialogActions><Grid  justify="flex-end"
            container 
            spacing={24} >
            
            <Grid item>

            <ColorButton
       size='large'
       variant="contained"
       color="primary"
       className={classes.profileMargin}
       onClick={()=>{handlePreviousPage(27)}}>
          Back
       </ColorButton>&nbsp;&nbsp;
    
       </Grid>
       </Grid>
       </DialogActions>
            
      </Dialog>
        </View>
    );
  }


  FutureCustomer.propTypes = {
    openFutureCustomer: PropTypes.bool,
    handleSprintCancel: PropTypes.func
  };