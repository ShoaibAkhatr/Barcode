import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { useScanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner';
import axios from 'axios';
const Home = () => {
  const navigation = useNavigation()
  const [hasPermission, setHasPermission] = useState(null);
  const [scannedCode, setScannedCode] = useState(null);
  const [productInfo, setProductInfo] = useState(null);
  const devices = useCameraDevices();
  const device = devices.back;

  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13]);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
      if (status !== 'authorized') {
        Alert.alert(
          "Camera Permission Required",
          "Please grant camera access to scan barcodes.",
          [
            { text: "OK", onPress: () => requestCameraPermission() },
            { text: "Cancel", style: "cancel" }
          ]
        );
      
      }
    } catch (error) {
      console.error("Error requesting camera permission:", error);
      Alert.alert("Error", "Failed to request camera permission. Please try again.");
    }
  };

  useEffect(() => {
    if (barcodes.length > 0) {
      const barcodeData = barcodes[0].displayValue;
      setScannedCode(barcodes[0].displayValue);
      fetchProductInfo(barcodeData);
    }
  }, [barcodes]);

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>Camera permission denied. Please grant access in your device settings.</Text>
        <Button title="Request Permission Again" onPress={requestCameraPermission} />
      </View>
    );
  }

  if (!device) {
    return <Text>No camera available</Text>;
  }


  const fetchProductInfo = async (data) => {
    try {
      const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${data}.json`);
      if (response.data.status === 1) {
        setProductInfo(response.data.product);
        navigation.navigate('Nutration', { product: JSON.stringify(response.data.product) });
      } else {
        Alert.alert('Product not found');
      }
    } catch (error) {
      Alert.alert('Error fetching product information');
    }
  };


  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        frameProcessor={frameProcessor}
        frameProcessorFps={5}
      />
      {scannedCode && (
        <Text style={styles.scannedCodeText}>
          Scanned Code: {scannedCode}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannedCodeText: {
    position: 'absolute',
    bottom: 20,
    fontSize: 16,
    color: 'black',
    backgroundColor: 'white',
    padding: 10,
  },
});

export default Home;