# Tasks: Criar Conta

**Input**: Design documents from `/specs/008-criar-conta/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, quickstart.md

**Tests**: Not explicitly requested — no test tasks included.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Extract QuoteSection to shared components directory for reuse by login and sign-up

- [x] T001 [P] Create `src/components/ui/quote-section/quote-section.tsx` — extract QuoteSection from `src/features/login/components/quote-section.tsx`, add `quote` and `attribution` props, keep SVG gradient and VectorPatternIcon decoration
- [x] T002 [P] Create `src/components/ui/quote-section/index.ts` — barrel export for QuoteSection
- [x] T003 Replace body of `src/features/login/components/quote-section.tsx` with re-export from shared component (update only the file, keeping import path the same for consumers)
- [x] T004 Update import path in `src/features/login/screens/login-screen.tsx` to use shared QuoteSection from `@/components/ui/quote-section` and pass `quote`/`attribution` props matching original content ("The goal isn't to be rich...", "— Morgan Housel")
- [x] T005 Add QuoteSection export to `src/components/ui/index.ts`

**Checkpoint**: QuoteSection is now a shared component, login screen still works identically

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core structure that MUST be complete before user story implementation

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T006 Create zod schema in `src/lib/schemas/sign-up.schema.ts` — define `SignUpFormData` type with fields: name (min 1 char, trim), email (email format, trim), password (min 8 chars), confirmPassword (must match password, via `.refine()`)
- [x] T007 Create `src/features/sign-up/screens/sign-up-screen.tsx` — responsive layout with `bg-neutral-900`, `flex-col lg:flex-row`, import shared QuoteSection for `lg:` breakpoint with sign-up quote ("Do not save what is left...", "– Warren Buffett"), form wrapper with `w-full lg:max-w-screen-sm lg:shrink-0`
- [x] T008 Update `src/app/sign-up/index.tsx` — replace placeholder with re-export: `export { default } from '@/features/sign-up/screens/sign-up-screen'`

**Checkpoint**: Foundation ready — route renders SignUpScreen with responsive layout and empty form area

---

## Phase 3: User Story 1 + 2 — Formulário com validação (Priority: P1) 🎯 MVP

**Goal**: User fills in name, email, password, confirm password and submits. Form validates email format, password length (8+), confirm password match, and name required. Inline validation messages appear on blur.

**Independent Test**: Navigate to `/sign-up`, fill all 4 fields with valid data, tap "Criar conta", verify success feedback appears. Test with invalid data: leave name empty (error on blur), type invalid email (error on blur), type password < 8 chars (error on blur), type mismatched confirm password (error on blur).

### Implementation for User Story 1 + 2

- [x] T009 [US1] Create `src/features/sign-up/components/sign-up-form.tsx` — implement form with `useForm<SignUpFormData>({ resolver: zodResolver(signUpSchema), mode: 'onBlur' })`, render fields using `Controller` + `AppInput`:
- [x] T010 [US1] Add "Criar conta" button in `src/features/sign-up/components/sign-up-form.tsx` — `AppButton variant="primary" className="w-full h-[54px]"`, trigger `handleSubmit`, on valid show success feedback (text change or icon) for 1.5s, then reset
- [x] T011 [US2] Add inline validation error display in `src/features/sign-up/components/sign-up-form.tsx` — map `formState.errors` to `AppInput.HelperText variant="error"` below each field, display when field has error (touched + invalid). Error messages: "Nome é obrigatório", "E-mail inválido", "A senha deve ter no mínimo 8 caracteres", "As senhas não conferem"
- [x] T012 [P] [US1] Integrate SignUpForm into SignUpScreen — import and render `SignUpForm` inside `src/features/sign-up/screens/sign-up-screen.tsx`, add Logo at top of form area with heading "Criar conta" and subtitle "Preencha os dados para criar sua conta"
- [x] T013 [US1] Configure keyboard types in form fields per FR-14 — name: `default`, email: `email-address`, both password fields: `default`; set `autoComplete` and `textContentType` appropriately

**Checkpoint**: Sign-up form is functional — all 4 fields accept input, validation errors appear on blur, submit with valid data shows success feedback

---

## Phase 4: User Story 3 — Visualizar/ocultar senha (Priority: P1)

**Goal**: User can toggle password visibility on both password fields independently via eye icons.

**Independent Test**: Tap the eye icon on the password field — text becomes visible and icon changes. Tap again — text is masked. Repeat on confirm password field independently.

### Implementation for User Story 3

- [x] T014 [US3] Add password visibility toggle to password field in `src/features/sign-up/components/sign-up-form.tsx` — add state `isPasswordVisible`, `Pressable` with `EyeOnIcon`/`EyeOffIcon` as `AppInput` right slot, toggle `secureTextEntry` and icon
- [x] T015 [US3] Add password visibility toggle to confirm password field in `src/features/sign-up/components/sign-up-form.tsx` — separate state `isConfirmPasswordVisible`, same pattern, independent toggle

**Checkpoint**: Both password fields have independent visibility toggles with icon swap

---

## Phase 5: User Story 4 — Navegação para login (Priority: P2)

**Goal**: User who already has an account finds the "Já tem conta? Entrar" link and navigates to login.

**Independent Test**: Tap "Já tem conta? Entrar" — verify navigation to `/login`.

### Implementation for User Story 4

- [x] T016 [US4] Add navigation link in `src/features/sign-up/components/sign-up-form.tsx` — below the submit button, add row with text "Já tem conta?" (neutral-300) + `Link href="/login/index"` with `Pressable` text "Entrar" (orange-400, semibold)

**Checkpoint**: Link to login works, user navigates from sign-up to login

---

## Phase 6: User Story 5 — Acessibilidade (Priority: P2)

**Goal**: All elements are keyboard-navigable with logical tab order, announced correctly by screen readers.

**Independent Test**: Navigate entire screen using only Tab key — verify focus order: name → email → password → eye icon → confirm password → eye icon → "Criar conta" → "Já tem conta? Entrar". Test with screen reader — verify labels, states, and error messages are announced.

### Implementation for User Story 5

- [x] T017 [US5] Add accessibility attributes to all form fields in `src/features/sign-up/components/sign-up-form.tsx` — `accessibilityLabel` on each `Controller` field, `accessibilityRole="button"` on password toggle pressables, descriptive labels for eye icons ("Mostrar senha" / "Ocultar senha")
- [x] T018 [US5] Ensure logical keyboard tab order in `src/features/sign-up/components/sign-up-form.tsx` — verify native focus order matches: name → email → password → eye icon → confirm password → eye icon → submit button → login link
- [x] T019 [US5] Add error announcement support in `src/features/sign-up/components/sign-up-form.tsx` — set `accessibilityLiveRegion="assertive"` on error container so screen readers announce validation errors automatically

**Checkpoint**: Screen is fully keyboard-navigable and screen reader compatible

---

## Phase 7: User Story 6 — Feedback visual de carregamento (Priority: P3)

**Goal**: When user taps "Criar conta", button shows loading state and all fields are disabled to prevent duplicate submissions.

**Independent Test**: Fill valid data, tap "Criar conta" — verify button shows spinner, all fields disabled. After ~1.5s — verify spinner stops, fields re-enabled.

### Implementation for User Story 6

- [x] T020 [US6] Add loading state to submit button in `src/features/sign-up/components/sign-up-form.tsx` — use `formState.isSubmitting`, pass `isLoading={isSubmitting}` to `AppButton`, disable all `AppInput.Field` via `editable={!isSubmitting}` during submission
- [x] T021 [US6] Implement simulated submit delay in `src/features/sign-up/components/sign-up-form.tsx` — `onSubmit` handler: await 1.5s Promise, then reset `isSubmitting`, show success text on button

**Checkpoint**: Button shows loading spinner during submit, fields are disabled, prevents double-submission

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Final refinements across all user stories

- [x] T022 [P] Verify responsive behavior in `src/features/sign-up/screens/sign-up-screen.tsx` — test mobile (375px), tablet (768px), desktop (1440px); ensure QuoteSection visible only on `lg:`, form centered on smaller screens
- [x] T023 [P] Verify cross-platform consistency — test on iOS simulator, Android emulator, and web browser; fix any visual discrepancies
- [x] T024 [P] Review all text content in `src/features/sign-up/components/sign-up-form.tsx` — ensure pt-BR, no placeholder copy, labels match design: "Nome", "E-mail", "Senha", "Confirmar senha", "Criar conta", "Já tem conta? Entrar"
- [x] T025 Run TypeScript check (`npx tsc --noEmit`) and lint (`pnpm run lint`); fix all errors
- [x] T026 [P] Update `src/components/ui/index.ts` barrel exports — verify QuoteSection is properly exported and all imports resolve

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup (T001, T002) for QuoteSection availability
- **User Story 1+2 (Phase 3)**: Depends on Foundational (T006 schema, T007 screen, T008 route) — BLOCKS all subsequent user stories
- **User Story 3 (Phase 4)**: Depends on Phase 3 (form component must exist)
- **User Story 4 (Phase 5)**: Depends on Phase 3 (form component must exist)
- **User Story 5 (Phase 6)**: Depends on Phase 3 (form component must exist)
- **User Story 6 (Phase 7)**: Depends on Phase 3 (form component must exist)
- **Polish (Phase 8)**: Depends on all desired user stories

### User Story Dependencies

- **US1+US2 (P1)**: Core form — no dependencies on other stories. MVP.
- **US3 (P1)**: Password toggle — modifies form component (T014, T015 on same file as US1). Sequential after US1.
- **US4 (P2)**: Login link — modifies form component. Sequential after US1.
- **US5 (P2)**: Accessibility — modifies form component + screen. Sequential after US1.
- **US6 (P3)**: Loading feedback — modifies form component. Sequential after US1.

### Within Each Phase

- T001 and T002 can run in parallel (Setup)
- T006, T007, T008 can run in parallel (Foundational)
- T009-T013 are sequential within Phase 3 (same file `sign-up-form.tsx`)
- T014-T015 are sequential within Phase 4 (same file)
- T016 is standalone in Phase 5
- T017-T019 are sequential within Phase 6 (same file)
- T020-T021 are sequential within Phase 7 (same file)
- T022-T026 can run in parallel (Polish)

### Parallel Opportunities

- Setup: T001 ∥ T002
- Foundational: T006 ∥ T007 ∥ T008
- Polish: T022 ∥ T023 ∥ T024 ∥ T026

---

## Parallel Example: Phase 2 (Foundational)

```bash
# Launch all foundational tasks together:
Task: "Create zod schema in src/lib/schemas/sign-up.schema.ts"
Task: "Create src/features/sign-up/screens/sign-up-screen.tsx"
Task: "Update src/app/sign-up/index.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1+2 Only)

1. Complete Phase 1: Setup (QuoteSection extraction)
2. Complete Phase 2: Foundational (schema, screen, route)
3. Complete Phase 3: US1+US2 (form with validation)
4. **STOP and VALIDATE**: Test form independently — fill all fields, verify validation errors, verify success feedback
5. Deploy/demo if ready

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. Add US1+US2 → Form with validation → Test → MVP!
3. Add US3 → Password visibility toggle → Test
4. Add US4 → Login navigation link → Test
5. Add US5 → Accessibility → Test
6. Add US6 → Loading feedback → Test
7. Polish → Final validation → Release

### Parallel Team Strategy

Single developer recommended due to file dependencies (most user stories touch `sign-up-form.tsx`). If multiple developers:
- Developer A: Phase 1 (QuoteSection) + Phase 2 (Foundational)
- Developer B: Phase 3 (US1+US2) — after Phase 2 done
- Developer A: Phase 4, 5, 6, 7 sequentially on same file

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story phase should leave the form in a testable state
- All text in pt-BR (português brasileiro)
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
