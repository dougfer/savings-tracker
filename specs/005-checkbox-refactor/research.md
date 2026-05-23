# Research: AppCheckbox Refactoring

**Feature**: Refatoração do Componente AppCheckbox  
**Date**: 2026-05-23  
**Status**: Complete

## Research Questions

### RQ-01: Current Implementation Alignment with Design System

**Question**: Does the current `AppCheckbox` implementation align with the Pencil design system (node Q5Ei9)?

**Findings**:

| Aspect | Pencil Spec | Current Implementation | Alignment |
|--------|-------------|----------------------|-----------|
| Indicator size | 16×16 (`h-4 w-4`) | `h-4 w-4` | ✅ Match |
| Indicator shape | Circle (`rounded-full`) | `rounded-full` | ✅ Match |
| Border | `border-neutral-500` | `border-neutral-500` | ✅ Match |
| Checked dot | Orange inset (#FF5722), 8px | `h-2 w-2 bg-orange-400 rounded-full` (8px) | ✅ Match |
| Focus ring | `bg-neutral-900` + orange ring | via `pencilFocusRingWithBgClasses` | ✅ Match |
| Disabled opacity | `opacity-50` on root | `data-[disabled=true]:opacity-50` | ✅ Match |
| Root layout | `flex-row items-center gap-2` | `flex-row items-center gap-2` | ✅ Match |
| Label style | `font-sans-medium text-body text-neutral-300` | `appCheckboxLabelClassName` | ✅ Match |

**Conclusion**: The current implementation is already well-aligned with the design system. No structural changes required.

---

### RQ-02: State Management Behavior

**Question**: How does the checkbox handle state transitions (checked, unchecked, disabled, focus)?

**Findings**:

The component uses Gluestack UI v3 `createCheckbox` which provides:
- Headless checkbox primitives with automatic state management
- Context-based state sharing between Root, Indicator, Icon, and Label
- `states` and `dataSet` props for state-driven styling

The `withStates` HOC (`src/lib/gluestack/with-states-interop.tsx`) wraps primitives to:
- Resolve `data-[xxx=true]:` classes on native platforms
- Bridge Gluestack state changes to NativeWind styling

**State Transitions**:
1. **Unchecked → Checked**: User presses → `onChange` fires with `!isChecked` → UI updates via context
2. **Checked → Unchecked**: Same flow in reverse
3. **Normal → Disabled**: `isDisabled=true` prop → `opacity-50` applied, `onChange` ignored
4. **Normal → Focus**: Focus ring appears via `data-[focus-visible=true]:` classes

**Test Coverage**: Existing test suite covers:
- Rendering with Indicator and Label
- `onChange` callback on press
- `isChecked` state reflection
- Check dot visibility (only when checked)
- Disabled state behavior
- `isInvalid` prop passthrough
- Accessibility role

**Conclusion**: State management is correctly implemented via Gluestack + withStates interop.

---

### RQ-03: Backward Compatibility Analysis

**Question**: Will the refactoring maintain compatibility with existing usages?

**Findings**:

**Current Usage Pattern** (from quickstart.md):
```tsx
<AppCheckbox value="terms" isChecked={agreed} onChange={setAgreed}>
  <AppCheckbox.Indicator />
  <AppCheckbox.Label>I agree to the terms</AppCheckbox.Label>
</AppCheckbox>
```

**Props API**:
| Prop | Type | Default | Status |
|------|------|---------|--------|
| `value` | `string` | required | ✅ Preserved |
| `isChecked` | `boolean` | `false` | ✅ Preserved |
| `defaultIsChecked` | `boolean` | `false` | ✅ Preserved |
| `onChange` | `(checked: boolean) => void` | — | ✅ Preserved |
| `isDisabled` | `boolean` | `false` | ✅ Preserved |
| `isInvalid` | `boolean` | `false` | ✅ Preserved |
| `isIndeterminate` | `boolean` | `false` | ✅ Preserved |
| `isReadOnly` | `boolean` | `false` | ✅ Preserved |
| `className` | `string?` | — | ✅ Preserved |
| `children` | `ReactNode` | — | ✅ Preserved |

**Compound Components**:
| Subpart | Status |
|---------|--------|
| `AppCheckbox.Indicator` | ✅ Preserved |
| `AppCheckbox.Label` | ✅ Preserved |

**Conclusion**: The current implementation is already compatible. Any refactoring should preserve this API.

---

### RQ-04: Accessibility Requirements

**Question**: Does the component meet accessibility requirements per the Constitution?

**Findings**:

**Constitution Requirements** (Acessibilidade - VII):
- Navegação completa por teclado
- Estados de foco visíveis
- Semântica correta
- Contraste adequado
- Feedback acessível
- Labels corretas
- Suporte para leitores de tela

**Gluestack Implementation**:
- `role="checkbox"` - correct semantic role
- `accessibilityState: { checked, disabled }` - state exposed to AT
- `accessibilityLabel` - can be set via label content

**Current Focus Handling**:
- Web: `data-[focus-visible=true]:shadow-[0_0_0_4px_#FF5722,0_0_0_6px_#101010]` (orange + dark ring)
- Native: `data-[focus-visible=true]:border-2 data-[focus-visible=true]:border-orange-400`

**Gap Identified**:
- Hover state on web (`data-[hover=true]:`) is not explicitly styled
- This is acceptable per Constitution since "Hover sem equivalente de foco DEVE ser tratado como defeito" - but focus IS styled, so hover on web may be acceptable if it doesn't reduce usability

**Conclusion**: Component meets accessibility requirements. Focus states are visible on both native and web.

---

### RQ-05: Technical Stack Compatibility

**Question**: Is the implementation using the correct Gluestack v3 patterns?

**Findings**:

**Correct Patterns Used**:
1. ✅ `createCheckbox` from `@gluestack-ui/core/checkbox/creator` - correct v3 creator
2. ✅ `withStates` HOC for state-driven styling on native
3. ✅ `tva` for variant-based class composition
4. ✅ `cssInterop` for NativeWind integration
5. ✅ Compound component pattern with namespaced subparts

**Alignment with project rules** (from `.cursor/rules/compound-components.mdc`):
> "For interactive components (Button, Input, Checkbox, Modal, Menu), use creator functions from `@gluestack-ui/core/<component>/creator` to get headless primitives with automatic state management (`states`/`dataSet` props) + a11y. Wrap the Root with `withStates()`"

**Conclusion**: Implementation follows all project conventions correctly.

---

## Alternatives Considered

### Alt-1: Full Rewrite vs Incremental Update

**Option**: Rewrite entire component from scratch
**Decision**: Not chosen - current implementation is well-aligned with design system and follows project conventions

**Rationale**: 
- Existing tests pass and cover key scenarios
- No structural deficiencies identified
- Risk of introducing regressions outweighs potential benefits

### Alt-2: State Management Library Change

**Option**: Switch from Gluestack to React Native Paper or other UI library
**Decision**: Not chosen - Gluestack v3 is the project standard

**Rationale**:
- Consistency with other components (Button, Input, Avatar, etc.)
- Project has established patterns and utilities for Gluestack
- Migration would be out of scope

---

## Summary

The `AppCheckbox` component is **already well-aligned** with the design system and requires no major structural changes. The current implementation:

1. ✅ Matches Pencil Q5Ei9 specifications
2. ✅ Uses correct Gluestack v3 patterns
3. ✅ Maintains backward compatibility
4. ✅ Meets accessibility requirements
5. ✅ Follows project conventions

**Recommendation**: The task should focus on:
1. Documentation update (this plan, research, data-model, quickstart)
2. Verification that all spec requirements are met
3. Minor improvements only if gaps are identified

No functional refactoring is necessary unless new requirements emerge from design review.