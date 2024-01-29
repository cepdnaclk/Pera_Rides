import { View, Text, Image, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';


export default function OTPsend () {
    const navigation = useNavigation();
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
          
        </View>

        {/* title and form */}
        <View className="h-full w-full flex justify-around pt-10 pb-10">
            
            {/* title */}
            <View className="flex items-center">
                <Animated.Text 
                    entering={FadeInUp.duration(1000).springify()} 
                    className="text-white font-bold tracking-wider text-5xl">
                        Pera Ride
                      {/* Send OTP to your email */}
                </Animated.Text>
            </View>

            {/* form */}
            <View className="flex items-center mx-8 space-y-4">
            <View className="flex items-center">
                <Animated.Text 
                    entering={FadeInUp.duration(1000).springify()} 
                    className="text-black font-bold tracking-wider text-3xl">
                      Send OTP to your email
                </Animated.Text>
            </View>

              

                <Animated.View 
                    className="w-full" 
                    entering={FadeInDown.delay(400).duration(1000).springify()}>

                    <TouchableOpacity onPress={()=> navigation.push('OTPVerification')} className="w-full bg-sky-400 p-3 rounded-2xl mb-3">
                        <Text className="text-xl font-bold text-white text-center">Send</Text>
                    </TouchableOpacity>
                </Animated.View>

                <Animated.View 
                    entering={FadeInDown.delay(600).duration(1000).springify()} 
                    className="flex-row justify-center">

                </Animated.View>
            </View>
        </View>
    </View>
  )
}
