import { StatusBar, StyleSheet, Text, useColorScheme, View, Button, Platform, Alert, Image } from 'react-native';
import { AMapSdk, MapView } from 'react-native-amap3d';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { useAppStore } from './src/store/useAppStore';

const Tab = createBottomTabNavigator();

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
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: {
              height: 60,
              paddingBottom: 8,
              paddingTop: 6,
              borderTopWidth: StyleSheet.hairlineWidth,
              borderTopColor: '#ddd',
              backgroundColor: '#ffffff',
            },
            tabBarActiveTintColor: '#1677ff',
            tabBarInactiveTintColor: '#999999',
            tabBarLabelStyle: {
              fontSize: 11,
            },
            tabBarIcon: ({ focused, color, size }) => {
              let iconUri = '';

              if (route.name === 'Home') {
                iconUri = focused
                  ? 'https://img.icons8.com/fluency/48/home.png'
                  : 'https://img.icons8.com/ios-glyphs/30/home.png';
              } else if (route.name === 'Details') {
                iconUri = focused
                  ? 'https://img.icons8.com/fluency/48/details.png'
                  : 'https://img.icons8.com/ios-glyphs/30/details.png';
              } else if (route.name === 'Map') {
                iconUri = focused
                  ? 'https://img.icons8.com/fluency/48/map.png'
                  : 'https://img.icons8.com/ios-glyphs/30/map.png';
              }

              return (
                <Image
                  source={{ uri: iconUri }}
                  style={{
                    width: size,
                    height: size,
                    tintColor: iconUri.includes('ios-glyphs') ? color : undefined,
                  }}
                  resizeMode="contain"
                />
              );

              /**
               * 如果你想使用本地图片，替换上面的 Image 为类似下面的写法，并确保图片存在：
               *
               * const source = route.name === 'Home'
               *   ? require('./assets/tab-home.png')
               *   : route.name === 'Details'
               *   ? require('./assets/tab-details.png')
               *   : require('./assets/tab-map.png');
               *
               * return <Image source={source} style={{ width: size, height: size }} />;
               */
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} options={{ title: '首页' }} />
          <Tab.Screen name="Details" component={DetailsScreen} options={{ title: '详情' }} />
          <Tab.Screen name="Map" component={MapScreen} options={{ title: '地图' }} />
        </Tab.Navigator>
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
