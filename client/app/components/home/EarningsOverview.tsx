import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MotiView, MotiText } from 'moti';

export default function EarningsOverview() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Earnings</Text>
      <View style={styles.earningsRow}>
        <Earning label="Today" value="€72" delay={100} />
        <Earning label="This Week" value="€430" delay={300} />
      </View>
    </View>
  );
}

function Earning({
  label,
  value,
  delay,
}: {
  label: string;
  value: string;
  delay?: number;
}) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: -10 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 500, delay }}
      style={styles.earningBox}
    >
      <MotiText
        from={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: 'timing', duration: 400 }}
        style={styles.value}
      >
        {value}
      </MotiText>
      <Text style={styles.label}>{label}</Text>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF0F3',
    padding: 16,
    borderRadius: 14,
    marginBottom: 24,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 12,
    color: '#9E2A45',
  },
  earningsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  earningBox: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    elevation: 2,
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
  },
  label: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
});
