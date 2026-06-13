# Research: Goal Card Component

**Feature**: 011-goal-card  
**Date**: 2026-06-11

## 1. Design Analysis (app.pen Node `iRrfV`)

### Source data

The design file `app.pen` node `iRrfV` ("Components - Goal Card", 1324×1096) contains 6 card variants covering 3 states × 3 sizes. The user explicitly stated the component goes inside `components` of the `overview` feature, with a simple props-based API (no Compound Components).

### Card Variants

| # | Design ID | State | Size | Dimensions | Background |
|---|-----------|-------|------|------------|------------|
| 1 | k4d8T | No Progress | Default | 408×240 | `neutral-800` (#1F1F1F) |
| 2 | XSQIr | In Progress | Default | 408×240 | `neutral-800` (#1F1F1F) |
| 3 | bRORI | Complete | Default | 408×240 | `neutral-800` (#1F1F1F) |
| 4 | qaYeq | In Progress | Wide | 838×240 | Gradient `orange-400`→`orange-700` |
| 5 | MTC5m | In Progress | Tall | 408×504 | `neutral-800` (#1F1F1F) |
| 6 | BrpWu | Complete | Tall | 408×504 | `neutral-800` (#1F1F1F) |

**Decision**: The 6 variants cover all required combinations. Note: No Progress + Wide and No Progress + Tall are not in the design; Complete + Wide is also absent. These missing combinations will fall back to Default size behavior.

### Internal Structure (common layout)

Every card follows the same vertical stack with `gap: 6` (24px) and `padding: 6` (24px):

```
┌─ Card (rounded-2xl, border, bg) ───────────────────┐
│ [Decoration layer] (SVG pattern, absolute, opacity 0.03) │
│ ┌─ Header Row (gap: 2.5, alignItems: center) ────┐ │
│ │ Product name (Inter 20/600, white)              │ │
│ │ [COMPLETE Tag] (hidden unless state=Complete)   │ │
│ └────────────────────────────────────────────────┘ │
│ ┌─ Progress Section (flex: 1, justifyContent: end)┐ │
│ │ Percentage (Bricolage 64/600)                   │ │
│ │ Progress Bar (outer: rounded-full, neutral-700) │ │
│ │   └─ Inner Bar (height: 12, rounded-lg, %width) │ │
│ └────────────────────────────────────────────────┘ │
│ ┌─ Footer Row (gap: 2, alignItems: center) ─────┐ │
│ │ "$X of $Y" · "Due Jun 1, 2026"                │ │
│ └────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────┘
```

### Color Tokens by State

| Element | No Progress | In Progress (Dark) | Complete | In Progress (Wide) |
|---------|-------------|---------------------|----------|---------------------|
| Card background | `neutral-800` | `neutral-800` | `neutral-800` | Gradient: `orange-400`→`orange-700` |
| Card border | `neutral-600` | `neutral-600` | `neutral-600` | `white/30` |
| Percentage text | `neutral-400` | `orange-400` | `success` | `white` |
| Progress bar track | `neutral-700` | `neutral-700` | `neutral-700` | `orange-800` |
| Progress bar fill | `orange-400` (0px) | `orange-400` | `success` | `white` |
| COMPLETE tag bg | hidden | hidden | `green-900` | hidden |
| COMPLETE tag border | hidden | hidden | `success` | hidden |
| Amount raised | `white` | `white` | `white` | `white` |
| Dot | `neutral-300` | `neutral-300` | `neutral-300` | `white/30` |
| Due date | `white` (70%) | `white` (70%) | `white` (70%) | `white` |

### Font Tokens

| Element | Font | Size | Weight |
|---------|------|------|--------|
| Product name | `font-sans-semibold` | `heading-md` (20px) | 600 |
| Percentage | `font-display-semibold` | `display-lg` (64px) | 600 |
| Amount raised | `font-sans-medium` | `body-sm` (14px) | 500 |
| Due date | `font-sans-medium` | `body-sm` (14px) | 500 |
| COMPLETE tag | `font-sans-semibold` | `caption` (11px) | 600 |

### Progress Bar Dimensions

- Outer track: `rounded-full` (pill shape, ≈40px from design), height 12px, `neutral-700`
- Inner fill: `rounded-lg` (8px), height 12px, width proportional to `progress`
- Inner border: 1px `white/30` (stroke alignment: inner)

**Decision**: Use `AppProgressBar` as base but override styling since the Goal Card progress bar has specific dimensions (12px height) and colors that differ from the shared component defaults. Alternatively, render a custom progress bar inline with Views.

### Decorative Pattern

Each card has an absolute-positioned SVG path (the same `VectorPatternIcon` used in SummaryCard) at `opacity: 0.03`, positioned at varying coordinates depending on the variant. The pattern serves as subtle texture, not structural information.

**Decision**: Reuse `VectorPatternIcon` from `@/assets/icons`, positioned absolutely with `opacity-[0.03]`. Exact positioning varies per variant; default offset (`-bottom-24 -right-14`) matches SummaryCard pattern.

## 2. Component API Design

### Decision: Simple Props (no Compound Components)

Per user requirement, the component uses a flat props interface:

```ts
type GoalCardProps = {
  goal: Goal;           // goal data object
  size?: GoalSize;      // 'default' | 'wide' | 'tall' (default: 'default')
};
```

State (No Progress / In Progress / Complete) is **derived** from the goal's `currentAmount` and `targetAmount` — no explicit state prop needed. The component computes:
- `progress = clamp(currentAmount / targetAmount, 0, 1)`
- `state = progress === 0 ? 'no-progress' : progress >= 1 ? 'complete' : 'in-progress'`

**Rationale**: Deriving state from data eliminates the risk of inconsistent props (e.g., `state='complete'` but `currentAmount < targetAmount`). Single source of truth.

### Alternatives Considered

1. **Compound Components** (`GoalCard.Root`, `GoalCard.Header`, etc.): Rejected per user requirement. Adds unnecessary API complexity for a single-card use case.
2. **Explicit `state` prop**: Rejected. Introduces risk of data/state mismatch. State should be derivable from amounts.
3. **Separate components per state**: Rejected. Would duplicate structural markup and increase maintenance burden.

## 3. Responsive Behavior

The component adapts via the `size` prop:
- **default** (408x240): Standard card for lists and grids. Width fills container, height fixed at 240px.
- **wide** (838x240): Horizontal emphasis. Width fills container, height fixed at 240px. Uses gradient background. Only shown for In Progress state; falls back to default otherwise.
- **tall** (408x504): Vertical emphasis for highlighted goals. Width fills container, height fixed at 504px. Extra vertical space expands the progress section.

On mobile (< 768px), all sizes collapse to full-width responsive layout with minimum widths enforced.

**Decision**: Size-specific styling uses a mapping object (pattern from AppProgressBar), not conditional rendering of separate sub-components.

## 4. Dependencies & Integration

- **Existing**: `AppText`, `VectorPatternIcon`, `useResponsive`, `formatCurrency` (from `../utils/format-currency`)
- **SVG gradient** (Wide variant only): `react-native-svg` (`LinearGradient`, `Rect`, `Stop`, `Defs`) — same pattern as `TotalSavingsCard`
- **No new external dependencies** required
- **No backend integration** — component is purely presentational, data via props

## 5. Accessibility

- Card root: `accessibilityRole="summary"` with computed `accessibilityLabel`
- Percentage: Text element, natively readable by screen readers
- Progress bar: Use `accessibilityRole="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- COMPLETE tag: Announce via `accessibilityLabel` on card root when state is Complete
