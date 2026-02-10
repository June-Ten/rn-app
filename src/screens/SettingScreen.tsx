import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon, Snackbar, Banner } from "react-native-paper";
import { useUpdate } from "react-native-update";
import { styles as sharedStyles } from './styles';

export function SettingScreen() {
  const {
    client,
    checkUpdate,
    downloadUpdate,
    switchVersionLater,
    switchVersion,
    updateInfo,
    packageVersion,
    currentHash,
    progress: { received, total } = {},
  } = useUpdate();
  const [showUpdateBanner, setShowUpdateBanner] = useState(false);
  const [showUpdateSnackbar, setShowUpdateSnackbar] = useState(false);
  const snackbarVisible = showUpdateSnackbar && updateInfo?.update;

  return (
    <View style={sharedStyles.container}>
      <Text>Setting Screen</Text>
      <View style={{flex: 1}}>
            <Text>
              更新下载进度：{received} / {total}
            </Text>
            <TouchableOpacity
              onPress={() => {
                checkUpdate();
                setShowUpdateSnackbar(true);
              }}
            >
              <Text>点击这里检查更新</Text>
            </TouchableOpacity>
            {snackbarVisible && (
              <Snackbar
                visible={true}
                onDismiss={() => {
                  setShowUpdateSnackbar(false);
                }}
                action={{
                  label: "更新",
                  onPress: async () => {
                    setShowUpdateSnackbar(false);
                    if (await downloadUpdate()) {
                      setShowUpdateBanner(true);
                    }
                  },
                }}
              >
                <Text>有新版本({updateInfo.name})可用，是否更新？</Text>
              </Snackbar>
            )}
            <Banner
              style={{ width: "100%", position: "absolute", top: 0 }}
              visible={showUpdateBanner}
              actions={[
                {
                  label: "立即重启",
                  onPress: switchVersion,
                },
                {
                  label: "下次再说",
                  onPress: () => {
                    switchVersionLater();
                    setShowUpdateBanner(false);
                  },
                },
              ]}
              icon={({ size }) => (
                <Icon source="checkcircleo" size={size} color="#00f" />
              )}
            >
              更新已完成，是否立即重启？
            </Banner>
          </View>
    </View>
  );
}


