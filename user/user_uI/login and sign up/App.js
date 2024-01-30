import * as React from "react";
// import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import HomeScreen from "./screens/HomeScreen";
import QrScanner from "./screens/QrScanner";
import Notifications from "./screens/Notifications";
import Settings from "./screens/Settings";
import Details from "./screens/Details";
import COLORS from "./const/colors";
import Homepage from "./screens/Homepage";
import Aboutus from "./screens/Aboutus";
import Money from "./screens/Money";
import Rateapp from "./screens/Rateapp";
import Profile from "./screens/Profile";
import OTPVerification from "./screens/OTPVerification";
import OTPsend from "./screens/OTPsend";
import Map from "./screens/Map";
import Subscription from "./screens/Subscription";
import { store, persistor } from "./Redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const Stack = createNativeStackNavigator();

function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Loging"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="QrScanner" component={QrScanner} />
            <Stack.Screen name="Notifications" component={Notifications} />
            <Stack.Screen name="Details" component={Details} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="Homepage" component={Homepage} />
            <Stack.Screen name="Aboutus" component={Aboutus} />
            <Stack.Screen name="Money" component={Money} />
            <Stack.Screen name="Rateapp" component={Rateapp} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="OTPVerification" component={OTPVerification} />
            <Stack.Screen name="OTPsend" component={OTPsend} />
            <Stack.Screen name="Map" component={Map} />
            <Stack.Screen name="Subscription" component={Subscription} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
