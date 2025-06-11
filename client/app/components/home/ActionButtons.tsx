//import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function ActionButtons() {
  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
});
