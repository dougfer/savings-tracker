# Data Model: Goal Details Page

**Feature**: 014-goal-details-page
**Date**: 2026-06-16

## Entities

### Goal (existing, extended)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | Yes | Unique identifier (UUID) |
| `name` | `string` | Yes | Goal name (e.g., "MacBook Pro M4") |
| `currentAmount` | `number` | Yes | Total accumulated amount from all deposits |
| `targetAmount` | `number` | Yes | Goal target amount |
| `dueDate` | `string \| null` | No | Target completion date (ISO 8601) |
| `createdAt` | `string` | Yes | Goal creation date (ISO 8601) |

**Derived fields** (computed, not stored):
- `percentage`: `Math.min(100, Math.round((currentAmount / targetAmount) * 100))`
- `status`: `percentage >= 100 ? 'completed' : 'in-progress'`
- `state`: `currentAmount === 0 ? 'no-progress' : percentage >= 100 ? 'complete' : 'in-progress'`

### Deposit (new)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | Yes | Unique identifier (UUID) |
| `amount` | `number` | Yes | Deposit amount (must be > 0) |
| `date` | `string` | Yes | Deposit date (ISO 8601) |
| `description` | `string \| undefined` | No | Optional note about the deposit |
| `goalId` | `string` | Yes | Foreign key to the parent Goal |

### DepositFormData (form input)

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `amount` | `number` | Yes | Must be > 0, valid monetary value |
| `description` | `string` | No | Optional, any text |

### GoalWithDeposits (aggregate for screen)

```ts
interface GoalWithDeposits {
  goal: Goal;
  deposits: Deposit[];
}
```

## State Transitions

### Goal Status

```
[goal created] ──> "in-progress" (percentage < 100%)
                        │
                        │ deposits accumulate
                        │
                        ▼
                  "completed" (percentage >= 100%)
```

### Screen States

| State | Condition | Deposit Form | Progress Variant |
|-------|-----------|-------------|------------------|
| In Progress | `percentage < 100` | Visible | `default` (orange) |
| Completed | `percentage >= 100` | Hidden | `success` (green) |

## Validation Rules

### Deposit Amount
- **FR-015**: Required field
- **FR-017**: Must be a valid monetary value greater than zero
- **FR-017**: Empty input → error "Amount is required"
- **FR-017**: Zero or negative → error "Amount must be greater than zero"
- **FR-017**: Non-numeric → error "Enter a valid amount"

### Deposit Description
- **FR-016**: Optional field, no validation required
