import { Box } from '@gluestack-ui/themed';
import type { ReactNode } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

type AppScreenProps = {
  children: ReactNode;
};

/** Mobile-first screen shell; keep route files thin (FR-002). */
export function AppScreen({ children }: AppScreenProps) {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <Box flex={1} className="bg-white px-4 pt-4">
        {children}
      </Box>
    </SafeAreaView>
  );
}
