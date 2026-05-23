# Research: Shared UI Components

**Date**: 2026-05-13  
**Sources:** Gluestack UI v3 docs (Context7), NativeWind v4 docs, project codebase (`tailwind.config.js`, `src/components/ui/`, `src/lib/gluestack/`), compound-components rule, Figma URLs (extraction pending — API 429).

## 1. Component Base Strategy: Gluestack UI Primitives + NativeWind Styling

**Decision:** Use Gluestack UI v3 primitives as the structural base for all 6 components (+ Modal from spec). Wrap and extend them with project-specific compound component APIs, styled via NativeWind `className` using tokens from `tailwind.config.js`.

**Rationale:** Gluestack UI already ships compound-pattern primitives for every component in scope:
- `Button` / `ButtonText` / `ButtonIcon` / `ButtonSpinner`
- `Input` / `InputField` / `InputSlot` / `InputIcon`
- `Checkbox` / `CheckboxIndicator` / `CheckboxIcon` / `CheckboxLabel`
- `Avatar` / `AvatarImage` / `AvatarFallbackText` / `AvatarBadge`
- `Progress` / `ProgressFilledTrack`
- `Menu` / `MenuItem` / `MenuItemLabel` (for Dropdown)
- `Modal` / `ModalBackdrop` / `ModalContent` / `ModalHeader` / `ModalBody` / `ModalFooter` / `ModalCloseButton`

Building from scratch would duplicate existing accessibility, keyboard support, and cross-platform behavior that Gluestack already provides with WAI-ARIA compliance.

**Alternatives considered:**
- Pure React Native primitives only (rejected: reinvents a11y, focus management, platform abstractions that Gluestack handles)
- Direct re-export of Gluestack without wrapping (rejected: no project-specific styling enforcement, no compound-pattern alignment with project rules, consumers would need to know Gluestack internals)

## 2. Compound Pattern: Wrap, Don't Rebuild

**Decision:** Each shared component wraps Gluestack primitives inside a project-namespaced compound component that:
1. Applies design-system tokens via NativeWind `className` as defaults
2. Exposes subparts via `Object.assign` namespace (e.g., `AppButton.Text`, `AppButton.Icon`)
3. Uses React context for shared state (variant, size, disabled) when subparts need it
4. Sets `displayName` on root and each subpart

**Rationale:** The project rule `compound-components.mdc` requires this pattern. Wrapping Gluestack means we get accessibility and platform behavior for free while enforcing project-specific visual defaults and API consistency.

**Pattern for each component:**

```
AppButton = Object.assign(AppButtonRoot, {
  Text: AppButtonText,
  Spinner: AppButtonSpinner,
});
```

Consumers use: `<AppButton variant="primary">Save</AppButton>` (string children) or compose icons in `children`. Variants: `primary` | `secondary` | `tertiary` (Pencil `UpBXR`).

**Alternatives considered:**
- Flat prop API (`<AppButton label="Save" icon={...} />`) — rejected: violates composition-over-configuration rule
- Passthrough re-export — rejected: no design enforcement or consistent defaults

## 3. Styling Strategy: NativeWind className + Design Tokens

**Decision:** All visual styling uses NativeWind `className` with tokens from `tailwind.config.js`. Gluestack's `$token` system is NOT the primary styling mechanism — NativeWind classes are. Gluestack config (`appGluestackConfig`) provides font family alignment only.

**Rationale:**
- Project already established NativeWind as the styling layer in spec 002
- `tailwind.config.js` is the single source of truth for colors, typography, spacing, radius
- Existing components (`AppText`, `AppScreen`) already use `className` pattern
- Avoids dual-token divergence between Gluestack `$tokens` and Tailwind utilities

**Implementation pattern:**
- Each variant/size combination maps to a set of Tailwind classes
- A variant resolver function returns the correct `className` string based on props
- Consumers can pass additional `className` to extend (merged, not replaced)

**Alternatives considered:**
- Gluestack `$token` style props only (rejected: creates divergence with NativeWind setup, spec 002 explicitly chose Tailwind as source of truth)
- Inline StyleSheet objects (rejected: loses token enforcement, harder to audit consistency)

## 4. Variant/Size Mapping: Figma → Tailwind Classes

**Decision:** Extract exact visual specs from Figma (node IDs documented below) during implementation phase. Map each variant/size to Tailwind token classes. No hardcoded hex, px, or font values in component code.

**Figma Node IDs (fileKey: `UtM4hqbnpAz8GAmCUO3ERr`):**

| Component | Node ID | URL |
|-----------|---------|-----|
| Button | `271:3896` | `figma.com/design/UtM4hqbnpAz8GAmCUO3ERr/savings-tracker?node-id=271-3896` |
| Checkbox | `291:1557` | `figma.com/design/UtM4hqbnpAz8GAmCUO3ERr/savings-tracker?node-id=291-1557` |
| Dropdown Menu | `271:996` | `figma.com/design/UtM4hqbnpAz8GAmCUO3ERr/savings-tracker?node-id=271-996` |
| ProgressBar | `297:1695` | `figma.com/design/UtM4hqbnpAz8GAmCUO3ERr/savings-tracker?node-id=297-1695` |
| Input | `307:1217` | `figma.com/design/UtM4hqbnpAz8GAmCUO3ERr/savings-tracker?node-id=307-1217` |
| Avatar | `357:8000` | `figma.com/design/UtM4hqbnpAz8GAmCUO3ERr/savings-tracker?node-id=357-8000` |

**Status:** Figma API returned 429 during planning. Extraction is the first implementation task.

**Rationale:** Constitution principle: "Consistência visual com o Figma" — values must come from design, not be invented.

## 5. File Organization

**Decision:** Place shared components under `src/components/ui/` with kebab-case filenames. Simple components (ProgressBar, Avatar) get a single file. Complex compounds (Button, Input, Modal, Dropdown Menu) get a colocated folder.

```
src/components/ui/
├── app-button/
│   ├── app-button.tsx
│   └── index.ts
├── app-input/
│   ├── app-input.tsx
│   └── index.ts
├── app-checkbox/
│   ├── app-checkbox.tsx
│   └── index.ts
├── app-avatar.tsx
├── app-progress-bar.tsx
├── app-dropdown-menu/
│   ├── app-dropdown-menu.tsx
│   └── index.ts
├── app-modal/
│   ├── app-modal.tsx
│   └── index.ts
├── AppText.tsx              # existing (rename to kebab in future)
├── AppText.test.tsx         # existing
└── index.ts                 # barrel: re-exports all compound roots
```

**Rationale:**
- `feature-first-architecture.mdc` mandates kebab-case file stems
- `compound-components.mdc` allows colocated folders for complex compounds
- Barrel `index.ts` re-exports compound roots as primary API

**Alternatives considered:**
- All in single folder without subfolders (rejected: complex components with multiple subparts become hard to navigate)
- One file per subpart (rejected: over-fragmentation for tightly coupled subparts)

## 6. Cross-Platform: iOS, Android, Web

**Decision:** All components target React Native with React Native Web support. Platform-specific behavior handled by Gluestack internals (which already manage iOS/Android/Web differences). No platform-specific files (`.ios.tsx`, `.android.tsx`) unless a concrete platform gap is discovered during implementation.

**Rationale:**
- Gluestack UI is designed for universal React Native (iOS + Android + Web)
- NativeWind works across all platforms via its Metro/babel pipeline
- Project uses Expo Router with Metro web bundler

**Known platform considerations:**
- **Dropdown Menu**: On mobile, consider using Gluestack `Actionsheet` (bottom sheet pattern) instead of `Menu` (popover). Decision deferred to Figma extraction — if Figma shows a bottom-sheet pattern for mobile, use `Actionsheet`; if popover, use `Menu`.
- **Modal**: Gluestack Modal uses `useRNModal` prop for native modal on RN; default is portal-based. Start with default; switch to `useRNModal` only if needed.
- **Hover states**: Only apply on Web (via `data-[hover=true]` in NativeWind). On native, use `data-[active=true]` (press) as equivalent.

## 7. Accessibility Baseline

**Decision:** Leverage Gluestack's built-in WAI-ARIA compliance. Add project-specific a11y attributes only where Gluestack defaults are insufficient. Each component must pass:
- Keyboard navigation (Tab, Escape, Space, Enter as appropriate)
- Screen reader announcements (roles, labels, state changes)
- Visible focus indicators
- Minimum touch target 44x44pt on mobile
- Contrast ratio per WCAG 2.1 AA (already validated in design tokens from spec 002)

**Rationale:** Constitution principle VII — accessibility is structural, not optional. Gluestack documents WAI-ARIA pattern adherence for every component (Button, Checkbox, Modal, Menu, Progress).

## 8. Dropdown Menu: Menu vs Actionsheet

**Decision:** Implement Dropdown Menu using Gluestack `Menu` component (popover pattern) as the default. If Figma shows a bottom-sheet pattern for mobile, add an `Actionsheet` variant or swap the underlying primitive.

**Rationale:**
- `Menu` provides trigger-based popover with keyboard navigation, selection modes, and placement control
- `Actionsheet` is better for mobile-first full-width option lists with drag-to-dismiss
- The Figma node (`271:996`) will clarify which pattern the design intends
- Both are Gluestack compounds with a11y support

**Alternatives considered:**
- Custom Pressable + Animated.View dropdown (rejected: reinvents positioning, keyboard nav, a11y)
- React Native `<Picker>` / third-party select (rejected: not consistent with design system)

## 9. Modal Animation

**Decision:** Use Gluestack Modal's built-in transitions for open/close. If custom animation is needed (e.g., slide-up, fade), apply via Reanimated layout animations on the `ModalContent` wrapper.

**Rationale:**
- Gluestack Modal handles focus trap, backdrop, keyboard dismiss natively
- Reanimated (`~4.1.1`) is already in the project for animation needs
- Keep animation minimal per constitution principle VIII (performance)

## 10. Naming Convention

**Decision:** Prefix all shared components with `App` to distinguish from raw Gluestack primitives and prevent import confusion. Examples: `AppButton`, `AppInput`, `AppCheckbox`, `AppAvatar`, `AppProgressBar`, `AppDropdownMenu`, `AppModal`.

**Rationale:**
- Existing pattern: `AppText`, `AppScreen`
- Prevents shadowing Gluestack imports (e.g., `Button` from `@gluestack-ui/themed` vs `AppButton` from `@/components/ui`)
- Clear ownership: `App*` = project design system, raw name = Gluestack primitive

**Alternatives considered:**
- No prefix (rejected: import collisions with Gluestack, unclear ownership)
- `DS` prefix (rejected: not established in codebase)

## 11. Testing Strategy

**Decision:** Each component gets a colocated `.test.tsx` file with behavior-focused tests using `@testing-library/react-native`. Test:
- Rendering in each variant/size
- State transitions (press, focus, disabled, error)
- Accessibility (roles, labels via `getByRole`, `getByLabelText`)
- Compound subpart rendering

Do NOT test: internal Gluestack implementation, animation timing, pixel-perfect visual output (that's manual Figma review).

**Rationale:** Constitution principle IX + project testing setup (jest-expo + RNTL).
