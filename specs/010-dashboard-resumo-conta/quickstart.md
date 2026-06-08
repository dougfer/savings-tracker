# Quickstart: Dashboard - Resumo da Conta

**Date**: 2026-06-07
**Feature**: [spec.md](./spec.md)

## Pré-requisitos

- Projeto configurado conforme `specs/009-area-logada/plan.md`
- Expo Router com grupo `(logged)` funcional
- Topbar renderizando no layout compartilhado
- Tokens de design disponíveis via `tailwind.config.js`
- Hook `useResponsive()` em `src/hooks/useResponsive.ts`

## Estrutura de arquivos a criar

```text
src/features/overview/
├── mocks/
│   └── dashboard-data.ts          # NEW: dados mockados (populated + empty)
├── components/
│   ├── SummaryCard.tsx             # NEW: card genérico (Active goals / Goals completed)
│   ├── TotalSavingsCard.tsx        # NEW: card de Total savings (gradient background)
│   ├── BarChart.tsx                # NEW: gráfico de barras mensais
│   └── DashboardSummary.tsx        # NEW: container do grid de resumo + gráfico
├── screens/
│   └── dashboard-screen.tsx        # UPDATE: substituir placeholder
└── types/
    └── dashboard.ts                # NEW: tipos DashboardData, AccountSummary, MonthlyDeposit
```

## Ordem de implementação sugerida

### 1. Tipos e mock data

Criar `src/features/overview/types/dashboard.ts` com as interfaces `DashboardData`, `AccountSummary` e `MonthlyDeposit`.

Criar `src/features/overview/mocks/dashboard-data.ts` com:
- `mockPopulatedDashboard: DashboardData` (dados do design: $11,249.00, 7 ativos, 2 concluídos, 12 meses)
- `mockEmptyDashboard: DashboardData` (tudo zerado)

### 2. TotalSavingsCard

Componente `TotalSavingsCard`:
- Fundo com gradiente linear (`orange-400` → `orange-700`)
- Borda `#ffffff4d` (1px)
- Corner radius 16px
- Padding 20px
- Label "Total savings" (Inter 16px semibold, cor branca)
- Valor formatado com `Intl.NumberFormat('pt-BR')` (Bricolage Grotesque 64px semibold, cor branca)
- Gap 32px entre label e valor

### 3. SummaryCard (genérico)

Componente `SummaryCard` com props: `label`, `value`, `valueColor`, `showPattern`:
- Fundo `#1f1f1f` (neutral-800)
- Borda `#3c3b40` (1px)
- Corner radius 16px
- Padding 20px
- Label (Inter 16px semibold, cor branca)
- Valor (Bricolage Grotesque 64px semibold, cor via prop `valueColor`)
- Gap 32px entre label e valor
- SVG decorativo (`VectorPatternIcon` de `@/assets/icons`) posicionado absolute, opacidade 0.03, no canto inferior direito
- `valueColor`: `orange-400` para Active goals, `green-500` para Goals completed

### 4. BarChart

Componente `BarChart`:
- Recebe `data: MonthlyDeposit[]` e `monthsToShow: number`
- Container com fundo `neutral-800`, borda `#3c3b40`, cornerRadius 16px, padding 20px
- Título "Monthly deposits" (Inter 20px semibold, cor branca)
- Row horizontal de barras com `gap: 20` (NativeWind: `gap-5`)
- Cada barra:
  - Container vertical: barra acima + labels abaixo
  - Barra: `View` com altura proporcional `(value / maxValue) * MAX_BAR_HEIGHT`
  - MAX_BAR_HEIGHT = 144px (conforme design)
  - Cor da barra: `orange-400`, cornerRadius 8px, borda `#ffffff4d` 1px
  - Valor acima da barra: texto formatado `$X,XXX` (Inter 14px, `#b7b7b7`)
  - Label do mês abaixo: 3 letras (Inter 16px, cor branca)
  - Gap 10px entre barra e labels, gap 4px entre valor e label

### 5. DashboardSummary (container do grid)

Componente `DashboardSummary`:
- Recebe `data: DashboardData`
- Layout vertical com gap 24px
- Grid de cards superior: no desktop é uma row com 3 colunas (`flex-row gap-6`), no tablet 2 colunas, no mobile 1 coluna
- TotalSavingsCard com `flex-1` no desktop e tablet, `w-full` no mobile
- SummaryCards com `flex-1` cada
- BarChart abaixo ocupando largura total

### 6. Atualizar dashboard-screen.tsx

Substituir o placeholder atual por:
```tsx
import { DashboardSummary } from '../components/DashboardSummary'
import { mockPopulatedDashboard, mockEmptyDashboard } from '../mocks/dashboard-data'

export default function DashboardScreen() {
  const data = mockPopulatedDashboard // alternar para mockEmptyDashboard para testar estado vazio

  return <DashboardSummary data={data} />
}
```

## Responsividade

Usar o hook `useResponsive()` para:
- Determinar `monthsToShow`: 12 (desktop) ou 6 (tablet/mobile)
- Determinar layout do grid de cards:
  - Desktop: `flex-row` (3 cards lado a lado)
  - Tablet: `flex-row flex-wrap` (2 cards por linha)
  - Mobile: `flex-col` (1 card por linha)

## Design Tokens (Tailwind)

| Propriedade | Token |
|---|---|
| Cor laranja (barras, gradiente, valor active) | `orange-400` (#FF5722) |
| Cor laranja escuro (gradiente end) | `orange-700` (#B92B09) |
| Cor verde (valor completed) | `green-500` (#4ADE80) |
| Fundo escuro dos cards | `neutral-800` (#1F1F1F) |
| Borda dos cards secundários | `border` classe customizada (#3C3B40) |
| Texto branco | `white` ou `color-white` |
| Texto cinza (valores do gráfico) | `#B7B7B7` (não tem token — usar cor direta ou criar token) |
| Borda semi-transparente | `#FFFFFF4D` (não tem token — usar cor direta) |
| Tipografia labels | `font-sans-semibold text-body` (Inter 16px) |
| Tipografia valores | `font-display-semibold text-display-lg` (Bricolage 64px) |
| Tipografia título gráfico | `font-sans-semibold text-heading-md` (Inter 20px) |
| Corner radius cards | `rounded-2xl` (16px) |
| Corner radius barras | `rounded-lg` (8px) |
| Gap grid | `gap-6` (24px) |
| Gap interno cards | `gap-8` (32px) |
| Gap barras | `gap-5` (20px) |
| Padding cards | `p-5` (20px) |
