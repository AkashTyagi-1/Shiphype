import React ,{ useState, useEffect } from 'react';
import { fade,withStyles,makeStyles, useTheme} from '@material-ui/core/styles';
import {Platform,View,ScrollView,Image,Text,Dimensions} from 'react-native';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import * as shiphypeservice from './ShipService/shiphype_service';
import Toast from './feedback/Toast';
import ProgressBar from './feedback/ProgressBar';
import popUpStyle from './style/popUpStyle';
import validate from 'validate.js';


const schema = {
    fullname: { 
      presence: { allowEmpty: false, message: 'is required' },
      length: {
        maximum: 32
      }
    },
    
   address1:{
    presence: { allowEmpty: false, message: 'is required' },
    
    length: {
      maximum: 64
    }
   },
  
   city:{
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 100,
      
    }
   },
   state:{
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 100,
      
    }
   },
   country:{
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 100,
      
    }
   },
   phone:{
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 10,
      minimum:10
    }
   },
   zipcode:{
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 8
    }
   },
   email:{
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
   },
   businessname:{
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 64
    }  
   },
   businesswebsite:{
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 64
    }  
   },
   businessdescription:{
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 64
    }  
   },
   positionincompany:{
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 64
    }  
   },
  };



  const schema1 = {
    name: {
      
      presence: { allowEmpty: false, message: 'is required' },
      length: {
        maximum: 32
      }
    },
    ccnumber: {
      presence: { allowEmpty: false, message: 'is required' },
      length: {
        maximum: 16
      }
    },
    zipcode: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
          maximum: 8
        }
      },
      expire: {
        presence: { allowEmpty: false, message: 'is required' },
       
      },
      expire1: {
        presence: { allowEmpty: false, message: 'is required' },
        
      },
      cvv: {
        presence: { allowEmpty: false, message: 'is required' },
        
      },
  };
  const currencyType = [
    
    {
      id: 1,
      label: 'USD',
    },
    {
      id: 2,
      label: 'EURO',
    },
  
   
  ];

  const accountType = [
    
    {
      id: 1,
      label: 'Checking',
    },
    {
      id: 2,
      label: 'Saving',
    },
  
   
  ];

  const achPriority = [
    
    {
      id: 1,
      label: 'Same Day',
    },
    {
      id: 2,
      label: 'Next Day',
    },
    {
      id: 3,
      label: '3 Day',
    },
  
   
  ];
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
  height: '90vh',
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
  profileMargin11: {
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
const ColorButton1 = withStyles(theme => ({
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
//Make custom button
const ColorButton = withStyles(theme => ({
    root: {
      color: '#fff',
      borderRadius : '3px',
      //  paddingTop: '9%',
      //  paddingBottom: '9%',
      height:'90%',
      width:'130px',
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

  const ColorButtonEdit = withStyles(theme => ({
    root: {
      color: '#fff',
      borderRadius : '3px',
      //  paddingTop: '9%',
      //  paddingBottom: '9%',
      height:'100%',
      width:'150px',
       fontSize:'11px',
       fontWeight: '550',
       color:'#fff',
       backgroundColor:'#D3D3D3',
    '&:hover': {
      backgroundColor: '#D3D3D3',
      
    },
    },
  }))(Button);

/**
 * Description:This function is used for Slide17
 * @param {*} props 
 */
export default function Slide17(props) {
  
   const classes = useStyles();
   const [countrycode,setCountrycode]=React.useState('CA');
   const [custome,setCustome]=React.useState(3);
   const userid=props.user_id;
   const isAdmin=props.isAdmin;
   const[dataproduct,setDataProduct]=React.useState([]);
   const[packingdata,setPackingdata]=React.useState([]);
   const [loading,setLoading]=React.useState(false);
   const [open, setOpen]=React.useState(false);
   const [msg,setMsg]=React.useState('');
   const [type,setType]=React.useState('');
   const [selectedStartDate, setSelectedStartDate] = React.useState(new Date());
   const [currencytypevalue,setCurremcyTypeValue]=React.useState(1);
   const [backAccountType,setBankAccountType]=React.useState(1);
   const [achpriorityValue,setACHPri]=React.useState(1);
   const [status,setStatus]=React.useState(false);
   const [orderCouierType,setOrderCourierType]=React.useState([]);
   const [userdetails,setUserdetails]=React.useState({});
   const [userstatus,setUserstatus]=React.useState(false);

  const [formState, setFormState] =useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });


  const [formState1, setFormState1] =useState({
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
  
  const handleChange1 = prop => event => {
    console.log("email",event.target.value);
    event.persist();
    //setValues({ ...formState.values, [prop]: event.target.value });
    setFormState1(formState1 => ({
     ...formState1,
     values: {
       ...formState1.values,[prop]:event.target.value,
       checkFrom:false
     },
     touched:{
       ...formState1.touched,
       [event.target.name]: true
     }
    }));
};   

const hasError1 = field =>
formState1.touched[field] && formState1.errors[field] ? true : false;
 

     
  React.useEffect(() => {
    
    const errors = validate(formState1.values, schema1);

    setFormState1(formState1 => ({
      ...formState1,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState1.values]
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

useEffect(() => {
    fetchUserDetails1(userid); 
  },[]);
  

const fetchUserDetails1 = (user)=>{

    //const user_id=5;
    setLoading(true);
    shiphypeservice.fetchUserDetail(user)
    .then(response => {
     console.log("status",response.status);
          if(response.status === true) {
            setLoading(false);
         //   setUserData(response.data);
        // bindData(response.data);
         setUserstatus(response.status);
         setUserdetails(response.data); 
           
                     }else{
                      setLoading(false);
                      console.log("message",response.message);
                     }   
        }).catch((error) =>{
              console.error(error);
        });
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
/*
 * Description:To do close poup after successfully create sprint and on click cancel button
 * @param {*} issprintCreate 
 */
const handleClose1 = (isSprintCreate) => {
  props.handleSprintCancel(isSprintCreate);
}

const addArrangeShip =()=>{
          }
         
        
          const addArrangeShipDefaultWarehouse =()=>{
           
            setCustome(2);
          }

          const handleOpenFormPage = (id)=>{
            setCustome(id);
          }
        

          const bindData = (data)=>{
            console.log("bind call",data);
            
              setFormState(formState => ({
                ...formState,
                values: {
                  ...formState.values,fullname: data.userNicename,
                  checkFrom:false
                },
                touched:{
                  ...formState.touched,
                  fullname : true
                }
               }));
            
               setFormState(formState => ({
                ...formState,
                values: {
                  ...formState.values,email: data.userEmail,
                  checkFrom : false
                },
                touched:{
                  ...formState.touched,
                  email : true
                }
               }));
              
            
               setFormState(formState => ({
                ...formState,
                values: {
                  ...formState.values,address1: data.useraddressline,
                  checkFrom:false
                },
                touched:{
                  ...formState.touched,
                  address1 : true
                }
               }));
            
              
            
               setFormState(formState => ({
                ...formState,
                values: {
                  ...formState.values,city: data.usercity,
                  checkFrom:false
                },
                touched:{
                  ...formState.touched,
                  city : true
                }
               }));
            
               setFormState(formState => ({
                ...formState,
                values: {
                  ...formState.values,state: data.userstateprovinceCode,
                  checkFrom:false
                },
                touched:{
                  ...formState.touched,
                  state : true
                }
               }));
              
               setFormState(formState => ({
                ...formState,
                values: {
                  ...formState.values,phone: data.userphonenumber,
                  checkFrom:false
                },
                touched:{
                  ...formState.touched,
                  phone : true
                }
               })); 
               setFormState(formState => ({
                ...formState,
                values: {
                  ...formState.values,zipcode: data.userpostalCode,
                  checkFrom:false
                },
                touched:{
                  ...formState.touched,
                  zipcode : true
                }
               })); 

               setFormState(formState => ({
                ...formState,
                values: {
                  ...formState.values,businessname: data.bussinessname,
                  checkFrom:false
                },
                touched:{
                  ...formState.touched,
                  businessname : true
                }
               })); 

               setFormState(formState => ({
                ...formState,
                values: {
                  ...formState.values,businesswebsite: data.bussinesswebsite,
                  checkFrom:false
                },
                touched:{
                  ...formState.touched,
                  businesswebsite : true
                }
               })); 


               setFormState(formState => ({
                ...formState,
                values: {
                  ...formState.values,businessdescription: data.bussinessdescription,
                  checkFrom:false
                },
                touched:{
                  ...formState.touched,
                  businessdescription : true
                }
               })); 


               setFormState(formState => ({
                ...formState,
                values: {
                  ...formState.values,positionincompany: data.positionincompany,
                  checkFrom:false
                },
                touched:{
                  ...formState.touched,
                  positionincompany : true
                }
               })); 
               setCountrycode(data.usercountrycode);
             
            }  
         


const BackFunction = () => {
  if(custome===3)
  {
   props.handleDashboard('015')
  }
  else{
    setCustome(3);
  }
}
/**
 * Description:To do call function on back button
 * @param {*} isSprintCreate 
 */
const handlePreviousPage = (isSprintCreate) => {
  props.handlePreviousPage(isSprintCreate);
} 
     
       
       const handleChangeCountryCode = event =>{
        setCountrycode(event.target.value);
       }  
         
         const handleCallbackfunction =()=>{
           if(custome===3)
           {
            props.handleDashboard('015')
           }
           else{
             setCustome(2);
           }
         
        }
        const handleChangeCurrency = event => {
          setCurremcyTypeValue(event.target.value);
         // setOptionEnabled(false);
        };

        const handleChangeBankAccountType = event => {
          setBankAccountType(event.target.value);
         // setOptionEnabled(false);
        };
        const handleChangeACHPri = event => {
          setACHPri(event.target.value);
         // setOptionEnabled(false);
        };
         
                    const hasError = field =>
                    formState.touched[field] && formState.errors[field] ? true : false;
          let screenWidth = Dimensions.get('window').width;

    return (  
      <View className={classes.content}>
    <View className={classes.appBarSpacer} />
    {(() => {
            if (custome === 3) {
              return (
<View>
            <Grid item  container lg={12}  >
            <Grid item  lg={8}  style={popUpStyle.breadCrumSidePadding} >
            <Link  onClick={()=>{props.handleDashboard('01')}}>
            <Text style={popUpStyle.breadCrundCss1}>DASHBOARD /</Text>
            </Link>
            <Text style={popUpStyle.breadCrundCss}> AFFILIATE PROGRAM /</Text>
            <Text style={popUpStyle.breadCrundCss2}> TRANSFER CREDIT {'\n'} </Text> 
          
              </Grid>
              <Grid item  lg={3} style={{marginTop:'10px'}} >
              <Grid container item  justify="flex-end">

<Grid>
<ColorButton1
size='large'
variant="contained"
color="primary"
// className={classes.profileMargin}
onClick={()=>{handleCallbackfunction()}}
>
Back
</ColorButton1>

</Grid>

</Grid>
              </Grid>
              
              </Grid>
              </View>  
                 );
                }
              })()}

{(() => {
            if (custome === 4) {
              return (
<View>
            <Grid item  container lg={12}  >
            <Grid item  lg={9}  style={popUpStyle.breadCrumSidePadding} >
            <Link  onClick={()=>{props.handleDashboard('01')}}>
            <Text style={popUpStyle.breadCrundCss1}>DASHBOARD /</Text>
            </Link>
            <Text style={popUpStyle.breadCrundCss}> AFFILIATE PROGRAM / TRANSFER CREDIT /</Text>
            <Text style={popUpStyle.breadCrundCss2}> PayPal{'\n'} </Text> 
          
              </Grid>
              <Grid item  lg={3} style={{marginTop:'10px'}} >
           
              </Grid>
              
              </Grid>
              </View>  
                 );
                }
              })()}

{(() => {
            if (custome === 5) {
              return (
<View>
            <Grid item  container lg={12}  >
            <Grid item  lg={9}  style={popUpStyle.breadCrumSidePadding} >
            <Link  onClick={()=>{props.handleDashboard('01')}}>
            <Text style={popUpStyle.breadCrundCss1}>DASHBOARD /</Text>
            </Link>
            <Text style={popUpStyle.breadCrundCss}> AFFILIATE PROGRAM / TRANSFER CREDIT /</Text>
            <Text style={popUpStyle.breadCrundCss2}> Email Money Transfer{'\n'} </Text> 
          
              </Grid>
              <Grid item  lg={3} style={{marginTop:'10px'}} >
           
              </Grid>
              
              </Grid>
              </View>  
                 );
                }
              })()}


{(() => {
            if (custome === 6) {
              return (
<View>
            <Grid item  container lg={12}  >
            <Grid item  lg={9}  style={popUpStyle.breadCrumSidePadding} >
            <Link  onClick={()=>{props.handleDashboard('01')}}>
            <Text style={popUpStyle.breadCrundCss1}>DASHBOARD /</Text>
            </Link>
            <Text style={popUpStyle.breadCrundCss}> AFFILIATE PROGRAM / TRANSFER CREDIT /</Text>
            <Text style={popUpStyle.breadCrundCss2}> Zelle {'\n'} </Text> 
          
              </Grid>
              <Grid item  lg={3} style={{marginTop:'10px'}} >
           
              </Grid>
              
              </Grid>
              </View>  
                 );
                }
              })()}


{(() => {
            if (custome === 7) {
              return (
<View>
            <Grid item  container lg={12}  >
            <Grid item  lg={9}  style={popUpStyle.breadCrumSidePadding} >
            <Link  onClick={()=>{props.handleDashboard('01')}}>
            <Text style={popUpStyle.breadCrundCss1}>DASHBOARD /</Text>
            </Link>
            <Text style={popUpStyle.breadCrundCss}> AFFILIATE PROGRAM / TRANSFER CREDIT /</Text>
            <Text style={popUpStyle.breadCrundCss2}> Check{'\n'} </Text> 
          
              </Grid>
              <Grid item  lg={3} style={{marginTop:'10px'}} >
           
              </Grid>
              
              </Grid>
              </View>  
                 );
                }
              })()}


{(() => {
            if (custome === 8) {
              return (
<View>
            <Grid item  container lg={12}  >
            <Grid item  lg={9}  style={popUpStyle.breadCrumSidePadding} >
            <Link  onClick={()=>{props.handleDashboard('01')}}>
            <Text style={popUpStyle.breadCrundCss1}>DASHBOARD /</Text>
            </Link>
            <Text style={popUpStyle.breadCrundCss}> AFFILIATE PROGRAM / TRANSFER CREDIT /</Text>
            <Text style={popUpStyle.breadCrundCss2}> ACH - Business{'\n'} </Text> 
          
              </Grid>
              <Grid item  lg={3} style={{marginTop:'10px'}} >
           
              </Grid>
              
              </Grid>
              </View>  
                 );
                }
              })()}


{(() => {
            if (custome === 9) {
              return (
<View>
            <Grid item  container lg={12}  >
            <Grid item  lg={9}  style={popUpStyle.breadCrumSidePadding} >
            <Link  onClick={()=>{props.handleDashboard('01')}}>
            <Text style={popUpStyle.breadCrundCss1}>DASHBOARD /</Text>
            </Link>
            <Text style={popUpStyle.breadCrundCss}> AFFILIATE PROGRAM / TRANSFER CREDIT /</Text>
            <Text style={popUpStyle.breadCrundCss2}> ACH - Personal {'\n'} </Text> 
          
              </Grid>
              <Grid item  lg={3} style={{marginTop:'10px'}} >
           
              </Grid>
              
              </Grid>
              </View>  
                 );
                }
              })()}


{(() => {
            if (custome === 10) {
              return (
<View>
            <Grid item  container lg={12}  >
            <Grid item  lg={9}  style={popUpStyle.breadCrumSidePadding} >
            <Link  onClick={()=>{props.handleDashboard('01')}}>
            <Text style={popUpStyle.breadCrundCss1}>DASHBOARD /</Text>
            </Link>
            <Text style={popUpStyle.breadCrundCss}> AFFILIATE PROGRAM / TRANSFER CREDIT /</Text>
            <Text style={popUpStyle.breadCrundCss2}> Wire Transfer{'\n'} </Text> 
          
              </Grid>
              <Grid item  lg={3} style={{marginTop:'10px'}} >
           
              </Grid>
              
              </Grid>
              </View>  
                 );
                }
              })()}
    <Grid justify="center">
            <ProgressBar 
             loading={loading}
            />
            </Grid>
        
         <View>
             
         <View style={popUpStyle.paddingSide}>
        
         {(() => {
            if (custome === 3) {
              return (
         <Grid container justify="space-between" spacing={2}>
            <Grid item xs={12} md={7} lg={7}>
            <Text style={{ fontSize: '15px',
            fontWeight: '700',
            // marginLeft:'10px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}}>
              
             Transfer Credit</Text>
              </Grid>
              <Grid item xs={12} md={1} lg={1}></Grid>
              <Grid item xs={12} md={4} lg={4}>
  
              <Grid container item  justify="flex-end">

              </Grid>
            
              </Grid>
              </Grid>
                );
              }
            })()}
              {(() => {
            if (custome === 3) {
              return (
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
    onClick={()=>{handleOpenFormPage(4)}}
  
    //onClick={()=>{navigation.navigate('Dashboard')}}
  >
  PayPal
     {/* {language.copyandsaveobject} */}
  
  </ColorButton2>
         
          </Grid>
      
        </Grid>

        <Grid  items xs={12} lg={12}>
        <Grid justify="center" // Add it here :)
      container>
       
        <ColorButton2
    size='large'
    variant="contained"
    color="primary"
    className={classes.profileMargin}
    onClick={()=>{handleOpenFormPage(5)}}
  
    //onClick={()=>{navigation.navigate('Dashboard')}}
  >
  Email Money Transfer
     {/* {language.copyandsaveobject} */}
  
  </ColorButton2>
         
          </Grid>
      
        </Grid>

        <Grid  items xs={12} lg={12}>
        <Grid justify="center" // Add it here :)
      container>
       
        <ColorButton2
    size='large'
    variant="contained"
    color="primary"
    className={classes.profileMargin}
    onClick={()=>{handleOpenFormPage(6)}}
  
    //onClick={()=>{navigation.navigate('Dashboard')}}
  >
 Zelle
     {/* {language.copyandsaveobject} */}
  
  </ColorButton2>
         
          </Grid>
      
        </Grid>

        <Grid  items xs={12} lg={12}>
        <Grid justify="center" // Add it here :)
      container>
       
        <ColorButton2
    size='large'
    variant="contained"
    color="primary"
    className={classes.profileMargin}
    onClick={()=>{handleOpenFormPage(7)}}
  
    //onClick={()=>{navigation.navigate('Dashboard')}}
  >
Check
     {/* {language.copyandsaveobject} */}
  
  </ColorButton2>
         
          </Grid>
      
        </Grid>

        <Grid  items xs={12} lg={12}>
        <Grid justify="center" // Add it here :)
      container>
       
        <ColorButton2
    size='large'
    variant="contained"
    color="primary"
    className={classes.profileMargin}
    onClick={()=>{handleOpenFormPage(8)}}
  
    //onClick={()=>{navigation.navigate('Dashboard')}}
  >
  ACH - Business
     {/* {language.copyandsaveobject} */}
  
  </ColorButton2>
         
          </Grid>
      
        </Grid>
       
       
        <Grid  items xs={12} lg={12}>
        <Grid justify="center" // Add it here :)
      container>
       
        <ColorButton2
    size='large'
    variant="contained"
    color="primary"
    className={classes.profileMargin}
    onClick={()=>{handleOpenFormPage(9)}}
  
    //onClick={()=>{navigation.navigate('Dashboard')}}
  >
ACH - Personal
     {/* {language.copyandsaveobject} */}
  
  </ColorButton2>
         
          </Grid>
      
        </Grid>

        <Grid  items xs={12} lg={12}>
        <Grid justify="center" // Add it here :)
      container>
       
        <ColorButton2
    size='large'
    variant="contained"
    color="primary"
    className={classes.profileMargin}
    onClick={()=>{handleOpenFormPage(10)}}
  
    //onClick={()=>{navigation.navigate('Dashboard')}}
  >
 Wire Transfer
     {/* {language.copyandsaveobject} */}
  
  </ColorButton2>
         
          </Grid>
      
        </Grid>


      </Grid>
        

           </form>
                );
              }
            })()}



          
                     {(() => {
              if (parseInt(custome) === 8){
                  return (
                    <View>

                    <form className={classes.form}>
         <Grid  justify="space-between" 
      container 
      spacing={2} style={{marginTop:'10px'}}>
         <Grid item xs={12} md={6} lg={6}   style={{marginLeft:'0px'}}>
        
  
 

       <Grid item xs={10} >
    
       <TextField
      id="BusinessName"
      name='BusinessName'
      variant="outlined"
      fullWidth
      error={hasError('BusinessName')}
      helperText={
         hasError('BusinessName') ? formState.errors.BusinessName[0] : null
      }
      placeholder="Business Name"
      size='small'
      type="text"
     
     
      onChange={handleChange('BusinessName')}
      className={classes.profileMargin1}
      value={formState.values.BusinessName || ''}
    />


  </Grid>
  <Grid item xs={10} >
    
  <TextField
      id="BusinessAddress"
      name='BusinessAddress'
      variant="outlined"
      fullWidth
      error={hasError('BusinessAddress')}
      helperText={
         hasError('BusinessAddress') ? formState.errors.BusinessAddress[0] : null
      }
      placeholder="Business Address"
      size='small'
      type="text"
     
     
      onChange={handleChange('BusinessAddress')}
      className={classes.profileMargin1}
      value={formState.values.BusinessAddress || ''}
    />

    
       </Grid>
       
      
       <Grid item xs={10} >
    
         <TextField
           id="city"
           name='city'
           variant="outlined"
           fullWidth
           error={hasError('city')}
           helperText={
             hasError('city') ? formState.errors.city[0] : null
           }
           placeholder="City"
           size='small'
           type="text"
           onChange={handleChange('city')}
           className={classes.profileMargin1}
          
           value={formState.values.city || ''}
         />
    
       </Grid>

       <Grid item xs={10}>
    
    <TextField
      id="state"
      name='state'
      variant="outlined"
      fullWidth
      error={hasError('state')}
      helperText={
        hasError('state') ? formState.errors.state[0] : null
      }
      placeholder="State/Province"
      size='small'
      type="text"
      onChange={handleChange('state')}
      className={classes.profileMargin1}
     
      value={formState.values.state || ''}
    />

  </Grid>

  <Grid item xs={10} >
    
    <TextField
      id="zipcode"
      name='zipcode'
      variant="outlined"
      fullWidth
      error={hasError('zipcode')}
      helperText={
        hasError('zipcode') ? formState.errors.zipcode[0] : null
      }
      placeholder="Zip/Postal Code"
      size='small'
      type="text"
      onChange={handleChange('zipcode')}
      className={classes.profileMargin1}
     
      value={formState.values.zipcode || ''}
    />

  </Grid>

  <Grid item xs={10} >
    
  <TextField
      id="Bank"
      name='Bank'
      variant="outlined"
      fullWidth
      error={hasError('Bank')}
      helperText={
         hasError('Bank') ? formState.errors.Bank[0] : null
      }
      placeholder="Bank"
      size='small'
      type="text"
      onChange={handleChange('Bank')}
      className={classes.profileMargin1}
      value={formState.values.Bank || ''}
    />


  </Grid>
  <Grid item xs={10} >
    
    <TextField
   id="BankRoutingNumber"
   name='BankRoutingNumber'
   variant="outlined"
   fullWidth
   error={hasError('BankRoutingNumber')}
   helperText={
      hasError('BankRoutingNumber') ? formState.errors.BankRoutingNumber[0] : null
   }
   placeholder="Bank Routing Number"
   size='small'
   type="text"
  
  
   onChange={handleChange('BankRoutingNumber')}
   className={classes.profileMargin1}
   value={formState.values.BankRoutingNumber || ''}
 />
 
    </Grid>

   <Grid item xs={10} >
 
   <TextField
   id="BankAccountNumber"
   name='BankAccountNumber'
   variant="outlined"
   fullWidth
   error={hasError('BankAccountNumber')}
   helperText={
      hasError('BankAccountNumber') ? formState.errors.BankAccountNumber[0] : null
   }
   placeholder="Bank Account Number"
   size='small'
   type="text"
   onChange={handleChange('BankAccountNumber')}
   className={classes.profileMargin1}
   value={formState.values.BankAccountNumber || ''}
 />
    </Grid>

    <Grid item xs={10} >
   <TextField
          id="outlined-select-currency-native"
          select
          fullWidth
         // label="Bank Account Type"
          value={backAccountType}
          onChange={handleChangeBankAccountType}
          SelectProps={{
            native: true,
          }}
          size='small'
          type="text"
          className={classes.profileMargin11}
          style={{fontSize: '12px',
          //fontWeight: '700',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}
          variant="outlined"
        >
            <option value='0' disabled  style={{fontSize: '14px',
            //fontWeight: '700',
            paddingLeft:'15px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>Select Bank Account Type</option>
     
         {accountType.map(option => (
         
         <option  style={{fontSize: '14px',
         //fontWeight: '700',
         paddingLeft:'15px',
         cursor:'pointer',
         fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}
          key={option.id} value={option.id}  
            >
          {option.label}
          </option>
       ))}
        </TextField>
     </Grid>

     <Grid item xs={10} >
   <TextField
          id="outlined-select-currency-native"
          select
          fullWidth
         // label="ACH Priority"
          value={achpriorityValue}
          onChange={handleChangeACHPri}
          SelectProps={{
            native: true,
          }}
          size='small'
          type="text"
          className={classes.profileMargin11}
          style={{fontSize: '12px',
          //fontWeight: '700',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}
          variant="outlined"
        >
            <option value='0' disabled  style={{fontSize: '14px',
            //fontWeight: '700',
            paddingLeft:'15px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>Select ACH Priority</option>
     
         {achPriority.map(option => (
         
         <option  style={{fontSize: '14px',
         //fontWeight: '700',
         paddingLeft:'15px',
         cursor:'pointer',
         fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}
          key={option.id} value={option.id}  
            >
          {option.label}
          </option>
       ))}
        </TextField>
     </Grid>
     {/* <Grid item xs={10} >
   <TextField
          id="outlined-select-currency-native"
          select
          fullWidth
       //   label="Currency"
          value={currencytypevalue}
          onChange={handleChangeCurrency}
          SelectProps={{
            native: true,
          }}
          size='small'
          type="text"
          className={classes.profileMargin11}
          style={{fontSize: '12px',
          //fontWeight: '700',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}
          variant="outlined"
        >
            <option value='0' disabled  style={{fontSize: '14px',
            //fontWeight: '700',
            paddingLeft:'15px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>Select Currency</option>
     
         {currencyType.map(option => (
         
         <option  style={{fontSize: '14px',
         //fontWeight: '700',
         paddingLeft:'15px',
         cursor:'pointer',
         fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}
          key={option.id} value={option.id}  
            >
          {option.label}
          </option>
       ))}
        </TextField>
     </Grid> */}
  
     <Grid item xs={10} >
     <TextField
      id="amount8"
      name='amount8'
      variant="outlined"
      fullWidth
      error={hasError('amount8')}
      helperText={
         hasError('amount8') ? formState.errors.amount8[0] : null
      }
      placeholder="Amount"
      size='small'
      type="text"
      onChange={handleChange('amount8')}
      className={classes.profileMargin1}
      value={formState.values.amount8 || ''}
    />
     </Grid>

       <Grid container item xs={10} justify="flex-end" style={{marginTop:'5px'}}>
         <Grid>
         <ColorButton
       size='large'
       variant="contained"
       color='primary'
       className={classes.profileMargin1}
       //disabled={!formState.isValid}
       onClick={()=>{BackFunction()}}>
  Back
     </ColorButton>&nbsp;&nbsp;&nbsp;
       <ColorButton
       size='large'
       variant="contained"
       color='primary'
       className={classes.profileMargin1}
       //disabled={!formState.isValid}
       onClick={()=>{addArrangeShip()}}>
   Submit
     </ColorButton>
         </Grid>
       </Grid>
       </Grid>
       
       <Grid item xs={12} md={6} lg={6}   style={{marginLeft:'0px'}}>
      
      
       </Grid></Grid></form>

                    </View>
                    )}
                    

                    
                     })()}

                     
          
{(() => {
              if (parseInt(custome) === 9){
                  return (
                    <View>

                    <form className={classes.form}>
         <Grid  justify="space-between" 
      container 
      spacing={2} style={{marginTop:'10px'}}>
         <Grid item xs={12} md={6} lg={6}   style={{marginLeft:'0px'}}>
        
  
 

       <Grid item xs={10} >
    
       <TextField
      id="firstName"
      name='firstName'
      variant="outlined"
      fullWidth
      error={hasError('firstName')}
      helperText={
         hasError('firstName') ? formState.errors.firstName[0] : null
      }
      placeholder="First Name"
      size='small'
      type="text"
     
     
      onChange={handleChange('firstName')}
      className={classes.profileMargin1}
      value={formState.values.firstName || ''}
    />


  </Grid>

  <Grid item xs={10} >
    
    <TextField
   id="lastName"
   name='lastName'
   variant="outlined"
   fullWidth
   error={hasError('lastName')}
   helperText={
      hasError('lastName') ? formState.errors.lastName[0] : null
   }
   placeholder="Last Name"
   size='small'
   type="text"
  
  
   onChange={handleChange('lastName')}
   className={classes.profileMargin1}
   value={formState.values.lastName || ''}
 />


</Grid>
  <Grid item xs={10} >
    
  <TextField
      id="Address"
      name='Address'
      variant="outlined"
      fullWidth
      error={hasError('Address')}
      helperText={
         hasError('Address') ? formState.errors.Address[0] : null
      }
      placeholder="Address"
      size='small'
      type="text"
     
     
      onChange={handleChange('Address')}
      className={classes.profileMargin1}
      value={formState.values.Address || ''}
    />

    
       </Grid>
       
      
       <Grid item xs={10} >
    
         <TextField
           id="city1"
           name='city1'
           variant="outlined"
           fullWidth
           error={hasError('city1')}
           helperText={
             hasError('city1') ? formState.errors.city1[0] : null
           }
           placeholder="City"
           size='small'
           type="text"
           onChange={handleChange('city1')}
           className={classes.profileMargin1}
          
           value={formState.values.city1 || ''}
         />
    
       </Grid>

       <Grid item xs={10}>
    
    <TextField
      id="state1"
      name='state1'
      variant="outlined"
      fullWidth
      error={hasError('state1')}
      helperText={
        hasError('state1') ? formState.errors.state1[0] : null
      }
      placeholder="State/Province"
      size='small'
      type="text"
      onChange={handleChange('state1')}
      className={classes.profileMargin1}
     
      value={formState.values.state1 || ''}
    />

  </Grid>

  <Grid item xs={10} >
    
    <TextField
      id="zipcode1"
      name='zipcode1'
      variant="outlined"
      fullWidth
      error={hasError('zipcode1')}
      helperText={
        hasError('zipcode1') ? formState.errors.zipcode1[0] : null
      }
      placeholder="Zip/Postal Code"
      size='small'
      type="text"
      onChange={handleChange('zipcode1')}
      className={classes.profileMargin1}
     
      value={formState.values.zipcode1 || ''}
    />

  </Grid>

  <Grid item xs={10} >
    
  <TextField
      id="Bank1"
      name='Bank1'
      variant="outlined"
      fullWidth
      error={hasError('Bank1')}
      helperText={
         hasError('Bank1') ? formState.errors.Bank1[0] : null
      }
      placeholder="Bank"
      size='small'
      type="text"
      onChange={handleChange('Bank1')}
      className={classes.profileMargin1}
      value={formState.values.Bank1 || ''}
    />


  </Grid>
  <Grid item xs={10} >
    
    <TextField
   id="BankRoutingNumber1"
   name='BankRoutingNumber1'
   variant="outlined"
   fullWidth
   error={hasError('BankRoutingNumber1')}
   helperText={
      hasError('BankRoutingNumber1') ? formState.errors.BankRoutingNumber1[0] : null
   }
   placeholder="Bank Routing Number"
   size='small'
   type="text"
  
  
   onChange={handleChange('BankRoutingNumber1')}
   className={classes.profileMargin1}
   value={formState.values.BankRoutingNumber1 || ''}
 />
 
    </Grid>

   <Grid item xs={10} >
 
   <TextField
   id="BankAccountNumber1"
   name='BankAccountNumber1'
   variant="outlined"
   fullWidth
   error={hasError('BankAccountNumber1')}
   helperText={
      hasError('BankAccountNumber1') ? formState.errors.BankAccountNumber1[0] : null
   }
   placeholder="Bank Account Number"
   size='small'
   type="text"
   onChange={handleChange('BankAccountNumber1')}
   className={classes.profileMargin1}
   value={formState.values.BankAccountNumber1 || ''}
 />
    </Grid>

    <Grid item xs={10} >
   <TextField
          id="outlined-select-currency-native"
          select
          fullWidth
          //label="Bank Account Type"
          value={backAccountType}
          onChange={handleChangeBankAccountType}
          SelectProps={{
            native: true,
          }}
          size='small'
          type="text"
          className={classes.profileMargin11}
          style={{fontSize: '12px',
          //fontWeight: '700',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}
          variant="outlined"
        >
            <option value='0' disabled  style={{fontSize: '14px',
            //fontWeight: '700',
            paddingLeft:'15px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>Select Bank Account Type</option>
     
         {accountType.map(option => (
         
         <option  style={{fontSize: '14px',
         //fontWeight: '700',
         paddingLeft:'15px',
         cursor:'pointer',
         fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}
          key={option.id} value={option.id}  
            >
          {option.label}
          </option>
       ))}
        </TextField>
     </Grid>

     <Grid item xs={10} >
   <TextField
          id="outlined-select-currency-native"
          select
          fullWidth
         // label="ACH Priority"
          value={achpriorityValue}
          onChange={handleChangeACHPri}
          SelectProps={{
            native: true,
          }}
          size='small'
          type="text"
          className={classes.profileMargin11}
          style={{fontSize: '12px',
          //fontWeight: '700',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}
          variant="outlined"
        >
            <option value='0' disabled  style={{fontSize: '14px',
            //fontWeight: '700',
            paddingLeft:'15px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>Select ACH Priority</option>
     
         {achPriority.map(option => (
         
         <option  style={{fontSize: '14px',
         //fontWeight: '700',
         paddingLeft:'15px',
         cursor:'pointer',
         fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}
          key={option.id} value={option.id}  
            >
          {option.label}
          </option>
       ))}
        </TextField>
     </Grid>
     {/* <Grid item xs={10} >
   <TextField
          id="outlined-select-currency-native"
          select
          fullWidth
       //   label="Currency"
          value={currencytypevalue}
          onChange={handleChangeCurrency}
          SelectProps={{
            native: true,
          }}
          size='small'
          type="text"
          className={classes.profileMargin11}
          style={{fontSize: '12px',
          //fontWeight: '700',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}
          variant="outlined"
        >
            <option value='0' disabled  style={{fontSize: '14px',
            //fontWeight: '700',
            paddingLeft:'15px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>Select Currency</option>
     
         {currencyType.map(option => (
         
         <option  style={{fontSize: '14px',
         //fontWeight: '700',
         paddingLeft:'15px',
         cursor:'pointer',
         fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}
          key={option.id} value={option.id}  
            >
          {option.label}
          </option>
       ))}
        </TextField>
     </Grid> */}
  
     <Grid item xs={10} >
     <TextField
      id="amount9"
      name='amount9'
      variant="outlined"
      fullWidth
      error={hasError('amount9')}
      helperText={
         hasError('amount9') ? formState.errors.amount9[0] : null
      }
      placeholder="Amount"
      size='small'
      type="text"
      onChange={handleChange('amount9')}
      className={classes.profileMargin1}
      value={formState.values.amount9 || ''}
    />
     </Grid>

       <Grid container item xs={10} justify="flex-end" style={{marginTop:'5px'}}>
         <Grid>
         <ColorButton
       size='large'
       variant="contained"
       color='primary'
       className={classes.profileMargin1}
       //disabled={!formState.isValid}
       onClick={()=>{BackFunction()}}>
  Back
     </ColorButton>&nbsp;&nbsp;&nbsp;
       <ColorButton
       size='large'
       variant="contained"
       color='primary'
       className={classes.profileMargin1}
       //disabled={!formState.isValid}
       onClick={()=>{addArrangeShip()}}>
   Submit
     </ColorButton>
         </Grid>
       </Grid>
       </Grid>
       
       <Grid item xs={12} md={6} lg={6}   style={{marginLeft:'0px'}}>
      
      
       </Grid></Grid></form>

                    </View>
                    )}
                    

                    
                     })()}

{(() => {
            if (custome === 10) {
              return (
                <View>

<form className={classes.form} >
               {showToast(open,msg,type)}
          <Grid  justify="space-between" // Add it here :)
       container 
       spacing={2}  >
          <Grid item xs={12} md={6} lg={6}   style={{marginLeft:'0px'}}>
          
          <Grid item xs={10} >
       
           <TextField
      id="bankname"
      name='bankname'
      variant="outlined"
      fullWidth
      error={hasError('bankname')}
      helperText={
         hasError('bankname') ? formState.errors.bankname[0] : null
      }
      placeholder="Bank Name"
      size='small'
      type="text"
      onChange={handleChange('bankname')}
      className={classes.profileMargin1}
      value={formState.values.bankname || ''}
    />
     
        </Grid>

        <Grid item xs={10} >
       
       <TextField
  id="routingnumber"
  name='routingnumber'
  variant="outlined"
  fullWidth
  error={hasError('routingnumber')}
  helperText={
     hasError('routingnumber') ? formState.errors.routingnumber[0] : null
  }
  placeholder="Routing Number"
  size='small'
  type="text"
  onChange={handleChange('routingnumber')}
  className={classes.profileMargin1}
  value={formState.values.routingnumber || ''}
/>
 
    </Grid>
    <Grid item xs={10} >
       
       <TextField
  id="swiftcode"
  name='swiftcode'
  variant="outlined"
  fullWidth
  error={hasError('swiftcode')}
  helperText={
     hasError('swiftcode') ? formState.errors.swiftcode[0] : null
  }
  placeholder="Swift Code"
  size='small'
  type="text"
  onChange={handleChange('swiftcode')}
  className={classes.profileMargin1}
  value={formState.values.swiftcode || ''}
/>
 
    </Grid>
    <Grid item xs={10} >
       
       <TextField
  id="fullbankaddress"
  name='fullbankaddress'
  variant="outlined"
  fullWidth
  error={hasError('fullbankaddress')}
  helperText={
     hasError('fullbankaddress') ? formState.errors.fullbankaddress[0] : null
  }
  placeholder="Full Bank Address"
  size='small'
  type="text"
  onChange={handleChange('fullbankaddress')}
  className={classes.profileMargin1}
  value={formState.values.fullbankaddress || ''}
/>
 
    </Grid>
    <Grid item xs={10} >
       
       <TextField
  id="businessaccountname"
  name='businessaccountname'
  variant="outlined"
  fullWidth
  error={hasError('businessaccountname')}
  helperText={
     hasError('businessaccountname') ? formState.errors.businessaccountname[0] : null
  }
  placeholder="Business Account Name"
  size='small'
  type="text"
  onChange={handleChange('businessaccountname')}
  className={classes.profileMargin1}
  value={formState.values.businessaccountname || ''}
/>
 
    </Grid>
    <Grid item xs={10} >
       
       <TextField
  id="accountnumber"
  name='accountnumber'
  variant="outlined"
  fullWidth
  error={hasError('accountnumber')}
  helperText={
     hasError('accountnumber') ? formState.errors.accountnumber[0] : null
  }
  placeholder="Account Number"
  size='small'
  type="text"
  onChange={handleChange('accountnumber')}
  className={classes.profileMargin1}
  value={formState.values.accountnumber || ''}
/>
 
    </Grid>
    <Grid item xs={10} >
       
       <TextField
  id="fullbusinessaddress"
  name='fullbusinessaddress'
  variant="outlined"
  fullWidth
  error={hasError('fullbusinessaddress')}
  helperText={
     hasError('fullbusinessaddress') ? formState.errors.fullbusinessaddress[0] : null
  }
  placeholder="Full Business Address"
  size='small'
  type="text"
  onChange={handleChange('fullbusinessaddress')}
  className={classes.profileMargin1}
  value={formState.values.fullbusinessaddress || ''}
/>
 
    </Grid>
        

   {/* <Grid item xs={10} >
   <TextField
          id="outlined-select-currency-native"
          select
          fullWidth
        //  label="Currency"
          value={currencytypevalue}
          onChange={handleChangeCurrency}
          SelectProps={{
            native: true,
          }}
          size='small'
          type="text"
          className={classes.profileMargin11}
          style={{fontSize: '12px',
          //fontWeight: '700',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}
          variant="outlined"
        >
            <option value='0' disabled  style={{fontSize: '14px',
            //fontWeight: '700',
            paddingLeft:'15px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>Select Currency</option>
     
         {currencyType.map(option => (
         
         <option  style={{fontSize: '14px',
         //fontWeight: '700',
         paddingLeft:'15px',
         cursor:'pointer',
         fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}
          key={option.id} value={option.id}  
            >
          {option.label}
          </option>
       ))}
        </TextField>
     </Grid> */}
  
     <Grid item xs={10} >
     <TextField
      id="amount10"
      name='amount10'
      variant="outlined"
      fullWidth
      error={hasError('amount10')}
      helperText={
         hasError('amount10') ? formState.errors.amount10[0] : null
      }
      placeholder="Amount"
      size='small'
      type="text"
      onChange={handleChange('amount10')}
      className={classes.profileMargin1}
      value={formState.values.amount10 || ''}
    />
     </Grid>



    
    
           <Grid container item xs={10} justify="flex-end" style={{marginTop:'15px'}}>
             
 
             <Grid style={{marginLeft:'10px'}}>
             
             <ColorButton
       size='large'
       variant="contained"
       color='primary'
       className={classes.profileMargin1}
       //disabled={!formState.isValid}
       onClick={()=>{BackFunction()}}>
  Back
     </ColorButton>&nbsp;&nbsp;&nbsp;
       <ColorButton
       size='large'
       variant="contained"
       color='primary'
       className={classes.profileMargin1}
       //disabled={!formState.isValid}
       onClick={()=>{addArrangeShip()}}>
   Submit
     </ColorButton>
             </Grid>
             </Grid>
 
 
            
           </Grid>



        


       </Grid> 
 
        </form>
 

                </View>
                );
              }
            })()}

{(() => {
            if (custome === 4) {
              return (
                <View>

<form className={classes.form} >
               {showToast(open,msg,type)}
          <Grid  justify="space-between" // Add it here :)
       container 
       spacing={2}  >
          <Grid item xs={12} md={6} lg={6}   style={{marginLeft:'0px'}}>
          
          <Grid item xs={10} >
       
           <TextField
      id="paypalemail"
      name='paypalemail'
      variant="outlined"
      fullWidth
      error={hasError('paypalemail')}
      helperText={
         hasError('paypalemail') ? formState.errors.paypalemail[0] : null
      }
      placeholder="PayPal Email"
      size='small'
      type="text"
      onChange={handleChange('paypalemail')}
      className={classes.profileMargin1}
      value={formState.values.paypalemail || ''}
    />
     
        </Grid>
        

   {/* <Grid item xs={10} >
   <TextField
          id="outlined-select-currency-native"
          select
          fullWidth
        //  label="Currency"
          value={currencytypevalue}
          onChange={handleChangeCurrency}
          SelectProps={{
            native: true,
          }}
          size='small'
          type="text"
          className={classes.profileMargin11}
          style={{fontSize: '12px',
          //fontWeight: '700',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}
          variant="outlined"
        >
            <option value='0' disabled  style={{fontSize: '14px',
            //fontWeight: '700',
            paddingLeft:'15px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>Select Currency</option>
     
         {currencyType.map(option => (
         
         <option  style={{fontSize: '14px',
         //fontWeight: '700',
         paddingLeft:'15px',
         cursor:'pointer',
         fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}
          key={option.id} value={option.id}  
            >
          {option.label}
          </option>
       ))}
        </TextField>
     </Grid> */}
  
     <Grid item xs={10} >
     <TextField
      id="amount"
      name='amount'
      variant="outlined"
      fullWidth
      error={hasError('amount')}
      helperText={
         hasError('amount') ? formState.errors.amount[0] : null
      }
      placeholder="Amount"
      size='small'
      type="text"
      onChange={handleChange('amount')}
      className={classes.profileMargin1}
      value={formState.values.amount || ''}
    />
     </Grid>



    
    
           <Grid container item xs={10} justify="flex-end" style={{marginTop:'15px'}}>
             
 
             <Grid style={{marginLeft:'10px'}}>
             
             <ColorButton
       size='large'
       variant="contained"
       color='primary'
       className={classes.profileMargin1}
       //disabled={!formState.isValid}
       onClick={()=>{BackFunction()}}>
  Back
     </ColorButton>&nbsp;&nbsp;&nbsp;
       <ColorButton
       size='large'
       variant="contained"
       color='primary'
       className={classes.profileMargin1}
       //disabled={!formState.isValid}
       onClick={()=>{addArrangeShip()}}>
   Submit
     </ColorButton>
             </Grid>
             </Grid>
 
 
            
           </Grid>



        


       </Grid> 
 
        </form>
 

                </View>
                );
              }
            })()}


{(() => {
            if (custome === 5) {
              return (
                <View>

<form className={classes.form} >
               {showToast(open,msg,type)}
          <Grid  justify="space-between" // Add it here :)
       container 
       spacing={2}  >
          <Grid item xs={12} md={6} lg={6}   style={{marginLeft:'0px'}}>
          
          <Grid item xs={10} >
       
           <TextField
      id="moneytransferemail"
      name='moneytransferemail'
      variant="outlined"
      fullWidth
      error={hasError('moneytransferemail')}
      helperText={
         hasError('moneytransferemail') ? formState.errors.moneytransferemail[0] : null
      }
      placeholder="Email"
      size='small'
      type="text"
      onChange={handleChange('moneytransferemail')}
      className={classes.profileMargin1}
      value={formState.values.moneytransferemail || ''}
    />
     
        </Grid>
        

   {/* <Grid item xs={10} >
   <TextField
          id="outlined-select-currency-native"
          select
          fullWidth
        //  label="Currency"
          value={currencytypevalue}
          onChange={handleChangeCurrency}
          SelectProps={{
            native: true,
          }}
          size='small'
          type="text"
          className={classes.profileMargin11}
          style={{fontSize: '12px',
          //fontWeight: '700',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}
          variant="outlined"
        >
            <option value='0' disabled  style={{fontSize: '14px',
            //fontWeight: '700',
            paddingLeft:'15px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>Select Currency</option>
     
         {currencyType.map(option => (
         
         <option  style={{fontSize: '14px',
         //fontWeight: '700',
         paddingLeft:'15px',
         cursor:'pointer',
         fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}
          key={option.id} value={option.id}  
            >
          {option.label}
          </option>
       ))}
        </TextField>
     </Grid> */}
  
     <Grid item xs={10} >
     <TextField
      id="amount5"
      name='amount5'
      variant="outlined"
      fullWidth
      error={hasError('amount5')}
      helperText={
         hasError('amount5') ? formState.errors.amount5[0] : null
      }
      placeholder="Amount"
      size='small'
      type="text"
      onChange={handleChange('amount5')}
      className={classes.profileMargin1}
      value={formState.values.amount5 || ''}
    />
     </Grid>



    
    
           <Grid container item xs={10} justify="flex-end" style={{marginTop:'15px'}}>
             
 
             <Grid style={{marginLeft:'10px'}}>
             
             <ColorButton
       size='large'
       variant="contained"
       color='primary'
       className={classes.profileMargin1}
       //disabled={!formState.isValid}
       onClick={()=>{BackFunction()}}>
  Back
     </ColorButton>&nbsp;&nbsp;&nbsp;
       <ColorButton
       size='large'
       variant="contained"
       color='primary'
       className={classes.profileMargin1}
       //disabled={!formState.isValid}
       onClick={()=>{addArrangeShip()}}>
   Submit
     </ColorButton>
             </Grid>
             </Grid>
 
 
            
           </Grid>



        


       </Grid> 
 
        </form>
 

                </View>
                );
              }
            })()}
        
        {(() => {
            if (custome === 6) {
              return (
                <View>

<form className={classes.form} >
               {showToast(open,msg,type)}
          <Grid  justify="space-between" // Add it here :)
       container 
       spacing={2}  >
          <Grid item xs={12} md={6} lg={6}   style={{marginLeft:'0px'}}>
          
          <Grid item xs={10} >
       
           <TextField
      id="beneficiaryname"
      name='beneficiaryname'
      variant="outlined"
      fullWidth
      error={hasError('beneficiaryname')}
      helperText={
         hasError('beneficiaryname') ? formState.errors.beneficiaryname[0] : null
      }
      placeholder="Beneficiary Name"
      size='small'
      type="text"
      onChange={handleChange('beneficiaryname')}
      className={classes.profileMargin1}
      value={formState.values.beneficiaryname || ''}
    />
     
        </Grid>

        <Grid item xs={10} >
       
       <TextField
  id="phoneemail"
  name='phoneemail'
  variant="outlined"
  fullWidth
  error={hasError('phoneemail')}
  helperText={
     hasError('phoneemail') ? formState.errors.phoneemail[0] : null
  }
  placeholder="Phone # or Email"
  size='small'
  type="text"
  onChange={handleChange('phoneemail')}
  className={classes.profileMargin1}
  value={formState.values.phoneemail || ''}
/>
 
    </Grid>
        

   {/* <Grid item xs={10} >
   <TextField
          id="outlined-select-currency-native"
          select
          fullWidth
      //    label="Currency"
          value={currencytypevalue}
          onChange={handleChangeCurrency}
          SelectProps={{
            native: true,
          }}
          size='small'
          type="text"
          className={classes.profileMargin11}
          style={{fontSize: '12px',
          //fontWeight: '700',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}
          variant="outlined"
        >
            <option value='0' disabled  style={{fontSize: '14px',
            //fontWeight: '700',
            paddingLeft:'15px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>Select Currency</option>
     
         {currencyType.map(option => (
         
         <option  style={{fontSize: '14px',
         //fontWeight: '700',
         paddingLeft:'15px',
         cursor:'pointer',
         fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}
          key={option.id} value={option.id}  
            >
          {option.label}
          </option>
       ))}
        </TextField>
     </Grid>
   */}
     <Grid item xs={10} >
     <TextField
      id="amount6"
      name='amount6'
      variant="outlined"
      fullWidth
      error={hasError('amount6')}
      helperText={
         hasError('amount6') ? formState.errors.amount6[0] : null
      }
      placeholder="Amount"
      size='small'
      type="text"
      onChange={handleChange('amount6')}
      className={classes.profileMargin1}
      value={formState.values.amount6 || ''}
    />
     </Grid>



    
    
           <Grid container item xs={10} justify="flex-end" style={{marginTop:'15px'}}>
             
 
             <Grid style={{marginLeft:'10px'}}>
             
             <ColorButton
       size='large'
       variant="contained"
       color='primary'
       className={classes.profileMargin1}
       //disabled={!formState.isValid}
       onClick={()=>{BackFunction()}}>
  Back
     </ColorButton>&nbsp;&nbsp;&nbsp;
       <ColorButton
       size='large'
       variant="contained"
       color='primary'
       className={classes.profileMargin1}
       //disabled={!formState.isValid}
       onClick={()=>{addArrangeShip()}}>
   Submit
     </ColorButton>
             </Grid>
             </Grid>
 
 
            
           </Grid>



        


       </Grid> 
 
        </form>
 

                </View>
                );
              }
            })()}


{(() => {
            if (custome === 7) {
              return (
                <View>

<form className={classes.form} >
               {showToast(open,msg,type)}
          <Grid  justify="space-between" // Add it here :)
       container 
       spacing={2}  >
          <Grid item xs={12} md={6} lg={6}   style={{marginLeft:'0px'}}>
          
          <Grid item xs={10} >
       
           <TextField
      id="beneficiaryname1"
      name='beneficiaryname1'
      variant="outlined"
      fullWidth
      error={hasError('beneficiaryname1')}
      helperText={
         hasError('beneficiaryname1') ? formState.errors.beneficiaryname1[0] : null
      }
      placeholder="Beneficiary Name"
      size='small'
      type="text"
      onChange={handleChange('beneficiaryname1')}
      className={classes.profileMargin1}
      value={formState.values.beneficiaryname1 || ''}
    />
     
        </Grid>
        <Grid item xs={10} >
       
       <TextField
  id="beneficiaryaddress"
  name='beneficiaryaddress'
  variant="outlined"
  fullWidth
  error={hasError('beneficiaryaddress')}
  helperText={
     hasError('beneficiaryaddress') ? formState.errors.beneficiaryaddress[0] : null
  }
  placeholder="Beneficiary Address"
  size='small'
  type="text"
  onChange={handleChange('beneficiaryaddress')}
  className={classes.profileMargin1}
  value={formState.values.beneficiaryaddress || ''}
/>
 
    </Grid>

        <Grid item xs={10} >
       
       <TextField
  id="phone"
  name='phone'
  variant="outlined"
  fullWidth
  error={hasError('phone')}
  helperText={
     hasError('phone') ? formState.errors.phone[0] : null
  }
  placeholder="Phone #"
  size='small'
  type="text"
  onChange={handleChange('phone')}
  className={classes.profileMargin1}
  value={formState.values.phone || ''}
/>
 
    </Grid>
        

   {/* <Grid item xs={10} >
   <TextField
          id="outlined-select-currency-native"
          select
          fullWidth
      //   label="Currency"
          value={currencytypevalue}
          onChange={handleChangeCurrency}
          SelectProps={{
            native: true,
          }}
          size='small'
          type="text"
          className={classes.profileMargin11}
          style={{fontSize: '12px',
          //fontWeight: '700',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}
          variant="outlined"
        >
            <option value='0' disabled  style={{fontSize: '14px',
            //fontWeight: '700',
            paddingLeft:'15px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>Select Currency</option>
     
         {currencyType.map(option => (
         
         <option  style={{fontSize: '14px',
         //fontWeight: '700',
         paddingLeft:'15px',
         cursor:'pointer',
         fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}
          key={option.id} value={option.id}  
            >
          {option.label}
          </option>
       ))}
        </TextField>
     </Grid> */}
  
     <Grid item xs={10} >
     <TextField
      id="amount7"
      name='amount7'
      variant="outlined"
      fullWidth
      error={hasError('amount7')}
      helperText={
         hasError('amount7') ? formState.errors.amount7[0] : null
      }
      placeholder="Amount"
      size='small'
      type="text"
      onChange={handleChange('amount7')}
      className={classes.profileMargin1}
      value={formState.values.amount7 || ''}
    />
     </Grid>



    
    
           <Grid container item xs={10} justify="flex-end" style={{marginTop:'15px'}}>
             
 
             <Grid style={{marginLeft:'10px'}}>
             
             <ColorButton
       size='large'
       variant="contained"
       color='primary'
       className={classes.profileMargin1}
       //disabled={!formState.isValid}
       onClick={()=>{BackFunction()}}>
  Back
     </ColorButton>&nbsp;&nbsp;&nbsp;
       <ColorButton
       size='large'
       variant="contained"
       color='primary'
       className={classes.profileMargin1}
       //disabled={!formState.isValid}
       onClick={()=>{addArrangeShip()}}>
   Submit
     </ColorButton>
             </Grid>
             </Grid>
 
 
            
           </Grid>



        


       </Grid> 
 
        </form>
 

                </View>
                );
              }
            })()}
  {showToast(open,msg,type)}
        </View>
       
         
           </View>
        </View>
    );
  }

