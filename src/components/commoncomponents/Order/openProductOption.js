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
import Switch from '@material-ui/core/Switch';
import popStyle from '.././style/popUpStyle';
import axios from 'axios';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

export const BASE_URL='https://api.shiphype.com/api/';




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
  border: '2px solid #ced4da',
  height: 100,
  width: '95%',
 textAlign:'center',
},
paper2: {
 // border: '2px solid #ced4da',
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
/**
 * Description:Custome switch
 */
const AntSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    '&$checked': {
      transform: 'translateX(12px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);
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
 
/**
 * Description:This function is used for CreateSprint for sprint
 * @param {*} props 
 */
export default function CreateSprint(props) {
  
   const classes = useStyles();
    //const {openCreateSprint}= props;
    const {openProductCard}= props;
    const [loading,setLoading]=React.useState(true);
    const [state1, setState1]=useState({
      vertical: 'top',
      horizontal: 'center',
    });
    const userid=props.user_id;
  
   

 
  const handleNextPage = (isSprintCreate) => {
    props.handleAddProductManually();
  }
/**
 * Description:To do close poup after successfully create sprint and on click cancel button
 * @param {*} issprintCreate 
 */
const handleClose1 = () => {
  props.handleDeleteCancle();
}

    return (  
      <View>
      <Dialog 
       fullWidth={true}
       maxWidth="md"
        onClose={()=>{handleClose1(false)}} 
        aria-labelledby="customized-dialog-title" 
        open={openProductCard}>
        <Grid item xs={12} >
      
       
                 <DialogTitle id="customized-dialog-title" onClose={()=>{handleClose1(false)}} style={{width:'96%',margin:'auto',padding:'0px'}}>
       
       </DialogTitle>     
             
       </Grid>
      
         <DialogContent>
       
      
               <View >

<Grid item  container lg={12}  >
<Grid item xs={12} md={12} lg={12}  >
       
       
       <Grid  justify="center"  // Add it here :)
container >
  <Grid>
  <Text style={popStyle.stepperCss1}> Add PRODUCTS{'\n'} </Text> 
  </Grid>
</Grid>
</Grid>

</Grid>

</View>
         <form className={classes.form}>
         <Grid container   justify="center" >

        
       
        <Grid  items xs={12} lg={12}>
        <Grid justify="center" // Add it here :)
      container>
       
        <ColorButton2
    size='large'
    variant="contained"
    color="primary"
    className={classes.profileMargin}
    onClick={()=>{handleNextPage('Add')}}
  
    //onClick={()=>{navigation.navigate('Dashboard')}}
  >
    Add Products Manually
     {/* {language.copyandsaveobject} */}
  
  </ColorButton2>
         
          </Grid>
      
        </Grid>
        <Grid  items xs={12} lg={12}>
        <Grid justify="center" // Add it here :)
      container>
      <form id="createForm" name="createForm" novalidate enctype="multipart/form-data">
        <ColorButton4
   size='large'
   variant="contained"
   component="label"
   color="primary"
   className={classes.profileMargin}
   startIcon={<CloudUploadIcon />}
  >
    Upload Product Sheet
    <input
    type="file"
    onChange={handleClose1(false)}
    style={{ display: "none" }}
  />
     {/* {language.copyandsaveobject} */}
  
  </ColorButton4>
         </form>
          </Grid>
      
        </Grid>
       <Grid items xs={12} lg={12}>
       <Grid  justify="flex-end" // Add it here :)
 container 
 spacing={24} >
   <Grid items >
         
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
    openProductCard: PropTypes.bool,
    handleCloseSprintPoupup: PropTypes.func
  };