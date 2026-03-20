# HubXUltra - Product Requirements Document

## Дата создания: 2026-03-20

## Описание проекта
Приватное 18+ приложение на Expo (React Native) - агрегатор взрослого контента с элегантным тёмным дизайном и AI-функциями.

## Технический стек
- **Framework**: Expo SDK 52 + Expo Router 4
- **Styling**: NativeWind (Tailwind CSS)
- **State Management**: React Hooks + AsyncStorage
- **AI Integration**: Grok API (xAI)
- **Security**: expo-secure-store (PIN)
- **WebView**: react-native-webview
- **Gestures**: react-native-gesture-handler
- **Icons**: lucide-react-native

## Целевая платформа
- Android only

## Core Features Implemented ✅

### 1. Главный экран (index.tsx)
- ✅ Неоновый заголовок "HubX Ultra"
- ✅ Поисковая строка
- ✅ 9 категорий-табов (All, VR, Top, Live Cams, Premium, Hentai, Fetish, Trans, Lesbian)
- ✅ Сетка 84 сайтов (2 колонки)
- ✅ Карточки с: название, категория, VR-бейдж, рейтинг
- ✅ Кнопки: AI 🔥, Share, Open, Heart (избранное)
- ✅ Surprise Me (рандомный сайт)
- ✅ Floating AI Porn Advisor button
- ✅ Рекомендации секция

### 2. AI Integration (Grok API)
- ✅ generateAIDescription() - сексуальные описания сайтов
- ✅ AI Porn Advisor чат с историей сообщений
- ✅ Модели: grok-3

### 3. Navigation (Expo Router)
- ✅ Bottom Tabs: Главная, Поиск, VR, Библиотека
- ✅ Stack: pin.tsx (modal), vr-player/[id].tsx (fullscreen)

### 4. VR Screen
- ✅ Список 15 VR-сайтов
- ✅ Статистика (8K+, 60 FPS)
- ✅ WebXR launch через DeoVR
- ✅ PIN проверка перед доступом

### 5. Library Screen
- ✅ Избранное (Hearts)
- ✅ История просмотров
- ✅ Очистка истории
- ✅ Настройка PIN

### 6. Search Screen
- ✅ Полнотекстовый поиск по сайтам
- ✅ Популярные запросы
- ✅ Фильтрация по категориям

### 7. PIN Protection
- ✅ Установка PIN (4-6 цифр)
- ✅ Подтверждение PIN
- ✅ Изменение PIN
- ✅ Удаление PIN
- ✅ SecureStore encryption

### 8. Brightness Control
- ✅ Жест свайпа по левой половине экрана
- ✅ Animated overlay indicator
- ✅ expo-brightness integration

### 9. Database (constants/sites.ts)
- ✅ 84 сайта с полной информацией
- ✅ Категории: top, premium, live, hentai, fetish, trans, lesbian
- ✅ VR флаги
- ✅ Рейтинги

## Дизайн
- **Primary**: #ff2d55 (малиновый неон)
- **Accent**: #a855f7 (фиолетовый)
- **VR**: #00d4ff (голубой)
- **Background**: #09090b (почти чёрный)
- **Cards**: #18181b

## Ограничения (выполнены)
- ❌ Нет разрешений на звук
- ❌ Нет разрешений на трансляцию

## User Personas
1. **Power User**: Использует AI Advisor, VR, сохраняет избранное
2. **Casual User**: Быстрый поиск, Surprise Me
3. **Privacy-focused**: PIN защита, инкогнито

## Backlog / Future Features
- P1: Push уведомления о новом контенте
- P1: Темы оформления (альтернативные цвета)
- P2: Синхронизация избранного через облако
- P2: AI Preview генерация изображений
- P3: Lovense интеграция для VR

## File Structure
```
/app
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx
│   │   ├── index.tsx (Main)
│   │   ├── search.tsx
│   │   ├── vr.tsx
│   │   └── library.tsx
│   ├── _layout.tsx (Root)
│   ├── pin.tsx
│   └── vr-player/[id].tsx
├── components/
│   └── BrightnessControl.tsx
├── constants/
│   └── sites.ts (84 sites)
├── assets/
├── app.json
├── package.json
└── tailwind.config.js
```

## API Keys
- Grok API: Configured in index.tsx
