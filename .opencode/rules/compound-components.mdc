---
description: Compound component pattern for shared UI under src/components
globs: src/components/**/*
alwaysApply: false
---

# Compound components (`src/components`)

All **new or refactored** code under `src/components` MUST follow the **compound component pattern** whenever the API has **two or more coordinated, named subparts** (e.g. header / body / footer, label / control / hint). A **single-purpose leaf** (a thin wrapper around one primitive with no natural sub-API) MAY stay one function export—keep it minimal and document in a one-line comment if it intentionally stays non-compound.

Stack context: React 19 + React Native + Gluestack UI + NativeWind (details and versions: `project-stack-versions.mdc`).

## UI primitives and styling

- **Gluestack UI v3** — For interactive components (Button, Input, Checkbox, Modal, Menu), use creator functions from `@gluestack-ui/core/<component>/creator` to get headless primitives with automatic state management (`states`/`dataSet` props) + a11y. Wrap the Root with `withStates()` from `@/lib/gluestack/with-states-interop` and register each subpart with `cssInterop` from `nativewind`.
- **React Native** — For simple display components (Text, Avatar, ProgressBar, Screen), use core `react-native` primitives (`View`, `Text`, `Pressable`, `Image`, …) directly.
- **NativeWind** — Use `className` + Tailwind tokens for all styling; use `data-[xxx=true]:` classes for state-driven styles (focus, disabled, invalid, active, checked). Keep token usage consistent with existing screens/components.
- **Source of truth** — Do not duplicate the full dependency matrix here; extend `project-stack-versions.mdc` when the stack changes.

## Filenames

Use **kebab-case** stems for files in this folder (`app-text.tsx`, `toast-host.tsx`), not PascalCase/camelCase filenames. **Exported** components/hooks stay idiomatic (`AppText`, `useToast`). Full policy and framework exceptions: `feature-first-architecture.mdc` → **Source file naming**.

## Rules

1. **Single public namespace** — Expose one root object (or root function + static fields) so consumers use `Root.Part` consistently; avoid scattering unrelated exports for the same UI concept.
2. **Composition over configuration** — Prefer `children` and subcomponents over long prop lists that encode structure (`<Card><Card.Header /></Card>` not `<Card headerTitle=… headerAction=… />` unless a11y requires a dedicated prop).
3. **Shared state via context** — When subparts need implicit state (open/closed, ids, size), use a dedicated `React.createContext` + provider **inside** the compound root, not prop drilling through every consumer.
4. **Encapsulation** — Subcomponents live next to the root (same module or a colocated **kebab-case** folder, e.g. `panel/`); avoid reaching into another compound's internals.
5. **Typing** — Type the context value and root props explicitly; subpart props should extend or compose `ComponentProps` from Gluestack or from RN primitives, whichever matches the implementation.
6. **Dev ergonomics** — Set `displayName` on the root and each subpart for React DevTools (`Card.displayName = 'Card'`, `CardHeader.displayName = 'Card.Header'`).
7. **Barrels** — If you add `index.ts`, re-export the **compound root** as the primary API; document subparts in the same barrel or in a short module comment.

## Anti-patterns

```tsx
// ❌ BAD — "god props" instead of compound parts
<AppPanel title="…" showFooter leftAction={…} rightAction={…} bodyClassName="…" />
```

```tsx
// ❌ BAD — consumers import internal building blocks that should be private
import { AppPanelInnerRow } from '@/components/layout/AppPanel';
```

## Recommended shape

```tsx
// ✅ GOOD — namespace + composition (pattern only; names illustrative)
import { View } from 'react-native';
import { createContext, useContext, type ReactNode } from 'react';

type PanelCtx = { variant: 'default' | 'compact' };
const PanelContext = createContext<PanelCtx | null>(null);

function usePanel() {
  const v = useContext(PanelContext);
  if (!v) throw new Error('Panel subcomponents must be used inside <Panel>');
  return v;
}

function PanelRoot({ children, variant = 'default' }: { children: ReactNode; variant?: PanelCtx['variant'] }) {
  return (
    <PanelContext.Provider value={{ variant }}>
      <View>{children}</View>
    </PanelContext.Provider>
  );
}

function PanelHeader({ children }: { children: ReactNode }) {
  usePanel();
  return <View>{children}</View>;
}

function PanelBody({ children }: { children: ReactNode }) {
  usePanel();
  return <View className="flex-1">{children}</View>;
}

PanelRoot.displayName = 'Panel';
PanelHeader.displayName = 'Panel.Header';
PanelBody.displayName = 'Panel.Body';

export const Panel = Object.assign(PanelRoot, { Header: PanelHeader, Body: PanelBody });
```

## Checklist before merging

- [ ] Multi-part UI under `src/components` uses a compound namespace, not only boolean/layout props.
- [ ] Implicit shared state uses context scoped to the compound root.
- [ ] Public exports are intentional; internals are not exported from barrels.