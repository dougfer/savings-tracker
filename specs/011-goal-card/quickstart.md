# Quickstart: Goal Card

**Feature**: 011-goal-card  
**Date**: 2026-06-11

## Overview

Implement the `GoalCard` presentational component inside `src/features/overview/components/goal-card/`. The component renders a single financial goal card with progress visualization, following the design at `app.pen` node `iRrfV`.

## Files to Create

| File | Purpose |
|------|---------|
| `src/features/overview/types/goal.ts` | Goal type, GoalState, GoalSize |
| `src/features/overview/mocks/goal-data.ts` | Mock goal data for all states |
| `src/features/overview/components/goal-card/goal-card.tsx` | GoalCard component |
| `src/features/overview/components/goal-card/index.ts` | Barrel export |
| `src/features/overview/components/goal-card/goal-card.test.tsx` | Unit tests |

## Component API

```tsx
import { GoalCard } from '@/features/overview/components/goal-card';

<GoalCard goal={goal} size="default" />
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `goal` | `Goal` | required | Goal data object |
| `size` | `'default' \| 'wide' \| 'tall'` | `'default'` | Card size variant |

### State Derivation

The component derives state internally:
- `progress = clamp(goal.currentAmount / goal.targetAmount, 0, 1)`
- `state`: `'no-progress'` when progress=0, `'complete'` when progress≥1, `'in-progress'` otherwise

## Implementation Steps

### Step 1: Create `types/goal.ts`

Define `Goal` interface, `GoalState` and `GoalSize` types. See [data-model.md](./data-model.md) for exact signatures.

### Step 2: Create `mocks/goal-data.ts`

Provide at least one mock for each state:
- `mockNoProgressGoal`: currentAmount=0
- `mockInProgressGoal`: currentAmount < targetAmount (e.g., 30%)
- `mockCompleteGoal`: currentAmount = targetAmount (100%)

### Step 3: Implement `goal-card.tsx`

Follow the design token mappings from [research.md](./research.md). Key implementation notes:

1. **Root View**: `rounded-2xl border p-6 gap-6` with state-dependent background and border color
2. **Header**: Product name (`font-sans-semibold heading-md text-white`) + COMPLETE tag (visible only when `state === 'complete'`)
3. **Progress Section**: Percentage (`font-display-semibold display-lg`) + progress bar. Progress bar uses a custom View-based implementation (not AppProgressBar) due to specific styling requirements (12px height, rounded-full track, rounded-lg fill, 1px white/30 inner stroke)
4. **Footer**: `"$X of $Y"` formatted via `formatCurrency`, separator dot (`w-1 h-1 rounded-full bg-neutral-300`), due date (`opacity-70`) when available
5. **Decoration**: Reuse `VectorPatternIcon` positioned absolutely with `opacity-[0.03]`
6. **Wide variant**: Background uses `react-native-svg` gradient (same pattern as `TotalSavingsCard`)

### Step 4: Add accessibility

```tsx
accessibilityRole="summary"
accessibilityLabel={`${goal.name}: ${percentage}% ${stateLabel}`}
```

Progress bar should have `accessibilityRole="progressbar"` with `aria-valuenow`, `aria-valuemin={0}`, `aria-valuemax={100}`.

### Step 5: Write tests (`goal-card.test.tsx`)

Test each state and size combination:
- Renders goal name, amounts, percentage
- No Progress: gray percentage, empty bar, no COMPLETE tag
- In Progress: orange percentage, partial bar, no COMPLETE tag
- Complete: green percentage, full bar, visible COMPLETE tag
- Wide variant: gradient background (verify SVG presence)
- Tall variant: height=504px (verify layout dimensions)
- Edge cases: long name truncation, zero targetAmount, excess currentAmount

## Design Token Reference

| Design Value | Token |
|-------------|-------|
| Card bg (dark) | `bg-neutral-800` |
| Card border (dark) | `border-neutral-600` |
| Card radius | `rounded-2xl` |
| Card padding | `p-6` |
| Card gap | `gap-6` |
| Progress track | `bg-neutral-700`, `rounded-full`, `h-3` |
| Progress fill (In Progress) | `bg-orange-400` |
| Progress fill (Complete) | `bg-success` |
| Percentage (In Progress) | `text-orange-400` |
| Percentage (Complete) | `text-success` |
| Percentage (No Progress) | `text-neutral-400` |
| COMPLETE tag bg | `bg-green-900` |
| COMPLETE tag border | `border-success` |
| Gradient start | `#FF5722` (orange-400) |
| Gradient end | `#B92B09` (orange-700) |
| Wide progress track | `bg-orange-800` |

## Conventions

- Follow existing patterns from `SummaryCard` and `TotalSavingsCard`
- Use `AppText` for all text elements
- Use NativeWind className strings (no `style` objects unless required)
- Export via barrel `index.ts`
- Co-locate tests with `*.test.tsx` naming
- Format currency via `@/features/overview/utils/format-currency`
