# Savings Tracker (Expo)

Personal finance client foundation: **Expo SDK 54**, **Expo Router** (`src/app`), **feature-first** layout under `src/features`, **Gluestack UI** + **NativeWind**, **Zustand**, **MMKV** (native) / in-memory (web) for non-domain keys, **SecureStore** wrapper for secrets.

## Requirements

- Node **>= 20.19.4** recommended (Expo / RN 0.81 engine range).
- **MMKV** needs a **development build** for full native behaviour (`npx expo install expo-dev-client` then `npx expo run:ios` / `run:android`). `expo start --web` uses an in-memory fallback in `src/lib/mmkv.ts` so web dev still runs.

## Commands

```bash
npm install
npx expo start
```

- `npm run lint` — ESLint (flat config + `eslint-config-expo`)
- `npm run format` — Prettier
- `npm test` — Jest + RNTL smoke (add specs under `src/**/*.test.tsx`)

## Docs

- [docs/STRUCTURE.md](./docs/STRUCTURE.md) — where code lives
- [specs/001-project-foundation/plan.md](./specs/001-project-foundation/plan.md) — implementation plan
