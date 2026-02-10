import React, { useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Banner, Button, Card, Icon, ProgressBar, Snackbar, Text } from 'react-native-paper';
import { useUpdate } from "react-native-update";
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles as sharedStyles } from './styles';

function UpdateBannerIcon({ size }: { size: number }) {
  return <Icon source="check-circle-outline" size={size} color="#1677ff" />;
}

function NavCardLeftIcon(props: any) {
  return <Icon {...props} source="map-outline" />;
}

function UpdateCardLeftIcon(props: any) {
  return <Icon {...props} source="cloud-download-outline" />;
}

export function SettingScreen() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const {
    checkUpdate,
    downloadUpdate,
    switchVersionLater,
    switchVersion,
    updateInfo,
    progress: { received = 0, total = 0 } = {},
  } = useUpdate();
  const [showUpdateBanner, setShowUpdateBanner] = useState(false);
  const [showUpdateSnackbar, setShowUpdateSnackbar] = useState(false);
  const hasUpdate = !!updateInfo?.update;

  const progressValue = useMemo(() => {
    if (!total || total <= 0) return 0;
    return Math.max(0, Math.min(1, received / total));
  }, [received, total]);

  return (
    <View style={[sharedStyles.settingRoot, { paddingTop: insets.top + 12 }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={sharedStyles.settingScrollContent}
      >
        <Text style={sharedStyles.settingTitle}>设置</Text>
        <Text style={sharedStyles.settingSubTitle}>应用与工具</Text>

        <Banner
          style={sharedStyles.updateBanner}
          visible={showUpdateBanner}
          actions={[
            { label: '立即重启', onPress: switchVersion },
            {
              label: '下次再说',
              onPress: () => {
                switchVersionLater();
                setShowUpdateBanner(false);
              },
            },
          ]}
          icon={UpdateBannerIcon}
        >
          更新已完成，是否立即重启？
        </Banner>

        <Card style={sharedStyles.card} mode="elevated">
          <Card.Title title="导航" left={NavCardLeftIcon} />
          <Card.Content style={sharedStyles.cardContent}>
            <Button
              mode="contained"
              style={sharedStyles.primaryButton}
              contentStyle={sharedStyles.buttonContent}
              onPress={() => navigation.navigate('Map')}
            >
              进入地图
            </Button>
          </Card.Content>
        </Card>

        <Card style={sharedStyles.card} mode="elevated">
          <Card.Title title="应用更新" left={UpdateCardLeftIcon} />
          <Card.Content style={sharedStyles.cardContent}>
            <Text style={sharedStyles.mutedText}>
              下载进度：{received ?? 0} / {total ?? 0}
            </Text>
            <ProgressBar progress={progressValue} style={sharedStyles.progress} color="#1677ff" />
            <Button
              mode="outlined"
              contentStyle={sharedStyles.buttonContent}
              onPress={() => {
                checkUpdate();
                setShowUpdateSnackbar(true);
              }}
            >
              检查更新
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>

      <Snackbar
        visible={showUpdateSnackbar}
        onDismiss={() => setShowUpdateSnackbar(false)}
        action={
          hasUpdate
            ? {
                label: '更新',
                onPress: async () => {
                  setShowUpdateSnackbar(false);
                  if (await downloadUpdate()) {
                    setShowUpdateBanner(true);
                  }
                },
              }
            : undefined
        }
      >
        <Text>
          {hasUpdate
            ? `有新版本(${updateInfo?.name ?? ''})可用，是否更新？`
            : '正在检查更新…'}
        </Text>
      </Snackbar>
    </View>
  );
}


