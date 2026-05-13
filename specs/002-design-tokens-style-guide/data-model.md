# Data model — Design tokens (artefacto lógico)

Este documento descreve **entidades de dados do design system**, não persistência em base de dados. Serve para alinhar nomes entre Figma, Tailwind e documentação.

## 1. ColorToken

| Campo | Tipo lógico | Descrição |
|-------|-------------|-----------|
| `id` | string | Identificador estável em código (kebab-case), ex.: `primary-foreground`. |
| `semanticRole` | enum textual | `background`, `foreground`, `accent`, `destructive`, `border`, `muted`, … conforme contrato. |
| `value` | cor | Hex ou RGB do Figma. |
| `figmaStylePath` | string? | Caminho ou nome do estilo no Figma (opcional, para auditoria). |
| `darkValue` | cor? | Preencher apenas quando dark mode existir no Figma. |

**Relações:** Vários `ColorToken` agrupam-se em conjuntos (Brand, Surface, Feedback). Não há FKs em BD.

## 2. TypographyStyle

| Campo | Tipo lógico | Descrição |
|-------|-------------|-----------|
| `id` | string | ex.: `heading-lg`, `body`, `caption`, `tabular-amount`. |
| `fontFamily` | `inter` \| `bricolage` | Mapear para `font-sans` / `font-display` no Tailwind. |
| `fontSize` | number (px) | Do Figma (layout grid). |
| `lineHeight` | number (px) ou ratio | Do Figma. |
| `fontWeight` | number / keyword | Do Figma. |
| `letterSpacing` | string? | Opcional. |
| `usage` | string | Quando usar (título de ecrã, valor monetário, legenda). |

## 3. SpacingToken

| Campo | Tipo lógico | Descrição |
|-------|-------------|-----------|
| `id` | string | ex.: `1`, `2`, `3` ou nome `xs`…`3xl` alinhado ao Figma. |
| `value` | number (px) | Passo na escala. |

**Regra:** Componentes e ecrãs referem apenas `id`s da escala (via `p-*`, `gap-*`, `m-*`).

## 4. RadiusToken

| Campo | Tipo lógico | Descrição |
|-------|-------------|-----------|
| `id` | string | ex.: `sm`, `md`, `lg`, `full`. |
| `value` | number (px) | Do Figma. |
| `componentHints` | string[] | ex.: `["Button", "Input"]` — documentação humana. |

## 5. ShadowToken (opcional até confirmação Figma)

| Campo | Tipo lógico | Descrição |
|-------|-------------|-----------|
| `id` | string | ex.: `elevation-1` … `elevation-3`. |
| `layers` | lista de sombras | offset, blur, spread, cor, opacidade — espelhar Figma. |
| `usage` | string | Modal, toast, FAB, etc. |

**Estado:** Entidade reservada; valores só após confirmação de frame ou decisão explícita de design.

## 6. Validação

- Cada token novo deve ter **par** Figma (nome ou estilo) ou registo de exceção aprovada no contrato de governança da spec.  
- Tipografia para **valores monetários** deve ter variante legível (tabular figures se o Figma especificar).
