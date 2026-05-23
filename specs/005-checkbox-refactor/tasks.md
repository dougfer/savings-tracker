---

description: "Task list for AppCheckbox refactoring verification"
---

# Tasks: Refatoração do Componente AppCheckbox

**Input**: Design documents from `specs/005-checkbox-refactor/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, quickstart.md

**Note**: This feature is a component refactoring/verification. The "user stories" are the acceptance criteria from the feature specification. The implementation is already verified to align with the design system - tasks focus on confirmation and documentation.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which acceptance criteria this task verifies (e.g., CA-01, CA-02, CA-03, CA-04)
- Include exact file paths in descriptions

---

## Phase 1: Setup & Verification Preparation

**Purpose**: Ensure test environment and tooling is ready

- [ ] T001 Verify test environment in src/components/ui/app-checkbox/app-checkbox.test.tsx
- [ ] T002 [P] Install/update dependencies if needed (@gluestack-ui/core, nativewind, testing libs)
- [ ] T003 [P] Run existing test suite to establish baseline

---

## Phase 2: Implementation Verification (Acceptance Criteria)

**Purpose**: Verify all acceptance criteria are met per feature specification

### CA-01: Structure Alignment

**Goal**: Component structure matches Pencil Q5Ei9 design drawing

- [ ] T004 [P] [CA-01] Verify Root component structure in src/components/ui/app-checkbox/app-checkbox.tsx
- [ ] T005 [P] [CA-01] Verify Indicator subpart: 16×16 (`h-4 w-4`), circle (`rounded-full`), border (`border-neutral-500`)
- [ ] T006 [P] [CA-01] Verify Label subpart typography: `font-sans-medium text-body text-neutral-300`
- [ ] T007 [CA-01] Verify compound pattern: `AppCheckbox.Indicator` and `AppCheckbox.Label` exported correctly

### CA-02: Visual States

**Goal**: All states display correct styles per Design System

- [ ] T008 [P] [CA-02] Verify unchecked state: border only (`border-neutral-500`), no dot
- [ ] T009 [P] [CA-02] Verify checked state: border + orange inset dot (`h-2 w-2 bg-orange-400 rounded-full`)
- [ ] T010 [CA-02] Verify focus state: `bg-neutral-900` + focus ring via `pencilFocusRingWithBgClasses`
- [ ] T011 [CA-02] Verify disabled state: `opacity-50` on root via `data-[disabled=true]:opacity-50`

### CA-03: Behavioral Consistency

**Goal**: Component behavior matches design specification

- [ ] T012 [P] [CA-03] Verify onChange callback fires on press (not disabled)
- [ ] T013 [P] [CA-03] Verify isChecked controlled state works correctly
- [ ] T014 [CA-03] Verify defaultIsChecked uncontrolled state works correctly
- [ ] T015 [CA-03] Verify isIndeterminate state is passed to Gluestack correctly

### CA-04: Backward Compatibility

**Goal**: Existing scenarios continue working without regressions

- [ ] T016 [P] [CA-04] Run full test suite: `npm test -- app-checkbox.test.tsx`
- [ ] T017 [P] [CA-04] Verify compound pattern usage in consuming components (grep for AppCheckbox usage)
- [ ] T018 [CA-04] Test manually: render checkbox with all props combinations (value, isChecked, onChange, isDisabled, isInvalid)

---

## Phase 3: Accessibility Verification

**Goal**: Confirm accessibility meets Constitution requirements

- [ ] T019 [P] Verify checkbox role via Gluestack (`role="checkbox"`)
- [ ] T020 [P] Verify accessibilityState exposes `checked` and `disabled`
- [ ] T021 Verify keyboard navigation: Tab to focus, Enter/Space to toggle
- [ ] T022 Verify focus indicator visible on native and web platforms

---

## Phase 4: Polish & Documentation

**Purpose**: Final verification and documentation updates

- [ ] T023 [P] Update spec.md in specs/005-checkbox-refactor if any findings need documentation
- [ ] T024 [P] Verify data-model.md verification checklist is complete
- [ ] T025 [P] Ensure quickstart.md examples are valid and working
- [ ] T026 Run final test suite to confirm no regressions
- [ ] T027 [P] Generate screenshot of component (if Pencil screenshot tool available) for documentation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies - can start immediately
- **Phase 2 (CA Verification)**: Depends on Phase 1 completion
- **Phase 3 (Accessibility)**: Depends on Phase 2 completion
- **Phase 4 (Polish)**: Depends on Phase 3 completion

### Within Phase 2

- Tasks T004-T007 (CA-01) can run in parallel
- Tasks T008-T011 (CA-02) can run in parallel
- Tasks T012-T015 (CA-03) can run in parallel
- Tasks T016-T018 (CA-04) can run in parallel

### Parallel Opportunities

All [P] marked tasks can run in parallel since they verify different aspects:
- CA-01 structure verification tasks (T004-T007)
- CA-02 visual state verification tasks (T008-T011)
- CA-03 behavior verification tasks (T012-T015)
- CA-04 compatibility verification tasks (T016-T018)

---

## Parallel Example: Phase 2 Verification

```bash
# Run all CA-01 structure checks in parallel:
Task: "Verify Root component structure"
Task: "Verify Indicator subpart dimensions and styling"
Task: "Verify Label subpart typography"
Task: "Verify compound pattern exports"

# Run all CA-02 visual state checks in parallel:
Task: "Verify unchecked state visual"
Task: "Verify checked state visual"
Task: "Verify focus state visual"
Task: "Verify disabled state visual"
```

---

## Implementation Strategy

### Verification-First Approach

1. Complete Phase 1: Setup & test environment verification
2. Complete Phase 2: Verify all acceptance criteria (CA-01 through CA-04)
3. Complete Phase 3: Accessibility verification
4. Complete Phase 4: Polish and documentation

### Expected Outcome

Since research indicates implementation already aligns with design system, all verification tasks should pass. Any failures indicate actual gaps that need resolution.

### If Verification Passes

- Component requires no code changes
- Documentation confirms alignment
- Tasks complete successfully

### If Verification Fails

- Identify specific gap between implementation and spec
- Create additional task to fix the gap
- Re-verify after fix

---

## Notes

- **[P]** tasks = different verification aspects, no dependencies on each other
- **[Story]** labels map to acceptance criteria (CA-01, CA-02, CA-03, CA-04) from feature specification
- Each verification task should confirm a specific aspect of the design system alignment
- All tests should pass if implementation is correctly aligned (as research indicates)
- Stop at any phase to review findings if unexpected failures occur