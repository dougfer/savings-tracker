import { Text } from '@/components/ui';
import { AppScreen } from '@/components/layout/AppScreen';

export default function PotsPlaceholderScreen() {
  return (
    <AppScreen>
      <Text fontSize="$xl" fontWeight="$bold" accessibilityRole="header">
        Pots
      </Text>
      <Text mt="$2" color="$textLight600">
        Placeholder — business flows arrive in a later feature.
      </Text>
    </AppScreen>
  );
}
