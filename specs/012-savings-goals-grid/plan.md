# Implementation Plan: Savings Goals Grid

**Branch**: `012-savings-goals-grid` | **Date**: 2026-06-13 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/012-savings-goals-grid/spec.md`

## Summary

Implementar o grid de listagem de objetivos financeiros (Savings Goals Grid) como parte da feature `overview`, abaixo do `DashboardSummary` na tela de dashboard existente. O grid exibe os objetivos em layout responsivo de duas colunas (2/3 + 1/3) no desktop, coluna única com agrupamentos horizontais em tablet, e coluna única em mobile. Cada card utiliza o componente `GoalCard` já existente com variantes `default`, `wide` e `tall`. Dados mockados nesta fase, com camada de dados estruturada para futura integração com API.

## Technical Context

**Language/Version**: TypeScript 5.x, React Native (Expo SDK)  
**Primary Dependencies**: React Native, Expo Router, NativeWind (Tailwind), date-fns, react-native-svg, react-native-safe-area-context  
**Storage**: N/A (mock data — dados armazenados em constantes TypeScript)  
**Testing**: Jest + @testing-library/react-native (padrão Gluestack UI v3)  
**Target Platform**: iOS, Android, Web (Expo universal app)  
**Project Type**: Mobile-first universal app (React Native via Expo)  
**Performance Goals**: 60 fps scroll, renderização inicial < 2s com 20+ cards, sem lag em layout shifts responsivos  
**Constraints**: Mobile-first obrigatório; apenas design tokens do Design System; nenhuma dependência nova sem aprovação; dados exclusivamente mockados nesta fase  
**Scale/Scope**: Extensão da tela dashboard existente, 3-4 componentes novos, ~8 cards mock no grid, 3 breakpoints (mobile 320px, tablet 768px, desktop 1024px+)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Produto:** Sim — o grid permite ao usuário visualizar todos os objetivos em uma tela, identificando rapidamente progresso e quais metas precisam de atenção. Incentiva continuidade do hábito de poupar.
- **Clareza e confiança:** Sim — cada card exibe progresso, valores e datas de forma imediata. O grid comunica o panorama completo das metas com hierarquia visual clara (wide cards para destaque, tall para completude).
- **UX:** Sim — fluxo mínimo: usuário acessa a tela e já vê todos os objetivos. Seleção de card leva ao detalhe. Estado vazio orienta sobre próximos passos.
- **UI:** Sim — barras de progresso e indicadores servem à leitura rápida. Hierarquia forte: wide cards chamam atenção, tall cards mostram mais detalhes. Design system aplicado consistentemente.
- **Conteúdo:** Sim — textos no estado vazio são funcionais e orientadores ("Você ainda não possui objetivos financeiros"). Labels, datas e valores seguem formato definido.
- **Mobile-first:** Sim — layout concebido primeiro para coluna única mobile, com adaptações progressivas para tablet e desktop.
- **Acessibilidade:** Sim — cards possuem `accessibilityRole="summary"`, progress bars com `aria-valuenow/min/max`. Navegação por teclado com `Pressable`. Área de clique ≥ 44px nos cards.
- **Performance:** Sim — sem animações desnecessárias. Renderização em ScrollView com children conhecidos (sem virtualização neste momento — a lista cabe em tela). SVGs leves e reutilizados.
- **Técnico:** Sim — código componentizado, separação clara entre dados (mocks), apresentação (components) e roteamento (screen → app route). Estados tratados: populado e vazio. Nenhum hack.

**Gate result**: PASS — todos os princípios atendidos. Nenhuma violação a justificar.

## Project Structure

### Documentation (this feature)

```text
specs/012-savings-goals-grid/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   └── goals-grid-layout.md
└── tasks.md             # Phase 2 output (/speckit-tasks)
```

### Source Code (repository root)

```text
src/
├── features/
│   └── overview/                        # EXISTING — extended with goals grid
│       ├── components/
│       │   ├── goal-card/               # EXISTING — GoalCard component
│       │   ├── dashboard-summary.tsx    # EXISTING — account summary cards
│       │   ├── total-savings-card.tsx   # EXISTING
│       │   ├── summary-card.tsx         # EXISTING
│       │   ├── bar-chart.tsx            # EXISTING
│       │   ├── goals-grid.tsx           # NEW — grid layout (responsivo)
│       │   ├── goals-header.tsx         # NEW — título + Filters + Sort By
│       │   └── empty-state.tsx          # NEW — estado vazio + CTA
│       ├── mocks/
│       │   ├── dashboard-data.ts        # EXISTING
│       │   ├── goal-data.ts             # EXISTING
│       │   └── goals-list-data.ts       # NEW — 8 objetivos mock para o grid
│       ├── screens/
│       │   └── dashboard-screen.tsx     # EXISTING — será estendido
│       └── types/
│           ├── dashboard.ts             # EXISTING
│           └── goal.ts                  # EXISTING — Goal, GoalSize
```

**Structure Decision**: O grid de objetivos é parte da feature `overview`, integrado à tela de dashboard existente abaixo do `DashboardSummary`. Nenhuma feature nova ou rota nova é criada — todos os componentes são adicionados em `src/features/overview/components/`. O `dashboard-screen.tsx` existente é estendido para compor `DashboardSummary` + goals grid. A navegação para detalhe usa `expo-router` `Link` para rota futura (placeholder).

## Complexity Tracking

> Nenhuma violação na Constitution Check. Seção mantida para registro.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | N/A | N/A |
