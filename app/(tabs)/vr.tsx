import { View, Text, FlatList, TouchableOpacity, Alert, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { Glasses, Play, Lock, Sparkles, Wifi, Star } from 'lucide-react-native';
import { sites } from '../../constants/sites';

const vrSites = sites.filter(s => s.vr);

export default function VRScreen() {
  const router = useRouter();
  const [pinExists, setPinExists] = useState(false);

  useEffect(() => {
    checkPin();
  }, []);

  const checkPin = async () => {
    const pin = await SecureStore.getItemAsync('app_pin');
    setPinExists(!!pin);
  };

  const openVR = async (site: typeof sites[0]) => {
    if (!pinExists) {
      Alert.alert(
        'PIN требуется',
        'Установите PIN для доступа к VR-контенту',
        [
          { text: 'Отмена', style: 'cancel' },
          { text: 'Установить PIN', onPress: () => router.push('/pin') },
        ]
      );
      return;
    }

    Alert.alert(
      `🥽 ${site.name}`,
      'Подключение к VR...\n\n✓ Quest 3 / Vision Pro\n✓ 8K Passthrough\n✓ Lovense Sync Ready',
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Запустить WebXR',
          onPress: () => router.push(`/vr-player/${encodeURIComponent(site.name)}`),
        },
        {
          text: 'Открыть сайт',
          onPress: () => Linking.openURL(site.url),
        },
      ]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#09090b', padding: 20 }}>
      {/* Header */}
      <View style={{ paddingTop: 50, marginBottom: 24 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={{
              color: '#00d4ff',
              fontSize: 32,
              fontWeight: '800',
            }}
          >
            VR 2026
          </Text>
          <View
            style={{
              backgroundColor: '#00d4ff',
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 8,
              marginLeft: 12,
            }}
          >
            <Text style={{ color: '#000', fontSize: 12, fontWeight: '700' }}>16K</Text>
          </View>
        </View>
        <Text style={{ color: '#52525b', fontSize: 14, marginTop: 8 }}>
          Quest 3 • Vision Pro • Passthrough • Lovense Sync
        </Text>
      </View>

      {/* Stats */}
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#18181b',
          borderRadius: 16,
          padding: 16,
          marginBottom: 24,
          borderWidth: 1,
          borderColor: '#27272a',
        }}
      >
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={{ color: '#00d4ff', fontSize: 24, fontWeight: '700' }}>{vrSites.length}</Text>
          <Text style={{ color: '#52525b', fontSize: 12 }}>VR сайтов</Text>
        </View>
        <View style={{ width: 1, backgroundColor: '#27272a' }} />
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={{ color: '#a855f7', fontSize: 24, fontWeight: '700' }}>8K+</Text>
          <Text style={{ color: '#52525b', fontSize: 12 }}>Разрешение</Text>
        </View>
        <View style={{ width: 1, backgroundColor: '#27272a' }} />
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={{ color: '#ff2d55', fontSize: 24, fontWeight: '700' }}>60</Text>
          <Text style={{ color: '#52525b', fontSize: 12 }}>FPS</Text>
        </View>
      </View>

      {/* PIN Status */}
      <TouchableOpacity
        onPress={() => router.push('/pin')}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: pinExists ? '#18181b' : '#ff2d5520',
          padding: 16,
          borderRadius: 12,
          marginBottom: 20,
          borderWidth: 1,
          borderColor: pinExists ? '#27272a' : '#ff2d55',
        }}
        data-testid="pin-status-btn"
      >
        <Lock size={20} color={pinExists ? '#22c55e' : '#ff2d55'} />
        <Text style={{ color: '#fff', marginLeft: 12, flex: 1 }}>
          {pinExists ? 'PIN установлен ✓' : 'Установите PIN для VR'}
        </Text>
        {!pinExists && (
          <Text style={{ color: '#ff2d55', fontSize: 12 }}>Настроить →</Text>
        )}
      </TouchableOpacity>

      {/* VR Sites List */}
      <FlatList
        data={vrSites}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => openVR(item)}
            style={{
              backgroundColor: '#18181b',
              padding: 18,
              borderRadius: 16,
              marginBottom: 12,
              borderWidth: 1,
              borderColor: '#27272a',
            }}
            data-testid={`vr-site-${item.id}`}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ color: '#fff', fontSize: 18, fontWeight: '600' }}>
                    {item.name}
                  </Text>
                  {item.rating && (
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                      <Star size={12} color="#ffd700" fill="#ffd700" />
                      <Text style={{ color: '#ffd700', fontSize: 12, marginLeft: 4 }}>
                        {item.rating}
                      </Text>
                    </View>
                  )}
                </View>
                {item.category && (
                  <Text
                    style={{
                      color: '#a855f7',
                      fontSize: 13,
                      marginTop: 4,
                      textTransform: 'capitalize',
                    }}
                  >
                    {item.category}
                  </Text>
                )}
              </View>

              <View
                style={{
                  backgroundColor: '#00d4ff',
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Play size={20} color="#000" fill="#000" />
              </View>
            </View>

            {/* Features */}
            <View style={{ flexDirection: 'row', marginTop: 12, gap: 8 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#27272a',
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 6,
                }}
              >
                <Glasses size={12} color="#00d4ff" />
                <Text style={{ color: '#a1a1aa', fontSize: 11, marginLeft: 4 }}>WebXR</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#27272a',
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 6,
                }}
              >
                <Wifi size={12} color="#22c55e" />
                <Text style={{ color: '#a1a1aa', fontSize: 11, marginLeft: 4 }}>Stream</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#27272a',
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 6,
                }}
              >
                <Sparkles size={12} color="#ff2d55" />
                <Text style={{ color: '#a1a1aa', fontSize: 11, marginLeft: 4 }}>Lovense</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: 60 }}>
            <Glasses size={48} color="#27272a" />
            <Text style={{ color: '#52525b', textAlign: 'center', marginTop: 16, fontSize: 16 }}>
              VR-контент пока не добавлен
            </Text>
          </View>
        }
      />
    </View>
  );
}
