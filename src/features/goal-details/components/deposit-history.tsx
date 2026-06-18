import { Text, View } from 'react-native';

import { ArrowDownIcon } from '@/assets/icons';
import { formatCurrency } from '@/utils/format-currency';

import type { Deposit } from '../types/deposit';
import { formatDisplayDate } from '../utils/format-date';

interface DepositHistoryProps {
  deposits: Deposit[];
}

export function DepositHistory({ deposits }: DepositHistoryProps) {
  const sortedDeposits = [...deposits].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <View className="gap-4">
      <View className="flex-row items-center justify-between">
        <Text className="font-sans-semibold text-heading-sm text-neutral-0">
          Deposit history
        </Text>
        <Text className="font-sans-medium text-body-sm text-neutral-300">
          {deposits.length} {deposits.length === 1 ? 'deposit' : 'deposits'}
        </Text>
      </View>

      {sortedDeposits.length === 0 ? (
        <View className="py-8 items-center">
          <Text className="font-sans-medium text-body-sm text-neutral-300">
            No deposits yet
          </Text>
        </View>
      ) : (
        <View>
          {sortedDeposits.map((deposit) => (
            <View key={deposit.id}>
              <View className="h-px bg-neutral-800" />
              <View className="flex-row items-center py-4">
                <View className="size-10 rounded-full bg-neutral-800 items-center justify-center">
                  <ArrowDownIcon width={20} height={20} color="#B7B7B7" />
                </View>
                <View className="flex-1 ml-3 gap-0.5">
                  <Text className="font-sans-medium text-body-sm text-neutral-0" numberOfLines={1}>
                    {deposit.description || 'Monthly savings'}
                  </Text>
                  <Text className="font-sans text-body-sm text-neutral-300">
                    {formatDisplayDate(deposit.date)}
                  </Text>
                </View>
                <Text className="font-sans-semibold text-body-semibold text-success ml-3">
                  +{formatCurrency(deposit.amount)}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
