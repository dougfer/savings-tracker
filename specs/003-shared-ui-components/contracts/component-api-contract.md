# Component API Contract

**Version**: 1.0.0  
**Status**: Draft  
**Scope**: All shared UI components under `src/components/ui/`

## General Rules

1. **Naming**: All shared components use `App` prefix (`AppButton`, `AppInput`, etc.) to distinguish from raw Gluestack primitives.
2. **Compound pattern**: Components with 2+ coordinated subparts expose them via `Object.assign` namespace (e.g., `AppButton.Text`).
3. **Styling**: Visual defaults are applied via NativeWind `className` using tokens from `tailwind.config.js`. Consumers extend with additional `className` prop (merged, never replaced).
4. **No hardcoded values**: All colors, spacing, typography, and radius come from design tokens. No inline hex, px, or font family strings.
5. **TypeScript**: All props explicitly typed. No `any`. Subpart props extend Gluestack or RN primitive `ComponentProps`.
6. **displayName**: Set on root and every subpart for React DevTools.
7. **Barrel exports**: `src/components/ui/index.ts` re-exports compound roots.

## Import Pattern

```tsx
import { AppButton } from '@/components/ui';

<AppButton variant="primary" size="md" onPress={handleSave}>
  <AppButton.Icon as={SaveIcon} />
  <AppButton.Text>Save Goal</AppButton.Text>
</AppButton>
```

## Component Registry

| Component | File/Folder | Compound | Subparts |
|-----------|-------------|----------|----------|
| `AppButton` | `app-button/` | Yes | `.Text`, `.Icon`, `.Spinner` |
| `AppInput` | `app-input/` | Yes | `.Field`, `.Slot`, `.Icon`, `.Label`, `.HelperText`, `.ErrorText`, `.ErrorIcon` |
| `AppCheckbox` | `app-checkbox/` | Yes | `.Indicator`, `.Icon`, `.Label` |
| `AppAvatar` | `app-avatar.tsx` | Yes | `.Image`, `.FallbackText`, `.Badge` |
| `AppProgressBar` | `app-progress-bar.tsx` | Yes | `.Track`, `.Label` |
| `AppDropdownMenu` | `app-dropdown-menu/` | Yes | `.Trigger`, `.Content`, `.Item`, `.ItemLabel`, `.ItemIcon`, `.Separator` |
| `AppModal` | `app-modal/` | Yes | `.Backdrop`, `.Content`, `.Header`, `.Body`, `.Footer`, `.CloseButton` |

## Variant/Size Presets

### Shared size scale

| Size | Touch target | Typography |
|------|-------------|------------|
| `sm` | 32–36px height | `text-body-sm` |
| `md` | 40–44px height | `text-body` |
| `lg` | 48–52px height | `text-body` / `text-body-semibold` |

Exact values per component are derived from Figma and documented in `figma-component-map.md`.

## Versioning

Changes to the public API of any component must:
1. Update this contract with the new signature
2. Update `data-model.md` with the new props/subparts
3. Ensure backward compatibility or mark as breaking (semver MAJOR)
