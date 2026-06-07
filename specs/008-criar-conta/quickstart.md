# Quickstart: Criar Conta

**Feature**: Criar Conta (Create Account)  
**Date**: 2026-06-06

## Prerequisites

- Node.js >= 18
- pnpm (project package manager)
- Expo development environment configured
- All dependencies installed (`pnpm install`)

## Files to Create

| File | Purpose |
|------|---------|
| `src/lib/schemas/sign-up.schema.ts` | Zod validation schema for sign-up form |
| `src/features/sign-up/screens/sign-up-screen.tsx` | Screen orchestrator (layout + responsive) |
| `src/features/sign-up/components/sign-up-form.tsx` | Form component (react-hook-form + zod) |
| `src/components/ui/quote-section/quote-section.tsx` | Extracted shared QuoteSection component |
| `src/components/ui/quote-section/index.ts` | Barrel export for QuoteSection |

## Files to Modify

| File | Change |
|------|--------|
| `src/app/sign-up/index.tsx` | Replace placeholder with re-export of SignUpScreen |
| `src/features/login/components/quote-section.tsx` | Replace body with re-export from shared component |
| `src/features/login/screens/login-screen.tsx` | Update import path for QuoteSection |
| `src/components/ui/index.ts` | Add QuoteSection export |

## Implementation Order

1. **Extract QuoteSection** to shared components directory
2. **Create zod schema** for sign-up validation
3. **Create SignUpForm** component with react-hook-form
4. **Create SignUpScreen** layout component
5. **Update route** at `src/app/sign-up/index.tsx`
6. **Update login** to import QuoteSection from new path

## Verification

```bash
# Type check
npx tsc --noEmit

# Lint
pnpm run lint

# Run tests
pnpm run test
```

## Key Conventions

- All text in pt-BR (português brasileiro)
- Forms use `react-hook-form` + `zod` with `@hookform/resolvers`
- Components use NativeWind classes for styling (Tailwind)
- Icons from `@/assets/icons` via `AppInput.Slot` with icon name string
- Responsive breakpoints: default (mobile), `md:` (tablet), `lg:` (desktop)
- Focus rings via `pencil-focus-ring` utility classes
- Feature First: `src/features/<feature>/screens/` and `src/features/<feature>/components/`
- Routes are thin re-exports: `export { default } from '@/features/sign-up/screens/sign-up-screen'`
