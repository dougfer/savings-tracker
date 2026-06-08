# Data Model: Dashboard - Resumo da Conta

**Date**: 2026-06-07
**Feature**: [spec.md](./spec.md)

## Entities

### AccountSummary (Resumo da Conta)

Agregação raiz dos dados financeiros exibidos no dashboard. Representa um snapshot do estado atual da conta do usuário.

| Field | Type | Description | Validation |
|-------|------|-------------|------------|
| `totalSavings` | `number` | Soma de todos os depósitos realizados (em centavos ou valor decimal) | >= 0 |
| `activeGoalsCount` | `number` | Quantidade de objetivos em andamento (não concluídos) | >= 0, integer |
| `completedGoalsCount` | `number` | Quantidade de objetivos concluídos (metas atingidas) | >= 0, integer |

### MonthlyDeposit (Depósito Mensal)

Representa o valor total depositado em um mês específico para o gráfico de barras.

| Field | Type | Description | Validation |
|-------|------|-------------|------------|
| `month` | `string` | Abreviação do mês em inglês (3 letras): "Jan", "Feb", etc. | Length = 3 |
| `value` | `number` | Total depositado no mês (em centavos ou valor decimal) | >= 0 |

### DashboardData (Dados Completos do Dashboard)

Estrutura que agrupa todos os dados necessários para renderizar o dashboard.

| Field | Type | Description |
|-------|------|-------------|
| `summary` | `AccountSummary` | Resumo da conta |
| `monthlyDeposits` | `MonthlyDeposit[]` | Lista de depósitos mensais (12 meses em ordem cronológica) |

## Mock Data

Os dados mockados seguem a estrutura acima e são utilizados exclusivamente para desenvolvimento da interface. O mock reside em arquivo dedicado dentro da feature `overview`.

### Exemplo de mock (populated state)

```text
{
  summary: {
    totalSavings: 11249.00,
    activeGoalsCount: 7,
    completedGoalsCount: 2,
  },
  monthlyDeposits: [
    { month: "Apr", value: 0 },
    { month: "May", value: 0 },
    { month: "Jun", value: 500 },
    { month: "Jul", value: 400 },
    { month: "Aug", value: 400 },
    { month: "Sep", value: 1150 },
    { month: "Oct", value: 1149 },
    { month: "Nov", value: 1550 },
    { month: "Dec", value: 2350 },
    { month: "Jan", value: 1025 },
    { month: "Feb", value: 1550 },
    { month: "Mar", value: 1550 },
  ]
}
```

### Exemplo de mock (empty state)

```text
{
  summary: {
    totalSavings: 0,
    activeGoalsCount: 0,
    completedGoalsCount: 0,
  },
  monthlyDeposits: [
    { month: "Apr", value: 0 },
    { month: "May", value: 0 },
    { month: "Jun", value: 0 },
    // ... todos os meses com value: 0
  ]
}
```

## State Transitions

```
[No Data] ──(dados disponíveis)──> [Populated]
[Populated] ──(dados zerados)──> [Empty/No Data]

[Any State] ──(futuro)──> [Loading]  // Não implementado nesta etapa
```

A transição é determinada pela presença e valores dos dados fornecidos ao componente:
- `totalSavings > 0` OU `activeGoalsCount > 0` OU `completedGoalsCount > 0` → estado populado
- Todos os campos zerados → estado vazio

## Data Flow

```
Mock File (src/features/overview/mocks/)
    │
    ▼
Dashboard Screen (src/features/overview/screens/dashboard-screen.tsx)
    │
    ├──▶ Summary Section (grid de cards)
    │    ├── TotalSavingsCard (total guardado)
    │    └── SummaryCard (active goals, goals completed) — genérico
    │
    └──▶ BarChart (gráfico de barras)
         └── Bar (cada barra individual)
```

A interface de dados do componente recebe `DashboardData` como prop única ou derivada de contexto. A estrutura de props permite substituição futura da fonte (mock → API) sem alteração nos componentes de apresentação.
