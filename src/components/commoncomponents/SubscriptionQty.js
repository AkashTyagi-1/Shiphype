import React ,{ useState, useEffect } from 'react';
import { fade,withStyles,makeStyles, useTheme} from '@material-ui/core/styles';
import {Platform,View,ScrollView,Image,Text,Dimensions} from 'react-native';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import Grid from '@material-ui/core/Grid';
import * as shiphypeservice from './ShipService/shiphype_service';
import Toast from './feedback/Toast';
import ProgressBar from './feedback//ProgressBar';
import Link from '@material-ui/core/Link';
import popUpStyle from './style/popUpStyle';
import DeleteCard from './SubScriptionBox/ConfirmationCheck';
/**For Style */
import validate from 'validate.js';

const schema = {
    SKU1: {
    
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32
    }
  },
  Quantity: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 64
    }
  },
  title: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 64
    }
  },
  // description: {
  //   presence: { allowEmpty: false, message: 'is required' },
  //   length: {
  //     maximum: 64
  //   }
  // },
 
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
  height: '120vh',
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
paper9: {
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
   borderRadius:'0px',
  overflow: 'auto',
   height:'80vh'
},
  profileMargin1: {
    marginTop: theme.spacing(1),
    borderRadius : '5px',
  //  marginBottom: theme.spacing(1),
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
      height:'90%',
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
      color: '#fff',
      borderRadius : '3px',
      //  paddingTop: '9%',
      //  paddingBottom: '9%',
      height:'80%',
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
   * Description:To do show step of task
   */
  function getSteps() {
    return ['Marketplace Integration', 'Shipping Profile', 'Product Import','Product Sync','Import Customers'];
  }

/**
 * Description:This function is used for Slide17
 * @param {*} props 
 */
export default function Slide17(props) {
  
   const classes = useStyles();
  
   const userid=props.user_id;
const customeId=props.customeId;
const promotionalID=props.promotionalID;
const productIds=props.productIds;
   const [loading,setLoading]=React.useState(false);
   const [open, setOpen]=React.useState(false);
   const [msg,setMsg]=React.useState('');
   const [type,setType]=React.useState('');
   const [openDelete, setOpenDelete] = React.useState(false);
   const [enableTrue, setEnableTrue] = React.useState(true);
   const [selectedStartDate, setSelectedStartDate] = React.useState(new Date());
   const [editArrangeShip,setEditArrangeShip]=React.useState(0);
   const [status,setStatus]=React.useState(false);
  const[orderCouierType,setOrderCourierType]=React.useState([]);
  const[subuserid,setsubuserid]=React.useState(0);
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
   
  const handleClickOpendelete = () => {
  
    setOpenDelete(true);
  //  setEnableTrue(false);
  
    console.log("rowid");
  
 
  };

  const handleDeleteCancle = () => {
    setOpenDelete(false);
  
   };
   const enableFunction = () => {
    setLoading(true);
    setEnableTrue(false);
    setOpenDelete(false);
    const skuvalue=formState.values.SKU1;
    const titel=formState.values.title;
    const des=formState.values.description;
    const qty=formState.values.Quantity;

    if(props.editOrder!==null)
    {
      shiphypeservice.UpdateSubscriptionData(props.editOrder.subscriptionboxId,customeId,promotionalID,productIds,skuvalue,titel,des,qty,subuserid)
      .then(response => {
       console.log("status",response.status);
       if(response.status === true) {
        setOpen(true);
        setType('success');
        setMsg(response.message);
        setStatus(response.status);
        setLoading(false);
        setEnableTrue(false);
        setOpenDelete(false);
        props.handleNextPage('08');
           
                 }else{
                  setOpen(true);
                  setType('success');
                  setMsg(response.message);
                  setStatus(response.status);
                  setLoading(false);
                  setEnableTrue(false);
                  setOpenDelete(false);
                  props.handleNextPage('08');
                  console.log("message",response.message);
                 }   
          }).catch((error) =>{
                console.error(error);
          });
    }
    else{
      shiphypeservice.AddSubscriptionData(customeId,promotionalID,productIds,skuvalue,titel,des,qty,userid)
      .then(response => {
       console.log("status",response.status);
       if(response.status === true) {
        setOpen(true);
        setType('success');
        setMsg(response.message);
        setStatus(response.status);
        setLoading(false);
        setEnableTrue(false);
        setOpenDelete(false);
        props.handleNextPage('08');
           
                 }else{
                  setOpen(true);
                  setType('success');
                  setMsg(response.message);
                  setStatus(response.status);
                  setLoading(false);
                  setEnableTrue(false);
                  setOpenDelete(false);
                  props.handleNextPage('08');
                  console.log("message",response.message);
                 }   
          }).catch((error) =>{
                console.error(error);
          });
    }
   
     // addStepStatus();
     
 
    
  }
  React.useEffect(() => {
    if(props.editOrder!==null)
    {
      setFormState(formState => ({
        ...formState,
        values: {
          ...formState.values,Quantity: props.editOrder.sku,
          checkFrom:false
        },
        touched:{
          ...formState.touched,
          Quantity : true
        }
       }));
    
       setFormState(formState => ({
        ...formState,
        values: {
          ...formState.values,SKU1: props.editOrder.quantity,
          checkFrom : false
        },
        touched:{
          ...formState.touched,
          SKU1 : true
        }
       }));

       setFormState(formState => ({
        ...formState,
        values: {
          ...formState.values,title: props.editOrder.title,
          checkFrom : false
        },
        touched:{
          ...formState.touched,
          title : true
        }
       }));

       setFormState(formState => ({
        ...formState,
        values: {
          ...formState.values,description: props.editOrder.description,
          checkFrom : false
        },
        touched:{
          ...formState.touched,
          description : true
        }
       }));

       setEditArrangeShip(1);
       setsubuserid( props.editOrder.userId);
    }
    var date = new Date();
    // to add 4 days to current date
    
    // date.setDate(date.getDate() + 3);
    // setSelectedStartDate(date);
 //   fetchShiphypeCompleteStep();    
 } ,[]);



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
 * Description:To do call function on next button
 * @param {*} isSprintCreate 
 */
const handleNextPage = (isSprintCreate,pageExits) => {
    props.handleNextPage(isSprintCreate,pageExits);
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
     
       
        
         const handleCallbackfunction =()=>{
            props.backButtonRouting('selectCustomSubcription');
        }

                    const hasError = field =>
                    formState.touched[field] && formState.errors[field] ? true : false;
          let screenWidth = Dimensions.get('window').width;

    return (  
      <View className={classes.content}>
    <View className={classes.appBarSpacer} />
   
<View>

            <Grid item  container lg={12}  >
            <Grid item  lg={5}  style={popUpStyle.breadCrumSidePadding} >
            <Link  onClick={()=>{props.handleDashboard('01')}}>
            <Text style={popUpStyle.breadCrundCss1}>DASHBOARD /</Text>
            </Link><Text style={popUpStyle.breadCrundCss}> SUBSCRIPTION BOX /</Text>
          <Text style={popUpStyle.breadCrundCss2}> FINALIZE CREATION {'\n'} </Text> 
          
              </Grid>
              <Grid item  lg={2} ></Grid>
           
              </Grid>
              </View>  
    <Grid justify="center">
            <ProgressBar 
             loading={loading}
            />
            </Grid>
            <Grid>
{(openDelete === false ? " " :
           <DeleteCard
           openDeleteCard={openDelete}
        enableTrue={enableTrue}
        userid={userid}
        enableFunction={enableFunction}
           handleDeleteCancle={handleDeleteCancle}
         />)}
</Grid>
         <View>
             
         <View style={popUpStyle.paddingSide}>
        
         <Grid container justify="space-between" spacing={2}>
            <Grid item xs={12} md={7} lg={7}>
            <Text style={{ fontSize: '15px',
            fontWeight: '700',
            // marginLeft:'10px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}}>
              
              Please assign a Name and SKU for your Subscription Box. Also, specify how many you would like us to prepare:</Text>
              </Grid>
              <Grid item xs={12} md={1} lg={1}></Grid>
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
       </ColorButton>
    
              </Grid>
            
              </Grid>
            
              </Grid>
              </Grid>
         <form className={classes.form}>
         <Grid  justify="space-between" // Add it here :)
      container 
      spacing={2} >
         <Grid item xs={12} md={6} lg={6}   style={{marginLeft:'0px'}}>
         <Grid item xs={8} >
    
    <TextField
      id="title"
      name='title'
      variant="outlined"
      fullWidth
      error={hasError('title')}
      helperText={
         hasError('title') ? formState.errors.title[0] : null
      }
      placeholder="Assign Name"
      size='small'
      type="text"
      onChange={handleChange('title')}
      className={classes.profileMargin1}
      value={formState.values.title || ''}
    />

  </Grid>
         <Grid item xs={8} >
    
         <TextField
           id="SKU1"
           name='SKU1'
           variant="outlined"
           fullWidth
           error={hasError('SKU1')}
           helperText={
              hasError('SKU1') ? formState.errors.SKU1[0] : null
           }
           placeholder="Assign SKU"
           size='small'
           type="text"
           onChange={handleChange('SKU1')}
           className={classes.profileMargin1}
           value={formState.values.SKU1 || ''}
         />
    
       </Grid>
       <Grid item xs={8} >
    
    <TextField
      id="Quantity"
      name='Quantity'
      variant="outlined"
      fullWidth
      error={hasError('Quantity')}
      helperText={
         hasError('Quantity') ? formState.errors.Quantity[0] : null
      }
      placeholder="Quantity to Prepare"
      size='small'
      type="text"
      onChange={handleChange('Quantity')}
      className={classes.profileMargin1}
      value={formState.values.Quantity || ''}
    />

  </Grid>
  
 

  <Grid item xs={8} >
    
    <TextField
      id="description"
      name='description'
      variant="outlined"
      fullWidth
      error={hasError('description')}
      helperText={
         hasError('description') ? formState.errors.description[0] : null
      }
      placeholder="Additional Instructions (Optional)"
      multiline
      rows={3}
      size='small'
      type="text"
      onChange={handleChange('description')}
      className={classes.profileMargin1}
      value={formState.values.description || ''}
    />

  </Grid>
          <Grid container item xs={8} justify="flex-end">
            <Grid>
          <ColorButton1
          size='large'
          variant="contained"
          color='primary'
          className={classes.profileMargin1}
          disabled={!formState.isValid}
          onClick={()=>{
            handleClickOpendelete('rowData.shippingId') 
            }}>
        {( editArrangeShip ===0 ? 'SUBMIT' : 'Update')}
        </ColorButton1>
            </Grid>
          </Grid>
       </Grid></Grid></form>

  {showToast(open,msg,type)}
        </View>
       
         
           </View>
        </View>
    );
  }
