// client/app/settings.tsx
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Pressable,
  Switch,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SettingsPage() {
  const router = useRouter();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);

  const handleClearCache = () => {
    // your clear cache logic...
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </Pressable>
        <Text style={styles.headerTitle}>Settings</Text>
        {/* placeholder to center title */}
        <View style={styles.backButton} />
      </View>

      {/* Content */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* — Account */}
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.card}>
          <Pressable
            style={({ pressed }) => [styles.item, pressed && styles.pressed]}
            onPress={() => router.push('./profile')}
          >
            <View style={styles.iconWrapper}>
              <MaterialIcons name="person" size={20} color="#9E2A45" />
            </View>
            <Text style={styles.itemText}>Edit Profile</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </Pressable>

          <View style={styles.item}>
            <View style={styles.iconWrapper}>
              <MaterialIcons name="fingerprint" size={20} color="#9E2A45" />
            </View>
            <Text style={styles.itemText}>Biometric Login</Text>
            <Switch
              value={biometricEnabled}
              onValueChange={setBiometricEnabled}
              trackColor={{ false: '#ddd', true: '#9E2A45' }}
              thumbColor="#fff"
            />
          </View>
        </View>

        {/* — Preferences */}
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.card}>
          <View style={styles.item}>
            <View style={styles.iconWrapper}>
              <Ionicons name="notifications-outline" size={20} color="#9E2A45" />
            </View>
            <Text style={styles.itemText}>Notifications</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#ddd', true: '#9E2A45' }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.item}>
            <View style={styles.iconWrapper}>
              <Ionicons name="moon-outline" size={20} color="#9E2A45" />
            </View>
            <Text style={styles.itemText}>Dark Mode</Text>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#ddd', true: '#9E2A45' }}
              thumbColor="#fff"
            />
          </View>

          <Pressable
            style={({ pressed }) => [styles.item, pressed && styles.pressed]}
            onPress={() => {/* language picker */}}
          >
            <View style={styles.iconWrapper}>
              <Ionicons name="globe-outline" size={20} color="#9E2A45" />
            </View>
            <Text style={styles.itemText}>Language</Text>
            <Text style={styles.subText}>English</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.item, pressed && styles.pressed]}
            onPress={handleClearCache}
          >
            <View style={styles.iconWrapper}>
              <Ionicons name="trash-outline" size={20} color="#E53935" />
            </View>
            <Text style={[styles.itemText, { color: '#E53935' }]}>
              Clear Cache
            </Text>
          </Pressable>
        </View>

        {/* — Support */}
        <Text style={styles.sectionTitle}>Support</Text>
        <View style={styles.card}>
          <Pressable
            style={({ pressed }) => [styles.item, pressed && styles.pressed]}
            onPress={() => router.push('./terms')}
          >
            <View style={styles.iconWrapper}>
              <Ionicons name="document-text-outline" size={20} color="#9E2A45" />
            </View>
            <Text style={styles.itemText}>Terms & Privacy</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.item, pressed && styles.pressed]}
            onPress={() => router.push('./feedback')}
          >
            <View style={styles.iconWrapper}>
              <Ionicons name="chatbubble-ellipses-outline" size={20} color="#9E2A45" />
            </View>
            <Text style={styles.itemText}>Send Feedback</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </Pressable>
        </View>

        {/* — Log Out */}
        <Pressable
          style={[styles.item, styles.logoutItem]}
          onPress={() => {/* logout */}}
        >
          <View style={styles.iconWrapper}>
            <Ionicons name="log-out-outline" size={20} color="#E53935" />
          </View>
          <Text style={[styles.itemText, { color: '#E53935' }]}>Log Out</Text>
        </Pressable>

        <Text style={styles.versionText}>App Version 1.0.0</Text>
      </ScrollView>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <Pressable
          style={({ pressed }) => [styles.navItem, pressed && styles.navPressed]}
          onPress={() => router.push('/homepage')}
        >
          <Ionicons name="home-outline" size={24} color="#fff" />
          <Text style={styles.navText}>Home</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.navItem, pressed && styles.navPressed]}
          onPress={() => router.push('./settings')}
        >
          <Ionicons name="settings" size={24} color="#fff" />
          <Text style={styles.navText}>Settings</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.navItem, pressed && styles.navPressed]}
          onPress={() => router.push('./profile')}
        >
          <Ionicons name="person-outline" size={24} color="#fff" />
          <Text style={styles.navText}>Profile</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F4F6' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  backButton: { width: 24, alignItems: 'flex-start' },
  headerTitle: { fontSize: 20, fontWeight: '600', color: '#333' },

  scrollContent: {
    padding: 16,
    paddingBottom: 100,  // space for bottom nav
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginTop: 24,
    marginBottom: 8,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  pressed: { backgroundColor: '#FBFBFB' },

  iconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F9E9EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  subText: {
    fontSize: 14,
    color: '#999',
    marginRight: 4,
  },

  logoutItem: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 12,
    marginTop: 8,
    borderBottomWidth: 0,
  },

  versionText: {
    textAlign: 'center',
    color: '#AAA',
    fontSize: 12,
    marginTop: 24,
  },

  bottomNav: {
    position: 'absolute',
    bottom: 16,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#9E2A45',
    borderRadius: 24,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
  navPressed: { opacity: 0.7 },
  navText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
});
