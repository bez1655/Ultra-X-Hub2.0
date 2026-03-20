// components/BrightnessControl.tsx
import { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import * as Brightness from 'expo-brightness';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Sun } from 'lucide-react-native';

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
        const { status } = await Brightness.requestPermissionsAsync();
        if (status === 'granted') {
          const current = await Brightness.getBrightnessAsync();
          currentBrightness.current = current ?? 0.5;
        }
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
      duration: 600,
      delay: 1000,
      useNativeDriver: true,
    }).start();
  };

  const onGestureEvent = (event: PanGestureHandlerGestureEvent) => {
    const { translationY, x } = event.nativeEvent;

    // Игнорируем правую половину экрана
    if (x >= LEFT_HALF) return;

    // Показываем индикатор при первом движении
    if (brightness === null) {
      setBrightness(currentBrightness.current);
      showIndicator();
    }

    // Изменяем яркость
    let next = currentBrightness.current - translationY * 0.002;
    next = Math.max(0.05, Math.min(1, next));

    if (Math.abs(next - currentBrightness.current) > 0.005) {
      currentBrightness.current = next;
      Brightness.setBrightnessAsync(next).catch(() => {});
      setBrightness(next);
    }
  };

  const onHandlerStateChange = () => {
    hideIndicator();
    setTimeout(() => setBrightness(null), 1800);
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
      <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
        {brightness !== null && (
          <Animated.View
            style={[
              styles.overlay,
              {
                opacity: fadeAnim,
                paddingTop: insets.top + 100,
              },
            ]}
            pointerEvents="none"
          >
            <View style={styles.indicatorContainer}>
              <Sun size={24} color="#ff2d55" style={{ marginBottom: 12 }} />
              <Text style={styles.percentText}>{percent}%</Text>
              <View style={styles.barContainer}>
                <View style={[styles.bar, { height: percent ? `${percent}%` : '0%' }]} />
              </View>
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
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  indicatorContainer: {
    width: 70,
    height: 200,
    backgroundColor: 'rgba(24,24,27,0.95)',
    borderRadius: 35,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: '#27272a',
  },
  barContainer: {
    flex: 1,
    width: 14,
    backgroundColor: '#27272a',
    borderRadius: 7,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  bar: {
    width: '100%',
    backgroundColor: '#ff2d55',
    borderRadius: 7,
  },
  percentText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
