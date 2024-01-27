import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, Image,TextInput,TouchableOpacity, FlatList, StyleSheet,SafeAreaView} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Money() {
  return (
    <SafeAreaView style={{flex: 1, justifyContent:'center',alignItems:'center'}}>
      {/* <TouchableOpacity onPress={() => openGallery()} > */}
    <View style={{flex: 1, alignItems: "center", justifyContent: "center"}} >
      <Text>Notifications</Text>
    </View>
    </SafeAreaView>
  )
}