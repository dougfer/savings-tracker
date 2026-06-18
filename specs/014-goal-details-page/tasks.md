# Tasks: Goal Details Page

**Input**: Design documents from `/specs/014-goal-details-page/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, quickstart.md

**Tests**: Not requested in specification. Test tasks are omitted.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Extract reusable currency input component and create shared utilities before feature implementation

- [x] T001 Extract CurrencyAmountField from `src/features/goal-create/components/goal-form-modal.tsx` to `src/components/ui/app-currency-input/app-currency-input.tsx` with added `label: string` prop
- [x] T002 [P] Create barrel export `src/components/ui/app-currency-input/index.ts` re-exporting AppCurrencyInput
- [x] T003 Update `src/features/goal-create/components/goal-form-modal.tsx` to import AppCurrencyInput from `@/components/ui/app-currency-input` instead of using inline CurrencyAmountField; pass `label="Target amount"`
- [x] T004 [P] Add AppCurrencyInput to barrel export in `src/components/ui/index.ts`
- [x] T005 [P] Create shared currency formatter `src/utils/format-currency.ts` using `Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })` exporting `formatCurrency(value: number): string`

**Checkpoint**: AppCurrencyInput component extracted and usable; goal-form-modal still works; shared currency formatter available

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Feature directory structure, types, schemas, mocks, and utility functions that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T006 Create feature directory structure: `src/features/goal-details/`, `src/features/goal-details/types/`, `src/features/goal-details/schemas/`, `src/features/goal-details/mocks/`, `src/features/goal-details/utils/`, `src/features/goal-details/components/`, `src/features/goal-details/screens/`
- [x] T007 [P] Create Deposit and GoalWithDeposits types in `src/features/goal-details/types/deposit.ts`
- [x] T008 [P] Create deposit form Zod schema (amount > 0 required, description optional) in `src/features/goal-details/schemas/deposit.schema.ts`
- [x] T009 [P] Create mock deposit data and combined mock goals with deposits in `src/features/goal-details/mocks/deposit-data.ts`:
  - `mockDeposits`: 5-8 deposits with varied amounts, dates, some with descriptions
  - `mockGoalInProgressWithDeposits`: in-progress goal + deposits (percentage < 100%)
  - `mockGoalCompletedWithDeposits`: completed goal + deposits (percentage = 100%)
  - `mockGoalEmptyDeposits`: goal with zero deposits
- [x] T010 [P] Create date formatting utility `src/features/goal-details/utils/format-date.ts` using `date-fns` format `MMM d, yyyy` pattern exporting `formatDisplayDate(isoString: string): string`
- [x] T011 Create barrel export `src/features/goal-details/index.ts` re-exporting all public types and components

**Checkpoint**: Foundation ready — all types, schemas, mocks, and utilities available; user story implementation can now begin

---

## Phase 3: User Story 1 - View goal details and progress (Priority: P1) 🎯 MVP

**Goal**: Display all goal metadata (name, dates, amounts, percentage, status) with a visual progress bar on the goal details screen

**Independent Test**: Navigate to the goal details page with mock data and verify goal name, creation date, target date, target amount, accumulated amount, percentage, status, and progress bar are all displayed correctly across all three progress states (0%, 50%, 100%)

### Implementation for User Story 1

- [x] T012 [P] [US1] Create GoalInfoHeader component displaying goal name (h1), due date, and creation date with bullet separator in `src/features/goal-details/components/goal-info-header.tsx`
- [x] T013 [P] [US1] Create GoalProgressSection component using AppProgressBar with variant based on status (default/success) and displaying percentage, accumulated amount, and target amount in `src/features/goal-details/components/goal-progress-section.tsx`
- [x] T014 [US1] Create GoalDetailsScreen orchestrating GoalInfoHeader + GoalProgressSection, computing derived fields (percentage, status) from goal data, and rendering responsive two-column layout for goal info cards in `src/features/goal-details/screens/goal-details-screen.tsx`
- [x] T015 [US1] Replace placeholder in `src/app/(logged)/goals/[id].tsx` to render GoalDetailsScreen with mock goal data; add back button using `router.push('/')` to navigate to overview

**Checkpoint**: User Story 1 should be fully functional — goal details and progress bar visible for any goal state

---

## Phase 4: User Story 2 - View deposit history (Priority: P2)

**Goal**: Display the list of all deposits for a goal, each showing amount, date, and optional description

**Independent Test**: View a goal with deposits and verify each entry shows amount formatted as currency, date, and description (when present), in reverse chronological order

### Implementation for User Story 2

- [x] T016 [P] [US2] Create DepositHistory component rendering a scrollable list of deposit entries (each showing formatted amount, date, and description when present) in `src/features/goal-details/components/deposit-history.tsx`
- [x] T017 [US2] Integrate DepositHistory into GoalDetailsScreen in `src/features/goal-details/screens/goal-details-screen.tsx`, passing deposits from GoalWithDeposits data

**Checkpoint**: User Stories 1 AND 2 should both work — goal details + scrollable deposit history visible

---

## Phase 5: User Story 3 - Register a new deposit (Priority: P3)

**Goal**: Display a deposit form (when goal is in progress) with validated amount input and optional description

**Independent Test**: Open an in-progress goal, enter a valid deposit amount, submit, and verify form accepts input; verify validation errors appear for empty/zero/negative/non-numeric amounts; verify form is hidden for completed goals

### Implementation for User Story 3

- [x] T018 [US3] Create DepositForm component using react-hook-form + zod, with AppCurrencyInput for amount and AppInput for description, including validation error display and submit button with loading state in `src/features/goal-details/components/deposit-form.tsx`
- [x] T019 [US3] Integrate DepositForm into GoalDetailsScreen in `src/features/goal-details/screens/goal-details-screen.tsx` with conditional rendering (visible only when goal status is "in-progress", hidden for "completed")

**Checkpoint**: User Stories 1, 2, AND 3 should all work — deposit form visible for in-progress goals, hidden for completed goals, with full validation

---

## Phase 6: User Story 4 - Access goal actions (Priority: P4)

**Goal**: Display Edit and Delete action buttons (visual-only, no logic)

**Independent Test**: View any goal (in progress or completed) and verify Edit and Delete buttons are visible but non-functional

### Implementation for User Story 4

- [x] T020 [P] [US4] Create GoalActions component with Edit and Delete AppButton instances (secondary/tertiary variants, no onPress handlers) in `src/features/goal-details/components/goal-actions.tsx`
- [x] T021 [US4] Integrate GoalActions into GoalDetailsScreen header area in `src/features/goal-details/screens/goal-details-screen.tsx`, visible regardless of goal status

**Checkpoint**: All user stories should now be independently functional — goal details, progress, deposit history, deposit form, and action buttons all present

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Responsive layout refinement, accessibility verification, and content review

- [x] T022 Verify responsive layout across all three breakpoints in `src/features/goal-details/screens/goal-details-screen.tsx`: mobile (<768px) single-column stack, tablet (768-1023px) two-column reduced padding, desktop (>=1024px) two-column with full padding
- [x] T023 [P] Review accessibility: ensure all interactive elements have accessibilityLabels, progress bar has aria attributes, inputs have proper labels in all feature components under `src/features/goal-details/components/`
- [x] T024 [P] Review UI content: validate error messages, placeholder text, and empty states align with constitution content principle in all feature components
- [x] T025 Run `npm run lint` to verify no linting errors across all new and modified files
- [x] T026 Run `npm run typecheck` to verify TypeScript compilation passes

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion (T006-T011 need AppCurrencyInput extracted) — BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational phase completion
- **User Story 2 (Phase 4)**: Depends on Foundational phase completion; integrates into screen built in US1
- **User Story 3 (Phase 5)**: Depends on Foundational phase completion; uses AppCurrencyInput from Setup; integrates into screen built in US1
- **User Story 4 (Phase 6)**: Depends on Foundational phase completion; integrates into screen built in US1
- **Polish (Phase 7)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) — No dependencies on other stories. This is the MVP.
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) — Must integrate into GoalDetailsScreen from US1, but independently testable with its own component.
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) — Requires AppCurrencyInput (Setup) and must integrate into GoalDetailsScreen from US1.
- **User Story 4 (P4)**: Can start after Foundational (Phase 2) — Must integrate into GoalDetailsScreen from US1.

### Within Each User Story

- Components can be created in parallel when marked [P] (different files)
- Screen integration task depends on component tasks within the same story completing first
- US2, US3, US4 all depend on the GoalDetailsScreen existing (from US1) for integration

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel (T002, T004, T005)
- All Foundational tasks marked [P] can run in parallel (T007, T008, T009, T010)
- Within US1: T012 and T013 can run in parallel (different component files)
- US2, US3, US4 component creation tasks (T016, T018, T020) could theoretically run in parallel after Foundational, but screen integration depends on US1's screen existing

---

## Parallel Example: User Story 1

```bash
# Launch GoalInfoHeader and GoalProgressSection in parallel (different files):
Task: "T012 [P] [US1] Create GoalInfoHeader component in src/features/goal-details/components/goal-info-header.tsx"
Task: "T013 [P] [US1] Create GoalProgressSection component in src/features/goal-details/components/goal-progress-section.tsx"

# After both complete, integrate into screen:
Task: "T014 [US1] Create GoalDetailsScreen in src/features/goal-details/screens/goal-details-screen.tsx"
```

## Parallel Example: Foundational Phase

```bash
# Launch all type/schema/mock/utility tasks in parallel:
Task: "T007 [P] Create Deposit types in src/features/goal-details/types/deposit.ts"
Task: "T008 [P] Create deposit schema in src/features/goal-details/schemas/deposit.schema.ts"
Task: "T009 [P] Create mock deposit data in src/features/goal-details/mocks/deposit-data.ts"
Task: "T010 [P] Create date formatting utility in src/features/goal-details/utils/format-date.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T005)
2. Complete Phase 2: Foundational (T006-T011)
3. Complete Phase 3: User Story 1 (T012-T015)
4. **STOP and VALIDATE**: Navigate to goal details page, verify all goal info and progress bar display correctly
5. Demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Goal details page functional (MVP!)
3. Add User Story 2 → Test independently → Deposit history visible
4. Add User Story 3 → Test independently → Deposit form with validation
5. Add User Story 4 → Test independently → Action buttons displayed
6. Polish phase → Responsive, a11y, content review → Feature complete

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (screen foundation)
   - After US1 screen exists:
     - Developer B: User Story 2 (deposit history component)
     - Developer C: User Story 3 (deposit form component)
     - Developer D: User Story 4 (actions component)
3. Each developer integrates their component into GoalDetailsScreen independently
4. Final Polish phase together

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- US2, US3, US4 components are independently testable but screen integration depends on US1's GoalDetailsScreen
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- The CurrencyAmountField extraction (T001-T003) is critical — validate goal-form-modal still works after the change
