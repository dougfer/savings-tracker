# Contracts: Create Goal Modal

**Feature**: 013-create-goal-modal

## GoalFormModal Component Contract

### Props

```ts
interface GoalFormModalProps {
  /** Controls modal visibility */
  isOpen: boolean;
  /** Called when modal is dismissed (cancel, close X, or after submit) */
  onClose: () => void;
}
```

### Behavior Contract

| Action | Precondition | Postcondition |
|--------|-------------|---------------|
| `isOpen` transitions `true → false` | Modal is open | Form resets, modal invisible |
| `isOpen` transitions `false → true` | Modal is closed | Fresh empty form, submit disabled |
| User clicks "Cancel" | Modal is open | `onClose()` called, form data discarded |
| User clicks close (X) | Modal is open | `onClose()` called, form data discarded |
| User clicks "Create goal" with valid form | All validations pass | `onClose()` called, form data consumed internally |
| User clicks "Create goal" with invalid form | Validation errors exist | Errors displayed, modal stays open |

### CreateGoalFormData

```ts
type CreateGoalFormData = {
  name: string;       // trimmed, non-empty
  amount: number;     // > 0
  deadline?: Date;    // optional, must be future date if provided
};
```

### Validation Rules

| Field | Rule | Error Message |
|-------|------|---------------|
| `name` | Required, non-empty after trim | "Goal name is required" |
| `amount` | Required, must be > 0 | "Amount must be greater than zero" |
| `deadline` | Optional, if provided must be > now | "Deadline must be a future date" |

### Accessibility Contract

- All fields have associated labels (`AppInput.Label`)
- Error messages use `accessibilityLiveRegion="assertive"`
- Focus is trapped within the modal when open
- Focus returns to the trigger element on close
- Close button is keyboard accessible
- Submit button states: disabled (invalid), enabled (valid), loading (submitting)

### Responsive Contract

| Breakpoint | Modal Width | Padding |
|------------|-------------|---------|
| Desktop (≥1024px) | 680px | 32px |
| Tablet (768-1023px) | 680px | 32px |
| Mobile (<768px) | 343px (max) | 20px horizontal, 16px vertical |
