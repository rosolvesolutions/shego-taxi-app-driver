import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, StatusBar, Dimensions, ScrollView, Platform } from 'react-native';
import { Pressable } from 'react-native'; 
import { router } from 'expo-router';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';
import Stepper from './components/Stepper'; 


const { width } = Dimensions.get('window');

export default function DriverRegistrationLanding() {
  const [fetchedValue, setFetchedValue] = useState<string | null>(null);
  const isWeb = Platform.OS === 'web';

  useEffect(() => {
    const fetchValue = async () => {
      try {
        const response = await fetch('http://10.156.29.62/api/value');
        const data = await response.json();
        setFetchedValue(data.value);
      } catch (error) {
        setFetchedValue("Express Server Status: FAILURE!!");
        console.error('Error fetching data:', error);
      }
    };

    fetchValue();
  }, []);

  

  const steps = ['Welcome','Info','Verify'];  

  return (
    <SafeAreaView style={[styles.container, isWeb && { paddingHorizontal: width * 0.1 }]}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>

         {/*  Animated Stepper Bar */}
         <Stepper steps={steps} currentIndex={0} />

          {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>SheGo</Text>
          <Text style={styles.tagline}>
            Freedom, safety, and empowerment for every woman on the move.
          </Text>
        </View>


          {/* Benefits */}
        <View style={styles.benefitsContainer}>
          <View style={styles.benefit}>
            <FontAwesome5 name="hand-holding-usd" size={24} color="#9E2A45" />
            <Text style={styles.benefitText}>Earn on your schedule</Text>
          </View>
          <View style={styles.benefit}>
            <Ionicons name="shield-checkmark-outline" size={24} color="#9E2A45" />
            <Text style={styles.benefitText}>Women-only rides</Text>
          </View>
          <View style={styles.benefit}>
            <MaterialIcons name="support-agent" size={24} color="#9E2A45" />
            <Text style={styles.benefitText}>Supportive community</Text>
          </View>
        </View>

        {/* Card / CTA */}
        <View style={styles.card}>
          <Text style={styles.progressText}>Step 1 of 3</Text>
          <Text style={[styles.heading, isWeb && { fontSize: 24 }]}>Become a SheGo Driver</Text>


          <TouchableOpacity
            style={styles.ctaButton}
            onPress={() => router.push('/driver-registration-info')}
          >
            <Text style={styles.ctaText}>Start Registration</Text>
          </TouchableOpacity>

          <View style={styles.loginPrompt}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => router.push('/driver-profile-details')}>
              <Text style={styles.loginLink}>Log in here</Text>
            </TouchableOpacity>
          </View>

          {fetchedValue && <Text style={styles.statusText}>{fetchedValue}</Text>}

          <Text style={styles.safetyNotice}>🔐 Safe. Verified. Women-only community.</Text>
          <Text style={styles.termsText}>
            By registering, you agree to our Terms and Privacy Policy.
          </Text>
        </View>

        <Text style={styles.footer}>© 2025 Rosolve Ltd. • All rights reserved.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF0F3',
  },
  scrollContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    fontSize: 30,
    color: '#9E2A45',
    fontWeight: 'bold',
  },
  tagline: {
    fontSize: 14,
    color: '#7D2B3B',
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
  },
  benefitsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: width * 0.9,
    marginBottom: 24,
  },
  benefit: {
    alignItems: 'center',
    width: width / 3.5,
  },
  benefitText: {
    fontSize: 12,
    color: '#7D2B3B',
    textAlign: 'center',
    marginTop: 6,
  },
  card: {
    backgroundColor: '#fff',
    width: width * 0.9,
    padding: 26,
    borderRadius: 22,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
    alignItems: 'center',
    marginBottom: 24,
  },
  progressText: {
    fontSize: 12,
    color: '#9E2A45',
    fontWeight: '500',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 18,
    textAlign: 'center',
  },
  ctaButton: {
    backgroundColor: '#9E2A45',
    paddingVertical: 16,
    paddingHorizontal: 50,
    borderRadius: 14,
    marginBottom: 16,
  },
  ctaText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loginPrompt: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  loginText: {
    fontSize: 13,
    color: '#555',
    marginRight: 6,
  },
  loginLink: {
    fontSize: 13,
    color: '#9E2A45',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  statusText: {
    fontSize: 13,
    color: '#9E2A45',
    fontWeight: '500',
    marginTop: 8,
  },
  safetyNotice: {
    fontSize: 13,
    color: '#444',
    textAlign: 'center',
    marginTop: 12,
  },
  termsText: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
  },
  footer: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});