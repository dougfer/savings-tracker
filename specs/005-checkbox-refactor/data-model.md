# Data Model: AppCheckbox Refactoring

**Feature**: Refatoração do Componente AppCheckbox
**Date**: 2026-05-23
**Design Source**: Pencil `app.pen` node Q5Ei9 (`_Checkbox base`)

This document describes the **component API model** for `AppCheckbox` after refactoring verification. It confirms alignment with the shared-ui-components data-model and documents any refinements.

## Component Overview

**Purpose**: Allow users to select/deselect options in forms (terms acceptance, settings, preferences).

**Design Alignment Status**: ✅ Verified - implementation matches Pencil Q5Ei9 specification.

## Props (Root)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | Form submission value (required) |
| `isChecked` | `boolean` | `false` | Controlled checked state |
| `defaultIsChecked` | `boolean` | `false` | Uncontrolled initial state |
| `onChange` | `(checked: boolean) => void` | — | Change handler |
| `isDisabled` | `boolean` | `false` | Disables interaction (`opacity-50`) |
| `isInvalid` | `boolean` | `false` | Passed to Gluestack (no Pencil visual) |
| `isIndeterminate` | `boolean` | `false` | Passed to Gluestack (no Pencil visual) |
| `isReadOnly` | `boolean` | `false` | Passed to Gluestack |
| `className` | `string?` | — | Additional NativeWind classes |
| `children` | `ReactNode` | — | `Indicator` + `Label` subparts |

## Compound Subparts

| Subpart | Purpose | Implementation |
|---------|---------|----------------|
| `AppCheckbox.Indicator` | Visual checkbox box (16×16 circle) | Wraps `UICheckbox.Indicator` with border styling |
| `AppCheckbox.Label` | Associated text label | Wraps `UICheckbox.Label` with typography styling |

## Layout (Pencil Q5Ei9)

| Element | Value |
|---------|-------|
| Indicator size | `h-4 w-4` (16×16) |
| Indicator shape | `rounded-full` (circle) |
| Indicator border | `border border-neutral-500` |
| Checked mark | Inset dot `h-2 w-2 bg-orange-400 rounded-full` (#FF5722, 8px) |
| Root layout | `flex-row items-center gap-2` |
| Label typography | `font-sans-medium text-body text-neutral-300` |

## States

| State | Visual (Indicator) | Behavioral |
|-------|---------------------|------------|
| Default, unchecked | Border only (`border-neutral-500`) | Interactive |
| Default, checked | Border + orange inset dot | Interactive |
| Hover (web) | No explicit style (acceptable) | Interactive |
| Focus visible | `bg-neutral-900` + ring (`native:` border-2 orange / `web:` double shadow) | Interactive |
| Disabled | Root `opacity-50` | Non-interactive, `onChange` ignored |

## Focus Ring Implementation

**Native (iOS/Android)**:
```
data-[focus-visible=true]:bg-neutral-900
data-[focus-visible=true]:border-2
data-[focus-visible=true]:border-orange-400
```

**Web**:
```
data-[focus-visible=true]:bg-neutral-900
data-[focus-visible=true]:shadow-[0_0_0_4px_#FF5722,0_0_0_6px_#101010]
```

Source: `pencilFocusRingWithBgClasses` from `@/lib/nativewind/pencil-focus-ring`

## State-Driven Styling

The component uses `withStates` HOC for native state resolution:

| Native State | Applied When |
|--------------|--------------|
| `data-[disabled=true]` | `isDisabled={true}` |
| `data-[focus-visible=true]` | Element has focus |
| `data-[checked=true]` | `isChecked={true}` |
| `data-[invalid=true]` | `isInvalid={true}` |
| `data-[active=true]` | Pressed state |

On web, Gluestack creators set `dataSet` attributes directly, matching CSS attribute selectors.

## Accessibility

- **Role**: `checkbox` (via Gluestack)
- **State exposure**: `accessibilityState: { checked, disabled, invalid }`
- **Label**: Derived from `Label` subpart text content
- **Keyboard**: Fully navigable via Tab/Enter/Space
- **Focus visible**: Orange ring (per Constitution requirement)

## Backward Compatibility

All existing usages remain valid:
```tsx
<AppCheckbox value="terms" isChecked={agreed} onChange={setAgreed}>
  <AppCheckbox.Indicator />
  <AppCheckbox.Label>I agree to the terms</AppCheckbox.Label>
</AppCheckbox>
```

## Verification Checklist

| Requirement | Status | Source |
|-------------|--------|--------|
| Indicator 16×16 | ✅ | `h-4 w-4` |
| Circle shape | ✅ | `rounded-full` |
| Border neutral-500 | ✅ | `border-neutral-500` |
| Orange checked dot | ✅ | `h-2 w-2 bg-orange-400 rounded-full` |
| Focus ring (native) | ✅ | `pencilFocusRingWithBgClasses` |
| Disabled opacity | ✅ | `data-[disabled=true]:opacity-50` |
| Label typography | ✅ | `appCheckboxLabelClassName` |
| Compound pattern | ✅ | `AppCheckbox.Indicator`, `AppCheckbox.Label` |
| onChange callback | ✅ | Props interface |
| Accessibility | ✅ | role=checkbox, accessibilityState |

## Implementation Reference

**File**: `src/components/ui/app-checkbox/app-checkbox.tsx`

**Key imports**:
- `createCheckbox` from `@gluestack-ui/core/checkbox/creator`
- `withStates` from `@/lib/gluestack/with-states-interop`
- `tva` from `@gluestack-ui/utils/nativewind-utils`
- `cssInterop` from `nativewind`
- `pencilFocusRingWithBgClasses` from `@/lib/nativewind/pencil-focus-ring`