import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import ProgressBar from './feedback/ProgressBar';
import Toast from './feedback/Toast';
import popUpStyle from './style/popUpStyle';
import Link from '@material-ui/core/Link';
import ReceiveSetting from './ReceiveSetting';
import OrderSetting from './OrderSetting';
import RetrunAllSetting from './RetrunAllSetting';
import AccountSetting from './AccountAllSetting';
import CarrierSetting from './CarrierSetting';
import * as shiphypeservice from './ShipService/shiphype_service';
import MarketPlaceIntegrationSetting from './MarketPlaceIntegrationSetting';
import {Platform,View,Image,Text,Dimensions} from 'react-native';
import TransactionHistory from './TransactionHistory';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  appBarSpacer: theme.mixins.toolbar,
content: {
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(2),
  flexGrow: 1,
  height: '50vh',
  overflow: 'auto',
  backgroundColor:'#fff',
},
tabRoot:{
  fontSize: '12px'
 },
}));


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <View
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={2} style={{padding:'0px'}}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </View>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
  }
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
export default function CenteredTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [carrierData, setCarrierData] = React.useState([]);
  const userid=props.user_id;
  const isAdmin=props.isAdmin;
  const transactionHeader =props.transactionHeader;
  const [loading,setLoading]=React.useState(false);
  const [open, setOpen]=React.useState(false);
  const [msg,setMsg]=React.useState('');
  const [type,setType]=React.useState('');
  
  const [editCard,setEditCard]=React.useState(null);
 // const userid=props.user_id;
  const handleChange = (event, newValue) => {
    setValue(newValue);
    // if(newValue===4)
    // {
    //   setPosition('carrierSet');
    // }
    // else if(newValue===3)
    // {
    //  // setPosition('billing');
    //  setPosition('accountsetting');
    // }
    // else if(newValue===6)
    // {
      
    // }
    // else if(newValue===5)
    // {
    //   setPosition('market');
    // }
  };
  
//   React.useEffect(() => {
//     if(props.settingId === 2)
//     {
//       setValue(0);
//     }
//     fetchCourierTypeList();
//   },[]);
//   const fetchCourierTypeList =()=>{
//     setLoading(true);
//     shiphypeservice.fetchCourierTypeList()
//           .then(response => {
//            console.log("status",response.status);
//                 if(response.status === true) {
//                   setLoading(false);
//                   setCarrierData(response.data);
//                            }else{
//                             setLoading(false);
//                             console.log("message",response.message);
//                            }   
//               }).catch((error) =>{
//                     console.error(error);
//               });
//             }
//             const carryData = {};
//             carrierData.map(carryData1 => {
//                 const { carrierId, carriertitle } = carryData1;
//                 carryData[ carrierId ] = carriertitle
//             })
//   const switchHandling=(position)=>{
//     //setShipmentId(0);
//   //  setShipmentId(0);
//     setPosition(position);
//     setEditCard(null);
//    // setEditFunction('1');
//   }
//   const handleeditcard=(editcard)=>{
//     console.log('editfata',editcard);
//     setEditCard(editcard);
//     setPosition('cardlistadd');
//   }
//   const handleNext =(isSprintCreate)=>{
//     setPosition(1);
//   }
//   const SwitchHandling=()=>{   
//      if(position === 'cardlistadd'){
//       return <Payment
//        editCard={editCard}
//        user_id={userid}
//        handleNextPage={switchHandling}
//       />;
    
//     }
//     else if(position === 'accountsetting'){
//       return <AccountSetting
//      // userRoleId={userRoleId}
//       isAdmin={isAdmin}
//       handleNextPage={handleNext}
//       user_id={userid} 
//       />
//     }
//     else if(position === 'carrierSet'){
//       return <CarrierSetting
//      // userRoleId={userRoleId}
//      policyData={policyData}
//      sourcePo={sourcePo}
//      carryData={carryData}
//      user_id={userid}
//      handleeditcard={handleeditcard}
//      handleNextPage={switchHandling}
//      />;
//    }
//     else if(position === 'PaymentRecieveSetting')
//     {
//       return <PaymentRecieveSetting user_id={userid}
//       handleeditcard={handleeditcard}
//       handleNextPage={switchHandling}/>;
//     }
//     else if(position === 'billing'){
//       return <PaymentMethod
//      // userRoleId={userRoleId}
//      user_id={userid}
//      handleeditcard={handleeditcard}
//      handleNextPage={switchHandling}
//      />;
//    }
//    else if(position === 'market'){
//     return <MarketPlaceIntegrationSetting
//    // userRoleId={userRoleId}
//    user_id={userid}
//    handleeditcard={handleeditcard}
//    handleNextPage={switchHandling}
//    />;
//  }
//   }
const nextPage10 = () => {
    props.handleDashboard("billing");
  }; 
      
  return (
    <View className={classes.content}>
    <View className={classes.appBarSpacer} />
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
           </Grid>  
             
              </Grid>
              </View>  
      <Grid justify="center">
              <ProgressBar 
               loading={loading}
              />
              </Grid>
       <View >
    <View className={classes.root}>
    <View style={popUpStyle.paddingSide}>
      <AppBar position="static" style={{backgroundColor:'#ffffff',color:'#000000'}}>
        <Tabs value={value} onChange={handleChange}   indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example">
          <Tab label={<Text className={classes.tabRoot}>All Transactions</Text>} {...a11yProps(0)} />
          <Tab label={<Text className={classes.tabRoot}>All Statements</Text>} {...a11yProps(1)} />
          <Tab label={<Text className={classes.tabRoot}>Current Statement</Text>} {...a11yProps(2)} />
        
         
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
      <TransactionHistory  user_id={userid} index={value} transactionHeader={transactionHeader} stateText='All Transactions'/>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <TransactionHistory user_id={userid} index={value} transactionHeader={transactionHeader} stateText='All Statements'/>
    
      </TabPanel>
      <TabPanel value={value} index={2}>
      <TransactionHistory  user_id={userid} index={value} transactionHeader={transactionHeader} stateText='Current Statement'/>
      </TabPanel>

      {/* <TabPanel value={value} index={3}>
        <View>
        {SwitchHandling()}
        </View>
    
      </TabPanel>
      <TabPanel value={value} index={4}>
        <View>
        {SwitchHandling()}
        </View>
    
      </TabPanel>
      <TabPanel value={value} index={5}>
        <View>
        {SwitchHandling()}
        </View>
    
      </TabPanel>
      <TabPanel value={value} index={6}>
        <View>
        {SwitchHandling()}
        </View>
    
      </TabPanel> */}
    </View>
    </View>
    </View>
    </View>
  );
}