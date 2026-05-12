# Research: Feature 01 — Fundação técnica (Expo)

**Date**: 2026-05-11  
**Sources**: Documentação Expo (SDK 54 / Router), práticas comuns da comunidade RN; validar versões exatas no momento do `npx create-expo-app@latest` e `expo-doctor`.

## 1. Plataforma e SDK

**Decision:** Usar **Expo managed workflow** com **SDK 54** (linha estável referenciada na documentação Context7 / ramo sdk-54 no repositório Expo).

**Rationale:** Suporte unificado iOS, Android e Web; Expo Router integrado; alinhado ao pedido “última versão estável” na data do plano.

**Alternatives considered:** Bare React Native (mais fricção multiplataforma); SDK mais antigo (menos alinhado a “estável atual”).

## 2. Raiz de rotas (`src/app`)

**Decision:** Colocar rotas do Expo Router em **`src/app`** com `main`: `expo-router/entry` no `package.json` e plugin `expo-router` em `app.json`.

**Rationale:** Documentação Expo confirma deteção automática de `src/app` como raiz de rotas.

**Alternatives considered:** `app/` na raiz do repo — válido, mas o layout acordado pelo produto prioriza `src/` unificado.

**Warning:** Personalizar outro diretório via config plugin para rotas é desencorajado pela Expo; **não** usar diretórios arbitrários fora `app` / `src/app`.

## 3. Feature-first + Router

**Decision:** Ficheiros de rota em `src/app` permanecem finos: importam ecrãs ou composição a partir de `src/features/<feature>/screens/*`. Lógica de domínio e UI específica ficam sob `src/features/<feature>/`.

**Rationale:** Cumpre FR-001–FR-004 da spec (localização previsível, expansão por feature).

**Alternatives considered:** Pastas só por tipo (`components/` gigante sem feature) — rejeitado.

## 4. NativeWind + Gluestack UI

**Decision:** **NativeWind v4** (Tailwind em RN) para utilitários + **Gluestack UI** como biblioteca de componentes; configurar uma única fonte de tokens (cores, espaçamento) para evitar divergência.

**Rationale:** Pedido explícito do produto; DS acelera consistência (constituição UI/UX).

**Alternatives considered:** StyleSheet apenas (mais leve porém mais lento para iterar UI profissional).

**Implementation note:** Seguir guias oficiais de instalação de cada pacote para SDK 54; resolver peer dependencies com `expo install`.

## 5. Estado: Zustand + MMKV

**Decision:** **Zustand** para estado global; **MMKV** para persistência rápida de preferências/flags; **expo-secure-store** para segredos.

**Rationale:** Combinação comum, performática, compatível com offline-first futuro.

**Alternatives considered:** Redux Toolkit (mais cerimonial para fase inicial).

**Implementation note:** `react-native-mmkv` inclui código nativo; em fluxos **Expo Go** pode ser limitado. Para desenvolvimento estável, usar **development build** (`expo-dev-client` + `expo run:ios|android`) após `expo prebuild` conforme documentação atual. Validar matriz Expo Go vs dev client no momento da implementação.

**Scope alignment:** A spec exclui “persistência de dados” de **negócio** (metas, transações). Uso de MMKV/SecureStore limitado a **infra** (tema, sessão técnica, feature flags), não modelo financeiro.

## 6. Formulários e validação

**Decision:** **React Hook Form** + **Zod** (`@hookform/resolvers/zod`); schemas partilhados em `src/lib` quando forem transversais.

**Rationale:** Validação explícita e mensagens claras (constituição / UX).

## 7. Testes

**Decision:** **Jest** com preset recomendado para Expo + **React Native Testing Library**; testes de fumaça em componentes de `components/ui` e num ecrã canónico.

**Rationale:** Pedido explícito; suporta gates de regressão estrutural.

## 8. Qualidade (ESLint + Prettier)

**Decision:** Configuração **eslint-config-expo** (ou equivalente oficial) + Prettier; regra de import/order opcional mas recomendada para legibilidade (FR-007).

## 9. Animações

**Decision:** **react-native-reanimated** (via Expo); babel/plugin conforme template Expo.

**Rationale:** Pedido explícito; animações só onde agregam clareza (constituição performance).

## 10. Datas

**Decision:** **date-fns** para manipulação e formatação em TZ local; evitar mutação in-place.

**Rationale:** Pedido explícito; tree-shaking amigável.
