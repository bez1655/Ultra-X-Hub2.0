import { View, Text, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

export default function VRPlayerScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [loading, setLoading] = useState(true);

  // Можно заменить на реальный сервис, например SLR или DeoVR WebXR
  const playerUrl = `https://deovr.com/?url=https://example.com/stream/${encodeURIComponent(id)}&mode=webxr`;

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      {loading && (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#ff2d55" />
          <Text style={{ color: '#fff', marginTop: 16, fontSize: 16 }}>Загрузка VR-плеера...</Text>
        </View>
      )}

      <WebView
        source={{ uri: playerUrl }}
        style={{ flex: 1 }}
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
        javaScriptEnabled
        onLoadEnd={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          alert('Не удалось загрузить VR-плеер');
        }}
      />
    </View>
  );
}