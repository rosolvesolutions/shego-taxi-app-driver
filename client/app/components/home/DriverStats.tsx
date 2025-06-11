import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MotiView } from 'moti';

export default function DriverStats() {
  const stats = [
    { label: 'Online', value: '🟢' },
    { label: 'Rating', value: '4.9⭐' },
    { label: 'Trips', value: '128' },
  ];

  return (
    <View style={styles.container}>
      {stats.map((stat, i) => (
        <MotiView
          from={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 100, type: 'timing' }}
          key={stat.label}
          style={styles.statBox}
        >
          <Text style={styles.value}>{stat.value}</Text>
          <Text style={styles.label}>{stat.label}</Text>
        </MotiView>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  statBox: {
    alignItems: 'center',
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#9E2A45',
  },
  label: {
    fontSize: 12,
    color: '#555',
  },
});
