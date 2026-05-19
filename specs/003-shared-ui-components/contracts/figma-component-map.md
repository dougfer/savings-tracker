# Figma → Component Mapping

**Figma File**: [savings-tracker](https://www.figma.com/design/UtM4hqbnpAz8GAmCUO3ERr/savings-tracker)  
**fileKey**: `UtM4hqbnpAz8GAmCUO3ERr`

> **Note (2026-05-13)**: Figma API returned HTTP 429 (rate-limited) during both planning and implementation phases.
> Token mappings below are derived from:
> - Existing `tailwind.config.js` tokens (spec 002, already Figma-sourced)
> - `data-model.md` token pre-mapping from planning
> - Nearest Tailwind spacing/radius scale values
> Extraction should be re-attempted when the API quota resets.

## Component Nodes

| Component | Node ID | Figma URL | Extraction Status |
|-----------|---------|-----------|-------------------|
| Button | Pencil `UpBXR` (`app.pen`) | — | ✅ Pencil — Primary / Secondary / Tertiary |
| Checkbox | `291:1557` | [Open](https://www.figma.com/design/UtM4hqbnpAz8GAmCUO3ERr/savings-tracker?node-id=291-1557) | ⚠️ 429 — derived from tokens |
| Dropdown Menu | `271:996` | [Open](https://www.figma.com/design/UtM4hqbnpAz8GAmCUO3ERr/savings-tracker?node-id=271-996) | ⚠️ 429 — derived from tokens |
| ProgressBar | `297:1695` | [Open](https://www.figma.com/design/UtM4hqbnpAz8GAmCUO3ERr/savings-tracker?node-id=297-1695) | ⚠️ 429 — derived from tokens |
| Input | `307:1217` | [Open](https://www.figma.com/design/UtM4hqbnpAz8GAmCUO3ERr/savings-tracker?node-id=307-1217) | ⚠️ 429 — derived from tokens |
| Avatar | `357:8000` | [Open](https://www.figma.com/design/UtM4hqbnpAz8GAmCUO3ERr/savings-tracker?node-id=357-8000) | ⚠️ 429 — derived from tokens |

## Design Token Nodes (from spec 002)

| Area | Node ID | Status |
|------|---------|--------|
| Colors | `271:2935` | Extracted → `tailwind.config.js` |
| Typography | `271:2905` | Extracted → `tailwind.config.js` |
| Spacing | `271:3209` | Extracted → `tailwind.config.js` |
| Radius | `271:3317` | Extracted → `tailwind.config.js` |

---

## Button

**Source**: Pencil `app.pen` → node `UpBXR` (frame name: `Button`).

### Variants (Hierarchy)

| Variant | Background | Text | Border | Radius / padding |
|---------|------------|------|--------|------------------|
| primary | `bg-orange-400` → hover `bg-primary` | `text-neutral-900` | — | `rounded-full`, `py-3 px-5`, `gap-2.5` |
| secondary | `bg-neutral-800` → hover `bg-neutral-700` | `text-neutral-0`; disabled `text-neutral-400` | `border-secondary` | `rounded-full`, `py-3 px-5` |
| tertiary | transparent → hover `bg-neutral-800`, focus `bg-neutral-900` | `text-neutral-0`; disabled `text-neutral-400` | — | `rounded-full`, `py-3 px-4` |

### Layout (single size)

| Property | Token / value |
|----------|----------------|
| Min height | 48px |
| Typography | `font-sans-medium text-body` (16px, weight 500) |
| Icon (in design) | 20×20 in examples |

### States

| State | Visual override |
|-------|-----------------|
| Hover (web) | Hierarchy-specific background (see variants) |
| Pressed | `data-[active=true]:opacity-80` |
| Focus visible | Outer shadow `0 0 0 4px #FF5722`, `0 0 0 6px #101010` |
| Disabled | Secondary/tertiary label `text-neutral-400` |
| Loading | `AppButton.Spinner` + `isLoading` (non-interactive) |

---

## Input

### Variants

| Variant | Border | Radius | Focus Override |
|---------|--------|--------|---------------|
| outline | `border border-input` | `rounded-md` | `data-[focus=true]:border-ring` |
| underlined | `border-b border-input` | `rounded-none` | `data-[focus=true]:border-ring` |
| rounded | `border border-input` | `rounded-full` | `data-[focus=true]:border-ring` |

### Sizes

| Size | Height | Padding H | Font Size |
|------|--------|-----------|-----------|
| sm | 36px | `px-3` | `text-body-sm` |
| md | 44px | `px-4` | `text-body` |
| lg | 52px | `px-5` | `text-body` |

### States

| State | Visual |
|-------|--------|
| Default | `border-input` |
| Focused | `border-ring` |
| Error / isInvalid | `border-destructive` |
| Disabled | `opacity-40` |
| Read-only | `bg-muted` |

---

## Checkbox

### Sizes

| Size | Indicator | Label Font |
|------|-----------|-----------|
| sm | 16×16px | `text-body-sm` |
| md | 20×20px | `text-body` |
| lg | 24×24px | `text-body` |

### States

| State | Indicator Visual |
|-------|-----------------|
| Unchecked | `bg-transparent border-2 border-input` |
| Checked | `bg-primary border-primary` |
| Indeterminate | `bg-primary border-primary` (dash icon) |
| Focused | `ring-2 ring-ring` |
| Disabled | `opacity-40` |
| Invalid | `border-destructive` |

---

## Avatar

**Source**: Pencil `app.pen` → node `M8Qbp`.

### Layout

| Property | Value |
|----------|--------|
| Size | 48×48 (`h-12 w-12`) |
| Shape | `rounded-full` |
| Fallback text | `font-sans-medium text-body text-neutral-300` |

### States

| State | Background | Border |
|-------|------------|--------|
| Default | `bg-neutral-700` | `border-neutral-500` |
| Hover | `bg-neutral-600` | `border-neutral-400` |
| Focus visible | Default bg + orange/dark shadow ring | — |

---

## ProgressBar

### Sizes (track height)

| Size | Height |
|------|--------|
| xs | `h-0.5` (2px) |
| sm | `h-1` (4px) |
| md | `h-2` (8px) |
| lg | `h-3` (12px) |

### Variants (fill color)

| Variant | Fill Color |
|---------|-----------|
| default | `bg-primary` (`#EB430E`) |
| success | `bg-success` (`#4ADE80`) |
| warning | `bg-warning` (`#FF5722`) |

### Track

- Background: `bg-muted` (`#E0E4EA`)
- Radius: `rounded-full`

---

## Dropdown Menu

### Container

| Property | Value |
|----------|-------|
| Background | `bg-card` |
| Border | `border border-border` |
| Radius | `rounded-xl` |
| Shadow | `shadow-md` |
| Min width | `min-w-[160px]` |
| Padding | `py-1` |

### Item

| State | Background | Padding |
|-------|-----------|---------|
| Default | transparent | `px-3 py-2.5` |
| Hover / Active | `bg-muted` | same |

### Pattern

Figma API 429 — pattern assumed **popover** (Menu) based on desktop/mobile hybrid design.
Gluestack `Menu` is used; swap to `Actionsheet` if Figma confirms bottom-sheet when API recovers.

---

## Modal

### Sizes

| Size | Max Width |
|------|----------|
| sm | `max-w-sm` (384px) |
| md | `max-w-md` (448px) |
| lg | `max-w-lg` (512px) |
| full | `w-full h-full` |

### Container

| Part | Classes |
|------|---------|
| Backdrop | `bg-black/50` |
| Content | `bg-card border border-border rounded-2xl mx-4` |
| Header | `px-6 pt-6 pb-4` |
| Body | `px-6 pb-4` |
| Footer | `px-6 pb-6 flex-row gap-3` |
