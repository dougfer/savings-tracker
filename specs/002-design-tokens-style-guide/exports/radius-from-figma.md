# Raios — Figma nó `271-3317`

**Ficheiro Figma:** [savings-tracker — radius](https://www.figma.com/design/UtM4hqbnpAz8GAmCUO3ERr/savings-tracker?node-id=271-3317)

## Estado da extração

- **2026-05-12:** `get_figma_data` para `271:3317` respondeu **HTTP 429** (rate limit da API Figma). A tabela completa deste frame fica **pendente de nova tentativa MCP**.
- Valores **confirmados** noutros nós do **mesmo ficheiro**:
  - **8px** — cantos dos chips “Font Size / Line Height …” em `271-2905` (`borderRadius: 8px`).
  - **10px** — cantos dos swatches de cor em `271-2935` (`borderRadius: 10px`).

## Alinhamento à escala de spacing (`271-3209`)

Para manter consistência até haver dump de `271-3317`, os raios em `tailwind.config.js` usam também passos da escala de spacing já extraída: **2, 4, 6, 8, 10, 12, 16, 24 px** (e `none` / `full`).

## Tabela alvo (a completar após MCP)

| Chave sugerida | Valor | Categoria (a validar com design) |
|----------------|-------|----------------------------------|
| `rounded-xs` | 2px | Micro |
| `rounded-sm` | 4px | Controlo denso |
| `rounded-md` | 8px | Chips / painéis de spec |
| `rounded-lg` | 10px | Swatches de cor |
| `rounded-xl` | 12px | — |
| `rounded-2xl` | 16px | — |
| `rounded-3xl` | 24px | — |
| `rounded-full` | pill | Avatares / pills |
