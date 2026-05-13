# Exports — design tokens (Figma → código)

Este diretório guarda **tabelas versionáveis** com valores copiados do Figma (ou estado explícito de auditoria). São a ponte entre:

- **`contracts/figma-source-map.md`** — *onde* está cada decisão no Figma (IDs de nó).
- **`tailwind.config.js`** (raiz do repo) — *como* os valores entram no tema NativeWind/Tailwind (`theme.extend`).

## Ficheiros

| Ficheiro | Nó Figma (fragmento URL) | Uso em código |
|----------|--------------------------|---------------|
| `colors-from-figma.md` | `271-2935` | `theme.extend.colors` |
| `typography-from-figma.md` | `271-2905` | `theme.extend.fontFamily`, `fontSize`, `lineHeight`, `letterSpacing` |
| `spacing-from-figma.md` | `271-3209` | `theme.extend.spacing` |
| `radius-from-figma.md` | `271-3317` | `theme.extend.borderRadius` |

## Fluxo recomendado

1. Abrir o frame indicado em `figma-source-map.md`.
2. Atualizar a tabela correspondente neste diretório (sem alterar nomes semânticos sem acordo com design).
3. Copiar valores para `tailwind.config.js` e, quando aplicável, alinhar tokens `$` no provider Gluestack (`src/lib/gluestack/gluestack-ui.config.ts`).
4. Registar na mesma PR qualquer **exceção** ou valor **pendente** também em `contracts/figma-source-map.md`.

## Nota de extração (2026-05-12)

Cores, tipografia e spacing foram sincronizados com o **Framelink MCP for Figma** (`get_figma_data`). O nó de **radius** (`271-3317`) devolveu **HTTP 429** na API Figma — ver `radius-from-figma.md` para valores parciais e re-tentativa.
