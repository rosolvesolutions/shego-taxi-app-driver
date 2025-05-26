// client/app/feedback.tsx
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function FeedbackPage() {
  const router = useRouter();
  const [message, setMessage] = useState('');

  const handleSend = () => {
    // send feedback…
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </Pressable>
        <Text style={styles.headerTitle}>Send Feedback</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.label}>
          We appreciate your thoughts! Let us know what you think:
        </Text>
        <TextInput
          style={styles.textArea}
          placeholder="Type your feedback here…"
          multiline
          numberOfLines={6}
          value={message}
          onChangeText={setMessage}
        />

        <Pressable
          style={[
            styles.sendButton,
            !message.trim() && { opacity: 0.5 },
          ]}
          onPress={handleSend}
          disabled={!message.trim()}
        >
          <Text style={styles.sendText}>Send</Text>
        </Pressable>
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
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 12,
  },
  textArea: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    textAlignVertical: 'top',
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  sendButton: {
    marginTop: 24,
    backgroundColor: '#9E2A45',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  sendText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
