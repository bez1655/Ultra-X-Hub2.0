import { View, Text, ActivityIndicator, TouchableOpacity, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { X, ExternalLink, Maximize2 } from 'lucide-react-native';

export default function VRPlayerScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Декодируем имя сайта
  const siteName = decodeURIComponent(id || '');
  
  // URL для VR плеера (используем DeoVR WebXR)
  const playerUrl = `https://deovr.com/search?q=${encodeURIComponent(siteName)}`;

  const openInBrowser = () => {
    Linking.openURL(playerUrl);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      {/* Header */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 50,
          paddingHorizontal: 20,
          paddingBottom: 16,
          backgroundColor: 'rgba(0,0,0,0.8)',
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: 'rgba(255,255,255,0.1)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          data-testid="close-vr-btn"
        >
          <X size={24} color="#fff" />
        </TouchableOpacity>

        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: '#00d4ff', fontSize: 16, fontWeight: '700' }}>
            VR Player
          </Text>
          <Text style={{ color: '#71717a', fontSize: 12 }} numberOfLines={1}>
            {siteName}
          </Text>
        </View>

        <TouchableOpacity
          onPress={openInBrowser}
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: 'rgba(255,255,255,0.1)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          data-testid="open-browser-btn"
        >
          <ExternalLink size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Loading State */}
      {loading && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000',
            zIndex: 50,
          }}
        >
          <ActivityIndicator size="large" color="#00d4ff" />
          <Text style={{ color: '#fff', marginTop: 20, fontSize: 18, fontWeight: '600' }}>
            Загрузка VR-плеера...
          </Text>
          <Text style={{ color: '#71717a', marginTop: 8, fontSize: 14 }}>
            Подготовка WebXR окружения
          </Text>
        </View>
      )}

      {/* Error State */}
      {error && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000',
            zIndex: 50,
            padding: 40,
          }}
        >
          <Text style={{ color: '#ff2d55', fontSize: 48 }}>⚠️</Text>
          <Text style={{ color: '#fff', fontSize: 20, fontWeight: '600', marginTop: 20 }}>
            Ошибка загрузки
          </Text>
          <Text style={{ color: '#71717a', fontSize: 14, textAlign: 'center', marginTop: 8 }}>
            Не удалось загрузить VR-плеер.{'\n'}Попробуйте открыть в браузере.
          </Text>
          <TouchableOpacity
            onPress={openInBrowser}
            style={{
              backgroundColor: '#00d4ff',
              paddingHorizontal: 24,
              paddingVertical: 14,
              borderRadius: 12,
              marginTop: 24,
            }}
            data-testid="retry-browser-btn"
          >
            <Text style={{ color: '#000', fontSize: 16, fontWeight: '600' }}>
              Открыть в браузере
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* WebView */}
      <WebView
        source={{ uri: playerUrl }}
        style={{ flex: 1, marginTop: 110 }}
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
        allowsFullscreenVideo
        onLoadEnd={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setError(true);
        }}
        onHttpError={() => {
          setLoading(false);
          setError(true);
        }}
      />

      {/* Bottom Controls */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          flexDirection: 'row',
          justifyContent: 'center',
          paddingBottom: 40,
          paddingTop: 20,
          backgroundColor: 'rgba(0,0,0,0.8)',
        }}
      >
        <TouchableOpacity
          onPress={openInBrowser}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#00d4ff',
            paddingHorizontal: 24,
            paddingVertical: 14,
            borderRadius: 30,
          }}
          data-testid="fullscreen-btn"
        >
          <Maximize2 size={18} color="#000" />
          <Text style={{ color: '#000', fontSize: 16, fontWeight: '600', marginLeft: 10 }}>
            Полноэкранный режим
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
