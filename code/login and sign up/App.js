
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import Homepage from './screens/Homepage';



const Stack = createNativeStackNavigator();
//const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Loging' screenOptions={{headerShown: false}}> 
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="HomePage" component={Homepage} />
      </Stack.Navigator>
    </NavigationContainer> 
  );
}

