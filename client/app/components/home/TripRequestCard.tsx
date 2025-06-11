import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
  UIManager,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type TripRequestCardProps = {
  rider: {
    name: string;
    rating: number;
    photo: string;
    pickup: string;
    dropoff: string;
    eta: string;
    fare: string;
  };
  onAccept: () => void;
  onHide: () => void;
};

export default function TripRequestCard({ rider, onAccept, onHide }: TripRequestCardProps) {
  const slideAnim = useRef(new Animated.Value(300)).current;
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const toggleDetails = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <Animated.View style={{ transform: [{ translateY: slideAnim }] }}>
      <BlurView intensity={90} tint="light" style={styles.card}>
        <Text style={styles.heading}>🚘 New Trip Request</Text>

        <View style={styles.row}>
          <Image source={{ uri: rider.photo }} style={styles.avatar} />
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.name}>{rider.name}</Text>
            <Text style={styles.rating}>{rider.rating} ★</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={18} color="#9E2A45" />
          <Text style={styles.address}>{rider.pickup}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="flag-outline" size={18} color="#9E2A45" />
          <Text style={styles.address}>{rider.dropoff}</Text>
        </View>

        <View style={styles.metaRow}>
          <Text style={styles.meta}>ETA: {rider.eta}</Text>
          <Text style={styles.meta}>Fare: €{rider.fare}</Text>
        </View>

        {expanded && (
          <View style={styles.expandedSection}>
            <Text style={styles.extra}>Trip duration ~ {rider.eta}</Text>
            <Text style={styles.extra}>Expected distance: ~4.3km</Text>
            <Text style={styles.extra}>Rider prefers: quiet ride</Text>
          </View>
        )}

        <TouchableOpacity onPress={toggleDetails} style={styles.expandBtn}>
          <Ionicons name={expanded ? 'chevron-up' : 'chevron-down'} size={20} color="#9E2A45" />
          <Text style={styles.expandText}>{expanded ? 'Hide details' : 'Show more'}</Text>
        </TouchableOpacity>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.hideBtn} onPress={onHide}>
            <Text style={styles.hideText}>Decline</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.acceptBtn} onPress={onAccept}>
            <Text style={styles.acceptText}>Accept</Text>
          </TouchableOpacity>
        </View>
      </BlurView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    marginBottom: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
    marginBottom: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderColor: '#fff',
    borderWidth: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },
  rating: {
    fontSize: 13,
    color: '#777',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 6,
  },
  address: {
    fontSize: 14,
    color: '#333',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 6,
  },
  meta: {
    fontSize: 13,
    color: '#666',
  },
  expandedSection: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 10,
  },
  extra: {
    fontSize: 13,
    color: '#555',
    marginBottom: 4,
  },
  expandBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 4,
  },
  expandText: {
    fontSize: 13,
    color: '#9E2A45',
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  hideBtn: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 28,
  },
  acceptBtn: {
    backgroundColor: '#9E2A45',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 28,
  },
  hideText: {
    color: '#333',
    fontWeight: '600',
  },
  acceptText: {
    color: '#fff',
    fontWeight: '600',
  },
});
