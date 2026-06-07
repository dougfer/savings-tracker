# Implementation Plan: Área Logada

**Branch**: `009-area-logada` | **Date**: 2026-06-07 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/009-area-logada/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Implement the initial Logged Area (Área Logada) structure — a frontend-only configuration that establishes the route scaffolding and shared Topbar navigation component for post-authentication screens. The feature creates an Expo Router grouped route layout `(logged)` with a shared `_layout.tsx` that renders the Topbar across all logged-in screens. The Topbar follows the project's responsive design (desktop, tablet, mobile variants) using existing UI components (AppButton, AppText, AppAvatar) and design tokens. No backend integration, no authentication, no data loading.

## Technical Context

**Language/Version**: TypeScript 5.x (React Native / Expo SDK 54)
**Primary Dependencies**: Expo Router (file-based routing), React Native, NativeWind 4 (Tailwind), Gluestack UI v3, react-native-svg (SVG icons), react-native-safe-area-context
**Storage**: N/A (no backend, no persistence for this feature)
**Testing**: Jest (co-located `*.test.tsx` files alongside components)
**Target Platform**: iOS, Android, Web (Expo cross-platform)
**Project Type**: Mobile app (React Native / Expo) with web support
**Performance Goals**: 60fps interactions, <2s initial render, instant perceived navigation transitions (no flicker)
**Constraints**: Mobile-first responsive, a11y compliance (keyboard nav, screen readers, focus ring), no external API calls, use only existing design tokens (no hardcoded style values)
**Scale/Scope**: 1 new route group `(logged)`, 1 new shared component (Topbar), 1 screen (dashboard placeholder), 1 updated route structure

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Verificar conformidade com `.specify/memory/constitution.md` (Savings Tracker Platform):

- **Produto:** A Área Logada é o ponto de entrada para o usuário gerenciar suas metas financeiras. A Topbar com botão "New goal" posiciona a ação primária (criar meta) de forma visível e acessível. A estrutura viabiliza as funcionalidades de poupança que virão a seguir. Responde "Isso ajuda o usuário a economizar melhor?" — sim, ao estabelecer o ambiente onde o core do produto acontecerá. ✅
- **Clareza e confiança:** A Topbar mantém identidade visual consistente (logo + nome do app) em todas as telas, transmitindo profissionalismo e segurança. Elementos de navegação são previsíveis. O botão "New goal" é proeminente e claro. ✅
- **UX:** Navegação entre telas é instantânea via Expo Router. Topbar fixa no topo em todas as telas da área logada. Transições sem flicker. O botão "New goal" tem posição consistente (canto superior direito). ✅
- **UI:** O design da Topbar segue os tokens do Design System existentes (cores `neutral-900`/`neutral-800`, tipografia Inter/Bricolage Grotesque, espaçamento baseado na grid de 4px). Três breakpoints responsivos (desktop/tablet/mobile) conforme os designs no app.pen. Sem decoração excessiva — hierarquia visual clara com logo à esquerda e ações à direita. ✅
- **Conteúdo:** Textos são funcionais e orientam ação: "Savings Tracker" (identidade), "New goal" (call-to-action). Sem placeholders genéricos. ✅
- **Mobile-first:** Layout mobile-first: no mobile, o título é ocultado para economizar espaço (apenas ícone), padding reduzido (12/16px). Touch targets respeitam mínimo de 48px. Tablet e desktop expandem progressivamente. ✅
- **Acessibilidade:** Ordem de foco: logo → botão "New goal" → avatar. Estados de foco visíveis via `pencilFocusRingClasses`. Labels adequadas no logo e botão. Avatar com `accessibilityRole="image"`. ✅
- **Performance:** A Topbar é um componente puramente presentacional, sem chamadas de rede. Renderização condicional por breakpoint (useWindowDimensions). SVG icons leve e otimizado. Sem animações desnecessárias. ✅
- **Técnico:** Organização Feature First: componente Topbar como shared UI em `src/components/ui/topbar/`. Layout do Expo Router via `_layout.tsx` no grupo `(logged)`. Separação clara entre layout compartilhado (Topbar) e conteúdo das telas. Barrel exports. Kebab-case para diretórios. ✅

**Gate Result**: PASS — All 9 principles satisfied. No violations to justify.

## Project Structure

### Documentation (this feature)

```text
specs/009-area-logada/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (N/A — no external interfaces)
└── tasks.md             # Phase 2 output (/speckit-tasks)
```

### Source Code (repository root)

```text
src/
├── app/
│   └── (logged)/
│       ├── _layout.tsx                    # NEW: Group layout — renders Topbar + Stack navigator
│       └── index.tsx                      # NEW: Dashboard re-export (→ features/overview)
├── components/
│   └── ui/
│       ├── topbar/                        # NEW: Shared Topbar component
│       │   ├── topbar.tsx                 # Topbar component with responsive variants
│       │   └── index.ts                   # Barrel export
│       ├── app-button/                    # Existing — reused for "New goal" button
│       ├── app-text/                      # Existing — reused for logo title text
│       ├── app-avatar/                    # Existing — reused for user avatar
│       └── index.ts                       # Updated: add Topbar export
└── features/
    └── overview/
        ├── screens/
        │   ├── OverviewPlaceholderScreen.tsx  # Existing — may be replaced/deprecated
        │   └── dashboard-screen.tsx           # NEW: Main logged area dashboard
        └── components/
            └── OverviewHint.tsx           # Existing — informational hint
```

**Structure Decision**: Follows Feature First architecture. The Topbar is a shared UI component (under `src/components/ui/topbar/`) because it is rendered by the layout and used across all logged-in screens — it is not tied to a single feature. The `(logged)` grouped route in Expo Router applies the shared Topbar layout to all child routes. The dashboard screen lives in `src/features/overview/screens/` as it is part of the overview/dashboard feature domain.

## Complexity Tracking

> No constitution violations — no complexity to justify.
