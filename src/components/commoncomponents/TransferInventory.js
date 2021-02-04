import React ,{ useState, useEffect } from 'react';
import { fade,withStyles,makeStyles, useTheme} from '@material-ui/core/styles';
import {Platform,View,ScrollView,Image,Text,Dimensions} from 'react-native';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import * as shiphypeservice from './ShipService/shiphype_service';
import MaterialTable , { MTableToolbar }from 'material-table';
import { forwardRef } from 'react';
import Paper from '@material-ui/core/Paper';
import Toast from './feedback/Toast';
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
import popUpStyle from './style/popUpStyle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import Typography from "@material-ui/core/Typography";
const ColorButtonAdd = withStyles(theme => ({
  root: {
   borderRadius : '3px',
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
    Add: () => <ColorButtonAdd
    size='large'
    variant="contained"
    color="primary"
    startIcon={<AddIcon />}
    >
     Product
  </ColorButtonAdd>,
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
    submit: {
      margin: theme.spacing(0, 0, 0),
      borderRadius : 0,
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
textArea:{
  marginTop: theme.spacing(0),
  borderRadius : 0,
},
profileMargin: {
  marginTop: theme.spacing(2),
  borderRadius : 0,
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
paper: {
  border: '2px solid #ced4da',
  height: 100,
  width: 100,
},
paper9: {
  //paddingLeft: theme.spacing(1),
  //paddingRight: theme.spacing(1),
   borderRadius:'0px',
   overflow: 'auto',
  // height:'1020vh'
},
root: {
  //flexGrow: 1,
  width: '100%',
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
profileMargin10: {
  
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
//Make custom button
const ColorButtonBack = withStyles(theme => ({
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

  const StyledMTableToolbar = withStyles({
    root: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  })(MTableToolbar);

  

 

/**
 * Description:This function is used for Slide17
 * @param {*} props 
 */
export default function Slide17(props) {
  
   const classes = useStyles();
   const userid=props.user_id;
   const fromWarehouseId=props.fromWarehouseIdInventory;
   const toWarehouseId=props.toWarehouseIdInventory;
   const[dataproduct,setDataProduct]=React.useState([]);
   const [changedWarehouseid, setchangedWarehouseid] = React.useState([]);
   const [status,setStatus]=React.useState(false);
   const [loading,setLoading]=React.useState(true);
   const [open, setOpen]=React.useState(false);
   const [userName, setUserName]=React.useState('All Inventory');
   const [msg,setMsg]=React.useState('');
   const [type,setType]=React.useState('');
   const packingdata=props.packageDataPro;
   const promoData=props.promotionalData;
   var ids=[];
   const [stateproduct, setStateproduct] = React.useState({
    data: [],
  });


   const theme = useTheme()
   const [state, setState] = React.useState({
    column1FilterList: {},
    columns: [
     

        { title: '',
        width:'20px',
        render: rowData => <FormGroup>
        
        <FormControlLabel style={{paddingBottom:'0px',paddingTop:'0px',height:'25px'}}
          control={<Checkbox 
            id={rowData.customproductId}

            checked={
                (() => {
                  for(let i=0; i<ids.length;i++)
                 
                  {
                    if (rowData.customproductId  === parseInt(ids[i])){
                    return (
                        true
                      )
                  }
               
                  }
                 
                  })()}
            
            onChange={()=>{handleChangeCheckbox(rowData.customproductId)}}
            
            color="primary"
           />}
           
            InputProps={{ inputProps: { style: {  borderRadius: 0 }, }, style: { borderRadius: 0 }, }}
           
            
        />
          
       </FormGroup>
      
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
     { title: 'Item SKU',
     field: 'productsku',type: 'text', render: rowData =><FormControlLabel
     
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
    { title: 'Item Value', field: 'itemvalue',type: 'text',
    render: rowData =><FormControlLabel
         
    onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
    className={classes.quantitycss}
    control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
  fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
  transition : 'all 0.25s',}}>{rowData.itemvalue}</Text>
        
      </Typography>}
  /> 
  },
    { title: 'Dangerous Goods', field: 'dangerousgoods', type: 'boolean',
    render: rowData =><FormControlLabel
        
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
      title: "Warehouse",
      field: "warehouseid",
      lookup: { 1: 'US Warehouse', 2: 'Canada Warehouse' },

    //  lookup: promotionalData,
    },
    {
      title: 'Packaging',
      field: 'packaging',
      //lookup: { 1: 'Corrugated Box', 2: 'Letter' },
     
      lookup: packingdata ,
    },
    {
      title: 'Promotional Inserts',
      field: 'promotionalpackaging',
      //lookup: { 1: 'Corrugated Box', 2: 'Letter' },
     
      lookup: promoData ,
    },
     { title: 'Current Quantity', field: 'itemquantity', type: 'numeric',
     render: rowData =><FormControlLabel
         
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

  var flag =false;
  const handleChangeCheckbox = (data) => {
   console.log("selectidrun");
   console.log("selectid",data);
   console.log("arraylenght",ids.length);

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

  //  var ids3=[];
  //  for(let i=0;i<ids.length ;i++){
  //    console.log("arrayvalue",ids[i]);
  //    ids3.push(1);
  //  }

   const updatedaray=[...ids];

   setchangedWarehouseid(updatedaray);

   //const updatedaray1=[...ids3];

   //setshippedQuantity(updatedaray1);

   setState({
     columns: [

      { title: '',
        width:'20px',
        render: rowData => <FormGroup>
        
        <FormControlLabel style={{paddingBottom:'0px',paddingTop:'0px',height:'25px'}}
          control={<Checkbox 
            id={rowData.customproductId}

            checked={
                (() => {
                  for(let i=0; i<ids.length;i++)
                 
                  {
                    if (rowData.customproductId  === parseInt(ids[i])){
                    return (
                        true
                      )
                  }
               
                  }
                 
                  })()}
            
            onChange={()=>{handleChangeCheckbox(rowData.customproductId)}}
            
            color="primary"
           />}
           
            InputProps={{ inputProps: { style: {  borderRadius: 0 }, }, style: { borderRadius: 0 }, }}
           
            
        />
          
       </FormGroup>
      
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
  { title: 'Item SKU',
  field: 'productsku',type: 'text', render: rowData =><FormControlLabel
  
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
 { title: 'Item Value', field: 'itemvalue',type: 'text',
 render: rowData =><FormControlLabel
      
 onClick={()=>{handleChangeCheckbox(rowData.customproductId)}}
 className={classes.quantitycss}
 control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
transition : 'all 0.25s',}}>{rowData.itemvalue}</Text>
     
   </Typography>}
/> 
},
 { title: 'Dangerous Goods', field: 'dangerousgoods', type: 'boolean',
 render: rowData =><FormControlLabel
        
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
   title: "Warehouse",
   field: "warehouseid",
   lookup: { 1: 'US Warehouse', 2: 'Canada Warehouse' },

 //  lookup: promotionalData,
 },
 {
   title: 'Packaging',
   field: 'packaging',
   //lookup: { 1: 'Corrugated Box', 2: 'Letter' },
  
   lookup: packingdata ,
 },
 {
   title: 'Promotional Inserts',
   field: 'promotionalpackaging',
   //lookup: { 1: 'Corrugated Box', 2: 'Letter' },
  
   lookup: promoData ,
 },
  { title: 'Current Quantity', field: 'itemquantity', type: 'numeric',
  render: rowData =><FormControlLabel
      
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
   

  
  React.useEffect(() => {
    // fetchProductListOfLastWeek();   
    // fetchUserInfo();   
    fetchProductList();
 } ,[]);


 
  const fetchProductList = ()=>{

    //const userid=5;
    setLoading(true);
    shiphypeservice.fetchProductList1(userid,fromWarehouseId)
    .then(response => {
     console.log("status",response.status);
          if(response.status === true) {
            setLoading(false);
               setDataProduct(response.data);
               setStateproduct((prevState) => {
                const data = [...prevState.data];
    
                for (let i = 0; i < response.data.length; i++) {
                  data.push(response.data[i]);
                }
    
                return { ...prevState, data };
              });

             if(response.data.length===0)
             {
               fetchproduct();
             }
                     }else{
                      setLoading(false);
                      console.log("message",response.message);
                     }   
        }).catch((error) =>{
              console.error(error);
        });
  }
  
  const fetchproduct = ()=>{

    //const userid=5;
    setLoading(true);
    shiphypeservice.fetchProductList1(userid)
    .then(response => {
     console.log("status",response.status);
          if(response.status === true) {
            setLoading(false);
               setDataProduct(response.data);
               setStateproduct((prevState) => {
                const data = [...prevState.data];
    
                for (let i = 0; i < response.data.length; i++) {
                  data.push(response.data[i]);
                }
    
                return { ...prevState, data };
              });

            //  if(response.data.length===0)
            //  {
            //    fetchproduct();
            //  }
                     }else{
                      setLoading(false);
                      console.log("message",response.message);
                     }   
        }).catch((error) =>{
              console.error(error);
        });
  }

 

  const updataWarehouseOfShiping = (changedWarehouseid,toWarehouseId)=>{
    var ids3 = [];
    for (let i = 0; i < changedWarehouseid.length; i++) {
      console.log("productid", changedWarehouseid[i]);
      for(let j=0;j<stateproduct.data.length;j++){
        if(changedWarehouseid[i] === stateproduct.data[j].customproductId){
          if(stateproduct.data[j].itemquantity === null){
            ids3.push(1);
            console.log("product", "run");
          }else{
            ids3.push(stateproduct.data[j].itemquantity);
          }
        }
      }
      
    }



    setLoading(true);
    shiphypeservice.updateSHippingProject(changedWarehouseid,ids3,toWarehouseId)
    .then(response => {
     console.log("status",response.status);
          if(response.status === true) {
            setLoading(false);
            onNextfunction();
           // fetchProductList();
                     }else{
                      setLoading(false);
                      console.log("message",response.message);
                     }   
        }).catch((error) =>{
              console.error(error);
        });
  }
  const updataExistsProduct = (
    customproduct_id,
    productsku,
    productname,
    domesticshipping,
    internationalshipping,
    dangerousgoods,
    hscode,
    itemvalue,
    itemcurrency,
    itemquantity,
    packaging,
    promotionalpackaging,
    userid,
    tor,
    los,
    newData,oldData
  ) => {
    setLoading(true);
  
    
      
          setOpen(true);
          setType("success");
          setMsg('Product Quantity Updated Successfully.');
          setStatus(true);
          setLoading(false);
          setStateproduct((prevState) => {
            const data = [...prevState.data];
            data[data.indexOf(oldData)] = newData;
            return { ...prevState, data };
          });
          //fetchProductList();
       
     
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


  const handleCallbackfunction =()=>{
    props.backButtonRouting('11');
  }
   
  const onNextfunction =()=>{
    props.backButtonRouting('select_tranfer_inventoryCustome');
  }
   

          let screenWidth = Dimensions.get('window').width;


    return (  
        <View className={classes.content}>
        
        <View className={classes.appBarSpacer} />
        
                  <View >

                  <Grid item  container lg={12}  >
            <Grid item  lg={5}  style={popUpStyle.breadCrumSidePadding}
            //style={{ marginLeft:'4px'}}
            >
             <Link  onClick={()=>{props.handleDashboard('01')}}>
            <Text style={popUpStyle.breadCrundCss1}>DASHBOARD /</Text>
            </Link>
            <Text style={popUpStyle.breadCrundCss}> TRANSFER INVENTORY </Text>
          <Text style={popUpStyle.breadCrundCss2}>/ SELECT PRODUCTS {'\n'} </Text> 
        
              </Grid>
              <Grid item  lg={2} ></Grid>
             
              </Grid>
               
              </View>  
             
            
              <View style={popUpStyle.paddingSide}>
            
              <Grid container justify="space-between" spacing={1}>
            <Grid item xs={12} md={4} lg={4}>
            {/* <Text style={{ fontSize: '13px',
            fontWeight: '700',
            marginLeft:'2px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}}>
              
              Transfer Inventories</Text> */}
              </Grid>
              <Grid item xs={12} md={2} lg={2} ></Grid>
              <Grid item xs={12} md={6} lg={6} 
              //style={{marginRight:'70px'}} 
               >
  
              <Grid container item  justify="flex-end">

              <Grid>
              <ColorButtonBack
       size='large'
       variant="contained"
       color="primary"
     
      onClick={()=>{handleCallbackfunction()}}
       >
         Back
       </ColorButtonBack>&nbsp;&nbsp;
    
              </Grid>
            <Grid>
              <ColorButton
       size='large'
       variant="contained"
       color="primary"
      
      
       onClick={()=>{updataWarehouseOfShiping(changedWarehouseid,toWarehouseId)}}
       >
        Next
       </ColorButton>
    
              </Grid>
              </Grid>
            
              </Grid>
              </Grid>


           
              
              </View> 
           
              <View className={classes.paper9}> 
        <Grid justify="center">
                <ProgressBar 
                 loading={loading}
                />
                </Grid>
            

                <View style={popUpStyle.paddingSide}>
        
          <MaterialTable
        title={<Text style={{ fontSize: '13px',
            fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}}>Select the Products you want to Transfer: </Text> }
        columns={state.columns}
        data={stateproduct.data}
        icons={tableIcons}
        components={{
          Container: props => <Paper {...props} elevation={0}/>,
           
          Toolbar: props => (
            <StyledMTableToolbar {...props} />
          )
        }}
        localization={{
          header: {
            actions: "ACTION",
          },
          toolbar: {
            searchPlaceholder: "Search Products"
        },
        }}
        options={{
            paging:false,
            maxBodyHeight: '65vh',
            doubleHorizontalScroll: true,
            headerStyle: { position: 'sticky', top: 0 },
           // pageSize:6,
            //pageSizeOptions:[6,7, 9, 10, 11, 12, 15, 20, 30, 40, 50, 60, 70],
            showTitle: true,
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
            paddingLeft: 5,
            paddingTop:8,
            paddingBottom:8,
            paddingRight: 0,
            fontSize:'12px',
           fontWeight: 'bold',
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
            fontSize:'12px',
            paddingLeft: 12,
            paddingTop:5,
            paddingBottom:5,
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
          search: true,
          exportButton: false,
      }}
      // // editable={{
       
      // //   // onRowAdd: newData =>
      // //   //   new Promise((resolve, reject) => {
      // //   //     setTimeout(() => {
      // //   //       {
      // //   //         console.log("sku",newData.productsku);
      // //   //         console.log("name",newData.productname);
      // //   //         var str=newData.itemvaluecurrency;
      // //   //         var currency = str.slice(0, 1);
      // //   //         var currencyvalue=str.slice(1, 5);
      // //   //         console.log("currency",currency);
      // //   //         console.log("currencyvalue",currencyvalue);
      // //   //         addNewProduct(newData.productsku,newData.productname,true,newData.internationalshipping,newData.dangerousgoods,newData.hscode,parseInt(currencyvalue),currency,newData.itemquantity,newData.packaging,userid,newData.torontostock,newData.losangelesstock);
      // //   //          }
      // //   //       resolve()
      // //   //     }, 1000)
      // //   //   }),

      // //   onRowUpdate: (newData, oldData) =>
      // //         new Promise((resolve, reject) => {
      // //           setTimeout(() => {
      // //             {
      // //               // if (!newData.productsku || !newData.productname || !newData.hscode || !newData.itemvaluecurrency || !newData.packaging) {

      // //               //           setOpen(true);
      // //               //           setType('error');
      // //               //           setMsg("All field is required.");
      // //               //           reject();
      // //               //           return;
      // //               //       }
      // //               //       resolve();

      // //               //const data = dataproduct;
      // //               const data = stateproduct.data;
      // //               const index = data.indexOf(oldData);
      // //               // data[index] = newData;
      // //               // setState({ data }, () => resolve());

      // //               const customproduct_id = stateproduct.data[index].customproductId;
      // //               console.log("sku", newData.productsku);
      // //               console.log("name", newData.productname);
      // //               console.log("customproduct_id", customproduct_id);
      // //               console.log("index", index);
      // //               var str = newData.itemvaluecurrency;
      // //               var currency = "USD";
      // //               var currencyvalue = newData.itemvalue;
      // //               console.log("currency", currency);
      // //               console.log("currencyvalue", currencyvalue);
      // //               updataExistsProduct(
      // //                 customproduct_id,
      // //                 newData.productsku,
      // //                 newData.productname,
      // //                 true,
      // //                 newData.internationalshipping,
      // //                 newData.dangerousgoods,
      // //                 newData.hscode,
      // //                 parseInt(currencyvalue),
      // //                 currency,
      // //                 newData.itemquantity,
      // //                 newData.packaging,
      // //                 newData.promotionalpackaging,
      // //                 userid,
      // //                 newData.torontostock,
      // //                 newData.losangelesstock,newData,oldData
      // //               );
      // //             }
      // //             resolve();
      // //           }, 1000);
      // //         }),
      
      // }}
    />
{showToast(open,msg,type)}
        </View>
        </View>
       
        {/* </ScrollView> */}
        </View>
         
    );
  }

