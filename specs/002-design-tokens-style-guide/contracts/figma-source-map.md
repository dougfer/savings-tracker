# Mapeamento Figma → tokens (savings-tracker)

**Ficheiro Figma:** [savings-tracker](https://www.figma.com/design/UtM4hqbnpAz8GAmCUO3ERr/savings-tracker)

Os valores **não** são copiados para este repositório aqui — apenas a **localização** no Figma para extração manual ou via MCP/design tokens export.

| Área | Node ID (URL fragment) | Tokens esperados |
|------|-------------------------|------------------|
| Cores | `271-2935` | Paleta Neutral / Orange / Green / Red + ink `#02012C`. |
| Tipografia | `271-2905` | Text Presets 1–7 (Bricolage + Inter), tamanhos e interlinhas. |
| Spacing | `271-3209` | Tabela `spacing-*` → px (hero que contém `Content`). |
| Radius | `271-3317` | Raios por categoria. **Pendente MCP:** API 429 em 2026-05-12; valores em código derivam de **8px** (`271-2905`), **10px** (`271-2935`) e passos da escala de spacing até nova extração. |
| Sombras / elevação | *a confirmar no Figma* | **Pendente (2026-05-12):** sem frame dedicado com valores exportáveis; `docs/style-guide.md` documenta estado *pending* e **não** há `theme.extend.boxShadow` em `tailwind.config.js` até aprovação explícita de design. |

**Import de fontes (referência de produto):**

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet">
```

Em React Native, o carregamento efetivo será via **`expo-font`** (e variantes suportadas), não via `<link>`.
