# Quickstart: Goal Details Page

**Feature**: 014-goal-details-page
**Date**: 2026-06-16

## Overview

This feature transforms the placeholder route `src/app/(logged)/goals/[id].tsx` into a full goal details screen displaying goal information, progress, deposit history, and a deposit form (for in-progress goals).

## Files to Create

```
src/features/goal-details/
├── index.ts
├── types/
│   └── deposit.ts
├── schemas/
│   └── deposit.schema.ts
├── mocks/
│   └── deposit-data.ts
├── utils/
│   └── format-date.ts
├── screens/
│   └── goal-details-screen.tsx
└── components/
    ├── deposit-form.tsx
    ├── deposit-history.tsx
    ├── goal-info-header.tsx
    ├── goal-progress-section.tsx
    └── goal-actions.tsx

src/components/ui/app-currency-input/
├── app-currency-input.tsx
└── index.ts

src/utils/
└── format-currency.ts          (moved/created from overview utils)
```

## Files to Modify

| File | Change |
|------|--------|
| `src/app/(logged)/goals/[id].tsx` | Replace placeholder with `GoalDetailsScreen` |
| `src/features/goal-create/components/goal-form-modal.tsx` | Replace inline `CurrencyAmountField` with import from `@/components/ui/app-currency-input` |
| `src/components/ui/index.ts` | Add `AppCurrencyInput` to barrel export |

## Implementation Order

### Step 1: Extract Currency Input Component

Move `CurrencyAmountField` from `goal-form-modal.tsx` to `src/components/ui/app-currency-input/`:
- Extract the component, `digitsToAmount`, `digitsToDisplay`, `DECIMAL_PLACES`, and formatter constants
- Add `label: string` prop to control the displayed label text (hardcoded "Target amount" → dynamic)
- Export as `AppCurrencyInput`
- Update `goal-form-modal.tsx` to import from `@/components/ui/app-currency-input`
- Add barrel export to `src/components/ui/index.ts`

### Step 2: Create Shared Currency Formatter

Create `src/utils/format-currency.ts` with `en-US` formatting:
- Export `formatCurrency(value: number): string` using `Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })`
- This avoids locale duplication across features (overview uses pt-BR, goal-details needs en-US per designs)

### Step 3: Create Feature Types & Schemas

**`src/features/goal-details/types/deposit.ts`**:
- `Deposit` interface (id, amount, date, description?, goalId)
- `GoalWithDeposits` interface (goal: Goal, deposits: Deposit[])
- `DepositFormData` type (amount: number, description?: string)

**`src/features/goal-details/schemas/deposit.schema.ts`**:
- Zod schema: `amount` > 0 required, `description` optional string

### Step 4: Create Mock Data

**`src/features/goal-details/mocks/deposit-data.ts`**:
- `mockDeposits`: Array of 5-8 Deposit objects with varied amounts, dates, and some with descriptions
- `mockGoalWithDeposits`: Combines `mockInProgressGoal` with `mockDeposits`
- `mockCompletedGoalWithDeposits`: Combines `mockCompleteGoal` with deposits
- `mockEmptyDeposits`: Goal with no deposits (empty state)

### Step 5: Create Utility Functions

**`src/features/goal-details/utils/format-date.ts`**:
- `formatDisplayDate(isoString: string): string` → "Nov 15, 2025" format using date-fns
- Uses `date-fns` `format` with pattern `MMM d, yyyy`

### Step 6: Build Screen Components

**`goal-info-header.tsx`**:
- Displays: goal name (h1), due date, creation date (separated by bullet)
- Props: `Goal` object

**`goal-progress-section.tsx`**:
- Displays: `AppProgressBar` with appropriate variant per status
- Shows percentage text, accumulated amount, target amount
- Props: derived percentage, currentAmount, targetAmount, status

**`deposit-form.tsx`** (In Progress only):
- Uses `react-hook-form` + zod resolver
- Fields: `AppCurrencyInput` for amount, `AppInput` for description
- Submit button using `AppButton variant="primary"`
- Props: `onSubmit: (data: DepositFormData) => void`

**`deposit-history.tsx`**:
- Scrollable list of deposit entries
- Each entry: amount (currency formatted), date, description (if present)
- Props: `deposits: Deposit[]`

**`goal-actions.tsx`**:
- Edit button + Delete button (visual only, no logic per FR-021)
- Props: none (static display)

**`goal-details-screen.tsx`**:
- Orchestrates all subcomponents
- Computes derived fields (percentage, status) from goal data
- Conditionally renders deposit form based on status
- Responsive layout: two-column on tablet/desktop, stacked on mobile

### Step 7: Wire Up Route

Replace `src/app/(logged)/goals/[id].tsx` placeholder:
- Import and render `GoalDetailsScreen`
- Pass mock `goalWithDeposits` data (parameterized by `id` param for future use)
- Back button: On-screen back arrow using `router.push('/')`

### Step 8: Verify

- Run lint: `npm run lint`
- Run typecheck: `npm run typecheck` (if available)
- Run tests: `npm test` if test files exist for new components

## Component Contract

### AppCurrencyInput

```tsx
<AppCurrencyInput
  value={amount}
  onChange={handleAmountChange}
  onBlur={handleBlur}
  isInvalid={!!errors.amount}
  errorMessage={errors.amount?.message}
  label="Deposit amount"
  editable={!isSubmitting}
/>
```

**Props**:
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `value` | `number` | Yes | - | Current amount in cents/units |
| `onChange` | `(value: number) => void` | Yes | - | Called with parsed number on input change |
| `onBlur` | `() => void` | Yes | - | Blur handler for form state |
| `isInvalid` | `boolean` | Yes | - | Shows error border style |
| `errorMessage` | `string` | No | `undefined` | Error text below input |
| `label` | `string` | Yes | - | Label text above input (NEW) |
| `editable` | `boolean` | No | `true` | Whether input accepts input |

## Responsive Layout

```text
Desktop (>=1024px): [Goal Info | Deposit History]
Tablet (768-1023px): [Goal Info | Deposit History] (reduced padding)
Mobile (<768px):    [Goal Info]
                    [Deposit History]  (stacked)
```

Use NativeWind classes: `flex-col lg:flex-row` on the main section container.
