# Quickstart: Área Logada

**Date**: 2026-06-07 | **Feature**: [spec.md](./spec.md)

## Prerequisites

- Node.js 18+
- Expo CLI (`npx expo`)
- Project dependencies installed (`npm install`)

## Running the Feature

1. Start the dev server:

   ```bash
   npm start
   ```

2. Navigate to the logged area:

   - **Dashboard (logged area home)**: `/` or `/(logged)` 
   - In the browser: `http://localhost:8081/`
   - On device: scan the QR code from Expo

3. Verify the Topbar renders:
   - **Desktop** (>1024px): Logo (icon + "Savings Tracker") left, "New goal" button right, 80px height
   - **Tablet** (768-1023px): Logo + "New goal" button + Avatar, 80px height
   - **Mobile** (<768px): Icon only + "New goal" button + Avatar, 56px height

## Key Files

| File | Purpose |
|------|---------|
| `src/app/(logged)/_layout.tsx` | Group layout — renders Topbar + Stack navigator |
| `src/app/(logged)/index.tsx` | Dashboard route (thin re-export) |
| `src/components/ui/topbar/topbar.tsx` | Topbar component with responsive variants |
| `src/components/ui/topbar/index.ts` | Barrel export for Topbar |
| `src/features/overview/screens/dashboard-screen.tsx` | Dashboard screen content |

## Testing

Run the test suite:

```bash
npm test
```

For Topbar-specific tests:

```bash
npx jest src/components/ui/topbar/
```

## Development Notes

- The Topbar is a shared UI component — it should not import from any feature directory.
- Route files under `src/app/(logged)/` are thin re-exports following the pattern: `export { default } from '@/features/.../screens/...-screen'`.
- The "New goal" button has no `onPress` handler — it will be wired in a future feature.
- The avatar component renders a placeholder (initials) since no user data is loaded in this feature.
- All styling uses NativeWind utility classes mapped to tokens in `tailwind.config.js`.
