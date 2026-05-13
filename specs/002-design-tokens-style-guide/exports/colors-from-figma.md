# Cores — Figma nó `271-2935` (Container → Palettes)

**Ficheiro Figma:** [savings-tracker — cores](https://www.figma.com/design/UtM4hqbnpAz8GAmCUO3ERr/savings-tracker?node-id=271-2935)

**Extração:** Framelink MCP `get_figma_data` (HEX dos cartões + `globalVars.styles`).

## Tinta / neutros (texto e superfície)

| Token Figma | HEX | Notas |
|-------------|-----|--------|
| Ink (rótulos / texto forte no layout de paleta) | `#02012C` | `fill_T126DB` — usar como **foreground** principal |
| Neutral 900 | `#101010` | |
| Neutral 800 | `#1F1F1F` | |
| Neutral 700 | `#313131` | |
| Neutral 600 | `#3C3B40` | |
| Neutral 500 | `#676767` | Texto secundário |
| Neutral 400 | `#898A8B` | |
| Neutral 300 | `#B7B7B7` | |
| Neutral 0 | `#FFFFFF` | Fundo / cartão |

## Laranja (ação)

| Token Figma | HEX |
|-------------|-----|
| Orange 400 | `#FF5722` |
| Orange 500 | `#EB430E` | **primary** recomendado |
| Orange 700 | `#B92B09` |
| Orange 800 | `#903014` |

## Verde (sucesso)

| Token Figma | HEX |
|-------------|-----|
| Green 500 | `#4ADE80` |
| Green 900 | `#1A3D2B` | Texto sobre superfície de sucesso clara |

## Vermelho (erro)

| Token Figma | HEX |
|-------------|-----|
| Red 500 | `#EF4444` | **destructive** |

## Outras cores úteis (frame tipografia `271-2905`, mesmo ficheiro)

| Uso | HEX |
|-----|-----|
| Traço de chips de especificação | `#CACFD8` | `fill_IXXZDV` → **border** / **input** |
| Divisor | `#E0E4EA` | `fill_2D1ANN` → **muted** (fundo neutro suave) |

## Papéis semânticos → Tailwind (`theme.extend.colors`)

| Chave Tailwind | HEX | Origem |
|----------------|-----|--------|
| `background` | `#FFFFFF` | Neutral 0 |
| `foreground` | `#02012C` | Ink |
| `card` | `#FFFFFF` | Neutral 0 |
| `card-foreground` | `#02012C` | Ink |
| `muted` | `#E0E4EA` | Divisor (fundo de bloco suave) |
| `muted-foreground` | `#676767` | Neutral 500 |
| `border` | `#CACFD8` | Traço chips tipografia |
| `input` | `#CACFD8` | idem |
| `ring` | `#EB430E` | Orange 500 |
| `primary` | `#EB430E` | Orange 500 |
| `primary-foreground` | `#FFFFFF` | Neutral 0 |
| `secondary` | `#3C3B40` | Neutral 600 |
| `secondary-foreground` | `#FFFFFF` | Neutral 0 |
| `destructive` | `#EF4444` | Red 500 |
| `destructive-foreground` | `#FFFFFF` | Neutral 0 |
| `success` | `#4ADE80` | Green 500 |
| `success-foreground` | `#1A3D2B` | Green 900 |
| `warning` | `#FF5722` | Orange 400 |

> **Nota:** Não há token dedicado “info” neste frame; evitar `info` em produto até existir variável no Figma.
