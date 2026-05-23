# Implementation Plan: Refatoração do Componente AppCheckbox

**Branch**: `005-checkbox-refactor` | **Date**: 2026-05-23 | **Spec**: specs/005-checkbox-refactor/spec.md
**Input**: Feature specification from feature request (refatoração do AppCheckbox para alinhamento com Design System)

## Summary

Refatorar o componente `AppCheckbox` existente para garantir plena compatibilidade com o Design System (Pencil `app.pen` node Q5Ei9). O componente utiliza Gluestack UI v3 `createCheckbox` com wrappers `withStates` para estados visuais (checked, unchecked, disabled, focus). A refatoração ensure alignment com a estrutura, estados e estilos definidos no data-model.md de specs/003-shared-ui-components.

## Technical Context

**Language/Version**: TypeScript 5.x (React Native / Expo)  
**Primary Dependencies**: `@gluestack-ui/core@^5` (checkbox creator), `nativewind@^4`, `@gluestack-ui/utils` (tva for variants)  
**Storage**: N/A (pure UI component)  
**Testing**: Jest + `@testing-library/react-native` (existing test suite at `app-checkbox.test.tsx`)  
**Target Platform**: Mobile-first (iOS/Android), web via React Native Web  
**Project Type**: Mobile app (Expo + React Native)  
**Performance Goals**: Lightweight component, no heavy animations, <16ms render  
**Constraints**: Must maintain backward compatibility with existing usages; compound component pattern required  
**Scale/Scope**: Single component refactoring, ~1 screen worth of code

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Produto**: ✅ Componente checkbox serve a propósito claro - permitir seleção do usuário em formulários (termos, configurações, preferências). Responde "ajuda o usuário a economizar melhor?" indiretamente через setup de preferências.
- **Clareza e confiança**: ✅ Estados visuais (checked, unchecked, disabled, focus) comunicam claramente o estado atual. Labels asociados proporcionam contexto.
- **UX**: ✅ Compound pattern (`Indicator` + `Label`) permite composição simples em diferentes contextos. Touch target adequado via Pressable.
- **UI**: ✅ Alinhado com Pencil Q5Ei9: indicator 16×16, border `neutral-500`, checked dot `orange-400`. Hierarquia visual correta.
- **Conteúdo**: ✅ Labels são funcionais e orientam ação. Textos não são genéricos.
- **Mobile-first**: ✅ Touch target mínimo 48px via Pressable base. Layout adaptável.
- **Acessibilidade**: ✅ Gluestack checkbox expõe role="checkbox", accessibilityState com checked/disabled. Foco visível via `pencilFocusRingWithBgClasses`.
- **Performance**: ✅ Componente leve, sem animações pesadas. Renderização eficiente.
- **Técnico**: ✅ Clean code, componentização via compound pattern, separação lógica/apresentação. Estado gerado via `withStates` HOC.

**Verdict**: PASS - component has clear utility, aligned with constitution principles

## Project Structure

### Documentation (this feature)

```text
specs/005-checkbox-refactor/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (if needed)
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)

```text
src/
└── components/
    └── ui/
        └── app-checkbox/
            ├── app-checkbox.tsx    # Main component (refactored)
            └── app-checkbox.test.tsx  # Tests (existing)
```

**Structure Decision**: Feature is scoped to single component. Source files remain in existing location `src/components/ui/app-checkbox/`. Documentation created under `specs/005-checkbox-refactor/`.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

N/A - no violations identified.

## Phase 0: Research Findings

### Current Implementation Analysis

**File**: `src/components/ui/app-checkbox/app-checkbox.tsx`

**Architecture**:
1. Uses `createCheckbox` from `@gluestack-ui/core/checkbox/creator` for headless checkbox primitives
2. Wraps primitives with `withStates` HOC for state-driven styling on native
3. Uses `tva` (Themed Variant API) for variant-based class composition
4. Applies `cssInterop` for NativeWind integration

**States handled**:
- `data-[disabled=true]:opacity-50` - disabled state
- `data-[focus-visible=true]:bg-neutral-900` + ring classes - focus state via `pencilFocusRingWithBgClasses`

**Subparts**:
- `AppCheckboxRoot` (Root) - wraps `UICheckbox`
- `AppCheckboxIndicator` - 16×16 circle with border, contains Icon with dot
- `AppCheckboxLabel` - text label

### Alignment with Design System (data-model.md)

| Aspect | Spec (data-model.md) | Current Implementation | Status |
|--------|---------------------|----------------------|--------|
| Indicator size | `h-4 w-4` (16×16) | ✅ `h-4 w-4` | Match |
| Indicator shape | `rounded-full` | ✅ `rounded-full` | Match |
| Border color | `border-neutral-500` | ✅ `border-neutral-500` | Match |
| Checked mark | Inset orange dot (#FF5722, 8px) | ✅ `h-2 w-2 bg-orange-400 rounded-full` | Match |
| Focus state | `bg-neutral-900` + ring | ✅ via `pencilFocusRingWithBgClasses` | Match |
| Disabled state | `opacity-50` on root | ✅ `data-[disabled=true]:opacity-50` | Match |
| Label style | `font-sans-medium text-body text-neutral-300` | ✅ `appCheckboxLabelClassName` | Match |
| Root gap | `gap-2` | ✅ `flex-row items-center gap-2` | Match |

### Potential Gap Identified

**Checked state visual**: The current implementation shows the orange dot via `<View testID="app-checkbox-dot" className={CHECKBOX_DOT_CLASS} />` unconditionally when inside Icon. However, the Icon's visibility depends on the checkbox state context.

**Investigation needed**: Verify that the dot appears ONLY when `isChecked=true` and is hidden when `isChecked=false`. The test suite has:
- `it('renders native check dot when checked')` - expects dot when checked
- `it('does not render check dot when unchecked')` - expects no dot when unchecked

These tests pass, suggesting the implementation is correct.

### Decision

**No major refactoring needed** - the current implementation aligns with the design system spec. The task is primarily verification and documentation to confirm alignment.

**Minor improvements to consider**:
1. Add explicit `aria-label` support if label content is insufficient for accessibility
2. Verify hover states on web platform (currently only focus/disabled states are explicitly styled)

## Phase 1: Design Output

See attached:
- `research.md` - Phase 0 findings
- `data-model.md` - AppCheckbox API contracts
- `quickstart.md` - Usage documentation