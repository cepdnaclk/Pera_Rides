import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';


export default function QrScanner() {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = React.useState(false);
  const [scanData, setScanData] = React.useState();

  useEffect(() => {
    (async() => {
      const {status} = await BarCodeScanner.requestPermissionsAsync();
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

  const handleBarCodeScanned = ({type, data}) => {
    setScanData(data);
    console.log(`Data: ${data}`);
    console.log(`Type: ${type}`);
  };

  return (
    <View style={styles.container}>
      <BarCodeScanner 
        style={StyleSheet.absoluteFillObject}
        onBarCodeScanned={scanData ? undefined : handleBarCodeScanned}
        />
      {scanData && <Button title='Scan Again?' onPress={() => setScanData(undefined)} />}
      <View style={{ width: 40 }} />
      {scanData && <Button title='Go back?' onPress={() => navigation.goBack()} />}

      <StatusBar style="inverted" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6fa8dc',
    alignItems: 'center',
    justifyContent: 'center',
  },
});