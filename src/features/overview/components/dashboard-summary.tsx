import { View } from 'react-native';

import { useResponsive } from '@/hooks/useResponsive';
import { TotalSavingsCard } from './total-savings-card';
import { SummaryCard } from './summary-card';
import { BarChart } from './bar-chart';
import type { DashboardData } from '../types/dashboard';

type DashboardSummaryProps = {
  data: DashboardData;
};

const MONTHS_DESKTOP = 12;
const MONTHS_TABLET = 6;
const MONTHS_MOBILE = 4;

export function DashboardSummary({ data }: DashboardSummaryProps) {
  const { isDesktop, isTablet, isMobile } = useResponsive();

  const monthsToShow = isDesktop
    ? MONTHS_DESKTOP
    : isTablet
      ? MONTHS_TABLET
      : MONTHS_MOBILE;

  const chartData = data.monthlyDeposits.slice(-monthsToShow);

  const cardsRowClass = isDesktop
    ? 'flex-row'
    : isTablet
      ? 'flex-row flex-wrap'
      : 'flex-col';

  return (
    <View className="gap-6">
      <View className={cardsRowClass} style={{ gap: 24 }}>
        <TotalSavingsCard totalSavings={data.summary.totalSavings} />
        <SummaryCard
          label="Active goals"
          value={data.summary.activeGoalsCount}
          valueColor="#FF5722"
        />
        <SummaryCard
          label="Goals completed"
          value={data.summary.completedGoalsCount}
          valueColor="#4ADE80"
        />
      </View>
      <BarChart data={chartData} isMobile={isMobile} />
    </View>
  );
}
