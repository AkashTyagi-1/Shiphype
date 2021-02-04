import React from 'react';
import clsx from 'clsx';
import {Platform,View,Image,Text,Dimensions} from 'react-native';
import { makeStyles,withStyles , useTheme} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import popUpStyle from './style/popUpStyle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import * as shiphypeservice from './ShipService/shiphype_service';
import MaterialTable , { MTableToolbar }from 'material-table';
import PropTypes from "prop-types";
import Link from '@material-ui/core/Link';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import ProgressBar from './feedback/ProgressBar';
import { forwardRef } from 'react';
import Typography from "@material-ui/core/Typography";
import RefreshIcon from '@material-ui/icons/Refresh';
const ColorButtonRefresh = withStyles((theme) => ({
  root: {
    borderRadius: "3px",
    height: "100%",
    padding: "3px",
    width: "100px",
    fontSize: "11px",
    fontWeight: "550",
    color: "#fff",
    backgroundColor: "#33cc00",
    //  paddingLeft: '22%',
    //  paddingRight: '22%',
    "&:hover": {
      color: "#fff",
      backgroundColor: "#33cc00",
    },
  },
}))(Button);


const ColorButtonAdd = withStyles(theme => ({
  root: {
   borderRadius : 0,
   //  paddingTop: '9%',
   //  paddingBottom: '9%',
   //marginTop:'3%',
   height:'100%',
   padding:'3px',
   width:'130px',
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
}))(Button);
const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  RefreshIcon: forwardRef((props, ref) => <RefreshIcon {...props} ref={ref} color='action'/>),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  CloudUpload:forwardRef((props, ref) => <CloudUploadIcon {...props} ref={ref} />)
};


const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
  
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: 'none',
    },
    title: {
      flexGrow: 1,
    },
   
    appBarSpacer: theme.mixins.toolbar,
    content: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(2),
      flexGrow: 1,
      height: '60vh',
      overflow: 'auto',
      backgroundColor:'#fff',
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
   
    button5 :{
      border : ' 1px solid #fff',
      borderRadius : '5px',
     height:'110%',
     width:'50%',
      color: '#fff',
    backgroundColor: '#0158d4',
    borderColor: '#0153c7',
    
    marginBottom:'1%',
    '&:hover': {
      backgroundColor:'#1a1aff',
      color:'#ffffff',
      },
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper1: {
      padding: theme.spacing(2),
       borderRadius:'0px',
      overflow: 'auto',
     border:'1px solid #cccccc',
    },
    paper9: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
       borderRadius:'0px',
       overflow: 'auto',
      // height:'1020vh'
    },
    paper2: {
     
      height:'auto',
      width:'98%',
       borderRadius:'0px',
    //  overflow: 'auto',
      border: '1px solid #cccccc',
     color: '#fff',
     textAlign:'center'
   
    },
    button4 :{
      border : ' 1px solid #fff',
      borderRadius:'0px',
      color: '#fff',
      height:'auto',
      width:'100%',
      border:'1px solid #cccccc',
      textAlign:'center'
   
    
    },
    setupbutton9:{
      border : ' 1px solid #fff',
      borderRadius:'0px',
      color: '#fff',
      marginTop:'2%',
      height:'120vh',
      width:'100%',
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(3),
       paddingLeft: theme.spacing(2),
       paddingRight: theme.spacing(2),
      border:'1px solid #cccccc',
      textAlign:'center'
    },
    footCss9:{
     // border : ' 1px solid #fff',
      borderRadius:'8%',
      height:250,
      color: '#fff',
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(3),
      // paddingLeft: theme.spacing(4),
      // paddingRight: theme.spacing(4),
    // border:'1px solid #cccccc',
      textAlign:'center'
    },
    paper7: {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
      paddingLeft: theme.spacing(10),
      paddingRight: theme.spacing(10),
      borderRadius:'0px',
      overflow: 'auto',
      border : ' 1px solid #fff',
    
     color: '#fff',
     backgroundColor: '#0168fa',
     borderColor: '#0168fa',
     '&:hover': {
      backgroundColor: '#0168fa',
     borderColor: '#0168fa',
      },
    
    },
    button7 :{
      border : ' 1px solid #fff',
      borderRadius:'0px',
      border:'1px solid #cccccc',
      color: '#fff',
      textAlign:'center',
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      marginTop:'3px',
      // paddingLeft: theme.spacing(14),
      // paddingRight: theme.spacing(14),
    
    },
    Dashboardpaper: {
      border: '1px solid #ced4da',
      // boxShadow: '7px 2px 2px #cccccc',
      // shadowColor: '#000',
      //    shadowOffset: { width: 0, height: 1 },
      //    shadowOpacity: 0.8,
      //    shadowRadius: 2,  
      //    elevation: 5,
       height: 100,
       width: 270,
     
     
       marginLeft: '5%',
       marginTop: '8%'
     },
     title:{
      marginLeft: '1%',
     },
     Dashboardpaper2:{
      border: '1px solid #ced4da',
      // boxShadow: '7px 2px 2px #cccccc',
      // shadowColor: '#000',
      //    shadowOffset: { width: 0, height: 1 },
      //    shadowOpacity: 0.8,
      //    shadowRadius: 2,  
      //    elevation: 5,
       height: 500,
       width: 270,
      borderRadius:'2px',
      marginLeft:'6px',
      
       marginTop: '1%'
     },
     Dashboardpaper3:{
      border: '1px solid #ced4da',
      // boxShadow: '7px 2px 2px #cccccc',
      // shadowColor: '#000',
      //    shadowOffset: { width: 0, height: 1 },
      //    shadowOpacity: 0.8,
      //    shadowRadius: 2,  
      //    elevation: 5,
       height: 500,
       width: 270,
      borderRadius:'2px',
      marginLeft:'77px',
     
       marginTop: '1%'
     },
     dividerFullWidth1: {
     marginTop:'4%',
      
    },
    fontsizepaper: {
      fontSize: 10,
      text:'bold',
      marginLeft:'10px',
      marginTop:'10px',
    },
    numbersize:{
      fontSize: 18,
      text:'bold',
      marginLeft:'10px',
    },
    numbersizepercentage:{
      fontSize:10,
      color: '#F6072F',
      marginTop:'10px',
      marginLeft:'3px',
    },
    
    numbersizepercentage2:{
      fontSize:10,
      color: '#0FB559',
      marginTop:'10px',
      marginLeft:'3px',
    },
    fontsizepaper3:{
      fontSize: 12,
      text:'bold',
      marginLeft:'10px',
      marginTop:'10px',
    },
    typography:{
      marginTop:'10px',
      marginLeft:theme.spacing(2),
    },
    footCss:{
     // border : ' 1px solid #fff',
      borderRadius:'8%',
     // border:'1px solid #cccccc',
      color: '#fff',
      textAlign:'center',
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      marginTop:'3px',
    },
    paper: {
      padding: theme.spacing(1),
      paddingLeft:'0px',
       borderRadius:'0px',
      overflow: 'auto',
      backgroundColor:'#fff',
    },
    fixedHeight: {
      height: 240,
    },
    avatarsmall: {
      marginLeft:'50px',
      width: theme.spacing(5.5),
      height: theme.spacing(5.5),
    },
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
    fixedHeight1: {
      height: 480,
    },
    chartContainer: {
      height: 400,
      position: 'relative'
    },
    radioButtonCss:{
        color:'#000',fontSize:'8px',    height: '25px'
      },
      quantitycss:{
        width:'90%',
        fontSize:'6px',
        cursor:'pointer',
        underline: {
         "&&&:before": {
           borderBottom: "none"
         },
         "&&:after": {
           borderBottom: "none"
         }
       } 
       },
      buttoncss:{
        width:'5px' 
       }
  }));

  export default function SelectProduct(props) {
    const classes = useStyles();
    const userid=props.user_id;
  //  const orderID=props.editOrder.internalorderId;
    const shipmentId=props.shipmentId;
    const uuserdid=props.uuserdid;
  const [checkedA, setCheckedA] = React.useState(true);
  const[dataproduct,setDataProduct]=React.useState([]);
  const [changedWarehouseid, setchangedWarehouseid] = React.useState([]);
  const [editRoleData,setEditRoleData]=React.useState(null);
  const [quantitychange,setQuantitychange]=React.useState(1);
  const[shippedQuantity,setshippedQuantity]=React.useState([]);
  const packingdata=props.packageDataSet;
  //const [selectproduct,setSelectproduct]=React.useState(false);
  
  var ids=[];

  const StyledMTableToolbar = withStyles({
    root: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  })(MTableToolbar);
  const [loading,setLoading]=React.useState(true);


  const handleChangeRadio = (event) => {
    setValue(event.target.value);
   
  };
  

         
          
         //Make custom button
         const ColorButton = withStyles(theme => ({
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
        


const updataExistsProduct = (customproduct_id,productsku,productname,domesticshipping,internationalshipping,dangerousgoods,hscode,itemvalue,itemcurrency,itemquantity,packaging,userid)=>{
  setLoading(true);
  shiphypeservice.updateProduct(customproduct_id,productsku,productname,domesticshipping,internationalshipping,dangerousgoods,hscode,itemvalue,itemcurrency,itemquantity,packaging,userid)
  .then(response => {
   console.log("status",response.status);
        if(response.status === true) {
          setLoading(false);
            
          fetchProductList();
                   }else{
                    setLoading(false);
                    console.log("message",response.message);
                   }   
      }).catch((error) =>{
            console.error(error);
      });
}

/**
 * Description:To do update value on plus and minus button
 * @param {*} productIds 
 * @param {*} type 
 */
const updateQuantity=(productIds,type)=>{
  shiphypeservice.updateShipingQuantity(productIds,type)
  .then(response => {
   console.log("status",response.status);
        if(response.status === true) {
          setLoading(false);
            
          fetchProductList();
                   }else{
                    setLoading(false);
                    console.log("message",response.message);
                   }   
      }).catch((error) =>{
            console.error(error);
      });
}


const handleChangeQuantityAdd =(data)=>{

console.log("datavalue",data);
var updatequantity=data.itemquantity + 1;
var str=data.itemvaluecurrency;
                  var currency = str.slice(0, 1);
                  var currencyvalue=str.slice(1, 5);
                  console.log("currency",currency);
                  console.log("currencyvalue",currencyvalue);

                  
//updataExistsProduct(data.customproductId,data.productsku,data.productname,data.domesticshipping,data.internationalshipping,data.dangerousgoods,data.hscode,parseInt(currencyvalue),currency,updatequantity,data.packaging,userid);
//updateQuantity(data.customproductId,'Add');
}

const handleChangeQuantityRemove =(data)=>{
  var updatequantity=data.itemquantity - 1;
  var str=data.itemvaluecurrency;
                    var currency = str.slice(0, 1);
                    var currencyvalue=str.slice(1, 5);
                    console.log("currency",currency);
                    console.log("currencyvalue",currencyvalue);

                    if(data.shippedquantity === null){
                      if(quantitychange > 1){
                        setQuantitychange((prevActiveStep) => prevActiveStep - 1);
                      }
                     
                    }
  //updataExistsProduct(data.customproductId,data.productsku,data.productname,data.domesticshipping,data.internationalshipping,data.dangerousgoods,data.hscode,parseInt(currencyvalue),currency,updatequantity,data.packaging,userid);
 // updateQuantity(data.customproductId,'Substract');
  }
           
  const [selectproduct,setSelectproduct]=React.useState(true);

           
             
    const theme = useTheme()
    const [state, setState] = React.useState({
     columns: [

        { title: '',
        render: rowData => <FormGroup>
        
        <FormControlLabel style={popUpStyle.checkboxPosition}
          control={<Checkbox 
            id={rowData.customproductId}

            checked={
                (() => {
                  for(let i=0; i<ids.length;i++)
                 
                  {
                    if(editRoleData !== null){
                    if(editRoleData.moduleinfo!==0){
                    if (rowData.customproductId  === parseInt(ids[i])){
                      return (
                          true
                        )
                    }
                  }
                  else{
                    if (rowData.customproductId  === parseInt(ids[i])){
                      return (
                          true
                        )
                    }
                  }
                }
                else{
                  if (rowData.customproductId  === parseInt(ids[i])){
                    return (
                        true
                      )
                  }
                }
                  }
                 
                  })()}
            
            onChange={()=>{handleChangeCheckbox(rowData.customproductId)}}
            
            color="primary"
           />}
            className={classes.radioButtonCss}
            InputProps={{ inputProps: { style: {  borderRadius: 0 }, }, style: { borderRadius: 0 }, }}
           
            
        />
          
       </FormGroup>
      
      },
      { title: 'Item SKU',
      field: 'productsku',type: 'text',
        render: rowData =><FormControlLabel
      
        onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
        className={classes.quantitycss}
        control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
      transition : 'all 0.25s',}}>{rowData.productsku}</Text>
            
          </Typography>}
      />  
  },
    { title: 'Item Title', field: 'productname',type: 'text', render: rowData =><FormControlLabel
      
    onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
    className={classes.quantitycss}
    control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
  fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
  transition : 'all 0.25s',}}>{rowData.productname}</Text>
        
      </Typography>}
  />  
    
  },
  { title: 'Ships International', field: 'internationalshipping',type: 'boolean',render: rowData =><FormControlLabel
        
  onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
 className={classes.quantitycss}
 control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
 fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
 
 
  {(() => {
   if(rowData.internationalshipping===true)
   {
     return(
       <Text style={{ fontSize: '11px', 
       fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
       transition : 'all 0.25s',}}>Yes</Text>
       )
     }
     else{
       return(
         <Text style={{ fontSize: '11px', 
         fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
         transition : 'all 0.25s',}}>No</Text>
         )
     }
     })()}
 </Typography>}
 />,
 },
 { title: 'HS Code', field: 'hscode', type: 'text',render: rowData =><FormControlLabel
      
 onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
 className={classes.quantitycss}
 control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
transition : 'all 0.25s',}}>{rowData.hscode}</Text>
     
   </Typography>}
/>  
  
},
 { title: 'Item Value', field: 'itemvalue',type: 'text',render: rowData =><FormControlLabel
      
 onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
 className={classes.quantitycss}
 control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
transition : 'all 0.25s',}}>{rowData.itemvalue}</Text>
     
   </Typography>}
/>  },
 { title: 'Dangerous Goods', field: 'dangerousgoods', type: 'boolean',render: rowData =><FormControlLabel
        
 onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
className={classes.quantitycss}
control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

 {(() => {
  if(rowData.dangerousgoods===true)
  {
    return(
      <Text style={{ fontSize: '11px', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
      transition : 'all 0.25s',}}>Yes</Text>
      )
    }
    else{
      return(
        <Text style={{ fontSize: '11px', 
        fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
        transition : 'all 0.25s',}}>No</Text>
        )
    }
    })()}
</Typography>}
/>,
},
 {
   title: 'Packaging',
   field: 'packaging',
   //lookup: { 1: 'Corrugated Box', 2: 'Letter' },
   
   lookup: packingdata ,
  //  render: rowData =><FormControlLabel
     
  //  onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
  //  className={classes.quantitycss}
  //  control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
  //  fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
   
  //  <Text style={{ fontSize: '11px', 
  //  fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
  //  transition : 'all 0.25s',}}>{rowData.packaging}</Text>
     
  //  </Typography>}
  //  />
   },
 // {
 //   title: 'Promotional Inserts',
 //   field: 'promotionalpackaging',
 //   //lookup: { 1: 'Corrugated Box', 2: 'Letter' },
  
 //   lookup: packingdata ,
 //   render: rowData =><FormControlLabel
     
 //   onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
 //   className={classes.quantitycss}
 //   control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
 //   fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
   
 //   <Text style={{ fontSize: '11px', 
 //   fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
 //   transition : 'all 0.25s',}}>{rowData.promotionalpackaging}</Text>
     
 //   </Typography>}
 //   />
 // },
  { title: 'Current Quantity', field: 'itemquantity', type: 'numeric',render: rowData =><FormControlLabel
      
  onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
  className={classes.quantitycss}
  control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
transition : 'all 0.25s',}}>{(rowData.itemquantity === null ? '0' : rowData.itemquantity )}</Text>
      
    </Typography>}
/>

 
 },
     ],
    
   });


const onNextfunction=()=>{
    console.log("product",changedWarehouseid.length);
    for(let i=0;i<changedWarehouseid.length ;i++){
        console.log("productid",changedWarehouseid[i]);
        
    } 
  
    console.log("quantity",shippedQuantity.length);

    props.updateSelectProductArray(changedWarehouseid,shippedQuantity);
    props.handleNextPage('selectPromotinalSubcription');
   // props.handleNextPage(8);
}


   var flag =false;
   const handleChangeCheckbox = (data) => {
    console.log("selectidrun");
    console.log("selectid",data);
    console.log("arraylenght",ids.length);
    setCheckedA(false);
    if(ids.length === 0){
      ids.push(data);
    }else{
      for(let i=0;i<ids.length ;i++){
      if(data !== ids[i]){
        //ids.push(data);
        flag=true;
      }else{
        flag=false;
        break; 
      }
      
      }
      if(flag === true){
        ids.push(data); 
      }else{
        const index =  ids.indexOf(data);
        if (index > -1) {
          ids.splice(index, 1);
        }
      }
      
    }
    console.log("arraylenghtafter",ids.length);

    var ids3=[];
    for(let i=0;i<ids.length ;i++){
      console.log("arrayvalue",ids[i]);
      ids3.push(1);
    }

    const updatedaray=[...ids];

    setchangedWarehouseid(updatedaray);

    const updatedaray1=[...ids3];

    setshippedQuantity(updatedaray1);

    setState({
      columns: [

        { title: '',
        render: rowData => <FormGroup>
        
        <FormControlLabel style={popUpStyle.checkboxPosition}
          control={<Checkbox 
            id={rowData.customproductId}

            checked={
                (() => {
                  for(let i=0; i<ids.length;i++)
                 
                  {
                    if(editRoleData !== null){
                    if(editRoleData.moduleinfo!==0){
                    if (rowData.customproductId  === parseInt(ids[i])){
                      return (
                          true
                        )
                    }
                  }
                  else{
                    if (rowData.customproductId  === parseInt(ids[i])){
                      return (
                          true
                        )
                    }
                  }
                }
                else{
                  if (rowData.customproductId  === parseInt(ids[i])){
                    return (
                        true
                      )
                  }
                }
                  }
                 
                  })()}
            
            onChange={()=>{handleChangeCheckbox(rowData.customproductId)}}
            
            color="primary"
           />}
            className={classes.radioButtonCss}
            InputProps={{ inputProps: { style: {  borderRadius: 0 }, }, style: { borderRadius: 0 }, }}
           
            
        />
          
       </FormGroup>
      
      },
      { title: 'Item SKU',
      field: 'productsku',type: 'text',
        render: rowData =><FormControlLabel
      
        onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
        className={classes.quantitycss}
        control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
      transition : 'all 0.25s',}}>{rowData.productsku}</Text>
            
          </Typography>}
      />  
  },
    { title: 'Item Title', field: 'productname',type: 'text', render: rowData =><FormControlLabel
      
    onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
    className={classes.quantitycss}
    control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
  fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
  transition : 'all 0.25s',}}>{rowData.productname}</Text>
        
      </Typography>}
  />  
    
  },
  { title: 'Ships International', field: 'internationalshipping',type: 'boolean',render: rowData =><FormControlLabel
        
  onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
 className={classes.quantitycss}
 control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
 fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
 
 
  {(() => {
   if(rowData.internationalshipping===true)
   {
     return(
       <Text style={{ fontSize: '11px', 
       fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
       transition : 'all 0.25s',}}>Yes</Text>
       )
     }
     else{
       return(
         <Text style={{ fontSize: '11px', 
         fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
         transition : 'all 0.25s',}}>No</Text>
         )
     }
     })()}
 </Typography>}
 />,
 },
 { title: 'HS Code', field: 'hscode', type: 'text',render: rowData =><FormControlLabel
      
 onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
 className={classes.quantitycss}
 control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
transition : 'all 0.25s',}}>{rowData.hscode}</Text>
     
   </Typography>}
/>  
  
},
 { title: 'Item Value', field: 'itemvalue',type: 'text',render: rowData =><FormControlLabel
      
 onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
 className={classes.quantitycss}
 control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
transition : 'all 0.25s',}}>{rowData.itemvalue}</Text>
     
   </Typography>}
/>  },
 { title: 'Dangerous Goods', field: 'dangerousgoods', type: 'boolean',render: rowData =><FormControlLabel
        
 onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
className={classes.quantitycss}
control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

 {(() => {
  if(rowData.dangerousgoods===true)
  {
    return(
      <Text style={{ fontSize: '11px', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
      transition : 'all 0.25s',}}>Yes</Text>
      )
    }
    else{
      return(
        <Text style={{ fontSize: '11px', 
        fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
        transition : 'all 0.25s',}}>No</Text>
        )
    }
    })()}
</Typography>}
/>,
 },
 {
   title: 'Packaging',
   field: 'packaging',
   //lookup: { 1: 'Corrugated Box', 2: 'Letter' },
   
   lookup: packingdata ,
  //  render: rowData =><FormControlLabel
     
  //  onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
  //  className={classes.quantitycss}
  //  control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
  //  fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
   
  //  <Text style={{ fontSize: '11px', 
  //  fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
  //  transition : 'all 0.25s',}}>{rowData.packaging}</Text>
     
  //  </Typography>}
  //  />
   },
 // {
 //   title: 'Promotional Inserts',
 //   field: 'promotionalpackaging',
 //   //lookup: { 1: 'Corrugated Box', 2: 'Letter' },
  
 //   lookup: packingdata ,
 //   render: rowData =><FormControlLabel
     
 //   onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
 //   className={classes.quantitycss}
 //   control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
 //   fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
   
 //   <Text style={{ fontSize: '11px', 
 //   fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
 //   transition : 'all 0.25s',}}>{rowData.promotionalpackaging}</Text>
     
 //   </Typography>}
 //   />
 // },
  { title: 'Current Quantity', field: 'itemquantity', type: 'numeric',render: rowData =><FormControlLabel
      
  onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
  className={classes.quantitycss}
  control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
transition : 'all 0.25s',}}>{(rowData.itemquantity === null ? '0' : rowData.itemquantity )}</Text>
      
    </Typography>}
/>

 
 },
     ], 
    })
  };
  const productArray=[31,33];

   React.useEffect(() => {
    fetchProductList();   
   // handleSetCheckboxValue();
 } ,[]);


 const handleSetCheckboxValue = () => {
  var ids=[];
  console.log("productlength Set ",productArray.length);
  for(let i=0;i<productArray.length ;i++){
      console.log("productid set ",productArray[i]);
      ids.push(productArray[i]);
  }
  const updatedaray=[...ids];
  setchangedWarehouseid(updatedaray);
  
};


 const fetchProductList = ()=>{

    setLoading(true);
    shiphypeservice.fetchProductList(uuserdid)
    .then(response => {
     console.log("status",response.status);
          if(response.status === true) {
            setLoading(false);
               setDataProduct(response.data);
               fetchArrangeShip(shipmentId);
                     }else{
                      setLoading(false);
                      console.log("message",response.message);
                     }   
        }).catch((error) =>{
          setLoading(false);
              console.error(error);
        });
  }

  const fetchArrangeShip = ()=>{
 
      // setLoading(true);
      // shiphypeservice.fetchsingleOrderData(orderID)
      // .then(response => {
      //  console.log("status",response.status);
      //       if(response.status === true) {
      //            setLoading(false);
                 if(props.editOrder.productids !== 0){
                  setCheckedA(false);
if(props.editOrder.productids.length !== 0){
for(let i=0;i<props.editOrder.productids.length;i++){
  ids.push(props.editOrder.productids[i].productId);
}

   var ids3=[];
    for(let i=0;i<ids.length ;i++){
      console.log("arrayvalue",ids[i]);
      ids3.push(1);
    }

    const updatedaray=[...ids];

    setchangedWarehouseid(updatedaray);

    const updatedaray1=[...ids3];

    setshippedQuantity(updatedaray1);
    
setState({
  columns: [

    { title: '',
    render: rowData => <FormGroup>
    
    <FormControlLabel style={popUpStyle.checkboxPosition}
      control={<Checkbox 
        id={rowData.customproductId}

        checked={
            (() => {
              for(let i=0; i<ids.length;i++)
             
              {
                if(editRoleData !== null){
                if(editRoleData.moduleinfo!==0){
                if (rowData.customproductId  === parseInt(ids[i])){
                  return (
                      true
                    )
                }
              }
              else{
                if (rowData.customproductId  === parseInt(ids[i])){
                  return (
                      true
                    )
                }
              }
            }
            else{
              if (rowData.customproductId  === parseInt(ids[i])){
                return (
                    true
                  )
              }
            }
              }
             
              })()}
        
        onChange={()=>{handleChangeCheckbox(rowData.customproductId)}}
        
        color="primary"
       />}
        className={classes.radioButtonCss}
        InputProps={{ inputProps: { style: {  borderRadius: 0 }, }, style: { borderRadius: 0 }, }}
       
        
    />
      
   </FormGroup>
  
  },
  { title: 'Item SKU',
  field: 'productsku',type: 'text',
    render: rowData =><FormControlLabel
  
    onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
    className={classes.quantitycss}
    control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
  fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
  transition : 'all 0.25s',}}>{rowData.productsku}</Text>
        
      </Typography>}
  />  
},
{ title: 'Item Title', field: 'productname',type: 'text', render: rowData =><FormControlLabel
  
onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
className={classes.quantitycss}
control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
transition : 'all 0.25s',}}>{rowData.productname}</Text>
    
  </Typography>}
/>  

},
{ title: 'Ships International', field: 'internationalshipping',type: 'boolean',render: rowData =><FormControlLabel
        
onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
className={classes.quantitycss}
control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>


{(() => {
 if(rowData.internationalshipping===true)
 {
   return(
     <Text style={{ fontSize: '11px', 
     fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
     transition : 'all 0.25s',}}>Yes</Text>
     )
   }
   else{
     return(
       <Text style={{ fontSize: '11px', 
       fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
       transition : 'all 0.25s',}}>No</Text>
       )
   }
   })()}
</Typography>}
/>,
},
{ title: 'HS Code', field: 'hscode', type: 'text',render: rowData =><FormControlLabel
  
onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
className={classes.quantitycss}
control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
transition : 'all 0.25s',}}>{rowData.hscode}</Text>
 
</Typography>}
/>  

},
{ title: 'Item Value', field: 'itemvalue',type: 'text',render: rowData =><FormControlLabel
  
onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
className={classes.quantitycss}
control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
transition : 'all 0.25s',}}>{rowData.itemvalue}</Text>
 
</Typography>}
/>  },
{ title: 'Dangerous Goods', field: 'dangerousgoods', type: 'boolean',render: rowData =><FormControlLabel
        
onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
className={classes.quantitycss}
control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

{(() => {
 if(rowData.dangerousgoods===true)
 {
   return(
     <Text style={{ fontSize: '11px', 
     fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
     transition : 'all 0.25s',}}>Yes</Text>
     )
   }
   else{
     return(
       <Text style={{ fontSize: '11px', 
       fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
       transition : 'all 0.25s',}}>No</Text>
       )
   }
   })()}
</Typography>}
/>,
},
{
title: 'Packaging',
field: 'packaging',
//lookup: { 1: 'Corrugated Box', 2: 'Letter' },

lookup: packingdata ,
//  render: rowData =><FormControlLabel
 
//  onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
//  className={classes.quantitycss}
//  control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
//  fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

//  <Text style={{ fontSize: '11px', 
//  fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
//  transition : 'all 0.25s',}}>{rowData.packaging}</Text>
 
//  </Typography>}
//  />
},
// {
//   title: 'Promotional Inserts',
//   field: 'promotionalpackaging',
//   //lookup: { 1: 'Corrugated Box', 2: 'Letter' },

//   lookup: packingdata ,
//   render: rowData =><FormControlLabel
 
//   onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
//   className={classes.quantitycss}
//   control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
//   fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

//   <Text style={{ fontSize: '11px', 
//   fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
//   transition : 'all 0.25s',}}>{rowData.promotionalpackaging}</Text>
 
//   </Typography>}
//   />
// },
{ title: 'Current Quantity', field: 'itemquantity', type: 'numeric',render: rowData =><FormControlLabel
  
onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
className={classes.quantitycss}
control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
transition : 'all 0.25s',}}>{(rowData.itemquantity === null ? '0' : rowData.itemquantity )}</Text>
  
</Typography>}
/>


},
 ], 
})

}

                 }
                 
          //              }else{
          //               setLoading(false);
          //               console.log("message",response.message);
          //              }   
          // }).catch((error) =>{
          //       console.error(error);
          // });
    }

const handleCallbackfunction =()=>{
 // props.backButtonRouting('select_order_type');
 props.backButtonRouting('08');
//  props.backButtonRouting('09');
}

    return(
        <View className={classes.content}>
           <View className={classes.appBarSpacer} />
          <View className={classes.paper}>
            <Grid item  container lg={12}  >
            <Grid item  lg={5}  style={popUpStyle.breadCrumSidePadding}
            //style={{marginLeft:'10px'}}
            >
          <Link  onClick={()=>{props.handleDashboard('01')}}>
            <Text style={popUpStyle.breadCrundCss1}>DASHBOARD /</Text>
            </Link><Text style={popUpStyle.breadCrundCss}> SUBSCRIPTION BOX /</Text>
          <Text style={popUpStyle.breadCrundCss2}> SELECT PRODUCTS {'\n'} </Text> 
          
              </Grid>
              <Grid item  lg={1} ></Grid>
           
              </Grid>
               
              </View>  
             
              <View className={classes.paper9} >
             
            
              <View style={popUpStyle.paddingSideProduct}>

            <Grid justify="center">
            <ProgressBar 
             loading={loading}
            />
            </Grid>
          
              <Grid container justify="space-between" spacing={2}>
            {/* <Grid item xs={12} md={5} lg={5}>
            <Text style={{ fontSize: '13px',
            fontWeight: '700',
            // marginLeft:'10px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}}>
              
            Select Products you would like to add to this Subscription Box:</Text>
              </Grid> */}
              <Grid item xs={12} md={3} lg={3} ></Grid>
              <Grid item xs={12} md={4} lg={4} 
              //style={{marginRight:'70px'}} 
               >
  
              <Grid container item  justify="flex-end">

              <Grid>
              <ColorButton
       size='large'
       variant="contained"
       color="primary"
      
       onClick={()=>{handleCallbackfunction()}}
       >
          Back
       </ColorButton>&nbsp;&nbsp;
    
              </Grid>
            <Grid>
              <ColorButton
       size='large'
       variant="contained"
       color="primary"
       disabled={checkedA}
       //onClick={()=>{handleCallbackfunction()}}
       onClick={()=>{onNextfunction()}}
       >
          Next
       </ColorButton>
    
              </Grid>
              </Grid>
            
              </Grid>
              </Grid>
              </View>
              
             
              
              <MaterialTable
        title={
                      <Text
                        style={{
                          fontSize: "13px",
                          fontWeight: "700",
                          marginLeft:'5px',
                          fontFamily:
                            '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                          color: "#001737",

                          transition: "all 0.25s",
                        }}
                      >
                      Select Products you would like to add to this Subscription Box:
                      </Text>
                    }
        columns={state.columns}
        data={dataproduct}
        icons={tableIcons}
      
        components={{
          Container: props => <Paper {...props} elevation={0}/>,
          Toolbar: props => (
            <StyledMTableToolbar {...props} />
          ),
        }}
        localization={{
          toolbar: {
              searchPlaceholder: "Search Products"
          },
          header: {
            actions: "ACTION",
          },
      }}
      actions={[
        {
                  icon: () => (
                    <ColorButtonRefresh
                    size="large"
                      variant="contained"
                      color="primary"
                      startIcon={<RefreshIcon />}
                    >
                      Refresh
                    </ColorButtonRefresh>
                  ),
                  //tooltip: "Refresh",
                  isFreeAction: true,
                  onClick: (event) =>  fetchProductList(),
                },      
      //   {
      //     icon: () => <RefreshIcon style={{ backgroundColor:'#33cc00',color:'#fff',borderRadius : '3px',margin:'3px',}}/>,
      //   tooltip: 'Refresh',
      //   isFreeAction: true,
      //   onClick: (event) =>   fetchProductList()
      // }
      ]}
        options={{
        paging: true,
        showTitle: true,
        doubleHorizontalScroll: true,
        maxBodyHeight: '70vh',
        headerStyle: { position: 'sticky', top: 0 },
        pageSize:10,
        pageSizeOptions:[10, 20, 30, 40, 50,100],
        addRowPosition: 'first',
        actionsColumnIndex: -1,
        exportFileName: "Product Table",
        headerStyle: {
            backgroundColor: '#cccccc',
            color: '#000',
           
            textTransform: 'uppercase',
            width: 26,
            whiteSpace: 'nowrap',
            textAlign: 'left',
            flexDirection: 'row',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontSize:'12px',
            paddingLeft: 5,
            paddingTop:8,
            paddingBottom:8,
            paddingRight: 0,
       //     backgroundColor: theme.palette.primary.table,
           fontWeight: 'bold',
            //color: theme.palette.primary.main,
          },
          cellStyle: {
            backgroundColor: '#fff',
            color: '#000',
            border:'1px solid #cccccc',

            width: 26,
            whiteSpace: 'nowrap',
            textAlign: 'left',
            flexDirection: 'row',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontSize:'11px',
            paddingLeft: 5,
            paddingTop:10,
            paddingBottom:10,
            paddingRight: 0,
          },
          rowStyle: {
            backgroundColor: '#fff',
            color: '#000',
            border:'1px solid #cccccc',

            width: 26,
            whiteSpace: 'nowrap',
            textAlign: 'left',
            flexDirection: 'row',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            paddingLeft: 0,
            paddingTop:0,
            paddingBottom:0,
            paddingRight: 0,
          },
          selection: false,
          showSelectAllCheckbox:false,
          showTextRowsSelected:false,
          search: true,
          exportButton: false,
        selectionProps: rowData => ({
      })
      }}
      
        onSelectionChange={(rows) => {
            handleChangeCheckbox(rows);
        }}
      />
 
                </View>
               
        </View>

    
        );
  }

  SelectProduct.propTypes = {
    updateSelectProductArray:PropTypes.func,
    handleNextPage: PropTypes.func,
    backButtonRouting:PropTypes.func
  };