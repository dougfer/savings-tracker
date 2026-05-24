---
description: Official project stack, versions, and version-specific best practices
alwaysApply: true
---

# Project Stack and Versions

Use this rule as the source of truth for technical decisions and compatibility. Versions mirror `package.json` unless noted.

## Application Foundation

- App platform: `expo@~54.0.33`, `expo-router@~6.0.23`, Metro web bundler (`app.json` → `web.bundler: "metro"`)
- Runtime UI: `react@19.1.0`, `react-dom@19.1.0`, `react-native@0.81.5`, `react-native-web@~0.21.0`
- Language/typing: `typescript@~5.9.2`, `@types/react@~19.1.0`
- New Architecture: enabled in `app.json` (`newArchEnabled: true`); prefer libraries compatible with the RN New Architecture path used by Expo SDK 54.

## Expo Modules and Tooling

- Core/linking/status: `expo-constants@~18.0.13`, `expo-linking@~8.0.11`, `expo-status-bar@~3.0.9`, `expo-splash-screen@~31.0.13`, `expo-font@~14.0.11`
- Security/browser: `expo-secure-store@~15.0.7`, `expo-web-browser@~15.0.10`
- Dev: `expo-dev-client@~6.0.17`
- Icons: `@expo/vector-icons@^15.0.3`
- Router experiments: `typedRoutes: true` in `app.json` — use generated route types where applicable.

## Navigation and Layout

- Router integration: `@react-navigation/native@^7.1.8`
- Screens/safe area: `react-native-screens@~4.16.0`, `react-native-safe-area-context@~5.6.0`

## UI, Design System, and Styling

- Component library: `@gluestack-ui/core@^3.0.20` + `@gluestack-ui/utils@^3.0.21` (v3). Use **creator functions** (`createInput`, `createButton`, `createCheckbox`, `createModal`, `createMenu`) from `@gluestack-ui/core/<component>/creator` to build headless UI primitives with automatic state management via `states` + `dataSet` props. Simple components (AppText, AppAvatar, AppProgressBar, AppScreen) use pure React Native primitives. No global provider or config needed — each component registers `cssInterop` locally.
- Styling bridge: `nativewind@^4.2.4` with `tailwindcss@^3.4.19` (dev, v3-LTS line). **Do NOT upgrade to Tailwind v4** — NativeWind v4 is only compatible with Tailwind v3. NativeWind v5 (preview) would support Tailwind v4 but is not stable.
- State-driven styling: use `data-[focus=true]:`, `data-[disabled=true]:`, `data-[invalid=true]:`, `data-[active=true]:`, `data-[checked=true]:` in NativeWind `className`. On native, these are resolved by the `withStates` HOC (`src/lib/gluestack/with-states-interop.tsx`); on web, CSS attribute selectors match the `dataSet` attributes set by the creators.
- SVG / motion: `react-native-svg@15.12.1`, `@legendapp/motion@^2.4.0`

## Forms, Validation, and State

- Forms: `react-hook-form@^7.54.2`, `@hookform/resolvers@^3.9.1`, `zod@^3.24.1`
- Client state: `zustand@^5.0.3`
- Local storage: `react-native-mmkv@^3.2.0` (fast KV); secrets via `expo-secure-store` — not for persisted financial domain data until product specs allow it (see `specs/001-project-foundation/plan.md`).

## Animation and Background Work

- `react-native-reanimated@~4.1.1`, `react-native-worklets@0.5.1` — keep versions compatible with the Expo SDK and Reanimated docs for this line.

## Dates and Utilities

- `date-fns@^4.1.0`

## Quality and Testing

- Lint/format: `eslint@^9.17.0`, `eslint-config-expo@~10.0.0`, `prettier@^3.4.2`
- Tests: `jest@^29.7.0`, `jest-expo@~54.0.0`, `@testing-library/react-native@^13.2.0`, `@types/jest@^30.0.0`, `react-test-renderer@19.1.0`
- Build tooling: `@babel/core@^7.26.0`, `babel-plugin-module-resolver@^5.0.3` (path alias `@` → `./src`), `react-native-svg-transformer@^1.5.3`

## Best Practices for These Versions

1. Keep **Expo SDK 54** family packages on the `~` lines suggested by Expo (`expo install`) to avoid native mismatch between JS and prebuilds.
2. In **React 19**, prefer function components and explicit typing for props and hooks; avoid `any` and treat `useEffect` as synchronization with external systems, not a default for derived state.
3. In **TypeScript 5.9**, lean on strict typing and **Expo Router typed routes** for navigation params where generated types exist.
4. **NativeWind 4 + Tailwind 3**: share tokens and utility patterns via the project Tailwind/Gluestack setup; avoid duplicating ad-hoc style objects when utilities already exist. **Never install Tailwind v4** (it requires NativeWind v5 which is still preview).
5. **Reanimated**: keep `react-native-reanimated/plugin` **last** in `babel.config.js` plugins; verify worklets/Reanimated APIs against the installed minor.
6. **Gluestack v3 + NativeWind**: use `@gluestack-ui/core` creators for interactive components (Input, Button, Checkbox, Modal, Menu) — they manage focus, hover, disabled, and checked states automatically via `states`/`dataSet` props. Wrap the Root primitive with `withStates()` from `src/lib/gluestack/with-states-interop.tsx` so `data-[xxx=true]:` classes resolve on native. Style **exclusively via NativeWind `className`**. Simple display components (Text, Avatar, ProgressBar, Screen) use pure RN primitives without creators. Respect baseline a11y contracts under `specs/001-project-foundation/contracts/`.
7. **Jest + jest-expo + RNTL**: test behavior users see (labels, roles, navigation outcomes), not implementation details; keep `babel.config.js` test path consistent (e.g. NativeWind preset disabled under test if that is the project convention).
8. When adding dependencies, pick the latest **stable** release compatible with **Expo SDK 54** and **RN 0.81**; run `npx expo install <pkg>` for Expo-first packages.
9. Before opening a PR, run `npm run lint` and `npm run test`.