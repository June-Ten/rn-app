import { StatusBar, StyleSheet, useColorScheme, Platform, Image } from 'react-native';
import { AMapSdk } from 'react-native-amap3d';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { UpdateProvider, Pushy } from "react-native-update";
import { HomeScreen } from './src/screens/HomeScreen';
import { DetailsScreen } from './src/screens/DetailsScreen';
import { MapScreen } from './src/screens/MapScreen';
import { SettingScreen } from './src/screens/SettingScreen.tsx';
import _updateConfig from "./update.json";
const { appKey } = _updateConfig[Platform.OS as keyof typeof _updateConfig];

const pushyClient = new Pushy({
  appKey,
  // 注意，默认情况下，在开发环境中不会检查更新
  // 如需在开发环境中调试更新，请设置debug为true
  // 但即便打开此选项，也仅能检查、下载热更，并不能实际应用热更。实际应用热更必须在release包中进行。
  debug: true,
  updateStrategy: null,
  checkStrategy: "onAppStart", // 仅在启动时检查
  // updateStrategy: "alwaysAlert"
});

const Tab = createBottomTabNavigator();

// 在根组件外加上 UpdateProvider 后导出
export default function Root() {
  // 注意，在使用 UpdateProvider 的当前组件中，无法直接调用 useUpdate
  // 只有当前组件的子组件才能调用 useUpdate
  return (
    <UpdateProvider client={pushyClient}>
      {/* ↓ 整个应用的根组件放到 UpdateProvider 中 */}
      <App />
    </UpdateProvider>
  );
}

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
    <GestureHandlerRootView style={{ flex: 1 }}>
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
                  } else if (route.name === 'Setting') {
                    iconUri = focused
                      ? 'https://img.icons8.com/fluency/48/setting.png'
                      : 'https://img.icons8.com/ios-glyphs/30/setting.png';
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
              <Tab.Screen name="Setting" component={SettingScreen} options={{ title: '设置' }} />
            </Tab.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

// export default App;
