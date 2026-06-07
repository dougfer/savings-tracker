import type { DashboardData } from '../types/dashboard';

export const mockPopulatedDashboard: DashboardData = {
  summary: {
    totalSavings: 11249.0,
    activeGoalsCount: 7,
    completedGoalsCount: 2,
  },
  monthlyDeposits: [
    { month: 'Apr', value: 0 },
    { month: 'May', value: 0 },
    { month: 'Jun', value: 500 },
    { month: 'Jul', value: 400 },
    { month: 'Aug', value: 400 },
    { month: 'Sep', value: 1150 },
    { month: 'Oct', value: 1149 },
    { month: 'Nov', value: 1550 },
    { month: 'Dec', value: 2350 },
    { month: 'Jan', value: 1025 },
    { month: 'Feb', value: 1550 },
    { month: 'Mar', value: 1550 },
  ],
};

export const mockEmptyDashboard: DashboardData = {
  summary: {
    totalSavings: 0,
    activeGoalsCount: 0,
    completedGoalsCount: 0,
  },
  monthlyDeposits: [
    { month: 'Apr', value: 0 },
    { month: 'May', value: 0 },
    { month: 'Jun', value: 0 },
    { month: 'Jul', value: 0 },
    { month: 'Aug', value: 0 },
    { month: 'Sep', value: 0 },
    { month: 'Oct', value: 0 },
    { month: 'Nov', value: 0 },
    { month: 'Dec', value: 0 },
    { month: 'Jan', value: 0 },
    { month: 'Feb', value: 0 },
    { month: 'Mar', value: 0 },
  ],
};
