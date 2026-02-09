import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MapView } from 'react-native-amap3d';
import { styles as sharedStyles } from './styles';

export function MapScreen() {
  return (
    <View style={sharedStyles.mapContainer}>
      <MapView
        style={StyleSheet.absoluteFill}
        onLoad={() => {
          console.log('AMap loaded');
        }}
      />
    </View>
  );
}


