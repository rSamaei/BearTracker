import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import * as Location from 'expo-location';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end', // Move content to the bottom
    paddingBottom: 36, // Add padding to the bottom
  },
  buttonContainer: {
    flex: 3, // 3/5 of space
    flexDirection: 'row', // Arrange buttons horizontally
    justifyContent: 'space-around', // Add space between buttons - space-between
    padding: 10,
    backgroundColor: '#eee', // Background color to make buttons stand out
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 50,
    marginVertical: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

// const App = () => {
//   const handleAddSightingPress = async () => {
//     try {
//       const response = await axios.post('http://127.0.0.1:5000/add_sighting', {
//         latitude: 40.7128,  
//         longitude: -74.0060,  
//       });
//       console.log(response.data.message);
//     } catch (error) {
//       console.error('Error calling add_sighting function:', error);
//     }
//   };

//   const handleNearestSightingPress = async () => {
//     try {
//       const response = await axios.get('http://127.0.0.1:5000/nearest_sighting', {
//         params: {
//           user_latitude: 40.7128,  // Replace with the actual user latitude
//           user_longitude: -74.0060,  // Replace with the actual user longitude
//         },
//       });
//       console.log(response.data);
//     } catch (error) {
//       console.error('Error calling nearest_sighting function:', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.button} onPress={handleAddSightingPress}>
//         <Text style={styles.buttonText}>Add Sighting</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.button} onPress={handleNearestSightingPress}>
//         <Text style={styles.buttonText}>Nearest Sighting</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

const App = () => {
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    // Get the current location when the component mounts
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestBackgroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Location permission not granted');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setCurrentLocation({ latitude, longitude });
    } catch (error) {
      console.error('Error getting current location:', error);
    }
  };

  const handleAddSightingPress = async () => {
    try {
      if (!currentLocation) {
        // If current location is not available, fetch it again
        await getCurrentLocation();
      }

      const { latitude, longitude } = currentLocation;

      const response = await axios.post('http://127.0.0.1:5000/add_sighting', {
        latitude,
        longitude,
      });

      console.log(response.data.message);
    } catch (error) {
      console.error('Error calling add_sighting function:', error);
    }
  };

  const handleNearestSightingPress = async () => {
    try {
      if (currentLocation == null) {
        // If current location is not available, fetch it again
        await getCurrentLocation();
      }

      const { latitude, longitude } = currentLocation;

      const response = await axios.post('http://127.0.0.1:5000/nearest_sighting', {
        latitude,
        longitude,
      });

      console.log(response.data.message);
    } catch (error) {
      console.error('Error calling nearest_sighting function:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleAddSightingPress}>
        <Text style={styles.buttonText}>Add Sighting</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleNearestSightingPress}>
        <Text style={styles.buttonText}>Nearest Sighting</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;
