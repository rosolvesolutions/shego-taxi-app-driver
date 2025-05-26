import 'dotenv/config'
import path from 'path'
import dotenv from 'dotenv'
import { ConfigContext, ExpoConfig } from 'expo/config';

// Load .env from one directory up
dotenv.config({ path: path.resolve(__dirname, '../.env') })

export default ({ config }) => ({

  expo: {
    name: "client",
    slug: "client",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ...config,
    entryPoint: "./node_modules/expo-router/entry",
    ios: {
      ...config.ios,
    supportsTablet: config.ios?.supportsTablet ?? true,
    bundleIdentifier: 'com.rosolve.taxi',
    config: {
      ...(config.ios?.config || {}),
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    },
    android: {
      ...config.android,
      adaptiveIcon: {
        ...(config.android?.adaptiveIcon || {}),
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    config: {
      ...(config.android?.config || {}),
      googleMaps: {
        apiKey: process.env.GOOGLE_MAPS_API_KEY,
      },
    },
  },
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
    },
  },
});