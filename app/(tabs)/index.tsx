import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Modal, Alert, FlatList, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Heart, Shuffle, MessageCircle } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { sites } from '../../constants/sites';
import * as Clipboard from 'expo-clipboard';
import * as Notifications from 'expo-notifications';

// 🔥 ТВОЙ КЛЮЧ GROK
const GROK_API_KEY = 'xai-wgRGOWM4Jsa0ZJxxcsAosfdd7DPEhIUcKDLXFARhpwxoGunMrxgpAcZoLwusQK9DX7jWHhcOfpuL37gI';

const mockRecommendations = [
  { id: 'rec1', title: 'Hot VR MILF 8K', thumb: 'https://picsum.photos/400/300?1' },
  { id: 'rec2', title: 'Amateur Russian 4K', thumb: 'https://picsum.photos/400/300?2' },
  // добавь ещё 50+ по вкусу
];

export default function Home() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [aiModalVisible, setAiModalVisible] = useState(false);
  const [currentSite, setCurrentSite] = useState<any>(null);
  const [aiDescription, setAiDescription] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [dirtyLevel, setDirtyLevel] = useState(0.95);

  // ... (все функции generateAIDescription, generateAIPreview, surpriseMe, askAdvisor — копируй из предыдущей версии v6)

  const filtered = sites.filter(s => {
    // та же логика фильтрации по табам + поиск
  });

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header + Поиск + Табы (как в предыдущей версии) */}

      {/* Рекомендации (из твоего 3index.tsx) */}
      <Text className="text-white text-3xl font-bold px-5 mt-4">Рекомендации для тебя 🔥</Text>
      <FlatList
        data={mockRecommendations}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/vr-player/${item.id}`)} className="w-1/2 p-2">
            <Image source={{ uri: item.thumb }} style={{ height: 200, borderRadius: 12 }} />
            <Text className="text-white mt-2 text-center">{item.title}</Text>
          </TouchableOpacity>
        )}
        className="px-3"
      />

      {/* Сетка сайтов (твои 84 сайта) — код из предыдущей версии */}
      {/* ... (вставь весь блок с карточками, AI 🔥, Preview и т.д.) */}

      {/* Модалки AI и Advisor — копируй из предыдущей версии */}
    </View>
  );
}