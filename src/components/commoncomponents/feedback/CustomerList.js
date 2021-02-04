import React ,{ useState, useEffect } from 'react';
import { fade,withStyles,makeStyles,useTheme} from '@material-ui/core/styles';
import {Platform,View,ScrollView,Image,Text,Dimensions} from 'react-native';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import PropTypes from "prop-types";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import Stepper from '@material-ui/core/Stepper';
import StepConnector from '@material-ui/core/StepConnector';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import InputBase from '@material-ui/core/InputBase';
import StepButton from '@material-ui/core/StepButton';
import Switch from '@material-ui/core/Switch';
import * as shiphypeservice from '../ShipService/shiphype_service';
import MaterialTable , { MTableToolbar }from 'material-table';
import { forwardRef } from 'react';
import Paper from '@material-ui/core/Paper';
import Toast from './Toast';
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
import ProgressBar from './ProgressBar';
import popStyle from '.././style/popUpStyle';
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



const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
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
textArea:{
  marginTop: theme.spacing(0),
  borderRadius : 0,
},
profileMargin: {
  marginTop: theme.spacing(2),
  borderRadius : 0,
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

  const StyledMTableToolbar = withStyles({
    root: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  })(MTableToolbar);

  const DialogTitle = withStyles(styles)(props => {
    
    const { children, classes, onClose, ...other } = props;
    const classes1 = useStyles();
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        {onClose ? (
            <Grid container item xs={10} justify="flex-end">
          <IconButton aria-label="close" className={classes.closeButton} onClick={props.onClose}>
            <CloseIcon />
          </IconButton>
          </Grid>
        ) : null}
        <Grid item container xs={12} lg={12}>
       
      
</Grid>     </MuiDialogTitle>
    );
  });

  /**
   * Description:To do show step of task
   */
  function getSteps() {
    return ['Marketplace Integration', 'Shipping Profile', 'Return Settings','Import Products','Import Customers',];
  }

/**
 * Description:This function is used for Slide17
 * @param {*} props 
 */
export default function ProductList(props) {
  
   const classes = useStyles();
   const {openCustomerList}= props;
   const [activeStep, setActiveStep] = React.useState(4);
   const steps = getSteps();
   const userid=props.user_id;
   const [checkedA,setCheckedA]=React.useState(true);
   const[dataproduct,setDataProduct]=React.useState([]);
   const [loading,setLoading]=React.useState(true);
  
const theme = useTheme()
const [state, setState] = React.useState({

  columns: [
  //   { title: 'Customer Id',
  //     field: 'customerId',type: 'text',editable:'never'
  // },
    { title: 'First Name', field: 'firstname',type: 'text'
    
  },
    { title: 'Last Name', field: 'lastname',type: 'text',
    
  },
    { title: 'Company Name', field: 'companyname', type: 'text',
   
  },
    { title: 'Address', field: 'addressline1',type: 'text'},
    { title: 'City', field: 'city', type: 'text',
    
   },
   {
    title: 'Country',
    field: 'country',
    type: 'text',
  },
    {
      title: 'State',
      field: 'state',
      type: 'text',
    },
    {
      title: 'Zip',
      field: 'zip',
      type: 'text',
    },
    
    {
      title: 'Phone No.',
      field: 'phone',
      type: 'text',
    },
    {
      title: 'Email',
      field: 'email',
      type: 'text',
    },
  ],
  
});

  useEffect(() => {
    fetchCustomerList();
    },[]);

  
       /**
      * Description:To do fetch customer list
      */
     const fetchCustomerList = ()=>{

      //const userid=5;
      setLoading(true);
      shiphypeservice.fetchCustomerList(userid)
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


/*
 * Description:To do close poup after successfully create sprint and on click cancel button
 * @param {*} issprintCreate 
 */
const handleClose1 = (isSprintCreate) => {
 
  props.handleSprintCancel(isSprintCreate);
}
const addStepStatus = () => {
  // if (dataproduct.length > 0 && dataproduct.length < 2) {
    // const userid=user_id;
    const shiphypesubsubstepId = 0;
    const shiphypesubstepId = 9;
    const shiphypestepId = 0;
    setLoading(true);
    shiphypeservice
      .addUserStepDoneSofar(
        userid,
        shiphypesubsubstepId,
        shiphypesubstepId,
        shiphypestepId
      )
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          //handleNextPage(20, 18);
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  // } else {
  //   handleNextPage(20, 18);
  // }
};

/**
 * Description:To do call function on next button
 * @param {*} isSprintCreate 
 */
const handleNextPage = (isSprintCreate) => {
  addStepStatus();
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
          let screenWidth = Dimensions.get('window').width;
    return (  
      <View>
      <Dialog 
        maxWidth="xl"
        fullWidth={true}
        className={classes.dialog} 
        onClose={()=>{handleClose1(false)}} 
        aria-labelledby="customized-dialog-title" 
        open={openCustomerList}>
        <Grid item xs={12}>
      
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

                <DialogTitle id="customized-dialog-title" onClose={()=>{handleClose1(false)}}  style={{width:'96%',margin:'auto',paddingBottom:'0px',paddingTop:'0px'}}>
       
       </DialogTitle >
       </Grid>
       <Grid item xs={12} lg={12}>
         
       
            </Grid>
         <DialogContent style={{width:'96%',margin:'auto'}}>
         {(() => {
              if (screenWidth<690){
                  return (
                    <View>
                     <Stepper activeStep={activeStep} orientation="vertical">
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
         <Grid container className={classes.root} > 

         <Grid item xs={12} lg={12}>
        
           
         {/* <ScrollView> */}
         <View >
       
          <MaterialTable
        title={<Text style={{ fontSize: '13px',
            fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}}>All Customers</Text> }
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
              searchPlaceholder: "Search Customers"
          },
          header: {
            actions: "ACTION",
          },
      }}
     
      options={{
        paging: false,
        addRowPosition: 'first',
        doubleHorizontalScroll: true,
        actionsColumnIndex: -1,
        maxBodyHeight: '53vh',
        headerStyle: { position: 'sticky', top: 0 },
        exportFileName: "Customer List",
        headerStyle: {
            backgroundColor: '#cccccc',
            color: '#000',
            width: 40,
            whiteSpace: 'nowrap',
            textAlign: 'left',
            flexDirection: 'row',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            paddingLeft: 5,
            textTransform: 'uppercase',
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

            width: 40,
            whiteSpace: 'nowrap',
            textAlign: 'left',
            flexDirection: 'row',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontSize:'11px',
            paddingLeft: 5,
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
    
      />
        </View>
        </Grid>
          {/* </ScrollView> */}
         </Grid>
           </form>
          
            
       </DialogContent>

       <DialogActions>
       <Grid  justify="flex-end"
            container 
            spacing={1} >
            
            <Grid item> 
            <ColorButton
       size='large'
       variant="contained"
       color="primary"
       className={classes.profileMargin}
       onClick={()=>{handlePreviousPage(17)}}>
          Back
       </ColorButton>&nbsp;&nbsp;
     <ColorButton
    size='large'
    variant="contained"
    color="primary"
    className={classes.profileMargin}
    onClick={()=>{handleNextPage(21)}}>
    NEXT
  </ColorButton>
       </Grid>
       </Grid>
       </DialogActions>
      </Dialog>
        </View>
    );
  }


  ProductList.propTypes = {
    openCustomerList: PropTypes.bool,
    handleSprintCancel: PropTypes.func
  };