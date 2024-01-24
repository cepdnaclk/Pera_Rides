
// import { View, Text, Image, SafeAreaView, TextInput, TouchableOpacity, Pressable } from 'react-native'
// import React from 'react'
// import { StatusBar } from 'expo-status-bar'
// import { useNavigation } from '@react-navigation/native'
// import { createSlice, configureStore } from '@reduxjs/toolkit'
// import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';

// // Other necessary imports...

// export default function SignupScreen() {
//     const navigation = useNavigation();
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [password, setPassword] = useState('');



//   return (
//     <View style={{ flex: 1 }}>
//       <Image source={require('../assets/images/background.png')} style={{ position: 'absolute', height: '100%', width: '100%' }} />

//       <View style={{ flexDirection: 'row', justifyContent: 'space-around', position: 'absolute', width: '100%' }}>
//         <Image
//           source={require('../assets/images/bicycle2.png')}
//           style={{ height: 200, width: 250 }}
//         />
//         {/* Add other Image component here */}
//       </View>

//       <View style={{ flex: 1, justifyContent: 'space-around', paddingTop: 48 }}>
//         <View style={{ alignItems: 'center' }}>
//           <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 30 }}>Pera Ride</Text>
//         </View>

//         <View style={{ marginHorizontal: 5, marginTop: 10 }}>
//           <View style={{ backgroundColor: 'rgba(0,0,0,0.05)', padding: 10, borderRadius: 20, marginBottom: 10 }}>
//             <TextInput
//               placeholder="Username"
//               value={username}
//               onChangeText={setUsername}
//               style={{ color: 'black' }}
//             />
//           </View>
//           <View style={{ backgroundColor: 'rgba(0,0,0,0.05)', padding: 10, borderRadius: 20, marginBottom: 10 }}>
//             <TextInput
//               placeholder="Email"
//               value={email}
//               onChangeText={setEmail}
//               style={{ color: 'gray' }}
//             />
//           </View>
//           <View style={{ backgroundColor: 'rgba(0,0,0,0.05)', padding: 10, borderRadius: 20, marginBottom: 10 }}>
//             <TextInput
//               placeholder="Phone number"
//               value={phone}
//               onChangeText={setPhone}
//               style={{ color: 'gray' }}
//             />
//           </View>
//           <View style={{ backgroundColor: 'rgba(0,0,0,0.05)', padding: 10, borderRadius: 20, marginBottom: 10 }}>
//             <TextInput
//               placeholder="Password"
//               value={password}
//               onChangeText={setPassword}
//               secureTextEntry
//               style={{ color: 'gray' }}
//             />
//           </View>

//           <TouchableOpacity onPress={handleSignUp} style={{ backgroundColor: '#4ECDC4', padding: 10, borderRadius: 20, marginBottom: 10 }}>
//             <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>SignUp</Text>
//           </TouchableOpacity>

//           <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
//             <Text>Already have an account? </Text>
//             <TouchableOpacity onPress={() => navigation.push('OTPsend')}>
//               <Text style={{ color: '#4ECDC4' }}>Login</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// }







import axios from 'axios';
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image,Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';

export default function SignupScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [OTP, setOTP] = useState('');

  const pressHandler = () => {
    onPress=()=>console.log("success")
    // onPress=()=>navigation.push('OTPVerification')
    Alert.alert("Details","Check your email after sending OTP",[
    {text:"OK", onPress:()=>{console.log("OTP sent");
                  //  navigation.push('OTPVerification');
                   
                  }
                },

    // {text:"Resend OTP", onPress: ()=>navigation.push('OTPVerification')},
  
    ]);
  }


const handleSignUp = async () => {
  try {
    const response = await fetch('http://192.168.8.160:5000/api/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        phone,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log(data); // Handle the response from the server
    // Optionally, you can navigate to the next screen or handle success here
  } catch (error) {
    console.error('Error:', error);
    // Handle errors here
  }
};


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
      <View style={{ flex: 1, justifyContent: 'space-around', paddingTop: 100 }}>
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
          <View style={{ backgroundColor: 'rgba(0,0,0,0.05)', padding: 10, borderRadius: 20, marginBottom: 10 }}>
            <TextInput
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              style={{ color: 'black' }}
            />
          </View>
          <View style={{ backgroundColor: 'rgba(0,0,0,0.05)', padding: 10, borderRadius: 20, marginBottom: 10 }}>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={{ color: 'gray' }}
            />
          </View>
          <View style={{ backgroundColor: 'rgba(0,0,0,0.05)', padding: 10, borderRadius: 20, marginBottom: 10 }}>
            <TextInput
              placeholder="Phone number"
              value={phone}
              onChangeText={setPhone}
              style={{ color: 'gray' }}
            />
          </View>
          <View style={{ backgroundColor: 'rgba(0,0,0,0.05)', padding: 10, borderRadius: 20, marginBottom: 10 }}>
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={{ color: 'gray' }}
            />
          </View>
          <Animated.View entering={FadeInDown.delay(800).duration(1000).springify()} style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <Text>Verifiy Your Account</Text>
            <TouchableOpacity onPress={() => { pressHandler(); console.log("OTP sent"); }} style={{ backgroundColor: '#3D85C6', padding: 9, borderRadius: 20, marginBottom: 10 }}>
              <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: 10 }}>Send OTP</Text>
            </TouchableOpacity>

            {/* <Text>Check your email</Text> */}
          </Animated.View>

          <View style={{ backgroundColor: 'rgba(0,0,0,0.05)', padding: 10, borderRadius: 20, marginBottom: 10 }}>
            <TextInput
              placeholder="Type OTP Here"
              value={OTP}
              onChangeText={setOTP}
              style={{ color: 'gray' }}
            />
          </View>

          <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()}>
            <TouchableOpacity onPress={() => handleSignUp()} style={{ backgroundColor: '#3D85C6', padding: 10, borderRadius: 20, marginBottom: 10 }}>
              <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: 20 }}>SignUp</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(800).duration(1000).springify()} style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.push('OTPVerification')}>
              <Text style={{ color: '#4ECDC4' }}>Login</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </View>
  );
}
