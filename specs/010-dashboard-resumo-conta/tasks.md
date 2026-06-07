# Tasks: Dashboard - Resumo da Conta

**Input**: Design documents from `/specs/010-dashboard-resumo-conta/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, quickstart.md

**Tests**: Not requested in the feature specification — test tasks are omitted.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Feature First**: `src/features/overview/` for domain code
- **Shared UI**: `src/components/ui/` for reusable components
- Paths follow the structure defined in `plan.md`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Types, mock data, and utility code that all components depend on

- [ ] T001 [P] Create dashboard types (AccountSummary, MonthlyDeposit, DashboardData) in `src/features/overview/types/dashboard.ts`
- [ ] T002 [P] Create currency formatter utility `formatCurrency` using `Intl.NumberFormat('pt-BR')` in `src/features/overview/utils/format-currency.ts`
- [ ] T003 Create mock data (mockPopulatedDashboard with 12 months) in `src/features/overview/mocks/dashboard-data.ts`

**Checkpoint**: Types, mocks, and utilities ready — component implementation can begin

---

## Phase 2: User Story 1 - Visualizar resumo financeiro da conta (Priority: P1) 🎯 MVP

**Goal**: Dashboard displays total savings, active goals count, completed goals count, and monthly bar chart with populated data. Chart shows 12 months on desktop, 6 months on tablet/mobile. Cards adapt layout responsively.

**Independent Test**: Render the dashboard with `mockPopulatedDashboard` data and verify all cards display correct values, the chart renders bars with proportional heights, and the grid adapts to viewport size.

### Implementation for User Story 1

- [ ] T004 [P] [US1] Build `TotalSavingsCard` component with gradient background, label "Total savings", and formatted value in `src/features/overview/components/TotalSavingsCard.tsx`
- [ ] T005 [P] [US1] Build `SummaryCard` generic component (props: `label`, `value`, `valueColor`, `showPattern`) with dark background and decorative SVG pattern in `src/features/overview/components/SummaryCard.tsx`
- [ ] T006 [P] [US1] Build `BarChart` component using native Views (no external chart library) — proportional bar heights, value labels above, month labels below, in `src/features/overview/components/BarChart.tsx`
- [ ] T007 [US1] Build `DashboardSummary` grid container composing TotalSavingsCard, SummaryCard (×2), and BarChart with responsive layout via `useResponsive()` in `src/features/overview/components/DashboardSummary.tsx`
- [ ] T008 [US1] Update `dashboard-screen.tsx` to render `DashboardSummary` with `mockPopulatedDashboard` data in `src/features/overview/screens/dashboard-screen.tsx`

**Checkpoint**: Dashboard fully functional with populated data — all cards render correct values, bar chart displays proportional bars, responsive grid adapts to viewport

---

## Phase 3: User Story 2 - Visualizar estado vazio do dashboard (Priority: P2)

**Goal**: When no data is available, all cards display zeroed values and the bar chart renders without bars while maintaining the grid structure intact.

**Independent Test**: Render the dashboard with zeroed data and verify all cards show "0" / "R$ 0,00", the chart has no visible bars but month labels remain, and no elements are broken or missing.

### Implementation for User Story 2

- [ ] T009 [P] [US2] Add empty state mock data (mockEmptyDashboard with all zeros) in `src/features/overview/mocks/dashboard-data.ts`
- [ ] T010 [US2] Handle zero-value rendering in `BarChart` — bars with zero value render with height 0 (invisible but label remains) in `src/features/overview/components/BarChart.tsx`
- [ ] T011 [US2] Handle zero-value rendering in `SummaryCard` — value "0" displayed with appropriate color in `src/features/overview/components/SummaryCard.tsx`
- [ ] T012 [US2] Handle zero-value rendering in `TotalSavingsCard` — formatted "R$ 0,00" displayed in `src/features/overview/components/TotalSavingsCard.tsx`

**Checkpoint**: Empty state renders correctly — all cards visible with zeroed values, chart has no bars but maintains structure

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories and ensure constitution compliance

- [ ] T013 [P] Verify all components use design tokens exclusively — no hardcoded style values (audit tailwind classes against `tailwind.config.js`) across all new files
- [ ] T014 [P] Accessibility pass — ensure SummaryCard, TotalSavingsCard, and BarChart have appropriate `accessibilityRole`, `accessibilityLabel`, and semantic structure in `src/features/overview/components/`
- [ ] T015 [P] Content review — verify labels match design ("Total savings", "Active goals", "Goals completed", "Monthly deposits") and are in English per the design in all component files
- [ ] T016 Run quickstart.md validation — confirm all steps produce working dashboard across iOS, Android, and Web

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **User Story 1 (Phase 2)**: Depends on Setup completion (types + mocks + utils)
- **User Story 2 (Phase 3)**: Depends on US1 completion (modifies existing components)
- **Polish (Phase 4)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Setup — core components, responsive layout, populated state. No dependencies on other stories.
- **User Story 2 (P2)**: Depends on US1 — adds empty state handling to components built in US1.
- **User Story 3 (P3)**: Merged into US1 — responsive layout is inherent to component implementation (Tailwind breakpoints + useResponsive hook applied during initial build).

### Within Each User Story

- T004 (TotalSavingsCard), T005 (SummaryCard), T006 (BarChart) can all run in parallel — different files, no mutual dependencies
- T007 (DashboardSummary) depends on T004, T005, T006 being complete (composes them)
- T008 (dashboard-screen update) depends on T007

### Parallel Opportunities

- **Phase 1**: T001 and T002 can run in parallel (different files)
- **Phase 2**: T004, T005, T006 can all run in parallel (3 independent components)
- **Phase 3**: T009 is independent; T010, T011, T012 can run in parallel (different files)
- **Phase 4**: T013, T014, T015 can all run in parallel

---

## Parallel Example: User Story 1

```bash
# After Phase 1 completes, launch all US1 component tasks in parallel:
Task: "Build TotalSavingsCard component in src/features/overview/components/TotalSavingsCard.tsx"
Task: "Build SummaryCard generic component in src/features/overview/components/SummaryCard.tsx"
Task: "Build BarChart component in src/features/overview/components/BarChart.tsx"

# After all three complete, build the container:
Task: "Build DashboardSummary grid container in src/features/overview/components/DashboardSummary.tsx"

# Finally, wire it into the screen:
Task: "Update dashboard-screen.tsx in src/features/overview/screens/dashboard-screen.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T003)
2. Complete Phase 2: User Story 1 (T004-T008)
3. **STOP and VALIDATE**: Verify dashboard renders with populated data on desktop, tablet, and mobile viewports
4. Deploy/demo if ready

### Incremental Delivery

1. Setup → Types, mocks, and utilities ready
2. User Story 1 → Populated dashboard with responsive layout (MVP!)
3. User Story 2 → Empty state handling complete
4. Polish → Design token audit, accessibility, content review

### Parallel Team Strategy

With multiple developers:

1. Developer completes Setup (Phase 1)
2. Once Setup is done:
   - Developer A: TotalSavingsCard (T004)
   - Developer B: SummaryCard (T005)
   - Developer C: BarChart (T006)
3. Developer A: DashboardSummary container (T007) + screen update (T008)
4. All: Empty state additions (T010-T012 in parallel)

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- No external charting library — chart uses native React Native Views with Tailwind styling
- `useResponsive()` hook (existing in `src/hooks/useResponsive.ts`) determines breakpoints: desktop (>=1024px), tablet (768-1023px), mobile (<768px)
- Bar chart MAX_BAR_HEIGHT = 144px (from design), proportional: `(value / maxValue) * 144`
- Currency formatting uses `Intl.NumberFormat('pt-BR')` with style: 'currency', currency: 'BRL'
- Design tokens from `tailwind.config.js`: `orange-400`, `orange-700`, `green-500`, `neutral-800`, font families `sans` (Inter) and `display` (Bricolage Grotesque)
- SVG decorative pattern uses existing `VectorPatternIcon` from `@/assets/icons`
