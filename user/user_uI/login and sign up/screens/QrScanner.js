import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";
import apiConnection from "../apiConnection";
import { useSelector } from "react-redux";

export default function QrScanner() {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = React.useState(false);
  const [scanData, setScanData] = React.useState();
  const { user } = useSelector((store) => store.user);
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text>Please grant camera permissions to app.</Text>
      </View>
    );
  }

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanData(data);
    console.log(`Data: ${data}`);
    console.log(`Type: ${type}`);

    // const qrValue = "edeefsf"; 

    

    // const userId = "your_user_id_here"; // Replace with the actual user ID
    // const qrValue = "your_qr_value_here"; // Replace with the actual QR value
    try {
      const response = await apiConnection.post("/user/qr/verify", {
        id: user._id,
        qr: data,
      });

      console.log(response.data); // Handle the response data here
    } catch (error) {
      console.error("Error:", error);
      // Handle errors here
    }
  };

  return (
    <View style={styles.container}>
      <BarCodeScanner
        style={StyleSheet.absoluteFillObject}
        onBarCodeScanned={scanData ? undefined : handleBarCodeScanned}
      />
      {scanData && (
        <Button title="Scan Again?" onPress={() => setScanData(undefined)} />
      )}
      <View style={{ width: 40 }} />
      {scanData && (
        <Button title="Go back?" onPress={() => navigation.goBack()} />
      )}

      <StatusBar style="inverted" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6fa8dc",
    alignItems: "center",
    justifyContent: "center",
  },
});
