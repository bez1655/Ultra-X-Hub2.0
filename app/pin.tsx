import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';

export default function PinScreen() {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [mode, setMode] = useState<'set' | 'enter'>('set'); // set = установка, enter = ввод

  const handleSave = async () => {
    if (pin.length < 4) {
      Alert.alert('Ошибка', 'PIN должен быть минимум 4 символа');
      return;
    }
    if (pin !== confirmPin) {
      Alert.alert('Ошибка', 'PIN и подтверждение не совпадают');
      return;
    }

    await SecureStore.setItemAsync('app_pin', pin);
    Alert.alert('Готово', 'PIN установлен. Теперь приложение защищено.');
    router.back();
  };

  const handleEnter = async () => {
    const saved = await SecureStore.getItemAsync('app_pin');
    if (saved === pin) {
      router.back();
    } else {
      Alert.alert('Ошибка', 'Неверный PIN');
      setPin('');
    }
  };

  useState(async () => {
    const exists = await SecureStore.getItemAsync('app_pin');
    if (exists) setMode('enter');
  });

  return (
    <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', padding: 40 }}>
      <Text style={{ color: '#ff2d55', fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 40 }}>
        {mode === 'set' ? 'Установите PIN' : 'Введите PIN'}
      </Text>

      <TextInput
        placeholder="••••"
        placeholderTextColor="#555"
        value={pin}
        onChangeText={setPin}
        secureTextEntry
        keyboardType="numeric"
        maxLength={6}
        style={{
          backgroundColor: '#111',
          color: '#fff',
          fontSize: 24,
          padding: 16,
          borderRadius: 12,
          textAlign: 'center',
          marginBottom: 16,
        }}
      />

      {mode === 'set' && (
        <>
          <TextInput
            placeholder="Подтвердите PIN"
            placeholderTextColor="#555"
            value={confirmPin}
            onChangeText={setConfirmPin}
            secureTextEntry
            keyboardType="numeric"
            maxLength={6}
            style={{
              backgroundColor: '#111',
              color: '#fff',
              fontSize: 24,
              padding: 16,
              borderRadius: 12,
              textAlign: 'center',
              marginBottom: 24,
            }}
          />

          <TouchableOpacity
            onPress={handleSave}
            style={{
              backgroundColor: '#ff2d55',
              padding: 16,
              borderRadius: 12,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Сохранить</Text>
          </TouchableOpacity>
        </>
      )}

      {mode === 'enter' && (
        <TouchableOpacity
          onPress={handleEnter}
          style={{
            backgroundColor: '#ff2d55',
            padding: 16,
            borderRadius: 12,
            alignItems: 'center',
            marginTop: 20,
          }}
        >
          <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Войти</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}