export interface AccountSummary {
  totalSavings: number;
  activeGoalsCount: number;
  completedGoalsCount: number;
}

export interface MonthlyDeposit {
  month: string;
  value: number;
}

export interface DashboardData {
  summary: AccountSummary;
  monthlyDeposits: MonthlyDeposit[];
}
