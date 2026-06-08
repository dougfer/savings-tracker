import { View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { formatCurrency } from '../utils/format-currency';
import type { MonthlyDeposit } from '../types/dashboard';

type BarChartProps = {
  data: MonthlyDeposit[];
  isMobile?: boolean;
};

const MAX_BAR_HEIGHT = 144;

export function BarChart({ data, isMobile = false }: BarChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value), 1);
  const isEmpty = maxValue === 0 || data.every((d) => d.value === 0);

  return (
    <View
      className="gap-5 rounded-2xl border border-neutral-700 bg-neutral-800 p-5"
      accessibilityRole="summary"
      accessibilityLabel="Monthly deposits chart"
    >
      <AppText className="font-sans-semibold text-heading-md text-white">
        Monthly deposits
      </AppText>
      {isEmpty ? (
        <View className="items-center justify-center py-12">
          <AppText className="text-center font-sans-medium text-body text-neutral-400">
            No deposits yet
          </AppText>
        </View>
      ) : (
        <View className="flex-row items-end justify-center gap-5">
          {data.map((deposit) => {
            const barHeight =
              deposit.value > 0 ? (deposit.value / maxValue) * MAX_BAR_HEIGHT : 0;

            return (
              <View
                key={deposit.month}
                className="flex-1 items-center justify-end gap-2.5"
                accessibilityRole="text"
                accessibilityLabel={`${deposit.month}: ${formatCurrency(deposit.value)}`}
              >
                <View className="w-full items-center justify-end">
                  <View
                    className="w-full rounded-lg border border-white/30 bg-orange-400"
                    style={{ height: Math.max(barHeight, 0) }}
                  />
                </View>
                <AppText
                  className={
                    isMobile
                      ? 'text-center font-sans-medium text-caption text-neutral-400'
                      : 'text-center font-sans-medium text-body-sm text-neutral-400'
                  }
                >
                  {formatCurrency(deposit.value)}
                </AppText>
                <AppText className="text-center font-sans-medium text-body text-white">
                  {deposit.month}
                </AppText>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}
