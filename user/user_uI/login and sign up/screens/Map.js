import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  Animated,
  Platform,
  Button,
  Alert,
  TextInput,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import apiConnection from "../apiConnection";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

// let locationOfInterest = [
//   {
//     title: "Station 1",
//     location: {
//       latitude: 7.251964,
//       longitude: 80.592484,
//     },
//     description: "This is a station 1 located in the Engineering faculty",
//   },
//   {
//     title: "Station 2",
//     location: {
//       latitude: 7.268174,
//       longitude: 80.606857,
//     },
//     description: "This is a station 2 located in the AHS faculty",
//   },
//   {
//     title: "Station 3",
//     location: {
//       latitude: 7.261838,
//       longitude: 80.595958,
//     },
//     description: "This is a station 3 located in the Agriculture faculty",
//   },
//   {
//     title: "Station 4",
//     location: {
//       latitude: 7.256064,
//       longitude: 80.596004,
//     },
//     description: "This is a station 4 located in the Wus Premises",
//   },
//   {
//     title: "Station 5",
//     location: {
//       latitude: 7.254817,
//       longitude: 80.598612,
//     },
//     description: "This is a station 5 located in the Art faculty",
//   },
//   {
//     title: "Station 6",
//     location: {
//       latitude: 7.263397,
//       longitude: 80.599084,
//     },
//     description: "This is a station 6 located in the Medicine faculty",
//   },
// ];

export default function Map() {
  const [mapData, setMapData] = useState([]);

  useEffect(() => {
    const getLocationStats = async () => {
      try {
        const response = await apiConnection.get("/map/data");
        setMapData(response.data);
      } catch (err) {
        Alert.alert("Details", err.response.data.message, [
          {
            text: "OK",
            onPress: () => {
              console.log("Details send");
            },
          },
        ]);
      }
    };

    getLocationStats();
  }, []);

  const onRegionChange = (region) => {
    console.log(region);
  };
  const showLocationsOfInterest = () => {
    return mapData?.map((oneMapData) => {
      return (
        <Marker
          key={oneMapData._id}
          coordinate={oneMapData.location}
          title={oneMapData.name}
          description={oneMapData.address}
        />
      );
    });
  };
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        onRegionChange={onRegionChange}
        initialRegion={{
          latitude: 7.252126935148212,
          latitudeDelta: 0.04871936632985818,
          longitude: 80.59851760044694,
          longitudeDelta: 0.03451164811849594,
        }}
      >
        {showLocationsOfInterest()}
      </MapView>
      <StatusBar style="auto"></StatusBar>
      {/* <Button
            title="Go to Details"
            onPress={() => navigation.navigate('Details')}
        /> */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
