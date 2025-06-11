import fs from 'fs';
import path from 'path';

const googleKeyPath = path.resolve(__dirname, './keys/google-maps-key.json');
const googleKeyJson = JSON.parse(fs.readFileSync(googleKeyPath, 'utf-8'));
const GOOGLE_MAPS_API_KEY = googleKeyJson.apiKey;

export default {
  expo: {
    name: 'client',
    slug: 'client',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'myapp',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    platforms: ['ios', 'android'],
    ios: {
      supportsTablet: true,
      config: {
        googleMapsApiKey: GOOGLE_MAPS_API_KEY,
      },
      bundleIdentifier: 'com.rosolve.taxi',
    },
    android: {
      config: {
        googleMaps: {
          apiKey: GOOGLE_MAPS_API_KEY,
        },
      },
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png',
    },
    plugins: [
      'expo-router',
      [
        'expo-splash-screen',
        {
          image: './assets/images/splash-icon.png',
          imageWidth: 200,
          resizeMode: 'contain',
          backgroundColor: '#ffffff',
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL || 'http://192.168.1.107:5001',
    },
  },
};
