import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DriverTrips() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🚗 Your trips will show up here!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF0F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
});
