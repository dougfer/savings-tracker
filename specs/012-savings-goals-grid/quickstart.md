# Quickstart: Savings Goals Grid

**Feature**: 012-savings-goals-grid  
**Date**: 2026-06-13

## Overview

Guia rápido para implementação do grid de objetivos financeiros como extensão da feature `overview`, integrado à `dashboard-screen.tsx` abaixo do `DashboardSummary`.

## Prerequisites

- Projeto configurado e rodando (`npm start` ou `npx expo start`)
- GoalCard component implementado (`src/features/overview/components/goal-card/`)
- DashboardScreen existente (`src/features/overview/screens/dashboard-screen.tsx`)
- Design tokens do Design System disponíveis (tailwind.config.js)

## Implementation Order

### 1. Create Mock Data

**File**: `src/features/overview/mocks/goals-list-data.ts`

```ts
import type { Goal } from '../types/goal';

export const mockGoalsList: Goal[] = [
  // 8 objetivos com estados variados (ver data-model.md)
  { id: '1', name: 'Emergency Fund', currentAmount: 3500, targetAmount: 10000, dueDate: '2026-12-15', createdAt: '2026-01-15' },
  { id: '2', name: 'MacBook Pro M4', currentAmount: 0, targetAmount: 2499, dueDate: '2026-09-01', createdAt: '2026-02-10' },
  // ... etc (8 total)
];

export const mockEmptyGoalsList: Goal[] = [];
```

### 2. Create Components

**Order**: bottom-up (components sem dependência primeiro)

#### 2a. `GoalsHeader`

- **File**: `src/features/overview/components/goals-header.tsx`
- **Prop**: `title: string`
- Layout: `flex-row justify-between items-center` (lg/md), `flex-col gap-5 items-center` (mobile)
- Título: `text-heading-lg font-display-semibold text-white`
- Botões "Filters" e "Sort By": `AppButton` variant tertiary, sem `onPress` handler
- Mobile: botões `w-full`

#### 2b. `EmptyState`

- **File**: `src/features/overview/components/empty-state.tsx`
- **Props**: `showExampleCards: boolean`, `exampleGoals: Goal[]`
- Container com `rounded-2xl border border-neutral-600 p-10` (p-10 lg, px-4 mobile)
- Ícone 40x40 placeholder, mensagem principal + complementar
- Preview cards (quando `showExampleCards = true`)
- Botão "Create your first goal" (AppButton primary, sem ação)

#### 2c. `GoalsGrid`

- **File**: `src/features/overview/components/goals-grid.tsx`
- **Prop**: `goals: Goal[]`
- **Desktop** (`lg:flex-col hidden`): duas rows com layout 2/3 + 1/3
  - Row 0: left `flex-[2] max-w-[838px]` (wide + 2 defaults), right `flex-1` (tall)
  - Row 1 (mirrored): left `flex-1` (tall), right `flex-[2] max-w-[838px]` (wide + 2 defaults)
- **Tablet** (`md:flex-col hidden lg:hidden`): coluna única, cards empilhados com alguns pares horizontais
- **Mobile** (default, `md:hidden`): coluna única, todos cards full-width

### 3. Extend Dashboard Screen

**File**: `src/features/overview/screens/dashboard-screen.tsx` (editar existente)

```tsx
import { ScrollView, View } from 'react-native';

import { DashboardSummary } from '../components/dashboard-summary';
import { GoalsGrid } from '../components/goals-grid';
import { GoalsHeader } from '../components/goals-header';
import { EmptyState } from '../components/empty-state';
import { mockPopulatedDashboard } from '../mocks/dashboard-data';
import { mockGoalsList, mockEmptyGoalsList } from '../mocks/goals-list-data';

export default function DashboardScreen() {
  const goals = mockGoalsList; // switch to mockEmptyGoalsList to test empty state
  const isEmpty = goals.length === 0;

  return (
    <ScrollView className="flex-1 bg-neutral-900">
      <View className="gap-8 px-4 py-12 md:px-6 lg:px-0">
        <DashboardSummary data={mockPopulatedDashboard} />
        <GoalsHeader title="Your goals" />
        {isEmpty ? (
          <EmptyState showExampleCards={/* responsive */} exampleGoals={mockGoalsList} />
        ) : (
          <GoalsGrid goals={goals} />
        )}
      </View>
    </ScrollView>
  );
}
```

### 4. Wire Navigation

Wrapping each `GoalCard` in `GoalsGrid` with `<Link href={...}>` from `expo-router`. Nesta fase, usa rota placeholder (a ser criada futuramente) ou `router.push` com dados mockados.

## Verification

1. **Desktop (1024px+)**: Grid com duas rows, padrão 2/3 + 1/3 com alternância (wide+2defaults | tall e mirrored)
2. **Tablet (768px-1023px)**: Coluna única, cards empilhados, alguns pares horizontais
3. **Mobile (320px-767px)**: Coluna única, cards full-width, header empilhado
4. **Empty state**: Mensagens corretas, preview cards no desktop/tablet, apenas CTA no mobile
5. **Design tokens**: Todas as cores, tipografia e espaçamento usam classes do tailwind.config.js

## Files Checklist

- [ ] `src/features/overview/mocks/goals-list-data.ts` (NEW)
- [ ] `src/features/overview/components/goals-header.tsx` (NEW)
- [ ] `src/features/overview/components/empty-state.tsx` (NEW)
- [ ] `src/features/overview/components/goals-grid.tsx` (NEW)
- [ ] `src/features/overview/screens/dashboard-screen.tsx` (EDIT — add goals grid below DashboardSummary)
- [ ] `specs/012-savings-goals-grid/tasks.md` (via `/speckit-tasks`)
