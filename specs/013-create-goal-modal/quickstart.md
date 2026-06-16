# Quickstart: Create Goal Modal

**Feature**: 013-create-goal-modal  
**Date**: 2026-06-15

## Prerequisites

- Node.js environment with `npx expo` available
- Project dependencies installed (`npm install`)
- Approval to install `@react-native-community/datetimepicker` (date picker)

## File Structure

```
src/features/goal-create/
├── components/
│   └── goal-form-modal.tsx       # Main modal component
├── schemas/
│   └── create-goal.schema.ts     # Zod schema + inferred type
└── index.ts                      # Barrel export
```

## Integration Example

In `DashboardScreen` (or any consumer):

```tsx
import { useState } from 'react';
import { GoalFormModal } from '@/features/goal-create';

export default function DashboardScreen() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Topbar onNewGoal={() => setIsModalOpen(true)} />
      {goals.length === 0 ? (
        <EmptyState onCreateGoal={() => setIsModalOpen(true)} />
      ) : (
        <GoalsGrid goals={goals} />
      )}
      <GoalFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
```

## Key Dependencies

| Package | Usage |
|---------|-------|
| `react-hook-form` + `@hookform/resolvers/zod` | Form state + validation |
| `zod` | Schema definition |
| `date-fns` | Date comparison (`isAfter`, `isBefore`) |
| `@react-native-community/datetimepicker` | Native date picker UI |
| `@/components/ui/app-modal` | Modal container |
| `@/components/ui/app-input` | Form fields |
| `@/components/ui/app-button` | Action buttons |

## Commands

```bash
# Lint
npx eslint src/features/goal-create/ --ext .ts,.tsx

# Type check
npx tsc --noEmit

# Run tests
npx jest --testPathPattern="goal-create"
```
