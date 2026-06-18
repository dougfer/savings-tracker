import type { Goal } from '@/features/overview/types/goal';

export interface Deposit {
  id: string;
  amount: number;
  date: string;
  description?: string;
  goalId: string;
}

export interface GoalWithDeposits {
  goal: Goal;
  deposits: Deposit[];
}

export type DepositFormData = {
  amount: number;
  description?: string;
};
