import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
// import { MapView } from 'react-native-amap3d';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles as sharedStyles } from './styles';

export function MapScreen() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  return (
    <View style={sharedStyles.mapContainer}>
      {/* <MapView
        style={StyleSheet.absoluteFill}
        onLoad={() => {
          console.log('AMap loaded');
        }}
      /> */}

      <View style={[sharedStyles.mapTopBar, { paddingTop: insets.top + 8 }]}>
        <Pressable onPress={() => navigation.goBack()} style={sharedStyles.mapBackBtn}>
          <Icon source="chevron-left" size={22} color="#111827" />
          <Text style={sharedStyles.mapBackText}>返回</Text>
        </Pressable>
      </View>
    </View>
  );
}


