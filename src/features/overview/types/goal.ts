export type GoalState = 'no-progress' | 'in-progress' | 'complete';
export type GoalSize = 'default' | 'wide' | 'tall';

export interface Goal {
  id: string;
  name: string;
  currentAmount: number;
  targetAmount: number;
  dueDate: string | null;
  createdAt: string;
}
