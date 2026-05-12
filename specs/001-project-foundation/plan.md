# Implementation Plan: Feature 01 — Setup inicial e fundação técnica

**Branch**: `002-project-foundation` | **Date**: 2026-05-11 | **Spec**: [spec.md](./spec.md)  
**Input**: Fundação Expo + React Native (iOS, Android, Web), arquitetura feature-first, stack e pastas definidas pelo time; alinhado a [spec.md](./spec.md).

**Note**: Artefatos de pesquisa e desenho em `research.md`, `data-model.md`, `contracts/`, `quickstart.md`. Tarefas em `/speckit-tasks` geram `tasks.md`.

## Summary

Entregar um monólito cliente único com **Expo (SDK 54, linha estável atual)** e **Expo Router**, **TypeScript**, navegação por arquivos em **`src/app`**, organização **feature-first** em `src/features/*`, UI com **Gluestack UI** + **NativeWind**, estado global **Zustand**, formulários **React Hook Form** + **Zod**, animações **Reanimated**, datas **date-fns**, persistência leve **MMKV** e segredos **Expo SecureStore**, qualidade com **ESLint** + **Prettier**, testes com **Jest** + **React Native Testing Library**. Objetivo: base profissional multiplataforma sem regras de negócio financeiras nem telas finais de produto (conforme spec e exclusões).

## Technical Context

**Language/Version**: TypeScript (strict, alinhado ao template Expo SDK 54)  
**Primary Dependencies**: Expo SDK 54, React Native (via Expo), Expo Router, Zustand, React Hook Form, Zod, NativeWind, Gluestack UI, react-native-mmkv (ou wrapper compatível Expo), expo-secure-store, date-fns, react-native-reanimated  
**Storage**: MMKV para chave-valor rápido local; SecureStore para tokens/segredos; sem modelo de domínio financeiro persistido nesta feature  
**Testing**: Jest + React-native-testing-library (+ preset Expo)  
**Target Platform**: iOS, Android, Web (Expo)  
**Project Type**: mobile-app (universal Expo)  
**Performance Goals**: Tempo de interação fluido em dispositivos médios; evitar listas não virtualizadas em telas futuras; bundle inicial razoável para app financeiro (otimização contínua, não hard numérico neste plano)  
**Constraints**: Constituição (mobile-first, a11y base, performance, clareza); spec exclui persistência de **dados de negócio** — MMKV/SecureStore são **infra** local permitida para chaves, flags e segredos  
**Scale/Scope**: Fundação + pastas exemplo + convenções; features `overview`, `transactions`, `budgets`, `pots`, `recurring-bills` como esqueleto sem fluxo de negócio

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Princípio | Status nesta feature | Notas |
|-----------|----------------------|--------|
| Produto | ✅ | Escopo é infraestrutura; não adiciona “funcionalidade financeira” ao utilizador. Próximas features respondem à pergunta de produto. |
| Clareza e confiança | ⚠️ Deferido | Dashboard e métricas quando existirem telas de produto; base garante rotas/layout e padrões para dados claros depois. |
| UX / UI / Conteúdo | ⚠️ Parcial | Design system (Gluestack) + regras de copy em convenções; UI final e conteúdo de produto fora do escopo da spec. |
| Mobile-first | ✅ | Expo + Router + NativeWind orientados a mobile primeiro; Web como alvo adicional. |
| Acessibilidade | ✅ | Gluestack + semântica RN; requisitos mínimos em `contracts/a11y-baseline.md` e research. |
| Performance | ✅ | Reanimated/MMKV/Expo como baseline; evitar padrões pesados na fundação. |
| Técnico | ✅ | Feature-first, separação app vs features vs components, stores/services. |

**Pós-Phase 1:** Nenhuma violação que exija Complexity Tracking; gates de produto específicos permanecem para features de utilizador.

## Project Structure

### Documentation (this feature)

```text
specs/001-project-foundation/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── README.md
│   ├── feature-module-layout.md
│   └── a11y-baseline.md
├── spec.md
└── checklists/
    └── requirements.md
```

### Source Code (repository root)

```text
src/
├── app/                      # Expo Router: rotas e layouts (src/app suportado oficialmente)
│   ├── _layout.tsx
│   ├── (tabs)/               # exemplo: grupo de tabs quando existir produto
│   └── index.tsx
├── features/
│   ├── overview/
│   ├── transactions/
│   ├── budgets/
│   ├── pots/
│   └── recurring-bills/      # cada feature: screens/, components/, hooks/, services.ts opcional
├── components/
│   ├── ui/                     # Gluestack + tokens compartilhados
│   ├── layout/
│   └── feedback/
├── services/                   # integrações futuras, side-effects puros
├── stores/                     # slices Zustand (+ persistência MMKV onde aplicável)
├── hooks/
├── utils/
├── types/
├── constants/
├── assets/
├── lib/                        # zod schemas compartilhados, form helpers, etc.
└── tests/                      # ou co-localizado **/*.test.tsx — decisão em research

app.json / expo-env.d.ts / metro (raiz)
.eslintrc.cjs, prettier, tsconfig
```

**Structure Decision**: Monorepo **não** exigido na fase 1; app único em `src/` com rotas em `src/app` e domínios em `src/features/<name>/` com colocação previsível de ecrãs e módulos. Componentes transversais em `src/components/*`. Estado em `src/stores`. Cross-cutting em `src/lib` e `src/services`.

## Complexity Tracking

> Nenhuma violação da constituição exigindo justificativa formal. A stack é ampla por decisão explícita do produto (UI system, animação, persistência local); alternativa “mínima” foi rejeitada em favor de consistência multiplataforma e DS único.

## Phase 0 & Phase 1 (executado neste plano)

- **Phase 0:** `research.md` — decisões de stack, `src/app`, NativeWind + Gluestack, persistência local vs escopo da spec.
- **Phase 1:** `data-model.md` (artefatos estruturais, não entidades financeiras), `contracts/*`, `quickstart.md`, atualização de `.cursor/rules/specify-rules.mdc` para apontar para este `plan.md`.
