import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
  FlatList,
  Image,
  Linking,
  ActivityIndicator,
  Dimensions,
  RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  Heart,
  Shuffle,
  MessageCircle,
  Flame,
  Share2,
  Download,
  Eye,
  Star,
  X,
  Send,
  Sparkles,
} from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Clipboard from 'expo-clipboard';
import * as Notifications from 'expo-notifications';
import { sites, categories, categoryColors, Site } from '../../constants/sites';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = (SCREEN_WIDTH - 48) / 2;

// Grok API from environment variables
const GROK_API_KEY = process.env.EXPO_PUBLIC_GROK_API_KEY || '';
const GROK_API_URL = process.env.EXPO_PUBLIC_GROK_API_URL || 'https://api.x.ai/v1/chat/completions';

// Рекомендации (моковые данные)
const mockRecommendations = [
  { id: 'rec1', title: 'Hot VR MILF 8K', thumb: 'https://picsum.photos/400/300?random=1' },
  { id: 'rec2', title: 'Amateur Russian 4K', thumb: 'https://picsum.photos/400/300?random=2' },
  { id: 'rec3', title: 'Lesbian Massage HD', thumb: 'https://picsum.photos/400/300?random=3' },
  { id: 'rec4', title: 'Teen Casting POV', thumb: 'https://picsum.photos/400/300?random=4' },
  { id: 'rec5', title: 'BDSM Dungeon 4K', thumb: 'https://picsum.photos/400/300?random=5' },
  { id: 'rec6', title: 'Hentai Uncensored', thumb: 'https://picsum.photos/400/300?random=6' },
];

export default function Home() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<string>('All');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  
  // AI Modal states
  const [aiModalVisible, setAiModalVisible] = useState(false);
  const [currentSite, setCurrentSite] = useState<Site | null>(null);
  const [aiDescription, setAiDescription] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  
  // AI Advisor Modal
  const [advisorModalVisible, setAdvisorModalVisible] = useState(false);
  const [advisorMessages, setAdvisorMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([]);
  const [advisorInput, setAdvisorInput] = useState('');
  const [advisorLoading, setAdvisorLoading] = useState(false);
  
  // Dirty level для генерации
  const [dirtyLevel, setDirtyLevel] = useState(0.95);

  // Загрузка избранного
  useEffect(() => {
    loadFavorites();
    requestNotificationPermission();
  }, []);

  const loadFavorites = async () => {
    try {
      const saved = await AsyncStorage.getItem('favorites');
      if (saved) setFavorites(JSON.parse(saved));
    } catch (e) {
      console.log('Error loading favorites:', e);
    }
  };

  const saveFavorites = async (newFavorites: number[]) => {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (e) {
      console.log('Error saving favorites:', e);
    }
  };

  const toggleFavorite = (siteId: number) => {
    const newFavorites = favorites.includes(siteId)
      ? favorites.filter(id => id !== siteId)
      : [...favorites, siteId];
    saveFavorites(newFavorites);
  };

  const requestNotificationPermission = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      console.log('Notification permission not granted');
    }
  };

  // Grok AI Description
  const generateAIDescription = async (site: Site) => {
    setCurrentSite(site);
    setAiModalVisible(true);
    setAiLoading(true);
    setAiDescription('');

    try {
      const response = await fetch(GROK_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROK_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'grok-3',
          messages: [
            {
              role: 'system',
              content: `Ты — сексуальный AI-помощник для взрослых. Пиши откровенные, возбуждающие описания порно-сайтов. Будь чувственным, развратным, используй эротические метафоры. Уровень откровенности: ${Math.round(dirtyLevel * 100)}%. Пиши на русском, 2-3 предложения.`,
            },
            {
              role: 'user',
              content: `Напиши горячее, сексуальное описание для сайта "${site.name}" (${site.url}). Категория: ${site.category || 'general'}. ${site.vr ? 'Это VR-контент.' : ''}`,
            },
          ],
          max_tokens: 200,
          temperature: 0.9,
        }),
      });

      const data = await response.json();
      if (data.choices && data.choices[0]) {
        setAiDescription(data.choices[0].message.content);
      } else {
        setAiDescription('Не удалось сгенерировать описание. Попробуй позже 🔥');
      }
    } catch (error) {
      console.error('Grok API error:', error);
      setAiDescription('Ошибка подключения к AI. Проверь интернет 💔');
    } finally {
      setAiLoading(false);
    }
  };

  // AI Advisor Chat
  const sendToAdvisor = async () => {
    if (!advisorInput.trim()) return;
    
    const userMessage = advisorInput.trim();
    setAdvisorMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setAdvisorInput('');
    setAdvisorLoading(true);

    try {
      const response = await fetch(GROK_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROK_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'grok-3',
          messages: [
            {
              role: 'system',
              content: `Ты — AI Porn Advisor 2026. Ты эксперт по взрослому контенту, знаешь все порно-сайты, категории, актрис, тренды. Помогай пользователю найти идеальный контент. Будь дружелюбным, немного игривым и откровенным. Отвечай на русском. Рекомендуй сайты из базы: ${sites.map(s => s.name).join(', ')}.`,
            },
            ...advisorMessages.map(m => ({
              role: m.role === 'user' ? 'user' : 'assistant',
              content: m.text,
            })),
            { role: 'user', content: userMessage },
          ],
          max_tokens: 300,
          temperature: 0.85,
        }),
      });

      const data = await response.json();
      if (data.choices && data.choices[0]) {
        setAdvisorMessages(prev => [...prev, { role: 'ai', text: data.choices[0].message.content }]);
      }
    } catch (error) {
      setAdvisorMessages(prev => [...prev, { role: 'ai', text: 'Ошибка связи с AI. Попробуй снова 💜' }]);
    } finally {
      setAdvisorLoading(false);
    }
  };

  // Surprise Me - Random site
  const surpriseMe = () => {
    const randomSite = sites[Math.floor(Math.random() * sites.length)];
    Alert.alert(
      `🎲 ${randomSite.name}`,
      `Категория: ${randomSite.category || 'General'}\n${randomSite.vr ? '🥽 VR доступен!' : ''}`,
      [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Открыть 🔥', onPress: () => Linking.openURL(randomSite.url) },
      ]
    );
  };

  // Share site
  const shareSite = async (site: Site) => {
    await Clipboard.setStringAsync(`${site.name}: ${site.url}`);
    Alert.alert('Скопировано!', 'Ссылка скопирована в буфер обмена 📋');
  };

  // Add to history
  const addToHistory = async (site: Site) => {
    try {
      const historyRaw = await AsyncStorage.getItem('history');
      const history = historyRaw ? JSON.parse(historyRaw) : [];
      const newEntry = { name: site.name, url: site.url, time: new Date().toISOString() };
      const updated = [newEntry, ...history.filter((h: any) => h.name !== site.name)].slice(0, 50);
      await AsyncStorage.setItem('history', JSON.stringify(updated));
    } catch (e) {
      console.log('Error saving history:', e);
    }
  };

  // Open site
  const openSite = (site: Site) => {
    addToHistory(site);
    Linking.openURL(site.url);
  };

  // Filter sites
  const filteredSites = sites.filter(site => {
    const matchesSearch = site.name.toLowerCase().includes(search.toLowerCase());
    
    if (activeTab === 'All') return matchesSearch;
    if (activeTab === 'VR') return site.vr && matchesSearch;
    if (activeTab === 'Top') return site.category === 'top' && matchesSearch;
    if (activeTab === 'Live Cams') return site.category === 'live' && matchesSearch;
    if (activeTab === 'Premium') return site.category === 'premium' && matchesSearch;
    if (activeTab === 'Hentai') return site.category === 'hentai' && matchesSearch;
    if (activeTab === 'Fetish') return site.category === 'fetish' && matchesSearch;
    if (activeTab === 'Trans') return site.category === 'trans' && matchesSearch;
    if (activeTab === 'Lesbian') return site.category === 'lesbian' && matchesSearch;
    
    return matchesSearch;
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  // Site Card Component
  const SiteCard = ({ site }: { site: Site }) => {
    const isFav = favorites.includes(site.id);
    
    return (
      <View
        style={{
          width: CARD_WIDTH,
          backgroundColor: '#18181b',
          borderRadius: 16,
          padding: 12,
          marginBottom: 12,
          borderWidth: 1,
          borderColor: '#27272a',
        }}
      >
        {/* Header */}
        <TouchableOpacity onPress={() => openSite(site)} data-testid={`site-card-${site.id}`}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '700', flex: 1 }} numberOfLines={1}>
              {site.name}
            </Text>
            {site.vr && (
              <View style={{ backgroundColor: '#00d4ff', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 }}>
                <Text style={{ color: '#000', fontSize: 10, fontWeight: '700' }}>VR</Text>
              </View>
            )}
          </View>
          
          {/* Category & Rating */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
            {site.category && (
              <Text style={{ color: categoryColors[site.category] || '#a855f7', fontSize: 12, textTransform: 'capitalize' }}>
                {site.category}
              </Text>
            )}
            {site.rating && (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 8 }}>
                <Star size={12} color="#ffd700" fill="#ffd700" />
                <Text style={{ color: '#ffd700', fontSize: 12, marginLeft: 2 }}>{site.rating}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>

        {/* Actions */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
          <TouchableOpacity
            onPress={() => generateAIDescription(site)}
            style={{ padding: 8, backgroundColor: '#ff2d55', borderRadius: 8 }}
            data-testid={`ai-btn-${site.id}`}
          >
            <Flame size={16} color="#fff" />
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => shareSite(site)}
            style={{ padding: 8, backgroundColor: '#27272a', borderRadius: 8 }}
            data-testid={`share-btn-${site.id}`}
          >
            <Share2 size={16} color="#fff" />
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => openSite(site)}
            style={{ padding: 8, backgroundColor: '#27272a', borderRadius: 8 }}
            data-testid={`open-btn-${site.id}`}
          >
            <Eye size={16} color="#fff" />
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => toggleFavorite(site.id)}
            style={{ padding: 8, backgroundColor: isFav ? '#ff2d55' : '#27272a', borderRadius: 8 }}
            data-testid={`fav-btn-${site.id}`}
          >
            <Heart size={16} color="#fff" fill={isFav ? '#fff' : 'transparent'} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#09090b' }}>
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#ff2d55" />}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{ paddingHorizontal: 20, paddingTop: 60, paddingBottom: 20 }}>
          <Text
            style={{
              fontSize: 36,
              fontWeight: '900',
              color: '#ff2d55',
              textShadowColor: '#ff2d55',
              textShadowOffset: { width: 0, height: 0 },
              textShadowRadius: 20,
            }}
            data-testid="app-title"
          >
            HubX Ultra
          </Text>
          <Text style={{ color: '#71717a', fontSize: 14, marginTop: 4 }}>
            84 сайта • Premium 18+ агрегатор
          </Text>
        </View>

        {/* Search */}
        <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
          <TextInput
            placeholder="Поиск сайтов..."
            placeholderTextColor="#52525b"
            value={search}
            onChangeText={setSearch}
            style={{
              backgroundColor: '#18181b',
              color: '#fff',
              padding: 14,
              borderRadius: 12,
              fontSize: 16,
              borderWidth: 1,
              borderColor: '#27272a',
            }}
            data-testid="search-input"
          />
        </View>

        {/* Category Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ paddingLeft: 20, marginBottom: 20 }}
        >
          {categories.map(cat => (
            <TouchableOpacity
              key={cat}
              onPress={() => setActiveTab(cat)}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 10,
                borderRadius: 20,
                marginRight: 10,
                backgroundColor: activeTab === cat ? '#ff2d55' : '#18181b',
                borderWidth: 1,
                borderColor: activeTab === cat ? '#ff2d55' : '#27272a',
              }}
              data-testid={`tab-${cat}`}
            >
              <Text
                style={{
                  color: activeTab === cat ? '#fff' : '#a1a1aa',
                  fontWeight: '600',
                  fontSize: 14,
                }}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Surprise Me Button */}
        <TouchableOpacity
          onPress={surpriseMe}
          style={{
            marginHorizontal: 20,
            backgroundColor: '#a855f7',
            padding: 16,
            borderRadius: 16,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 24,
          }}
          data-testid="surprise-me-btn"
        >
          <Shuffle size={20} color="#fff" />
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: '700', marginLeft: 10 }}>
            Surprise Me 🎲
          </Text>
        </TouchableOpacity>

        {/* Recommendations */}
        <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
          <Text style={{ color: '#fff', fontSize: 20, fontWeight: '700', marginBottom: 12 }}>
            Рекомендации для тебя 🔥
          </Text>
          <FlatList
            data={mockRecommendations}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => router.push(`/vr-player/${item.id}`)}
                style={{ width: 160, marginRight: 12 }}
                data-testid={`recommendation-${item.id}`}
              >
                <Image
                  source={{ uri: item.thumb }}
                  style={{ width: 160, height: 100, borderRadius: 12 }}
                />
                <Text style={{ color: '#fff', fontSize: 13, marginTop: 6 }} numberOfLines={1}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Sites Grid */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <Text style={{ color: '#fff', fontSize: 20, fontWeight: '700', marginBottom: 16 }}>
            Все сайты ({filteredSites.length})
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {filteredSites.map(site => (
              <SiteCard key={site.id} site={site} />
            ))}
          </View>
        </View>

        {/* Bottom Padding */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Floating AI Advisor Button */}
      <TouchableOpacity
        onPress={() => setAdvisorModalVisible(true)}
        style={{
          position: 'absolute',
          bottom: 100,
          right: 20,
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: '#ff2d55',
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#ff2d55',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.5,
          shadowRadius: 10,
          elevation: 10,
        }}
        data-testid="ai-advisor-btn"
      >
        <MessageCircle size={28} color="#fff" />
      </TouchableOpacity>

      {/* AI Description Modal */}
      <Modal visible={aiModalVisible} animationType="slide" transparent>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'center', padding: 20 }}>
          <View style={{ backgroundColor: '#18181b', borderRadius: 20, padding: 24 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <Text style={{ color: '#ff2d55', fontSize: 22, fontWeight: '700' }}>
                AI 🔥 {currentSite?.name}
              </Text>
              <TouchableOpacity onPress={() => setAiModalVisible(false)} data-testid="close-ai-modal">
                <X size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            {aiLoading ? (
              <View style={{ alignItems: 'center', padding: 40 }}>
                <ActivityIndicator size="large" color="#ff2d55" />
                <Text style={{ color: '#a1a1aa', marginTop: 16 }}>Генерация описания...</Text>
              </View>
            ) : (
              <Text style={{ color: '#fff', fontSize: 16, lineHeight: 24 }}>{aiDescription}</Text>
            )}

            <TouchableOpacity
              onPress={() => currentSite && openSite(currentSite)}
              style={{
                backgroundColor: '#ff2d55',
                padding: 16,
                borderRadius: 12,
                marginTop: 24,
                alignItems: 'center',
              }}
              data-testid="open-site-from-modal"
            >
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: '700' }}>Открыть сайт 🚀</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* AI Advisor Modal */}
      <Modal visible={advisorModalVisible} animationType="slide">
        <View style={{ flex: 1, backgroundColor: '#09090b' }}>
          {/* Header */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 20,
              paddingTop: 60,
              paddingBottom: 20,
              borderBottomWidth: 1,
              borderBottomColor: '#27272a',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Sparkles size={24} color="#ff2d55" />
              <Text style={{ color: '#fff', fontSize: 20, fontWeight: '700', marginLeft: 10 }}>
                AI Porn Advisor
              </Text>
            </View>
            <TouchableOpacity onPress={() => setAdvisorModalVisible(false)} data-testid="close-advisor-modal">
              <X size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Messages */}
          <ScrollView style={{ flex: 1, padding: 20 }}>
            {advisorMessages.length === 0 && (
              <View style={{ alignItems: 'center', marginTop: 40 }}>
                <MessageCircle size={60} color="#27272a" />
                <Text style={{ color: '#52525b', fontSize: 16, marginTop: 16, textAlign: 'center' }}>
                  Спроси меня о чём угодно:{'\n'}сайты, категории, актрисы, тренды...
                </Text>
              </View>
            )}
            {advisorMessages.map((msg, i) => (
              <View
                key={i}
                style={{
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  backgroundColor: msg.role === 'user' ? '#ff2d55' : '#18181b',
                  padding: 14,
                  borderRadius: 16,
                  marginBottom: 12,
                  maxWidth: '80%',
                }}
              >
                <Text style={{ color: '#fff', fontSize: 15, lineHeight: 22 }}>{msg.text}</Text>
              </View>
            ))}
            {advisorLoading && (
              <View style={{ alignSelf: 'flex-start', padding: 14 }}>
                <ActivityIndicator size="small" color="#ff2d55" />
              </View>
            )}
          </ScrollView>

          {/* Input */}
          <View
            style={{
              flexDirection: 'row',
              padding: 16,
              paddingBottom: 40,
              borderTopWidth: 1,
              borderTopColor: '#27272a',
              backgroundColor: '#09090b',
            }}
          >
            <TextInput
              placeholder="Спроси меня..."
              placeholderTextColor="#52525b"
              value={advisorInput}
              onChangeText={setAdvisorInput}
              style={{
                flex: 1,
                backgroundColor: '#18181b',
                color: '#fff',
                padding: 14,
                borderRadius: 12,
                fontSize: 16,
                marginRight: 12,
              }}
              onSubmitEditing={sendToAdvisor}
              data-testid="advisor-input"
            />
            <TouchableOpacity
              onPress={sendToAdvisor}
              style={{
                backgroundColor: '#ff2d55',
                width: 50,
                height: 50,
                borderRadius: 25,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              data-testid="send-advisor-btn"
            >
              <Send size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
