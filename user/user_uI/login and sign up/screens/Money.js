import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import apiConnection from "../apiConnection";
import { useSelector } from "react-redux";

const Money = (props) => {

  
  const { user } = useSelector((store) => store.user);
  const [profileImage, setProfileImage] = useState("");

  const openImageLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }

    if (status === "granted") {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });

      if (!response.cancelled) {
        const imageUri = response.uri || (response.assets && response.assets[0]?.uri);
        if (imageUri) {
          setProfileImage(imageUri);
          console.log(imageUri);
        }
      }
    }
  };

  const convertImageToBase64 = async (imageUri) => {
    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(",")[1]);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const uploadProfileImage = async () => {
    if (!profileImage) {
      alert("Please select an image first.");
      return;
    }

    const base64Image = await convertImageToBase64(profileImage);

    const userId = user._id;

    // Get the image format from the base64 string
    const formatMatch = base64Image.match(/^data:(image\/[a-zA-Z+]+);base64,/);
    const imageFormat = formatMatch ? formatMatch[1] : "image/jpeg"; // Default to JPEG if not detected

    // Construct the data URL with the corresponding format
    const image = `data:${imageFormat};base64,${base64Image}`;


    try {
      const response = await apiConnection.post("/user/newslip", { userId, image });
      Alert.alert("Details", response.data, [
        {
          text: "OK",
          onPress: () => {
            console.log("Details send");
          },
        },
      ]);
      setProfileImage("");
      // if (res.data.success) {
      //   props.navigation.dispatch(StackActions.replace("UserProfile"));
      // }
    } catch (error) {
      console.log(error.response.data.error);
      Alert.alert("Details", error.response.data.error, [
        {
          text: "OK",
          onPress: () => {
            console.log("Details send");
          },
        },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          onPress={openImageLibrary}
          style={styles.uploadBtnContainer}
        >
          {profileImage ? (
            <Image
              source={{ uri: profileImage }}
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <Text style={styles.uploadBtn}>Upload a bank slip Image</Text>
          )}
        </TouchableOpacity>
        <Text style={styles.skip}>Skip</Text>
        <Text
          onPress={uploadProfileImage}
          style={[
            styles.skip,
            { backgroundColor: "green", color: "white", borderRadius: 8 },
          ]}
        >
          Upload
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  uploadBtnContainer: {
    height: 100,
    width: 100,
    borderRadius: 125 / 2,
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "dashed",
    borderWidth: 1,
    overflow: "hidden",
  },
  uploadBtn: {
    textAlign: "center",
    fontSize: 16,
    opacity: 0.3,
    fontWeight: "bold",
  },
  skip: {
    textAlign: "center",
    padding: 10,
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 2,
    opacity: 0.5,
  },
});

export default Money;
