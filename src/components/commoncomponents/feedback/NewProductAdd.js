import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { fade, withStyles, makeStyles } from "@material-ui/core/styles";
import { Platform, View, Image, Text, Dimensions } from "react-native";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import PropTypes from "prop-types";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import StepConnector from "@material-ui/core/StepConnector";
import Toast from "./Toast";
import ProgressBar from ".././feedback//ProgressBar";
import * as shiphypeservice from ".././ShipService/shiphype_service";
/**For Style */
import popUpStyle from ".././style/popUpStyle";

import validate from "validate.js";

const schema = {
    firstname: { 
      presence: { allowEmpty: false, message: 'is required' },
      length: {
        maximum: 32
      }
    },
    lastname: { 
        presence: { allowEmpty: false, message: 'is required' },
        length: {
          maximum: 32
        }
      },
      addressline1:{
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
   zip:{
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
   
  };

  const dangerousGood = [
    
    {
      id: true,
      label: 'Yes',
    },
    {
      id: false,
      label: 'No',
    },
    
  ];
  
  const shipInternational = [
      
    {
      id: 1,
      label: 'Yes',
    },
    {
      id: 2,
      label: 'No',
    },
    
  ];

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(0, 0, 0),
    borderRadius: 0,
  },
  textArea: {
    marginTop: theme.spacing(0),
    borderRadius: 0,
  },
  profileMargin: {
    marginTop: theme.spacing(2),
    borderRadius: 0,
  },
  paper: {
    border: "2px solid #ced4da",
    height: 100,
    width: 100,
  },
  root: {
    //flexGrow: 1,
    width: "100%",
  },
  profileMargin10: {
    marginTop: theme.spacing(2),
    border: "1px solid #cccccc",
    padding: "2%",
  },
  profileMargin1: {
    // border : '1px solid #cccccc',
    //  padding:'1%',
    marginLeft: "8px",
    marginTop: "2px",
  },
  button2: {
    //border : ' 1px solid #cccccc',
    //  borderRadius : '5px',
    paddingTop: "1%",
    paddingBottom: "1%",
    paddingLeft: "0%",
    paddingRight: "0%",
    textTransform: "none",
    color: "#0158d4",
  },
  buttonGreen: {
    paddingTop: "1%",
    paddingBottom: "1%",
    paddingLeft: "0%",
    paddingRight: "0%",
    textTransform: "none",
    color: "#00b300",
  },
  checkBoxColor: {
    color: "#0158d4",
  },
  // grid: {
  //   width: 100,
  //   height: 100,
  // },
}));

/****   For changing the textfield radius  : End *********/
const styles = (theme) => ({
  root: {
    "@media print": {
      margin: 0,
      padding: theme.spacing(1),
      borderRadius: 0,
    },
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: "-2px",
    color: theme.palette.grey[500],
  },
});
//Make custom button
const ColorButton = withStyles((theme) => ({
  root: {
    color: "#fff",
    borderRadius: "3px",
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    height: "70%",
    width: "180px",
    fontSize: "11px",
    fontWeight: "550",
    color: "#fff",
    backgroundColor: "#0168fa",
    "&:hover": {
      backgroundColor: "#002080",
    },
  },
}))(Button);
//Make custom button
const ColorButton1 = withStyles((theme) => ({
  root: {
    color: "#fff",
    borderRadius: "3px",
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    height: "70%",
    width: "30px",
    fontSize: "11px",
    fontWeight: "550",
    color: "#fff",
    backgroundColor: "#0168fa",
    "&:hover": {
      backgroundColor: "#002080",
    },
  },
}))(Button);



const DialogTitle = withStyles(styles)((props) => {
  const {
    children,
    classes,
    onClose,
    onChangeValue,
    warehouse,
    warehouses,
    ...other
  } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      {onClose ? (
        <Grid container item xs={10} justify="flex-end">
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={props.onClose}
          >
            <CloseIcon />
          </IconButton>
        </Grid>
      ) : null}
      <Grid item xs={7} justify="flex-start">
        <Typography
          justify="center"
          variant="body1"
          style={{
            fontSize: "13px",
            fontWeight: "700",
            marginTop: "20px",
            marginBottom: "20px",
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
          }}
        >
          Add New Product Manually
        </Typography>
      </Grid>
    </MuiDialogTitle>
  );
});

/**
 * Description:This function is used for Select warehouse
 * @param {*} props
 */
export default function ShippingProfile(props) {
  const classes = useStyles();

  const { openaddproduct } = props;
  const userid = props.userid;
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [type, setType] = React.useState("");
  const [status, setStatus] = React.useState(false);
  const [fetchstatus, setFetchstatus] = React.useState("");
  const [data, setData] = React.useState([]);

  const [customePack, setCustomePack] = React.useState(0);
  const [promotioanlIn,setPromotioanlIn]=React.useState(0);
  const [value,setValue]=React.useState(1);
 const[customPackaging,setDataProduct]=React.useState([]);
 const[promotionalInserts,setDataProduct2]=React.useState([]);
 const[countryName,setChangeCountry]=React.useState(0);
 const [packingPallet, setPackingPallet] = React.useState(1);
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
    fetchCustomePackagingList();
    fetchPromotionalInsertsList();
} ,[]);


const fetchPromotionalInsertsList = ()=>{

    //  const userid=5;
      setLoading(true);
      shiphypeservice.fetchCustomePaching(userid,2)
      .then(response => {
       console.log("status",response.status);
            if(response.status === true) {
              setLoading(false);
              setDataProduct2(response.data);
                 
                       }else{
                        setLoading(false);
                        console.log("message",response.message);
                       }   
          }).catch((error) =>{
                console.error(error);
          });
    }
const fetchCustomePackagingList = ()=>{

    //  const userid=5;
      setLoading(true);
      shiphypeservice.fetchCustomePaching(userid,1)
      .then(response => {
       console.log("status",response.status);
            if(response.status === true) {
              setLoading(false);
                 setDataProduct(response.data);
                 
                       }else{
                        setLoading(false);
                        console.log("message",response.message);
                       }   
          }).catch((error) =>{
                console.error(error);
          });
    }

const addArrangeShip =()=>{
   
  
     const productname=formState.values.productname;
  const productsku=formState.values.productsku;
    //  const torontostock=formState.values.torontostock;
    //  const losangelesstock=formState.values.losangelesstock;
     const itemvalue=formState.values.itemvalue;
     const hscode=formState.values.hscode;
     const country=countryName;
     const noofpackages=packingPallet;
     const custo=customePack;
     const promo=promotioanlIn;
     setLoading(true);
     shiphypeservice.addProductManually(productsku,productname,noofpackages,country,hscode,itemvalue,'USD',custo,userid,promo)
.then(response => {
 console.log("status",response.status);
      if(response.status === true) {
        setOpen(true);
        setType('success');
        setMsg(response.message);
        setStatus(response.status);
        setLoading(false);
          
                 }
                 else if(response.status === 400)
                 {
                  setOpen(true);
                  setType('error');
                  setMsg(response.title);
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
            }

  const showToast = (open, msg, type) => {
    return (
      <Toast open={open} handleClose={handleClose} type={type} msg={msg} />
    );
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose1 = () => {
    props.addNewProductCancel(false);
  };

  
  const handleChangeCountry = event => {
    setChangeCountry(event.target.value);
  };
  const handleChangePromotional = event => {
    setPromotioanlIn(event.target.value);
  };
  const handleChangeCustomePackaging = event => {
    setCustomePack(event.target.value);
  };
  const handleChangePackingPallete = event => {
    setPackingPallet(event.target.value);
  };
  const hasError = field =>
                    formState.touched[field] && formState.errors[field] ? true : false;
  
  return (
    <View>
      <Dialog
        maxWidth="xs"
        fullWidth={true}
        className={classes.dialog}
        onClose={() => {
          handleClose1(false);
        }}
        aria-labelledby="customized-dialog-title"
        open={openaddproduct}
      >
        <Grid item xs={12}>
          <DialogTitle
            id="customized-dialog-title"
            onClose={() => {
              handleClose1(false);
            }}
            style={{
              width: "96%",
              margin: "auto",
              paddingBottom: "0px",
              paddingTop: "0px",
            }}
          ></DialogTitle>
        </Grid>
        <Grid justify="center">
          <ProgressBar loading={loading} />
        </Grid>

        <DialogContent style={popUpStyle.sizeOfBody}>
          <Grid container justify="space-between">
            <Grid item xs={12} md={6} lg={6}></Grid>
            <Grid item xs={12} md={6} lg={6} container justify="flex-end">
              <Grid item xs={4} md={6} lg={6}></Grid>
            </Grid>
          </Grid>

          <form className={classes.form}>
                <Grid  justify="space-between"
             container 
             spacing={3} >
                <Grid item xs={12} md={12} lg={12}   >
       
               
                <Grid item xs={12}  style={{marginTop:'2px'}} >
           
                <TextField
                  id="productname"
                  name='productname'
                  variant="outlined"
                  fullWidth
                  error={hasError('productname')}
                  helperText={
                     hasError('productname') ? formState.errors.productname[0] : null
                  }
                  placeholder="Item Name"
                  size='small'
                  type="text"
                  onChange={handleChange('productname')}
                  className={classes.profileMargin1}
                  value={formState.values.productname || ''}
                />
           
              </Grid>
              <Grid item xs={12} >
           
                <TextField
                  id="productsku"
                  name='productsku'
                  variant="outlined"
                  fullWidth
                  error={hasError('productsku')}
                  helperText={
                     hasError('productsku') ? formState.errors.productsku[0] : null
                  }
                  placeholder="Item SKU"
                  size='small'
                  type="text"
                  onChange={handleChange('productsku')}
                  className={classes.profileMargin1}
                  value={formState.values.productsku || ''}
                />
           
              </Grid>
              
              <Grid item xs={12} >
              <TextField
                 id="outlined-select-currency-native"
                 select
                 fullWidth
                // label="Ships International"
                 value={packingPallet}
                 onChange={handleChangePackingPallete}
                 SelectProps={{
                   native: true,
                 }}
                 size='small'
                 type="text"
                 className={classes.profileMargin1}
                 style={{fontSize: '12px',
                 //fontWeight: '700',
                 fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}
                 variant="outlined"
               >
                   <option value='0' disabled  style={{fontSize: '14px',
                   //fontWeight: '700',
                   paddingLeft:'15px',
                   fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>Select Ships International</option>
            
                {shipInternational.map(option => (
                
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
       
       
       <Grid item xs={12}>
       
       <TextField
             id="itemvalue"
             name='itemvalue'
             variant="outlined"
             fullWidth
             error={hasError('itemvalue')}
             helperText={
                hasError('itemvalue') ? formState.errors.itemvalue[0] : null
             }
             placeholder="Item Value"
             size='small'
             type="number"
             onChange={handleChange('itemvalue')}
             className={classes.profileMargin1}
             value={formState.values.itemvalue || ''}
           /> 
       </Grid>
       
       <Grid item xs={12}>
       
       <TextField
             id="hscode"
             name='hscode'
             variant="outlined"
             fullWidth
             error={hasError('hscode')}
             helperText={
                hasError('hscode') ? formState.errors.hscode[0] : null
             }
             placeholder="HS Code"
             size='small'
             type="text"
             onChange={handleChange('hscode')}
             className={classes.profileMargin1}
             value={formState.values.hscode || ''}
           />
       </Grid>
       
       <Grid item xs={12}>
       <TextField
                 id="outlined-select-currency-native"
                 select
                 fullWidth
               //  label="Dangerous Goods"
                 value={countryName}
                 onChange={handleChangeCountry}
                 SelectProps={{
                   native: true,
                 }}
                 size='small'
                 type="text"
                 className={classes.profileMargin1}
                 style={{fontSize: '12px',
                 //fontWeight: '700',
                 fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}
                 variant="outlined"
               >
                   <option value='0' disabled  style={{fontSize: '14px',
                   //fontWeight: '700',
                   paddingLeft:'15px',
                   fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>Select Dangerous Goods</option>
            
                {dangerousGood.map(option => (
                
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
       
       
             
         
         <Grid item xs={12} >
           
         <TextField
                 id="outlined-select-currency-native"
                 select
                 fullWidth
               //  label="Custom Packaging"
                 value={customePack}
                 onChange={handleChangeCustomePackaging}
                 SelectProps={{
                   native: true,
                 }}
                 size='small'
                 type="text"
                 className={classes.profileMargin1}
                 style={{fontSize: '12px',
                 //fontWeight: '700',
                 fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}
                 variant="outlined"
               >
                   <option value='0' disabled  style={{fontSize: '14px',
                   //fontWeight: '700',
                   paddingLeft:'15px',
                   fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>Select Custom Packaging</option>
            
                {customPackaging.map(option => (
                
                <option  style={{fontSize: '14px',
                //fontWeight: '700',
                paddingLeft:'15px',
                cursor:'pointer',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}
                 key={option.packaggingId} value={option.packaggingId}  
                   >
                 {option.packaggingName}
                 </option>
              ))}
               </TextField>
         </Grid>
         <Grid item xs={12} >
              <TextField
                 id="outlined-select-currency-native"
                 select
                 fullWidth
                 label="Promotional Inserts"
                 value={promotioanlIn}
                 onChange={handleChangePromotional}
                 SelectProps={{
                   native: true,
                 }}
                 size='small'
                 type="text"
                 className={classes.profileMargin1}
                 style={{fontSize: '12px',
                 //fontWeight: '700',
                 fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}
                 variant="outlined"
               >
                   <option value='0' disabled  style={{fontSize: '14px',
                   //fontWeight: '700',
                   paddingLeft:'15px',
                   fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>Select Country</option>
            
                {promotionalInserts.map(option => (
                
                <option  style={{fontSize: '14px',
                //fontWeight: '700',
                paddingLeft:'15px',
                cursor:'pointer',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}
                 key={option.packaggingId} value={option.packaggingId}  
                   >
                 {option.packaggingName}
                 </option>
              ))}
               </TextField>
                </Grid>
            
              </Grid>
              </Grid></form>
        </DialogContent>
        <DialogActions style={{ margin: "auto" }}>
          <Grid justify="flex-end" container spacing={24}>
            <Grid item>
              <Grid container spacing={1} justify="center">
                <Grid item justify="center">
                  <ColorButton
                    size="large"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={() => {
                        addArrangeShip();
                    }}
                  >
                   Save
                  </ColorButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </View>
  );
}

ShippingProfile.propTypes = {
  openaddproduct: PropTypes.bool,
  addNewProductCancel: PropTypes.func,
};
