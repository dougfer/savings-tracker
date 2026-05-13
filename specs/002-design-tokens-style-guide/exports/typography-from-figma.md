# Tipografia — Figma nó `271-2905` (hero)

**Ficheiro Figma:** [savings-tracker — tipografia](https://www.figma.com/design/UtM4hqbnpAz8GAmCUO3ERr/savings-tracker?node-id=271-2905)

**Extração:** Framelink MCP `get_figma_data` (rótulos “Text Preset …”, painéis Font Size / Line Height / Letter Spacing, e `globalVars.styles`).

**Famílias em runtime (Expo):** Inter e Bricolage Grotesque via `@expo-google-fonts/*` — nomes registados `Inter_*` / `BricolageGrotesque_*` (ver `src/lib/fonts/app-fonts.ts`).

## Presets (conteúdo do frame)

| Preset | Família / peso (rótulo Figma) | Font Size | Line Height | Letter spacing (painel) |
|--------|------------------------------|-------------|--------------|---------------------------|
| Text Preset 1 | Bricolage Grotesque, SemiBold | 64 px | 100% | -2px |
| Text Preset 1 (Mobile) | Bricolage Grotesque, SemiBold | 44 px | 100% | -2px |
| Text Preset 2 | Inter, Bold | 32 px | 120% | 0px |
| Text Preset 3 | Inter, Bold * | 20 px | 120% | -0.3px |
| Text Preset 4 | Inter, SemiBold | 20 px | 120% | -0.3px |
| Text Preset 5 | Inter, Medium | 16 px | 150% | -0.3px |
| Text Preset 5 (SemiBold) | Inter, SemiBold | 16 px | 140% | -0.3px |
| Text Preset 6 | Inter, SemiBold | 14 px | 140% | -0.3px |
| Text Preset 7 | Inter, SemiBold | 11 px | 120% | 0px |

\*No Figma o estilo tipográfico do corpo do preset 3 usa `fontWeight` 600 (SemiBold) em `style_4DXJ34`, embora o rótulo diga “Bold”; o código segue o **estilo** (600).

## Estilos resolvidos (`globalVars`) — referência

| Style ID | fontFamily | fontWeight | fontSize | lineHeight | letterSpacing |
|----------|------------|------------|----------|------------|---------------|
| style_BR1M49 | Bricolage Grotesque | 600 | 64 | 1em | -3.125% |
| style_WSX8CD | Bricolage Grotesque | 600 | 44 | 1em | -4.545% |
| style_9MRJFN | Inter | 700 | 32 | 1.2em | — |
| style_4DXJ34 | Inter | 600 | 20 | 1.2em | -1.5% |
| style_06AG5R | Inter | 500 | 16 | 1.5em | -1.875% |
| style_IIF7VE | Inter | 600 | 16 | 1.4em | -1.875% |
| style_5MO0OL | Inter | 600 | 14 | 1.4em | -2.143% |
| style_164ZRE | Inter | 600 | 11 | 1.2em | — |

## Cor de texto dos exemplos

| HEX | Uso |
|-----|-----|
| `#02012C` | Texto principal nos presets (`fill_P0JOGB`) |

## Mapeamento sugerido → Tailwind `fontSize` (com `fontFamily` Expo)

| Token Tailwind | Tamanho | Line height | `fontFamily` (RN) |
|----------------|---------|-------------|-------------------|
| `text-display-lg` | 64px | 64px | `BricolageGrotesque_600SemiBold` |
| `text-display-md` | 44px | 44px | `BricolageGrotesque_600SemiBold` |
| `text-heading-lg` | 32px | 38.4px | `Inter_700Bold` |
| `text-heading-md` | 20px | 24px | `Inter_600SemiBold` |
| `text-body` | 16px | 24px | `Inter_500Medium` |
| `text-body-semibold` | 16px | 22.4px | `Inter_600SemiBold` |
| `text-body-sm` | 14px | 19.6px | `Inter_600SemiBold` |
| `text-caption` | 11px | 13.2px | `Inter_600SemiBold` |

Letter spacing: aplicar `-0.3px` onde indicado (`tracking-tight` custom ou campo no `fontSize`).
