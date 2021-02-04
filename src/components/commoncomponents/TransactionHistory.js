import React ,{ useState, useEffect } from 'react';
import { fade,withStyles,makeStyles, useTheme} from '@material-ui/core/styles';
import {Platform,View,ScrollView,Image,Text,Dimensions} from 'react-native';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import Grid from '@material-ui/core/Grid';
import * as shiphypeservice from './ShipService/shiphype_service';
import Link from '@material-ui/core/Link';
import InputBase from '@material-ui/core/InputBase';
import Switch from '@material-ui/core/Switch';
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
import ProgressBar from './feedback//ProgressBar';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import AddIcon from '@material-ui/icons/Add';
import popUpStyle from './style/popUpStyle';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from "@material-ui/core/Typography";
import { parseISO,format } from 'date-fns';

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
  Customer
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
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
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
  height: '80vh',
  overflow: 'auto',
  backgroundColor:'#fff',
},


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
   const [warehouse, setWarehouse] = React.useState('0');
   const userid=props.user_id;
   const userRoleId =props.userRoleId;
  // const[dataproduct,setDataProduct]=React.useState([]);
   const [loading,setLoading]=React.useState(true);
   const [open, setOpen]=React.useState(false);
   const [msg,setMsg]=React.useState('');
   const [type,setType]=React.useState('');
   const [userData , setUserData] = React.useState([]);
   const[dataproduct,setDataProduct]=React.useState({
    data: [ 

    ]
  });
   /**
 * Description:Custome switch
 */
const [changedWarehouseid, setchangedWarehouseid] = React.useState([]);


const [state, setState] = React.useState({
  columns: [
    
    { title: 'Transaction Id',
    field: 'id',type: 'text',render: rowData =><FormControlLabel
    control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
  fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
  transition : 'all 0.25s',}}>{rowData.id}</Text>
        
      </Typography>}
  />  
 },
    { title: 'Amount',
     field: 'amount_money',type: 'text',render: rowData =><FormControlLabel
     control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
   fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
 
 <Text style={{ fontSize: '11px', 
   fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
   transition : 'all 0.25s',}}>{rowData.amount_money.amount}</Text>
         
       </Typography>}
   />  
  },
  { title: 'Type',
     field: 'processing_fee',type: 'text',render: rowData =><FormControlLabel
     control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
   fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
 
 <Text style={{ fontSize: '11px', 
   fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
   transition : 'all 0.25s',}}>{rowData.processing_fee[0].type}</Text>
         
       </Typography>}
   />  
  },
    { title: 'Status', field: 'status',type: 'text',render: rowData =><FormControlLabel
    control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
  fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
  transition : 'all 0.25s',}}>{rowData.status}</Text>
        
      </Typography>}
  />  
   
  },
    {
      title: 'Date',field: 'created_at',type: 'date'
      
    },
    
  ],
});


const opennewOrder = (rowid,rowData) => {
  props.handleDashboard('AddCustomerManually');

  };
  
  useEffect(() => {
   // fetchShiphypeCompleteStep();
    fetchCustomerList(props.index);

    console.log("propsheader",props.transactionHeader);
    },[]);

   
     /**
      * Description:To do fetch customer list
      */
     const fetchCustomerList = (index)=>{

        setLoading(true);
        shiphypeservice.transactionHistory()
        .then(response => {
         console.log("status",response.status);
              if(response.status === true) {
                setLoading(false);
                if(index === 2){


                    var date = new Date();
                    // to add 4 days to current date
                    
                    date.setDate(date.getDate() - 7);
                   
                    const orderDate1=  format(date, "yyyy-MM-dd hh:mm:ss");
                    //console.log("paymentdate",format(parseISO(response.data.payments[0].created_at), "yyyy-MM-dd hh:mm:ss"));
                    //console.log("mydate",orderDate1);
                    
                    setDataProduct((prevState) => {
                      const data = [...prevState.data];
          
                      for(let i=0;i<response.data.payments.length;i++){
                        if(format(parseISO(response.data.payments[i].created_at), "yyyy-MM-dd hh:mm:ss") >= orderDate1){
                          console.log("paymentdate",format(parseISO(response.data.payments[i].created_at), "yyyy-MM-dd hh:mm:ss"));
                          console.log("mydate",orderDate1);
                          data.push(response.data.payments[i]);
                        }
                      }
                      return { ...prevState, data };
                    });
                }else if(index === 1){
                    var date = new Date();
                // to add 4 days to current date
                
                date.setDate(date.getDate() - 20);
               
                const orderDate1=  format(date, "yyyy-MM-dd hh:mm:ss");
                //console.log("paymentdate",format(parseISO(response.data.payments[0].created_at), "yyyy-MM-dd hh:mm:ss"));
                //console.log("mydate",orderDate1);
                
                setDataProduct((prevState) => {
                  const data = [...prevState.data];
      
                  for(let i=0;i<response.data.payments.length;i++){
                    if(format(parseISO(response.data.payments[i].created_at), "yyyy-MM-dd hh:mm:ss") >= orderDate1){
                      console.log("paymentdate",format(parseISO(response.data.payments[i].created_at), "yyyy-MM-dd hh:mm:ss"));
                      console.log("mydate",orderDate1);
                      data.push(response.data.payments[i]);
                    }
                  }
                  return { ...prevState, data };
                });
                }else{
                    //var date = new Date();
                // to add 4 days to current date
                
                //date.setDate(date.getDate() - 7);
               
                //const orderDate1=  format(date, "yyyy-MM-dd hh:mm:ss");
                //console.log("paymentdate",format(parseISO(response.data.payments[0].created_at), "yyyy-MM-dd hh:mm:ss"));
                //console.log("mydate",orderDate1);
                
                setDataProduct((prevState) => {
                  const data = [...prevState.data];
      
                  for(let i=0;i<response.data.payments.length;i++){
                    // if(format(parseISO(response.data.payments[i].created_at), "yyyy-MM-dd hh:mm:ss") >= orderDate1){
                    //   console.log("paymentdate",format(parseISO(response.data.payments[i].created_at), "yyyy-MM-dd hh:mm:ss"));
                    //   console.log("mydate",orderDate1);
                      
                    // }
                    data.push(response.data.payments[i]);
                  }
                  return { ...prevState, data };
                });
                }
                
                  // setDataProduct(response.data.payments);
  
                         }else{
                          setLoading(false);
                          console.log("message",response.message);
                         }   
            }).catch((error) =>{
                  console.error(error);
            });
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
     
const nextPage10 = () => {
  props.handleDashboard("billing");
}; 
          let screenWidth = Dimensions.get('window').width;

    return (  
      <View className={classes.content}>
    {/* <View className={classes.appBarSpacer} />
  
<View >
            <Grid item  container lg={12}  >
            <Grid item  lg={8}  style={popUpStyle.breadCrumSidePadding}>
            <Link  onClick={()=>{props.handleDashboard('01')}}>
            <Text style={popUpStyle.breadCrundCss1}>DASHBOARD /</Text>
            </Link>
            <Text style={popUpStyle.breadCrundCss}> Billing</Text>
          <Text style={popUpStyle.breadCrundCss2}> / {window.localStorage.headertitle}{'\n'} </Text> 
          
         
              </Grid>

              <Grid item lg={3}  style={{marginLeft:'20px',marginTop:'15px'}}>
              <Grid container item  justify="flex-end">
              <ColorButton
                          size="large"
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            nextPage10();

                          }}
                        >
                          Back
                        </ColorButton>

</Grid>
           </Grid>   */}
              {/* <Grid item  lg={4} style={{marginTop:'15px'}}>
              {( userRoleId ===1 ? 


                <Grid item  style={{ marginTop: "1px",marginBottom:"10px",padding:"0"}}>
             
             <Autocomplete
       id="combo-box-demo"
       fullWidth
       options={userData}
       getOptionLabel={(option) => option.name}
      
       style={{ width: 400 }}
       renderInput={(params) => <TextField {...params} size="small" placeholder="Search Seller" variant="outlined" />}
       onChange={(event, newValue) => {
           if(newValue !== null){
            fetchProductListById(newValue.id); 
         
           }
         console.log("newvalue",newValue);
       }}
     />
             </Grid>
        
        : '')}

</Grid> */}
              {/* </Grid>
              </View>   */}
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
          
            transition : 'all 0.25s',}}>{props.stateText}</Text> }
        columns={state.columns}
        data={dataproduct.data}
        // cellEditable={{
        //   onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
        //     return new Promise((resolve, reject) => {
        //       console.log('newValue: ' + newValue);
        //       setTimeout(resolve, 1000);
        //     });
        //   }
        // }}
        icons={tableIcons}
        components={{
          Container: props => <Paper {...props} elevation={0}/>,
         
          Toolbar: props => (
            <StyledMTableToolbar {...props} />
          )
        }}
        localization={{
          toolbar: {
              searchPlaceholder: "Search History"
          },
          header: {
            actions: "ACTION",
          },
      }}
        options={{
        paging: true,
        maxBodyHeight: '60vh',
        doubleHorizontalScroll: true,
        headerStyle: { position: 'sticky', top: 0 },
        pageSize:10,
        pageSizeOptions:[10,20,30,40,50,100],
        showTitle: true,
        addRowPosition: 'first',
        actionsColumnIndex: -1,
        exportFileName: "Customer List",
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
          search: true,
          exportButton: false,
          selection: false,
          
			
          showTextRowsSelected: false,
          selectionProps: rowData => ({
           
            // checked: rowData.customproductId === changedWarehouseid,
             color: 'primary'
        })
      }}
      />
  
        </View>
       
         
           
        </View>
    );
  }

