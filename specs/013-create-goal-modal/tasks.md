# Tasks: Create Goal Modal

**Input**: Design documents from `specs/013-create-goal-modal/`  
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/goal-form-modal.md

**Tests**: Not requested in specification — omitted.

**Organization**: Tasks grouped by user story for independent implementation and testing.

## Format: `- [ ] [ID] [P?] [Story] Description with file path`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create feature directory structure and foundational files

- [x] T001 Create feature directory structure: `src/features/goal-create/`, `src/features/goal-create/components/`, `src/features/goal-create/schemas/`
- [x] T002 [P] Create Zod schema with validation rules in `src/features/goal-create/schemas/create-goal.schema.ts`
- [x] T003 [P] Create barrel export (`GoalFormModal` + `CreateGoalFormData` type) in `src/features/goal-create/index.ts`

---

## Phase 2: User Story 1 - Open and submit new goal creation form (Priority: P1) 🎯 MVP

**Goal**: User can open a modal via "New Goal" or "Create your first goal", fill name and target amount fields, and submit. The modal closes on valid submit.

**Independent Test**: Click "New Goal" in the topbar → modal opens with empty fields and disabled submit → fill name and amount → "Create goal" enables → click → modal closes.

### Implementation for User Story 1

- [x] T004 [US1] Implement `GoalFormModal` component with `AppModal` (Backdrop, Content, Header, Body, Footer) in `src/features/goal-create/components/goal-form-modal.tsx`
- [x] T005 [US1] Add form fields (Goal name as text `AppInput`, Target amount as numeric `AppInput`, Deadline as `AppInput` with date picker trigger) in `src/features/goal-create/components/goal-form-modal.tsx`
- [x] T006 [US1] Wire `react-hook-form` with `zodResolver` (Controller + useForm) in `src/features/goal-create/components/goal-form-modal.tsx`
- [x] T007 [US1] Add "Create goal" `AppButton` (primary variant) with submit handler in `src/features/goal-create/components/goal-form-modal.tsx`
- [x] T008 [US1] Add `onNewGoal` prop to `Topbar` and wire "New Goal" button `onPress` in `src/components/ui/topbar/topbar.tsx`
- [x] T009 [US1] Add `onCreateGoal` prop to `EmptyState` and wire "Create your first goal" button `onPress` in `src/features/overview/components/empty-state.tsx`
- [x] T010 [US1] Wire modal state (`isOpen`) and triggers (`onNewGoal`, `onCreateGoal`) in `src/features/overview/screens/dashboard-screen.tsx`

**Checkpoint**: Modal opens from both entry points, form fields render, submit closes modal.

---

## Phase 3: User Story 2 - Form validation feedback (Priority: P2)

**Goal**: User sees inline error messages below invalid fields. The "Create goal" button stays disabled until all errors are resolved.

**Independent Test**: Open modal → leave "Goal name" empty and blur → error appears below field → enter negative amount → error appears → button stays disabled → fix both → button enables.

### Implementation for User Story 2

- [x] T011 [US2] Set `mode: 'onBlur'` and wire `isInvalid` to each `AppInput.Group` based on `errors` in `src/features/goal-create/components/goal-form-modal.tsx`
- [x] T012 [US2] Add `AppInput.HelperText` with `variant="error"` for each field's error message in `src/features/goal-create/components/goal-form-modal.tsx`
- [x] T013 [US2] Disable "Create goal" `AppButton` via `isDisabled` when `formState.isValid` is false in `src/features/goal-create/components/goal-form-modal.tsx`
- [x] T014 [US2] Add `accessibilityLiveRegion="assertive"` wrapper on error messages in `src/features/goal-create/components/goal-form-modal.tsx`

**Checkpoint**: All validation errors display inline, button disabled while errors present, enables only when valid.

---

## Phase 4: User Story 3 - Cancel and close modal (Priority: P3)

**Goal**: User can dismiss the modal via "Cancel" button, close (X) icon, or overlay click, discarding all entered data. Reopening the modal shows a fresh empty form.

**Independent Test**: Open modal → fill some data → click "Cancel" → modal closes → reopen → form is empty. Repeat with X icon.

### Implementation for User Story 3

- [x] T015 [US3] Add "Cancel" `AppButton` (secondary variant) with `onPress={onClose}` in modal footer in `src/features/goal-create/components/goal-form-modal.tsx`
- [x] T016 [US3] Add `AppModal.CloseButton` (X icon) in top-right corner in `src/features/goal-create/components/goal-form-modal.tsx`
- [x] T017 [US3] Enable `closeOnOverlayClick` on `AppModal` to dismiss via backdrop tap in `src/features/goal-create/components/goal-form-modal.tsx`
- [x] T018 [US3] Call `reset()` from `useForm` on `isOpen` transition to `true` via `useEffect` in `src/features/goal-create/components/goal-form-modal.tsx`

**Checkpoint**: Cancel, X, and overlay click all close modal. Form always resets to empty on reopen.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Responsive design, accessibility, and final quality checks

- [x] T019 Apply responsive modal width (desktop: 680px, tablet: 680px, mobile: 343px) using NativeWind breakpoint classes in `src/features/goal-create/components/goal-form-modal.tsx`
- [x] T020 Apply responsive padding (desktop/tablet: 32px, mobile: 20px horizontal / 16px vertical) in `src/features/goal-create/components/goal-form-modal.tsx`
- [x] T021 Verify all `AppInput.Label` elements are present for each field in `src/features/goal-create/components/goal-form-modal.tsx`
- [x] T022 Verify keyboard-dismissable behavior and focus trapping via AppModal props in `src/features/goal-create/components/goal-form-modal.tsx`
- [x] T023 Run `npx tsc --noEmit` to verify no TypeScript errors
- [x] T024 Run `npx eslint src/features/goal-create/ --ext .ts,.tsx` to verify lint compliance

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **User Story 1 (Phase 2)**: Depends on Phase 1 (needs schema and directory)
- **User Story 2 (Phase 3)**: Depends on Phase 2 (needs form wired up to add validation display)
- **User Story 3 (Phase 4)**: Depends on Phase 2 (needs modal open to add close behavior)
- **Polish (Phase 5)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Phase 1 — no dependencies on other stories
- **User Story 2 (P2)**: Depends on US1 (layers validation on top of existing form fields)
- **User Story 3 (P3)**: Depends on US1 (adds cancel/close/reset to existing modal)

### Within Each Phase

Phase 1: T002 and T003 are [P] (different files) — can run in parallel  
Phase 2: T004-T007 all touch the same file (`goal-form-modal.tsx`) — sequential. T008, T009, T010 modify different files — can be done in parallel after T007  
Phase 3: T011-T014 same file — sequential  
Phase 4: T015-T018 same file — sequential  
Phase 5: T019-T022 [P] if implemented in parallel across responsive/a11y sub-sections; T023-T024 sequential

### Parallel Opportunities

- T002 and T003 can run together (different files)
- T008, T009, T010 can run in parallel once T007 is complete (different files: topbar, empty-state, dashboard-screen)
- T019 and T020 can be batched (both responsive, same file)
- T023 and T024 can run in parallel (different tools)

---

## Parallel Example: Phase 1 + US1 Wiring

```bash
# Phase 1: Launch schema and barrel export in parallel:
Task: "T002 Create Zod schema in src/features/goal-create/schemas/create-goal.schema.ts"
Task: "T003 Create barrel export in src/features/goal-create/index.ts"

# After T007 (modal component complete), wire integration points in parallel:
Task: "T008 Add onNewGoal prop to Topbar in src/components/ui/topbar/topbar.tsx"
Task: "T009 Add onCreateGoal prop to EmptyState in src/features/overview/components/empty-state.tsx"
Task: "T010 Wire modal state in src/features/overview/screens/dashboard-screen.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T003)
2. Complete Phase 2: User Story 1 (T004-T010)
3. **STOP and VALIDATE**: Open modal from both entry points, fill form, submit — modal closes
4. Deploy/demo if ready

### Incremental Delivery

1. Setup + US1 → Form in modal, opens from 2 places (MVP!)
2. Add US2 → Users see validation errors, can't submit invalid data
3. Add US3 → Users can cancel/close without creating, form resets on reopen
4. Add Polish → Responsive on all breakpoints, accessible, lint-clean

### Single Developer Strategy

Since most tasks touch `goal-form-modal.tsx`, the feature is best built sequentially within each phase:
1. T001 → T002+T003 (parallel) → T004→T005→T006→T007 → T008+T009+T010 (parallel) 
2. T011→T012→T013→T014
3. T015→T016→T017→T018
4. T019→T020→T021→T022 → T023+T024 (parallel)

---

## Notes

- [P] tasks = different files, no dependencies on incomplete same-file tasks
- [Story] label maps task to specific user story for traceability
- Each user story is an incremental layer on the same `GoalFormModal` component
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- No tests included (not requested in specification)
