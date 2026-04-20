import React, { useCallback, useRef } from 'react';
import { Button, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { FlashList } from '@shopify/flash-list';
import { styles } from './styles';

interface DetailsScreenProps {
  navigation: any;
}

const COLORS = [
  '#ef4444',
  '#f59e0b',
  '#10b981',
  '#3b82f6',
  '#8b5cf6',
  '#ec4899',
  '#06b6d4',
  '#14b8a6',
];

type ListItem = { id: string; title: string; color: string };

const RAW_DATA: Array<{ id: string; title: string }> = Array.from({ length: 19 }, (_, i) => ({
  id: String(i + 1),
  title: `项目 ${i + 1}`,
}));

const DATA: ListItem[] = RAW_DATA.map((it, i) => ({
  ...it,
  color: COLORS[i % COLORS.length],
}));

interface HeroItemProps {
  item: ListItem;
  onPressItem: (item: ListItem, origin: { x: number; y: number; width: number; height: number }) => void;
}

function HeroItem({ item, onPressItem }: HeroItemProps) {
  const ref = useRef<View>(null);

  const handlePress = useCallback(() => {
    const node = ref.current;
    if (!node) {return;}
    node.measureInWindow((x, y, width, height) => {
      onPressItem(item, { x, y, width, height });
    });
  }, [item, onPressItem]);

  return (
    <Pressable onPress={handlePress}>
      <View ref={ref} style={[styles.heroListItem, { backgroundColor: item.color }]}>
        <Text style={styles.heroListItemTitle}>{item.title}</Text>
        <Text style={styles.heroListItemSubtitle}>点击查看详情 →</Text>
      </View>
    </Pressable>
  );
}

export function DetailsScreen({ navigation }: DetailsScreenProps) {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const insets = useSafeAreaInsets();

  const handlePressItem = useCallback(
    (item: ListItem, origin: { x: number; y: number; width: number; height: number }) => {
      navigation.navigate('ItemDetail', { item, origin });
    },
    [navigation],
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <Text style={styles.title}>Details Screen123</Text>
      <Text style={styles.title}>热更新测试版本0.2</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button title="Open ActionSheet" onPress={() => actionSheetRef.current?.show()} />
      <View style={styles.listContainer}>
        <FlashList
          data={DATA}
          renderItem={({ item }) => <HeroItem item={item} onPressItem={handlePressItem} />}
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
