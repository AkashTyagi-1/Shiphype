import React from 'react';
import {Platform} from "react-native";
import Main from '../components/commoncomponents/Main';
import PageLoader from '../components/commoncomponents/PageLoader';
import Order from '../components/commoncomponents/Order';
import { createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import {createBrowserApp} from '@react-navigation/web';
import PrintInternalPackagingSlip from '../components/commoncomponents/PrintInternalPackagingSlip';
//import Main from '../components/dynamiclayout/Main/Main1';
//For platform verifing
const isWeb = Platform.OS === 'web';

export default class App extends React.Component {

  render() {
    return <AppContainer />;
  }
}

const AppNavigator = createStackNavigator({

  Main:{
    screen:Main,
    navigationOptions: {
      title: 'Dashboard | ShipHype',
      headerShown: false
    },
  },
  PageLoader:{
    screen:PageLoader,
    navigationOptions: {
      title: 'Dashboard | ShipHype',
      headerShown: false
    },
  },
  Overview:{
    screen:Main,
    navigationOptions: {
      title: 'Dashboard | ShipHype',
      headerShown: false,
      header:null,
      tabBarVisible :false
    },
  },
  Order:{
    screen:Main,
    navigationOptions: {
      title: 'Dashboard | ShipHype',
      headerShown: false,
      header:null,
      tabBarVisible :false
    },
  },
  Subscription:{
    screen:Main,
    navigationOptions: {
      title: 'Dashboard | ShipHype',
      headerShown: false,
      header:null,
      tabBarVisible :false
    },
  },
  PrintInternalPackagingSlip:{
    screen:PrintInternalPackagingSlip,
    navigationOptions: {
      title: 'Dashboard | ShipHype',
      headerShown: false,
      header:null,
      tabBarVisible :false
    },
  },
  ReceiveOrder:{
    screen:Main,
    navigationOptions: {
      title: 'Dashboard | ShipHype',
      headerShown: false,
      header:null,
      tabBarVisible :false
    },
  },
  ReceiveOrderCanada:{
    screen:Main,
    navigationOptions: {
      title: 'Dashboard | ShipHype',
      headerShown: false,
      header:null,
      tabBarVisible :false
    },
  },
  Showfeedback:{
    screen:Main,
    navigationOptions: {
      title: 'Dashboard | ShipHype',
      headerShown: false,
      header:null,
      tabBarVisible :false
    },
  },
  
  ReceiveReturnOrder:{
    screen:Main,
    navigationOptions: {
      title: 'Dashboard | ShipHype',
      headerShown: false,
      header:null,
      tabBarVisible :false
    },
  },
  MarketPlaceSetting:{
    screen:Main,
    navigationOptions: {
      title: 'Dashboard | ShipHype',
      headerShown: false
    },
  },
  Product:{
    screen:Main,
    navigationOptions: {
      title: 'Dashboard | ShipHype',
      headerShown: false
    },
  },
  Invoice:{
    screen:Main,
    navigationOptions: {
      title: 'Dashboard | ShipHype',
      headerShown: false
    },
  },
  RequestWorkOrder:{
    screen:Main,
    navigationOptions: {
      title: 'Dashboard | ShipHype',
      headerShown: false,
      header:null,
      tabBarVisible :false
    },
  },

  AccountSetting:{
    screen:Main,
    navigationOptions: {
      title: 'Dashboard | ShipHype',
      headerShown: false,
      header:null,
      tabBarVisible :false
    },
  },

  MarketPlaceIntegration:{
    screen:Main,
    navigationOptions: {
      title: 'Dashboard | ShipHype',
      headerShown: false
    },
  },
  SettingScreen:{
    screen:Main,
    navigationOptions: {
      title: 'Dashboard | ShipHype',
      headerShown: false
    },
  },
  Custom:{
    screen:Main,
    navigationOptions: {
      title: 'Dashboard | ShipHype',
      headerShown: false
    },
  },
  SentInventory:{
    screen:Main,
    navigationOptions: {
      title: 'Dashboard | ShipHype',
      headerShown: false
    },
  },
  ReceiveInventory:{
    screen:Main,
    navigationOptions: {
      title: 'Dashboard | ShipHype',
      headerShown: false
    },
  },
  TranferInventory:{
    screen:Main,
    navigationOptions: {
      title: 'Dashboard | ShipHype',
      headerShown: false
    },
  },
  Promotional:{
    screen:Main,
    navigationOptions: {
      title: 'Dashboard | ShipHype',
      headerShown: false
    },
  },
  Customer:{
    screen:Main,
    navigationOptions: {
      title: 'Dashboard | ShipHype',
      headerShown: false
    },
  },
  Return:{
    screen:Main,
    navigationOptions: {
      title: 'Dashboard | ShipHype',
      headerShown: false
    },
  },
  Help:{
    screen:Main,
    navigationOptions: {
      title: 'Dashboard | ShipHype',
      headerShown: false,
      header:null,
      tabBarVisible :false
    },
  },
  AffiliateProgram:{
    screen:Main,
    navigationOptions: {
      title: 'Dashboard | ShipHype',
      headerShown: false,
      header:null,
      tabBarVisible :false
    },
  },
  AllSettings:{
    screen:Main,
    navigationOptions: {
      title: 'Dashboard | ShipHype',
      headerShown: false,
      header:null,
      tabBarVisible :false
    },
  },
  TransferCredit:{
    screen:Main,
    navigationOptions: {
      title: 'Dashboard | ShipHype',
      headerShown: false,
      header:null,
      tabBarVisible :false
    },
  },

  NotificationSetting:{
    screen:Main,
    navigationOptions: {
      title: 'Dashboard | ShipHype',
      headerShown: false,
      header:null,
      tabBarVisible :false
    },
  },
  Square :{
    screen:Main,
    navigationOptions: {
      title: 'Dashboard | ShipHype',
      headerShown: false,
      header:null,
      tabBarVisible :false
    },
  },

  BillingSetting:{
    screen:Main,
    navigationOptions: {
      title: 'Dashboard | ShipHype',
      headerShown: false
    },
  },

  AddCredit: {
    screen: Main,
    navigationOptions: {
      title: "Dashboard | ShipHype",
      headerShown: false,
    },
  },

  TransactionHistory:{
    screen:Main,
    navigationOptions: {
      title: 'Dashboard | ShipHype',
      headerShown: false
    },
  }
},{
        initialRouteName: "PageLoader"
});

const AppContainer = isWeb ? createBrowserApp(AppNavigator) : createAppContainer(AppNavigator);
