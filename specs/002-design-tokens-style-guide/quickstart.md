# Quickstart — Design tokens (002)

## Pré-requisitos

- Branch `002-design-tokens-style-guide` (ou equivalente).
- Acesso ao [Ficheiro Figma](https://www.figma.com/design/UtM4hqbnpAz8GAmCUO3ERr/savings-tracker) e aos nós em `contracts/figma-source-map.md`.
- Node 18+, `npm install`, Expo SDK 54 conforme `package.json`.

## Fluxo de trabalho

1. **Extrair** valores do Figma (cores, tipo, spacing, radius) para uma checklist local ou tabela temporária — **sem** alterar código até conferência cruzada com o mapa de nós.
2. **Transcrever** para `tailwind.config.js` → `theme.extend` (cores, `fontSize`, `fontFamily`, `spacing`, `borderRadius`, `boxShadow` se aplicável).
3. **Registar** o mapeamento nome Figma ↔ chave Tailwind num comentário no topo do `tailwind.config.js` ou numa linha na tabela do `figma-source-map.md`.
4. **Sincronizar** tokens Gluestack usados em componentes partilhados (`src/components/ui/*`) para os mesmos valores hex/rgb.
5. **Carregar fontes** com `expo-font` / `useFonts` (`src/app/_layout.tsx`, mapa `src/lib/fonts/app-fonts.ts` com `@expo-google-fonts/*`; ver `assets/fonts/README.md` para vendoring opcional) e `expo-splash-screen` até `loadAsync` concluir.
6. **Validar** contraste em ecrãs com formulários (ver `a11y-baseline.md`).

## Onde está o quê

| O quê | Onde |
|-------|------|
| Guia para stakeholders | `docs/style-guide.md` |
| Exports versionáveis (valores + auditoria Figma) | `specs/002-design-tokens-style-guide/exports/` (`colors-from-figma.md`, `typography-from-figma.md`, `spacing-from-figma.md`, `radius-from-figma.md`, `README.md`) |
| Contrato de uso | `specs/002-design-tokens-style-guide/contracts/design-token-contract.md` |
| Nós Figma | `specs/002-design-tokens-style-guide/contracts/figma-source-map.md` |
| Tema Tailwind | `tailwind.config.js` (raiz) |
| CSS global | `global.css` |
| Metro + NativeWind | `metro.config.js` |
| Provider Gluestack | `src/lib/providers/GluestackAppProvider.tsx` → `src/lib/gluestack/gluestack-ui.config.ts` |
| Fontes (Inter + Bricolage) | `src/lib/fonts/app-fonts.ts` + `useFonts` em `src/app/_layout.tsx` (`@expo-google-fonts/*`; opcional vendoring em `assets/fonts/README.md`) |

## Comandos úteis

```bash
npm run start
npm run lint
npm run test
```

## Quando parar e perguntar

- Valor ausente ou inconsistente entre dois frames do Figma.  
- Sombras/elevação sem definição.  
- Conflito entre token Gluestack existente e novo token semântico.

Nesses casos, alinhar com design **antes** de merge.
