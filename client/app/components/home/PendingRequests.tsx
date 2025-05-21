import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

type Trip = {
  id: string;
  name: string;
  rating: number;
  photo: string;
  pickup: string;
  dropoff: string;
  eta: string;
  fare: string;
};

type Props = {
  data: Trip[];
  onSelect: (trip: Trip) => void;
  onRemove?: (tripId: string) => void;
};

export default function PendingRequests({ data, onSelect, onRemove }: Props) {
  const renderRightActions = (tripId: string) => (
    <TouchableOpacity
      onPress={() => onRemove?.(tripId)}
      style={styles.swipeDelete}
    >
      <Ionicons name="trash-outline" size={20} color="#fff" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📥 Pending Requests</Text>
      {data.length === 0 && (
        <Text style={styles.empty}>No pending trips</Text>
      )}

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 8 }}
        renderItem={({ item }) => (
          <Swipeable renderRightActions={() => renderRightActions(item.id)}>
            <TouchableOpacity
              onPress={() => onSelect(item)}
              style={styles.card}
              activeOpacity={0.8}
            >
              <Text style={styles.rider}>
                {item.name} • {item.rating} ★
              </Text>
              <Text style={styles.address}>From: {item.pickup}</Text>
              <Text style={styles.address}>To: {item.dropoff}</Text>
              <Text style={styles.meta}>
                ETA: {item.eta} • €{item.fare}
              </Text>
            </TouchableOpacity>
          </Swipeable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontWeight: '700',
    fontSize: 15,
    color: '#B02B45',
    marginBottom: 10,
  },
  empty: {
    fontSize: 13,
    color: '#777',
    fontStyle: 'italic',
  },
  card: {
    backgroundColor: '#fafafa',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  rider: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 4,
  },
  address: {
    fontSize: 13,
    color: '#444',
  },
  meta: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
  swipeDelete: {
    backgroundColor: '#C0392B',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    marginBottom: 10,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
});
