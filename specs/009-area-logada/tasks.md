# Tasks: Área Logada

**Input**: Design documents from `/specs/009-area-logada/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/

**Tests**: Not explicitly requested in the feature specification. Tests are not included in this task list.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create directory structure for the Logged Area feature

- [x] T001 Create directory `src/app/(logged)/` for the logged area route group
- [x] T002 [P] Create directory `src/components/ui/topbar/` for the shared Topbar component
- [x] T003 [P] Create directory `src/features/overview/screens/` (if not already present)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core Topbar component that ALL logged-area screens depend on

**⚠️ CRITICAL**: No user story screen can render without the Topbar component

- [x] T004 Create shared Topbar component with responsive variants in `src/components/ui/topbar/topbar.tsx` — implement desktop (>=1024px), tablet (768-1023px), and mobile (<768px) layouts matching app.pen designs (Node IDs: PVGJ3, Wp3Ge, u2DsY1). Use `useWindowDimensions` for breakpoint detection. Include: Logo area (icon SVG + "Savings Tracker" title for desktop/tablet, icon only for mobile), "New goal" button (AppButton primary variant, no onPress handler), Avatar (AppAvatar, tablet/mobile only). Use only design tokens from `tailwind.config.js` (colors: neutral-900, orange-400, neutral-800; fonts: Bricolage Grotesque display-semibold, Inter; spacing: 4px grid). Bottom border: `border-b border-neutral-800`. Height: 80px desktop/tablet, 56px mobile. Padding x: 80px desktop, 24px tablet, 16px mobile. Padding y: 16px desktop/tablet, 12px mobile.
- [x] T005 Create barrel export file `src/components/ui/topbar/index.ts` exporting Topbar component
- [x] T006 Update shared UI barrel export `src/components/ui/index.ts` to include Topbar export

**Checkpoint**: Topbar component ready — logged-area layout can now consume it

---

## Phase 3: User Story 1 — Acessar e visualizar a Área Logada (Priority: P1) 🎯 MVP

**Goal**: User can access the Logged Area and see the dashboard with the Topbar visible at the top. The Topbar renders persistently above the content area.

**Independent Test**: Navigate to any route under `(logged)` and verify the dashboard renders with the Topbar present at the top. The Topbar shows the logo and "New goal" button (responsive per breakpoint).

### Implementation for User Story 1

- [x] T007 [US1] Create logged area group layout `src/app/(logged)/_layout.tsx` — implements a shared layout using Expo Router `<Stack>` with `headerShown: false`. Renders the Topbar component at the top and `<Stack>` for child route content below. Wraps content in a `<View className="flex-1">` with dark background (`bg-neutral-900`). Ensures Topbar persists across all child routes. Uses `<SafeAreaView>` from `react-native-safe-area-context` for top safe area inset.
- [x] T008 [P] [US1] Create dashboard screen `src/features/overview/screens/dashboard-screen.tsx` — initial landing screen for the logged area. Renders a simple placeholder using existing `OverviewHint` component. Uses the existing `AppScreen` layout wrapper or a simple `<View>` with centered content. Displays a welcome heading ("Dashboard" or equivalent) and the hint text from `OverviewHint`.
- [x] T009 [US1] Create route entry point `src/app/(logged)/index.tsx` — thin re-export following project pattern: `export { default } from '@/features/overview/screens/dashboard-screen'`
- [x] T010 [US1] Import and render Topbar in `src/app/(logged)/_layout.tsx` — wire the Topbar component into the group layout. Verify via dev server that navigating to `/(logged)` shows the dashboard with Topbar.

**Checkpoint**: At this point, navigating to the logged area shows the dashboard with Topbar. User Story 1 is independently functional and testable.

---

## Phase 4: User Story 2 — Navegar entre telas da Área Logada (Priority: P2)

**Goal**: Navigation infrastructure is in place. The Topbar's "New goal" button is present and positioned. The Stack navigator in the group layout supports future screen additions. Transitions between logged-area screens are instant (no flicker).

**Independent Test**: Verify the Stack navigator is configured in the layout. Verify the "New goal" button renders at the correct position across breakpoints. (Full navigation testing requires multiple screens — verified structurally in this phase.)

### Implementation for User Story 2

- [x] T011 [US2] Configure `<Stack>` in `src/app/(logged)/_layout.tsx` with screen options: `headerShown: false`, `animation: 'fade'` (or default) for smooth transitions. Verify the Stack is functional by confirming child routes render within it.
- [x] T012 [US2] Ensure Topbar "New goal" button uses `AppButton` primary variant with consistent styling across breakpoints — verify button renders with `+` icon (using existing SVG pattern from `src/assets/icons/`) and "New goal" text (Inter SemiBold 16px). Button has `rounded-full`, `py-3`, `px-5`, `min-h-[48px]` for touch targets. Desktop: 140px fixed width; tablet/mobile: auto width. No `onPress` handler (future feature).
- [x] T013 [P] [US2] Ensure Topbar Avatar renders correctly on tablet and mobile breakpoints — use `AppAvatar` with `size="md"` (48px). Placeholder initials ("AH" per design) since no user data is loaded. Avatar is NOT rendered on desktop (matches app.pen design PVGJ3).
- [x] T014 [US2] Verify Topbar persists across navigation — confirm the Topbar does not re-mount or flicker when navigating between child routes within the `(logged)` group. This is inherent to the layout pattern but should be validated.

**Checkpoint**: Navigation infrastructure is ready. Topbar stays fixed during route transitions. Button and avatar render correctly per breakpoint.

---

## Phase 5: User Story 3 — Estrutura de rotas consistente (Priority: P3)

**Goal**: All files follow project naming conventions (kebab-case directories, PascalCase components, barrel exports). Route structure matches Expo Router patterns. Code organization follows Feature First architecture.

**Independent Test**: Inspect the directory tree and file structure. Verify all exports are via barrel files. Verify kebab-case directory names. Verify thin re-exports in route files.

### Implementation for User Story 3

- [x] T015 [US3] Validate directory naming conventions — ensure all new directories use kebab-case: `src/components/ui/topbar/`, `src/app/(logged)/`, `src/features/overview/screens/`. Rename if needed.
- [x] T016 [P] [US3] Validate barrel exports — every new directory must have an `index.ts` barrel export. Verify: `src/components/ui/topbar/index.ts` exports `Topbar`, `src/components/ui/index.ts` includes Topbar. Route files are thin re-exports (`export { default } from ...`).
- [x] T017 [P] [US3] Validate component naming — all React components use PascalCase: `Topbar`, `DashboardScreen`. File names match component names (kebab-case equivalents: `topbar.tsx`, `dashboard-screen.tsx`).
- [x] T018 [US3] Run lint (`npm run lint`) and verify no new violations. Fix any issues in new or modified files.

**Checkpoint**: All conventions validated. Code passes lint. Structure matches project standards.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: A11y, mobile-first validation, content review, and final verification

- [x] T019 [P] A11y pass on Topbar in `src/components/ui/topbar/topbar.tsx` — verify and implement: Logo area has `accessibilityRole="header"` and `accessibilityLabel="Savings Tracker"`. "New goal" button has `accessibilityLabel="New goal"`. Avatar has `accessibilityRole="image"`. Focus order: Logo → "New goal" button → Avatar. Focus ring via `pencilFocusRingClasses` on interactive elements. Keyboard navigation: `Tab` cycles through interactive elements.
- [x] T020 [P] Mobile-first pass on Topbar in `src/components/ui/topbar/topbar.tsx` — verify: mobile breakpoint (<768px) shows icon only (no title), padding reduced to 12/16px, button is auto-width (not fixed 140px). All touch targets >= 48px. Verify on iOS Simulator / Android Emulator / Web responsive mode.
- [x] T021 [P] Design token audit — verify no hardcoded style values exist in new files (`topbar.tsx`, `dashboard-screen.tsx`, `_layout.tsx`). All colors, fonts, spacing, and radii must reference tokens defined in `tailwind.config.js`. Grep for hex colors (`#`), raw font sizes, or raw padding values outside of `tailwind.config.js`.
- [x] T022 Content review — verify all UI text is functional and action-oriented: "Savings Tracker" (brand identity), "New goal" (CTA). No placeholder/lorem ipsum text. Dashboard screen uses existing `OverviewHint` component text.
- [x] T023 Run quickstart.md validation — follow the steps in `specs/009-area-logada/quickstart.md`: start dev server, navigate to logged area, verify Topbar renders correctly on all three breakpoints (desktop 1440px, tablet 768px, mobile 375px).

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup (T001, T002) for directories — BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational (Topbar component) and Setup (directories)
- **User Story 2 (Phase 4)**: Depends on US1 (layout must exist to configure Stack and wire navigation elements)
- **User Story 3 (Phase 5)**: Depends on US1+US2 (files must exist to validate conventions)
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational — No dependencies on other stories
- **User Story 2 (P2)**: Depends on US1 (layout file must exist to configure Stack within it)
- **User Story 3 (P3)**: Depends on US1+US2 (files must be created before conventions can be validated)

### Within Each User Story

- Layout before screen content (layout establishes the rendering context)
- Screen content before route file (route re-exports the screen)
- Within US3: naming validation → barrel export validation → component naming → lint

### Parallel Opportunities

- T001, T002, T003 (Phase 1): All directory creation — can run in parallel
- T008 (US1): Dashboard screen — can run in parallel with T007 (layout) if both have Topbar context
- T012, T013 (US2): Button and Avatar styling — can run in parallel (different parts of same file but non-conflicting)
- T015, T016, T017, T018 (US3): Convention checks — can run after files exist
- T019, T020, T021, T022 (Polish): All can run in parallel (different concerns on same files)

---

## Parallel Example: Phase 1 Setup

```bash
# Create all directories in parallel:
Task: "Create directory src/app/(logged)/"
Task: "Create directory src/components/ui/topbar/"
Task: "Create directory src/features/overview/screens/ (if not already present)"
```

## Parallel Example: User Story 1

```bash
# After Topbar component exists, can run in parallel:
Task: "Create logged area group layout src/app/(logged)/_layout.tsx"
Task: "Create dashboard screen src/features/overview/screens/dashboard-screen.tsx"
# Then sequentially:
Task: "Create route entry point src/app/(logged)/index.tsx"
Task: "Wire Topbar into layout"
```

## Parallel Example: Polish Phase

```bash
# All polish tasks can run in parallel:
Task: "A11y pass on Topbar"
Task: "Mobile-first pass on Topbar"
Task: "Design token audit"
Task: "Content review"
# Then:
Task: "Run quickstart.md validation"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (create directories)
2. Complete Phase 2: Foundational (build Topbar component)
3. Complete Phase 3: User Story 1 (layout + dashboard + route)
4. **STOP and VALIDATE**: Navigate to `/(logged)` — verify dashboard renders with Topbar
5. Deploy/demo MVP if ready

### Incremental Delivery

1. Complete Setup + Foundational → Topbar component ready
2. Add User Story 1 → Test independently → Dashboard with Topbar (MVP!)
3. Add User Story 2 → Verify navigation infrastructure → Ready for future screens
4. Add User Story 3 → Verify conventions → Production-ready code quality
5. Complete Polish → Accessibility, mobile-first, token compliance verified

### Single Developer Strategy

Sequential: Setup → Foundational → US1 → US2 → US3 → Polish. Each phase builds on the previous. Estimated effort: ~1-2 hours for a single developer.

---

## Notes

- [P] tasks = different files, no dependencies on incomplete tasks
- [Story] label maps task to specific user story for traceability
- Topbar uses three breakpoints per app.pen design: desktop >=1024px, tablet 768-1023px, mobile <768px
- The "New goal" button has NO onPress handler — wired in a future feature (modal with form)
- Avatar shows placeholder initials ("AH") — no user data loaded in this feature
- Dark background (`bg-neutral-900`) inherited from root layout in `src/app/_layout.tsx`
- All design tokens come from `tailwind.config.js` — no hardcoded values
- SVG assets: `logo.svg` (desktop/tablet, 230x40), `logo-icon.svg` (mobile, 40x40)
- SVG import pattern: `import Logo from '@/assets/icons/logo.svg'` — rendered as JSX component
