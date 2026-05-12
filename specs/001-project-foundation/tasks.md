# Tasks: Feature 01 — Setup inicial e fundação técnica

**Input**: Design documents from `specs/001-project-foundation/`  
**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/`, `quickstart.md`

**Tests**: Não solicitados na spec — sem fase de testes por user story. Validação manual via `expo-doctor` e `quickstart.md` na fase final.

**Organization**: Fases por infra partilhada → fundação bloqueante → user stories (P1 → P3) → polish.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Pode correr em paralelo (ficheiros distintos, sem dependência de tarefas incompletas na mesma fase quando marcado)
- **[Story]**: Apenas nas fases de user story (`[US1]`, `[US2]`, `[US3]`)
- Caminhos relativos à raiz do repositório

## Path Conventions

App Expo com código em `src/`, rotas em `src/app/`, features em `src/features/<nome>/`.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Inicializar projeto Expo SDK 54, TypeScript, tooling e árvore de pastas.

- [x] T001 Create Expo TypeScript scaffold at repo root: `package.json`, `app.json`, `tsconfig.json` (extends `expo/tsconfig.base`), `.gitignore` per `specs/001-project-foundation/plan.md`
- [x] T002 Align Expo SDK 54 and install core runtime: run `npx expo install expo react react-native react-native-web react-dom` and `npx expo install expo-router` so versions match SDK 54
- [x] T003 [P] Create directory tree `src/app/`, `src/features/overview/`, `src/features/transactions/`, `src/features/budgets/`, `src/features/pots/`, `src/features/recurring-bills/`, `src/components/ui/`, `src/components/layout/`, `src/components/feedback/`, `src/services/`, `src/stores/`, `src/hooks/`, `src/utils/`, `src/types/`, `src/constants/`, `src/assets/`, `src/lib/`, `src/tests/` (use `.gitkeep` in empty leaves)
- [x] T004 [P] Add ESLint + Prettier at repo root: `eslint.config.js` (flat + `eslint-config-expo`), `.prettierrc`, and npm scripts `lint` / `format` in `package.json`
- [x] T005 [P] Add `jest.config.js` and `jest.setup.js` at repo root with Expo Jest preset per `specs/001-project-foundation/research.md`
- [x] T006 Configure NativeWind v4 in `tailwind.config.js`, `babel.config.js`, and project CSS entry (e.g. `global.css`) per NativeWind + Expo SDK 54 docs
- [x] T007 Install Gluestack UI packages per current official guide; add `src/lib/providers/GluestackAppProvider.tsx` wrapping `GluestackUIProvider` for use in `src/app/_layout.tsx`
- [x] T008 Add Zustand and create non-domain store stub `src/stores/ui-preferences.store.ts` (e.g. theme preference only)
- [x] T009 Add `expo-dev-client` and `react-native-mmkv`; add `src/lib/mmkv.ts` factory; document that Expo Go may not suffice for MMKV in `README.md` at repo root
- [x] T010 Add `expo-secure-store` and thin wrapper `src/lib/secure-storage.ts` (no real secrets in this feature)
- [x] T011 Add `react-hook-form`, `zod`, `@hookform/resolvers` to `package.json`; add example non-financial schema `src/lib/schemas/example.ts` and resolver usage comment
- [x] T012 Run `npx expo install react-native-reanimated date-fns`; configure `babel.config.js` plugin order for Reanimated per Expo documentation

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shell de navegação, providers e convenções de importação — **bloqueia** trabalho de user stories.

**CRITICAL**: Nenhuma user story começa até esta fase estar completa.

- [x] T013 Implement root layout `src/app/_layout.tsx` with Expo Router `Stack`, `GluestackAppProvider`, and any required SafeArea/NativeWind provider wiring
- [x] T014 Add `src/app/index.tsx` that renders default export from `src/features/overview/screens/OverviewPlaceholderScreen.tsx`
- [x] T015 [P] Configure path aliases in `tsconfig.json` (e.g. `@/*` → `src/*`) and ensure Metro resolves paths via `babel.config.js` or `metro.config.js` as required by toolchain
- [x] T016 [P] Create mobile-first screen wrapper `src/components/layout/AppScreen.tsx` for placeholder screens
- [x] T017 [P] Create `src/components/ui/index.ts` barrel exporting the minimal Gluestack primitives used by placeholders (e.g. `Button`, `Text`, `Box`)

**Checkpoint**: App abre no entry `index` com providers; rotas adicionais podem ser ligadas.

---

## Phase 3: User Story 1 — Nova capacidade sem reinventar estrutura (Priority: P1) MVP

**Goal**: Documentação de mapa + rotas finas em `src/app/*` + ecrãs placeholder por feature, provando colocação previsível (FR-001, FR-004, FR-007).

**Independent Test**: Cenário de uma linha (nome + tipo de ecrã + formulário futuro): três devs apontam para o mesmo `src/features/<feature>/screens/` e `src/app/<route>/` sem contradição material; revisão com `docs/STRUCTURE.md`.

### Implementation for User Story 1

- [x] T018 [US1] Write `docs/STRUCTURE.md` documenting the `src/` tree, rules for new files under `src/app/`, feature-first rules per `specs/001-project-foundation/contracts/feature-module-layout.md`, and cross-cutting placement (`src/lib`, `src/services`)
- [x] T019 [P] [US1] Implement `src/features/overview/screens/OverviewPlaceholderScreen.tsx` using `AppScreen` + Gluestack text/button with `accessibilityLabel` on interactive elements
- [x] T020 [P] [US1] Implement `src/features/transactions/screens/TransactionsPlaceholderScreen.tsx`, `src/features/budgets/screens/BudgetsPlaceholderScreen.tsx`, `src/features/pots/screens/PotsPlaceholderScreen.tsx`, `src/features/recurring-bills/screens/RecurringBillsPlaceholderScreen.tsx` using the same `AppScreen` pattern
- [x] T021 [US1] Add thin Expo Router entries `src/app/transactions/index.tsx`, `src/app/budgets/index.tsx`, `src/app/pots/index.tsx`, `src/app/recurring-bills/index.tsx` each default-exporting only its feature screen (no business logic)
- [x] T022 [US1] Update root `README.md` with links to `docs/STRUCTURE.md`, `specs/001-project-foundation/plan.md`, and how to run `npx expo start`

**Checkpoint**: Cinco áreas de produto têm skeleton navegável; mapa de estrutura publicado.

---

## Phase 4: User Story 2 — Evoluir componente com clareza de impacto (Priority: P2)

**Goal**: Taxonomia de componentes + checklist de impacto + exemplos canônicos shared vs feature-local (FR-002, FR-003).

**Independent Test**: Tech lead classifica três exemplos (shared wrapper, layout, feature component) em menos de 5 minutos usando `docs/COMPONENT-TAXONOMY.md` + checklist.

### Implementation for User Story 2

- [x] T023 [US2] Write `docs/COMPONENT-TAXONOMY.md` defining reusable vs feature-specific vs layout vs structural vs form vs feedback, and reuse vs duplicate decision cues (edge cases from spec)
- [x] T024 [US2] Write `docs/SHARED-UI-CHANGES-CHECKLIST.md` for changes under `src/components/ui/*` (consumers to verify, smoke platforms)
- [x] T025 [P] [US2] Add shared wrapper `src/components/ui/AppText.tsx` (Gluestack `Text` + default props) used by at least two placeholder screens
- [x] T026 [US2] Add feature-only component `src/features/overview/components/OverviewHint.tsx` imported only from `OverviewPlaceholderScreen.tsx` to demonstrate taxonomy boundary

**Checkpoint**: Alterações em UI partilhada têm processo documentado; exemplo de UI só de feature existe.

---

## Phase 5: User Story 3 — Onboarding técnico (Priority: P3)

**Goal**: Guia de leitura ≤45 min + exercício guiado + quiz de oito perguntas (spec US3).

**Independent Test**: Novo integrante responde ao quiz com ≤1 erro após seguir `docs/ONBOARDING.md`.

### Implementation for User Story 3

- [x] T027 [US3] Write `docs/ONBOARDING.md` with ordered reading (`docs/STRUCTURE.md`, `docs/COMPONENT-TAXONOMY.md`, `specs/001-project-foundation/contracts/`) and a 15-minute guided exercise (find `AppScreen`, one feature module, one shared primitive)
- [x] T028 [US3] Write `docs/ONBOARDING-QUIZ.md` with eight questions + answer key for tech lead sign-off

**Checkpoint**: Onboarding reprodutível sem improviso.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: ADRs leves, a11y baseline, doctor, quickstart validation.

- [x] T029 [P] Add `docs/adr/README.md` and template `docs/adr/0001-record-architecture-decisions.md` explaining when to add ADRs per FR-008
- [x] T030 [P] Verify all files under `src/features/*/screens/*.tsx` meet `accessibilityLabel`/focus basics per `specs/001-project-foundation/contracts/a11y-baseline.md`; patch gaps
- [x] T031 Run `npx expo-doctor` at repo root; fix issues or record waivers inline in `specs/001-project-foundation/quickstart.md`
- [x] T032 Follow `specs/001-project-foundation/quickstart.md` end-to-end on a clean clone or clean `node_modules`; update `quickstart.md` if any command or path is wrong

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 → Phase 2**: Sequential (tooling before shell).
- **Phase 2 → Phases 3–5**: Phase 2 blocks all user stories.
- **User Stories**: US1 should complete before US2/US3 for sensible docs flow (US2/US3 can overlap only after T022 if desired, but US3 docs reference US1/US2 outputs — run US1 then US2 then US3 for fewer conflicts).
- **Phase 6**: After US1–US3 (or at minimum after US1 for doctor on runnable app).

### User Story Dependencies

- **US1 (P1)**: No dependency on US2/US3.
- **US2 (P2)**: Best after US1 placeholders exist (examples reference real paths).
- **US3 (P3)**: Depends on US1 + US2 documentation existing.

### Parallel Opportunities

- T003–T005, T015–T017, T019–T020, T025, T029–T030 can run in parallel within their phase once prior sequential tasks in that phase complete.

---

## Parallel Example: Phase 1 (after T002)

```text
T003 Create src/ directory tree
T004 ESLint + Prettier files
T005 Jest config files
```

---

## Implementation Strategy

### MVP First (User Story 1 only)

1. Complete Phase 1 and Phase 2.
2. Complete Phase 3 (US1) — structure + routes + `docs/STRUCTURE.md`.
3. Stop and run independent test for US1; demo navigation between placeholders.

### Incremental Delivery

1. Setup + Foundational → runnable shell.
2. Add US1 → documented map + feature routes.
3. Add US2 → taxonomy + shared change checklist + examples.
4. Add US3 → onboarding + quiz.
5. Polish → ADR + a11y pass + doctor + quickstart validation.

---

## Notes

- IDs são sequenciais T001–T032; marcar `[P]` só quando seguro em paralelo.
- Persistência MMKV apenas para preferências técnicas — sem dados de negócio (alinhado à spec).
- Não adicionar autenticação, API remota, ou modelos financeiros nesta lista.
