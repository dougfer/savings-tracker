import { View } from 'react-native';

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
    <View className="gap-8 py-12">
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
  );
}
