import { ScrollView, View } from 'react-native';

import { Slot } from 'expo-router';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Topbar } from '@/components/ui/topbar';

export default function LoggedLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#101010' }} edges={['top']}>
      <View className="w-full max-w-[1600px] self-center">
        <Topbar />
      </View>
      <ScrollView className="flex-1 bg-neutral-900">
        <View className="w-full max-w-[1600px] self-center px-6 tablet:px-4">
          <Slot />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
