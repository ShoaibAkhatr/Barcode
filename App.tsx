import { View, Text } from 'react-native'
import React from 'react'
import StackNavigation from './src/StackNavigation'

const App = () => {
  return (
   <StackNavigation/>
  )
}

export default App





























// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, Button, ActivityIndicator } from 'react-native';
// import { useCameraDevices } from 'react-native-vision-camera';
// import { Camera } from 'react-native-vision-camera';
// import { useScanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner';

// const Home = () => {
//   const [hasPermission, setHasPermission] = useState(false);
//   const [scannerActive, setScannerActive] = useState(false);
//   const [deviceRetryCount, setDeviceRetryCount] = useState(0);
  
//   const devices = useCameraDevices();
//   const device = devices.back;

//   const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
//     checkInverted: true,
//   });

//   useEffect(() => {
//     (async () => {
//       const status = await Camera.requestCameraPermission();
//       console.log('Camera Permission Status:', status); 
//       setHasPermission(status === 'authorized');
//     })();
//   }, []);

//   useEffect(() => {
//     if (!device && deviceRetryCount < 5) {
//       console.log(`Device not found, retrying... (${deviceRetryCount + 1}/5)`);
//       setTimeout(() => setDeviceRetryCount((count) => count + 1), 1000); // Retry after 1 second
//     } else if (device) {
//       console.log('Camera Device Loaded:', device);
//     } else {
//       console.log('Failed to load the camera device after 5 retries.');
//     }
//   }, [device, deviceRetryCount]);

//   const startScanner = () => {
//     console.log('Start Scanner Button Pressed'); 
//     if (device) {
//       setScannerActive(true);
//     } else {
//       console.log('No camera device found. Retrying...');
//     }
//   };

//   if (!hasPermission) {
//     return (
//       <View style={styles.container}>
//         <Text>Requesting camera permission...</Text>
//       </View>
//     );
//   }

//   if (!device && deviceRetryCount >= 5) {
//     return (
//       <View style={styles.container}>
//         <Text>Failed to load the camera device.</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {scannerActive && device && hasPermission ? (
//         <>
//           <Camera
//             style={StyleSheet.absoluteFill}
//             device={device}
//             isActive={true}
//             frameProcessor={frameProcessor}
//             frameProcessorFps={5}
//           />
//           {barcodes.map((barcode, idx) => (
//             <Text key={idx} style={styles.barcodeTextURL}>
//               {barcode.displayValue}
//             </Text>
//           ))}
//         </>
//       ) : (
//         <>
//           <Button title="Start Barcode Scanner" onPress={startScanner} />
//           {!device && <ActivityIndicator size="large" color="#0000ff" />}
//         </>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   barcodeTextURL: {
//     fontSize: 20,
//     color: 'white',
//     fontWeight: 'bold',
//     marginTop: 20,
//   },
// });

// export default Home;
