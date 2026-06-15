# Data Model: Savings Goals Grid

**Feature**: 012-savings-goals-grid  
**Date**: 2026-06-13

## Entities

### Goal (Reused)

Tipo compartilhado de `@/features/overview/types/goal`. Nenhuma extensão ou modificação necessária para esta feature.

```ts
type GoalState = 'no-progress' | 'in-progress' | 'complete';
type GoalSize = 'default' | 'wide' | 'tall';

interface Goal {
  id: string;
  name: string;
  currentAmount: number;
  targetAmount: number;
  dueDate: string | null;
  createdAt: string;
}
```

**Validation rules**:
- `id`: string não vazia, identificador único
- `name`: string; se vazia, o GoalCard exibe "Untitled goal"
- `currentAmount`: number ≥ 0
- `targetAmount`: number > 0 (se ≤ 0, GoalCard trata como 1 para evitar divisão por zero)
- `dueDate`: ISO 8601 string ou null (opcional)
- `GoalState`: derivado de `currentAmount / targetAmount` — não é campo persistido
- `GoalSize`: controla a variante visual do card — não é propriedade do Goal, mas sim da configuração do grid

### GoalsListState (Feature-local)

Estado interno da tela de listagem.

```ts
type GoalsListState = 'populated' | 'empty';
```

Derivado do array de objetivos:
- `goals.length > 0` → `'populated'`
- `goals.length === 0` → `'empty'`

### GridRow (Feature-local, interno)

Estrutura lógica que organiza os objetivos em linhas do grid desktop.

```ts
interface GridRow {
  /** Posição da linha (0 = primeira, 1 = segunda) */
  index: number;
  /** Coluna esquerda (≈2/3) — contém 3 cards: wide + 2 default */
  leftColumn: {
    wide: Goal;
    defaults: [Goal, Goal];
  };
  /** Coluna direita (≈1/3) — contém 1 card tall */
  rightColumn: {
    tall: Goal;
  };
  /** Se true, o padrão é espelhado: tall na esquerda, wide na direita */
  mirrored: boolean;
}
```

**Regras de organização**:
- Cada `GridRow` consome 4 objetivos: 3 na coluna maior + 1 na coluna menor
- Linhas pares (index 0, 2, 4...): wide card + 2 defaults na esquerda, tall na direita
- Linhas ímpares (index 1, 3, 5...): tall na esquerda, wide card + 2 defaults na direita (espelhado)
- Se sobrarem objetivos (< 4), preenchem parcialmente a última linha (apenas os slots disponíveis)

## Mock Data

### Goals List Mock (`src/features/overview/mocks/goals-list-data.ts`)

8 objetivos representando estados variados, organizados em 2 GridRows:

| # | Nome | currentAmount | targetAmount | Progresso | dueDate | Estado |
|---|------|---------------|--------------|-----------|---------|--------|
| 1 | Emergency Fund | 3500 | 10000 | 35% | 2026-12-15 | in-progress |
| 2 | MacBook Pro M4 | 0 | 2499 | 0% | 2026-09-01 | no-progress |
| 3 | Férias Europa 2027 | 8100 | 15000 | 54% | 2027-06-30 | in-progress |
| 4 | Curso de Especialização | 3500 | 3500 | 100% | 2026-08-20 | complete |
| 5 | iPhone 17 Pro | 2000 | 6999 | 29% | 2026-11-10 | in-progress |
| 6 | Reforma Apartamento | 12000 | 25000 | 48% | 2027-03-15 | in-progress |
| 7 | Reserva de Emergência | 9500 | 9500 | 100% | 2026-07-01 | complete |
| 8 | Notebook Gamer | 300 | 8000 | 4% | 2026-12-31 | in-progress |

**Distribuição no grid desktop**:
- Row 1: left [Goal 1 (wide), Goal 2+3 (defaults)], right [Goal 4 (tall)]
- Row 2: left [Goal 5 (tall)], right [Goal 6 (wide), Goal 7+8 (defaults)] — mirrored

## State Transitions

```
GoalsListState:
  empty ──(goals added)──► populated
  populated ──(all goals removed)──► empty
```

Sem estados de loading ou erro nesta fase (mock data é síncrona e determinística). Preparado para extensão futura com estados `loading` e `error` quando houver integração com API.
