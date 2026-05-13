import '../../global.css';
import 'react-native-reanimated';
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GluestackAppProvider } from '@/lib/providers/GluestackAppProvider';
import { appFontsMap } from '@/lib/fonts/app-fonts';

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts(appFontsMap);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      void SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <GluestackAppProvider>
        <Stack screenOptions={{ title: 'Savings Tracker' }} />
      </GluestackAppProvider>
    </SafeAreaProvider>
  );
}
