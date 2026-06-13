import { render } from '@testing-library/react-native';

import { GoalCard } from './goal-card';
import {
  mockInProgressGoal,
  mockNoProgressGoal,
  mockCompleteGoal,
  mockNoDueDateGoal,
} from '../../mocks/goal-data';
import { formatCurrency } from '../../utils/format-currency';

describe('GoalCard', () => {
  describe('In Progress state', () => {
    it('renders goal name and amounts correctly', () => {
      const { getByText } = render(<GoalCard goal={mockInProgressGoal} />);
      expect(getByText('MacBook Pro M4')).toBeTruthy();
      const amountText = `${formatCurrency(1249)} of ${formatCurrency(2499)}`;
      expect(getByText(amountText)).toBeTruthy();
    });

    it('shows correct percentage', () => {
      const { getByText } = render(<GoalCard goal={mockInProgressGoal} />);
      expect(getByText('50')).toBeTruthy();
    });

    it('does not show COMPLETE tag', () => {
      const { queryByText } = render(<GoalCard goal={mockInProgressGoal} />);
      expect(queryByText('COMPLETE')).toBeNull();
    });

    it('renders due date when present', () => {
      const { getByText } = render(<GoalCard goal={mockInProgressGoal} />);
      expect(getByText('Due Jun 1, 2026')).toBeTruthy();
    });
  });

  describe('No Progress state', () => {
    it('shows zero percentage', () => {
      const { getByText } = render(<GoalCard goal={mockNoProgressGoal} />);
      expect(getByText('0')).toBeTruthy();
    });

    it('does not show COMPLETE tag', () => {
      const { queryByText } = render(<GoalCard goal={mockNoProgressGoal} />);
      expect(queryByText('COMPLETE')).toBeNull();
    });
  });

  describe('Complete state', () => {
    it('shows COMPLETE tag', () => {
      const { getByText } = render(<GoalCard goal={mockCompleteGoal} />);
      expect(getByText('COMPLETE')).toBeTruthy();
    });

    it('shows 100% percentage', () => {
      const { getByText } = render(<GoalCard goal={mockCompleteGoal} />);
      expect(getByText('100')).toBeTruthy();
    });
  });

  describe('Due date handling', () => {
    it('renders due date when present', () => {
      const { getByText } = render(<GoalCard goal={mockInProgressGoal} />);
      expect(getByText('Due Jun 1, 2026')).toBeTruthy();
    });

    it('does not render due date when null', () => {
      const { queryByText } = render(<GoalCard goal={mockNoDueDateGoal} />);
      expect(queryByText(/Due/)).toBeNull();
    });
  });

  describe('Edge cases', () => {
    it('handles long names with truncation', () => {
      const longNameGoal = { ...mockInProgressGoal, name: 'Viagem para o Japão em 2027 com a família' };
      const { getByText } = render(<GoalCard goal={longNameGoal} />);
      const nameText = getByText('Viagem para o Japão em 2027 com a família');
      expect(nameText.props.numberOfLines).toBe(1);
    });

    it('uses fallback name when name is empty', () => {
      const emptyNameGoal = { ...mockInProgressGoal, name: '' };
      const { getByText } = render(<GoalCard goal={emptyNameGoal} />);
      expect(getByText('Untitled goal')).toBeTruthy();
    });

    it('handles zero targetAmount gracefully', () => {
      const zeroTargetGoal = { ...mockInProgressGoal, currentAmount: 100, targetAmount: 0 };
      const { getByText } = render(<GoalCard goal={zeroTargetGoal} />);
      expect(getByText('100')).toBeTruthy();
    });
  });

  describe('Size variants', () => {
    it('renders default size', () => {
      const { getByLabelText } = render(<GoalCard goal={mockInProgressGoal} size="default" />);
      const card = getByLabelText('MacBook Pro M4: 50% In progress');
      const style = Array.isArray(card.props.style) ? card.props.style[0] : card.props.style;
      expect(style.height).toBe(240);
    });

    it('renders tall size', () => {
      const { getByLabelText } = render(<GoalCard goal={mockInProgressGoal} size="tall" />);
      const card = getByLabelText('MacBook Pro M4: 50% In progress');
      const style = Array.isArray(card.props.style) ? card.props.style[0] : card.props.style;
      expect(style.height).toBe(504);
    });

    it('renders wide size with gradient', () => {
      const { getByLabelText } = render(<GoalCard goal={mockInProgressGoal} size="wide" />);
      const card = getByLabelText('MacBook Pro M4: 50% In progress');
      const style = Array.isArray(card.props.style) ? card.props.style[0] : card.props.style;
      expect(style.height).toBe(240);
    });
  });

  describe('Accessibility', () => {
    it('sets correct accessibility label for In Progress', () => {
      const { getByLabelText } = render(<GoalCard goal={mockInProgressGoal} />);
      expect(getByLabelText('MacBook Pro M4: 50% In progress')).toBeTruthy();
    });

    it('sets correct accessibility label for Complete', () => {
      const { getByLabelText } = render(<GoalCard goal={mockCompleteGoal} />);
      expect(getByLabelText('MacBook Pro M4: 100% Complete')).toBeTruthy();
    });

    it('sets correct accessibility label for No Progress', () => {
      const { getByLabelText } = render(<GoalCard goal={mockNoProgressGoal} />);
      expect(getByLabelText('MacBook Pro M4: 0% No progress')).toBeTruthy();
    });

    it('sets progressbar aria values correctly', () => {
      const { UNSAFE_getByProps } = render(<GoalCard goal={mockInProgressGoal} />);
      const progressbar = UNSAFE_getByProps({ accessibilityRole: 'progressbar' });
      expect(progressbar.props['aria-valuenow']).toBe(50);
      expect(progressbar.props['aria-valuemin']).toBe(0);
      expect(progressbar.props['aria-valuemax']).toBe(100);
    });
  });
});
