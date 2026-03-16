import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#000' } }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="pin" options={{ presentation: 'modal' }} />
        <Stack.Screen name="vr-player/[id]" options={{ presentation: 'fullScreenModal' }} />
      </Stack>
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}