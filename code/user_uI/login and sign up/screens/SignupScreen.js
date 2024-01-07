import { View, Text, Image, SafeAreaView, TextInput, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';


export default function SignupScreen() {
    const navigation = useNavigation();
  return (
    <View className="bg-white h-full w-full">
      <StatusBar style="light" />
      <Image className="h-full w-full absolute" source={require('../assets/images/background.png')} />

      {/* bicycles */}
      <View className="flex-row justify-around w-full absolute">
        <Animated.Image 
            entering={FadeInUp.delay(200).duration(1000).springify(3)} 
            source={require('../assets/images/bicycle2.png')} 
            className="h-[200] w-[250]"
        />
        {/* <Animated.Image 
            entering={FadeInUp.delay(400).duration(1000).springify()} 
            source={require('../assets/images/light.png')} 
            className="h-[160] w-[65] opacity-75" 
        /> */}
      </View>

      {/* title and form */}
      <View  className="h-full w-full flex justify-around pt-48">
        
        {/* title */}
        <View className="flex items-center">
            <Animated.Text 
                entering={FadeInUp.duration(1000).springify(3)} 
                className="text-white font-bold tracking-wider text-5xl">
                Pera Ride    
            </Animated.Text>
        </View>

        {/* form */}
        <View className="flex items-center mx-5 space-y-1">
            <Animated.View 
                entering={FadeInDown.duration(1000).springify().springify(3)}   
                className="bg-black/5 p-5 rounded-2xl w-full">
                <TextInput
                    placeholder="Username"
                    placeholderTextColor={'black'}
                />
            </Animated.View>
            <Animated.View 
                entering={FadeInDown.delay(200).duration(1000).springify()} 
                className="bg-black/5 p-5 rounded-2xl w-full">
                <TextInput
                    placeholder="Email"
                    placeholderTextColor={'gray'}
                />   
            </Animated.View>
            
            
            <Animated.View 
                entering={FadeInDown.delay(400).duration(1000).springify()} 
                className="bg-black/5 p-5 rounded-2xl w-full mb-3">
                <TextInput
                    placeholder="Phone number"
                    placeholderTextColor={'gray'}
                    secureTextEntry
                />
            </Animated.View>
            <Animated.View 
                entering={FadeInDown.delay(600).duration(1000).springify()} 
                className="bg-black/5 p-5 rounded-2xl w-full mb-3">
                <TextInput
                    placeholder="Password"
                    placeholderTextColor={'gray'}
                    secureTextEntry
                />
            </Animated.View>

            <Animated.View className="w-full" entering={FadeInDown.delay(600).duration(1000).springify()}>
                <TouchableOpacity className="w-full bg-sky-400 p-3 rounded-2xl mb-3">
                    <Text className="text-xl font-bold text-white text-center">SignUp</Text>
                </TouchableOpacity>
            </Animated.View>

            <Animated.View 
                entering={FadeInDown.delay(800).duration(1000).springify()} 
                className="flex-row justify-center">

                <Text>Already have an account? </Text>
                <TouchableOpacity onPress={()=> navigation.push('Homepage')}>
                    <Text className="text-sky-600">Login</Text>
                </TouchableOpacity>

            </Animated.View>
        </View>
      </View>
    </View>
  )
}