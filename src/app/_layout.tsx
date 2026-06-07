import '../../global.css';
import 'react-native-reanimated';
import { useEffect } from 'react';

import { Platform, View } from 'react-native';

import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';

import { OverlayProvider } from '@gluestack-ui/core/overlay/creator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { appFontsMap } from '@/lib/fonts/app-fonts';

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts(appFontsMap);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      void SplashScreen.hideAsync();
      if (Platform.OS === 'web') {
        document.body.style.opacity = '1';
      }
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <OverlayProvider>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <View className="flex-1 items-center bg-neutral-900">
          <View className="w-full max-w-[1600px] flex-1">
            <Stack screenOptions={{ title: 'Savings Tracker', headerShown: false }} />
          </View>
        </View>
      </SafeAreaProvider>
    </OverlayProvider>
  );
}
