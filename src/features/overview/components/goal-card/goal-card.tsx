import { useRef, useState } from 'react';

import { type LayoutChangeEvent, View } from 'react-native';

import { format, parseISO, isValid } from 'date-fns';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { twMerge } from 'tailwind-merge';

import { VectorPatternIcon } from '@/assets/icons';
import { AppText } from '@/components/ui/app-text';

import type { Goal, GoalSize } from '../../types/goal';
import { formatCurrency } from '../../utils/format-currency';

type GoalCardProps = {
  goal: Goal;
  size?: GoalSize;
};

let gradientCounter = 0;

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
  const [cardWidth, setCardWidth] = useState(0);
  const gradientId = useRef(`goalCardWideGradient-${++gradientCounter}`).current;

  const isWide = size === 'wide';
  const { percentage, state } = deriveState(goal.currentAmount, goal.targetAmount);
  const isComplete = state === 'complete';

  const height = SIZE_HEIGHT[size];
  const dueDateFormatted = formatDueDate(goal.dueDate);

  const handleLayout = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    if (w > 0) setCardWidth(w);
  };

  const cardBg = twMerge(DEFAULT_CLASSES.cardBg, isWide && WIDE_CLASSES.cardBg);
  const cardBorder = twMerge(DEFAULT_CLASSES.cardBorder, isWide && WIDE_CLASSES.cardBorder);
  const percentageColor = isWide ? WIDE_CLASSES.percentageColor : PERCENTAGE_COLOR[state];
  const progressTrack = isWide ? WIDE_CLASSES.progressTrack : DEFAULT_CLASSES.progressTrack;
  const progressFill = isWide ? WIDE_CLASSES.progressFill : PROGRESS_FILL[state];
  const stateLabel = STATE_LABEL[state];

  return (
    <View
      className={twMerge('overflow-hidden rounded-2xl border p-6', cardBg, cardBorder)}
      style={{ height }}
      onLayout={handleLayout}
      accessibilityRole="summary"
      accessibilityLabel={`${goal.name || 'Untitled goal'}: ${percentage}% ${stateLabel}`}
    >
      {isWide && (
        <Svg
          width={cardWidth || 1}
          height={height}
          style={{ position: 'absolute', top: 0, left: 0 }}
        >
          <Defs>
            <LinearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0" stopColor="#FF5722" stopOpacity="1" />
              <Stop offset="1" stopColor="#B92B09" stopOpacity="1" />
            </LinearGradient>
          </Defs>
          <Rect x="0" y="0" width={cardWidth || 1} height={height} fill={`url(#${gradientId})`} />
        </Svg>
      )}

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
    </View>
  );
}
