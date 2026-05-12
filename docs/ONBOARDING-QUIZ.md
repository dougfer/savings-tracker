# Onboarding quiz (8 questions)

_Answer without opening files first, then verify._

1. Where do Expo Router route files live, and what must they **not** contain?
2. Where does the `OverviewPlaceholderScreen` component file live (full path under `src/`)?
3. What is the purpose of `src/components/layout/AppScreen.tsx`?
4. Which folder holds **shared** button/text primitives re-exported for the app?
5. Name one rule from `contracts/feature-module-layout.md` about imports between features.
6. Which store file holds **non-domain** UI preferences only?
7. What command runs the linter?
8. Where should a new Zod schema shared by multiple features be placed?

---

## Answer key (for tech lead)

1. `src/app/` — routes stay thin (no business logic); delegate to `src/features/*/screens`.
2. `src/features/overview/screens/OverviewPlaceholderScreen.tsx`
3. Mobile-first screen shell (safe area + padding) reused by placeholders.
4. `src/components/ui/` (including `AppText`, Gluestack exports).
5. Features must **not** import from another feature’s folder directly — use `src/lib` / `src/services` for shared contracts.
6. `src/stores/ui-preferences.store.ts`
7. `npm run lint`
8. `src/lib/schemas/`
