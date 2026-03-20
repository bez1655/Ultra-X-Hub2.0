import { View, Text, FlatList, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useFocusEffect } from 'expo-router';
import { Heart, Clock, Trash2, Star, Settings, Lock } from 'lucide-react-native';
import { sites, categoryColors } from '../../constants/sites';

type HistoryItem = { name: string; url: string; time: string };

export default function LibraryScreen() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<number[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [activeSection, setActiveSection] = useState<'favorites' | 'history'>('favorites');

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const loadData = async () => {
    try {
      const favs = await AsyncStorage.getItem('favorites');
      if (favs) setFavorites(JSON.parse(favs));

      const hist = await AsyncStorage.getItem('history');
      if (hist) setHistory(JSON.parse(hist));
    } catch (e) {
      console.log('Error loading library data:', e);
    }
  };

  const clearHistory = async () => {
    Alert.alert(
      'Очистить историю?',
      'Это действие нельзя отменить',
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Очистить',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.removeItem('history');
            setHistory([]);
          },
        },
      ]
    );
  };

  const removeFavorite = async (siteId: number) => {
    const newFavorites = favorites.filter(id => id !== siteId);
    await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  };

  const favoriteSites = sites.filter(s => favorites.includes(s.id));

  return (
    <View style={{ flex: 1, backgroundColor: '#09090b' }}>
      {/* Header */}
      <View style={{ paddingHorizontal: 20, paddingTop: 70, paddingBottom: 20 }}>
        <Text
          style={{
            color: '#ff2d55',
            fontSize: 32,
            fontWeight: '800',
          }}
        >
          Библиотека
        </Text>
        <Text style={{ color: '#52525b', fontSize: 14, marginTop: 4 }}>
          Избранное и история просмотров
        </Text>
      </View>

      {/* Tabs */}
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 20,
          marginBottom: 20,
          gap: 12,
        }}
      >
        <TouchableOpacity
          onPress={() => setActiveSection('favorites')}
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: activeSection === 'favorites' ? '#ff2d55' : '#18181b',
            padding: 14,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: activeSection === 'favorites' ? '#ff2d55' : '#27272a',
          }}
          data-testid="favorites-tab"
        >
          <Heart size={18} color="#fff" fill={activeSection === 'favorites' ? '#fff' : 'transparent'} />
          <Text style={{ color: '#fff', fontWeight: '600', marginLeft: 8 }}>
            Избранное ({favoriteSites.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveSection('history')}
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: activeSection === 'history' ? '#a855f7' : '#18181b',
            padding: 14,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: activeSection === 'history' ? '#a855f7' : '#27272a',
          }}
          data-testid="history-tab"
        >
          <Clock size={18} color="#fff" />
          <Text style={{ color: '#fff', fontWeight: '600', marginLeft: 8 }}>
            История ({history.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Settings Row */}
      <View style={{ flexDirection: 'row', paddingHorizontal: 20, marginBottom: 16, gap: 12 }}>
        <TouchableOpacity
          onPress={() => router.push('/pin')}
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#18181b',
            padding: 14,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: '#27272a',
          }}
          data-testid="settings-pin-btn"
        >
          <Lock size={18} color="#22c55e" />
          <Text style={{ color: '#fff', marginLeft: 10, fontSize: 14 }}>Настроить PIN</Text>
        </TouchableOpacity>

        {activeSection === 'history' && history.length > 0 && (
          <TouchableOpacity
            onPress={clearHistory}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#18181b',
              padding: 14,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: '#ef4444',
            }}
            data-testid="clear-history-btn"
          >
            <Trash2 size={18} color="#ef4444" />
          </TouchableOpacity>
        )}
      </View>

      {/* Content */}
      {activeSection === 'favorites' ? (
        <FlatList
          data={favoriteSites}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => router.push({ pathname: '/', params: { search: item.name } })}
              style={{
                backgroundColor: '#18181b',
                padding: 16,
                borderRadius: 16,
                marginBottom: 12,
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#27272a',
              }}
              data-testid={`favorite-${item.id}`}
            >
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ color: '#fff', fontSize: 17, fontWeight: '600' }}>
                    {item.name}
                  </Text>
                  {item.vr && (
                    <View
                      style={{
                        backgroundColor: '#00d4ff',
                        paddingHorizontal: 6,
                        paddingVertical: 2,
                        borderRadius: 4,
                        marginLeft: 8,
                      }}
                    >
                      <Text style={{ color: '#000', fontSize: 10, fontWeight: '700' }}>VR</Text>
                    </View>
                  )}
                </View>
                {item.category && (
                  <Text
                    style={{
                      color: categoryColors[item.category] || '#a855f7',
                      fontSize: 13,
                      marginTop: 4,
                      textTransform: 'capitalize',
                    }}
                  >
                    {item.category}
                  </Text>
                )}
              </View>

              <TouchableOpacity
                onPress={() => removeFavorite(item.id)}
                style={{
                  padding: 10,
                  backgroundColor: '#27272a',
                  borderRadius: 10,
                }}
                data-testid={`remove-fav-${item.id}`}
              >
                <Heart size={18} color="#ff2d55" fill="#ff2d55" />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View style={{ alignItems: 'center', marginTop: 60 }}>
              <Heart size={48} color="#27272a" />
              <Text style={{ color: '#52525b', textAlign: 'center', marginTop: 16, fontSize: 16 }}>
                Пока ничего не добавлено{'\n'}в избранное
              </Text>
            </View>
          }
        />
      ) : (
        <FlatList
          data={history}
          keyExtractor={(_, i) => i.toString()}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => router.push({ pathname: '/', params: { search: item.name } })}
              style={{
                backgroundColor: '#18181b',
                padding: 16,
                borderRadius: 12,
                marginBottom: 10,
                borderWidth: 1,
                borderColor: '#27272a',
              }}
              data-testid={`history-item-${item.name}`}
            >
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: '500' }}>{item.name}</Text>
              <Text style={{ color: '#52525b', fontSize: 12, marginTop: 6 }}>
                {new Date(item.time).toLocaleString('ru-RU')}
              </Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View style={{ alignItems: 'center', marginTop: 60 }}>
              <Clock size={48} color="#27272a" />
              <Text style={{ color: '#52525b', textAlign: 'center', marginTop: 16, fontSize: 16 }}>
                История просмотров пуста
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
}
