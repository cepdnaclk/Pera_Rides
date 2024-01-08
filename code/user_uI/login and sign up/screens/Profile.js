import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const Money = () => {
  const [profileImage, setProfileImage] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userPassword, setUserPassword] = useState('');

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
        setProfileImage(response.uri);
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
      <TouchableOpacity onPress={openImageLibrary} style={styles.uploadBtnContainer}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={{ width: '100%', height: '100%' }} />
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

      <TouchableOpacity onPress={saveUserProfile} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Profile</Text>
      </TouchableOpacity>

      <Text style={styles.userDetails}>Name: {userName}</Text>
      <Text style={styles.userDetails}>Email: {userEmail}</Text>
      <Text style={styles.userDetails}>Phone: {userPhone}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  uploadBtnContainer: {
    height: 125,
    width: 125,
    borderRadius: 125 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 20,
  },
  uploadBtn: {
    textAlign: 'center',
    fontSize: 16,
    opacity: 0.3,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: '100%',
  },
  saveButton: {
    backgroundColor: 'green',
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
    fontSize: 18,
    marginVertical: 5,
  },
});

export default Money;
