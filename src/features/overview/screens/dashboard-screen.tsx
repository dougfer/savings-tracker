import { Text, View } from 'react-native';

import { OverviewHint } from '@/features/overview/components/OverviewHint';

export default function DashboardScreen() {
  return (
    <View className="flex-1 items-center justify-center px-4">
      <Text className="font-sans-bold text-heading-md text-neutral-0">Dashboard</Text>
      <OverviewHint />
    </View>
  );
}
