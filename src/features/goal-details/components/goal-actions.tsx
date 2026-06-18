import { View } from 'react-native';

import { AppButton } from '@/components/ui/app-button';

export function GoalActions() {
  return (
    <View className="flex-row items-center gap-2">
      <AppButton
        variant="tertiary"
        accessibilityLabel="Edit goal"
        className="h-10"
      >
        Edit
      </AppButton>
      <AppButton
        variant="tertiary"
        accessibilityLabel="Delete goal"
        className="h-10"
      >
        Delete
      </AppButton>
    </View>
  );
}
