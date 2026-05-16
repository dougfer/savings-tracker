# Tasks: Shared UI Components

**Input**: Design documents from `specs/003-shared-ui-components/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/` at repository root (Expo universal mobile-app)
- Components: `src/components/ui/`
- Tests: colocated `.test.tsx` beside component

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create folder structure and prepare the component scaffold

- [X] T001 Create component folder structure per plan: `src/components/ui/app-button/`, `src/components/ui/app-input/`, `src/components/ui/app-checkbox/`, `src/components/ui/app-dropdown-menu/`, `src/components/ui/app-modal/`
- [X] T002 [P] Create barrel `index.ts` for each subfolder (`src/components/ui/app-button/index.ts`, `src/components/ui/app-input/index.ts`, `src/components/ui/app-checkbox/index.ts`, `src/components/ui/app-dropdown-menu/index.ts`, `src/components/ui/app-modal/index.ts`) with placeholder exports

---

## Phase 2: Foundational (Figma Extraction — Blocking Prerequisites)

**Purpose**: Extract exact visual specs from Figma for all 6 components. Maps variants, sizes, states, and colors to existing design tokens in `tailwind.config.js`. BLOCKS all implementation.

**⚠️ CRITICAL**: No component implementation can begin until the Figma extraction for that component is complete. All extraction tasks are parallelizable since they target different Figma nodes.

- [X] T003 [P] Extract Button design specs from Figma node `271:3896` (fileKey `UtM4hqbnpAz8GAmCUO3ERr`) via MCP `get_figma_data`: map all variants (primary, secondary, outline, destructive), sizes (sm, md, lg), and states (default, hover, pressed, focused, disabled, loading) to Tailwind token classes. Document in `specs/003-shared-ui-components/contracts/figma-component-map.md` under Button section.
- [X] T004 [P] Extract Input design specs from Figma node `307:1217` (fileKey `UtM4hqbnpAz8GAmCUO3ERr`) via MCP `get_figma_data`: map variants (outline, underlined, rounded), sizes (sm, md, lg), states (default, focused, error, disabled, read-only), label/helper/error styling to Tailwind token classes. Document in `specs/003-shared-ui-components/contracts/figma-component-map.md` under Input section.
- [X] T005 [P] Extract Checkbox design specs from Figma node `291:1557` (fileKey `UtM4hqbnpAz8GAmCUO3ERr`) via MCP `get_figma_data`: map sizes (sm, md, lg), states (unchecked, checked, indeterminate, focused, disabled, invalid), indicator and label styling to Tailwind token classes. Document in `specs/003-shared-ui-components/contracts/figma-component-map.md` under Checkbox section.
- [X] T006 [P] Extract Avatar design specs from Figma node `357:8000` (fileKey `UtM4hqbnpAz8GAmCUO3ERr`) via MCP `get_figma_data`: map sizes (xs, sm, md, lg, xl, 2xl), fallback background colors, text styling, border/badge styling to Tailwind token classes. Document in `specs/003-shared-ui-components/contracts/figma-component-map.md` under Avatar section.
- [X] T007 [P] Extract ProgressBar design specs from Figma node `297:1695` (fileKey `UtM4hqbnpAz8GAmCUO3ERr`) via MCP `get_figma_data`: map sizes (xs, sm, md, lg), track/fill colors for variants (default, success, warning), radius, and height to Tailwind token classes. Document in `specs/003-shared-ui-components/contracts/figma-component-map.md` under ProgressBar section.
- [X] T008 [P] Extract Dropdown Menu design specs from Figma node `271:996` (fileKey `UtM4hqbnpAz8GAmCUO3ERr`) via MCP `get_figma_data`: map trigger style, menu container (bg, border, shadow, radius), item layout (padding, hover/active states), separator, and icon slots to Tailwind token classes. Determine if design shows popover (Menu) or bottom-sheet (Actionsheet) pattern for mobile. Document in `specs/003-shared-ui-components/contracts/figma-component-map.md` under Dropdown Menu section.

**Checkpoint**: All Figma extractions complete. Token mappings documented. Component implementation can now begin.

---

## Phase 3: User Story 1 — AppButton (Priority: P1) 🎯 MVP

**Goal**: Provide a consistent Button component with variants (primary, secondary, outline, destructive), sizes (sm, md, lg), loading/disabled states, and compound subparts (Text, Icon, Spinner).

**Independent Test**: Render AppButton in all variant/size combinations; verify visual output, press feedback, disabled state, loading state, and accessibility labels.

### Implementation for User Story 1

- [X] T009 [US1] Implement AppButton compound component in `src/components/ui/app-button/app-button.tsx`: create `AppButtonRoot` wrapping Gluestack `Button`, `AppButtonText` wrapping `ButtonText`, `AppButtonIcon` wrapping `ButtonIcon`, `AppButtonSpinner` wrapping `ButtonSpinner`. Use React context to share variant/size/disabled/loading state. Apply NativeWind `className` with variant resolver mapping Figma-extracted tokens. Set `displayName` on root and all subparts. Export via `Object.assign` as `AppButton`.
- [X] T010 [US1] Update barrel export in `src/components/ui/app-button/index.ts` to export `AppButton` as default and named export.
- [X] T011 [US1] Write behavior tests in `src/components/ui/app-button/app-button.test.tsx`: test rendering in each variant (primary, secondary, outline, destructive), each size (sm, md, lg), disabled state (non-interactive, visually muted), loading state (spinner visible, non-interactive), compound subpart rendering (Text, Icon, Spinner), and a11y (role="button", disabled announcement).

**Checkpoint**: AppButton fully functional and testable independently. Developers can use `<AppButton variant="primary"><AppButton.Text>Label</AppButton.Text></AppButton>`.

---

## Phase 4: User Story 2 — AppInput + AppCheckbox (Priority: P1)

**Goal**: Provide consistent form components — Input with labels, helper text, error messages, and validation states; Checkbox with checked/unchecked/indeterminate states.

**Independent Test**: Render AppInput and AppCheckbox in all states (default, focused, error, disabled, read-only); verify label association, validation display, keyboard interaction, and screen-reader announcements.

### Implementation for User Story 2

- [X] T012 [P] [US2] Implement AppInput compound component in `src/components/ui/app-input/app-input.tsx`: create `AppInputRoot` wrapping Gluestack `FormControl` + `Input`, `AppInputField` wrapping `InputField`, `AppInputSlot` wrapping `InputSlot`, `AppInputIcon` wrapping `InputIcon`, `AppInputLabel` wrapping `FormControlLabelText`, `AppInputHelperText` wrapping `FormControlHelperText`, `AppInputErrorText` wrapping `FormControlErrorText`, `AppInputErrorIcon` wrapping `FormControlErrorIcon`. Use React context to share variant/size/isInvalid/isDisabled/isRequired state. Apply NativeWind `className` with Figma-extracted tokens. Set `displayName` on all parts. Export via `Object.assign` as `AppInput`.
- [X] T013 [P] [US2] Implement AppCheckbox compound component in `src/components/ui/app-checkbox/app-checkbox.tsx`: create `AppCheckboxRoot` wrapping Gluestack `Checkbox`, `AppCheckboxIndicator` wrapping `CheckboxIndicator`, `AppCheckboxIcon` wrapping `CheckboxIcon`, `AppCheckboxLabel` wrapping `CheckboxLabel`. Use React context to share size/isDisabled/isInvalid state. Apply NativeWind `className` with Figma-extracted tokens. Set `displayName` on all parts. Export via `Object.assign` as `AppCheckbox`.
- [X] T014 [US2] Update barrel exports in `src/components/ui/app-input/index.ts` and `src/components/ui/app-checkbox/index.ts`.
- [X] T015 [P] [US2] Write behavior tests in `src/components/ui/app-input/app-input.test.tsx`: test rendering in each variant (outline, underlined, rounded), states (default, focused, error, disabled, read-only), label association, helper text visibility, error message display when isInvalid, required indicator, and a11y (textbox role, error association).
- [X] T016 [P] [US2] Write behavior tests in `src/components/ui/app-checkbox/app-checkbox.test.tsx`: test checked/unchecked toggle, indeterminate visual, disabled state (non-interactive), invalid state (error border), label association, and a11y (checkbox role, checked/unchecked announcement).

**Checkpoint**: AppInput + AppCheckbox fully functional. Developers can compose forms with `<AppInput>`, `<AppCheckbox>`, and `<AppButton>`.

---

## Phase 5: User Story 3 — AppAvatar (Priority: P2)

**Goal**: Provide an Avatar component that displays a user image with fallback to initials, supporting multiple sizes.

**Independent Test**: Render AppAvatar with image URL, with no image (initials fallback), with broken image URL, and in different sizes.

### Implementation for User Story 3

- [X] T017 [US3] Implement AppAvatar compound component in `src/components/ui/app-avatar.tsx`: create `AppAvatarRoot` wrapping Gluestack `Avatar`, `AppAvatarImage` wrapping `AvatarImage`, `AppAvatarFallbackText` wrapping `AvatarFallbackText`, `AppAvatarBadge` wrapping `AvatarBadge`. Apply NativeWind `className` with Figma-extracted size tokens. Set `displayName` on all parts. Export via `Object.assign` as `AppAvatar`.
- [X] T018 [US3] Write behavior tests in `src/components/ui/app-avatar.test.tsx`: test image rendering at each size (xs, sm, md, lg, xl, 2xl), fallback text display when no image, compound subpart rendering (Image, FallbackText, Badge), and a11y (accessibilityLabel).

**Checkpoint**: AppAvatar fully functional and testable independently.

---

## Phase 6: User Story 4 — AppProgressBar (Priority: P2)

**Goal**: Provide a ProgressBar component that visually represents percentage progress with color variants for different contexts (default, success, warning).

**Independent Test**: Render AppProgressBar at various percentages (0%, 25%, 50%, 75%, 100%, >100%); verify fill, color variants, label, and a11y announcements.

### Implementation for User Story 4

- [X] T019 [US4] Implement AppProgressBar compound component in `src/components/ui/app-progress-bar.tsx`: create `AppProgressBarRoot` wrapping Gluestack `Progress`, `AppProgressBarTrack` wrapping `ProgressFilledTrack`, `AppProgressBarLabel` as custom `Text` for value display. Use React context to share value/variant/size. Clamp value to 0–100 for visual. Apply NativeWind `className` with Figma-extracted tokens — variant controls fill color (default=primary, success=green, warning=orange). Set `displayName` on all parts. Export via `Object.assign` as `AppProgressBar`.
- [X] T020 [US4] Write behavior tests in `src/components/ui/app-progress-bar.test.tsx`: test rendering at 0%, 50%, 100%, and >100% (capped), each variant (default, success, warning), each size (xs, sm, md, lg), label rendering, and a11y (progressbar role, aria-valuenow).

**Checkpoint**: AppProgressBar fully functional and testable independently.

---

## Phase 7: User Story 5 — AppDropdownMenu (Priority: P2)

**Goal**: Provide a Dropdown Menu component with trigger, selectable items, keyboard navigation, icons, separators, and automatic dismiss.

**Independent Test**: Open menu via trigger, navigate items with keyboard/touch, select an item, dismiss via outside tap or Escape, verify focus management.

### Implementation for User Story 5

- [X] T021 [US5] Implement AppDropdownMenu compound component in `src/components/ui/app-dropdown-menu/app-dropdown-menu.tsx`: create `AppDropdownMenuRoot` wrapping Gluestack `Menu`, `AppDropdownMenuTrigger` wrapping Menu `trigger` prop pattern, `AppDropdownMenuContent` as styled wrapper, `AppDropdownMenuItem` wrapping `MenuItem`, `AppDropdownMenuItemLabel` wrapping `MenuItemLabel`, `AppDropdownMenuItemIcon` as custom icon slot, `AppDropdownMenuSeparator` as styled `View`. Apply NativeWind `className` with Figma-extracted tokens. Set `displayName` on all parts. Export via `Object.assign` as `AppDropdownMenu`. If Figma extraction (T008) revealed bottom-sheet pattern, use Gluestack `Actionsheet` instead of `Menu`.
- [X] T022 [US5] Update barrel export in `src/components/ui/app-dropdown-menu/index.ts`.
- [X] T023 [US5] Write behavior tests in `src/components/ui/app-dropdown-menu/app-dropdown-menu.test.tsx`: test menu opens on trigger press, item selection triggers onPress and closes menu, dismiss on outside interaction, compound subpart rendering (Trigger, Content, Item, ItemLabel, Separator), and a11y (menu role, menuitem roles).

**Checkpoint**: AppDropdownMenu fully functional and testable independently.

---

## Phase 8: User Story 6 — AppModal (Priority: P3)

**Goal**: Provide a Modal component with backdrop, focus trap, header/body/footer layout, dismissible via close button, backdrop press, and Escape key.

**Independent Test**: Open modal, verify focus trap, attempt background interaction, close via button/overlay/Escape, verify focus returns to trigger.

### Implementation for User Story 6

- [X] T024 [US6] Implement AppModal compound component in `src/components/ui/app-modal/app-modal.tsx`: create `AppModalRoot` wrapping Gluestack `Modal`, `AppModalBackdrop` wrapping `ModalBackdrop`, `AppModalContent` wrapping `ModalContent`, `AppModalHeader` wrapping `ModalHeader`, `AppModalBody` wrapping `ModalBody`, `AppModalFooter` wrapping `ModalFooter`, `AppModalCloseButton` wrapping `ModalCloseButton`. Apply NativeWind `className` with design tokens (bg-card, border-border, rounded-xl, etc.). Support size presets (sm, md, lg, full). Set `displayName` on all parts. Export via `Object.assign` as `AppModal`.
- [X] T025 [US6] Update barrel export in `src/components/ui/app-modal/index.ts`.
- [X] T026 [US6] Write behavior tests in `src/components/ui/app-modal/app-modal.test.tsx`: test modal opens with isOpen=true, closes on onClose callback, compound subpart rendering (Backdrop, Content, Header, Body, Footer, CloseButton), and a11y (dialog role, aria-modal).

**Checkpoint**: AppModal fully functional and testable independently.

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Final barrel update, a11y audit, cross-platform review, and validation

- [X] T027 Update root barrel `src/components/ui/index.ts` to export all new compound components: `AppButton`, `AppInput`, `AppCheckbox`, `AppAvatar`, `AppProgressBar`, `AppDropdownMenu`, `AppModal`. Remove raw Gluestack `Button`/`ButtonText` re-exports (replaced by `AppButton`).
- [X] T028 [P] Acessibilidade: verify all components pass a11y baseline checklist from `specs/003-shared-ui-components/contracts/a11y-baseline.md` — semantic roles, keyboard navigation (Tab/Escape/Space/Enter), visible focus indicators, touch targets >= 44pt, screen reader announcements for state changes
- [X] T029 [P] Mobile-first pass: verify all components render correctly on screen widths 320px–428px without overflow, truncation, or touch-target violations. Test Button with long labels, Input with long error messages, DropdownMenu with many items
- [X] T030 [P] Cross-platform review: verify all components render consistently on iOS, Android, and Web — check hover states (Web-only via `data-[hover=true]`), press states (native `data-[active=true]`), focus rings, modal backdrop behavior
- [X] T031 Run quickstart.md validation: compose a sample form screen using AppButton, AppInput, AppCheckbox following examples in `specs/003-shared-ui-components/quickstart.md`. Verify it works without custom styling.
- [X] T032 Run `npm run lint` and `npm run test` to verify no regressions

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all component implementation
- **User Stories (Phase 3–8)**: Each depends on its corresponding Figma extraction from Phase 2
  - US1 (AppButton) depends on T003
  - US2 (AppInput + AppCheckbox) depends on T004 + T005
  - US3 (AppAvatar) depends on T006
  - US4 (AppProgressBar) depends on T007
  - US5 (AppDropdownMenu) depends on T008
  - US6 (AppModal) depends on T003 (for Button used in footer examples) + its own Figma
- **Polish (Phase 9)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)** — AppButton: Can start after T003. No dependencies on other stories.
- **User Story 2 (P1)** — AppInput + AppCheckbox: Can start after T004 + T005. No dependencies on other stories.
- **User Story 3 (P2)** — AppAvatar: Can start after T006. No dependencies on other stories.
- **User Story 4 (P2)** — AppProgressBar: Can start after T007. No dependencies on other stories.
- **User Story 5 (P2)** — AppDropdownMenu: Can start after T008. No dependencies on other stories.
- **User Story 6 (P3)** — AppModal: Can start after Phase 2. Uses AppButton in footer examples but doesn't depend on US1 to be implemented (can use Gluestack Button directly during dev).

### Within Each User Story

- Figma extraction complete (from Phase 2)
- Component implementation → barrel update → tests
- Story complete before polish phase

### Parallel Opportunities

- All Figma extraction tasks (T003–T008) can run in parallel
- US1 and US2 can start in parallel after their respective Figma extractions
- US3, US4, US5 can all start in parallel after their respective Figma extractions
- Within US2: AppInput (T012) and AppCheckbox (T013) can run in parallel (different files)
- Within US2: Tests T015 and T016 can run in parallel
- All Polish tasks (T028–T030) can run in parallel

---

## Parallel Example: Phase 2 (Figma Extraction)

```bash
# All Figma extractions can run simultaneously:
Task: "Extract Button from Figma node 271:3896"
Task: "Extract Input from Figma node 307:1217"
Task: "Extract Checkbox from Figma node 291:1557"
Task: "Extract Avatar from Figma node 357:8000"
Task: "Extract ProgressBar from Figma node 297:1695"
Task: "Extract Dropdown Menu from Figma node 271:996"
```

## Parallel Example: US1 + US2 (P1 stories)

```bash
# After Figma extraction, both P1 stories can proceed in parallel:
# Developer A: US1 (AppButton)
Task: "T009 [US1] Implement AppButton in src/components/ui/app-button/app-button.tsx"
Task: "T011 [US1] Write tests in src/components/ui/app-button/app-button.test.tsx"

# Developer B: US2 (AppInput + AppCheckbox)
Task: "T012 [US2] Implement AppInput in src/components/ui/app-input/app-input.tsx"
Task: "T013 [US2] Implement AppCheckbox in src/components/ui/app-checkbox/app-checkbox.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete T003: Button Figma extraction
3. Complete Phase 3: AppButton (US1)
4. **STOP and VALIDATE**: Test AppButton independently — all variants, sizes, states, a11y
5. Deploy/demo if ready

### Incremental Delivery

1. Setup + Figma extraction → Foundation ready
2. AppButton (US1) → Test independently → **MVP delivered**
3. AppInput + AppCheckbox (US2) → Test independently → **Form-ready delivered**
4. AppAvatar + AppProgressBar + AppDropdownMenu (US3–5) → Test independently → **Core components delivered**
5. AppModal (US6) → Test independently → **Full component library delivered**
6. Polish → Cross-platform/a11y audit → **Production-ready**

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup together
2. All Figma extractions run in parallel
3. Once extractions are done:
   - Developer A: US1 (AppButton) → US3 (AppAvatar)
   - Developer B: US2 (AppInput + AppCheckbox) → US4 (AppProgressBar)
   - Developer C: US5 (AppDropdownMenu) → US6 (AppModal)
4. Stories complete and integrate independently via barrel

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story is independently completable and testable
- Figma extraction (Phase 2) is the critical path — if API returns 429, retry with delays
- All component implementations follow the compound pattern from `compound-components.mdc`
- All styling uses NativeWind `className` with tokens from `tailwind.config.js` — no hardcoded values
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
