import React, { useRef } from 'react';
import { Button, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { FlashList } from '@shopify/flash-list';
import { styles } from './styles';

interface DetailsScreenProps {
  navigation: any;
}

const DATA = [
  { id: '1', title: '项目 1' },
  { id: '2', title: '项目 2' },
  { id: '3', title: '项目 3' },
  { id: '4', title: '项目 4' },
  { id: '5', title: '项目 5' },
  { id: '6', title: '项目 6' },
  { id: '7', title: '项目 7' },
  { id: '8', title: '项目 8' },
  { id: '9', title: '项目 9' },
  { id: '10', title: '项目 10' },
  { id: '11', title: '项目 11' },
  { id: '12', title: '项目 12' },
  { id: '13', title: '项目 13' },
  { id: '14', title: '项目 14' },
  { id: '15', title: '项目 15' },
  { id: '16', title: '项目 16' },
  { id: '17', title: '项目 17' },
  { id: '18', title: '项目 18' },
  { id: '19', title: '项目 19' },
];

export function DetailsScreen({ navigation }: DetailsScreenProps) {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <Text style={styles.title}>Details Screen123</Text>
      <Text style={styles.title}>热更新测试版本0.2</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button title="Open ActionSheet" onPress={() => actionSheetRef.current?.show()} />
      <View style={styles.listContainer}>
        <FlashList
          data={DATA}
          renderItem={({ item }) => <Text style={styles.listItem}>{item.title}</Text>}
          keyExtractor={(item) => item.id}
        />
      </View>
      <ActionSheet ref={actionSheetRef} gestureEnabled={true} defaultOverlayOpacity={0.3}>
        <View style={styles.actionSheetContent}>
          <Text style={styles.actionSheetText}>这是一个 ActionSheet 示例</Text>
          <Button title="关闭" onPress={() => actionSheetRef.current?.hide()} />
        </View>
      </ActionSheet>
    </View>
  );
}


