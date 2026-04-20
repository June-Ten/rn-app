import React, { useCallback, useEffect } from 'react';
import { Dimensions, Pressable, Text, View } from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { styles } from './styles';

const { width: SCREEN_W } = Dimensions.get('window');

// Hero 展开后的目标区域（顶部大 header）
const HERO_TARGET_X = 0;
const HERO_TARGET_Y = 0;
const HERO_TARGET_W = SCREEN_W;
const HERO_TARGET_H = 260;

// 过渡时长
const OPEN_DURATION = 420;
const CLOSE_DURATION = 300;

type OriginRect = { x: number; y: number; width: number; height: number };

interface ItemDetailParams {
  item: { id: string; title: string; color: string };
  origin: OriginRect;
}

interface ItemDetailScreenProps {
  navigation: any;
  route: { params: ItemDetailParams };
}

export function ItemDetailScreen({ navigation, route }: ItemDetailScreenProps) {
  const { item, origin } = route.params;

  // 0 = 列表项位置   1 = 详情顶部 header 位置
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(1, {
      duration: OPEN_DURATION,
      easing: Easing.out(Easing.cubic),
    });
  }, [progress]);

  const handleBack = useCallback(() => {
    progress.value = withTiming(
      0,
      { duration: CLOSE_DURATION, easing: Easing.in(Easing.cubic) },
      (finished) => {
        if (finished) {
          runOnJS(navigation.goBack)();
        }
      },
    );
  }, [navigation, progress]);

  // 背景板：随进度淡入白色，遮盖住后面的列表
  const backdropStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
  }));

  // Hero 卡片从 origin 位置插值到目标位置
  const heroStyle = useAnimatedStyle(() => {
    const p = progress.value;
    return {
      left: origin.x + (HERO_TARGET_X - origin.x) * p,
      top: origin.y + (HERO_TARGET_Y - origin.y) * p,
      width: origin.width + (HERO_TARGET_W - origin.width) * p,
      height: origin.height + (HERO_TARGET_H - origin.height) * p,
      // 列表项圆角 12，展开后无圆角
      borderRadius: 12 * (1 - p),
    };
  });

  // Hero 标题：在列表状态时小字，展开后大字
  const heroTitleStyle = useAnimatedStyle(() => {
    const p = progress.value;
    return {
      fontSize: 18 + (30 - 18) * p,
      marginTop: 16 + (120 - 16) * p,
      marginLeft: 16,
    };
  });

  // 详情正文：展开到一半后再淡入
  const contentStyle = useAnimatedStyle(() => {
    const p = progress.value;
    const opacity = p < 0.5 ? 0 : (p - 0.5) / 0.5;
    return {
      opacity,
      transform: [{ translateY: (1 - opacity) * 16 }],
    };
  });

  return (
    <View style={styles.heroRoot} pointerEvents="box-none">
      <Animated.View style={[styles.heroBackdrop, backdropStyle]} pointerEvents="none" />

      <Animated.View style={[styles.heroCard, heroStyle, { backgroundColor: item.color }]}>
        <Animated.Text style={[styles.heroCardTitle, heroTitleStyle]}>
          {item.title}
        </Animated.Text>
      </Animated.View>

      <Animated.View
        style={[styles.heroContent, { paddingTop: HERO_TARGET_H + 24 }, contentStyle]}
      >
        <Text style={styles.heroDesc}>
          这是 {item.title} 的详情页。卡片从列表中的位置通过 Hero 动画展开到顶部大图，返回时会平滑缩回原位置。
        </Text>
        <Text style={styles.heroDescMuted}>ID：{item.id}</Text>

        <Pressable style={styles.heroBackBtn} onPress={handleBack}>
          <Text style={styles.heroBackBtnText}>返回</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}
