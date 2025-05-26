// client/app/terms.tsx
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function TermsPage() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </Pressable>
        <Text style={styles.headerTitle}>Terms & Privacy</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.content} 
        showsVerticalScrollIndicator={false}
      >
        {/* Intro */}
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>Welcome to SheGo!</Text> By using our services, you agree to abide by these Terms of Service and our Privacy Policy. SheGo provides a safe, women-only ride platform; please treat fellow users and drivers with respect and courtesy at all times. You’re responsible for the accuracy of any information you provide, and for keeping your account credentials secure.
        </Text>

        {/* Privacy */}
        <Text style={styles.heading}>Privacy is Paramount</Text>
        <Text style={styles.paragraph}>
          We collect only the minimum data needed to match you with drivers, process payments, and ensure your safety — things like your name, contact info, ride history, and device location. We never share your personal details with third parties for marketing without your explicit consent. You can review, update, or delete your data at any time by contacting us at{' '}
          <Text style={styles.link}>privacy@shego.com</Text>.
        </Text>

        {/* Updates */}
        <Text style={styles.heading}>Updates & Contact</Text>
        <Text style={styles.paragraph}>
          We may occasionally update these Terms or our Privacy Policy; we’ll notify you in-app when we do. If you have questions or concerns about how we handle your data or any of the terms, please reach out to our support team at{' '}
          <Text style={styles.link}>support@shego.com</Text> — your feedback helps us improve and stay transparent.
        </Text>
      </ScrollView>
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
  backButton: { width: 24 },
  headerTitle: { fontSize: 20, fontWeight: '600', color: '#333' },
  content: {
    padding: 16,
    paddingBottom: 100,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 22,
    color: '#444',
    marginBottom: 16,
  },
  heading: {
    marginTop: 24,
    marginBottom: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  bold: {
    fontWeight: '700',
    color: '#000',
  },
  link: {
    color: '#9E2A45',
    fontWeight: '500',
  },
});
