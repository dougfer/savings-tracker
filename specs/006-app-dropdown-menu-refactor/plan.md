# Implementation Plan: AppDropdownMenu Refactor

**Branch**: `refactor/app-dropdown-menu` | **Date**: 2026-05-24 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/006-app-dropdown-menu-refactor/spec.md`

## Summary

Refatorar o componente `AppDropdownMenu` para maior aderência ao design system e alinhamento com a stack do projeto. A refatoração simplifica a API para o padrão Compound Components (Dropdown, Trigger, Content), remove React Context desnecessário usando data attributes para propagação de estado, e alinha a implementação ao padrão arquitetural estabelecido por AppInput/AppButton.

## Technical Context

**Language/Version**: TypeScript / React Native (Expo)  
**Primary Dependencies**: `@gluestack-ui/core@^3.0.20` (createMenu), `@gluestack-ui/utils@^3.0.21`, NativeWind, React Native  
**Storage**: N/A (UI component only)  
**Testing**: Jest + @testing-library/react-native  
**Target Platform**: iOS, Android, Web (cross-platform)  
**Project Type**: Mobile-first React Native component library  
**Performance Goals**: Menu open/close response under 100ms perceived latency  
**Constraints**: Must use gluestack-ui core creators, no Context API for state, compound component pattern  
**Scale/Scope**: Single component refactor (AppDropdownMenu)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Verificar conformidade com `.specify/memory/constitution.md` (Savings Tracker Platform):

- **Produto:** Refatoração não introduz funcionalidade nova, apenas melhora consistência e manutenibilidade. Melhora indireta na clareza do código.
- **Clareza e confiança:** API simplificada reduz ambiguidade de uso. Compound components com props claras.
- **UX:** Componente refatorado mantém comportamento de menu existente. Melhora间接 em consistência visual.
- **UI:**沿着AppButton/AppModal的样式模版，使用tva + withStates模式。Design tokens mantidos.
- **Conteúdo:** N/A - sem impacto em conteúdo.
- **Mobile-first:** Componente existente já mobile-first. Refatoração mantém layout responsivo.
- **Acessibilidade:** GlueStack Menu creator já suporta keyboard navigation e accessibility. Refatoração mantém essas features.
- **Performance:** Simplificação de código e remoção de Context overhead mejora performance.
- **Técnico:** Código mais limpo: remove Context desnecessário, usa padrão established (tva/withStyleContext/withStates), melhor separação de responsabilidades.

**Result**: PASS - All principles satisfied

## Project Structure

### Documentation (this feature)

```text
specs/006-app-dropdown-menu-refactor/
├── plan.md              # This file
├── spec.md              # Feature specification
├── research.md          # Phase 0 output (if needed)
├── data-model.md        # N/A - no data entities
├── quickstart.md        # Component usage guide
└── checklists/
    └── requirements.md  # Validation checklist
```

### Source Code (repository root)

```text
src/
├── components/ui/
│   ├── app-dropdown-menu/
│   │   ├── app-dropdown-menu.tsx      # Refactored component
│   │   ├── app-dropdown-menu.test.tsx # Updated tests
│   │   └── index.ts                   # Export
│   └── ... (other components unchanged)
└── lib/
    └── gluestack/
        └── with-states-interop.tsx    # Shared utility (already exists)
```

**Structure Decision**: AppDropdownMenu component refactored in-place. No new directories. Tests updated alongside implementation.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |

## Phase 0: Research

### Technical Analysis

**Current Implementation Issues:**
1. `AppDropdownMenuContext` is created but never used for meaningful state sharing - pure overhead
2. Uses raw className concatenation instead of `tva` (tiny variance) pattern like AppButton
3. No `withStyleContext` - context propagation would need Context API if expanded
4. Compound components (Item, ItemLabel, ItemIcon, Separator) exposed but plan input specifies only Dropdown, Trigger, Content

**GlueStack Menu Creator Behavior:**
- `data-open="true"` on Root when menu is open
- `data-highlighted="true"` on Item when focused/hovered  
- Keyboard navigation (Arrow keys, Enter, Escape)
- Auto-positioning (popover)
- `states` prop emitted for data-[state=value]:className pattern resolution

**Required Pattern (AppInput reference):**
```tsx
// Style context scope
const MENU_SCOPE = 'APP_DROPDOWN_MENU';
const StyledRoot = withStates(withStyleContext(View, MENU_SCOPE));
const StyledContent = withStates(View);

// tva variants
export const appDropdownVariants = tva({
  base: '... data-[open=true]:...',
  variants: { ... }
});

// Usage in Root
<uiMenu context={{ open, disabled }} className={cls}>
```

**Data Attributes Communication:**
- No React Context for state sharing between Trigger and Content
- State propagated via data-* attributes set by gluestack-ui creator
- Components read state via withStates/withStyleContext pattern

### Unknowns

- [RESOLVED] Exact styling classes for Content (rounded corners, shadow, border) - using existing design tokens from current implementation
- [RESOLVED] Whether to keep Item, ItemLabel, ItemIcon, Separator subcomponents - yes, they are used internally by gluestack Menu creator and can remain as implementation detail
- [RESOLVED] Data attributes pattern compatibility with gluestack - creator already emits data-open, data-highlighted

## Phase 1: Design

### Component Architecture

```
AppDropdownMenu (Root - compound)
├── AppDropdownMenu.Trigger (render prop pattern)
└── AppDropdownMenu.Content (styled container)
```

**Public API (as per plan):**
- `AppDropdownMenu` - Root accepting placement, offset, crossOffset, onOpen, onClose, closeOnSelect, className
- `AppDropdownMenu.Trigger` - Render prop for trigger element
- `AppDropdownMenu.Content` - Container for menu items with styling

**Internal Structure (gluestack creator):**
- `UIMenu` - Root from createMenu
- `UIMenu.Item` - Menu items
- `UIMenu.ItemLabel` - Item text labels
- `UIMenu.Separator` - Visual dividers

### Styling Pattern

Following AppButton/AppInput pattern with `tva` + `withStyleContext` + `withStates`:

```tsx
const appDropdownContentVariants = tva({
  base: [
    'rounded-xl border border-border bg-card py-1 shadow-md',
    'data-[open=true]:opacity-100',
    'data-[closed=true]:opacity-0',
  ].join(' '),
});
```

### Data Flow

1. Root receives props (placement, onOpen, onClose, etc.)
2. Root renders UIMenu with trigger render prop and menu children
3. UIMenu manages open/closed state internally via gluestack
4. UIMenu emits `data-open` attribute on Root
5. withStates resolves `data-[open=true]:` utility classes on native
6. No React Context needed - gluestack creator handles state

### Keyboard Navigation

Gluestack Menu creator already provides:
- Arrow key navigation between items
- Enter to select
- Escape to close
- Focus management

Accessibility maintained automatically by gluestack creator.

## Phase 2: Implementation Tasks

### Task 1: Setup and Imports
- Import `withStyleContext`, `withStates`, `tva`, `useStyleContext` from @gluestack-ui/utils
- Import `cssInterop` from nativewind
- Keep `createMenu` from @gluestack-ui/core/menu/creator

### Task 2: Define Style Scope and Variants
- Create `MENU_SCOPE = 'APP_DROPDOWN_MENU'`
- Define `appDropdownContentVariants` using tva pattern
- Define `appDropdownItemVariants` for item styling

### Task 3: Create Styled Wrappers
- Wrap View with withStyleContext + withStates for Root
- Wrap View for Content with styled variants

### Task 4: Refactor AppDropdownMenuRoot
- Remove `AppDropdownMenuContext` usage
- Apply tva variants to className
- Pass context to UIMenu for state propagation

### Task 5: Simplify Trigger and Content
- Keep Trigger as render prop pattern
- Style Content with tva-based classes

### Task 6: Update Tests
- Update test file to match new structure
- Test compound component pattern
- Test data attributes state propagation

### Task 7: Validate
- Run TypeScript check
- Run lint
- Run tests
- Visual verification (if design reference available)

## Quickstart

```tsx
// Basic usage
<AppDropdownMenu
  placement="bottom right"
  onOpen={() => console.log('opened')}
  onClose={() => console.log('closed')}
>
  <AppDropdownMenu.Trigger>
    {(triggerProps) => (
      <Pressable {...triggerProps}>
        <Text>Open Menu</Text>
      </Pressable>
    )}
  </AppDropdownMenu.Trigger>
  <AppDropdownMenu.Content>
    <UIMenu.Item>Edit</UIMenu.Item>
    <UIMenu.Item>Delete</UIMenu.Item>
  </AppDropdownMenu.Content>
</AppDropdownMenu>
```

## Dependencies

- `@gluestack-ui/core@^3.0.20` - createMenu creator
- `@gluestack-ui/utils@^3.0.21` - tva, withStyleContext, withStates
- `@expo/config-plugins` - already in project
- `nativewind` - already in project

## Risks and Mitigations

| Risk | Mitigation |
|------|------------|
| data-* attributes not working on native | Test withStates resolution; already working in AppButton/AppInput |
| Placement positioning off | Test on device; gluestack handles positioning |
| Keyboard navigation broken | gluestack creator handles; verify with tests |