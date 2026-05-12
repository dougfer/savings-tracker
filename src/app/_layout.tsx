import '../../global.css';
import 'react-native-reanimated';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GluestackAppProvider } from '@/lib/providers/GluestackAppProvider';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <GluestackAppProvider>
        <Stack screenOptions={{ title: 'Savings Tracker' }} />
      </GluestackAppProvider>
    </SafeAreaProvider>
  );
}
