import { StatusBar, StyleSheet, Text, useColorScheme, View, Button, Platform } from 'react-native';
import { AMapSdk, MapView } from 'react-native-amap3d';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { useAppStore } from './src/store/useAppStore';

const Stack = createNativeStackNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  // 初始化高德地图 SDK（请替换为你自己的 key）
  AMapSdk.init(
    Platform.select({
      android: '178f44408e8a8269a01e572bfc4dd2d1',
      ios: '178f44408e8a8269a01e572bfc4dd2d1',
      default: '',
    }) as string,
  );

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen name="Map" component={MapScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

function HomeScreen({ navigation }: { navigation: any }) {
  const count = useAppStore((state) => state.count);
  const increment = useAppStore((state) => state.increment);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <Text style={styles.counterText}>Global Count: {count}</Text>
      <Button title="Increment Count" onPress={increment} />
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

function DetailsScreen({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Details Screen</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

function MapScreen() {
  return (
    <View style={styles.mapContainer}>
      <MapView
        style={StyleSheet.absoluteFill}
        onLoad={() => {
          console.log('AMap loaded');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  mapContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
  },
  counterText: {
    fontSize: 18,
    marginBottom: 12,
  },
});

export default App;
