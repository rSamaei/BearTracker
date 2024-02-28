import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center', // Align items vertically at the beginning and the end
    flexDirection: 'row', // Horizontal layout
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    flex: 2, // Equal flex to distribute space evenly
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});


const App = () => {
  const handleButton1Press = () => {
    // Handle button 1 press action
    console.log('Button 1 Pressed');
  };

  const handleButton2Press = () => {
    // Handle button 2 press action
    console.log('Button 2 Pressed');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleButton1Press}>
        <Text style={styles.buttonText}>Button 1</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleButton2Press}>
        <Text style={styles.buttonText}>Button 2</Text>
      </TouchableOpacity>
    </View>
  );
}

export default App;
//export {
//  SectionListBasics,
//  Cat,
//}

/* export default SectionListBasics; */
/* export Cat; */