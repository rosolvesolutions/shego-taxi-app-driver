import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5001';

export default function DriverProfileDetails(): JSX.Element {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [carReg, setCarReg] = useState('')
  const [driverLicence, setDriverLicence] = useState('')
  const [taxiLicence, setTaxiLicence] = useState('')

  const { phoneNumber, email, city } = useLocalSearchParams()

  const handleContinue = async () => {
    console.log('🧪 handleContinue triggered')
    console.log('🔗 API_BASE_URL:', API_BASE_URL)

    if (!firstName || !lastName || !carReg || !driverLicence || !taxiLicence) {
      console.log('❌ Missing fields')
      Alert.alert('Please fill in all required fields')
      return
    }

    const payload = {
      phoneNumber,
      email,
      city,
      firstName,
      lastName,
      driverLicense: driverLicence,
      taxiNumber: taxiLicence,
      pfp: 'https://default-avatar.png',
    }

    try {
      console.log('📡 Sending request with payload:', payload)

      const response = await fetch(`${API_BASE_URL}/api/driver/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      console.log('📬 Response status:', response.status)
      const data = await response.json()
      console.log('📨 Response body:', data)

      if (response.ok) {
        Alert.alert('Registration Successful', 'Welcome to the platform!')
        router.replace('/')
      } else {
        Alert.alert('Registration Failed', data.error || 'Server error')
      }
    } catch (err) {
      console.error('❌ Network error:', err)
      Alert.alert('Network Error', 'Unable to connect to the server')
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoPlaceholder}>
        <Text style={styles.logoText}>Logo</Text>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          First Name <Text style={styles.required}>*</Text>
        </Text>
        <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} />

        <Text style={styles.label}>
          Last Name <Text style={styles.required}>*</Text>
        </Text>
        <TextInput style={styles.input} value={lastName} onChangeText={setLastName} />

        <Text style={styles.label}>
          Car Registration <Text style={styles.required}>*</Text>
        </Text>
        <TextInput style={styles.input} value={carReg} onChangeText={setCarReg} />

        <Text style={styles.label}>
          Driver Licence <Text style={styles.required}>*</Text>
        </Text>
        <TextInput style={styles.input} value={driverLicence} onChangeText={setDriverLicence} />

        <Text style={styles.label}>
          Taxi Licence <Text style={styles.required}>*</Text>
        </Text>
        <TextInput style={styles.input} value={taxiLicence} onChangeText={setTaxiLicence} />
      </View>

      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueText}>Continue ➔</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  logoPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#D3D3D3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  logoText: {
    fontSize: 12,
    color: '#555',
  },
  inputGroup: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
  },
  required: {
    color: 'red',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#E6E6E6',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 18,
  },
  continueButton: {
    backgroundColor: '#9E2A45',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 32,
    marginTop: 30,
  },
  continueText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
})
