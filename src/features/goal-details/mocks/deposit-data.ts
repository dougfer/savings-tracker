import type { GoalWithDeposits, Deposit } from '../types/deposit';

export const mockDeposits: Deposit[] = [
  {
    id: 'd1',
    amount: 500,
    date: '2026-06-10',
    description: 'Monthly savings',
    goalId: '2',
  },
  {
    id: 'd2',
    amount: 300,
    date: '2026-05-15',
    description: 'Bonus deposit',
    goalId: '2',
  },
  {
    id: 'd3',
    amount: 200,
    date: '2026-04-20',
    goalId: '2',
  },
  {
    id: 'd4',
    amount: 150,
    date: '2026-03-12',
    description: 'Extra savings',
    goalId: '2',
  },
  {
    id: 'd5',
    amount: 99,
    date: '2026-02-08',
    goalId: '2',
  },
];

export const mockCompletedDeposits: Deposit[] = [
  {
    id: 'c1',
    amount: 800,
    date: '2026-03-01',
    description: 'Initial payment',
    goalId: '3',
  },
  {
    id: 'c2',
    amount: 500,
    date: '2026-02-15',
    description: 'Monthly savings',
    goalId: '3',
  },
  {
    id: 'c3',
    amount: 500,
    date: '2026-01-30',
    goalId: '3',
  },
  {
    id: 'c4',
    amount: 400,
    date: '2025-12-20',
    description: 'Year-end bonus',
    goalId: '3',
  },
  {
    id: 'c5',
    amount: 299,
    date: '2025-12-05',
    goalId: '3',
  },
];

export const mockGoalInProgressWithDeposits: GoalWithDeposits = {
  goal: {
    id: '2',
    name: 'MacBook Pro M4',
    currentAmount: 1249,
    targetAmount: 2499,
    dueDate: '2026-06-01',
    createdAt: '2025-11-15',
  },
  deposits: mockDeposits,
};

export const mockGoalCompletedWithDeposits: GoalWithDeposits = {
  goal: {
    id: '3',
    name: 'Mechanical Keyboard',
    currentAmount: 2499,
    targetAmount: 2499,
    dueDate: '2026-03-15',
    createdAt: '2025-12-01',
  },
  deposits: mockCompletedDeposits,
};

export const mockGoalEmptyDeposits: GoalWithDeposits = {
  goal: {
    id: '1',
    name: 'MacBook Pro M4',
    currentAmount: 0,
    targetAmount: 2499,
    dueDate: '2026-06-01',
    createdAt: '2025-11-15',
  },
  deposits: [],
};
