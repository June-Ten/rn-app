import React, { useRef } from 'react';
import { Button, Text, View } from 'react-native';
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { styles } from './styles';

interface DetailsScreenProps {
  navigation: any;
}

export function DetailsScreen({ navigation }: DetailsScreenProps) {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Details Screen</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button title="Open ActionSheet" onPress={() => actionSheetRef.current?.show()} />
      <ActionSheet ref={actionSheetRef} gestureEnabled={true} defaultOverlayOpacity={0.3}>
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 16, marginBottom: 12 }}>这是一个 ActionSheet 示例</Text>
          <Button title="关闭" onPress={() => actionSheetRef.current?.hide()} />
        </View>
      </ActionSheet>
    </View>
  );
}


