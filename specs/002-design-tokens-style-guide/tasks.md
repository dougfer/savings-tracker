# Tasks: Style Guide e design tokens (NativeWind + Figma)

**Input**: Design documents from `/specs/002-design-tokens-style-guide/`  
**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/](./contracts/), [quickstart.md](./quickstart.md)

**Tests**: Não solicitados na spec; esta lista não inclui tarefas de teste automatizado obrigatórias.

**Organization**: Fases por infra partilhada (Setup + Foundational) e depois **uma fase por user story** (P1→P3), mais Polish.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Pode correr em paralelo (ficheiros distintos, sem dependência de trabalho incompleto noutro ficheiro da mesma onda).
- **[USn]**: Apenas nas fases de user story (Phase 3+).
- Caminhos **absolutos relativos à raiz do repositório** onde aplicável.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Inventário do estado atual do tema e do tooling NativeWind/Gluestack.

- [x] T001 Audit NativeWind and Gluestack wiring in `tailwind.config.js`, `metro.config.js`, `global.css`, `babel.config.js`, `src/lib/providers/GluestackAppProvider.tsx`, and `src/components/ui/AppText.tsx`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Extrair valores do Figma para ficheiros de exportação versionáveis e consolidar **`tailwind.config.js`** + carregamento de fontes antes de qualquer história de utilizador depender de classes semânticas.

**⚠️ CRITICAL**: Nenhuma fase de user story deve assumir classes novas até T007–T008 estarem consistentes com os exports do Figma.

- [x] T002 Create `specs/002-design-tokens-style-guide/exports/README.md` describing how exports map to `tailwind.config.js` and to `contracts/figma-source-map.md`
- [x] T003 [P] Author color values and semantic role names from Figma node `271-2936` in `specs/002-design-tokens-style-guide/exports/colors-from-figma.md`
- [x] T004 [P] Author typography scale (Inter + Bricolage Grotesque) from Figma node `271-2905` in `specs/002-design-tokens-style-guide/exports/typography-from-figma.md`
- [x] T005 [P] Author spacing scale from Figma node `271-3210` in `specs/002-design-tokens-style-guide/exports/spacing-from-figma.md`
- [x] T006 [P] Author radius scale from Figma node `271-3317` in `specs/002-design-tokens-style-guide/exports/radius-from-figma.md`
- [x] T007 Implement `theme.extend.colors` (semantic roles) in `tailwind.config.js` using only values documented in `specs/002-design-tokens-style-guide/exports/colors-from-figma.md`
- [x] T008 Implement `theme.extend.fontFamily`, `fontSize`, `fontWeight`, and `lineHeight` in `tailwind.config.js` using `specs/002-design-tokens-style-guide/exports/typography-from-figma.md`
- [x] T009 Implement `theme.extend.spacing` and `borderRadius` in `tailwind.config.js` using `specs/002-design-tokens-style-guide/exports/spacing-from-figma.md` and `specs/002-design-tokens-style-guide/exports/radius-from-figma.md`
- [x] T010 Add font files under `assets/fonts/` for Inter and Bricolage Grotesque weights required by `exports/typography-from-figma.md` and load them with `expo-font` / `useFonts` from `src/app/_layout.tsx` per `specs/002-design-tokens-style-guide/research.md`

**Checkpoint**: Tokens disponíveis via NativeWind (`className`) e fontes carregadas na arranque da app.

---

## Phase 3: User Story 1 — Consultar tokens antes de desenhar ou rever uma tela (Priority: P1) 🎯 MVP

**Goal**: Referência única (legível por design/produto) + paridade nome token ↔ Tailwind para cores, tipografia, espaçamento e raios.

**Independent Test**: Revisor externo consegue auditar um wireframe só com `docs/style-guide.md` + exports em `specs/002-design-tokens-style-guide/exports/` e `tailwind.config.js`.

### Implementation for User Story 1

- [x] T011 [US1] Create stakeholder Style Guide in `docs/style-guide.md` documenting semantic color roles, typography hierarchy, spacing scale usage, radius by component category, and touch/density notes per FR-002–FR-007 and `contracts/design-token-contract.md`
- [x] T012 [US1] Add NativeWind `className` examples for card and list layouts to `docs/style-guide.md` referencing keys from `tailwind.config.js`

**Checkpoint**: US1 entregue — guia + tokens utilizáveis em código.

---

## Phase 4: User Story 2 — Alinhar design e desenvolvimento numa decisão visual (Priority: P2)

**Goal**: Elevação/sombras e checklist de revisão para resolver divergências citando o mesmo documento.

**Independent Test**: Duas pessoas resolvem “sombra do modal” e “espaço ícone–rótulo” só com `docs/style-guide.md` e contratos.

### Implementation for User Story 2

- [x] T013 [US2] Add ordered elevation/shadow ladder section to `docs/style-guide.md` and implement matching `theme.extend.boxShadow` entries in `tailwind.config.js` only after values are confirmed in Figma or approved in writing by design; if missing, document explicit “pending” state in `docs/style-guide.md` and `contracts/figma-source-map.md` without inventing shadows
- [x] T014 [US2] Add design–dev review checklist subsection to `docs/style-guide.md` with bullets mapping to `specs/002-design-tokens-style-guide/contracts/design-token-contract.md` and contrast pointers to `specs/001-project-foundation/contracts/a11y-baseline.md`

**Checkpoint**: US2 entregue — alinhamento sombra/revisão documentado.

---

## Phase 5: User Story 3 — Evoluir o sistema sem quebrar o existente (Priority: P3)

**Goal**: Governança de tokens (novo vs reutilizar, depreciação, comunicação).

**Independent Test**: Exercício “propor token X” segue secção de governança em `docs/style-guide.md` sem ambiguidade.

### Implementation for User Story 3

- [x] T015 [US3] Add governance section (new token vs reuse, proposal flow, deprecation window) to `docs/style-guide.md` per FR-009
- [x] T016 [US3] Align `specs/002-design-tokens-style-guide/contracts/design-token-contract.md` governance bullets with `docs/style-guide.md` and add changelog/version expectation for token changes

**Checkpoint**: US3 entregue — processo escalável documentado.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Sincronizar Gluestack com Tailwind, migrar componentes partilhados, validar qualidade.

- [x] T017 [P] Extend Gluestack theme so `$` color tokens match semantic values from `tailwind.config.js` via new `src/lib/gluestack/gluestack-ui.config.ts` (or equivalent) consumed from `src/lib/providers/GluestackAppProvider.tsx`
- [x] T018 [P] Update default text styling in `src/components/ui/AppText.tsx` to use semantic Gluestack tokens or NativeWind `className` per `docs/style-guide.md`
- [x] T019 Run `npm run lint` and `npm run test` from repository root and fix issues caused by token or provider changes
- [x] T020 Refresh `specs/002-design-tokens-style-guide/quickstart.md` with final file names (`exports/*`, `docs/style-guide.md`) and font-loading notes post–T010

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1** → **Phase 2** → **Phases 3–5 (user stories)** → **Phase 6 (Polish)**.
- **Phase 2**: T003–T006 can run in parallel; **T007** after T003; **T008** after T004; **T009** after T005 and T006; **T010** can overlap scheduling-wise but must reference final typography names from T008 (load fonts matching configured `fontFamily` keys).

### User Story Dependencies

- **US1**: Starts after Phase 2 checkpoint (T007–T010 complete for core palette/type/space/radius + fonts).
- **US2**: Starts after US1 baseline doc exists (`docs/style-guide.md` from T011–T012) to extend same guide.
- **US3**: Starts after US2 or in parallel with US2 **only** if edits to `design-token-contract.md` are coordinated to avoid merge conflicts; recommended order US1 → US2 → US3.

### Within Each User Story

- US1: narrative guide (T011) then examples (T012).
- US2: shadows implementation (T013) references doc updates; checklist (T014) can follow T013.
- US3: `docs/style-guide.md` governance (T015) then contract sync (T016).

### Parallel Opportunities

- **Phase 2**: T003, T004, T005, T006 in parallel (four separate markdown files under `specs/002-design-tokens-style-guide/exports/`).
- **Phase 6**: T017 and T018 in parallel (different primary files) once `tailwind.config.js` is stable.
- **Cross-story**: Not recommended in parallel for the same `docs/style-guide.md` file between US1–US3; assign one owner or sequence merges.

---

## Parallel Example: Phase 2 exports

```text
Task T003: specs/002-design-tokens-style-guide/exports/colors-from-figma.md
Task T004: specs/002-design-tokens-style-guide/exports/typography-from-figma.md
Task T005: specs/002-design-tokens-style-guide/exports/spacing-from-figma.md
Task T006: specs/002-design-tokens-style-guide/exports/radius-from-figma.md
```

---

## Implementation Strategy

### MVP First (User Story 1 only)

1. Complete Phase 1 (T001) and Phase 2 (T002–T010).  
2. Complete Phase 3 / US1 (T011–T012).  
3. **STOP and VALIDATE**: auditoria manual com `docs/style-guide.md` + `tailwind.config.js`.

### Incremental Delivery

1. Setup + Foundational → tokens e fontes prontos.  
2. US1 → guia de consulta completo para o núcleo (cor, tipo, espaço, raio).  
3. US2 → elevação + checklist de revisão.  
4. US3 → governança + contrato.  
5. Polish → Gluestack/AppText + lint/test + quickstart.

### Parallel Team Strategy

- Após T002: quatro perfis preenchem T003–T006 em paralelo.  
- Um perfil consolida T007–T009 em série.  
- Fontes (T010) podem preparar-se em paralelo aos T003–T006 **desde** que a lista de pesos esteja fechada no Figma.

---

## Notes

- Não introduzir valores que não existam no Figma; em dúvida, parar e alinhar com design (ver `research.md`).  
- `[P]` apenas quando os ficheiros tocados não entram em conflito.  
- IDs sequenciais T001–T020; total **20** tarefas (**4** com `[P]` na Phase 2, **2** na Polish).  
- Contagem por story: **US1** = 2 tarefas (T011–T012); **US2** = 2 (T013–T014); **US3** = 2 (T015–T016); Setup = 1; Foundational = 9; Polish = 4.
