import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

export default function OnlineToggle() {
  const [isOnline, setIsOnline] = useState(false);

  const toggleSwitch = () => {
    setIsOnline((prev) => !prev);
    // TODO: POST to backend to update status
  };

  
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});
