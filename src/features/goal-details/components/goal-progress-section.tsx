import { Text, View } from 'react-native';

import { twMerge } from "tailwind-merge"

import { formatCurrency } from '@/utils/format-currency';

interface GoalProgressSectionProps {
  percentage: number;
  currentAmount: number;
  targetAmount: number;
  isCompleted: boolean;
}

export function GoalProgressSection({
  percentage,
  currentAmount,
  targetAmount,
  isCompleted,
}: GoalProgressSectionProps) {
  const remaining = targetAmount - currentAmount;

  return (
    <View className="gap-6">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-baseline gap-2">
          <Text className="font-display-semibold text-display-md desktop:text-display-lg text-primary">
            {percentage}%
          </Text>
        </View>
        <Text className="font-sans-semibold tablet:text-heading-sm text-body text-neutral-300">
          {isCompleted
            ? 'Completed'
            : `${formatCurrency(Math.max(0, remaining))} remaining`}
        </Text>
      </View>

      <View
        className="w-full h-3 rounded-full bg-neutral-700 overflow-hidden"
        accessibilityRole="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <View
          className={twMerge("h-full rounded-lg border border-white/30", isCompleted ? "bg-success" : "bg-primary")}
          style={{ width: `${percentage}%` }}
        />
      </View>

      <View className="flex-row justify-between">
        <View className="gap-1">
          <Text className="font-sans-medium text-body-sm text-neutral-0">
            {formatCurrency(currentAmount)}
          </Text>
          <Text className="font-sans-medium text-body-sm text-neutral-300">
            Saved so far
          </Text>
        </View>
        <View className="items-end gap-1">
          <Text className="font-sans-medium text-body-sm text-neutral-0">
            of {formatCurrency(targetAmount)}
          </Text>
          <Text className="font-sans-medium text-body-sm text-neutral-300">
            Target
          </Text>
        </View>
      </View>
    </View>
  );
}
