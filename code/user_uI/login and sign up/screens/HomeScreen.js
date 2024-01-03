import { View, Text, Image, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
//import Icon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome'; // Or any other icon library you prefer
//import { TouchableOpacity } from 'react-native';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';


export default function HomeScreen() {
    const navigation = useNavigation();
  return (
    <View className="bg-white h-full w-full">
        <StatusBar style="light" />
        <Image className="h-full w-full absolute" source={require('../assets/images/back.png')} />

        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginRight: 0, marginTop: 40, }}>Welcome to</Text>
        {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>  */}
        <Animated.Text 
                    entering={FadeInUp.duration(1000).springify()}
                    
                    style={{
                    color: 'green',
                    fontWeight: 'bold',
                    fontSize: 25,
                    marginRight: 150,
                    marginTop: 10, // Adjust spacing between icon and text as needed
                    }}
                >
                    Pera Ride...
                    <TouchableOpacity onPress={()=> navigation.push('Notifications')}>
                        <Icon name="bell" size={30} color="white" />
                    </TouchableOpacity>
                    
        </Animated.Text>
        
       
        {/* </View> */}
        <Animated.Text 
                entering={FadeInUp.duration(2000).springify()} 
                style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 15,
                marginRight: 50, // Adjust spacing between icon and text as needed
                }}
            >
                Account balance: Rs 1000
        </Animated.Text>
        {/* title and form */}
        <View className="h-full w-full flex justify-around pt-0 pb-1">
            
            {/* title */}

            {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}> */}
     
{/*                 
                <Animated.Text 
                    entering={FadeInUp.duration(1000).springify()}
                     
                    style={{
                      color: 'green',
                      fontWeight: 'bold',
                      fontSize: 25,
                      marginRight: 150,
                      marginTop: 0, // Adjust spacing between icon and text as needed
                    }}
                  >
                     Pera Ride...
                  </Animated.Text> */}
                  
            {/* </View> */}
            {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Animated.Text 
                        entering={FadeInUp.duration(2000).springify()} 
                        style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 15,
                        marginRight: 50, // Adjust spacing between icon and text as needed
                        }}
                    >
                        Account balance: RS 1000
                </Animated.Text>
            </View>     */}


            {/* form */}
            <View className="flex items-center mx-5 space-y-4">
                <Animated.View 
                    entering={FadeInDown.duration(1000).springify()} 
                    className="bg-black/5 p-5 rounded-2xl w-full">

                    <TextInput
                        placeholder="User Name"
                        placeholderTextColor={'gray'}
                    />
                </Animated.View>
                <Animated.View 
                    entering={FadeInDown.delay(200).duration(1000).springify()} 
                    className="bg-black/5 p-5 rounded-2xl w-full mb-3">

                    <TextInput
                        placeholder="Password"
                        placeholderTextColor={'gray'}
                        secureTextEntry
                    />
                </Animated.View>

                <Animated.View 
                    className="w-full" 
                    entering={FadeInDown.delay(400).duration(1000).springify()}>

                    <TouchableOpacity className="w-full bg-sky-400 p-3 rounded-2xl mb-3">
                        <Text className="text-xl font-bold text-white text-center">Login</Text>
                    </TouchableOpacity>
                </Animated.View>

                <Animated.View 
                    entering={FadeInDown.delay(600).duration(1000).springify()} 
                    className="flex-row justify-center">

                    {/* <Text>Don't have an account? </Text> */}
                    <TouchableOpacity onPress={()=> navigation.push('Login')}>
                        <Text className="text-sky-600">SignUp</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </View>
     </View>
  )
}