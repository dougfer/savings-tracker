import type { ReactNode } from 'react';

import { View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

type AppScreenProps = {
  children: ReactNode;
};

/** Mobile-first screen shell; keep route files thin (FR-002). */
export function AppScreen({ children }: AppScreenProps) {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <View className="flex-1 bg-background px-4 pt-4">{children}</View>
    </SafeAreaView>
  );
}
