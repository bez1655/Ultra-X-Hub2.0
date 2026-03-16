import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { sites } from '@/constants/sites';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const filtered = sites.filter(site =>
    site.name.toLowerCase().includes(query.toLowerCase()) ||
    (site.category && site.category.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#000', padding: 16 }}>
      <Text style={{ color: '#ff2d55', fontSize: 28, fontWeight: 'bold', marginBottom: 16 }}>
        Поиск
      </Text>

      <TextInput
        placeholder="Поиск сайта, категории, VR..."
        placeholderTextColor="#777"
        value={query}
        onChangeText={setQuery}
        style={{
          backgroundColor: '#111',
          color: '#fff',
          padding: 14,
          borderRadius: 12,
          marginBottom: 20,
          fontSize: 16,
        }}
      />

      <FlatList
        data={filtered}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push({ pathname: '/', params: { search: item.name } })}
            style={{
              backgroundColor: '#1a1a1a',
              padding: 16,
              borderRadius: 12,
              marginBottom: 12,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View>
              <Text style={{ color: '#fff', fontSize: 18, fontWeight: '600' }}>
                {item.name}
              </Text>
              {item.category && (
                <Text style={{ color: '#aaa', fontSize: 13, marginTop: 4 }}>
                  {item.category} {item.vr ? '• VR' : ''}
                </Text>
              )}
            </View>
            <Text style={{ color: '#ff2d55', fontSize: 16 }}>→</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={{ color: '#777', textAlign: 'center', marginTop: 40, fontSize: 16 }}>
            Ничего не найдено...
          </Text>
        }
      />
    </View>
  );
}