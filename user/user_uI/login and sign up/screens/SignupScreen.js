import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image,Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import apiConnection from "../apiConnection";

export default function SignupScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [OTP, setOTP] = useState('');
  const [verifiedOtp, setVerifiedOtp] = useState(false);
  const [sendOtpActive, setSendOtpActive] = useState(false);
  const usernameRegX = /^\S+$/;
  const phoneRegX = /^\b0\d{9}\b/;
  const emailRegX = /^[a-zA-Z0-9._%+-]+@[^@\s]+\.pdn\.ac\.lk$/;

  const handleSendOtp = async () => {
    if(usernameRegX.test(username) && phoneRegX.test(phone) && emailRegX.test(email)){
      try{
        const response = await apiConnection.post('/user/generateOtp',{
          email,
        });
        console.log(response.data);
      }catch(error){
        console.error('Error:', error);
      }
      Alert.alert("Details","Check your email after sending OTP",[
      {text:"OK", onPress:()=>{console.log("OTP sent");}}
      ]);

    }else{
      Alert.alert("Details","username can't have white spaces or phone number is not valid or email must have pdn.ac.lk part",[
        {text:"OK", onPress:()=>{console.log("Details send");}}
        ]);
    }  

  }


const handleSignUp = async () => {
    try{
      const reponse = await apiConnection.post('/user/register',{
        username,
        email,
        phone,
        password,
      });
      Alert.alert("Details","Registration successfull",[
        {text:"OK", onPress:()=>{navigation.push('Login');}}
        // onPress={() => navigation.push('Homepage')}
        
        ]);
    }catch(error){
      Alert.alert("Details","registration failed. try again",[
        {text:"OK", onPress:()=>{console.log("Details send");}}
        ]);
      console.error('Error:', error);
    } 
}


const handleVerifyOtp = async () => {
  setVerifiedOtp(false);
  try{
    const response = await apiConnection.post('/user/verifyOTP',{
      otp:OTP,
    });
    setVerifiedOtp(true);
    Alert.alert("Details","OTP verification successfull",[
      {text:"OK", onPress:()=>{console.log("Details send");}}
      ]);
  }catch(error){
    setVerifiedOtp(false);  
    Alert.alert("Details","OTP verification failed. try again",[
      {text:"OK", onPress:()=>{console.log("Details send");}}
      ]);
    console.error('Error:', error);
  }

}

useEffect(()=>{
  if(username && email && phone && password){
    setSendOtpActive(true);
  }
  else{
    setSendOtpActive(false);
  }
}, [username, email, phone, password]);


  return (
    <View style={{ backgroundColor: 'white', height: '100%', width: '100%' }}>
      <StatusBar style="light" />
      <Image source={require('../assets/images/background.png')} style={{ position: 'absolute', height: '100%', width: '100%' }} />

      {/* bicycles */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', position: 'absolute', width: '100%' }}>
        <Animated.Image 
          style={{ height: 200, width: 250 }}
          source={require('../assets/images/bicycle2.png')} 
          entering={FadeInUp.delay(200).duration(1000).springify(3)} 
        />
      </View>

      {/* title and form */}
      <View style={{ flex: 1, justifyContent: 'space-around', paddingTop: 140 }}>
        {/* title */}
        <View style={{ alignItems: 'center' }}>
          <Animated.Text 
            style={{ color: 'white', fontWeight: 'bold', fontSize: 30 }}
            entering={FadeInUp.duration(1000).springify(3)}
          >
            Pera Ride    
          </Animated.Text>
        </View>

        {/* form */}
        <View style={{ marginHorizontal: 5, marginTop: 10 }}>
          <View   style={{
          backgroundColor: '#65B741', // Change the background color to green
          padding: 10,
          borderRadius: 20,
          width: '100%',
        }}
      >
            <TextInput
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              placeholderTextColor={'white'}
              // style={{ color: 'white' }}
            />
          </View>
          <View   style={{
          backgroundColor: '#65B741', // Change the background color to green
          padding: 10,
          marginTop: 10,
          borderRadius: 20,
          width: '100%',
        }}
      >
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              placeholderTextColor={'white'}
            />
          </View>
          <View  style={{
          backgroundColor: '#65B741', // Change the background color to green
          padding: 10,
          marginTop: 10,
          borderRadius: 20,
          width: '100%',
        }}
      >
            <TextInput
              placeholder="Phone number"
              value={phone}
              onChangeText={setPhone}
              placeholderTextColor={'white'}
            />
          </View>
          <View  style={{
          backgroundColor: '#65B741', // Change the background color to green
          padding: 10,
          marginTop: 10,
          marginBottom: 10,
          borderRadius: 20,
          width: '100%',
        }}
      >
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor={'white'}
            />
          </View>
          <Animated.View entering={FadeInDown.delay(800).duration(1000).springify()} style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginBottom:10 }}>
            <Text>Verifiy Your Account</Text>
            <TouchableOpacity disabled={!sendOtpActive} onPress={handleSendOtp} style={{ backgroundColor: sendOtpActive ? '#3D85C6' : "#999", padding: 9, borderRadius: 20 }}>
              <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: 15 }}>Send OTP</Text>
            </TouchableOpacity>

            {/* <Text>Check your email</Text> */}
          </Animated.View>

          <View style={{ backgroundColor: '#65B741', padding: 10, borderRadius: 20, marginBottom: 10 }}>
            <TextInput
              placeholder="Type OTP Here"
              value={OTP}
              onChangeText={setOTP}
              placeholderTextColor={'white'}
            />
          </View>

          <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()}>
          <TouchableOpacity onPress={handleVerifyOtp} style={{ backgroundColor: '#3D85C6', padding: 10, borderRadius: 20, marginBottom: 10, marginLeft:40,marginRight:40 }}>
              <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: 15 }}>Verify OTP</Text>
            </TouchableOpacity>
            <TouchableOpacity disabled={!verifiedOtp} onPress={() => handleSignUp()} style={{ backgroundColor: verifiedOtp ?'#3D85C6' : "#999", padding: 10, borderRadius: 20, marginBottom: 10 ,marginLeft:40 ,marginRight:40 }}>
              <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: 20 }}>SignUp</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(800).duration(1000).springify()} style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.push('Homepage')}>
              <Text style={{ color: '#4ECDC4' }}>Login</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </View>
  );
}
