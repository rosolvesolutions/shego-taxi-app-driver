import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StepperProps {
  steps: string[];
  currentIndex: number;
}

export default function Stepper({ steps, currentIndex }: StepperProps) {
  return (
    <View style={styles.container}>
      {steps.map((_, i) => {
        const isActive = i === currentIndex;
        return (
          <View key={i} style={styles.stepContainer}>
            <View style={[styles.circle, isActive && styles.circleActive]}>
              <Text style={[styles.label, isActive && styles.labelActive]}>
                {i + 1}
              </Text>
            </View>
            {i < steps.length - 1 && <View style={styles.line} />}
          </View>
        );
      })}
    </View>
  );
}

const CIRCLE = 28;
const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', justifyContent:'center', marginBottom:16 },
  stepContainer: { flexDirection: 'row', alignItems: 'center' },
  circle: {
    width: CIRCLE, height: CIRCLE, borderRadius: CIRCLE/2,
    backgroundColor: '#DDD', justifyContent:'center', alignItems:'center'
  },
  circleActive: { backgroundColor: '#9E2A45' },
  label: { color:'#888', fontWeight:'600' },
  labelActive: { color:'#fff' },
  line: { width: 32, height: 2, backgroundColor: '#DDD', marginHorizontal:8 },
});