# Implementation Plan: Style Guide — design tokens (NativeWind + Figma)

**Branch**: `002-design-tokens-style-guide` | **Date**: 2026-05-12 | **Spec**: [spec.md](./spec.md)  
**Input**: Plano derivado da spec 002 + pedido técnico de implementação (NativeWind, Figma oficial, fontes Bricolage Grotesque + Inter, spacing, radius, cores).

**Nota:** `tasks.md` é produzido por `/speckit-tasks`, não por este comando.

## Summary

Implementar a **base oficial de design tokens** do Savings Tracker como **fonte única de verdade em código** em `tailwind.config.js` (Tailwind 3 + NativeWind 4), com valores **copiados estritamente** dos nós Figma indicados, tipografia com **Inter** e **Bricolage Grotesque** carregadas de forma nativa (Expo), e **sincronização** dos tokens usados por **Gluestack** para evitar divergência com `className`. Documentação operacional em `contracts/*`, `research.md`, `data-model.md` e `quickstart.md`. Sombras/elevação só após confirmação no Figma ou aprovação explícita de design (ver `research.md`).

## Technical Context

**Language/Version**: TypeScript ~5.9 (strict), JavaScript para `tailwind.config.js`  
**Primary Dependencies**: Expo SDK 54, React Native 0.81, NativeWind ^4.2, Tailwind CSS ^3.4, `@gluestack-ui/themed` + `@gluestack-ui/config`, `expo-font`  
**Storage**: N/A (tokens são estáticos em config)  
**Testing**: Jest + jest-expo + RNTL (regressão leve em componentes que consomem tokens, quando existirem)  
**Target Platform**: iOS, Android, Web (Expo Router + Metro)  
**Project Type**: mobile-app (universal Expo)  
**Performance Goals**: Carregamento de fontes sem flash incorreto de tipografia; evitar árvore de tema duplicada desnecessária  
**Constraints**: Constituição (clareza, a11y, mobile-first); **sem valores inventados** fora do Figma; pedido explícito de melhores práticas NativeWind; New Architecture ativa — evitar hacks de styling incompatíveis  
**Scale/Scope**: Núcleo de cores + tipografia + spacing + radius do Figma; elevação condicionada a existência no design

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Princípio | Status nesta feature | Notas |
|-----------|----------------------|-------|
| Produto | ✅ | Tokens suportam clareza e confiança visual em metas/valores; não adicionam “funcionalidade” vazia. |
| Clareza e confiança | ✅ | Hierarquia tipográfica e cores semânticas reforçam leitura de montantes e estados. |
| UX / UI | ✅ | Espaçamento previsível, raios consistentes, menos decisões ad hoc. |
| Conteúdo | ⚠️ Parcial | Tokens não substituem copy; garantem legibilidade de textos existentes. |
| Mobile-first | ✅ | Escala e toques derivados do Figma + helpers NativeWind quando necessário. |
| Acessibilidade | ✅ | Contrato aponta para `a11y-baseline`; combinações críticas validáveis. |
| Performance | ✅ | Tema em build-time; fontes carregadas uma vez. |
| Técnico | ✅ | Um tema Tailwind principal; Gluestack espelhado; sem hardcode disperso. |

**Pós-Phase 1:** Nenhuma violação que exija Complexity Tracking.

## Project Structure

### Documentation (this feature)

```text
specs/002-design-tokens-style-guide/
├── plan.md              # Este ficheiro
├── spec.md
├── research.md          # Phase 0
├── data-model.md        # Phase 1
├── quickstart.md        # Phase 1
├── contracts/
│   ├── README.md
│   ├── design-token-contract.md
│   └── figma-source-map.md
└── checklists/
    └── requirements.md
```

### Source Code (repository root) — alvo da implementação (fase de coding)

```text
tailwind.config.js              # theme.extend: cores, tipo, spacing, radius, shadows (se houver)
global.css                      # @tailwind * ; opcional: variáveis futuras alinhadas ao time
metro.config.js                 # withNativeWind (já existente)
src/lib/providers/
  GluestackAppProvider.tsx      # eventual config estendida do Gluestack
src/app/_layout.tsx             # ou provider: useFonts / splash gate para fontes
src/components/ui/              # migrar gradualmente defaults ($token) → classes semânticas
```

**Structure Decision:** Manter a **árvore feature-first** da fundação (001); tokens são **transversais** em config + `src/lib`/`src/components/ui`, sem criar uma “feature” de domínio em `src/features/*` para o tema.

## Complexity Tracking

> Não aplicável — nenhuma violação da constituição exigindo justificação formal.

## Figma e rastreabilidade

| Área | Node |
|------|------|
| Cores | `271-2936` |
| Tipografia | `271-2905` |
| Spacing | `271-3210` |
| Radius | `271-3317` |

URLs completas: ver `contracts/figma-source-map.md`.

## Phase 0 & Phase 1 (executado neste plano)

- **Phase 0:** `research.md` — decisões NativeWind/Tailwind, Expo Font, coexistência Gluestack, regra “não inventar fora do Figma”, sombras TBD.
- **Phase 1:** `data-model.md` (entidades lógicas de tokens), `contracts/*`, `quickstart.md`, agent context em `.cursor/rules/specify-rules.mdc` apontando para `specs/002-design-tokens-style-guide/plan.md`.

## Próximo passo

Executar **`/speckit-tasks`** para gerar `tasks.md` com trabalhos ordenados (extração Figma → `tailwind.config.js` → fontes → Gluestack → revisão visual / lint).
