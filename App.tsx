import { StatusBar, StyleSheet, useColorScheme, Platform, Image } from 'react-native';
import { AMapSdk } from 'react-native-amap3d';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen } from './src/screens/HomeScreen';
import { DetailsScreen } from './src/screens/DetailsScreen';
import { MapScreen } from './src/screens/MapScreen';

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
      <SafeAreaView style={{ flex: 1 }} edges={['bottom', 'left', 'right']}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarStyle: {
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
              },
            })}
          >
            <Tab.Screen name="Home" component={HomeScreen} options={{ title: '首页' }} />
            <Tab.Screen name="Details" component={DetailsScreen} options={{ title: '详情' }} />
            <Tab.Screen name="Map" component={MapScreen} options={{ title: '地图' }} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
