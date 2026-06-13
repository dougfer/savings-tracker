# Tasks: Goal Card

**Input**: Design documents from `/specs/011-goal-card/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, quickstart.md

**Tests**: Included. The project uses Jest + @testing-library/react-native with co-located `*.test.tsx` files. Tests are written per user story to validate each state independently.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create directory structure for the new component

- [x] T001 Create directory structure `src/features/overview/components/goal-card/` per implementation plan

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core types and mock data that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T002 [P] Create Goal type, GoalState enum, and GoalSize enum in `src/features/overview/types/goal.ts` (see data-model.md for exact signatures)
- [x] T003 [P] Create mock goal data covering all three states (No Progress, In Progress, Complete) in `src/features/overview/mocks/goal-data.ts` (see data-model.md for field requirements)

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Visualizar progresso de um objetivo ativo (Priority: P1) 🎯 MVP

**Goal**: The GoalCard component renders an active financial goal displaying name, accumulated amount, target amount, completion percentage, and a visual progress bar. Three size variants (default, wide, tall) are supported. In Progress and No Progress states are visually distinct.

**Independent Test**: Render GoalCard with a mock goal having 30% progress. Verify name "MacBook Pro M4", percentage "30%", formatted amounts "$1,249 of $2,499", progress bar fills 30%, and orange color theme (#FF5722) is active. No COMPLETE tag is visible.

### Implementation for User Story 1

- [x] T004 [US1] Implement GoalCard component in `src/features/overview/components/goal-card/goal-card.tsx` — includes: root card structure (rounded-2xl, border, padding, gap), header row (product name in font-sans-semibold heading-md), progress section (percentage in font-display-semibold display-lg with progress bar using custom View-based implementation: rounded-full track bg-neutral-700, rounded-lg fill with height 12px, 1px white/30 stroke), footer row (formatted amounts "$X of $Y" via formatCurrency utility, separator dot, due date placeholder), decorative VectorPatternIcon at opacity 0.03 positioned absolutely, state derivation logic (progress = clamp(currentAmount/targetAmount, 0, 1)), In Progress styling (percentage text-orange-400, fill bg-orange-400), No Progress styling (percentage text-neutral-400, fill width 0px), all three size variants (default: 240px height, tall: 504px height, wide: 240px height with gradient background using react-native-svg LinearGradient orange-400→orange-700 and border-white/30, progress bar track bg-orange-800, fill and text white)
- [x] T005 [P] [US1] Create barrel export in `src/features/overview/components/goal-card/index.ts` re-exporting GoalCard component
- [x] T006 [US1] Add accessibility: card `accessibilityRole="summary"` with computed `accessibilityLabel` including name, percentage, and state; progress bar `accessibilityRole="progressbar"` with `aria-valuenow`, `aria-valuemin={0}`, `aria-valuemax={100}`

**Checkpoint**: At this point, User Story 1 should be fully functional — GoalCard renders active goals with correct progress visualization, both In Progress and No Progress states are distinguishable, all three sizes work

---

## Phase 4: User Story 2 - Identificar objetivo concluído (Priority: P2)

**Goal**: Goals that reached 100% completion are visually differentiated with green color theme and a "COMPLETE" badge tag. Interactive elements suggesting pending actions are visually suppressed.

**Independent Test**: Render GoalCard with a mock complete goal (currentAmount = targetAmount). Verify green color theme (#4ADE80) on percentage and progress bar, COMPLETE tag is visible with green-900 background and success border, card styling differs from In Progress state. Verify no elements suggesting pending deposit actions are present.

### Implementation for User Story 2

- [x] T007 [US2] Add Complete state styling to GoalCard in `src/features/overview/components/goal-card/goal-card.tsx`: percentage color success (#4ADE80), progress bar fill bg-success with full width (100%), progress bar track remains bg-neutral-700, COMPLETE tag component (bg-green-900, border-success, rounded-full, padding px-2.5 py-1, font-sans-semibold caption text-success, positioned inline next to product name, visible only when state === 'complete')
- [x] T008 [US2] Update accessibility label to announce "Complete" status for screen readers when state is complete in `src/features/overview/components/goal-card/goal-card.tsx`

**Checkpoint**: At this point, User Stories 1 AND 2 should both work — completed goals are unmistakably distinguished from active goals with green theme and COMPLETE badge

---

## Phase 5: User Story 3 - Card com data prevista de conclusão (Priority: P3)

**Goal**: The GoalCard displays the target completion date when available, formatted in a human-readable style. When no due date is set, the date information is absent without breaking layout.

**Independent Test**: Render GoalCard with a mock goal having dueDate "2026-12-31". Verify date appears in footer as "Due Dec 31, 2026" or similar readable format. Render GoalCard with dueDate null — verify no date text appears and footer shows only "$X of $Y" without broken spacing.

### Implementation for User Story 3

- [x] T009 [US3] Implement due date formatting and display in GoalCard footer in `src/features/overview/components/goal-card/goal-card.tsx`: use date-fns format to render ISO date string as "Due [Mon] [DD], [YYYY]" (e.g., "Due Jun 1, 2026"), apply opacity-70 to due date text per design, position after dot separator in footer row
- [x] T010 [US3] Handle null/undefined dueDate: conditionally render footer row elements — when dueDate is null, omit dot separator and date text, showing only "$X of $Y" in `src/features/overview/components/goal-card/goal-card.tsx`

**Checkpoint**: All user stories should now be independently functional — GoalCard handles all states (No Progress, In Progress, Complete), all sizes (default, wide, tall), and optional due date

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Validation, accessibility, responsiveness, and testing across all user stories

- [x] T011 [P] Mobile-first responsive validation: verify GoalCard renders correctly at breakpoints (mobile 320-767px, tablet 768-1023px, desktop 1024px+), card width fills container, truncation of long goal names works via numberOfLines=1 on product name text, touch targets meet 44px minimum for any interactive elements
- [x] T012 [P] Accessibility review: verify screen reader announces goal name + percentage + state correctly for all 3 states, keyboard navigation works (if interactive card variants), color contrast meets WCAG AA (text-white on neutral-800 = 12.6:1 ✅, orange-400/white on gradient = verify, success/green-900 = verify), all hover states have focus equivalents per constitution VII
- [x] T013 [P] UI content review: verify all text labels use functional copy (no generic placeholders), COMPLETE tag uses "COMPLETE" (all caps per design), empty name falls back to "Untitled goal", due date format is consistent, percentage never displays decimals per design (integer %)
- [x] T014 Write unit tests for GoalCard in `src/features/overview/components/goal-card/goal-card.test.tsx` covering: renders goal name and amounts correctly, In Progress state shows orange theme, No Progress state shows gray percentage and empty bar, Complete state shows green theme and COMPLETE tag, default size renders at 240px height, tall size renders at 504px height, wide size renders gradient background, due date displays formatted when present, due date is absent when null, long names are truncated, progress clamps at 100% when currentAmount > targetAmount, accessibility labels are set correctly for each state
- [x] T015 Run quickstart.md validation checklist to confirm all steps completed

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational (Phase 2) — No dependencies on other stories
- **User Story 2 (Phase 4)**: Depends on Foundational (Phase 2) — Modifies same file as US1, best completed after US1
- **User Story 3 (Phase 5)**: Depends on Foundational (Phase 2) — Modifies same file as US1, best completed after US2
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories. Builds the full component structure.
- **User Story 2 (P2)**: Builds on US1's component — adds Complete state styling branch to existing state derivation. Should be completed after US1 since it modifies goal-card.tsx.
- **User Story 3 (P3)**: Builds on US1's component — adds due date branch to existing footer. Should be completed after US2 since it modifies goal-card.tsx.

### Within Each User Story

- T004 (component) runs first — it builds the core component with all structural markup
- T005 (barrel export) runs in parallel with T004 since it's a separate file
- T006 (accessibility) runs after T004 since it modifies the same component
- T007 (Complete state) modifies T004's component — runs after T004
- T008 (Complete a11y) modifies T004's component — runs after T007
- T009 (due date) modifies T004's component — runs after Phase 4
- T010 (null date) modifies T004's component — runs after T009

### Parallel Opportunities

- T002 and T003 (Foundational) can run in parallel — different files with no dependencies on each other
- T005 (barrel export) can run in parallel with T004 — different file
- T011, T012, T013 (Polish validation) can run in parallel — different concerns
- Polish phase tasks do not conflict with each other

---

## Parallel Example: Foundational Phase

```bash
# Launch both foundational tasks together (different files, no dependencies):
Task: "Create Goal type, GoalState enum, and GoalSize enum in src/features/overview/types/goal.ts"
Task: "Create mock goal data covering all three states in src/features/overview/mocks/goal-data.ts"
```

## Parallel Example: Polish Phase

```bash
# Launch all polish validation tasks together:
Task: "Mobile-first responsive validation"
Task: "Accessibility review"
Task: "UI content review"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (1 task)
2. Complete Phase 2: Foundational (2 tasks, can run in parallel)
3. Complete Phase 3: User Story 1 (3 tasks) — delivers working GoalCard with progress visualization
4. **STOP and VALIDATE**: Test User Story 1 independently — card renders with correct progress, percentages, amounts, all 3 sizes
5. Demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → GoalCard with In Progress / No Progress states → Demo (MVP!)
3. Add User Story 2 → Complete state visual differentiation → Demo
4. Add User Story 3 → Due date display → Demo
5. Polish → Accessibility, responsive, content review, tests → Ship

### Single Developer Strategy

All tasks are designed for sequential execution by a single developer:
1. T001 → T002 + T003 (parallel) → T004 → T005 → T006 → T007 → T008 → T009 → T010 → T011 + T012 + T013 (parallel) → T014 → T015

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- GoalCard is a single-file presentational component — US2 and US3 tasks modify the same file (goal-card.tsx), adding state-specific styling branches and features
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- All design values reference the design system tokens from tailwind.config.js (see research.md for complete mapping)
- The Wide variant gradient uses react-native-svg (same pattern as TotalSavingsCard)
- No new external dependencies required
