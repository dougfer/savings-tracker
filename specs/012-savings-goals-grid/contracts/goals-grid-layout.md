# Contract: Goals Grid Layout

**Feature**: 012-savings-goals-grid  
**Type**: UI Component Contract  
**Date**: 2026-06-13

## Component: `GoalsGrid`

Responsável pelo layout dos cards de objetivos em formato de grid responsivo.

### Props

```ts
interface GoalsGridProps {
  goals: Goal[];
}
```

### Responsive Behavior

| Breakpoint | Min Width | Layout | Columns | Card Sizes |
|------------|-----------|--------|---------|------------|
| Mobile (default) | 320px | Coluna única vertical | 1 | `default` / `tall` (todos full-width) |
| Tablet (`md:`) | 768px | Coluna única com pares horizontais | 1 | `default`, `wide` (full-width) |
| Desktop (`lg:`) | 1024px | Duas colunas assimétricas (flex-[2] + flex-1) | 2 | `default`, `wide` (838px max), `tall` |

### Desktop Grid Specification

```
┌──────────────────────────────────────────────────────┐
│ Row 0 (not mirrored)                                 │
│ ┌──────────────────────┐ ┌──────────┐                │
│ │ flex-[2] max-w[838px]│ │ flex-1   │                │
│ │ ┌──────────────────┐ │ │          │                │
│ │ │   WIDE (240px)   │ │ │  TALL    │                │
│ │ └──────────────────┘ │ │ (504px)  │                │
│ │ gap: 24px            │ │          │                │
│ │ ┌────────┐┌────────┐ │ │          │                │
│ │ │DEFAULT ││DEFAULT │ │ │          │                │
│ │ │(240px) ││(240px) │ │ │          │                │
│ │ └────────┘└────────┘ │ │          │                │
│ └──────────────────────┘ └──────────┘                │
│ gap between columns: 24px                            │
├──────────────────────────────────────────────────────┤
│ Row 1 (mirrored)                                     │
│ ┌──────────┐ ┌──────────────────────┐                │
│ │ flex-1   │ │ flex-[2] max-w[838px]│                │
│ │          │ │ ┌──────────────────┐ │                │
│ │  TALL    │ │ │   WIDE (240px)   │ │                │
│ │ (504px)  │ │ └──────────────────┘ │                │
│ │          │ │ gap: 24px            │                │
│ │          │ │ ┌────────┐┌────────┐ │                │
│ │          │ │ │DEFAULT ││DEFAULT │ │                │
│ │          │ │ │(240px) ││(240px) │ │                │
│ │          │ │ └────────┘└────────┘ │                │
│ └──────────┘ └──────────────────────┘                │
│ Row gap: 24px                                        │
└──────────────────────────────────────────────────────┘
```

### Tablet Grid Specification

```
┌──────────────────────────────┐
│ Cards em coluna única:       │
│ ┌──────────────────────────┐ │
│ │   WIDE (full-width)      │ │
│ └──────────────────────────┘ │
│ gap: 24px                    │
│ ┌──────────┐ ┌────────────┐  │
│ │ DEFAULT  │ │  DEFAULT   │  │
│ └──────────┘ └────────────┘  │
│ gap: 24px                    │
│ ┌──────────────────────────┐ │
│ │   CARD (full-width)      │ │
│ └──────────────────────────┘ │
│ gap: 24px                    │
│ ┌──────────────────────────┐ │
│ │   WIDE (full-width)      │ │
│ └──────────────────────────┘ │
│ gap: 24px                    │
│ ┌──────────┐ ┌────────────┐  │
│ │ DEFAULT  │ │  DEFAULT   │  │
│ └──────────┘ └────────────┘  │
│ gap: 24px                    │
│ ┌──────────────────────────┐ │
│ │   CARD (full-width)      │ │
│ └──────────────────────────┘ │
└──────────────────────────────┘
```

### Mobile Grid Specification

```
┌────────────────────┐
│ Cards em coluna    │
│ única:             │
│ ┌────────────────┐ │
│ │  WIDE (240px)  │ │ px-4 (padding horizontal reduzido)
│ └────────────────┘ │
│ gap: 24px          │
│ ┌────────────────┐ │
│ │ DEFAULT (200px)│ │
│ └────────────────┘ │
│ gap: 24px          │
│ ┌────────────────┐ │
│ │ DEFAULT (200px)│ │
│ └────────────────┘ │
│ gap: 24px          │
│ ┌────────────────┐ │
│ │  TALL (260px)  │ │
│ └────────────────┘ │
│ gap: 24px          │
│ ...                │
└────────────────────┘
```

### Spacing Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `gap-6` | 24px | Espaçamento entre colunas, entre linhas, entre cards |
| `p-5` | 20px | Padding do container do grid |
| `pt-5` / `px-0` | 20px top, 0 horizontal | Padding do header |
| `px-4` | 16px | Padding horizontal mobile |

---

## Component: `GoalsHeader`

### Props

```ts
interface GoalsHeaderProps {
  title: string;
}
```

### Layout

```
┌──────────────────────────────────────────────────┐
│ Desktop (lg:flex-row):                            │
│ ┌────────────────────┐ ┌───────────────────────┐  │
│ │ "Your goals"       │ │ [Filters] [Sort By]   │  │
│ │ (32px, semibold)   │ │ (btn: #1f1f1f bg,     │  │
│ │                    │ │  #3c3b40 border)       │  │
│ └────────────────────┘ └───────────────────────┘  │
│                                                    │
│ Tablet (md:flex-row): same as desktop              │
│                                                    │
│ Mobile (flex-col):                                 │
│ ┌────────────────────────────────────────────────┐ │
│ │ "Your goals"                                   │ │
│ └────────────────────────────────────────────────┘ │
│ ┌──────────────────────┐┌──────────────────────┐  │
│ │ [Filters]            ││ [Sort By]            │  │
│ │ (full-width)         ││ (full-width)         │  │
│ └──────────────────────┘└──────────────────────┘  │
└──────────────────────────────────────────────────┘
```

---

## Component: `EmptyState`

### Props

```ts
interface EmptyStateProps {
  /** Se true, exibe preview cards (desktop/tablet). Se false, apenas mensagem (mobile). */
  showExampleCards: boolean;
  /** Objetivos de exemplo para preview (4-8 itens) */
  exampleGoals: Goal[];
}
```

### Layout (Desktop/Tablet — `showExampleCards = true`)

```
┌──────────────────────────────────────────────────┐
│ Container: rounded-2xl, border #3c3b40, bg #1f1f1f│
│ padding: 40px top/bottom                          │
│ ┌──────────────────────────────────────────────┐  │
│ │         [icon 40x40]                         │  │
│ │  "Você ainda não possui objetivos            │  │
│ │   financeiros."                              │  │
│ │  "Crie seu primeiro objetivo para começar    │  │
│ │   a acompanhar suas metas."                  │  │
│ └──────────────────────────────────────────────┘  │
│ ┌──────────────────────────────────────────────┐  │
│ │ [Header repetido: "Your goals" + Filters +  │  │
│ │  Sort By — texto muted #898a8b]             │  │
│ └──────────────────────────────────────────────┘  │
│ ┌──────────────────────────────────────────────┐  │
│ │ Row 1 preview cards (mesmo layout do grid)   │  │
│ └──────────────────────────────────────────────┘  │
│ ┌──────────────────────────────────────────────┐  │
│ │ Row 2 preview cards (mesmo layout do grid)   │  │
│ └──────────────────────────────────────────────┘  │
│ ┌──────────────────────────────────────────────┐  │
│ │     [Create your first goal] (btn orange)    │  │
│ └──────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────┘
```

### Layout (Mobile — `showExampleCards = false`)

```
┌──────────────────────────────────────┐
│ Container: rounded-2xl, border       │
│ padding: 40px 16px                   │
│ ┌──────────────────────────────────┐  │
│ │         [icon 40x40]             │  │
│ │  "Você ainda não possui          │  │
│ │   objetivos financeiros."        │  │
│ │  "Crie seu primeiro objetivo     │  │
│ │   para começar a acompanhar      │  │
│ │   suas metas."                   │  │
│ └──────────────────────────────────┘  │
│ ┌──────────────────────────────────┐  │
│ │  [Create your first goal]        │  │
│ └──────────────────────────────────┘  │
└──────────────────────────────────────┘
```

---

## Component: `GoallessExample`

### Props

```ts
interface GoallessExampleProps {
  goals: Goal[];
}
```

### Description

Componente interno que renderiza cards de exemplo com opacidade reduzida no estado vazio (desktop/tablet). Segue o mesmo layout do `GoalsGrid` mas com os cards em estilo muted para indicar que são previews.

### Styling

- Cards com `opacity-50` ou similar para indicar estado de preview
- Todos os textos e interações nos cards de preview são não-interativos (`pointer-events-none`)
- O layout de grid é idêntico ao estado populado (mesmo componente `GoalsGrid` com prop `muted` ou wrapper com opacidade)
