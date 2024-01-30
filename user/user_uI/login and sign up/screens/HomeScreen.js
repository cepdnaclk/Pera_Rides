import "react-native-gesture-handler";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";

import Icon from "react-native-vector-icons/FontAwesome";
("react-native-vector-icons/MaterialIcons");

import COLORS from "../const/colors";
import stations from "../const/stations";
import { Dimensions } from "react-native";

import Settings from "./Settings";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useSelector } from "react-redux";
import Modal from "react-native-modal";
import IMAGE from "../assets/images/station1.png";

const width = Dimensions.get("screen").width / 2 - 30;

const Card = ({ station }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate("Details", station)}>
      <View style={styles.card}>
        <View style={{ alignItems: "flex-end" }}>
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 15,
              alignItems: "center",
              justifyContent: "center",
              /* backgroundColor: station.like
                : "rgba(245,42,42,0.2)"
                : "rgba(0,0,0,0.2)", */
            }}
          >
            <TouchableOpacity onPress={() => navigation.push("Map")}>
              <Icon
                name="compass"
                size={18}
                // color={station.like ? COLORS.green : COLORS.red}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 100, alignItems: "center" }}>
          <Image source={IMAGE} style={{ flex: 1, resizeMode: "contain" }} />
        </View>
        <Text style={{ fontWeight: "bold", fontSize: 17, marginTop: 10 }}>
          {station.name}
        </Text>
        <View
          style={{
            height: 25,
            width: 25,
            backgroundColor: COLORS.green,
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 100,
          }}
        >
          <Text
            style={{ fontSize: 22, color: COLORS.white, fontWeight: "bold" }}
          >
            <Icon name="terminal" size={18} />
          </Text>
        </View>
        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' ,marginTop:5,}}>

        </View> */}
        {/* Add other necessary fields from station data */}
      </View>
    </TouchableOpacity>
  );
};

export default function HomeScreen() {
  const navigation = useNavigation();
  const { user } = useSelector((store) => store.user);
  const { stationsArray, isStationsLoading, isStationsError } = useSelector(
    (store) => store.stations
  );

  // let isStationsLoading = false;
  // let isStationsError = true;

  const [selectedOption, setSelectedOption] = useState(null);

  const handleLogout = () => {
    // Perform any logout actions (e.g., clear user session, reset state, etc.)

    // Navigate to the login screen and prevent going back
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleLog = () => {
    // Perform any logout actions (e.g., clear user session, reset state, etc.)
    // Then navigate to the login screen and prevent going back
    Alert.alert("", "", [
      {
        text: "Profile",
        onPress: () => {
          navigation.push("Profile");
        },
      },
      {
        text: "Settings",
        onPress: () => {
          navigation.push("Settings");
        },
      },
      { text: "Log Out", onPress: handleLogout },
    ]);
    toggleModal();
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: COLORS.white,
      }}
    >
      <View style={styles.header}>
        <View>
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>Welcome to</Text>
          <Text
            style={{ fontSize: 38, color: COLORS.green, fontWeight: "bold" }}
          >
            Pera Ride
          </Text>

          <Text style={{ fontSize: 15, fontWeight: "bold", marginTop: 30 }}>
            Your Account balance : LKR {user.balance}{" "}
          </Text>
          <Text style={{ fontSize: 15, fontWeight: "bold", marginBottom: 20 }}>
            Fee per Ride : LKR 20.{" "}
          </Text>
          {/* <View className="flex items-center mx-10 space-y-20"> */}
          <TouchableOpacity
            className="w-full  p-2 rounded-xl mb-0.5"
            onPress={() => navigation.push("Map")}
          >
            <Text
              className=" w-full p-2 rounded-xl mb-3 text-xl font-bold text-white text-center"
              backgroundColor="#65B741"
            >
              Map Of Stations 🔍
            </Text>
          </TouchableOpacity>
        </View>
        {/* </View> */}
        <View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={() => navigation.push("QrScanner")}>
              <Icon name="qrcode" size={40} color="black" />
            </TouchableOpacity>
            <View style={{ width: 30 }} />

            <Modal isVisible={isModalVisible}>
              <View style={styles.modalContainer}>
                <Button
                  marginBottom="20"
                  title="Profile"
                  onPress={() => navigation.push("Profile")}
                />
                <Button
                  marginBottom="20"
                  title="Settings"
                  onPress={() => navigation.push("Settings")}
                />
                <Button
                  marginBottom="20"
                  title="Log Out"
                  onPress={handleLogout}
                />
                <Button marginBottom="20" title="Close" onPress={toggleModal} />
              </View>
            </Modal>

            <TouchableOpacity onPress={toggleModal}>
              <Icon name="user" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* ... Other components */}
      {isStationsLoading ? (
        <Text>Loading...</Text>
      ) : isStationsError && !isStationsLoading ? (
        <Text>Error Loading Stations. Try again</Text>
      ) : (
        <FlatList
          columnWrapperStyle={{ justifyContent: "space-between" }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: 10,
            paddingBottom: 50,
          }}
          numColumns={2}
          data={stationsArray}
          renderItem={({ item }) => {
            return <Card station={item} />;
          }}
          keyExtractor={(item) => item._id.toString()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 225,
    backgroundColor: COLORS.light,
    width,
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
  },
  header: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardText: {
    fontSize: 14,
    marginTop: 5,
    fontWeight: "bold",
  },
  searchContainer: {
    height: 50,
    backgroundColor: COLORS.red,
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    color: COLORS.dark,
  },
  sortBtn: {
    marginLeft: 10,
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: COLORS.green,
    justifyContent: "center",
    alignItems: "center",
  },
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // modalContainer: {
  //   backgroundColor: '#8fce00',
  //   padding: 20,
  //   justifyContent:'space-around',
  //   alignItems: 'center',
  //   marginBottom: 40,
  //   borderRadius: 8,
  //   borderColor: 'rgba(0, 0, 0, 0.1)',
  // },
});
