import {
  View,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";
import apiConnection from "../apiConnection";
import { useDispatch } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../Redux/features/user/userSlice";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async () => {
    dispatch(loginStart());
    try {
      const response = await apiConnection.post("/user/login", {
        username,
        password,
      });
      console.log(response.data);
      dispatch(loginSuccess(response.data));
      Alert.alert("Details", "login successfull", [
        {
          text: "OK",
          onPress: () => {
            console.log("Details send");
          },
        },
      ]);
      navigation.navigate("Homepage");
    } catch (error) {
      dispatch(loginFailure(err));
      Alert.alert(
        "Details",
        "login failed. check username and password and try again",
        [
          {
            text: "OK",
            onPress: () => {
              console.log("Details send");
            },
          },
        ]
      );
      console.error("Error:", error);
    }
  };

  return (
    <View className="bg-white h-full w-full">
      <StatusBar style="light" />
      <Image
        className="h-full w-full absolute"
        source={require("../assets/images/background.png")}
      />

      {/* lights */}
      <View className="flex-row justify-around w-full absolute">
        <Animated.Image
          entering={FadeInUp.delay(200).duration(1000).springify()}
          source={require("../assets/images/bicycle2.png")}
          className="h-[200] w-[250]"
        />
        {/* <Animated.Image 
                entering={FadeInUp.delay(400).duration(1000).springify()} 
                source={require('../assets/images/bicycle.png')} 
                className="h-[160] w-[65] opacity-75" 
            /> */}
      </View>

      {/* title and form */}
      <View className="h-full w-full flex justify-around pt-40 pb-10">
        {/* title */}
        <View className="flex items-center">
          <Animated.Text
            entering={FadeInUp.duration(1000).springify()}
            className="text-white font-bold tracking-wider text-5xl"
          >
            Pera Ride
          </Animated.Text>
        </View>

        {/* form */}
        <View className="flex items-center mx-5 space-y-4">
          <Animated.View
            entering={FadeInDown.duration(1000).springify()}
            style={{
              backgroundColor: "#65B741", // Change the background color to green
              padding: 20,
              borderRadius: 20,
              width: "100%",
            }}
          >
            <TextInput
              placeholder="User Name"
              placeholderTextColor={"white"}
              value={username}
              onChangeText={setUsername}
            />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(200).duration(1000).springify()}
            style={{
              backgroundColor: "#65B741", // Change the background color to green
              padding: 20,
              borderRadius: 20,
              marginBottom: 30,
              width: "100%",
            }}
          >
            <TextInput
              placeholder="Password"
              placeholderTextColor={"white"}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </Animated.View>

          <Animated.View
            className="w-full"
            entering={FadeInDown.delay(400).duration(1000).springify()}
          >
            <TouchableOpacity
              onPress={handleLogin}
              className="w-full bg-sky-400 p-3 rounded-2xl mb-3"
            >
              <Text className="text-xl font-bold text-white text-center">
                Login
              </Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(600).duration(1000).springify()}
            className="flex-row justify-center"
          >
            <Text>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.push("Signup")}>
              <Text className="text-sky-600">SignUp</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </View>
  );
}
