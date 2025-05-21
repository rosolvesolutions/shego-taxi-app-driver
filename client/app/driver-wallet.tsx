import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DriverWallet() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>💳 Driver Wallet</Text>
      <Text style={styles.message}>Your wallet balance and payouts will appear here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F6FA',
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
