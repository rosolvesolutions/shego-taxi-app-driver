import React, { useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import DriverMapFullScreen from './components/home/DriverMapFullScreen';
import Header from './components/home/Header';
import OnlineToggle from './components/home/OnlineToggle';
import TripRequestCard from './components/home/TripRequestCard';
import PendingRequests from './components/home/PendingRequests';
import { useTripRequest } from './hooks/useTripRequest';
import { Trip } from './types/Trip';


export default function DriverHomePage() {
  const [isOnline, setIsOnline] = useState(false);
  const {
    activeTrip,
    pending,
    countdown,
    acceptTrip,
    hideTrip,
    setPending
  } = useTripRequest(isOnline);

  // 🗑 Remove a pending request by ID
  const removePending = (tripId: string) => {
    setPending((prev: Trip[]) => prev.filter((trip: Trip) => trip.id !== tripId));

  };

  return (
    <View style={styles.container}>
      <DriverMapFullScreen />

      {/* Greeting Box */}
      <View style={styles.greetingBox}>
        <Text style={styles.greetingText}>Welcome back,</Text>
        <Text style={styles.driverName}>Aisha 👋</Text>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/women/75.jpg' }}
          style={styles.avatar}
        />
      </View>

      {/* Floating Controls */}
      <View style={styles.floatingUI}>
        <OnlineToggle
          isOnline={isOnline}
          onToggle={() => setIsOnline((prev) => !prev)}
        />

        {/* Dashboard Summary */}
        <View style={styles.dashboardCard}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Earnings</Text>
            <Text style={styles.statValue}>€86.40</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Trips</Text>
            <Text style={styles.statValue}>6</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Rating</Text>
            <Text style={styles.statValue}>4.93 ★</Text>
          </View>
        </View>

      </View>

      {/* Active Trip Request */}
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

      {/* Pending Request List */}
      <View style={styles.pending}>
        <PendingRequests
          data={pending}
          onSelect={acceptTrip}
          onRemove={removePending}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  greetingBox: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    zIndex: 20,
    backgroundColor: 'rgba(255,255,255,0.85)',
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  greetingText: {
    fontSize: 14,
    color: '#444',
  },
  driverName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#9E2A45',
    marginRight: 10,
  },
  avatar: {
    marginLeft: 'auto',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  floatingUI: {
    position: 'absolute',
    top: 140,
    left: 20,
    right: 20,
    gap: 16,
    zIndex: 15,
  },
  dashboardCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: '#777',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },
  separator: {
    width: 1,
    backgroundColor: '#eee',
    height: 40,
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
  pending: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
  },
});
