import { ScrollView, View } from 'react-native';

import { DepositForm } from '../components/deposit-form';
import { DepositHistory } from '../components/deposit-history';
import { GoalInfoHeader } from '../components/goal-info-header';
import { GoalProgressSection } from '../components/goal-progress-section';
import type { GoalWithDeposits } from '../types/deposit';

interface GoalDetailsScreenProps {
  data: GoalWithDeposits;
}

export function GoalDetailsScreen({ data }: GoalDetailsScreenProps) {
  const { goal, deposits } = data;

  const percentage = Math.min(
    100,
    Math.round((goal.currentAmount / goal.targetAmount) * 100),
  );
  const isCompleted = percentage >= 100;

  const handleDepositSubmit = () => {
    // TODO: Future integration - persist deposit and update goal data
  };

  return (
    <ScrollView className="flex-1" contentContainerClassName="gap-8 py-8">
      <GoalInfoHeader goal={goal} />

      <View className="flex-col desktop:flex-row gap-8 desktop:gap-12">
        <View className="flex-1 desktop:flex-[2] gap-6">
          <View className="rounded-2xl bg-neutral-800 p-6 border border-neutral-600">
            <GoalProgressSection
              percentage={percentage}
              currentAmount={goal.currentAmount}
              targetAmount={goal.targetAmount}
              isCompleted={isCompleted}
            />
          </View>

          {!isCompleted && (
            <View className="rounded-2xl bg-neutral-800 p-6 border border-neutral-600">
              <DepositForm onSubmit={handleDepositSubmit} />
            </View>
          )}
        </View>

        <View className="flex-1 rounded-2xl bg-neutral-800 p-6 border border-neutral-600">
          <DepositHistory deposits={deposits} />
        </View>
      </View>
    </ScrollView>
  );
}
