import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DriverProfile() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>👤 Driver Profile</Text>
      <Text style={styles.message}>View and edit your profile, documents, and settings.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF3F3',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#9E2A45',
    marginBottom: 10,
  },
  message: {
    fontSize: 15,
    color: '#444',
    textAlign: 'center',
  },
});
