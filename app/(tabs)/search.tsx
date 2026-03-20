import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Search as SearchIcon, ArrowRight, Star, Glasses } from 'lucide-react-native';
import { sites, categoryColors } from '../../constants/sites';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const filtered = sites.filter(site =>
    site.name.toLowerCase().includes(query.toLowerCase()) ||
    (site.category && site.category.toLowerCase().includes(query.toLowerCase()))
  );

  const popularSearches = ['VR', 'Lesbian', 'MILF', 'Teen', 'Hentai', 'BDSM', 'Premium'];

  return (
    <View style={{ flex: 1, backgroundColor: '#09090b', padding: 20 }}>
      {/* Header */}
      <View style={{ paddingTop: 50, marginBottom: 24 }}>
        <Text
          style={{
            color: '#ff2d55',
            fontSize: 32,
            fontWeight: '800',
            marginBottom: 8,
          }}
        >
          Поиск
        </Text>
        <Text style={{ color: '#52525b', fontSize: 14 }}>
          Найди идеальный контент
        </Text>
      </View>

      {/* Search Input */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#18181b',
          borderRadius: 16,
          paddingHorizontal: 16,
          marginBottom: 20,
          borderWidth: 1,
          borderColor: '#27272a',
        }}
      >
        <SearchIcon size={20} color="#52525b" />
        <TextInput
          placeholder="Сайт, категория, VR..."
          placeholderTextColor="#52525b"
          value={query}
          onChangeText={setQuery}
          style={{
            flex: 1,
            color: '#fff',
            padding: 16,
            fontSize: 16,
          }}
          data-testid="search-screen-input"
        />
      </View>

      {/* Popular Searches */}
      {!query && (
        <View style={{ marginBottom: 24 }}>
          <Text style={{ color: '#a1a1aa', fontSize: 14, marginBottom: 12 }}>
            Популярные запросы
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {popularSearches.map(term => (
              <TouchableOpacity
                key={term}
                onPress={() => setQuery(term)}
                style={{
                  backgroundColor: '#18181b',
                  paddingHorizontal: 14,
                  paddingVertical: 8,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: '#27272a',
                }}
                data-testid={`popular-${term}`}
              >
                <Text style={{ color: '#fff', fontSize: 14 }}>{term}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Results */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id.toString()}
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
              justifyContent: 'space-between',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#27272a',
            }}
            data-testid={`search-result-${item.id}`}
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
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
                {item.category && (
                  <Text
                    style={{
                      color: categoryColors[item.category] || '#a855f7',
                      fontSize: 13,
                      textTransform: 'capitalize',
                    }}
                  >
                    {item.category}
                  </Text>
                )}
                {item.rating && (
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 12 }}>
                    <Star size={12} color="#ffd700" fill="#ffd700" />
                    <Text style={{ color: '#ffd700', fontSize: 12, marginLeft: 4 }}>
                      {item.rating}
                    </Text>
                  </View>
                )}
              </View>
            </View>
            <ArrowRight size={20} color="#ff2d55" />
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: 60 }}>
            <SearchIcon size={48} color="#27272a" />
            <Text style={{ color: '#52525b', textAlign: 'center', marginTop: 16, fontSize: 16 }}>
              Ничего не найдено...
            </Text>
          </View>
        }
      />
    </View>
  );
}
