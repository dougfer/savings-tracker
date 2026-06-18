import { useRef, useState } from 'react';

import { Text, View, type LayoutChangeEvent } from 'react-native';

import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { twMerge } from "tailwind-merge"

import { CheckIcon } from '@/assets/icons';
import { formatCurrency } from '@/utils/format-currency';

interface GoalProgressSectionProps {
  percentage: number;
  currentAmount: number;
  targetAmount: number;
  isCompleted: boolean;
  depositsCount?: number;
  deadline?: string;
}

let gradientCounter = 0;

function CompletedCard({
  currentAmount,
  depositsCount,
  deadline,
}: {
  currentAmount: number;
  depositsCount: number;
  deadline?: string;
}) {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const gradientId = useRef(`goal-complete-${++gradientCounter}`).current;

  const onLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    if (width > 0 && height > 0) {
      setSize({ width, height });
    }
  };

  const description = [
    `You saved ${formatCurrency(currentAmount)} across ${depositsCount} ${depositsCount === 1 ? 'deposit' : 'deposits'}.`,
    deadline ? `Finished before your ${deadline} deadline.` : '',
  ].filter(Boolean).join(' ');

  return (
    <View className="rounded-2xl overflow-hidden border border-white/30" onLayout={onLayout}>
      {size.width > 0 && (
        <Svg
          width={size.width}
          height={size.height}
          style={{ position: 'absolute', top: 0, left: 0 }}
        >
          <Defs>
            <LinearGradient id={gradientId} x1="0.5" y1="0" x2="0.5" y2="1">
              <Stop offset="0" stopColor="#FF5722" stopOpacity="1" />
              <Stop offset="1" stopColor="#B92B09" stopOpacity="1" />
            </LinearGradient>
          </Defs>
          <Rect x="0" y="0" width={size.width} height={size.height} fill={`url(#${gradientId})`} />
        </Svg>
      )}

      <View className="gap-10 py-12 px-6">
        <View className="gap-6 items-start">
          <View className="size-16 rounded-full bg-white/30 items-center justify-center">
            <CheckIcon width={32} height={32} color="#FFFFFF" />
          </View>

          <View className="gap-2.5 items-start">
            <Text className="font-display-semibold text-display-lg text-neutral-0">
              100%
            </Text>
            <Text className="font-sans-bold text-heading-lg text-neutral-0">
              Goal Complete
            </Text>
            <Text className="font-sans-medium text-body text-neutral-0 text-start">
              {description}
            </Text>
          </View>
        </View>

        <View className="flex-row gap-8">
          <View className="gap-2">
            <Text className="font-sans-bold text-heading-lg text-neutral-0">
              {depositsCount}
            </Text>
            <Text className="font-sans-medium text-body text-neutral-0">
              DEPOSITS
            </Text>
          </View>
          <View className="w-px bg-white/30" />
          <View className="gap-2">
            <Text className="font-sans-bold text-heading-lg text-neutral-0">
              {formatCurrency(currentAmount)}
            </Text>
            <Text className="font-sans-medium text-body text-neutral-0">
              TOTAL SAVED
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}


export function GoalProgressSection({
  percentage,
  currentAmount,
  targetAmount,
  isCompleted,
  depositsCount = 0,
  deadline,
}: GoalProgressSectionProps) {
  const remaining = targetAmount - currentAmount;

  if (isCompleted) {
    return (
      <CompletedCard
        currentAmount={currentAmount}
        depositsCount={depositsCount}
        deadline={deadline}
      />
    );
  }

  return (
    <View className="rounded-2xl bg-neutral-800 p-6 border border-neutral-600">
      <View className="gap-6">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-baseline gap-2">
            <Text className="font-display-semibold text-display-md desktop:text-display-lg text-primary">
              {percentage}%
            </Text>
          </View>
          <Text className="font-sans-semibold tablet:text-heading-sm text-body text-neutral-300">
            {`${formatCurrency(Math.max(0, remaining))} remaining`}
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
            className={twMerge("h-full rounded-lg border border-white/30", "bg-primary")}
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
    </View>
  );
}

