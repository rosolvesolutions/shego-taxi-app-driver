declare module 'react-native-maps' {
    import * as React from 'react';
    import { ViewProps } from 'react-native';
  
    export const PROVIDER_GOOGLE: 'google';
    export const PROVIDER_DEFAULT: 'default';
  
    export interface MapViewProps extends ViewProps {
      initialRegion?: any;
      region?: any;
      showsUserLocation?: boolean;
      showsMyLocationButton?: boolean;
      provider?: 'google' | 'default';
      style?: any;
    }
  
    export default class MapView extends React.Component<MapViewProps> {}
  
    export class Marker extends React.Component<{
      coordinate: { latitude: number; longitude: number };
      title?: string;
      description?: string;
    }> {}
  }
  