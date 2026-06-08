import { View } from 'react-native';

import { Stack } from 'expo-router';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Topbar } from '@/components/ui/topbar';

export default function LoggedLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#101010' }} edges={['top']}>
      <View className="flex-1 px-0 md:px-0 lg:px-4">
        <Topbar />
        <Stack
          screenOptions={{
            headerShown: false,
            animation: 'fade',
          }}
        />
      </View>
    </SafeAreaView>
  );
}
