import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function Header() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Welcome back,</Text>
        <Text style={styles.name}>Aisha</Text>
      </View>
      <Image
        source={{ uri: 'https://i.pravatar.cc/100?img=5' }}
        style={styles.avatar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 14,
    color: '#777',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#9E2A45',
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
});
