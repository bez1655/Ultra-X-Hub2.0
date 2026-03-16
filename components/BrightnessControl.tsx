// components/BrightnessControl.tsx
import { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  PanGestureHandler,
  type PanGestureHandlerGestureEvent,
} from 'react-native';
import * as Brightness from 'expo-screen-brightness';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const LEFT_HALF = SCREEN_WIDTH / 2;

export default function BrightnessControl() {
  const insets = useSafeAreaInsets();
  const [brightness, setBrightness] = useState<number | null>(null);
  const currentBrightness = useRef(0.5);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Инициализация текущей яркости при монтировании
  useEffect(() => {
    (async () => {
      try {
        const current = await Brightness.getScreenBrightnessAsync();
        currentBrightness.current = current ?? 0.5;
      } catch (e) {
        console.log('Не удалось получить текущую яркость', e);
      }
    })();
  }, []);

  const showIndicator = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const hideIndicator = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 800,
      delay: 1200,
      useNativeDriver: true,
    }).start();
  };

  const onGestureEvent = (event: PanGestureHandlerGestureEvent) => {
    const { translationY, x, state } = event.nativeEvent;

    // Игнорируем правую половину экрана (обычно там регулировка громкости)
    if (x >= LEFT_HALF) return;

    // Показываем индикатор при первом движении
    if (brightness === null) {
      setBrightness(currentBrightness.current);
      showIndicator();
    }

    // Изменяем яркость
    let next = currentBrightness.current - translationY * 0.002;
    next = Math.max(0.05, Math.min(1, next)); // 5% минимум — чтобы не было совсем чёрно

    if (Math.abs(next - currentBrightness.current) > 0.005) {
      currentBrightness.current = next;
      Brightness.setScreenBrightnessAsync(next).catch(() => {});
      setBrightness(next);
    }
  };

  const onHandlerStateChange = () => {
    hideIndicator();
    // Сбрасываем индикатор через 2 секунды после окончания жеста
    setTimeout(() => setBrightness(null), 2200);
  };

  const percent = brightness !== null ? Math.round(brightness * 100) : null;

  return (
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}
      activeOffsetY={[-15, 15]}
      failOffsetX={[-30, 30]}
      minPointers={1}
      maxPointers={1}
    >
      <View style={StyleSheet.absoluteFill}>
        {brightness !== null && (
          <Animated.View
            style={[
              styles.overlay,
              {
                opacity: fadeAnim,
                paddingTop: insets.top + 20,
              },
            ]}
          >
            <View style={styles.indicatorContainer}>
              <Text style={styles.percentText}>{percent}%</Text>
              <View style={[styles.bar, { height: `${percent}%` }]} />
            </View>
          </Animated.View>
        )}
      </View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-start',
    alignItems: 'center',
    pointerEvents: 'none',
  },
  indicatorContainer: {
    width: 60,
    height: 220,
    backgroundColor: 'rgba(40,40,50,0.85)',
    borderRadius: 30,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  bar: {
    width: 12,
    backgroundColor: '#ff2d55',
    borderRadius: 6,
    position: 'absolute',
    bottom: 8,
  },
  percentText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
    zIndex: 1,
  },
});