import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, TextInput, Animated, Easing } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const Money = () => {
  const [profileImage, setProfileImage] = useState(null); // Change the initial state to null
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [animatedValue] = useState(new Animated.Value(1));

  const navigation = useNavigation();

  const startAnimation = () => {
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 1.2,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const openImageLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
    }

    if (status === 'granted') {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });

      if (!response.cancelled) {
        const source = { uri: response.uri };
        setProfileImage(source);
      }
    }
  };

  const saveUserProfile = async () => {
    try {
      const userData = {
        name: userName,
        email: userEmail,
        phone: userPhone,
        password: userPassword,
        profileImage: profileImage,
      };
      // Send userData to your backend API to save/update the profile
      // Handle success and error cases accordingly
    } catch (error) {
      console.log(error.message);
      // Handle error scenarios
    }
  };

  return (
    <View style={styles.container}>
    <View style={styles.header}>
        <Icon name="arrow-back" size={28} onPress={() => navigation.goBack()} />
        {/* <Icon name="shopping-cart" size={28} /> */}
      </View>
      <LinearGradient
        colors={['#56CCF2', '#2F80ED']}
        style={styles.gradientBackground}
      >
        <TouchableOpacity onPress={openImageLibrary} style={styles.profileImageContainer}>
          {profileImage ? (
            <Image source={profileImage} style={styles.profileImage} />
          ) : (
            <Text style={styles.uploadBtn}>Upload a Profile Image</Text>
          )}
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Name"
          value={userName}
          onChangeText={text => setUserName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={userEmail}
          onChangeText={text => setUserEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={userPhone}
          onChangeText={text => setUserPhone(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={userPassword}
          onChangeText={text => setUserPassword(text)}
        />

        <TouchableOpacity
          onPress={() => {
            saveUserProfile();
            startAnimation();
          }}
          style={[styles.saveButton, { transform: [{ scale: animatedValue }] }]}
        >
          <Text style={styles.saveButtonText}>Save Profile</Text>
        </TouchableOpacity>

        <Text style={styles.userDetails}>Name: {userName}</Text>
        <Text style={styles.userDetails}>Email: {userEmail}</Text>
        <Text style={styles.userDetails}>Phone: {userPhone}</Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header:{
    alignContent: 'left',
    marginlerft: 10,
    marginright: 60,
    paddingHorizontal: 20,
  },
  gradientBackground: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  profileImageContainer: {
    height: 120,
    width: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 60,
  },
  uploadBtn: {
    textAlign: 'center',
    fontSize: 16,
    opacity: 0.6,
    fontWeight: 'bold',
    color: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: '100%',
    color: 'white',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  userDetails: {
    fontSize: 16,
    marginVertical: 5,
    color: 'white',
  },
});

export default Money;
