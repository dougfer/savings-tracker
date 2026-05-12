import { Text } from '@/components/ui';
import { AppScreen } from '@/components/layout/AppScreen';

export default function BudgetsPlaceholderScreen() {
  return (
    <AppScreen>
      <Text fontSize="$xl" fontWeight="$bold" accessibilityRole="header">
        Budgets
      </Text>
      <Text mt="$2" color="$textLight600">
        Placeholder — business flows arrive in a later feature.
      </Text>
    </AppScreen>
  );
}
