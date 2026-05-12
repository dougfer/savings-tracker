# Developer onboarding (~45 minutes)

## 0–10 min — Orientation

1. Read [STRUCTURE.md](./STRUCTURE.md).
2. Skim [COMPONENT-TAXONOMY.md](./COMPONENT-TAXONOMY.md).
3. Open `specs/001-project-foundation/contracts/feature-module-layout.md`.

## 10–25 min — Codebase tour

4. Open `src/app/_layout.tsx` — note providers (Safe area, Gluestack).
5. Open `src/app/index.tsx` — see thin route → feature screen pattern.
6. Open `src/features/overview/screens/OverviewPlaceholderScreen.tsx` — navigation + feature-local `OverviewHint`.
7. Open `src/components/layout/AppScreen.tsx` — shared layout shell.

## 25–40 min — Guided exercise (solo)

8. Locate **`AppScreen`** (path above).
9. Locate **one feature module** (`src/features/budgets/`) and its placeholder screen.
10. Locate **one shared primitive** (`src/components/ui/AppText.tsx`).
11. Add a temporary `AppText` line to any placeholder screen, run `npm run lint`, then revert or keep if part of your task.

## 40–45 min — Validate

12. Complete [ONBOARDING-QUIZ.md](./ONBOARDING-QUIZ.md) and compare with the answer key.

## Commands reference

```bash
npm install
npx expo start
npm run lint
npm test
```
