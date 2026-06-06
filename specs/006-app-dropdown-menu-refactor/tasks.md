# Tasks: AppDropdownMenu Refactor

**Input**: Design documents from `/specs/006-app-dropdown-menu-refactor/`
**Prerequisites**: plan.md (required), spec.md (required for user stories)
**Tests**: Included - tests must be updated alongside implementation

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup & Analysis

**Purpose**: Analyze current implementation and plan refactoring approach

- [X] T001 [P] Read current implementation in src/components/ui/app-dropdown-menu/app-dropdown-menu.tsx
- [X] T002 [P] Read AppInput implementation in src/components/ui/app-input/app-input.tsx as reference pattern
- [X] T003 [P] Read with-states-interop.tsx utility in src/lib/gluestack/with-states-interop.tsx
- [X] T004 [P] Read existing tests in src/components/ui/app-dropdown-menu/app-dropdown-menu.test.tsx

**Checkpoint**: Understanding of current vs desired state complete

---

## Phase 2: User Story 1 - Dropdown menu displays correctly (Priority: P1)

**Goal**: Refactor component to use tva + withStyleContext + withStates pattern, render correct visual styling

**Independent Test**: Render dropdown with items, verify trigger renders styled, menu content appears with correct visual styling on open

### Tests for User Story 1

- [X] T005 [P] [US1] Update tests in src/components/ui/app-dropdown-menu/app-dropdown-menu.test.tsx for new API structure
- [X] T006 [P] [US1] Verify trigger renders with proper styling after refactor
- [X] T007 [P] [US1] Verify menu content appears with correct rounded corners, background, shadow, border

### Implementation for User Story 1

- [X] T008 [US1] Add imports for withStyleContext, withStates, tva, useStyleContext from @gluestack-ui/utils in src/components/ui/app-dropdown-menu/app-dropdown-menu.tsx
- [X] T009 [US1] Create MENU_SCOPE = 'APP_DROPDOWN_MENU' style context constant
- [X] T010 [US1] Create StyledRoot using withStates(withStyleContext(View, MENU_SCOPE)) wrapper
- [X] T011 [US1] Define appDropdownContentVariants using tva pattern for Content styling
- [X] T012 [US1] Create StyledContent with withStates for content wrapper
- [X] T013 [US1] Refactor AppDropdownMenuRoot to use tva variants instead of raw className
- [X] T014 [US1] Remove AppDropdownMenuContext (no longer needed)
- [X] T015 [US1] Apply cssInterop for StyledContent with className mapping
- [X] T016 [US1] Update Content component to use StyledContent with tva classes

**Checkpoint**: US1 complete - dropdown renders with correct visual styling using new pattern

---

## Phase 3: User Story 2 - Menu items are interactive (Priority: P1)

**Goal**: Ensure menu items have proper visual feedback for hover/focus/press states

**Independent Test**: Render menu with items, verify hover state feedback, press interactions, and onValueChange callback

### Tests for User Story 2

- [X] T017 [P] [US2] Test item hover state renders data-[highlighted=true]
- [X] T018 [P] [US2] Test item press triggers onValueChange callback
- [X] T019 [P] [US2] Test disabled items show disabled visual state

### Implementation for User Story 2

- [X] T020 [US2] Define appDropdownItemVariants using tva for item states
- [X] T021 [US2] Apply item variant styling to UIMenu.Item usage
- [X] T022 [US2] Ensure withStates resolves data-[highlighted=true]: classes on native
- [X] T023 [US2] Verify keyboard navigation works (Arrow keys, Enter, Escape) via gluestack creator

**Checkpoint**: US2 complete - items respond to interaction with proper visual feedback

---

## Phase 4: User Story 3 - Compound components work correctly (Priority: P2)

**Goal**: Ensure compound component pattern (Dropdown, Trigger, Content) works consistently with AppButton/AppModal API

**Independent Test**: Test each subcomponent renders and functions independently

### Tests for User Story 3

- [X] T024 [P] [US3] Test AppDropdownMenu.Trigger render prop pattern works
- [X] T025 [P] [US3] Test AppDropdownMenu.Content renders menu container
- [X] T026 [P] [US3] Test compound export Object.assign pattern works correctly

### Implementation for User Story 3

- [X] T027 [US3] Verify AppDropdownMenu.Trigger render prop passes triggerProps correctly
- [X] T028 [US3] Update AppDropdownMenu.Content to accept className and additional props
- [X] T029 [US3] Ensure displayName set correctly on all subcomponents
- [X] T030 [US3] Verify compound export via Object.assign matches AppButton pattern

**Checkpoint**: US3 complete - compound components work consistently

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Validation and final verification

- [X] T031 [P] Run TypeScript check: npx tsc --noEmit
- [X] T032 [P] Run lint: npm run lint
- [X] T033 [P] Run tests: npm test -- src/components/ui/app-dropdown-menu
- [X] T034 [P] Verify data-[open=true]: classes resolve on native via withStates
- [X] T035 [P] Verify keyboard navigation and accessibility still works
- [X] T036 Verify no React Context usage introduced (per plan requirements)
- [X] T037 Update index.ts export if needed in src/components/ui/app-dropdown-menu/index.ts

**Checkpoint**: Polish complete - component passes all validations

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies - can start immediately
- **Phase 2 (US1)**: Depends on Phase 1 - can start after understanding current state
- **Phase 3 (US2)**: Can run in parallel with Phase 2 (different aspects of component)
- **Phase 4 (US3)**: Depends on Phase 2 completion
- **Phase 5 (Polish)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Phase 1 - core refactor
- **User Story 2 (P1)**: Can start in parallel with US1 - focuses on item states
- **User Story 3 (P2)**: Depends on US1 completion - API consistency

### Within Each User Story

- Read/reference tasks (T001-T004) should be done first
- Implementation builds on reference patterns
- Tests should run alongside implementation tasks
- Story complete before moving to polish

### Parallel Opportunities

- T001, T002, T003, T004 can all run in parallel
- T005, T006, T007 (US1 tests) can run in parallel
- T008, T009, T010, T011 can run in parallel (initial setup)
- T017, T018, T019 (US2 tests) can run in parallel
- T024, T025, T026 (US3 tests) can run in parallel
- T031, T032, T033, T034, T035 (Polish validation) can run in parallel

---

## Parallel Example: Phase 2 Setup

```bash
# Read reference implementations in parallel:
Task: T001 Read current implementation
Task: T002 Read AppInput as reference
Task: T003 Read with-states-interop utility
Task: T004 Read existing tests
```

---

## Implementation Strategy

### MVP First (User Story 1)

1. Complete Phase 1: Setup/Analysis
2. Complete Phase 2: US1 (core refactor)
3. **STOP and VALIDATE**: Test dropdown renders correctly
4. Deploy if ready

### Incremental Delivery

1. Phase 1 complete → Understanding ready
2. Phase 2 (US1) → Core styling refactored → Deploy/Demo
3. Phase 3 (US2) → Item interactions working → Deploy/Demo
4. Phase 4 (US3) → API consistency verified → Deploy/Demo
5. Phase 5 → Final validation → Complete

### Parallel Team Strategy

With multiple developers:

1. Developer A: Phase 1 reading tasks (T001-T004)
2. Once Phase 1 complete:
   - Developer A: US1 implementation (T008-T016)
   - Developer B: US2 tests and implementation (T017-TT023)
3. Once US1+US2 complete:
   - Developer A: US3 (T024-T030)
4. Final polish together (T031-T037)

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- This is a refactor - existing tests must be updated, not rewritten from scratch
- Focus on matching AppButton/AppInput pattern for consistency
- Verify withStates resolution works on native before considering complete