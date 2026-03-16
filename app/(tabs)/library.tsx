import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { sites } from '@/constants/sites';

type HistoryItem = { name: string; url: string; time: string };

export default function LibraryScreen() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    (async () => {
      const favs = await AsyncStorage.getItem('favorites');
      if (favs) setFavorites(JSON.parse(favs));

      const hist = await AsyncStorage.getItem('history');
      if (hist) setHistory(JSON.parse(hist));
    })();
  }, []);

  const favoriteSites = sites.filter(s => favorites.includes(s.name));

  return (
    <View style={{ flex: 1, backgroundColor: '#000', padding: 16 }}>
      <Text style={{ color: '#ff2d55', fontSize: 28, fontWeight: 'bold', marginBottom: 20 }}>
        Библиотека
      </Text>

      <Text style={{ color: '#fff', fontSize: 20, marginVertical: 12 }}>Избранное ❤️</Text>
      {favoriteSites.length === 0 ? (
        <Text style={{ color: '#777', fontSize: 16 }}>Пока ничего не добавлено</Text>
      ) : (
        <FlatList
          data={favoriteSites}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => router.push({ pathname: '/', params: { search: item.name } })}
              style={{
                backgroundColor: '#1a1a1a',
                padding: 16,
                borderRadius: 12,
                marginRight: 12,
                width: 160,
              }}
            >
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>
                {item.name}
              </Text>
              {item.category && (
                <Text style={{ color: '#aaa', fontSize: 13, marginTop: 4 }}>
                  {item.category}
                </Text>
              )}
            </TouchableOpacity>
          )}
          keyExtractor={item => item.name}
        />
      )}

      <Text style={{ color: '#fff', fontSize: 20, marginTop: 32, marginBottom: 12 }}>
        Недавно просмотренное
      </Text>
      <FlatList
        data={history.slice(0, 10)}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push({ pathname: '/', params: { search: item.name } })}
            style={{
              paddingVertical: 14,
              borderBottomWidth: 1,
              borderBottomColor: '#222',
            }}
          >
            <Text style={{ color: '#fff', fontSize: 16 }}>{item.name}</Text>
            <Text style={{ color: '#777', fontSize: 13, marginTop: 4 }}>
              {new Date(item.time).toLocaleString()}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(_, i) => i.toString()}
        ListEmptyComponent={
          <Text style={{ color: '#777', fontSize: 16, marginTop: 20 }}>
            История пока пуста
          </Text>
        }
      />
    </View>
  );
}