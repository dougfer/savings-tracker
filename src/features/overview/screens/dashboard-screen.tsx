import { ScrollView, View } from 'react-native';

import { useResponsive } from '@/hooks/useResponsive';

import { DashboardSummary } from '../components/dashboard-summary';
import { EmptyState } from '../components/empty-state';
import { GoalsGrid } from '../components/goals-grid';
import { GoalsHeader } from '../components/goals-header';
import { mockPopulatedDashboard } from '../mocks/dashboard-data';
import { mockGoalsList } from '../mocks/goals-list-data';

export default function DashboardScreen() {
  const { isDesktop, isTablet } = useResponsive();
  const goals = mockGoalsList;
  const isEmpty = goals.length === 0;
  const showExampleCards = isDesktop || isTablet;

  return (
    <ScrollView className="flex-1 bg-neutral-900">
      <View className="gap-8 px-4 py-12 md:px-6 lg:px-0">
        <DashboardSummary data={mockPopulatedDashboard} />
        <View className="gap-6">
          <GoalsHeader title="Your goals" />
          {isEmpty ? (
            <EmptyState showExampleCards={showExampleCards} exampleGoals={mockGoalsList} />
          ) : (
            <GoalsGrid goals={goals} />
          )}
        </View>
      </View>
    </ScrollView>
  );
}
