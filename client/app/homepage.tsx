import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import DriverMapFullScreen from './components/home/DriverMapFullScreen';
// import OnlineToggle from './components/home/OnlineToggle';
import TripRequestCard from './components/home/TripRequestCard';
import { useTripRequest } from './hooks/useTripRequest';
import { Trip } from './types/Trip';

type BackendTrip = {
  _id: string;
  passengerFirstName: string;
  passengerLastName: string;
  pickupAddress: string;
  dropoffAddress: string;
};

export default function DriverHomePage() {
  // const [isOnline, setIsOnline] = useState(false);

  // const {
  //   activeTrip,
  //   pending,
  //   countdown,
  //   acceptTrip,
  //   hideTrip,
  //   setPending
  // } = useTripRequest(isOnline);

  const DRIVER_ID = '645f3b1a9f1b2c0012345673';
  const BACKEND_URL = 'http://172.20.10.4:8080';

  const handleFetchPendingRequests = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/booking/driver-response`);
      const data = await response.json();

      if (data.pendingRequests && data.pendingRequests.length > 0) {
        const mapped: Trip[] = data.pendingRequests.map((item: BackendTrip) => ({
          id: item._id,
          bookingId: item._id,
          name: `${item.passengerFirstName} ${item.passengerLastName}`,
          rating: 4.8,
          photo: 'https://randomuser.me/api/portraits/women/75.jpg',
          pickup: item.pickupAddress,
          dropoff: item.dropoffAddress,
          eta: '•',
          fare: '€25.75',
        }));

        setPending((prev) => {
          const existingIds = new Set(prev.map((t) => t.bookingId));
          const unique = mapped.filter((t) => !existingIds.has(t.bookingId));
          return [...prev, ...unique];
        });

        console.log('✅ Pending requests updated');
      } else {
        console.log('No new pending requests.');
      }
    } catch (error) {
      console.error('Failed to fetch pending requests:', error);
    }
  };

  const handleAcceptTrip = async (bookingId: string) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/booking/driver-accept`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          driverId: DRIVER_ID,
          bookingId,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error('Server rejected:', result);
        throw new Error('Failed to accept trip');
      }

      console.log(`✅ Booking ${bookingId} accepted by driver ${DRIVER_ID}`);
      setPending((prev) => prev.filter((trip) => trip.bookingId !== bookingId));
    } catch (err) {
      console.error('Error accepting trip:', err);
    }
  };

  const handleDeclineTrip = (bookingId: string) => {
    setPending((prev) => prev.filter((trip) => trip.bookingId !== bookingId));
    console.log(`❌ Trip ${bookingId} declined`);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleFetchPendingRequests();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <DriverMapFullScreen />

      {/* <View style={styles.floatingUI}>
        <OnlineToggle
          isOnline={isOnline}
          onToggle={handleToggleOnline}
        />
      </View> */}

      {activeTrip && (
        <View style={styles.cardContainer}>
          <TripRequestCard
            rider={activeTrip}
            onAccept={acceptTrip}
            onHide={hideTrip}
          />
          <View style={styles.timer}>
            <View style={styles.timerBar}>
              <View
                style={[
                  styles.timerFill,
                  { width: `${(countdown / 10) * 100}%` },
                ]}
              />
            </View>
          </View>
        </View>
      )}

      {pending.length > 0 && (
        <View style={styles.pendingList}>
          <Text style={styles.pendingTitle}>📥 Pending Requests</Text>
          {pending.map((trip) => (
            <View key={trip.id} style={styles.tripCard}>
              <Text style={styles.tripTitle}>
                {trip.name} • {trip.rating} ★
              </Text>
              <Text style={styles.tripAddress}>From: {trip.pickup}</Text>
              <Text style={styles.tripAddress}>To: {trip.dropoff}</Text>
              <Text style={styles.tripFare}>Fare: {trip.fare}</Text>

              <TouchableOpacity
                style={styles.acceptButton}
                onPress={() => handleAcceptTrip(trip.bookingId)}
              >
                <Text style={styles.acceptButtonText}>✅ Accept</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.declineButton}
                onPress={() => handleDeclineTrip(trip.bookingId)}
              >
                <Text style={styles.declineButtonText}>❌ Decline</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  floatingUI: {
    position: 'absolute',
    top: 140,
    left: 20,
    right: 20,
    gap: 16,
    zIndex: 15,
  },
  cardContainer: {
    position: 'absolute',
    bottom: 180,
    left: 0,
    right: 0,
    zIndex: 20,
  },
  timer: {
    marginHorizontal: 30,
    marginTop: 10,
  },
  timerBar: {
    width: '100%',
    height: 6,
    backgroundColor: '#eee',
    borderRadius: 10,
    overflow: 'hidden',
  },
  timerFill: {
    height: 6,
    backgroundColor: '#9E2A45',
  },
  pendingList: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 4,
  },
  pendingTitle: {
    fontWeight: '700',
    fontSize: 15,
    color: '#9E2A45',
    marginBottom: 10,
  },
  tripCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  tripTitle: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 4,
  },
  tripAddress: {
    fontSize: 13,
    color: '#444',
  },
  tripFare: {
    fontSize: 13,
    color: '#9E2A45',
    marginTop: 4,
  },
  acceptButton: {
    marginTop: 10,
    backgroundColor: '#27AE60',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  acceptButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  declineButton: {
    marginTop: 8,
    backgroundColor: '#E74C3C',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  declineButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
