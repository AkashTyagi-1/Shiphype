import React ,{ useState, useEffect } from 'react';
import { fade,withStyles,makeStyles} from '@material-ui/core/styles';
import {Platform,View,Image,Text,Dimensions} from 'react-native';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import * as shiphypeservice from './ShipService/shiphype_service';
import Toast from './feedback/Toast';
import ProgressBar from './feedback/ProgressBar';
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
  marginTop: theme.spacing(1),
  borderRadius : 0,
  marginBottom: theme.spacing(1),
},
profileMargin1: {
    marginTop: theme.spacing(1),
    borderRadius : '5px',
  //  marginBottom: theme.spacing(1),
  },
paper: {
  border: '2px solid #ced4da',
  height: 80,
  width: 100,
},
paper1: {
  border: '2px solid #ced4da',
  height: 120,
  width: 100,
  marginLeft: '15%',
  marginTop: '8%'
},
root: {
  flexGrow: 1,
},
avatarsmall: {
  width: theme.spacing(3.5),
  height: theme.spacing(3.5),
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

 
/**
 * Description:This function is used for CreateSprint for sprint
 * @param {*} props 
 */
export default function CreateSprint(props) {
  
   const classes = useStyles();
    //const {openCreateSprint}= props;
    //const {openReturn}= props;

    const [value, setValue] = React.useState('2');
    const [valueBack, setValueBack] = React.useState('4');
      const [open, setOpen]=React.useState(false);
      const [msg,setMsg]=React.useState('');
      const [UserDataStatus,setUserDataStatus]=React.useState(false);
      const [type,setType]=React.useState('');
      const [status,setStatus]=React.useState(false);
      const [loading,setLoading]=React.useState(false);
     
    
  const ColorButton2 = withStyles(theme => ({
  root: {
    color: '#fff',
    borderRadius : '3px',
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    height:'90%',
    width:'140px',
     fontSize:'14px',
     fontWeight: '620',
     marginTop:'5px',
     color:'#fff',
     backgroundColor:'#0168fa',
    '&:hover': {
      backgroundColor: '#002080',
      
    },
  },
}))(Button);     
          

         
       /**
   * Description:This function call on type character inside input text
   * @param {} prop 
   */
  const handleChange = prop => event => {
    console.log("token",event.target.value);
    event.persist(); 
};

const handleClickHelpSetting = () => {

   const name=formState.values.yourname;
   const email=formState.values.youremail;
   const subject=formState.values.subject;
   const message=formState.values.message;
   setLoading(true);
   shiphypeservice.sendHelp(name,email,subject,message)
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
      props.handleNextPage('01');
     }
   };
   
    
    
/**
 * Description:To do close poup after successfully create sprint and on click cancel button
 * @param {*} issprintCreate 
 */
const handleClose1 = (isSprintCreate) => {
  props.closeHelpscreen();
}
let screenWidth = Dimensions.get('window').width;


    return (  
      <View className={classes.content}>
      {/* <ScrollView> */}
     <View className={classes.appBarSpacer} />
         
     <View >
            <Grid item  container lg={12}  >
            <Grid item  lg={5}  style={{marginTop:'15px'}}>
            <Link  onClick={()=>{props.handleDashboard('01')}}>
            <Text style={popUpStyle.breadCrundCss1}>DASHBOARD /</Text>
            </Link>
          <Text style={popUpStyle.breadCrundCss2}> NOTIFICATION SETTING {'\n'} </Text> 
            
              </Grid>
              <Grid item  lg={3} ></Grid>
              </Grid>
             

                    <Grid justify="center">
            <ProgressBar 
             loading={loading}
            />
            </Grid>
                   <form className={classes.form}>
         <Grid  justify="space-between" 
      container 
      spacing={1} >
        
         
         <Grid item xs={12} lg={6}  >
        
       <Grid item xs={10} >
           <Grid  justify="space-between" // Add it here :)
 container 
 spacing={24} >
    <Grid item> 

    </Grid>
       <Grid item   >

       <ColorButton2
    size='large'
    variant="contained"
    color="primary"
   // onClick={askForPermissioToReceiveNotifications}
    //onClick={()=>{handleNextPage(3)}}
    >
    {<Text style={{ fontSize: '11px',
           // fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#FFFFFF',
          
            transition : 'all 0.25s',}}>Save</Text> } 
   
  </ColorButton2>
       </Grid>

       {showToast(open,msg,type)}
       </Grid></Grid>
       </Grid>

     
       </Grid>
       </form>
                    </View>
                    
              
       


        </View>
    );
  }
