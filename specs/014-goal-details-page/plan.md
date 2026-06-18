# Implementation Plan: Goal Details Page

**Branch**: `014-goal-details-page` | **Date**: 2026-06-16 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/014-goal-details-page/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Implement a goal details screen that displays all information about a specific financial goal (name, dates, amounts, percentage, status), a visual progress indicator, a deposit history listing, and a deposit registration form for in-progress goals. Edit and Delete action buttons are present visually but non-functional in this phase. The feature uses mock data and replaces the existing placeholder route at `src/app/(logged)/goals/[id].tsx`.

## Technical Context

**Language/Version**: TypeScript 5.x (Strict mode), React 19.1, React Native 0.81.5 (New Architecture)
**Primary Dependencies**: Expo SDK 54, Expo Router v6, NativeWind 4.2.4 (Tailwind CSS), Gluestack UI v3, react-hook-form 7.54, zod 3.24, date-fns 4.1, Zustand 5
**Storage**: N/A (mock data only, no persistence in this phase)
**Testing**: Jest + @testing-library/react-native (existing pattern in `app-button.test.tsx`, `app-progress-bar.test.tsx`, etc.)
**Target Platform**: iOS, Android, Web (Expo universal app)
**Project Type**: Mobile-first React Native application with web support
**Performance Goals**: 60 fps interactions, smooth scrolling for deposit lists
**Constraints**: Must support 3 breakpoints (mobile <768px, tablet 768-1023px, desktop >=1024px), portrait orientation
**Scale/Scope**: Single screen with 6 subcomponents, ~12 new files

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Verificar conformidade com `.specify/memory/constitution.md` (Savings Tracker Platform):

- [x] **Produto:** A tela de detalhes do objetivo ajuda o usuário a acompanhar progresso e registrar depósitos — funcionalidades diretamente alinhadas ao propósito de "incentivar organização financeira e continuidade do hábito de poupar". Nenhuma funcionalidade meramente decorativa.
- [x] **Clareza e confiança:** Progresso visual (barra + percentual), valores acumulados formatados como moeda, histórico de depósitos transparente. Dados financeiros exibidos de forma imediata e consistente.
- [x] **UX:** Registro de depósito exige apenas amount (obrigatório) e description (opcional) — mínimo de passos. Validação explícita com mensagens claras (nunca "erro inesperado").
- [x] **UI:** Hierarquia forte: nome do objetivo como heading principal, progresso visual central, cartões distintos para info e histórico. `AppProgressBar` com variantes de cor por status (default/success). Sem elementos decorativos sem função.
- [x] **Conteúdo:** Labels descritivas ("Deposit amount", "Description (optional)"), mensagens de validação específicas ("Amount must be greater than zero"). Placeholder do formulário com "0.00". Sem copy genérico de protótipo.
- [x] **Mobile-first:** Layout single-column no mobile (<768px), cards empilhados verticalmente. Desktop recebe layout two-column como aprimoramento.
- [x] **Acessibilidade:** `AppProgressBar` já inclui `role="progressbar"`, `aria-valuenow/min/max`. `AppCurrencyInput` usa `accessibilityLabel`. Foco visível via `pencilFocusRingClasses`. Labels associadas a inputs.
- [x] **Performance:** Componentes leves, sem animações pesadas. Lista de depósitos usa `ScrollView` nativo. Sem renderizações desnecessárias.
- [x] **Técnico:** Componentização consistente (feature folder pattern), separação lógica/apresentação, react-hook-form + zod para validação, compound components para inputs. Código limpo, sem hacks.

**Gate result**: PASS — all principles satisfied. No violations to justify.

## Project Structure

### Documentation (this feature)

```text
specs/014-goal-details-page/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── spec.md              # Feature specification
├── checklists/
│   └── requirements.md  # Spec quality checklist
└── tasks.md             # Phase 2 output (/speckit-tasks)
```

### Source Code (repository root)

```text
src/
├── app/
│   └── (logged)/
│       └── goals/
│           └── [id].tsx              # MODIFY: Replace placeholder with GoalDetailsScreen
├── components/
│   └── ui/
│       ├── app-currency-input/       # NEW: Extracted currency input component
│       │   ├── app-currency-input.tsx
│       │   └── index.ts
│       ├── app-input/                # Existing (unchanged)
│       ├── app-progress-bar/         # Existing (used by this feature)
│       └── index.ts                  # MODIFY: Add AppCurrencyInput export
├── features/
│   ├── goal-details/                 # NEW: Feature module
│   │   ├── index.ts
│   │   ├── types/
│   │   │   └── deposit.ts
│   │   ├── schemas/
│   │   │   └── deposit.schema.ts
│   │   ├── mocks/
│   │   │   └── deposit-data.ts
│   │   ├── utils/
│   │   │   └── format-date.ts
│   │   ├── screens/
│   │   │   └── goal-details-screen.tsx
│   │   └── components/
│   │       ├── deposit-form.tsx
│   │       ├── deposit-history.tsx
│   │       ├── goal-info-header.tsx
│   │       ├── goal-progress-section.tsx
│   │       └── goal-actions.tsx
│   ├── goal-create/                  # MODIFY: Import AppCurrencyInput
│   └── overview/                     # Existing (types referenced)
└── utils/
    └── format-currency.ts            # NEW: Shared en-US currency formatter
```

**Structure Decision**: Feature-first architecture following existing conventions. The `goal-details` feature follows the same pattern as `goal-create` and `overview`. The `AppCurrencyInput` component is extracted to `components/ui/` as a reusable global component per the user's explicit request.

## Complexity Tracking

> No violations to justify. Constitution Check passed with all principles satisfied.
