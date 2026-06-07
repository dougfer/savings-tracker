# Implementation Plan: Criar Conta

**Branch**: `008-criar-conta` | **Date**: 2026-06-06 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/008-criar-conta/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Implement the Criar Conta (Create Account) page — a frontend-only sign-up form screen. The feature follows the same architectural patterns as the existing login screen: Feature First structure, responsive layout with a shared QuoteSection on desktop, and form handling via react-hook-form + zod. Four input fields (name, email, password, confirm password) with inline validation, password visibility toggles, loading feedback, and a navigation link back to login. No backend integration, no data persistence.

## Technical Context

**Language/Version**: TypeScript 5.x (React Native / Expo SDK)
**Primary Dependencies**: Expo Router, React Native, NativeWind 4 (Tailwind), Gluestack UI v3, react-hook-form, zod, @hookform/resolvers, react-native-svg
**Storage**: N/A (no backend, no persistence for this feature)
**Testing**: Jest (following project test patterns under `src/tests/`)
**Target Platform**: iOS, Android, Web (Expo cross-platform)
**Project Type**: Mobile app (React Native / Expo)
**Performance Goals**: 60fps interactions, <2s initial render, <1s validation feedback
**Constraints**: Mobile-first responsive, a11y compliance (keyboard nav, screen readers), no external API calls
**Scale/Scope**: Single screen feature (1 route, 1 screen, 1-2 components), replacing placeholder at `/sign-up`

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Verificar conformidade com `.specify/memory/constitution.md` (Savings Tracker Platform):

- **Produto:** A tela de cadastro é porta de entrada para novos usuários iniciarem sua jornada de poupança. Responde "isso ajuda o usuário a economizar melhor?" — sim, ao viabilizar a entrada na plataforma. ✅
- **Clareza e confiança:** Formulário com validação inline, mensagens explícitas, sem placeholders genéricos. Campos desabilitados durante carregamento previnem comportamento inconsistente. ✅
- **UX:** Fluxo curto (4 campos) e objetivo. Validação em tempo real reduz erros. Navegação de escape para login presente. ✅
- **UI:** Utiliza tokens e componentes do design system existente. Hierarquia visual clara com logo, heading, campos, CTA. Sem decoração excessiva. ✅
- **Conteúdo:** Labels e mensagens são funcionais e orientam ação. Textos em pt-BR definidos. Sem copy de protótipo. ✅
- **Mobile-first:** Layout empilhado verticalmente em mobile com padding adequado. Campos e botão dimensionados para toque. Teclados configurados por tipo de campo. ✅
- **Acessibilidade:** Ordem de foco definida (nome → email → senha → confirmar senha → botão → link). Estados de foco visíveis via pencil-focus-ring. Labels e anúncios para leitores de tela. ✅
- **Performance:** Sem chamadas de rede. Formulário leve com renderização condicional de estados. QuoteSection com SVG reaproveitado. ✅
- **Técnico:** Separação clara entre screen (orquestrador) e form component (lógica). react-hook-form + zod para validação robusta. Componentes AppInput/AppButton reaproveitados. Sem hacks. ✅

**Gate Result**: PASS — All 9 principles satisfied. No violations to justify.

## Project Structure

### Documentation (this feature)

```text
specs/008-criar-conta/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (N/A — no external interfaces)
└── tasks.md             # Phase 2 output (/speckit-tasks)
```

### Source Code (repository root)

```text
src/
├── app/
│   └── sign-up/
│       └── index.tsx                    # Re-exports SignUpScreen (replaces placeholder)
├── components/
│   └── ui/
│       ├── quote-section/                # NEW: QuoteSection extracted from login (shared)
│       │   ├── quote-section.tsx
│       │   └── index.ts
│       ├── app-input/                   # Existing — reused
│       ├── app-button/                  # Existing — reused
│       └── ...                          # Other existing components
├── features/
│   ├── login/
│   │   ├── components/
│   │   │   └── login-form.tsx           # Updated: import QuoteSection from global
│   │   └── screens/
│   │       └── login-screen.tsx         # Updated: import QuoteSection from global
│   └── sign-up/                         # NEW: sign-up feature module
│       ├── components/
│       │   └── sign-up-form.tsx         # Sign-up form component (react-hook-form + zod)
│       └── screens/
│           └── sign-up-screen.tsx        # Screen orchestrator (layout + QuoteSection + form)
└── lib/
    ├── schemas/
    │   └── sign-up.schema.ts            # NEW: zod schema for sign-up validation
    └── ...
```

**Structure Decision**: Feature First architecture — the sign-up feature lives in `src/features/sign-up/` with `screens/` and `components/` subdirectories. The route file at `src/app/sign-up/index.tsx` is a thin re-export. QuoteSection is extracted from `src/features/login/components/` to `src/components/ui/quote-section/` as a shared component, receiving text as props.

## Complexity Tracking

> No constitution violations — no complexity to justify.
