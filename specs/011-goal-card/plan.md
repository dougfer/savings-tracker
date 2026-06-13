# Implementation Plan: Goal Card

**Branch**: `011-goal-card` | **Date**: 2026-06-11 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/011-goal-card/spec.md`

## Summary

Implement the Goal Card presentation component within `src/features/overview/components/`. The component displays a financial goal's progress with name, accumulated amount, target amount, completion percentage, progress bar, due date, and completion status. Uses a simple props-based API (no Compound Components). Supports three states (No Progress, In Progress, Complete) and three sizes (default, wide, tall) with distinct visual styling per combination, as defined in the design at `app.pen` node `iRrfV`. Follows existing codebase patterns (NativeWind, AppText, AppProgressBar, react-native-svg for gradient).

## Technical Context

**Language/Version**: TypeScript 5.x (React Native / Expo SDK 54)  
**Primary Dependencies**: Expo Router, React Native, NativeWind 4 (Tailwind), react-native-svg (Wide variant gradient), AppText, AppProgressBar (adaptado)  
**Storage**: N/A (mock data in-memory, no persistence; component is presentational — receives data via props)  
**Testing**: Jest + @testing-library/react-native (co-located `*.test.tsx` files)  
**Target Platform**: iOS, Android, Web (Expo cross-platform)  
**Project Type**: Mobile app (React Native / Expo) with web support  
**Performance Goals**: <2s initial render, 60fps, progress bar updates with no jank  
**Constraints**: Mobile-first responsive, a11y compliance (screen readers, keyboard), use only existing design tokens, no external charting library, no Compound Components pattern  
**Scale/Scope**: 1 new component, 1 new type file, 1 new mock file, ~3 new files total

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Verificar conformidade com `.specify/memory/constitution.md` (Savings Tracker Platform):

- **Produto:** O Goal Card responde diretamente "Isso ajuda o usuário a economizar melhor?" ao comunicar o progresso individual de cada meta com percentual, valores e barra visual. O reforço positivo do progresso incentiva a continuidade do hábito de poupar. ✅
- **Clareza e confiança:** O card exibe nome, valor acumulado, valor alvo, percentual e status de conclusão de forma imediata e sem ambiguidade. O progresso é visível tanto numericamente quanto visualmente (barra). Estados distintos (No Progress, In Progress, Complete) eliminam confusão. ✅
- **UX:** Como componente puramente apresentacional, não introduz fricção — apenas exibe informações de forma clara. A leitura é rápida e hierárquica: percentual em destaque, valores e data no rodapé. ✅
- **UI:** Hierarquia visual forte: percentual em Bricolage Grotesque 64px (destaque máximo), nome em Inter 20px, valores em Inter 14px. Barra de progresso com track escuro e preenchimento colorido por estado. Gradiente no Wide variant para destaque adicional. Completeness tag verde para metas concluídas. Nenhum elemento puramente decorativo. ✅
- **Conteúdo:** Textos funcionais derivados dos dados (nome do objetivo, valores monetários, percentual). Tag "COMPLETE" informa conclusão. Data prevista formata contexto temporal. Sem placeholders genéricos. ✅
- **Mobile-first:** Default size (408x240) é compacto e legível em mobile. Tall variant (408x504) expande verticalmente para destaque. Wide variant (838x240) aproveita telas maiores. Card adapta-se a diferentes breakpoints conforme padrão da feature `010-dashboard-resumo-conta`. ✅
- **Acessibilidade:** Card com role semântica, percentual e valores como texto acessível a leitores de tela. Contraste adequado (texto branco sobre fundo escuro ou gradiente). COMPLETE tag visível com cor semântica (verde). ✅
- **Performance:** Componente renderizado com Views nativas, AppProgressBar nativo, SVG apenas para gradiente do Wide variant (quando necessário). Sem animações desnecessárias. Dados via props (sem fetch). Renderização fluida. ✅
- **Técnico:** Componente único com API de props simples (sem Compound Components). Responsabilidade única: exibir progresso de um objetivo. Tipagem TypeScript adequada. Separação entre lógica (cálculo de percentual, clamp, formatação) e apresentação (estilos por estado/tamanho). Organização Feature First. ✅

**Gate Result**: PASS — All 9 principles satisfied. No violations to justify.

## Project Structure

### Documentation (this feature)

```text
specs/011-goal-card/
├── plan.md              # This file
├── research.md          # Phase 0: design analysis and decisions
├── data-model.md        # Phase 1: Goal entity and types
├── quickstart.md        # Phase 1: implementation quickstart
├── contracts/           # N/A (no external interfaces)
├── checklists/
│   └── requirements.md  # Spec quality checklist
└── tasks.md             # Phase 2 output (/speckit.tasks - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── features/
│   └── overview/
│       ├── types/
│       │   ├── dashboard.ts                # EXISTING - unchanged
│       │   └── goal.ts                     # NEW: Goal, GoalState, GoalSize types
│       ├── mocks/
│       │   ├── dashboard-data.ts           # EXISTING - unchanged
│       │   └── goal-data.ts                # NEW: mock goals for all states
│       └── components/
│           ├── goal-card/
│           │   ├── goal-card.tsx            # NEW: GoalCard component
│           │   ├── index.ts                 # NEW: barrel export
│           │   └── goal-card.test.tsx       # NEW: unit tests
│           ├── dashboard-summary.tsx        # EXISTING
│           ├── summary-card.tsx             # EXISTING
│           ├── total-savings-card.tsx       # EXISTING
│           └── bar-chart.tsx                # EXISTING
```

**Structure Decision**: Segue Feature First. O componente `GoalCard` reside em `src/features/overview/components/goal-card/` por ser um componente de apresentação específico do domínio de dashboard/objetivos. Os tipos `Goal` e enums associados vão em `types/goal.ts` (arquivo dedicado, separado do `dashboard.ts` existente). Mocks em `mocks/goal-data.ts`. Esta organização mantém coesão com a estrutura existente da feature `overview`.

## Complexity Tracking

> No constitution violations — no complexity to justify.
