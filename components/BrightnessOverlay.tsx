import { View, Text } from 'react-native';

export default function BrightnessOverlay({ brightness }: { brightness: number | null }) {
  if (!brightness) return null;
  return (
    <View style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '50%', backgroundColor: `rgba(0,0,0,${1 - brightness})`, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: '#fff', fontSize: 60, fontWeight: 'bold' }}>{Math.round(brightness * 100)}%</Text>
    </View>
  );
}