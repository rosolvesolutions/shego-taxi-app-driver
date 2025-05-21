import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function OnlineToggle({
  isOnline,
  onToggle,
}: {
  isOnline: boolean;
  onToggle: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.button, isOnline ? styles.online : styles.offline]}
      onPress={onToggle}
      activeOpacity={0.8}
    >
      <Ionicons
        name={isOnline ? 'checkmark-circle' : 'close-circle'}
        size={20}
        color={isOnline ? '#278A4D' : '#A02B2B'}
        style={{ marginRight: 8 }}
      />
      <Text style={[styles.text, isOnline ? styles.textOnline : styles.textOffline]}>
        {isOnline ? 'You are ONLINE' : 'You are OFFLINE'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  online: {
    backgroundColor: '#DFF5E1',
  },
  offline: {
    backgroundColor: '#FCE3E3',
  },
  text: {
    fontWeight: '600',
    fontSize: 15,
  },
  textOnline: {
    color: '#278A4D',
  },
  textOffline: {
    color: '#A02B2B',
  },
});
