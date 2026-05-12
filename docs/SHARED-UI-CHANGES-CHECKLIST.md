# Shared UI changes checklist

Use this before merging PRs that touch `src/components/ui/**`.

1. **Search consumers** — `rg "from '@/components/ui" src` and fix any unintended API breaks.
2. **Visual smoke** — run `npx expo start` on **Android**, **iOS** (or simulator), and **Web** if the change affects layout or className-based styles.
3. **Accessibility** — verify `accessibilityLabel`, roles, and focus order on touched components (`specs/001-project-foundation/contracts/a11y-baseline.md`).
4. **Tokens** — if colours/spacing change, confirm Gluestack token usage still matches design intent (avoid one-off hex in shared primitives unless documented).
5. **Screenshots** — attach before/after for reviewer when UI shifts are non-trivial.
