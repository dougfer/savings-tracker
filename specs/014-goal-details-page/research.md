# Research: Goal Details Page

**Feature**: 014-goal-details-page
**Date**: 2026-06-16

## 1. Currency Input Component Extraction

**Decision**: Move `CurrencyAmountField` from `src/features/goal-create/components/goal-form-modal.tsx` to `src/components/ui/app-currency-input/` as a standalone reusable component.

**Rationale**:
- The `CurrencyAmountField` is a self-contained component with its own formatting logic (`digitsToAmount`, `digitsToDisplay`, `Intl.NumberFormat`).
- The user explicitly requested it be moved to a global location and a `label` prop be added.
- This follows the existing `AppInput` pattern of compound components in `src/components/ui/`.
- The goal-create modal and the deposit form on the goal details page both need currency input functionality.

**Alternatives considered**:
- Copy-paste the component: Duplicates code, violates DRY principle.
- Extend `AppInput` directly: `AppInput` is generic; the currency-specific formatting (decimal pad style, auto-formatting while typing) warrants a specialized component.

**API Design**:
```ts
interface AppCurrencyInputProps {
  value: number;
  onChange: (value: number) => void;
  onBlur: () => void;
  isInvalid: boolean;
  editable?: boolean;
  errorMessage?: string;
  label: string; // NEW prop
}
```

## 2. Route & Navigation

**Decision**: The route `src/app/(logged)/goals/[id].tsx` already exists as a placeholder. The implementation will replace the placeholder content. Back button uses `router.push('/')` to navigate to the overview (dashboard).

**Rationale**:
- The route file already exists per the user confirmation.
- `router.push('/')` navigates to the root of the `(logged)` group, which is the dashboard screen.
- The `(logged)` layout already provides the unified layout wrapper (Topbar, SafeAreaView, max-width container).

**Alternatives considered**:
- `router.back()`: Could go to an unexpected previous page. `router.push('/')` is explicit and deterministic.
- New route: The route already exists; modifying is simpler.

## 3. Progress Indicator

**Decision**: Use the existing `AppProgressBar` component from `src/components/ui/app-progress-bar/`.

**Rationale**:
- Already implemented with size variants (xs/sm/md/lg) and color variants (default/success/warning).
- Supports label display (percentage text).
- Already has accessibility attributes (role="progressbar", aria-valuenow/min/max).
- For the "In Progress" variant, use `size="lg" variant="default"`. For "Completed", use `size="lg" variant="success"`.

**Alternatives considered**:
- Inline progress bar in the feature component: Redundant; the shared component exists.
- Circular progress indicator: Design reference shows linear progress bar (from design nodes g4FKq and YGpUS).

## 4. Mock Data Strategy

**Decision**: Extend the existing mock data pattern in `src/features/overview/mocks/` to create deposit mock data in the new `goal-details` feature.

**Rationale**:
- Existing mocks use plain TypeScript objects matching domain types.
- Deposit data needs: amount, date, description (optional).
- No persistence required per spec; mock data is used directly in the screen component.
- This follows the same pattern as `mockAllGoals`, `mockPopulatedDashboard`, etc.

**Data shape**:
```ts
interface Deposit {
  id: string;
  amount: number;
  date: string; // ISO date
  description?: string;
}
```

## 5. Feature Directory Structure

**Decision**: Create `src/features/goal-details/` following the existing feature-folder convention.

**Rationale**:
- Existing features (`goal-create`, `overview`, `login`, `sign-up`) follow `src/features/<name>/` with `components/`, `schemas/`, `types/`, `screens/` as needed.
- The goal-details feature needs: screen component, deposit form component, types, mocks, utilities.

**Directory layout**:
```
src/features/goal-details/
├── index.ts                        # Public API barrel
├── types/
│   └── deposit.ts                  # Deposit type + goal with deposits
├── schemas/
│   └── deposit.schema.ts           # Zod schema for deposit form
├── mocks/
│   └── deposit-data.ts             # Mock deposits
├── utils/
│   └── format-date.ts              # Date formatting
└── components/
    ├── deposit-form.tsx            # Add deposit form
    ├── deposit-history.tsx         # Deposit list
    ├── goal-info.tsx               # Goal metadata display
    ├── goal-progress-section.tsx   # Progress bar + stats
    └── goal-actions.tsx            # Edit/Delete buttons
```

## 6. Responsive Layout Strategy

**Decision**: Follow the existing 3-breakpoint pattern with NativeWind responsive prefixes (`sm:`, `md:`, `lg:`).

**Rationale**:
- The project already defines breakpoints: sm (<768px mobile), md (768-1023px tablet), lg (>=1024px desktop).
- The design references in `app.pen` provide three variants: Desktop, Tablet, Mobile.
- Desktop (g4FKq/YGpUS): Two-column layout (goal info + deposit history side by side).
- Tablet (Zfj6l/y8FEu): Two-column layout with reduced padding.
- Mobile (hTjLT/I7yft7): Single-column stacked layout.

**Layout approach**:
- Use `flex-col lg:flex-row` for the goal section container.
- Goal cards stack vertically on mobile, side-by-side on tablet/desktop.

## 7. Form Validation Strategy

**Decision**: Use `react-hook-form` + `zod` (same pattern as `goal-form-modal.tsx`).

**Rationale**:
- Already established in the project (`goal-create/schemas/create-goal.schema.ts`).
- Deposit form validation: amount > 0, required; description optional.
- `@hookform/resolvers/zod` is already a dependency.

**Alternatives considered**:
- Manual validation with state: More code, less maintainable.
- Formik: Not in the dependency tree; react-hook-form is already used.

## 8. Date Formatting

**Decision**: Use `date-fns` for date formatting (already in dependencies).

**Rationale**:
- `date-fns` 4.1 is already in `package.json`.
- Format required: "Nov 15, 2025" style (as shown in designs).
- Creation date and target date need human-readable formatting.

## 9. Currency Formatting Standardization

**Decision**: Create an `en-US` currency formatter utility in `src/features/goal-details/utils/format-currency.ts` or reuse the existing one. However, per the Assumptions in the spec, currency formatting follows US locale (`$1,000.00`).

**Rationale**:
- The existing `formatCurrency` in `features/overview/utils/format-currency.ts` uses `pt-BR` (BRL).
- The designs show `$` prefix and mock data in the goal-form-modal uses `en-US`.
- The `CurrencyAmountField` already uses `en-US` for internal formatting.
- For this phase, use `en-US` formatting to match the designs and mock data. Future backend integration may revisit locale handling.

**Decision**: Use `en-US` `Intl.NumberFormat` for currency display, stored in a shared utility at `src/utils/format-currency.ts` to avoid duplication between features.
