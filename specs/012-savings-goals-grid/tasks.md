# Tasks: Savings Goals Grid

**Input**: Design documents from `/specs/012-savings-goals-grid/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Tests**: Not explicitly requested in the feature specification. Test tasks are omitted.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Mock Data)

**Purpose**: Create the mock data file that feeds all user stories. No infrastructure setup needed — the project (Expo Router, NativeWind, Gluestack UI v3) is already configured.

- [x] T001 Create mock goals list with 8 varied-state goals in `src/features/overview/mocks/goals-list-data.ts` (import `Goal` type from `../types/goal`, export `mockGoalsList: Goal[]` and `mockEmptyGoalsList: Goal[]`)

**Checkpoint**: Mock data ready — all components can consume typed data

---

## Phase 2: Foundational (No Blocking Prerequisites)

**Purpose**: This feature extends the existing `overview` module. The `GoalCard` component, `DashboardScreen`, Expo Router, and all design tokens are already in place. No database, auth, or routing infrastructure is needed. Skip to user stories.

**Checkpoint**: Foundation ready — user story implementation can begin

---

## Phase 3: User Story 1 - Visualizar objetivos financeiros em grid (Priority: P1) 🎯 MVP

**Goal**: Display all financial goals in a responsive grid below the dashboard summary. Desktop uses 2-column (2/3 + 1/3) layout with alternating rows. Tablet uses single-column with horizontal pairs. Mobile uses single-column full-width cards.

**Independent Test**: Render dashboard-screen with mock goals and verify all 8 cards display correctly at 1024px, 768px, and 375px viewport widths. Each card shows name, percentage, progress bar, values, and due date.

### Implementation for User Story 1

- [x] T002 [P] [US1] Create `GoalsHeader` component with title "Your goals" + placeholder "Filters" and "Sort By" buttons (no action) in `src/features/overview/components/goals-header.tsx`. Desktop/tablet: `flex-row justify-between`. Mobile: `flex-col` with full-width buttons.
- [x] T003 [P] [US1] Implement `GoalsGrid` desktop layout (`lg:flex-col hidden`) — two alternating rows with 2/3+1/3 column split, wide+2defaults vs tall mirrored pattern in `src/features/overview/components/goals-grid.tsx`. Import `GoalCard` from `./goal-card`.
- [x] T004 [US1] Implement `GoalsGrid` tablet layout (`md:flex-col hidden lg:hidden`) — single column with horizontal card pairs in `src/features/overview/components/goals-grid.tsx`.
- [x] T005 [US1] Implement `GoalsGrid` mobile layout (default `md:hidden`) — single column full-width cards in `src/features/overview/components/goals-grid.tsx`.
- [x] T006 [US1] Extend `DashboardScreen` — add `GoalsHeader` + `GoalsGrid` below `DashboardSummary` in `src/features/overview/screens/dashboard-screen.tsx`. Wire mock data via `mockGoalsList` and conditional rendering (populated path only — empty state in US2).

**Checkpoint**: Grid with mock goals renders on all 3 breakpoints. Cards display correct info. Scrolling works for 8+ goals.

---

## Phase 4: User Story 2 - Visualizar estado vazio (Priority: P2)

**Goal**: When no goals exist, show a centered empty state with a message and, on desktop/tablet, preview example cards. On mobile, show only the message + CTA button.

**Independent Test**: Switch `DashboardScreen` to use `mockEmptyGoalsList` and verify empty state renders with correct messages. On desktop/tablet, verify preview cards appear. On mobile (<768px), verify only message + CTA appears.

### Implementation for User Story 2

- [x] T007 [US2] Create `EmptyState` component — message container with icon (40x40), title ("Você ainda não possui objetivos financeiros."), subtitle ("Crie seu primeiro objetivo para começar a acompanhar suas metas."), and "Create your first goal" CTA button (no action) in `src/features/overview/components/empty-state.tsx`. Desktop/tablet: `p-10`, mobile: `px-4 py-10`.
- [x] T008 [US2] Add preview example cards inside `EmptyState` desktop/tablet variant — render `GoalsGrid` with muted opacity and `pointer-events-none` using `showExampleCards` prop in `src/features/overview/components/empty-state.tsx`. Mobile (`md:hidden`): hide preview cards, show only message + CTA.
- [x] T009 [US2] Wire empty state into `DashboardScreen` — add `isEmpty` check with conditional rendering (`EmptyState` when empty, `GoalsGrid` when populated) in `src/features/overview/screens/dashboard-screen.tsx`.

**Checkpoint**: Switching between `mockGoalsList` and `mockEmptyGoalsList` correctly toggles between grid and empty state on all breakpoints.

---

## Phase 5: User Story 3 - Navegar para detalhe do objetivo (Priority: P3)

**Goal**: Clicking/tapping a goal card navigates to a detail view for that goal. This phase creates a placeholder detail route with mock data display.

**Independent Test**: Click any card in the grid and verify navigation to a detail screen showing the goal ID and name. Verify back navigation works.

### Implementation for User Story 3

- [x] T010 [P] [US3] Create placeholder goal detail route at `src/app/(logged)/goals/[id].tsx` — reads `id` from `useLocalSearchParams`, displays "Goal Detail: {id}" with mock placeholder content.
- [x] T011 [US3] Wrap each `GoalCard` in `GoalsGrid` with `Pressable` + `router.push` using `{ pathname: '/goals/[id]', params: { id: goal.id } }` in `src/features/overview/components/goals-grid.tsx`.
- [x] T012 [US3] Add accessibility labels to wrapped cards — ensure `accessibilityRole="link"` and `accessibilityLabel` on the `Pressable` wrapper so screen readers announce the card as navigable.

**Checkpoint**: Click any card → navigate to detail screen with correct ID. Back navigation returns to grid.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Responsive verification, content review, accessibility, and edge case validation.

- [x] T013 [P] Verify responsive behavior at all breakpoints — test 320px (mobile), 768px (tablet), 1024px (desktop), 1440px (large desktop), 1920px (ultrawide). Ensure no horizontal scroll, no layout break, cards don't stretch excessively.
- [x] T014 [P] Mobile-first pass — confirm tap targets ≥ 44px, single-hand usability, vertical scroll smooth, no content clipped on iPhone SE (375px).
- [x] T015 [P] Accessibility pass — verify keyboard navigation (Tab through cards, Enter to select), focus visible on all interactive elements, screen reader announces goal name + percentage + state on each card.
- [x] T016 [P] Content review — verify all labels, dates, and messages follow spec: due date format "Vence em DD/MM/AAAA", currency format "R$ X.XXX,XX", empty state messages in Portuguese.
- [x] T017 [P] Edge case validation — test with single goal (grid doesn't break), test with 20+ goals (scroll performance OK), test with all completed goals (100% indicators), test with zero targetAmount (GoalCard handles safely via deriveState).
- [x] T018 Validate empty state preview cards — on desktop/tablet, preview cards render with reduced opacity and no pointer events; on mobile, only message + CTA visible.
- [x] T019 Verify all design tokens used — no hardcoded colors, spacing, or typography values; all classes from tailwind.config.js (neutral, orange, green, semantic tokens).
- [x] T020 Run quickstart.md validation checklist — verify all items in quickstart.md are complete and working.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — create mock data file first
- **Foundational (Phase 2)**: N/A — existing infrastructure suffices
- **User Story 1 (Phase 3)**: Depends on Setup (T001) for mock data. T002 and T003 can run in parallel. T004 depends on T003 (same file). T005 depends on T003 (same file). T006 depends on T002-T005.
- **User Story 2 (Phase 4)**: Depends on US1 components (T002, T003-T005 exist). T007 can start after US1 checkpoint. T008 depends on T007 (same file) + GoalsGrid from US1. T009 depends on T007-T008 + DashboardScreen from US1.
- **User Story 3 (Phase 5)**: Depends on US1 (GoalsGrid exists). T010 is independent. T011 depends on T010 (route must exist) + GoalsGrid from US1. T012 depends on T011.
- **Polish (Phase 6)**: Depends on all user stories being complete.

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Setup — No dependencies on other stories
- **User Story 2 (P2)**: Can start after US1 components exist (reuses GoalsHeader, GoalsGrid patterns)
- **User Story 3 (P3)**: Can start after US1 (wraps existing GoalCard in GoalsGrid)

### Within Each User Story

- Components that are independent files → mark [P]
- Components in the same file → sequential (e.g., T003 before T004)
- Screen integration → after all components

### Parallel Opportunities

- T002 (GoalsHeader) and T003 (GoalsGrid desktop) can run in parallel
- T007 (EmptyState message) and T010 (detail route) are completely independent — can run after their respective stories start
- All Polish tasks (T013-T017) can run in parallel

---

## Parallel Example: User Story 1

```bash
# After T001 (mock data):
# Launch independent components in parallel:
Task: "T002 Create GoalsHeader in src/features/overview/components/goals-header.tsx"
Task: "T003 Create GoalsGrid desktop in src/features/overview/components/goals-grid.tsx"

# After T003, continue sequentially in same file:
Task: "T004 Add tablet layout to GoalsGrid"
Task: "T005 Add mobile layout to GoalsGrid"

# After components:
Task: "T006 Wire into DashboardScreen"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: T001 (mock data)
2. Skip Phase 2 (no foundational work needed)
3. Complete Phase 3: T002–T006 (Goal Header + GoalsGrid + integration)
4. **STOP and VALIDATE**: Test grid on desktop (1024px+), tablet (768px), mobile (375px) with 8 mock goals
5. Deploy/demo if ready — grid displays all goals with full card info

### Incremental Delivery

1. T001 → Mock data ready
2. T002–T006 → Grid populado funcional (MVP!)
3. T007–T009 → Estado vazio funcional
4. T010–T012 → Navegação funcional
5. T013–T020 → Polish, a11y, content review
6. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers after T001:

- Developer A: User Story 1 (T002-T006)
- Developer B: Wait for US1 checkpoint, then User Story 2 (T007-T009)
- Developer C: Wait for US1 checkpoint, then User Story 3 (T010-T012)

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- No backend — all data is mock (NFR-01)
- GoalCard component from `011-goal-card` is a pre-existing dependency — do not modify it
- Types are shared from `src/features/overview/types/goal.ts` — do not duplicate
- All styles use design tokens from tailwind.config.js — no hardcoded values
- Filters and Sort By buttons are visual only (no onPress handlers) per user instruction
- Create your first goal button is visual only (no action) per user instruction
- Commit after each task or logical group
