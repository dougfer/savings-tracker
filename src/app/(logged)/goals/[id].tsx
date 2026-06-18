import { Text, View } from 'react-native';

import { router } from 'expo-router';

import ChevronLeftIcon from '@/assets/icons/chevron-left.svg';
import { AppButton } from '@/components/ui/app-button';
import { GoalActions } from '@/features/goal-details/components/goal-actions';
import { mockGoalInProgressWithDeposits } from '@/features/goal-details/mocks/deposit-data';
import { GoalDetailsScreen } from '@/features/goal-details/screens/goal-details-screen';

export default function GoalDetailRoute() {
  return (
    <View className="flex-1 gap-6">
      <View className="flex-row items-center justify-between mt-8">
        <AppButton
          variant="tertiary"
          onPress={() => router.push('/')}
          accessibilityLabel="Back to overview"
        >
          <View className="flex-row items-center gap-1.5">
            <ChevronLeftIcon width={20} height={20} color="#B7B7B7" />
            <Text className="font-sans-medium text-body text-neutral-300">
              Back
            </Text>
          </View>
        </AppButton>

        <GoalActions />
      </View>

      <GoalDetailsScreen data={mockGoalInProgressWithDeposits} />
    </View>
  );
}
