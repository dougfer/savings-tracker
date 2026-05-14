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
| Button | `271:3896` | [Open](https://www.figma.com/design/UtM4hqbnpAz8GAmCUO3ERr/savings-tracker?node-id=271-3896) | ⚠️ 429 — derived from tokens |
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

### Variants

| Variant | Background | Text Color | Border | Radius |
|---------|------------|------------|--------|--------|
| primary | `bg-primary` (`#EB430E`) | `text-primary-foreground` (`#FFFFFF`) | none | `rounded-xl` |
| secondary | `bg-secondary` (`#3C3B40`) | `text-secondary-foreground` (`#FFFFFF`) | none | `rounded-xl` |
| outline | `bg-transparent` | `text-foreground` (`#02012C`) | `border border-border` | `rounded-xl` |
| destructive | `bg-destructive` (`#EF4444`) | `text-destructive-foreground` (`#FFFFFF`) | none | `rounded-xl` |

### Sizes

| Size | Min Height | Padding H | Padding V | Font Size | Icon Size |
|------|-----------|-----------|-----------|-----------|-----------|
| sm | 36px | `px-3` (12px) | `py-1.5` (6px) | `text-body-sm` | 16px |
| md | 44px | `px-4` (16px) | `py-2.5` (10px) | `text-body` | 20px |
| lg | 52px | `px-5` (20px) | `py-3` (12px) | `text-body` | 24px |

### States

| State | Visual Override |
|-------|----------------|
| Hover (web) | `data-[hover=true]:opacity-90` |
| Pressed | `data-[active=true]:opacity-80` |
| Focused | `data-[focus-visible=true]:ring-2 ring-ring` |
| Disabled | `opacity-40` |
| Loading | Spinner visible, text opacity reduced |

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

### Sizes

| Size | Dimensions | Fallback Font |
|------|-----------|--------------|
| xs | 24×24px (`w-6 h-6`) | `text-caption` |
| sm | 32×32px (`w-8 h-8`) | `text-caption` |
| md | 40×40px (`w-10 h-10`) | `text-body-sm` |
| lg | 48×48px (`w-12 h-12`) | `text-body` |
| xl | 64×64px (`w-16 h-16`) | `text-body` |
| 2xl | 80×80px (`w-20 h-20`) | `text-heading-sm` |

### Appearance

- Shape: `rounded-full`
- Fallback background: `bg-muted`
- Fallback text: `text-muted-foreground`
- Badge: `bg-success rounded-full` (online indicator)

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
