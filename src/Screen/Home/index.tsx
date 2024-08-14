// import { View, Text, StyleSheet, Alert } from 'react-native';
// import React, { useState, useEffect } from 'react';
// import { useCameraDevice, useCameraPermission, Camera, useCodeScanner } from 'react-native-vision-camera';
// import axios from 'axios';
// import { useNavigation } from '@react-navigation/native';

// const Home = () => {
//   const navigation = useNavigation();
//   const { hasPermission, requestPermission } = useCameraPermission();
//   const device = useCameraDevice('back'); // Prefer 'back' camera

//   const [scannedCode, setScannedCode] = useState(null);
//   const [isLoading, setLoading] = useState(false);
//   const [productInfo, setProductInfo] = useState(null);
//   const [error, setError] = useState(null); // Track errors for better handling

//   const codeScanner = useCodeScanner({
//     barcodeScannerSettings={{
//       barcodeTypes: [BarCodeScanner.Constants.BarCodeType.ean13],
//     }}
//     onCodeScanned: async (codes) => {
//       const { data } = codes[0]; // Access data from the first scanned code

//       console.log('Scanned barcode data:', data);
//       setScannedCode(data); // Store scanned data for potential later use

//       Alert.alert('Scanned Code', data, [
//         { text: 'OK', onPress: () => console.log('OK Pressed') }, // Handle OK button press (optional)
//       ]);

//       try {
//         setLoading(true); // Set loading state for UI feedback
//         const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${data}.json`);

//         if (response.data.status === 1) {
//           setProductInfo(response.data.product);
//           navigation.navigate('DataScreen', { product: JSON.stringify(response.data.product) });
//         } else {
//           setError('Product not found');
//         }
//       } catch (error) {
//         console.error('Error fetching product information:', error);
//         setError('Error fetching product information');
//       } finally {
//         setLoading(false); // Reset loading state after API call
//       }
//     },
//   });

//   useEffect(() => {
//     requestPermission(); // Request camera permission on component mount
//   }, []);

//   if (!hasPermission) {
//     return (
//       <View style={{ flex: 1 }}>
//         <Text>Requesting camera permission...</Text>
//       </View>
//     );
//   }

//   if (device == null) {
//     return (
//       <View style={{ flex: 1 }}>
//         <Text>No camera available</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={{ flex: 1 }}>
//       <Camera style={StyleSheet.absoluteFill} device={device} isActive={true}  
      
//         />
//       {isLoading && <Text>Loading product information...</Text>}
//       {error && <Text style={{ flex: 1 }}>{error}</Text>}
//     </View>
//   );
// };

// export default Home;









import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useCameraDevice, useCameraPermission, Camera, useCodeScanner } from 'react-native-vision-camera';

const Home = () => {
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back'); // Prefer 'back' camera

  const [scannedCode, setScannedCode] = useState(null);
const [scanning,setScanning] = useState(false)
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean13'], // Specify desired barcode types
    onBarcodesDetected: (codes) => {
      const { data } = codes[0]; // Access data from the first scanned code
      setScannedCode(data);
    },
  });

  useEffect(() => {
    requestPermission(); // Request camera permission on component mount
  }, []);

  if (!hasPermission) {
    return <Text>Requesting camera permission...</Text>;
  }

  if (device == null) {
    return <Text>No camera available</Text>;
  }

  return (
    <View style={styles.container}>
      <Button title="Scan Barcode" onPress={() => setScanning(true)} />
      {scanning && (
        <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} {...codeScanner} />
      )}
      {scannedCode && <Text>Scanned Code: {scannedCode}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
