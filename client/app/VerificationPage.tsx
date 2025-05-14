import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextStyle,
  ViewStyle,
  Image,
  Alert,
} from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import * as ImagePicker from 'expo-image-picker'
import cameraIcon from '../assets/images/camera.png'

export default function VerificationPage(): JSX.Element {
  // Get user data from the previous page
  const { phoneNumber, email, city } = useLocalSearchParams()
  const router = useRouter()

  const userInfo = phoneNumber || email || 'User'

  const [imageUri, setImageUri] = useState<string | null>(null)
  const [verificationType, setVerificationType] = useState<'passport' | 'id' | null>(null)

  // Launch the camera to capture a document (passport or ID)
  const launchCamera = async (type: 'passport' | 'id') => {
    setVerificationType(type)

    const { status } = await ImagePicker.requestCameraPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Camera access is required for verification.')
      return
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    })

    if (!result.canceled) {
      const uri = result.assets[0].uri
      console.log('Captured Image URI:', uri)
      setImageUri(uri)
      Alert.alert('Photo captured', 'Preview your photo below.')
    }
  }

  // Reset verification state
  const resetVerification = () => {
    setImageUri(null)
    setVerificationType(null)
  }

  // Upload image for OCR (mocked logic)
  const uploadImageForOCR = async () => {
    if (!imageUri) return

    console.log('Uploading (mock)... 🚀')
    setTimeout(() => {
      console.log('OCR result (mock):', {
        text: 'Mock OCR Result: Passport verified successfully!',
      })

      Alert.alert('OCR Completed', 'Your passport has been verified successfully.')

      // Navigate to the next step with preserved user data
      router.push({
        pathname: '/driver-profile-details',
        params: { phoneNumber, email, city },
      })
    }, 1000)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Hi <Text style={styles.bold}>{userInfo}</Text>! Let’s complete your verification.
      </Text>

      <Text style={styles.userDetails}>
        Phone: {phoneNumber}{'\n'}
        Email: {email}{'\n'}
        City: {city}
      </Text>

      {!imageUri ? (
        <>
          <Text style={styles.subHeading}>Account Verification*</Text>

          {/* Button to verify with passport */}
          <TouchableOpacity style={styles.verifyButton} onPress={() => launchCamera('passport')}>
            <Text style={styles.verifyText}>Verify with passport</Text>
            <Image source={cameraIcon} style={styles.cameraIcon} />
          </TouchableOpacity>

          {/* Button to verify with ID card */}
          <TouchableOpacity style={styles.verifyButton} onPress={() => launchCamera('id')}>
            <Text style={styles.verifyText}>Verify with ID card</Text>
            <Image source={cameraIcon} style={styles.cameraIcon} />
          </TouchableOpacity>

          <Text style={styles.noteText}>
            *Verification is <Text style={styles.bold}>mandatory</Text> for account creation. If you cannot verify with
            the above methods please contact us <Text style={styles.link}>here</Text> and we’ll do our best to help.
          </Text>

          <Text style={styles.footer}>
            All data collected is stored privately and only used to protect the safety of you and others. © Team Rosolve.
          </Text>
        </>
      ) : (
        <View style={styles.previewContainer}>
          {/* Show preview and confirm upload */}
          <Text style={styles.subHeading}>
            {verificationType === 'passport'
              ? 'Passport Photo Preview'
              : 'ID Card Photo Preview'}
          </Text>

          {/* Display captured image */}
          <Image source={{ uri: imageUri }} style={styles.capturedImage} />

          {/* Upload only shown for passport in this mock */}
          {verificationType === 'passport' && (
            <TouchableOpacity style={styles.uploadButton} onPress={uploadImageForOCR}>
              <Text style={styles.uploadButtonText}>Upload for OCR</Text>
            </TouchableOpacity>
          )}

          {/* Retake button */}
          <TouchableOpacity style={styles.resetButton} onPress={resetVerification}>
            <Text style={styles.resetButtonText}>Retake Photo</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

// Type for styles
type Style = {
  [key: string]: ViewStyle | TextStyle
}

// Page styles
const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 16,
    marginBottom: 16,
  },
  bold: {
    fontWeight: 'bold',
  },
  userDetails: {
    fontSize: 14,
    color: '#555',
    marginBottom: 24,
  },
  subHeading: {
    fontSize: 14,
    marginBottom: 16,
  },
  verifyButton: {
    backgroundColor: '#E6E6E6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 14,
    marginBottom: 18,
  },
  verifyText: {
    fontSize: 16,
    fontWeight: '500',
  },
  cameraIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  noteText: {
    fontSize: 12,
    color: '#333',
    marginTop: 10,
    marginBottom: 24,
  },
  link: {
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
  footer: {
    fontSize: 11,
    color: '#777',
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 24,
    alignSelf: 'center',
    width: '90%',
  },
  previewContainer: {
    alignItems: 'center',
    marginTop: 24,
  },
  capturedImage: {
    width: '100%',
    height: 400,
    resizeMode: 'contain',
    borderRadius: 12,
    marginBottom: 20,
  },
  uploadButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
    marginBottom: 12,
  },
  uploadButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  resetButton: {
    backgroundColor: '#E53935',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
  },
  resetButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
})
