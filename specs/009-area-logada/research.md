# Research: Área Logada

**Date**: 2026-06-07 | **Feature**: [spec.md](./spec.md)

## Decision 1: Expo Router Grouped Route Layout

**Decision**: Use Expo Router grouped route `(logged)` with a shared `_layout.tsx` to provide the Topbar across all logged-in screens.

**Rationale**:
- Expo Router supports grouped route segments (parenthesized directories) that do not affect the URL path but allow shared layouts.
- This pattern is idiomatic for Expo Router and matches the project's routing conventions.
- The `_layout.tsx` in the group exports a layout wrapping child routes with the Topbar + content area via `<Stack>`.
- Child routes placed under `src/app/(logged)/` automatically inherit this layout without URL path changes.

**Alternatives considered**:
- **Per-route Topbar inclusion**: Each screen manually renders the Topbar. Rejected — violates DRY, inconsistent rendering, and FR-004 requirement for Topbar on all screens.
- **React Context wrapper**: Wrapping the app in a context that conditionally shows Topbar. Rejected — less transparent than file-based layout, harder to reason about.

**References**:
- Expo Router docs: grouped routes with `(group)` naming convention
- Existing pattern: `src/app/_layout.tsx` uses `<Stack>` as root navigator with `headerShown: false`

## Decision 2: Topbar as Shared UI Component

**Decision**: Place the Topbar in `src/components/ui/topbar/` as a shared component, imported by the `(logged)/_layout.tsx`.

**Rationale**:
- The Topbar is used across all features within the logged area — it is a cross-cutting UI concern.
- The project conventions place cross-feature UI in `src/components/ui/` (e.g., `app-button`, `app-text`, `app-avatar`).
- Keeps the layout file thin (just layout composition) with component logic in its own module.

**Alternatives considered**:
- **Feature-specific component**: Placing Topbar under a feature directory (e.g., `src/features/navigation/`). Rejected — no other "navigation" feature exists; Topbar is a UI primitive, not a feature.
- **Inline in layout**: Rendering Topbar directly in `_layout.tsx`. Rejected — bloats the layout file; no separation of concerns.

**References**:
- Project structure docs: `docs/STRUCTURE.md` — "src/components/ui/ — shared primitives"
- Existing patterns: `app-button`, `app-input`, etc. all live under `src/components/ui/`

## Decision 3: Topbar Responsive Variants from Design Specs

**Decision**: Implement three responsive variants matching the app.pen design (Node IDs: PVGJ3 desktop, Wp3Ge tablet, u2DsY1 mobile) using `useWindowDimensions` and conditional rendering.

**Design analysis**:
| Breakpoint | Logo | Title | Button "New goal" | Avatar | Padding X | Height |
|------------|------|-------|-------------------|--------|-----------|--------|
| Desktop (>=1024px) | Icon + "Savings Tracker" | Yes | Yes (140px wide) | No | 80px | 80px |
| Tablet (768-1023px) | Icon + "Savings Tracker" | Yes | Yes (auto width) | Yes (48px) | 24px | 80px |
| Mobile (<768px) | Icon only | No (hidden) | Yes (auto width) | Yes (48px) | 16px | 56px |

**Styling tokens used** (from `tailwind.config.js`):
- Background: `bg-neutral-900` (inherits from root layout) or transparent (inherits dark parent)
- Border bottom: `border-b border-neutral-800` (equivalent to `#1f1f1f`)
- Button: uses `AppButton variant="primary"` (orange `bg-orange-400`)
- Button text: `text-neutral-900` (on primary variant)
- Logo title: `font-display-semibold text-2xl text-neutral-0` (Bricolage Grotesque 24px)
- Icon: `@/assets/icons/logo.svg` (desktop/tablet), `@/assets/icons/logo-icon.svg` (mobile)
- Avatar: `AppAvatar` with `size="md"` (48px)
- Avatar fallback text: `font-sans-medium text-body text-neutral-300`

**Rationale**:
- Responsive behavior is defined in the design files (app.pen).
- `useWindowDimensions` from React Native is the project-standard approach for responsive logic (no CSS media queries on native).
- Mobile variant hides the title text to save horizontal space on small screens.
- Desktop variant omits avatar (not present in the desktop design).
- Button has no `onPress` handler yet — it will trigger a modal in a future feature.

**Alternatives considered**:
- **CSS media queries via NativeWind**: NativeWind supports `md:`, `lg:` prefixes. Rejected for the Topbar because the structural changes (hiding entire elements, avatar presence) are better handled with conditional component rendering than display/visibility toggles.
- **Separate components per breakpoint**: Three separate Topbar components. Rejected — single component with conditional sections is simpler and ensures style consistency.

**References**:
- Design: `app.pen` — Node IDs PVGJ3, Wp3Ge, u2DsY1
- SVG assets: `src/assets/icons/logo.svg` (230x40, full logo with text), `src/assets/icons/logo-icon.svg` (40x40, icon only)
- Existing responsive patterns: Login screen uses `lg:flex-row` for desktop layout

## Decision 4: Navigation Pattern — Stack Inside Group Layout

**Decision**: Use `<Stack screenOptions={{ headerShown: false }}>` inside the `(logged)/_layout.tsx` for child route navigation, matching the root layout pattern.

**Rationale**:
- Consistent with the root `_layout.tsx` which also uses `<Stack>` with `headerShown: false`.
- The Topbar replaces the native header — no need for Expo Router's header.
- `<Stack>` supports standard push/pop navigation for future screens within the logged area.
- Topbar sits above `<Stack>` in the layout, making it persistent across navigation.

**Alternatives considered**:
- **Tabs**: Using `<Tabs>` with a tab bar. Rejected — the design does not include a bottom tab bar; navigation is via Topbar links.
- **Slot**: Using `<Slot>` for a single child. Rejected — `<Stack>` provides navigation capabilities needed as more logged-in screens are added.

**References**:
- Root layout: `src/app/_layout.tsx` line 39
- Expo Router Stack: https://docs.expo.dev/router/reference/stack/

## Decision 5: Button "New goal" — Placeholder Behavior

**Decision**: Render the "New goal" button without an `onPress` handler. The button is purely presentational in this feature.

**Rationale**:
- Per the user input: "o botão ainda não tem ação, mas no futuro (em outra feature) irá abrir um modal com um formulário."
- Rendering the button now establishes the visual layout and verifies design token usage.
- Adding a no-op `onPress` or `console.log` would be misleading.
- The button uses `<AppButton variant="primary">` with `+` icon and "New goal" text.

**References**:
- Design: app.pen Node IDs PVGJ3, Wp3Ge, u2DsY1 — button content: "+" icon + "New goal" text
- AppButton: `src/components/ui/app-button/app-button.tsx` — primary variant uses `bg-orange-400 text-neutral-900`

## Decision 6: Dashboard Screen — Placeholder with Overview Content

**Decision**: Create `src/app/(logged)/index.tsx` as a thin re-export to `src/features/overview/screens/dashboard-screen.tsx`. The dashboard screen serves as the initial landing screen for the logged area.

**Rationale**:
- Follows the existing pattern: route files are thin re-exports (`src/app/login/index.tsx` → `@/features/login/screens/login-screen`).
- The dashboard is the natural first screen after login.
- The dashboard screen uses `AppScreen` for safe area handling and renders the existing `OverviewHint` component.
- This establishes the pattern for future logged-in screens to be added under `(logged)/`.

**Alternatives considered**:
- **Reusing OverviewPlaceholderScreen as-is**: The existing placeholder references sign-up page navigation. Rejected — logged-in users shouldn't see sign-up links; a dedicated dashboard screen is clearer.

**References**:
- Existing pattern: `src/app/sign-up/index.tsx` → `export { default } from '@/features/sign-up/screens/sign-up-screen'`
- Overview feature: `src/features/overview/`
