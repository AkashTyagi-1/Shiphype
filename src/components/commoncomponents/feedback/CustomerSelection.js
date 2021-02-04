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
import Switch from '@material-ui/core/Switch';
import * as shiphypeservice from '../ShipService/shiphype_service';
import popStyle from '.././style/popUpStyle';
import ProgressBar from './ProgressBar';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Toast from './Toast';
import CustomerSheet from "../../../assets/icons/CustomerSheet.xlsx";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import {ExcelRenderer, OutTable} from 'react-excel-renderer';

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

profileMargin: {
  marginTop: theme.spacing(2),
  borderRadius : 0,
},


}));


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
          fontSize:'11px',
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
//Make custom button
const ColorButton2 = withStyles(theme => ({
  root: {
    color: '#fff',
    backgroundColor: '#ff9900',
     borderColor: '#e68a00',
     borderRadius:'3px',
     height:45,
     width:290,
          fontSize:'11px',
     fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
    '&:hover': {
      backgroundColor: '#e68a00',
      
    },
  },
}))(Button);

//Make custom button
const ColorButton4 = withStyles(theme => ({
  root: {
    color: '#fff',
    backgroundColor: '#00b33c',
     borderColor: '#009933',
     borderRadius:'3px',
     height:45,
     width:290,
          fontSize:'11px',
     fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
    '&:hover': {
      backgroundColor: '#00cc44',
      
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
      
      </MuiDialogTitle>
    );
  });
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  function getSteps() {
    return ['Marketplace Integration', 'Shipping Profile', 'Return Settings','Import Products','Import Customers'];
  }
/**
 * Description:This function is used for CreateSprint for sprint
 * @param {*} props 
 */
export default function CreateSprint(props) {
  
   const classes = useStyles();
    //const {openCreateSprint}= props;
    const {openCustomerSelection}= props;
    const [activeStep, setActiveStep] = React.useState(4);
    const [completed, setCompleted] = React.useState(new Set());
    const userid=props.user_id;
    const [open, setOpen]=React.useState(false);
    const [msg,setMsg]=React.useState('');
    const [status,setStatus]=React.useState(false);
    const [type,setType]=React.useState('');
    const [loading,setLoading]=React.useState(true);
    const [open1, setOpen1]=React.useState(false);
    const [intergartionTrue, setIntergartionchekced]=React.useState(true);
    const [state1, setState1]=useState({
      vertical: 'top',
      horizontal: 'center',
    });
    const {vertical,horizontal} = state1;
    const [shipProfile,setShipprofiledone]=React.useState(false);

  const steps = getSteps();
 

  React.useEffect(() => {
  //  fetchShiphypeCompleteStep(); 
    fetchSelectedIntegration();
   } ,[]);

   const fetchSelectedIntegration = () => {
    setLoading(true);
    shiphypeservice
      .fetchUserIntegration(userid)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          //setFetchIntData(response.data);
          if (response.data.length !== 0) {
            setIntergartionchekced(false);
          }
        
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

 

    const handleClose3 = () => {
      setOpen1(false);
     // handleNextPage(22);
    };
    const handleCaptureInvoice = (event) => {
      const target=event.target;
      const fileReader = new FileReader();
      const file=target.files[0];
      var path = (window.URL || window.webkitURL).createObjectURL(file);
      console.log(path);
    ///  var form = document.getElementById('createForm');
      var formData =  new FormData();
    //  const formData = new FormData();
    formData.append('file',file);
   // formData.append('shippingtype',3);
    formData.append('userid',72);
    if(file.type==='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    {
      ExcelRenderer(file, (err, resp) => {
        if(err){
          console.log(err);            
        }
        else{
        
          shiphypeservice.uploadCustomerSheet(resp.rows,userid)
      .then(response => {
       console.log("status",response.status);
            if(response.status === true) {
                console.log('done');
                setOpen(true);
                setType('success');
                setMsg(response.message);
                setStatus(response.status);
                setLoading(false);
                       }else{
                        console.log("message",response.message);
                        setOpen(true);
                        setType('error');
                        setMsg(response.message);
                        setStatus(response.status);
                        setLoading(false);
                       }   
          }).catch((error) =>{
                console.error(error);
          });
          console.log(resp);
        }
      });          
    }
    else if(file.type==='application/vnd.ms-excel')
              {
                ExcelRenderer(file, (err, resp) => {
                  if(err){
                    console.log(err);            
                  }
                  else{
                  
                    shiphypeservice.uploadCustomerSheet(resp.rows,userid)
                .then(response => {
                 console.log("status",response.status);
                      if(response.status === true) {
                          console.log('done');
                          setOpen(true);
                          setType('success');
                          setMsg(response.message);
                          setStatus(response.status);
                          setLoading(false);
                                 }else{
                                  console.log("message",response.message);
                                  setOpen(true);
                                  setType('error');
                                  setMsg(response.message);
                                  setStatus(response.status);
                                  setLoading(false);
                                 }   
                    }).catch((error) =>{
                          console.error(error);
                    });
                    console.log(resp);
                  }
                });          
              }
              else{
                setOpen(true);
  setType('error');
  setMsg('File Type is Invaild');
  setStatus(false);
  setLoading(false);
              }
        
    
    
   
    };
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
/**
 * Description:To do close poup after successfully create sprint and on click cancel button
 * @param {*} issprintCreate 
 */
const handleClose1 = (isSprintCreate) => {
  props.handleSprintCancel(isSprintCreate);
}
/**
 * Description:To do close poup after successfully create sprint and on click cancel button
 * @param {*} issprintCreate 
 */
const handleNextPage = (isSprintCreate) => {
  // if(shipProfile===false)
  // {
  //   setOpen1(true);
  // }
  // else{
  props.handleNextPage(isSprintCreate);
  // }
}
/**
 * Description:To do call function on back button
 * @param {*} isSprintCreate 
 */
const handlePreviousPage = (isSprintCreate) => {
  props.handlePreviousPage(isSprintCreate);
//props.handleNext(isSprintCreate);
}
useEffect(() => {
 // fetchShiphypeCompleteStep();
 
  },[]);


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
    return (  
      <View>
      <Dialog 
       fullWidth={true}
       maxWidth="md"
        onClose={()=>{handleClose1(false)}} 
        aria-labelledby="customized-dialog-title" 
        open={openCustomerSelection}>
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
              <DialogTitle id="customized-dialog-title" onClose={()=>{handleClose1(false)}} style={{width:'96%',margin:'auto',padding:'0px'}}>
       
       </DialogTitle>
         
       </Grid>
       {showToast(open,msg,type)}
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
      First Complete the Product Import screen.
      </Alert>
      </Snackbar>
         <View >

<Grid item  container lg={12}  >
<Grid item xs={12} md={12} lg={12}  >
       
       
       <Grid  justify="center"  // Add it here :)
container >
  <Grid>
  <Text style={popStyle.stepperCss1}> IMPORT CUSTOMERS{'\n'} </Text> 
  </Grid>
</Grid>
</Grid>

</Grid>

</View>

         <form className={classes.form}>
         <Grid container   justify="center" >

        
        <Grid  items xs={12} lg={12}>
     
        {/* <Grid justify="center" // Add it here :)
      container>
      
        <ColorButton
    size='large'
    variant="contained"
    color="primary"
    disabled={intergartionTrue}
  //  className={classes.profileMargin}
  onClick={()=>{handleNextPage(17)}}
  >
    Import From Store
  
  </ColorButton>
         
          </Grid> */}
      
        </Grid>
        <Grid  items xs={12} lg={12}>
        <Grid justify="center" // Add it here :)
      container>
       
        <ColorButton2
    size='large'
    variant="contained"
    color="primary"
    className={classes.profileMargin}
    onClick={()=>{handleNextPage(18)}}
  >
    Add Customers Manually
  
  </ColorButton2>
         
          </Grid>
      
        </Grid>
        <Grid  items xs={12} lg={12}>
        <Grid justify="center" // Add it here :)
      container>
      
        <ColorButton4
  size='large'
  variant="contained"
  component="label"
  color="primary"
  className={classes.profileMargin}
  //  onClick={()=>{handleNextPage(19)}}
    startIcon={<CloudUploadIcon />}
  >
    Upload Customer Sheet
    <input
    type="file"
    webkitdirectory directory multiple 
    onChange={handleCaptureInvoice}
    style={{ display: "none" }}
  />
  </ColorButton4>
         
          </Grid>
      
        </Grid>
        <Grid  items xs={12} lg={12} style={{marginTop:'10px'}}>
        <Grid justify="center" // Add it here :)
      container>
      <form id="createForm" name="createForm" novalidate enctype="multipart/form-data">
      <a href={CustomerSheet} download> Download Sample Sheet</a>
         </form>
          </Grid>
      
        </Grid>
       <Grid items xs={12} lg={12}>
       <Grid  justify="flex-end" // Add it here :)
 container 
 spacing={24} >
   <Grid items >
       </Grid>


       <Grid items   >

       <ColorButton3
       size='large'
       variant="contained"
       color="primary"
       className={classes.profileMargin}
       onClick={()=>{handlePreviousPage(13)}}>
          Back
       </ColorButton3> &nbsp;&nbsp;&nbsp;
       <ColorButton3
       size='large'
       variant="contained"
       color="primary"
       className={classes.profileMargin}
       onClick={()=>{handleNextPage(21)}}>
          Skip
       </ColorButton3>
      
       </Grid>
       </Grid>


       </Grid>
     
      </Grid>
        

           </form>


       
        </DialogContent>
      </Dialog>


        </View>
    );
  }


  CreateSprint.propTypes = {
    openCustomerSelection: PropTypes.bool,
    handleCloseSprintPoupup: PropTypes.func
  };