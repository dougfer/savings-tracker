# Implementation Plan: Dashboard - Resumo da Conta

**Branch**: `010-dashboard-resumo-conta` | **Date**: 2026-06-07 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/010-dashboard-resumo-conta/spec.md`

## Summary

Implement the account summary section of the logged-in dashboard — a frontend-only feature that displays a grid layout with three summary cards (total savings, active goals, completed goals) and a monthly bar chart. Uses mock data exclusively; no backend integration. The bar chart is implemented with native React Native Views (no external charting library). Responsive layout adapts cards from 3-column (desktop) to 2-column (tablet) to 1-column (mobile). Chart shows 12 months on desktop and 6 months on tablet/mobile. Empty state renders with zeroed values.

## Technical Context

**Language/Version**: TypeScript 5.x (React Native / Expo SDK 54)
**Primary Dependencies**: Expo Router, React Native, NativeWind 4 (Tailwind), Gluestack UI v3, react-native-svg (SVG decorativo nos cards)
**Storage**: N/A (mock data in-memory, no persistence)
**Testing**: Jest (co-located `*.test.tsx` files alongside components)
**Target Platform**: iOS, Android, Web (Expo cross-platform)
**Project Type**: Mobile app (React Native / Expo) with web support
**Performance Goals**: <2s initial render, 60fps, bar chart renders with no jank
**Constraints**: Mobile-first responsive, a11y compliance (keyboard, screen readers), use only existing design tokens (no hardcoded style values), no external charting library
**Scale/Scope**: 1 updated screen, 4 new components, 1 mock data file, 1 types file

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Verificar conformidade com `.specify/memory/constitution.md` (Savings Tracker Platform):

- **Produto:** O resumo da conta é a primeira informação que o usuário vê após login. Exibe total guardado, objetivos ativos/concluídos e evolução mensal — responde diretamente "Isso ajuda o usuário a economizar melhor?" ao comunicar progresso financeiro imediatamente. O escopo evita funcionalidade sem propósito. ✅
- **Clareza e confiança:** O dashboard comunica instantaneamente os três pilares definidos na constituição: quanto economizou (total savings), quantas metas ativas (active goals), quantas concluídas (goals completed). Dados são claros, progresso visível, sem ambiguidade. ✅
- **UX:** Leitura rápida com cards escaneáveis, gráfico intuitivo, navegação previsível. Estados vazios renderizam valores zerados mantendo a estrutura — útil para novos usuários. Sem fricção. ✅
- **UI:** Hierarquia visual forte: card de total savings com gradiente (destaque máximo), cards secundários com fundo escuro, gráfico com barras proporcionais. Tipografia Bricolage Grotesque para valores (impacto), Inter para labels (legibilidade). Barras servem à leitura, não à decoração. ✅
- **Conteúdo:** Textos funcionais: "Total savings", "Active goals", "Goals completed", "Monthly deposits". Labels de meses padronizados (3 letras). Sem placeholders genéricos. ✅
- **Mobile-first:** Layout concebido para mobile (1 coluna), expandindo para tablet (2 colunas) e desktop (3 colunas + 12 meses no gráfico). Cards com touch targets adequados. Gráfico compreensível em telas pequenas. ✅
- **Acessibilidade:** Cards e barras com roles semânticas. Valores como texto (acessível a leitores de tela). Contraste adequado (texto branco sobre fundo escuro/laranja). Labels explícitas em todos os elementos. ✅
- **Performance:** Barras implementadas com Views nativas (sem SVG pesado). Sem animações desnecessárias. Mock data em memória (sem chamadas de rede). Renderização fluida. ✅
- **Técnico:** Organização Feature First (overview/). Componentização com responsabilidade única (TotalSavingsCard, SummaryCard, BarChart). Separação clara entre dados mock, tipos e apresentação. Código legível e componentizado. Barrel exports. Kebab-case para diretórios. ✅

**Gate Result**: PASS — All 9 principles satisfied. No violations to justify.

## Project Structure

### Documentation (this feature)

```text
specs/010-dashboard-resumo-conta/
├── plan.md              # This file
├── research.md          # Phase 0: chart library decision
├── data-model.md        # Phase 1: entities and mock data
├── quickstart.md        # Phase 1: implementation quickstart
├── contracts/           # N/A (no external interfaces)
├── checklists/
│   └── requirements.md  # Spec quality checklist
└── tasks.md             # Phase 2 output (/speckit-tasks — NOT created by /speckit-plan)
```

### Source Code (repository root)

```text
src/
├── features/
│   └── overview/
│       ├── types/
│       │   └── dashboard.ts                # NEW: DashboardData, AccountSummary, MonthlyDeposit
│       ├── mocks/
│       │   └── dashboard-data.ts           # NEW: mockPopulatedDashboard, mockEmptyDashboard
│       ├── components/
│       │   ├── DashboardSummary.tsx         # NEW: grid container (cards + chart)
│       │   ├── TotalSavingsCard.tsx         # NEW: card de total savings (gradient)
│       │   ├── SummaryCard.tsx              # NEW: card genérico (active/completed goals)
│       │   └── BarChart.tsx                 # NEW: gráfico de barras mensais
│       └── screens/
│           └── dashboard-screen.tsx         # UPDATE: integrar DashboardSummary com mock data
├── components/
│   └── ui/
│       └── index.ts                        # UPDATE: (se novos componentes shared forem extraídos)
└── assets/
    └── icons/
        └── vector.svg                      # EXISTING: SVG decorativo para SummaryCard
```

**Structure Decision**: Segue Feature First. Os novos componentes (`DashboardSummary`, `TotalSavingsCard`, `SummaryCard`, `BarChart`) residem em `src/features/overview/components/` por serem específicos do domínio de dashboard. Tipos e mocks ficam em `types/` e `mocks/` respectivamente, ambos dentro da feature. O `SummaryCard` é genérico dentro do contexto da feature (reutilizado para Active e Completed goals). A tela `dashboard-screen.tsx` é atualizada para integrar os novos componentes com dados mockados.

## Complexity Tracking

> No constitution violations — no complexity to justify.
