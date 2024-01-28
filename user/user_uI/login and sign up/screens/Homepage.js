import 'react-native-gesture-handler';
import { View, Text, } from 'react-native';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import Settings from './Settings';
import Rateapp from './Rateapp';
import Aboutus from './Aboutus';
import Notification from './Notifications';
import Money from './Money';
import Profile from './Profile';
import Login from './LoginScreen';
import Subscription from './Subscription';


// ara siyallam meke uda tynnee

const Drawer = createDrawerNavigator();

export default function Homepage() {
  return (
    
  
    <Drawer.Navigator initialRouteName='Home'>
    <Drawer.Screen name="Home" component={HomeScreen} />
    <Drawer.Screen name="Payments" component={Money} />
    <Drawer.Screen name="Setting" component={Settings} />
    <Drawer.Screen name="Profile" component={Profile} />
    <Drawer.Screen name="Notifications" component={Notification} />
    <Drawer.Screen name="About us" component={Aboutus} />
    <Drawer.Screen name="Rateapp" component={Rateapp} />
    {/* <Drawer.Screen name="Logout" component={Login} /> */}

  </Drawer.Navigator>

  );
}