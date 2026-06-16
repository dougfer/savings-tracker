# Implementation Plan: Create Goal Modal

**Branch**: `013-create-goal-modal` | **Date**: 2026-06-15 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/013-create-goal-modal/spec.md`

**Note**: This file is the output of the `/speckit.plan` command. See Phase 0-1 artifacts for details.

## Summary

Implement a reusable `GoalFormModal` component that renders a form inside a modal for creating financial goals. The form uses `react-hook-form` + `zod` for local validation of three fields (name, target amount, optional deadline). The component communicates exclusively through props (`isOpen`, `onClose`) — no API calls, no routing dependencies, no global state. On valid submission, the modal closes and goal creation is handled internally (full logic to be added in a future iteration). It is triggered from two entry points: the "New Goal" button in the Topbar and the "Create your first goal" button in the EmptyState.

## Technical Context

**Language/Version**: TypeScript 5.9 (strict mode)  
**Primary Dependencies**: React 19.1, React Native 0.81 (New Architecture), Expo SDK 54, Gluestack UI v3, react-hook-form 7.54, zod 3.24, date-fns 4.1  
**Storage**: N/A (no persistence in this feature)  
**Testing**: Jest 29 + @testing-library/react-native 13.2  
**Target Platform**: iOS 15+ / Android (Expo managed workflow)  
**Project Type**: Mobile-first React Native application (Expo Router)  
**Performance Goals**: Modal open/close < 200ms, form validation on blur, 60fps interactions  
**Constraints**: Must work offline, no API calls, no new state management libraries  
**Scale/Scope**: Single modal component, 3 form fields, 2 integration points

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Verificar conformidade com `.specify/memory/constitution.md` (Savings Tracker Platform):

| Principle | Status | Evidence |
|-----------|--------|----------|
| **I. Produto** | ✅ PASS | The modal enables simple goal creation — directly answers "Isso ajuda o usuário a economizar melhor?" by removing friction from the first step of savings tracking |
| **II. Clareza e Confiança** | ✅ PASS | Explicit validation messages, clear field labels, disabled submit when invalid — no ambiguity in financial data input |
| **III. UX** | ✅ PASS | Form has only 3 fields (2 required, 1 optional); modal is immediately dismissible; `onBlur` validation gives timely feedback |
| **IV. UI** | ✅ PASS | Uses existing design system components (`AppInput`, `AppButton`, `AppModal`) with established tokens; follows the exact design from `app.pen` nodes `x4ncw`/`ANlZ4`/`eSMps` |
| **V. Conteúdo** | ✅ PASS | Labels are action-oriented ("Goal name", "Target amount"); placeholder text is helpful ("e.g. MacBook Pro M4"); error messages are explicit |
| **VI. Mobile-First** | ✅ PASS | Responsive modal: 680px desktop, 680px tablet, 343px mobile with full-width fields; designed for one-hand use on mobile |
| **VII. Acessibilidade** | ✅ PASS | All fields have `AppInput.Label`; error messages use `accessibilityLiveRegion="assertive"`; keyboard-dismissable modal; focus management via Gluestack modal |
| **VIII. Performance** | ✅ PASS | No heavy animations; Gluestack modal uses native driver; form validation is synchronous (zod); no network requests |
| **IX. Técnico** | ✅ PASS | Feature-first architecture (`src/features/goal-create/`); compound component pattern for UI; clean separation: Zod schema, hook-form wiring, UI rendering |

**Constitution Check Result**: ALL GATES PASS — no violations to justify.

## Project Structure

### Documentation (this feature)

```text
specs/013-create-goal-modal/
├── plan.md              # This file
├── research.md          # Phase 0: Date picker choice, form patterns
├── data-model.md        # Phase 1: Goal entity, Zod schema, state machine
├── quickstart.md        # Phase 1: Integration example, commands
├── contracts/           # Phase 1: Component interface contract
│   └── goal-form-modal.md
└── tasks.md             # Phase 2: `/speckit.tasks` output (NOT created here)
```

### Source Code (repository root)

```text
src/features/goal-create/           # NEW feature directory
├── components/
│   └── goal-form-modal.tsx         # Main modal component (compound pattern)
├── schemas/
│   └── create-goal.schema.ts       # Zod schema + CreateGoalFormData type
└── index.ts                        # Barrel export (GoalFormModal + types)

src/features/overview/              # EXISTING (modified)
├── screens/
│   └── dashboard-screen.tsx        # Add modal state + wiring
└── components/
    └── empty-state.tsx             # Add onPress → onCreateGoal prop

src/components/ui/topbar/           # EXISTING (modified)
└── topbar.tsx                      # Add onPress → onNewGoal prop
```

**Structure Decision**: Feature-first layout as mandated by `.cursor/rules/feature-first-architecture.mdc`. The `goal-create` feature owns all form logic (schema, validation, submission). The `overview` feature and `topbar` component consume it via props — no feature-to-feature imports.

## Complexity Tracking

> No Constitution Check violations — this section is intentionally empty.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| — | — | — |
