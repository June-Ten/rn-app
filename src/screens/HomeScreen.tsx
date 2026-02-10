import React from 'react';
import { Alert, Button, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppStore } from '../store/useAppStore';
import { styles } from './styles';

interface HomeScreenProps {
  navigation: any;
}

export function HomeScreen({ navigation }: HomeScreenProps) {
  const count = useAppStore((state) => state.count);
  const increment = useAppStore((state) => state.increment);
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <Text style={styles.title}>Home Screen</Text>
      <Text style={styles.counterText}>Global Count: {count}</Text>
      <Button title="Increment Count" onPress={increment} />
      <Button
        title="Show Count Alert"
        onPress={() => {
          Alert.alert('当前计数', `Global Count: ${count}`);
        }}
      />
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
      <Button
        title="Open Map"
        onPress={() => navigation.navigate('Map')}
      />
      
    </View>
  );
}


