# Implementation Plan: Shared UI Components

**Branch**: `003-shared-ui-components` | **Date**: 2026-05-13 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `specs/003-shared-ui-components/spec.md` + user's detailed planning instructions with Figma URLs and stack constraints.

## Summary

Implement 7 shared, reusable UI components (Button, Input, Checkbox, Avatar, ProgressBar, Dropdown Menu, Modal) as the **foundational UI layer** of the Savings Tracker. Each component wraps **Gluestack UI v3 primitives** with project-specific defaults, styled exclusively via **NativeWind `className`** using design tokens from `tailwind.config.js` (spec 002). All components follow the **compound component pattern** (`compound-components.mdc`), are cross-platform (iOS, Android, Web), and meet the project's accessibility baseline (WCAG 2.1 AA).

## Technical Context

**Language/Version**: TypeScript ~5.9 (strict)  
**Primary Dependencies**: Expo SDK 54, React Native 0.81, React 19, `@gluestack-ui/themed` ^1.1.73, NativeWind ^4.2, Tailwind CSS ^3.4  
**Storage**: N/A (UI components, no persistence)  
**Testing**: Jest ^29 + jest-expo ~54 + @testing-library/react-native ^13  
**Target Platform**: iOS, Android, Web (Expo Router + Metro)  
**Project Type**: mobile-app (universal Expo)  
**Performance Goals**: Components render in < 16ms (60fps); no unnecessary re-renders; minimal bundle impact  
**Constraints**: Constitution (a11y, mobile-first, clarity, performance); compound pattern enforced; no hardcoded visual values; Figma as visual authority  
**Scale/Scope**: 7 components, ~7-14 files under `src/components/ui/`, colocated tests

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Princípio | Status | Notas |
|-----------|--------|-------|
| Produto | ✅ | Componentes base possibilitam construção rápida de features de poupança; não são funcionalidade vazia. |
| Clareza e confiança | ✅ | ProgressBar e estados visuais consistentes reforçam percepção de progresso e controle. |
| UX | ✅ | Componentes padronizados reduzem fricção; formulários previsíveis com Input/Checkbox. |
| UI | ✅ | Hierarquia via variantes (primary/secondary/destructive); tokens eliminam inconsistência ad-hoc. |
| Conteúdo | ✅ | Componentes são agnósticos de copy; labels/placeholders são responsabilidade do consumidor. |
| Mobile-first | ✅ | Touch targets >= 44pt; sizing mobile-first com suporte a Web como secundário. |
| Acessibilidade | ✅ | Gluestack WAI-ARIA base + contrato a11y-baseline; keyboard, focus, roles, contrast. |
| Performance | ✅ | Wrap fino sobre Gluestack; sem animação pesada; NativeWind build-time; sem re-render desnecessário. |
| Técnico | ✅ | Compound pattern, separação lógica/apresentação, TypeScript estrito, kebab-case, displayName. |

**Pós-Phase 1:** Nenhuma violação que exija Complexity Tracking.

## Project Structure

### Documentation (this feature)

```text
specs/003-shared-ui-components/
├── plan.md                          # This file
├── spec.md                          # Feature specification
├── research.md                      # Phase 0: technology decisions
├── data-model.md                    # Phase 1: component API models
├── quickstart.md                    # Phase 1: usage guide
├── contracts/
│   ├── README.md
│   ├── component-api-contract.md    # Public API surface
│   ├── figma-component-map.md       # Figma node → component mapping
│   └── a11y-baseline.md             # Accessibility requirements
└── checklists/
    └── requirements.md              # Spec quality checklist
```

### Source Code (repository root)

```text
src/components/ui/
├── app-button/
│   ├── app-button.tsx               # AppButton compound component
│   ├── app-button.test.tsx          # Behavior tests
│   └── index.ts                     # Barrel: export AppButton
├── app-input/
│   ├── app-input.tsx                # AppInput compound component
│   ├── app-input.test.tsx
│   └── index.ts
├── app-checkbox/
│   ├── app-checkbox.tsx             # AppCheckbox compound component
│   ├── app-checkbox.test.tsx
│   └── index.ts
├── app-avatar.tsx                   # AppAvatar compound (single file)
├── app-avatar.test.tsx
├── app-progress-bar.tsx             # AppProgressBar compound (single file)
├── app-progress-bar.test.tsx
├── app-dropdown-menu/
│   ├── app-dropdown-menu.tsx        # AppDropdownMenu compound component
│   ├── app-dropdown-menu.test.tsx
│   └── index.ts
├── app-modal/
│   ├── app-modal.tsx                # AppModal compound component
│   ├── app-modal.test.tsx
│   └── index.ts
├── AppText.tsx                      # Existing (legacy filename)
├── AppText.test.tsx                 # Existing
└── index.ts                         # Barrel: re-exports all compound roots
```

**Structure Decision:** Components live under `src/components/ui/` per the existing architecture. Complex compounds (3+ subparts with context) get a subfolder; simpler ones stay as single files. All follow kebab-case naming per `feature-first-architecture.mdc`.

## Complexity Tracking

> Not applicable — no constitution violations requiring justification.

## Figma Traceability

| Component | Node ID | Status |
|-----------|---------|--------|
| Button | `271:3896` | Pending extraction (API 429 during planning) |
| Checkbox | `291:1557` | Pending extraction |
| Dropdown Menu | `271:996` | Pending extraction |
| ProgressBar | `297:1695` | Pending extraction |
| Input | `307:1217` | Pending extraction |
| Avatar | `357:8000` | Pending extraction |

Full URLs and extraction protocol: `contracts/figma-component-map.md`.

## Key Technical Decisions (from research.md)

| # | Decision | Rationale |
|---|----------|-----------|
| 1 | Wrap Gluestack UI primitives, don't rebuild | Get a11y + cross-platform for free; avoid reinventing focus management, ARIA roles, platform abstractions |
| 2 | NativeWind `className` as sole styling mechanism | Single source of truth in `tailwind.config.js`; consistent with spec 002 and existing components |
| 3 | `App` prefix for all components | Prevents import collisions with Gluestack; matches existing `AppText`/`AppScreen` pattern |
| 4 | Compound pattern via `Object.assign` + context | Per `compound-components.mdc`; composition over configuration |
| 5 | Figma extraction as first implementation task | Values must come from design (constitution); API was rate-limited during planning |
| 6 | Menu component for Dropdown (may swap to Actionsheet if Figma shows bottom-sheet) | Decision deferred to Figma extraction |
| 7 | Colocated tests with RNTL | Behavior-focused testing per project conventions |

## Phase 0 & Phase 1 (executed in this plan)

- **Phase 0:** `research.md` — 11 decisions covering component base strategy, compound pattern approach, styling, file org, cross-platform, a11y, dropdown/menu choice, modal animation, naming, testing.
- **Phase 1:** `data-model.md` (7 component API models with props, subparts, states, token mappings), `contracts/*` (API contract, Figma map, a11y baseline), `quickstart.md` (usage guide with examples for all 7 components), updated agent context.

## Next Step

Execute **`/speckit-tasks`** to generate `tasks.md` with implementation tasks ordered by dependency:
1. Figma extraction for all 6 component nodes
2. P1 components: AppButton → AppInput → AppCheckbox
3. P2 components: AppAvatar → AppProgressBar → AppDropdownMenu
4. P3 component: AppModal
5. Barrel update + integration tests
6. Visual review against Figma
