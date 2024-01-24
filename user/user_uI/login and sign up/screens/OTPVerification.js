import { View, Text, Image, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';


export default function OTPVerification () {
    const navigation = useNavigation();
    const [otp, setOtp] = useState('');
    const handleVerification = async () => {
        try {
          const response = await fetch('http://192.168.8.160:5000/api/user/verifyOTP', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              otp,
            }),
          });
      
          if (!response.ok) {
             navigation.push('Homepage');
            throw new Error('Otp is Wrong');
          }else{
          navigation.push('Homepage');

          }

      
          const data = await response.json();

        } catch (error) {
          console.error('Error:', error);
          // Handle errors here
        }
      };
      
    
  return (
    <View className="bg-white h-full w-full">
        <StatusBar style="light" />
        <Image className="h-full w-full absolute" source={require('../assets/images/background.png')} />

        {/* lights */}
        <View className="flex-row justify-around w-full absolute">
            <Animated.Image 
                entering={FadeInUp.delay(200).duration(1000).springify()} 
                source={require('../assets/images/bicycle2.png')} 
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
                    className="text-white font-bold tracking-wider text-5xl">
                     OTP Verification
                </Animated.Text>
            </View>

            {/* form */}
            <View className="flex items-center mx-5 space-y-4">
                {/* <Animated.View 
                    entering={FadeInDown.duration(1000).springify()} 
                    className="bg-black/5 p-5 rounded-2xl w-full">

                    <TextInput
                        placeholder="User Name"
                        placeholderTextColor={'gray'}
                    />
                </Animated.View> */}
                <Animated.View 
                    entering={FadeInDown.delay(200).duration(1000).springify()} 
                    className="bg-black/5 p-5 rounded-2xl w-full mb-3">

                <TextInput
              placeholder="Enter OTP"
              placeholderTextColor={'gray'}
              value={otp}
              onChangeText={setOtp}
            />
                </Animated.View>

                <Animated.View 
                    className="w-full" 
                    entering={FadeInDown.delay(400).duration(1000).springify()}>

                    <TouchableOpacity onPress={handleVerification} className="w-full bg-sky-400 p-3 rounded-2xl mb-3">
                        <Text className="text-xl font-bold text-white text-center">Submit</Text>
                    </TouchableOpacity>
                </Animated.View>

                <Animated.View 
                    entering={FadeInDown.delay(600).duration(1000).springify()} 
                    className="flex-row justify-center">

                    <Text>Don't recived OTP yet? </Text>
                    <TouchableOpacity onPress={()=> navigation.push('Homepage')}>
                        <Text className="text-sky-600">Send againg OTP</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </View>
    </View>
  )
}
