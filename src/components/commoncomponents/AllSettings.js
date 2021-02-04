import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
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
import ShippingCalculator from './ShippingCalculator';
import RetrunAllSetting from './RetrunAllSetting';
import AccountSetting from './AccountAllSetting';
import CarrierSetting from './CarrierSetting';
import * as shiphypeservice from './ShipService/shiphype_service';
import MarketPlaceIntegrationSetting from './MarketPlaceIntegrationSetting';
import {Platform,View,Image,Text,Dimensions} from 'react-native';

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

export default function CenteredTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [carrierData, setCarrierData] = React.useState([]);
  const userid=props.user_id;
  const isAdmin=props.isAdmin;
  const policyData =props.policyData;
  const policyDataId =props.policyDataId;
  const userRoleId =parseInt(window.localStorage.roleId);
  const sourcePo=props.shipData;
  const [position,setPosition] = React.useState('carrierSet');
  const [loading,setLoading]=React.useState(false);
  const [open, setOpen]=React.useState(false);
  const [msg,setMsg]=React.useState('');
  const [type,setType]=React.useState('');
  
  const [editCard,setEditCard]=React.useState(null);
 // const userid=props.user_id;
  const handleChange = (event, newValue) => {
    setValue(newValue);
    if(newValue===4)
    {
      setPosition('carrierSet');
    }
    else if(newValue===3)
    {
     // setPosition('billing');
     setPosition('accountsetting');
    }
    else if(newValue===6)
    {
      
    }
    // else if(newValue===5)
    // {
    //   setPosition('market');
    // }
  };
  
  React.useEffect(() => {
    if(props.settingId === 2)
    {
      setValue(0);
    }
    fetchCourierTypeList(userid);
  },[]);
  const fetchCourierTypeList =(userid)=>{
    setLoading(true);
    shiphypeservice.fetchCourierTypeList(userid)
          .then(response => {
           console.log("status",response.status);
                if(response.status === true) {
                  setLoading(false);
                  setCarrierData(response.data);
                           }else{
                            setLoading(false);
                            console.log("message",response.message);
                           }   
              }).catch((error) =>{
                    console.error(error);
              });
            }
            const carryData = {};
            carrierData.map(carryData1 => {
                const { carrierId, carriertitle } = carryData1;
                carryData[ carrierId ] = carriertitle
            })
  const switchHandling=(position)=>{
    //setShipmentId(0);
  //  setShipmentId(0);
    setPosition(position);
    setEditCard(null);
   // setEditFunction('1');
  }
  const handleeditcard=(editcard)=>{
    console.log('editfata',editcard);
    setEditCard(editcard);
    setPosition('cardlistadd');
  }
  const handleNext =(isSprintCreate)=>{
    setPosition(1);
  }
  const SwitchHandling=()=>{   
     if(position === 'cardlistadd'){
      return <Payment
       editCard={editCard}
       user_id={userid}
       handleNextPage={switchHandling}
      />;
    
    }
    else if(position === 'accountsetting'){
      return <AccountSetting
     // userRoleId={userRoleId}
      isAdmin={isAdmin}
      handleNextPage={handleNext}
      user_id={userid} 
      />
    }
    else if(position === 'carrierSet'){
      return <CarrierSetting
     // userRoleId={userRoleId}
     policyData={policyData}
     policyDataId={policyDataId}
     sourcePo={sourcePo}
     carryData={carryData}
     user_id={userid}
     handleeditcard={handleeditcard}
     handleNextPage={switchHandling}
     />;
   }
    else if(position === 'PaymentRecieveSetting')
    {
      return <PaymentRecieveSetting user_id={userid}
      handleeditcard={handleeditcard}
      handleNextPage={switchHandling}/>;
    }
    else if(position === 'billing'){
      return <PaymentMethod
     // userRoleId={userRoleId}
     user_id={userid}
     handleeditcard={handleeditcard}
     handleNextPage={switchHandling}
     />;
   }
   else if(position === 'market'){
    return <MarketPlaceIntegrationSetting
   // userRoleId={userRoleId}
   user_id={userid}
   handleeditcard={handleeditcard}
   handleNextPage={switchHandling}
   />;
 }
  }
  return (
    <View className={classes.content}>
    <View className={classes.appBarSpacer} />
                <View >
          <Grid item  container lg={12}  >
          <Grid item  lg={5}  style={popUpStyle.breadCrumSidePadding}>
          <Link  onClick={()=>{props.handleDashboard('01')}}>
        <Text style={popUpStyle.breadCrundCss1}>DASHBOARD /</Text>
        </Link>
        <Text style={popUpStyle.breadCrundCss2}> SETTINGS {'\n'} </Text> 
         
            </Grid>
            <Grid item  lg={2} ></Grid>
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
          <Tab label={<Text className={classes.tabRoot}>Order Settings</Text>} {...a11yProps(0)} />
          <Tab label={<Text className={classes.tabRoot}>Receiving Settings</Text>} {...a11yProps(1)} />
          <Tab label={<Text className={classes.tabRoot}>Return Settings</Text>} {...a11yProps(2)} />
        
          <Tab label={<Text className={classes.tabRoot}>PROFILE Settings</Text>} {...a11yProps(3)} />
          <Tab label={<Text className={classes.tabRoot}>Shipping Policies</Text>} {...a11yProps(4)} />
          {(() => {
             
             if(userRoleId===1)
             {
              return (
                <Tab label={<Text className={classes.tabRoot}>Shipping Calculator Settings</Text>}  {...a11yProps(5)} /> 
                );
                              }
                              
                            })()}
        
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
      <OrderSetting  user_id={userid}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <ReceiveSetting user_id={userid}/>
    
      </TabPanel>
      <TabPanel value={value} index={2}>
      <RetrunAllSetting  user_id={userid}/>
      </TabPanel>

      <TabPanel value={value} index={3}>
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
      <ShippingCalculator  user_id={userid}/>
    
      </TabPanel>
      <TabPanel value={value} index={6}>
        <View>
        {SwitchHandling()}
        </View>
    
      </TabPanel>
    </View>
    </View>
    </View>
    </View>
  );
}