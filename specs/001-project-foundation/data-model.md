# Data model: Feature 01 — Fundação (artefatos estruturais)

Esta feature **não** define entidades financeiras (metas, transações, etc.). Define apenas **artefatos de código e convenções** que futuras features irão referenciar.

## 1. Feature module

| Campo | Descrição |
|-------|-----------|
| `id` | Nome da pasta em `src/features/<id>/` (kebab-case: `recurring-bills`) |
| `screens` | Componentes de ecrã usados por rotas em `src/app` |
| `components` | UI específica da feature, não reutilizável noutros domínios |
| `hooks` | Hooks de composição da feature |
| `index.ts` | Barrel opcional para export público limitado da feature |

**Regras:** Features **não** importam outras features diretamente; comunicação futura via contratos em `src/lib` ou `src/services` para evitar acoplamento cíclico.

## 2. Store slice (Zustand)

| Campo | Descrição |
|-------|-----------|
| `name` | Nome do slice (ex.: `uiPreferences`) |
| `persisted` | boolean — só `true` para dados não sensíveis; segredos vão para SecureStore |
| `schema` | Zod opcional para validar estado hidratado do MMKV |

Nesta fundação: no máximo slices **não financeiros** (tema, locale experimental, flags de dev).

## 3. Route surface

Rotas expostas em `src/app` seguem convenção Expo Router (`(groups)`, `_layout`, `index`).

**Estado inicial:** `index` pode redirecionar para placeholder de `overview` ou ecrã “Foundation OK” até existir produto.

## 4. Tipos transversais (`src/types`)

Alojar apenas tipos partilhados (ex.: `Result`, `BrandedId` futuro). **Não** criar tipos de domínio financeiro nesta feature.

## 5. Validação / transições

Sem máquinas de estado de negócio nesta entrega. Formulários exemplo (opcional) podem usar Zod para campos fictícios a fim de demonstrar padrão.
