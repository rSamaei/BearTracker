import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import * as Location from 'expo-location';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 36,
  },
  buttonContainer: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#eee',
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
  image: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    marginBottom: 150,
    marginLeft: 90,
  },
});

const bearImage = require('./bear.png');

const App = () => {
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
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
        await getCurrentLocation();
      }

      const { latitude, longitude } = currentLocation;

      const response = await axios.get('http://127.0.0.1:5000/nearest_sighting', {
        params: {
          latitude,
          longitude,
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error('Error calling nearest_sighting function:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={bearImage} style={styles.image} />

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
