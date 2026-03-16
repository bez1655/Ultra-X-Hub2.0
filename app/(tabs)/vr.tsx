import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { sites } from '@/constants/sites';

const vrSites = sites.filter(s => s.vr);

export default function VRScreen() {
  const router = useRouter();
  const [pinExists, setPinExists] = useState(false);

  useEffect(() => {
    (async () => {
      const pin = await SecureStore.getItemAsync('app_pin');
      setPinExists(!!pin);
    })();
  }, []);

  const openVR = async (site: typeof sites[0]) => {
    if (!pinExists) {
      router.push('/pin');
      return;
    }

    Alert.alert(
      'VR готов',
      'Подключение Lovense Toy...\n\nВибрация синхронизирована с видео 🔥',
      [{ text: 'Запустить', onPress: () => router.push(`/vr-player/${encodeURIComponent(site.name)}`) }]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#000', padding: 16 }}>
      <Text style={{ color: '#ff2d55', fontSize: 32, fontWeight: 'bold', marginBottom: 12 }}>
        VR 2026
      </Text>
      <Text style={{ color: '#aaa', marginBottom: 24, fontSize: 15 }}>
        Quest 3 / Vision Pro / 16K + Passthrough + Lovense Sync
      </Text>

      <FlatList
        data={vrSites}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => openVR(item)}
            style={{
              backgroundColor: '#111',
              padding: 16,
              borderRadius: 16,
              marginBottom: 12,
              borderWidth: 1,
              borderColor: '#222',
            }}
          >
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: '600' }}>
              {item.name}
            </Text>
            <Text style={{ color: '#0f0', marginTop: 6, fontSize: 14 }}>
              ▶️ Запустить в VR (WebXR)
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={{ color: '#777', textAlign: 'center', marginTop: 60, fontSize: 16 }}>
            VR-контент пока не добавлен
          </Text>
        }
      />
    </View>
  );
}