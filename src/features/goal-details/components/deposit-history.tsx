import { ScrollView, Text, View } from 'react-native';

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
        <Text className="font-sans-medium text-body-sm text-neutral-400">
          {deposits.length} {deposits.length === 1 ? 'deposit' : 'deposits'}
        </Text>
      </View>

      {sortedDeposits.length === 0 ? (
        <View className="py-8 items-center">
          <Text className="font-sans-medium text-body text-neutral-400">
            No deposits yet
          </Text>
        </View>
      ) : (
        <ScrollView
          className="max-h-80"
          contentContainerClassName="gap-0"
          showsVerticalScrollIndicator={false}
        >
          {sortedDeposits.map((deposit, index) => (
            <View
              key={deposit.id}
              className={`flex-row items-center justify-between py-4 ${
                index < sortedDeposits.length - 1
                  ? 'border-b border-neutral-700'
                  : ''
              }`}
            >
              <View className="flex-1 gap-1">
                <Text className="font-sans-medium text-body text-neutral-0">
                  {deposit.description || 'Deposit'}
                </Text>
                <Text className="font-sans text-body-sm text-neutral-400">
                  {formatDisplayDate(deposit.date)}
                </Text>
              </View>
              <Text className="font-sans-semibold text-amount text-neutral-0">
                {formatCurrency(deposit.amount)}
              </Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}
