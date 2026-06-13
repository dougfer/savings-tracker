import type { Goal } from '../types/goal';

export const mockNoProgressGoal: Goal = {
  id: '1',
  name: 'MacBook Pro M4',
  currentAmount: 0,
  targetAmount: 2499,
  dueDate: '2026-06-01',
  createdAt: '2026-01-15',
};

export const mockInProgressGoal: Goal = {
  id: '2',
  name: 'MacBook Pro M4',
  currentAmount: 1249,
  targetAmount: 2499,
  dueDate: '2026-06-01',
  createdAt: '2026-01-15',
};

export const mockCompleteGoal: Goal = {
  id: '3',
  name: 'MacBook Pro M4',
  currentAmount: 2499,
  targetAmount: 2499,
  dueDate: '2026-06-01',
  createdAt: '2026-01-15',
};

export const mockNoDueDateGoal: Goal = {
  id: '4',
  name: 'Emergency Fund',
  currentAmount: 5000,
  targetAmount: 10000,
  dueDate: null,
  createdAt: '2026-01-15',
};

export const mockAllGoals = [
  mockNoProgressGoal,
  mockInProgressGoal,
  mockCompleteGoal,
  mockNoDueDateGoal,
];
