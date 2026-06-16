# Data Model: Create Goal Modal

**Feature**: 013-create-goal-modal  
**Date**: 2026-06-15

## Entities

### Goal (existing, extended)

Defined in `src/features/overview/types/goal.ts`.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | Yes | Unique identifier, generated locally (e.g., `crypto.randomUUID()`) |
| `name` | `string` | Yes | Goal name, trimmed, non-empty |
| `currentAmount` | `number` | Yes | Currently saved amount. Defaults to `0` on creation |
| `targetAmount` | `number` | Yes | Target savings amount. Must be > 0 |
| `dueDate` | `string \| null` | No | ISO date string or null. When set, must be in the future |
| `createdAt` | `string` | Yes | ISO datetime string, set to current timestamp on creation |

### GoalCreateInput (transient, form-only)

Used for the form submission contract. Not persisted.

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `name` | `string` | Yes | `.trim().min(1)` |
| `amount` | `number` | Yes | `> 0` |
| `deadline` | `Date \| undefined` | No | Must be after current date when provided |

### GoalState (existing)

```ts
type GoalState = 'no-progress' | 'in-progress' | 'complete';
```

Newly created goals start with state `'no-progress'` (derived from `currentAmount === 0`).

## Schema (Zod)

```ts
import { z } from 'zod';

export const createGoalSchema = z.object({
  name: z.string().trim().min(1, 'Goal name is required'),
  amount: z.number().positive('Amount must be greater than zero'),
  deadline: z
    .date()
    .refine((date) => date > new Date(), {
      message: 'Deadline must be a future date',
    })
    .optional(),
});

export type CreateGoalFormData = z.infer<typeof createGoalSchema>;
```

**Schema location**: `src/features/goal-create/schemas/create-goal.schema.ts`

## State Machine

```
┌──────────────┐     onClose               ┌──────────────┐
│   CLOSED      │◄──────────────────────────│   OPEN        │
│               │                           │               │
│ form reset    │    isOpen=true            │ form active   │
│ all null      │─────────────────────────►│ validation    │
└──────────────┘                           └──────────────┘
                                                   │
                                                   │ handleSubmit()
                                                   ▼
                                           ┌──────────────┐
                                           │  SUBMITTING   │
                                           │              │
                                           │ button shows  │
                                           │ loading state │
                                           └──────┬───────┘
                                                  │
                                       ┌──────────┴──────────┐
                                       ▼                     ▼
                                  VALID               INVALID
                             ┌──────────┐        ┌──────────┐
                             │ process  │        │ show     │
                             │ locally  │        │ errors   │
                             │ close    │        │ stay open│
                             └──────────┘        └──────────┘
```

## Relationships

- A `Goal` belongs to the local goals list managed in the overview feature
- The `GoalFormModal` component encapsulates form logic and submission internally — it communicates only via `isOpen`/`onClose` props
- Goal creation logic will be added directly within the modal component in a future iteration
