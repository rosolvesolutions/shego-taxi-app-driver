declare module 'react-native-maps' {
  import * as React from 'react';
  import { ViewProps, StyleProp, ViewStyle } from 'react-native';

  export const PROVIDER_GOOGLE: 'google';
  export const PROVIDER_DEFAULT: 'default';

  export interface Region {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  }

  export interface MapViewProps extends ViewProps {
    initialRegion?: Region;
    region?: Region;
    showsUserLocation?: boolean;
    showsMyLocationButton?: boolean;
    provider?: 'google' | 'default';
    style?: StyleProp<ViewStyle>;
  }

  export default class MapView extends React.Component<MapViewProps> {}

  export class Marker extends React.Component<{
    coordinate: { latitude: number; longitude: number };
    title?: string;
    description?: string;
  }> {}
}
