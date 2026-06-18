import { Text, View } from 'react-native';

import type { Goal } from '@/features/overview/types/goal';

import { formatDisplayDate } from '../utils/format-date';

interface GoalInfoHeaderProps {
  goal: Goal;
}

export function GoalInfoHeader({ goal }: GoalInfoHeaderProps) {
  return (
    <View className="gap-2.5">
      <Text
        className="font-display-semibold text-display-lg text-neutral-0"
        numberOfLines={2}
      >
        {goal.name}
      </Text>
      <View className="flex-row items-center gap-3">
        {goal.dueDate && (
          <>
            <Text className="font-sans-medium text-body text-neutral-300">
              Due {formatDisplayDate(goal.dueDate)}
            </Text>
            <Text className="font-sans text-body text-neutral-300">
              &bull;
            </Text>
          </>
        )}
        <Text className="font-sans-medium text-body text-neutral-300">
          Created {formatDisplayDate(goal.createdAt)}
        </Text>
      </View>
    </View>
  );
}
