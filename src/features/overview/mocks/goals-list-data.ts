import type { Goal } from '../types/goal';

export const mockGoalsList: Goal[] = [
  {
    id: '1',
    name: 'Emergency Fund',
    currentAmount: 3500,
    targetAmount: 10000,
    dueDate: '2026-12-15',
    createdAt: '2026-01-15',
  },
  {
    id: '2',
    name: 'MacBook Pro M4',
    currentAmount: 0,
    targetAmount: 2499,
    dueDate: '2026-09-01',
    createdAt: '2026-02-10',
  },
  {
    id: '3',
    name: 'Férias Europa 2027',
    currentAmount: 8100,
    targetAmount: 15000,
    dueDate: '2027-06-30',
    createdAt: '2026-03-20',
  },
  {
    id: '4',
    name: 'Curso de Especialização',
    currentAmount: 3500,
    targetAmount: 3500,
    dueDate: '2026-08-20',
    createdAt: '2026-01-05',
  },
  {
    id: '5',
    name: 'iPhone 17 Pro',
    currentAmount: 2000,
    targetAmount: 6999,
    dueDate: '2026-11-10',
    createdAt: '2026-04-15',
  },
  {
    id: '6',
    name: 'Reforma Apartamento',
    currentAmount: 12000,
    targetAmount: 25000,
    dueDate: '2027-03-15',
    createdAt: '2026-01-20',
  },
  {
    id: '7',
    name: 'Reserva de Emergência',
    currentAmount: 9500,
    targetAmount: 9500,
    dueDate: '2026-07-01',
    createdAt: '2026-05-10',
  },
  {
    id: '8',
    name: 'Notebook Gamer',
    currentAmount: 300,
    targetAmount: 8000,
    dueDate: '2026-12-31',
    createdAt: '2026-06-01',
  },
];

export const mockEmptyGoalsList: Goal[] = [];
