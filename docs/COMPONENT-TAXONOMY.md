# Component taxonomy

Maps to **FR-003** and onboarding quiz material.

| Kind | Location | When to use |
|------|-----------|-------------|
| **Reusable UI** | `src/components/ui/` | Appears in multiple features OR is a design-token primitive (buttons, inputs, `AppText`). |
| **Layout** | `src/components/layout/` | Page shells, safe-area wrappers, navigation chrome shared across features. |
| **Feedback** | `src/components/feedback/` | Toasts, inline alerts, loading overlays that any feature can trigger. |
| **Feature-specific** | `src/features/<f>/components/` | Used by one feature only; importing it from another feature is a smell. |
| **Structural** | Usually colocated with route or layout | Providers, error boundaries, router group layouts under `src/app/`. |
| **Form** | `src/components/ui/` (shared) or feature `components/` | Reusable field groups vs one-off forms. |

## Reuse vs duplicate (edge cases)

- **Prefer reuse** when the visual contract and behaviour are identical across features.
- **Duplicate temporarily** when flows diverge but look similar — track in a short ADR or ticket to merge or extract later.
- **Extract to `ui/`** when a second feature needs the same building block and the API is stable.

## Forms & validation

- Shared Zod schemas → `src/lib/schemas/`.
- `react-hook-form` instances stay close to the screen or a feature-local `hooks/` file.
