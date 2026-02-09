import React from 'react';
import { Button, Text, View } from 'react-native';
import { styles } from './styles';

interface DetailsScreenProps {
  navigation: any;
}

export function DetailsScreen({ navigation }: DetailsScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Details Screen</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}


