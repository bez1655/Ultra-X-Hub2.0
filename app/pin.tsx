import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Vibration } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import { Lock, Unlock, Shield, ArrowLeft } from 'lucide-react-native';

export default function PinScreen() {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [mode, setMode] = useState<'set' | 'enter' | 'change'>('set');
  const [step, setStep] = useState<'input' | 'confirm'>('input');

  useEffect(() => {
    checkExistingPin();
  }, []);

  const checkExistingPin = async () => {
    const exists = await SecureStore.getItemAsync('app_pin');
    if (exists) setMode('enter');
  };

  const handleSave = async () => {
    if (pin.length < 4) {
      Vibration.vibrate(100);
      Alert.alert('Ошибка', 'PIN должен быть минимум 4 символа');
      return;
    }

    if (step === 'input') {
      setStep('confirm');
      return;
    }

    if (pin !== confirmPin) {
      Vibration.vibrate(100);
      Alert.alert('Ошибка', 'PIN и подтверждение не совпадают');
      setConfirmPin('');
      setStep('input');
      return;
    }

    await SecureStore.setItemAsync('app_pin', pin);
    Alert.alert('✓ Готово', 'PIN успешно установлен. Приложение защищено.', [
      { text: 'OK', onPress: () => router.back() },
    ]);
  };

  const handleEnter = async () => {
    const saved = await SecureStore.getItemAsync('app_pin');
    if (saved === pin) {
      Vibration.vibrate(50);
      router.back();
    } else {
      Vibration.vibrate([0, 100, 50, 100]);
      Alert.alert('Неверный PIN', 'Попробуй ещё раз');
      setPin('');
    }
  };

  const handleChangePin = async () => {
    const saved = await SecureStore.getItemAsync('app_pin');
    if (saved === pin) {
      setMode('set');
      setPin('');
      setStep('input');
    } else {
      Vibration.vibrate([0, 100, 50, 100]);
      Alert.alert('Неверный PIN', 'Введи текущий PIN');
      setPin('');
    }
  };

  const handleRemovePin = async () => {
    Alert.alert(
      'Удалить PIN?',
      'Приложение больше не будет защищено',
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Удалить',
          style: 'destructive',
          onPress: async () => {
            await SecureStore.deleteItemAsync('app_pin');
            Alert.alert('PIN удалён');
            router.back();
          },
        },
      ]
    );
  };

  const renderDots = (value: string, maxLength: number = 6) => {
    const dots = [];
    for (let i = 0; i < maxLength; i++) {
      dots.push(
        <View
          key={i}
          style={{
            width: 16,
            height: 16,
            borderRadius: 8,
            backgroundColor: i < value.length ? '#ff2d55' : '#27272a',
            marginHorizontal: 6,
          }}
        />
      );
    }
    return dots;
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#09090b', justifyContent: 'center', padding: 40 }}>
      {/* Header */}
      <View style={{ alignItems: 'center', marginBottom: 40 }}>
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: '#18181b',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 24,
          }}
        >
          {mode === 'enter' ? (
            <Lock size={36} color="#ff2d55" />
          ) : (
            <Shield size={36} color="#ff2d55" />
          )}
        </View>

        <Text
          style={{
            color: '#fff',
            fontSize: 28,
            fontWeight: '700',
            textAlign: 'center',
          }}
        >
          {mode === 'set'
            ? step === 'confirm'
              ? 'Подтвердите PIN'
              : 'Установите PIN'
            : mode === 'change'
            ? 'Введите текущий PIN'
            : 'Введите PIN'}
        </Text>
        <Text style={{ color: '#52525b', fontSize: 14, marginTop: 8, textAlign: 'center' }}>
          {mode === 'set' ? 'Минимум 4 цифры' : 'Для доступа к приложению'}
        </Text>
      </View>

      {/* PIN Dots */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 30 }}>
        {renderDots(step === 'confirm' ? confirmPin : pin)}
      </View>

      {/* Hidden Input */}
      <TextInput
        autoFocus
        value={step === 'confirm' ? confirmPin : pin}
        onChangeText={step === 'confirm' ? setConfirmPin : setPin}
        secureTextEntry
        keyboardType="numeric"
        maxLength={6}
        style={{
          position: 'absolute',
          opacity: 0,
          height: 0,
          width: 0,
        }}
        data-testid="pin-input"
      />

      {/* Visible Input (styled) */}
      <TextInput
        placeholder="• • • •"
        placeholderTextColor="#3f3f46"
        value={step === 'confirm' ? confirmPin : pin}
        onChangeText={step === 'confirm' ? setConfirmPin : setPin}
        secureTextEntry
        keyboardType="numeric"
        maxLength={6}
        style={{
          backgroundColor: '#18181b',
          color: '#fff',
          fontSize: 28,
          padding: 18,
          borderRadius: 16,
          textAlign: 'center',
          letterSpacing: 8,
          borderWidth: 2,
          borderColor: '#27272a',
        }}
        data-testid="pin-visible-input"
      />

      {/* Buttons */}
      {mode === 'set' && (
        <TouchableOpacity
          onPress={handleSave}
          style={{
            backgroundColor: '#ff2d55',
            padding: 18,
            borderRadius: 16,
            alignItems: 'center',
            marginTop: 24,
          }}
          data-testid="save-pin-btn"
        >
          <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>
            {step === 'confirm' ? 'Сохранить' : 'Далее'}
          </Text>
        </TouchableOpacity>
      )}

      {mode === 'enter' && (
        <>
          <TouchableOpacity
            onPress={handleEnter}
            style={{
              backgroundColor: '#ff2d55',
              padding: 18,
              borderRadius: 16,
              alignItems: 'center',
              marginTop: 24,
            }}
            data-testid="enter-pin-btn"
          >
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>Войти</Text>
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20, gap: 20 }}>
            <TouchableOpacity onPress={handleChangePin} data-testid="change-pin-btn">
              <Text style={{ color: '#a855f7', fontSize: 14 }}>Изменить PIN</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleRemovePin} data-testid="remove-pin-btn">
              <Text style={{ color: '#ef4444', fontSize: 14 }}>Удалить PIN</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* Back button */}
      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          position: 'absolute',
          top: 60,
          left: 20,
          padding: 10,
        }}
        data-testid="back-btn"
      >
        <ArrowLeft size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
