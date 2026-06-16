# Research: Create Goal Modal

**Feature**: 013-create-goal-modal  
**Date**: 2026-06-15

## 1. Date Picker Implementation

**Decision**: Use `AppInput` with a pressable overlay that triggers `DateTimePicker` from `@react-native-community/datetimepicker`.

**Rationale**: 
- The design shows the deadline field styled identically to other `AppInput` fields
- `@react-native-community/datetimepicker` is the standard React Native date picker, maintained by the community, and compatible with Expo
- It provides native date picker UI on both iOS (modal/spinner) and Android (dialog)
- `date-fns` is already installed for date formatting and comparison

**Alternatives considered**:
- Custom date picker modal: Unnecessary complexity for a single date field
- Text-only date input: Poor UX on mobile, contradicts the "Date Picker" requirement in the plan
- `expo-date-time-picker`: Deprecated in favor of the community package

**Installation required** (pending user approval):
```
npx expo install @react-native-community/datetimepicker
```

## 2. Form Management Patterns

**Decision**: Use the same `Controller` + `zodResolver` pattern established in `sign-up-form.tsx`.

**Rationale**:
- `react-hook-form` v7.54.2 and `@hookform/resolvers` v3.9.1 are already installed
- `zod` v3.24.1 is already installed
- The `sign-up-form.tsx` already demonstrates the `useForm` + `Controller` + `zodResolver` pattern
- Validation mode `onBlur` is consistent with existing forms
- No need to introduce `FormProvider` or other patterns

**Existing pattern reference**: `src/features/sign-up/components/sign-up-form.tsx`

## 3. Component Architecture

**Decision**: Create the modal as a standalone feature under `src/features/goal-create/` with a component `goal-form-modal.tsx`.

**Rationale**:
- Feature-first architecture: `src/features/goal-create/`
- The modal must be decoupled from any specific screen (FR-011)
- Communication via props: `isOpen`, `onClose`, `onSuccess`
- Compound component pattern from `src/components/ui` for UI primitives
- The feature exports a single reusable component, not a screen

**Alternatives considered**:
- Placing under `src/components/`: Would violate feature-first architecture since this is feature logic, not a generic UI component
- Placing under `src/features/overview/`: Would couple the modal to the overview feature, violating FR-011

## 4. Existing Component Integration Points

**Topbar** (`src/components/ui/topbar/topbar.tsx`):
- Currently has a "New goal" `AppButton` with `variant="primary"` but no `onPress` handler
- Must be modified to accept an `onNewGoal` prop (or use a shared state mechanism)

**EmptyState** (`src/features/overview/components/empty-state.tsx`):
- Currently has a "Create your first goal" `AppButton` with no `onPress` handler
- Must be modified to accept an `onCreateGoal` callback prop

**DashboardScreen** (`src/features/overview/screens/dashboard-screen.tsx`):
- Hosts both Topbar and EmptyState
- Must manage modal open/close state and pass callbacks

## 5. Goal Data Contract

**Decision**: Extend and reuse the existing `Goal` interface from `src/features/overview/types/goal.ts`.

**Rationale**:
- The type already defines: `id`, `name`, `currentAmount`, `targetAmount`, `dueDate`, `createdAt`
- `GoalCreateInput` will be a derived subset: `{ name, amount, deadline? }`  
- Mapping: `name` → `Goal.name`, `amount` → `Goal.targetAmount`, `deadline` → `Goal.dueDate`
- `Goal.currentAmount` defaults to 0, `Goal.id` generated locally, `Goal.createdAt` set to current timestamp
