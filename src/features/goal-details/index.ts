export type { Deposit, GoalWithDeposits, DepositFormData } from './types/deposit';
export { depositSchema, type DepositFormValues } from './schemas/deposit.schema';
export { formatDisplayDate } from './utils/format-date';
export {
  mockDeposits,
  mockCompletedDeposits,
  mockGoalInProgressWithDeposits,
  mockGoalCompletedWithDeposits,
  mockGoalEmptyDeposits,
} from './mocks/deposit-data';
