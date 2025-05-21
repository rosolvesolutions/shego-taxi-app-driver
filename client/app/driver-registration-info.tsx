import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  StatusBar,
  Platform,
  useWindowDimensions,
  LayoutAnimation,
  UIManager,
  Animated,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Stepper from './components/Stepper';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

export default function DriverBasicInfoStep() {
  const { width } = useWindowDimensions();
  const [currentSection, setCurrentSection] = useState(0);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureEntry, setSecureEntry] = useState(true);
  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  const borderAnim = useRef(new Animated.Value(0)).current;

  const animateBorder = (toValue: number) =>
    Animated.timing(borderAnim, {
      toValue,
      duration: 200,
      useNativeDriver: false,
    }).start();

  const borderColor = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#DDD', '#9E2A45'],
  });

  useEffect(() => {
    const errs: { [k: string]: string } = {};
    if (fullName.trim().split(' ').length < 2) {
      errs.fullName = 'Please enter your full name.';
    }
    if (!/^\d{8,}$/.test(phone)) {
      errs.phone = 'Please enter a valid phone number.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!/^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(password)) {
      errs.password =
        'Password must be at least 8 characters and include a special character.';
    }
    setErrors(errs);
  }, [fullName, phone, email, password]);

  const goToNext = () => {
    if (!errors.fullName && !errors.phone && fullName && phone) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setCurrentSection((s) => s + 1);
    }
  };

  const handleContinue = () => {
    if (Object.keys(errors).length === 0) {
      router.push('/VerificationPage');
    }
  };

  const steps = ['Welcome', 'Basic Info', 'Verify'];

  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar barStyle="dark-content" />
      <Stepper steps={steps} currentIndex={1} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Driver Registration</Text>
          <Text style={styles.subTitle}>Step 2 of 3</Text>

          {/* Section 0 */}
          {currentSection >= 0 && (
            <View style={styles.section}>
              <Text style={styles.label}>Full Name</Text>
              <Animated.View style={[styles.inputWrapper, { borderColor }]}>
                <TextInput
                  style={styles.input}
                  onFocus={() => animateBorder(1)}
                  onBlur={() => animateBorder(0)}
                  value={fullName}
                  onChangeText={setFullName}
                  placeholder="e.g. Alisha Mwangi"
                  placeholderTextColor="#999"
                />
              </Animated.View>
              {errors.fullName && <Text style={styles.error}>{errors.fullName}</Text>}

              <Text style={styles.label}>Phone Number</Text>
              <Animated.View style={[styles.inputWrapper, { borderColor }]}>
                <TextInput
                  style={styles.input}
                  onFocus={() => animateBorder(1)}
                  onBlur={() => animateBorder(0)}
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="e.g. 0712345678"
                  placeholderTextColor="#999"
                  keyboardType="phone-pad"
                />
              </Animated.View>
              {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}

              <Pressable
                style={({ pressed }) => [
                  styles.nextButton,
                  pressed && { opacity: 0.8 },
                ]}
                android_ripple={{ color: 'rgba(255,255,255,0.3)' }}
                onPress={goToNext}
              >
                <Text style={styles.nextText}>Next →</Text>
              </Pressable>
            </View>
          )}

          {/* Section 1 */}
          {currentSection >= 1 && (
            <View style={styles.section}>
              <Text style={styles.label}>Email</Text>
              <Animated.View style={[styles.inputWrapper, { borderColor }]}>
                <TextInput
                  style={styles.input}
                  onFocus={() => animateBorder(1)}
                  onBlur={() => animateBorder(0)}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="e.g. alisha@shego.com"
                  placeholderTextColor="#999"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </Animated.View>
              {errors.email && <Text style={styles.error}>{errors.email}</Text>}

              <Text style={styles.label}>Password</Text>
              <Animated.View
                style={[
                  styles.inputWrapper,
                  { borderColor, flexDirection: 'row', alignItems: 'center' },
                ]}
              >
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  onFocus={() => animateBorder(1)}
                  onBlur={() => animateBorder(0)}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Create a password"
                  placeholderTextColor="#999"
                  secureTextEntry={secureEntry}
                  autoCapitalize="none"
                />
                <Pressable
                  onPress={() => setSecureEntry((s) => !s)}
                  style={{ padding: 8 }}
                >
                  <Ionicons
                    name={secureEntry ? 'eye-off' : 'eye'}
                    size={22}
                    color="#9E2A45"
                  />
                </Pressable>
              </Animated.View>
              {errors.password && <Text style={styles.error}>{errors.password}</Text>}

              <Pressable
                style={({ pressed }) => [
                  styles.nextButton,
                  {
                    opacity:
                      Object.keys(errors).length > 0 ? 0.5 : pressed ? 0.8 : 1,
                  },
                ]}
                disabled={Object.keys(errors).length > 0}
                android_ripple={{ color: 'rgba(255,255,255,0.3)' }}
                onPress={handleContinue}
              >
                <Text style={styles.nextText}>Continue</Text>
              </Pressable>
            </View>
          )}

          <Pressable onPress={() => router.back()}>
            <Text style={styles.backText}>← Back</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#FFF0F3',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 60,
  },
  title: {
    fontSize: 24,
    color: '#9E2A45',
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 24,
  },
  section: {
    width: '100%',
    maxWidth: 500,
    marginBottom: 32,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
    marginTop: 16,
  },
  inputWrapper: {
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 12,
    overflow: 'hidden',
  },
  input: {
    padding: 12,
    backgroundColor: '#FFF',
    fontSize: 14,
  },
  error: {
    color: '#9E2A45',
    fontSize: 12,
    marginBottom: 6,
  },
  nextButton: {
    backgroundColor: '#9E2A45',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 8,
  },
  nextText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  backText: {
    fontSize: 14,
    color: '#9E2A45',
    textDecorationLine: 'underline',
    marginTop: 16,
  },
});
