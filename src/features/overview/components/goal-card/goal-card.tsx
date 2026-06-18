import { type ReactNode } from 'react';

import { View } from 'react-native';

import { format, parseISO, isValid } from 'date-fns';
import { twMerge } from 'tailwind-merge';

import { VectorPatternIcon } from '@/assets/icons';
import { AppText } from '@/components/ui/app-text';
import { GradientContainer } from '@/components/ui/gradient-container';

import type { Goal, GoalSize } from '../../types/goal';
import { formatCurrency } from '../../utils/format-currency';

type GoalCardProps = {
  goal: Goal;
  size?: GoalSize;
};

function deriveState(currentAmount: number, targetAmount: number) {
  const safeTarget = targetAmount > 0 ? targetAmount : 1;
  const raw = currentAmount / safeTarget;
  const progress = Math.min(1, Math.max(0, raw));
  const percentage = Math.round(progress * 100);

  let state: 'no-progress' | 'in-progress' | 'complete';
  if (progress <= 0) {
    state = 'no-progress';
  } else if (progress >= 1) {
    state = 'complete';
  } else {
    state = 'in-progress';
  }

  return { progress, percentage, state };
}

const SIZE_HEIGHT: Record<GoalSize, number> = {
  default: 240,
  wide: 240,
  tall: 504,
};

type StateKey = 'no-progress' | 'in-progress' | 'complete';

const PERCENTAGE_COLOR: Record<StateKey, string> = {
  'no-progress': 'text-neutral-400',
  'in-progress': 'text-orange-400',
  complete: 'text-success',
};

const PROGRESS_FILL: Record<StateKey, string> = {
  'no-progress': 'bg-orange-400',
  'in-progress': 'bg-orange-400',
  complete: 'bg-success',
};

const STATE_LABEL: Record<StateKey, string> = {
  'no-progress': 'No progress',
  'in-progress': 'In progress',
  complete: 'Complete',
};

const WIDE_CLASSES = {
  percentageColor: 'text-white',
  progressFill: 'bg-white',
  progressTrack: 'bg-orange-800',
  cardBg: '',
  cardBorder: 'border-white/30',
};

const DEFAULT_CLASSES = {
  cardBg: 'bg-neutral-800',
  cardBorder: 'border-neutral-600',
  progressTrack: 'bg-neutral-700',
};

function formatDueDate(dueDate: string | null): string | null {
  if (!dueDate) return null;
  try {
    const date = parseISO(dueDate);
    if (!isValid(date)) return null;
    return `Due ${format(date, 'MMM d, yyyy')}`;
  } catch {
    return null;
  }
}

export function GoalCard({ goal, size = 'default' }: GoalCardProps) {
  const isWide = size === 'wide';
  const { percentage, state } = deriveState(goal.currentAmount, goal.targetAmount);
  const isComplete = state === 'complete';

  const height = SIZE_HEIGHT[size];
  const dueDateFormatted = formatDueDate(goal.dueDate);

  const percentageColor = isWide ? WIDE_CLASSES.percentageColor : PERCENTAGE_COLOR[state];
  const progressTrack = isWide ? WIDE_CLASSES.progressTrack : DEFAULT_CLASSES.progressTrack;
  const progressFill = isWide ? WIDE_CLASSES.progressFill : PROGRESS_FILL[state];
  const stateLabel = STATE_LABEL[state];

  const content: ReactNode = (
    <>
      <View className="pointer-events-none absolute -bottom-24 -right-14 opacity-[0.03]">
        <VectorPatternIcon width={200} height={200} color="#FFFFFF" />
      </View>
      <View className="gap-6 flex-1 justify-end">
        <View className="flex-row items-center gap-2.5">
          <AppText
            numberOfLines={1}
            className="flex-1 font-sans-semibold text-heading-md text-white"
          >
            {goal.name || 'Untitled goal'}
          </AppText>
          {isComplete && (
            <View className="rounded-full border border-success bg-green-900 px-2.5 py-1">
              <AppText className="font-sans-semibold text-caption text-success">
                COMPLETE
              </AppText>
            </View>
          )}
        </View>

        <View className="gap-4 flex-1 justify-end">
          <AppText
            className={twMerge('font-display-semibold leading-none', percentageColor)}
            style={{ fontSize: 54 }}
          >
            {percentage}%
          </AppText>

          <View
            className="gap-2.5 w-full"
            accessibilityRole="progressbar"
            aria-valuenow={percentage}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <View className={twMerge('h-3 w-full rounded-full', progressTrack)}>
              <View
                className={twMerge('h-3 rounded-lg border border-white/30', progressFill)}
                style={{ width: `${percentage}%` }}
              />
            </View>
          </View>
        </View>

        <View className="flex-row items-center gap-2 flex-wrap">
          <AppText className="font-sans-medium text-body-sm text-white">
            {formatCurrency(goal.currentAmount)} of {formatCurrency(goal.targetAmount)}
          </AppText>
          {dueDateFormatted && (
            <>
              <View className={twMerge('size-1 rounded-full', isWide ? 'bg-white/30' : 'bg-neutral-300')} />
              <AppText className="font-sans-medium text-body-sm text-white opacity-70">
                {dueDateFormatted}
              </AppText>
            </>
          )}
        </View>
      </View>
    </>
  );

  if (isWide) {
    return (
      <GradientContainer
        viewProps={{
          style: { height },
          accessibilityRole: 'summary',
          accessibilityLabel: `${goal.name || 'Untitled goal'}: ${percentage}% ${stateLabel}`,
        }}
      >
        <View className="p-6 flex-1">
          {content}
        </View>
      </GradientContainer>
    );
  }

  return (
    <View
      className="overflow-hidden rounded-2xl border border-neutral-600 bg-neutral-800 p-6"
      style={{ height }}
      accessibilityRole="summary"
      accessibilityLabel={`${goal.name || 'Untitled goal'}: ${percentage}% ${stateLabel}`}
    >
      {content}
    </View>
  );
}
