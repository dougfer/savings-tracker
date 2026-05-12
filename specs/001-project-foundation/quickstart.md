# Quickstart: Savings Tracker (fase fundação)

## Pré-requisitos

- Node.js **20.19.4+** (see `.nvmrc`; Expo RN 0.81 warns below this patch level)
- **npm**, **pnpm** ou **yarn** (recomendado: uma única ferramenta por repo)
- Para iOS: Xcode (macOS)
- Para Android: Android Studio + SDK
- Conta opcional Expo para builds na nuvem (EAS), não obrigatória para `expo start`

## Criar e instalar (quando o projeto for inicializado)

```bash
cd /path/to/savings-tracker
npm install
```

## Desenvolvimento

```bash
npx expo start
```

- Tecla **i** — iOS simulator (macOS)  
- Tecla **a** — Android emulator  
- Tecla **w** — Web  

## Verificações recomendadas

```bash
npx expo-doctor
npm test
npm run lint
```

## Onde ler a arquitetura

1. [plan.md](./plan.md) — stack e árvore de pastas  
2. [research.md](./research.md) — decisões e alternativas  
3. [contracts/](./contracts/) — contratos de módulo e a11y baseline  

## Validação (implementação)

- `npm install` + `npx expo-doctor` — **17/17** checks passed (2026-05-12).
- `npm test` + `npm run lint` — executed successfully after foundation merge.

## Nota de escopo

Não existe ainda fluxo de utilizador financeiro. O objetivo é compilar, correr em iOS/Android/Web e validar a estrutura feature-first + Router.
