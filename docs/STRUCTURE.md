# Project structure (Savings Tracker)

This document satisfies **FR-001** and the module contract in `specs/001-project-foundation/contracts/feature-module-layout.md`.

## Top-level layout

| Path | Responsibility |
|------|------------------|
| `src/app/` | **Expo Router only** — route files stay thin; they re-export screens from `src/features/*/screens`. |
| `src/features/<feature>/` | **Feature-first** modules (`overview`, `transactions`, `budgets`, `pots`, `recurring-bills`). |
| `src/features/<feature>/screens/` | Routable screen components for that feature. |
| `src/features/<feature>/components/` | UI used only inside that feature. |
| `src/components/ui/` | Shared primitives & typography wrappers (`AppText`, Gluestack re-exports). |
| `src/components/layout/` | Cross-feature layout shells (`AppScreen`). |
| `src/components/feedback/` | Toasts, banners, loaders (placeholder `ToastHost`). |
| `src/stores/` | Zustand stores (non-domain prefs only until product stores exist). |
| `src/lib/` | Shared helpers: providers, schemas, MMKV/SecureStore facades. |
| `src/services/` | Side effects & integrations (empty until APIs exist). |
| `src/assets/` | Images, fonts, static files referenced from `app.json` and UI. |

## Rules for new work

1. **New route** → add `src/app/<route>/index.tsx` (or file route) that **only** imports a screen from `src/features/<feature>/screens/`.
2. **New screen** → live under the feature’s `screens/` folder; never put business UI directly under `src/app/`.
3. **Shared visual change** → prefer `src/components/ui/`; read `docs/SHARED-UI-CHANGES-CHECKLIST.md` before merging.
4. **Cross-cutting behaviour** (analytics, error reporting) → `src/services/` or `src/lib/` — not inside a single feature’s `components/` unless truly feature-specific.
5. **Imports** → use `@/` alias (`@/features/...`, `@/components/...`) as configured in `tsconfig.json` and Babel `module-resolver`.

## Expansion

When a feature outgrows a flat folder, add subfolders **inside that feature** (`screens/parts/`, `hooks/`, etc.). Do not create new top-level buckets without updating this document and `docs/adr/`.
