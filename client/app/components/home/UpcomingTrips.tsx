import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function UpcomingTrips() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upcoming Trip</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Pickup: </Text>
        <Text style={styles.value}>CBD - Kenyatta Avenue</Text>
        <Text style={styles.label}>Time: </Text>
        <Text style={styles.value}>2:30 PM</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 24 },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    elevation: 2,
  },
  label: {
    fontSize: 13,
    color: '#777',
    marginTop: 6,
  },
  value: {
    fontSize: 14,
    color: '#333',
  },
});
