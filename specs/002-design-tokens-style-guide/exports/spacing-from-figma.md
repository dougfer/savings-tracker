# Espaçamento — Figma nó `271-3209` (hero → Content)

**Ficheiro Figma:** [savings-tracker — spacing](https://www.figma.com/design/UtM4hqbnpAz8GAmCUO3ERr/savings-tracker?node-id=271-3209)

**Extração:** Framelink MCP `get_figma_data` (tabela *Name / Pixels* + larguras dos rectângulos de pré-visualização).

## Escala nomeada → px

| Nome Figma | Pixels | Largura do rect (conf.) |
|------------|--------|-------------------------|
| spacing-0 | 0 | 0 |
| spacing-025 | 2px | 2 |
| spacing-050 | 4px | 4 |
| spacing-075 | 6px | 6 |
| spacing-100 | 8px | 8 |
| spacing-125 | 10px | 10 |
| spacing-150 | 12px | 12 |
| spacing-200 | 16px | 16 |
| spacing-250 | 20px | 20 |
| spacing-300 | 24px | 24 |
| spacing-400 | 32px | 32 |
| spacing-500 | 40px | 40 |
| spacing-600 | 48px | 48 |
| spacing-800 | 64px | 64 |
| spacing-1000 | 80px | 80 |
| spacing-1200 | 96px | 96 |
| spacing-1400 | 112px | 112 |
| spacing-1600 | 128px | 128 |
| spacing-1800 | 140px | 140 |

**Nota:** o sufixo `1800` não corresponde a 1800 px; o valor publicado no frame é **140 px** (texto + rect).

## Cor de texto / divisores (mesmo frame)

| Uso | HEX |
|-----|-----|
| Texto tabela | `#02012C` |
| Divisor horizontal | `#E0E4EA` |

## Mapeamento → Tailwind `theme.extend.spacing`

Usar chaves numéricas Tailwind cujo **valor em px** coincide com a escala (ver `tailwind.config.js`). A chave `36` é ajustada a **140px** para refletir `spacing-1800`.
