import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import BrightnessControl from '../../components/BrightnessControl';

export default function TabLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarStyle: { backgroundColor: '#111', borderTopColor: '#333' },
          tabBarActiveTintColor: '#ff2d55',
          tabBarInactiveTintColor: '#777',
          headerShown: false,
        }}
      >
        <Tabs.Screen name="index" options={{ title: 'Главная', tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} /> }} />
        <Tabs.Screen name="search" options={{ title: 'Поиск', tabBarIcon: ({ color }) => <Ionicons name="search" size={24} color={color} /> }} />
        <Tabs.Screen name="vr" options={{ title: 'VR', tabBarIcon: ({ color }) => <Ionicons name="glasses" size={24} color={color} /> }} />
        <Tabs.Screen name="library" options={{ title: 'Библиотека', tabBarIcon: ({ color }) => <Ionicons name="folder" size={24} color={color} /> }} />
      </Tabs>
      <BrightnessControl />
    </>
  );
}