# Data Model: Goal Card

**Feature**: 011-goal-card  
**Date**: 2026-06-11

## Entities

### Goal

Represents a single financial goal created by the user. This is the primary data entity consumed by the Goal Card component.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | Yes | Unique identifier |
| `name` | `string` | Yes | Goal name (e.g., "MacBook Pro M4", "Emergency Fund") |
| `currentAmount` | `number` | Yes | Accumulated savings towards the goal (in currency units) |
| `targetAmount` | `number` | Yes | Target amount to reach (in currency units) |
| `dueDate` | `string \| null` | No | Target completion date (ISO 8601 date string or null) |
| `createdAt` | `string` | Yes | Goal creation date (ISO 8601 date string) |

### Derived Fields (computed, not stored)

| Field | Type | Computation |
|-------|------|-------------|
| `progress` | `number` (0–1) | `clamp(currentAmount / targetAmount, 0, 1)` |
| `percentage` | `number` (0–100) | `Math.round(progress * 100)` |
| `state` | `GoalState` | `progress === 0 ? 'no-progress' : progress >= 1 ? 'complete' : 'in-progress'` |

### Enums

#### GoalState

```ts
type GoalState = 'no-progress' | 'in-progress' | 'complete';
```

Derived from progress, never stored. Determines visual styling (colors, COMPLETE tag visibility).

#### GoalSize

```ts
type GoalSize = 'default' | 'wide' | 'tall';
```

Passed as prop to GoalCard. Controls layout dimensions and background style.

### TypeScript Definitions

```ts
// src/features/overview/types/goal.ts

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
```

### Relationship to Existing Types

- `Goal` is a **new** entity — the existing `AccountSummary` in `dashboard.ts` only tracks `activeGoalsCount` and `completedGoalsCount` as aggregate numbers.
- `Goal` does **not** modify `AccountSummary` or `DashboardData`. It complements them.
- When a goals list feature is implemented (future spec), it will consume `Goal[]` as its data array.

### Validation Rules (FR compliance)

| Rule | Source FR |
|------|-----------|
| `currentAmount >= 0` | FR-008 (clamp progress) |
| `targetAmount > 0` | FR-008 (avoid division by zero) |
| `name` non-empty string | FR-001 (display name) |
| `dueDate` ISO 8601 or null | FR-007 (display due date) |
| Progress = `clamp(currentAmount / targetAmount, 0, 1)` | FR-004, FR-008 |

### Edge Cases

| Scenario | Behavior |
|----------|----------|
| `targetAmount === 0` | Progress defaults to 0; state = `'no-progress'` |
| `currentAmount > targetAmount` | Progress clamped to 1; state = `'complete'` |
| `name` is empty string | Display fallback: "Untitled goal" |
| `dueDate` is null | Due date text hidden in footer |
| `currentAmount === 0` && `targetAmount > 0` | State = `'no-progress'` |
